import { hello } from "./index";

describe("hello", () => {
  it("should return the correct greeting", function () {
    const result = hello("world");
    expect(result).toBe("Hello world");
  });
});
