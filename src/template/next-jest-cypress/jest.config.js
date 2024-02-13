const nextJest = require("next/jest");

const coverageAcceptanceThreshold = 25; // Update to match your requirements

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom", // Add coverage-related configuration
  testPathIgnorePatterns: ["/node_modules/", "<rootDir>/cypress/"],
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  coverageThreshold: {
    global: {
      branches: coverageAcceptanceThreshold,
      functions: coverageAcceptanceThreshold,
      lines: coverageAcceptanceThreshold,
      statements: coverageAcceptanceThreshold,
    },
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
