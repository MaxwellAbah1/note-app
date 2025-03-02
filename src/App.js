/**
 * Main Application Component
 * Handles routing and top-level component organization
 */
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import MainApp from './components/MainApp';

function App() {
  // === ROUTING CONFIGURATION ===
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Protected Routes - TODO: Add authentication check */}
        <Route path="/app" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

export default App;