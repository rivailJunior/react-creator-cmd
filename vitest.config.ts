// <reference types="vitest" />

import { defineConfig, configDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/src/**/tests/**'],
    exclude: [
      ...configDefaults.exclude,
      '**/src/template/http-module/**',
      '**/src/template/route-template/**',
      '**/src/template/**',
      '**/coverage/**',
    ],
    coverage: {
      reporter: ['text', 'json-summary', 'json'],
      thresholds: {
        lines: 70,
        branches: 70,
        functions: 60,
        statements: 70,
      },
      exclude: [
        '**/src/template/**',
        '**/src/index.ts',
        '**/src/interfaces/**',
        '.eslintrc.js',
        'commitlint.config.js',
      ],
    },
  },
});
