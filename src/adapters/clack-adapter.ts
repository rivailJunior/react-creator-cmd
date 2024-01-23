import {
  intro,
  outro,
  select,
  spinner,
  isCancel,
  cancel,
  text,
  log,
  confirm,
} from "@clack/prompts";
import { setTimeout as sleep } from "node:timers/promises";
import color from "picocolors";
import { PromptTexts } from "../constants";
import { ICLI } from "../interfaces/cli";

export default class ClackAdapter {
  private loader: ReturnType<typeof spinner>;
  private CREATE_PROJECT = "create-project";
  private CREATE_ROUTER = "create-router";
  private CREATE_HTTP_MODULE = "create-http-module";
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

  private isOperationCanceled(operation: any) {
    if (isCancel(operation)) {
      throw this.CANCEL_OPERATION;
    }
  }

  private async createModule(moduleType: "http" | "log" | "event-tracker") {
    if (moduleType === "http") {
      const wouldLikeToCreateHttpModule = await confirm({
        message: PromptTexts.module.name,
      });
      if (!wouldLikeToCreateHttpModule) throw this.CANCEL_OPERATION;
      await this.cli.createModuleFromTemplate();
    }
  }

  private async createRouter() {
    const folderName = await text({
      message: PromptTexts.folder.name,
      placeholder: PromptTexts.folder.placeholder,
    });
    this.isOperationCanceled(folderName);
    await this.cli.createRouteFromTemplate(folderName as string);
  }

  private confirmWarningMessages(operation: any, message: string) {
    if (!operation) log.warn(color.yellow(message));
  }

  private async createProject() {
    const projectName = await text({
      message: PromptTexts.project.name,
      placeholder: PromptTexts.project.placeholder,
    });
    this.isOperationCanceled(projectName);

    const wouldLikeToUseTypescript = await confirm({
      message: PromptTexts.projectType.name,
    });
    this.isOperationCanceled(wouldLikeToUseTypescript);

    this.confirmWarningMessages(
      wouldLikeToUseTypescript,
      "Sorry, Typescript is configured by default."
    );

    const wouldLikeToAddTest = await confirm({
      message: PromptTexts.test.name,
    });
    this.isOperationCanceled(wouldLikeToAddTest);
    this.confirmWarningMessages(
      wouldLikeToAddTest,
      "Sorry, tests are configured by default."
    );

    const projectNameValue = projectName || PromptTexts.project.placeholder;
    await this.cli.createProjectFromTemplate(projectNameValue as string);
  }

  private async initializer(operation: any) {
    switch (operation) {
      case this.CREATE_PROJECT:
        await this.createProject();
        this.loader.start(PromptTexts.operation.installing);
        await sleep(3000);
        this.loader.stop(PromptTexts.operation.created);
        break;
      case this.CREATE_ROUTER:
        await this.createRouter();
        break;
      case this.CREATE_HTTP_MODULE:
        await this.createModule("http");
        break;
    }
  }

  async init() {
    try {
      const initialQuestion = await select({
        message: PromptTexts.firstQuestion.name,
        options: PromptTexts.firstQuestion.options,
      });

      this.isOperationCanceled(initialQuestion);
      await this.initializer(initialQuestion);
    } catch (err) {
      this.cancelOperation();
    } finally {
      outro(PromptTexts.operation.success);
    }
  }
}
