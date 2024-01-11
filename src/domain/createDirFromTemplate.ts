import fs from "fs";
import path from "path";
import { ROOT_DIR_LOCATION } from "../constants";

export async function copyFolder(folderPath: string) {
  await fs.cpSync(
    path.resolve(ROOT_DIR_LOCATION + "/src/template/next-typescript-template"),
    folderPath,
    {
      recursive: true,
    }
  );
}
