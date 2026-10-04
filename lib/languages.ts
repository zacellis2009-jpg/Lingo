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

export interface Scenario {
  id: string;
  label: string;
  emoji: string;
  /** Instruction passed to the tutor describing the role-play. */
  prompt: string;
}

export const SCENARIOS: Scenario[] = [
  {
    id: "free",
    label: "Free chat",
    emoji: "💬",
    prompt: "Friendly free conversation about everyday topics the learner brings up.",
  },
  {
    id: "intro",
    label: "Introductions",
    emoji: "👋",
    prompt: "Meeting someone for the first time: names, where you're from, how you are.",
  },
  {
    id: "cafe",
    label: "Café",
    emoji: "☕",
    prompt: "You are a friendly waiter in a café. The learner is ordering drinks and food.",
  },
  {
    id: "directions",
    label: "Directions",
    emoji: "🗺️",
    prompt: "The learner is a tourist asking you, a local, for directions around the city.",
  },
  {
    id: "shopping",
    label: "Shopping",
    emoji: "🛍️",
    prompt: "You are a shop assistant. The learner is buying clothes or groceries and asking prices.",
  },
  {
    id: "hotel",
    label: "Hotel",
    emoji: "🏨",
    prompt: "You are a hotel receptionist. The learner is checking in and asking questions.",
  },
];
