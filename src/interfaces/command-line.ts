export interface ICommandLine {
  createProjectFromTemplate: (folderName: string) => Promise<any>;
  createRouteFromTemplate: (routeName: string) => Promise<any>;
  createModuleFromTemplate: () => Promise<any>;
}
