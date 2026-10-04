"use client";

import Link from "next/link";
import { LANG_CODES, LANGUAGES } from "@/lib/languages";
import { isDue, isKnown } from "@/lib/srs";
import { streak, updateState, useAppState } from "@/lib/store";

export default function Home() {
  const state = useAppState();
  const lang = state.lang;
  const language = LANGUAGES[lang];
  const l = state.langs[lang];
  const cards = Object.values(l.cards);
  const due = cards.filter((c) => isDue(c)).length;
  const days = streak(state.activityDays);

  return (
    <div className="space-y-5">
      <section className="rounded-3xl bg-gradient-to-br from-brand-600 to-indigo-600 p-6 text-white shadow-md">
        <div className="text-sm opacity-80">{days > 0 ? `🔥 ${days}-day streak, keep it going!` : "Let's get started!"}</div>
        <h1 className="mt-1 text-2xl font-bold">
          {language.flag} Learning {language.name}
        </h1>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-white/15 p-2">
            <div className="text-xl font-bold">{cards.length}</div>
            <div className="text-xs opacity-80">words</div>
          </div>
          <div className="rounded-xl bg-white/15 p-2">
            <div className="text-xl font-bold">{cards.filter(isKnown).length}</div>
            <div className="text-xs opacity-80">known</div>
          </div>
          <div className="rounded-xl bg-white/15 p-2">
            <div className="text-xl font-bold">{due}</div>
            <div className="text-xs opacity-80">to review</div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <ActionCard href="/words" emoji="📚" title="Today's words" text="Learn a few new words with sound and examples." />
        <ActionCard href="/practice" emoji="💬" title="Conversations" text="Speak your part in real-life conversations." />
        <ActionCard
          href="/review"
          emoji="🔁"
          title={due > 0 ? `Review (${due})` : "Review"}
          text="Flashcards that come back right before you'd forget."
          highlight={due > 0}
        />
      </section>

      <Link href="/talk" className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md">
        <span className="text-3xl">🗣️</span>
        <span>
          <span className="block font-semibold">Free talk</span>
          <span className="block text-sm text-slate-500">Talk about anything using voice mode in the Claude app.</span>
        </span>
      </Link>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-slate-500">Your languages</h2>
        <div className="grid grid-cols-3 gap-3">
          {LANG_CODES.map((code) => {
            const n = Object.keys(state.langs[code].cards).length;
            return (
              <button
                key={code}
                onClick={() => updateState((s) => void (s.lang = code))}
                className={`rounded-2xl bg-white p-3 text-center shadow-sm transition ${
                  code === lang ? "ring-2 ring-brand-500" : "hover:shadow"
                }`}
              >
                <div className="text-3xl">{LANGUAGES[code].flag}</div>
                <div className="mt-1 text-sm font-medium">{LANGUAGES[code].name}</div>
                <div className="text-xs text-slate-500">{n} words</div>
              </button>
            );
          })}
        </div>
      </section>

      {cards.length === 0 && (
        <section className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
          <b>New here?</b> Start with <Link href="/words" className="underline">Today&apos;s words</Link>, then try them out in
          a <Link href="/practice" className="underline">conversation</Link>. Voice mode works best in Chrome, or Safari on
          iPhone. Tip: add this page to your home screen to use it like an app.
        </section>
      )}
    </div>
  );
}

function ActionCard({
  href,
  emoji,
  title,
  text,
  highlight = false,
}: {
  href: string;
  emoji: string;
  title: string;
  text: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-col ${
        highlight ? "ring-2 ring-amber-400" : ""
      }`}
    >
      <span className="text-3xl">{emoji}</span>
      <span>
        <span className="block font-semibold">{title}</span>
        <span className="block text-sm text-slate-500">{text}</span>
      </span>
    </Link>
  );
}
