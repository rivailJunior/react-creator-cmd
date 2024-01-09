#! /usr/bin/env node
const { Command } = require("commander");
const figlet = require("figlet");
const path = require("path");

import CLI from "./domain/cli";
import LoggAdapter from "./adapters/loggAdapter";
const program = new Command();
const AlphaCli = new CLI(new LoggAdapter());
console.log(figlet.textSync("Alpha-React"));

import { ABOVE_DIR_LOCATION, YOUR_PROJECT_FOLDER_AT } from "./constants";
program
  .version("1.0.0")
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
  AlphaCli.createBlankFile(path.resolve(YOUR_PROJECT_FOLDER_AT, options.touch));
}

if (options.folder) {
  AlphaCli.createProjectFromTemplate(
    path.resolve(ABOVE_DIR_LOCATION, options.folder)
  );
}

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
