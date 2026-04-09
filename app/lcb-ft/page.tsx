import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avertissements et Lutte contre la fraude | FinancePro",
};

export default function LCBFTPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", padding: "3.5rem 0 3rem", textAlign: "center" }}>
         <div className="container"><h1 style={{ color: "white" }}>LCB-FT & Sécurité</h1></div>
      </section>
      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <div className="card legal-content" style={{ padding: "3rem" }}>
             <h2>1. Conformité LCB-FT</h2>
             <p>
               En tant qu'établissement financier assujetti, FinancePro a mis en place des dispositifs internes 
               afin de se conformer à la réglementation relative à la Lutte Contre le Blanchiment de capitaux 
               et le Financement du Terrorisme (LCB-FT - Directive (UE) 2015/849).
             </p>

             <h2>2. Vérification d'identité (KYC)</h2>
             <p>
               Avant la signature de tout contrat, nous appliquons un dispositif "Know Your Customer". 
               Nous devons vérifier l'identité de nos clients, la cohérence de la demande, ainsi que l'origine des fonds.
               C'est pourquoi une pièce d'identité et un justificatif de domicile récents vous sont obligatoirement demandés.
             </p>

             <h2>3. Sanctions pécuniaires et embargos</h2>
             <p>
               Nos processus incluent un contrôle de vos informations personnelles avec les listes de gels des avoirs tenues par la Direction Générale du Trésor. En cas de détection positive, FinancePro a l'obligation légale de bloquer l'opération et d'en informer immédiatement TRACFIN.
             </p>
          </div>
        </div>
      </section>
    </>
  );
}
