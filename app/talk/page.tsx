"use client";

import { useState } from "react";
import { LANGUAGES, type LangCode } from "@/lib/languages";
import { isKnown } from "@/lib/srs";
import { useAppState, type LangState } from "@/lib/store";
import { stripStress } from "@/lib/translit";

function tutorInstructions(lang: LangCode, l: LangState): string {
  const name = LANGUAGES[lang].name;
  const cards = Object.values(l.cards);
  const known = cards.filter(isKnown).map((c) => stripStress(c.word.word));
  const learning = cards.filter((c) => !isKnown(c)).map((c) => stripStress(c.word.word));

  return `You are my ${name} conversation buddy for spoken practice. I'm a complete beginner and my native language is English.

How to talk with me:
- Speak mostly ${name}, in very short and simple sentences (beginner level), slowly and clearly.
- After each ${name} sentence, say what it means in English.
- Always end your turn with one simple question, so I know what to answer.
- If I make a mistake, first say the correct sentence, then explain it in one short English sentence. Correct only one thing at a time, and be encouraging.
- If I answer in English or I'm stuck, tell me how to say it in ${name} and let me repeat it.
- Keep each of your turns to two or three sentences. This is a voice conversation, so don't use lists, tables or emojis.
- When I don't know what to talk about, suggest a role-play: ordering at a café, introducing myself, asking for directions, or shopping.
${lang === "ru" ? "- Russian is new to me, so speak extra slowly and repeat new words.\n" : ""}
Words I already know: ${known.length ? known.join(", ") : "(none yet)"}
Words I'm learning right now (please use them): ${learning.length ? learning.join(", ") : "(none yet)"}

Start by greeting me in ${name} and asking my name.`;
}

export default function TalkPage() {
  const state = useAppState();
  const lang = state.lang;
  const language = LANGUAGES[lang];
  const text = tutorInstructions(lang, state.langs[lang]);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Older browsers: fall back to selecting the text so it can be copied by hand.
      const el = document.getElementById("instructions") as HTMLTextAreaElement | null;
      el?.select();
      document.execCommand("copy");
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold">Free talk {language.flag}</h1>
        <p className="text-sm text-slate-500">
          For open conversation about anything, use voice mode in the Claude app. It&apos;s part of your Claude plan, so
          there&apos;s nothing extra to pay. These instructions turn it into your {language.name} buddy.
        </p>
      </div>

      <ol className="space-y-3">
        <Step n={1} title="Copy your tutor instructions">
          They include the {language.name} words you&apos;re learning in Lingo, so copy them again now and then to keep them
          up to date.
        </Step>
        <Step n={2} title="Make a Claude Project (do this once)">
          In the Claude app or at claude.ai, create a new <b>Project</b> called &quot;{language.name} buddy&quot; and paste the
          text into its <b>instructions</b>. No Projects on your plan? Paste it as the first message of a new chat instead.
        </Step>
        <Step n={3} title="Start talking">
          Open a chat in that project on your phone and tap the <b>voice</b> button next to the message box. Then just
          talk!
        </Step>
      </ol>

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-semibold">Tutor instructions ({language.name})</span>
          <button onClick={copy} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
        <textarea
          id="instructions"
          readOnly
          value={text}
          rows={12}
          className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700"
        />
      </div>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
        {n}
      </span>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-slate-600">{children}</div>
      </div>
    </li>
  );
}
