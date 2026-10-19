import fs from "fs";
import path from "path";
import { ProjectOptions } from "./generate-package-json";

export const generateReadme = (
  destPath: string,
  options: ProjectOptions
): void => {
  const unitTest = options.unit === "vitest" ? "Vitest" : "Jest";
  const e2eTest = options.endToEnd === "playwright" ? "Playwright" : "Cypress";
  const linter =
    options.linting === "biome" ? "Biome" : "ESLint + Prettier";
  const ui =
    options.uiLibrary === "shadcn"
      ? "shadcn/ui + Tailwind CSS v4"
      : "Tailwind CSS v4";
  const dockerLine =
    options.docker === 'docker'
      ? '\n- **Docker** — Dockerfile + docker-compose for containerized deployment'
      : '';
  const storybookLine =
    options.storybook === 'storybook'
      ? '\n- **Storybook** — Component explorer and documentation'
      : '';
  const storybookScript =
    options.storybook === 'storybook'
      ? '\n| `npm run storybook` | Start Storybook on :6006 |'
      : '';

  const content = `# ${options.projectName}

A [Next.js 15](https://nextjs.org/) project bootstrapped with [react-creator-cmd](https://github.com/rivailJunior/react-creator-cmd).

## Tech Stack

- **Next.js 15** — App Router, Server Components, Turbopack
- **React 19** — Latest React with Server Components
- **TypeScript 5.7+** — Strict type checking
- **${ui}** — Styling
- **${unitTest}** — Unit testing
- **${e2eTest}** — E2E testing
- **${linter}** — Code quality
- **Zod** — Schema validation
- **Conventional Commits** — Commit convention (commitlint + husky)${dockerLine}${storybookLine}

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server (with Turbopack)
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Scripts

| Command | Description |
|---|---|
| \`npm run dev\` | Start dev server with Turbopack |
| \`npm run build\` | Production build |
| \`npm start\` | Start production server |
| \`npm run lint\` | Run linter |
| \`npm run test:unit\` | Run unit tests |
| \`npm run test:e2e\` | Run E2E tests |${storybookScript}

## Project Structure

\`\`\`
src/
├── app/            # Next.js App Router (pages, layouts)
├── components/     # Reusable UI components
├── config/         # Environment config (Zod validated)
└── lib/            # Utility functions
\`\`\`

## AI Assistant Support

This project includes configuration files for AI coding assistants:

- \`.cursor/rules/\` — Cursor IDE rules
- \`.windsurf/rules/\` — Windsurf IDE rules
- \`.github/copilot-instructions.md\` — GitHub Copilot context
- \`CLAUDE.md\` — Claude Code context

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

## Deploy

The easiest way to deploy is with [Vercel](https://vercel.com/new).
`;

  fs.writeFileSync(path.join(destPath, "README.md"), content);
};
