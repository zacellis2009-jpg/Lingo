"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SpeakButton from "@/components/SpeakButton";
import Translit from "@/components/Translit";
import { LANGUAGES, type LangCode } from "@/lib/languages";
import { isDue, isKnown } from "@/lib/srs";
import {
  addCard,
  addMoreDailyWords,
  ensureDailyWords,
  findWord,
  markActive,
  updateState,
  useAppState,
  wordKey,
} from "@/lib/store";
import { NEW_WORDS_PER_DAY, STARTER_WORDS, type Word } from "@/lib/words";

export default function WordsPage() {
  const state = useAppState();
  const lang = state.lang;
  const language = LANGUAGES[lang];
  const l = state.langs[lang];
  const [filter, setFilter] = useState("");

  useEffect(() => {
    updateState((s) => ensureDailyWords(s, lang));
  }, [lang]);

  const todays = l.daily.ids.map((id) => findWord(lang, l, id)).filter((w): w is Word => !!w);
  const pendingToday = todays.filter((w) => !l.cards[w.id]);
  const cards = useMemo(
    () =>
      Object.values(l.cards)
        .filter((c) => !filter || wordKey(c.word.word + " " + c.word.translation).includes(wordKey(filter)))
        .sort((a, b) => b.addedAt.localeCompare(a.addedAt)),
    [l.cards, filter],
  );
  const starterLeft = STARTER_WORDS[lang].filter((w) => !l.cards[w.id] && !l.daily.ids.includes(w.id)).length;

  return (
    <div className="space-y-6">
      <section>
        <div className="mb-3 flex items-end justify-between">
          <div>
            <h1 className="text-xl font-bold">Today&apos;s words {language.flag}</h1>
            <p className="text-sm text-slate-500">Listen, read the example, then tap “Got it” to start reviewing it.</p>
          </div>
          {pendingToday.length > 1 && (
            <button
              onClick={() =>
                updateState((s) => {
                  pendingToday.forEach((w) => addCard(s, lang, w));
                  markActive(s);
                })
              }
              className="shrink-0 text-sm font-medium text-brand-600 hover:underline"
            >
              Got all ✓
            </button>
          )}
        </div>

        {todays.length === 0 && (
          <div className="rounded-2xl bg-white p-5 text-center text-slate-500 shadow-sm">
            {starterLeft === 0
              ? `You've learned all ${STARTER_WORDS[lang].length} words for now. Keep reviewing them!`
              : "No new words picked for today yet."}
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {todays.map((w) => (
            <WordCard key={w.id} lang={lang} word={w} learned={!!l.cards[w.id]} />
          ))}
        </div>

        {todays.length > 0 && pendingToday.length === 0 && (
          <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-center text-emerald-800">
            Nice! Now <Link href="/practice" className="font-semibold underline">use them in a conversation</Link> or{" "}
            <Link href="/review" className="font-semibold underline">review them</Link>.
          </div>
        )}
      </section>

      {pendingToday.length === 0 && starterLeft > 0 && (
        <section className="rounded-2xl bg-white p-4 text-center shadow-sm">
          <p className="text-sm text-slate-600">Feeling good? You can learn the next {Math.min(starterLeft, NEW_WORDS_PER_DAY)} words now.</p>
          <button
            onClick={() => updateState((s) => void addMoreDailyWords(s, lang))}
            className="mt-2 rounded-xl border border-brand-600 px-4 py-2 font-semibold text-brand-700"
          >
            ＋ More words
          </button>
        </section>
      )}

      <section>
        <div className="mb-2 flex items-center justify-between gap-3">
          <h2 className="font-semibold">My words ({Object.keys(l.cards).length})</h2>
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search"
            className="w-36 rounded-lg border border-slate-300 px-2 py-1 text-sm outline-none focus:border-brand-500"
          />
        </div>
        {cards.length === 0 ? (
          <p className="text-sm text-slate-500">Words you learn will show up here.</p>
        ) : (
          <ul className="divide-y divide-slate-100 rounded-2xl bg-white shadow-sm">
            {cards.map((c) => (
              <li key={c.word.id} className="flex items-center gap-3 px-4 py-2.5">
                <SpeakButton text={c.word.word} lang={lang} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="font-medium">{c.word.word}</div>
                  <Translit lang={lang} text={c.word.word} override={c.word.translit} className="text-xs" />
                  <div className="truncate text-sm text-slate-500">{c.word.translation}</div>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${
                    isKnown(c)
                      ? "bg-emerald-100 text-emerald-700"
                      : isDue(c)
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {isKnown(c) ? "known" : isDue(c) ? "due" : "learning"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function WordCard({ lang, word, learned }: { lang: LangCode; word: Word; learned: boolean }) {
  return (
    <div className={`rounded-2xl bg-white p-4 shadow-sm ${learned ? "opacity-70" : ""}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-xl font-bold">{word.word}</div>
          <Translit lang={lang} text={word.word} override={word.translit} />
          <div className="text-slate-600">{word.translation}</div>
        </div>
        <SpeakButton text={word.word} lang={lang} size="lg" />
      </div>
      <div className="mt-3 rounded-xl bg-slate-50 p-2.5 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium">{word.example}</span>
          <SpeakButton text={word.example} lang={lang} size="sm" />
        </div>
        <Translit lang={lang} text={word.example} className="text-xs" />
        <div className="text-slate-500">{word.exampleTranslation}</div>
      </div>
      {word.note && <div className="mt-2 text-sm text-slate-600">💡 {word.note}</div>}
      <button
        disabled={learned}
        onClick={() =>
          updateState((s) => {
            addCard(s, lang, word);
            markActive(s);
          })
        }
        className="mt-3 w-full rounded-xl bg-brand-600 py-2 font-semibold text-white disabled:bg-emerald-100 disabled:text-emerald-700"
      >
        {learned ? "✓ Added to review" : "Got it ✓"}
      </button>
    </div>
  );
}
