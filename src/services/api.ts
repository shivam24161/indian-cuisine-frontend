import axios from 'axios'

// API configuration
const API_BASE = (import.meta as any).env?.VITE_API_URL || "http://localhost:3000";

/**
 * Axios instance with base configuration
 * 
 * Pre-configured HTTP client with:
 * - Base URL for all requests
 * - JSON content type header
 * - Consistent request/response handling
 */
export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
})

/**
 * Fetch dishes with filtering, sorting, and pagination
 * 
 * Retrieves a paginated list of dishes with optional filtering and sorting.
 * Supports complex query parameters for advanced dish discovery.
 * 
 * @param params - Query parameters object
 * @param params.page - Page number for pagination
 * @param params.limit - Number of dishes per page
 * @param params.origin - Filter by dish origin/region
 * @param params.ingredient - Filter by ingredient name
 * @param params.q - Search query string
 * @param params.sortBy - Field to sort by
 * @param params.sortOrder - Sort direction (asc/desc)
 * @returns Promise with dish list and pagination metadata
 */
export async function fetchDishes(params: Record<string, any>) {
  const res = await api.get('/api/dishes', { params })
  return res.data
}

/**
 * Fetch single dish by ID
 * 
 * Retrieves detailed information for a specific dish.
 * Used for dish detail pages and individual dish display.
 * 
 * @param id - Unique dish identifier
 * @returns Promise with dish details
 */
export async function fetchDishById(id: string) {
  const res = await api.get(`/api/dishes/${encodeURIComponent(id)}`)
  return res.data
}

/**
 * Get search suggestions
 * 
 * Provides autocomplete suggestions for search queries.
 * Supports different search types (name, ingredient, origin).
 * 
 * @param q - Search query string
 * @param by - Search type ('name' | 'ingredient' | 'origin')
 * @param limit - Maximum number of suggestions (default: 10)
 * @returns Promise with suggestion array
 */
export async function autosuggest(q: string, by = 'name', limit = 10) {
  const res = await api.get('/api/dishes/autosuggest', { params: { q, by, limit } })
  return res.data
}

/**
 * Get all available ingredients
 * 
 * Fetches complete list of ingredients used across all dishes.
 * Used for ingredient selection interfaces and filtering.
 * 
 * @returns Promise with array of ingredient names
 */
export async function getAllIngredients() {
  const r = await api.get("api/dishes/ingredients");
  return r.data.data;
}

/**
 * Suggest dishes based on ingredients
 * 
 * Recommends dishes that match selected ingredients.
 * Supports two matching modes: "all" (contains all ingredients) 
 * or "some" (contains at least one ingredient).
 * 
 * @param ingredients - Array of ingredient names
 * @param match - Matching mode ('all' | 'some')
 * @returns Promise with matching dishes array
 */
export async function suggestDishes(ingredients: string[], match: "all" | "some" = "all") {
  const r = await api.post("/api/dishes/from-ingredients", { ingredients, match });
  return r.data;
}
