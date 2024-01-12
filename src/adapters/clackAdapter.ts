import {
  intro,
  outro,
  select,
  spinner,
  isCancel,
  cancel,
  text,
} from "@clack/prompts";
import { setTimeout as sleep } from "node:timers/promises";
import color from "picocolors";
import CLI from "../domain/cli";
import LoggAdapter from "../adapters/loggAdapter";
import { PromptTexts } from "../constants";
const loggerAdapterObj = new LoggAdapter();
const cli = new CLI(loggerAdapterObj);

export default class ClackAdapter {
  constructor() {}

  static async main() {
    const cancelOperation = () => {
      cancel(PromptTexts.operation.cancel);
      return process.exit(0);
    };

    intro(
      color.inverse(
        "Let's create a new project or some new folder for your react project?"
      )
    );

    const projectOrFolder = await select({
      message: "What would you like to create?",
      options: [
        {
          value: "project",
          label: "New Project",
        },
      ],
    });

    if (isCancel(projectOrFolder)) {
      cancelOperation();
    }

    const projectName = await text({
      message: PromptTexts.project.name,
      placeholder: PromptTexts.project.placeholder,
    });

    if (isCancel(projectName)) {
      cancelOperation();
    }

    const projectType = await select({
      message: PromptTexts.projectType.name,
      options: PromptTexts.projectType.options,
    });

    const selectTestConfigurations = await select({
      message: PromptTexts.test.name,
      options: PromptTexts.test.options,
    });

    if (isCancel(selectTestConfigurations)) {
      cancelOperation();
    }

    if (isCancel(projectType)) {
      cancelOperation();
    } else {
      console.log("project name", projectName);
      const projectNameValue = projectName || PromptTexts.project.placeholder;
      cli.createProjectFromTemplate(projectNameValue as string);
    }

    const s = spinner();
    s.start(PromptTexts.operation.installing);

    await sleep(3000);

    s.stop(PromptTexts.operation.created);

    outro(PromptTexts.operation.success);

    await sleep(1000);
  }
}
