import { PromptTexts, ClackOperations } from "../../constants";
import { createRouter } from "./usecases/create-router";
import { createProject } from "./usecases/create-project";
import { createModule } from "./usecases/create-module";
import { checkCancelation, introduction } from "./usecases/helpers";
import * as clack from "@clack/prompts";
import { IAdapterExecutor } from "../../interfaces/adapter-executor";
import {
  CliFlags,
  parseCliArgs,
  hasAllFlags,
} from '../../domain/usecases/parse-cli-args';

export default class ClackAdapter implements IAdapterExecutor {
  private flags: CliFlags;

  constructor() {
    this.flags = parseCliArgs();
    introduction();
  }

  private async initializer(operation: any) {
    switch (operation) {
      case ClackOperations.CREATE_PROJECT:
        return await createProject(this.flags);
      case ClackOperations.CREATE_ROUTER:
        return await createRouter();
      case ClackOperations.CREATE_HTTP_MODULE:
        return await createModule('http');
    }
  }

  async init() {
    try {
      if (hasAllFlags(this.flags)) {
        return await createProject(this.flags);
      }

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
