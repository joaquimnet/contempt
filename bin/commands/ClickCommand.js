const { Command } = require("./command");

class ClickCommand extends Command {
  async execute() {
    this.robot.mouseClick();
  }
}

exports.ClickCommand = ClickCommand;
