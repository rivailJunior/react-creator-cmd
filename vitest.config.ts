// <reference types="vitest" />

import { defineConfig, configDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["**/src/**/tests/**"],
    exclude: [
      ...configDefaults.exclude,
      "**/src/template/http-module/**",
      "**/src/template/route-template/**",
      "**/src/template/next-vitest-playwright/**",
      "**/src/template/next-jest-playwright/**",
      "**/coverage/**",
    ],
    coverage: {
      reporter: ["text", "json-summary", "json"],
      thresholds: {
        lines: 40,
        branches: 40,
        functions: 30,
        statements: 40,
      },
    },
  },
});
