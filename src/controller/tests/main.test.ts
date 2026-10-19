import { CommandLineMemory } from "../../domain/cli";
import MainController from "../main";
import { describe, vi } from "vitest";

vi.mock("../../adapters/clack/usecases/operation-feedback");
class AdapterExecutor {
  async init() {
    return {
      operation: 'create-project',
      projectName: 'my-first-react-project',
      typescript: true,
      unit: 'vitest',
      endToEnd: 'playwright',
      linting: 'biome',
      uiLibrary: 'none',
      docker: 'none',
      storybook: 'none',
    };
  }
}

const adapter = new AdapterExecutor();
const commandLine = new CommandLineMemory();
const mainController = new MainController(adapter, commandLine);

describe("Constructor", () => {
  it.each([
    [
      'vitest + playwright + biome',
      {
        operation: 'create-project',
        projectName: 'my-first-react-project',
        typescript: true,
        unit: 'vitest',
        endToEnd: 'playwright',
        linting: 'biome',
        uiLibrary: 'none',
        docker: 'none',
        storybook: 'none',
      },
    ],
    [
      'jest + cypress + eslint + shadcn',
      {
        operation: 'create-project',
        projectName: 'my-first-react-project',
        typescript: true,
        unit: 'jest',
        endToEnd: 'cypress',
        linting: 'eslint',
        uiLibrary: 'shadcn',
        docker: 'none',
        storybook: 'none',
      },
    ],
  ])(
    'should call create project and pass data with %s',
    async (_label, objectExpected) => {
      commandLine.createProjectFromTemplate = vi
        .fn()
        .mockImplementation(() => Promise.resolve('Project created'));
      adapter.init = vi.fn().mockResolvedValue(objectExpected);
      await mainController.execute();
      expect(commandLine.createProjectFromTemplate).toHaveBeenCalled();
      expect(adapter.init).toHaveBeenCalled();
      const result = await adapter.init();
      expect(result).toStrictEqual(objectExpected);
    },
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
