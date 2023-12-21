const robot = require("robotjs");

class Command {
  constructor() {
    this.robot = robot;
  }

  async execute() {
    throw new Error("execute() method must be implemented by subclasses");
  }
}

exports.Command = Command;
