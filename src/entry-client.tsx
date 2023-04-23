import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { routesConfig } from './routesConfig';
import './index.css';

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
