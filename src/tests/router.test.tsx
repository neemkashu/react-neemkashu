import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { routesConfig } from '../routesConfig';
import React from 'react';
import userEvent from '@testing-library/user-event';

test('click post goes to /post/:postId', async () => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: ['/posts'],
  });

  render(<RouterProvider router={router} />);

  // make assertions, await changes, etc...
});

describe('Router', () => {
  it('Renders about page', () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/about'],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('About Us');
  });
  it('Renders main page', () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main Page');
  });
  it('Renders not found page', () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/123'],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Oops');
  });
  it('Implement navigation', async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={router} />);
    const user = userEvent.setup();
    const aboutLink = screen.getAllByText(/about/i)[0];
    await user.click(aboutLink);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('About');

    const mainLink = screen.getAllByText(/main/i)[0];
    await user.click(mainLink);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main');
  });
});
