"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calculator,
  ArrowRight,
  Info,
  User,
  Home,
  Briefcase,
  Car,
  Wrench,
  RefreshCw,
  HelpCircle,
  ChevronDown,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import {
  calculateMonthlyPayment,
  calculateTAEG,
  getIndicativeRate,
  calculateTotalCost,
  calculateTotalDue,
  calculateDebtRatio,
  calculateEligibilityScore,
  generateAmortizationTable,
  formatCurrency,
} from "@/lib/loanCalculations";
import { useDictionary } from "@/components/DictionaryProvider";
import { getLocalizedPath, type AppLocale } from "@/lib/routes";

const loanTypeOptions_es = [
  { id: "personnel", label: "Préstamo Personal", icon: User, desc: "Financiación libre" },
  { id: "immobilier", label: "Préstamo Hipotecario", icon: Home, desc: "Adquisición e inversión" },
  { id: "professionnel", label: "Préstamo Pro", icon: Briefcase, desc: "Pymes, autónomos" },
  { id: "rachat", label: "Reagrupación", icon: RefreshCw, desc: "Reagrupación de créditos" },
  { id: "travaux", label: "Obras", icon: Wrench, desc: "Renovación y eco-obras" },
  { id: "auto", label: "Auto", icon: Car, desc: "Nuevo, ocasión y leasing" },
];

const loanTypeOptions_fr = [
  { id: "personnel", label: "Prêt Personnel", icon: User, desc: "Financement libre" },
  { id: "immobilier", label: "Prêt Immobilier", icon: Home, desc: "Acquisition & investissement" },
  { id: "professionnel", label: "Prêt Pro", icon: Briefcase, desc: "TPE, PME, indépendants" },
  { id: "rachat", label: "Rachat", icon: RefreshCw, desc: "Regroupement de crédits" },
  { id: "travaux", label: "Travaux", icon: Wrench, desc: "Rénovation & éco-travaux" },
  { id: "auto", label: "Auto", icon: Car, desc: "Neuf, occasion & LOA" },
];

const statusOptions_es = [
  { id: "cdi", label: "Indefinido" },
  { id: "cdd", label: "Temporal" },
  { id: "independant", label: "Autónomo" },
  { id: "fonctionnaire", label: "Funcionario" },
  { id: "retraite", label: "Jubilado" },
  { id: "sans-emploi", label: "Desempleado" },
];

const statusOptions_fr = [
  { id: "cdi", label: "CDI" },
  { id: "cdd", label: "CDD" },
  { id: "independant", label: "Indépendant" },
  { id: "fonctionnaire", label: "Fonctionnaire" },
  { id: "retraite", label: "Retraité" },
  { id: "sans-emploi", label: "Sans emploi" },
];

function TooltipIcon({ text }: { text: string }) {
  return (
    <div className="tooltip-wrapper" style={{ display: "inline-flex" }}>
      <HelpCircle size={14} style={{ color: "var(--color-text-muted)", cursor: "help" }} aria-label="Aide" />
      <span className="tooltip" role="tooltip">{text}</span>
    </div>
  );
}

