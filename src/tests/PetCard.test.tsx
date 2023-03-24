import { render, screen } from '@testing-library/react';
import { pet } from '../utils/mocha';
import { describe, expect, it } from 'vitest';
import { PetCard } from '../components/PetCard';

describe('Pet Card', () => {
  it('Renders headers content', () => {
    render(<PetCard {...pet} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(pet.name);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(pet.type);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(pet.sex);
  });
});
