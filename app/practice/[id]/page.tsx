"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CyrillicKeyboard from "@/components/CyrillicKeyboard";
import SpeakButton from "@/components/SpeakButton";
import Translit from "@/components/Translit";
import { DIALOGUES } from "@/lib/dialogues";
import { LANGUAGES } from "@/lib/languages";
import { checkAnswer, displayPhrase, type MatchResult } from "@/lib/match";
import { canRecognize, listen, speak, stopSpeaking, unlockSpeech, type ListenHandle } from "@/lib/speech";
import { markActive, updateState, useAppState } from "@/lib/store";

type Entry =
  | { kind: "buddy"; line: number }
  | { kind: "you"; text: string; spoken: boolean; result: MatchResult };

export default function DialoguePage() {
  const { id } = useParams<{ id: string }>();
  const state = useAppState();
  const lang = state.lang;
  const language = LANGUAGES[lang];
  const dialogue = DIALOGUES[lang].find((d) => d.id === id);

  const [step, setStep] = useState(0);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const [micSupported, setMicSupported] = useState(true);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listenRef = useRef<ListenHandle | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMicSupported(canRecognize()), []);

  // Start over when the language or conversation changes.
  useEffect(() => {
    setStep(0);
    setEntries([]);
    setAttempts(0);
    setRevealed(false);
    setInput("");
    setError(null);
    return () => {
      listenRef.current?.stop();
      stopSpeaking();
    };
  }, [lang, id]);

  useEffect(() => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  }, [entries.length, attempts, interim]);

  if (!dialogue) {
    return (
      <div className="mt-8 text-center text-slate-500">
        Conversation not found. <Link href="/practice" className="text-brand-600 underline">Back</Link>
      </div>
    );
  }

  const started = entries.length > 0;
  const line = dialogue.lines[step];
  const finished = started && !line.replies;
  const easy = state.practiceMode === "easy";
  const isRu = lang === "ru";
  const lastYou = [...entries].reverse().find((e) => e.kind === "you");
  const lastWasWrong = lastYou?.kind === "you" && lastYou.result.verdict === "wrong" && attempts > 0;

  function say(text: string) {
    return speak(text, language.speechLocale, state.speechRate);
  }

  function start() {
    unlockSpeech();
    setEntries([{ kind: "buddy", line: 0 }]);
    say(dialogue!.lines[0].buddy);
  }

  function advance() {
    const next = step + 1;
    setStep(next);
    setAttempts(0);
    setRevealed(false);
    setEntries((prev) => [...prev, { kind: "buddy", line: next }]);
    if (!dialogue!.lines[next].replies) {
      updateState((s) => {
        const done = s.langs[lang].dialoguesDone;
        done[dialogue!.id] = (done[dialogue!.id] ?? 0) + 1;
        markActive(s);
      });
    }
    say(dialogue!.lines[next].buddy);
  }

  function submit(text: string, spoken: boolean) {
    const trimmed = text.trim();
    if (!trimmed || !line.replies) return;
    unlockSpeech();
    setInput("");
    setError(null);
    const result = checkAnswer(trimmed, line.replies.map((r) => r.text), isRu);
    setEntries((prev) => [...prev, { kind: "you", text: trimmed, spoken, result }]);

    if (result.verdict === "wrong") {
      if (attempts === 0) {
        updateState((s) => {
          s.langs[lang].mistakes.push({
            at: new Date().toISOString(),
            original: trimmed,
            corrected: displayPhrase(result.best),
            explanation: `${dialogue!.emoji} ${dialogue!.title}: ${line.english}`,
          });
        });
      }
      setAttempts((a) => a + 1);
      setRevealed(true);
      return;
    }

    updateState((s) => {
      s.langs[lang].linesPracticed += 1;
      markActive(s);
    });
    advance();
  }

  async function toggleListening() {
    if (listening) {
      listenRef.current?.stop();
      return;
    }
    unlockSpeech();
    stopSpeaking();
    setError(null);
    setInterim("");
    const handle = listen(language.speechLocale, setInterim);
    listenRef.current = handle;
    setListening(true);
    try {
      const text = await handle.result;
      setInterim("");
      if (text) submit(text, true);
      else setError("I didn't hear anything. Tap the mic and try again.");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setListening(false);
      listenRef.current = null;
    }
  }

  function insertText(t: string) {
    setInput((v) => v + t);
    inputRef.current?.focus();
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-3 flex items-center justify-between gap-2">
        <Link href="/practice" className="text-sm text-brand-600">
          ← Conversations
        </Link>
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <label className="flex items-center gap-1.5">
            <input
              type="checkbox"
              checked={state.showTranslation}
              onChange={(e) => updateState((s) => void (s.showTranslation = e.target.checked))}
              className="accent-brand-600"
            />
            English
          </label>
          {isRu && (
            <label className="flex items-center gap-1.5">
              <input
                type="checkbox"
                checked={state.showTranslit}
                onChange={(e) => updateState((s) => void (s.showTranslit = e.target.checked))}
                className="accent-brand-600"
              />
              Latin
            </label>
          )}
          <label className="flex items-center gap-1.5">
            <input
              type="checkbox"
              checked={state.speechRate < 0.8}
              onChange={(e) => updateState((s) => void (s.speechRate = e.target.checked ? 0.7 : 0.9))}
              className="accent-brand-600"
            />
            Slow
          </label>
        </div>
      </div>

      <h1 className="mb-4 text-lg font-bold">
        {dialogue.emoji} {dialogue.title} <span className="text-base">{language.flag}</span>
      </h1>

      {!started && (
        <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
          <p className="text-slate-600">{dialogue.description}</p>
          <p className="mt-2 text-sm text-slate-500">
            Turn your sound on. {easy ? "The phrases you can say will be shown." : "You'll only see the English, so say it from memory!"}
          </p>
          <button onClick={start} className="mt-4 rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white">
            ▶ Start
          </button>
        </div>
      )}

      <div className="flex-1 space-y-3 pb-4">
        {entries.map((e, i) =>
          e.kind === "buddy" ? (
            <div key={i} className="flex max-w-[90%] items-start gap-2">
              <span className="mt-2 text-2xl">🦜</span>
              <div className="rounded-2xl rounded-tl-md bg-white px-4 py-3 shadow-sm">
                <div className="flex items-start gap-2">
                  <div className="text-lg leading-relaxed">{dialogue.lines[e.line].buddy}</div>
                  <SpeakButton text={dialogue.lines[e.line].buddy} lang={lang} size="sm" className="mt-0.5" />
                </div>
                <Translit lang={lang} text={dialogue.lines[e.line].buddy} />
                {state.showTranslation && <div className="mt-1 text-sm text-slate-500">{dialogue.lines[e.line].english}</div>}
              </div>
            </div>
          ) : (
            <div key={i} className="flex flex-col items-end">
              <div
                className={`max-w-[85%] rounded-2xl rounded-br-md px-4 py-2.5 text-white ${
                  e.result.verdict === "wrong" ? "bg-slate-400" : "bg-brand-600"
                }`}
              >
                {e.spoken && <span className="mr-1 opacity-70">🎙️</span>}
                {e.text}{" "}
                {e.result.verdict === "correct" ? "✅" : e.result.verdict === "close" ? "👍" : "❌"}
              </div>
              {e.result.verdict === "close" && (
                <div className="mt-1 max-w-[85%] rounded-xl bg-amber-50 px-3 py-1.5 text-sm text-amber-900">
                  Almost! Exactly: <b>{displayPhrase(e.result.best)}</b>
                </div>
              )}
            </div>
          ),
        )}

        {listening && interim && (
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl rounded-br-md border border-dashed border-brand-500 px-4 py-2.5 text-slate-500">
              {interim}
            </div>
          </div>
        )}
      </div>

      {finished && (
        <div className="mb-4 rounded-2xl bg-emerald-50 p-5 text-center">
          <div className="text-4xl">🎉</div>
          <div className="mt-1 font-semibold text-emerald-900">Conversation complete!</div>
          {easy && <p className="mt-1 text-sm text-emerald-800">Try it again in Challenge mode to say it from memory.</p>}
          <div className="mt-4 flex justify-center gap-3">
            <button
              onClick={() => {
                setStep(0);
                setEntries([]);
                setAttempts(0);
                setRevealed(false);
              }}
              className="rounded-xl bg-brand-600 px-5 py-2.5 font-semibold text-white"
            >
              ↺ Again
            </button>
            <Link href="/practice" className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-semibold">
              More conversations
            </Link>
          </div>
        </div>
      )}

      {started && !finished && line.replies && (
        <div className="above-nav sticky -mx-4 border-t border-slate-200 bg-[#f6f7fb] px-4 pt-3 pb-2">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Your turn{lastWasWrong ? " · try again" : ""}
          </div>

          {easy || revealed ? (
            <div className="mb-2 flex gap-2 overflow-x-auto pb-1">
              {line.replies.map((r) => (
                <div key={r.text} className="flex shrink-0 items-start gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
                  <button
                    type="button"
                    onClick={() => setInput(displayPhrase(r.text).replace("…", ""))}
                    className="text-left"
                  >
                    <div className="font-medium">{displayPhrase(r.text)}</div>
                    <Translit lang={lang} text={displayPhrase(r.text)} className="text-xs" />
                    <div className="text-xs text-slate-400">{r.english}</div>
                  </button>
                  <SpeakButton text={displayPhrase(r.text).replace("…", "")} lang={lang} size="sm" />
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-2 rounded-xl bg-white px-3 py-2 text-sm">
              <div>
                Say: <b>{line.replies[0].english}</b>
                {line.replies.length > 1 && <span className="text-slate-500"> (or: {line.replies.slice(1).map((r) => r.english).join(" / ")})</span>}
              </div>
              <button onClick={() => setRevealed(true)} className="mt-1 text-brand-600">
                Show phrases
              </button>
            </div>
          )}

          {line.tip && <div className="mb-2 text-sm text-sky-800">💡 {line.tip}</div>}
          {lastWasWrong && (
            <div className="mb-2 text-sm text-red-700">
              Not quite. Listen to the phrase with 🔊 and try again.
              {attempts >= 2 && (
                <button onClick={advance} className="ml-2 font-semibold text-brand-600 underline">
                  Skip →
                </button>
              )}
            </div>
          )}
          {error && <div className="mb-2 text-sm text-red-700">{error}</div>}

          <div className="flex items-center gap-2">
            {micSupported && (
              <button
                type="button"
                onClick={toggleListening}
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl text-white shadow ${
                  listening ? "listening bg-red-500" : "bg-brand-600"
                }`}
                aria-label={listening ? "Stop listening" : "Speak your answer"}
              >
                {listening ? "■" : "🎙️"}
              </button>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit(input, false);
              }}
              className="flex min-w-0 flex-1 gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={micSupported ? "…or type" : "Type your answer"}
                inputMode={showKeyboard ? "none" : undefined}
                className="h-11 min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-3 text-base outline-none focus:border-brand-500"
              />
              {isRu && (
                <button
                  type="button"
                  onClick={() => setShowKeyboard((v) => !v)}
                  className={`h-11 w-11 shrink-0 rounded-xl border text-sm font-semibold ${
                    showKeyboard ? "border-brand-600 bg-brand-50 text-brand-700" : "border-slate-300 bg-white"
                  }`}
                  aria-label="Russian keyboard"
                >
                  Ая
                </button>
              )}
              <button
                type="submit"
                disabled={!input.trim()}
                className="h-11 shrink-0 rounded-xl bg-brand-600 px-4 font-semibold text-white disabled:opacity-40"
              >
                OK
              </button>
            </form>
          </div>
          {listening && <div className="mt-1 text-xs text-slate-500">Listening… tap ■ when you&apos;re done.</div>}
          {showKeyboard && isRu && (
            <div className="mt-2">
              <CyrillicKeyboard onKey={insertText} onBackspace={() => setInput((v) => v.slice(0, -1))} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
