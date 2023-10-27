// Import necessary functions and modules for testing from '@testing-library/react'
import { render, screen } from '@testing-library/react';

// Import the main App component that you want to test
import App from './App';

// Define a test case
test('renders learn react link', () => {
  // Render the App component
  render(<App />);
  
  // Use the screen object to find elements in the rendered component
  // In this case, you're looking for an element that contains the text 'learn react'
  const linkElement = screen.getByText(/learn react/i);
  
  // Use the testing assertion to check if the found element is in the document
  expect(linkElement).toBeInTheDocument();
});
