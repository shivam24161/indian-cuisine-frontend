/**
 * Auth Form Component
 * 
 * Reusable authentication form component that handles both login and registration.
 * Provides a clean, accessible form interface with validation feedback.
 * 
 * Features:
 * - Dual mode: login or registration
 * - Email and password input fields
 * - Error message display
 * - Form submission handling
 * - Responsive design with external CSS
 * 
 * Props:
 * - mode: Determines if form is for "login" or "register"
 * - onSubmit: Callback function when form is submitted
 * - error: Error message to display (optional)
 */

import React, { useState } from "react";
import { Button, Input } from "@fluentui/react-components";

/**
 * User interface definition
 * 
 * Defines the structure for user data in the authentication system.
 */
export interface User {
    email: string;
    password: string;
}

/**
 * AuthForm Props interface
 * 
 * Defines the props that the AuthForm component accepts.
 */
interface Props {
    mode: "login" | "register";  // Form mode
    onSubmit: (email: string, password: string) => void;  // Submit handler
    error?: string | null;  // Optional error message
}

/**
 * AuthForm Component
 * 
 * Renders a form for user authentication (login or registration).
 * Manages form state and provides user feedback.
 * 
 * @param mode - Whether this is a login or registration form
 * @param onSubmit - Function to call when form is submitted
 * @param error - Error message to display if authentication fails
 */
const AuthForm: React.FC<Props> = ({ mode, onSubmit, error }) => {
    // Form state management
    const [email, setEmail] = useState("");  // User email input
    const [password, setPassword] = useState("");  // User password input

    /**
     * Handle form submission
     * 
     * Validates inputs and calls the onSubmit callback with form data.
     * Could be extended with client-side validation.
     */
    const handleSubmit = () => {
        // Basic validation could be added here
        if (!email.trim() || !password.trim()) {
            return; // Could show validation error
        }
        
        onSubmit(email, password);
    };

    /**
     * Handle Enter key press for form submission
     * 
     * Allows users to submit form by pressing Enter in any input field.
     */
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="auth-form-container">
            {/* Form title */}
            <h2>{mode === "login" ? "Login" : "Register"}</h2>
            
            {/* Input fields container */}
            <div className="auth-form-inputs">
                {/* Email input */}
                <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
                    onKeyPress={handleKeyPress}
                    className="auth-input"
                />
                
                {/* Password input */}
                <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
                    onKeyPress={handleKeyPress}
                    className="auth-input"
                />
            </div>
            
            {/* Error message display */}
            {error && (
                <div className="auth-error">{error}</div>
            )}
            
            {/* Submit button */}
            <Button 
                appearance="primary" 
                onClick={handleSubmit}
                disabled={!email.trim() || !password.trim()}
            >
                {mode === "login" ? "Login" : "Register"}
            </Button>
        </div>
    );
};

export default AuthForm;
