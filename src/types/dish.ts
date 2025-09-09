export type Dish = {
  id: string;                           // Unique dish identifier
  name: string;                         // Dish name
  ingredients: string[];                // List of ingredients
  origin?: string;                      // Geographic origin
  diet?: string;                        // Dietary classification
  prep_time?: number | string;          // Preparation time
  cook_time?: number | string;          // Cooking time
  flavor_profile?: string;              // Flavor characteristics
  course?: string;                      // Meal course type
  state?: string;                       // Indian state of origin
  region?: string;                      // Regional classification
  [key: string]: any;                   // Additional dynamic properties
}
