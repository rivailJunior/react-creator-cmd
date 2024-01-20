import ILogger from "../interfaces/logger";
import {
  copyHttpModule,
  copyProject,
  copyRouter,
} from "./create-dir-from-template";
import { createFile } from "./create-file-from-template";
import { createDir } from "./create-dir";
import { listDirContents } from "./list-directories";
import { ICLI } from "../interfaces/cli";

class CLI implements ICLI {
  constructor(readonly logger: ILogger) {}
  async createModuleFromTemplate() {
    try {
      copyHttpModule();
      // this.logger.success("Module Created");
    } catch (err) {
      this.logger.error("Create Module Error =>", err);
    }
  }
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
      // this.logger.success("Project Created");
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
