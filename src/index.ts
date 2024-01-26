#! /usr/bin/env node

import ClackAdapter from "./adapters/clack/clack-adapter";
import LogAdapter from "./adapters/log-adapter";
import CliPromptController from "./controller/cli-controller";
import CLI from "./domain/cli";
import {
  copyHttpModule,
  copyProject,
  copyRouter,
} from "./domain/create-dir-from-template";

// logger
const logger = new LogAdapter();

// domain
const cli = new CLI(logger, copyHttpModule, copyProject, copyRouter);

// controllers
new CliPromptController(new ClackAdapter(), cli).execute();
