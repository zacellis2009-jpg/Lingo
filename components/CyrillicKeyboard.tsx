"use client";

import { useState } from "react";
import { transliterate } from "@/lib/translit";

const ROWS = [
  ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"],
  ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э"],
  ["я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "ё"],
];

/** On-screen Russian keyboard with a Latin hint on every key. */
export default function CyrillicKeyboard({
  onKey,
  onBackspace,
}: {
  onKey: (text: string) => void;
  onBackspace: () => void;
}) {
  const [upper, setUpper] = useState(false);

  return (
    <div className="space-y-1 rounded-xl bg-slate-200 p-1.5 select-none">
      {ROWS.map((row, i) => (
        <div key={i} className="flex justify-center gap-1">
          {row.map((k) => {
            const ch = upper ? k.toUpperCase() : k;
            return (
              <button
                key={k}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onKey(ch);
                  setUpper(false);
                }}
                className="flex h-11 min-w-0 flex-1 flex-col items-center justify-center rounded-md bg-white text-base leading-none shadow-sm active:bg-slate-100"
              >
                {ch}
                <span className="mt-0.5 text-[9px] text-slate-400">{transliterate(k) || "ʺ"}</span>
              </button>
            );
          })}
        </div>
      ))}
      <div className="flex gap-1">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setUpper((u) => !u)}
          className={`h-10 w-14 rounded-md text-sm shadow-sm ${upper ? "bg-brand-600 text-white" : "bg-white"}`}
        >
          ⇧
        </button>
        {[",", "?", "!"].map((p) => (
          <button
            key={p}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onKey(p)}
            className="h-10 w-10 rounded-md bg-white shadow-sm"
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onKey(" ")}
          className="h-10 flex-1 rounded-md bg-white text-sm text-slate-400 shadow-sm"
        >
          space
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={onBackspace}
          className="h-10 w-14 rounded-md bg-white shadow-sm"
          aria-label="Backspace"
        >
          ⌫
        </button>
      </div>
    </div>
  );
}
