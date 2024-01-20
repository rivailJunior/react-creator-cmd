export interface ICLI {
  listContent: (filePath: string) => Promise<any>;
  createProjectFromTemplate: (folderName: string) => Promise<any>;
  createRouteFromTemplate: (routeName: string) => Promise<any>;
  createBlankFolder: (folderName: string) => Promise<any>;
  createBlankFile: (filePath: string) => Promise<any>;
  createModuleFromTemplate: () => Promise<any>;
}
