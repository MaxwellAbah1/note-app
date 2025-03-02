import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaEnvelope, FaLock } from 'react-icons/fa';
import './AuthPages.css';

/**
 * LoginPage Component
 * Handles user authentication and login functionality
 */
const LoginPage = () => {
  // === STATE MANAGEMENT ===
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // === EVENT HANDLERS ===
  /**
   * Handles form submission
   * Validates credentials and processes login attempt
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log('Login attempt:', {
      email: email,
      timestamp: new Date().toISOString(),
      emailValid: /\S+@\S+\.\S+/.test(email)
    });
    
    // Simulating API call delay
    setTimeout(() => {
      // For now, just navigate to the main app without authentication
      navigate('/app');
      setIsSubmitting(false);
    }, 800);
  };

  // === COMPONENT RENDER ===
  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Header Section */}
        <h1 className="auth-title">Welcome Back</h1>
        
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Email Input Field */}
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope className="input-icon" /> Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              autoComplete="email"
              className="input-field"
            />
          </div>
          
          {/* Password Input Field */}
          <div className="form-group">
            <label htmlFor="password">
              <FaLock className="input-icon" /> Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              autoComplete="current-password"
              className="input-field"
            />
          </div>
          
          {/* Submit Button */}
          <button 
            type="submit" 
            className={`auth-button submit-button ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="button-content">Logging in...</span>
            ) : (
              <span className="button-content">
                <FaSignInAlt className="button-icon" /> 
                Login
              </span>
            )}
          </button>
        </form>
        
        {/* Sign Up Redirect */}
        <p className="auth-redirect">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        
        {/* Back Navigation */}
        <Link to="/" className="back-link">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;