/**
 * useAuth Hook
 * 
 * Custom React hook for managing user authentication state and operations.
 * Provides a simple localStorage-based authentication system for demo purposes.
 * 
 * Features:
 * - Login status management
 * - User session persistence via localStorage
 * - Logout functionality with navigation
 * - User information retrieval
 * - Authentication state checks
 * 
 * Note: This is a simplified authentication system for demo purposes.
 * In production, this should be replaced with proper JWT/session-based auth.
 * 
 * State Management:
 * - Uses localStorage for persistence
 * - React state for reactive updates
 * - Navigation integration for auth flow
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * useAuth Hook
 * 
 * Provides authentication functionality and state management.
 * Returns an object with auth methods and state.
 * 
 * @returns Authentication state and methods
 */
export const useAuth = () => {
    const navigate = useNavigate();
    
    // Initialize login state from localStorage
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
        localStorage.getItem("login") === "true"
    );

    /**
     * Check and update login status
     * 
     * Reads the current login status from localStorage and updates React state.
     * Useful for syncing state after external changes to localStorage.
     */
    const checkLogin = () => {
        const loginStatus: any = localStorage.getItem("login");
        setIsLoggedIn(loginStatus === "true");
    };

    /**
     * Check login status without updating state
     * 
     * Returns the current login status directly from localStorage.
     * Useful for conditional rendering without triggering re-renders.
     * 
     * @returns Current login status
     */
    const checkLog = (): boolean => {
        const loginStatus: any = localStorage.getItem("login");
        return loginStatus === "true";
    };

    /**
     * Logout user
     * 
     * Clears authentication state and redirects to home page.
     * Updates both localStorage and React state.
     */
    const logout = () => {
        localStorage.setItem("login", "false");
        setIsLoggedIn(false);
        navigate("/");
    }

    /**
     * Get user's display name
     * 
     * Retrieves and formats the current user's email for display.
     * Returns a JSX element with welcome message.
     * 
     * @returns JSX element with user's welcome message
     */
    const getName = () => {
        try {
            const user: any = JSON.parse(localStorage.getItem("user") as string);
            return <span className="welcome-message">Welcome {user?.email}</span>;
        } catch (error) {
            console.error('Error parsing user data from localStorage:', error);
            return <span className="welcome-message">Welcome User</span>;
        }
    }

    // Return all authentication methods and state
    return { 
        isLoggedIn,      // Current login state
        setIsLoggedIn,   // State setter (for external use)
        logout,          // Logout function
        checkLogin,      // Login status checker with state update
        checkLog,        // Login status checker without state update
        getName          // User display name getter
    };
};
