/**
 * App Component Test Suite
 * Contains tests for core application functionality
 */

// === TEST DEPENDENCIES ===
import { render, screen } from '@testing-library/react';
import App from './App';

// === RENDER TESTS ===
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
