// Simple, beginner-friendly Russian → Latin transliteration.
// Stress marks (U+0301) are kept so "приве́т" becomes "privét".

const STRESS = "́";
const VOWELS = "аеёиоуыэюяАЕЁИОУЫЭЮЯ";

const MAP: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh",
  з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
  п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts",
  ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "'", э: "e", ю: "yu",
  я: "ya",
};

function isCyrillicLetter(ch: string | undefined): boolean {
  return !!ch && /[Ѐ-ӿ]/.test(ch);
}

export function transliterate(text: string): string {
  let out = "";
  const chars = Array.from(text);
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    if (ch === STRESS) {
      out += STRESS;
      continue;
    }
    const lower = ch.toLowerCase();
    let latin = MAP[lower];
    if (latin === undefined) {
      out += ch;
      continue;
    }
    // "е" sounds like "ye" at the start of a word or after a vowel / soft or hard sign.
    if (lower === "е") {
      let j = i - 1;
      while (j >= 0 && chars[j] === STRESS) j--;
      const prev = chars[j];
      if (!isCyrillicLetter(prev) || VOWELS.includes(prev) || prev === "ь" || prev === "ъ") {
        latin = "ye";
      }
    }
    if (ch !== lower && latin.length > 0) {
      latin = latin[0].toUpperCase() + latin.slice(1);
    }
    out += latin;
  }
  return out.normalize("NFC");
}

/** Remove stress marks, e.g. before handing text to speech synthesis or comparing answers. */
export function stripStress(text: string): string {
  return text.replace(/́/g, "");
}
