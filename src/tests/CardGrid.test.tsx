import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CardGrid } from 'src/layouts/CardGrid';

describe('Grid component', () => {
  it('Renders grid children', () => {
    render(
      <CardGrid>
        {Array.from({ length: 6 }).map((_, index) => (
          <h3 key={index}>Hello</h3>
        ))}
      </CardGrid>
    );

    expect(screen.getAllByRole('heading', { level: 3 }).length).toBe(6);
  });
});
