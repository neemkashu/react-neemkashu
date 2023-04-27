import { hydrateRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PreloadedState, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import { routesConfig } from './routesConfig';
import './index.css';
import { RootState, storeReducer } from './redux/store';
import { flickrApi } from './api/flickrApi';
import { STORE_PRELOAD_KEY } from './server/constants';

const root = document.querySelector('#root') as HTMLElement;
const router = createBrowserRouter(routesConfig);

interface CustomWindow extends Window {
  [STORE_PRELOAD_KEY]?: PreloadedState<RootState>;
}

declare const window: CustomWindow;

const store = configureStore({
  reducer: storeReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(flickrApi.middleware),
  preloadedState: window[STORE_PRELOAD_KEY],
});

hydrateRoot(
  root,
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
console.log('hydrated');
