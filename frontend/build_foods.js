// build_foods.js - Master Compiler & Validator for 500 Popular Indian Foods
import fs from 'fs';
import path from 'path';
import process from 'node:process';

import { breads } from './scripts/food_categories/breads.js';
import { riceDishes } from './scripts/food_categories/rice.js';
import { dalDishes } from './scripts/food_categories/dals.js';
import { sabziDishes } from './scripts/food_categories/sabzi.js';
import { curries } from './scripts/food_categories/curries.js';
import { southIndianDishes } from './scripts/food_categories/south_indian.js';
import { breakfastEveryday } from './scripts/food_categories/breakfast_everyday.js';
import { dairyAndPlantProtein } from './scripts/food_categories/dairy_paneer_plant_protein.js';
import { eggsAndChicken } from './scripts/food_categories/eggs_chicken.js';
import { muttonAndSeafood } from './scripts/food_categories/mutton_fish_seafood.js';
import { streetFoodAndSnacks } from './scripts/food_categories/street_food_snacks.js';
import { accompaniments } from './scripts/food_categories/chutneys_raitas_pickles.js';
import { sweetsAndDesserts } from './scripts/food_categories/sweets_desserts.js';
import { traditionalBeverages } from './scripts/food_categories/beverages.js';

// Baseline 15 foods from original Foods.js (Strictly preserved IDs and macros)
const baselineFoods = [
  {
    id: 1,
    name: "Chicken Breast",
    servingUnit: "100g",
    servingWeightGrams: 100,
    calories: 165,
    protein: 31,
    carbs: 0,
    fats: 3.6,
    category: "Non-Vegetarian",
    aliases: ["murgh", "boneless chicken", "chicken breast raw", "chicken fillet"],
    isEstimate: false,
    source: "USDA / Standard Poultry Reference"
  },
  {
    id: 2,
    name: "Egg",
    servingUnit: "1 egg",
    servingWeightGrams: 50,
    calories: 78,
    protein: 6.3,
    carbs: 0.6,
    fats: 5.3,
    category: "Eggs & Poultry",
    aliases: ["anda", "boiled egg", "whole egg", "poultry egg"],
    isEstimate: false,
    source: "ICMR-NIN IFCT"
  },
  {
    id: 3,
    name: "Paneer",
    servingUnit: "100g",
    servingWeightGrams: 100,
    calories: 265,
    protein: 18,
    carbs: 6,
    fats: 20,
    category: "Dairy & Paneer",
    aliases: ["cottage cheese", "fresh paneer", "indian cottage cheese", "chenna"],
    isEstimate: false,
    source: "ICMR-NIN IFCT"
  },
  {
    id: 4,
    name: "Rice",
    servingUnit: "100g",
    servingWeightGrams: 100,
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fats: 0.3,
    category: "Rice & Rice Dishes",
    aliases: ["white rice", "chawal", "steamed rice", "bhat", "sadam"],
    isEstimate: false,
    source: "ICMR-NIN IFCT"
  },
  {
    id: 5,
    name: "Roti",
    servingUnit: "1 roti",
    servingWeightGrams: 35,
    calories: 120,
    protein: 3,
    carbs: 18,
    fats: 3,
    category: "Breads & Flatbreads",
    aliases: ["chapati", "phulka", "fulka", "gehu roti", "whole wheat flatbread"],
    isEstimate: true,
    source: "ICMR-NIN IFCT"
  },
  {
    id: 6,
    name: "Banana",
    servingUnit: "1 banana",
    servingWeightGrams: 118,
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fats: 0.4,
    category: "Fruits & Accompaniments",
    aliases: ["kela", "pazham", "kele", "fresh banana"],
    isEstimate: false,
    source: "ICMR-NIN IFCT"
  },
  {
    id: 7,
    name: "Milk",
    servingUnit: "100ml",
    servingWeightGrams: 103,
    calories: 61,
    protein: 3.2,
    carbs: 4.8,
    fats: 3.3,
    category: "Dairy & Paneer",
    aliases: ["doodh", "cow milk", "paal", "haalu"],
    isEstimate: false,
    source: "ICMR-NIN IFCT"
  },
  {
    id: 8,
    name: "Dal",
    servingUnit: "100g",
    servingWeightGrams: 100,
    calories: 116,
    protein: 9,
    carbs: 20,
    fats: 0.4,
    category: "Dal & Legumes",
    aliases: ["dal tadka", "yellow dal", "toor dal", "arhar dal", "paruppu"],
    isEstimate: true,
    source: "ICMR-NIN IFCT"
  },
  {
    id: 9,
    name: "Oats",
    servingUnit: "100g",
    servingWeightGrams: 100,
    calories: 389,
    protein: 16.9,
    carbs: 66.3,
    fats: 6.9,
    category: "Breakfast & Cereals",
    aliases: ["rolled oats", "oatmeal", "jaee", "breakfast oats"],
    isEstimate: false,
    source: "USDA / Standard Cereal Reference"
  },
  {
    id: 10,
    name: "Curd",
    servingUnit: "100g",
    servingWeightGrams: 100,
    calories: 61,
    protein: 3.5,
    carbs: 4.7,
    fats: 3.3,
    category: "Dairy & Paneer",
    aliases: ["dahi", "plain yogurt", "thayir", "perugu", "mosaru"],
    isEstimate: false,
    source: "ICMR-NIN IFCT"
  },
  {
    id: 11,
    name: "Apple",
    servingUnit: "1 apple",
    servingWeightGrams: 182,
    calories: 95,
    protein: 0.5,
    carbs: 25,
    fats: 0.3,
    category: "Fruits & Accompaniments",
    aliases: ["seb", "fresh apple", "red apple"],
    isEstimate: false,
    source: "USDA / ICMR-NIN IFCT"
  },
  {
    id: 12,
    name: "Peanut Butter",
    servingUnit: "1 tbsp",
    servingWeightGrams: 16,
    calories: 94,
    protein: 4,
    carbs: 3.2,
    fats: 8,
    category: "Nuts, Seeds & Healthy Fats",
    aliases: ["mungfali butter", "peanut paste", "nut butter"],
    isEstimate: false,
    source: "USDA / Commercial Reference"
  },
  {
    id: 13,
    name: "Almonds",
    servingUnit: "10 almonds",
    servingWeightGrams: 12,
    calories: 70,
    protein: 2.6,
    carbs: 2.6,
    fats: 6.1,
    category: "Nuts, Seeds & Healthy Fats",
    aliases: ["badam", "raw almonds", "badam giri"],
    isEstimate: false,
    source: "ICMR-NIN IFCT"
  },
  {
    id: 14,
    name: "Potato",
    servingUnit: "100g",
    servingWeightGrams: 100,
    calories: 77,
    protein: 2,
    carbs: 17,
    fats: 0.1,
    category: "Vegetables & Sabzi",
    aliases: ["aloo", "batata", "urulaikizhangu", "boiled potato", "alu"],
    isEstimate: false,
    source: "ICMR-NIN IFCT"
  },
  {
    id: 15,
    name: "Whey Protein",
    servingUnit: "1 scoop",
    servingWeightGrams: 30,
    calories: 120,
    protein: 24,
    carbs: 3,
    fats: 2,
    category: "Fitness & Protein Supplements",
    aliases: ["protein powder", "whey isolate", "whey concentrate", "protein supplement"],
    isEstimate: false,
    source: "Standard Nutritional Supplement Reference"
  }
];

