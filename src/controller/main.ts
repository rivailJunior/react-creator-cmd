import { TCreateModule } from "../adapters/clack/usecases/create-module";
import { TCreateRoute } from "../adapters/clack/usecases/create-router";
import { handleSuccessFeedback } from "../adapters/clack/usecases/operation-feedback";
import { IAdapterExecutor } from "../interfaces/adapter-executor";
import { IBaseController } from "../interfaces/base-controller";
import { ICommandLine, TCreateProjectData } from "../interfaces/command-line";
type InitializeT = TCreateProjectData & TCreateModule & TCreateRoute;

export default class MainController implements IBaseController {
  constructor(
    readonly Adapter: IAdapterExecutor,
    readonly commandLine: ICommandLine
  ) {}
  async execute() {
    const data: InitializeT = await this.Adapter.init();

    switch (data.operation) {
      case "create-project":
        await this.commandLine.createProjectFromTemplate(
          data?.projectName,
          data
        );
        return await handleSuccessFeedback();
      case "create-module":
        await this.commandLine.createModuleFromTemplate();
        return await handleSuccessFeedback();
      case "create-route":
        await this.commandLine.createRouteFromTemplate(data?.routeName);
        return await handleSuccessFeedback();
    }
  }
}
