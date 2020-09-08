/**
 * Encrypts the natural number into a string.
 */
export function encrypt(number: number, offset: number = 31415546548721): string {
  return [ ...(number + offset).toString() ]
    .map((digit, index) => {
      const modified = Number(digit);
      return (index % 2 === 0)
        ? String.fromCharCode(107 + modified)
        : String.fromCharCode(97 + modified);
    })
    .join("");
}

export function decrypt(str: string, offset: number = 31415546548721): number {
  const number = str
    .split("")
    .map((char, index) => {
      const unmodified = (index % 2 === 0)
        ? char.charCodeAt(0) - 107
        : char.charCodeAt(0) - 97;

      return Number(unmodified);
    })
    .join("");

  return Number(number) - offset;
}