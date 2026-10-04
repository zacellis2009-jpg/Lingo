"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SpeakButton from "@/components/SpeakButton";
import Translit from "@/components/Translit";
import { LANGUAGES } from "@/lib/languages";
import { speak } from "@/lib/speech";
import { isDue, previewLabel, schedule, type Grade } from "@/lib/srs";
import { getStateSnapshot, markActive, updateState, useAppState } from "@/lib/store";

const GRADES: { grade: Grade; label: string; className: string }[] = [
  { grade: "again", label: "Again", className: "bg-red-100 text-red-700" },
  { grade: "hard", label: "Hard", className: "bg-amber-100 text-amber-800" },
  { grade: "good", label: "Good", className: "bg-emerald-100 text-emerald-800" },
  { grade: "easy", label: "Easy", className: "bg-sky-100 text-sky-800" },
];

export default function ReviewPage() {
  const state = useAppState();
  const lang = state.lang;
  const language = LANGUAGES[lang];
  const l = state.langs[lang];

  const [queue, setQueue] = useState<string[] | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [doneCount, setDoneCount] = useState(0);

  // Build the session queue when the page opens or the language changes.
  useEffect(() => {
    const cards = Object.values(getStateSnapshot().langs[lang].cards);
    setQueue(cards.filter((c) => isDue(c)).sort((a, b) => a.due.localeCompare(b.due)).map((c) => c.word.id));
    setRevealed(false);
    setDoneCount(0);
  }, [lang]);

  const currentId = queue?.[0];
  const card = currentId ? l.cards[currentId] : undefined;

  // Say the word when a recognition card appears.
  useEffect(() => {
    if (card && !reverse && state.autoSpeak) speak(card.word.word, language.speechLocale, state.speechRate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId, reverse]);

  function grade(g: Grade) {
    if (!card || !queue) return;
    updateState((s) => {
      s.langs[lang].cards[card.word.id] = schedule(card, g);
      markActive(s);
    });
    const rest = queue.slice(1);
    // Missed cards come back at the end of this session.
    setQueue(g === "again" ? [...rest, card.word.id] : rest);
    if (g !== "again") setDoneCount((n) => n + 1);
    setRevealed(false);
  }

  if (queue === null) return null;

  if (!card) {
    const total = Object.keys(l.cards).length;
    return (
      <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-sm">
        <div className="text-5xl">{total === 0 ? "📭" : "🎉"}</div>
        <h1 className="mt-3 text-xl font-bold">{total === 0 ? "Nothing to review yet" : "All caught up!"}</h1>
        <p className="mt-1 text-slate-500">
          {total === 0
            ? `Learn some ${language.name} words first, then come back here.`
            : doneCount > 0
              ? `You reviewed ${doneCount} word${doneCount === 1 ? "" : "s"}. Come back tomorrow for more.`
              : "No words are due right now. Come back tomorrow."}
        </p>
        <div className="mt-5 flex justify-center gap-3">
          <Link href="/words" className="rounded-xl bg-brand-600 px-5 py-2.5 font-semibold text-white">
            Learn words
          </Link>
          <Link href="/chat" className="rounded-xl border border-slate-300 px-5 py-2.5 font-semibold">
            Practice chat
          </Link>
        </div>
      </div>
    );
  }

  const w = card.word;

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
        <span>
          {queue.length} left · {doneCount} done
        </span>
        <label className="flex items-center gap-1.5">
          <input type="checkbox" checked={reverse} onChange={(e) => setReverse(e.target.checked)} className="accent-brand-600" />
          English first
        </label>
      </div>

      <div className="rounded-3xl bg-white p-6 text-center shadow-md">
        {reverse ? (
          <>
            <div className="text-xs uppercase tracking-wide text-slate-400">How do you say…</div>
            <div className="mt-2 text-2xl font-bold">{w.translation}</div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center gap-3">
              <div className="text-3xl font-bold">{w.word}</div>
              <SpeakButton text={w.word} lang={lang} />
            </div>
            <Translit lang={lang} text={w.word} override={w.translit} className="mt-1" />
          </>
        )}

        {revealed ? (
          <div className="mt-5 border-t border-slate-100 pt-5">
            {reverse ? (
              <>
                <div className="flex items-center justify-center gap-3">
                  <div className="text-3xl font-bold">{w.word}</div>
                  <SpeakButton text={w.word} lang={lang} />
                </div>
                <Translit lang={lang} text={w.word} override={w.translit} className="mt-1" />
              </>
            ) : (
              <div className="text-xl text-slate-700">{w.translation}</div>
            )}
            <div className="mt-4 rounded-xl bg-slate-50 p-3 text-left text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium">{w.example}</span>
                <SpeakButton text={w.example} lang={lang} size="sm" />
              </div>
              <Translit lang={lang} text={w.example} className="text-xs" />
              <div className="text-slate-500">{w.exampleTranslation}</div>
            </div>
            {w.note && <div className="mt-2 text-left text-sm text-slate-600">💡 {w.note}</div>}
          </div>
        ) : (
          <button
            onClick={() => {
              setRevealed(true);
              if (reverse) speak(w.word, language.speechLocale, state.speechRate);
            }}
            className="mt-8 w-full rounded-xl bg-brand-600 py-3 font-semibold text-white"
          >
            Show answer
          </button>
        )}
      </div>

      {revealed && (
        <div className="mt-4 grid grid-cols-4 gap-2">
          {GRADES.map((g) => (
            <button key={g.grade} onClick={() => grade(g.grade)} className={`rounded-xl py-2.5 font-semibold ${g.className}`}>
              <div>{g.label}</div>
              <div className="text-[11px] font-normal opacity-80">{previewLabel(card, g.grade)}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
