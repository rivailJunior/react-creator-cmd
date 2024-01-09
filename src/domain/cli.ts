import ILogger from "../interfaces/logger";
import { copyFolder } from "./createDirFromTemplate";
import { createFile } from "./createFile";
import { createDir } from "./createSimpleFolder";
import { listDirContents } from "./listDirContent";

interface ICLI {
  listContent: (filePath: string) => Promise<any>;
  createProjectFromTemplate: (folderName: string) => Promise<any>;
  createBlankFolder: (folderName: string) => Promise<any>;
  createBlankFile: (filePath: string) => Promise<any>;
}
export default class CLI implements ICLI {
  constructor(readonly logger: ILogger) {}
  async listContent(filePath: string) {
    try {
      await listDirContents(filePath);
      this.logger.success("Showing all files inside the content");
    } catch (err) {
      this.logger.error("List Content Error =>", err);
    }
  }

  async createProjectFromTemplate(folderName: string = "example-alpha-react") {
    try {
      await copyFolder(folderName);
      this.logger.success("Alpha-React Project Created");
    } catch (err) {
      this.logger.error("Create Folder Error =>", err);
    }
  }

  async createBlankFolder(folderName: string = "folder-alpha") {
    try {
      await createDir(folderName);
      this.logger.success("Folder Created");
    } catch (err) {
      this.logger.error("Create Folder Error =>", err);
    }
  }

  async createBlankFile(filePath: string) {
    try {
      await createFile(filePath);
      this.logger.success("File Created");
    } catch (err) {
      this.logger.error("Create File Error =>", err);
    }
  }
}
