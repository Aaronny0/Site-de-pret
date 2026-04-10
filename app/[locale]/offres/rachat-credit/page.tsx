"use client";

import { useState } from "react";
import Link from "next/link";
import { RefreshCw, Check, FileText, HelpCircle, ChevronRight, ArrowRight } from "lucide-react";
import { useDictionary } from "@/components/DictionaryProvider";
import { getLocalizedPath, type AppLocale } from "@/lib/routes";

const examples = [
  { amount: 30000, months: 96, rate: 5.5, taeg: 5.92, monthly: 386.40, totalCost: 7094.40, totalDue: 37094.40 },
  { amount: 50000, months: 120, rate: 5.2, taeg: 5.60, monthly: 535.10, totalCost: 14212.00, totalDue: 64212.00 },
];

const plans_fr = [
  {
    name: "Regroupement Conso",
    rate: "dès 5,20%",
    taeg: "dès 5,60%",
    maxAmount: "100 000 €",
    maxDuration: "144 mois",
    features: ["Rassemblez vos prêts personnels", "Réduction des mensualités", "Trésorerie supplémentaire incluse"],
    highlighted: true,
  },
  {
    name: "Regroupement Immo",
    rate: "dès 3,80%",
    taeg: "dès 4,10%",
    maxAmount: "1 500 000 €",
    maxDuration: "300 mois",
    features: ["Prêts conso + prêt immobilier", "Garantie hypothécaire", "Baisse massive de l'endettement"],
    highlighted: false,
  },
];

const plans_es = [
  {
    name: "Reagrupación Consumo",
    rate: "desde 5,20%",
    taeg: "desde 5,60%",
    maxAmount: "100.000 €",
    maxDuration: "144 meses",
    features: ["Reúna sus préstamos personales", "Reducción de las cuotas", "Liquidez adicional incluida"],
    highlighted: true,
  },
  {
    name: "Reagrupación Hipotecaria",
    rate: "desde 3,80%",
    taeg: "desde 4,10%",
    maxAmount: "1.500.000 €",
    maxDuration: "300 meses",
    features: ["Préstamos consumo + hipoteca", "Garantía hipotecaria", "Reducción masiva del endeudamiento"],
    highlighted: false,
  },
];

const faq_fr = [
  { q: "Qu'est-ce que le rachat de crédit ?", a: "Le rachat de crédits (ou regroupement de crédits) consiste à rassembler plusieurs emprunts en cours (conso, immo, dettes) en un seul et unique crédit. L'objectif est d'allonger la durée de remboursement pour réduire significativement le montant de la nouvelle mensualité unique." },
  { q: "Est-ce qu'on peut y inclure des dettes non bancaires ?", a: "Oui, il est possible d'inclure des retards d'impôts, des dettes familiales ou des découverts bancaires dans l'opération de regroupement de crédits." },
  { q: "Quel est le coût de l'opération ?", a: "L'opération inclut des frais de dossier, de mandat ou de courtage, ainsi que d'éventuelles indemnités de remboursement anticipé (IRA) à payer à vos anciennes banques. Tous ces frais sont inclus dans le nouveau financement et indiqués dans le TAEG." },
  { q: "Dois-je changer de banque ?", a: "Non. Contrairement au rachat de prêt immobilier sec, le regroupement de crédits n'implique pas la domiciliation de vos revenus d'ouverture de compte dans la nouvelle banque partenaire, la mensualité sera simplement prélevée sur votre compte habituel." },
];

const faq_es = [
  { q: "¿Qué es la reagrupación de créditos?", a: "La reagrupación de créditos consiste en unificar varios préstamos en curso (consumo, hipotecarios, deudas) en uno solo. El objetivo es alargar el plazo de amortización para reducir significativamente el importe de la nueva cuota única." },
  { q: "¿Se pueden incluir deudas no bancarias?", a: "Sí, es posible incluir atrasos de impuestos, deudas con familiares o descubiertos bancarios en la operación de reagrupación." },
  { q: "¿Cuál es el coste de la operación?", a: "La operación incluye gastos de estudio y posible corretaje, así como eventuales comisiones por cancelación anticipada a pagar a sus antiguos bancos. Todos estos gastos se incluyen en la nueva financiación y se reflejan en la TAE." },
  { q: "¿Tengo que cambiar de banco?", a: "No. A diferencia de un simple cambio de hipoteca, la reagrupación de créditos no implica obligatoriamente la domiciliación de su nómina en el nuevo banco colaborador; la cuota se domiciliará en su cuenta habitual." },
];

