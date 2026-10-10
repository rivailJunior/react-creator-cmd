import { ProjectOptions } from "./generate-package-json";

const LINT_JOB_ESLINT = `  lint:
    name: ⬣ ESLint
    runs-on: ubuntu-latest
    steps:
      - name: ⬇️ Checkout repo
        uses: actions/checkout@v4

      - name: ⎔ Setup node
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: 📥 Install deps
        run: npm ci

      - name: 🔬 Lint
        run: npm run lint`;

const LINT_JOB_BIOME = `  lint:
    name: 🧹 Biome
    runs-on: ubuntu-latest
    steps:
      - name: ⬇️ Checkout repo
        uses: actions/checkout@v4

      - name: ⎔ Setup node
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: 📥 Install deps
        run: npm ci

      - name: 🔬 Lint & Format check
        run: npm run lint`;

const TYPECHECK_JOB = `  typecheck:
    needs: ["lint"]
    name: ʦ TypeScript
    runs-on: ubuntu-latest
    steps:
      - name: ⬇️ Checkout repo
        uses: actions/checkout@v4

      - name: ⎔ Setup node
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: 📥 Install deps
        run: npm ci

      - name: 🔎 Type check
        run: npx tsc --noEmit`;

const UNIT_TEST_JOB = `  test:
    needs: ["typecheck"]
    name: 🧪 Unit tests
    runs-on: ubuntu-latest
    steps:
      - name: ⬇️ Checkout repo
        uses: actions/checkout@v4

      - name: ⎔ Setup node
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: 📥 Install deps
        run: npm ci

      - name: Running test
        run: npm run test:unit`;

const E2E_PLAYWRIGHT_JOB = `  test-e2e:
    needs: ["test"]
    name: 🎭 E2E Playwright
    timeout-minutes: 60
    runs-on: ubuntu-latest
    if: \${{ success() }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: npx playwright test

      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30`;

const E2E_CYPRESS_JOB = `  test-e2e:
    needs: ["test"]
    name: 🌲 E2E Cypress
    timeout-minutes: 60
    runs-on: ubuntu-latest
    if: \${{ success() }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install dependencies
        run: npm ci

      - name: Run Cypress tests
        uses: cypress-io/github-action@v6
        with:
          build: npm run build
          start: npm start
          browser: chrome`;

export const generateCiWorkflow = (options: ProjectOptions): string => {
  const lintJob =
    options.linting === "biome" ? LINT_JOB_BIOME : LINT_JOB_ESLINT;
  const e2eJob =
    options.endToEnd === "cypress" ? E2E_CYPRESS_JOB : E2E_PLAYWRIGHT_JOB;

  return `name: CI/CD

env:
  WELCOME_MESSAGE: We are here to help you with your Next.js project 🥳

on:
  push:
    branches: ["main", "dev"]
  pull_request:
    branches: ["main", "dev"]

permissions:
  actions: write
  contents: read

jobs:
${lintJob}

${TYPECHECK_JOB}

${UNIT_TEST_JOB}

${e2eJob}
`;
};
