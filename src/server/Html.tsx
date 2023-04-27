import { PreloadedState } from '@reduxjs/toolkit';
import { FC, PropsWithChildren } from 'react';
import { RootState } from '../redux/store';
import { VITE_HEADER_SCRIPT } from './constants';
import { getPreloadScript } from './helpers';

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
              __html: VITE_HEADER_SCRIPT,
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
            __html: getPreloadScript(JSON.stringify(preloadedState)),
          }}
        />
      </body>
    </html>
  );
};
