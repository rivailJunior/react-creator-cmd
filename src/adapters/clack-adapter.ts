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
import { PromptTexts } from "../constants";
import { ICLI } from "../interfaces/cli";

export default class ClackAdapter {
  private loader: ReturnType<typeof spinner>;
  private CREATE_PROJECT = "create-project";
  private CANCEL_OPERATION = "cancel-operation";
  private PRESENTATION =
    "Let's create a new project or some new folder for your react project?";
  constructor(readonly cli: ICLI) {
    intro(color.inverse(this.PRESENTATION));
    this.loader = spinner();
  }
  private cancelOperation() {
    cancel(PromptTexts.operation.cancel);
    return process.exit(0);
  }

  async createRouter() {
    const folderName = await text({
      message: PromptTexts.folder.name,
      placeholder: PromptTexts.folder.placeholder,
    });

    if (isCancel(folderName)) {
      this.cancelOperation();
    } else {
      this.cli.createRouteFromTemplate(folderName as string);
    }
  }

  async createProject() {
    const projectName = await text({
      message: PromptTexts.project.name,
      placeholder: PromptTexts.project.placeholder,
    });

    if (isCancel(projectName)) {
      throw this.CANCEL_OPERATION;
    }

    const projectType = await select({
      message: PromptTexts.projectType.name,
      options: PromptTexts.projectType.options,
    });

    if (isCancel(projectType)) {
      throw this.CANCEL_OPERATION;
    }

    const selectTestConfigurations = await select({
      message: PromptTexts.test.name,
      options: PromptTexts.test.options,
    });

    if (isCancel(selectTestConfigurations)) {
      throw this.CANCEL_OPERATION;
    }

    const projectNameValue = projectName || PromptTexts.project.placeholder;
    this.cli.createProjectFromTemplate(projectNameValue as string);
  }

  async init() {
    try {
      const isProjectOrRoute = await select({
        message: PromptTexts.firstQuestion.name,
        options: PromptTexts.firstQuestion.options,
      });

      if (isCancel(isProjectOrRoute)) {
        throw this.CANCEL_OPERATION;
      }

      if (isProjectOrRoute === this.CREATE_PROJECT) {
        await this.createProject();
        this.loader.start(PromptTexts.operation.installing);
        await sleep(3000);
        this.loader.stop(PromptTexts.operation.created);
      } else {
        await this.createRouter();
      }
    } catch (err) {
      this.cancelOperation();
    } finally {
      outro(PromptTexts.operation.success);
    }
  }
}
