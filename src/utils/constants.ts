export const SEARCH_KEY = 'search';

export const Headers = {
  MAIN: 'Main Page',
  ABOUT: 'About Us',
  NOT_FOUND: 'Not Found',
} as const;

type RouteDetails = {
  path: string;
  header: string;
};

type routs = Record<keyof typeof Headers, RouteDetails>;

export const RoutesInfo: routs = {
  MAIN: {
    path: '/',
    header: Headers.MAIN,
  },
  ABOUT: {
    path: '/about',
    header: Headers.ABOUT,
  },
  NOT_FOUND: {
    path: '*',
    header: Headers.NOT_FOUND,
  },
};
