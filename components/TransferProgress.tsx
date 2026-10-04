"use client";

import { useRef, useState } from "react";
import { today } from "@/lib/srs";
import { exportProgress, getStateSnapshot, mergeProgress, parseProgress } from "@/lib/store";

/** Move progress between phone and computer with a code or a file. No account needed. */
export default function TransferProgress() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const canShare = typeof navigator !== "undefined" && "share" in navigator;

  async function copyCode() {
    const text = exportProgress();
    try {
      await navigator.clipboard.writeText(text);
      setMessage({ ok: true, text: "Code copied. Send it to yourself (email, notes, message) and paste it on your other device." });
    } catch {
      setCode(text);
      setMessage({ ok: true, text: "Couldn't copy automatically. Select the code in the box below and copy it." });
    }
  }

  async function share() {
    try {
      await navigator.share({ title: "My Lingo progress", text: exportProgress() });
    } catch {
      // The share sheet was closed; nothing to do.
    }
  }

  function saveFile() {
    const blob = new Blob([JSON.stringify(getStateSnapshot())], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lingo-progress-${today()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function load(text: string) {
    try {
      mergeProgress(parseProgress(text));
      setCode("");
      setMessage({ ok: true, text: "Done! Progress from your other device was added here." });
    } catch {
      setMessage({ ok: false, text: "That doesn't look like a Lingo progress code or file." });
    }
  }

  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm">
      <h2 className="font-semibold">📲 Phone ↔ computer</h2>
      <p className="mt-1 text-sm text-slate-500">
        Progress is saved on each device. To move it, copy your code here and add it on the other device. Words and
        streak days from both are combined, so nothing gets lost. Do it both ways to keep them the same.
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={copyCode} className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
          Copy my code
        </button>
        {canShare && (
          <button onClick={share} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold">
            Share…
          </button>
        )}
        <button onClick={saveFile} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold">
          Save as file
        </button>
      </div>

      <div className="mt-4 border-t border-slate-100 pt-3">
        <label htmlFor="progress-code" className="text-sm font-medium">
          Add progress from your other device
        </label>
        <textarea
          id="progress-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste a code that starts with LINGO1:"
          rows={3}
          className="mt-1 w-full rounded-xl border border-slate-300 p-2 font-mono text-xs outline-none focus:border-brand-500"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            onClick={() => load(code)}
            disabled={!code.trim()}
            className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
          >
            Add from code
          </button>
          <button onClick={() => fileRef.current?.click()} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold">
            Load a file
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) load(await file.text());
              e.target.value = "";
            }}
          />
        </div>
      </div>

      {message && <p className={`mt-3 text-sm ${message.ok ? "text-emerald-700" : "text-red-600"}`}>{message.text}</p>}
    </section>
  );
}
