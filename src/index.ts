#! /usr/bin/env node

// import CommanderController from "./controller/cli-commander";
import CliPromptController from "./controller/cli-prompt";

// controllers
new CliPromptController().execute();
// new CommanderController("1.0.0").execute();
