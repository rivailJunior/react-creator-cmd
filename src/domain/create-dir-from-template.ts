import fs from "fs";
import path from "path";
import { ROOT_DIR_LOCATION } from "../constants";

/**
 * Copies a folder from the source path to the destination path.
 *
 * @param {string} folderPath - The path of the folder to be copied.
 * @return {Promise<void>} Returns a promise that resolves when the folder is copied successfully.
 */
export async function copyProject(folderPath: string) {
  await fs.cpSync(
    path.resolve(ROOT_DIR_LOCATION + "/src/template/next-ts-vite-workflow"),
    folderPath,
    {
      recursive: true,
    }
  );
}

export async function copyRouter(routerName: string) {
  await fs.cpSync(
    path.resolve(ROOT_DIR_LOCATION + "/src/template/route-template"),
    routerName,
    {
      recursive: true,
    }
  );
}

export async function copyHttpModule() {
  await fs.cpSync(
    path.resolve(
      ROOT_DIR_LOCATION + "/src/template/modules-template/http-module"
    ),
    "modules/http-module",
    {
      recursive: true,
    }
  );
}
