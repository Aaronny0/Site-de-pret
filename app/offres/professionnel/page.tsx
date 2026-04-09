"use client";

import { useState } from "react";
import Link from "next/link";
import { Briefcase, Check, FileText, HelpCircle, ChevronRight, ArrowRight } from "lucide-react";

const examples = [
  { amount: 50000, months: 60, rate: 4.5, taeg: 4.85, monthly: 932.15, totalCost: 5929.00, totalDue: 55929.00 },
  { amount: 150000, months: 84, rate: 4.2, taeg: 4.55, monthly: 2065.20, totalCost: 23476.80, totalDue: 173476.80 },
  { amount: 300000, months: 120, rate: 4.0, taeg: 4.30, monthly: 3037.40, totalCost: 64488.00, totalDue: 364488.00 },
];

const plans = [
  {
    name: "Création / Reprise",
    rate: "dès 4,80%",
    taeg: "dès 5,20%",
    maxAmount: "100 000 €",
    maxDuration: "84 mois",
    features: ["Financez votre lancement", "Matériel ou fonds de commerce", "Accompagnement expert dédié"],
    highlighted: false,
  },
  {
    name: "Développement",
    rate: "dès 4,20%",
    taeg: "dès 4,55%",
    maxAmount: "500 000 €+",
    maxDuration: "120 mois",
    features: ["Investissements matériels", "Recrutement et BFR", "Conditions préférentielles", "Conseiller pro dédié"],
    highlighted: true,
  },
  {
    name: "Trésorerie",
    rate: "dès 5,50%",
    taeg: "dès 5,90%",
    maxAmount: "50 000 €",
    maxDuration: "36 mois",
    features: ["Décalage de caisse", "Financement BFR rapide", "Déblocage sous 48h", "Sans garantie lourde"],
    highlighted: false,
  },
];

const faq = [
  { q: "Quelles entreprises peuvent emprunter ?", a: "Toutes les formes juridiques (TPE, PME, auto-entrepreneurs, SAS, SARL) immatriculées en France et ayant au moins un bilan comptable (sauf offres spécifiques de création)." },
  { q: "Faut-il un apport personnel ?", a: "Un apport de 10% à 20% est généralement demandé pour une création d'entreprise ou l'achat d'un fonds de commerce. Pour des investissements de développement (matériel, véhicules), le financement peut souvent se faire à 100%." },
  { q: "Quelles garanties sont nécessaires ?", a: "Selon le montant et le type de projet, nous pouvons demander un nantissement du fonds de commerce, une caution personnelle (souvent limitée), ou faire appel à des fonds de garantie (BPI France, SIAGI)." },
  { q: "Quel est le délai d'étude du dossier ?", a: "Une pré-acceptation peut être donnée sous 48h ouvrées. L'accord définitif nécessite l'analyse complète de vos liasses fiscales (bilans) et de votre business plan." },
  { q: "Est-il possible d'avoir un différé d'amortissement ?", a: "Oui, un différé (franchise en capital) de 3 à 12 mois est souvent possible pour accompagner un lancement d'activité ou de gros travaux." },
];