// Targeted exclusions to achieve exactly 500 distinct items (pruning redundant variations)
const excludedNames = new Set([
  // Breads (2)
  "Lauki Thepla",
  "Pathiri",

  // Rice (3)
  "Brown Rice Veg Pulao",
  "Kashmiri Chicken Pulao",
  "Rice Kanji (Congee/Porridge)",

  // Dals (4)
  "Methi Dal (Menthi Pappu)",
  "Drumstick Sambar (Murungakkai)",
  "Tomato Pappu (Andhra Tomato Dal)",
  "Cabbage Chana Dal Kootu",

  // Sabzi (9)
  "Aloo French Beans",
  "Aloo Bhindi",
  "Bathua ka Saag",
  "Chana Saag (Chickpea Greens)",
  "Corn Palak Sabzi (Dry)",
  "Baby Corn Mushroom Jalfrezi",
  "Spring Onion Besan Sabzi (Pyaz Koli)",
  "Tori Chana Dal Sabzi",
  "Beans Usal (Green Beans Stir Fry)",

  // Curries (4)
  "Handi Paneer",
  "Paneer Pasanda",
  "Amritsari Chole Gravy",
  "Dahi Aloo Curry",

  // South Indian (3)
  "Onion Rava Dosa",
  "Rava Masala Dosa",
  "Rasa Vada (2 pieces in Rasam)",

  // Breakfast Everyday (3)
  "Dahi Poha (Gopalkala)",
  "Corn Poha",
  "Sweet Banana Sheera (Sooji Halwa for Breakfast)",

  // Dairy & Plant Protein (2)
  "Achari Paneer Tikka",
  "Hariyali Paneer Tikka",

  // Eggs & Chicken (2)
  "Double Egg Roll (Kathi Roll)",
  "Chicken Hakka Noodles",

  // Mutton & Seafood (2)
  "Mutton Shami Kebab (2 Pieces)",
  "Chicken Cutlet (Indian Bakery Style, 2 pcs)",

  // Street Food & Snacks (1)
  "Fried Veg Momos (6 Pieces)"
]);

