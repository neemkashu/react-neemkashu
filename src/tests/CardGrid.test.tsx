import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CardGrid } from '../layouts/CardGrid';

describe('Grid component', () => {
  it('Renders grid children', () => {
    const element = (
      <CardGrid>
        {Array.from({ length: 6 }).map((_, index) => {
          const key = `${index}`;
          return <h3 key={key}>Hello</h3>;
        })}
      </CardGrid>
    );
    render(element);

    expect(screen.getAllByRole('heading', { level: 3 }).length).toBe(6);
  });
});
