/**
 * Header Component
 * 
 * Global navigation header with search functionality and user authentication.
 * 
 * Features:
 * - Real-time search with autosuggest dropdown
 * - Search by name, ingredient, or origin
 * - User authentication status display
 * - Logout functionality
 * - Click-outside-to-close dropdown behavior
 * 
 * State Management:
 * - Search query and search type (name/ingredient/origin)
 * - Suggestions from API with debounced fetching
 * - Menu visibility control
 * - Authentication state via useAuth hook
 */

import { useState, useEffect, useRef } from 'react';
import { Input, Menu, MenuItem, Option, MenuList, Dropdown, Button } from '@fluentui/react-components';
import { useNavigate } from 'react-router-dom';
import { autosuggest } from '../services/api';
import { useAuth } from '../pages/Auth/useAuth';

/**
 * Header Component
 * 
 * Renders the application header with:
 * - Application title
 * - Search functionality (when user is logged in)
 * - Logout button (when user is logged in)
 */
export default function Header() {
  // Search state management
  const [q, setQ] = useState('')  // Search query
  const [by, setBy] = useState<"name" | "ingredient" | "origin" | "state">(() => {
    return (sessionStorage.getItem("searchBy") as any) || "name";
  });

  const [suggests, setSuggests] = useState<any[]>([])  // API suggestions
  const [menuOpen, setMenuOpen] = useState(false)  // Dropdown visibility control

  // Navigation and refs
  const nav = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)  // For click-outside detection

  // Authentication hook
  const { logout, checkLogin, checkLog } = useAuth();

  /**
   * Effect: Debounced search suggestions
   * 
   * Fetches suggestions from API when user types, with 250ms debounce.
   * Cleans up on component unmount to prevent memory leaks.
   */
  useEffect(() => {
    let mounted = true

    const doFetch = async () => {
      // Clear suggestions if no query
      if (!q) {
        setSuggests([])
        setMenuOpen(false)
        return
      }

      try {
        // Fetch suggestions from API
        const r = await autosuggest(q, by, 20)
        if (mounted) {
          setSuggests(r.data || [])
          setMenuOpen((r.data || []).length > 0)
        }
      } catch (e) {
        console.error('Error fetching suggestions:', e)
      }
    }

    // Debounce API calls by 250ms
    const t = setTimeout(doFetch, 250)
    return () => {
      mounted = false;
      clearTimeout(t)
    }
  }, [q, by])

  /**
   * Effect: Click outside to close dropdown and check authentication
   * 
   * Sets up event listener for closing suggestion dropdown when clicking outside.
   * Also checks authentication status on component mount.
   */
  useEffect(() => {
    checkLogin();

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  /**
   * Handle suggestion selection
   * 
   * Navigates to appropriate page based on search type and selection.
   * For name searches with ID, goes to detail page.
   * For other searches, navigates to filtered list page.
   * 
   * @param s - Selected suggestion (string or object with id/name)
   */

  const handleSelect = (s: any) => {
    if (s.id) {
      nav(`/dishes/${encodeURIComponent(s.id)}`);
    } else {
      const params = new URLSearchParams();
      params.set(by, String(s));
      nav(`/?${params.toString()}`);
    }
    setMenuOpen(false);
    setSuggests([]);
    setQ('');
  };

  const renderComp = <Button className='logout-btn' title='Logout' appearance='outline' onClick={logout} icon={<svg viewBox="0 0 24 24" width="24" height="24" stroke="#ff0000" strokeWidth="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>}></Button>;

  return (
    <header className="app-header" role="banner">
      {/* Application title */}
      <div className='header-container'>
        <h2 className="header-title">Indian Food Explorer</h2>
        {renderComp}
      </div>

      {/* Search functionality - only shown when logged in */}
      {checkLog() && (
        <>
          <div className="search-box" ref={containerRef}>
            {/* Search input */}
            <Input
              placeholder={`Search by ${by}`}
              value={q}
              onChange={(e: any) => setQ(e.target.value)}
            />

            {/* Search type selector */}
            <Dropdown
              placeholder="Select search by"
              selectedOptions={[by]}
              onOptionSelect={(_, data) => {
                const value = data.optionValue as "name" | "ingredient" | "origin" | "state";
                setBy(value);
                sessionStorage.setItem("searchBy", value);
              }}
              value={by}
            >
              <Option value="name">Name</Option>
              <Option value="ingredient">Ingredient</Option>
              <Option value="origin">Origin</Option>
              <Option value="state">State</Option>
            </Dropdown>


            {/* Suggestions dropdown */}
            {menuOpen && suggests.length > 0 && (
              <div className="suggestions-menu">
                <Menu open>
                  <MenuList>
                    {suggests.map((s: any, i: number) => (
                      <MenuItem key={i} onClick={() => handleSelect(s)}>
                        {typeof s === "string" ? s : s.name || s}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </div>
            )}
          </div>
          {/* Logout button */}
          {renderComp}
        </>
      )}
    </header>
  )
}
