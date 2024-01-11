import fs from "fs";
import path from "path";

import { ROOT_DIR_LOCATION } from "../constants";

export const readFile = async (
  filePath: string = "/src/template/index.html"
) => {
  const data = await fs.readFileSync(
    path.resolve(ROOT_DIR_LOCATION + filePath),
    "utf8"
  );
  return data;
};