// Raw pool of candidates
const candidatePool = [
  ...breads,
  ...riceDishes,
  ...dalDishes,
  ...sabziDishes,
  ...curries,
  ...southIndianDishes,
  ...breakfastEveryday,
  ...dairyAndPlantProtein,
  ...eggsAndChicken,
  ...muttonAndSeafood,
  ...streetFoodAndSnacks,
  ...accompaniments,
  ...sweetsAndDesserts,
  ...traditionalBeverages
];

// Filter out excluded names
const filteredAdditions = candidatePool.filter(item => !excludedNames.has(item.name));

console.log(`Baseline foods count: ${baselineFoods.length}`);
console.log(`Candidate additions count after exclusions: ${filteredAdditions.length}`);
console.log(`Total catalogue target count: ${baselineFoods.length + filteredAdditions.length}`);

// Assign sequential IDs starting from 16
let nextId = 16;
const completeCatalogue = [...baselineFoods];

for (const item of filteredAdditions) {
  completeCatalogue.push({
    id: nextId++,
    name: item.name,
    servingUnit: item.servingUnit,
    servingWeightGrams: item.servingWeightGrams || null,
    calories: Number(item.calories),
    protein: Number(item.protein),
    carbs: Number(item.carbs),
    fats: Number(item.fats),
    category: item.category,
    aliases: Array.isArray(item.aliases) ? item.aliases : [],
    isEstimate: Boolean(item.isEstimate),
    source: item.source || "ICMR-NIN IFCT / Standard Indian Reference"
  });
}

// Validation Checks
const errors = [];
const seenIds = new Set();
const seenNames = new Set();
const categoryCounts = {};

completeCatalogue.forEach((food, idx) => {
  // Check ID
  if (!food.id || typeof food.id !== 'number' || food.id < 1) {
    errors.push(`Invalid ID at index ${idx}: ${food.id}`);
  }
  if (seenIds.has(food.id)) {
    errors.push(`Duplicate ID: ${food.id} (${food.name})`);
  }
  seenIds.add(food.id);

  // Check Name
  if (!food.name || typeof food.name !== 'string' || food.name.trim().length === 0) {
    errors.push(`Invalid name at index ${idx}`);
  }
  const lowerName = food.name.toLowerCase().trim();
  if (seenNames.has(lowerName)) {
    errors.push(`Duplicate canonical name: "${food.name}"`);
  }
  seenNames.add(lowerName);

  // Check Numbers
  if (typeof food.calories !== 'number' || !Number.isFinite(food.calories) || food.calories < 0) {
    errors.push(`Invalid calories for "${food.name}": ${food.calories}`);
  }
  if (typeof food.protein !== 'number' || !Number.isFinite(food.protein) || food.protein < 0) {
    errors.push(`Invalid protein for "${food.name}": ${food.protein}`);
  }
  if (typeof food.carbs !== 'number' || !Number.isFinite(food.carbs) || food.carbs < 0) {
    errors.push(`Invalid carbs for "${food.name}": ${food.carbs}`);
  }
  if (typeof food.fats !== 'number' || !Number.isFinite(food.fats) || food.fats < 0) {
    errors.push(`Invalid fats for "${food.name}": ${food.fats}`);
  }

  // Count categories
  categoryCounts[food.category] = (categoryCounts[food.category] || 0) + 1;
});

if (errors.length > 0) {
  console.error(`\n❌ Validation failed with ${errors.length} errors:`);
  errors.slice(0, 15).forEach(e => console.error(" - " + e));
  process.exit(1);
}

if (completeCatalogue.length !== 500) {
  console.error(`\n❌ Expected exactly 500 items, got ${completeCatalogue.length}!`);
  process.exit(1);
}

console.log("\n✅ ALL VALIDATIONS PASSED!");
console.log(`Total Verified Entries: ${completeCatalogue.length} (EXACTLY 500)`);
console.log("\nCategory Distribution:");
Object.entries(categoryCounts).sort((a,b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log(` - ${cat}: ${count}`);
});

// Output formatted Foods.js file
const outputFilePath = path.join(process.cwd(), 'src', 'data', 'Foods.js');

const fileHeader = `/**
 * TrainIQ Comprehensive Indian Foods Catalogue (500 Items)
 * 
 * Nutritional reference standards based on:
 * - ICMR-NIN Indian Food Composition Tables (IFCT)
 * - Standard Indian Dietetics & Cooked Food Reference Data
 * - USDA FoodData Central (Standard Raw Ingredients)
 * 
 * Preserves baseline historical item IDs (1-15) and existing schema compatibility.
 */

export const foodDatabase = ${JSON.stringify(completeCatalogue, null, 2)};

export default foodDatabase;
`;

fs.writeFileSync(outputFilePath, fileHeader, 'utf-8');
console.log(`\nSuccessfully written exactly 500 items to ${outputFilePath}`);
