export interface Word {
  id: string;
  /** The word or phrase in the target language (Russian includes stress marks). */
  word: string;
  translation: string;
  example: string;
  exampleTranslation: string;
  /** Optional transliteration override (Russian); otherwise generated automatically. */
  translit?: string;
  /** Short grammar or usage tip. */
  note?: string;
  /** Where this word came from. */
  source?: "starter" | "custom";
}
