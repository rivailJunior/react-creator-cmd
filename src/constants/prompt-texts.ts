export const PromptTexts = {
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
  operation: {
    cancel: "Operation cancelled",
    installing: "Installing packages",
    created: "Created!",
    error: "Something went wrong",
    success: "Done!",
  },
};
