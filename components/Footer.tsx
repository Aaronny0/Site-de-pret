"use client";

import Link from "next/link";
import { TrendingUp, Shield, Phone, Mail, MapPin, ExternalLink } from "lucide-react";

const offresLinks = [
  { label: "Prêt Personnel", href: "/offres/personnel" },
  { label: "Prêt Immobilier", href: "/offres/immobilier" },
  { label: "Prêt Professionnel", href: "/offres/professionnel" },
  { label: "Rachat de Crédit", href: "/offres/rachat-credit" },
  { label: "Prêt Travaux", href: "/offres/travaux" },
  { label: "Prêt Auto", href: "/offres/auto" },
];

const infoLinks = [
  { label: "À propos", href: "/a-propos" },
  { label: "Comment ça marche", href: "/comment-ca-marche" },
  { label: "Blog & Conseils", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Simulateur", href: "/simulateur" },
];

const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "CGU", href: "/cgu" },
  { label: "CGV / CGS", href: "/cgv" },
  { label: "Confidentialité", href: "/confidentialite" },
  { label: "Cookies", href: "/cookies" },
  { label: "Réclamations", href: "/reclamations" },
  { label: "LCB-FT", href: "/lcb-ft" },
  { label: "Accessibilité", href: "/accessibilite" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
              href="/"
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
              Votre partenaire de confiance pour tous vos projets de financement.
              Intermédiaire agréé, transparent et responsable.
            </p>

            {/* Certifications */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { icon: Shield, text: "ORIAS n° 00-000-000", color: "var(--color-accent)" },
                { icon: Shield, text: "Contrôlé par l'ACPR", color: "var(--color-gold)" },
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
                01 00 00 00 00 (non surtaxé)
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
                contact@financepro.fr
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
                <span>1 rue de la Finance, 75001 Paris</span>
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
              Nos Offres
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
              Informations
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
              Légal & Conformité
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
                Vérifier sur ORIAS
                <ExternalLink size={12} />
              </a>
              <a
                href="https://www.acpr.banque-france.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.2rem" }}
              >
                Contrôle ACPR
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
          <strong style={{ color: "rgba(245,158,11,0.9)" }}>⚠️ Avertissement légal :</strong>{" "}
          Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.
          FinancePro SAS — IOBSP enregistré à l&apos;ORIAS sous le n° 00-000-000. Consultable sur{" "}
          <a
            href="https://www.orias.fr"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-accent)", textDecoration: "underline" }}
          >
            www.orias.fr
          </a>
          . Soumis au contrôle de l&apos;ACPR — 4 place de Budapest, 75436 Paris Cedex 09.
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
            © {currentYear} FinancePro SAS — Tous droits réservés. SIRET : 000 000 000 00000
          </p>
          <nav aria-label="Liens bas de page">
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              {[
                { label: "Plan du site", href: "/sitemap" },
                { label: "Accessibilité", href: "/accessibilite" },
                { label: "Info précontractuelles", href: "/informations-precontractuelles" },
                { label: "Avertissements", href: "/avertissements" },
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
            Accessibilité :
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
            href="/accessibilite"
            style={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.4)",
              textDecoration: "underline",
            }}
          >
            Déclaration d&apos;accessibilité
          </Link>
        </div>
      </div>
    </footer>
  );
}
