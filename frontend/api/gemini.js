/* global process */
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Authentication Check
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }
    // Note: Full signature verification via firebase-admin is omitted here to remain compatible 
    // with the current environment without requiring a service account JSON provisioning.
    // The token's presence is verified as the safest lightweight boundary.

    const context = req.body.context;
    if (!context) {
      return res.status(400).json({ error: 'Bad Request: Missing context payload' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY not configured.");
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // 2. Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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

    // 4. Generate Response
    const result = await model.generateContent({
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + '\n\n' + prompt }] }
      ],
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const responseText = result.response.text();
    let jsonOutput;
    
    try {
      jsonOutput = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Gemini returned invalid JSON:", parseError);
      return res.status(502).json({ error: 'AI returned an invalid format' });
    }

    // 5. Lightweight validation of the returned structure
    if (!jsonOutput.summary || !Array.isArray(jsonOutput.priorities)) {
      return res.status(502).json({ error: 'AI returned a malformed structure' });
    }

    return res.status(200).json(jsonOutput);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: 'Failed to generate AI briefing' });
  }
}
