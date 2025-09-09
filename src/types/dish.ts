/**
 * Dish Type Definitions
 * 
 * TypeScript interfaces and types for Indian dish data structures.
 * Provides type safety and IntelliSense support throughout the application.
 * 
 * The Dish interface represents the complete data structure for an Indian dish
 * as returned by the backend API, including all nutritional and cultural information.
 */

/**
 * Dish Interface
 * 
 * Represents a complete Indian dish with all available metadata.
 * Used throughout the application for type-safe dish data handling.
 * 
 * Required fields:
 * - id: Unique identifier for the dish
 * - name: Display name of the dish
 * - ingredients: Array of ingredient names used in the dish
 * 
 * Optional fields:
 * - origin: Geographic origin or region of the dish
 * - diet: Dietary classification (vegetarian, non-vegetarian, etc.)
 * - prep_time: Time required for preparation
 * - cook_time: Time required for cooking
 * - flavor_profile: Dominant flavor characteristics (sweet, spicy, etc.)
 * - course: Meal course classification (appetizer, main course, dessert, etc.)
 * - state: Indian state where the dish originates
 * - region: Broader regional classification (North, South, East, West)
 * 
 * Additional properties:
 * - [key: string]: any - Allows for additional dynamic properties
 */
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
