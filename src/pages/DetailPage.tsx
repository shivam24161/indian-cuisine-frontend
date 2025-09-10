/**
 * Detail Page Component
 * 
 * Displays comprehensive information about a single Indian dish.
 * Fetches dish data by ID from URL parameters and presents it in a structured layout.
 * 
 * Features:
 * - Dynamic dish loading by ID from URL parameters
 * - Comprehensive dish information display (ingredients, cooking details, etc.)
 * - Responsive grid layout for dish properties
 * - Ingredient tags for visual appeal
 * - Navigation back to previous page
 * - Loading state management
 * 
 * Data Display:
 * - Dish name and origin as header
 * - Ingredients as interactive tags
 * - Cooking information in organized grid
 * - Diet, preparation time, cooking time
 * - Flavor profile, course, state, and region
 */

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDishById } from "../services/api";
import {
  Button,
  Card,
  CardHeader,
  Tag,
} from "@fluentui/react-components";
import { formatValue } from "./ListPage";

/**
 * DetailPage Component
 * 
 * Renders detailed information about a specific dish identified by URL parameter.
 * Provides comprehensive dish information in a structured, responsive layout.
 */
export default function DetailPage() {
  // URL parameters and navigation
  const { id } = useParams();  // Dish ID from URL
  const navigate = useNavigate();

  // Component state
  const [dish, setDish] = useState<any>(null);  // Dish data from API

  /**
   * Effect: Fetch dish data on component mount or ID change
   * 
   * Loads dish information from API when component mounts or when the dish ID changes.
   * Handles loading states and error cases.
   */
  useEffect(() => {
    if (!id) return;

    fetchDishById(id)
      .then((r) => setDish(r.data))
      .catch((e) => {
        console.error('Error fetching dish details:', e);
        // Could add error state here for user feedback
      });
  }, [id]);

  // Loading state
  if (!dish) {
    return (
      <div className="detail-page-container">
        <div className="loading-message">Loading dish details...</div>
      </div>
    );
  }

  return (
    <div className="detail-page-container">
      {/* Navigation back button */}
      <div className="detail-back-btn-row">
        <Button
          size="small"
          appearance="secondary"
          onClick={() => navigate(-1)}
        >
          ⬅ Back
        </Button>
      </div>

      {/* Main dish information card */}
      <Card className="detail-page-card">
        {/* Dish header with name and origin */}
        <CardHeader
          header={<h2 className="detail-card-header">{dish.name}</h2>}
          description={dish.origin || "Dish details"}
        />

        {/* Ingredients section */}
        <div>
          <h4>Ingredients</h4>
          <div className="ingredient-tags">
            {dish.ingredients?.map((ingredient: string) => (
              <Tag key={ingredient}>{ingredient}</Tag>
            ))}
          </div>
        </div>

        {/* Dish details in responsive grid */}
        <div className="detail-info-grid">
          <div>
            <strong>Diet:</strong> {formatValue(dish.diet)}
          </div>
          <div>
            <strong>Prep Time:</strong> {formatValue(dish.prep_time)}
          </div>
          <div>
            <strong>Cook Time:</strong> {formatValue(dish.cook_time)}
          </div>
          <div>
            <strong>Flavor:</strong> {formatValue(dish.flavor_profile)}
          </div>
          <div>
            <strong>Course:</strong> {formatValue(dish.course)}
          </div>
          <div>
            <strong>State:</strong> {formatValue(dish.state)}
          </div>
          <div>
            <strong>Region:</strong> {formatValue(dish.region)}
          </div>
        </div>
      </Card>
    </div>
  );
}
