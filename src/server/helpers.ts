import { STORE_PRELOAD_KEY } from './constants';

export const getPreloadScript = (preloadedState: string): string =>
  `window.${STORE_PRELOAD_KEY} = ${preloadedState.replace(/</g, '\\u003c')}`;
