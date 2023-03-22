import { About } from './components/About';
import { ErrorPage } from './components/ErrorPage';
import Header from './components/Header';
import { MainContent } from './components/MainContent';
import { RoutesInfo } from './utils/constants';

export const routesConfig = [
  {
    path: RoutesInfo.MAIN.path,
    element: (
      <>
        <Header title={RoutesInfo.MAIN.header} />
        <MainContent />
      </>
    ),
  },
  {
    path: RoutesInfo.ABOUT.path,
    element: (
      <>
        <Header title={RoutesInfo.ABOUT.header} />
        <About />
      </>
    ),
  },
  {
    path: RoutesInfo.NOT_FOUND.path,
    element: (
      <>
        <Header title={RoutesInfo.NOT_FOUND.header} />
        <ErrorPage />
      </>
    ),
  },
];
