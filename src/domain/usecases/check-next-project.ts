import fs from 'fs';
import path from 'path';
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

export const checkIfIsNextJsProject = () => {
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
