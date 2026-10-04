"use client";

// All learner progress lives in localStorage on this device for now.
// Everything goes through `useAppState` / `updateState`, so swapping in a
// synced database later only touches this file.

import { useSyncExternalStore } from "react";
import { LANG_CODES, type LangCode } from "./languages";
import { newCard, today, type Card } from "./srs";
import type { Correction, TutorReply } from "./tutor";
import { NEW_WORDS_PER_DAY, STARTER_WORDS, type Word } from "./words";

const STORAGE_KEY = "lingo-buddy:v1";
const MAX_CHAT_MESSAGES = 120;
const MAX_MISTAKES = 200;

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  /** What the learner typed or said. */
  text?: string;
  spoken?: boolean;
  /** Correction of this user message, filled in when the tutor replies. */
  correction?: Correction;
  reply?: TutorReply;
}

export interface Mistake {
  at: string;
  original: string;
  corrected: string;
  explanation: string;
}

export interface LangState {
  cards: Record<string, Card>;
  /** Words learned from chat or generated, keyed by id. */
  extraWords: Record<string, Word>;
  daily: { date: string; ids: string[] };
  mistakes: Mistake[];
  chat: ChatMessage[];
  scenario: string;
  messagesSent: number;
}

export interface AppState {
  version: 1;
  lang: LangCode;
  showTranslit: boolean;
  showTranslation: boolean;
  autoSpeak: boolean;
  speechRate: number;
  /** Days (YYYY-MM-DD) with any practice, for the streak. */
  activityDays: string[];
  langs: Record<LangCode, LangState>;
}

function emptyLang(): LangState {
  return {
    cards: {},
    extraWords: {},
    daily: { date: "", ids: [] },
    mistakes: [],
    chat: [],
    scenario: "free",
    messagesSent: 0,
  };
}

function defaultState(): AppState {
  return {
    version: 1,
    lang: "es",
    showTranslit: true,
    showTranslation: true,
    autoSpeak: true,
    speechRate: 0.85,
    activityDays: [],
    langs: Object.fromEntries(LANG_CODES.map((c) => [c, emptyLang()])) as Record<LangCode, LangState>,
  };
}

const SERVER_SNAPSHOT = defaultState();
let cache: AppState | null = null;
const listeners = new Set<() => void>();

function load(): AppState {
  const base = defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const saved = JSON.parse(raw) as Partial<AppState>;
    const langs = { ...base.langs };
    for (const code of LANG_CODES) {
      langs[code] = { ...emptyLang(), ...(saved.langs?.[code] ?? {}) };
    }
    return { ...base, ...saved, langs };
  } catch {
    return base;
  }
}

function getSnapshot(): AppState {
  cache ??= load();
  return cache;
}

/** Latest state, for reading inside event handlers right after an update. */
export const getStateSnapshot = getSnapshot;

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = load();
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Apply a mutation to a copy of the state, save it and notify subscribers. */
export function updateState(mutate: (draft: AppState) => void): void {
  const draft = structuredClone(getSnapshot());
  mutate(draft);
  for (const code of LANG_CODES) {
    const l = draft.langs[code];
    if (l.chat.length > MAX_CHAT_MESSAGES) l.chat = l.chat.slice(-MAX_CHAT_MESSAGES);
    if (l.mistakes.length > MAX_MISTAKES) l.mistakes = l.mistakes.slice(-MAX_MISTAKES);
  }
  cache = draft;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Storage full or blocked: keep working in memory.
  }
  listeners.forEach((l) => l());
}

export function useAppState(): AppState {
  return useSyncExternalStore(subscribe, getSnapshot, () => SERVER_SNAPSHOT);
}

// ---------- helpers ----------

export function markActive(draft: AppState): void {
  const t = today();
  if (!draft.activityDays.includes(t)) draft.activityDays.push(t);
}

export function streak(days: string[]): number {
  const set = new Set(days);
  let count = 0;
  const d = new Date();
  // A streak isn't broken until the end of today.
  if (!set.has(today(d))) d.setDate(d.getDate() - 1);
  while (set.has(today(d))) {
    count++;
    d.setDate(d.getDate() - 1);
  }
  return count;
}

export function findWord(lang: LangCode, state: LangState, id: string): Word | undefined {
  return state.cards[id]?.word ?? state.extraWords[id] ?? STARTER_WORDS[lang].find((w) => w.id === id);
}

/** Make sure today's batch of new words has been picked. */
export function ensureDailyWords(draft: AppState, lang: LangCode): void {
  const l = draft.langs[lang];
  const t = today();
  if (l.daily.date === t) return;
  const seen = new Set([...Object.keys(l.cards), ...l.daily.ids]);
  const fresh = STARTER_WORDS[lang].filter((w) => !seen.has(w.id)).slice(0, NEW_WORDS_PER_DAY);
  l.daily = { date: t, ids: fresh.map((w) => w.id) };
}

export function addCard(draft: AppState, lang: LangCode, word: Word): void {
  const l = draft.langs[lang];
  if (l.cards[word.id]) return;
  if (!word.id.includes("-starter-")) l.extraWords[word.id] = word;
  l.cards[word.id] = newCard(word);
}

/** Normalized form used to check if a word is already in the deck. */
export function wordKey(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/^(el|la|los|las|der|die|das)\s+/, "")
    .replace(/[¿?¡!.,…]/g, "")
    .trim();
}

export function hasWord(state: LangState, text: string): boolean {
  const key = wordKey(text);
  return Object.values(state.cards).some((c) => wordKey(c.word.word) === key);
}

export function makeId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
