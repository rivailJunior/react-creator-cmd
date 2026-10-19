import { spinner, outro, log } from '@clack/prompts';
import { PromptTexts } from '../../../constants';
import { runPostInstall } from '../../../domain/usecases/post-install';

const loader = spinner();

async function handleProjectFeedback(projectPath: string) {
  loader.start(PromptTexts.operation.installing);
  loader.stop(PromptTexts.operation.created);

  loader.start(PromptTexts.operation.postInstall);
  try {
    runPostInstall(projectPath);
    loader.stop(PromptTexts.operation.postInstallDone);
  } catch {
    loader.stop(PromptTexts.operation.postInstallFailed);
    log.warn(PromptTexts.operation.postInstallFailed);
  }

  outro(PromptTexts.operation.success);
}

async function handleSuccessFeedback() {
  loader.start(PromptTexts.operation.installing);
  loader.stop(PromptTexts.operation.created);
  outro(PromptTexts.operation.success);
}

export { handleSuccessFeedback, handleProjectFeedback };
