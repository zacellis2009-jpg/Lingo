"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LANG_CODES, LANGUAGES } from "@/lib/languages";
import { streak, updateState, useAppState } from "@/lib/store";
import { stopSpeaking } from "@/lib/speech";

const NAV = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/practice", label: "Practice", icon: "💬" },
  { href: "/words", label: "Words", icon: "📚" },
  { href: "/review", label: "Review", icon: "🔁" },
  { href: "/progress", label: "Progress", icon: "📈" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/practice") return pathname.startsWith("/practice") || pathname === "/talk";
  return pathname.startsWith(href);
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const state = useAppState();
  const days = streak(state.activityDays);

  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="flex items-center justify-between gap-2 px-4 py-2.5">
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
            <span className="text-xl">🦜</span>
            <span className="hidden sm:inline">Lingo Buddy</span>
          </Link>

          <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1" role="tablist" aria-label="Language">
            {LANG_CODES.map((code) => {
              const lang = LANGUAGES[code];
              const active = state.lang === code;
              return (
                <button
                  key={code}
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    stopSpeaking();
                    updateState((s) => {
                      s.lang = code;
                    });
                  }}
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-medium transition ${
                    active ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span className="hidden sm:inline">{lang.name}</span>
                </button>
              );
            })}
          </div>

          <div className="text-sm font-semibold text-orange-500" title="Day streak">
            🔥 {days}
          </div>
        </div>

        <nav className="hidden border-t border-slate-100 px-2 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 text-sm font-medium ${
                isActive(pathname, item.href) ? "border-b-2 border-brand-600 text-brand-700" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="flex flex-1 flex-col px-4 pt-4 pb-24 md:pb-8">{children}</main>

      <nav className="bottom-nav fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white md:hidden">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-around">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center px-2 text-[11px] font-medium ${
                isActive(pathname, item.href) ? "text-brand-600" : "text-slate-500"
              }`}
            >
              <span className="text-xl leading-6">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
