import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Informations Précontractuelles | FinancePro",
  description: "Fiche d'informations précontractuelles standardisées européennes (FISE) et informations précontractuelles conformes à la directive crédit consommateur 2008/48/CE.",
};

export default function InfoPrecontractuellesPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", padding: "3.5rem 0 3rem", textAlign: "center" }}>
        <div className="container">
          <div style={{ width: "60px", height: "60px", borderRadius: "var(--radius-lg)", background: "rgba(0,200,150,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
            <BookOpen size={28} style={{ color: "var(--color-accent)" }} />
          </div>
          <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "0.5rem" }}>
            Informations Précontractuelles
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.875rem" }}>
            Conformément à la Directive 2008/48/CE et aux articles L312-12 à L312-18 du Code de la consommation
          </p>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <div className="card legal-content" style={{ padding: "3rem" }}>

            <div className="alert alert-info" style={{ marginBottom: "2rem" }}>
              <HelpCircle size={16} style={{ flexShrink: 0 }} />
              <p style={{ fontSize: "0.875rem" }}>
                Ces informations vous sont fournies avant la conclusion de tout contrat de crédit, conformément
                à l&apos;article L312-12 du Code de la consommation. Elles constituent la Fiche d&apos;Informations
                Standardisées Européennes (FISE).
              </p>
            </div>

            <h2>1. Identité et coordonnées du prêteur/intermédiaire</h2>
            <table>
              <thead><tr><th>Information</th><th>Détail</th></tr></thead>
              <tbody>
                {[
                  ["Raison sociale", "FinancePro SAS"],
                  ["Statut", "Intermédiaire en Opérations de Banque et en Services de Paiement (IOBSP)"],
                  ["ORIAS", "N° 00-000-000 — consultable sur www.orias.fr"],
                  ["Contrôle prudentiel", "ACPR — 4 place de Budapest, 75436 Paris Cedex 09"],
                  ["Adresse", "1 rue de la Finance, 75001 Paris"],
                  ["Email", "contact@financepro.fr"],
                  ["Téléphone", "01 00 00 00 00 (non surtaxé)"],
                  ["Rémunération", "Commission versée par les établissements prêteurs partenaires"],
                ].map(([k, v]) => (<tr key={k}><td style={{ fontWeight: "600" }}>{k}</td><td>{v}</td></tr>))}
              </tbody>
            </table>

            <h2>2. Caractéristiques principales des crédits proposés</h2>
            <p>FinancePro peut vous proposer, par l&apos;intermédiaire de ses partenaires agréés, les produits suivants :</p>
            <table>
              <thead><tr><th>Type</th><th>Montant</th><th>Durée</th><th>Taux indicatif</th></tr></thead>
              <tbody>
                {[
                  ["Prêt personnel", "1 000 — 75 000 €", "12 — 84 mois", "Dès 5,50%"],
                  ["Prêt immobilier", "50 000 — 700 000 €", "60 — 360 mois", "Dès 3,40%"],
                  ["Prêt professionnel", "5 000 — 500 000 €", "12 — 120 mois", "Dès 4,80%"],
                  ["Rachat de crédit", "10 000 — 300 000 €", "12 — 180 mois", "Dès 4,20%"],
                  ["Prêt travaux", "1 000 — 75 000 €", "12 — 84 mois", "Dès 4,90%"],
                  ["Prêt auto", "3 000 — 60 000 €", "12 — 84 mois", "Dès 4,50%"],
                ].map(([t, m, d, r]) => (<tr key={t}><td>{t}</td><td>{m}</td><td>{d}</td><td style={{ fontFamily: "var(--font-mono)", fontWeight: "700", color: "var(--color-accent)" }}>{r}</td></tr>))}
              </tbody>
            </table>

            <h2>3. Taux Annuel Effectif Global (TAEG)</h2>
            <p>
              Le TAEG est la mesure du coût total du crédit. Il comprend :
            </p>
            <ul>
              <li>Le taux d&apos;intérêt débiteur</li>
              <li>Les frais de dossier obligatoires</li>
              <li>Tous les frais liés au crédit qui sont connus au moment de la conclusion du contrat</li>
              <li>Le coût de l&apos;assurance si elle est obligatoire pour l&apos;obtention du crédit</li>
            </ul>
            <p>
              Le TAEG est exprimé en pourcentage annuel du montant total du crédit. Il varie en fonction
              du montant, de la durée, du type de crédit et du profil de l&apos;emprunteur.
            </p>

            <h2>4. Coût total du crédit</h2>
            <p>
              Le coût total comprend tous les paiements (intérêts + frais) que vous effectuerez,
              déduction faite du capital emprunté. Il est détaillé dans chaque offre de prêt.
            </p>

            <h2>5. Fréquence et nombre des paiements</h2>
            <p>
              Les remboursements s&apos;effectuent mensuellement par prélèvement bancaire automatique, le 1er de chaque mois
              (sauf condition particulière). Le nombre de mensualités correspond à la durée en mois du crédit.
            </p>

            <h2>6. Garanties exigées</h2>
            <ul>
              <li><strong>Crédit à la consommation :</strong> aucune garantie réelle. La décision repose sur l&apos;analyse de solvabilité.</li>
              <li><strong>Crédit immobilier :</strong> hypothèque, privilège de prêteur de deniers (PPD), ou caution bancaire (ex : Crédit Logement).</li>
              <li><strong>Crédit professionnel :</strong> caution personnelle du dirigeant et/ou garantie BPI France selon les cas.</li>
            </ul>

            <h2>7. Droit de rétractation</h2>
            <div style={{ background: "rgba(0,200,150,0.06)", border: "1px solid rgba(0,200,150,0.25)", borderRadius: "var(--radius-md)", padding: "1.25rem" }}>
              <ul style={{ margin: 0 }}>
                <li>
                  <strong>Crédit à la consommation (art. L312-19 C. conso.) :</strong>{" "}
                  14 jours calendaires à compter de l&apos;acceptation de l&apos;offre.
                </li>
                <li>
                  <strong>Crédit immobilier (art. L313-34 C. conso.) :</strong>{" "}
                  Délai de réflexion obligatoire de 10 jours — vous ne pouvez pas accepter avant ce délai.
                </li>
              </ul>
            </div>

            <h2>8. Remboursement anticipé</h2>
            <p>
              Vous pouvez rembourser par anticipation à tout moment, totalement ou partiellement.
              Pour les remboursements supérieurs à 10 000 € sur 12 mois consécutifs, une indemnité peut s&apos;appliquer :
              maximum 1% du capital remboursé (0,5% si la durée restante est inférieure à 1 an).
            </p>

            <h2>9. Consultation des fichiers d&apos;incidents</h2>
            <p>
              Avant de vous accorder un crédit, nous sommes légalement tenus de consulter le Fichier des Incidents
              de remboursement des Crédits aux Particuliers (FICP) tenu par la Banque de France
              (art. L333-4 C. conso.).
            </p>

            <h2>10. Rémunération de FinancePro</h2>
            <p>
              FinancePro SAS perçoit une commission de la part des établissements prêteurs partenaires.
              Cette commission est sans frais pour vous. Le montant et le mode de calcul de cette commission
              vous seront communiqués sur demande et figurent dans la Fiche IOBSP remise lors de tout entretien.
            </p>

            <h2>11. Établissements prêteurs partenaires</h2>
            <p>
              FinancePro travaille avec plusieurs établissements prêteurs agréés par l&apos;ACPR. La liste de nos
              partenaires est disponible sur demande auprès de votre conseiller. Pour chaque demande de crédit,
              nous vous préciserons avec quel établissement l&apos;offre est formulée.
            </p>

            <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/avertissements" className="btn btn-secondary btn-sm">
                Avertissements sur les risques
              </Link>
              <Link href="/simulateur" className="btn btn-primary btn-sm">
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
