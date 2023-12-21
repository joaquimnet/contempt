const { Command } = require("./command");

class KeyCommand extends Command {
  constructor(key, modifier) {
    super();
    this.key = key;
    this.modifier = modifier;
  }

  async execute() {
    if (this.modifier) {
      this.robot.keyTap(this.key, this.modifier);
    } else {
      this.robot.keyTap(this.key);
    }
  }
}

exports.KeyCommand = KeyCommand;
