const {
  WaitCommand,
  ClickCommand,
  KeyCommand,
  MousePosCommand,
  MoveCommand,
  RightClickCommand,
  TypeCommand,
} = require("../commands");

class CliParser {
  constructor() {
    this.commands = [];
  }

  parse(args) {
    for (const arg of args) {
      if (/^wait:\d+$/.test(arg)) {
        const time = parseInt(arg.split(":")[1]);
        this.commands.push(new WaitCommand(time));
      } else if (arg.toLowerCase() === "click") {
        this.commands.push(new ClickCommand());
      } else if (arg.toLowerCase() === "rightclick") {
        this.commands.push(new RightClickCommand());
      } else if (arg.startsWith("move:")) {
        const [x, y] = arg.split(":")[1].split(",").map(Number);
        this.commands.push(new MoveCommand(x, y));
      } else if (arg === "mousepos") {
        this.commands.push(new MousePosCommand());
      } else if (arg.startsWith("type:")) {
        const text = arg.split(":")[1];
        this.commands.push(new TypeCommand(text));
      } else if (arg.startsWith("key:")) {
        const [key, modifier] = arg.split(":")[1].split(",");
        this.commands.push(new KeyCommand(key, modifier));
      }
    }

    return this.commands;
  }
}

module.exports = CliParser;
