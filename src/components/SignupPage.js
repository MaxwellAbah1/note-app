import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthPages.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Signup button clicked!');
    
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      console.log('Signup failed: passwords do not match');
      return;
    }
    
    console.log('Signup attempted with:', { name, email, password: '******' });
    
    // For now, just navigate to the main app without authentication
    navigate('/app');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">Sign Up</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create a password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
            />
          </div>
          <button 
            type="submit" 
            className="auth-button submit-button"
            onClick={() => console.log('Signup form submission initiated')}
          >
            Create Account
          </button>
        </form>
        <p className="auth-redirect">
          Already have an account? <Link to="/login" onClick={() => console.log('Navigate to login clicked')}>Login</Link>
        </p>
        <Link to="/" className="back-link" onClick={() => console.log('Back to home clicked from signup page')}>Back to Home</Link>
      </div>
    </div>
  );
};

export default SignupPage;