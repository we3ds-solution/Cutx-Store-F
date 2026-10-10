import { createContext, useContext, useEffect, useState } from "react";
import { translations, type Lang } from "./lang-translations";

export type { Lang };

type TranslationDictionary = (typeof translations)[Lang];

interface LangContextType {
  lang: Lang;
  toggleLang: () => void;
  t: TranslationDictionary;
  isRTL: boolean;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  toggleLang: () => {},
  t: translations.en,
  isRTL: false,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem("cutx-lang") || localStorage.getItem("sh-lang");
      return (saved as Lang) === "ar" ? "ar" : "en";
    } catch {
      return "en";
    }
  });
  const isRTL = lang === "ar";
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang === "ar" ? "ar-EG" : "en";
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.style.setProperty("--app-font-sans", "'Cairo', system-ui, sans-serif");
    try {
      localStorage.setItem("cutx-lang", lang);
      localStorage.removeItem("sh-lang");
    } catch {
      /* storage unavailable */
    }
  }, [lang, isRTL]);

  const toggleLang = () => {
    document.body.classList.add("lang-switching");
    setTimeout(() => {
      setLang((l) => (l === "en" ? "ar" : "en"));
      setTimeout(() => document.body.classList.remove("lang-switching"), 30);
    }, 160);
  };

  return (
    <LangContext.Provider value={{ lang, toggleLang, t, isRTL }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
