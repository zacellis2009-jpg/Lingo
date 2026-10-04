"use client";

import { useEffect, useRef, useState } from "react";
import CyrillicKeyboard from "@/components/CyrillicKeyboard";
import SpeakButton from "@/components/SpeakButton";
import TappableText from "@/components/TappableText";
import Translit from "@/components/Translit";
import WordSheet from "@/components/WordSheet";
import { ApiCallError, postJson } from "@/lib/api";
import { LANGUAGES, SCENARIOS } from "@/lib/languages";
import { canRecognize, listen, speak, stopSpeaking, unlockSpeech, type ListenHandle } from "@/lib/speech";
import {
  addCard,
  ensureDailyWords,
  findWord,
  getStateSnapshot,
  hasWord,
  makeId,
  markActive,
  updateState,
  useAppState,
  type ChatMessage,
} from "@/lib/store";
import type { ChatTurn, TutorReply } from "@/lib/tutor";

type Mode = "text" | "voice";

function toTurns(chat: ChatMessage[]): ChatTurn[] {
  const turns: ChatTurn[] = chat.map((m) =>
    m.role === "user"
      ? { role: "user", content: m.spoken ? `(spoken) ${m.text ?? ""}` : (m.text ?? "") }
      : { role: "assistant", content: JSON.stringify(m.reply) },
  );
  // The tutor opened the conversation; replay the hidden kickoff message first.
  if (turns.length === 0 || turns[0].role === "assistant") turns.unshift({ role: "user", content: "[start]" });
  return turns;
}

