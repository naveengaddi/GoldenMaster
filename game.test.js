import { run } from "./game";
import { readFile } from "fs/promises";

describe("Gold Master Test", function () {
  let golden = [];
  let logs = [];
  const originalLog = console.log;

  beforeAll(async () => {
    const goldenRaw = await readFile("./golden.txt", "utf8");
    golden = goldenRaw
      .trim()
      .split("\n")
      .map((line) => line.trim());

    console.log = function (...args) {
      originalLog(...args);
      logs.push(...args);
    };
  });

  afterAll(() => {
    logs = [];
    console.log = originalLog;
  });

  it("should check the game output against the snapshot", function () {
    run(123);
    expect(logs.length).toBe(golden.length);
    const diff = logs.reduce((acc, log, i) => {
      if (logs[i] === golden[i]) {
        return acc;
      }
      acc += `\nLine: ${i + 1}\nExpected: ${golden[i]}\nReceived: ${logs[i]}`;
      acc += "\n----------";
      return acc;
    }, "");
    expect(diff).toBe("");
  });
});
