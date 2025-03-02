/**
 * Application Entry Point
 * Bootstraps React and renders the root component
 */

// === CORE DEPENDENCIES ===
import React from 'react';
import ReactDOM from 'react-dom/client';

// === STYLES ===
import './index.css';

// === COMPONENTS ===
import App from './App';

// === PERFORMANCE MONITORING ===
import reportWebVitals from './reportWebVitals';

// === APPLICATION BOOTSTRAP ===
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// === PERFORMANCE MEASUREMENT ===
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
