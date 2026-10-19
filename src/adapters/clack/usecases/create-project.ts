import { text, select, confirm, log } from '@clack/prompts';
import color from 'picocolors';
import { PromptTexts } from '../../../constants';
import { checkCancelation } from './helpers';
import { TCreateProjectData } from '../../../interfaces/command-line';
import { CliFlags } from '../../../domain/usecases/parse-cli-args';

async function createProject(
  flags: CliFlags = {},
): Promise<TCreateProjectData> {
  let projectNameValue: string;

  if (flags.name) {
    projectNameValue = flags.name;
  } else {
    const projectName = await text({
      message: PromptTexts.project.name,
      placeholder: PromptTexts.project.placeholder,
    });
    checkCancelation(projectName);
    projectNameValue =
      (projectName as string) || PromptTexts.project.placeholder;
  }

  let unitChoice: string;
  if (flags.unit) {
    unitChoice = flags.unit;
  } else {
    const response = await select({
      message: PromptTexts.test.name,
      options: PromptTexts.test.options,
    });
    checkCancelation(response);
    unitChoice = response as string;
  }

  let e2eChoice: string;
  if (flags.e2e) {
    e2eChoice = flags.e2e;
  } else {
    const response = await select({
      message: PromptTexts.endToEndTest.name,
      options: PromptTexts.endToEndTest.options,
    });
    checkCancelation(response);
    e2eChoice = response as string;
  }

  let lintChoice: string;
  if (flags.lint) {
    lintChoice = flags.lint;
  } else {
    const response = await select({
      message: PromptTexts.linting.name,
      options: PromptTexts.linting.options,
    });
    checkCancelation(response);
    lintChoice = response as string;
  }

  let uiChoice: string;
  if (flags.ui) {
    uiChoice = flags.ui;
  } else {
    const response = await select({
      message: PromptTexts.uiLibrary.name,
      options: PromptTexts.uiLibrary.options,
    });
    checkCancelation(response);
    uiChoice = response as string;
  }

  let dockerChoice: string;
  if (flags.docker) {
    dockerChoice = flags.docker;
  } else {
    const response = await select({
      message: PromptTexts.docker.name,
      options: PromptTexts.docker.options,
    });
    checkCancelation(response);
    dockerChoice = response as string;
  }

  let storybookChoice: string;
  if (flags.storybook) {
    storybookChoice = flags.storybook;
  } else {
    const response = await select({
      message: PromptTexts.storybook.name,
      options: PromptTexts.storybook.options,
    });
    checkCancelation(response);
    storybookChoice = response as string;
  }

  const choices = {
    unit: unitChoice,
    endToEnd: e2eChoice,
    linting: lintChoice,
    uiLibrary: uiChoice,
    docker: dockerChoice,
    storybook: storybookChoice,
  };

  const summary = [
    `  ${color.bold('Project')}:   ${color.cyan(projectNameValue)}`,
    `  ${color.bold('Unit')}:      ${color.cyan(choices.unit)}`,
    `  ${color.bold('E2E')}:       ${color.cyan(choices.endToEnd)}`,
    `  ${color.bold('Linting')}:   ${color.cyan(choices.linting)}`,
    `  ${color.bold('UI')}:        ${color.cyan(choices.uiLibrary)}`,
    `  ${color.bold('Docker')}:    ${color.cyan(choices.docker)}`,
    `  ${color.bold('Storybook')}: ${color.cyan(choices.storybook)}`,
  ].join('\n');

  log.info(`${PromptTexts.stackPreview.message}\n${summary}`);

  const shouldProceed = await confirm({
    message: PromptTexts.stackPreview.confirm,
  });
  checkCancelation(shouldProceed);

  if (!shouldProceed) {
    throw 'cancel-operation';
  }

  return {
    operation: 'create-project',
    projectName: projectNameValue,
    typescript: true,
    ...choices,
  };
}

export { createProject };
