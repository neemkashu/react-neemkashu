import { hydrateRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import { store } from './redux/store';
import { routesConfig } from './routesConfig';
import './index.css';

const root = document.querySelector('#root') as HTMLElement;
const router = createBrowserRouter(routesConfig);

hydrateRoot(
  root,
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
console.log('hydrated');
