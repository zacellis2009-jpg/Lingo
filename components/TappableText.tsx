"use client";

// Renders target-language text where every word can be tapped to look it up.

const WORD_RE = /[\p{L}\p{M}'’-]+/gu;

export default function TappableText({
  text,
  onWord,
  className = "",
}: {
  text: string;
  onWord: (word: string, sentence: string) => void;
  className?: string;
}) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(WORD_RE)) {
    const start = match.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
    const word = match[0];
    parts.push(
      <button
        key={start}
        type="button"
        onClick={() => onWord(word, text)}
        className="rounded decoration-brand-500/40 decoration-dotted underline-offset-4 hover:bg-brand-50 hover:underline"
      >
        {word}
      </button>,
    );
    last = start + word.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <span className={className}>{parts}</span>;
}
