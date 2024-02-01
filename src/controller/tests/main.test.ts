import { CommandLineMemory } from "../../domain/cli";
import MainController from "../main";
import { describe, vi } from "vitest";

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
  it.each([
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

  it("should call create route and pass data", async () => {
    adapter.init = vi.fn().mockImplementation(() =>
      Promise.resolve({
        operation: "create-route",
        routeName: "users",
      })
    );
    commandLine.createRouteFromTemplate = vi
      .fn()
      .mockImplementation(() => Promise.resolve("Route created"));
    await mainController.execute();
    expect(commandLine.createRouteFromTemplate).toHaveBeenCalled();
  });

  it("should call create module and pass data", async () => {
    adapter.init = vi.fn().mockImplementation(() =>
      Promise.resolve({
        operation: "create-module",
      })
    );
    commandLine.createModuleFromTemplate = vi
      .fn()
      .mockImplementation(() => Promise.resolve("Module created"));
    await mainController.execute();
    expect(commandLine.createModuleFromTemplate).toHaveBeenCalled();
  });
});
