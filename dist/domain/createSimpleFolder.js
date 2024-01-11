"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDir = void 0;
const fs_1 = __importDefault(require("fs"));
function createDir(filepath) {
    if (!fs_1.default.existsSync(filepath)) {
        fs_1.default.mkdirSync(filepath);
        console.log("The directory has been created successfully");
    }
}
exports.createDir = createDir;
//# sourceMappingURL=createSimpleFolder.js.map