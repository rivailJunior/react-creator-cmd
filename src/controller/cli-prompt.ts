import ClackAdapter from "../adapters/clack-adapter";
import { IBaseController } from "../interfaces/base-controller";

export default class CliPromptController implements IBaseController {
  execute() {
    ClackAdapter.main();
  }
}
