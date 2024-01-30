import { confirm, text, select } from "@clack/prompts";
import { PromptTexts } from "../../../constants";
import { checkCancelation, isToShowWarningMessage } from "./helpers";

export type TCreateProject = {
  operation: string;
  projectName: string;
  typescript: boolean;
  vitest: boolean;
  jest: boolean;
};

async function createProject(): Promise<TCreateProject> {
  const projectName = await text({
    message: PromptTexts.project.name,
    placeholder: PromptTexts.project.placeholder,
  });

  checkCancelation(projectName);
  const wouldLikeToUseTypescript = await confirm({
    message: PromptTexts.projectType.name,
  });
  checkCancelation(wouldLikeToUseTypescript);
  isToShowWarningMessage(wouldLikeToUseTypescript, "Typescript");

  const whatTestWouldYouLikeToUse = await select({
    message: PromptTexts.test.name,
    options: PromptTexts.test.options,
  });

  checkCancelation(whatTestWouldYouLikeToUse);
  isToShowWarningMessage(whatTestWouldYouLikeToUse, "Vitest");
  const projectNameValue = projectName || PromptTexts.project.placeholder;

  return {
    operation: "create-project",
    projectName: projectNameValue as string,
    typescript: !!wouldLikeToUseTypescript,
    vitest: "vitest" === whatTestWouldYouLikeToUse,
    jest: "jest" === whatTestWouldYouLikeToUse,
  };
}

export { createProject };
