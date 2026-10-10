import { describe, test, expect } from "vitest";
import { generateCiWorkflow } from "../usecases/generate-ci-workflow";
import { ProjectOptions } from "../usecases/generate-package-json";

const BASE_OPTIONS: ProjectOptions = {
  projectName: "test-project",
  unit: "vitest",
  endToEnd: "playwright",
  linting: "biome",
  uiLibrary: "none",
};

describe("generateCiWorkflow", () => {
  test("should generate valid YAML string", () => {
    const result = generateCiWorkflow(BASE_OPTIONS);
    expect(result).toContain("name: CI/CD");
    expect(result).toContain("jobs:");
  });

  test("should include Biome job when linting=biome", () => {
    const result = generateCiWorkflow({ ...BASE_OPTIONS, linting: "biome" });
    expect(result).toContain("Biome");
    expect(result).not.toContain("ESLint");
  });

  test("should include ESLint job when linting=eslint", () => {
    const result = generateCiWorkflow({ ...BASE_OPTIONS, linting: "eslint" });
    expect(result).toContain("ESLint");
    expect(result).not.toContain("Biome");
  });

  test("should include Playwright job when endToEnd=playwright", () => {
    const result = generateCiWorkflow({ ...BASE_OPTIONS, endToEnd: "playwright" });
    expect(result).toContain("Playwright");
    expect(result).toContain("playwright install");
    expect(result).not.toContain("Cypress");
  });

  test("should include Cypress job when endToEnd=cypress", () => {
    const result = generateCiWorkflow({ ...BASE_OPTIONS, endToEnd: "cypress" });
    expect(result).toContain("Cypress");
    expect(result).toContain("cypress-io/github-action");
    expect(result).not.toContain("Playwright");
  });

  test("should include typecheck job", () => {
    const result = generateCiWorkflow(BASE_OPTIONS);
    expect(result).toContain("TypeScript");
    expect(result).toContain("tsc --noEmit");
  });

  test("should include unit test job", () => {
    const result = generateCiWorkflow(BASE_OPTIONS);
    expect(result).toContain("Unit tests");
    expect(result).toContain("npm run test:unit");
  });
});
