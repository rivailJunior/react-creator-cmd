import fs from "fs";
import path from "path";
import { ROOT_DIR_LOCATION } from "../constants";

/**
 * Creates a file at the specified filepath.
 *
 * @param {string} filepath - The path where the file should be created.
 * @return {Promise<void>} A Promise that resolves once the file is created.
 */
export async function createFile(filepath: string) {
  const data = await fs.readFileSync(
    path.resolve(ROOT_DIR_LOCATION + "/src/template/index.html"),
    "utf8"
  );
  await fs.writeFileSync(filepath, data);
}
