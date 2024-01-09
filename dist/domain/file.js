"use strict";
// import { ROOT_DIR_LOCATION } from "../constants";
// const fs = require("fs");
// const path = require("path");
// export async function listDirContents(filepath: string) {
//   try {
//     const files = await fs.promises.readdir(filepath);
//     const detailedFilesPromises = files.map(async (file: string) => {
//       let fileDetails = await fs.promises.lstat(path.resolve(filepath, file));
//       const { size, birthtime } = fileDetails;
//       return { filename: file, "size(KB)": size, created_at: birthtime };
//     });
//     const detailedFiles = await Promise.all(detailedFilesPromises);
//     console.table(detailedFiles);
//   } catch (error) {
//     console.error("Error occurred while reading the directory!", error);
//   }
// }
// export function createDir(filepath: string) {
//   if (!fs.existsSync(filepath)) {
//     fs.mkdirSync(filepath);
//     console.log("The directory has been created successfully");
//   }
// }
// export async function createFile(filepath: string) {
//   try {
//     const data = await fs.readFileSync(
//       path.resolve(ROOT_DIR_LOCATION + "/src/template/index.html"),
//       "utf8"
//     );
//     await fs.writeFileSync(filepath, data);
//     console.log("creating file at=>", filepath);
//   } catch (err) {
//     console.log("Create file error =>", err);
//   }
// }
// export async function copyFolder(folderPath: string) {
//   try {
//     await fs.cpSync(
//       path.resolve(ROOT_DIR_LOCATION + "/src/template"),
//       folderPath,
//       {
//         recursive: true,
//       }
//     );
//   } catch (err) {
//     console.log("Copy Folder Error =>", err);
//   }
// }
//# sourceMappingURL=file.js.map