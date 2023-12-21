const {
  WaitCommand,
  ClickCommand,
  RightClickCommand,
  MoveCommand,
  MousePosCommand,
  KeyCommand,
  TypeCommand,
} = require("../commands");

class ScriptParser {
  constructor() {
    this.commands = [];
  }

  parse(script) {
    if (!script) {
      throw new Error("Script is empty");
    }
    const lines = script.split("\n");
    for (const line of lines) {
      const command = this.parseLine(line);
      if (command) {
        this.commands.push(command);
      }
    }

    return this.commands;
  }

  parseLine(line) {
    const tokens = line.split(" ");
    const commandName = tokens[0]?.toLowerCase();
    switch (commandName) {
      case "wait":
        return new WaitCommand(tokens[1]);
      case "click":
        return new ClickCommand();
      case "rightclick":
        return new RightClickCommand();
      case "move":
        return new MoveCommand(tokens[1], tokens[2]);
      case "mousepos":
        return new MousePosCommand();
      case "key":
        return new KeyCommand(tokens[1], tokens[2]);
      case "type":
        return new TypeCommand(tokens.slice(1).join(" "));
      default:
        return null;
    }
  }
}

module.exports = ScriptParser;
