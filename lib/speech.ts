"use client";

// Thin wrappers around the browser's built-in Web Speech API.
// - Text-to-speech works in all modern browsers.
// - Speech recognition works in Chrome (desktop + Android) and Safari (iOS/macOS);
//   not in Firefox.

import { stripStress } from "./translit";

interface RecognitionResultEvent {
  results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }>;
}

interface Recognition {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: RecognitionResultEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
}

type RecognitionCtor = new () => Recognition;

function getRecognitionCtor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function canRecognize(): boolean {
  return getRecognitionCtor() !== null;
}

export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export interface ListenHandle {
  /** Resolves with the final transcript ("" if nothing was heard). */
  result: Promise<string>;
  stop(): void;
}

/** Start listening once. `onInterim` receives the live transcript while speaking. */
export function listen(locale: string, onInterim?: (text: string) => void): ListenHandle {
  const Ctor = getRecognitionCtor();
  if (!Ctor) {
    return { result: Promise.reject(new Error("Speech recognition isn't supported in this browser.")), stop() {} };
  }
  const rec = new Ctor();
  rec.lang = locale;
  rec.interimResults = true;
  rec.continuous = false;
  rec.maxAlternatives = 1;

  let transcript = "";
  const result = new Promise<string>((resolve, reject) => {
    rec.onresult = (e) => {
      let text = "";
      for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript;
      transcript = text;
      onInterim?.(text);
    };
    rec.onerror = (e) => {
      if (e.error === "no-speech" || e.error === "aborted") resolve(transcript);
      else if (e.error === "not-allowed" || e.error === "service-not-allowed")
        reject(new Error("Microphone access was blocked. Allow it in your browser settings."));
      else reject(new Error(`Speech recognition error: ${e.error}`));
    };
    rec.onend = () => resolve(transcript.trim());
  });
  rec.start();
  return { result, stop: () => rec.stop() };
}

let voicesReady: Promise<SpeechSynthesisVoice[]> | null = null;

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  voicesReady ??= new Promise((resolve) => {
    const existing = speechSynthesis.getVoices();
    if (existing.length) return resolve(existing);
    const done = () => resolve(speechSynthesis.getVoices());
    speechSynthesis.addEventListener("voiceschanged", done, { once: true });
    setTimeout(done, 1500);
  });
  return voicesReady;
}

function pickVoice(voices: SpeechSynthesisVoice[], locale: string): SpeechSynthesisVoice | undefined {
  const prefix = locale.split("-")[0].toLowerCase();
  const matches = voices.filter((v) => v.lang.toLowerCase().replace("_", "-").startsWith(prefix));
  return (
    matches.find((v) => v.lang.toLowerCase().replace("_", "-") === locale.toLowerCase() && /google|premium|enhanced|natural/i.test(v.name)) ??
    matches.find((v) => v.lang.toLowerCase().replace("_", "-") === locale.toLowerCase()) ??
    matches[0]
  );
}

/** Speak text aloud. Resolves when finished (or immediately if unsupported). */
export async function speak(text: string, locale: string, rate = 0.9): Promise<void> {
  if (!canSpeak() || !text.trim()) return;
  const voices = await loadVoices();
  speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(stripStress(text));
  utter.lang = locale;
  utter.rate = rate;
  const voice = pickVoice(voices, locale);
  if (voice) utter.voice = voice;
  await new Promise<void>((resolve) => {
    utter.onend = () => resolve();
    utter.onerror = () => resolve();
    speechSynthesis.speak(utter);
  });
}

export function stopSpeaking(): void {
  if (canSpeak()) speechSynthesis.cancel();
}

/**
 * iOS only allows speech after a user gesture. Call this inside a tap handler
 * so later (async) replies can be spoken automatically.
 */
export function unlockSpeech(): void {
  if (!canSpeak()) return;
  const u = new SpeechSynthesisUtterance(" ");
  u.volume = 0;
  speechSynthesis.speak(u);
}
