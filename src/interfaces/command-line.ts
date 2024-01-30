export type TCreateProjectData = {
  projectName: string;
  typescript: boolean;
  vitest: boolean;
  jest: boolean;
};
export interface ICommandLine {
  createProjectFromTemplate: (
    folderName: string,
    data: TCreateProjectData
  ) => Promise<any>;
  createRouteFromTemplate: (routeName: string) => Promise<any>;
  createModuleFromTemplate: () => Promise<any>;
}
