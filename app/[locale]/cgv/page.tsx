import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import { useDictionary } from "@/components/DictionaryProvider";
import { type AppLocale } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente et de Services | FinancePro",
  description: "Conditions générales encadrant nos prestations d'intermédiation (IOBSP) bancaire.",
};

export default function CGVPage() {
  const { lang, dict } = useDictionary();

  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", padding: "3.5rem 0 3rem", textAlign: "center" }}>
         <div className="container">
          <div style={{ width: "60px", height: "60px", borderRadius: "var(--radius-lg)", background: "rgba(0,200,150,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
            <FileText size={28} style={{ color: "var(--color-accent)" }} />
          </div>
           <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "0.75rem" }}>
             {lang === 'fr' ? 'Conditions Générales de Service' : 'Condiciones Generales de Servicio'}
           </h1>
         </div>
      </section>
      
      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <div className="card legal-content" style={{ padding: "3rem" }}>
             <h2>{lang === 'fr' ? '1. Nature de la prestation' : '1. Naturaleza del servicio'}</h2>
             <p>
               {lang === 'fr' ? "FinancePro agit en tant qu'Intermédiaire en Opérations de Banque et en Services de Paiement (IOBSP), soumis à l'Article L.519-1 du Code monétaire et financier. Notre mission est de présenter, proposer ou aider à la conclusion d'opérations de banque entre les Clients et nos Établissements Partenaires." : "FinancePro actúa como Intermediario en Operaciones Bancarias y Servicios de Pago. Nuestra misión es presentar, proponer o asistir en la conclusión de operaciones bancarias entre los Clientes y nuestros Establecimientos Asociados."}
             </p>

             <h2>{lang === 'fr' ? '2. Aucun versement avant déblocage (Loi MURCEF)' : '2. Ningún pago antes del desembolso (Ley aplicable)'}</h2>
             <p style={{ fontWeight: "700", color: "var(--color-danger)", background: "rgba(239, 68, 68, 0.05)", padding: "1rem", borderRadius: "10px", borderLeft: "4px solid var(--color-danger)" }}>
               {lang === 'fr' ? "« Aucun versement, de quelque nature que ce soit, ne peut être exigé d'un particulier, avant l'obtention d'un ou plusieurs prêts d'argent. » (Article L321-2 du Code de la consommation)" : "«Ningún pago, de cualquier naturaleza, puede ser exigido a un particular, antes de la obtención de uno o varios préstamos de dinero.» (Artículo equivalente aplicable)"}
             </p>

             <h2>{lang === 'fr' ? '3. Rémunération' : '3. Remuneración'}</h2>
             <p>
               {lang === 'fr' ? "La rémunération de FinancePro SAS peut être constituée :" : "La remuneración de FinancePro puede estar formada por:"}
               <br />
               - {lang === 'fr' ? "D'une commission versée par l'établissement de crédit prêteur." : "Una comisión pagada por el establecimiento de crédito prestamista."}
               <br />
               - {lang === 'fr' ? "D'éventuels frais de mandat de recherche de capitaux payés par le Client (précisés systématiquement dans un document d'information précontractuelle avant toute démarche)." : "Posibles gastos de mandato de búsqueda de capital pagados por el Cliente (especificados siempre en un documento de información precontractual)."}
               <br />
               {lang === 'fr' ? "Le cumul des deux est possible, dans la limite stricte de la réglementation, et est obligatoirement inclus dans le calcul du TAEG." : "La acumulación de ambas es posible, dentro de los límites de la normativa, y se incluye obligatoriamente en el cálculo de la TAE."}
             </p>

             <h2>{lang === 'fr' ? "4. Indépendance et Conflits d'intérêt" : '4. Independencia y Conflictos de Interés'}</h2>
             <p>
               {lang === 'fr' ? "FinancePro SAS atteste ne pas être soumis à une obligation d'exclusivité avec un ou plusieurs établissements de crédit. FinancePro ne détient aucune participation directe ou indirecte supérieure à 10% des droits de vote ou du capital d'un établissement de crédit, et vice versa." : "FinancePro certifica no estar sujeto a una obligación de exclusividad con uno o varios establecimientos de crédito. FinancePro no posee ninguna participación directa o indirecta superior al 10% de los derechos de voto o del capital de una entidad de crédito, y viceversa."}
             </p>

             <h2>{lang === 'fr' ? '5. Droit de Rétractation' : '5. Derecho de Desistimiento'}</h2>
             <p>
               {lang === 'fr' ? "Pour tout contrat de crédit (conso, rachat), vous disposez d'un délai légal de réflexion de 14 jours calendaires révolus à compter de l'acceptation de l'offre (Article L312-19). Pour les prêts immobiliers, il y a un délai de réflexion incompressible de 10 jours avant signature." : "Para cualquier contrato de crédito al consumo, dispone de un plazo legal de desistimiento de 14 días naturales desde la aceptación de la oferta. Para los préstamos hipotecarios, existe un periodo de reflexión imperativo previo a la firma."}
             </p>
          </div>
        </div>
      </section>
    </>
  );
}
