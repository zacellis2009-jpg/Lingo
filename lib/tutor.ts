// Shapes shared between the API routes and the browser.

export interface Correction {
  has_mistake: boolean;
  corrected: string;
  explanation: string;
}

export interface Phrase {
  text: string;
  translit: string;
  english: string;
}

export interface TutorReply {
  say: string;
  say_translit: string;
  say_english: string;
  coach: string;
  correction: Correction;
  suggested_replies: Phrase[];
  new_words: { word: string; translation: string }[];
}

export interface ChatTurn {
  role: "user" | "assistant";
  /** User text, or the tutor's JSON reply serialized as a string. */
  content: string;
}

export interface ChatRequest {
  lang: string;
  scenario: string;
  messages: ChatTurn[];
  knownWords: string[];
  todaysWords: string[];
}

export interface LookupResult {
  word: string;
  translation: string;
  translit: string;
  part_of_speech: string;
  example: string;
  example_translation: string;
  note: string;
}

export interface GeneratedWord {
  word: string;
  translation: string;
  translit: string;
  example: string;
  example_translation: string;
  note: string;
}

export interface ApiError {
  error: string;
  code?: "missing_api_key" | "bad_request" | "upstream" | "refusal";
}

const str = { type: "string" } as const;

const phraseSchema = {
  type: "object",
  properties: { text: str, translit: str, english: str },
  required: ["text", "translit", "english"],
  additionalProperties: false,
} as const;

export const TUTOR_REPLY_SCHEMA = {
  type: "object",
  properties: {
    say: str,
    say_translit: str,
    say_english: str,
    coach: str,
    correction: {
      type: "object",
      properties: { has_mistake: { type: "boolean" }, corrected: str, explanation: str },
      required: ["has_mistake", "corrected", "explanation"],
      additionalProperties: false,
    },
    suggested_replies: { type: "array", items: phraseSchema },
    new_words: {
      type: "array",
      items: {
        type: "object",
        properties: { word: str, translation: str },
        required: ["word", "translation"],
        additionalProperties: false,
      },
    },
  },
  required: [
    "say",
    "say_translit",
    "say_english",
    "coach",
    "correction",
    "suggested_replies",
    "new_words",
  ],
  additionalProperties: false,
} as const;

export const LOOKUP_SCHEMA = {
  type: "object",
  properties: {
    word: str,
    translation: str,
    translit: str,
    part_of_speech: str,
    example: str,
    example_translation: str,
    note: str,
  },
  required: ["word", "translation", "translit", "part_of_speech", "example", "example_translation", "note"],
  additionalProperties: false,
} as const;

export const WORDS_SCHEMA = {
  type: "object",
  properties: {
    words: {
      type: "array",
      items: {
        type: "object",
        properties: {
          word: str,
          translation: str,
          translit: str,
          example: str,
          example_translation: str,
          note: str,
        },
        required: ["word", "translation", "translit", "example", "example_translation", "note"],
        additionalProperties: false,
      },
    },
  },
  required: ["words"],
  additionalProperties: false,
} as const;
