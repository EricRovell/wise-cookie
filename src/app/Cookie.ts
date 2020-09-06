import db from "./DB";
import PhraseFactory from "./PhraseFactory";
import Random from "./Random";

import map from "@public/data/map.js";

import type { CookieIndex, PhraseID, Phrase, PhrasesCurrent, PhraseWithTimestamp } from "#types";

/**
 * Provides methods to work with cookies.
 */
export default class Cookie {
  private static readonly fragments: number[] = map;
  static COOKIE_TIME: number = 8 * 60 * 60 * 1000 // ms

  /**
   * Generates a new phrase by eating a cookie if it's "ready".
   * Otherwise, returns the previously generated phrase for this cookie.
   */
  public static async eatCookie(index: CookieIndex): Promise<PhraseWithTimestamp> {
    const status = await this.getCookieStatus(index);
    if (status) {
      // cookie is ready: generate new phrase -> set timestamp with phrase
      const id: PhraseID = await this.getUniqueRandomID();
      const phrase: Phrase = await PhraseFactory.fromID(id);

      return await db.setCurrentPhrase(index, phrase);
    }
  }

  /**
   * Generates unique ID that guaranteed to be not generated before.
   * ! The less the choices are left, the less performant it is.
   */
  private static async getUniqueRandomID(): Promise<PhraseID> {
    let fragment: number;      // number of db fragment
    let fragmentIndex: number; // index of the db fragment
    let position: number;      // position of the phrase inside the fragment

    let id: PhraseID;

    const history = await db.getHistory();

    // generate parts of ID while it is non-unique
    do {
      [ fragment, fragmentIndex ] = Random.randArrElement(Cookie.fragments, true);
      position = Random.randInt(fragmentIndex);

      id = [ fragment, position ];
    } while (history.has(id.toString()));

    await db.updateHistory(id);

    return id;
  }

  /**
   * Get readiness status of the specific cookie.
   */
  public static async getCookieStatus(index: CookieIndex): Promise<boolean> {
    try {
      const currentPhrases: PhrasesCurrent = await db.getCurrentPhrases();
      const cookiePhrase = currentPhrases.get(index);

      // no records for this index -> ready
      if (!cookiePhrase) return true;

      // time limit is passed -> ready
      return Date.now() - cookiePhrase.timestamp > Cookie.COOKIE_TIME;

    } catch (error) {
      console.error(error.message);
      return false;
    }
  }

  /**
   * Returns how many time is left for specific cookie to be ready to consumed.
   */
  public static async getCookieTime(index: CookieIndex) {
    const current: PhrasesCurrent = await db.getCurrentPhrases();
    const { timestamp } = current.get(index);

    const timeElapsed = Date.now() - timestamp;

    return (timeElapsed < Cookie.COOKIE_TIME)
      ? Cookie.COOKIE_TIME - timeElapsed
      : 0;
  }

}

export type CookieClassType = Cookie;
