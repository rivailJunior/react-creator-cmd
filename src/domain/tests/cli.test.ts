import { describe, vi } from "vitest";
import CLI from "../cli";
import ILogger from "../../interfaces/logger";

const copyProject = vi.fn();
const copyHttpModule = vi.fn();
const copyRouter = vi.fn();

class LoggerMemory implements ILogger {
  success = vi.fn();
  error = vi.fn();
  warn = vi.fn();
}

const cli = new CLI(
  new LoggerMemory(),
  copyHttpModule,
  copyProject,
  copyRouter
);

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});

describe("CLI", () => {
  it.only.each([
    [
      "vitest",
      {
        operation: "create-project",
        projectName: "projectWithVitest",
        typescript: true,
        vitest: true,
        jest: false,
      },
      "/src/template/next-ts-vite-workflow",
    ],
  ])(
    "should create project from template",
    async (testMethod, objectExpected, route) => {
      const projectName = objectExpected.projectName;
      const result = await cli.createProjectFromTemplate(
        projectName,
        objectExpected
      );
      expect(copyProject).toBeCalledWith(projectName);
      expect(result).toBe("Project created");
    }
  );

  it("should throw error when project name is empty", () => {
    expect(
      cli.createProjectFromTemplate("", {
        projectName: "my-first-react-project",
        typescript: true,
        vitest: false,
        jest: true,
      })
    ).rejects.toThrow("FOLDERNAME is required");
    expect(copyProject).not.toBeCalled();
  });

  it("should throw error when project name is null", () => {
    expect(
      cli.createProjectFromTemplate(null as any, {
        projectName: "my-first-react-project",
        typescript: true,
        vitest: false,
        jest: true,
      })
    ).rejects.toThrow("FOLDERNAME is required");
    expect(copyProject).not.toBeCalled();
  });

  it("should create module", async () => {
    const result = await cli.createModuleFromTemplate();
    expect(copyHttpModule).toBeCalled();
    expect(result).toBe("Module created");
  });

  it("should create new route", async () => {
    const routeName = "newRouteName";
    const result = await cli.createRouteFromTemplate(routeName);
    expect(copyRouter).toBeCalled();
    expect(result).toBe("Route created");
  });

  it("should throw error when route name is empty", () => {
    expect(cli.createRouteFromTemplate("")).rejects.toThrow(
      "ROUTENAME is required"
    );
  });
  expect(copyRouter).not.toBeCalled();
});
