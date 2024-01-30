import { text } from "@clack/prompts";
import { PromptTexts } from "../../../constants";
import { checkCancelation } from "./helpers";

export type TCreateRoute = {
  routeName: string;
  operation: string;
};

async function createRouter(): Promise<TCreateRoute> {
  const routeName = await text({
    message: PromptTexts.folder.name,
    placeholder: PromptTexts.folder.placeholder,
  });

  checkCancelation(routeName);
  const route = routeName || PromptTexts.folder.placeholder;
  return { routeName: route as string, operation: "create-route" };
  // await this.cli.createRouteFromTemplate(route as string);
}

export { createRouter };
