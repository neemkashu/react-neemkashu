import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import { Creator } from '../components/Creator';
import { TEXT_CONTENT } from '../components/Form/PopMessage';
import { PetCardTextContent } from '../components/Cards/PetCard';
import { fillForm } from './PetForm.test';
import { store } from '../store';

describe('Creator component', () => {
  beforeEach(() => {
    URL.createObjectURL = vi.fn().mockReturnValue('mock-url');
    render(
      <Provider store={store}>
        <Creator />
      </Provider>
    );
  });

  it('Renders form', () => {
    expect(screen.getByRole('form')).toBeInTheDocument();
  });
  it('Does nothing if the form is incorrect', async () => {
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
    const submitButton = screen.getByRole('button');
    await fillForm();

    const user = userEvent.setup();
    await user.click(submitButton);

    const petCard = screen.getAllByRole('heading', { level: 2 })[1];
    expect(petCard).toBeInTheDocument();
    expect(petCard).toHaveTextContent('Aname');
  });
  it('Renders notification if submit correct data', async () => {
    const submitButton = screen.getByRole('button');
    await fillForm();

    const user = userEvent.setup();
    await user.click(submitButton);

    const message = screen.queryByText(TEXT_CONTENT);
    expect(message).toBeInTheDocument();
  });
});
