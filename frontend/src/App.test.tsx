import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app without crashing', () => {
  const { container } = render(<App />);
  // Basic test to ensure app renders
  expect(container).toBeTruthy();
});


