import map from "@public/data/map";
import Random from "./Random";

import type { Phrase, PhraseID } from "#types";

/**
 * Phrases constructor class.
 */
export default class PhraseFactory {
  
  /**
   * Constructs a phrase object from a given ID.
   * If ID is not valid or request if unsuccssesfull, returns false.
   * @static
   */
  public static async fromID(id: PhraseID): Promise<Phrase>  {
    if (!this.validateID(id)) return;

    const [ fragment, position ] = id;

    const response = await fetch(`data/${fragment}.json`);

    if (!response.ok) {
      console.error(response.status);
      return;
    }

    const { phrases } = (await response.json());

    return this.asObject(id, phrases[position]);
  }

  /**
   * Constructs a random phrase object. Not guaranteed to be unique.
   */
  public static async random(): Promise<Phrase|boolean> {
    const [ fragment, fragmentIndex ] = Random.randArrElement(map);
    const position = Random.randInt(fragmentIndex);

    return await this.fromID([ fragment, position ]);
  }

  /**
   * Validates the given phrase id.
   * 
   * @private
   */
  public static validateID(id: PhraseID): boolean {
    const [ fragment, position ] = id;
    // fragment should be present and the position should be in number of containing phrases range
    return map[fragment] && position <= map[fragment] && position >= 0;
  }

  /**
   * Returns Phrase object from id.
   * 
   * @static
   */
  private static asObject( id, { body, author }): Phrase {
    return {
      id,
      body,
      author
    };
  }
}

export type PhraseFactoryClassType = PhraseFactory;
