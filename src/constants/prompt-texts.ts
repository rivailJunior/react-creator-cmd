export const PromptTexts = {
  intro: "💬 Hey, Let's create your next amazing project!",
  firstQuestion: {
    name: '🗃 What would you like to do?',
    options: [
      {
        value: 'create-project',
        label: '📁 Create Project',
      },
      {
        value: 'create-router',
        label: '📍 Create Router',
      },
      {
        value: 'create-http-module',
        label: '📦 Create Http Module',
      },
    ],
  },
  project: {
    name: '📂📝 What is your project name?',
    placeholder: 'my-coolest-react-app',
  },
  test: {
    name: '🧪 Which unit testing framework?',
    options: [
      {
        value: 'vitest',
        label: '⚡ Vitest',
      },
      {
        value: 'jest',
        label: '🃏 Jest',
      },
    ],
  },
  endToEndTest: {
    name: '🧪 Which E2E testing framework?',
    options: [
      {
        value: 'playwright',
        label: '🎭 Playwright',
      },
      {
        value: 'cypress',
        label: '🌲 Cypress',
      },
    ],
  },
  linting: {
    name: '🧹 Which linting/formatting tool?',
    options: [
      {
        value: 'biome',
        label: '⚡ Biome (fast, all-in-one)',
      },
      {
        value: 'eslint',
        label: '📏 ESLint + Prettier',
      },
    ],
  },
  uiLibrary: {
    name: '🎨 Would you like to include a UI component library?',
    options: [
      {
        value: 'shadcn',
        label: '✨ shadcn/ui (Tailwind CSS v4)',
      },
      {
        value: 'none',
        label: '🎯 Plain Tailwind CSS v4',
      },
    ],
  },
  folder: {
    name: '📍📝 What is your route name?',
    placeholder: 'my-coolest-route',
  },
  module: {
    name: '💬 It will generate a http-module inside folder modules, proceed?',
  },
  stackPreview: {
    message: '🔍 Review your stack before we create:',
    confirm: 'Proceed with this configuration?',
  },
  operation: {
    cancel: '🚫 Operation cancelled',
    installing: '⏳ Creating...',
    postInstall: '📦 Installing dependencies & setting up git...',
    created: '✅ Created successfully',
    postInstallDone: '✅ Dependencies installed & git initialized',
    postInstallFailed:
      '⚠️  Post-install failed — you can run npm install manually',
    error: '🧨 Something went wrong',
    success: `🎉🎊`,
  },
};
