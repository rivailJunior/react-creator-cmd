[![ISC License](https://img.shields.io/badge/License-ISC-green.svg)](https://choosealicense.com/licenses/isc/)

## React Creator CMD v2.1.1

A CLI tool to bootstrap **production-ready Next.js 15** projects with modern tooling, testing, and **AI assistant configurations** — all pre-configured and ready to go.

### What's New in v2.1.1

- **Dotfile fix for npm publish** — template dotfiles (`.gitignore`, `.env.example`) are now stored without the leading dot and renamed at generation time, preventing npm from stripping them during `npm publish`
- **Tailwind CSS v4 PostCSS plugin** — added `@tailwindcss/postcss` to base dev dependencies and a `postcss.config.mjs` to the base template for proper Tailwind v4 support
- **Env schema default value** — `WELCOME_MESSAGE` now has a default value so projects work out of the box without requiring a `.env` file

### v2.1

- **Next.js 15** with App Router, Server Components, and **Turbopack**
- **React 19** — latest React with Server Components support
- **Tailwind CSS v4** — new CSS-first configuration
- **AI Assistant Support** — auto-generated rules for Cursor, Windsurf, GitHub Copilot, and Claude
- **Biome** option — fast all-in-one linter/formatter alternative to ESLint
- **shadcn/ui** option — pre-configured component library
- **Composable templates** — mix and match your preferred tools

### Stack Options

| Category | Options |
|---|---|
| **Unit Testing** | [Vitest](https://vitest.dev/) or [Jest](https://jestjs.io/) |
| **E2E Testing** | [Playwright](https://playwright.dev/) or [Cypress](https://www.cypress.io/) |
| **Linting** | [Biome](https://biomejs.dev/) or [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) |
| **UI Library** | [shadcn/ui](https://ui.shadcn.com/) or plain Tailwind CSS |

**Always included:** [Zod](https://zod.dev/), [Conventional Commits](https://www.conventionalcommits.org/), [GitHub Actions CI/CD](https://docs.github.com/en/actions), [Husky](https://typicode.github.io/husky/)

### AI Assistant Configs

Every generated project includes configuration files for popular AI coding assistants:

- `.cursor/rules/` — project-specific rules for Cursor IDE
- `.windsurf/rules/` — project-specific rules for Windsurf IDE
- `.github/copilot-instructions.md` — context for GitHub Copilot
- `CLAUDE.md` — context for Claude Code

These files are **dynamically generated** based on your chosen stack, so the AI assistants always know your project's conventions.

### Installation

```bash
npx react-creator-cmd
```

### Usage

```bash
npx react-creator-cmd

# Follow the interactive prompts to configure your project
# cd <your-project>
# cp .env.example .env
# npm install
# npm run dev
```

### Features

- **Create New Project** — Interactive CLI guides you through choosing your stack (unit tests, E2E tests, linter, UI library). Generates a fully configured project.

- **Generate Route** — Creates a new App Router route with `components/`, `tests/`, and `page.tsx`.

- **Generate Http-Module** — Creates an HTTP module with fetch adapter, interface, and tests inside `modules/`.

### Project Structure (Generated)

```
my-project/
├── .cursor/rules/        # Cursor AI rules
├── .windsurf/rules/      # Windsurf AI rules
├── .github/
│   ├── workflows/        # CI/CD pipeline
│   └── copilot-instructions.md
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # Reusable components
│   ├── config/           # Env validation (Zod)
│   └── lib/              # Utilities
├── CLAUDE.md             # Claude Code context
├── next.config.ts        # Next.js 15 config
└── package.json
```

### Author

[rivailpinto.com.br](https://rivailpinto.com.br)

### Support

For support, email rivail.rj@gmail.com.
