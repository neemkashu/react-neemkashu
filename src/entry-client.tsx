import ReactDOM from 'react-dom/client';
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { About } from './components/About';
import { store } from './redux/store';
import { routesConfig } from './routesConfig';

const root = document.querySelector('#app') as HTMLElement;

// # mounts the app to a DOM element
const router = createBrowserRouter(routesConfig);

ReactDOM.hydrateRoot(
  root,
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
console.log('hydrated');
