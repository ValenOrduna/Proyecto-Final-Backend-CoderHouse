import { createHash, isValid } from "../utils/crypt.js";
import assert from "assert";

describe("createHash", () => {
  it("returns a string", () => {
    assert.strictEqual(typeof createHash("estoesunprueba"), "string");
  });
});

describe("compareHash", () => {
  it("returns a boolean", () => {
    const password = "estoesunprueba";
    const user = { password: createHash(password) };
    assert.strictEqual(isValid(user, password), true);
  });
});

describe("compareHash", () => {
  it("returns a boolean", () => {
    const password = "estoesunprueba";
    const user = { password: createHash(password) };
    assert.strictEqual(isValid(user, "estoesunapruebafallida"), false);
  });
});
