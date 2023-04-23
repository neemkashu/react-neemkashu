import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { App } from './routesConfig';
import { flickrApi } from './api/flickrApi';
import { storeReducer } from './redux/store';

export async function render(url: string): Promise<string> {
  const store = configureStore({
    reducer: storeReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(flickrApi.middleware),
  });
  await Promise.all(store.dispatch(flickrApi.util.getRunningQueriesThunk()));

  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>
  );
}
