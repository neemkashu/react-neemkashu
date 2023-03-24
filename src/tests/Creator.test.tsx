import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Creator } from '../components/Creator';
import { PetCardTextContent } from '../utils/constants';
import { fillForm } from './PetForm.test';

describe('Creator component', () => {
  it('Renders form', () => {
    render(<Creator />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });
  it('Does nothing if the form is incorrect', async () => {
    render(<Creator />);
    const form = screen.getByRole('form', { name: '' });

    if (form instanceof HTMLFormElement) {
      const cards = screen.queryAllByText(PetCardTextContent.petBirth);
      const previousCardAmount = cards.length;

      const submitButton = screen.getByRole('button');
      const user = userEvent.setup();
      await user.click(submitButton);

      const cardsNew = screen.queryAllByText(PetCardTextContent.petBirth);
      expect(cardsNew.length).toBe(previousCardAmount);
    }
  });
  it('Renders card if submit correct data', async () => {
    URL.createObjectURL = vi.fn().mockReturnValue('mock-url');
    render(<Creator />);
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await fillForm();

    const user = userEvent.setup();
    await user.click(submitButton);

    const petCard = screen.getByText('Aname');
    expect(petCard).toBeInTheDocument();
  });
});
