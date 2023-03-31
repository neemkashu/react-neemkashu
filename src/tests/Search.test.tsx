import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { LocalStorageMock } from '../utils/mocha';
import { Search } from '../components/Search';
import { SEARCH_KEY } from '../utils/constants';

describe('Search', () => {
  global.localStorage = new LocalStorageMock();

  it('Renders input', () => {
    const { unmount } = render(<Search />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    unmount();
  });

  it('Renders placeholder if the storage is empty', () => {
    localStorage.clear();
    const { unmount } = render(<Search />);

    expect(screen.getByRole('searchbox')).toHaveValue('');
    unmount();
  });

  it('Saves input in the storage on unmount', async () => {
    localStorage.clear();
    const { unmount } = render(<Search />);

    const input = screen.getByRole('searchbox');

    await userEvent.type(input, 'value');
    expect(input).toHaveValue('value');

    unmount();
    expect(localStorage.getItem(SEARCH_KEY)).toEqual('value');
  });

  it('Gets input from the storage on mount', async () => {
    localStorage.clear();
    localStorage.setItem(SEARCH_KEY, '123');
    const { unmount } = render(<Search />);

    const input = screen.getByRole('searchbox');

    expect(input).toHaveValue('123');
    unmount();
  });
});
