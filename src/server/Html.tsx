import { PreloadedState } from '@reduxjs/toolkit';
import { FC, PropsWithChildren } from 'react';
import { RootState } from '../redux/store';

type HtmlProps = PropsWithChildren & {
  preloadedState: PreloadedState<RootState>;
  style?: string;
};

export const HtmlVite: FC<HtmlProps> = ({ style, preloadedState, children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        {import.meta.env.DEV && (
          <script
            type="module"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true
                  `,
            }}
          />
        )}
        <link
          rel="icon"
          type="image/svg+xml"
          href="/dog-breed-svgrepo-com.svg"
        />
        {style && (
          <link
            rel="stylesheet"
            href={style}
          />
        )}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>Vite + React + TS</title>
      </head>
      <body>
        <div id="root">{children}</div>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
              /</g,
              '\\u003c'
            )}`,
          }}
        />
      </body>
    </html>
  );
};
