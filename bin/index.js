#!/usr/bin/env node

const fs = require("fs");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const path = require("path");

const { RobotController } = require("./RobotController");
const ScriptParser = require("./parsers/script-parser");
const CliParser = require("./parsers/cli-parser");

const argv = yargs(hideBin(process.argv))
  .option("input", {
    alias: "i",
    describe: "Input file",
    type: "string",
  }).argv;

const inputFileArg = argv.input;
const hasArgs = argv._.length > 0;

if (hasArgs || inputFileArg) {
  const controller = new RobotController(argv);
  if (hasArgs) {
    const cliParser = new CliParser();
    const commands = cliParser.parse(argv._);
    for (const command of commands) {
      controller.addCommand(command);
    }
  }

  if (inputFileArg) {
    const inputFile = path.resolve(process.cwd(), inputFileArg);

    if (!fs.existsSync(inputFile)) {
      throw new Error("Input file not found: " + inputFile);
    }

    const script = fs.readFileSync(inputFile, "utf8");
    const scriptParser = new ScriptParser();
    const parsedCommands = scriptParser.parse(script?.trim());
    for (const command of parsedCommands) {
      controller.addCommand(command);
    }
  }

  if (module === require.main) controller.executeCommands();
}
