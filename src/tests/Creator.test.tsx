import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Creator } from '../components/Creator';
import { TEXT_CONTENT } from '../components/Form/PopMessage';
import { PetCardTextContent } from '../components/PetCard';
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
      const cards = screen.queryAllByText(PetCardTextContent.PET_BIRTH);
      const previousCardAmount = cards.length;

      const submitButton = screen.getByRole('button');
      const user = userEvent.setup();
      await user.click(submitButton);

      const cardsNew = screen.queryAllByText(PetCardTextContent.PET_BIRTH);
      expect(cardsNew.length).toBe(previousCardAmount);
    }
  });
  it('Renders card if submit correct data', async () => {
    URL.createObjectURL = vi.fn().mockReturnValue('mock-url');
    URL.revokeObjectURL = vi.fn();
    render(<Creator />);
    const submitButton = screen.getByRole('button');
    await fillForm();

    const user = userEvent.setup();
    await user.click(submitButton);

    const petCard = screen.getAllByRole('heading', { level: 2 })[1];
    expect(petCard).toBeInTheDocument();
    expect(petCard).toHaveTextContent('Aname');
  });
  it('Renders notification if submit correct data', async () => {
    URL.createObjectURL = vi.fn().mockReturnValue('mock-url');
    URL.revokeObjectURL = vi.fn();
    render(<Creator />);
    const submitButton = screen.getByRole('button');
    await fillForm();

    const user = userEvent.setup();
    await user.click(submitButton);

    const message = screen.queryByText(TEXT_CONTENT);
    expect(message).toBeInTheDocument();
  });
  it('Renders success message if submit correct data', async () => {
    URL.createObjectURL = vi.fn().mockReturnValue('mock-url');
    URL.revokeObjectURL = vi.fn();
    render(<Creator />);
    const submitButton = screen.getByRole('button');
    await fillForm();

    const user = userEvent.setup();
    await user.click(submitButton);

    await waitFor(() => {
      const startTime = Date.now();
      while (Date.now() - startTime < 2000) {}
      return true;
    });
    const message = screen.queryByText(TEXT_CONTENT);
    expect(message).not.toBeInTheDocument();
    vi.restoreAllMocks();
  });
});
