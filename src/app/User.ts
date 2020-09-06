import db from "./DB";
import map from "@public/data/map";

import type { Theme, Phrase, PhraseID, PhrasesFavourite, PhraseIDString, UniqueCookies, PhraseWithTimestamp } from "#types";

/**
 * Provides access to user preferences and saved data (locally)
 */
export default class User {

  /* Status */

  public static async resolveUserStatus(): Promise<boolean> {
    // get guest status
    const userStatus = await db.getUserStatus();

    if (!userStatus) {
      // it is the guest, mark for the future
      await db.setUserStatus(true);
      // init unique cookies value
      await this.initUniqueCookies();
    }

    return userStatus;
  }

  /* Themes */

  /**
   * Retrieves the prefered by the user theme.
   */
  public static async getPreferredTheme(): Promise<Theme> {
    const theme = await db.getTheme();
    return theme || "none";
  }

  /**
   * Switches currently preffered theme and returns the new value.
   */
  public static async changeTheme(theme: Theme): Promise<void> {
    await db.setTheme(theme);
  }

  /* Current phrases */

  /**
   * Retrieves a list of current phrases the user has.
   */
  public static async getCurrentPhrases(): Promise<PhraseWithTimestamp[]> {
    const currentPhrases = await db.getCurrentPhrases();
    return [ ...currentPhrases.values() ];
  }

  /* Favourite Phrases */

  /**
   * Retrieves the list of favourite phrases
   */
  public static async getFavouritePhrasesList(): Promise<Phrase[]> {
    const favourites = await db.getFavouritePhrases();
    return [ ...favourites.values() ];
  }

  /**
   * Gets the "favourite" status of phrase
   */
  public static async getPhraseFavouriteStatus(id: PhraseID): Promise<boolean> {
    try {
      let favourites: PhrasesFavourite = await db.getFavouritePhrases();
      let idString: PhraseIDString = id.toString();
      return favourites.has(idString);
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * If phrase is not "favourite" -> marks as favourite, otherwise -> removes the status of favourite.
   */
  public static async markFavouritePhrase(phrase: Phrase): Promise<"added" | "removed" | "error"> {
    try {
      let favourites: PhrasesFavourite = await db.getFavouritePhrases();
      let idString: PhraseIDString = phrase.id.toString();

      // if deletion is successful -> update and finish
      // deletion is successful only when it was here and was deleted
      if (favourites.delete(idString)) {
        await db.setFavouritePhrases(favourites);
        return "removed";
      }

      // not marked as favourite:
      //  set id as key, rest as value
      //  construct new Map from entries to set the order (LIFO)
      //  slice to limit the number of records
      await db.favouritePhrasesShift(phrase);
      return "added";

    } catch (error) {
      console.log(error.message);
      return "error";
    }
  }

  /* Progress */

  /**
   * Gets the number of unique cookies are still present for the user.
   */
  public static async getUniqueCookies() {
    return await db.getUniqueCookies();
  }

  /**
   * Sets number of cookies available for this user.
   * Sum of fragments sizes is the number of available cookies to generate.
   */
  private static async initUniqueCookies() {
    try {
      const cookies: UniqueCookies = map.reduce((acc: number, val: number) => acc + val, 0)
      await db.setUniqueCookies(cookies);
    } catch (error) {
      console.error(error.message);
    }
  }

}

export type UserClassType = User;