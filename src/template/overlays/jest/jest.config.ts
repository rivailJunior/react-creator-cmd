import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const coverageAcceptanceThreshold = 25;

const config: Config = {
  setupFilesAfterSetup: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/", "<rootDir>/cypress/", "<rootDir>/e2e/"],
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coverageThreshold: {
    global: {
      branches: coverageAcceptanceThreshold,
      functions: coverageAcceptanceThreshold,
      lines: coverageAcceptanceThreshold,
      statements: coverageAcceptanceThreshold,
    },
  },
};

export default createJestConfig(config);
