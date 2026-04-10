"use client";

import { usePathname, useRouter } from "next/navigation";
import { useDictionary } from "./DictionaryProvider";
import { useState, useRef, useEffect } from "react";
import { routeMap, type AppLocale, locales } from "@/lib/routes";

const FlagFR = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13.5" viewBox="0 0 3 2" style={{ borderRadius: '3px', boxShadow: '0 0 2px rgba(0,0,0,0.2)' }}>
    <rect width="1" height="2" x="0" fill="#002395"/>
    <rect width="1" height="2" x="1" fill="#fff"/>
    <rect width="1" height="2" x="2" fill="#ed2939"/>
  </svg>
);

const FlagES = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13.5" viewBox="0 0 6 4" style={{ borderRadius: '3px', boxShadow: '0 0 2px rgba(0,0,0,0.2)' }}>
    <rect width="6" height="4" fill="#aa151b"/>
    <rect width="6" height="2" y="1" fill="#f1bf00"/>
  </svg>
);

export default function LanguageSwitcher() {
  const { lang } = useDictionary();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLanguage = (newLang: string) => {
    setIsOpen(false);
    if (newLang === lang) return;

    const currentLocale = lang as AppLocale;
    const targetLocale = newLang as AppLocale;

    // Extract the path after the locale prefix
    const pathWithoutLocale = pathname.replace(`/${lang}`, "");
    const cleanPath = pathWithoutLocale.startsWith("/") ? pathWithoutLocale.slice(1) : pathWithoutLocale;

    // Find the route key for the current path
    let targetPath = `/${targetLocale}`;
    let found = false;

    for (const [key, slugs] of Object.entries(routeMap)) {
      if (key === "home" && cleanPath === "") {
        targetPath = `/${targetLocale}`;
        found = true;
        break;
      }
      if (slugs[currentLocale] === cleanPath || cleanPath.startsWith(slugs[currentLocale] + "/")) {
        const remainder = cleanPath.slice(slugs[currentLocale].length);
        targetPath = slugs[targetLocale] === "" ? `/${targetLocale}${remainder}` : `/${targetLocale}/${slugs[targetLocale]}${remainder}`;
        found = true;
        break;
      }
    }

    // Fallback: just swap the locale prefix
    if (!found) {
      targetPath = cleanPath === "" ? `/${targetLocale}` : `/${targetLocale}/${cleanPath}`;
    }

    router.push(targetPath);
  };

  const otherLang = lang === "es" ? "fr" : "es";
  const currentFlag = lang === "es" ? <FlagES /> : <FlagFR />;
  const otherFlag = lang === "es" ? <FlagFR /> : <FlagES />;
  const currentLabel = lang === "es" ? "ES" : "FR";
  const otherLabel = lang === "es" ? "FR" : "ES";
  const otherFullLabel = lang === "es" ? "Français" : "Español";

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          background: "rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: "var(--radius-full)",
          padding: "0.4rem 0.7rem",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "0.825rem",
          color: "inherit",
          transition: "all 0.2s",
          fontFamily: "var(--font-body)",
        }}
        aria-label={`Cambiar idioma`}
      >
        <span>{currentFlag} {currentLabel}</span>
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 0.5rem)",
            right: 0,
            background: "white",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-lg)",
            border: "1px solid var(--color-border)",
            overflow: "hidden",
            zIndex: 1001,
            display: "flex",
            flexDirection: "column",
            minWidth: "130px",
            animation: "scaleIn 0.15s ease-out",
          }}
        >
          <button
            onClick={() => switchLanguage(lang)}
            style={{
              padding: "0.6rem 1rem",
              textAlign: "left",
              background: "var(--color-bg-alt)",
              border: "none",
              cursor: "default",
              fontWeight: 600,
              color: "var(--color-text)",
              width: "100%",
              fontSize: "0.875rem",
              fontFamily: "var(--font-body)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {currentFlag} {lang === "es" ? "Español" : "Français"} ✓
          </button>
          <button
            onClick={() => switchLanguage(otherLang)}
            style={{
              padding: "0.6rem 1rem",
              textAlign: "left",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontWeight: 400,
              color: "var(--color-text)",
              width: "100%",
              fontSize: "0.875rem",
              fontFamily: "var(--font-body)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-bg-alt)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            {otherFlag} {otherFullLabel}
          </button>
        </div>
      )}
    </div>
  );
}
