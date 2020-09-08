import { encrypt, decrypt } from "./encryptNumber";

test("encrypt", () => {
  const encrypted = encrypt(10);
  expect(decrypt(encrypted)).toBe(10);
});

test("encrypt with custom offset", () => {
  const encrypted = encrypt(10, 1618033);
  expect(decrypt(encrypted, 1618033)).toBe(10);
});