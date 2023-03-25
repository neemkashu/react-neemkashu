import { render, screen } from '@testing-library/react';
import { pet, petMale } from '../utils/mocha';
import { describe, expect, it } from 'vitest';
import { PetCard, PetCardTextContent } from '../components/PetCard';

describe('Pet Card', () => {
  it('Renders headers content', () => {
    render(<PetCard {...pet} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(pet.name);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(pet.type);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(pet.sex);
  });
  it('Renders properties of card parameters (female)', () => {
    render(<PetCard {...pet} />);
    const parametersListItems = screen.getAllByRole('listitem');

    expect(parametersListItems).toHaveLength(2);

    expect(parametersListItems[0]).toHaveTextContent(pet.birth);
    expect(parametersListItems[1]).toHaveTextContent('yes');
    expect(parametersListItems[1]).toHaveTextContent(PetCardTextContent.PET_SHOW);
  });
  it('Renders properties of card parameters (male)', () => {
    render(<PetCard {...petMale} />);
    const parametersListItems = screen.getAllByRole('listitem');
    expect(parametersListItems[1]).toHaveTextContent('no');
  });
});
