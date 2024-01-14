import ILogger from "../interfaces/logger";
import { copyProject, copyRouter } from "./create-dir-from-template";
import { createFile } from "./create-file-from-template";
import { createDir } from "./create-dir";
import { listDirContents } from "./list-directories";

interface ICLI {
  listContent: (filePath: string) => Promise<any>;
  createProjectFromTemplate: (folderName: string) => Promise<any>;
  createRouteFromTemplate: (routeName: string) => Promise<any>;
  createBlankFolder: (folderName: string) => Promise<any>;
  createBlankFile: (filePath: string) => Promise<any>;
}
class CLI implements ICLI {
  constructor(readonly logger: ILogger) {}
  async listContent(filePath: string) {
    try {
      await listDirContents(filePath);
      this.logger.success("Showing all files inside the content");
    } catch (err) {
      this.logger.error("List Content Error =>", err);
    }
  }

  async createProjectFromTemplate(folderName: string) {
    if (!folderName) return;
    try {
      await copyProject(folderName);
      this.logger.success("Project Created");
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

  async createRouteFromTemplate(routeName) {
    if (!routeName) return;
    try {
      await copyRouter(routeName);
      this.logger.success("Route Created");
    } catch (err) {
      this.logger.error("Create Route Error =>", err);
    }
  }
}
export default CLI;
