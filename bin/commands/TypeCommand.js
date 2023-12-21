const { Command } = require("./command");

class TypeCommand extends Command {
  constructor(text) {
    super();
    this.text = text.replace(/\\n/g, "\n").replace(/__/g, " ");
  }

  async execute() {
    this.robot.setKeyboardDelay(0);
    this.robot.typeString(this.text);
  }
}

exports.TypeCommand = TypeCommand;
