"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Settings } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [prefs, setPrefs] = useState({
    analytics: false,
    personalization: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("fp_cookie_consent");
    if (!consent) {
      setTimeout(() => setVisible(true), 1500);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem(
      "fp_cookie_consent",
      JSON.stringify({ analytics: true, personalization: true, marketing: true, date: new Date().toISOString() })
    );
    setVisible(false);
  };

  const refuseAll = () => {
    localStorage.setItem(
      "fp_cookie_consent",
      JSON.stringify({ analytics: false, personalization: false, marketing: false, date: new Date().toISOString() })
    );
    setVisible(false);
  };

  const savePrefs = () => {
    localStorage.setItem("fp_cookie_consent", JSON.stringify({ ...prefs, date: new Date().toISOString() }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-modal="false"
      aria-label="Gestion des cookies"
      aria-live="polite"
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {!showCustomize ? (
          <>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
              <Cookie size={24} style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "2px" }} />
              <div style={{ flex: 1 }}>
                <h2 style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: "700", marginBottom: "0.4rem" }}>
                  Nous respectons votre vie privée
                </h2>
                <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: "1.6" }}>
                  Nous utilisons des cookies pour améliorer votre expérience, mesurer l&apos;audience et personnaliser nos contenus.
                  Vous pouvez accepter, refuser ou personnaliser vos choix. Conformément aux recommandations de la CNIL, votre choix
                  sera mémorisé 12 mois.{" "}
                  <Link href="/cookies" style={{ color: "var(--color-primary-light)", textDecoration: "underline" }}>
                    En savoir plus
                  </Link>
                </p>
              </div>
              <button
                onClick={refuseAll}
                aria-label="Fermer sans accepter"
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)", padding: "0.25rem", flexShrink: 0 }}
              >
                <X size={18} />
              </button>
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <button
                onClick={() => setShowCustomize(true)}
                className="btn btn-ghost btn-sm"
                style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                <Settings size={14} />
                Personnaliser
              </button>
              <button onClick={refuseAll} className="btn btn-secondary btn-sm">
                Refuser tout
              </button>
              <button onClick={acceptAll} className="btn btn-primary btn-sm">
                Accepter tout
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2 style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: "700" }}>
                Personnaliser mes préférences
              </h2>
              <button
                onClick={() => setShowCustomize(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)" }}
                aria-label="Retour"
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {/* Necessary - cannot be disabled */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem 1rem",
                  background: "var(--color-bg-alt)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: "600" }}>Cookies nécessaires</p>
                  <p style={{ fontSize: "0.775rem", color: "var(--color-text-muted)" }}>Session, CSRF, authentification — Toujours actifs</p>
                </div>
                <span className="badge badge-success">Actif</span>
              </div>

              {(["analytics", "personalization", "marketing"] as const).map((key) => {
                const labels: Record<string, { title: string; desc: string }> = {
                  analytics: { title: "Cookies analytiques", desc: "Google Analytics, Matomo — Mesure d'audience" },
                  personalization: { title: "Cookies de personnalisation", desc: "Mémorisation de vos préférences simulateur" },
                  marketing: { title: "Cookies marketing", desc: "Facebook Pixel, Google Ads — Publicité ciblée" },
                };
                return (
                  <label
                    key={key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.75rem 1rem",
                      background: "var(--color-bg-alt)",
                      borderRadius: "var(--radius-md)",
                      cursor: "pointer",
                    }}
                  >
                    <div>
                      <p style={{ fontSize: "0.875rem", fontWeight: "600" }}>{labels[key].title}</p>
                      <p style={{ fontSize: "0.775rem", color: "var(--color-text-muted)" }}>{labels[key].desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={prefs[key]}
                      onChange={(e) => setPrefs((p) => ({ ...p, [key]: e.target.checked }))}
                      style={{ width: "1.1rem", height: "1.1rem", accentColor: "var(--color-accent)", cursor: "pointer" }}
                    />
                  </label>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <button onClick={refuseAll} className="btn btn-ghost btn-sm">Tout refuser</button>
              <button onClick={savePrefs} className="btn btn-primary btn-sm">Enregistrer mes choix</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
