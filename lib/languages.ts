export type LangCode = "es" | "de" | "ru";

export interface Language {
  code: LangCode;
  name: string;
  nativeName: string;
  flag: string;
  /** BCP-47 locale for speech recognition and text-to-speech. */
  speechLocale: string;
  /** Whether the script is non-Latin and benefits from transliteration. */
  usesTransliteration: boolean;
}

export const LANGUAGES: Record<LangCode, Language> = {
  es: {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    speechLocale: "es-ES",
    usesTransliteration: false,
  },
  de: {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    speechLocale: "de-DE",
    usesTransliteration: false,
  },
  ru: {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    flag: "🇷🇺",
    speechLocale: "ru-RU",
    usesTransliteration: true,
  },
};

export const LANG_CODES = Object.keys(LANGUAGES) as LangCode[];

export function isLangCode(value: unknown): value is LangCode {
  return typeof value === "string" && value in LANGUAGES;
}
