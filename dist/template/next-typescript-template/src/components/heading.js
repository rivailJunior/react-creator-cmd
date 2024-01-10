"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Heading = void 0;
const react_1 = __importDefault(require("react"));
function Heading() {
    return (react_1.default.createElement("div", { className: "flex h-10 flex-col justify-around p-24" },
        react_1.default.createElement("h1", { className: "mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white" }, "Hey, let\u2019s build something together?"),
        react_1.default.createElement("p", { className: "mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400" }, "We are here to help you configure easily your react.js project")));
}
exports.Heading = Heading;
//# sourceMappingURL=heading.js.map