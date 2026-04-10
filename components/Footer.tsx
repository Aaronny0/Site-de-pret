"use client";

import Link from "next/link";
import { TrendingUp, Shield, Phone, Mail, MapPin, ExternalLink } from "lucide-react";

import { useDictionary } from "./DictionaryProvider";
import { getLocalizedPath, type AppLocale } from "@/lib/routes";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { dict, lang } = useDictionary();
  const locale = lang as AppLocale;
  const t = dict?.footer || {};
  const tOffers = dict?.offers || {};

  const offresLinks = [
    { label: tOffers.personal || "Préstamo Personal", href: getLocalizedPath("offers_personal", locale) },
    { label: tOffers.realestate || "Préstamo Hipotecario", href: getLocalizedPath("offers_realestate", locale) },
    { label: tOffers.professional || "Préstamo Profesional", href: getLocalizedPath("offers_professional", locale) },
    { label: tOffers.consolidation || "Reagrupación de Créditos", href: getLocalizedPath("offers_consolidation", locale) },
    { label: tOffers.renovation || "Préstamo Obras", href: getLocalizedPath("offers_renovation", locale) },
    { label: tOffers.auto || "Préstamo Auto", href: getLocalizedPath("offers_auto", locale) },
  ];

  const infoLinks = [
    { label: t.about || "Sobre nosotros", href: getLocalizedPath("about", locale) },
    { label: dict?.navbar?.how_it_works || "Cómo funciona", href: getLocalizedPath("how_it_works", locale) },
    { label: t.blog || "Blog", href: getLocalizedPath("blog", locale) },
    { label: t.faq || "FAQ", href: getLocalizedPath("faq", locale) },
    { label: dict?.navbar?.contact || "Contacto", href: getLocalizedPath("contact", locale) },
    { label: dict?.navbar?.simulator || "Simulador", href: getLocalizedPath("simulator", locale) },
  ];

  const legalLinks = [
    { label: t.legal_notices || "Avisos legales", href: getLocalizedPath("legal", locale) },
    { label: t.terms || "Condiciones de uso", href: getLocalizedPath("terms", locale) },
    { label: t.terms_sale || "Condiciones de venta", href: getLocalizedPath("terms_sale", locale) },
    { label: t.privacy || "Privacidad", href: getLocalizedPath("privacy", locale) },
    { label: t.cookies || "Cookies", href: getLocalizedPath("cookies", locale) },
    { label: t.complaints || "Reclamaciones", href: getLocalizedPath("complaints", locale) },
    { label: "LCB-FT", href: getLocalizedPath("lcb_ft", locale) },
    { label: t.accessibility || "Accesibilidad", href: getLocalizedPath("accessibility", locale) },
  ];

  return (
    <footer className="footer" role="contentinfo">
      {/* Main Footer */}
      <div className="container" style={{ padding: "4rem var(--container-padding) 2rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem",
          }}
        >
          {/* Column 1 — Brand + Certifications */}
          <div style={{ gridColumn: "span 1" }}>
            <Link
              href={getLocalizedPath("home", locale)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                textDecoration: "none",
                marginBottom: "1.25rem",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <TrendingUp size={22} color="white" strokeWidth={2.5} />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: "800",
                  color: "white",
                }}
              >
                Finance<span style={{ color: "var(--color-accent)" }}>Pro</span>
              </span>
            </Link>

            <p
              style={{
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.6)",
                lineHeight: "1.7",
                marginBottom: "1.5rem",
              }}
            >
              {dict?.footer?.description || "Votre partenaire de confiance pour tous vos projets de financement. Intermédiaire agréé, transparent et responsable."}
            </p>

            {/* Certifications */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { icon: Shield, text: "ORIAS n° 00-000-000", color: "var(--color-accent)" },
                { icon: Shield, text: lang === 'fr' ? "Contrôlé par l'ACPR" : "Controlado por la ACPR", color: "var(--color-gold)" },
                { icon: Shield, text: "SSL 256-bit • RGPD", color: "#60A5FA" },
              ].map((cert, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <cert.icon size={14} style={{ color: cert.color, flexShrink: 0 }} />
                  <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)" }}>
                    {cert.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <a
                href="tel:+33100000000"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              >
                <Phone size={14} />
                {t.phone || "+34 900 000 000"} ({t.phone_label || "Llamada gratuita"})
              </a>
              <a
                href="mailto:contact@financepro.fr"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              >
                <Mail size={14} />
                {t.email || "contacto@financepro.es"}
              </a>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "0.875rem",
                }}
              >
                <MapPin size={14} style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>{t.address || "Calle Gran Vía 42, 28013 Madrid"}</span>
              </div>
            </div>
          </div>

          {/* Column 2 — Nos Offres */}
          <div>
            <h3
              style={{
                fontSize: "0.8rem",
                fontFamily: "var(--font-body)",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "1.25rem",
              }}
            >
              {dict?.navbar?.offres || "Nos Offres"}
            </h3>
            <nav aria-label="Liens offres footer">
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.1rem" }}>
                {offresLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3 — Informations */}
          <div>
            <h3
              style={{
                fontSize: "0.8rem",
                fontFamily: "var(--font-body)",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "1.25rem",
              }}
            >
              {lang === 'fr' ? 'Informations' : 'Información'}
            </h3>
            <nav aria-label="Liens informations footer">
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.1rem" }}>
                {infoLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 4 — Légal */}
          <div>
            <h3
              style={{
                fontSize: "0.8rem",
                fontFamily: "var(--font-body)",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "1.25rem",
              }}
            >
              {dict?.footer?.legal || "Légal & Conformité"}
            </h3>
            <nav aria-label="Liens légaux footer">
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.1rem" }}>
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div style={{ marginTop: "1.5rem" }}>
              <a
                href="https://www.orias.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                {lang === 'fr' ? 'Vérifier sur ORIAS' : 'Verificar en ORIAS'}
                <ExternalLink size={12} />
              </a>
              <a
                href="https://www.acpr.banque-france.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.2rem" }}
              >
                {lang === 'fr' ? 'Contrôle ACPR' : 'Control ACPR'}
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "rgba(255,255,255,0.08)",
          margin: "0 var(--container-padding)",
        }}
      />

      {/* Legal Warning */}
      <div
        className="container"
        style={{ padding: "1.25rem var(--container-padding)" }}
      >
        <div
          style={{
            background: "rgba(245, 158, 11, 0.1)",
            border: "1px solid rgba(245, 158, 11, 0.2)",
            borderRadius: "var(--radius-md)",
            padding: "0.875rem 1.25rem",
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            lineHeight: "1.6",
          }}
        >
          <strong style={{ color: "rgba(245,158,11,0.9)" }}>⚠️ {lang === 'fr' ? 'Avertissement légal' : 'Aviso legal'} :</strong>{" "}
          {t.credit_warning || "Un crédito le compromete y debe ser reembolsado. Verifique su capacidad de pago antes de comprometerse."}
          {" "}FinancePro SL — IOBSP {lang === 'fr' ? "enregistré à l'ORIAS sous le n°" : "registrado en ORIAS n°"} 00-000-000. {lang === 'fr' ? 'Consultable sur' : 'Verificable en'}{" "}
          <a
            href="https://www.orias.fr"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-accent)", textDecoration: "underline" }}
          >
            www.orias.fr
          </a>
          . {lang === 'fr' ? "Soumis au contrôle de l'ACPR" : "Sujeto al control de la ACPR"} — 4 place de Budapest, 75436 Paris Cedex 09.
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="container"
          style={{
            padding: "1.25rem var(--container-padding)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
            © {currentYear} FinancePro SL — {t.rights_reserved || "Todos los derechos reservados."} CIF: B00000000
          </p>
          <nav aria-label="Liens bas de page">
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              {[
                { label: lang === 'fr' ? "Plan du site" : "Mapa del sitio", href: `/${lang}/sitemap` },
                { label: t.accessibility || "Accesibilidad", href: getLocalizedPath("accessibility", locale) },
                { label: lang === 'fr' ? "Info précontractuelles" : "Info precontractual", href: getLocalizedPath("precontractual", locale) },
                { label: lang === 'fr' ? "Avertissements" : "Avisos", href: getLocalizedPath("warnings", locale) },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: "0.775rem",
                    color: "rgba(255,255,255,0.35)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Accessibility Bar */}
      <div style={{ background: "rgba(0,0,0,0.2)" }}>
        <div
          className="container"
          style={{
            padding: "0.5rem var(--container-padding)",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
            {lang === 'fr' ? 'Accessibilité :' : 'Accesibilidad :'}
          </span>
          <button
            onClick={() => {
              const size = parseFloat(document.documentElement.style.fontSize || "16");
              document.documentElement.style.fontSize = Math.min(size + 2, 22) + "px";
            }}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.7)",
              borderRadius: "4px",
              padding: "0.2rem 0.5rem",
              fontSize: "0.75rem",
              cursor: "pointer",
            }}
            aria-label="Augmenter la taille du texte"
          >
            A+
          </button>
          <button
            onClick={() => {
              const size = parseFloat(document.documentElement.style.fontSize || "16");
              document.documentElement.style.fontSize = Math.max(size - 2, 12) + "px";
            }}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.7)",
              borderRadius: "4px",
              padding: "0.2rem 0.5rem",
              fontSize: "0.75rem",
              cursor: "pointer",
            }}
            aria-label="Réduire la taille du texte"
          >
            A-
          </button>
          <Link
            href={getLocalizedPath("accessibility", locale)}
            style={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.4)",
              textDecoration: "underline",
            }}
          >
            {lang === 'fr' ? "Déclaration d'accessibilité" : "Declaración de accesibilidad"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
