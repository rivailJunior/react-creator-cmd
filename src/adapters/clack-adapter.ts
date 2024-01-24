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
import { PromptTexts, ClackOperations } from "../constants";
import { ICommandLine } from "../interfaces/command-line";

export default class ClackAdapter {
  private loader: ReturnType<typeof spinner>;
  constructor(readonly cli: ICommandLine) {
    intro(color.inverse(PromptTexts.intro));
    this.loader = spinner();
  }

  private isToShowWarningMessage(operationResponse: any, term: string) {
    if (!operationResponse)
      log.warn(color.yellow(`Sorry ${term} is configured by default.`));
  }

  private checkCancelation(operation: any) {
    if (isCancel(operation)) {
      throw ClackOperations.CANCEL_OPERATION;
    }
  }

  private async handleOperation(callback: () => Promise<void>) {
    await callback();
    this.loader.start(PromptTexts.operation.installing);
    await sleep(3000);
    this.loader.stop(PromptTexts.operation.created);
  }

  private async createModule(moduleType: "http" | "log" | "event-tracker") {
    if (moduleType === "http") {
      const wouldLikeToCreateHttpModule = await confirm({
        message: PromptTexts.module.name,
      });
      if (!wouldLikeToCreateHttpModule) throw ClackOperations.CANCEL_OPERATION;
      await this.cli.createModuleFromTemplate(); // todo: remove this from here
    }
  }

  private async createRouter() {
    const routeName = await text({
      message: PromptTexts.folder.name,
      placeholder: PromptTexts.folder.placeholder,
    });

    this.checkCancelation(routeName);
    const route = routeName || PromptTexts.folder.placeholder;
    await this.cli.createRouteFromTemplate(route as string); // todo: remove this from here
  }

  private async createProject() {
    const projectName = await text({
      message: PromptTexts.project.name,
      placeholder: PromptTexts.project.placeholder,
    });
    this.checkCancelation(projectName);

    const wouldLikeToUseTypescript = await confirm({
      message: PromptTexts.projectType.name,
    });
    this.checkCancelation(wouldLikeToUseTypescript);
    this.isToShowWarningMessage(wouldLikeToUseTypescript, "Typescript");

    const wouldLikeToAddTest = await confirm({
      message: PromptTexts.test.name,
    });
    this.checkCancelation(wouldLikeToAddTest);
    this.isToShowWarningMessage(wouldLikeToAddTest, "Vitest");

    const projectNameValue = projectName || PromptTexts.project.placeholder;
    await this.cli.createProjectFromTemplate(projectNameValue as string); // todo: remove this from here
  }

  private async initializer(operation: any) {
    switch (operation) {
      case ClackOperations.CREATE_PROJECT:
        await this.handleOperation(() => this.createProject());
        break;
      case ClackOperations.CREATE_ROUTER:
        await this.handleOperation(() => this.createRouter());
        break;
      case ClackOperations.CREATE_HTTP_MODULE:
        await this.handleOperation(() => this.createModule("http"));
        break;
    }
  }

  async init() {
    try {
      const initialQuestion = await select({
        message: PromptTexts.firstQuestion.name,
        options: PromptTexts.firstQuestion.options,
      });
      this.checkCancelation(initialQuestion);
      await this.initializer(initialQuestion);
    } catch (err) {
      cancel(PromptTexts.operation.cancel);
      return process.exit(0);
    } finally {
      outro(PromptTexts.operation.success);
    }
  }
}
//TODO: This adapter should have only logic to work with Clack.js. Command Line calls should be removed
