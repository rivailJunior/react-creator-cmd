import { PromptTexts, ClackOperations } from "../../constants";
import { createRouter } from "./create-router";
import { createProject } from "./create-project";
import { createModule } from "./create-module";
import { checkCancelation, introduction } from "./helpers";
import * as clack from "@clack/prompts";
import { IAdapterExecutor } from "../../interfaces/adapter-executor";

export default class ClackAdapter implements IAdapterExecutor {
  constructor() {
    introduction();
  }

  private async initializer(operation: any) {
    switch (operation) {
      case ClackOperations.CREATE_PROJECT:
        return await createProject();
      case ClackOperations.CREATE_ROUTER:
        return await createRouter();
      case ClackOperations.CREATE_HTTP_MODULE:
        return await createModule("http");
    }
  }

  async init() {
    try {
      const initialQuestion = await clack.select({
        message: PromptTexts.firstQuestion.name,
        options: PromptTexts.firstQuestion.options,
      });

      checkCancelation(initialQuestion);
      return await this.initializer(initialQuestion);
    } catch (err) {
      clack.cancel(PromptTexts.operation.cancel);
      process.exit(0);
    }
  }
}
