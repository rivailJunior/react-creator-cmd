export default interface ICommand {
  version: (str: string) => void;
  description: (str: string) => void;
  // option: <T>(options: T[]) => T;
  parse: (args: any) => void;
  outputHelp: () => void;
  opts?: () => void;
}
