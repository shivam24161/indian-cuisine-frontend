/**
 * List Page Component
 * 
 * Main dish listing page with advanced filtering, sorting, and pagination.
 * Includes a dish suggester widget for ingredient-based recommendations.
 * 
 * Features:
 * - Paginated dish listing with configurable page size
 * - Advanced filtering by origin and ingredients
 * - Sortable columns (name, origin, prep_time, cook_time, ingredients)
 * - URL-based state management for filters and pagination
 * - Real-time dish suggestions based on selected ingredients
 * - Responsive two-column layout
 * 
 * State Management:
 * - URL search parameters for pagination and filters
 * - Local state for dishes, loading, and sorting
 * - Authentication state via useAuth hook
 */

import { useEffect, useMemo, useState } from "react";
import { fetchDishes } from "../services/api";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
  Button,
  Input,
  Card,
  CardHeader,
} from "@fluentui/react-components";
import DishSuggester from "../widgets/DishSuggester";
import { useAuth } from "./Auth/useAuth";

/**
 * ListPage Component
 * 
 * Displays a paginated, filterable, and sortable list of Indian dishes.
 * Provides navigation to individual dish details and ingredient-based suggestions.
 */

export function formatValue(value: any, fallback: string = "-") {
  if (value === null || value === undefined || value === "" || value === "-1") {
    return fallback;
  }
  return value;
}


export default function ListPage() {
  // URL search parameters for state management
  const [qparams, setQparams] = useSearchParams();
  const navigate = useNavigate();

  // Extract URL parameters with defaults
  const page = useMemo(() => Number(qparams.get("page") || 1), [qparams]);
  const limit: any = useMemo(() => Number(qparams.get("limit") || 10), [qparams]);
  const origin = useMemo(() => qparams.get("origin") || "", [qparams]);
  const ingredient = useMemo(() => qparams.get("ingredient") || "", [qparams]);
  const q = useMemo(() => qparams.get("q") || "", [qparams]);

  // Component state
  const [dishes, setDishes] = useState<any[]>([]);  // List of dishes from API
  const [total, setTotal] = useState(0);  // Total number of dishes for pagination
  const [loading, setLoading] = useState(false);  // Loading state

  // Sorting state
  const [sortBy, setSortBy] = useState<string>("name");  // Current sort column
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");  // Sort direction

  // Authentication hook
  const { getName } = useAuth();

  /**
   * Effect: Fetch dishes when parameters or sorting changes
   * 
   * Automatically refetches dishes whenever URL parameters or sorting state changes.
   * Manages loading state and error handling.
   */
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchDishes({
          page,
          limit,
          origin,
          ingredient,
          q,
          sortBy,
          sortOrder,
        });
        setDishes(res.data || []);
        setTotal(res.meta?.total || 0);
      } catch (e) {
        console.error('Error fetching dishes:', e);
        // Could add error state here for user feedback
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [page, limit, origin, ingredient, q, sortBy, sortOrder]);

  /**
   * Toggle column sorting
   * 
   * If clicking the same column, toggles between asc/desc.
   * If clicking a different column, sets it as the sort column with asc order.
   * 
   * @param col - Column name to sort by
   */
  function toggleSort(col: string) {
    if (sortBy === col) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(col);
      setSortOrder("asc");
    }
  }

  /**
   * Render sort indicator for table headers
   * 
   * Shows visual indicators for current sort column and direction.
   * 
   * @param col - Column name
   * @returns Sort indicator string (↕, ↑, or ↓)
   */
  const renderSortIndicator = (col: string) => {
    if (sortBy !== col) return "↕";  // Sortable but not current
    return sortOrder === "asc" ? "↑" : "↓";  // Current sort direction
  };

  /**
   * Update URL parameter helper
   * 
   * Updates URL search parameters while preserving other parameters.
   * Removes parameter if value is empty or null.
   * 
   * @param key - Parameter key
   * @param value - Parameter value
   */
  const updateParam = (key: string, value: any) => {
    const newParams = new URLSearchParams(qparams);
    if (value === "" || value == null) {
      newParams.delete(key);
    } else {
      newParams.set(key, String(value));
    }
    setQparams(newParams);
  };

  return (
    <div>
      {/* Welcome message for authenticated user */}
      <div className="welcome-message">{getName()}</div>

      {/* Main two-column layout */}
      <div className="list-page-layout">
        {/* Left column: Dish list */}
        <Card className="page-card">
          <div className="back-btn-container">
            {/* Back button - only shown when filters are applied */}
            {!!qparams.size && (
              <div>
                <Button size="small" appearance="secondary" onClick={() => navigate(-1)}>
                  Back
                </Button>
              </div>
            )}

            {/* Header and origin filter */}
            <div className="dish-list-filter">
              <CardHeader
                header={<b>Dish List</b>}
                description={<span>Browse through <b>{total}</b> dishes</span>}
              />
              <Input
                placeholder="Filter by Origin..."
                value={origin}
                onChange={(e: any) => updateParam("origin", e.target.value)}
              />
            </div>
          </div>

          {/* Dishes table */}
          <div className="table-container">
            <Table>
              <TableHeader>
                <TableRow>
                  {["name", "origin", "prep_time", "cook_time", "ingredients"].map(
                    (col) => (
                      <TableHeaderCell
                        key={col}
                        className="table-header-clickable"
                        onClick={() => toggleSort(col)}
                      >
                        {col.replace("_", " ").toUpperCase()}{" "}
                        {renderSortIndicator(col)}
                      </TableHeaderCell>
                    )
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="loading-message">
                      <div>
                        <p>Loading...</p>
                        <p>Please wait while we fetch the dishes...</p>
                        <p>As the render server boots and loads the data for the first time, it may take approximately 1 minute. Subsequent loads will be much faster.</p>
                        <p>This is because of the server getting a cold start.
                          In general the servers on free tier plans go to sleep after 30 minutes or so. And to “wake” them up again it takes about 1 minutes.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  dishes.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell>
                        <Link to={`/dishes/${encodeURIComponent(d.id)}`} className="table-link-cell">
                          {d.name}
                        </Link>
                      </TableCell>
                      <TableCell>{formatValue(d.origin)}</TableCell>
                      <TableCell>{formatValue(d.prep_time)}</TableCell>
                      <TableCell>{formatValue(d.cook_time)}</TableCell>
                      <TableCell>
                        {d.ingredients?.slice(0, 4).join(", ")}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination controls */}
          <div className="pagination-container">
            <Button onClick={() => updateParam("page", Math.max(1, page - 1))}>
              Prev
            </Button>
            <div>Page {page}</div>
            <Button onClick={() => updateParam("page", page + 1)}>Next</Button>
            <Input
              type="number"
              value={limit}
              onChange={(e: any) =>
                updateParam("limit", Number(e.target.value || 10))
              }
              className="pagination-input"
            />
          </div>
        </Card>

        {/* Right column: Dish suggester widget */}
        <Card className="page-card">
          <CardHeader header={<b>Dish Suggester</b>} />
          <DishSuggester />
        </Card>
      </div>
    </div>
  );
}
