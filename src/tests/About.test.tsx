import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { About } from '../components/About';

describe('About', () => {
  it('Renders about content', () => {
    render(<About />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/react app/i);
  });
});
