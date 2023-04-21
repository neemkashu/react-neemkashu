import { act, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { Provider } from 'react-redux';
import { beforeAll, describe, expect, it } from 'vitest';
import { RoutesInfo } from '../utils/constants';
import { handlers } from '../mocks/apiHandlers';
import { SearchController } from '../components/Search/SearchController';
import { store } from '../redux/store';
import { PROXY_URL } from '../api/getCards';
import { flickrApi } from '../api/flickrApi';

const server = setupServer(...handlers);

describe('Search controller', () => {
  const routesMock: RouteObject[] = [
    {
      path: RoutesInfo.MAIN.path,
      element: (
        <Provider store={store}>
          <SearchController />
        </Provider>
      ),
    },
  ];
  const router = createMemoryRouter(routesMock, {
    initialEntries: [RoutesInfo.MAIN.path],
  });
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();

    act(() => {
      store.dispatch(flickrApi.util.resetApiState());
    });
  });
  afterAll(() => server.close());

  it('Renders search', async () => {
    render(<RouterProvider router={router} />);

    const input = await screen.findByRole('searchbox');

    expect(input).toBeInTheDocument();
  });
  it('Renders cards', async () => {
    render(<RouterProvider router={router} />);

    const cardButtons = await screen.findAllByText('Details');

    expect(cardButtons[0]).toBeInTheDocument();
  });

  it('Renders error element if error response', async () => {
    server.use(
      rest.get(PROXY_URL, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Internal server error' }));
      })
    );

    render(<RouterProvider router={router} />);

    const error = await screen.findByText(/error/i);

    expect(error).toBeInTheDocument();
  });
});
