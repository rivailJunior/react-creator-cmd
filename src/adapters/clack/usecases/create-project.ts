import { text, select } from "@clack/prompts";
import { PromptTexts } from "../../../constants";
import { checkCancelation } from "./helpers";
import { TCreateProjectData } from "../../../interfaces/command-line";

async function createProject(): Promise<TCreateProjectData> {
  const projectName = await text({
    message: PromptTexts.project.name,
    placeholder: PromptTexts.project.placeholder,
  });

  checkCancelation(projectName);

  const whatTestWouldYouLikeToUse = await select({
    message: PromptTexts.test.name,
    options: PromptTexts.test.options,
  });

  checkCancelation(whatTestWouldYouLikeToUse);
  const projectNameValue = projectName || PromptTexts.project.placeholder;

  const endToEndTests = await select({
    message: PromptTexts.endToEndTest.name,
    options: PromptTexts.endToEndTest.options,
  });
  checkCancelation(endToEndTests);

  return {
    operation: "create-project",
    projectName: projectNameValue as string,
    typescript: true, //default
    unit: whatTestWouldYouLikeToUse as string,
    endToEnd: endToEndTests as string,
  };
}

export { createProject };
