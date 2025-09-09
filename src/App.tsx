/**
 * Main Application Component
 * 
 * This is the root component of the Indian Food Explorer application.
 * It sets up the routing structure, theme provider, and global layout.
 * 
 * Features:
 * - React Router for navigation
 * - Fluent UI theme provider for consistent styling
 * - Protected routes for authenticated users
 * - Global header component
 * - Authentication flow (login/register)
 */

import { Routes, Route, Navigate } from 'react-router-dom'
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

// Component imports
import Header from './components/Header'
import ListPage from './pages/ListPage'
import DetailPage from './pages/DetailPage'
import ProtectedRoute from './pages/Auth/ProtectedRoute';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Global styles
import './styles.css'

/**
 * App Component
 * 
 * Main application component that provides:
 * - Fluent UI theme context
 * - Global header navigation
 * - Route configuration with authentication protection
 * - Container layout for all pages
 */
export default function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      {/* Global header with search and navigation */}
      <Header />
      
      {/* Main content container */}
      <div className="container">
        <Routes>
          {/* Root redirect to login */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Public authentication routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes - require authentication */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dishes" element={<ListPage />} />
            <Route path="/dishes/:id" element={<DetailPage />} />
          </Route>
        </Routes>
      </div>
    </FluentProvider>
  )
}
