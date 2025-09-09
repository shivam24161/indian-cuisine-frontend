/**
 * Register Component
 * 
 * User registration page that allows new users to create accounts.
 * Uses localStorage-based user storage for demo purposes.
 * 
 * Features:
 * - New user account creation
 * - Email uniqueness validation
 * - User data persistence in localStorage
 * - Error handling for duplicate emails
 * - Navigation to login page after successful registration
 * - Link to login page for existing users
 * 
 * Registration Flow:
 * 1. User enters email and password
 * 2. System checks if email is already registered
 * 3. On unique email: creates account and navigates to login
 * 4. On duplicate email: displays error message
 */

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthForm, { User } from "./AuthForm";

/**
 * Register Component
 * 
 * Renders the registration page with form and handles new user creation.
 * Manages error states and navigation after successful registration.
 */
const Register: React.FC = () => {
    // Component state
    const [error, setError] = useState<string | null>(null);  // Error message state
    const navigate = useNavigate();

    /**
     * Handle registration form submission
     * 
     * Creates a new user account if email is not already registered.
     * Validates email uniqueness and stores user data in localStorage.
     * 
     * @param email - New user's email address
     * @param password - New user's password
     */
    const handleRegister = (email: string, password: string) => {
        try {
            // Retrieve existing users from localStorage
            const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

            // Check if email is already registered
            if (users.find((u) => u.email === email)) {
                setError("Email already registered");
                return;
            }

            // Create new user and add to users list
            const newUser: User = { email, password };
            users.push(newUser);
            
            // Store updated users list
            localStorage.setItem("users", JSON.stringify(users));
            
            // Set current user data (but don't log in automatically)
            localStorage.setItem("user", JSON.stringify({ email }));
            
            // Navigate to login page
            navigate("/login");
            
        } catch (error) {
            console.error('Error during registration:', error);
            setError("An error occurred during registration");
        }
    };

    return (
        <>
            {/* Registration form */}
            <AuthForm 
                mode="register" 
                onSubmit={handleRegister} 
                error={error} 
            />
            
            {/* Login link */}
            <p className="auth-link-container">
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </>
    );
};

export default Register;
