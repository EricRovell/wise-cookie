import DB from "./DB.js";
import Phrase from "./Phrase.js";
import Randomizer from "./Randomizer.js";

import metadata from "@public/data/metadata.js";

export default class App {
  constructor() {
    this.DB = new DB();
    this.Phrase = Phrase;
    this.Randomizer = new Randomizer();

    // number of phrases in this build
    this.PHRASES = [ ...metadata.values() ]
      .flat()
      .reduce((acc, value) => acc + value, 0);
  }

  /**
   * Returns the DB class reference to work with the IDB storage.
   * @returns {DB}
   */
  get db() {
    return this.DB;
  }

  /**
   * Returns the Phrase constructor reference.
   * @returns {Phrase}
   */
  get phrase() {
    return this.Phrase;
  }

  /**
   * Generates unique ID that guaranteed to be not generated before.
   * ! The less the choices are left, the less performant it is.
   * @returns {string} - The phrase ID.
   */
  async uniqueRandom() {
    let id;
    
    do {
      id = this.Randomizer.randomID();
    } while (await this.db.checkRandomRecord(id));

    await this.db.rememberRandomRecord(id);
    return id;
  }

  /**
   * Generates a new phrase by eating a cookie if it's "ready".
   * Otherwise, returns the previously generated phrase for this cookie.
   * @param {*} index - Cookie's index.
   * @returns {Phrase} - The phrase instance.
   */
  async eatCookie(index) {
    const { status } = await this.DB.timestampStatus(index);
    if (status) {
      // cookie is ready: generate new phrase -> set timestamp with phrase
      const id = await this.uniqueRandom();
      const nextPhrase = await this.Phrase.fromID(id);

      await this.DB.setTimestamp(index, nextPhrase.toObject());
      return nextPhrase;
    }
  }

  /**
   * Gets the latest generated phrase if present.
   * @returns {Phrase} - the Phrase instance.
   */
  async lastPhrases() {
    const records = await this.DB.lastPhraseRecords();

    if (!records) return [];
    return Array.from(records.values(), value => {
      return new this.Phrase(value.phrase);
    });
  }

}
