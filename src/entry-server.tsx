import ReactDOMServer, { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import type { Request, Response } from 'express';
import { App } from './routesConfig';
import { flickrApi } from './api/flickrApi';
import { storeReducer } from './redux/store';
import { HtmlVite } from './server/Html';

interface AssetMap {
  style?: string;
  script: string;
}

export async function render(
  req: Request,
  res: Response,
  assetMap: AssetMap,
  url: string
): Promise<void> {
  const store = configureStore({
    reducer: storeReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(flickrApi.middleware),
  });
  store.dispatch(flickrApi.endpoints.getPhotosByQuery.initiate(''));
  await Promise.all(store.dispatch(flickrApi.util.getRunningQueriesThunk()));
  const preloadedState = store.getState();

  const { pipe } = renderToPipeableStream(
    <HtmlVite
      style={assetMap.style}
      preloadedState={preloadedState}
    >
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </HtmlVite>,
    {
      onShellReady() {
        res.statusCode = 200;
        res.setHeader('content-type', 'text/html');
        pipe(res);
      },
      onShellError() {
        res.statusCode = 500;
        res.setHeader('content-type', 'text/html');
        res.send('<h1>Something went wrong</h1>');
      },
      onError(err: unknown) {
        res.statusCode = 500;
        console.error(err);
      },
      bootstrapModules: [assetMap.script],
    }
  );
}
