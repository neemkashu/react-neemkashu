/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { configDefaults, defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setupTests.ts',
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
    coverage: {
      enabled: true,
      provider: 'c8',
      reporter: ['text'],
      all: true,
      exclude: [
        ...configDefaults.coverage.exclude,
        '*.cjs',
        'src/main.tsx',
        '*.d.ts',
        'src/utils/constants.ts',
        'src/utils/mocha.ts',
        'src/utils/types.ts',
        'src/pages/*',
      ],
    },
  },
});
