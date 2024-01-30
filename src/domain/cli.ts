import ILogger from "../interfaces/logger";
import { ICommandLine, TCreateProjectData } from "../interfaces/command-line";

export default class CLI implements ICommandLine {
  constructor(
    readonly logger: ILogger,
    readonly copyHttpModule: any,
    readonly copyProject: any,
    readonly copyRouter: any
  ) {}
  private REQUIRED_ERROR = (param: string) => `${param} is required`;
  private FEEDBACK_MESSAGE_ERROR = (path: string, error?: any) => {
    this.logger.error(`Error occurred while creating: ${path}\n`, error);
  };

  async createProjectFromTemplate(
    folderName: string,
    data: TCreateProjectData
  ) {
    try {
      if (!folderName) throw new Error(this.REQUIRED_ERROR("FOLDERNAME"));
      if (!data) throw new Error(this.REQUIRED_ERROR("DATA"));
      if (data.jest) {
        this.copyProject(
          folderName,
          "/src/template/next-jest-playwrigth-template"
        );
      } else {
        this.copyProject(folderName);
      }
      return "Project created";
    } catch (err) {
      this.FEEDBACK_MESSAGE_ERROR("TEMPLATE PROJECT", err);
      throw err;
    }
  }

  async createRouteFromTemplate(routeName: string) {
    try {
      if (!routeName) throw new Error(this.REQUIRED_ERROR("ROUTENAME"));
      await this.copyRouter(routeName);
      return "Route created";
    } catch (err) {
      this.FEEDBACK_MESSAGE_ERROR("ROUTE", err);
      throw err;
    }
  }

  async createModuleFromTemplate() {
    try {
      await this.copyHttpModule();
      return "Module created";
    } catch (err) {
      this.FEEDBACK_MESSAGE_ERROR("MODULE", err);
      throw err;
    }
  }
}

/**
 * for tests purposes only
 */
export class CommandLineMemory implements ICommandLine {
  createProjectFromTemplate: (folderName: string, data: any) => Promise<any>;
  createRouteFromTemplate: (routeName: string) => Promise<any>;
  createModuleFromTemplate: () => Promise<any>;
}
