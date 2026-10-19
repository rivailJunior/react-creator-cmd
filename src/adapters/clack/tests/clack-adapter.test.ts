import { describe, test, vi } from "vitest";
import ClackAdapter from "../clack-adapter";
import * as clack from "@clack/prompts";

vi.mock("@clack/prompts", () => {
  return {
    intro: vi.fn(),
    isCancel: vi.fn(),
    log: {
      warn: vi.fn(),
      error: vi.fn(),
      info: vi.fn(),
    },
    select: vi.fn(),
    text: vi.fn(),
    confirm: vi.fn(),
    outro: vi.fn(),
    cancel: vi.fn(),
  };
});

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});

describe("clack-adapter", () => {
  test.each([
    [
      'vitest',
      'playwright',
      'biome',
      'none',
      'docker',
      'none',
      {
        operation: 'create-project',
        projectName: 'my-first-react-project',
        typescript: true,
        unit: 'vitest',
        endToEnd: 'playwright',
        linting: 'biome',
        uiLibrary: 'none',
        docker: 'docker',
        storybook: 'none',
      },
    ],
    [
      'jest',
      'playwright',
      'eslint',
      'shadcn',
      'none',
      'storybook',
      {
        operation: 'create-project',
        projectName: 'my-first-react-project',
        typescript: true,
        unit: 'jest',
        endToEnd: 'playwright',
        linting: 'eslint',
        uiLibrary: 'shadcn',
        docker: 'none',
        storybook: 'storybook',
      },
    ],
    [
      'vitest',
      'cypress',
      'biome',
      'shadcn',
      'docker',
      'storybook',
      {
        operation: 'create-project',
        projectName: 'my-first-react-project',
        typescript: true,
        unit: 'vitest',
        endToEnd: 'cypress',
        linting: 'biome',
        uiLibrary: 'shadcn',
        docker: 'docker',
        storybook: 'storybook',
      },
    ],
  ])(
    'should call create project with unit=%s e2e=%s linting=%s ui=%s docker=%s storybook=%s',
    async (
      testMethod,
      endToEndTestMethod,
      lintingMethod,
      uiLibraryMethod,
      dockerMethod,
      storybookMethod,
      expectedObject,
    ) => {
      const selectMock = vi
        .spyOn(clack, 'select')
        .mockImplementationOnce(() => Promise.resolve('create-project'));

      vi.spyOn(clack, 'text').mockImplementation(() =>
        Promise.resolve('my-first-react-project'),
      );
      vi.spyOn(clack, 'confirm').mockImplementation(() =>
        Promise.resolve(true),
      );

      vi.spyOn(clack, 'isCancel').mockImplementation(() => false);

      selectMock
        .mockResolvedValueOnce(testMethod)
        .mockResolvedValueOnce(endToEndTestMethod)
        .mockResolvedValueOnce(lintingMethod)
        .mockResolvedValueOnce(uiLibraryMethod)
        .mockResolvedValueOnce(dockerMethod)
        .mockResolvedValueOnce(storybookMethod);

      const clackAdapter = new ClackAdapter();
      const response = await clackAdapter.init();

      expect(clack.text).toHaveBeenCalled();
      expect(clack.select).toHaveBeenCalledTimes(7);
      expect(clack.isCancel).toHaveBeenCalled();

      expect(response).toStrictEqual(expectedObject);
    },
  );

  test("should call create route and return with object containing operation and routeName", async () => {
    vi.spyOn(clack, "select").mockImplementation(() =>
      Promise.resolve("create-router")
    );
    vi.spyOn(clack, "text").mockImplementation(() =>
      Promise.resolve("users-route")
    );
    vi.spyOn(clack, "isCancel").mockImplementation(() => false);
    const clackAdapter = new ClackAdapter();
    const response = await clackAdapter.init();
    expect(clack.select).toHaveBeenCalled();
    expect(clack.text).toHaveBeenCalled();
    expect(clack.isCancel).toHaveBeenCalled();
    expect(response).toStrictEqual({
      operation: "create-route",
      routeName: "users-route",
    });
  });

  test("should call create module and return with object containing httpModule", async () => {
    vi.spyOn(clack, "select").mockImplementation(() =>
      Promise.resolve("create-http-module")
    );
    vi.spyOn(clack, "confirm").mockImplementation(() => Promise.resolve(true));
    const clackAdapter = new ClackAdapter();
    const response = await clackAdapter.init();
    expect(clack.select).toHaveBeenCalled();
    expect(clack.confirm).toHaveBeenCalled();
    expect(clack.isCancel).toHaveBeenCalled();
    expect(response).toStrictEqual({
      moduleName: "http-module",
      moduleType: "http",
      operation: "create-module",
    });
  });

  // test("command line should be called", async () => {
  // const commandLine = new CommandLineMemory();
  // commandLine.createProjectFromTemplate = vi
  //   .fn()
  //   .mockResolvedValue("create-project");
  // expect(commandLine.createProjectFromTemplate).toHaveBeenCalledWith(
  //   "my-first-react-project"
  // );
  // })
});
