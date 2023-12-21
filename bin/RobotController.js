const robot = require("robotjs");

// Example Usage
// contempt wait:1 click move:100,200 mousepos type:Hello,__World! key:a,control
// contempt --input script.txt --verbose

class RobotController {
  constructor(argv) {
    this.argv = argv;
    this.commands = [];
    robot.setKeyboardDelay(0);
  }

  addCommand(command) {
    this.commands.push(command);
  }

  async executeCommands() {
    for (const command of this.commands) {
      try {
        await command.execute();
      } catch (e) {
        console.error(e);
      }
    }
  }
}

module.exports = { RobotController };
