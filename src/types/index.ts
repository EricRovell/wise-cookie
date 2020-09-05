// Classes
export type { UserClassType } from "@app/User";
export type { CookieClassType } from "@app/Cookie";
export type { PhraseFactoryClassType } from "@app/PhraseFactory";

// Phrases
export * from "./Phrase";

// Cookie
export * from "./Cookie";

// Preferences
export * from "./Preferences";

// Routing
export * from "./Routing";

// Notification
export * from "./Notification";

/* Modal */

export interface Modal {
  show: boolean;
  title?: string;
  contents?: any;
  props?: any;
}
