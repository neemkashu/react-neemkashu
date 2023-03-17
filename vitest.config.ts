import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text'],
      all: true,
    },
    environment: 'jsdom',
    setupFiles: './src/tests/setupTests.ts',
  },
});
