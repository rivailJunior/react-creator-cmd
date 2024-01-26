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
  it("should create project from template", async () => {
    const projectName = "projectPathName";
    const result = await cli.createProjectFromTemplate(projectName);
    expect(copyProject).toBeCalledWith(projectName);
    expect(result).toBe("Project created");
  });

  it("should throw error when project name is empty", () => {
    expect(cli.createProjectFromTemplate("")).rejects.toThrow(
      "FOLDERNAME is required"
    );
    expect(copyProject).not.toBeCalled();
  });

  it("should throw error when project name is null", () => {
    expect(cli.createProjectFromTemplate(null as any)).rejects.toThrow(
      "FOLDERNAME is required"
    );
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
