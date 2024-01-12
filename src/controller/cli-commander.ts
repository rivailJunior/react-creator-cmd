import { Command } from "commander";
import figlet from "figlet";
import path from "path";
import CLI from "../domain/cli";
import LoggAdapter from "../adapters/loggAdapter";
import { IBaseController } from "../interfaces/base-controller";
import { YOUR_PROJECT_FOLDER_AT } from "../constants";

const logAdapter = new LoggAdapter();
const program = new Command();
const AlphaCli = new CLI(logAdapter);

export default class CommanderController implements IBaseController {
  constructor(readonly version: string) {
    console.log(figlet.textSync("Alpha-React"));
  }

  execute() {
    program
      .version(this.version)
      .description("Alpha-React CLI helper")
      .option("-l, --ls  [value]", "List directory contents")
      .option("-m, --mkdir <value>", "Create a directory")
      .option("-t, --touch <value>", "Create a file")
      .option("-f, --folder <value>", "Create Folder")
      .parse(process.argv);

    const options = program.opts();

    if (options.ls) {
      const filepath = typeof options.ls === "string" ? options.ls : __dirname;

      AlphaCli.listContent(filepath);
    }

    if (options.mkdir) {
      AlphaCli.createBlankFolder(
        path.resolve(YOUR_PROJECT_FOLDER_AT, options.mkdir)
      );
    }

    if (options.touch) {
      AlphaCli.createBlankFile(
        path.resolve(YOUR_PROJECT_FOLDER_AT, options.touch)
      );
    }

    if (options.folder) {
      AlphaCli.createProjectFromTemplate(
        path.resolve(YOUR_PROJECT_FOLDER_AT, options.folder)
      );
    }

    if (!process.argv.slice(2).length) {
      program.outputHelp();
    }
  }
}
