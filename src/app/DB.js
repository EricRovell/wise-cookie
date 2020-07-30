import { get, set } from "idb-keyval";

export default class DB {
  constructor() {
    this.COOKIE_TIME = 10000;
    this.FAVOURITES_LIMIT = 100;
  }

  /* user preferences */

  /**
   * Stores the desired theme value.
   * @param {string} theme 
   */
  async setTheme(theme) {
    try {
      await set("theme", theme);
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Retirieves the previously stored theme.
   */
  async getTheme() {
    try {
      return await get("theme");
    } catch (error) {
      console.log(error.message);
    }
  }

  /* Cookie timestamps */

  /**
   * Stores phrase object with current timestamp by index.
   * @param {number} index
   * @param {object} phrase
   * @returns {object} - Returns the stored values.
   */
  async setTimestamp(index, phrase) {
    try {
      const timestamps = await get("timestamp") || new Map();
      timestamps.set(index, { 
        phrase,
        timestamp: Date.now()
      });

      await set("timestamp", timestamps);
      return timestamps;
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Retrieves status of timestamp with specific index.
   * It checks if timestamp is existent and 8 hours has passed.
   * @param {number} index 
   */
  async timestampStatus(index) {
    try {
      const timestamps = await get("timestamp") || new Map();
      const response = timestamps.get(index);

      // no records for this index -> ready
      if (!response) {
        return {
          status: true,
          phrase: null
        };
      }

      // time limit is passed -> ready
      if (Date.now() - response.timestamp > this.COOKIE_TIME) {
        return {
          status: true,
          phrase: response.phrase
        }
      } else {
        return {
          status: false,
          phrase: response.phrase,
          timestamp: response.timestamp
        };
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Returns how many time is left for specific cookie "readyness".
   * @param {*} index
   * @returns {number} - Number of milliseconds left
   */
  async getTimeLeft(index) {
    try {
      const timestamps = await get("timestamp");
      const { timestamp } = timestamps.get(index);

      const timeElapsed = Date.now() - timestamp;

      return (timeElapsed < this.COOKIE_TIME)
        ? this.COOKIE_TIME - timeElapsed
        : 0;

    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Returns the last generated phrase object.
   * @returns {object} - Phrase data object.
   */
  async lastPhraseRecord() {
    try {
      const timestamps = await get("timestamp");

      // nothing stored
      if (!timestamps) return null;

      // return the first valid phrase
      for (let { timestamp, phrase } of timestamps.values()) {
        if (phrase) {
          return phrase;
        }
      }

      // no valid record
      return null;
    } catch (error) {
      console.log(error.message);
    }
  }

  /* Favourite Field */  

  /**
   * Returns the list of favourite phrases.
   * @returns {object[]}
   */
  async getFavourites() {
    try {
      const favourites = await get("favourites") || new Map();
      return [ ...favourites ];
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Checks if the given phrase in the user's personal favourite list.
   * @param {string} - Phrase ID 
   * @returns {boolean}
   */
  async isFavourite(id) {
    try {
      let favourites = await get("favourites") || new Map();
      return favourites.has(id);
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Adds a phrase to favourite list if not present, otherwise removes it from the list.
   * @param {object} phrase - Phrase object. 
   */
  async markFavourite({ id, ...rest }) {
    try {
      // retrieve the data
      let favourites = await get("favourites") || new Map();

      if (favourites.has(id)) {
        favourites.delete(id);
        return await set("favourites", favourites);
      }

      // not marked as favourite:
      //  set id as key, rest as value
      //  construct new Map from entries to set the order (LIFO)
      //  slice -> to limit the number of records
      return await set("favourites", new Map(
        [ [ id, rest ], ...favourites ].slice(0, this.FAVOURITES_LIMIT)
      ));  

    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Random Records History Set.
   * Remembers the given id.
   */
  async rememberRandomRecord(id) {
    const history = await get("history") || new Set();
    history.add(id);
    return await set("history", history);
  }

  /**
   * Checks if the phrase if was already generated.
   * @param {string} id
   * @returns {boolean} 
   */
  async checkRandomRecord(id) {
    const history = await get("history") || new Set();
    return history.has(id);
  }

  /**
   * Get the number of unique phrases already generated before.
   * @returns {number}
   */
  async getCookiesEaten() {
    const history = await get("history") || new Set();
    return history.size;
  }


}