import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ErrorPage } from '../components/ErrorPage';

describe('Error Page', () => {
  it('Renders Error Page content', () => {
    render(<ErrorPage />);
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
