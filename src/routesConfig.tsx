import { Navigate } from 'react-router-dom';
import { AboutPage } from './pages/AboutPage';
import { FormPage } from './pages/FormPage';
import { MainPage } from './pages/MainPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { RoutesInfo } from './utils/constants';

export const routesConfig = [
  {
    path: RoutesInfo.MAIN.path,
    element: <MainPage />,
  },
  {
    path: RoutesInfo.ABOUT.path,
    element: <AboutPage />,
  },
  {
    path: RoutesInfo.FORM.path,
    element: <FormPage />,
  },
  {
    path: RoutesInfo.NOT_FOUND.path,
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: (
      <Navigate
        to={RoutesInfo.NOT_FOUND.path}
        replace={true}
      />
    ),
  },
];
