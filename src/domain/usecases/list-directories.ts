import fs from "fs";
import path from "path";

/**
 * Lists the contents of a directory.
 * @param {string} filepath - The path of the directory.
 * @return {Promise<void>} - A promise that resolves when the directory contents are listed.
 * It's not used yet
 */
export async function listDirContents(filepath: string) {
  try {
    const files = await fs.promises.readdir(filepath);
    const detailedFilesPromises = files.map(async (file: string) => {
      let fileDetails = await fs.promises.lstat(path.resolve(filepath, file));
      const { size, birthtime } = fileDetails;
      return { filename: file, "size(KB)": size, created_at: birthtime };
    });
    const detailedFiles = await Promise.all(detailedFilesPromises);
    console.table(detailedFiles);
  } catch (error) {
    console.error("Error occurred while reading the directory!", error);
  }
}
