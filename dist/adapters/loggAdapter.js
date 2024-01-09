"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log = require("log-beautify");
class LoggAdapter {
    success(message, options) {
        log.success(message);
        if (options) {
            log.show(options);
        }
    }
    error(message, options) {
        log.error(message);
        if (options) {
            log.show(options);
        }
    }
    warn(message, options) {
        log.warn(message);
        if (options) {
            log.show(options);
        }
    }
}
exports.default = LoggAdapter;
//# sourceMappingURL=loggAdapter.js.map