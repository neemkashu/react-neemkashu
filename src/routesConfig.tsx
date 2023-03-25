import { About } from './components/About';
import { ErrorPage } from './components/ErrorPage';
import Header from './components/Header';
import { MainContent } from './components/MainContent';
import { Headers } from './utils/constants';

export const routesConfig = [
  {
    path: '/',
    element: (
      <>
        <Header title={Headers.MAIN} />
        <MainContent />
      </>
    ),
  },
  {
    path: '/about',
    element: (
      <>
        <Header title={Headers.ABOUT} />
        <About />
      </>
    ),
  },
  {
    path: '/404',
    element: (
      <>
        <Header title={Headers.NOT_FOUND} />
        <ErrorPage />
      </>
    ),
  },
  {
    path: '*',
    element: (
      <>
        <Header title={Headers.NOT_FOUND} />
        <ErrorPage />
      </>
    ),
  },
];
