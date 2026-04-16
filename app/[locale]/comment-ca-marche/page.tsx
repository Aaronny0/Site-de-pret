import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Clock, Home, User, Shield, HelpCircle, ChevronRight, Star, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Comment ça marche | FinancePro",
  description: "Découvrez le processus d'obtention d'un prêt avec FinancePro : simulation, dossier, étude, signature et versement en 5 étapes simples.",
};

const steps = [
  {
    n: 1,
    emoji: "⚡",
    title: "Simulation gratuite",
    duration: "2 minutes",
    color: "#3B82F6",
    desc: "Utilisez notre simulateur en ligne pour estimer vos mensualités et votre éligibilité. 100% gratuit, sans inscription, sans impact sur votre dossier bancaire.",
    details: [
      "Choisissez votre type de prêt",
      "Ajustez le montant et la durée",
      "Obtenez une mensualité et un TAEG indicatifs",
      "Évaluez votre taux d'endettement",
    ],
    cta: { label: "Démarrer la simulation", href: "/simulateur" },
  },
  {
    n: 2,
    emoji: "📄",
    title: "Constitution du dossier",
    duration: "10 minutes",
    color: "var(--color-accent)",
    desc: "Remplissez notre formulaire en ligne en 5 étapes guidées. Déposez vos documents de manière sécurisée (chiffrement AES-256). Tout se fait depuis votre smartphone ou ordinateur.",
    details: [
      "Formulaire guidé et intuitif",
      "Upload sécurisé des justificatifs",
      "Sauvegarde automatique en cours de saisie",
      "Signature électronique des autorisations",
    ],
    cta: { label: "Faire une demande", href: "/demande" },
  },
  {
    n: 3,
    emoji: "🔍",
    title: "Étude et analyse",
    duration: "24 heures ouvrées",
    color: "#F59E0B",
    desc: "Votre dossier est examiné par nos experts financiers. Nous consultons le FICP conformément à la réglementation. Un conseiller peut vous contacter pour des informations complémentaires.",
    details: [
      "Analyse humaine de votre dossier",
      "Consultation FICP (Banque de France)",
      "Comparaison de nos offres partenaires",
      "Votre conseiller dédié vous accompagne",
    ],
    cta: null,
  },
  {
    n: 4,
    emoji: "📧",
    title: "Offre de prêt & Délai légal",
    duration: "10 jours ouvrés minimum",
    color: "#8B5CF6",
    desc: "Si votre dossier est accepté, vous recevez l'offre de contrat de crédit par email. Vous bénéficiez d'un délai légal de 10 jours (crédit immo) ou 14 jours (crédit conso) pour prendre votre décision sans pression.",
    details: [
      "Offre de prêt détaillée (TAEG définitif)",
      "Tableau d'amortissement complet",
      "Délai légal de réflexion/rétractation",
      "Signature électronique sécurisée eIDAS",
    ],
    cta: null,
  },
  {
    n: 5,
    emoji: "💳",
    title: "Versement des fonds",
    duration: "48 heures après signature",
    color: "#10B981",
    desc: "Après signature de l'offre et à l'issue du délai légal, les fonds sont virés directement sur votre compte bancaire. Votre espace client vous permet de suivre l'évolution de votre prêt.",
    details: [
      "Virement bancaire sécurisé",
      "Accès à l'espace client en ligne",
      "Tableau de bord de remboursement",
      "Conseiller dédié pour la durée du prêt",
    ],
    cta: { label: "Mon espace client", href: "/espace-client" },
  },
];

const guarantees = [
  { icon: Shield, title: "100% sans engagement", desc: "Simulation et étude de dossier gratuites, sans obligation" },
  { icon: Zap, title: "Processus 100% digital", desc: "De la simulation au versement, tout en ligne" },
  { icon: Star, title: "Conseiller dédié", desc: "Un expert FinancePro vous accompagne à chaque étape" },
  { icon: Clock, title: "Réponse garantie 24h", desc: "Engagement contractuel sur le délai de réponse" },
];

