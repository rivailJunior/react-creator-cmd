#! /usr/bin/env node

import ClackAdapter from "./adapters/clack-adapter";
import LogAdapter from "./adapters/log-adapter";
import CliPromptController from "./controller/cli-controller";
import CLI from "./domain/cli";

// logger
const logger = new LogAdapter();

// domain
const cli = new CLI(logger);

// controllers
new CliPromptController(new ClackAdapter(cli)).execute();
