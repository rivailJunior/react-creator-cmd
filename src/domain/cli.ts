import ILogger from "../interfaces/logger";
import {
  copyHttpModule,
  copyProject,
  copyRouter,
} from "./create-dir-from-template";
import { createFile } from "./create-file-from-template";
import { createDir } from "./create-dir";
import { listDirContents } from "./list-directories";
import { ICommandLine } from "../interfaces/command-line";

export default class CLI implements ICommandLine {
  private REQUIRED_ERROR = (param: string) => `${param} is required`;
  constructor(readonly logger: ILogger) {}

  private FEEDBACK_MESSAGE_ERROR = (path: string, error?: any) => {
    this.logger.error(`Error occurred while creating: ${path}\n`, error);
  };

  async listContent(filePath: string) {
    if (!filePath) throw new Error(this.REQUIRED_ERROR("FILEPATH"));
    try {
      await listDirContents(filePath);
      this.logger.success("Showing all files inside the content");
    } catch (err) {
      this.logger.error("Error occurred while list CONTENTS\n", err);
    }
  }

  async createBlankFile(filePath: string) {
    if (!filePath) throw new Error(this.REQUIRED_ERROR("FILEPATH"));
    try {
      await createFile(filePath);
    } catch (err) {
      this.FEEDBACK_MESSAGE_ERROR("BLANK FILE", err);
    }
  }

  async createBlankFolder(folderName: string) {
    if (!folderName) throw new Error(this.REQUIRED_ERROR("FOLDERNAME"));
    try {
      await createDir(folderName);
    } catch (err) {
      this.FEEDBACK_MESSAGE_ERROR("BLANK FOLDER", err);
    }
  }

  async createProjectFromTemplate(folderName: string) {
    if (!folderName) throw new Error(this.REQUIRED_ERROR("FOLDERNAME"));
    try {
      await copyProject(folderName);
    } catch (err) {
      this.FEEDBACK_MESSAGE_ERROR("TEMPLATE PROJECT", err);
    }
  }

  async createRouteFromTemplate(routeName: string) {
    if (!routeName) throw new Error(this.REQUIRED_ERROR("ROUTENAME"));
    try {
      await copyRouter(routeName);
    } catch (err) {
      this.FEEDBACK_MESSAGE_ERROR("ROUTE", err);
    }
  }

  async createModuleFromTemplate() {
    try {
      copyHttpModule();
    } catch (err) {
      this.FEEDBACK_MESSAGE_ERROR("MODULE", err);
    }
  }
}

/**
 * for test usage only
 */
export class CommandLineMemory implements ICommandLine {
  listContent: (filePath: string) => Promise<any>;
  createProjectFromTemplate: (folderName: string) => Promise<any>;
  createRouteFromTemplate: (routeName: string) => Promise<any>;
  createBlankFolder: (folderName: string) => Promise<any>;
  createBlankFile: (filePath: string) => Promise<any>;
  createModuleFromTemplate: () => Promise<any>;
}
