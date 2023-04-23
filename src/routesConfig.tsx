import {
  createRoutesFromChildren,
  Navigate,
  Outlet,
  Route,
  RouteObject,
  Routes,
} from 'react-router-dom';
import { FC } from 'react';
import Header from './components/Header';
import { AboutPage } from './pages/AboutPage';
import { FormPage } from './pages/FormPage';
import { MainPage } from './pages/MainPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RoutesInfo } from './utils/constants';

const AppRoutes = (
  <Route
    element={
      <>
        <Header />
        <Outlet />
      </>
    }
  >
    <Route
      path={RoutesInfo.MAIN.path}
      element={<MainPage />}
    />
    <Route
      path={RoutesInfo.ABOUT.path}
      element={<AboutPage />}
    />
    <Route
      path={RoutesInfo.FORM.path}
      element={<FormPage />}
    />
    <Route
      path={RoutesInfo.NOT_FOUND.path}
      element={<NotFoundPage />}
    />
    <Route
      path="*"
      element={
        <Navigate
          to={RoutesInfo.NOT_FOUND.path}
          replace
        />
      }
    />
  </Route>
);
export const routesConfig: RouteObject[] = createRoutesFromChildren(AppRoutes);

export const App: FC<Record<string, never>> = () => {
  return <Routes>{AppRoutes}</Routes>;
};
