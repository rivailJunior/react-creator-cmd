import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { copyProject } from '../usecases/create-dir-from-template';
import { ProjectOptions } from '../usecases/generate-package-json';

/**
 * Template snapshot tests.
 *
 * Generates a project for every valid combination of stack options and
 * snapshots the resulting file tree + package.json so any regression in
 * base templates, overlays, or generated files fails loudly before publish.
 */

const UNITS = ['vitest', 'jest'] as const;
const E2ES = ['playwright', 'cypress'] as const;
const LINTS = ['biome', 'eslint'] as const;
const UIS = ['shadcn', 'none'] as const;
const DOCKERS = ['docker', 'none'] as const;
const STORYBOOKS = ['storybook', 'none'] as const;

type Combo = {
  name: string;
  options: ProjectOptions;
};

const buildMatrix = (): Combo[] => {
  const combos: Combo[] = [];
  for (const unit of UNITS) {
    for (const endToEnd of E2ES) {
      for (const linting of LINTS) {
        for (const uiLibrary of UIS) {
          for (const docker of DOCKERS) {
            for (const storybook of STORYBOOKS) {
              const name = [
                unit,
                endToEnd,
                linting,
                uiLibrary,
                docker,
                storybook,
              ].join('-');
              combos.push({
                name,
                options: {
                  projectName: name,
                  unit,
                  endToEnd,
                  linting,
                  uiLibrary,
                  docker,
                  storybook,
                },
              });
            }
          }
        }
      }
    }
  }
  return combos;
};

const MATRIX = buildMatrix();

let tmpRoot: string;

beforeAll(() => {
  tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'rcc-snapshot-'));
});

afterAll(() => {
  fs.rmSync(tmpRoot, { recursive: true, force: true });
});

const generate = (combo: Combo): string => {
  const projectDir = path.join(tmpRoot, combo.name);
  // copyProject throws if the dir exists; reuse it when a previous
  // test already generated this combination.
  if (!fs.existsSync(projectDir)) {
    copyProject(projectDir, combo.options);
  }
  return projectDir;
};

/** Sorted list of every generated file, relative to the project root. */
const listFiles = (dir: string): string[] => {
  const entries: string[] = [];
  const walk = (current: string) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else {
        entries.push(path.relative(dir, full));
      }
    }
  };
  walk(dir);
  return entries.sort();
};

const BINARY_EXTENSIONS = new Set(['.ico', '.png', '.jpg', '.jpeg', '.webp']);

/**
 * Map of relative file path -> content for every generated file.
 * Binary assets are recorded by byte length instead of raw bytes.
 */
const fileContents = (dir: string): Record<string, string> => {
  const contents: Record<string, string> = {};
  for (const relative of listFiles(dir)) {
    const full = path.join(dir, relative);
    if (BINARY_EXTENSIONS.has(path.extname(relative))) {
      contents[relative] = `<<binary ${fs.statSync(full).size} bytes>>`;
    } else {
      contents[relative] = fs.readFileSync(full, 'utf-8');
    }
  }
  return contents;
};

describe('Template snapshots — full option matrix', () => {
  it.each(MATRIX)('file tree and package.json match snapshot (%s)', (combo) => {
    const projectDir = generate(combo);
    const pkg = JSON.parse(
      fs.readFileSync(path.join(projectDir, 'package.json'), 'utf-8'),
    );

    expect({
      files: listFiles(projectDir),
      packageJson: pkg,
    }).toMatchSnapshot();
  });
});

describe('Template snapshots — generated content', () => {
  // Combos chosen to exercise every conditional branch at least once:
  // minimal (all none), maximal (everything on), and two mixed variants.
  const CONTENT_COMBOS = [
    'vitest-playwright-biome-none-none-none',
    'jest-cypress-eslint-shadcn-docker-storybook',
    'vitest-cypress-eslint-none-docker-none',
    'jest-playwright-biome-shadcn-none-storybook',
  ];

  it.each(CONTENT_COMBOS)(
    'generated file contents match snapshot (%s)',
    (comboName) => {
      const combo = MATRIX.find((c) => c.name === comboName);
      if (!combo) {
        throw new Error(`Combo ${comboName} not found in matrix`);
      }
      const projectDir = generate(combo);
      expect(fileContents(projectDir)).toMatchSnapshot();
    },
  );
});
