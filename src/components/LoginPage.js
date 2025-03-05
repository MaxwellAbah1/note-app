import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaEnvelope, FaLock, FaExclamationTriangle } from 'react-icons/fa';
import './AuthPages.css';
import { useAuth } from '../contexts/AuthContext';

/**
 * LoginPage Component
 * Handles user authentication and login functionality
 */
const LoginPage = () => {
  // === STATE MANAGEMENT ===
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  // === EVENT HANDLERS ===
  /**
   * Handles form submission
   * Validates credentials and processes login attempt
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error state
    setError('');
    setIsSubmitting(true);
    
    console.log('Login attempt:', {
      email: email,
      timestamp: new Date().toISOString(),
      emailValid: /\S+@\S+\.\S+/.test(email)
    });
    
    try {
      // Use Firebase authentication to login
      await login(email, password);
      navigate('/app');
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Failed to log in. Please check your credentials.';
      
      // Handle specific Firebase auth errors
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many unsuccessful login attempts. Please try again later.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format';
      }
      
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // === COMPONENT RENDER ===
  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Header Section */}
        <h1 className="auth-title">Welcome Back</h1>
        
        {/* Error Message Display */}
        {error && (
          <div className="auth-error">
            <FaExclamationTriangle className="error-icon" />
            <span>{error}</span>
          </div>
        )}
        
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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