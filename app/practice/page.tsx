"use client";

import Link from "next/link";
import { DIALOGUES } from "@/lib/dialogues";
import { LANGUAGES } from "@/lib/languages";
import { updateState, useAppState } from "@/lib/store";

export default function PracticePage() {
  const state = useAppState();
  const lang = state.lang;
  const language = LANGUAGES[lang];
  const l = state.langs[lang];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold">Conversations {language.flag}</h1>
        <p className="text-sm text-slate-500">
          Your buddy says a line, then it&apos;s your turn. Answer out loud with the 🎙️ button, or type.
        </p>
      </div>

      <div className="flex rounded-xl bg-slate-200 p-1 text-sm">
        {(["easy", "challenge"] as const).map((m) => (
          <button
            key={m}
            onClick={() => updateState((s) => void (s.practiceMode = m))}
            className={`flex-1 rounded-lg px-3 py-2 font-medium ${
              state.practiceMode === m ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
            }`}
          >
            {m === "easy" ? "🙂 Easy: phrases shown" : "💪 Challenge: English only"}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {DIALOGUES[lang].map((d) => {
          const done = l.dialoguesDone[d.id] ?? 0;
          return (
            <Link
              key={d.id}
              href={`/practice/${d.id}`}
              className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <span className="text-3xl">{d.emoji}</span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="font-semibold">{d.title}</span>
                  {done > 0 && (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
                      ✓ {done}×
                    </span>
                  )}
                </span>
                <span className="block text-sm text-slate-500">{d.description}</span>
              </span>
            </Link>
          );
        })}
      </div>

      <Link
        href="/talk"
        className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-brand-500/40 bg-brand-50 p-4"
      >
        <span className="text-3xl">🗣️</span>
        <span>
          <span className="block font-semibold text-brand-700">Want to talk about anything?</span>
          <span className="block text-sm text-slate-600">
            Use free voice conversation in the Claude app with your own tutor instructions.
          </span>
        </span>
      </Link>
    </div>
  );
}
