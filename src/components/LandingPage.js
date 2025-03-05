import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import {
  FaFeatherAlt, 
  FaChevronDown, 
  FaMagic, 
  FaMicrophone, 
  FaBook, 
  FaBrain, 
  FaGraduationCap
 } from 'react-icons/fa';

const LandingPage = () => {
  useEffect(() => {
    const handleScrollToContent = (e) => {
      e.preventDefault();
      const contentSection = document.getElementById('features');
      contentSection.scrollIntoView({ behavior: 'smooth' });
      console.log('Scroll to features button clicked:', {
        targetId: 'features',
        timestamp: new Date().toISOString()
      });
    };

    const scrollButton = document.getElementById('scroll-button');
    if (scrollButton) {
      scrollButton.addEventListener('click', handleScrollToContent);
    }

    return () => {
      if (scrollButton) {
        scrollButton.removeEventListener('click', handleScrollToContent);
      }
    };
  }, []);

  const logNavigation = (destination) => {
    console.log('Navigation initiated:', {
      from: 'landing-page',
      to: destination,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="logo">
          <FaFeatherAlt className="logo-icon" />
          <span className="logo-text">note-tortious</span>
        </div>
        <div className="auth-buttons">
          <Link 
            to="/login" 
            className="auth-button login-button"
            onClick={() => logNavigation('login')}
          >
            Login
          </Link>
          <Link 
            to="/signup" 
            className="auth-button signup-button"
            onClick={() => logNavigation('signup')}
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Transform Your Lectures Into Smart Study Tools</h1>
            <p className="hero-subtitle">Record, transcribe, and turn your lectures into organized notes, quizzes, and flashcards—all powered by AI.</p>
            <div className="hero-cta">
              <Link 
                to="/signup" 
                className="hero-button"
                onClick={() => {
                  console.log('Hero CTA button clicked:', {
                    action: 'get-started',
                    location: 'hero-section',
                    timestamp: new Date().toISOString()
                  });
                }}
              >
                Start Learning Smarter — It's Free
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-note note-1">
              <FaMicrophone className="note-icon" />
              <span>Record & Transcribe</span>
            </div>
            <div className="floating-note note-2">
              <FaBrain className="note-icon" />
              <span>AI-Powered Learning</span>
            </div>
            <div className="illustration"></div>
          </div>
        </div>
        <a href="#features" id="scroll-button" className="scroll-down-button">
          <FaChevronDown />
        </a>
      </section>

      {/* Common Student Struggles - Problem Statement Section */}
      <section className="problem-section">
        <h2 className="section-title">Common Student Struggles</h2>
        <div className="problem-grid">
          <div className="problem-card">
            <h3>Missing Important Details</h3>
            <p>Trying to keep up with fast-paced lectures while taking notes</p>
          </div>
          <div className="problem-card">
            <h3>Poor Organization</h3>
            <p>Scattered notes across different notebooks and devices</p>
          </div>
          <div className="problem-card">
            <h3>Inefficient Review</h3>
            <p>Hours spent organizing and creating study materials</p>
          </div>
        </div>
      </section>

      {/* How It Works - Solution Overview */}
      <section className="solution-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <FaMicrophone className="step-icon" />
            <h3>1. Record</h3>
            <p>Capture crystal-clear lecture audio with one tap</p>
          </div>
          <div className="step-card">
            <FaBook className="step-icon" />
            <h3>2. Transcribe</h3>
            <p>Get accurate, AI-powered transcription in real-time</p>
          </div>
          <div className="step-card">
            <FaMagic className="step-icon" />
            <h3>3. Generate</h3>
            <p>Transform content into smart study materials instantly</p>
          </div>
        </div>
      </section>

      {/* Smart Learning Features Section */}
      <section id="features" className="features-section">
        <h2 className="section-title">Smart Learning Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaMicrophone className="feature-icon" />
            <h3>Smart Recording</h3>
            <p>High-quality audio capture with noise reduction</p>
          </div>
          <div className="feature-card">
            <FaBook className="feature-icon" />
            <h3>Instant Transcription</h3>
            <p>Real-time conversion of speech to organized text</p>
          </div>
          <div className="feature-card">
            <FaBrain className="feature-icon" />
            <h3>AI Note Generation</h3>
            <p>Automatically structured and summarized notes</p>
          </div>
          <div className="feature-card">
            <FaGraduationCap className="feature-icon" />
            <h3>Study Tools</h3>
            <p>Custom quizzes and flashcards for better retention</p>
          </div>
        </div>
      </section>

      {/* What Students Say - Social Proof Section */}
      <section className="testimonials-section">
        <h2 className="section-title">What Students Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"Improved my grades significantly. The AI-generated study materials are incredibly helpful!"</p>
            <span className="student-name">- Sarah M., Medical Student</span>
          </div>
          <div className="testimonial-card">
            <p>"Finally able to focus on understanding rather than just taking notes."</p>
            <span className="student-name">- James K., Engineering Major</span>
          </div>
        </div>
      </section>

      {/* Ready to Transform - Final CTA Section */}
      <section className="final-cta-section">
        <h2>Ready to Transform Your Learning Experience?</h2>
        <Link 
          to="/signup" 
          className="cta-button"
          onClick={() => logNavigation('signup')}
        >
          Get Started Now
        </Link>
        <p className="cta-subtitle">Join thousands of students already learning smarter</p>
      </section>
      {/* Simplified Footer with About Section */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="about-section">
            <h3 className="about-heading">About note-tortious</h3>
            <p className="about-text">
              We're dedicated to transforming the way students learn by leveraging AI technology to convert lectures into 
              smart, organized study materials. Our mission is to help students focus on understanding concepts rather than 
              just taking notes, making education more effective and accessible for everyone.
            </p>
          </div>
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} note-tortious. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;