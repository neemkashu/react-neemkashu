import { Navigate, Outlet } from 'react-router-dom';
import Header from './components/Header';
import { AboutPage } from './pages/AboutPage';
import { FormPage } from './pages/FormPage';
import { MainPage } from './pages/MainPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { RoutesInfo } from './utils/constants';
import { photoLoader } from './components/Search/SearchController';
import { findPhotos } from './components/Search/findPhotos';

export const routesConfig = [
  {
    path: RoutesInfo.MAIN.path,
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      {
        path: RoutesInfo.MAIN.path,
        element: <MainPage />,
        loader: photoLoader,
        action: findPhotos,
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
            replace
          />
        ),
      },
    ],
  },
];
