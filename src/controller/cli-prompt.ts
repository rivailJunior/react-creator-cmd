import ClackAdapter from "../adapters/clackAdapter";
import { IBaseController } from "../interfaces/base-controller";

export default class CliPromptController implements IBaseController {
  execute() {
    ClackAdapter.main();
  }
}
