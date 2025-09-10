import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthForm, { User } from "./AuthForm";
import { useAuth } from "./useAuth";

const Login: React.FC = () => {
    // Component state
    const [error, setError] = useState<string | null>(null);  // Error message state
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    /**
     * Handle login form submission
     * 
     * Validates user credentials against stored users in localStorage.
     * Sets authentication state and navigates on success, shows error on failure.
     * 
     * @param email - User's email address
     * @param password - User's password
     */
    const handleLogin = (email: string, password: string) => {
        try {
            // Retrieve stored users from localStorage
            const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

            // Find matching user credentials
            const found = users.find((u) =>
                u.email === email && u.password === password
            );

            if (!found) {
                setError("Invalid credentials");
                return;
            }

            // Set authentication state
            localStorage.setItem("user", JSON.stringify({ email }));
            localStorage.setItem("login", "true");

            // Navigate to main application
            navigate("/dishes");

        } catch (error) {
            console.error('Error during login:', error);
            setError("An error occurred during login");
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/dishes")
        }
    }, [isLoggedIn])

    return (
        <>
            {/* Login form */}
            <AuthForm
                mode="login"
                onSubmit={handleLogin}
                error={error}
            />

            {/* Registration link */}
            <p className="auth-link-container">
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </>
    );
};

export default Login;
