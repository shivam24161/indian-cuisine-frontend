/**
 * Protected Route Component
 * 
 * Route wrapper that restricts access to authenticated users only.
 * Implements route-level authentication protection using React Router.
 * 
 * Features:
 * - Authentication state checking
 * - Automatic redirect to login for unauthenticated users
 * - Outlet rendering for nested protected routes
 * - Integration with useAuth hook for state management
 * 
 * Usage:
 * Wrap routes that require authentication with this component.
 * Uses React Router's Outlet to render child routes when authenticated.
 * 
 * Authentication Flow:
 * 1. Check if user is logged in via useAuth hook
 * 2. If authenticated: render child routes via Outlet
 * 3. If not authenticated: redirect to login page
 */

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

/**
 * ProtectedRoute Component
 * 
 * Higher-order component that protects routes from unauthenticated access.
 * Renders child routes only when user is authenticated, otherwise redirects to login.
 */
const ProtectedRoute: React.FC = () => {
    // Get authentication state from useAuth hook
    const { isLoggedIn } = useAuth();

    // Redirect to login if not authenticated
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    // Render child routes if authenticated
    return <Outlet />;
};

export default ProtectedRoute;
