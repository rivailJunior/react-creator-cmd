import { execSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { afterAll, describe, expect, it } from 'vitest';
import { copyProject } from '../usecases/create-dir-from-template';
import { ProjectOptions } from '../usecases/generate-package-json';

/**
 * End-to-end integration test.
 *
 * Generates a real project in a temp dir, installs its dependencies,
 * builds it, and runs its unit tests — the same flow a user would follow.
 *
 * Gated behind RUN_INTEGRATION=1 because `npm install` + `next build`
 * takes several minutes and needs network access. Run explicitly with:
 *
 *   npm run test:integration
 */

const RUN_INTEGRATION = process.env.RUN_INTEGRATION === '1';
const NPM_TIMEOUT_MS = 10 * 60 * 1000; // 10 min for install
const BUILD_TIMEOUT_MS = 5 * 60 * 1000;
const TEST_TIMEOUT_MS = 10 * 60 * 1000;

const OPTIONS: ProjectOptions = {
  projectName: 'integration-app',
  unit: 'vitest',
  endToEnd: 'playwright',
  linting: 'biome',
  uiLibrary: 'none',
  docker: 'none',
  storybook: 'none',
};

let tmpRoot: string;

const run = (command: string, cwd: string, timeout: number) => {
  try {
    return execSync(command, { cwd, timeout, stdio: 'pipe' }).toString();
  } catch (error) {
    const err = error as {
      stdout?: Buffer;
      stderr?: Buffer;
      message: string;
    };
    throw new Error(
      `"${command}" failed in ${cwd}\n` +
        `stdout:\n${err.stdout?.toString() ?? ''}\n` +
        `stderr:\n${err.stderr?.toString() ?? err.message}`,
    );
  }
};

afterAll(() => {
  if (process.env.KEEP_INTEGRATION_OUTPUT === '1') {
    console.log(`Generated project kept at: ${tmpRoot}`);
    return;
  }
  if (tmpRoot && fs.existsSync(tmpRoot)) {
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  }
});

describe.skipIf(!RUN_INTEGRATION)('Integration — generated project', () => {
  it(
    'should npm install, build, and pass unit tests',
    () => {
      tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'rcc-integration-'));
      const projectDir = path.join(tmpRoot, OPTIONS.projectName);

      copyProject(projectDir, OPTIONS);
      expect(fs.existsSync(path.join(projectDir, 'package.json'))).toBe(true);

      run('npm install --no-audit --no-fund', projectDir, NPM_TIMEOUT_MS);
      run('npm run build', projectDir, BUILD_TIMEOUT_MS);
      expect(fs.existsSync(path.join(projectDir, '.next'))).toBe(true);

      const testOutput = run('npm run test:unit', projectDir, TEST_TIMEOUT_MS);
      expect(testOutput).toBeDefined();
    },
    NPM_TIMEOUT_MS + BUILD_TIMEOUT_MS + TEST_TIMEOUT_MS,
  );
});
