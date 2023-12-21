const { Command } = require("./command");

class MoveCommand extends Command {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }

  async execute() {
    this.robot.moveMouse(this.x, this.y);
  }
}

exports.MoveCommand = MoveCommand;
