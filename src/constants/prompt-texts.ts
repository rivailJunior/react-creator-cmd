export const PromptTexts = {
  firstQuestion: {
    name: "What would you like to do?",
    options: [
      {
        value: "create-project",
        label: "Create Project",
      },
      {
        value: "create-router",
        label: "Create Router",
      },
      {
        value: "create-http-module",
        label: "Create Http Module",
      },
    ],
  },
  project: {
    name: "What is your project name?",
    placeholder: "my-coolest-react-app",
  },
  projectType: {
    name: "Would you like to use TypeScript?",
  },
  test: {
    name: "Would you like to add tests?",
  },
  folder: {
    name: "What is your route name?",
    placeholder: "my-coolest-route",
  },
  module: {
    name: "Would you like to add a http module?",
    placeholder: "it will generate a http-module inside folder modules",
  },
  operation: {
    cancel: "Operation cancelled",
    installing: "Installing packages",
    created: "Created!",
    error: "Something went wrong",
    success: "Done!",
  },
};
