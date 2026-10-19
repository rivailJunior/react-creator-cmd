import * as fs from "fs";
import * as path from 'path';
import {
  copyProject,
  copyHttpModule,
} from '../usecases/create-dir-from-template';
import { describe, vi } from 'vitest';
import { createDir } from '../usecases/create-dir';
import { checkIfIsNextJsProject } from '../usecases/check-next-project';
import { ProjectOptions } from '../usecases/generate-package-json';

vi.mock('../usecases/check-next-project.ts');

const rootDir = process.cwd();
const destinationPath = 'copy-dir';
const modulesDestinationPath = rootDir + '/modules';

const DEFAULT_OPTIONS: ProjectOptions = {
  projectName: 'copy-dir',
  unit: 'vitest',
  endToEnd: 'playwright',
  linting: 'biome',
  uiLibrary: 'none',
  docker: 'none',
  storybook: 'none',
};

const removeDir = (dirPath: string) => {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
};

afterEach(() => {
  removeDir(destinationPath);
  removeDir(modulesDestinationPath);
});

describe('Create Folder From Template', () => {
  it('should copy a folder from template with base + overlays', () => {
    copyProject(destinationPath, DEFAULT_OPTIONS);
    const existDir = fs.existsSync(destinationPath);
    expect(existDir).toBe(true);
    // Should have package.json generated
    expect(fs.existsSync(path.join(destinationPath, 'package.json'))).toBe(
      true,
    );
    // Should have AI files generated
    expect(fs.existsSync(path.join(destinationPath, 'CLAUDE.md'))).toBe(true);
    expect(fs.existsSync(path.join(destinationPath, 'README.md'))).toBe(true);
  });

  it('should throw an error when attempting to copy a folder that already exists', () => {
    copyProject(destinationPath, DEFAULT_OPTIONS);
    expect(() => copyProject(destinationPath, DEFAULT_OPTIONS)).toThrow(
      'copy-dir already exists',
    );
  });

  it('should include vitest overlay files', () => {
    copyProject(destinationPath, { ...DEFAULT_OPTIONS, unit: 'vitest' });
    expect(fs.existsSync(path.join(destinationPath, 'vitest.config.ts'))).toBe(
      true,
    );
  });

  it('should include biome overlay files', () => {
    copyProject(destinationPath, { ...DEFAULT_OPTIONS, linting: 'biome' });
    expect(fs.existsSync(path.join(destinationPath, 'biome.json'))).toBe(true);
  });

  it('should include shadcn overlay files', () => {
    copyProject(destinationPath, { ...DEFAULT_OPTIONS, uiLibrary: 'shadcn' });
    expect(fs.existsSync(path.join(destinationPath, 'components.json'))).toBe(
      true,
    );
    expect(
      fs.existsSync(path.join(destinationPath, 'src', 'lib', 'utils.ts')),
    ).toBe(true);
  });

  it('should include docker overlay files', () => {
    copyProject(destinationPath, { ...DEFAULT_OPTIONS, docker: 'docker' });
    expect(fs.existsSync(path.join(destinationPath, 'Dockerfile'))).toBe(true);
    expect(
      fs.existsSync(path.join(destinationPath, 'docker-compose.yml')),
    ).toBe(true);
    expect(fs.existsSync(path.join(destinationPath, '.dockerignore'))).toBe(
      true,
    );
    expect(
      fs.readFileSync(path.join(destinationPath, 'next.config.ts'), 'utf-8'),
    ).toContain('standalone');
  });

  it('should include storybook overlay files', () => {
    copyProject(destinationPath, {
      ...DEFAULT_OPTIONS,
      storybook: 'storybook',
    });
    expect(
      fs.existsSync(path.join(destinationPath, '.storybook', 'main.ts')),
    ).toBe(true);
    expect(
      fs.existsSync(path.join(destinationPath, '.storybook', 'preview.ts')),
    ).toBe(true);
    expect(
      fs.existsSync(
        path.join(destinationPath, 'src', 'components', 'heading.stories.tsx'),
      ),
    ).toBe(true);
  });
});

describe('Create Module From Template', () => {
  it('should copy a http module from template', () => {
    copyHttpModule();
    const existDir = fs.existsSync(modulesDestinationPath);
    expect(existDir).toBe(true);
  });
});

describe("Create Simple Folder", () => {
  it("should create a simple blank folder", () => {
    createDir(destinationPath);
    const existDir = fs.existsSync(destinationPath);
    expect(existDir).toBe(true);
  });

  it("should throw an error when attempting to create a folder that already exists", () => {
    createDir(destinationPath);
    expect(() => createDir(destinationPath)).toThrow(
      "The directory already exists"
    );
  });
});
