import type { CookieIndex } from "./Cookie";

// Phrase parts
export type PhraseID = [ number, number ];
export type PhraseIDString = string; // PhraseID as a string value [ 1, 2 ] -> "1,2" or "1/2"
export type PhraseBody = string;
export type PhraseAuthor = string;

export interface Phrase {
  readonly id: PhraseID;
  readonly body: PhraseBody;
  readonly author: PhraseAuthor;
}

export interface PhraseWithTimestamp extends Phrase {
  timestamp: number;
}

export type PhrasesHistory = Set<PhraseIDString>;

export type TimestampMap = Map<CookieIndex,PhraseWithTimestamp>;

export type PhrasesMap = Map<number,Phrase>;

export type PhrasesFavourite = Map<PhraseIDString,Phrase>;

export type PhrasesCurrent = Map<CookieIndex, PhraseWithTimestamp>;
