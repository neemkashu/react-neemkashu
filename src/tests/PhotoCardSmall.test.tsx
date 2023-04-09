import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { PhotoCardSmall } from '../components/Cards/PhotoCardSmall';
import { RoutesInfo } from '../utils/constants';
import { getCard } from '../api/getCards';

vi.mock('../api/getCards');

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
    element: <PhotoCardSmall {...photo} />,
  },
];

describe('Photo Card', () => {
  it('Renders content', () => {
    const router = createMemoryRouter(routesMock, {
      initialEntries: [RoutesInfo.MAIN.path],
    });
    render(<RouterProvider router={router} />);

    const [owner, title] = screen.getAllByRole('listitem');

    expect(owner).toHaveTextContent(photo.ownername);
    expect(title).toHaveTextContent(photo.title);
  });
  it('loads data for modal when click button', () => {
    const router = createMemoryRouter(routesMock, {
      initialEntries: [RoutesInfo.MAIN.path],
    });
    render(<RouterProvider router={router} />);

    const [owner, title] = screen.getAllByRole('listitem');

    expect(owner).toHaveTextContent(photo.ownername);
    expect(title).toHaveTextContent(photo.title);
  });
});
