import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="auth-buttons">
        <Link 
          to="/login" 
          className="auth-button login-button"
          onClick={() => console.log('Login navigation button clicked from landing page')}
        >
          Login
        </Link>
        <Link 
          to="/signup" 
          className="auth-button signup-button"
          onClick={() => console.log('Sign Up navigation button clicked from landing page')}
        >
          Sign Up
        </Link>
      </div>
      <div className="landing-content">
        <h1 className="landing-title">note-tortious</h1>
      </div>
    </div>
  );
};

export default LandingPage;