export default function ChatPage() {
  const state = useAppState();
  const lang = state.lang;
  const language = LANGUAGES[lang];
  const l = state.langs[lang];
  const chat = l.chat;

  const [mode, setMode] = useState<Mode>("text");
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<ApiCallError | null>(null);
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const [speakEnglish, setSpeakEnglish] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [lookup, setLookup] = useState<{ word: string; sentence: string } | null>(null);
  const [micSupported, setMicSupported] = useState(true);

  const listenRef = useRef<ListenHandle | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => setMicSupported(canRecognize()), []);
  useEffect(() => {
    // The composer is sticky at the end of the page, so scroll all the way down
    // to keep the newest message just above it.
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  }, [chat.length, pending, interim]);
  useEffect(() => {
    setShowKeyboard(false);
    setError(null);
    return () => {
      listenRef.current?.stop();
      stopSpeaking();
    };
  }, [lang]);

  async function send(text: string | null, spoken = false) {
    if (pending) return;
    const trimmed = text?.trim() ?? "";
    if (text !== null && !trimmed) return;
    unlockSpeech();
    setError(null);
    setInput("");

    let history = chat;
    if (text !== null) {
      const userMsg: ChatMessage = { id: makeId("m"), role: "user", text: trimmed, spoken };
      history = [...chat, userMsg];
      updateState((s) => {
        s.langs[lang].chat.push(userMsg);
      });
    }

    updateState((s) => ensureDailyWords(s, lang));
    const fresh = getStateSnapshot();
    const knownWords = Object.values(fresh.langs[lang].cards).map((c) => c.word.word);
    const todaysWords = fresh.langs[lang].daily.ids
      .map((id) => findWord(lang, fresh.langs[lang], id)?.word)
      .filter((w): w is string => !!w);

    setPending(true);
    try {
      const reply = await postJson<TutorReply>("/api/chat", {
        lang,
        scenario: l.scenario,
        messages: toTurns(history),
        knownWords,
        todaysWords,
      });
      updateState((s) => {
        const ls = s.langs[lang];
        const lastUser = [...ls.chat].reverse().find((m) => m.role === "user");
        if (text !== null && lastUser) {
          lastUser.correction = reply.correction;
          if (reply.correction.has_mistake) {
            ls.mistakes.push({
              at: new Date().toISOString(),
              original: lastUser.text ?? "",
              corrected: reply.correction.corrected,
              explanation: reply.correction.explanation,
            });
          }
          ls.messagesSent += 1;
          markActive(s);
        }
        ls.chat.push({ id: makeId("m"), role: "assistant", reply });
      });
      if (mode === "voice" || state.autoSpeak) {
        await speak(reply.say, language.speechLocale, state.speechRate);
      }
    } catch (e) {
      setError(e instanceof ApiCallError ? e : new ApiCallError(String(e)));
    } finally {
      setPending(false);
    }
  }

  async function toggleListening(target: "send" | "input") {
    if (listening) {
      listenRef.current?.stop();
      return;
    }
    unlockSpeech();
    stopSpeaking();
    setError(null);
    setInterim("");
    const locale = speakEnglish ? "en-US" : language.speechLocale;
    const handle = listen(locale, setInterim);
    listenRef.current = handle;
    setListening(true);
    try {
      const text = await handle.result;
      setInterim("");
      if (!text) return;
      if (target === "send") await send(text, true);
      else setInput((prev) => (prev ? `${prev} ${text}` : text));
    } catch (e) {
      setError(new ApiCallError((e as Error).message));
    } finally {
      setListening(false);
      listenRef.current = null;
    }
  }

  function newConversation(scenarioId = l.scenario) {
    if (chat.length > 0 && !confirm("Start a new conversation? This one will be cleared.")) return;
    stopSpeaking();
    updateState((s) => {
      s.langs[lang].chat = [];
      s.langs[lang].scenario = scenarioId;
    });
    setError(null);
  }

  function insertAtCursor(textToInsert: string) {
    const el = inputRef.current;
    if (!el) return setInput((v) => v + textToInsert);
    const start = el.selectionStart ?? input.length;
    const end = el.selectionEnd ?? input.length;
    const next = input.slice(0, start) + textToInsert + input.slice(end);
    setInput(next);
    requestAnimationFrame(() => el.setSelectionRange(start + textToInsert.length, start + textToInsert.length));
  }

  function backspace() {
    const el = inputRef.current;
    const start = el?.selectionStart ?? input.length;
    const end = el?.selectionEnd ?? input.length;
    if (start === end && start === 0) return;
    const from = start === end ? start - 1 : start;
    setInput(input.slice(0, from) + input.slice(end));
    requestAnimationFrame(() => el?.setSelectionRange(from, from));
  }

  const lastAssistant = [...chat].reverse().find((m) => m.role === "assistant");

  return (
    <div className="flex flex-1 flex-col">
      {/* Scenario + settings */}
      <div className="-mx-4 mb-3 flex gap-2 overflow-x-auto px-4 pb-1">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => s.id !== l.scenario && newConversation(s.id)}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-sm ${
              l.scenario === s.id
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
            }`}
          >
            {s.emoji} {s.label}
          </button>
        ))}
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
        <div className="flex rounded-lg bg-slate-200 p-0.5">
          {(["text", "voice"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-md px-3 py-1 font-medium ${mode === m ? "bg-white text-slate-900 shadow-sm" : ""}`}
            >
              {m === "text" ? "⌨️ Type" : "🎙️ Voice"}
            </button>
          ))}
        </div>
        <Toggle
          label="English"
          checked={state.showTranslation}
          onChange={(v) => updateState((s) => void (s.showTranslation = v))}
        />
        {language.usesTransliteration && (
          <Toggle
            label="Latin letters"
            checked={state.showTranslit}
            onChange={(v) => updateState((s) => void (s.showTranslit = v))}
          />
        )}
        {mode === "text" && (
          <Toggle label="Read aloud" checked={state.autoSpeak} onChange={(v) => updateState((s) => void (s.autoSpeak = v))} />
        )}
        <Toggle
          label="Slow voice"
          checked={state.speechRate < 0.8}
          onChange={(v) => updateState((s) => void (s.speechRate = v ? 0.7 : 0.9))}
        />
        {chat.length > 0 && (
          <button onClick={() => newConversation()} className="ml-auto text-brand-600 hover:underline">
            ↺ New chat
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 pb-4">
        {chat.length === 0 && !pending && (
          <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
            <div className="text-4xl">{language.flag}</div>
            <h2 className="mt-2 text-lg font-semibold">Practice {language.name}</h2>
            <p className="mt-1 text-sm text-slate-500">
              Your buddy will start with something simple. Reply in {language.name} if you can, or in English if you&apos;re
              stuck. Tap any {language.name} word to see what it means.
            </p>
            <button
              onClick={() => send(null)}
              className="mt-4 rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700"
            >
              Start conversation
            </button>
          </div>
        )}

        {chat.map((m) =>
          m.role === "user" ? (
            <div key={m.id} className="flex flex-col items-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-md bg-brand-600 px-4 py-2.5 text-white">
                {m.spoken && <span className="mr-1 opacity-70">🎙️</span>}
                {m.text}
              </div>
              {m.correction?.has_mistake && (
                <div className="mt-1.5 max-w-[85%] rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span>✏️</span>
                    <span className="font-medium text-amber-900">{m.correction.corrected}</span>
                    <SpeakButton text={m.correction.corrected} lang={lang} size="sm" />
                  </div>
                  <div className="mt-0.5 text-amber-800">{m.correction.explanation}</div>
                </div>
              )}
            </div>
          ) : m.reply ? (
            <div key={m.id} className="flex max-w-[92%] flex-col items-start gap-1.5">
              <div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm">
                <div className="flex items-start gap-2">
                  <div className="text-lg leading-relaxed">
                    <TappableText text={m.reply.say} onWord={(word, sentence) => setLookup({ word, sentence })} />
                  </div>
                  <SpeakButton text={m.reply.say} lang={lang} size="sm" className="mt-0.5" />
                </div>
                <Translit lang={lang} text={m.reply.say} override={m.reply.say_translit} />
                {state.showTranslation && <div className="mt-1 text-sm text-slate-500">{m.reply.say_english}</div>}
              </div>
              {m.reply.coach && (
                <div className="rounded-xl bg-sky-50 px-3 py-2 text-sm text-sky-900">💡 {m.reply.coach}</div>
              )}
              {m.reply.new_words.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {m.reply.new_words.map((w) => {
                    const saved = hasWord(l, w.word);
                    return (
                      <button
                        key={w.word}
                        disabled={saved}
                        onClick={() =>
                          updateState((s) => {
                            addCard(s, lang, {
                              id: makeId(lang),
                              word: w.word,
                              translation: w.translation,
                              example: m.reply!.say,
                              exampleTranslation: m.reply!.say_english,
                              source: "chat",
                            });
                            markActive(s);
                          })
                        }
                        className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs text-emerald-800 disabled:opacity-60"
                      >
                        {saved ? "✓" : "＋"} <b>{w.word}</b> · {w.translation}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : null,
        )}

        {pending && (
          <div className="flex items-center gap-2 text-slate-400">
            <span className="animate-pulse text-xl">💭</span> thinking…
          </div>
        )}

        {listening && interim && (
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl rounded-br-md border border-dashed border-brand-500 px-4 py-2.5 text-slate-500">
              {interim}
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {error.message}
            {error.code === "missing_api_key" && (
              <div className="mt-1 text-red-700">
                The chat needs a Claude API key. Your words and flashcards still work without one.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Composer */}
      {chat.length > 0 && (
        <div className="above-nav sticky -mx-4 border-t border-slate-200 bg-[#f6f7fb] px-4 pt-3 pb-2">
          {lastAssistant?.reply && lastAssistant.reply.suggested_replies.length > 0 && !pending && (
            <div className="mb-2 flex gap-2 overflow-x-auto pb-1">
              {lastAssistant.reply.suggested_replies.map((p) => (
                <button
                  key={p.text}
                  onClick={() => {
                    if (mode === "voice") speak(p.text, language.speechLocale, state.speechRate);
                    else {
                      setInput(p.text);
                      inputRef.current?.focus();
                    }
                  }}
                  className="shrink-0 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-left text-sm hover:border-brand-500"
                  title={p.english}
                >
                  <div className="font-medium">{p.text}</div>
                  {lang === "ru" && state.showTranslit && p.translit && (
                    <div className="text-xs italic text-slate-500">{p.translit}</div>
                  )}
                  <div className="text-xs text-slate-400">{p.english}</div>
                </button>
              ))}
            </div>
          )}

          {mode === "voice" ? (
            <div className="flex flex-col items-center gap-2 py-2">
              {!micSupported ? (
                <p className="text-center text-sm text-slate-500">
                  Voice input isn&apos;t supported in this browser. Try Chrome, or Safari on iPhone.
                </p>
              ) : (
                <>
                  <button
                    onClick={() => toggleListening("send")}
                    disabled={pending}
                    className={`flex h-20 w-20 items-center justify-center rounded-full text-3xl text-white shadow-lg transition disabled:opacity-50 ${
                      listening ? "listening bg-red-500" : "bg-brand-600 hover:bg-brand-700"
                    }`}
                    aria-label={listening ? "Stop listening" : "Start speaking"}
                  >
                    {listening ? "■" : "🎙️"}
                  </button>
                  <div className="text-sm text-slate-500">
                    {listening ? "Listening… tap to finish" : "Tap and speak"} ·{" "}
                    <button onClick={() => setSpeakEnglish((v) => !v)} className="font-medium text-brand-600">
                      {speakEnglish ? "🇬🇧 English" : `${language.flag} ${language.name}`}
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-end gap-2"
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  rows={1}
                  placeholder="Type here…"
                  inputMode={showKeyboard ? "none" : undefined}
                  className="max-h-32 min-h-11 flex-1 resize-none rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base outline-none focus:border-brand-500"
                />
                {lang === "ru" && (
                  <button
                    type="button"
                    onClick={() => setShowKeyboard((v) => !v)}
                    className={`h-11 w-11 rounded-xl border text-sm font-semibold ${
                      showKeyboard ? "border-brand-600 bg-brand-50 text-brand-700" : "border-slate-300 bg-white"
                    }`}
                    aria-label="Russian keyboard"
                  >
                    Ая
                  </button>
                )}
                {micSupported && (
                  <button
                    type="button"
                    onClick={() => toggleListening("input")}
                    className={`h-11 w-11 rounded-xl border ${
                      listening ? "listening border-red-500 bg-red-500 text-white" : "border-slate-300 bg-white"
                    }`}
                    aria-label="Dictate"
                  >
                    🎙️
                  </button>
                )}
                <button
                  type="submit"
                  disabled={pending || !input.trim()}
                  className="h-11 rounded-xl bg-brand-600 px-4 font-semibold text-white disabled:opacity-40"
                >
                  Send
                </button>
              </form>
              {showKeyboard && lang === "ru" && (
                <div className="mt-2">
                  <CyrillicKeyboard onKey={insertAtCursor} onBackspace={backspace} />
                </div>
              )}
            </>
          )}
        </div>
      )}

      {lookup && <WordSheet lang={lang} word={lookup.word} sentence={lookup.sentence} onClose={() => setLookup(null)} />}
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-1.5">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="accent-brand-600" />
      {label}
    </label>
  );
}
