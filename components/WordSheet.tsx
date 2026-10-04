"use client";

import { useEffect, useState } from "react";
import { postJson } from "@/lib/api";
import type { LangCode } from "@/lib/languages";
import { addCard, hasWord, makeId, markActive, updateState, useAppState } from "@/lib/store";
import type { LookupResult } from "@/lib/tutor";
import SpeakButton from "./SpeakButton";
import Translit from "./Translit";

/** Bottom sheet that explains a tapped word and lets you save it. */
export default function WordSheet({
  lang,
  word,
  sentence,
  onClose,
}: {
  lang: LangCode;
  word: string;
  sentence: string;
  onClose: () => void;
}) {
  const state = useAppState();
  const [result, setResult] = useState<LookupResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    postJson<LookupResult>("/api/lookup", { lang, word, context: sentence })
      .then((r) => !cancelled && setResult(r))
      .catch((e: Error) => !cancelled && setError(e.message));
    return () => {
      cancelled = true;
    };
  }, [lang, word, sentence]);

  const saved = result ? hasWord(state.langs[lang], result.word) : false;

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-900/40 sm:items-center" onClick={onClose}>
      <div
        className="pb-safe w-full max-w-md rounded-t-2xl bg-white p-5 shadow-xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {!result && !error && (
          <div className="py-6 text-center text-slate-500">
            Looking up <b>{word}</b>…
          </div>
        )}
        {error && <div className="py-4 text-center text-red-600">{error}</div>}
        {result && (
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-2xl font-bold">{result.word}</div>
                <Translit lang={lang} text={result.word} override={result.translit} />
                <div className="mt-1 text-lg text-slate-700">{result.translation}</div>
                <div className="text-xs uppercase tracking-wide text-slate-400">{result.part_of_speech}</div>
              </div>
              <SpeakButton text={result.word} lang={lang} size="lg" />
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <div className="flex items-center gap-2">
                <span className="font-medium">{result.example}</span>
                <SpeakButton text={result.example} lang={lang} size="sm" />
              </div>
              <Translit lang={lang} text={result.example} />
              <div className="text-sm text-slate-500">{result.example_translation}</div>
            </div>
            {result.note && <div className="text-sm text-slate-600">💡 {result.note}</div>}
            <button
              disabled={saved}
              onClick={() => {
                updateState((s) => {
                  addCard(s, lang, {
                    id: makeId(lang),
                    word: result.word,
                    translation: result.translation,
                    example: result.example,
                    exampleTranslation: result.example_translation,
                    translit: result.translit || undefined,
                    note: result.note || undefined,
                    source: "chat",
                  });
                  markActive(s);
                });
              }}
              className="w-full rounded-xl bg-brand-600 py-3 font-semibold text-white disabled:bg-emerald-100 disabled:text-emerald-700"
            >
              {saved ? "✓ In your words" : "＋ Add to my words"}
            </button>
          </div>
        )}
        <button onClick={onClose} className="mt-3 w-full py-2 text-sm text-slate-500">
          Close
        </button>
      </div>
    </div>
  );
}
