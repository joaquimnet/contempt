const CliParser = require("../bin/parsers/cli-parser");
const {
  WaitCommand,
  ClickCommand,
  RightClickCommand,
  MoveCommand,
  MousePosCommand,
  KeyCommand,
  TypeCommand,
} = require("../bin/commands");

describe("CliParser", () => {
  let cliParser;

  beforeEach(() => {
    cliParser = new CliParser();
  });

  test("should parse wait command", () => {
    cliParser.parse(["wait:1"]);
    expect(cliParser.commands[0]).toBeInstanceOf(WaitCommand);
    expect(cliParser.commands[0].time).toBe(1);
  });

  test("should parse click command", () => {
    cliParser.parse(["click"]);
    expect(cliParser.commands[0]).toBeInstanceOf(ClickCommand);
  });

  test("should parse rightClick command", () => {
    cliParser.parse(["rightclick"]);
    expect(cliParser.commands[0]).toBeInstanceOf(RightClickCommand);
  });

  test("should parse move command", () => {
    cliParser.parse(["move:100,200"]);
    expect(cliParser.commands[0]).toBeInstanceOf(MoveCommand);
    expect(cliParser.commands[0].x).toBe(100);
    expect(cliParser.commands[0].y).toBe(200);
  });

  test("should parse mousePos command", () => {
    cliParser.parse(["mousepos"]);
    expect(cliParser.commands[0]).toBeInstanceOf(MousePosCommand);
  });

  test("should parse key command", () => {
    cliParser.parse(["key:a,control"]);
    expect(cliParser.commands[0]).toBeInstanceOf(KeyCommand);
    expect(cliParser.commands[0].key).toBe("a");
    expect(cliParser.commands[0].modifier).toBe("control");
  });

  test("should parse type command", () => {
    cliParser.parse(["type:Hello, World!"]);
    expect(cliParser.commands[0]).toBeInstanceOf(TypeCommand);
    expect(cliParser.commands[0].text).toBe("Hello, World!");
  });

  test("should ignore invalid command", () => {
    cliParser.parse(["invalid command"]);
    expect(cliParser.commands.length).toBe(0);
  });

  test("should parse multiple commands", () => {
    cliParser.parse(["wait:1", "click", "move:100,200"]);
    expect(cliParser.commands.length).toBe(3);
    expect(cliParser.commands[0]).toBeInstanceOf(WaitCommand);
    expect(cliParser.commands[1]).toBeInstanceOf(ClickCommand);
    expect(cliParser.commands[2]).toBeInstanceOf(MoveCommand);
  });
});
