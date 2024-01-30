import fs from "fs";
import path from "path";
import { ROOT_DIR_LOCATION } from "../../constants";

/**
 * Creates a file at the specified filepath.
 * @param {string} filepath - The path where the file should be created.
 * It's not used yet.
 */
export function createFile(filepath: string) {
  const data = fs.readFileSync(
    path.resolve(ROOT_DIR_LOCATION + "/src/template/index.html"),
    "utf8"
  );
  fs.writeFileSync(filepath, data);
}
