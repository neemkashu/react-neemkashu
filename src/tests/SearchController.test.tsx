import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { describe, expect, it } from 'vitest';
import { RoutesInfo } from '../utils/constants';
import { handlers } from '../mocks/apiHandlers';
import { SearchController } from '../components/Search/SearchController';
import { LocalStorageMock } from '../utils/mocha';
import { photoLoader } from '../router/loaders';
import { store } from '../store';
import { Provider } from 'react-redux';

const server = setupServer(...handlers);

const routesMock: RouteObject[] = [
  {
    path: RoutesInfo.MAIN.path,
    element: (
      <Provider store={store}>
        {' '}
        <SearchController />{' '}
      </Provider>
    ),
    loader: photoLoader,
  },
];
global.localStorage = new LocalStorageMock();

describe('Search controller', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('Renders search', async () => {
    const router = createMemoryRouter(routesMock, {
      initialEntries: [RoutesInfo.MAIN.path],
    });
    render(<RouterProvider router={router} />);

    const input = await screen.findByRole('searchbox');

    expect(input).toBeInTheDocument();
  });
  it('Renders cards', async () => {
    const router = createMemoryRouter(routesMock, {
      initialEntries: [RoutesInfo.MAIN.path],
    });
    render(<RouterProvider router={router} />);

    const cardButtons = await screen.findAllByText('Details');

    expect(cardButtons[0]).toBeInTheDocument();
  });
});
