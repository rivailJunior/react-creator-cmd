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

//TODO - remove the logic from here and let only things related to the clack adapter
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

  private async createModule(moduleType: "http" | "log" | "event-tracker") {
    if (moduleType === "http") {
      const folderName = await text({
        message: PromptTexts.module.name,
        placeholder: PromptTexts.module.placeholder,
      });

      if (isCancel(folderName)) {
        this.cancelOperation();
      } else {
        this.cli.createModuleFromTemplate();
      }
    }
  }

  private async createRouter() {
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

  private async createProject() {
    const projectName = await text({
      message: PromptTexts.project.name,
      placeholder: PromptTexts.project.placeholder,
    });

    if (isCancel(projectName)) {
      throw this.CANCEL_OPERATION;
    }

    const isToUseTypescriptConfig = await confirm({
      message: PromptTexts.projectType.name,
    });

    if (isCancel(isToUseTypescriptConfig)) {
      throw this.CANCEL_OPERATION;
    }

    // TODO - improve this
    if (isToUseTypescriptConfig) {
      log.success(color.blue("Typescript is configured by default ;)"));
    } else {
      log.warn(color.yellow("Sorry, Typescript is configured by default."));
    }

    const selectTestConfigurations = await confirm({
      message: PromptTexts.test.name,
    });

    //TODO - improve this
    if (selectTestConfigurations) {
      log.success(
        color.blue("You have no choices, tests are configured by default.")
      );
    } else {
      log.warn(color.yellow("Sorry, tests are configured by default."));
    }

    if (isCancel(selectTestConfigurations)) {
      throw this.CANCEL_OPERATION;
    }

    const projectNameValue = projectName || PromptTexts.project.placeholder;
    this.cli.createProjectFromTemplate(projectNameValue as string);
  }

  async init() {
    try {
      const initialQuestion = await select({
        message: PromptTexts.firstQuestion.name,
        options: PromptTexts.firstQuestion.options,
      });

      if (isCancel(initialQuestion)) {
        throw this.CANCEL_OPERATION;
      }

      // TODO use a switch
      if (initialQuestion === this.CREATE_PROJECT) {
        await this.createProject();
        this.loader.start(PromptTexts.operation.installing);
        await sleep(3000);
        this.loader.stop(PromptTexts.operation.created);
      } else if (initialQuestion === this.CREATE_ROUTER) {
        await this.createRouter();
      } else if (initialQuestion === this.CREATE_HTTP_MODULE) {
        await this.createModule("http");
      }
    } catch (err) {
      this.cancelOperation();
    } finally {
      outro(PromptTexts.operation.success);
    }
  }
}
