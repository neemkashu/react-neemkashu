import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { routesConfig } from '../routesConfig';
import { RoutesInfo } from '../utils/constants';
import { store } from '../store';

describe('Router', () => {
  it('Renders about page', () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: [RoutesInfo.ABOUT.path],
    });
    const { unmount } = render(<RouterProvider router={router} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('About Us');
    unmount();
  });
  it('Renders main page', async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: [RoutesInfo.MAIN.path],
    });
    const { unmount } = render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    expect(await screen.findByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main Page');
    unmount();
  });
  it('Renders not found page', () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/123'],
    });
    const { unmount } = render(<RouterProvider router={router} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/not found/i);
    unmount();
  });
  it('Renders form page', () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/form'],
    });
    const { unmount } = render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/form/i);
    unmount();
  });
});
