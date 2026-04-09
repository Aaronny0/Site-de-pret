"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Check, FileText, HelpCircle, ChevronRight, ArrowRight, Star } from "lucide-react";

const examples = [
  { amount: 5000, months: 24, rate: 6.5, taeg: 6.98, monthly: 222.10, totalCost: 330.40, totalDue: 5330.40 },
  { amount: 10000, months: 60, rate: 5.5, taeg: 5.98, monthly: 191.74, totalCost: 1504.40, totalDue: 11504.40 },
  { amount: 20000, months: 84, rate: 5.0, taeg: 5.48, monthly: 280.50, totalCost: 3562.00, totalDue: 23562.00 },
];

const plans = [
  {
    name: "Standard",
    rate: "dès 6,50%",
    taeg: "dès 6,98%",
    maxAmount: "15 000 €",
    maxDuration: "60 mois",
    features: ["Réponse 24h", "Sans justificatif", "Remboursement anticipé"],
    highlighted: false,
  },
  {
    name: "Confort",
    rate: "dès 5,50%",
    taeg: "dès 5,98%",
    maxAmount: "35 000 €",
    maxDuration: "84 mois",
    features: ["Réponse 24h", "Sans justificatif", "Remboursement anticipé", "Pause mensualités*", "Conseiller dédié"],
    highlighted: true,
  },
  {
    name: "Premium",
    rate: "dès 4,80%",
    taeg: "dès 5,25%",
    maxAmount: "75 000 €",
    maxDuration: "120 mois",
    features: ["Réponse 4h", "Conseiller dédié", "Remboursement anticipé", "Pause mensualités*", "Assurance incluse", "Délai personnalisé"],
    highlighted: false,
  },
];

const faq = [
  { q: "Qui peut demander un prêt personnel ?", a: "Toute personne physique majeure, résidant en France, avec des revenus réguliers. CDI, CDD, indépendants, fonctionnaires et retraités peuvent faire une demande." },
  { q: "Faut-il justifier l'utilisation des fonds ?", a: "Non. Le prêt personnel est non affecté : vous utilisez les fonds comme vous le souhaitez sans avoir à le justifier." },
  { q: "Quel est le délai de versement ?", a: "Après signature de l'offre et à l'issue du délai légal de rétractation de 14 jours, les fonds sont versés sous 48h ouvrées." },
  { q: "Puis-je rembourser par anticipation ?", a: "Oui, total ou partiel. Si le capital restant dépasse 10 000€ sur 12 mois consécutifs, des indemnités peuvent s'appliquer (art. L312-34 du Code de la consommation)." },
  { q: "Mon prêt sera-t-il à taux fixe ?", a: "Oui, tous nos prêts personnels sont à taux débiteur fixe. Votre mensualité ne changera jamais pendant toute la durée du crédit." },
  { q: "La demande a-t-elle un impact sur mon dossier bancaire ?", a: "La simulation n'a aucun impact. La demande complète donne lieu à une consultation du FICP en phase finale d'étude, conformément à la réglementation." },
  { q: "Puis-je faire une demande en couple ?", a: "Oui, vous pouvez déposer une demande en co-emprunteurs. Les deux revenus seront pris en compte, ce qui peut améliorer vos conditions." },
  { q: "Que se passe-t-il si ma demande est refusée ?", a: "En cas de refus, nous vous en informons par écrit et vous pouvez demander la communication des critères ayant conduit à ce refus, conformément à l'art. L312-17 du Code de la consommation." },
];

