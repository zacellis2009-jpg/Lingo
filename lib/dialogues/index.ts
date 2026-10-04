import type { LangCode } from "../languages";
import { GERMAN_DIALOGUES } from "./de";
import { SPANISH_DIALOGUES } from "./es";
import { RUSSIAN_DIALOGUES } from "./ru";
import type { Dialogue } from "./types";

export type { Dialogue, DialogueLine, Reply } from "./types";

export const DIALOGUES: Record<LangCode, Dialogue[]> = {
  es: SPANISH_DIALOGUES,
  de: GERMAN_DIALOGUES,
  ru: RUSSIAN_DIALOGUES,
};
