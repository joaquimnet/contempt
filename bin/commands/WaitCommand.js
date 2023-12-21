const { Command } = require("./command");
const wait = require("util").promisify(setTimeout);

class WaitCommand extends Command {
  constructor(time) {
    super();
    this.time = time;
  }

  async execute() {
    await wait(this.time * 1000);
  }
}

exports.WaitCommand = WaitCommand;
