import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vérifier notre immatriculation ORIAS | FinancePro",
};

export default function OriasPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", padding: "3.5rem 0 3rem", textAlign: "center" }}>
         <div className="container"><h1 style={{ color: "white" }}>À propos de l'ORIAS</h1></div>
      </section>
      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <div className="card legal-content" style={{ padding: "3rem" }}>
             <h2>Qu'est-ce que l'ORIAS ?</h2>
             <p>L'ORIAS est le Registre unique des intermédiaires en assurance, banque et finance. C’est un organisme parapublic placé sous la tutelle de la Direction du Trésor. Son rôle est d'homologuer les intermédiaires financiers en vérifiant qu'ils remplissent les conditions légales (capacité professionnelle, honorabilité, assurance de responsabilité civile professionnelle, caution financière).</p>
             
             <h2>Immatriculation FinancePro</h2>
             <p>
               FinancePro SAS atteste de son inscription sur le registre tenu par l'ORIAS, dans la catégorie <strong>Intermédiaire en Opérations de Banque et en Services de Paiement (IOBSP)</strong> sous le numéro d'immatriculation : <strong>00-000-000</strong>.
             </p>

             <h2>Comment vérifier ?</h2>
             <p>
               La transparence est au centre de notre métier. Vous pouvez vérifier la validité de notre immatriculation et son renouvellement annuel directement sur le site officiel du gouvernement :
             </p>
             <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: "inline-flex" }}>
                  Consulter le site officiel orias.fr
                </a>
             </div>
          </div>
        </div>
      </section>
    </>
  );
}
