import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft, FaUserPlus, FaExclamationTriangle } from 'react-icons/fa';
import './AuthPages.css';
import { useAuth } from '../contexts/AuthContext';

/**
 * SignupPage Component
 * Handles user registration with form validation and submission
 */
const SignupPage = () => {
  // === STATE MANAGEMENT ===
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formTouched, setFormTouched] = useState({});
  const [authError, setAuthError] = useState('');
  
  const navigate = useNavigate();
  const { signup } = useAuth();

  // === FORM VALIDATION ===
  /**
   * Validates form fields when they change
   * Runs validation checks when any field is touched
   */
  useEffect(() => {
    if (Object.keys(formTouched).length > 0) {
      validateForm();
    }
  }, [name, email, password, confirmPassword, formTouched]);

  /**
   * Marks form fields as touched when user interacts
   * Triggers validation and logs field interaction
   */
  const markFieldAsTouched = (field) => {
    setFormTouched(prev => ({ ...prev, [field]: true }));
    console.log('Field touched:', {
      field,
      value: field === 'password' ? '[REDACTED]' : eval(field),
      timestamp: new Date().toISOString()
    });
  };

  /**
   * Comprehensive form validation
   * Validates name, email format, password length, and password match
   */
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (formTouched.name && name.trim() === '') {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (formTouched.email) {
      if (email.trim() === '') {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Email address is invalid';
      }
    }
    
    // Password validation
    if (formTouched.password) {
      if (password === '') {
        newErrors.password = 'Password is required';
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    }
    
    // Confirm password validation
    if (formTouched.confirmPassword) {
      if (confirmPassword === '') {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords don\'t match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // === EVENT HANDLERS ===
  /**
   * Handles form submission
   * Validates all fields and processes signup if valid
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allFieldsTouched = {
      name: true,
      email: true,
      password: true,
      confirmPassword: true
    };
    setFormTouched(allFieldsTouched);
    
    // Validate all fields
    const isValid = validateForm();
    
    if (!isValid) {
      console.log('Signup validation failed:', {
        errors,
        timestamp: new Date().toISOString()
      });
      return;
    }
    
    setIsSubmitting(true);
    setAuthError('');
    
    console.log('Signup initiated:', {
      name,
      email,
      passwordLength: password.length,
      timestamp: new Date().toISOString()
    });
    
    try {
      // Create user with Firebase Authentication
      await signup(email, password, name);
      navigate('/app');
    } catch (error) {
      console.error('Signup error:', error);
      let errorMessage = 'Failed to create an account.';
      
      // Handle specific Firebase auth errors
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email is already in use';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak';
      }
      
      setAuthError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Toggles password visibility
   * Handles both password and confirm password fields
   */
  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
      console.log('Password visibility toggled:', {
        field: 'password',
        isVisible: !showPassword,
        timestamp: new Date().toISOString()
      });
    } else {
      setShowConfirmPassword(!showConfirmPassword);
      console.log('Password visibility toggled:', {
        field: 'confirmPassword',
        isVisible: !showConfirmPassword,
        timestamp: new Date().toISOString()
      });
    }
  };

  // === COMPONENT RENDER ===
  return (
    <div className="auth-page signup-page">
      <div className="auth-container signup-container">
        {/* Header Section */}
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join us to start taking beautiful notes</p>
        
        {/* Auth Error Display */}
        {authError && (
          <div className="auth-error">
            <FaExclamationTriangle className="error-icon" />
            <span>{authError}</span>
          </div>
        )}
        
        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Name Input Field */}
          <div className={`form-group ${errors.name ? 'error' : ''}`}>
            <label htmlFor="name">
              <FaUser className="input-icon" /> Full Name
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => markFieldAsTouched('name')}
                required
                placeholder="Enter your name"
                className={errors.name ? 'error-input' : ''}
                disabled={isSubmitting}
              />
            </div>
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          {/* Email Input Field */}
          <div className={`form-group ${errors.email ? 'error' : ''}`}>
            <label htmlFor="email">
              <FaEnvelope className="input-icon" /> Email
            </label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => markFieldAsTouched('email')}
                required
                placeholder="Enter your email"
                className={errors.email ? 'error-input' : ''}
                disabled={isSubmitting}
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          {/* Password Input Field */}
          <div className={`form-group ${errors.password ? 'error' : ''}`}>
            <label htmlFor="password">
              <FaLock className="input-icon" /> Password
            </label>
            <div className="input-wrapper password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => markFieldAsTouched('password')}
                required
                placeholder="Create a password"
                className={errors.password ? 'error-input' : ''}
                disabled={isSubmitting}
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => togglePasswordVisibility('password')}
                tabIndex="-1"
                disabled={isSubmitting}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          {/* Confirm Password Field */}
          <div className={`form-group ${errors.confirmPassword ? 'error' : ''}`}>
            <label htmlFor="confirmPassword">
              <FaLock className="input-icon" /> Confirm Password
            </label>
            <div className="input-wrapper password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => markFieldAsTouched('confirmPassword')}
                required
                placeholder="Confirm your password"
                className={errors.confirmPassword ? 'error-input' : ''}
                disabled={isSubmitting}
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => togglePasswordVisibility('confirmPassword')}
                tabIndex="-1"
                disabled={isSubmitting}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>
          
          {/* Submit Button */}
          <button 
            type="submit" 
            className={`auth-button submit-button ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="button-content">Creating account...</span>
            ) : (
              <span className="button-content">
                <FaUserPlus className="button-icon" /> 
                Create Account
              </span>
            )}
          </button>

          {/* Terms and Privacy Notice */}
          <div className="terms-privacy">
            By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
          </div>
        </form>
        
        {/* Alternative Options */}
        <div className="auth-separator">
          <span>or</span>
        </div>
        
        {/* Login Redirect */}
        <p className="auth-redirect">
          Already have an account? <Link to="/login" onClick={() => console.log('Navigate to login clicked')}>Login</Link>
        </p>
        
        {/* Back Navigation */}
        <Link to="/" className="back-link" onClick={() => console.log('Back to home clicked from signup page')}>
          <FaArrowLeft className="back-icon" /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;