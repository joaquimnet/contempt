const { Command } = require("./command");

class MousePosCommand extends Command {
  async execute() {
    const mousePos = this.robot.getMousePos();
    console.log(`Mouse position: x=${mousePos.x}, y=${mousePos.y}`);
  }
}

exports.MousePosCommand = MousePosCommand;
