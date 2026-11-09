import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Lang = 'ru' | 'lv' | 'en';
export type L = Record<Lang, string>;
export const LANGS: Lang[] = ['lv', 'ru', 'en'];

const STORAGE_KEY = 'redbus-lang';

function detect(): Lang {
  if (typeof window === 'undefined') return 'ru';
  const q = new URLSearchParams(window.location.search).get('lang');
  if (q === 'ru' || q === 'lv' || q === 'en') return q;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === 'ru' || saved === 'lv' || saved === 'en') return saved;
  return navigator.language?.toLowerCase().startsWith('lv') ? 'lv' : 'ru';
}

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (l: L) => string;
  money: (n: number) => string;
}

const LangContext = createContext<Ctx | null>(null);

const LOCALES: Record<Lang, string> = { ru: 'ru-RU', lv: 'lv-LV', en: 'en-GB' };

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detect);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* storage may be unavailable */
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (l) => l[lang],
      money: (n) =>
        new Intl.NumberFormat(LOCALES[lang], { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n) + ' €',
    }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside LangProvider');
  return ctx;
}
