import { CommandLineMemory } from "../../domain/cli";
import MainController from "../main";
import { describe, test, vi } from "vitest";

vi.mock("../../adapters/clack/usecases/operation-feedback");
class AdapterExecutor {
  async init() {
    return {
      operation: "create-project",
      projectName: "my-first-react-project",
      typescript: true,
      vitest: false,
      jest: true,
    };
  }
}

const adapter = new AdapterExecutor();
const commandLine = new CommandLineMemory();
const mainController = new MainController(adapter, commandLine);

describe("Constructor", () => {
  it.only.each([
    [
      "vitest",
      {
        operation: "create-project",
        projectName: "my-first-react-project",
        typescript: true,
        vitest: true,
        jest: false,
      },
    ],
    [
      "jest",
      {
        operation: "create-project",
        projectName: "my-first-react-project",
        typescript: true,
        vitest: false,
        jest: true,
      },
    ],
  ])(
    "should call create project and pass data with %s",
    async (testMethod, objectExpected) => {
      commandLine.createProjectFromTemplate = vi
        .fn()
        .mockImplementation((objectExpected) =>
          Promise.resolve(objectExpected)
        );
      adapter.init = vi
        .fn()
        .mockImplementation(() => Promise.resolve(objectExpected));
      await mainController.execute();
      expect(commandLine.createProjectFromTemplate).toHaveBeenCalled();
      expect(adapter.init).toHaveBeenCalled();
      expect(adapter.init).toHaveReturnedWith(objectExpected);
    }
  );
});