export default function PretProfessionnelPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, rgba(139, 92, 246, 0.4) 100%)", padding: "4rem 0 3rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "center" }}>
            <div>
              <nav aria-label="Fil d'Ariane" style={{ marginBottom: "1.5rem" }}>
                <ol style={{ display: "flex", gap: "0.5rem", listStyle: "none", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                  <li><Link href="/" style={{ color: "rgba(255,255,255,0.5)" }}>Accueil</Link></li>
                  <li><ChevronRight size={12} style={{ display: "inline" }} /></li>
                  <li><Link href="/offres" style={{ color: "rgba(255,255,255,0.5)" }}>Nos offres</Link></li>
                  <li><ChevronRight size={12} style={{ display: "inline" }} /></li>
                  <li style={{ color: "#D8B4FE" }}>Prêt Professionnel</li>
                </ol>
              </nav>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "var(--radius-lg)", background: "rgba(139, 92, 246, 0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Briefcase size={28} style={{ color: "#C084FC" }} />
                </div>
                <span className="badge badge-success" style={{ background: "rgba(139, 92, 246, 0.3)", color: "white" }}>Pro & Entreprises</span>
              </div>
              <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", marginBottom: "1rem" }}>
                Le Crédit de votre Croissance
              </h1>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.1rem", lineHeight: "1.7", maxWidth: "550px" }}>
                Matériel, véhicules, trésorerie ou rachat de parts sociales. FinancePro accompagne les professionnels et les dirigeants dans tous leurs projets de développement.
              </p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "var(--radius-xl)", padding: "2rem", textAlign: "center", minWidth: "220px", backdropFilter: "blur(10px)" }}>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", marginBottom: "0.25rem" }}>Taux à partir de</p>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "3rem", fontWeight: "700", color: "#E9D5FF", lineHeight: "1" }}>
                4,20<span style={{ fontSize: "1.5rem" }}>%</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", marginTop: "0.25rem" }}>TAEG fixe dès 4,55% (HT)</p>
              <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", margin: "1rem 0" }} />
              <Link href="/simulateur" className="btn btn-primary btn-sm" style={{ width: "100%", background: "white", color: "var(--color-primary)" }}>
                Évaluer mon projet
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container">

          <div style={{ marginBottom: "4rem" }}>
            <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Des solutions pour chaque étape</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className="card"
                  style={{
                    padding: "2rem",
                    border: plan.highlighted ? "2px solid #A855F7" : "1px solid var(--color-border)",
                    position: "relative",
                    transform: plan.highlighted ? "scale(1.03)" : "none",
                  }}
                >
                  {plan.highlighted && (
                    <div style={{ position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)" }}>
                      <span className="badge badge-success" style={{ background: "#A855F7", color: "white" }}>Idéal PME</span>
                    </div>
                  )}
                  <h3 style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.5rem" }}>{plan.name}</h3>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.75rem", fontWeight: "700", color: "#A855F7", marginBottom: "0.25rem" }}>{plan.rate}</div>
                  <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "1.25rem" }}>TAEG {plan.taeg}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1.25rem" }}>
                    {[
                      { l: "Montant", v: plan.maxAmount },
                      { l: "Durée", v: plan.maxDuration },
                    ].map(({ l, v }) => (
                      <div key={l} style={{ background: "var(--color-bg-alt)", borderRadius: "var(--radius-sm)", padding: "0.5rem 0.625rem" }}>
                        <div style={{ fontSize: "0.7rem", color: "var(--color-text-muted)" }}>{l}</div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", fontWeight: "700" }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
                    {plan.features.map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
                        <Check size={14} style={{ color: "#A855F7", flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/demande" className={`btn ${plan.highlighted ? "btn-primary" : "btn-secondary"} btn-sm`} style={{ width: "100%", justifyContent: "center", background: plan.highlighted ? "#A855F7" : undefined, borderColor: plan.highlighted ? "#9333EA" : undefined }}>
                    Sélectionner
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", marginBottom: "4rem" }}>
            <div>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "1.25rem" }}>Les avantages FinancePro</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {[
                  "Prise en compte de tous les statuts (EURL, SAS, Libéraux...)",
                  "Partenariat avec la BPI pour sécuriser votre opération",
                  "Possibilité de différé partiel ou total la 1ère année",
                  "Expertise sur de nombreux secteurs d'activité",
                  "Un rendez-vous d'analyse stratégique offert",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                    <Check size={16} style={{ color: "#A855F7", flexShrink: 0, marginTop: "3px" }} />
                    <span style={{ fontSize: "0.925rem", color: "var(--color-text-muted)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "1.25rem" }}>Documents nécessaires (Phase 1)</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { icon: FileText, label: "Kbis & Statuts", desc: "Kbis de moins de 3 mois et statuts à jour" },
                  { icon: FileText, label: "Pièce d'identité", desc: "Du ou des dirigeants (recto/verso)" },
                  { icon: FileText, label: "Liasses fiscales", desc: "2 dernières années (ou prévisionnel pour les créations)" },
                  { icon: FileText, label: "Relevés de compte pros", desc: "3 derniers mois d'activité" },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.75rem", background: "var(--color-bg-alt)", borderRadius: "var(--radius-md)" }}>
                    <Icon size={16} style={{ color: "#C084FC", flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <p style={{ fontWeight: "600", fontSize: "0.9rem", marginBottom: "0.2rem" }}>{label}</p>
                      <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "4rem" }}>
            <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>Exemples d&apos;investissement</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", marginTop: "2rem" }}>
              {examples.map((ex, i) => (
                <div key={i} style={{ background: i === 1 ? "linear-gradient(135deg, #A855F7, #7E22CE)" : "var(--color-surface)", border: i === 1 ? "none" : "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "1.5rem", color: i === 1 ? "white" : "inherit" }}>
                  <h3 style={{ fontSize: "1rem", marginBottom: "1rem", color: i === 1 ? "white" : "var(--color-text)" }}>
                    Simulation {i + 1}
                  </h3>
                  {[
                    { l: "Montant", v: `${ex.amount.toLocaleString("fr-FR")} €` },
                    { l: "Durée", v: `${ex.months} mois` },
                    { l: "Taux débiteur fixe", v: `${ex.rate.toFixed(2)} %` },
                    { l: "Mensualité", v: `${ex.monthly.toFixed(2)} €` },
                  ].map(({ l, v }) => (
                     <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: `1px solid ${i === 1 ? "rgba(255,255,255,0.1)" : "var(--color-border-light)"}`, fontSize: "0.875rem" }}>
                      <span style={{ color: i === 1 ? "rgba(255,255,255,0.65)" : "var(--color-text-muted)" }}>{l}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontWeight: "700", color: i === 1 ? "white" : "var(--color-text)" }}>{v}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div style={{ maxWidth: "750px", margin: "0 auto 3rem" }}>
             <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Questions fréquentes — Prêt Pro</h2>
             <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
               {faq.map((item, i) => (
                 <div key={i} className="accordion-item">
                   <button className="accordion-trigger" onClick={() => setOpenFAQ(openFAQ === i ? null : i)} aria-expanded={openFAQ === i}>
                     {item.q}
                     <ChevronRight size={16} style={{ transform: openFAQ === i ? "rotate(90deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }} aria-hidden="true" />
                   </button>
                   {openFAQ === i && <div className="accordion-body">{item.a}</div>}
                 </div>
               ))}
             </div>
          </div>

          <div style={{ textAlign: "center", background: "linear-gradient(135deg, #7E22CE, #581C87)", borderRadius: "var(--radius-xl)", padding: "3rem 2rem" }}>
             <h2 style={{ color: "white", marginBottom: "0.75rem" }}>Prêt à accélérer votre croissance ?</h2>
             <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "1.75rem" }}>
               <Link href="/demande" className="btn btn-white btn-lg" style={{ color: "#7E22CE" }}>
                 <ArrowRight size={18} /> Faire une demande
               </Link>
             </div>
          </div>

        </div>
      </section>
    </>
  );
}
