export type TCreateProjectData = {
  operation: string;
  projectName: string;
  typescript: boolean;
  unit: string;
  endToEnd: string;
  linting: string;
  uiLibrary: string;
};
export interface ICommandLine {
  createProjectFromTemplate: (
    folderName: string,
    data: TCreateProjectData
  ) => Promise<any>;
  createRouteFromTemplate: (routeName: string) => Promise<any>;
  createModuleFromTemplate: () => Promise<any>;
}
