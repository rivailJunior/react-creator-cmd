import fs from "fs";
import path from "path";

import { ROOT_DIR_LOCATION } from "../constants";

/**
 * Reads the content of a file asynchronously.
 *
 * @param {string} filePath - The path of the file to be read. Defaults to "/src/template/index.html".
 * @return {Promise<string>} A promise that resolves with the content of the file.
 */
export const readFile = async (
  filePath: string = "/src/template/index.html"
) => {
  const data = await fs.readFileSync(
    path.resolve(ROOT_DIR_LOCATION + filePath),
    "utf8"
  );
  return data;
};
