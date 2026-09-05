"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { DICT } from "./dict";

export type Lang = "en" | "ar";

const STORAGE_KEY = "nexon-lang";

/* ------------------------------------------------------------------
   A tiny external store over localStorage. Using useSyncExternalStore
   rather than an effect keeps the server and first client render in
   agreement while still picking up the stored preference, and lets
   other tabs push updates in through the same subscription.
   ------------------------------------------------------------------ */

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "ar" ? "ar" : "en";
  } catch {
    // Private mode or blocked storage — fall back to English.
    return "en";
  }
}

/** The server has no storage, so it always renders the English page. */
function getServerSnapshot(): Lang {
  return "en";
}

function writeLang(next: Lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* ignore — the in-memory value below still updates the UI */
  }
  emit();
}

type LangContextValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (next: Lang) => void;
  t: (en: string) => string;
};

const LangContext = createContext<LangContextValue | null>(null);

/**
 * Mirrors the design source's bilingual layer: every English string is
 * looked up in the dictionary when Arabic is active, and falls back to
 * English when there is no entry. The choice persists under the same
 * localStorage key the artboards used, and `dir`/`lang` are written
 * onto <html> so the whole page mirrors.
 */
export function LangProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    const el = document.documentElement;
    el.setAttribute("lang", lang);
    el.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  }, [lang]);

  const setLang = useCallback((next: Lang) => writeLang(next), []);

  const t = useCallback(
    (en: string) => (lang === "ar" ? (DICT[en] ?? DICT[en.trim()] ?? en) : en),
    [lang],
  );

  const value = useMemo<LangContextValue>(
    () => ({ lang, dir: lang === "ar" ? "rtl" : "ltr", setLang, t }),
    [lang, setLang, t],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used inside <LangProvider>");
  }
  return ctx;
}

/** Convenience hook for components that only need the translator. */
export function useT() {
  return useLang().t;
}
