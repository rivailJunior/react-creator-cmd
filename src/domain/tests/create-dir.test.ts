import * as fs from "fs";
import { copyProject } from "../create-dir-from-template";
import { describe } from "vitest";
import { createDir } from "../create-dir";

const destinationPath = "copy-dir";
const removeDir = (dirPath: string) => {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
};

afterEach(() => {
  removeDir(destinationPath);
});

describe("Create Folder From Template", () => {
  it("should copy a folder from template", () => {
    copyProject(destinationPath, "src/interfaces");
    const existDir = fs.existsSync(destinationPath);
    expect(existDir).toBe(true);
  });

  it("should throw an error when attempting to copy a non-existing folder", () => {
    expect(() => copyProject(destinationPath, "nonExistingPath")).toThrow();
  });

  it("should throw an error when attempting to copy a folder that already exists", () => {
    copyProject(destinationPath, "src/interfaces");
    expect(() => copyProject(destinationPath, "src/interfaces")).toThrow(
      "copy-dir already exists"
    );
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
