import { TCreateModule } from "../adapters/clack/create-module";
import { TCreateProject } from "../adapters/clack/create-project";
import { TCreateRoute } from "../adapters/clack/create-router";
import { handleOperation } from "../adapters/clack/handle-operations";
import { IAdapterExecutor } from "../interfaces/adapter-executor";
import { IBaseController } from "../interfaces/base-controller";
import { ICommandLine } from "../interfaces/command-line";
type InitializeT = TCreateProject & TCreateModule & TCreateRoute;

export default class CliPromptController implements IBaseController {
  constructor(
    readonly Adapter: IAdapterExecutor,
    readonly commandLine: ICommandLine
  ) {}
  async execute() {
    const data: InitializeT = await this.Adapter.init();
    switch (data.operation) {
      case "create-project":
        return handleOperation(async () => {
          await this.commandLine.createProjectFromTemplate(data?.projectName);
        });
      case "create-module":
        return handleOperation(async () => {
          await this.commandLine.createModuleFromTemplate();
        });
      case "create-route":
        return handleOperation(async () => {
          await this.commandLine.createRouteFromTemplate(data?.routeName);
        });
    }
  }
}
