export const SEARCH_KEY = 'search';

export const Headers = {
  MAIN: 'Main Page',
  ABOUT: 'About Us',
  FORM: 'Form',
  NOT_FOUND: 'Not Found',
} as const;

type RouteDetails = {
  path: string;
  header: string;
};

type Routs = Record<keyof typeof Headers, RouteDetails>;

export const RoutesInfo: Routs = {
  MAIN: {
    path: '/',
    header: Headers.MAIN,
  },
  ABOUT: {
    path: '/about',
    header: Headers.ABOUT,
  },
  FORM: {
    path: '/form',
    header: Headers.FORM,
  },
  NOT_FOUND: {
    path: '/404',
    header: Headers.NOT_FOUND,
  },
};

export const imageRegExp = /^.+\.(png|gif|jpe?g)$/i;
