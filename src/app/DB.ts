import { get, set, del } from "idb-keyval";

import type {
  Theme, CookieIndex, UniqueCookies,
  Phrase, PhraseID,
  PhrasesHistory, PhrasesFavourite, PhrasesCurrent, PhraseIDString
} from "#types/types";

export default class DB {
  static FAVOURITES_LIMIT: number = 100;

  /* user */

  /**
   * Gets the user status, is it a new guest.
   */
  public static async getUserStatus(): Promise<boolean> {
    return !!(await get("user"));
  }

  /**
   * Sets the user status.
   */
  public static async setUserStatus(status: boolean = true): Promise<void> {
    await set("user", status);
  }

  /**
   * Stores the desired theme value in preferences.
   */
  public static async setTheme(theme: Theme): Promise<void> {
    try {
      await set("theme", theme);
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Retrieves the previously stored theme.
   */
  public static async getTheme(): Promise<Theme> {
    try {
      return await get("theme");
    } catch (error) {
      console.error(error.message);
    }
  }

  /* Cookie timestamps */

  /**
   * Sets timestamp on phrase object and store it as current user's phrases.
   */
  public static async setCurrentPhrase(index: CookieIndex, phrase: Phrase): Promise<void> {
    try {
      const current: PhrasesCurrent = await get("timestamp") || new Map();
      current.set(index, {
        ...phrase,
        timestamp: Date.now()
      });

      await set("timestamp", current);
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Returns the current phrases the user have from eaten cookies.
   */
  public static async getCurrentPhrases(): Promise<PhrasesCurrent> {
    try {
      return await get("timestamp") || new Map();
    } catch (error) {
      console.log(error.message);
    }
  }

  /* Favourites */  

  /**
   * Returns the favourite phrases map.
   */
  public static async getFavouritePhrases(): Promise<PhrasesFavourite> {
    try {
      return await get("favourites") || new Map();
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Sets the favourite phrases value.
   */
  public static async setFavouritePhrases(value: PhrasesFavourite = new Map()): Promise<void> {
    try {
      await set("favourites", value);
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Adds a new phrase to the beginning of the favourites map.
   */
  public static async favouritePhrasesShift(phrase: Phrase): Promise<void> {
    // check the presense of the phrase
    const idString: PhraseIDString = phrase.id.toString();
    const favourites = await this.getFavouritePhrases();

    if (favourites.has(idString)) return;

    let updated: PhrasesFavourite = new Map(
      [ [ idString, phrase ] as [ PhraseIDString, Phrase ], ...favourites ].slice(0, DB.FAVOURITES_LIMIT)
    );

    await this.setFavouritePhrases(updated);
  }

  /* History and uniqueness */

  /**
   * Sets the value of unique cookies value.
   */
  public static async setUniqueCookies(value: number): Promise<void> {
    try {
      await set("uniqueCookies", value);
    } catch (error) {
      console.error(`Something is wrong: ${error.message}`);
    }
  }

  /**
   * Return a value of unique cookies that available for a user.
   */
  public static async getUniqueCookies(): Promise<UniqueCookies> {
    try {
      return await get("uniqueCookies");
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Decrements a number of unique cookies value by 1.
   */
  private static async updateUniqueCookies(): Promise<UniqueCookies> {
    try {
      const cookies: UniqueCookies = await this.getUniqueCookies();
      const updatedValue = cookies - 1
      await this.setUniqueCookies(updatedValue);

      return updatedValue;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Checks if the phrase if was already generated.
   */
  public static async getHistory(): Promise<PhrasesHistory> {
    return await get("history") || new Set();
  }

  /**
   * Updates history with new record.
   */
  public static async updateHistory(id: PhraseID): Promise<boolean>  {
    try {
      // update history set
      const history: PhrasesHistory = await get("history") || new Set();
      history.add(id.toString());
      await set("history", history);
      // update number of available cookies
      await this.updateUniqueCookies();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public static async resetHistory(): Promise<void> {
    await del("history");
  }

}