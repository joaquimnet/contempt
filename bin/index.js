#!/usr/bin/env node

const robot = require('robotjs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const wait = require('util').promisify(setTimeout);

const argv = yargs(hideBin(process.argv)).argv;

// :D

(async () => {
  const args = argv._;
  for (const command of args) {
    try {
      if (/^wait:\d+$/.test(command)) {
        const time = parseInt(command.split(':')[1]);
        await wait(time * 1000);
        continue;
      }
      if (command.toLowerCase() === 'click') {
        robot.mouseClick();
        continue;
      }
      if (command.toLowerCase() === 'rightclick') {
        robot.mouseClick('right');
        continue;
      }
      if (command.startsWith('move:')) {
        const [x, y] = command.split(':')[1].split(',').map(Number);
        robot.moveMouse(x, y);
        continue;
      }
      if (command === 'mousepos') {
        console.log(robot.getMousePos());
        continue;
      }
      if (command.startsWith('type:')) {
        const text = command.split(':')[1].replace(/\\n/g, '\n').replace(/__/g, ' ');
        robot.typeString(text);
        continue;
      }
      if (command.startsWith('key:')) {
        // ### `key`

        // Presses the given key.

        // `key:[key],[modifier]`

        // > [modifier] accepts alt, command (win), control, and shift

        // ```bash
        // $ contempt key:f5
        // $ contempt key:t,control
        // ```
        const [key, modifier] = command.split(':')[1].split(',');
        if (modifier) {
          robot.keyTap(key, modifier);
        } else {
          robot.keyTap(key);
        }
        continue;
      }
    } catch (e) {
      console.error(e);
    }
  }
})();
