import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const isTest = process.env.VITEST;
const isProduction = process.env.NODE_ENV === 'production';

async function createProdServer(): Promise<void> {
  const app = express();
  app.use(
    (await import('serve-static')).default(path.resolve(dirname, './dist/client'), {
      index: false,
    })
  );
  app.use('*', async (req, res, next) => {
    try {
      const { render } =
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line import/extensions, import/no-unresolved
        (await import('./dist/server/entry-server.js')).render;
      const script = `/assets/${fs
        .readdirSync(path.resolve(dirname, '../../dist/client/assets'))
        .filter((fn: string) => fn.endsWith('js'))}`;
      const style = `/assets/${fs
        .readdirSync(path.resolve(dirname, '../../dist/client/assets'))
        .filter((fn: string) => fn.includes('css'))}`;

      const assetMap = { style, script };
      render(req, res, assetMap);
    } catch (error) {
      if (error instanceof Error) {
        // eslint-disable-next-line no-console
        console.error(error.stack);
        res.status(500).end(error.stack);
      }
      next(error);
    }
  });
  app.listen(5173);
}

async function createDevServer(root = process.cwd()): Promise<void> {
  const app = express();

  const vite = await createViteServer({
    root,
    logLevel: isTest ? 'error' : 'info',
    server: {
      middlewareMode: true,
      watch: {
        usePolling: true,
        interval: 100,
      },
      hmr: true,
    },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    try {
      // TODO: check if possible to get parsed object from vite.transformIndexHtml

      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
      const assetMap = { script: 'src/entry-client.tsx', style: 'src/index.css' };
      render(req, res, assetMap);
    } catch (error) {
      if (error instanceof Error) {
        vite.ssrFixStacktrace(error);
      }
      next(error);
    }
  });
  if (!isTest) {
    app.listen(5173);
    // eslint-disable-next-line no-console
    console.log('listen to http://localhost:5173');
  }
}
if (!isProduction) {
  createDevServer();
} else {
  createProdServer();
}
