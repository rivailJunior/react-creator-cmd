import ILogger from "../interfaces/logger";
import {
  copyHttpModule,
  copyProject,
  copyRouter,
} from "./create-dir-from-template";
import { ICommandLine } from "../interfaces/command-line";

export default class CLI implements ICommandLine {
  private REQUIRED_ERROR = (param: string) => `${param} is required`;
  constructor(readonly logger: ILogger) {}

  private FEEDBACK_MESSAGE_ERROR = (path: string, error?: any) => {
    this.logger.error(`Error occurred while creating: ${path}\n`, error);
  };

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
 * for tests purposes only
 */
export class CommandLineMemory implements ICommandLine {
  createProjectFromTemplate: (folderName: string) => Promise<any>;
  createRouteFromTemplate: (routeName: string) => Promise<any>;
  createModuleFromTemplate: () => Promise<any>;
}
