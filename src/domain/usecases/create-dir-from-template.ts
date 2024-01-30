import fs from "fs";
import path from "path";
import { ROOT_DIR_LOCATION } from "../../constants";

/**
 * Copies a folder from the source path to the destination path.
 *
 * @param {string} folderPath - The path of the folder to be copied.
 */
export function copyProject(
  folderPath: string,
  pathRoute: string = ROOT_DIR_LOCATION + "/src/template/next-ts-vite-workflow"
) {
  if (fs.existsSync(folderPath))
    throw new Error(`${folderPath} already exists`);
  return fs.cpSync(path.resolve(pathRoute), folderPath, {
    recursive: true,
  });
}

export function copyRouter(routerName: string) {
  if (fs.existsSync(routerName))
    throw new Error(`${routerName} already exists`);
  return fs.cpSync(
    path.resolve(ROOT_DIR_LOCATION + "/src/template/route-template"),
    routerName,
    {
      recursive: true,
    }
  );
}

export function copyHttpModule() {
  const folderPath = "modules/http-module";
  if (fs.existsSync(folderPath))
    throw new Error(`${folderPath} already exists`);
  return fs.cpSync(
    path.resolve(
      ROOT_DIR_LOCATION + "/src/template/modules-template/http-module"
    ),
    folderPath,
    {
      recursive: true,
    }
  );
}
