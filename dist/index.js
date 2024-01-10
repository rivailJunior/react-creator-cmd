#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Command } = require("commander");
const figlet = require("figlet");
const path = require("path");
const cli_1 = __importDefault(require("./domain/cli"));
const loggAdapter_1 = __importDefault(require("./adapters/loggAdapter"));
const logAdapter = new loggAdapter_1.default();
const program = new Command();
const AlphaCli = new cli_1.default(logAdapter);
console.log(figlet.textSync("Alpha-React"));
const constants_1 = require("./constants");
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
    AlphaCli.createBlankFolder(path.resolve(constants_1.YOUR_PROJECT_FOLDER_AT, options.mkdir));
}
if (options.touch) {
    AlphaCli.createBlankFile(path.resolve(constants_1.YOUR_PROJECT_FOLDER_AT, options.touch));
}
if (options.folder) {
    AlphaCli.createProjectFromTemplate(path.resolve(constants_1.YOUR_PROJECT_FOLDER_AT, options.folder));
}
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
//# sourceMappingURL=index.js.map