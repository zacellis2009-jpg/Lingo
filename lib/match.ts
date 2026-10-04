// Forgiving comparison between what the learner said/typed and an expected phrase.
// Ignores case, punctuation, accents and stress marks, tolerates small typos and
// speech-recognition slips, and treats "{x}" in the expected phrase as a
// placeholder for any word(s), like the learner's name or city.

import { transliterate } from "./translit";

export const PLACEHOLDER = "{x}";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ß/g, "ss")
    .replace(/[^\p{L}\p{N}{}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(text: string): string[] {
  return normalize(text).split(" ").filter(Boolean);
}

function editDistance(a: string, b: string): number {
  const dp = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j];
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return dp[b.length];
}

function similar(a: string, b: string): boolean {
  if (a === b) return true;
  const longest = Math.max(a.length, b.length);
  // Short words must match exactly; longer ones may have a typo or two.
  const allowed = longest <= 3 ? 0 : longest <= 6 ? 1 : 2;
  return editDistance(a, b) <= allowed;
}

/** Fraction (0–1) of the expected words found, in order, in the attempt. */
function score(attempt: string[], expected: string[]): number {
  const words = expected.filter((w) => w !== PLACEHOLDER);
  if (words.length === 0) return attempt.length > 0 ? 1 : 0;
  let found = 0;
  let pos = 0;
  for (const w of words) {
    const idx = attempt.findIndex((a, i) => i >= pos && similar(a, w));
    if (idx >= 0) {
      found++;
      pos = idx + 1;
    }
  }
  let s = found / words.length;
  // The placeholder needs at least one extra word (e.g. the learner's name).
  if (expected.includes(PLACEHOLDER) && attempt.length <= found) s = Math.min(s, 0.6);
  // Penalize lots of extra words when there's no placeholder to absorb them.
  if (!expected.includes(PLACEHOLDER) && attempt.length > words.length + 2) s *= 0.8;
  return s;
}

export type MatchResult = { verdict: "correct" | "close" | "wrong"; best: string };

export function checkAnswer(attempt: string, options: string[], isRussian = false): MatchResult {
  const attemptTokens = tokens(attempt);
  const latinOnly = isRussian && !/[Ѐ-ӿ]/.test(attempt);
  let bestScore = -1;
  let bestGap = Infinity;
  let best = options[0];
  for (const option of options) {
    // Let Russian learners type in Latin letters ("menya zovut Zac").
    // transliterate() leaves Latin text such as "{x}" untouched.
    const expected = tokens(latinOnly ? transliterate(option) : option);
    const s = score(attemptTokens, expected);
    // On a tie, prefer the option closest in length to what was said.
    const gap = Math.abs(expected.length - attemptTokens.length);
    if (s > bestScore || (s === bestScore && gap < bestGap)) {
      bestScore = s;
      bestGap = gap;
      best = option;
    }
  }
  const verdict = bestScore >= 0.85 ? "correct" : bestScore >= 0.5 ? "close" : "wrong";
  return { verdict, best };
}

/** Show a placeholder phrase in a friendly way: "Me llamo {x}." -> "Me llamo …" */
export function displayPhrase(text: string): string {
  return text.replace(/\{x\}/g, "…");
}
