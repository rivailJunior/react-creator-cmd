#! /usr/bin/env node

import ClackAdapter from "./adapters/clack/clack-adapter";
import LogAdapter from "./adapters/loger/log-adapter";
import MainController from "./controller/main";
import CLI from "./domain/cli";
import {
  copyHttpModule,
  copyProject,
  copyRouter,
} from "./domain/usecases/create-dir-from-template";
import appPackage from "../package.json";

// logger
const logger = new LogAdapter();

// domain
const cli = new CLI(logger, copyHttpModule, copyProject, copyRouter);

// controllers
new MainController(new ClackAdapter(), cli).execute();

logger.warn("v" + appPackage.version);
