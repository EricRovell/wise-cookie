/**
 * Random values provider.
 */
export default class Random {
  /**
   * Generates a Uint32Array filled with random values.
   * @param integers - number of integers inside the array.
   * 
   * Max generated values is 2**32 - 1 
   * 
   * @static
   */
  private static Uint32ArrayRandom(integers: number = 1): Uint32Array {
    return crypto.getRandomValues(
      new Uint32Array(integers)
    );
  }

  /**
   * Generates a random floating number.
   */
  static randFloat(): number {
    const twoIntegers = this.Uint32ArrayRandom(2);
    // keep all 32 bits of the the first, top 20 of the second for 52 random bits
    const mantissa = twoIntegers[0] * (2 ** 20) + (twoIntegers[1] >>> 12);
    // shift all 52 bits to the right of the decimal point
    return mantissa * (2 ** (-52));
  }

  /**
   * Generates a random floating number in given range.
   * Left limit is inclusive, right is exclusive.
   * If max value is not specified, the range is [0, min)
   * @param min - Left limit.
   * @param max - Right limit.
   */
  static randFloatRange(min: number, max: number = 0): number {
    return (max === 0)
      ? this.randFloat() * min
      : this.randFloat() * (max - min) + min;
  }

  /**
   * Generates a random integer for specified range.
   * Right limit is exlusive, left is inclusive.
   * @param min - left limit.
   * @param max - right limit.
   */
  static randInt(min: number, max: number = 0): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    // new range is [0, min]
    if (max === 0) return Math.floor(this.randFloat() * min);

    return Math.floor(this.randFloat() * (max - min)) + min;
  }

  /**
   * Generates a random integer for specified range.
   * Both limits are inclusive.
   * @param min - left limit.
   * @param max - right limit.
   */
  static randIntInc(min: number, max: number = 0): number {
    return (max)
      ? this.randInt(min, max + 1)
      : this.randInt(0, min + 1)
  }

  /**
   * Pulls out a random element from an array or a character from a string.
   * @param iterable - List of items or a string.
   * @param index - if truthy, function returns item with it's index.
   */
  static randArrElement(iterable, index: boolean = false) {
    const randIndex = this.randInt(iterable.length);
    const randItem = iterable[randIndex];

    return index
      ? [ randIndex, randItem ]
      : randItem;
  }

}