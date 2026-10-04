"use client";

// All learner progress lives in localStorage on this device for now.
// Everything goes through `useAppState` / `updateState`, so swapping in a
// synced database later only touches this file.

import { useSyncExternalStore } from "react";
import { LANG_CODES, type LangCode } from "./languages";
import { newCard, today, type Card } from "./srs";
import { NEW_WORDS_PER_DAY, STARTER_WORDS, type Word } from "./words";

const STORAGE_KEY = "lingo-buddy:v1";
const MAX_MISTAKES = 200;

export interface Mistake {
  at: string;
  original: string;
  corrected: string;
  explanation: string;
}

export interface LangState {
  cards: Record<string, Card>;
  /** Words added outside the starter list, keyed by id. */
  extraWords: Record<string, Word>;
  daily: { date: string; ids: string[] };
  /** Phrases the learner struggled with in conversations. */
  mistakes: Mistake[];
  /** How many times each conversation was finished, by dialogue id. */
  dialoguesDone: Record<string, number>;
  /** Learner turns answered in conversations. */
  linesPracticed: number;
}

export interface AppState {
  version: 1;
  lang: LangCode;
  showTranslit: boolean;
  showTranslation: boolean;
  autoSpeak: boolean;
  speechRate: number;
  /** Easy shows the phrases to say; challenge only gives the English. */
  practiceMode: "easy" | "challenge";
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
    dialoguesDone: {},
    linesPracticed: 0,
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
    practiceMode: "easy",
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
      // Drop fields from older versions (e.g. the AI chat history).
      const { chat: _chat, scenario: _scenario, messagesSent: _sent, ...rest } = (saved.langs?.[code] ??
        {}) as Partial<LangState> & { chat?: unknown; scenario?: unknown; messagesSent?: unknown };
      langs[code] = { ...emptyLang(), ...rest };
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

/** Add another batch of new words to today's list (for fast learners). */
export function addMoreDailyWords(draft: AppState, lang: LangCode): number {
  ensureDailyWords(draft, lang);
  const l = draft.langs[lang];
  const seen = new Set([...Object.keys(l.cards), ...l.daily.ids]);
  const fresh = STARTER_WORDS[lang].filter((w) => !seen.has(w.id)).slice(0, NEW_WORDS_PER_DAY);
  l.daily.ids.push(...fresh.map((w) => w.id));
  return fresh.length;
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

// ---------- moving progress between devices ----------

const CODE_PREFIX = "LINGO1:";

function toBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

function fromBase64(b64: string): string {
  const binary = atob(b64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

/** All progress as a text code that can be pasted on another device. */
export function exportProgress(): string {
  return CODE_PREFIX + toBase64(JSON.stringify(getSnapshot()));
}

/** Parse a progress code (or the raw JSON from a progress file). Throws if it isn't valid. */
export function parseProgress(text: string): AppState {
  const trimmed = text.trim();
  const json = trimmed.startsWith(CODE_PREFIX) ? fromBase64(trimmed.slice(CODE_PREFIX.length).replace(/\s/g, "")) : trimmed;
  const data = JSON.parse(json) as Partial<AppState>;
  if (data.version !== 1 || typeof data.langs !== "object") throw new Error("Not a Lingo progress code");
  return data as AppState;
}

/**
 * Combine progress from another device into this one. Nothing is lost:
 * words from both are kept (the more practiced copy wins), streak days are joined,
 * and counters keep the higher number. Settings on this device stay as they are.
 */
export function mergeProgress(incoming: AppState): void {
  updateState((s) => {
    s.activityDays = [...new Set([...s.activityDays, ...(incoming.activityDays ?? [])])].sort();
    for (const code of LANG_CODES) {
      const mine = s.langs[code];
      const theirs = { ...emptyLang(), ...(incoming.langs?.[code] ?? {}) };
      for (const [id, card] of Object.entries(theirs.cards)) {
        const local = mine.cards[id];
        if (!local || card.reps > local.reps || (card.reps === local.reps && card.due > local.due)) {
          mine.cards[id] = card;
        }
      }
      mine.extraWords = { ...theirs.extraWords, ...mine.extraWords };
      const seen = new Set(mine.mistakes.map((m) => m.at));
      mine.mistakes = [...mine.mistakes, ...theirs.mistakes.filter((m) => !seen.has(m.at))].sort((a, b) =>
        a.at.localeCompare(b.at),
      );
      for (const [id, n] of Object.entries(theirs.dialoguesDone)) {
        mine.dialoguesDone[id] = Math.max(mine.dialoguesDone[id] ?? 0, n);
      }
      mine.linesPracticed = Math.max(mine.linesPracticed, theirs.linesPracticed);
    }
  });
}
