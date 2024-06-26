import fs from "fs";
import path from "path";
import { ROOT_DIR_LOCATION } from "../../constants";

const rootDir = process.cwd();
const checkExists = (filePath) => fs.existsSync(filePath);
const checkPackageJson = (filePath) => {
  if (checkExists(filePath)) {
    const packageJson = require(filePath);
    return (
      packageJson.dependencies &&
      packageJson.dependencies.next &&
      packageJson.dependencies.react
    );
  }
  return false;
};

const checkIfIsNextJsProject = () => {
  // Define the paths to check
  const packageJsonPath = path.join(rootDir, 'package.json');
  const nextConfigJs = path.join(rootDir, 'next.config.js');
  const nextConfigMjs = path.join(rootDir, 'next.config.mjs');

  // Perform the checks
  const isNextJsProject =
    checkPackageJson(packageJsonPath) &&
    (checkExists(nextConfigJs) || checkExists(nextConfigMjs));

  // Output the result
  if (!isNextJsProject) {
    throw 'You must be in a Nextjs project.';
  }
};

/**
 * Copies a folder from the source path to the destination path.
 *
 * @param {string} folderPath - The path of the folder to be copied.
 */
export function copyProject(folderPath: string, pathRoute: string) {
  if (fs.existsSync(folderPath))
    throw new Error(`${folderPath} already exists`);
  return fs.cpSync(path.resolve(ROOT_DIR_LOCATION + pathRoute), folderPath, {
    recursive: true,
  });
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
    }
  );
}

export function copyHttpModule() {
  checkIfIsNextJsProject();
  const folderPath = 'modules/http-module';
  if (fs.existsSync(folderPath))
    throw new Error(`${folderPath} already exists`);
  return fs.cpSync(
    path.resolve(
      ROOT_DIR_LOCATION + '/src/template/modules-template/http-module'
    ),
    folderPath,
    {
      recursive: true,
    }
  );
}
