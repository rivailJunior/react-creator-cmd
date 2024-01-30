import { spinner, outro } from "@clack/prompts";
import { PromptTexts } from "../../../constants";
import { setTimeout as sleep } from "node:timers/promises";
const loader = spinner();
async function handleOperation(
  callback: () => Promise<void>,
  time: number = 3000
) {
  await callback();
  loader.start(PromptTexts.operation.installing);
  await sleep(time);
  loader.stop(PromptTexts.operation.created);
  outro(PromptTexts.operation.success);
}

export { handleOperation };
