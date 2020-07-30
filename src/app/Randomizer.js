import metadata from "@public/data/metadata.js";

/**
 * Class provides random properties.
 */
export default class Randomizer {
  constructor() {
    this.data = metadata;
  }

  /**
   * Generating a random integer for a given range. Inclusive.
   * 
   * @param {number} min - Left limit. Should be an integer.
   * @param {number} [max] - Right limit. Should be an integer.
   * 
   * @returns {number} Random integer value. 
   */
  static randInt(min, max) {
    // if max not provided, range is [0, min]
    if (!max) {
      [ min, max ] = [ 0, min ];
    }
  
    return Math.floor(
      Math.random() * (max - min) + min
    );
  }

  /**
   * Returns a random element from array.
   * @param {Array} arr - an array to get random element from.
   * @returns {[any, number]} Random element with it's index in array.
   */
  static randArrElement(arr) {
    const index = Math.floor(Math.random() * arr.length);
    return [ arr[index], index ];
  }

  get categories() {
    return [ ...this.data.keys() ];
  }

  getPackCardinality({ category, pack }) {
    return this.data.get(category)[pack];
  }

  get randomCategoryName() {
    return Randomizer.randArrElement(this.categories);
  }

  random() {
    // get random category
    // by category -> get array of packs cardinalities
    // the array's length is the number of packs, the values is cardinality (how many phrases)
    // ! different packs can have different number of phrases
    // ! generating position is dependent on generatin pack number
    const [ category, _ ] = this.randomCategoryName;
    const [ cardinality, pack ] = Randomizer.randArrElement(
      this.data.get(category)
    );

    return {
      category,
      pack,
      position: Randomizer.randInt(cardinality)
    };
  }

  randomID() {
    const { category, pack, position } = this.random();
    return [ category, pack, position ].join("/");
  }

}