export default function SimulateurPage() {
  const { dict, lang } = useDictionary();
  const locale = lang as AppLocale;
  const loanTypeOptions = lang === 'fr' ? loanTypeOptions_fr : loanTypeOptions_es;
  const statusOptions = lang === 'fr' ? statusOptions_fr : statusOptions_es;
  const [loanType, setLoanType] = useState("personnel");
  const [amount, setAmount] = useState(15000);
  const [months, setMonths] = useState(60);
  const [status, setStatus] = useState("cdi");
  const [income, setIncome] = useState(3000);
  const [charges, setCharges] = useState(500);
  const [showFullAmort, setShowFullAmort] = useState(false);

  const rate = getIndicativeRate(loanType, months, amount);
  const monthly = calculateMonthlyPayment(amount, rate, months);
  const taeg = calculateTAEG(rate, loanType, months, amount);
  const totalCost = calculateTotalCost(monthly, months, amount);
  const totalDue = calculateTotalDue(monthly, months);
  const debtRatio = calculateDebtRatio(monthly, charges, income);
  const eligibility = calculateEligibilityScore(income, monthly, charges, status);
  const amortTable = generateAmortizationTable(amount, rate, months, showFullAmort ? months : 3);

  const amountProgress = ((amount - 1000) / (75000 - 1000)) * 100;
  const monthsProgress = ((months - 12) / (120 - 12)) * 100;
  const incomeProgress = ((income - 500) / (15000 - 500)) * 100;
  const chargesProgress = ((charges - 0) / (5000 - 0)) * 100;

  const debtRatioColor =
    debtRatio > 40 ? "var(--color-danger)" : debtRatio > 33 ? "var(--color-warning)" : "var(--color-accent)";
  const eligibilityColor =
    eligibility > 70 ? "var(--color-accent)" : eligibility > 40 ? "var(--color-warning)" : "var(--color-danger)";
  const eligibilityLabel =
    eligibility > 70 ? (lang === 'fr' ? "Éligibilité probable" : "Elegibilidad probable") : eligibility > 40 ? (lang === 'fr' ? "Éligibilité possible" : "Elegibilidad posible") : (lang === 'fr' ? "Dossier compliqué" : "Expediente complicado");

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)",
          padding: "4rem 0 3rem",
        }}
        aria-labelledby="simulator-title"
      >
        <div className="container" style={{ textAlign: "center" }}>
          <span className="badge" style={{ background: "rgba(0,200,150,0.15)", color: "var(--color-accent)", border: "1px solid rgba(0,200,150,0.3)", marginBottom: "1.25rem" }}>
            <Calculator size={12} />
            {lang === 'fr' ? 'Simulateur avancé' : 'Simulador avanzado'}
          </span>
          <h1
            id="simulator-title"
            style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1rem" }}
          >
            {lang === 'fr' ? 'Calculez votre prêt en temps réel' : 'Calcule su préstamo en tiempo real'}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "560px", margin: "0 auto", lineHeight: "1.7" }}>
            {lang === 'fr' ? 'Simulation gratuite et sans engagement. Ajustez les paramètres et voyez vos mensualités s\'adapter instantanément.' : 'Simulación gratuita y sin compromiso. Ajuste los parámetros y vea sus cuotas adaptarse instantáneamente.'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "2rem", alignItems: "start" }}>

            {/* Left — Inputs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

              {/* Step 1 — Your project */}
              <div className="card" style={{ padding: "2rem" }}>
                <h2
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    fontWeight: "700",
                    color: "var(--color-text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: "var(--color-accent)",
                      color: "white",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                      fontWeight: "700",
                      flexShrink: 0,
                    }}
                  >
                    1
                  </span>
                  {lang === 'fr' ? 'Votre projet' : 'Su proyecto'}
                </h2>

                {/* Loan Type */}
                <div style={{ marginBottom: "2rem" }}>
                  <label style={{ fontSize: "0.9rem", fontWeight: "600", display: "block", marginBottom: "0.75rem", color: "var(--color-text)" }}>
                    {dict?.simulator?.loan_type || (lang === 'fr' ? 'Type de prêt' : 'Tipo de préstamo')}
                  </label>
                  <div
                    style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.625rem" }}
                    role="radiogroup"
                    aria-label="Type de prêt"
                  >
                    {loanTypeOptions.map(({ id, label, icon: Icon, desc }) => (
                      <button
                        key={id}
                        role="radio"
                        aria-checked={loanType === id}
                        onClick={() => setLoanType(id)}
                        style={{
                          padding: "0.875rem 0.75rem",
                          borderRadius: "var(--radius-md)",
                          border: `2px solid ${loanType === id ? "var(--color-accent)" : "var(--color-border)"}`,
                          background: loanType === id ? "rgba(0,200,150,0.06)" : "var(--color-surface)",
                          cursor: "pointer",
                          textAlign: "center",
                          transition: "all 0.2s",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        <Icon size={20} style={{ color: loanType === id ? "var(--color-accent)" : "var(--color-text-muted)", margin: "0 auto 0.4rem" }} aria-hidden="true" />
                        <div style={{ fontSize: "0.8rem", fontWeight: "600", color: loanType === id ? "var(--color-primary)" : "var(--color-text)" }}>
                          {label}
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "var(--color-text-muted)" }}>{desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount */}
                <div style={{ marginBottom: "2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      {dict?.simulator?.amount || (lang === 'fr' ? 'Montant souhaité' : 'Importe deseado')}
                      <TooltipIcon text={lang === 'fr' ? "Montant que vous souhaitez emprunter, hors assurance." : "Importe que desea pedir prestado, sin seguro."} />
                    </label>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Math.min(75000, Math.max(1000, Number(e.target.value))))}
                        style={{
                          width: "110px",
                          padding: "0.4rem 0.625rem",
                          border: "1.5px solid var(--color-border)",
                          borderRadius: "var(--radius-sm)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "1rem",
                          fontWeight: "700",
                          color: "var(--color-primary)",
                          textAlign: "right",
                        }}
                        aria-label="Montant du prêt en euros"
                      />
                      <span style={{ color: "var(--color-text-muted)", fontWeight: "600" }}>€</span>
                    </div>
                  </div>
                  <input
                    type="range" min={1000} max={75000} step={500} value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="form-range"
                    style={{ "--progress": `${amountProgress}%` } as React.CSSProperties}
                    aria-label="Montant du prêt"
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
                    <span>1 000 €</span><span>75 000 €</span>
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      {dict?.simulator?.duration || (lang === 'fr' ? 'Durée de remboursement' : 'Duración del reembolso')}
                      <TooltipIcon text={lang === 'fr' ? "Durée en mois sur laquelle vous souhaitez rembourser votre prêt." : "Duración en meses en la que desea reembolsar su préstamo."} />
                    </label>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: "700", color: "var(--color-primary)", fontSize: "1rem" }}>
                      {months} {dict?.common?.months || 'meses'}
                    </span>
                  </div>
                  <input
                    type="range" min={12} max={120} step={6} value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    className="form-range"
                    style={{ "--progress": `${monthsProgress}%` } as React.CSSProperties}
                    aria-label="Durée du prêt en mois"
                  />
                  <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
                    {[12, 24, 36, 60, 84, 120].map((m) => (
                      <button
                        key={m}
                        onClick={() => setMonths(m)}
                        style={{
                          padding: "0.3rem 0.75rem",
                          borderRadius: "var(--radius-full)",
                          border: `1.5px solid ${months === m ? "var(--color-accent)" : "var(--color-border)"}`,
                          background: months === m ? "var(--color-accent)" : "transparent",
                          color: months === m ? "white" : "var(--color-text-muted)",
                          fontSize: "0.8rem",
                          cursor: "pointer",
                          fontFamily: "var(--font-body)",
                          fontWeight: "500",
                          transition: "all 0.2s",
                        }}
                      >
                        {m} {dict?.common?.months || 'meses'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 2 — Your profile */}
              <div className="card" style={{ padding: "2rem" }}>
                <h2
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    fontWeight: "700",
                    color: "var(--color-text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: "var(--color-primary-light)",
                      color: "white",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                      fontWeight: "700",
                      flexShrink: 0,
                    }}
                  >
                    2
                  </span>
                  {lang === 'fr' ? 'Votre profil' : 'Su perfil'}
                </h2>

                {/* Status */}
                <div style={{ marginBottom: "1.75rem" }}>
                  <label className="form-label" style={{ marginBottom: "0.625rem", display: "block" }}>
                    {dict?.simulator?.status_label || (lang === 'fr' ? 'Situation professionnelle' : 'Situación profesional')}
                  </label>
                  <div
                    style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}
                    role="radiogroup"
                    aria-label="Situation professionnelle"
                  >
                    {statusOptions.map(({ id, label }) => (
                      <button
                        key={id}
                        role="radio"
                        aria-checked={status === id}
                        onClick={() => setStatus(id)}
                        style={{
                          padding: "0.625rem 0.5rem",
                          borderRadius: "var(--radius-md)",
                          border: `1.5px solid ${status === id ? "var(--color-primary-light)" : "var(--color-border)"}`,
                          background: status === id ? "rgba(42,95,158,0.08)" : "var(--color-surface)",
                          cursor: "pointer",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.85rem",
                          fontWeight: status === id ? "600" : "400",
                          color: status === id ? "var(--color-primary)" : "var(--color-text-muted)",
                          transition: "all 0.15s",
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Income */}
                <div style={{ marginBottom: "1.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      {dict?.simulator?.income_label || (lang === 'fr' ? 'Revenus nets mensuels' : 'Ingresos netos mensuales')}
                      <TooltipIcon text={lang === 'fr' ? "Vos revenus nets après impôts." : "Sus ingresos netos después de impuestos."} />
                    </label>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: "700", color: "var(--color-primary)", fontSize: "1rem" }}>
                      {income.toLocaleString(lang === 'fr' ? "fr-FR" : "es-ES")} €
                    </span>
                  </div>
                  <input
                    type="range" min={500} max={15000} step={100} value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="form-range"
                    style={{ "--progress": `${incomeProgress}%` } as React.CSSProperties}
                    aria-label="Revenus nets mensuels"
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
                    <span>500 €</span><span>15 000 €</span>
                  </div>
                </div>

                {/* Charges */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      {dict?.simulator?.charges_label || (lang === 'fr' ? 'Charges mensuelles actuelles' : 'Gastos mensuales actuales')}
                      <TooltipIcon text={lang === 'fr' ? "Loyer, crédits en cours, pensions alimentaires versées, etc." : "Alquiler, créditos en curso, pensiones alimenticias, etc."} />
                    </label>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: "700", color: "var(--color-text-muted)", fontSize: "1rem" }}>
                      {charges.toLocaleString(lang === 'fr' ? "fr-FR" : "es-ES")} €
                    </span>
                  </div>
                  <input
                    type="range" min={0} max={5000} step={50} value={charges}
                    onChange={(e) => setCharges(Number(e.target.value))}
                    className="form-range"
                    style={{ "--progress": `${chargesProgress}%` } as React.CSSProperties}
                    aria-label="Charges mensuelles actuelles"
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
                    <span>0 €</span><span>5 000 €</span>
                  </div>
                </div>
              </div>

              {/* Amortization Table */}
              <div className="card" style={{ padding: "2rem" }}>
                <h3 style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: "700", marginBottom: "1.25rem" }}>
                  {lang === 'fr' ? "Tableau d'amortissement simplifié" : 'Tabla de amortización simplificada'}
                </h3>
                <div style={{ overflowX: "auto" }}>
                  <table className="data-table" style={{ fontSize: "0.85rem" }} aria-label="Tableau d'amortissement">
                    <thead>
                      <tr>
                        <th>{lang === 'fr' ? 'Mois' : 'Mes'}</th>
                        <th>{lang === 'fr' ? 'Mensualité' : 'Cuota'}</th>
                        <th>{lang === 'fr' ? 'Intérêts' : 'Intereses'}</th>
                        <th>{lang === 'fr' ? 'Capital' : 'Capital'}</th>
                        <th>{lang === 'fr' ? 'Capital restant' : 'Capital restante'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {amortTable.map((row) => (
                        <tr key={row.month}>
                          <td style={{ fontFamily: "var(--font-mono)", fontWeight: "600" }}>{row.month}</td>
                          <td style={{ fontFamily: "var(--font-mono)" }}>{formatCurrency(row.payment)}</td>
                          <td style={{ fontFamily: "var(--font-mono)", color: "var(--color-danger)" }}>{formatCurrency(row.interest)}</td>
                          <td style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)" }}>{formatCurrency(row.principal)}</td>
                          <td style={{ fontFamily: "var(--font-mono)" }}>{formatCurrency(row.remaining)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {!showFullAmort && months > 3 && (
                  <button
                    onClick={() => setShowFullAmort(true)}
                    style={{
                      width: "100%",
                      marginTop: "0.75rem",
                      padding: "0.75rem",
                      background: "var(--color-bg-alt)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      fontFamily: "var(--font-body)",
                      color: "var(--color-primary)",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <ChevronDown size={16} />
                    {lang === 'fr' ? `Voir les ${months - 3} lignes restantes` : `Ver las ${months - 3} líneas restantes`}
                  </button>
                )}
              </div>
            </div>

            {/* Right — Results (sticky) */}
            <div style={{ position: "sticky", top: "1rem" }}>
              <div className="card" style={{ padding: "0", overflow: "hidden" }}>
                {/* Result header */}
                <div
                  style={{
                    background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
                    padding: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                    {dict?.simulator?.monthly_payment || (lang === 'fr' ? 'Mensualité estimée' : 'Cuota mensual estimada')}
                  </p>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "3rem",
                      fontWeight: "700",
                      color: "var(--color-accent)",
                      lineHeight: "1",
                      marginBottom: "0.5rem",
                    }}
                    aria-live="polite"
                    aria-label={`Mensualité estimée : ${formatCurrency(monthly)} par mois`}
                  >
                    {formatCurrency(monthly)}
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>{dict?.common?.per_month || '/mes'}</p>
                </div>

                <div style={{ padding: "1.5rem" }}>
                  {/* Key figures */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "1.5rem" }}>
                    {[
                      { label: lang === 'fr' ? "TAEG indicatif" : "TAE indicativa", value: `${taeg.toFixed(2)} %`, info: lang === 'fr' ? "Taux Annuel Effectif Global" : "Tasa Anual Equivalente" },
                      { label: lang === 'fr' ? "Taux débiteur" : "Tipo deudor", value: `${rate.toFixed(2)} %`, info: lang === 'fr' ? "Taux débiteur annuel fixe indicatif" : "Tipo deudor anual fijo indicativo" },
                      { label: lang === 'fr' ? "Coût total du crédit" : "Coste total del crédito", value: formatCurrency(totalCost), info: lang === 'fr' ? "Intérêts uniquement, hors assurance" : "Solo intereses, sin seguro" },
                      { label: lang === 'fr' ? "Montant total dû" : "Importe total adeudado", value: formatCurrency(totalDue), info: lang === 'fr' ? "Capital + intérêts (hors assurance)" : "Capital + intereses (sin seguro)" },
                    ].map(({ label, value, info }) => (
                      <div
                        key={label}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0.75rem",
                          background: "var(--color-bg-alt)",
                          borderRadius: "var(--radius-md)",
                          gap: "0.5rem",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <span style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>{label}</span>
                          <div className="tooltip-wrapper">
                            <Info size={12} style={{ color: "var(--color-text-light)", cursor: "help" }} />
                            <span className="tooltip" role="tooltip">{info}</span>
                          </div>
                        </div>
                        <span style={{ fontFamily: "var(--font-mono)", fontWeight: "700", fontSize: "0.9rem", color: "var(--color-text)", flexShrink: 0 }}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Debt Ratio */}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <span style={{ fontSize: "0.875rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        {dict?.simulator?.debt_ratio || (lang === 'fr' ? "Taux d'endettement" : 'Tasa de endeudamiento')}
                        <div className="tooltip-wrapper">
                          <Info size={12} style={{ color: "var(--color-text-light)", cursor: "help" }} />
                          <span className="tooltip" role="tooltip">Recommandation HCSF : ne pas dépasser 35% de vos revenus nets.</span>
                        </div>
                      </span>
                      <span style={{ fontFamily: "var(--font-mono)", fontWeight: "700", color: debtRatioColor }}>
                        {debtRatio.toFixed(1)} %
                      </span>
                    </div>
                    <div className="progress-container">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${Math.min(100, debtRatio)}%`,
                          background: `linear-gradient(90deg, var(--color-accent), ${debtRatioColor})`,
                        }}
                        role="progressbar"
                        aria-valuenow={debtRatio}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Taux d'endettement : ${debtRatio.toFixed(1)}%`}
                      />
                    </div>
                    {debtRatio > 35 && (
                      <p style={{ fontSize: "0.75rem", color: "var(--color-warning)", marginTop: "0.375rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <AlertCircle size={12} />
                        {lang === 'fr' ? "Taux d'endettement élevé (recommandation : 35%)" : 'Tasa de endeudamiento elevada (recomendación: 35%)'}
                      </p>
                    )}
                  </div>

                  {/* Eligibility */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <span style={{ fontSize: "0.875rem", fontWeight: "600" }}>{lang === 'fr' ? 'Éligibilité indicative' : 'Elegibilidad indicativa'}</span>
                      <span style={{ fontSize: "0.8rem", fontWeight: "700", color: eligibilityColor }}>
                        {eligibilityLabel}
                      </span>
                    </div>
                    <div className="eligibility-gauge">
                      <div
                        className="eligibility-fill"
                        style={{ width: `${eligibility}%` }}
                        role="progressbar"
                        aria-valuenow={eligibility}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Score d'éligibilité : ${eligibility}%`}
                      />
                    </div>
                    <p style={{ fontSize: "0.725rem", color: "var(--color-text-muted)", marginTop: "0.375rem" }}>
                      {lang === 'fr' ? 'Indicateur non contractuel basé sur les paramètres saisis.' : 'Indicador no contractual basado en los parámetros introducidos.'}
                    </p>
                  </div>

                  {/* CTA */}
                  <Link href={getLocalizedPath('request', locale)} className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                    {lang === 'fr' ? 'Faire une vraie demande' : 'Hacer una solicitud real'}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Legal Banner */}
              <div className="legal-banner" style={{ marginTop: "1rem" }}>
                <p style={{ fontSize: "0.75rem", lineHeight: "1.6" }}>
                  <strong>⚠️ {lang === 'fr' ? 'Simulation non contractuelle.' : 'Simulación no contractual.'}</strong> {lang === 'fr' ? 'Les taux affichés sont des taux indicatifs. Le TAEG définitif sera communiqué dans votre offre de contrat de crédit.' : 'Las tasas mostradas son indicativas. La TAE definitiva se comunicará en su oferta de contrato de crédito.'}
                  <br />
                  <strong>{lang === 'fr' ? 'Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.' : 'Un crédito le compromete y debe ser reembolsado. Verifique su capacidad de pago antes de comprometerse.'}</strong>
                  <br />
                  {lang === 'fr' ? 'Service gratuit et sans engagement.' : 'Servicio gratuito y sin compromiso.'}
                </p>
              </div>

              {/* Links */}
              <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <Link href={getLocalizedPath('precontractual', locale)} style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textDecoration: "underline" }}>
                  {lang === 'fr' ? 'Informations précontractuelles' : 'Información precontractual'}
                </Link>
                <Link href={getLocalizedPath('warnings', locale)} style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textDecoration: "underline" }}>
                  {lang === 'fr' ? 'Avertissements' : 'Avisos'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
