import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contrôle par l'ACPR | FinancePro",
};

export default function AcprPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", padding: "3.5rem 0 3rem", textAlign: "center" }}>
         <div className="container"><h1 style={{ color: "white" }}>Supervision ACPR</h1></div>
      </section>
      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <div className="card legal-content" style={{ padding: "3rem" }}>
             <h2>Qu'est-ce que l'ACPR ?</h2>
             <p>
              L'Autorité de Contrôle Prudentiel et de Résolution (ACPR) est un organe indépendant rattaché à la Banque de France. 
              L'ACPR est chargée de veiller à la préservation de la stabilité du système financier et à la protection des clients, assurés, adhérents et bénéficiaires des personnes soumises à son contrôle.
             </p>

             <h2>Soumission de FinancePro au contrôle de l'ACPR</h2>
             <p>
               En tant que professionnel distribuant des crédits et de l'assurance en France, l'activité de FinancePro SAS est soumise au contrôle et aux réglementations édictées par l'ACPR. L'ACPR vérifie nos pratiques commerciales, l'information délivrée à la clientèle, l'absence de publicité trompeuse et le traitement des réclamations.
             </p>

             <h2>Contact de l'Autorité (exclusivement postal)</h2>
             <p>
               Autorité de Contrôle Prudentiel et de Résolution (ACPR)<br />
               4 Place de Budapest<br />
               CS 92459<br />
               75436 PARIS CEDEX 09
             </p>

             <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                <a href="https://acpr.banque-france.fr/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ display: "inline-flex" }}>
                  Visiter le site de l'ACPR
                </a>
             </div>
          </div>
        </div>
      </section>
    </>
  );
}
