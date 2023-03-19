import { About } from './components/About';
import { ErrorPage } from './components/ErrorPage';
import Header from './components/Header';
import { MainContent } from './components/MainContents';
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
    path: '*',
    element: (
      <>
        <Header title={Headers.NOT_FOUND} />
        <ErrorPage />
      </>
    ),
  },
];
