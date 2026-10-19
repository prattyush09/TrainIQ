/**
 * TrainIQ Comprehensive Indian Foods Catalogue (500 Items)
 * 
 * Nutritional reference standards based on:
 * - ICMR-NIN Indian Food Composition Tables (IFCT)
 * - Standard Indian Dietetics & Cooked Food Reference Data
 * - USDA FoodData Central (Standard Raw Ingredients)
 * 
 * Preserves baseline historical item IDs (1-15) and existing schema compatibility.
 */

export const foodDatabase = [
  {
    "id": 1,
    "name": "Chicken Breast",
    "servingUnit": "100g",
    "servingWeightGrams": 100,
    "calories": 165,
    "protein": 31,
    "carbs": 0,
    "fats": 3.6,
    "category": "Non-Vegetarian",
    "aliases": [
      "murgh",
      "boneless chicken",
      "chicken breast raw",
      "chicken fillet"
    ],
    "isEstimate": false,
    "source": "USDA / Standard Poultry Reference"
  },
  {
    "id": 2,
    "name": "Egg",
    "servingUnit": "1 egg",
    "servingWeightGrams": 50,
    "calories": 78,
    "protein": 6.3,
    "carbs": 0.6,
    "fats": 5.3,
    "category": "Eggs & Poultry",
    "aliases": [
      "anda",
      "boiled egg",
      "whole egg",
      "poultry egg"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 3,
    "name": "Paneer",
    "servingUnit": "100g",
    "servingWeightGrams": 100,
    "calories": 265,
    "protein": 18,
    "carbs": 6,
    "fats": 20,
    "category": "Dairy & Paneer",
    "aliases": [
      "cottage cheese",
      "fresh paneer",
      "indian cottage cheese",
      "chenna"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 4,
    "name": "Rice",
    "servingUnit": "100g",
    "servingWeightGrams": 100,
    "calories": 130,
    "protein": 2.7,
    "carbs": 28,
    "fats": 0.3,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "white rice",
      "chawal",
      "steamed rice",
      "bhat",
      "sadam"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 5,
    "name": "Roti",
    "servingUnit": "1 roti",
    "servingWeightGrams": 35,
    "calories": 120,
    "protein": 3,
    "carbs": 18,
    "fats": 3,
    "category": "Breads & Flatbreads",
    "aliases": [
      "chapati",
      "phulka",
      "fulka",
      "gehu roti",
      "whole wheat flatbread"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 6,
    "name": "Banana",
    "servingUnit": "1 banana",
    "servingWeightGrams": 118,
    "calories": 105,
    "protein": 1.3,
    "carbs": 27,
    "fats": 0.4,
    "category": "Fruits & Accompaniments",
    "aliases": [
      "kela",
      "pazham",
      "kele",
      "fresh banana"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 7,
    "name": "Milk",
    "servingUnit": "100ml",
    "servingWeightGrams": 103,
    "calories": 61,
    "protein": 3.2,
    "carbs": 4.8,
    "fats": 3.3,
    "category": "Dairy & Paneer",
    "aliases": [
      "doodh",
      "cow milk",
      "paal",
      "haalu"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 8,
    "name": "Dal",
    "servingUnit": "100g",
    "servingWeightGrams": 100,
    "calories": 116,
    "protein": 9,
    "carbs": 20,
    "fats": 0.4,
    "category": "Dal & Legumes",
    "aliases": [
      "dal tadka",
      "yellow dal",
      "toor dal",
      "arhar dal",
      "paruppu"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 9,
    "name": "Oats",
    "servingUnit": "100g",
    "servingWeightGrams": 100,
    "calories": 389,
    "protein": 16.9,
    "carbs": 66.3,
    "fats": 6.9,
    "category": "Breakfast & Cereals",
    "aliases": [
      "rolled oats",
      "oatmeal",
      "jaee",
      "breakfast oats"
    ],
    "isEstimate": false,
    "source": "USDA / Standard Cereal Reference"
  },
  {
    "id": 10,
    "name": "Curd",
    "servingUnit": "100g",
    "servingWeightGrams": 100,
    "calories": 61,
    "protein": 3.5,
    "carbs": 4.7,
    "fats": 3.3,
    "category": "Dairy & Paneer",
    "aliases": [
      "dahi",
      "plain yogurt",
      "thayir",
      "perugu",
      "mosaru"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 11,
    "name": "Apple",
    "servingUnit": "1 apple",
    "servingWeightGrams": 182,
    "calories": 95,
    "protein": 0.5,
    "carbs": 25,
    "fats": 0.3,
    "category": "Fruits & Accompaniments",
    "aliases": [
      "seb",
      "fresh apple",
      "red apple"
    ],
    "isEstimate": false,
    "source": "USDA / ICMR-NIN IFCT"
  },
  {
    "id": 12,
    "name": "Peanut Butter",
    "servingUnit": "1 tbsp",
    "servingWeightGrams": 16,
    "calories": 94,
    "protein": 4,
    "carbs": 3.2,
    "fats": 8,
    "category": "Nuts, Seeds & Healthy Fats",
    "aliases": [
      "mungfali butter",
      "peanut paste",
      "nut butter"
    ],
    "isEstimate": false,
    "source": "USDA / Commercial Reference"
  },
  {
    "id": 13,
    "name": "Almonds",
    "servingUnit": "10 almonds",
    "servingWeightGrams": 12,
    "calories": 70,
    "protein": 2.6,
    "carbs": 2.6,
    "fats": 6.1,
    "category": "Nuts, Seeds & Healthy Fats",
    "aliases": [
      "badam",
      "raw almonds",
      "badam giri"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 14,
    "name": "Potato",
    "servingUnit": "100g",
    "servingWeightGrams": 100,
    "calories": 77,
    "protein": 2,
    "carbs": 17,
    "fats": 0.1,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "aloo",
      "batata",
      "urulaikizhangu",
      "boiled potato",
      "alu"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 15,
    "name": "Whey Protein",
    "servingUnit": "1 scoop",
    "servingWeightGrams": 30,
    "calories": 120,
    "protein": 24,
    "carbs": 3,
    "fats": 2,
    "category": "Fitness & Protein Supplements",
    "aliases": [
      "protein powder",
      "whey isolate",
      "whey concentrate",
      "protein supplement"
    ],
    "isEstimate": false,
    "source": "Standard Nutritional Supplement Reference"
  },
  {
    "id": 16,
    "name": "Chapati with Ghee",
    "servingUnit": "1 chapati (40g)",
    "servingWeightGrams": 40,
    "calories": 145,
    "protein": 3.2,
    "carbs": 18.5,
    "fats": 6.2,
    "category": "Breads & Flatbreads",
    "aliases": [
      "ghee roti",
      "ghee chapati",
      "phulka with ghee",
      "fulka with ghee"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 17,
    "name": "Plain Paratha (Tawa)",
    "servingUnit": "1 paratha (60g)",
    "servingWeightGrams": 60,
    "calories": 210,
    "protein": 4.5,
    "carbs": 28,
    "fats": 9,
    "category": "Breads & Flatbreads",
    "aliases": [
      "tawa paratha",
      "plain parotta",
      "sada paratha"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 18,
    "name": "Aloo Paratha",
    "servingUnit": "1 paratha (120g)",
    "servingWeightGrams": 120,
    "calories": 290,
    "protein": 6,
    "carbs": 44,
    "fats": 10.5,
    "category": "Breads & Flatbreads",
    "aliases": [
      "alu paratha",
      "potato stuffed paratha",
      "punjabi aloo paratha"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 19,
    "name": "Gobi Paratha",
    "servingUnit": "1 paratha (110g)",
    "servingWeightGrams": 110,
    "calories": 250,
    "protein": 5.8,
    "carbs": 38,
    "fats": 9,
    "category": "Breads & Flatbreads",
    "aliases": [
      "cauliflower paratha",
      "gobhi paratha"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 20,
    "name": "Paneer Paratha",
    "servingUnit": "1 paratha (120g)",
    "servingWeightGrams": 120,
    "calories": 330,
    "protein": 11.5,
    "carbs": 36,
    "fats": 15.5,
    "category": "Breads & Flatbreads",
    "aliases": [
      "cottage cheese paratha",
      "paneer stuffed flatbread"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 21,
    "name": "Methi Paratha",
    "servingUnit": "1 paratha (70g)",
    "servingWeightGrams": 70,
    "calories": 220,
    "protein": 5.2,
    "carbs": 30,
    "fats": 9,
    "category": "Breads & Flatbreads",
    "aliases": [
      "fenugreek paratha",
      "methi roti"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 22,
    "name": "Mooli Paratha",
    "servingUnit": "1 paratha (110g)",
    "servingWeightGrams": 110,
    "calories": 240,
    "protein": 5,
    "carbs": 37,
    "fats": 8.5,
    "category": "Breads & Flatbreads",
    "aliases": [
      "radish paratha",
      "muli paratha"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 23,
    "name": "Onion Paratha",
    "servingUnit": "1 paratha (100g)",
    "servingWeightGrams": 100,
    "calories": 255,
    "protein": 5.4,
    "carbs": 38,
    "fats": 9.5,
    "category": "Breads & Flatbreads",
    "aliases": [
      "pyaz paratha",
      "pyaaz ka paratha"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 24,
    "name": "Sattu Paratha",
    "servingUnit": "1 paratha (110g)",
    "servingWeightGrams": 110,
    "calories": 280,
    "protein": 9.5,
    "carbs": 40,
    "fats": 9,
    "category": "Breads & Flatbreads",
    "aliases": [
      "bihari sattu paratha",
      "roasted gram paratha"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 25,
    "name": "Mix Veg Paratha",
    "servingUnit": "1 paratha (110g)",
    "servingWeightGrams": 110,
    "calories": 260,
    "protein": 5.5,
    "carbs": 39,
    "fats": 9.2,
    "category": "Breads & Flatbreads",
    "aliases": [
      "vegetable paratha",
      "mixed vegetable flatbread"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 26,
    "name": "Egg Paratha",
    "servingUnit": "1 paratha (130g)",
    "servingWeightGrams": 130,
    "calories": 310,
    "protein": 11,
    "carbs": 32,
    "fats": 15,
    "category": "Breads & Flatbreads",
    "aliases": [
      "anda paratha",
      "egg stuffed paratha"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 27,
    "name": "Jowar Bhakri",
    "servingUnit": "1 bhakri (60g)",
    "servingWeightGrams": 60,
    "calories": 175,
    "protein": 4.8,
    "carbs": 37,
    "fats": 1.1,
    "category": "Breads & Flatbreads",
    "aliases": [
      "sorghum flatbread",
      "jowar roti",
      "jowar rotla"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 28,
    "name": "Bajra Bhakri",
    "servingUnit": "1 bhakri (60g)",
    "servingWeightGrams": 60,
    "calories": 190,
    "protein": 5.2,
    "carbs": 36,
    "fats": 2.8,
    "category": "Breads & Flatbreads",
    "aliases": [
      "pearl millet flatbread",
      "bajra rotla",
      "bajra roti"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 29,
    "name": "Ragi Roti",
    "servingUnit": "1 roti (60g)",
    "servingWeightGrams": 60,
    "calories": 170,
    "protein": 3.8,
    "carbs": 35,
    "fats": 1.5,
    "category": "Breads & Flatbreads",
    "aliases": [
      "finger millet roti",
      "nachni roti",
      "ragi adai"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 30,
    "name": "Makki ki Roti",
    "servingUnit": "1 roti (60g)",
    "servingWeightGrams": 60,
    "calories": 185,
    "protein": 4.2,
    "carbs": 35,
    "fats": 3.2,
    "category": "Breads & Flatbreads",
    "aliases": [
      "corn flour flatbread",
      "maize roti",
      "makai roti"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 31,
    "name": "Missi Roti",
    "servingUnit": "1 roti (50g)",
    "servingWeightGrams": 50,
    "calories": 160,
    "protein": 5.5,
    "carbs": 26,
    "fats": 3.8,
    "category": "Breads & Flatbreads",
    "aliases": [
      "besan roti",
      "spiced gram flour roti"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 32,
    "name": "Akki Rotti",
    "servingUnit": "1 rotti (70g)",
    "servingWeightGrams": 70,
    "calories": 195,
    "protein": 3.2,
    "carbs": 36,
    "fats": 4.2,
    "category": "Breads & Flatbreads",
    "aliases": [
      "karnataka rice flour roti",
      "chawal ki roti"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 33,
    "name": "Thalipeeth",
    "servingUnit": "1 thalipeeth (80g)",
    "servingWeightGrams": 80,
    "calories": 225,
    "protein": 6.2,
    "carbs": 35,
    "fats": 7,
    "category": "Breads & Flatbreads",
    "aliases": [
      "maharashtrian multigrain flatbread",
      "bhajani thalipeeth"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 34,
    "name": "Methi Thepla",
    "servingUnit": "1 thepla (40g)",
    "servingWeightGrams": 40,
    "calories": 130,
    "protein": 3.4,
    "carbs": 18,
    "fats": 5,
    "category": "Breads & Flatbreads",
    "aliases": [
      "gujarati thepla",
      "fenugreek thepla"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 35,
    "name": "Poori",
    "servingUnit": "1 poori (30g)",
    "servingWeightGrams": 30,
    "calories": 125,
    "protein": 2.2,
    "carbs": 14,
    "fats": 7,
    "category": "Breads & Flatbreads",
    "aliases": [
      "puri",
      "deep fried flatbread",
      "wheat puri"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 36,
    "name": "Bhatura",
    "servingUnit": "1 bhatura (80g)",
    "servingWeightGrams": 80,
    "calories": 290,
    "protein": 6,
    "carbs": 38,
    "fats": 13,
    "category": "Breads & Flatbreads",
    "aliases": [
      "bhature",
      "chole bhatura bread",
      "fried leavened bread"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 37,
    "name": "Tandoori Roti",
    "servingUnit": "1 roti (45g)",
    "servingWeightGrams": 45,
    "calories": 130,
    "protein": 3.8,
    "carbs": 26,
    "fats": 1,
    "category": "Breads & Flatbreads",
    "aliases": [
      "clay oven roti",
      "plain tandoori roti"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 38,
    "name": "Tandoori Butter Roti",
    "servingUnit": "1 roti (50g)",
    "servingWeightGrams": 50,
    "calories": 165,
    "protein": 3.8,
    "carbs": 26,
    "fats": 5.2,
    "category": "Breads & Flatbreads",
    "aliases": [
      "butter tandoori roti",
      "makhan tandoori roti"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 39,
    "name": "Plain Naan",
    "servingUnit": "1 naan (80g)",
    "servingWeightGrams": 80,
    "calories": 240,
    "protein": 6.5,
    "carbs": 42,
    "fats": 4.8,
    "category": "Breads & Flatbreads",
    "aliases": [
      "tandoori naan",
      "sada naan"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 40,
    "name": "Butter Naan",
    "servingUnit": "1 naan (90g)",
    "servingWeightGrams": 90,
    "calories": 300,
    "protein": 6.8,
    "carbs": 43,
    "fats": 11,
    "category": "Breads & Flatbreads",
    "aliases": [
      "makhan naan",
      "restaurant butter naan"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 41,
    "name": "Garlic Naan",
    "servingUnit": "1 naan (95g)",
    "servingWeightGrams": 95,
    "calories": 310,
    "protein": 7.2,
    "carbs": 44,
    "fats": 11.5,
    "category": "Breads & Flatbreads",
    "aliases": [
      "lasun naan",
      "garlic butter naan"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 42,
    "name": "Rumali Roti",
    "servingUnit": "1 roti (50g)",
    "servingWeightGrams": 50,
    "calories": 145,
    "protein": 4,
    "carbs": 28,
    "fats": 1.8,
    "category": "Breads & Flatbreads",
    "aliases": [
      "roomali roti",
      "handkerchief bread",
      "mande"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 43,
    "name": "Amritsari Kulcha",
    "servingUnit": "1 kulcha (120g)",
    "servingWeightGrams": 120,
    "calories": 320,
    "protein": 6.5,
    "carbs": 46,
    "fats": 12.5,
    "category": "Breads & Flatbreads",
    "aliases": [
      "aloo kulcha",
      "stuffed kulcha"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 44,
    "name": "Onion Kulcha",
    "servingUnit": "1 kulcha (110g)",
    "servingWeightGrams": 110,
    "calories": 280,
    "protein": 6,
    "carbs": 44,
    "fats": 9,
    "category": "Breads & Flatbreads",
    "aliases": [
      "pyaz kulcha",
      "pyaaz kulcha"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 45,
    "name": "Paneer Kulcha",
    "servingUnit": "1 kulcha (120g)",
    "servingWeightGrams": 120,
    "calories": 340,
    "protein": 11,
    "carbs": 42,
    "fats": 14,
    "category": "Breads & Flatbreads",
    "aliases": [
      "cottage cheese kulcha"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 46,
    "name": "Laccha Paratha",
    "servingUnit": "1 paratha (80g)",
    "servingWeightGrams": 80,
    "calories": 280,
    "protein": 5.2,
    "carbs": 36,
    "fats": 12.8,
    "category": "Breads & Flatbreads",
    "aliases": [
      "layered paratha",
      "lacha paratha"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 47,
    "name": "Malabar Parotta",
    "servingUnit": "1 parotta (80g)",
    "servingWeightGrams": 80,
    "calories": 300,
    "protein": 5.5,
    "carbs": 40,
    "fats": 13.5,
    "category": "Breads & Flatbreads",
    "aliases": [
      "kerala parotta",
      "porotta",
      "layered kerala parotta"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 48,
    "name": "Appam (Plain)",
    "servingUnit": "1 appam (50g)",
    "servingWeightGrams": 50,
    "calories": 85,
    "protein": 1.5,
    "carbs": 18,
    "fats": 0.8,
    "category": "Breads & Flatbreads",
    "aliases": [
      "palappam",
      "kerala appam",
      "fermented rice pancake"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 49,
    "name": "Idiyappam",
    "servingUnit": "2 pieces (80g)",
    "servingWeightGrams": 80,
    "calories": 120,
    "protein": 2.2,
    "carbs": 26,
    "fats": 0.6,
    "category": "Breads & Flatbreads",
    "aliases": [
      "string hoppers",
      "noolappam",
      "sevai"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 50,
    "name": "Brown Rice (Cooked)",
    "servingUnit": "100g cooked",
    "servingWeightGrams": 100,
    "calories": 123,
    "protein": 2.7,
    "carbs": 25.6,
    "fats": 1,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "brown chawal",
      "unpolished rice",
      "whole grain rice"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 51,
    "name": "Jeera Rice",
    "servingUnit": "1 cup (150g)",
    "servingWeightGrams": 150,
    "calories": 220,
    "protein": 3.8,
    "carbs": 38,
    "fats": 5.5,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "cumin rice",
      "cumin seed flavored basmati rice"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 52,
    "name": "Ghee Rice (Neychoru)",
    "servingUnit": "1 cup (150g)",
    "servingWeightGrams": 150,
    "calories": 260,
    "protein": 3.5,
    "carbs": 37,
    "fats": 10.5,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "neychoru",
      "clarified butter rice"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 53,
    "name": "Curd Rice (Thayir Sadam)",
    "servingUnit": "1 cup (200g)",
    "servingWeightGrams": 200,
    "calories": 230,
    "protein": 6.5,
    "carbs": 35,
    "fats": 6.8,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "thayir sadam",
      "daddojanam",
      "dahi chawal",
      "bagala bath"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 54,
    "name": "Lemon Rice (Chitranna)",
    "servingUnit": "1 cup (180g)",
    "servingWeightGrams": 180,
    "calories": 260,
    "protein": 4.8,
    "carbs": 42,
    "fats": 8,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "chitranna",
      "nimmakaya pulihora",
      "elumichai sadam"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 55,
    "name": "Tamarind Rice (Puliyogare)",
    "servingUnit": "1 cup (180g)",
    "servingWeightGrams": 180,
    "calories": 280,
    "protein": 5.2,
    "carbs": 45,
    "fats": 9,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "puliyodharai",
      "pulihora",
      "tamarind sadam"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 56,
    "name": "Tomato Rice (Thakkali Sadam)",
    "servingUnit": "1 cup (180g)",
    "servingWeightGrams": 180,
    "calories": 230,
    "protein": 4.2,
    "carbs": 40,
    "fats": 5.8,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "thakkali sadam",
      "tomato chawal",
      "tomato bath"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 57,
    "name": "Coconut Rice (Thengai Sadam)",
    "servingUnit": "1 cup (160g)",
    "servingWeightGrams": 160,
    "calories": 290,
    "protein": 4,
    "carbs": 38,
    "fats": 13.5,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "thengai sadam",
      "kobbari annam",
      "nariyal chawal"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 58,
    "name": "Moong Dal Khichdi",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 220,
    "protein": 7.8,
    "carbs": 38,
    "fats": 4,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "dal khichdi",
      "plain khichdi",
      "moong khichdi"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 59,
    "name": "Bajra Khichdi",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 240,
    "protein": 8.2,
    "carbs": 40,
    "fats": 5,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "millet khichdi",
      "rajasthani bajre ki khichdi"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 60,
    "name": "Daliya Khichdi (Broken Wheat)",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 210,
    "protein": 7.2,
    "carbs": 39,
    "fats": 3.2,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "vegetable daliya",
      "dalia khichdi",
      "broken wheat khichdi"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 61,
    "name": "Ven Pongal",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 280,
    "protein": 7,
    "carbs": 42,
    "fats": 9.5,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "khara pongal",
      "ghee pongal",
      "south indian pongal"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 62,
    "name": "Bisi Bele Bath",
    "servingUnit": "1 bowl (220g)",
    "servingWeightGrams": 220,
    "calories": 290,
    "protein": 8.5,
    "carbs": 46,
    "fats": 7.8,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "karnataka sambar sadam",
      "hot lentil rice",
      "bbb"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 63,
    "name": "Vegetable Pulao",
    "servingUnit": "1 plate (220g)",
    "servingWeightGrams": 220,
    "calories": 270,
    "protein": 5.5,
    "carbs": 46,
    "fats": 7,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "veg pulao",
      "mixed vegetable pilaf"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 64,
    "name": "Matar Pulao (Peas Pulao)",
    "servingUnit": "1 plate (200g)",
    "servingWeightGrams": 200,
    "calories": 260,
    "protein": 6.2,
    "carbs": 45,
    "fats": 6.2,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "green peas pulao",
      "mutter pulao"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 65,
    "name": "Paneer Pulao",
    "servingUnit": "1 plate (250g)",
    "servingWeightGrams": 250,
    "calories": 360,
    "protein": 13,
    "carbs": 45,
    "fats": 14,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "cottage cheese pulao",
      "paneer pilaf"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 66,
    "name": "Kashmiri Pulao",
    "servingUnit": "1 plate (220g)",
    "servingWeightGrams": 220,
    "calories": 320,
    "protein": 5,
    "carbs": 52,
    "fats": 10,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "sweet dry fruit pulao",
      "kashmiri pilaf"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 67,
    "name": "Vegetable Biryani",
    "servingUnit": "1 plate (300g)",
    "servingWeightGrams": 300,
    "calories": 380,
    "protein": 8.5,
    "carbs": 62,
    "fats": 11,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "veg dum biryani",
      "hyderabadi veg biryani"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 68,
    "name": "Paneer Biryani",
    "servingUnit": "1 plate (320g)",
    "servingWeightGrams": 320,
    "calories": 450,
    "protein": 16.5,
    "carbs": 60,
    "fats": 16,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "cottage cheese biryani",
      "paneer dum biryani"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 69,
    "name": "Soya Chunk Biryani",
    "servingUnit": "1 plate (300g)",
    "servingWeightGrams": 300,
    "calories": 390,
    "protein": 19,
    "carbs": 60,
    "fats": 8,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "mealmaker biryani",
      "soya biryani"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 70,
    "name": "Chicken Biryani (Dum)",
    "servingUnit": "1 plate (350g)",
    "servingWeightGrams": 350,
    "calories": 480,
    "protein": 28,
    "carbs": 58,
    "fats": 14.5,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "murgh biryani",
      "hyderabadi chicken biryani",
      "dum chicken biryani"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 71,
    "name": "Mutton Biryani (Dum)",
    "servingUnit": "1 plate (350g)",
    "servingWeightGrams": 350,
    "calories": 560,
    "protein": 26,
    "carbs": 56,
    "fats": 25,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "gosht biryani",
      "hyderabadi mutton biryani"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 72,
    "name": "Egg Biryani",
    "servingUnit": "1 plate (320g)",
    "servingWeightGrams": 320,
    "calories": 420,
    "protein": 16,
    "carbs": 58,
    "fats": 13.5,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "anda biryani",
      "spiced egg biryani"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 73,
    "name": "Kolkata Chicken Biryani (with Potato)",
    "servingUnit": "1 plate (380g)",
    "servingWeightGrams": 380,
    "calories": 520,
    "protein": 26,
    "carbs": 68,
    "fats": 15.5,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "calcutta biryani",
      "aloo chicken biryani"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 74,
    "name": "Fish Biryani",
    "servingUnit": "1 plate (320g)",
    "servingWeightGrams": 320,
    "calories": 410,
    "protein": 24,
    "carbs": 56,
    "fats": 9.8,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "meen biryani",
      "machli biryani"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 75,
    "name": "Prawn Biryani",
    "servingUnit": "1 plate (320g)",
    "servingWeightGrams": 320,
    "calories": 430,
    "protein": 23,
    "carbs": 57,
    "fats": 11.2,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "chemmeen biryani",
      "jhinga biryani"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 76,
    "name": "Sambar Sadam",
    "servingUnit": "1 bowl (250g)",
    "servingWeightGrams": 250,
    "calories": 270,
    "protein": 7.5,
    "carbs": 48,
    "fats": 5.2,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "sambar rice",
      "south indian sambar sadam"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 77,
    "name": "Rasam Sadam (Rasam Rice)",
    "servingUnit": "1 bowl (220g)",
    "servingWeightGrams": 220,
    "calories": 210,
    "protein": 4.8,
    "carbs": 42,
    "fats": 2.8,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "rasam rice",
      "charu annam"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 78,
    "name": "Vangi Bath (Brinjal Rice)",
    "servingUnit": "1 plate (200g)",
    "servingWeightGrams": 200,
    "calories": 275,
    "protein": 5.2,
    "carbs": 44,
    "fats": 8.5,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "vangi bhat",
      "baingan rice",
      "spiced brinjal rice"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 79,
    "name": "Raw Mango Rice (Mamidikaya Pulihora)",
    "servingUnit": "1 plate (200g)",
    "servingWeightGrams": 200,
    "calories": 270,
    "protein": 4.5,
    "carbs": 46,
    "fats": 7.5,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "kairi chawal",
      "mangai sadam",
      "mamidikaya pulihora"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 80,
    "name": "Coriander Mint Rice",
    "servingUnit": "1 plate (200g)",
    "servingWeightGrams": 200,
    "calories": 245,
    "protein": 4.2,
    "carbs": 43,
    "fats": 6,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "pudina rice",
      "kothmir rice",
      "green rice"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 81,
    "name": "Masala Khichdi (Gujarati style)",
    "servingUnit": "1 bowl (220g)",
    "servingWeightGrams": 220,
    "calories": 250,
    "protein": 8,
    "carbs": 44,
    "fats": 4.5,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "spicy khichdi",
      "vaghareli khichdi"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 82,
    "name": "Sona Masoori Rice (Cooked)",
    "servingUnit": "100g cooked",
    "servingWeightGrams": 100,
    "calories": 130,
    "protein": 2.8,
    "carbs": 28.2,
    "fats": 0.3,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "sona masuri",
      "andhra white rice"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 83,
    "name": "Red Rice (Matta Rice Cooked)",
    "servingUnit": "100g cooked",
    "servingWeightGrams": 100,
    "calories": 125,
    "protein": 3,
    "carbs": 26,
    "fats": 0.8,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "kerala matta rice",
      "palakkadan matta",
      "red parboiled rice"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 84,
    "name": "Oats Khichdi",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 195,
    "protein": 7.5,
    "carbs": 33,
    "fats": 3.8,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "oats vegetable khichdi",
      "healthy oats porridge savory"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 85,
    "name": "Mutton Yakhni Pulao",
    "servingUnit": "1 plate (320g)",
    "servingWeightGrams": 320,
    "calories": 510,
    "protein": 23,
    "carbs": 50,
    "fats": 23,
    "category": "Rice & Rice Dishes",
    "aliases": [
      "yakhni pulao",
      "gosht pulao"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 86,
    "name": "Dal Fry (Toor Dal)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 165,
    "protein": 8.5,
    "carbs": 22,
    "fats": 4.8,
    "category": "Dal & Legumes",
    "aliases": [
      "toor dal fry",
      "arhar dal fry",
      "yellow lentil fry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 87,
    "name": "Moong Dal (Yellow Split, Boiled)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 140,
    "protein": 9.5,
    "carbs": 23,
    "fats": 1.2,
    "category": "Dal & Legumes",
    "aliases": [
      "peeli moong dal",
      "boiled yellow moong",
      "dhuli moong"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 88,
    "name": "Green Moong Dal (Whole, Cooked)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 155,
    "protein": 10.2,
    "carbs": 25,
    "fats": 1.5,
    "category": "Dal & Legumes",
    "aliases": [
      "sabut moong",
      "whole green gram curry",
      "hare moong ki dal"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 89,
    "name": "Chana Dal (Bengal Gram, Cooked)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 180,
    "protein": 9.8,
    "carbs": 28,
    "fats": 3.2,
    "category": "Dal & Legumes",
    "aliases": [
      "bengal gram dal",
      "split chickpea dal"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 90,
    "name": "Masoor Dal (Red Lentil, Cooked)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 150,
    "protein": 10,
    "carbs": 24,
    "fats": 1.5,
    "category": "Dal & Legumes",
    "aliases": [
      "lal masoor",
      "red lentil curry",
      "dhuli masoor"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 91,
    "name": "Whole Masoor Dal (Brown Lentil)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 165,
    "protein": 10.5,
    "carbs": 26,
    "fats": 2,
    "category": "Dal & Legumes",
    "aliases": [
      "sabut masoor",
      "brown lentil curry",
      "kali masoor"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 92,
    "name": "Urad Dal (Split White, Cooked)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 155,
    "protein": 9.6,
    "carbs": 25,
    "fats": 1.8,
    "category": "Dal & Legumes",
    "aliases": [
      "dhuli urad",
      "white lentil curry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 93,
    "name": "Maa ki Dal (Kali Dal)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 185,
    "protein": 9.2,
    "carbs": 26,
    "fats": 4.8,
    "category": "Dal & Legumes",
    "aliases": [
      "black gram dal",
      "sabut urad dal",
      "punjabi kali dal"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 94,
    "name": "Dal Makhani",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 290,
    "protein": 9,
    "carbs": 28,
    "fats": 15.5,
    "category": "Dal & Legumes",
    "aliases": [
      "butter dal makhani",
      "creamy black dal"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 95,
    "name": "Panchmel Dal (Panchratna)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 175,
    "protein": 9.5,
    "carbs": 26,
    "fats": 3.8,
    "category": "Dal & Legumes",
    "aliases": [
      "five lentil dal",
      "rajasthani panchratna dal"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 96,
    "name": "Dal Palak (Spinach Dal)",
    "servingUnit": "1 bowl (160g)",
    "servingWeightGrams": 160,
    "calories": 150,
    "protein": 8.8,
    "carbs": 21,
    "fats": 3.5,
    "category": "Dal & Legumes",
    "aliases": [
      "spinach lentil curry",
      "palakura pappu",
      "keerai kootu"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 97,
    "name": "Dal Methi (Fenugreek Dal)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 155,
    "protein": 9,
    "carbs": 21,
    "fats": 3.8,
    "category": "Dal & Legumes",
    "aliases": [
      "methi dal",
      "menthi kura pappu"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 98,
    "name": "Gujarati Dal",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 150,
    "protein": 6.5,
    "carbs": 26,
    "fats": 2.5,
    "category": "Dal & Legumes",
    "aliases": [
      "sweet and sour dal",
      "khatti meethi dal"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 99,
    "name": "Sindhi Kadhi",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 160,
    "protein": 5.5,
    "carbs": 24,
    "fats": 5,
    "category": "Dal & Legumes",
    "aliases": [
      "gram flour vegetable stew",
      "sindhi veg curry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 100,
    "name": "Rajma Masala (Punjabi style)",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 240,
    "protein": 12.5,
    "carbs": 36,
    "fats": 5.2,
    "category": "Dal & Legumes",
    "aliases": [
      "red kidney beans curry",
      "punjabi rajma",
      "rajmah"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 101,
    "name": "Chole (Punjabi Chana Masala)",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 260,
    "protein": 12,
    "carbs": 38,
    "fats": 6.8,
    "category": "Dal & Legumes",
    "aliases": [
      "chickpea curry",
      "amritsari chole",
      "safed chana masala"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 102,
    "name": "Pindi Chole",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 250,
    "protein": 11.5,
    "carbs": 35,
    "fats": 7,
    "category": "Dal & Legumes",
    "aliases": [
      "rawalpindi chana",
      "dry dark chole"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 103,
    "name": "Kala Chana Curry",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 220,
    "protein": 11,
    "carbs": 33,
    "fats": 4.8,
    "category": "Dal & Legumes",
    "aliases": [
      "black chickpea curry",
      "tariwale chane",
      "kadala curry north"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 104,
    "name": "Sukha Kala Chana (Prasad style)",
    "servingUnit": "1 bowl (100g)",
    "servingWeightGrams": 100,
    "calories": 190,
    "protein": 9.5,
    "carbs": 27,
    "fats": 4.5,
    "category": "Dal & Legumes",
    "aliases": [
      "dry black chickpeas",
      "ashtami prasad chana",
      "navratri chana"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 105,
    "name": "Moong Sprouts Usal",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 160,
    "protein": 9.8,
    "carbs": 22,
    "fats": 4,
    "category": "Dal & Legumes",
    "aliases": [
      "sprouted moong curry",
      "maharashtrian mugachi usal"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 106,
    "name": "Matki Usal (Moth Beans Curry)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 175,
    "protein": 10.5,
    "carbs": 24,
    "fats": 4.5,
    "category": "Dal & Legumes",
    "aliases": [
      "sprouted moth bean curry",
      "matkichi usal"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 107,
    "name": "Lobia Masala (Black Eyed Peas)",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 210,
    "protein": 11.5,
    "carbs": 32,
    "fats": 4.2,
    "category": "Dal & Legumes",
    "aliases": [
      "black eyed peas curry",
      "chawli curry",
      "rongi dal"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 108,
    "name": "Safed Vatana Curry (White Peas)",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 225,
    "protein": 12,
    "carbs": 35,
    "fats": 4,
    "category": "Dal & Legumes",
    "aliases": [
      "white peas curry",
      "ragda gravy",
      "safed matar usal"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 109,
    "name": "Soya Bean Curry (Whole Beans)",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 240,
    "protein": 18,
    "carbs": 18,
    "fats": 10.5,
    "category": "Dal & Legumes",
    "aliases": [
      "whole soybean curry",
      "bhatmas curry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 110,
    "name": "Kulith Dal (Horse Gram Curry)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 160,
    "protein": 11,
    "carbs": 24,
    "fats": 2.2,
    "category": "Dal & Legumes",
    "aliases": [
      "kollu rasam/curry",
      "kulthi ki dal",
      "gahat dal"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 111,
    "name": "Vegetable Sambar",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 130,
    "protein": 5.5,
    "carbs": 21,
    "fats": 2.8,
    "category": "Dal & Legumes",
    "aliases": [
      "south indian sambar",
      "drumstick sambar",
      "murungakkai sambar"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 112,
    "name": "Udupi Sambar (Mild Sweet)",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 145,
    "protein": 5.2,
    "carbs": 24,
    "fats": 3.2,
    "category": "Dal & Legumes",
    "aliases": [
      "hotel sambar",
      "udupi style sambar"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 113,
    "name": "Tomato Rasam",
    "servingUnit": "1 cup (180g)",
    "servingWeightGrams": 180,
    "calories": 65,
    "protein": 1.8,
    "carbs": 10,
    "fats": 2,
    "category": "Dal & Legumes",
    "aliases": [
      "thakkali rasam",
      "spiced tomato soup south indian"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 114,
    "name": "Pepper Rasam (Milagu Rasam)",
    "servingUnit": "1 cup (180g)",
    "servingWeightGrams": 180,
    "calories": 60,
    "protein": 1.5,
    "carbs": 9,
    "fats": 1.8,
    "category": "Dal & Legumes",
    "aliases": [
      "milagu rasam",
      "black pepper garlic rasam"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 115,
    "name": "Mysore Rasam",
    "servingUnit": "1 cup (180g)",
    "servingWeightGrams": 180,
    "calories": 85,
    "protein": 2.8,
    "carbs": 12,
    "fats": 2.8,
    "category": "Dal & Legumes",
    "aliases": [
      "coconut mysore rasam",
      "spiced lentil soup"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 116,
    "name": "Dal Dhokli",
    "servingUnit": "1 bowl (220g)",
    "servingWeightGrams": 220,
    "calories": 260,
    "protein": 8.5,
    "carbs": 45,
    "fats": 5.2,
    "category": "Dal & Legumes",
    "aliases": [
      "gujarati dal dhokli",
      "wheat pasta in spiced lentil gravy"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 117,
    "name": "Cholar Dal (Bengali Chana Dal)",
    "servingUnit": "1 bowl (160g)",
    "servingWeightGrams": 160,
    "calories": 210,
    "protein": 9,
    "carbs": 28,
    "fats": 6.8,
    "category": "Dal & Legumes",
    "aliases": [
      "bengali chana dal with coconut",
      "luchi cholar dal"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 118,
    "name": "Green Gram Sprouts (Raw)",
    "servingUnit": "100g",
    "servingWeightGrams": 100,
    "calories": 105,
    "protein": 9.8,
    "carbs": 16,
    "fats": 0.6,
    "category": "Dal & Legumes",
    "aliases": [
      "raw moong sprouts",
      "ankurit moong"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 119,
    "name": "Boiled White Chickpeas (Kabuli Chana)",
    "servingUnit": "100g boiled",
    "servingWeightGrams": 100,
    "calories": 140,
    "protein": 8.5,
    "carbs": 23,
    "fats": 2.2,
    "category": "Dal & Legumes",
    "aliases": [
      "boiled chole",
      "boiled garbanzo beans"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 120,
    "name": "Boiled Rajma (Red Kidney Beans)",
    "servingUnit": "100g boiled",
    "servingWeightGrams": 100,
    "calories": 130,
    "protein": 8.7,
    "carbs": 22.8,
    "fats": 0.5,
    "category": "Dal & Legumes",
    "aliases": [
      "boiled kidney beans",
      "boiled rajmah"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 121,
    "name": "Boiled Kala Chana (Black Chickpeas)",
    "servingUnit": "100g boiled",
    "servingWeightGrams": 100,
    "calories": 145,
    "protein": 9.2,
    "carbs": 24,
    "fats": 1.8,
    "category": "Dal & Legumes",
    "aliases": [
      "boiled black chana",
      "boiled desi chana"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 122,
    "name": "Chana Sundal (South Indian)",
    "servingUnit": "1 bowl (100g)",
    "servingWeightGrams": 100,
    "calories": 165,
    "protein": 7.8,
    "carbs": 24,
    "fats": 4.5,
    "category": "Dal & Legumes",
    "aliases": [
      "white chickpea sundal",
      "kondakadalai sundal",
      "tempered chickpeas"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 123,
    "name": "Kala Chana Sundal",
    "servingUnit": "1 bowl (100g)",
    "servingWeightGrams": 100,
    "calories": 170,
    "protein": 8.2,
    "carbs": 25,
    "fats": 4.2,
    "category": "Dal & Legumes",
    "aliases": [
      "black chickpea sundal",
      "karuppu konda kadalai sundal"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 124,
    "name": "Chow Chow Kootu (Chayote Squash)",
    "servingUnit": "1 bowl (160g)",
    "servingWeightGrams": 160,
    "calories": 125,
    "protein": 5.5,
    "carbs": 16,
    "fats": 4.5,
    "category": "Dal & Legumes",
    "aliases": [
      "chayote lentil stew",
      "chow chow moong dal kootu"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 125,
    "name": "Keerai Kootu (Spinach Lentil Mash)",
    "servingUnit": "1 bowl (160g)",
    "servingWeightGrams": 160,
    "calories": 130,
    "protein": 6.5,
    "carbs": 17,
    "fats": 4,
    "category": "Dal & Legumes",
    "aliases": [
      "spinach kootu",
      "pasalai keerai kootu"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 126,
    "name": "Mixed Sprouts Salad",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 140,
    "protein": 10,
    "carbs": 20,
    "fats": 2,
    "category": "Dal & Legumes",
    "aliases": [
      "sprouted salad",
      "healthy protein sprouts chaat"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 127,
    "name": "Aloo Gobi (Dry)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 160,
    "protein": 3.5,
    "carbs": 22,
    "fats": 6.5,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "potato cauliflower sabzi",
      "alu gobi",
      "sukhi aloo gobhi"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 128,
    "name": "Aloo Matar (Dry)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 175,
    "protein": 4.8,
    "carbs": 26,
    "fats": 6,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "potato peas sabzi",
      "sukha aloo matar"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 129,
    "name": "Aloo Shimla Mirch",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 150,
    "protein": 3,
    "carbs": 21,
    "fats": 6,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "capsicum potato sabzi",
      "bell pepper aloo",
      "shimla mirch aloo"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 130,
    "name": "Jeera Aloo",
    "servingUnit": "1 bowl (120g)",
    "servingWeightGrams": 120,
    "calories": 165,
    "protein": 2.5,
    "carbs": 24,
    "fats": 6.8,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "cumin spiced potatoes",
      "sukhe jeera aloo"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 131,
    "name": "Aloo Methi",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 155,
    "protein": 3.8,
    "carbs": 20,
    "fats": 6.8,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "potato fenugreek leaves sabzi",
      "aloo methi dry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 132,
    "name": "Aloo Baingan",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 145,
    "protein": 2.8,
    "carbs": 20,
    "fats": 6.2,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "eggplant potato curry dry",
      "brinjal potato sabzi",
      "vangi batata"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 133,
    "name": "Bhindi Masala (Dry)",
    "servingUnit": "1 bowl (140g)",
    "servingWeightGrams": 140,
    "calories": 135,
    "protein": 2.8,
    "carbs": 15,
    "fats": 7,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "okra masala",
      "sukhi bhindi",
      "ladyfinger fry",
      "bhendi sabzi"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 134,
    "name": "Bhindi Do Pyaza",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 145,
    "protein": 3.2,
    "carbs": 16,
    "fats": 7.5,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "okra with double onions",
      "onion okra fry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 135,
    "name": "Kurkuri Bhindi (Crispy Okra)",
    "servingUnit": "1 bowl (100g)",
    "servingWeightGrams": 100,
    "calories": 175,
    "protein": 3.5,
    "carbs": 18,
    "fats": 10,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "crispy fried okra",
      "besan coated bhindi"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 136,
    "name": "Baingan Bharta (Smoked Eggplant)",
    "servingUnit": "1 bowl (160g)",
    "servingWeightGrams": 160,
    "calories": 140,
    "protein": 3,
    "carbs": 16,
    "fats": 7,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "roasted eggplant mash",
      "punjabi baingan bharta",
      "aubergine mash"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 137,
    "name": "Baingan Masala (Semi-Dry)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 130,
    "protein": 2.5,
    "carbs": 15,
    "fats": 6.8,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "brinjal fry",
      "eggplant masala dry",
      "vangi bhaji"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 138,
    "name": "Bharwa Baingan (Stuffed Eggplant)",
    "servingUnit": "2 pieces (140g)",
    "servingWeightGrams": 140,
    "calories": 170,
    "protein": 4.2,
    "carbs": 16,
    "fats": 10,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "stuffed brinjal",
      "gutthi vankaya dry",
      "bharli vangi"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 139,
    "name": "Cabbage Matar Sabzi",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 110,
    "protein": 3.5,
    "carbs": 15,
    "fats": 4.2,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "patta gobi matar",
      "bandhgobi matar",
      "cabbage peas fry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 140,
    "name": "Cabbage Poriyal (South Indian)",
    "servingUnit": "1 bowl (140g)",
    "servingWeightGrams": 140,
    "calories": 105,
    "protein": 2.8,
    "carbs": 12,
    "fats": 5,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "muttakos poriyal",
      "cabbage coconut stir fry",
      "kosu palya"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 141,
    "name": "Beans Poriyal",
    "servingUnit": "1 bowl (140g)",
    "servingWeightGrams": 140,
    "calories": 95,
    "protein": 3.2,
    "carbs": 11,
    "fats": 4.5,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "green beans coconut stir fry",
      "beans palya",
      "beans thoran"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 142,
    "name": "Carrot Beans Poriyal",
    "servingUnit": "1 bowl (140g)",
    "servingWeightGrams": 140,
    "calories": 90,
    "protein": 2.5,
    "carbs": 12,
    "fats": 3.8,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "carrot beans thoran",
      "gajar beans stir fry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 143,
    "name": "Beetroot Poriyal",
    "servingUnit": "1 bowl (140g)",
    "servingWeightGrams": 140,
    "calories": 95,
    "protein": 2.2,
    "carbs": 14,
    "fats": 3.5,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "beetroot thoran",
      "chukandar sabzi south indian",
      "beet palya"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 144,
    "name": "Lauki ki Sabzi (Bottle Gourd)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 85,
    "protein": 1.8,
    "carbs": 10,
    "fats": 4.2,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "doodhi sabzi",
      "ghiya sabzi",
      "sorakaya kura",
      "bottle gourd curry dry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 145,
    "name": "Torai ki Sabzi (Ridge Gourd)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 80,
    "protein": 1.6,
    "carbs": 9.5,
    "fats": 4,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "turai sabzi",
      "peerkangai poriyal",
      "beerakaya kura",
      "ridge gourd curry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 146,
    "name": "Tinda Masala (Apple Gourd)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 90,
    "protein": 2,
    "carbs": 11,
    "fats": 4.2,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "dhemse sabzi",
      "apple gourd dry curry",
      "tinday ki sabzi"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 147,
    "name": "Karela Fry (Crispy Bitter Gourd)",
    "servingUnit": "1 bowl (100g)",
    "servingWeightGrams": 100,
    "calories": 135,
    "protein": 2.8,
    "carbs": 14,
    "fats": 7.5,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "bitter gourd chips",
      "kakarakaya vepudu",
      "pavakkai fry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 148,
    "name": "Bharwa Karela (Stuffed Bitter Gourd)",
    "servingUnit": "2 pieces (120g)",
    "servingWeightGrams": 120,
    "calories": 160,
    "protein": 3.5,
    "carbs": 16,
    "fats": 9,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "spiced stuffed karela",
      "bharwan karela"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 149,
    "name": "Parwal Fry (Pointed Gourd)",
    "servingUnit": "1 bowl (120g)",
    "servingWeightGrams": 120,
    "calories": 120,
    "protein": 2.8,
    "carbs": 13,
    "fats": 6.5,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "potol bhaja",
      "pointed gourd stir fry",
      "parwal bhujia"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 150,
    "name": "Kundru Fry (Ivy Gourd / Tindora)",
    "servingUnit": "1 bowl (130g)",
    "servingWeightGrams": 130,
    "calories": 110,
    "protein": 2.2,
    "carbs": 12,
    "fats": 6,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "tindora fry",
      "dondakaya vepudu",
      "kovakkai poriyal",
      "tindli sabzi"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 151,
    "name": "Arbi Roast (Colocasia Tawa Fry)",
    "servingUnit": "1 bowl (130g)",
    "servingWeightGrams": 130,
    "calories": 170,
    "protein": 2.6,
    "carbs": 26,
    "fats": 6.2,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "seppankizhangu roast",
      "taro root fry",
      "sukhi arbi",
      "chamagadda vepudu"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 152,
    "name": "Raw Banana Fry (Vazhakkai Vepudu)",
    "servingUnit": "1 bowl (130g)",
    "servingWeightGrams": 130,
    "calories": 160,
    "protein": 2.2,
    "carbs": 28,
    "fats": 4.8,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "vazhakkai roast",
      "plantain fry",
      "aratikaya vepudu",
      "raw kela sabzi"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 153,
    "name": "Suran Roast (Elephant Yam Fry)",
    "servingUnit": "1 bowl (130g)",
    "servingWeightGrams": 130,
    "calories": 155,
    "protein": 2.5,
    "carbs": 25,
    "fats": 5.2,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "chenai roast",
      "jimikand fry",
      "yam vepudu"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 154,
    "name": "Gawar Phali Sabzi (Cluster Beans)",
    "servingUnit": "1 bowl (140g)",
    "servingWeightGrams": 140,
    "calories": 105,
    "protein": 4.5,
    "carbs": 14,
    "fats": 3.8,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "guvar nu shaak",
      "cluster beans fry",
      "gorkallu sabzi"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 155,
    "name": "Sem Aloo (Broad Beans Potato)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 145,
    "protein": 4,
    "carbs": 22,
    "fats": 5,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "broad beans potato fry",
      "valor papdi aloo",
      "chikkudukaya aloo"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 156,
    "name": "Sarson ka Saag",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 165,
    "protein": 6,
    "carbs": 16,
    "fats": 8.5,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "mustard greens saag",
      "punjabi sarson da saag"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 157,
    "name": "Palak Saag (Garlic Spinach)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 110,
    "protein": 4.8,
    "carbs": 10,
    "fats": 6,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "lasooni palak",
      "garlic spinach mash",
      "spinach saag"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 158,
    "name": "Methi Matar Malai",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 240,
    "protein": 6.5,
    "carbs": 18,
    "fats": 16,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "fenugreek leaves green peas in cream",
      "creamy methi peas"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 159,
    "name": "Mushroom Matar (Dry)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 125,
    "protein": 6.2,
    "carbs": 14,
    "fats": 5,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "dry mushroom peas",
      "khumb matar sukha"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 160,
    "name": "Mushroom Pepper Fry",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 135,
    "protein": 5.5,
    "carbs": 12,
    "fats": 7.2,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "south indian black pepper mushroom",
      "chettinad mushroom fry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 161,
    "name": "Mixed Vegetable Sabzi (Dry)",
    "servingUnit": "1 bowl (160g)",
    "servingWeightGrams": 160,
    "calories": 135,
    "protein": 4,
    "carbs": 18,
    "fats": 5.5,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "homestyle mix veg",
      "dry vegetable medley"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 162,
    "name": "Undhiyu (Gujarati Mixed Greens)",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 280,
    "protein": 7.5,
    "carbs": 32,
    "fats": 14,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "surti undhiyu",
      "gujarati winter vegetable specialty"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 163,
    "name": "Aviyal (Kerala Coconut Veggies)",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 190,
    "protein": 4.2,
    "carbs": 20,
    "fats": 10.5,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "avial",
      "kerala sadya aviyal",
      "mixed vegetables with coconut and curd"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 164,
    "name": "Cabbage Thoran (Kerala)",
    "servingUnit": "1 bowl (140g)",
    "servingWeightGrams": 140,
    "calories": 110,
    "protein": 2.8,
    "carbs": 12,
    "fats": 5.5,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "muttachose thoran",
      "cabbage coconut stir fry kerala"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 165,
    "name": "Zunka / Pithla (Dry Besan Sabzi)",
    "servingUnit": "1 bowl (140g)",
    "servingWeightGrams": 140,
    "calories": 220,
    "protein": 9.8,
    "carbs": 24,
    "fats": 9.5,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "junka",
      "maharashtrian spiced chickpea flour mash",
      "zunka bhakri"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 166,
    "name": "Aloo Poshto (Bengali Poppy Seed Potato)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 210,
    "protein": 5.2,
    "carbs": 26,
    "fats": 9.8,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "alu posto",
      "bengali potato with poppy seeds"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 167,
    "name": "Gajar Matar Sabzi",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 115,
    "protein": 3.5,
    "carbs": 17,
    "fats": 3.8,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "carrot peas dry sabzi",
      "gajar mutter bhaji"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 168,
    "name": "Kathal ki Sabzi (Raw Jackfruit Fry)",
    "servingUnit": "1 bowl (160g)",
    "servingWeightGrams": 160,
    "calories": 160,
    "protein": 3.8,
    "carbs": 24,
    "fats": 5.8,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "raw jackfruit curry dry",
      "enchorer torkari",
      "panasa kura"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 169,
    "name": "Sukhi Soyabean Sabzi (Nutrela Chunks)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 190,
    "protein": 16.5,
    "carbs": 14,
    "fats": 7,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "dry soya chunks masala",
      "mealmaker dry fry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 170,
    "name": "Kaddu ki Sabzi (Pumpkin Fry)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 105,
    "protein": 2,
    "carbs": 16,
    "fats": 4,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "bhopla bhaji",
      "khatta meetha kaddu",
      "sitaphal sabzi",
      "yellow pumpkin fry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 171,
    "name": "Radish Bhurji (Mooli ki Bhurji)",
    "servingUnit": "1 bowl (130g)",
    "servingWeightGrams": 130,
    "calories": 90,
    "protein": 2.2,
    "carbs": 10,
    "fats": 4.8,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "mooli ke patte ki sabzi",
      "radish greens stir fry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 172,
    "name": "Sweet Potato Roast (Shakarkandi Fry)",
    "servingUnit": "1 bowl (130g)",
    "servingWeightGrams": 130,
    "calories": 150,
    "protein": 2.2,
    "carbs": 30,
    "fats": 2.5,
    "category": "Vegetables & Sabzi",
    "aliases": [
      "ratalu roast",
      "tawa shakarkandi",
      "sweet potato chaat"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 173,
    "name": "Paneer Butter Masala",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 380,
    "protein": 13.5,
    "carbs": 16,
    "fats": 30,
    "category": "Gravies & Curries",
    "aliases": [
      "paneer makhani",
      "butter paneer",
      "creamy cottage cheese curry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 174,
    "name": "Shahi Paneer",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 360,
    "protein": 13,
    "carbs": 18,
    "fats": 28,
    "category": "Gravies & Curries",
    "aliases": [
      "royal paneer curry",
      "cashew rich paneer curry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 175,
    "name": "Kadai Paneer",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 320,
    "protein": 14,
    "carbs": 15,
    "fats": 22,
    "category": "Gravies & Curries",
    "aliases": [
      "karahi paneer",
      "capsicum paneer gravy"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 176,
    "name": "Palak Paneer",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 270,
    "protein": 13.5,
    "carbs": 11,
    "fats": 19,
    "category": "Gravies & Curries",
    "aliases": [
      "spinach cottage cheese curry",
      "saag paneer"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 177,
    "name": "Matar Paneer",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 290,
    "protein": 13,
    "carbs": 18,
    "fats": 18,
    "category": "Gravies & Curries",
    "aliases": [
      "mutter paneer",
      "peas paneer gravy"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 178,
    "name": "Paneer Tikka Masala (Gravy)",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 350,
    "protein": 15,
    "carbs": 16,
    "fats": 25,
    "category": "Gravies & Curries",
    "aliases": [
      "roasted paneer in spicy gravy"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 179,
    "name": "Paneer Lababdar",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 370,
    "protein": 14,
    "carbs": 16,
    "fats": 28,
    "category": "Gravies & Curries",
    "aliases": [
      "creamy grated paneer gravy"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 180,
    "name": "Malai Kofta",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 410,
    "protein": 8.5,
    "carbs": 28,
    "fats": 30,
    "category": "Gravies & Curries",
    "aliases": [
      "paneer potato dumplings in cashew cream sauce"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 181,
    "name": "Vegetable Kofta Curry",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 310,
    "protein": 6.5,
    "carbs": 26,
    "fats": 20,
    "category": "Gravies & Curries",
    "aliases": [
      "veg dumplings in spicy gravy"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 182,
    "name": "Lauki Kofta Curry",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 260,
    "protein": 5.5,
    "carbs": 22,
    "fats": 16.5,
    "category": "Gravies & Curries",
    "aliases": [
      "doodhi kofta curry",
      "bottle gourd dumplings in gravy"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 183,
    "name": "Kadhi Pakora (Punjabi Kadhi)",
    "servingUnit": "1 bowl (220g)",
    "servingWeightGrams": 220,
    "calories": 240,
    "protein": 8.5,
    "carbs": 26,
    "fats": 11.5,
    "category": "Gravies & Curries",
    "aliases": [
      "dahi kadhi with onion fritters",
      "besan kadhi"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 184,
    "name": "Gujarati Kadhi",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 140,
    "protein": 4.8,
    "carbs": 18,
    "fats": 5.5,
    "category": "Gravies & Curries",
    "aliases": [
      "sweet and tangy yogurt gravy",
      "thin gujarati kadhi"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 185,
    "name": "Maharashtrian Kadhi",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 130,
    "protein": 4.5,
    "carbs": 15,
    "fats": 5.8,
    "category": "Gravies & Curries",
    "aliases": [
      "dahi chi kadhi",
      "buttermilk spiced soup"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 186,
    "name": "Kashmiri Dum Aloo",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 280,
    "protein": 4.5,
    "carbs": 32,
    "fats": 15,
    "category": "Gravies & Curries",
    "aliases": [
      "kashmiri dum alu with fennel and yogurt",
      "aloo dum"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 187,
    "name": "Punjabi Dum Aloo",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 290,
    "protein": 5,
    "carbs": 33,
    "fats": 15.5,
    "category": "Gravies & Curries",
    "aliases": [
      "banarasi dum aloo",
      "spicy potato gravy"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 188,
    "name": "Vegetable Korma (Kurma)",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 270,
    "protein": 6.2,
    "carbs": 24,
    "fats": 16.5,
    "category": "Gravies & Curries",
    "aliases": [
      "hotel veg kurma",
      "coconut veg korma"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 189,
    "name": "Navratan Korma",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 340,
    "protein": 7.5,
    "carbs": 30,
    "fats": 21,
    "category": "Gravies & Curries",
    "aliases": [
      "royal nine gem sweet vegetable curry",
      "shahi veg korma"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 190,
    "name": "Soya Chaap Masala Gravy",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 280,
    "protein": 17,
    "carbs": 22,
    "fats": 13.5,
    "category": "Gravies & Curries",
    "aliases": [
      "soya chaap curry",
      "vegetarian mock meat gravy"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 191,
    "name": "Soya Chunk Curry (Nutrela Gravy)",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 210,
    "protein": 19,
    "carbs": 18,
    "fats": 6.8,
    "category": "Gravies & Curries",
    "aliases": [
      "mealmaker curry",
      "soya chunks tariwali gravy"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 192,
    "name": "Mushroom Masala Gravy",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 180,
    "protein": 6.8,
    "carbs": 16,
    "fats": 10,
    "category": "Gravies & Curries",
    "aliases": [
      "khumb masala",
      "mushroom curry north indian"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 193,
    "name": "Mirchi ka Salan (Hyderabadi)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 220,
    "protein": 4.8,
    "carbs": 15,
    "fats": 16,
    "category": "Gravies & Curries",
    "aliases": [
      "peanut sesame chili curry for biryani",
      "biryani salan"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 194,
    "name": "Bagara Baingan",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 230,
    "protein": 4.2,
    "carbs": 18,
    "fats": 15.5,
    "category": "Gravies & Curries",
    "aliases": [
      "hyderabadi small eggplant in peanut sesame gravy"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 195,
    "name": "Ennai Kathirikai Kuzhambu",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 210,
    "protein": 3.8,
    "carbs": 17,
    "fats": 14,
    "category": "Gravies & Curries",
    "aliases": [
      "chettinad oily brinjal gravy",
      "spicy tamarind eggplant curry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 196,
    "name": "Chettinad Veg Curry",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 195,
    "protein": 4.8,
    "carbs": 19,
    "fats": 11,
    "category": "Gravies & Curries",
    "aliases": [
      "spicy roasted masala vegetable curry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 197,
    "name": "Veg Kolhapuri",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 280,
    "protein": 6.5,
    "carbs": 24,
    "fats": 17.5,
    "category": "Gravies & Curries",
    "aliases": [
      "spicy red kolhapuri mixed vegetable curry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 198,
    "name": "Kerala Vegetable Stew (Coconut Milk)",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 230,
    "protein": 3.8,
    "carbs": 22,
    "fats": 14.5,
    "category": "Gravies & Curries",
    "aliases": [
      "ishtu",
      "appam veg stew",
      "kerala potato carrot stew"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 199,
    "name": "Kadala Curry (Kerala Black Chickpeas)",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 250,
    "protein": 11.5,
    "carbs": 32,
    "fats": 8.5,
    "category": "Gravies & Curries",
    "aliases": [
      "puttu kadala curry",
      "kerala style kala chana with roasted coconut"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 200,
    "name": "Mor Kuzhambu (Tamil Buttermilk Curry)",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 130,
    "protein": 4.2,
    "carbs": 13,
    "fats": 7,
    "category": "Gravies & Curries",
    "aliases": [
      "majjiga pulusu",
      "pulissery",
      "curd gravy south indian"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 201,
    "name": "Vatha Kuzhambu (Sundakkai / Manathakkali)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 160,
    "protein": 2.2,
    "carbs": 18,
    "fats": 9,
    "category": "Gravies & Curries",
    "aliases": [
      "tangy tamarind berry curry",
      "poondu vatha kuzhambu"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 202,
    "name": "Gatte ki Sabzi (Rajasthani)",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 260,
    "protein": 9.2,
    "carbs": 24,
    "fats": 14,
    "category": "Gravies & Curries",
    "aliases": [
      "besan dumplings in spiced curd gravy",
      "govind gatta curry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 203,
    "name": "Sev Tamatar ki Sabzi",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 240,
    "protein": 6.2,
    "carbs": 22,
    "fats": 14,
    "category": "Gravies & Curries",
    "aliases": [
      "sev tameta nu shaak",
      "spicy tomato gravy topped with ratlami sev"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 204,
    "name": "Dahi Baingan (Odia / Bengali)",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 160,
    "protein": 4.5,
    "carbs": 16,
    "fats": 8.8,
    "category": "Gravies & Curries",
    "aliases": [
      "fried eggplant in tempered curd gravy",
      "dahi begun"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 205,
    "name": "Dahi Bhindi Curry",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 170,
    "protein": 4.8,
    "carbs": 16,
    "fats": 9.8,
    "category": "Gravies & Curries",
    "aliases": [
      "okra in yogurt gravy",
      "bendakaya majjiga pulusu"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 206,
    "name": "Chana Palak Gravy",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 220,
    "protein": 10.5,
    "carbs": 30,
    "fats": 6.5,
    "category": "Gravies & Curries",
    "aliases": [
      "chole palak",
      "chickpeas in pureed spinach gravy"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 207,
    "name": "Methi Malai Paneer",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 360,
    "protein": 14,
    "carbs": 16,
    "fats": 27,
    "category": "Gravies & Curries",
    "aliases": [
      "creamy fenugreek cottage cheese curry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 208,
    "name": "Paneer Bhurji Gravy",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 280,
    "protein": 15,
    "carbs": 10,
    "fats": 20,
    "category": "Gravies & Curries",
    "aliases": [
      "dhaba style paneer bhurji with gravy",
      "gravy paneer scrambler"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 209,
    "name": "Kashmiri Nadru Yakhni (Lotus Stem)",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 175,
    "protein": 4.8,
    "carbs": 22,
    "fats": 7.8,
    "category": "Gravies & Curries",
    "aliases": [
      "lotus stem in yogurt mint gravy",
      "nadru yakhni"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 210,
    "name": "Goan Veg Caldin",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 220,
    "protein": 4.2,
    "carbs": 20,
    "fats": 14,
    "category": "Gravies & Curries",
    "aliases": [
      "goan mild coconut vegetable curry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 211,
    "name": "Matar Makhana Curry",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 240,
    "protein": 7,
    "carbs": 26,
    "fats": 12,
    "category": "Gravies & Curries",
    "aliases": [
      "foxnut and green peas in cashew tomato gravy",
      "makhana kaju curry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 212,
    "name": "Corn Capsicum Masala Gravy",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 210,
    "protein": 5.2,
    "carbs": 25,
    "fats": 10.5,
    "category": "Gravies & Curries",
    "aliases": [
      "sweet corn and bell pepper curry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 213,
    "name": "Papad ki Sabzi (Rajasthani)",
    "servingUnit": "1 bowl (160g)",
    "servingWeightGrams": 160,
    "calories": 160,
    "protein": 6.2,
    "carbs": 16,
    "fats": 8,
    "category": "Gravies & Curries",
    "aliases": [
      "papad curry in spiced yogurt gravy",
      "marwari papad ro saag"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 214,
    "name": "Plain Dosa (Sada Dosa)",
    "servingUnit": "1 dosa (80g)",
    "servingWeightGrams": 80,
    "calories": 165,
    "protein": 3.8,
    "carbs": 29,
    "fats": 3.8,
    "category": "South Indian",
    "aliases": [
      "sada dosa",
      "crispy plain dosa",
      "fermented crepe"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 215,
    "name": "Masala Dosa (Potato Stuffed)",
    "servingUnit": "1 dosa (150g)",
    "servingWeightGrams": 150,
    "calories": 290,
    "protein": 5.8,
    "carbs": 45,
    "fats": 10,
    "category": "South Indian",
    "aliases": [
      "alu masala dosa",
      "classic south indian masala dosa"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 216,
    "name": "Ghee Roast Dosa",
    "servingUnit": "1 dosa (90g)",
    "servingWeightGrams": 90,
    "calories": 240,
    "protein": 4,
    "carbs": 30,
    "fats": 11.5,
    "category": "South Indian",
    "aliases": [
      "paper ghee roast",
      "ney roast dosa"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 217,
    "name": "Mysore Masala Dosa",
    "servingUnit": "1 dosa (180g)",
    "servingWeightGrams": 180,
    "calories": 340,
    "protein": 6.8,
    "carbs": 48,
    "fats": 14,
    "category": "South Indian",
    "aliases": [
      "red garlic chutney spiced masala dosa",
      "mysore dosa"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 218,
    "name": "Rava Dosa (Plain)",
    "servingUnit": "1 dosa (90g)",
    "servingWeightGrams": 90,
    "calories": 190,
    "protein": 4.2,
    "carbs": 31,
    "fats": 5.5,
    "category": "South Indian",
    "aliases": [
      "semolina dosa",
      "crispy suji dosa"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 219,
    "name": "Set Dosa (Panchatantra / Sponge Dosa)",
    "servingUnit": "2 small dosas (100g)",
    "servingWeightGrams": 100,
    "calories": 180,
    "protein": 4.5,
    "carbs": 34,
    "fats": 2.8,
    "category": "South Indian",
    "aliases": [
      "sponge dosa",
      "karnataka set dosa",
      "soft thick dosa"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 220,
    "name": "Neer Dosa",
    "servingUnit": "2 dosas (80g)",
    "servingWeightGrams": 80,
    "calories": 130,
    "protein": 2.5,
    "carbs": 27,
    "fats": 1.2,
    "category": "South Indian",
    "aliases": [
      "mangalore water crepe",
      "rice neer dosa"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 221,
    "name": "Pesarattu (Green Moong Dosa)",
    "servingUnit": "1 dosa (100g)",
    "servingWeightGrams": 100,
    "calories": 175,
    "protein": 9.8,
    "carbs": 26,
    "fats": 3.8,
    "category": "South Indian",
    "aliases": [
      "andhra moong bean dosa",
      "green gram dosa"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 222,
    "name": "MLA Pesarattu (with Upma Stuffing)",
    "servingUnit": "1 dosa (180g)",
    "servingWeightGrams": 180,
    "calories": 310,
    "protein": 12.5,
    "carbs": 48,
    "fats": 8,
    "category": "South Indian",
    "aliases": [
      "upma stuffed pesarattu",
      "hyderabad mla pesarattu"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 223,
    "name": "Adai (Mixed Lentil Dosa)",
    "servingUnit": "1 adai (100g)",
    "servingWeightGrams": 100,
    "calories": 210,
    "protein": 8.5,
    "carbs": 32,
    "fats": 5.5,
    "category": "South Indian",
    "aliases": [
      "adai aviyal",
      "multi dal protein dosa",
      "paruppu adai"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 224,
    "name": "Steamed Idli (2 pieces)",
    "servingUnit": "2 idlis (100g)",
    "servingWeightGrams": 100,
    "calories": 130,
    "protein": 4.2,
    "carbs": 27,
    "fats": 0.5,
    "category": "South Indian",
    "aliases": [
      "rice idli",
      "fermented steamed rice cake",
      "soft idli"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 225,
    "name": "Mini Ghee Idlis (Sambar Dipped)",
    "servingUnit": "1 plate (150g)",
    "servingWeightGrams": 150,
    "calories": 220,
    "protein": 6.5,
    "carbs": 36,
    "fats": 5.5,
    "category": "South Indian",
    "aliases": [
      "14 mini idlis with ghee sambar",
      "button idli"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 226,
    "name": "Rava Idli (with Tempering)",
    "servingUnit": "2 idlis (110g)",
    "servingWeightGrams": 110,
    "calories": 185,
    "protein": 5.2,
    "carbs": 29,
    "fats": 5.5,
    "category": "South Indian",
    "aliases": [
      "sooji idli",
      "semolina steamed cake",
      "mtr style rava idli"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 227,
    "name": "Kanchipuram Idli (Spiced Temple Idli)",
    "servingUnit": "1 slice/piece (80g)",
    "servingWeightGrams": 80,
    "calories": 150,
    "protein": 4,
    "carbs": 24,
    "fats": 4.2,
    "category": "South Indian",
    "aliases": [
      "pepper cumin spiced idli",
      "kovil idli"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 228,
    "name": "Podi Idli (Tossed in Gunpowder & Ghee)",
    "servingUnit": "2 idlis (120g)",
    "servingWeightGrams": 120,
    "calories": 260,
    "protein": 6.2,
    "carbs": 32,
    "fats": 12,
    "category": "South Indian",
    "aliases": [
      "karam podi idli",
      "ghee podi idli"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 229,
    "name": "Medu Vada (1 piece)",
    "servingUnit": "1 vada (50g)",
    "servingWeightGrams": 50,
    "calories": 165,
    "protein": 4.2,
    "carbs": 15,
    "fats": 10,
    "category": "South Indian",
    "aliases": [
      "urad dal vada",
      "crispy savory donut",
      "ulundu vadai",
      "garelu"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 230,
    "name": "Sambar Vada (2 pieces)",
    "servingUnit": "2 vadas with sambar (220g)",
    "servingWeightGrams": 220,
    "calories": 360,
    "protein": 11,
    "carbs": 42,
    "fats": 16.5,
    "category": "South Indian",
    "aliases": [
      "sambar dip vada",
      "vada soaked in hot sambar"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 231,
    "name": "Curd Vada (Thayir Vadai)",
    "servingUnit": "2 vadas in spiced curd (200g)",
    "servingWeightGrams": 200,
    "calories": 310,
    "protein": 10.2,
    "carbs": 26,
    "fats": 18,
    "category": "South Indian",
    "aliases": [
      "thayir vadai",
      "perugu vada",
      "south indian dahi vada"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 232,
    "name": "Masala Vada (Chana Dal Vada)",
    "servingUnit": "2 pieces (60g)",
    "servingWeightGrams": 60,
    "calories": 190,
    "protein": 6.5,
    "carbs": 21,
    "fats": 9.5,
    "category": "South Indian",
    "aliases": [
      "paruppu vadai",
      "crispy chana dal patty",
      "chattambade"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 233,
    "name": "Plain Uttapam",
    "servingUnit": "1 uttapam (100g)",
    "servingWeightGrams": 100,
    "calories": 180,
    "protein": 4.5,
    "carbs": 32,
    "fats": 3.8,
    "category": "South Indian",
    "aliases": [
      "uthappam",
      "thick rice pancake"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 234,
    "name": "Onion Uttapam",
    "servingUnit": "1 uttapam (130g)",
    "servingWeightGrams": 130,
    "calories": 220,
    "protein": 5.2,
    "carbs": 36,
    "fats": 6.5,
    "category": "South Indian",
    "aliases": [
      "onion uthappam",
      "vengaya uthappam"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 235,
    "name": "Tomato Onion Uttapam",
    "servingUnit": "1 uttapam (140g)",
    "servingWeightGrams": 140,
    "calories": 225,
    "protein": 5.4,
    "carbs": 37,
    "fats": 6.5,
    "category": "South Indian",
    "aliases": [
      "tomato uthappam",
      "vegetable uttapam"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 236,
    "name": "Mix Veg Uttapam",
    "servingUnit": "1 uttapam (150g)",
    "servingWeightGrams": 150,
    "calories": 235,
    "protein": 6,
    "carbs": 38,
    "fats": 6.8,
    "category": "South Indian",
    "aliases": [
      "carrot capsicum onion uttapam"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 237,
    "name": "Rava Upma (Sooji Upma)",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 240,
    "protein": 5.8,
    "carbs": 38,
    "fats": 7.2,
    "category": "South Indian",
    "aliases": [
      "uppittu",
      "sooji upma",
      "rava khichdi south"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 238,
    "name": "Tomato Upma (Rava Bath)",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 230,
    "protein": 5.2,
    "carbs": 37,
    "fats": 6.8,
    "category": "South Indian",
    "aliases": [
      "thakkali upma",
      "tomato bath semolina"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 239,
    "name": "Vermicelli Upma (Semiya Upma)",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 230,
    "protein": 5.5,
    "carbs": 38,
    "fats": 6.5,
    "category": "South Indian",
    "aliases": [
      "semiya upma",
      "seviyan upma with vegetables"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 240,
    "name": "Wheat Rava Upma (Daliya Upma)",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 210,
    "protein": 6.8,
    "carbs": 36,
    "fats": 4.8,
    "category": "South Indian",
    "aliases": [
      "broken wheat upma",
      "godhumai rava upma"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 241,
    "name": "Oats Upma (Vegetable)",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 200,
    "protein": 7.2,
    "carbs": 32,
    "fats": 5,
    "category": "South Indian",
    "aliases": [
      "healthy oats upma with vegetables"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 242,
    "name": "Kuzhi Paniyaram (Savory / Masala)",
    "servingUnit": "4 pieces (120g)",
    "servingWeightGrams": 120,
    "calories": 210,
    "protein": 5.2,
    "carbs": 34,
    "fats": 6,
    "category": "South Indian",
    "aliases": [
      "paddu",
      "appe",
      "savory rice balls",
      "guntha ponganalu"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 243,
    "name": "Sweet Paniyaram (Jaggery)",
    "servingUnit": "4 pieces (120g)",
    "servingWeightGrams": 120,
    "calories": 260,
    "protein": 4,
    "carbs": 52,
    "fats": 4,
    "category": "South Indian",
    "aliases": [
      "vellam paniyaram",
      "sweet appe",
      "sweet unniyappam style"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 244,
    "name": "Unniyappam (Kerala Rice Jaggery Fritters)",
    "servingUnit": "3 pieces (90g)",
    "servingWeightGrams": 90,
    "calories": 270,
    "protein": 3.5,
    "carbs": 48,
    "fats": 7.5,
    "category": "South Indian",
    "aliases": [
      "kerala banana jaggery fritters",
      "neyyappam"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 245,
    "name": "Poori Masala (South Indian Potato Sagoo)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 140,
    "protein": 3.2,
    "carbs": 22,
    "fats": 4.5,
    "category": "South Indian",
    "aliases": [
      "potato bhaji for poori",
      "kizhangu masala",
      "bombay sagu"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 246,
    "name": "Ragi Dosa",
    "servingUnit": "1 dosa (90g)",
    "servingWeightGrams": 90,
    "calories": 170,
    "protein": 4.5,
    "carbs": 31,
    "fats": 3.2,
    "category": "South Indian",
    "aliases": [
      "finger millet crepe",
      "nachni dosa"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 247,
    "name": "Ragi Mudde (Finger Millet Ball)",
    "servingUnit": "1 ball (150g)",
    "servingWeightGrams": 150,
    "calories": 230,
    "protein": 5.5,
    "carbs": 48,
    "fats": 1.8,
    "category": "South Indian",
    "aliases": [
      "ragi sangati",
      "karnataka ragi ball",
      "millet dumpling"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 248,
    "name": "Puttu (Steamed Rice Cake with Coconut)",
    "servingUnit": "1 piece/cylinder (120g)",
    "servingWeightGrams": 120,
    "calories": 230,
    "protein": 4.5,
    "carbs": 45,
    "fats": 3.8,
    "category": "South Indian",
    "aliases": [
      "ariputtu",
      "kerala puttu",
      "steamed rice flour cylinder"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 249,
    "name": "Ragi Puttu",
    "servingUnit": "1 piece (120g)",
    "servingWeightGrams": 120,
    "calories": 220,
    "protein": 5.8,
    "carbs": 44,
    "fats": 3.2,
    "category": "South Indian",
    "aliases": [
      "finger millet puttu",
      "healthy ragi puttu"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 250,
    "name": "Egg Dosa (Muttai Dosa)",
    "servingUnit": "1 dosa (140g)",
    "servingWeightGrams": 140,
    "calories": 260,
    "protein": 9.8,
    "carbs": 29,
    "fats": 11.5,
    "category": "South Indian",
    "aliases": [
      "muttai dosa",
      "anda dosa",
      "egg crepe"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 251,
    "name": "Kanda Poha (with Peanuts)",
    "servingUnit": "1 plate (180g)",
    "servingWeightGrams": 180,
    "calories": 250,
    "protein": 5.5,
    "carbs": 42,
    "fats": 7.2,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "onion poha",
      "maharashtrian kanda poha",
      "flattened rice with onions"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 252,
    "name": "Batata Poha (with Potatoes & Peanuts)",
    "servingUnit": "1 plate (200g)",
    "servingWeightGrams": 200,
    "calories": 280,
    "protein": 5.8,
    "carbs": 48,
    "fats": 7.8,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "aloo poha",
      "gujarati batata pauva",
      "potato flattened rice"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 253,
    "name": "Indori Poha (Steamed with Sev & Jeeravan)",
    "servingUnit": "1 plate (180g)",
    "servingWeightGrams": 180,
    "calories": 270,
    "protein": 6.2,
    "carbs": 45,
    "fats": 7.5,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "steamed indori poha",
      "mp style poha with sev"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 254,
    "name": "Besan Chilla (Cheela)",
    "servingUnit": "1 chilla (80g)",
    "servingWeightGrams": 80,
    "calories": 165,
    "protein": 6.5,
    "carbs": 20,
    "fats": 6.8,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "gram flour savory pancake",
      "besan puda",
      "vegetable chilla"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 255,
    "name": "Moong Dal Chilla",
    "servingUnit": "1 chilla (80g)",
    "servingWeightGrams": 80,
    "calories": 155,
    "protein": 8.5,
    "carbs": 21,
    "fats": 4.5,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "moonglet",
      "yellow lentil pancake",
      "cheela"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 256,
    "name": "Paneer Stuffed Moong Dal Chilla",
    "servingUnit": "1 chilla (130g)",
    "servingWeightGrams": 130,
    "calories": 240,
    "protein": 14.5,
    "carbs": 22,
    "fats": 10.5,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "high protein moong chilla with paneer",
      "stuffed moonglet"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 257,
    "name": "Oats Chilla",
    "servingUnit": "1 chilla (80g)",
    "servingWeightGrams": 80,
    "calories": 150,
    "protein": 5.8,
    "carbs": 22,
    "fats": 4.5,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "oats savory pancake",
      "vegetable oats cheela"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 258,
    "name": "Sabudana Khichdi (with Peanuts & Potatoes)",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 340,
    "protein": 5.2,
    "carbs": 58,
    "fats": 10.5,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "tapioca pearl pilaf",
      "vrat sabudana khichdi"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 259,
    "name": "Sabudana Vada (2 pieces)",
    "servingUnit": "2 vadas (100g)",
    "servingWeightGrams": 100,
    "calories": 310,
    "protein": 4.8,
    "carbs": 42,
    "fats": 14,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "sago fritters",
      "vrat ka vada",
      "crispy sabudana patties"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 260,
    "name": "Bread Pakora (Potato Stuffed)",
    "servingUnit": "1 piece (120g)",
    "servingWeightGrams": 120,
    "calories": 280,
    "protein": 5.5,
    "carbs": 34,
    "fats": 14,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "aloo bread pakoda",
      "fried stuffed bread"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 261,
    "name": "Paneer Bread Pakora",
    "servingUnit": "1 piece (140g)",
    "servingWeightGrams": 140,
    "calories": 340,
    "protein": 10.5,
    "carbs": 32,
    "fats": 19,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "paneer stuffed bread fritter",
      "delhi bread pakoda"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 262,
    "name": "Chole Bhature (2 Bhature + Chole)",
    "servingUnit": "1 plate (350g)",
    "servingWeightGrams": 350,
    "calories": 680,
    "protein": 18,
    "carbs": 88,
    "fats": 28,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "punjabi chole bhature",
      "chana bhatura meal"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 263,
    "name": "Chole Kulche (2 Kulche + Matar)",
    "servingUnit": "1 plate (300g)",
    "servingWeightGrams": 300,
    "calories": 460,
    "protein": 16,
    "carbs": 76,
    "fats": 9.5,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "delhi matar kulcha",
      "street style chole kulche"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 264,
    "name": "Bedmi Poori with Aloo Sabzi",
    "servingUnit": "2 pooris with sabzi (250g)",
    "servingWeightGrams": 250,
    "calories": 450,
    "protein": 9.5,
    "carbs": 58,
    "fats": 20.5,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "urad dal poori with spicy aloo",
      "delhi bedmi aloo"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 265,
    "name": "Khaman Dhokla (Nylon Dhokla)",
    "servingUnit": "100g (2-3 pieces)",
    "servingWeightGrams": 100,
    "calories": 160,
    "protein": 5.5,
    "carbs": 26,
    "fats": 4,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "steamed besan cake",
      "gujarati khaman",
      "yellow dhokla"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 266,
    "name": "White Dhokla (Khatta Dhokla)",
    "servingUnit": "100g (2-3 pieces)",
    "servingWeightGrams": 100,
    "calories": 150,
    "protein": 4.8,
    "carbs": 28,
    "fats": 2.2,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "idada",
      "rice urad dhokla",
      "sour dhokla"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 267,
    "name": "Khandvi (Gram Flour Rolls)",
    "servingUnit": "100g (4 rolls)",
    "servingWeightGrams": 100,
    "calories": 140,
    "protein": 5.2,
    "carbs": 18,
    "fats": 5.5,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "patuli",
      "gujarati savory rolled snack",
      "tempered besan rolls"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 268,
    "name": "Handvo (Savory Lentil Veg Cake)",
    "servingUnit": "1 slice (100g)",
    "servingWeightGrams": 100,
    "calories": 190,
    "protein": 6.2,
    "carbs": 26,
    "fats": 6.8,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "gujarati baked lentil cake",
      "crispy handvo"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 269,
    "name": "Methi Muthiya (Steamed)",
    "servingUnit": "4 pieces (100g)",
    "servingWeightGrams": 100,
    "calories": 155,
    "protein": 5.5,
    "carbs": 23,
    "fats": 4.8,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "steamed fenugreek dumplings",
      "gujarati muthiya"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 270,
    "name": "Kothimbir Vadi (Steamed & Crisped)",
    "servingUnit": "4 pieces (100g)",
    "servingWeightGrams": 100,
    "calories": 180,
    "protein": 6.8,
    "carbs": 22,
    "fats": 7.5,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "coriander gram flour fritters",
      "maharashtrian kothimbir vadi"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 271,
    "name": "Alu Vadi (Patra / Colocasia Roll)",
    "servingUnit": "4 slices (100g)",
    "servingWeightGrams": 100,
    "calories": 175,
    "protein": 5,
    "carbs": 24,
    "fats": 6.8,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "patra",
      "taro leaves roll",
      "steamed colocasia roll"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 272,
    "name": "Misal Pav (with 2 Pav)",
    "servingUnit": "1 plate (300g)",
    "servingWeightGrams": 300,
    "calories": 440,
    "protein": 15,
    "carbs": 65,
    "fats": 14.5,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "puneri misal",
      "kolhapuri misal pav",
      "sprouted bean curry with bread"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 273,
    "name": "Pav Bhaji (with 2 Buttered Pav)",
    "servingUnit": "1 plate (320g)",
    "servingWeightGrams": 320,
    "calories": 480,
    "protein": 10,
    "carbs": 68,
    "fats": 19,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "mumbai pav bhaji",
      "spiced mashed vegetable with dinner rolls"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 274,
    "name": "Vada Pav",
    "servingUnit": "1 piece (120g)",
    "servingWeightGrams": 120,
    "calories": 290,
    "protein": 6,
    "carbs": 42,
    "fats": 11,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "mumbai burger",
      "batata vada pav",
      "spicy potato slider"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 275,
    "name": "Sweet Milk Daliya (Porridge)",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 220,
    "protein": 7,
    "carbs": 41,
    "fats": 3.5,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "sweet broken wheat porridge with milk",
      "meetha daliya"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 276,
    "name": "Litti Chokha (2 Litti with Chokha)",
    "servingUnit": "1 plate (280g)",
    "servingWeightGrams": 280,
    "calories": 460,
    "protein": 16.5,
    "carbs": 72,
    "fats": 12.5,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "bihari litti chokha",
      "roasted sattu wheat balls with baingan bharta"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 277,
    "name": "Sattu Drink (Namkeen / Savory)",
    "servingUnit": "1 glass (250ml)",
    "servingWeightGrams": 250,
    "calories": 140,
    "protein": 7.8,
    "carbs": 22,
    "fats": 1.8,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "bihari sattu ghol",
      "roasted gram flour cooler with roasted cumin and lime"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 278,
    "name": "Sattu Drink (Meetha / Sweet with Jaggery)",
    "servingUnit": "1 glass (250ml)",
    "servingWeightGrams": 250,
    "calories": 180,
    "protein": 7.5,
    "carbs": 34,
    "fats": 1.8,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "sweet sattu sharbat",
      "sattu with gud"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 279,
    "name": "Poha Cutlet (2 pieces)",
    "servingUnit": "2 pieces (100g)",
    "servingWeightGrams": 100,
    "calories": 210,
    "protein": 4.8,
    "carbs": 32,
    "fats": 7.5,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "flattened rice patties",
      "crispy poha tikki"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 280,
    "name": "Vegetable Cutlet (Tawa Fried, 2 pieces)",
    "servingUnit": "2 pieces (110g)",
    "servingWeightGrams": 110,
    "calories": 190,
    "protein": 4.2,
    "carbs": 28,
    "fats": 6.8,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "veg tikki",
      "potato beet vegetable patty",
      "railway cutlet"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 281,
    "name": "Sprouted Moong Chaat",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 130,
    "protein": 9.5,
    "carbs": 20,
    "fats": 1.5,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "healthy sprouts chaat with onion and lemon",
      "ankurit moong chaat"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 282,
    "name": "Boiled Egg Sandwich (Whole Wheat, 1 sandwich)",
    "servingUnit": "1 sandwich (140g)",
    "servingWeightGrams": 140,
    "calories": 260,
    "protein": 14,
    "carbs": 28,
    "fats": 10,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "anda sandwich",
      "egg mayo sandwich indian style"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 283,
    "name": "Paneer Bhurji Sandwich (Grilled)",
    "servingUnit": "1 sandwich (160g)",
    "servingWeightGrams": 160,
    "calories": 330,
    "protein": 15,
    "carbs": 30,
    "fats": 16.5,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "scrambled cottage cheese sandwich",
      "grilled paneer toast"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 284,
    "name": "Veg Grilled Sandwich (Bombay Style)",
    "servingUnit": "1 sandwich (160g)",
    "servingWeightGrams": 160,
    "calories": 260,
    "protein": 5.5,
    "carbs": 38,
    "fats": 9.5,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "bombay toast sandwich with green chutney potato cucumber"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 285,
    "name": "Upma with Coconut Chutney",
    "servingUnit": "1 plate (200g)",
    "servingWeightGrams": 200,
    "calories": 290,
    "protein": 6.5,
    "carbs": 42,
    "fats": 10.5,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "rava upma with fresh coconut dip"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 286,
    "name": "Sooji Toast (Rava Toast)",
    "servingUnit": "2 slices (120g)",
    "servingWeightGrams": 120,
    "calories": 230,
    "protein": 6.5,
    "carbs": 34,
    "fats": 7.8,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "bread toast with semolina curd topping",
      "rava bread toast"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 287,
    "name": "Masala Oats (Vegetable)",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 180,
    "protein": 6.8,
    "carbs": 28,
    "fats": 4.5,
    "category": "Breakfast & Everyday Meals",
    "aliases": [
      "homestyle vegetable masala oats",
      "saffola style masala oats"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 288,
    "name": "Low Fat Paneer",
    "servingUnit": "100g",
    "servingWeightGrams": 100,
    "calories": 180,
    "protein": 24,
    "carbs": 4,
    "fats": 7,
    "category": "Dairy & Paneer",
    "aliases": [
      "skimmed milk paneer",
      "diet paneer",
      "high protein low fat paneer"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 289,
    "name": "Paneer Bhurji (Scrambled)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 290,
    "protein": 16.5,
    "carbs": 7,
    "fats": 22,
    "category": "Dairy & Paneer",
    "aliases": [
      "scrambled cottage cheese with onion tomato spices",
      "sukhi paneer bhurji"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 290,
    "name": "Paneer Tikka (Grilled / Tandoori)",
    "servingUnit": "6 pieces (150g)",
    "servingWeightGrams": 150,
    "calories": 270,
    "protein": 17,
    "carbs": 8,
    "fats": 19,
    "category": "Dairy & Paneer",
    "aliases": [
      "roasted paneer skewers",
      "tandoori paneer tikka dry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 291,
    "name": "Malai Paneer Tikka",
    "servingUnit": "6 pieces (160g)",
    "servingWeightGrams": 160,
    "calories": 340,
    "protein": 16.5,
    "carbs": 9,
    "fats": 27,
    "category": "Dairy & Paneer",
    "aliases": [
      "creamy mild cashew marinated paneer tikka"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 292,
    "name": "Raw Tofu (Firm)",
    "servingUnit": "100g",
    "servingWeightGrams": 100,
    "calories": 83,
    "protein": 10,
    "carbs": 2,
    "fats": 4.8,
    "category": "Dairy & Paneer",
    "aliases": [
      "soya paneer",
      "soybean curd",
      "bean curd"
    ],
    "isEstimate": false,
    "source": "USDA / Standard Soy Reference"
  },
  {
    "id": 293,
    "name": "Tofu Bhurji (Scrambled Tofu)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 160,
    "protein": 12.5,
    "carbs": 6,
    "fats": 9.5,
    "category": "Dairy & Paneer",
    "aliases": [
      "vegan scrambled paneer",
      "spiced scrambled tofu with turmeric"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 294,
    "name": "Soya Chunks (Dry Raw)",
    "servingUnit": "50g dry",
    "servingWeightGrams": 50,
    "calories": 172,
    "protein": 26,
    "carbs": 16.5,
    "fats": 0.5,
    "category": "Dairy & Paneer",
    "aliases": [
      "nutrela dry",
      "defatted soy flour chunks",
      "soya bari dry"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 295,
    "name": "Soya Chunks (Boiled & Squeezed)",
    "servingUnit": "100g boiled",
    "servingWeightGrams": 100,
    "calories": 110,
    "protein": 17,
    "carbs": 10,
    "fats": 0.5,
    "category": "Dairy & Paneer",
    "aliases": [
      "hydrated mealmaker",
      "boiled nutrela chunks"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 296,
    "name": "Soya Chaap (Boiled / Raw)",
    "servingUnit": "100g",
    "servingWeightGrams": 100,
    "calories": 160,
    "protein": 16,
    "carbs": 14,
    "fats": 4,
    "category": "Dairy & Paneer",
    "aliases": [
      "soya chap sticks",
      "vegetarian meat substitute stick"
    ],
    "isEstimate": true,
    "source": "Commercial Formulation / Standard Reference"
  },
  {
    "id": 297,
    "name": "Tandoori Soya Chaap (Dry)",
    "servingUnit": "1 plate (150g)",
    "servingWeightGrams": 150,
    "calories": 260,
    "protein": 18,
    "carbs": 18,
    "fats": 13,
    "category": "Dairy & Paneer",
    "aliases": [
      "roasted soya chaap dry",
      "spiced grilled soya sticks"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 298,
    "name": "Afghani / Malai Soya Chaap",
    "servingUnit": "1 plate (160g)",
    "servingWeightGrams": 160,
    "calories": 340,
    "protein": 16.5,
    "carbs": 20,
    "fats": 22,
    "category": "Dairy & Paneer",
    "aliases": [
      "creamy white soya chaap with cream and cashew"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 299,
    "name": "Buffalo Milk (Full Cream)",
    "servingUnit": "1 cup (200ml)",
    "servingWeightGrams": 206,
    "calories": 195,
    "protein": 8.5,
    "carbs": 10.2,
    "fats": 13.5,
    "category": "Dairy & Paneer",
    "aliases": [
      "bhains ka doodh",
      "full fat buffalo milk"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 300,
    "name": "Toned Milk (3% Fat)",
    "servingUnit": "1 cup (200ml)",
    "servingWeightGrams": 204,
    "calories": 118,
    "protein": 6.4,
    "carbs": 9.6,
    "fats": 6,
    "category": "Dairy & Paneer",
    "aliases": [
      "amul taaza",
      "blue packet milk",
      "single toned milk"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 301,
    "name": "Double Toned / Skimmed Milk (1.5% Fat)",
    "servingUnit": "1 cup (200ml)",
    "servingWeightGrams": 204,
    "calories": 70,
    "protein": 6.8,
    "carbs": 10,
    "fats": 0.3,
    "category": "Dairy & Paneer",
    "aliases": [
      "amul slim n trim",
      "fat free milk",
      "yellow packet milk"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 302,
    "name": "Low Fat Curd / Skimmed Dahi",
    "servingUnit": "100g",
    "servingWeightGrams": 100,
    "calories": 45,
    "protein": 4.2,
    "carbs": 5.2,
    "fats": 0.8,
    "category": "Dairy & Paneer",
    "aliases": [
      "toned milk curd",
      "slim dahi",
      "low fat yogurt"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 303,
    "name": "Hung Curd (Greek Style / Chakka)",
    "servingUnit": "100g",
    "servingWeightGrams": 100,
    "calories": 135,
    "protein": 9.5,
    "carbs": 5,
    "fats": 8.5,
    "category": "Dairy & Paneer",
    "aliases": [
      "chakka",
      "strained yogurt",
      "shrikhand base"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 304,
    "name": "Mishti Doi (Sweetened Curd)",
    "servingUnit": "100g",
    "servingWeightGrams": 100,
    "calories": 145,
    "protein": 3.5,
    "carbs": 22,
    "fats": 4.8,
    "category": "Dairy & Paneer",
    "aliases": [
      "bengali sweet yogurt with caramelized jaggery / sugar",
      "mitha dahi"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 305,
    "name": "Chaas (Plain Buttermilk)",
    "servingUnit": "1 glass (200ml)",
    "servingWeightGrams": 200,
    "calories": 35,
    "protein": 2,
    "carbs": 3.2,
    "fats": 1.5,
    "category": "Dairy & Paneer",
    "aliases": [
      "mor",
      "majjiga",
      "mattha",
      "churned diluted curd water"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 306,
    "name": "Masala Chaas (Spiced Buttermilk)",
    "servingUnit": "1 glass (200ml)",
    "servingWeightGrams": 200,
    "calories": 45,
    "protein": 2.2,
    "carbs": 4.5,
    "fats": 1.8,
    "category": "Dairy & Paneer",
    "aliases": [
      "spiced buttermilk with roasted cumin ginger green chili",
      "sambharam"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 307,
    "name": "Sweet Lassi (Traditional)",
    "servingUnit": "1 glass (250ml)",
    "servingWeightGrams": 250,
    "calories": 220,
    "protein": 6.5,
    "carbs": 34,
    "fats": 6.8,
    "category": "Dairy & Paneer",
    "aliases": [
      "punjabi sweet lassi",
      "meethi lassi with malai"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 308,
    "name": "Mango Lassi",
    "servingUnit": "1 glass (250ml)",
    "servingWeightGrams": 250,
    "calories": 250,
    "protein": 6,
    "carbs": 42,
    "fats": 6.5,
    "category": "Dairy & Paneer",
    "aliases": [
      "aam lassi",
      "yogurt mango smoothie"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 309,
    "name": "Desi Ghee (Clarified Butter)",
    "servingUnit": "1 tsp (5g)",
    "servingWeightGrams": 5,
    "calories": 45,
    "protein": 0,
    "carbs": 0,
    "fats": 5,
    "category": "Dairy & Paneer",
    "aliases": [
      "cow ghee",
      "shuddh ghee",
      "clarified butter fat"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 310,
    "name": "White Butter (Makhan)",
    "servingUnit": "1 tbsp (14g)",
    "servingWeightGrams": 14,
    "calories": 105,
    "protein": 0.1,
    "carbs": 0.1,
    "fats": 11.8,
    "category": "Dairy & Paneer",
    "aliases": [
      "safed makhan",
      "homestyle churned butter",
      "krishna makhan"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 311,
    "name": "Roasted Peanuts (Salted / Plain)",
    "servingUnit": "30g (handful)",
    "servingWeightGrams": 30,
    "calories": 175,
    "protein": 7.8,
    "carbs": 4.8,
    "fats": 14.8,
    "category": "Nuts, Seeds & Healthy Fats",
    "aliases": [
      "bhuni mungfali",
      "peanuts with skin",
      "shengdana"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 312,
    "name": "Roasted Chana with Peel (Bhuna Chana)",
    "servingUnit": "50g",
    "servingWeightGrams": 50,
    "calories": 180,
    "protein": 11.5,
    "carbs": 28,
    "fats": 2.8,
    "category": "Nuts, Seeds & Healthy Fats",
    "aliases": [
      "roasted black chickpeas with skin",
      "futana",
      "chana dry snack"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 313,
    "name": "Cashews (Kaju Raw / Plain)",
    "servingUnit": "10 cashews (15g)",
    "servingWeightGrams": 15,
    "calories": 85,
    "protein": 2.7,
    "carbs": 4.5,
    "fats": 6.8,
    "category": "Nuts, Seeds & Healthy Fats",
    "aliases": [
      "kaju",
      "plain cashews"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 314,
    "name": "Walnuts (Akhrot Halves)",
    "servingUnit": "4 halves (14g)",
    "servingWeightGrams": 14,
    "calories": 95,
    "protein": 2.1,
    "carbs": 1.9,
    "fats": 9.2,
    "category": "Nuts, Seeds & Healthy Fats",
    "aliases": [
      "akhrot",
      "walnut kernels",
      "brain nuts"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 315,
    "name": "Pistachios (Pista Shelled)",
    "servingUnit": "20 pieces (15g)",
    "servingWeightGrams": 15,
    "calories": 84,
    "protein": 3,
    "carbs": 4.2,
    "fats": 6.7,
    "category": "Nuts, Seeds & Healthy Fats",
    "aliases": [
      "pista",
      "plain pistachios unsalted"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 316,
    "name": "White Sesame Seeds (Til)",
    "servingUnit": "1 tbsp (10g)",
    "servingWeightGrams": 10,
    "calories": 58,
    "protein": 1.8,
    "carbs": 2.3,
    "fats": 5,
    "category": "Nuts, Seeds & Healthy Fats",
    "aliases": [
      "safed til",
      "sesame seeds raw"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 317,
    "name": "Flax Seeds (Alsi)",
    "servingUnit": "1 tbsp (10g)",
    "servingWeightGrams": 10,
    "calories": 53,
    "protein": 1.8,
    "carbs": 2.9,
    "fats": 4.2,
    "category": "Nuts, Seeds & Healthy Fats",
    "aliases": [
      "alsi seeds",
      "roasted flaxseed powder"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 318,
    "name": "Chia Seeds (Sabja / Basil Seeds)",
    "servingUnit": "1 tbsp (12g)",
    "servingWeightGrams": 12,
    "calories": 58,
    "protein": 2,
    "carbs": 5,
    "fats": 3.8,
    "category": "Nuts, Seeds & Healthy Fats",
    "aliases": [
      "sabja seeds",
      "falooda seeds",
      "soaked basil seeds"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 319,
    "name": "Besan (Bengal Gram Flour)",
    "servingUnit": "100g raw",
    "servingWeightGrams": 100,
    "calories": 387,
    "protein": 22,
    "carbs": 58,
    "fats": 6.7,
    "category": "Dairy & Paneer",
    "aliases": [
      "chickpea flour",
      "chana atta",
      "gram flour"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 320,
    "name": "Sattu Flour (Roasted Bengal Gram Flour)",
    "servingUnit": "100g raw",
    "servingWeightGrams": 100,
    "calories": 395,
    "protein": 24,
    "carbs": 60,
    "fats": 5.5,
    "category": "Dairy & Paneer",
    "aliases": [
      "chana sattu",
      "roasted gram powder bihari sattu"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 321,
    "name": "Boiled Egg White",
    "servingUnit": "1 egg white (33g)",
    "servingWeightGrams": 33,
    "calories": 17,
    "protein": 3.6,
    "carbs": 0.2,
    "fats": 0.1,
    "category": "Eggs & Poultry",
    "aliases": [
      "ande ki safedi",
      "egg white boiled",
      "pure egg white protein"
    ],
    "isEstimate": false,
    "source": "USDA / ICMR-NIN IFCT"
  },
  {
    "id": 322,
    "name": "Plain Egg Omelette (2 Eggs)",
    "servingUnit": "2 egg omelette (110g)",
    "servingWeightGrams": 110,
    "calories": 195,
    "protein": 12.6,
    "carbs": 1.2,
    "fats": 15.5,
    "category": "Eggs & Poultry",
    "aliases": [
      "plain double egg omelette",
      "fried eggs"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 323,
    "name": "Indian Masala Omelette (2 Eggs)",
    "servingUnit": "1 omelette (140g)",
    "servingWeightGrams": 140,
    "calories": 220,
    "protein": 13.5,
    "carbs": 4.5,
    "fats": 16.5,
    "category": "Eggs & Poultry",
    "aliases": [
      "street style double egg masala omelette with onions green chili",
      "anda omelette"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 324,
    "name": "Cheese Omelette (2 Eggs)",
    "servingUnit": "1 omelette (140g)",
    "servingWeightGrams": 140,
    "calories": 280,
    "protein": 17,
    "carbs": 2,
    "fats": 22.5,
    "category": "Eggs & Poultry",
    "aliases": [
      "double egg cheese omelette"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 325,
    "name": "Egg Bhurji (2 Eggs Scrambled)",
    "servingUnit": "1 plate (150g)",
    "servingWeightGrams": 150,
    "calories": 230,
    "protein": 13.8,
    "carbs": 5.5,
    "fats": 16.8,
    "category": "Eggs & Poultry",
    "aliases": [
      "anda bhurji",
      "spiced scrambled eggs with onions tomatoes",
      "mumbai egg bhurji"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 326,
    "name": "Egg Curry (Homestyle, 2 Eggs + Gravy)",
    "servingUnit": "1 bowl (220g)",
    "servingWeightGrams": 220,
    "calories": 260,
    "protein": 14.5,
    "carbs": 12,
    "fats": 17,
    "category": "Eggs & Poultry",
    "aliases": [
      "punjabi anda curry",
      "tariwala anda curry",
      "egg gravy"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 327,
    "name": "Chettinad Egg Curry",
    "servingUnit": "1 bowl (220g)",
    "servingWeightGrams": 220,
    "calories": 275,
    "protein": 15,
    "carbs": 13,
    "fats": 18,
    "category": "Eggs & Poultry",
    "aliases": [
      "spicy roasted pepper egg gravy",
      "muttai kulambu"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 328,
    "name": "Kolhapuri Egg Curry",
    "servingUnit": "1 bowl (220g)",
    "servingWeightGrams": 220,
    "calories": 290,
    "protein": 14.8,
    "carbs": 12,
    "fats": 20,
    "category": "Eggs & Poultry",
    "aliases": [
      "spicy red kolhapuri anda rassa"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 329,
    "name": "Kerala Egg Roast (Muttai Roast)",
    "servingUnit": "2 eggs in roast onion masala (180g)",
    "servingWeightGrams": 180,
    "calories": 250,
    "protein": 14,
    "carbs": 14,
    "fats": 15.5,
    "category": "Eggs & Poultry",
    "aliases": [
      "muttai roast",
      "appam egg roast",
      "caramelized onion egg roast"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 330,
    "name": "Egg Fried Rice",
    "servingUnit": "1 plate (250g)",
    "servingWeightGrams": 250,
    "calories": 380,
    "protein": 14.5,
    "carbs": 52,
    "fats": 12.5,
    "category": "Eggs & Poultry",
    "aliases": [
      "desi chinese egg fried rice",
      "anda chawal"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 331,
    "name": "Single Egg Roll (Kathi Roll)",
    "servingUnit": "1 roll (150g)",
    "servingWeightGrams": 150,
    "calories": 320,
    "protein": 11,
    "carbs": 42,
    "fats": 12,
    "category": "Eggs & Poultry",
    "aliases": [
      "kolkata single egg roll",
      "paratha egg roll"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 332,
    "name": "Boiled Chicken Breast (Boneless)",
    "servingUnit": "100g boiled",
    "servingWeightGrams": 100,
    "calories": 155,
    "protein": 32,
    "carbs": 0,
    "fats": 2.8,
    "category": "Eggs & Poultry",
    "aliases": [
      "steamed chicken breast",
      "boiled shredded chicken"
    ],
    "isEstimate": false,
    "source": "USDA / Standard Poultry Reference"
  },
  {
    "id": 333,
    "name": "Grilled Chicken Breast (Olive Oil)",
    "servingUnit": "150g grilled",
    "servingWeightGrams": 150,
    "calories": 250,
    "protein": 45,
    "carbs": 0.5,
    "fats": 7,
    "category": "Eggs & Poultry",
    "aliases": [
      "pan seared chicken breast",
      "gym grilled chicken"
    ],
    "isEstimate": false,
    "source": "USDA / Standard Poultry Reference"
  },
  {
    "id": 334,
    "name": "Tandoori Chicken (Quarter Leg)",
    "servingUnit": "1 leg piece (160g)",
    "servingWeightGrams": 160,
    "calories": 260,
    "protein": 30,
    "carbs": 3.5,
    "fats": 13.5,
    "category": "Eggs & Poultry",
    "aliases": [
      "roasted tandoori chicken leg",
      "tandoori murgh"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 335,
    "name": "Chicken Tikka (Dry, 6 Pieces)",
    "servingUnit": "6 pieces (150g)",
    "servingWeightGrams": 150,
    "calories": 230,
    "protein": 32,
    "carbs": 4,
    "fats": 9.5,
    "category": "Eggs & Poultry",
    "aliases": [
      "tandoori chicken tikka boneless",
      "murgh tikka"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 336,
    "name": "Chicken Reshmi Kebab (6 Pieces)",
    "servingUnit": "6 pieces (150g)",
    "servingWeightGrams": 150,
    "calories": 270,
    "protein": 31,
    "carbs": 4.5,
    "fats": 14,
    "category": "Eggs & Poultry",
    "aliases": [
      "silky boneless chicken kebab marinated with cashew and egg"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 337,
    "name": "Murgh Malai Tikka (6 Pieces)",
    "servingUnit": "6 pieces (160g)",
    "servingWeightGrams": 160,
    "calories": 320,
    "protein": 30,
    "carbs": 5,
    "fats": 20,
    "category": "Eggs & Poultry",
    "aliases": [
      "cream cheese marinated chicken tikka",
      "malai kebab"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 338,
    "name": "Chicken Seekh Kebab (2 Skewers)",
    "servingUnit": "2 skewers (120g)",
    "servingWeightGrams": 120,
    "calories": 220,
    "protein": 22,
    "carbs": 4,
    "fats": 12.5,
    "category": "Eggs & Poultry",
    "aliases": [
      "minced chicken kebab skewers",
      "chicken seekh"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 339,
    "name": "Homestyle Chicken Curry (Tariwala)",
    "servingUnit": "1 bowl (250g with 2 pcs)",
    "servingWeightGrams": 250,
    "calories": 310,
    "protein": 26,
    "carbs": 10,
    "fats": 18,
    "category": "Eggs & Poultry",
    "aliases": [
      "tariwala chicken",
      "punjabi chicken curry",
      "murgh tariwala"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 340,
    "name": "Butter Chicken (Murgh Makhani)",
    "servingUnit": "1 bowl (250g)",
    "servingWeightGrams": 250,
    "calories": 440,
    "protein": 26,
    "carbs": 16,
    "fats": 30,
    "category": "Eggs & Poultry",
    "aliases": [
      "murgh makhani",
      "delhi butter chicken with cream and butter"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 341,
    "name": "Kadai Chicken",
    "servingUnit": "1 bowl (250g)",
    "servingWeightGrams": 250,
    "calories": 350,
    "protein": 28,
    "carbs": 12,
    "fats": 21,
    "category": "Eggs & Poultry",
    "aliases": [
      "karahi murgh",
      "chicken capsicum wok curry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 342,
    "name": "Chicken Chettinad",
    "servingUnit": "1 bowl (250g)",
    "servingWeightGrams": 250,
    "calories": 340,
    "protein": 29,
    "carbs": 11,
    "fats": 20,
    "category": "Eggs & Poultry",
    "aliases": [
      "spicy roasted black pepper chicken curry",
      "tamil nadu chicken curry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 343,
    "name": "Kerala Chicken Roast",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 320,
    "protein": 27,
    "carbs": 12,
    "fats": 18,
    "category": "Eggs & Poultry",
    "aliases": [
      "kozhi roast",
      "kerala style semi dry chicken masala with coconut oil"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 344,
    "name": "Andhra Chili Chicken (Dry)",
    "servingUnit": "1 plate (180g)",
    "servingWeightGrams": 180,
    "calories": 290,
    "protein": 30,
    "carbs": 8,
    "fats": 15,
    "category": "Eggs & Poultry",
    "aliases": [
      "green chili spicy chicken fry",
      "nagarjuna style chili chicken"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 345,
    "name": "Chicken Sukka (Kori Sukka / Mangalorean)",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 330,
    "protein": 28,
    "carbs": 10,
    "fats": 19.5,
    "category": "Eggs & Poultry",
    "aliases": [
      "mangalorean dry chicken with roasted grated coconut",
      "kori ajadina"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 346,
    "name": "Chicken 65 (South Indian Crispy)",
    "servingUnit": "1 plate (150g)",
    "servingWeightGrams": 150,
    "calories": 340,
    "protein": 25,
    "carbs": 18,
    "fats": 19,
    "category": "Eggs & Poultry",
    "aliases": [
      "fried spiced boneless chicken 65 with curry leaves and green chili"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 347,
    "name": "Chicken Saagwala (Palak Chicken)",
    "servingUnit": "1 bowl (250g)",
    "servingWeightGrams": 250,
    "calories": 290,
    "protein": 28,
    "carbs": 9,
    "fats": 15.5,
    "category": "Eggs & Poultry",
    "aliases": [
      "spinach chicken curry",
      "murgh saagwala"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 348,
    "name": "Chicken Korma (Shahi Murgh Korma)",
    "servingUnit": "1 bowl (250g)",
    "servingWeightGrams": 250,
    "calories": 420,
    "protein": 26,
    "carbs": 15,
    "fats": 28.5,
    "category": "Eggs & Poultry",
    "aliases": [
      "cashew yogurt rich chicken korma"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 349,
    "name": "Chicken Do Pyaza",
    "servingUnit": "1 bowl (250g)",
    "servingWeightGrams": 250,
    "calories": 340,
    "protein": 27,
    "carbs": 14,
    "fats": 19.5,
    "category": "Eggs & Poultry",
    "aliases": [
      "chicken curry with chunky caramelized onions"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 350,
    "name": "Chicken Keema Matar (Minced Chicken)",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 280,
    "protein": 26,
    "carbs": 12,
    "fats": 14,
    "category": "Eggs & Poultry",
    "aliases": [
      "minced chicken with green peas",
      "qeema matar"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 351,
    "name": "Chicken Kathi Roll",
    "servingUnit": "1 roll (180g)",
    "servingWeightGrams": 180,
    "calories": 380,
    "protein": 22,
    "carbs": 42,
    "fats": 14,
    "category": "Eggs & Poultry",
    "aliases": [
      "kolkata chicken kathi roll",
      "chicken wrap indian"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 352,
    "name": "Chicken Shawarma Roll (Indian Style)",
    "servingUnit": "1 roll (200g)",
    "servingWeightGrams": 200,
    "calories": 410,
    "protein": 24,
    "carbs": 44,
    "fats": 16,
    "category": "Eggs & Poultry",
    "aliases": [
      "rumali chicken shawarma with garlic mayonnaise"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 353,
    "name": "Chicken Clear Soup",
    "servingUnit": "1 bowl (220ml)",
    "servingWeightGrams": 220,
    "calories": 75,
    "protein": 10.5,
    "carbs": 3,
    "fats": 2,
    "category": "Eggs & Poultry",
    "aliases": [
      "healthy shredded chicken broth",
      "chicken shorba"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 354,
    "name": "Chicken Manchow Soup",
    "servingUnit": "1 bowl (220ml)",
    "servingWeightGrams": 220,
    "calories": 140,
    "protein": 9.5,
    "carbs": 16,
    "fats": 4.2,
    "category": "Eggs & Poultry",
    "aliases": [
      "desi chinese spicy chicken soup with crispy noodles"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 355,
    "name": "Chilli Chicken (Dry, Desi Chinese)",
    "servingUnit": "1 plate (180g)",
    "servingWeightGrams": 180,
    "calories": 310,
    "protein": 26,
    "carbs": 16,
    "fats": 15.5,
    "category": "Eggs & Poultry",
    "aliases": [
      "indo-chinese chili chicken dry with soy chili capsicum"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 356,
    "name": "Chilli Chicken (Gravy)",
    "servingUnit": "1 bowl (250g)",
    "servingWeightGrams": 250,
    "calories": 330,
    "protein": 24,
    "carbs": 22,
    "fats": 16,
    "category": "Eggs & Poultry",
    "aliases": [
      "indo chinese chili chicken in thick gravy"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 357,
    "name": "Chicken Fried Rice (Indian-Chinese)",
    "servingUnit": "1 plate (250g)",
    "servingWeightGrams": 250,
    "calories": 410,
    "protein": 21,
    "carbs": 55,
    "fats": 12,
    "category": "Eggs & Poultry",
    "aliases": [
      "desi chinese chicken rice with spring onions"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 358,
    "name": "Chicken Kolhapuri Gravy",
    "servingUnit": "1 bowl (250g)",
    "servingWeightGrams": 250,
    "calories": 370,
    "protein": 28,
    "carbs": 12,
    "fats": 23,
    "category": "Eggs & Poultry",
    "aliases": [
      "maharashtrian spicy tambda rassa style chicken curry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 359,
    "name": "Homestyle Mutton Curry",
    "servingUnit": "1 bowl (250g with 2 pcs)",
    "servingWeightGrams": 250,
    "calories": 380,
    "protein": 25,
    "carbs": 10,
    "fats": 26,
    "category": "Non-Vegetarian",
    "aliases": [
      "tariwala mutton",
      "gosht curry",
      "indian lamb curry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 360,
    "name": "Mutton Rogan Josh",
    "servingUnit": "1 bowl (250g)",
    "servingWeightGrams": 250,
    "calories": 410,
    "protein": 26,
    "carbs": 11,
    "fats": 29,
    "category": "Non-Vegetarian",
    "aliases": [
      "kashmiri mutton rogan josh with fennel and ratanjot",
      "lamb rogan josh"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 361,
    "name": "Mutton Korma",
    "servingUnit": "1 bowl (250g)",
    "servingWeightGrams": 250,
    "calories": 460,
    "protein": 25,
    "carbs": 14,
    "fats": 34,
    "category": "Non-Vegetarian",
    "aliases": [
      "shahi gosht korma",
      "mughlai mutton korma"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 362,
    "name": "Mutton Bhuna Gosht",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 390,
    "protein": 28,
    "carbs": 9,
    "fats": 27,
    "category": "Non-Vegetarian",
    "aliases": [
      "bhuna mutton",
      "slow roasted mutton in thick caramelized gravy"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 363,
    "name": "Mutton Sukka (Dry / Chukka)",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 360,
    "protein": 29,
    "carbs": 8,
    "fats": 24,
    "category": "Non-Vegetarian",
    "aliases": [
      "mutton chukka",
      "mangalorean mutton sukka with coconut"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 364,
    "name": "Mutton Keema Matar",
    "servingUnit": "1 bowl (200g)",
    "servingWeightGrams": 200,
    "calories": 340,
    "protein": 24,
    "carbs": 12,
    "fats": 22,
    "category": "Non-Vegetarian",
    "aliases": [
      "minced mutton with green peas",
      "mutton qeema"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 365,
    "name": "Mutton Seekh Kebab (2 Skewers)",
    "servingUnit": "2 skewers (120g)",
    "servingWeightGrams": 120,
    "calories": 270,
    "protein": 21,
    "carbs": 4,
    "fats": 19,
    "category": "Non-Vegetarian",
    "aliases": [
      "grilled minced mutton skewers",
      "gosht seekh"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 366,
    "name": "Mutton Galouti Kebab (2 Pieces)",
    "servingUnit": "2 pieces (100g)",
    "servingWeightGrams": 100,
    "calories": 260,
    "protein": 17,
    "carbs": 8,
    "fats": 18,
    "category": "Non-Vegetarian",
    "aliases": [
      "lucknowi melt in mouth minced lamb kebab"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 367,
    "name": "Mutton Paya Soup (Nalli Shorba)",
    "servingUnit": "1 bowl (250ml)",
    "servingWeightGrams": 250,
    "calories": 190,
    "protein": 16,
    "carbs": 4,
    "fats": 12,
    "category": "Non-Vegetarian",
    "aliases": [
      "trotter bone broth soup",
      "paya shorba"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 368,
    "name": "Laal Maas (Rajasthani Spicy Mutton)",
    "servingUnit": "1 bowl (250g)",
    "servingWeightGrams": 250,
    "calories": 430,
    "protein": 26,
    "carbs": 10,
    "fats": 32,
    "category": "Non-Vegetarian",
    "aliases": [
      "rajasthani mathania red chili mutton curry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 369,
    "name": "Kosha Mangsho (Bengali Slow Cooked Mutton)",
    "servingUnit": "1 bowl (250g)",
    "servingWeightGrams": 250,
    "calories": 450,
    "protein": 27,
    "carbs": 12,
    "fats": 33,
    "category": "Non-Vegetarian",
    "aliases": [
      "bengali rich dark mutton curry",
      "mutton kasha"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 370,
    "name": "Rohu Fish Curry (Bengali Macher Jhol)",
    "servingUnit": "1 bowl (220g with 1 fish slice)",
    "servingWeightGrams": 220,
    "calories": 210,
    "protein": 21,
    "carbs": 8,
    "fats": 10.5,
    "category": "Non-Vegetarian",
    "aliases": [
      "macher jhol",
      "light freshwater rohu fish stew with kalonji potato"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 371,
    "name": "Katla Fish Kalia (Bengali Macher Kalia)",
    "servingUnit": "1 bowl (240g with 1 large slice)",
    "servingWeightGrams": 240,
    "calories": 280,
    "protein": 23,
    "carbs": 11,
    "fats": 16,
    "category": "Non-Vegetarian",
    "aliases": [
      "rich carp fish curry with raisins and yogurt",
      "katla kalia"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 372,
    "name": "Pomfret Tawa Fry (Whole Fish)",
    "servingUnit": "1 whole fish (180g cooked)",
    "servingWeightGrams": 180,
    "calories": 270,
    "protein": 28,
    "carbs": 6,
    "fats": 15,
    "category": "Non-Vegetarian",
    "aliases": [
      "paplet fry",
      "spiced whole white pomfret shallow fry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 373,
    "name": "Surmai / Kingfish Fry (1 Slice)",
    "servingUnit": "1 slice (120g)",
    "servingWeightGrams": 120,
    "calories": 210,
    "protein": 24,
    "carbs": 4,
    "fats": 11,
    "category": "Non-Vegetarian",
    "aliases": [
      "seer fish fry",
      "vanjaram fry",
      "king mackerel tawa fry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 374,
    "name": "Fish Tikka (Tandoori, 6 Pieces)",
    "servingUnit": "6 pieces (150g)",
    "servingWeightGrams": 150,
    "calories": 195,
    "protein": 27,
    "carbs": 4,
    "fats": 7.5,
    "category": "Non-Vegetarian",
    "aliases": [
      "tandoori fish fillets grilled in clay oven"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 375,
    "name": "Amritsari Fish Fry",
    "servingUnit": "100g fried",
    "servingWeightGrams": 100,
    "calories": 220,
    "protein": 18,
    "carbs": 10,
    "fats": 12,
    "category": "Non-Vegetarian",
    "aliases": [
      "besan and ajwain battered fried sole fish"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 376,
    "name": "Goan Fish Curry (Coconut Milk Gravy)",
    "servingUnit": "1 bowl (240g)",
    "servingWeightGrams": 240,
    "calories": 280,
    "protein": 22,
    "carbs": 9,
    "fats": 17.5,
    "category": "Non-Vegetarian",
    "aliases": [
      "goan kodi",
      "tangy fish curry with kokum and fresh coconut milk"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 377,
    "name": "Malabar Fish Curry",
    "servingUnit": "1 bowl (240g)",
    "servingWeightGrams": 240,
    "calories": 260,
    "protein": 22,
    "carbs": 8,
    "fats": 15.5,
    "category": "Non-Vegetarian",
    "aliases": [
      "kerala fish curry with kudampuli and coconut oil",
      "meen curry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 378,
    "name": "Fish Pollichathu (Wrapped in Banana Leaf)",
    "servingUnit": "1 piece (180g)",
    "servingWeightGrams": 180,
    "calories": 250,
    "protein": 26,
    "carbs": 9,
    "fats": 12.5,
    "category": "Non-Vegetarian",
    "aliases": [
      "karimeen pollichathu",
      "pearl spot fish baked in banana leaf with shallots"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 379,
    "name": "Shorshe Ilish (Hilsa in Mustard Gravy)",
    "servingUnit": "1 bowl (220g with 1 fish slice)",
    "servingWeightGrams": 220,
    "calories": 350,
    "protein": 24,
    "carbs": 6,
    "fats": 26,
    "category": "Non-Vegetarian",
    "aliases": [
      "bengali hilsa fish in pungent mustard and green chili gravy"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 380,
    "name": "Chettinad Fish Curry (Meen Kulambu)",
    "servingUnit": "1 bowl (240g)",
    "servingWeightGrams": 240,
    "calories": 250,
    "protein": 23,
    "carbs": 10,
    "fats": 13,
    "category": "Non-Vegetarian",
    "aliases": [
      "spicy tamarind black pepper fish curry",
      "tamil nadu fish gravy"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 381,
    "name": "Grilled Basa Fish Fillet",
    "servingUnit": "150g grilled",
    "servingWeightGrams": 150,
    "calories": 160,
    "protein": 26,
    "carbs": 1,
    "fats": 5.5,
    "category": "Non-Vegetarian",
    "aliases": [
      "pan seared basa with lemon pepper and garlic"
    ],
    "isEstimate": false,
    "source": "USDA / Standard Seafood Reference"
  },
  {
    "id": 382,
    "name": "Prawn Curry (Malabar / Goan Coconut)",
    "servingUnit": "1 bowl (220g)",
    "servingWeightGrams": 220,
    "calories": 260,
    "protein": 21,
    "carbs": 9,
    "fats": 15.5,
    "category": "Non-Vegetarian",
    "aliases": [
      "chemmeen curry",
      "jhinga curry with coconut milk"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 383,
    "name": "Prawn Masala (Dry / Sukka)",
    "servingUnit": "1 bowl (180g)",
    "servingWeightGrams": 180,
    "calories": 240,
    "protein": 24,
    "carbs": 8,
    "fats": 12.5,
    "category": "Non-Vegetarian",
    "aliases": [
      "prawn roast",
      "jhinga masala fry",
      "royyala vepudu"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 384,
    "name": "Prawn Koliwada (Crispy Spiced Prawns)",
    "servingUnit": "1 plate (150g)",
    "servingWeightGrams": 150,
    "calories": 270,
    "protein": 22,
    "carbs": 16,
    "fats": 13,
    "category": "Non-Vegetarian",
    "aliases": [
      "mumbai fishermen style crispy fried prawns"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 385,
    "name": "Prawn Ghee Roast (Mangalorean)",
    "servingUnit": "1 plate (180g)",
    "servingWeightGrams": 180,
    "calories": 340,
    "protein": 23,
    "carbs": 8,
    "fats": 24,
    "category": "Non-Vegetarian",
    "aliases": [
      "kundanpur ghee roasted prawns with byadgi chili"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 386,
    "name": "Crab Masala Curry",
    "servingUnit": "1 bowl (250g with shells)",
    "servingWeightGrams": 250,
    "calories": 220,
    "protein": 22,
    "carbs": 10,
    "fats": 10,
    "category": "Non-Vegetarian",
    "aliases": [
      "nandu masala",
      "khekrache kalvan",
      "crab roast curry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 387,
    "name": "Squid Masala Fry (Calamari Roast)",
    "servingUnit": "1 plate (160g)",
    "servingWeightGrams": 160,
    "calories": 210,
    "protein": 24,
    "carbs": 8,
    "fats": 9.2,
    "category": "Non-Vegetarian",
    "aliases": [
      "koonthal roast",
      "kerala squid fry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 388,
    "name": "Bombay Duck Fry (Bombil Rava Fry, 2 pcs)",
    "servingUnit": "2 pieces (120g)",
    "servingWeightGrams": 120,
    "calories": 210,
    "protein": 19,
    "carbs": 10,
    "fats": 10.5,
    "category": "Non-Vegetarian",
    "aliases": [
      "crispy semolina coated bombil tawa fry",
      "bombil fry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 389,
    "name": "Fish Cutlet (Bengali / Kerala Style, 2 pcs)",
    "servingUnit": "2 pieces (120g)",
    "servingWeightGrams": 120,
    "calories": 240,
    "protein": 16,
    "carbs": 22,
    "fats": 10,
    "category": "Non-Vegetarian",
    "aliases": [
      "spiced minced fish patties crumb coated"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 390,
    "name": "Mutton Chop (Bengali Style Pan Fried, 1 pc)",
    "servingUnit": "1 piece (100g)",
    "servingWeightGrams": 100,
    "calories": 240,
    "protein": 15,
    "carbs": 16,
    "fats": 13,
    "category": "Non-Vegetarian",
    "aliases": [
      "kolkata street mutton chop with beetroot potato coating"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 391,
    "name": "Boiled Chicken Thigh (Skinless)",
    "servingUnit": "100g boiled",
    "servingWeightGrams": 100,
    "calories": 190,
    "protein": 24,
    "carbs": 0,
    "fats": 10,
    "category": "Non-Vegetarian",
    "aliases": [
      "chicken leg meat boiled without skin",
      "murgh leg piece boiled"
    ],
    "isEstimate": false,
    "source": "USDA / Standard Poultry Reference"
  },
  {
    "id": 392,
    "name": "Pani Puri (Golgappe / Puchka, 6 Pieces)",
    "servingUnit": "6 pieces with spiced water (180g)",
    "servingWeightGrams": 180,
    "calories": 180,
    "protein": 3.5,
    "carbs": 34,
    "fats": 3.5,
    "category": "Street Food & Snacks",
    "aliases": [
      "gol gappa",
      "puchka",
      "batasha",
      "gupchup",
      "water balls with mint potato filling"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 393,
    "name": "Sev Puri (6 Pieces)",
    "servingUnit": "6 pieces (150g)",
    "servingWeightGrams": 150,
    "calories": 240,
    "protein": 4.8,
    "carbs": 36,
    "fats": 9,
    "category": "Street Food & Snacks",
    "aliases": [
      "mumbai sev batata puri",
      "flat puri topped with potato onions chutneys and sev"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 394,
    "name": "Bhel Puri (Dry & Tangy)",
    "servingUnit": "1 plate (150g)",
    "servingWeightGrams": 150,
    "calories": 230,
    "protein": 5.5,
    "carbs": 42,
    "fats": 5,
    "category": "Street Food & Snacks",
    "aliases": [
      "mumbai bhelpuri",
      "puffed rice chaat with tamarind chutney"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 395,
    "name": "Dahi Puri (Dahi Batata Puri, 6 Pieces)",
    "servingUnit": "6 pieces with curd (200g)",
    "servingWeightGrams": 200,
    "calories": 280,
    "protein": 6.8,
    "carbs": 42,
    "fats": 9.8,
    "category": "Street Food & Snacks",
    "aliases": [
      "dahi batata puri",
      "sweet curd stuffed puris with sev and pomegranate"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 396,
    "name": "Papdi Chaat",
    "servingUnit": "1 plate (200g)",
    "servingWeightGrams": 200,
    "calories": 290,
    "protein": 6.5,
    "carbs": 44,
    "fats": 10.5,
    "category": "Street Food & Snacks",
    "aliases": [
      "delhi papri chaat with curd boiled potatoes and sweet chutney"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 397,
    "name": "Aloo Tikki Chaat (2 Patties with Chutneys)",
    "servingUnit": "1 plate (220g)",
    "servingWeightGrams": 220,
    "calories": 330,
    "protein": 6,
    "carbs": 48,
    "fats": 13,
    "category": "Street Food & Snacks",
    "aliases": [
      "crispy spiced potato patty chaat with chole and sweet curd"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 398,
    "name": "Samosa Chaat (1 Samosa Mashed with Chole)",
    "servingUnit": "1 plate (250g)",
    "servingWeightGrams": 250,
    "calories": 380,
    "protein": 9.5,
    "carbs": 52,
    "fats": 15.5,
    "category": "Street Food & Snacks",
    "aliases": [
      "samosa crushed in spiced chickpea gravy with curd and sev"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 399,
    "name": "Raj Kachori (Stuffed Giant Kachori)",
    "servingUnit": "1 plate (280g)",
    "servingWeightGrams": 280,
    "calories": 440,
    "protein": 10,
    "carbs": 58,
    "fats": 19,
    "category": "Street Food & Snacks",
    "aliases": [
      "king of chaat with sprouts potatoes curd sev and pomegranate"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 400,
    "name": "Ragda Pattice (2 Patties with Ragda)",
    "servingUnit": "1 plate (250g)",
    "servingWeightGrams": 250,
    "calories": 340,
    "protein": 11,
    "carbs": 54,
    "fats": 9,
    "category": "Street Food & Snacks",
    "aliases": [
      "mumbai potato cutlet in white dried peas curry"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 401,
    "name": "Dabeli (Kutchi Dabeli, 1 Piece)",
    "servingUnit": "1 piece (140g)",
    "servingWeightGrams": 140,
    "calories": 310,
    "protein": 6.2,
    "carbs": 50,
    "fats": 10,
    "category": "Street Food & Snacks",
    "aliases": [
      "double roti",
      "kutchi potato spiced burger with masala peanuts and pomegranate"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 402,
    "name": "Samosa (Potato & Peas, 1 Piece)",
    "servingUnit": "1 samosa (80g)",
    "servingWeightGrams": 80,
    "calories": 220,
    "protein": 4.2,
    "carbs": 26,
    "fats": 11.2,
    "category": "Street Food & Snacks",
    "aliases": [
      "punjabi aloo samosa",
      "fried triangular pastry with spiced potato filling"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 403,
    "name": "Pyaaz ki Kachori (Onion Kachori, 1 Piece)",
    "servingUnit": "1 piece (90g)",
    "servingWeightGrams": 90,
    "calories": 270,
    "protein": 4.8,
    "carbs": 30,
    "fats": 15,
    "category": "Street Food & Snacks",
    "aliases": [
      "jodhpuri pyaaz kachori",
      "flaky fried pastry with spiced onion filling"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 404,
    "name": "Khasta Kachori (Moong Dal, 1 Piece)",
    "servingUnit": "1 piece (75g)",
    "servingWeightGrams": 75,
    "calories": 250,
    "protein": 5.5,
    "carbs": 28,
    "fats": 13.5,
    "category": "Street Food & Snacks",
    "aliases": [
      "moong dal kachori",
      "crispy yellow lentil stuffed kachori"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 405,
    "name": "Kanda Bhajji (Onion Pakora / Khekda Bhajji)",
    "servingUnit": "100g fried",
    "servingWeightGrams": 100,
    "calories": 280,
    "protein": 5.8,
    "carbs": 26,
    "fats": 17,
    "category": "Street Food & Snacks",
    "aliases": [
      "pyaz ke pakode",
      "onion fritters",
      "ullivada"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 406,
    "name": "Aloo Pakora (Potato Fritters)",
    "servingUnit": "100g (3-4 pieces)",
    "servingWeightGrams": 100,
    "calories": 240,
    "protein": 4.5,
    "carbs": 28,
    "fats": 12.5,
    "category": "Street Food & Snacks",
    "aliases": [
      "batata bhajji",
      "besan battered sliced potato fritters"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 407,
    "name": "Paneer Pakora (Cottage Cheese Fritters)",
    "servingUnit": "100g (3-4 pieces)",
    "servingWeightGrams": 100,
    "calories": 290,
    "protein": 12,
    "carbs": 18,
    "fats": 19,
    "category": "Street Food & Snacks",
    "aliases": [
      "gram flour battered paneer fritters"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 408,
    "name": "Palak Pakora (Spinach Fritters)",
    "servingUnit": "100g fried",
    "servingWeightGrams": 100,
    "calories": 230,
    "protein": 5.2,
    "carbs": 22,
    "fats": 13.5,
    "category": "Street Food & Snacks",
    "aliases": [
      "crispy spinach leaf pakoda"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 409,
    "name": "Mirchi Bajji (Chili Fritters, 2 Pieces)",
    "servingUnit": "2 pieces (120g)",
    "servingWeightGrams": 120,
    "calories": 220,
    "protein": 4.8,
    "carbs": 25,
    "fats": 11.5,
    "category": "Street Food & Snacks",
    "aliases": [
      "milagai bajji",
      "mirchi vada",
      "besan battered green pepper fritters"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 410,
    "name": "Gobi Manchurian (Dry, Indo-Chinese)",
    "servingUnit": "1 plate (180g)",
    "servingWeightGrams": 180,
    "calories": 260,
    "protein": 5.5,
    "carbs": 34,
    "fats": 11.8,
    "category": "Street Food & Snacks",
    "aliases": [
      "crispy fried cauliflower tossed in soy chili garlic sauce"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 411,
    "name": "Veg Spring Rolls (2 Rolls)",
    "servingUnit": "2 rolls (140g)",
    "servingWeightGrams": 140,
    "calories": 280,
    "protein": 5.8,
    "carbs": 36,
    "fats": 13,
    "category": "Street Food & Snacks",
    "aliases": [
      "crispy vegetable spring rolls with sweet chili sauce"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 412,
    "name": "Steamed Veg Momos (6 Pieces)",
    "servingUnit": "6 pieces (150g)",
    "servingWeightGrams": 150,
    "calories": 195,
    "protein": 5.5,
    "carbs": 38,
    "fats": 2.2,
    "category": "Street Food & Snacks",
    "aliases": [
      "steamed cabbage carrot dumplings",
      "tibetan veg momos"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 413,
    "name": "Steamed Chicken Momos (6 Pieces)",
    "servingUnit": "6 pieces (150g)",
    "servingWeightGrams": 150,
    "calories": 230,
    "protein": 15.5,
    "carbs": 32,
    "fats": 4.5,
    "category": "Street Food & Snacks",
    "aliases": [
      "steamed minced chicken dumplings",
      "darjeeling chicken momos"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 414,
    "name": "Fried Chicken Momos (6 Pieces)",
    "servingUnit": "6 pieces (150g)",
    "servingWeightGrams": 150,
    "calories": 350,
    "protein": 16,
    "carbs": 34,
    "fats": 16.5,
    "category": "Street Food & Snacks",
    "aliases": [
      "crispy fried chicken dumplings with garlic chili dip"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 415,
    "name": "Roasted Makhana (Spiced Foxnuts)",
    "servingUnit": "30g (1 bowl)",
    "servingWeightGrams": 30,
    "calories": 115,
    "protein": 3,
    "carbs": 22,
    "fats": 1.8,
    "category": "Street Food & Snacks",
    "aliases": [
      "phool makhana",
      "roasted lotus seeds with turmeric salt"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 416,
    "name": "Poha Chivda (Roasted Flattened Rice)",
    "servingUnit": "50g",
    "servingWeightGrams": 50,
    "calories": 210,
    "protein": 4.5,
    "carbs": 35,
    "fats": 6.2,
    "category": "Street Food & Snacks",
    "aliases": [
      "diet chivda",
      "roasted poha with peanuts and curry leaves"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 417,
    "name": "Murmura (Puffed Rice, Plain)",
    "servingUnit": "50g (2 big bowls)",
    "servingWeightGrams": 50,
    "calories": 165,
    "protein": 3.5,
    "carbs": 36,
    "fats": 0.5,
    "category": "Street Food & Snacks",
    "aliases": [
      "kurmura",
      "mamra",
      "puri puffed rice",
      "muri"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 418,
    "name": "Masala Murmura (Spiced Puffed Rice)",
    "servingUnit": "50g",
    "servingWeightGrams": 50,
    "calories": 195,
    "protein": 4,
    "carbs": 36,
    "fats": 4.2,
    "category": "Street Food & Snacks",
    "aliases": [
      "kolhapuri bhel murmura",
      "vagharela mamra"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 419,
    "name": "Chakli / Murukku (2 Pieces)",
    "servingUnit": "2 pieces (30g)",
    "servingWeightGrams": 30,
    "calories": 155,
    "protein": 2.8,
    "carbs": 18,
    "fats": 8,
    "category": "Street Food & Snacks",
    "aliases": [
      "spiral savory crunchy snack",
      "rice flour butter murukku"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 420,
    "name": "Plain Whole Wheat Khakhra (1 Piece)",
    "servingUnit": "1 piece (25g)",
    "servingWeightGrams": 25,
    "calories": 105,
    "protein": 2.8,
    "carbs": 18,
    "fats": 2.5,
    "category": "Street Food & Snacks",
    "aliases": [
      "sada khakhra",
      "crispy thin roasted wheat cracker"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 421,
    "name": "Kerala Banana Chips (in Coconut Oil)",
    "servingUnit": "30g (handful)",
    "servingWeightGrams": 30,
    "calories": 165,
    "protein": 1.2,
    "carbs": 18,
    "fats": 10.2,
    "category": "Street Food & Snacks",
    "aliases": [
      "nendran upperi",
      "yellow raw plantain chips"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 422,
    "name": "Namak Pare (Savory Crisps)",
    "servingUnit": "30g",
    "servingWeightGrams": 30,
    "calories": 150,
    "protein": 2.8,
    "carbs": 18,
    "fats": 7.5,
    "category": "Street Food & Snacks",
    "aliases": [
      "nimki",
      "savory carom seed diamond crackers"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 423,
    "name": "Masala Corn (Sweet Corn Steamed)",
    "servingUnit": "1 cup (150g)",
    "servingWeightGrams": 150,
    "calories": 140,
    "protein": 4.5,
    "carbs": 26,
    "fats": 2.8,
    "category": "Street Food & Snacks",
    "aliases": [
      "butta chaat",
      "steamed sweet corn with butter and chaat masala"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 424,
    "name": "Bhutta (Roasted Corn on Cob with Lemon & Chili)",
    "servingUnit": "1 cob (180g edible)",
    "servingWeightGrams": 180,
    "calories": 160,
    "protein": 5.5,
    "carbs": 32,
    "fats": 2.2,
    "category": "Street Food & Snacks",
    "aliases": [
      "charcoal grilled corn cob",
      "desi makai with nimbu"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 425,
    "name": "Aloo Chaat (Tawa Roasted)",
    "servingUnit": "1 plate (160g)",
    "servingWeightGrams": 160,
    "calories": 220,
    "protein": 3.5,
    "carbs": 36,
    "fats": 7.2,
    "category": "Street Food & Snacks",
    "aliases": [
      "delhi street aloo chaat with lemon and spices"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 426,
    "name": "Peanut Chaat (Boiled Peanuts with Veggies)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 240,
    "protein": 11.5,
    "carbs": 16,
    "fats": 16,
    "category": "Street Food & Snacks",
    "aliases": [
      "healthy boiled shengdana chaat with onion tomato lemon"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 427,
    "name": "Batata Vada (Plain Potato Ball Fritter, 1 pc)",
    "servingUnit": "1 piece (60g)",
    "servingWeightGrams": 60,
    "calories": 150,
    "protein": 3,
    "carbs": 18,
    "fats": 7.5,
    "category": "Street Food & Snacks",
    "aliases": [
      "aloo bonda",
      "mumbai batata vada without pav"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 428,
    "name": "Vegetable Cutlet (Bread Crumb Fried, 1 pc)",
    "servingUnit": "1 piece (60g)",
    "servingWeightGrams": 60,
    "calories": 130,
    "protein": 2.5,
    "carbs": 17,
    "fats": 6,
    "category": "Street Food & Snacks",
    "aliases": [
      "spiced beetroot carrot potato cutlet"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 429,
    "name": "Sabudana Papad (Fried, 1 pc)",
    "servingUnit": "1 piece (15g)",
    "servingWeightGrams": 15,
    "calories": 75,
    "protein": 0.5,
    "carbs": 12,
    "fats": 3,
    "category": "Street Food & Snacks",
    "aliases": [
      "sago wafer fried",
      "vrat papad"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 430,
    "name": "Paneer Kathi Roll (1 Roll)",
    "servingUnit": "1 roll (180g)",
    "servingWeightGrams": 180,
    "calories": 360,
    "protein": 14.5,
    "carbs": 42,
    "fats": 15.5,
    "category": "Street Food & Snacks",
    "aliases": [
      "kolkata paneer roll with onions and green mint chutney in paratha"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 431,
    "name": "Boondi Raita",
    "servingUnit": "1 bowl (100g)",
    "servingWeightGrams": 100,
    "calories": 120,
    "protein": 3.5,
    "carbs": 11,
    "fats": 7,
    "category": "Raitas & Chutneys",
    "aliases": [
      "crispy chickpea flour pearls in spiced yogurt",
      "raita"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 432,
    "name": "Cucumber Raita (Kheera Raita)",
    "servingUnit": "1 bowl (100g)",
    "servingWeightGrams": 100,
    "calories": 60,
    "protein": 3.2,
    "carbs": 5.5,
    "fats": 2.8,
    "category": "Raitas & Chutneys",
    "aliases": [
      "grated cucumber in roasted cumin yogurt",
      "kheera dahi"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 433,
    "name": "Onion Tomato Raita",
    "servingUnit": "1 bowl (100g)",
    "servingWeightGrams": 100,
    "calories": 65,
    "protein": 3.2,
    "carbs": 6.5,
    "fats": 3,
    "category": "Raitas & Chutneys",
    "aliases": [
      "pyaaz tamatar raita",
      "biryani raita",
      "kachumber raita"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 434,
    "name": "Mixed Vegetable Raita",
    "servingUnit": "1 bowl (120g)",
    "servingWeightGrams": 120,
    "calories": 75,
    "protein": 3.8,
    "carbs": 8,
    "fats": 3.2,
    "category": "Raitas & Chutneys",
    "aliases": [
      "cucumber carrot onion tomato spiced yogurt"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 435,
    "name": "Pineapple Raita (Sweet & Savory)",
    "servingUnit": "1 bowl (120g)",
    "servingWeightGrams": 120,
    "calories": 110,
    "protein": 3.2,
    "carbs": 18,
    "fats": 2.8,
    "category": "Raitas & Chutneys",
    "aliases": [
      "ananas raita",
      "sweet spiced pineapple curd"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 436,
    "name": "Burani Raita (Roasted Garlic Raita)",
    "servingUnit": "1 bowl (100g)",
    "servingWeightGrams": 100,
    "calories": 85,
    "protein": 3.5,
    "carbs": 6.5,
    "fats": 5,
    "category": "Raitas & Chutneys",
    "aliases": [
      "hyderabadi garlic raita for biryani",
      "lahsuni raita"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 437,
    "name": "Bathua Raita (Winter Greens)",
    "servingUnit": "1 bowl (100g)",
    "servingWeightGrams": 100,
    "calories": 65,
    "protein": 3.8,
    "carbs": 5,
    "fats": 3.2,
    "category": "Raitas & Chutneys",
    "aliases": [
      "boiled bathua greens in spiced dahi"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 438,
    "name": "Pudina Raita (Mint Yogurt)",
    "servingUnit": "1 bowl (100g)",
    "servingWeightGrams": 100,
    "calories": 60,
    "protein": 3.4,
    "carbs": 5.2,
    "fats": 2.8,
    "category": "Raitas & Chutneys",
    "aliases": [
      "mint curd dip",
      "pudina dahi"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 439,
    "name": "Mint Coriander Chutney (Green Chutney)",
    "servingUnit": "2 tbsp (30g)",
    "servingWeightGrams": 30,
    "calories": 20,
    "protein": 0.8,
    "carbs": 2.5,
    "fats": 0.7,
    "category": "Raitas & Chutneys",
    "aliases": [
      "hari chutney",
      "pudina dhaniya chutney",
      "sandwich green chutney"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 440,
    "name": "Sweet Tamarind Chutney (Saunth Chutney)",
    "servingUnit": "2 tbsp (30g)",
    "servingWeightGrams": 30,
    "calories": 65,
    "protein": 0.4,
    "carbs": 16,
    "fats": 0.1,
    "category": "Raitas & Chutneys",
    "aliases": [
      "imli chutney",
      "meethi chutney",
      "saunth for chaat"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 441,
    "name": "Coconut Chutney (White, South Indian)",
    "servingUnit": "2 tbsp (30g)",
    "servingWeightGrams": 30,
    "calories": 65,
    "protein": 0.8,
    "carbs": 2.2,
    "fats": 6,
    "category": "Raitas & Chutneys",
    "aliases": [
      "thengai chutney",
      "white idli dosa chutney",
      "nariyal chutney"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 442,
    "name": "Roasted Chana Dal Chutney (Pottukadalai)",
    "servingUnit": "2 tbsp (30g)",
    "servingWeightGrams": 30,
    "calories": 55,
    "protein": 2.2,
    "carbs": 5.5,
    "fats": 2.8,
    "category": "Raitas & Chutneys",
    "aliases": [
      "kadale chutney",
      "roasted gram chutney for idli"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 443,
    "name": "Tomato Onion Chutney (Red Chutney)",
    "servingUnit": "2 tbsp (30g)",
    "servingWeightGrams": 30,
    "calories": 35,
    "protein": 0.7,
    "carbs": 4.5,
    "fats": 1.6,
    "category": "Raitas & Chutneys",
    "aliases": [
      "thakkali chutney",
      "south indian red spicy chutney"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 444,
    "name": "Peanut Chutney (Groundnut Chutney)",
    "servingUnit": "2 tbsp (30g)",
    "servingWeightGrams": 30,
    "calories": 95,
    "protein": 3.8,
    "carbs": 3.5,
    "fats": 7.8,
    "category": "Raitas & Chutneys",
    "aliases": [
      "shengdana chutney",
      "palli pachadi for idli dosa"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 445,
    "name": "Dry Garlic Chutney (Vada Pav Chutney)",
    "servingUnit": "1 tbsp (15g)",
    "servingWeightGrams": 15,
    "calories": 55,
    "protein": 1.5,
    "carbs": 4.5,
    "fats": 3.5,
    "category": "Raitas & Chutneys",
    "aliases": [
      "lasun sukhi chutney",
      "red vada pav powder chutney"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 446,
    "name": "Gongura Pachadi (Andhra Sorrel Chutney)",
    "servingUnit": "2 tbsp (30g)",
    "servingWeightGrams": 30,
    "calories": 45,
    "protein": 0.9,
    "carbs": 3.5,
    "fats": 3.2,
    "category": "Raitas & Chutneys",
    "aliases": [
      "andhra gongura pickle chutney",
      "spicy sorrel leaves pickle"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 447,
    "name": "Mango Pickle (Aam ka Achar)",
    "servingUnit": "1 tsp (15g)",
    "servingWeightGrams": 15,
    "calories": 35,
    "protein": 0.3,
    "carbs": 2,
    "fats": 3,
    "category": "Raitas & Chutneys",
    "aliases": [
      "punjabi aam ka achar",
      "avakkai",
      "spicy raw mango pickle"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 448,
    "name": "Lime / Lemon Pickle (Nimbu ka Achar)",
    "servingUnit": "1 tsp (15g)",
    "servingWeightGrams": 15,
    "calories": 20,
    "protein": 0.3,
    "carbs": 3,
    "fats": 0.8,
    "category": "Raitas & Chutneys",
    "aliases": [
      "spiced lemon pickle",
      "elumbichai oorugai"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 449,
    "name": "Green Chili Pickle (Hari Mirch Achar)",
    "servingUnit": "1 tsp (15g)",
    "servingWeightGrams": 15,
    "calories": 25,
    "protein": 0.4,
    "carbs": 2,
    "fats": 1.8,
    "category": "Raitas & Chutneys",
    "aliases": [
      "stuffed banarasi mirch achar",
      "instant green chili pickle"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 450,
    "name": "Mixed Vegetable Pickle (Pachranga)",
    "servingUnit": "1 tsp (15g)",
    "servingWeightGrams": 15,
    "calories": 30,
    "protein": 0.4,
    "carbs": 2.2,
    "fats": 2.2,
    "category": "Raitas & Chutneys",
    "aliases": [
      "carrot cauliflower turnip pickle",
      "mix achar"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 451,
    "name": "Roasted Papad (Lijjat Plain / Jeera, 1 pc)",
    "servingUnit": "1 papad (15g)",
    "servingWeightGrams": 15,
    "calories": 45,
    "protein": 3.8,
    "carbs": 8.5,
    "fats": 0.3,
    "category": "Raitas & Chutneys",
    "aliases": [
      "roasted urad dal papad",
      "roasted papadum"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 452,
    "name": "Fried Papad (1 pc)",
    "servingUnit": "1 papad (20g)",
    "servingWeightGrams": 20,
    "calories": 85,
    "protein": 3.8,
    "carbs": 8.5,
    "fats": 4.5,
    "category": "Raitas & Chutneys",
    "aliases": [
      "oil fried urad papadum"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 453,
    "name": "Masala Papad (Roasted with Toppings, 1 pc)",
    "servingUnit": "1 papad (60g)",
    "servingWeightGrams": 60,
    "calories": 75,
    "protein": 4.2,
    "carbs": 12,
    "fats": 1.2,
    "category": "Raitas & Chutneys",
    "aliases": [
      "roasted papad topped with diced onion tomato chaat masala and coriander"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 454,
    "name": "Appalam (South Indian Fried Lentil Wafer, 1 pc)",
    "servingUnit": "1 piece (12g)",
    "servingWeightGrams": 12,
    "calories": 65,
    "protein": 2.5,
    "carbs": 6.5,
    "fats": 3.5,
    "category": "Raitas & Chutneys",
    "aliases": [
      "kerala sadya fried appalam",
      "papadum"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 455,
    "name": "Sirka Pyaz (Vinegar Pickled Onions)",
    "servingUnit": "50g (3-4 small onions)",
    "servingWeightGrams": 50,
    "calories": 25,
    "protein": 0.6,
    "carbs": 5.5,
    "fats": 0.1,
    "category": "Raitas & Chutneys",
    "aliases": [
      "restaurant pickled pink baby onions in beetroot vinegar"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 456,
    "name": "Kachumber Salad (Cucumber Onion Tomato)",
    "servingUnit": "1 bowl (100g)",
    "servingWeightGrams": 100,
    "calories": 30,
    "protein": 1.2,
    "carbs": 6,
    "fats": 0.2,
    "category": "Raitas & Chutneys",
    "aliases": [
      "fresh chopped indian salad with lemon juice and green chili"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 457,
    "name": "Raw Green Salad (Cucumber, Tomato, Carrot)",
    "servingUnit": "1 plate (150g)",
    "servingWeightGrams": 150,
    "calories": 40,
    "protein": 1.5,
    "carbs": 8.5,
    "fats": 0.3,
    "category": "Raitas & Chutneys",
    "aliases": [
      "sliced garden salad indian style with lemon wedges"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 458,
    "name": "Ginger Chutney (Allam Pachadi)",
    "servingUnit": "2 tbsp (30g)",
    "servingWeightGrams": 30,
    "calories": 50,
    "protein": 0.8,
    "carbs": 10,
    "fats": 1,
    "category": "Raitas & Chutneys",
    "aliases": [
      "andhra spicy sweet ginger chutney for pesarattu"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 459,
    "name": "Idli Podi with Sesame Oil (Milagai Podi)",
    "servingUnit": "1 tbsp podi with oil (20g)",
    "servingWeightGrams": 20,
    "calories": 110,
    "protein": 3.2,
    "carbs": 6,
    "fats": 8.5,
    "category": "Raitas & Chutneys",
    "aliases": [
      "gunpowder chutney powder mixed with gingelly oil",
      "karam podi with oil"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 460,
    "name": "Fried Curd Chili (Mor Milagai, 2 pcs)",
    "servingUnit": "2 pieces (10g)",
    "servingWeightGrams": 10,
    "calories": 35,
    "protein": 0.5,
    "carbs": 2.5,
    "fats": 2.6,
    "category": "Raitas & Chutneys",
    "aliases": [
      "sun dried yogurt salted chili fried in oil",
      "majjiga mirapakayalu"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 461,
    "name": "Gulab Jamun (1 Piece)",
    "servingUnit": "1 piece with syrup (50g)",
    "servingWeightGrams": 50,
    "calories": 175,
    "protein": 2.8,
    "carbs": 26,
    "fats": 6.8,
    "category": "Sweets & Desserts",
    "aliases": [
      "fried khoya balls in rose cardamom sugar syrup",
      "kala jamun"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 462,
    "name": "Rasgulla (1 Piece)",
    "servingUnit": "1 piece with light syrup (50g)",
    "servingWeightGrams": 50,
    "calories": 125,
    "protein": 3.5,
    "carbs": 24,
    "fats": 1.8,
    "category": "Sweets & Desserts",
    "aliases": [
      "roshogolla",
      "steamed cottage cheese sponge balls in syrup"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 463,
    "name": "Rasmalai (1 Piece)",
    "servingUnit": "1 piece with saffron milk (75g)",
    "servingWeightGrams": 75,
    "calories": 180,
    "protein": 5.5,
    "carbs": 22,
    "fats": 8,
    "category": "Sweets & Desserts",
    "aliases": [
      "chhena disc soaked in thickened saffron cardamom milk with pistachios"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 464,
    "name": "Kaju Katli (1 Diamond Piece)",
    "servingUnit": "1 piece (15g)",
    "servingWeightGrams": 15,
    "calories": 65,
    "protein": 1.5,
    "carbs": 8.5,
    "fats": 3.2,
    "category": "Sweets & Desserts",
    "aliases": [
      "kaju barfi",
      "cashew fudge diamond"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 465,
    "name": "Besan Ladoo (1 Medium Ladoo)",
    "servingUnit": "1 ladoo (35g)",
    "servingWeightGrams": 35,
    "calories": 175,
    "protein": 3.8,
    "carbs": 22,
    "fats": 8.5,
    "category": "Sweets & Desserts",
    "aliases": [
      "roasted gram flour ghee ladoo",
      "magas ladoo"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 466,
    "name": "Motichoor Ladoo (1 Medium Ladoo)",
    "servingUnit": "1 ladoo (35g)",
    "servingWeightGrams": 35,
    "calories": 160,
    "protein": 2.2,
    "carbs": 24,
    "fats": 6.5,
    "category": "Sweets & Desserts",
    "aliases": [
      "fine boondi saffron ladoo",
      "boondi ladoo"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 467,
    "name": "Atta Ladoo (Whole Wheat & Ghee)",
    "servingUnit": "1 ladoo (35g)",
    "servingWeightGrams": 35,
    "calories": 170,
    "protein": 2.8,
    "carbs": 23,
    "fats": 7.8,
    "category": "Sweets & Desserts",
    "aliases": [
      "pinni",
      "panjiri ladoo with nuts and gond"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 468,
    "name": "Gajar ka Halwa (Carrot Pudding)",
    "servingUnit": "1 bowl (120g)",
    "servingWeightGrams": 120,
    "calories": 260,
    "protein": 4.8,
    "carbs": 34,
    "fats": 12,
    "category": "Sweets & Desserts",
    "aliases": [
      "gajrela",
      "grated carrot pudding simmered in milk and ghee with khoya nuts"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 469,
    "name": "Sooji Halwa (Rava Sheera / Kesari)",
    "servingUnit": "1 bowl (120g)",
    "servingWeightGrams": 120,
    "calories": 270,
    "protein": 3.5,
    "carbs": 42,
    "fats": 10,
    "category": "Sweets & Desserts",
    "aliases": [
      "suji ka halwa",
      "kesari bath",
      "prasad sheera"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 470,
    "name": "Moong Dal Halwa",
    "servingUnit": "1 bowl (120g)",
    "servingWeightGrams": 120,
    "calories": 360,
    "protein": 7.5,
    "carbs": 38,
    "fats": 20,
    "category": "Sweets & Desserts",
    "aliases": [
      "rich yellow lentil pudding slow cooked in pure ghee"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 471,
    "name": "Rice Kheer (Chawal ki Kheer)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 220,
    "protein": 5.8,
    "carbs": 34,
    "fats": 7.2,
    "category": "Sweets & Desserts",
    "aliases": [
      "payasam",
      "rice pudding simmered in full cream milk and cardamom"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 472,
    "name": "Semiya Payasam (Vermicelli Kheer)",
    "servingUnit": "1 bowl (150g)",
    "servingWeightGrams": 150,
    "calories": 210,
    "protein": 5.2,
    "carbs": 33,
    "fats": 6.8,
    "category": "Sweets & Desserts",
    "aliases": [
      "seviyan kheer",
      "roasted vermicelli pudding with cashews and raisins"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 473,
    "name": "Jalebi (2 Pieces)",
    "servingUnit": "2 pieces (60g)",
    "servingWeightGrams": 60,
    "calories": 240,
    "protein": 1.5,
    "carbs": 46,
    "fats": 6,
    "category": "Sweets & Desserts",
    "aliases": [
      "crispy pretzel shaped fermented flour fried and soaked in saffron syrup"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 474,
    "name": "Rabdi (Rabri)",
    "servingUnit": "1 bowl (100g)",
    "servingWeightGrams": 100,
    "calories": 240,
    "protein": 7.5,
    "carbs": 24,
    "fats": 12.5,
    "category": "Sweets & Desserts",
    "aliases": [
      "thick layered condensed milk sweet with pistachios and saffron"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 475,
    "name": "Shrikhand (Kesar Elaichi)",
    "servingUnit": "1 bowl (100g)",
    "servingWeightGrams": 100,
    "calories": 230,
    "protein": 6.8,
    "carbs": 32,
    "fats": 8.8,
    "category": "Sweets & Desserts",
    "aliases": [
      "sweet saffron cardamom hung yogurt dessert"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 476,
    "name": "Amrakhand (Mango Shrikhand)",
    "servingUnit": "1 bowl (100g)",
    "servingWeightGrams": 100,
    "calories": 240,
    "protein": 6.2,
    "carbs": 36,
    "fats": 8,
    "category": "Sweets & Desserts",
    "aliases": [
      "mango pulp blended with hung curd sweet"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 477,
    "name": "Mysore Pak (Traditional Ghee)",
    "servingUnit": "1 piece (35g)",
    "servingWeightGrams": 35,
    "calories": 195,
    "protein": 2.5,
    "carbs": 20,
    "fats": 12,
    "category": "Sweets & Desserts",
    "aliases": [
      "karnataka melt in mouth besan ghee fudge"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 478,
    "name": "Doodh Peda (Mathura Peda, 1 Piece)",
    "servingUnit": "1 piece (25g)",
    "servingWeightGrams": 25,
    "calories": 105,
    "protein": 3,
    "carbs": 14,
    "fats": 4.2,
    "category": "Sweets & Desserts",
    "aliases": [
      "caramelized mawa milk fudge disc"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 479,
    "name": "Kalakand (Alwar Milk Cake, 1 Piece)",
    "servingUnit": "1 piece (40g)",
    "servingWeightGrams": 40,
    "calories": 140,
    "protein": 4.2,
    "carbs": 16,
    "fats": 6.8,
    "category": "Sweets & Desserts",
    "aliases": [
      "granular paneer and condensed milk cake"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 480,
    "name": "Sandesh (Bengali Chhena Sweet, 1 Piece)",
    "servingUnit": "1 piece (35g)",
    "servingWeightGrams": 35,
    "calories": 110,
    "protein": 4.5,
    "carbs": 14,
    "fats": 4,
    "category": "Sweets & Desserts",
    "aliases": [
      "shondesh",
      "fresh cottage cheese fudge lightly sweetened with cardamom / nolen gur"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 481,
    "name": "Matka Kulfi (Traditional Malai Kulfi)",
    "servingUnit": "1 small matka (80g)",
    "servingWeightGrams": 80,
    "calories": 190,
    "protein": 5.5,
    "carbs": 22,
    "fats": 9.2,
    "category": "Sweets & Desserts",
    "aliases": [
      "traditional slow frozen condensed milk ice cream on stick / pot"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 482,
    "name": "Phirni (Ground Rice Pudding in Clay Pot)",
    "servingUnit": "1 bowl (120g)",
    "servingWeightGrams": 120,
    "calories": 190,
    "protein": 4.8,
    "carbs": 28,
    "fats": 6.8,
    "category": "Sweets & Desserts",
    "aliases": [
      "ferni",
      "creamy ground rice pudding with saffron nuts served chilled in shikora"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 483,
    "name": "Til Ladoo (Sesame Jaggery Ladoo)",
    "servingUnit": "1 ladoo (30g)",
    "servingWeightGrams": 30,
    "calories": 145,
    "protein": 3.5,
    "carbs": 17,
    "fats": 7.5,
    "category": "Sweets & Desserts",
    "aliases": [
      "tilgul",
      "makar sankranti sesame jaggery ball"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 484,
    "name": "Puran Poli (Sweet Lentil Flatbread)",
    "servingUnit": "1 poli (100g)",
    "servingWeightGrams": 100,
    "calories": 290,
    "protein": 7,
    "carbs": 52,
    "fats": 6.5,
    "category": "Sweets & Desserts",
    "aliases": [
      "vedmi",
      "sweet chana dal and jaggery stuffed flatbread with ghee",
      "holige"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 485,
    "name": "Modak (Steamed Ukadiche Modak, 1 Piece)",
    "servingUnit": "1 modak (50g)",
    "servingWeightGrams": 50,
    "calories": 130,
    "protein": 2.2,
    "carbs": 24,
    "fats": 3.2,
    "category": "Sweets & Desserts",
    "aliases": [
      "steamed rice flour dumpling stuffed with coconut and jaggery",
      "ganesh chaturthi modak"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 486,
    "name": "Masala Chai (with Milk and 1 tsp Sugar)",
    "servingUnit": "1 cup (150ml)",
    "servingWeightGrams": 155,
    "calories": 90,
    "protein": 2.8,
    "carbs": 12,
    "fats": 3.5,
    "category": "Beverages",
    "aliases": [
      "indian milk tea",
      "ginger cardamom spiced tea",
      "karak chai"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 487,
    "name": "Adrak Wali Chai (Ginger Milk Tea, No Sugar)",
    "servingUnit": "1 cup (150ml)",
    "servingWeightGrams": 155,
    "calories": 70,
    "protein": 2.8,
    "carbs": 7,
    "fats": 3.5,
    "category": "Beverages",
    "aliases": [
      "unsweetened ginger milk tea",
      "sugar free adrak chai"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 488,
    "name": "Black Tea (Sugarless)",
    "servingUnit": "1 cup (150ml)",
    "servingWeightGrams": 150,
    "calories": 2,
    "protein": 0.1,
    "carbs": 0.4,
    "fats": 0,
    "category": "Beverages",
    "aliases": [
      "plain black tea",
      "assam black tea",
      "darjeeling tea"
    ],
    "isEstimate": false,
    "source": "USDA / Standard Tea Reference"
  },
  {
    "id": 489,
    "name": "Green Tea (Plain)",
    "servingUnit": "1 cup (150ml)",
    "servingWeightGrams": 150,
    "calories": 2,
    "protein": 0.2,
    "carbs": 0.3,
    "fats": 0,
    "category": "Beverages",
    "aliases": [
      "antioxidant green tea brew"
    ],
    "isEstimate": false,
    "source": "USDA / Standard Tea Reference"
  },
  {
    "id": 490,
    "name": "South Indian Filter Coffee (with Milk & Sugar)",
    "servingUnit": "1 cup (150ml)",
    "servingWeightGrams": 155,
    "calories": 110,
    "protein": 3.2,
    "carbs": 14,
    "fats": 4.5,
    "category": "Beverages",
    "aliases": [
      "madras filter coffee",
      "kaapi",
      "degree coffee"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 491,
    "name": "Black Coffee (Sugarless)",
    "servingUnit": "1 cup (150ml)",
    "servingWeightGrams": 150,
    "calories": 2,
    "protein": 0.3,
    "carbs": 0.2,
    "fats": 0,
    "category": "Beverages",
    "aliases": [
      "plain black espresso",
      "black americano"
    ],
    "isEstimate": false,
    "source": "USDA / Standard Coffee Reference"
  },
  {
    "id": 492,
    "name": "Haldi Doodh (Turmeric Golden Milk)",
    "servingUnit": "1 glass (200ml)",
    "servingWeightGrams": 205,
    "calories": 145,
    "protein": 6.5,
    "carbs": 12,
    "fats": 7.5,
    "category": "Beverages",
    "aliases": [
      "golden milk with black pepper and honey / turmeric"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 493,
    "name": "Badam Milk (Almond Saffron Milk)",
    "servingUnit": "1 glass (200ml)",
    "servingWeightGrams": 205,
    "calories": 195,
    "protein": 7.2,
    "carbs": 22,
    "fats": 8.8,
    "category": "Beverages",
    "aliases": [
      "crushed almond milk with kesar elaichi"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 494,
    "name": "Thandai (Spiced Milk Drink)",
    "servingUnit": "1 glass (200ml)",
    "servingWeightGrams": 205,
    "calories": 230,
    "protein": 6.8,
    "carbs": 28,
    "fats": 10.5,
    "category": "Beverages",
    "aliases": [
      "holi festive drink with poppy seeds fennel melon seeds and rose petals"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 495,
    "name": "Fresh Tender Coconut Water",
    "servingUnit": "1 coconut (250ml)",
    "servingWeightGrams": 250,
    "calories": 48,
    "protein": 1.8,
    "carbs": 9.8,
    "fats": 0.5,
    "category": "Beverages",
    "aliases": [
      "nariyal pani",
      "daab",
      "elaneer",
      "tender coconut water natural electrolytes"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 496,
    "name": "Fresh Sugarcane Juice (Ganne ka Ras)",
    "servingUnit": "1 glass (250ml)",
    "servingWeightGrams": 250,
    "calories": 180,
    "protein": 0.5,
    "carbs": 45,
    "fats": 0.2,
    "category": "Beverages",
    "aliases": [
      "ganne ka juice with ginger and mint",
      "karumbu juice"
    ],
    "isEstimate": false,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 497,
    "name": "Jaljeera (Spiced Cumin Cooler)",
    "servingUnit": "1 glass (200ml)",
    "servingWeightGrams": 200,
    "calories": 35,
    "protein": 0.5,
    "carbs": 8,
    "fats": 0.2,
    "category": "Beverages",
    "aliases": [
      "roasted cumin mint digestive cooler with boondi"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 498,
    "name": "Aam Panna (Raw Mango Cooler)",
    "servingUnit": "1 glass (200ml)",
    "servingWeightGrams": 200,
    "calories": 110,
    "protein": 0.6,
    "carbs": 27,
    "fats": 0.2,
    "category": "Beverages",
    "aliases": [
      "kairi panna",
      "sweet and tangy roasted green mango summer drink"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 499,
    "name": "Nimbu Pani / Shikanji (Sweet & Salted)",
    "servingUnit": "1 glass (250ml)",
    "servingWeightGrams": 250,
    "calories": 65,
    "protein": 0.4,
    "carbs": 16,
    "fats": 0.1,
    "category": "Beverages",
    "aliases": [
      "indian fresh lemonade with black salt and cumin",
      "shikanjvi"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  },
  {
    "id": 500,
    "name": "Kokum Sharbat (Cooling Drink)",
    "servingUnit": "1 glass (200ml)",
    "servingWeightGrams": 200,
    "calories": 80,
    "protein": 0.4,
    "carbs": 20,
    "fats": 0.1,
    "category": "Beverages",
    "aliases": [
      "goan konkan red mangosteen cooler",
      "amrutkokum"
    ],
    "isEstimate": true,
    "source": "ICMR-NIN IFCT"
  }
];

export default foodDatabase;
