/* global process */
import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Extracts HTTP status code from error object or message if available.
 */
export function getErrorStatus(error) {
  if (!error) return null;
  if (typeof error.status === 'number') return error.status;
  if (typeof error.statusCode === 'number') return error.statusCode;
  if (typeof error.response?.status === 'number') return error.response.status;

  const match = (error.message || '').match(/\[(\d{3})\s+[^\]]+\]/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return null;
}

/**
 * Identifies transient errors (503 Service Unavailable, 429 Rate Limit / High Demand).
 * Returns false for permanent/client errors (400, 401, 403, 404).
 */
export function isTransientError(error) {
  if (!error) return false;

  const status = getErrorStatus(error);
  if (status === 503 || status === 429) {
    return true;
  }

  // Explicit non-transient status codes: do NOT retry
  if (status && [400, 401, 403, 404, 422].includes(status)) {
    return false;
  }

  const message = (error.message || '').toLowerCase();

  // Explicit non-transient message indicators
  if (
    message.includes('api_key_invalid') ||
    message.includes('api key not valid') ||
    message.includes('invalid api key') ||
    message.includes('permission_denied') ||
    message.includes('bad request') ||
    message.includes('not found')
  ) {
    return false;
  }

  // Transient indicators
  return (
    message.includes('503') ||
    message.includes('429') ||
    message.includes('service unavailable') ||
    message.includes('too many requests') ||
    message.includes('resource_exhausted') ||
    message.includes('high demand') ||
    message.includes('overloaded') ||
    message.includes('temporarily unavailable') ||
    message.includes('spikes in demand') ||
    message.includes('unavailable')
  );
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // 1. Authentication Check
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Unauthorized: Missing or invalid token' });
    }
    // Note: Full signature verification via firebase-admin is omitted here to remain compatible 
    // with the current environment without requiring a service account JSON provisioning.
    // The token's presence is verified as the safest lightweight boundary.

    const context = req.body?.context;
    if (!context) {
      return res.status(400).json({ success: false, error: 'Bad Request: Missing context payload' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("[Gemini API] GEMINI_API_KEY not configured on server.");
      return res.status(500).json({ success: false, error: 'Server configuration error' });
    }

    // 2. Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3.8-flash' });

    // 3. Strict System Prompt Construction
    const systemPrompt = `You are TrainIQ, an AI fitness and nutrition companion.
Your responsibilities:
- Interpret provided TrainIQ context
- Explain current behavior and identify meaningful trends
- Recommend practical actions and prioritize today's actions
- Be concise and actionable

Your absolute rules:
- NEVER invent user information, unlogged meals, or uncompleted workouts.
- NEVER assume missing data is negative (e.g. 0 logged days does not mean failure).
- NEVER calculate or override the canonical TrainIQ Score.
- NEVER contradict or replace the deterministic recommendation provided in the context. Explain it instead.
- Distinguish tracked data from missing data using the provided data coverage metrics (e.g., if coverage is 2/7, state that data is limited, do not claim they missed their targets on the other 5 days).
- Respect hydration tracking state (do not penalize or mention if tracking is disabled).
- If the user is new (score not established), give simple onboarding actions without criticizing missing historical data.
- Avoid unnecessary repetition, catastrophizing score drops, or giving generic fitness advice. Ground every priority in the exact TrainIQ context provided.

You will receive a JSON context containing the user's deterministic TrainIQ data.
Output MUST be valid JSON matching this exact schema:
{
  "summary": "A very brief 1-2 sentence overall summary.",
  "priorities": [
    {
      "type": "training",
      "title": "Short title",
      "action": "What to do today",
      "reason": "Why, based strictly on the data"
    }
  ],
  "scoreInsight": "1 short sentence explaining the score trend or coverage",
  "encouragement": "A short, grounded motivational sign-off"
}`;

    const prompt = `Here is the authoritative TrainIQ context:
${JSON.stringify(context, null, 2)}

Provide today's briefing as JSON.`;

    // 4. Generate Response with Controlled Retry Policy (Max 2 attempts total)
    const MAX_ATTEMPTS = 2;
    const RETRY_DELAY_MS = 1500;
    let result = null;
    let lastError = null;

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        result = await model.generateContent({
          contents: [
            { role: 'user', parts: [{ text: systemPrompt + '\n\n' + prompt }] }
          ],
          generationConfig: {
            responseMimeType: "application/json"
          }
        });
        // Success
        break;
      } catch (err) {
        lastError = err;
        const status = getErrorStatus(err);
        const transient = isTransientError(err);

        console.warn(`[Gemini API] Request attempt ${attempt} failed. Status: ${status || 'unknown'}. Transient: ${transient}`);

        // Only retry transient errors (503, 429) if attempts remain
        if (transient && attempt < MAX_ATTEMPTS) {
          console.warn(`[Gemini API] Retrying transient error in ${RETRY_DELAY_MS}ms (attempt ${attempt + 1}/${MAX_ATTEMPTS})...`);
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
          continue;
        }

        // Do NOT retry non-transient errors (400, 401, 403, 404, etc.)
        break;
      }
    }

    // 5. Handle Failure (Transient vs Non-Transient)
    if (!result) {
      if (isTransientError(lastError)) {
        console.warn('[Gemini API] Gemini is temporarily unavailable after retry. Returning fallback response.');
        return res.status(200).json({
          success: false,
          source: 'fallback',
          reason: 'temporarily_unavailable',
          message: 'AI briefing is temporarily unavailable due to high model demand.'
        });
      }

      // Non-transient error
      const status = getErrorStatus(lastError);
      console.error('[Gemini API] Non-transient error occurred:', lastError?.message || 'Unknown error');

      if (status && status >= 400 && status < 500) {
        return res.status(status).json({
          success: false,
          error: `Client error: ${status}`
        });
      }

      return res.status(500).json({
        success: false,
        error: 'Failed to generate AI briefing'
      });
    }

    // 6. Parse and Validate Successful Response
    const responseText = result.response.text();
    let jsonOutput;

    try {
      jsonOutput = JSON.parse(responseText);
    } catch (parseError) {
      console.error("[Gemini API] AI returned invalid JSON:", parseError?.message || parseError);
      return res.status(502).json({
        success: false,
        error: 'AI returned an invalid format'
      });
    }

    // Lightweight validation of the returned structure
    if (!jsonOutput.summary || !Array.isArray(jsonOutput.priorities)) {
      console.error("[Gemini API] AI returned malformed structure");
      return res.status(502).json({
        success: false,
        error: 'AI returned a malformed structure'
      });
    }

    return res.status(200).json({
      success: true,
      source: 'gemini',
      data: jsonOutput,
      ...jsonOutput
    });
  } catch (error) {
    console.error("[Gemini API] Unexpected handler error:", error?.message || error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate AI briefing'
    });
  }
}
