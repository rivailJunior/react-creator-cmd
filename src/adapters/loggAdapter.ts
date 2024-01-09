import ILogger from "../interfaces/logger";
const log = require("log-beautify");

export default class LoggAdapter implements ILogger {
  success(message: string, options?: any) {
    log.success(message);
    if (options) {
      log.show(options);
    }
  }
  error(message: string, options?: any) {
    log.error(message);
    if (options) {
      log.show(options);
    }
  }
  warn(message: string, options?: any) {
    log.warn(message);
    if (options) {
      log.show(options);
    }
  }
}
