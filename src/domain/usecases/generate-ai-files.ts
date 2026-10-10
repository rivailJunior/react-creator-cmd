import fs from "fs";
import path from "path";
import { ProjectOptions } from "./generate-package-json";

const getStackDescription = (options: ProjectOptions): string => {
  const linter =
    options.linting === "biome" ? "Biome" : "ESLint v9 (flat config) + Prettier";
  const unitTest = options.unit === "vitest" ? "Vitest" : "Jest";
  const e2eTest = options.endToEnd === "playwright" ? "Playwright" : "Cypress";
  const ui =
    options.uiLibrary === "shadcn"
      ? "shadcn/ui + Tailwind CSS v4"
      : "Tailwind CSS v4";

  return `- **Framework**: Next.js 15 (App Router, Server Components, Turbopack)
- **Language**: TypeScript 5.7+
- **UI/Styling**: ${ui}
- **Unit Testing**: ${unitTest} + Testing Library
- **E2E Testing**: ${e2eTest}
- **Linting/Formatting**: ${linter}
- **Validation**: Zod
- **Commits**: Conventional Commits (commitlint + husky)`;
};

const getRulesContent = (options: ProjectOptions): string => {
  const stack = getStackDescription(options);

  return `# Project Rules

## Tech Stack

${stack}

## Architecture

- **App Router**: All routes live under \`src/app/\`. Use Server Components by default; add \`"use client"\` only when needed (interactivity, hooks, browser APIs).
- **Feature-first structure**: Group related components, hooks, and utils by feature, not by type.
- **Path aliases**: Use \`@/\` to import from \`src/\` (configured in \`tsconfig.json\`).

## Coding Conventions

- Use **named exports** for all components and utilities (default exports only for \`page.tsx\` files).
- Use **camelCase** for variables, functions, hooks, and test files.
- Use **PascalCase** for components and type/interface names.
- Prefix event handlers with \`handle\` (e.g., \`handleClick\`, \`handleSubmit\`).
- Use \`const\` with arrow functions for component logic.
- Define **types or interfaces** for all props and function signatures.
- Avoid magic strings/numbers — use constants or enums.

## Component Guidelines

- Components should follow the **Single Responsibility Principle**.
- Keep components **stateless when possible**; move business logic into hooks or context.
- Use **composition over inheritance**.
- Use **semantic HTML** tags and follow accessibility best practices.
- Validate environment variables with **Zod** in \`src/config/env.ts\`.

## Testing

- Every new component should have a corresponding unit test.
- E2E tests cover critical user flows.
- Run \`npm run test:unit\` for unit tests.
- Run \`npm run test:e2e\` for E2E tests.

## Git

- Follow **Conventional Commits**: \`feat:\`, \`fix:\`, \`chore:\`, \`docs:\`, \`refactor:\`, \`test:\`.
- Keep commits small and focused.
`;
};

const getCursorRulesContent = (options: ProjectOptions): string => {
  return `---
description: Project coding standards and patterns
globs: "**/*.{ts,tsx}"
---

${getRulesContent(options)}`;
};

const getWindsurfRulesContent = (options: ProjectOptions): string => {
  return getRulesContent(options);
};

const getCopilotInstructionsContent = (options: ProjectOptions): string => {
  return getRulesContent(options);
};

const getClaudeContent = (options: ProjectOptions): string => {
  const stack = getStackDescription(options);

  return `# ${options.projectName}

## Tech Stack

${stack}

## Commands

- \`npm run dev\` — Start dev server (Turbopack)
- \`npm run build\` — Production build
- \`npm run test:unit\` — Run unit tests
- \`npm run test:e2e\` — Run E2E tests
- \`npm run lint\` — Run linter

## Project Structure

\`\`\`
src/
  app/           — Next.js App Router pages and layouts
  components/    — Reusable UI components
  config/        — Environment and app configuration
  lib/           — Utility functions
\`\`\`

## Guidelines

- Use Server Components by default; add \`"use client"\` only when needed.
- Named exports for everything except \`page.tsx\` files.
- Follow Conventional Commits for all git messages.
- Validate env vars with Zod in \`src/config/env.ts\`.
`;
};

export const generateAiFiles = (
  destPath: string,
  options: ProjectOptions
): void => {
  // .cursor/rules/project.mdc
  const cursorDir = path.join(destPath, ".cursor", "rules");
  fs.mkdirSync(cursorDir, { recursive: true });
  fs.writeFileSync(
    path.join(cursorDir, "project.mdc"),
    getCursorRulesContent(options)
  );

  // .windsurf/rules/project.md
  const windsurfDir = path.join(destPath, ".windsurf", "rules");
  fs.mkdirSync(windsurfDir, { recursive: true });
  fs.writeFileSync(
    path.join(windsurfDir, "project.md"),
    getWindsurfRulesContent(options)
  );

  // .github/copilot-instructions.md
  const githubDir = path.join(destPath, ".github");
  fs.mkdirSync(githubDir, { recursive: true });
  fs.writeFileSync(
    path.join(githubDir, "copilot-instructions.md"),
    getCopilotInstructionsContent(options)
  );

  // CLAUDE.md
  fs.writeFileSync(path.join(destPath, "CLAUDE.md"), getClaudeContent(options));
};
