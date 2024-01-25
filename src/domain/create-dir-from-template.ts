import fs from "fs";
import path from "path";
import { ROOT_DIR_LOCATION } from "../constants";

/**
 * Copies a folder from the source path to the destination path.
 *
 * @param {string} folderPath - The path of the folder to be copied.
 */
export function copyProject(folderPath: string) {
  return fs.cpSync(
    path.resolve(ROOT_DIR_LOCATION + "/src/template/next-ts-vite-workflow"),
    folderPath,
    {
      recursive: true,
    }
  );
}

export function copyRouter(routerName: string) {
  return fs.cpSync(
    path.resolve(ROOT_DIR_LOCATION + "/src/template/route-template"),
    routerName,
    {
      recursive: true,
    }
  );
}

export function copyHttpModule() {
  return fs.cpSync(
    path.resolve(
      ROOT_DIR_LOCATION + "/src/template/modules-template/http-module"
    ),
    "modules/http-module",
    {
      recursive: true,
    }
  );
}
