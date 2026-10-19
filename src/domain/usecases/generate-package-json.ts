export type ProjectOptions = {
  projectName: string;
  unit: string;
  endToEnd: string;
  linting: string;
  uiLibrary: string;
};

type PackageJson = {
  name: string;
  version: string;
  private: boolean;
  scripts: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
};

const BASE_DEPENDENCIES: Record<string, string> = {
  next: "^15.1.0",
  react: "^19.0.0",
  "react-dom": "^19.0.0",
  zod: "^3.24.0",
};

const BASE_DEV_DEPENDENCIES: Record<string, string> = {
  '@commitlint/cli': '^19.6.0',
  '@commitlint/config-conventional': '^19.6.0',
  husky: '^9.1.0',
  typescript: '^5.7.0',
  '@types/node': '^22.0.0',
  '@types/react': '^19.0.0',
  '@types/react-dom': '^19.0.0',
  tailwindcss: '^4.0.0',
  '@tailwindcss/postcss': '^4.0.0',
};

const BASE_SCRIPTS: Record<string, string> = {
  dev: "next dev --turbopack",
  build: "next build",
  start: "next start",
  prepare: "husky",
  commitlint: "commitlint --edit",
};

const VITEST_SCRIPTS: Record<string, string> = {
  "test:unit": "vitest run",
};

const VITEST_DEV_DEPENDENCIES: Record<string, string> = {
  "@testing-library/react": "^16.1.0",
  "@testing-library/user-event": "^14.5.2",
  "@vitejs/plugin-react": "^4.3.0",
  "@vitest/coverage-v8": "^3.0.0",
  "@vitest/ui": "^3.0.0",
  jsdom: "^25.0.0",
  vitest: "^3.0.0",
};

const JEST_SCRIPTS: Record<string, string> = {
  "test:unit": "jest",
  "test:coverage": "jest --coverage",
};

const JEST_DEV_DEPENDENCIES: Record<string, string> = {
  "@jest/globals": "^30.0.0",
  "@testing-library/jest-dom": "^6.6.0",
  "@testing-library/react": "^16.1.0",
  "@testing-library/user-event": "^14.5.2",
  "@types/jest": "^30.0.0",
  jest: "^30.0.0",
  "jest-environment-jsdom": "^30.0.0",
  "ts-jest": "^29.2.0",
  "ts-node": "^10.9.2",
};

const PLAYWRIGHT_SCRIPTS: Record<string, string> = {
  "test:e2e": "playwright test",
};

const PLAYWRIGHT_DEV_DEPENDENCIES: Record<string, string> = {
  "@playwright/test": "^1.50.0",
};

const CYPRESS_SCRIPTS: Record<string, string> = {
  "cy:run": "cypress run --browser chrome",
  "test:e2e": "start-server-and-test dev http://localhost:3000 cy:run",
  "cypress:open": "cypress open",
};

const CYPRESS_DEV_DEPENDENCIES: Record<string, string> = {
  cypress: "^13.17.0",
  "start-server-and-test": "^2.0.8",
};

const ESLINT_SCRIPTS: Record<string, string> = {
  lint: "next lint",
  format: "prettier --write .",
};

const ESLINT_DEV_DEPENDENCIES: Record<string, string> = {
  eslint: "^9.17.0",
  "eslint-config-next": "^15.1.0",
  "@eslint/eslintrc": "^3.2.0",
  prettier: "^3.4.0",
  "eslint-config-prettier": "^9.1.0",
};

const BIOME_SCRIPTS: Record<string, string> = {
  lint: "biome check .",
  "lint:fix": "biome check --write .",
  format: "biome format --write .",
};

const BIOME_DEV_DEPENDENCIES: Record<string, string> = {
  "@biomejs/biome": "^1.9.0",
};

const SHADCN_DEPENDENCIES: Record<string, string> = {
  clsx: "^2.1.0",
  "tailwind-merge": "^2.6.0",
  "lucide-react": "^0.468.0",
  "class-variance-authority": "^0.7.1",
};

export const generatePackageJson = (options: ProjectOptions): string => {
  const pkg: PackageJson = {
    name: options.projectName,
    version: "1.0.0",
    private: true,
    scripts: { ...BASE_SCRIPTS },
    dependencies: { ...BASE_DEPENDENCIES },
    devDependencies: { ...BASE_DEV_DEPENDENCIES },
  };

  // Unit test overlay
  if (options.unit === "vitest") {
    Object.assign(pkg.scripts, VITEST_SCRIPTS);
    Object.assign(pkg.devDependencies, VITEST_DEV_DEPENDENCIES);
  } else if (options.unit === "jest") {
    Object.assign(pkg.scripts, JEST_SCRIPTS);
    Object.assign(pkg.devDependencies, JEST_DEV_DEPENDENCIES);
  }

  // E2E test overlay
  if (options.endToEnd === "playwright") {
    Object.assign(pkg.scripts, PLAYWRIGHT_SCRIPTS);
    Object.assign(pkg.devDependencies, PLAYWRIGHT_DEV_DEPENDENCIES);
  } else if (options.endToEnd === "cypress") {
    Object.assign(pkg.scripts, CYPRESS_SCRIPTS);
    Object.assign(pkg.devDependencies, CYPRESS_DEV_DEPENDENCIES);
  }

  // Linting overlay
  if (options.linting === "eslint") {
    Object.assign(pkg.scripts, ESLINT_SCRIPTS);
    Object.assign(pkg.devDependencies, ESLINT_DEV_DEPENDENCIES);
  } else if (options.linting === "biome") {
    Object.assign(pkg.scripts, BIOME_SCRIPTS);
    Object.assign(pkg.devDependencies, BIOME_DEV_DEPENDENCIES);
  }

  // UI library overlay
  if (options.uiLibrary === "shadcn") {
    Object.assign(pkg.dependencies, SHADCN_DEPENDENCIES);
  }

  return JSON.stringify(pkg, null, 2) + "\n";
};
