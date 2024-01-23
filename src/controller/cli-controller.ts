import { IAdapterExecutor } from "../interfaces/adapter-executor";
import { IBaseController } from "../interfaces/base-controller";

export default class CliPromptController implements IBaseController {
  constructor(readonly Adapter: IAdapterExecutor) {}
  async execute() {
    await this.Adapter.init();
  }
}