export default function PretPersonnelPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, #1E4D7A 100%)", padding: "4rem 0 3rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "center" }}>
            <div>
              <nav aria-label="Fil d'Ariane" style={{ marginBottom: "1.5rem" }}>
                <ol style={{ display: "flex", gap: "0.5rem", listStyle: "none", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                  <li><Link href="/" style={{ color: "rgba(255,255,255,0.5)" }}>Accueil</Link></li>
                  <li><ChevronRight size={12} style={{ display: "inline" }} /></li>
                  <li><Link href="/offres" style={{ color: "rgba(255,255,255,0.5)" }}>Nos offres</Link></li>
                  <li><ChevronRight size={12} style={{ display: "inline" }} /></li>
                  <li style={{ color: "var(--color-accent)" }}>Prêt Personnel</li>
                </ol>
              </nav>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "var(--radius-lg)", background: "rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <User size={28} style={{ color: "#60A5FA" }} />
                </div>
                <span className="badge badge-success">Réponse en 24h</span>
              </div>
              <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", marginBottom: "1rem" }}>
                Prêt Personnel FinancePro
              </h1>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.1rem", lineHeight: "1.7", maxWidth: "550px" }}>
                Financez tous vos projets sans justificatif d&apos;utilisation. Des taux compétitifs, un processus
                100% digital et un accompagnement humain.
              </p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "var(--radius-xl)", padding: "2rem", textAlign: "center", minWidth: "220px" }}>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", marginBottom: "0.25rem" }}>Taux à partir de</p>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "3rem", fontWeight: "700", color: "var(--color-accent)", lineHeight: "1" }}>
                5,50<span style={{ fontSize: "1.5rem" }}>%</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", marginTop: "0.25rem" }}>TAEG fixe dès 5,98%</p>
              <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", margin: "1rem 0" }} />
              <Link href="/simulateur" className="btn btn-primary btn-sm" style={{ width: "100%" }}>
                Simuler mon prêt
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container">

          {/* Plans */}
          <div style={{ marginBottom: "4rem" }}>
            <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Choisissez votre formule</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className="card"
                  style={{
                    padding: "2rem",
                    border: plan.highlighted ? "2px solid var(--color-accent)" : "1px solid var(--color-border)",
                    position: "relative",
                    transform: plan.highlighted ? "scale(1.03)" : "none",
                  }}
                >
                  {plan.highlighted && (
                    <div style={{ position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)" }}>
                      <span className="badge badge-success">Recommandé</span>
                    </div>
                  )}
                  <h3 style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.5rem" }}>{plan.name}</h3>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.75rem", fontWeight: "700", color: "var(--color-accent)", marginBottom: "0.25rem" }}>{plan.rate}</div>
                  <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "1.25rem" }}>TAEG {plan.taeg}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1.25rem" }}>
                    {[
                      { l: "Montant max", v: plan.maxAmount },
                      { l: "Durée max", v: plan.maxDuration },
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
                        <Check size={14} style={{ color: "var(--color-accent)", flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/demande" className={`btn ${plan.highlighted ? "btn-primary" : "btn-secondary"} btn-sm`} style={{ width: "100%", justifyContent: "center" }}>
                    Choisir {plan.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", marginBottom: "4rem" }}>
            {/* Eligibility */}
            <div>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "1.25rem" }}>À qui s&apos;adresse ce prêt ?</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {[
                  "Personnes physiques majeures résidant en France",
                  "Salariés en CDI, CDD (min. 6 mois d'ancienneté)",
                  "Fonctionnaires et agents de l'État",
                  "Indépendants (min. 2 bilans annuels)",
                  "Retraités avec pension régulière",
                  "Revenus nets mensuels supérieurs à 1 000 €",
                  "Taux d'endettement inférieur à 35%",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                    <Check size={16} style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "3px" }} />
                    <span style={{ fontSize: "0.925rem", color: "var(--color-text-muted)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "1.25rem" }}>Documents nécessaires</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { icon: FileText, label: "Pièce d'identité", desc: "CNI ou passeport en cours de validité (recto/verso)" },
                  { icon: FileText, label: "Justificatif de revenus", desc: "3 derniers bulletins de salaire ou 2 derniers bilans" },
                  { icon: FileText, label: "Relevés bancaires", desc: "3 derniers relevés de compte bancaire principal" },
                  { icon: FileText, label: "Justificatif de domicile", desc: "Facture de moins de 3 mois ou avis d'imposition" },
                  { icon: FileText, label: "RIB", desc: "Relevé d'Identité Bancaire du compte à créditer" },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.75rem", background: "var(--color-bg-alt)", borderRadius: "var(--radius-md)" }}>
                    <Icon size={16} style={{ color: "var(--color-primary-light)", flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <p style={{ fontWeight: "600", fontSize: "0.9rem", marginBottom: "0.2rem" }}>{label}</p>
                      <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Examples représentatifs */}
          <div style={{ marginBottom: "4rem" }}>
            <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>Exemples représentatifs</h2>
            <p style={{ textAlign: "center", color: "var(--color-text-muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>
              Conformément à l&apos;article L312-28 du Code de la consommation
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
              {examples.map((ex, i) => (
                <div
                  key={i}
                  style={{
                    background: i === 1 ? "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))" : "var(--color-surface)",
                    border: i === 1 ? "none" : "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                    padding: "1.5rem",
                    color: i === 1 ? "white" : "inherit",
                  }}
                >
                  <h3 style={{ fontSize: "1rem", marginBottom: "1rem", color: i === 1 ? "white" : "var(--color-text)" }}>
                    Exemple {i + 1}
                  </h3>
                  {[
                    { l: "Montant", v: `${ex.amount.toLocaleString("fr-FR")} €` },
                    { l: "Durée", v: `${ex.months} mois` },
                    { l: "Taux débiteur fixe", v: `${ex.rate.toFixed(2)} %` },
                    { l: "TAEG fixe", v: `${ex.taeg.toFixed(2)} %` },
                    { l: "Mensualité", v: `${ex.monthly.toFixed(2)} €` },
                    { l: "Coût total du crédit", v: `${ex.totalCost.toFixed(2)} €` },
                    { l: "Montant total dû", v: `${ex.totalDue.toFixed(2)} €` },
                  ].map(({ l, v }) => (
                    <div
                      key={l}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0.4rem 0",
                        borderBottom: `1px solid ${i === 1 ? "rgba(255,255,255,0.1)" : "var(--color-border-light)"}`,
                        fontSize: "0.875rem",
                      }}
                    >
                      <span style={{ color: i === 1 ? "rgba(255,255,255,0.65)" : "var(--color-text-muted)" }}>{l}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontWeight: "700", color: i === 1 ? "var(--color-accent)" : "var(--color-text)" }}>{v}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Mandatory legal note */}
            <div
              className="alert alert-info"
              style={{ marginTop: "1.25rem" }}
            >
              <HelpCircle size={16} style={{ flexShrink: 0, marginTop: "2px" }} aria-hidden="true" />
              <div>
                <p style={{ fontSize: "0.8rem", lineHeight: "1.7" }}>
                  <strong>Exemple représentatif obligatoire :</strong> Pour un prêt personnel de 10 000 € sur 60 mois au taux débiteur fixe de 5,50% par an.
                  TAEG fixe de 5,98%. Mensualité : 191,74 €. Coût total du crédit : 1 504,40 €. Montant total dû : 11 504,40 €.
                  Assurance facultative non incluse. Offre réservée aux personnes physiques majeures résidant en France.
                  Sous réserve d&apos;acceptation de votre dossier par FinancePro.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div style={{ maxWidth: "750px", margin: "0 auto 3rem" }}>
            <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Questions fréquentes — Prêt Personnel</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {faq.map((item, i) => (
                <div key={i} className="accordion-item">
                  <button
                    className="accordion-trigger"
                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                    aria-expanded={openFAQ === i}
                    aria-controls={`pp-faq-${i}`}
                  >
                    {item.q}
                    <ChevronRight size={16} style={{ transform: openFAQ === i ? "rotate(90deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }} aria-hidden="true" />
                  </button>
                  {openFAQ === i && (
                    <div className="accordion-body" id={`pp-faq-${i}`}>
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center", background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))", borderRadius: "var(--radius-xl)", padding: "3rem 2rem" }}>
            <h2 style={{ color: "white", marginBottom: "0.75rem" }}>Prêt à lancer votre demande ?</h2>
            <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "1.75rem" }}>10 minutes pour constituer votre dossier. Réponse de principe en 24h.</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/demande" className="btn btn-white btn-lg">
                Commencer ma demande
                <ArrowRight size={18} />
              </Link>
              <Link href="/simulateur" className="btn btn-lg" style={{ background: "rgba(255,255,255,0.15)", borderColor: "rgba(255,255,255,0.3)", color: "white" }}>
                Simuler d&apos;abord
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="legal-banner" style={{ marginTop: "2rem" }}>
            <p style={{ fontSize: "0.75rem" }}>
              ⚠️ <strong>Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.</strong>
              Assurance facultative non incluse dans les exemples. Sous réserve d&apos;acceptation de votre dossier par FinancePro SAS, IOBSP enregistré
              à l&apos;ORIAS sous le n° 00-000-000. Taux indicatifs — offre non contractuelle.
              * Pause mensualités sous conditions contractuelles.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
