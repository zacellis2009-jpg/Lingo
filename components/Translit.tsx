"use client";

import type { LangCode } from "@/lib/languages";
import { useAppState } from "@/lib/store";
import { transliterate } from "@/lib/translit";

/** Shows Latin transliteration under Russian text when the setting is on. */
export default function Translit({
  lang,
  text,
  override,
  className = "",
}: {
  lang: LangCode;
  text: string;
  override?: string;
  className?: string;
}) {
  const { showTranslit } = useAppState();
  if (lang !== "ru" || !showTranslit) return null;
  return <div className={`text-sm italic text-slate-500 ${className}`}>{override || transliterate(text)}</div>;
}
