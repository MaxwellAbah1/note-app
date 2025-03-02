import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthPages.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login button clicked!');
    console.log('Login attempted with:', { email, password: '******' });
    
    // For now, just navigate to the main app without authentication
    navigate('/app');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">Login</h1>
        <form onSubmit={handleSubmit} className="auth-form">
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
              placeholder="Enter your password"
            />
          </div>
          <button 
            type="submit" 
            className="auth-button submit-button"
            onClick={() => console.log('Login form submission initiated')}
          >
            Login
          </button>
        </form>
        <p className="auth-redirect">
          Don't have an account? <Link to="/signup" onClick={() => console.log('Navigate to signup clicked')}>Sign Up</Link>
        </p>
        <Link to="/" className="back-link" onClick={() => console.log('Back to home clicked from login page')}>Back to Home</Link>
      </div>
    </div>
  );
};

export default LoginPage;