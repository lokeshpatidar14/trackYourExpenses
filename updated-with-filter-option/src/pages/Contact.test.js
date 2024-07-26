import React from 'react';
import { render, screen,  } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import { act } from 'react'; 
import Contact from './Contact';

describe('Contact Component', () => {
  test('renders Contact component without crashing', () => {
    act(() => {
      render(<Contact />);
    });
    expect(screen.getByText(/contact information/i)).toBeInTheDocument();
  });

  test('displays the correct contact information', () => {
    act(() => {
      render(<Contact />);
    });
    expect(screen.getByText(/Name: Lokesh/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone: 8839872196/i)).toBeInTheDocument();
    expect(screen.getByText(/WhatsApp: 8839872196/i)).toBeInTheDocument();
  });

  test('email link is correct', () => {
    act(() => {
      render(<Contact />);
    });
    const emailLink = screen.getByRole('link', { name: /lpatidar00@gmail.com/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:lpatidar00@gmail.com');
  });
});
