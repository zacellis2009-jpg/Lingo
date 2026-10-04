"use client";

import SpeakButton from "@/components/SpeakButton";
import { LANG_CODES, LANGUAGES } from "@/lib/languages";
import { isDue, isKnown } from "@/lib/srs";
import { streak, updateState, useAppState } from "@/lib/store";

export default function ProgressPage() {
  const state = useAppState();
  const lang = state.lang;
  const language = LANGUAGES[lang];
  const l = state.langs[lang];
  const mistakes = [...l.mistakes].reverse().slice(0, 15);

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Day streak" value={`🔥 ${streak(state.activityDays)}`} />
        <Stat label="Days practiced" value={state.activityDays.length} />
        {LANG_CODES.map((code) => {
          const cards = Object.values(state.langs[code].cards);
          if (code !== lang && cards.length === 0) return null;
          return (
            <Stat
              key={code}
              label={`${LANGUAGES[code].name} words known`}
              value={`${LANGUAGES[code].flag} ${cards.filter(isKnown).length}/${cards.length}`}
            />
          );
        })}
      </section>

      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-semibold">
          {language.flag} {language.name}
        </h2>
        <dl className="mt-2 grid grid-cols-3 gap-2 text-center">
          <Mini label="Words" value={Object.keys(l.cards).length} />
          <Mini label="Due now" value={Object.values(l.cards).filter((c) => isDue(c)).length} />
          <Mini label="Messages" value={l.messagesSent} />
        </dl>
      </section>

      <section>
        <h2 className="mb-2 font-semibold">Recent corrections</h2>
        {mistakes.length === 0 ? (
          <p className="text-sm text-slate-500">
            No corrections yet. Mistakes from your chats show up here so you can learn from them.
          </p>
        ) : (
          <ul className="space-y-2">
            {mistakes.map((m) => (
              <li key={m.at} className="rounded-xl bg-white p-3 text-sm shadow-sm">
                <div className="text-slate-400 line-through">{m.original}</div>
                <div className="flex items-center gap-2 font-medium text-emerald-800">
                  {m.corrected}
                  <SpeakButton text={m.corrected} lang={lang} size="sm" />
                </div>
                <div className="text-slate-600">{m.explanation}</div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="border-t border-slate-200 pt-4">
        <button
          onClick={() => {
            if (!confirm(`Reset all ${language.name} progress? Your words, chat and corrections will be deleted.`)) return;
            updateState((s) => {
              s.langs[lang] = { ...s.langs[lang], cards: {}, extraWords: {}, daily: { date: "", ids: [] }, mistakes: [], chat: [], messagesSent: 0 };
            });
          }}
          className="text-sm text-red-600 hover:underline"
        >
          Reset {language.name} progress
        </button>
        <p className="mt-1 text-xs text-slate-400">Progress is saved in this browser.</p>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-slate-50 p-2">
      <dd className="text-xl font-bold">{value}</dd>
      <dt className="text-xs text-slate-500">{label}</dt>
    </div>
  );
}
