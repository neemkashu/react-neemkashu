import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express, { Express } from 'express';
import { createServer as createViteServer, ViteDevServer } from 'vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const isTest = process.env.VITEST;

async function createServer(
  root = process.cwd(),
  isProduction = process.env.NODE_ENV === 'production'
): Promise<{ app: Express; vite: ViteDevServer }> {
  const app = express();

  const indexProd = isProduction
    ? fs.readFileSync(path.resolve(dirname, 'dist/client/index.html'), 'utf-8')
    : '';
  if (!isProduction) {
    // Create Vite server in middleware mode and configure the app type as
    // 'custom', disabling Vite's own HTML serving logic so parent server
    // can take control
    const vite = await createViteServer({
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
      },
      appType: 'custom',
    });
    console.log('root', root);
    // Use vite's connect instance as middleware. If you use your own
    // express router (express.Router()), you should use router.use
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;

      try {
        // 1. Read index.html
        let template = fs.readFileSync(path.resolve(dirname, 'index.html'), 'utf-8');

        // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
        //    and also applies HTML transforms from Vite plugins, e.g. global
        //    preambles from @vitejs/plugin-react
        template = await vite.transformIndexHtml(url, template);

        // 3. Load the server entry. ssrLoadModule automatically transforms
        //    ESM source code to be usable in Node.js! There is no bundling
        //    required, and provides efficient invalidation similar to HMR.
        const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');

        // 4. render the app HTML. This assumes entry-server.js's exported
        //     `render` function calls appropriate framework SSR APIs,
        //    e.g. ReactDOMServer.renderToString()
        const appHtml = await render(url);

        // 5. Inject the app-rendered HTML into the template.
        const html = template.replace(`<!--ssr-outlet-->`, appHtml);

        // 6. Send the rendered HTML back.
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (error) {
        // If an error is caught, let Vite fix the stack trace, so it maps back
        // to your actual source code.
        if (error instanceof Error) {
          vite.ssrFixStacktrace(error);
        }
        next(error);
      }
    });

    app.listen(5173);
    return { app, vite };
  }
  throw new Error('production mode is not implemented');
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(8080, () => {
      console.log('http://localhost:5173');
    })
  );
}
