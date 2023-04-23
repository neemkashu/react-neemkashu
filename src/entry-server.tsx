import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { App } from './routesConfig';
import { flickrApi } from './api/flickrApi';
import { searchSlice } from './redux/searchSlice';
import { formSlice } from './redux/formSlice';

export async function render(url: string): Promise<string> {
  const store = configureStore({
    reducer: {
      [flickrApi.reducerPath]: flickrApi.reducer,
      search: searchSlice.reducer,
      form: formSlice.reducer,
    },
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
