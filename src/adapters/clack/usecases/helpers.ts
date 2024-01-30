import { intro, isCancel, log } from "@clack/prompts";
import { ClackOperations, PromptTexts } from "../../../constants";
import color from "picocolors";

function isToShowWarningMessage(operationResponse: any, term: string) {
  if (!operationResponse)
    log.warn(color.yellow(`Sorry ${term} is configured by default.`));
}

function checkCancelation(operation: any) {
  if (isCancel(operation)) {
    throw ClackOperations.CANCEL_OPERATION;
  }
}

function introduction() {
  intro(color.inverse(PromptTexts.intro));
}

export { introduction, checkCancelation, isToShowWarningMessage };
