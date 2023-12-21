const { Command } = require("./command");

class RightClickCommand extends Command {
  async execute() {
    this.robot.mouseClick("right");
  }
}

exports.RightClickCommand = RightClickCommand;
