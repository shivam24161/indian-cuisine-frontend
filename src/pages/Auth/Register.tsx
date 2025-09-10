import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthForm, { User } from "./AuthForm";

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
            navigate("/");

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
                Already have an account? <Link to="/">Login</Link>
            </p>
        </>
    );
};

export default Register;
