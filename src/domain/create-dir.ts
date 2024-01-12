import fs from "fs";

/**
 * Creates a directory at the specified filepath if it does not already exist.
 *
 * @param {string} filepath - The path where the directory should be created.
 * @return {void} - This function does not return a value.
 */
export function createDir(filepath: string) {
  if (!fs.existsSync(filepath)) {
    fs.mkdirSync(filepath);
    console.log("The directory has been created successfully");
  }
}
