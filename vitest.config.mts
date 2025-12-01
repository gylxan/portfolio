import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    css: {
      modules: {
        classNameStrategy: 'stable',
      },
    },
    globals: true,
    setupFiles: ['./setup-tests.ts'],
    environment: 'jsdom',
  },
});
