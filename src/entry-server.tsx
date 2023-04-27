import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import type { Request, Response } from 'express';
import { App } from './routesConfig';
import { flickrApi } from './api/flickrApi';
import { storeReducer } from './redux/store';
import { HtmlVite } from './server/Html';
import { RoutesInfo } from './utils/constants';

interface AssetMap {
  style?: string;
  script: string;
}

export async function render(req: Request, res: Response, assetMap: AssetMap): Promise<void> {
  const store = configureStore({
    reducer: storeReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(flickrApi.middleware),
  });

  if (req.originalUrl === RoutesInfo.MAIN.path) {
    store.dispatch(flickrApi.endpoints.getPhotosByQuery.initiate(''));
  }
  await Promise.all(store.dispatch(flickrApi.util.getRunningQueriesThunk()));
  const preloadedState = store.getState();

  let didError = false;

  const { pipe } = renderToPipeableStream(
    <HtmlVite
      style={assetMap.style}
      preloadedState={preloadedState}
    >
      <Provider store={store}>
        <StaticRouter location={req.originalUrl}>
          <App />
        </StaticRouter>
      </Provider>
    </HtmlVite>,
    {
      onShellReady() {
        res.statusCode = didError ? 500 : 200;
        res.setHeader('content-type', 'text/html');
        pipe(res);
      },
      onShellError() {
        res.statusCode = 500;
        res.setHeader('content-type', 'text/html');
        res.send('Something went wrong');
      },
      onError(err: unknown) {
        didError = true;
        res.statusCode = 500;
        // eslint-disable-next-line no-console
        console.log('err: ', err);
      },
      bootstrapModules: [assetMap.script],
    }
  );
}
