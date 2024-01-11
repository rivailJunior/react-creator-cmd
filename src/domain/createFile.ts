import fs from "fs";
import path from "path";
import { ROOT_DIR_LOCATION } from "../constants";

export async function createFile(filepath: string) {
  const data = await fs.readFileSync(
    path.resolve(ROOT_DIR_LOCATION + "/src/template/index.html"),
    "utf8"
  );
  await fs.writeFileSync(filepath, data);
}
