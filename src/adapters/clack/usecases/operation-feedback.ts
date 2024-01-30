import { spinner, outro } from "@clack/prompts";
import { PromptTexts } from "../../../constants";
import { setTimeout as sleep } from "node:timers/promises";
const loader = spinner();
async function handleSuccessFeedback(time: number = 3000) {
  loader.start(PromptTexts.operation.installing);
  await sleep(time);
  loader.stop(PromptTexts.operation.created);
  outro(PromptTexts.operation.success);
}

export { handleSuccessFeedback };
