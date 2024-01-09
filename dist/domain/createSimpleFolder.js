"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDir = void 0;
const fs = require("fs");
const path = require("path");
function createDir(filepath) {
    if (!fs.existsSync(filepath)) {
        fs.mkdirSync(filepath);
        console.log("The directory has been created successfully");
    }
}
exports.createDir = createDir;
//# sourceMappingURL=createSimpleFolder.js.map