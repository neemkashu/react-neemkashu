import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouteObject, RouterProvider } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { describe, expect, it } from 'vitest';
import { PhotoCardSmall } from '../components/Cards/PhotoCardSmall';
import { RoutesInfo } from '../utils/constants';
import { handlers } from '../mocks/apiHandlers';
import { store } from '../store';
import { PetForm } from '../components/Form/PetForm';
import { Provider } from 'react-redux';

const server = setupServer(...handlers);

const photo = {
  ownername: 'Anna',
  title: 'Doggy',
  id: '1234',
  secret: '123',
  server: '321',
  farm: 6,
  date_taken: '12/12/2012',
  views: '34',
  owner: 'Anna-src',
  tags: 'dog',
};

const routesMock: RouteObject[] = [
  {
    path: RoutesInfo.MAIN.path,
    element: (
      <Provider store={store}>
        {' '}
        <PhotoCardSmall {...photo} />{' '}
      </Provider>
    ),
  },
];

describe('Photo Card', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('Renders content', () => {
    const router = createMemoryRouter(routesMock, {
      initialEntries: [RoutesInfo.MAIN.path],
    });
    const { unmount } = render(<RouterProvider router={router} />);

    const [owner, title] = screen.getAllByRole('listitem');

    expect(owner).toHaveTextContent(photo.ownername);
    expect(title).toHaveTextContent(photo.title);
    unmount();
  });
  it('loads data for modal when click button', async () => {
    const router = createMemoryRouter(routesMock, {
      initialEntries: [RoutesInfo.MAIN.path],
    });
    const { unmount } = render(<RouterProvider router={router} />);

    const button = screen.getByRole('button');

    const user = userEvent.setup();
    await user.click(button);

    const modalDescription = await screen.findByText(/Pork with Salted/i);
    expect(modalDescription).toBeInTheDocument();
    unmount();
  });
});
