import * as fs from "fs";
import {
  copyProject,
  copyHttpModule,
} from '../usecases/create-dir-from-template';
import { describe, vi } from 'vitest';
import { createDir } from '../usecases/create-dir';
import { checkIfIsNextJsProject } from '../usecases/check-next-project';

vi.mock('../usecases/check-next-project.ts');

const rootDir = process.cwd();
const destinationPath = 'copy-dir';
const modulesDestinationPath = rootDir + '/modules';

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
  it('should copy a folder from template', () => {
    copyProject(destinationPath, 'src/interfaces');
    const existDir = fs.existsSync(destinationPath);
    expect(existDir).toBe(true);
  });

  it('should throw an error when attempting to copy a non-existing folder', () => {
    expect(() => copyProject(destinationPath, 'nonExistingPath')).toThrow();
  });

  it('should throw an error when attempting to copy a folder that already exists', () => {
    copyProject(destinationPath, 'src/interfaces');
    expect(() => copyProject(destinationPath, 'src/interfaces')).toThrow(
      'copy-dir already exists'
    );
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
