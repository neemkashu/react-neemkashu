import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Creator } from '../components/Creator';
import { PetCardTextContent } from '../components/PetCard';

describe('Creator component', () => {
  it('Renders form', () => {
    render(<Creator />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });
  it('Does nothing if the form is incorrect', () => {
    render(<Creator />);
    const form = screen.getByRole('form', { name: '' });

    if (form instanceof HTMLFormElement) {
      const cards = screen.queryAllByText(PetCardTextContent.petBirth);
      const previousCardAmount = cards.length;
      form.submit();

      const cardsNew = screen.queryAllByText(PetCardTextContent.petBirth);
      expect(cardsNew.length).toBe(previousCardAmount);
    }
  });
});
