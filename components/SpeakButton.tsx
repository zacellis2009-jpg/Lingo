"use client";

import { useState } from "react";
import { LANGUAGES, type LangCode } from "@/lib/languages";
import { speak } from "@/lib/speech";
import { useAppState } from "@/lib/store";

export default function SpeakButton({
  text,
  lang,
  className = "",
  size = "md",
}: {
  text: string;
  lang: LangCode;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const { speechRate } = useAppState();
  const [playing, setPlaying] = useState(false);
  const sizes = { sm: "h-7 w-7 text-sm", md: "h-9 w-9 text-base", lg: "h-12 w-12 text-xl" };

  return (
    <button
      type="button"
      aria-label="Listen"
      onClick={async (e) => {
        e.stopPropagation();
        setPlaying(true);
        await speak(text, LANGUAGES[lang].speechLocale, speechRate);
        setPlaying(false);
      }}
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition hover:bg-brand-100 ${
        playing ? "ring-2 ring-brand-500" : ""
      } ${sizes[size]} ${className}`}
    >
      🔊
    </button>
  );
}
