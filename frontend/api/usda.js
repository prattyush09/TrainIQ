/* global process */
import fetch from 'node-fetch';

/**
 * USDA FoodData Central API handler
 * Searches for foods and returns normalized results for TrainIQ
 */

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Extract search term from request body
    const { query } = req.body;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request: Search query is required'
      });
    }

    // Get USDA API key from environment variables (never expose this)
    const apiKey = process.env.USDA_API_KEY;
    if (!apiKey) {
      console.error("[USDA API] USDA_API_KEY not configured on server.");
      return res.status(500).json({
        success: false,
        error: 'Server configuration error'
      });
    }

    // USDA FoodData Central API endpoint
    const usdaApiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search`;

    // Prepare request parameters
    const params = new URLSearchParams({
      api_key: apiKey,
      query: query.trim(),
      pageSize: '10', // Limit results
      dataType: 'Foundation,SR Legacy', // Focus on basic foods
      requireAllWords: 'false'
    });

    // Fetch from USDA API
    const usdaResponse = await fetch(`${usdaApiUrl}?${params}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!usdaResponse.ok) {
      const errorText = await usdaResponse.text();
      console.error(`[USDA API] USDA request failed: ${usdaResponse.status}`, errorText);

      // Handle specific USDA error cases
      if (usdaResponse.status === 400) {
        return res.status(400).json({
          success: false,
          error: 'Invalid request to food database'
        });
      }
      if (usdaResponse.status === 401 || usdaResponse.status === 403) {
        return res.status(401).json({
          success: false,
          error: 'Food service authentication failed'
        });
      }
      if (usdaResponse.status === 429) {
        return res.status(429).json({
          success: false,
          error: 'Food service rate limit exceeded'
        });
      }

      return res.status(502).json({
        success: false,
        error: 'Food service temporarily unavailable'
      });
    }

    const usdaData = await usdaResponse.json();

    // Transform USDA results to match TrainIQ food format
    const normalizedResults = (usdaData.foods || []).map(food => {
      // Extract nutrients - USDA returns nutrients as array
      const nutrients = {};
      if (food.foodNutrients) {
        food.foodNutrients.forEach(nutrient => {
          const id = nutrient.nutrientId || nutrient.id;
          const amount = nutrient.value || nutrient.amount || 0;

          // Map USDA nutrient IDs to our format
          switch (id) {
            case 1008: // Energy (kcal)
              nutrients.calories = Math.round(amount);
              break;
            case 1003: // Protein
              nutrients.protein = Math.round(amount * 10) / 10; // Keep 1 decimal
              break;
            case 1005: // Carbohydrates
              nutrients.carbs = Math.round(amount * 10) / 10;
              break;
            case 1004: // Total lipid (fat)
              nutrients.fats = Math.round(amount * 10) / 10;
              break;
          }
        });
      }

      // Determine serving information
      let servingUnit = "serving";
      let servingWeightGrams = 100; // Default to 100g

      // Try to get serving size from food portion or description
      if (food.servingSize && food.servingSizeUnit) {
        servingWeightGrams = parseFloat(food.servingSize) || 100;
        servingUnit = food.servingSizeUnit.toLowerCase();

        // Convert common units to standardized format
        if (servingUnit === 'g' || servingUnit === 'gram') {
          servingUnit = 'g';
        } else if (servingUnit === 'ml' || servingUnit === 'milliliter') {
          servingUnit = 'ml';
        } else if (servingUnit === 'cup' || servingUnit === 'cups') {
          servingUnit = 'cup';
        } else if (servingUnit === 'piece' || servingUnit === 'pieces' || servingUnit === 'item') {
          servingUnit = 'piece';
        } else if (servingUnit === 'oz' || servingUnit === 'ounce') {
          servingUnit = 'oz';
          // Convert oz to grams approximately (1 oz = 28.35g)
          servingWeightGrams = Math.round(servingWeightGrams * 28.35);
        }
      } else if (food.householdServingFullText) {
        // Extract serving info from household description
        servingUnit = "serving";
      }

      // Generate aliases from description and brandOwner
      const aliases = [];
      if (food.description) {
        // Add lowercase version
        aliases.push(food.description.toLowerCase());

        // Add common variations (remove punctuation, etc.)
        const cleanDesc = food.description.replace(/[^\w\s]/g, '').toLowerCase();
        if (cleanDesc !== food.description.toLowerCase() && !aliases.includes(cleanDesc)) {
          aliases.push(cleanDesc);
        }
      }

      if (food.brandOwner) {
        aliases.push(food.brandOwner.toLowerCase());
      }

      // Remove duplicates and empty strings
      const uniqueAliases = [...new Set(aliases.filter(alias => alias.length > 0))];

      // Determine category based on food properties (simplified)
      let category = "General";
      if (food.foodCategory) {
        category = food.foodCategory;
      }

      // Generate unique ID (using fdcId or creating one)
      const id = food.fdcId || Math.random().toString(36).substr(2, 9);

      return {
        id: id.toString(), // Ensure ID is string for consistency
        name: food.description || "Unknown Food",
        servingUnit: servingUnit,
        servingWeightGrams: servingWeightGrams,
        calories: nutrients.calories || 0,
        protein: nutrients.protein || 0,
        carbs: nutrients.carbs || 0,
        fats: nutrients.fats || 0,
        category: category,
        aliases: uniqueAliases,
        source: "USDA FoodData Central",
        isEstimate: true // USDA data often represents estimates/averages
      };
    });

    return res.status(200).json({
      success: true,
      count: normalizedResults.length,
      foods: normalizedResults
    });
  } catch (error) {
    console.error("[USDA API] Unexpected error:", error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}