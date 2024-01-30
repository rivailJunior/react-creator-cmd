import fs from "fs";

/**
 * Creates a directory at the specified filepath if it does not already exist.
 *
 * @param {string} filepath - The path where the directory should be created.
 * @return {void} - This function does not return a value.
 */
export function createDir(filepath: string) {
  if (fs.existsSync(filepath)) throw new Error("The directory already exists");
  fs.mkdirSync(filepath);
  return "The directory has been created successfully";
}
