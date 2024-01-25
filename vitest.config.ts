// <reference types="vitest" />

import { defineConfig, configDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    exclude: [
      ...configDefaults.exclude,
      "**/e2e/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/src/template/**",
    ],
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});
