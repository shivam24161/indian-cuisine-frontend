/**
 * Application Entry Point
 * 
 * Main entry file that bootstraps the React application.
 * Sets up the root rendering, routing context, and development tools.
 * 
 * Features:
 * - React 18 createRoot API for concurrent features
 * - React Router BrowserRouter for client-side routing
 * - Strict Mode for development debugging
 * - Global styles import
 * 
 * This file is the bridge between the HTML template and the React application,
 * mounting the App component into the DOM root element.
 */

import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'

/**
 * Application Bootstrap
 * 
 * Creates the React root and renders the application with necessary providers:
 * - React.StrictMode: Enables additional checks and warnings in development
 * - BrowserRouter: Provides client-side routing context for the entire app
 * - App: Main application component with all routes and functionality
 * 
 * The application is mounted to the DOM element with id "root" from index.html
 */
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
