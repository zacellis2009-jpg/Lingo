// A small SM-2 style spaced-repetition scheduler.
import type { Word } from "./words";

export type Grade = "again" | "hard" | "good" | "easy";

export interface Card {
  word: Word;
  /** Local date (YYYY-MM-DD) when the card is next due. */
  due: string;
  /** Current interval in days. */
  interval: number;
  ease: number;
  reps: number;
  lapses: number;
  addedAt: string;
}

/** Days of interval after which we count a word as "known". */
export const KNOWN_INTERVAL = 7;

export function today(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(day: string, days: number): string {
  const [y, m, d] = day.split("-").map(Number);
  return today(new Date(y, m - 1, d + days));
}

export function newCard(word: Word): Card {
  const t = today();
  return { word, due: t, interval: 0, ease: 2.5, reps: 0, lapses: 0, addedAt: t };
}

export function isDue(card: Card, day = today()): boolean {
  return card.due <= day;
}

export function isKnown(card: Card): boolean {
  return card.interval >= KNOWN_INTERVAL;
}

export function schedule(card: Card, grade: Grade): Card {
  let { interval, ease, reps, lapses } = card;
  switch (grade) {
    case "again":
      interval = 0;
      reps = 0;
      lapses += 1;
      ease = Math.max(1.3, ease - 0.2);
      break;
    case "hard":
      interval = Math.max(1, Math.round(interval * 1.2));
      ease = Math.max(1.3, ease - 0.15);
      reps += 1;
      break;
    case "good":
      interval = reps === 0 ? 2 : reps === 1 ? 5 : Math.round(interval * ease);
      reps += 1;
      break;
    case "easy":
      interval = reps === 0 ? 4 : Math.round(Math.max(interval, 1) * ease * 1.3);
      ease += 0.15;
      reps += 1;
      break;
  }
  return { ...card, interval, ease, reps, lapses, due: addDays(today(), interval) };
}

/** Human-friendly label for when a grade would schedule the card next. */
export function previewLabel(card: Card, grade: Grade): string {
  const days = schedule(card, grade).interval;
  if (days === 0) return "now";
  if (days === 1) return "1 day";
  if (days < 30) return `${days} days`;
  const months = Math.round(days / 30);
  return months === 1 ? "1 month" : `${months} months`;
}
