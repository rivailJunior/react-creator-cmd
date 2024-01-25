import { spinner } from "@clack/prompts";
import { PromptTexts } from "../../constants";
import { setTimeout as sleep } from "node:timers/promises";
let loader: ReturnType<typeof spinner>;
async function handleOperation(
  callback: () => Promise<void>,
  time: number = 3000
) {
  await callback();
  loader.start(PromptTexts.operation.installing);
  await sleep(time);
  loader.stop(PromptTexts.operation.created);
}

export { handleOperation };
