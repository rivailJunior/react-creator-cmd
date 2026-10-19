import fs from "fs";
import path from "path";
import { ROOT_DIR_LOCATION } from "../../constants";
import { checkIfIsNextJsProject } from './check-next-project';
import { generatePackageJson, ProjectOptions } from './generate-package-json';
import { generateCiWorkflow } from './generate-ci-workflow';
import { generateAiFiles } from './generate-ai-files';
import { generateReadme } from './generate-readme';

const TEMPLATE_BASE = '/src/template/base';
const TEMPLATE_OVERLAYS = '/src/template/overlays';

/**
 * Copies a composable project from base + overlays based on user choices.
 */
export function copyProject(folderPath: string, options: ProjectOptions) {
  if (fs.existsSync(folderPath))
    throw new Error(`${folderPath} already exists`);

  const basePath = path.resolve(ROOT_DIR_LOCATION + TEMPLATE_BASE);

  // 1. Copy base template
  fs.cpSync(basePath, folderPath, { recursive: true });

  // 1b. Rename dotfiles that npm strips during publish
  const dotfileRenames: [string, string][] = [
    ['gitignore', '.gitignore'],
    ['env.example', '.env.example'],
  ];
  for (const [from, to] of dotfileRenames) {
    const src = path.join(folderPath, from);
    if (fs.existsSync(src)) {
      fs.renameSync(src, path.join(folderPath, to));
    }
  }

  // 2. Copy unit test overlay
  const unitOverlay = path.resolve(
    ROOT_DIR_LOCATION + TEMPLATE_OVERLAYS + '/' + options.unit,
  );
  if (fs.existsSync(unitOverlay)) {
    fs.cpSync(unitOverlay, folderPath, { recursive: true });
  }

  // 3. Copy E2E test overlay
  const e2eOverlay = path.resolve(
    ROOT_DIR_LOCATION + TEMPLATE_OVERLAYS + '/' + options.endToEnd,
  );
  if (fs.existsSync(e2eOverlay)) {
    fs.cpSync(e2eOverlay, folderPath, { recursive: true });
  }

  // 4. Copy linting overlay
  const lintOverlay = path.resolve(
    ROOT_DIR_LOCATION + TEMPLATE_OVERLAYS + '/' + options.linting,
  );
  if (fs.existsSync(lintOverlay)) {
    fs.cpSync(lintOverlay, folderPath, { recursive: true });
  }

  // 5. Copy UI library overlay
  if (options.uiLibrary === 'shadcn') {
    const shadcnOverlay = path.resolve(
      ROOT_DIR_LOCATION + TEMPLATE_OVERLAYS + '/shadcn',
    );
    if (fs.existsSync(shadcnOverlay)) {
      fs.cpSync(shadcnOverlay, folderPath, { recursive: true });
    }
  }

  // 6. Copy Docker overlay
  if (options.docker === 'docker') {
    const dockerOverlay = path.resolve(
      ROOT_DIR_LOCATION + TEMPLATE_OVERLAYS + '/docker',
    );
    if (fs.existsSync(dockerOverlay)) {
      fs.cpSync(dockerOverlay, folderPath, { recursive: true });
      const dockerignoreSrc = path.join(folderPath, 'dockerignore');
      if (fs.existsSync(dockerignoreSrc)) {
        fs.renameSync(dockerignoreSrc, path.join(folderPath, '.dockerignore'));
      }
    }
  }

  // 7. Copy Storybook overlay
  if (options.storybook === 'storybook') {
    const storybookOverlay = path.resolve(
      ROOT_DIR_LOCATION + TEMPLATE_OVERLAYS + '/storybook',
    );
    if (fs.existsSync(storybookOverlay)) {
      fs.cpSync(storybookOverlay, folderPath, { recursive: true });
    }
  }

  // 8. Generate dynamic files
  const packageJsonContent = generatePackageJson(options);
  fs.writeFileSync(path.join(folderPath, 'package.json'), packageJsonContent);

  const ciWorkflowDir = path.join(folderPath, '.github', 'workflows');
  fs.mkdirSync(ciWorkflowDir, { recursive: true });
  fs.writeFileSync(
    path.join(ciWorkflowDir, 'main.yml'),
    generateCiWorkflow(options),
  );

  generateAiFiles(folderPath, options);
  generateReadme(folderPath, options);

  return 'Project created';
}

export function copyRouter(routerName: string) {
  checkIfIsNextJsProject();
  if (fs.existsSync(routerName))
    throw new Error(`${routerName} already exists`);
  return fs.cpSync(
    path.resolve(ROOT_DIR_LOCATION + '/src/template/route-template'),
    routerName,
    {
      recursive: true,
    },
  );
}

export function copyHttpModule() {
  checkIfIsNextJsProject();
  const folderPath = 'modules/http-module';
  if (fs.existsSync(folderPath))
    throw new Error(`${folderPath} already exists`);
  return fs.cpSync(
    path.resolve(
      ROOT_DIR_LOCATION + '/src/template/modules-template/http-module',
    ),
    folderPath,
    {
      recursive: true,
    },
  );
}
