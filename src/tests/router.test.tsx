import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { routesConfig } from '../routesConfig';
import { RoutesInfo } from '../utils/constants';

describe('Router', () => {
  it('Renders about page', () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: [RoutesInfo.ABOUT.path],
    });
    const { unmount } = render(<RouterProvider router={router} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('About Us');
    unmount();
  });
  it('Renders main page', () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: [RoutesInfo.MAIN.path],
    });
    const { unmount } = render(<RouterProvider router={router} />);

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
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
    const { unmount } = render(<RouterProvider router={router} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/form/i);
    unmount();
  });
  it('Implement navigation', async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: [RoutesInfo.MAIN.path],
    });
    const { unmount } = render(<RouterProvider router={router} />);
    const user = userEvent.setup();
    const aboutLink = screen.getAllByText(/about/i)[0];
    await user.click(aboutLink);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('About');

    const mainLink = screen.getAllByText(/main/i)[0];
    await user.click(mainLink);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main');
    unmount();
  });
});
