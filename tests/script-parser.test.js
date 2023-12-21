const ScriptParser = require("../bin/parsers/script-parser");
const {
  WaitCommand,
  ClickCommand,
  RightClickCommand,
  MoveCommand,
  MousePosCommand,
  KeyCommand,
  TypeCommand,
} = require("../bin/commands");

describe("ScriptParser", () => {
  let scriptParser;

  beforeEach(() => {
    scriptParser = new ScriptParser();
  });

  test("should parse wait command", () => {
    scriptParser.parse("WAIT 1");
    expect(scriptParser.commands[0]).toBeInstanceOf(WaitCommand);
    expect(scriptParser.commands[0].time).toBe("1");
  });

  test("should parse click command", () => {
    scriptParser.parse("CLICK");
    expect(scriptParser.commands[0]).toBeInstanceOf(ClickCommand);
  });

  test("should parse rightClick command", () => {
    scriptParser.parse("RIGHTCLICK");
    expect(scriptParser.commands[0]).toBeInstanceOf(RightClickCommand);
  });

  test("should parse move command", () => {
    scriptParser.parse("MOVE 100 200");
    expect(scriptParser.commands[0]).toBeInstanceOf(MoveCommand);
    expect(scriptParser.commands[0].x).toBe("100");
    expect(scriptParser.commands[0].y).toBe("200");
  });

  test("should parse mousePos command", () => {
    scriptParser.parse("MOUSEPOS");
    expect(scriptParser.commands[0]).toBeInstanceOf(MousePosCommand);
  });

  test("should parse key command", () => {
    scriptParser.parse("KEY a control");
    expect(scriptParser.commands[0]).toBeInstanceOf(KeyCommand);
    expect(scriptParser.commands[0].key).toBe("a");
    expect(scriptParser.commands[0].modifier).toBe("control");
  });

  test("should parse type command", () => {
    scriptParser.parse("TYPE Hello, World!");
    expect(scriptParser.commands[0]).toBeInstanceOf(TypeCommand);
    expect(scriptParser.commands[0].text).toBe("Hello, World!");
  });

  test("should ignore invalid command", () => {
    scriptParser.parse("invalid command");
    expect(scriptParser.commands.length).toBe(0);
  });

  test("should parse multiple commands", () => {
    scriptParser.parse("WAIT 1\nCLICK\nMOVE 100 200");
    expect(scriptParser.commands.length).toBe(3);
    expect(scriptParser.commands[0]).toBeInstanceOf(WaitCommand);
    expect(scriptParser.commands[1]).toBeInstanceOf(ClickCommand);
    expect(scriptParser.commands[2]).toBeInstanceOf(MoveCommand);
  });
});
