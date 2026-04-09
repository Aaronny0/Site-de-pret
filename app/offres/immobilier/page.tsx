import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Home, TrendingUp, ChevronRight, Check, AlertTriangle, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Prêt Immobilier | FinancePro",
  description: "Prêt immobilier FinancePro : taux à partir de 3,40%, jusqu'à 700 000 €, durée jusqu'à 30 ans. Résidence principale, investissement locatif, PTZ.",
};

const examples = [
  { amount: 100000, months: 180, rate: 3.4, taeg: 3.52, monthly: 715.28, insurance: 28.50, totalCost: 28750.40 },
  { amount: 200000, months: 240, rate: 3.4, taeg: 3.55, monthly: 1153.07, insurance: 57.00, totalCost: 76736.80 },
  { amount: 300000, months: 300, rate: 3.55, taeg: 3.68, monthly: 1502.64, insurance: 85.50, totalCost: 150792.00 },
];

export default function PretImmobilierPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, #5B21B6 0%, var(--color-primary) 100%)", padding: "4rem 0 3rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "center" }}>
            <div>
              <nav aria-label="Fil d'Ariane" style={{ marginBottom: "1.5rem" }}>
                <ol style={{ display: "flex", gap: "0.5rem", listStyle: "none", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                  <li><Link href="/" style={{ color: "rgba(255,255,255,0.5)" }}>Accueil</Link></li>
                  <li><ChevronRight size={12} style={{ display: "inline" }} /></li>
                  <li><Link href="/offres" style={{ color: "rgba(255,255,255,0.5)" }}>Nos offres</Link></li>
                  <li><ChevronRight size={12} style={{ display: "inline" }} /></li>
                  <li style={{ color: "var(--color-accent)" }}>Prêt Immobilier</li>
                </ol>
              </nav>
              <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "var(--radius-lg)", background: "rgba(139,92,246,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Home size={28} style={{ color: "#C4B5FD" }} />
                </div>
                <span className="badge" style={{ background: "rgba(0,200,150,0.15)", color: "var(--color-accent)", border: "1px solid rgba(0,200,150,0.3)" }}>
                  ✓ Meilleur taux du marché
                </span>
              </div>
              <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", marginBottom: "1rem" }}>
                Prêt Immobilier FinancePro
              </h1>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.1rem", maxWidth: "520px", lineHeight: "1.7" }}>
                Résidence principale, investissement locatif, VEFA, rachat immobilier. Des taux compétitifs,
                un accompagnement de A à Z.
              </p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "var(--radius-xl)", padding: "2rem", textAlign: "center", minWidth: "220px" }}>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Taux à partir de</p>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "3rem", fontWeight: "700", color: "var(--color-accent)", lineHeight: "1" }}>
                3,40<span style={{ fontSize: "1.5rem" }}>%</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", marginTop: "0.25rem" }}>TAEG dès 3,52% — Taux fixe</p>
              <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", margin: "1rem 0" }} />
              <Link href="/simulateur" className="btn btn-primary btn-sm" style={{ width: "100%" }}>
                Simuler mon projet
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container">

          {/* Project types */}
          <div style={{ marginBottom: "3.5rem" }}>
            <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Votre projet immobilier</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
              {[
                { icon: "🏠", label: "Résidence principale", desc: "Acquisition de votre habitation" },
                { icon: "🏢", label: "Investissement locatif", desc: "LMNP, Pinel, Denormandie" },
                { icon: "🔨", label: "Achat + Travaux", desc: "Rénovation intégrée au financement" },
                { icon: "🏗️", label: "VEFA / Neuf", desc: "Programme neuf, déblocage par étapes" },
              ].map(({ icon, label, desc }) => (
                <div key={label} className="card" style={{ padding: "1.5rem", textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{icon}</div>
                  <p style={{ fontWeight: "700", marginBottom: "0.4rem" }}>{label}</p>
                  <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key features */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", marginBottom: "3.5rem" }}>
            <div>
              <h2 style={{ marginBottom: "1.25rem" }}>Les avantages FinancePro Immobilier</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  "Taux fixe ou variable selon votre préférence",
                  "Prêt à Taux Zéro (PTZ) pour primo-accédants",
                  "Assurance emprunteur optimisée (délégation libre)",
                  "Durées jusqu'à 30 ans (360 mois)",
                  "Montant jusqu'à 700 000 €",
                  "Modulation des échéances possible",
                  "Différé d'amortissement pour VEFA",
                  "Garantie hypothécaire ou caution bancaire",
                  "Frais de notaire financés sur option",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", gap: "0.625rem", alignItems: "center" }}>
                    <Check size={16} style={{ color: "#8B5CF6", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.925rem", color: "var(--color-text-muted)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 style={{ marginBottom: "1.25rem" }}>Conditions d&apos;éligibilité</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
                {[
                  "Résidence fiscale en France",
                  "Revenus stables : CDI, fonctionnaire ou 2 bilans indépendant",
                  "Apport personnel conseillé : min. 10%",
                  "Taux d'endettement après crédit ≤ 35% (norme HCSF)",
                  "Reste à vivre suffisant selon composition du foyer",
                  "Absence d'incident bancaire grave récent",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", gap: "0.625rem", alignItems: "center" }}>
                    <Check size={16} style={{ color: "#8B5CF6", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.925rem", color: "var(--color-text-muted)" }}>{item}</span>
                  </div>
                ))}
              </div>

              <div className="alert alert-warning">
                <AlertTriangle size={16} style={{ flexShrink: 0 }} />
                <p style={{ fontSize: "0.85rem" }}>
                  <strong>Norme HCSF obligatoire :</strong> Depuis le 1er janvier 2022, le taux d&apos;endettement est
                  légalement limité à 35% des revenus nets, délai de 27 ans maximum pour les prêts immobiliers
                  (35 ans pour VEFA et CCMI). Cette norme s&apos;impose à toute banque.
                </p>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>Exemples représentatifs</h2>
            <p style={{ textAlign: "center", color: "var(--color-text-muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>
              Conformément à l&apos;article L313-1 du Code de la consommation
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
              {examples.map((ex, i) => (
                <div key={i} className="card" style={{ padding: "1.5rem" }}>
                  <h3 style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: "700", marginBottom: "1rem", color: "#5B21B6" }}>
                    {ex.amount.toLocaleString("fr-FR")} €
                  </h3>
                  {[
                    ["Durée", `${ex.months} mois`],
                    ["Taux débiteur fixe", `${ex.rate} %`],
                    ["TAEG fixe", `${ex.taeg} %`],
                    ["Mensualité hors ass.", `${ex.monthly.toFixed(2)} €`],
                    ["Assurance indicative", `${ex.insurance.toFixed(2)} €/mois`],
                    ["Coût total crédit", `${ex.totalCost.toLocaleString("fr-FR")} €`],
                  ].map(([l, v]) => (
                    <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "0.35rem 0", borderBottom: "1px solid var(--color-border-light)", fontSize: "0.875rem" }}>
                      <span style={{ color: "var(--color-text-muted)" }}>{l}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontWeight: "700" }}>{v}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="alert alert-info" style={{ marginTop: "1.25rem" }}>
              <HelpCircle size={16} style={{ flexShrink: 0 }} />
              <p style={{ fontSize: "0.8rem" }}>
                Exemples donnés à titre indicatif, sans frais de dossier, avec garantie hypothécaire.
                Assurance emprunteur non incluse dans le TAEG car facultative et soumise à délégation libre.
                Offre soumise à acceptation de votre dossier.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div style={{ background: "linear-gradient(135deg, #5B21B6, var(--color-primary))", borderRadius: "var(--radius-xl)", padding: "3rem", textAlign: "center" }}>
            <h2 style={{ color: "white", marginBottom: "0.75rem" }}>Votre projet immobilier commence ici</h2>
            <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: "1.75rem" }}>
              Simulez votre financement en 2 minutes, obtenez une réponse de principe en 24h.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/demande" className="btn btn-white btn-lg">
                Commencer ma demande
                <ChevronRight size={18} />
              </Link>
              <Link href="/simulateur" className="btn btn-lg" style={{ background: "rgba(255,255,255,0.15)", borderColor: "rgba(255,255,255,0.3)", color: "white" }}>
                Simuler d&apos;abord
              </Link>
            </div>
          </div>

          <div className="legal-banner" style={{ marginTop: "1.5rem" }}>
            <p style={{ fontSize: "0.75rem" }}>
              ⚠️ <strong>Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.</strong>
              Sous réserve d&apos;acceptation de votre dossier. Taux indicatifs. TAEG définitif communiqué dans l&apos;offre de prêt.
              Assurance emprunteur facultative, soumise à acceptation de l&apos;assureur.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
