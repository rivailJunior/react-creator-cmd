import { confirm } from "@clack/prompts";
import { ClackOperations, PromptTexts } from "../../../constants";

type moduleT = "http" | "log" | "event-tracker";

export type TCreateModule = {
  operation: string;
  moduleType: moduleT;
  moduleName: string;
};
async function createModule(
  moduleType: moduleT
): Promise<TCreateModule | undefined> {
  if (moduleType === "http") {
    const wouldLikeToCreateHttpModule = await confirm({
      message: PromptTexts.module.name,
    });
    if (!wouldLikeToCreateHttpModule) throw ClackOperations.CANCEL_OPERATION;
    return {
      operation: "create-module",
      moduleType: "http",
      moduleName: "http-module",
    };
  }
}

export { createModule };
