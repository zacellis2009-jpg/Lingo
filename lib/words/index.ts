import type { LangCode } from "../languages";
import { GERMAN_STARTER } from "./de";
import { SPANISH_STARTER } from "./es";
import { RUSSIAN_STARTER } from "./ru";
import type { Word } from "./types";

export type { Word } from "./types";

export const STARTER_WORDS: Record<LangCode, Word[]> = {
  es: SPANISH_STARTER,
  de: GERMAN_STARTER,
  ru: RUSSIAN_STARTER,
};

/** How many brand-new words to introduce per day. */
export const NEW_WORDS_PER_DAY = 7;
