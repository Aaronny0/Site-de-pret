import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente et de Services | FinancePro",
  description: "Conditions générales encadrant nos prestations d'intermédiation (IOBSP) bancaire.",
};

export default function CGVPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", padding: "3.5rem 0 3rem", textAlign: "center" }}>
         <div className="container">
          <div style={{ width: "60px", height: "60px", borderRadius: "var(--radius-lg)", background: "rgba(0,200,150,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
            <FileText size={28} style={{ color: "var(--color-accent)" }} />
          </div>
           <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "0.75rem" }}>
             Conditions Générales de Service
           </h1>
         </div>
      </section>
      
      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <div className="card legal-content" style={{ padding: "3rem" }}>
             <h2>1. Nature de la prestation</h2>
             <p>
               FinancePro agit en tant qu'Intermédiaire en Opérations de Banque et en Services de Paiement (IOBSP), soumis à l'Article L.519-1 du Code monétaire et financier. Notre mission est de présenter, proposer ou aider à la conclusion d'opérations de banque entre les Clients et nos Établissements Partenaires.
             </p>

             <h2>2. Aucun versement avant déblocage (Loi MURCEF)</h2>
             <p style={{ fontWeight: "700", color: "var(--color-danger)", background: "rgba(239, 68, 68, 0.05)", padding: "1rem", borderRadius: "10px", borderLeft: "4px solid var(--color-danger)" }}>
               « Aucun versement, de quelque nature que ce soit, ne peut être exigé d'un particulier, avant l'obtention d'un ou plusieurs prêts d'argent. » (Article L321-2 du Code de la consommation)
             </p>

             <h2>3. Rémunération</h2>
             <p>
               La rémunération de FinancePro SAS peut être constituée :
               - D'une commission versée par l'établissement de crédit prêteur.
               - D'éventuels frais de mandat de recherche de capitaux payés par le Client (précisés systématiquement dans un document d'information précontractuelle avant toute démarche).
               Le cumul des deux est possible, dans la limite stricte de la réglementation, et est obligatoirement inclus dans le calcul du TAEG.
             </p>

             <h2>4. Indépendance et Conflits d'intérêt</h2>
             <p>
               FinancePro SAS atteste ne pas être soumis à une obligation d'exclusivité avec un ou plusieurs établissements de crédit. FinancePro ne détient aucune participation directe ou indirecte supérieure à 10% des droits de vote ou du capital d'un établissement de crédit, et vice versa.
             </p>

             <h2>5. Droit de Rétractation</h2>
             <p>
               Pour tout contrat de crédit (conso, rachat), vous disposez d'un délai légal de réflexion de 14 jours calendaires révolus à compter de l'acceptation de l'offre (Article L312-19). Pour les prêts immobiliers, il y a un délai de réflexion incompressible de 10 jours avant signature.
             </p>
          </div>
        </div>
      </section>
    </>
  );
}
