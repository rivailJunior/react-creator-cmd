import { ROOT_DIR_LOCATION } from "../constants";

const fs = require("fs");
const path = require("path");

export function createDir(filepath: string) {
  if (!fs.existsSync(filepath)) {
    fs.mkdirSync(filepath);
    console.log("The directory has been created successfully");
  }
}
