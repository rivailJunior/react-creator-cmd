import { describe, test, expect } from "vitest";
import {
  generatePackageJson,
  ProjectOptions,
} from "../usecases/generate-package-json";

const BASE_OPTIONS: ProjectOptions = {
  projectName: "test-project",
  unit: "vitest",
  endToEnd: "playwright",
  linting: "biome",
  uiLibrary: "none",
};

describe("generatePackageJson", () => {
  test("should generate valid JSON with project name", () => {
    const result = generatePackageJson(BASE_OPTIONS);
    const pkg = JSON.parse(result);
    expect(pkg.name).toBe("test-project");
    expect(pkg.private).toBe(true);
    expect(pkg.version).toBe("1.0.0");
  });

  test("should include base dependencies", () => {
    const pkg = JSON.parse(generatePackageJson(BASE_OPTIONS));
    expect(pkg.dependencies.next).toBeDefined();
    expect(pkg.dependencies.react).toBeDefined();
    expect(pkg.dependencies["react-dom"]).toBeDefined();
    expect(pkg.dependencies.zod).toBeDefined();
  });

  test("should include vitest deps when unit=vitest", () => {
    const pkg = JSON.parse(generatePackageJson({ ...BASE_OPTIONS, unit: "vitest" }));
    expect(pkg.devDependencies.vitest).toBeDefined();
    expect(pkg.devDependencies["@vitejs/plugin-react"]).toBeDefined();
    expect(pkg.scripts["test:unit"]).toBe("vitest run");
  });

  test("should include jest deps when unit=jest", () => {
    const pkg = JSON.parse(generatePackageJson({ ...BASE_OPTIONS, unit: "jest" }));
    expect(pkg.devDependencies.jest).toBeDefined();
    expect(pkg.devDependencies["@types/jest"]).toBeDefined();
    expect(pkg.scripts["test:unit"]).toBe("jest");
  });

  test("should include playwright deps when endToEnd=playwright", () => {
    const pkg = JSON.parse(generatePackageJson({ ...BASE_OPTIONS, endToEnd: "playwright" }));
    expect(pkg.devDependencies["@playwright/test"]).toBeDefined();
    expect(pkg.scripts["test:e2e"]).toBe("playwright test");
  });

  test("should include cypress deps when endToEnd=cypress", () => {
    const pkg = JSON.parse(generatePackageJson({ ...BASE_OPTIONS, endToEnd: "cypress" }));
    expect(pkg.devDependencies.cypress).toBeDefined();
    expect(pkg.scripts["test:e2e"]).toContain("cy:run");
  });

  test("should include biome deps when linting=biome", () => {
    const pkg = JSON.parse(generatePackageJson({ ...BASE_OPTIONS, linting: "biome" }));
    expect(pkg.devDependencies["@biomejs/biome"]).toBeDefined();
    expect(pkg.scripts.lint).toContain("biome");
  });

  test("should include eslint deps when linting=eslint", () => {
    const pkg = JSON.parse(generatePackageJson({ ...BASE_OPTIONS, linting: "eslint" }));
    expect(pkg.devDependencies.eslint).toBeDefined();
    expect(pkg.devDependencies.prettier).toBeDefined();
    expect(pkg.scripts.lint).toBe("next lint");
  });

  test("should include shadcn deps when uiLibrary=shadcn", () => {
    const pkg = JSON.parse(generatePackageJson({ ...BASE_OPTIONS, uiLibrary: "shadcn" }));
    expect(pkg.dependencies.clsx).toBeDefined();
    expect(pkg.dependencies["tailwind-merge"]).toBeDefined();
    expect(pkg.dependencies["lucide-react"]).toBeDefined();
  });

  test("should NOT include shadcn deps when uiLibrary=none", () => {
    const pkg = JSON.parse(generatePackageJson({ ...BASE_OPTIONS, uiLibrary: "none" }));
    expect(pkg.dependencies.clsx).toBeUndefined();
    expect(pkg.dependencies["tailwind-merge"]).toBeUndefined();
  });

  test('should include tailwindcss and postcss plugin in base devDependencies', () => {
    const pkg = JSON.parse(generatePackageJson(BASE_OPTIONS));
    expect(pkg.devDependencies.tailwindcss).toBeDefined();
    expect(pkg.devDependencies['@tailwindcss/postcss']).toBeDefined();
  });

  test("should include turbopack in dev script", () => {
    const pkg = JSON.parse(generatePackageJson(BASE_OPTIONS));
    expect(pkg.scripts.dev).toContain("--turbopack");
  });
});
