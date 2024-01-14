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
import LoggAdapter from "./log-adapter";
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
      message: PromptTexts.firstQuestion.name,
      options: PromptTexts.firstQuestion.options,
    });

    console.log("project or folder", projectOrFolder);

    if (isCancel(projectOrFolder)) {
      cancelOperation();
    }

    if (projectOrFolder === "create-project") {
      // create project
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
        const projectNameValue = projectName || PromptTexts.project.placeholder;
        cli.createProjectFromTemplate(projectNameValue as string);
      }
    } else {
      // create router
      const folderName = await text({
        message: PromptTexts.folder.name,
        placeholder: PromptTexts.folder.placeholder,
      });

      if (isCancel(folderName)) {
        cancelOperation();
      } else {
        cli.createRouteFromTemplate(folderName as string);
      }
    }

    const s = spinner();
    s.start(PromptTexts.operation.installing);

    await sleep(3000);

    s.stop(PromptTexts.operation.created);

    outro(PromptTexts.operation.success);

    await sleep(1000);
  }
}