export default function RachatCreditPage() {
  const { lang } = useDictionary();
  const locale = lang as AppLocale;
  const plans = lang === 'fr' ? plans_fr : plans_es;
  const faq = lang === 'fr' ? faq_fr : faq_es;
  
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, rgba(202, 138, 4, 0.5) 100%)", padding: "4rem 0 3rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "center" }}>
            <div>
              <nav aria-label="Fil d'Ariane" style={{ marginBottom: "1.5rem" }}>
                <ol style={{ display: "flex", gap: "0.5rem", listStyle: "none", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                  <li><Link href={getLocalizedPath('home', locale)} style={{ color: "rgba(255,255,255,0.5)" }}>{lang === 'fr' ? 'Accueil' : 'Inicio'}</Link></li>
                  <li><ChevronRight size={12} style={{ display: "inline" }} /></li>
                  <li><Link href={getLocalizedPath('offers', locale)} style={{ color: "rgba(255,255,255,0.5)" }}>{lang === 'fr' ? 'Nos offres' : 'Nuestras ofertas'}</Link></li>
                  <li><ChevronRight size={12} style={{ display: "inline" }} /></li>
                  <li style={{ color: "#FDE047" }}>{lang === 'fr' ? 'Rachat de Crédit' : 'Reagrupación de Créditos'}</li>
                </ol>
              </nav>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "var(--radius-lg)", background: "rgba(250, 204, 21, 0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <RefreshCw size={28} style={{ color: "#FACC15" }} />
                </div>
                <span className="badge badge-success" style={{ background: "rgba(234, 179, 8, 0.4)", color: "white" }}>{lang === 'fr' ? "Jusqu'à -60% de mensualités*" : "Hasta un -60% en cuotas*"}</span>
              </div>
              <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", marginBottom: "1rem" }}>
                {lang === 'fr' ? 'Respirez de nouveau' : 'Vuelva a respirar'}
              </h1>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.1rem", lineHeight: "1.7", maxWidth: "550px" }}>
                {lang === 'fr' ? "Regroupez tous vos crédits en une seule mensualité allégée. Réduisez votre taux d'endettement et financez un nouveau projet." : "Reagrupe todos sus préstamos en una única cuota reducida. Controle su endeudamiento y financie un nuevo proyecto."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container">
          <div style={{ marginBottom: "4rem" }}>
             <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>{lang === 'fr' ? 'Nos solutions de regroupement' : 'Nuestras soluciones de reagrupación'}</h2>
             <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem", maxWidth: "800px", margin: "0 auto" }}>
               {plans.map((plan) => (
                 <div key={plan.name} className="card" style={{ padding: "2.5rem", border: plan.highlighted ? "2px solid #EAB308" : "1px solid var(--color-border)", position: "relative" }}>
                   {plan.highlighted && (
                     <div style={{ position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)" }}>
                       <span className="badge badge-success" style={{ background: "#EAB308", color: "#422006" }}>{lang === 'fr' ? 'Le plus demandé' : 'Más solicitado'}</span>
                     </div>
                   )}
                   <h3 style={{ fontFamily: "var(--font-body)", fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem", textAlign: "center" }}>{plan.name}</h3>
                   <div style={{ fontFamily: "var(--font-mono)", fontSize: "2rem", fontWeight: "700", color: "#EAB308", marginBottom: "0.5rem", textAlign: "center" }}>{plan.rate}</div>
                   <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "1.5rem", textAlign: "center" }}>TAEG {plan.taeg}</p>
                   
                   <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "2rem" }}>
                     {plan.features.map((f) => (
                       <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
                         <Check size={16} style={{ color: "#EAB308", flexShrink: 0, marginTop: "2px" }} />
                         {f}
                       </li>
                     ))}
                   </ul>
                   <Link href={getLocalizedPath('request', locale)} className={`btn ${plan.highlighted ? "btn-primary" : "btn-secondary"}`} style={{ width: "100%", justifyContent: "center", background: plan.highlighted ? "#EAB308" : undefined, color: plan.highlighted ? "#422006" : undefined, borderColor: plan.highlighted ? "#CA8A04" : undefined }}>
                     {lang === 'fr' ? 'Étude sans engagement' : 'Estudio sin compromiso'}
                   </Link>
                 </div>
               ))}
             </div>
          </div>

          <div style={{ maxWidth: "750px", margin: "0 auto 3rem" }}>
             <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>{lang === 'fr' ? 'Vos questions — Rachat de Crédit' : 'Preguntas frecuentes — Reagrupación'}</h2>
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
          
          <div className="legal-banner" style={{ marginTop: "2rem" }}>
            <p style={{ fontSize: "0.75rem" }}>
              {lang === 'fr' ? "⚠️ La baisse de la mensualité entraîne l'allongement de la durée de remboursement et majore le coût total du crédit. *Exemple de diminution de mensualité constaté par rapport aux anciennes mensualités cumulées d'un client." : "⚠️ La reducción de la cuota mensual conlleva la ampliación del plazo de amortización y el aumento del coste total del crédito. *Ejemplo orientativo de rebaja constado frente a mensualidades previas conjuntas."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
