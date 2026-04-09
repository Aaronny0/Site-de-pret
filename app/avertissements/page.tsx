import type { Metadata } from "next";
import Link from "next/link";
import { Scale, ArrowRight, Check, AlertTriangle, ChevronRight, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Avertissements sur les Risques du Crédit | FinancePro",
  description: "Avertissements légaux et risques liés aux opérations de crédit. Informations obligatoires conformément à la directive crédit consommateur 2008/48/CE.",
};

export default function AvertissementsPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-warning) 0%, #D97706 100%)", padding: "3.5rem 0 3rem", textAlign: "center" }}>
        <div className="container">
          <div style={{ width: "60px", height: "60px", borderRadius: "var(--radius-lg)", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
            <AlertTriangle size={28} style={{ color: "white" }} />
          </div>
          <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "0.5rem" }}>
            Avertissements sur les Risques du Crédit
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.9rem" }}>
            Informations obligatoires — Directive 2008/48/CE — Code de la consommation
          </p>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container" style={{ maxWidth: "820px" }}>

          {/* Main warning box */}
          <div style={{ background: "rgba(245,158,11,0.1)", border: "2px solid var(--color-warning)", borderRadius: "var(--radius-xl)", padding: "2.5rem", marginBottom: "2.5rem", textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️</div>
            <h2 style={{ fontSize: "1.5rem", color: "#92400E", marginBottom: "1rem", fontFamily: "var(--font-display)" }}>
              Un crédit vous engage et doit être remboursé.
              <br />Vérifiez vos capacités de remboursement avant de vous engager.
            </h2>
            <p style={{ fontSize: "1rem", color: "#78350F", fontWeight: "600" }}>
              Article L312-5 du Code de la consommation (Loi Lagarde n° 2010-737)
            </p>
          </div>

          <div className="card legal-content" style={{ padding: "3rem" }}>

            <h2>1. Risques généraux liés au crédit</h2>
            <p>
              Le recours au crédit n&apos;est pas sans risque. Avant de contracter un emprunt,
              vous devez en comprendre les implications financières et légales :
            </p>
            <ul>
              <li>Un crédit génère des intérêts qui augmentent le coût total de votre achat ou projet</li>
              <li>Votre capacité de remboursement peut évoluer (perte d&apos;emploi, maladie, séparation)</li>
              <li>Un remboursement insuffisant entraîne des pénalités de retard et inscription au FICP</li>
              <li>L&apos;endettement excessif peut mener au surendettement, procédure longue et contraignante</li>
            </ul>

            <h2>2. Avertissement taux d&apos;endettement</h2>
            <p>
              Depuis le 1er janvier 2022, le Haut Conseil de Stabilité Financière (HCSF) impose aux établissements
              de crédit de ne pas dépasser un taux d&apos;endettement de <strong>35%</strong> des revenus nets de l&apos;emprunteur,
              pour tous les crédits immobiliers.
            </p>
            <p>
              Pour les crédits à la consommation, aucun seuil légal n&apos;est imposé, mais l&apos;usage professionnel
              considère qu&apos;un taux d&apos;endettement supérieur à 35% constitue un signal d&apos;alerte.
            </p>
            <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: "var(--radius-md)", padding: "1.25rem" }}>
              <p style={{ fontWeight: "600", color: "#92400E" }}>
                Formule du taux d&apos;endettement :<br />
                <code style={{ fontFamily: "var(--font-mono)", fontSize: "1rem" }}>
                  Taux = (Mensualités totales / Revenus nets mensuels) × 100
                </code>
              </p>
            </div>

            <h2>3. Risque de taux variable</h2>
            <p>
              Si votre contrat prévoit un <strong>taux variable</strong>, vos mensualités peuvent augmenter
              en cas de hausse des taux directeurs de la Banque Centrale Européenne (BCE).
              Un scénario de hausse de 2 points peut augmenter significativement votre mensualité.
            </p>
            <p>
              FinancePro propose majoritairement des <strong>taux fixes</strong>, qui garantissent la stabilité
              de vos mensualités pendant toute la durée du contrat. Si un taux variable vous est proposé,
              le contrat inclut obligatoirement des exemples chiffrés de variation.
            </p>

            <h2>4. Risque de non-remboursement et inscription au FICP</h2>
            <p>
              En cas de défaut de paiement de 2 mensualités consécutives (ou d&apos;une somme équivalente),
              l&apos;établissement prêteur est en droit de :
            </p>
            <ul>
              <li>Vous inscrire au <strong>Fichier des Incidents de remboursement des Crédits aux Particuliers (FICP)</strong>, géré par la Banque de France</li>
              <li>Résilier le contrat de crédit et exiger le remboursement du solde restant</li>
              <li>Engager des procédures de recouvrement, pouvant conduire à une saisie</li>
            </ul>
            <p>
              L&apos;inscription au FICP dure jusqu&apos;à 5 ans ou jusqu&apos;au remboursement total de la dette,
              et limite fortement l&apos;accès aux crédits futurs.
            </p>

            <h2>5. Délai légal de réflexion et de rétractation</h2>
            <h3>5.1 Crédit à la consommation (art. L312-19 Code de la consommation)</h3>
            <p>
              Après réception de l&apos;offre de contrat de crédit, vous disposez d&apos;un délai de
              <strong> 14 jours calendaires</strong> (délai de rétractation) pour revenir sur votre décision,
              sans avoir à justifier votre choix et sans pénalités.
            </p>
            <h3>5.2 Crédit immobilier (art. L313-34 Code de la consommation)</h3>
            <p>
              Pour les crédits immobiliers, un délai de réflexion obligatoire de <strong>10 jours</strong> s&apos;applique.
              L&apos;acceptation de l&apos;offre ne peut intervenir avant l&apos;expiration de ce délai.
            </p>

            <h2>6. Coût total du crédit</h2>
            <p>
              Le coût total d&apos;un crédit dépasse le simple intérêt annoncé. Le TAEG (Taux Annuel Effectif Global)
              inclut tous les frais obligatoires mais n&apos;inclut généralement pas :
            </p>
            <ul>
              <li>L&apos;assurance emprunteur (si facultative)</li>
              <li>Les frais de notaire (crédit immobilier)</li>
              <li>Les frais d&apos;hypothèque ou de caution</li>
              <li>Les pénalités facultatives (remboursement anticipé)</li>
            </ul>

            <h2>7. Situation de surendettement</h2>
            <div style={{ background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: "var(--radius-md)", padding: "1.25rem" }}>
              <p>
                Si vous vous trouvez dans une situation de surendettement ou si vous anticipez des difficultés
                de remboursement, des solutions existent :
              </p>
              <ul>
                <li>
                  <strong>Banque de France — Numéro unique :</strong>{" "}
                  <a href="tel:3414" style={{ color: "var(--color-primary-light)" }}>34 14</a> (service gratuit)
                </li>
                <li>Commission de surendettement : dépôt de dossier possible dans toute succursale de la Banque de France</li>
                <li>Association de défense des consommateurs : UFC-Que Choisir, CLCV, etc.</li>
                <li>Médiateur bancaire de votre établissement prêteur</li>
              </ul>
            </div>

            <h2>8. Publicité et comparaison</h2>
            <p>
              Conformément à la directive 2008/48/CE et aux articles L312-4 et suivants du Code de la consommation,
              toute publicité pour un crédit doit faire figurer de manière claire le TAEG, un exemple représentatif,
              et la mention d&apos;avertissement légale.
            </p>
            <p>
              Les simulations effectuées sur notre site sont des estimations indicatives et non contractuelles.
              Seule l&apos;offre de contrat de crédit signée a valeur contractuelle.
            </p>

            <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/informations-precontractuelles" className="btn btn-secondary btn-sm">
                <HelpCircle size={14} />
                Infos précontractuelles
              </Link>
              <Link href="/simulateur" className="btn btn-ghost btn-sm">
                <ArrowRight size={14} />
                Simuler un crédit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
