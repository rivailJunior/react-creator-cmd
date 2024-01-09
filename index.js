const fs = require("node:fs");
const path = require("node:path");
const figlet = require("figlet");
const log = require("log-beautify");

// fs.readdirSync("src").map((fileName) => {
//   console.log(fileName);
//   return path.join("src", fileName);
// });

console.log("path resolver", path.resolve(__dirname));

// fs.cp("./src", "./src2", { recursive: true }, (err) => {
//   if (err) {
//     console.error(err);
//   }
// });
// log.trace("Trace");
// log.success("Success");
