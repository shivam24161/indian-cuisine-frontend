/**
 * Dish Suggester Widget
 * 
 * Interactive widget that suggests Indian dishes based on selected ingredients.
 * Provides two matching modes: "all" (must contain all selected ingredients) 
 * and "some" (must contain at least one selected ingredient).
 * 
 * Features:
 * - Load all available ingredients from API
 * - Search/filter ingredients by name
 * - Multi-select ingredients with checkboxes
 * - Two matching modes: "all ingredients" vs "some ingredients"
 * - Real-time dish suggestions based on selections
 * - Clear all selections functionality
 * 
 * State Management:
 * - Available ingredients list from API
 * - Selected ingredients for matching
 * - Search filter for ingredient list
 * - Matching mode preference
 * - Suggested dishes results
 */

import { useEffect, useState } from 'react'
import { getAllIngredients, suggestDishes } from '../services/api'
import { Checkbox, Button, Input, Dropdown, Option } from '@fluentui/react-components'

export default function DishSuggester() {
  // Ingredient management state
  const [options, setOptions] = useState<string[]>([])  // All available ingredients
  const [selected, setSelected] = useState<string[]>([])  // User-selected ingredients
  const [search, setSearch] = useState('')  // Search filter for ingredients
  
  // Results and preferences state
  const [results, setResults] = useState<any[]>([])  // Suggested dishes
  const [matchType, setMatchType] = useState<"all" | "some">("all");  // Matching mode

  /**
   * Effect: Load all ingredients from API on component mount
   * 
   * Fetches the complete list of available ingredients from the backend
   * to populate the ingredient selection interface.
   */
  useEffect(() => {
    const load = async () => {
      try {
        const ingredients = await getAllIngredients()
        setOptions(ingredients || [])
      } catch (e) {
        console.warn('Failed to load ingredients:', e)
        // Could add error state here for user feedback
      }
    }
    load()
  }, [])

  const toggle = (ing: string) => {
    setSelected(s => 
      s.includes(ing) 
        ? s.filter(x => x !== ing)  // Remove if present
        : [...s, ing]  // Add if not present
    )
  }

  /**
   * Suggest dishes based on selected ingredients
   * 
   * Calls API to get dish recommendations based on current ingredient selection
   * and matching mode. Handles API errors gracefully.
   */
  const suggest = async () => {
    try {
      const r = await suggestDishes(selected, matchType);
      setResults(r.data || []);
    } catch (e) {
      console.error('Failed to suggest dishes:', e);
      setResults([]);
      // Could add error state here for user feedback
    }
  };

  /**
   * Clear all selections and results
   * 
   * Resets the widget to its initial state by clearing selected ingredients,
   * search filter, and results.
   */
  const clearAll = () => {
    setSelected([]);
    setResults([]);
    setSearch('');
  };

  /**
   * Filter ingredients based on search text
   * 
   * Creates a filtered list of ingredients that match the current search query.
   * Case-insensitive search for better user experience.
   */
  const filteredOptions = options.filter(ingredient =>
    ingredient.toLowerCase().includes((search || '').toLowerCase())
  )

  return (
    <div className="suggester-container">
      {/* Ingredient search box */}
      <Input
        placeholder="Search ingredient..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      {/* Scrollable ingredients selection list */}
      <div className="ingredients-box">
        <div className="ingredients-grid">
          {filteredOptions.map((ingredient) => (
            <Checkbox
              key={ingredient}
              checked={selected.includes(ingredient)}
              onChange={() => toggle(ingredient)}
              label={ingredient}
            />
          ))}
        </div>
        
        {/* No ingredients found message */}
        {filteredOptions.length === 0 && (
          <div className="no-ingredients-message">No ingredients found</div>
        )}
      </div>

      {/* Action buttons and matching mode selector */}
      <div className="suggester-buttons">
        {/* Matching mode dropdown */}
        <Dropdown
          placeholder="Select match by"
          selectedOptions={[matchType]}
          onOptionSelect={(_, data) => setMatchType(data.optionValue as "all" | "some")}
          value={matchType}
        >
          <Option value="all">Match All Ingredients</Option>
          <Option value="some">Match Some Ingredients</Option>
        </Dropdown>

        {/* Suggest dishes button */}
        <Button
          appearance="primary"
          onClick={suggest}
          disabled={selected.length === 0}
        >
          Suggest
        </Button>
        
        {/* Clear all button */}
        <Button onClick={clearAll}>
          Clear
        </Button>
      </div>

      {/* Results section */}
      <div>
        <b>Results</b>
        {results.length === 0 && <div>No dishes yet</div>}
        {results?.map((dish) => (
          <div key={dish.id} className="result-item">
            {dish.name}
          </div>
        ))}
      </div>
    </div>
  );
}
