import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
// import { App } from './App'

export function render(url: string): string {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <p>Hello world</p>
    </StaticRouter>
  );
}
