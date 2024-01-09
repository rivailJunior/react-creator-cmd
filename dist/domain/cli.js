"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const createDirFromTemplate_1 = require("./createDirFromTemplate");
const createFile_1 = require("./createFile");
const createSimpleFolder_1 = require("./createSimpleFolder");
const listDirContent_1 = require("./listDirContent");
class CLI {
    constructor(logger) {
        this.logger = logger;
    }
    listContent(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, listDirContent_1.listDirContents)(filePath);
                this.logger.success("Showing all files inside the content");
            }
            catch (err) {
                this.logger.error("List Content Error =>", err);
            }
        });
    }
    createProjectFromTemplate(folderName = "example-alpha-react") {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, createDirFromTemplate_1.copyFolder)(folderName);
                this.logger.success("Alpha-React Project Created");
            }
            catch (err) {
                this.logger.error("Create Folder Error =>", err);
            }
        });
    }
    createBlankFolder(folderName = "folder-alpha") {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, createSimpleFolder_1.createDir)(folderName);
                this.logger.success("Folder Created");
            }
            catch (err) {
                this.logger.error("Create Folder Error =>", err);
            }
        });
    }
    createBlankFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, createFile_1.createFile)(filePath);
                this.logger.success("File Created");
            }
            catch (err) {
                this.logger.error("Create File Error =>", err);
            }
        });
    }
}
exports.default = CLI;
//# sourceMappingURL=cli.js.map