const { RobotController } = require("../bin/RobotController");
const {
  ClickCommand,
  KeyCommand,
  MousePosCommand,
  MoveCommand,
  RightClickCommand,
  TypeCommand,
  WaitCommand,
} = require("../bin/commands");

describe("RobotController", () => {
  let robotController;

  beforeEach(() => {
    robotController = new RobotController();
  });

  test("should add a command to the commands array", () => {
    const command = { execute: jest.fn() };
    robotController.addCommand(command);
    expect(robotController.commands).toContain(command);
  });

  test("should execute all commands", async () => {
    const command1 = { execute: jest.fn() };
    const command2 = { execute: jest.fn() };
    robotController.addCommand(command1);
    robotController.addCommand(command2);

    await robotController.executeCommands();

    expect(command1.execute).toHaveBeenCalled();
    expect(command2.execute).toHaveBeenCalled();
  });

  test("should catch and log errors during command execution", async () => {
    const command = {
      execute: jest.fn().mockRejectedValue(new Error("Command error")),
    };
    robotController.addCommand(command);

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    await robotController.executeCommands();

    expect(consoleErrorSpy).toHaveBeenCalledWith(new Error("Command error"));
    consoleErrorSpy.mockRestore();
  });

  // Test for WaitCommand
  test("should wait for the specified time", async () => {
    const waitTime = 1; // 1 second
    const waitCommand = new WaitCommand(waitTime);
    const startTime = Date.now();

    await waitCommand.execute();

    const endTime = Date.now();
    const elapsedTime = (endTime - startTime) / 1000; // convert to seconds

    expect(elapsedTime).toBeCloseTo(waitTime, 1); // allow 1 second difference
  });

  // Test for ClickCommand
  test("should call robot.mouseClick", async () => {
    const clickCommand = new ClickCommand();
    clickCommand.robot.mouseClick = jest.fn();

    await clickCommand.execute();

    expect(clickCommand.robot.mouseClick).toHaveBeenCalled();
  });

  // Test for RightClickCommand
  test("should call robot.mouseClick with 'right'", async () => {
    const rightClickCommand = new RightClickCommand();
    rightClickCommand.robot.mouseClick = jest.fn();

    await rightClickCommand.execute();

    expect(rightClickCommand.robot.mouseClick).toHaveBeenCalledWith("right");
  });

  // Test for MoveCommand
  test("should call robot.moveMouse with correct coordinates", async () => {
    const x = 100;
    const y = 200;
    const moveCommand = new MoveCommand(x, y);
    moveCommand.robot.moveMouse = jest.fn();

    await moveCommand.execute();

    expect(moveCommand.robot.moveMouse).toHaveBeenCalledWith(x, y);
  });

  // Test for MousePosCommand
  test("should call robot.getMousePos and log the position", async () => {
    const mousePosCommand = new MousePosCommand();
    mousePosCommand.robot.getMousePos = jest
      .fn()
      .mockReturnValue({ x: 100, y: 200 });
    console.log = jest.fn();

    await mousePosCommand.execute();

    expect(console.log).toHaveBeenCalledWith("Mouse position: x=100, y=200");
  });

  // Test for TypeCommand
  test("should call robot.typeString with correct text", async () => {
    const text = "Hello, World!";
    const typeCommand = new TypeCommand(text);
    typeCommand.robot.typeString = jest.fn();

    await typeCommand.execute();

    expect(typeCommand.robot.typeString).toHaveBeenCalledWith(text);
  });

  // Test for KeyCommand
  test("should call robot.keyTap with correct key and modifier", async () => {
    const key = "a";
    const modifier = "control";
    const keyCommand = new KeyCommand(key, modifier);
    keyCommand.robot.keyTap = jest.fn();

    await keyCommand.execute();

    expect(keyCommand.robot.keyTap).toHaveBeenCalledWith(key, modifier);
  });

  // Test for KeyCommand without modifier
  test("should call robot.keyTap with correct key and no modifier", async () => {
    const key = "a";
    const keyCommand = new KeyCommand(key);
    keyCommand.robot.keyTap = jest.fn();

    await keyCommand.execute();

    expect(keyCommand.robot.keyTap).toHaveBeenCalledWith(key);
  });
});
