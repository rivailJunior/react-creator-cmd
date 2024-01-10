"use strict";
// <reference types="vitest" />
// <reference types="vite/client" />
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("vitest/config");
const plugin_react_1 = __importDefault(require("@vitejs/plugin-react"));
const url_1 = require("url");
// https://vitejs.dev/config/
exports.default = (0, config_1.defineConfig)({
    plugins: [(0, plugin_react_1.default)()],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./setupTest.ts"],
        exclude: [...config_1.configDefaults.exclude, "**/e2e/**"],
        coverage: {
            reporter: ["text", "json", "html"],
        },
    },
    resolve: {
        alias: {
            "@": (0, url_1.fileURLToPath)(new URL("./src", import.meta.url)),
        },
    },
});
//# sourceMappingURL=vitest.config.js.map