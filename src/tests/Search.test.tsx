import { render, screen } from '@testing-library/react';
import React from 'react';
import { LocalStorageMock } from '../utils/mocha';
import { describe, expect, it } from 'vitest';
import { Search } from '../components/Search';
import { SEARCH_KEY } from '../utils/constants';

import userEvent from '@testing-library/user-event';

describe('Search', () => {
  global.localStorage = new LocalStorageMock();

  it('Renders input', () => {
    render(<Search />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('Renders placeholder if the storage is empty', () => {
    localStorage.clear();
    render(<Search />);

    expect(screen.getByRole('searchbox')).toHaveValue('');
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
    render(<Search />);

    const input = screen.getByRole('searchbox');

    expect(input).toHaveValue('123');
  });
});