export default function CommentCaMarchePage() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", padding: "4rem 0 3rem", textAlign: "center" }}>
        <div className="container">
          <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1rem" }}>
            Comment obtenir votre prêt ?
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "560px", margin: "0 auto", lineHeight: "1.7" }}>
            Un processus digital simple, transparent et rapide. De la simulation à la réception des fonds,
            nous vous guidons à chaque étape.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)", padding: "4rem 0 5rem" }}>
        <div className="container">

          {/* Guarantees */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{gap: "1.25rem", marginBottom: "4rem"}}>
            {guarantees.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ textAlign: "center", padding: "1.5rem 1rem" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "var(--radius-xl)", background: "rgba(0,200,150,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.875rem" }}>
                  <Icon size={24} style={{ color: "var(--color-accent)" }} />
                </div>
                <p style={{ fontWeight: "700", marginBottom: "0.4rem" }}>{title}</p>
                <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            {steps.map((step, i) => (
              <div
                key={step.n}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr",
                  gap: "2rem",
                  marginBottom: i < steps.length - 1 ? "0" : "0",
                  position: "relative",
                }}
              >
                {/* Timeline */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${step.color}25, ${step.color}15)`,
                      border: `2px solid ${step.color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.75rem",
                      flexShrink: 0,
                      position: "relative",
                      zIndex: 1,
                    }}
                    aria-hidden="true"
                  >
                    {step.emoji}
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{
                      width: "2px",
                      flexGrow: 1,
                      background: `linear-gradient(to bottom, ${step.color}50, ${steps[i + 1].color}30)`,
                      margin: "0.75rem 0",
                    }} aria-hidden="true" />
                  )}
                </div>

                {/* Content */}
                <div style={{ paddingBottom: i < steps.length - 1 ? "2.5rem" : "0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                    <h2 style={{ fontSize: "1.25rem", margin: 0 }}>
                      <span style={{ color: step.color, fontFamily: "var(--font-mono)", fontSize: "1rem", marginRight: "0.5rem", fontWeight: "800" }}>
                        {String(step.n).padStart(2, "0")}.
                      </span>
                      {step.title}
                    </h2>
                    <span className="badge" style={{ background: `${step.color}15`, color: step.color, border: `1px solid ${step.color}30` }}>
                      <Clock size={11} />
                      {step.duration}
                    </span>
                  </div>
                  <p style={{ color: "var(--color-text-muted)", lineHeight: "1.7", marginBottom: "1.25rem" }}>{step.desc}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2" style={{gap: "0.5rem", marginBottom: step.cta ? "1.25rem" : "0"}}>
                    {step.details.map((d) => (
                      <div key={d} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Check size={14} style={{ color: step.color, flexShrink: 0 }} />
                        <span style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>{d}</span>
                      </div>
                    ))}
                  </div>

                  {step.cta && (
                    <Link href={step.cta.href} className="btn btn-primary btn-sm" style={{ marginTop: "0.5rem" }}>
                      {step.cta.label}
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Documents checklist */}
          <div style={{ marginTop: "4rem", maxWidth: "900px", margin: "4rem auto 0" }}>
            <div className="card" style={{ padding: "2.5rem" }}>
              <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>📋 Les documents à préparer</h2>
              <div className="grid grid-cols-1 md:grid-cols-3" style={{gap: "1.25rem"}}>
                {[
                  { title: "Toujours requis", icon: "🆔", docs: ["CNI ou Passeport (recto/verso)", "Justificatif de domicile < 3 mois", "3 derniers relevés bancaires", "RIB du compte à créditer"] },
                  { title: "Revenus salariés", icon: "💼", docs: ["3 derniers bulletins de salaire", "Contrat de travail (CDI/CDD)", "Dernier avis d'imposition", "Attestation employeur (si CDD)"] },
                  { title: "Revenus indépendants", icon: "🏢", docs: ["2 derniers bilans comptables", "Kbis de moins de 3 mois", "2 derniers avis d'imposition", "Extrait compte professionnel"] },
                ].map(({ title, icon, docs }) => (
                  <div key={title} style={{ background: "var(--color-bg-alt)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
                    <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{icon}</div>
                    <h3 style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: "700", marginBottom: "0.875rem", color: "var(--color-text)" }}>{title}</h3>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      {docs.map((d) => (
                        <li key={d} style={{ display: "flex", gap: "0.4rem", alignItems: "flex-start", fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                          <Check size={12} style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "2px" }} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <h2 style={{ marginBottom: "1rem" }}>Prêt à démarrer ?</h2>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/simulateur" className="btn btn-primary btn-lg">
                Simuler mon prêt
                <ArrowRight size={18} />
              </Link>
              <Link href="/demande" className="btn btn-secondary btn-lg">
                Faire une demande
              </Link>
            </div>
            <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: "1rem" }}>
              ⚠️ Un crédit vous engage et doit être remboursé. Simulation non contractuelle, sans engagement.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
