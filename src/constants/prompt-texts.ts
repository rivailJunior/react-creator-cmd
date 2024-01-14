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
    ],
  },
  project: {
    name: "What is your project name?",
    placeholder: "my-coolest-react-app",
  },
  projectType: {
    name: "Pick a project type.",
    options: [
      {
        value: "ts",
        label: "TypeScript",
      },
    ],
  },
  test: {
    name: "Would you like to add tests?",
    options: [
      {
        value: true,
        label: "yes",
      },
      {
        value: false,
        label: "no",
      },
    ],
  },
  folder: {
    name: "What is your route name?",
    placeholder: "my-coolest-route",
  },
  operation: {
    cancel: "Operation cancelled",
    installing: "Installing packages",
    created: "Created!",
    error: "Something went wrong",
    success: "Done!",
  },
};
