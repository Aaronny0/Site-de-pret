"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Upload,
  ChevronRight,
  ChevronLeft,
  FileText,
  User,
  Briefcase,
  Shield,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";
import { useDictionary } from "@/components/DictionaryProvider";
import { getLocalizedPath, type AppLocale } from "@/lib/routes";

function getSteps(lang: string) {
  return lang === 'fr' ? [
    { n: 1, label: "Votre projet", icon: FileText },
    { n: 2, label: "Situation personnelle", icon: User },
    { n: 3, label: "Situation financière", icon: Briefcase },
    { n: 4, label: "Vos documents", icon: Upload },
    { n: 5, label: "Vérification", icon: Shield },
  ] : [
    { n: 1, label: "Su proyecto", icon: FileText },
    { n: 2, label: "Situación personal", icon: User },
    { n: 3, label: "Situación financiera", icon: Briefcase },
    { n: 4, label: "Sus documentos", icon: Upload },
    { n: 5, label: "Verificación", icon: Shield },
  ];
}

function getLoanTypes(lang: string) {
  return lang === 'fr'
    ? ["Prêt Personnel", "Prêt Immobilier", "Prêt Professionnel", "Rachat de Crédit", "Prêt Travaux", "Prêt Auto"]
    : ["Préstamo Personal", "Préstamo Hipotecario", "Préstamo Profesional", "Reagrupación de Créditos", "Préstamo Obras", "Préstamo Auto"];
}

function getStatusOptions(lang: string) {
  return lang === 'fr'
    ? ["CDI", "CDD", "Indépendant / Auto-entrepreneur", "Fonctionnaire", "Retraité(e)", "Sans emploi", "Autre"]
    : ["Indefinido", "Temporal", "Autónomo", "Funcionario", "Jubilado/a", "Desempleado", "Otro"];
}

function getDocTypes(lang: string) {
  return lang === 'fr' ? [
    { id: "identity", label: "Pièce d'identité", desc: "CNI ou passeport (recto + verso)", required: true },
    { id: "salary", label: "Justificatif de revenus", desc: "3 derniers bulletins de salaire ou 2 derniers bilans", required: true },
    { id: "bank", label: "Relevés bancaires", desc: "3 derniers relevés de compte", required: true },
    { id: "domicile", label: "Justificatif de domicile", desc: "Facture de moins de 3 mois", required: true },
    { id: "rib", label: "RIB", desc: "Relevé d'Identité Bancaire", required: true },
    { id: "other", label: "Document complémentaire", desc: "Devis, bon de commande, compromis de vente…", required: false },
  ] : [
    { id: "identity", label: "Documento de identidad", desc: "DNI o pasaporte (anverso + reverso)", required: true },
    { id: "salary", label: "Justificante de ingresos", desc: "3 últimas nóminas o 2 últimos balances", required: true },
    { id: "bank", label: "Extractos bancarios", desc: "3 últimos extractos de cuenta", required: true },
    { id: "domicile", label: "Justificante de domicilio", desc: "Factura de menos de 3 meses", required: true },
    { id: "rib", label: "Cuenta bancaria", desc: "Datos bancarios (IBAN)", required: true },
    { id: "other", label: "Documento complementario", desc: "Presupuesto, pedido, compromiso de venta…", required: false },
  ];
}

interface FormData {
  // Step 1
  loanType: string;
  purpose: string;
  amount: number;
  duration: number;
  neededBy: string;
  // Step 2
  civility: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  nationality: string;
  maritalStatus: string;
  dependents: number;
  address: string;
  zipCode: string;
  city: string;
  email: string;
  emailConfirm: string;
  phone: string;
  // Step 3
  professionalStatus: string;
  employer: string;
  seniority: string;
  monthlyIncome: number;
  otherIncome: number;
  monthlyCharges: number;
  existingCredits: number;
  savings: number;
  housingStatus: string;
  // Step 5 consent
  consentCGU: boolean;
  consentPrivacy: boolean;
  consentAccuracy: boolean;
  consentProcessing: boolean;
  consentMarketing: boolean;
}

function StepIndicator({ currentStep, lang }: { currentStep: number; lang: string }) {
  const steps = getSteps(lang);
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", position: "relative", marginBottom: "0.75rem" }}>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "20px",
            left: "10%",
            right: "10%",
            height: "2px",
            background: "var(--color-border)",
            zIndex: 0,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "20px",
            left: "10%",
            width: `${((currentStep - 1) / 4) * 80}%`,
            height: "2px",
            background: "linear-gradient(90deg, var(--color-accent), var(--color-accent-light))",
            transition: "width 0.5s ease",
            zIndex: 1,
          }}
        />
        {steps.map((step) => {
          const done = currentStep > step.n;
          const active = currentStep === step.n;
          return (
            <div key={step.n} style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  margin: "0 auto 0.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: done
                    ? "var(--color-accent)"
                    : active
                    ? "linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))"
                    : "white",
                  border: `2px solid ${done || active ? "var(--color-accent)" : "var(--color-border)"}`,
                  boxShadow: active ? "var(--shadow-accent)" : "none",
                  transition: "all 0.3s",
                }}
                aria-label={`Étape ${step.n} : ${step.label}${done ? " (complétée)" : active ? " (en cours)" : ""}`}
              >
                {done ? (
                  <Check size={18} color="white" />
                ) : (
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", fontWeight: "700", color: active ? "white" : "var(--color-text-muted)" }}>
                    {step.n}
                  </span>
                )}
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: active ? "700" : "400", color: active ? "var(--color-primary)" : "var(--color-text-muted)", display: "block", maxWidth: "80px", lineHeight: "1.3" }}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
      {/* Progress bar */}
      <div className="progress-container" style={{ height: "4px" }}>
        <div
          className="progress-bar"
          style={{ width: `${(currentStep / 5) * 100}%` }}
          role="progressbar"
          aria-valuenow={currentStep}
          aria-valuemin={1}
          aria-valuemax={5}
          aria-label={`Étape ${currentStep} sur 5`}
        />
      </div>
    </div>
  );
}

export default function DemandePage() {
  const { dict, lang } = useDictionary();
  const locale = lang as AppLocale;
  const steps = getSteps(lang);
  const loanTypes = getLoanTypes(lang);
  const statusOptions = getStatusOptions(lang);
  const docTypes = getDocTypes(lang);
  const t = dict?.request || {};

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [dossierNumber] = useState(`FP-${new Date().getFullYear()}-${Math.floor(Math.random() * 89999 + 10000)}`);
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<FormData>({
    loanType: "Prêt Personnel",
    purpose: "",
    amount: 15000,
    duration: 60,
    neededBy: "",
    civility: "M.",
    firstName: "",
    lastName: "",
    birthDate: "",
    nationality: "Française",
    maritalStatus: "Célibataire",
    dependents: 0,
    address: "",
    zipCode: "",
    city: "",
    email: "",
    emailConfirm: "",
    phone: "",
    professionalStatus: "CDI",
    employer: "",
    seniority: "",
    monthlyIncome: 0,
    otherIncome: 0,
    monthlyCharges: 0,
    existingCredits: 0,
    savings: 0,
    housingStatus: "Locataire",
    consentCGU: false,
    consentPrivacy: false,
    consentAccuracy: false,
    consentProcessing: false,
    consentMarketing: false,
  });

  const updateForm = (key: keyof FormData, value: string | number | boolean) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!form.amount || form.amount < 1000) newErrors.amount = "Montant minimum : 1 000 €";
      if (!form.duration) newErrors.duration = "Durée requise";
    }
    if (step === 2) {
      if (!form.firstName.trim()) newErrors.firstName = "Prénom requis";
      if (!form.lastName.trim()) newErrors.lastName = "Nom requis";
      if (!form.birthDate) newErrors.birthDate = "Date de naissance requise";
      if (!form.email.includes("@")) newErrors.email = "Email invalide";
      if (form.email !== form.emailConfirm) newErrors.emailConfirm = "Les emails ne correspondent pas";
      if (!form.phone.match(/^[0-9+\s-]{10,}/)) newErrors.phone = "Téléphone invalide";
      if (!form.address.trim()) newErrors.address = "Adresse requise";
    }
    if (step === 3) {
      if (!form.monthlyIncome || form.monthlyIncome < 100) newErrors.monthlyIncome = "Revenus requis";
    }
    if (step === 5) {
      if (!form.consentCGU) newErrors.consentCGU = "Obligatoire";
      if (!form.consentPrivacy) newErrors.consentPrivacy = "Obligatoire";
      if (!form.consentAccuracy) newErrors.consentAccuracy = "Obligatoire";
      if (!form.consentProcessing) newErrors.consentProcessing = "Obligatoire";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, 5));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    if (validateStep()) {
      setSubmitted(true);
    }
  };

  const handleFileUpload = (docId: string) => {
    setUploadedDocs((d) => ({ ...d, [docId]: "document.pdf" }));
  };

  if (submitted) {
    return (
      <section style={{ minHeight: "80vh", display: "flex", alignItems: "center", background: "var(--color-bg)", padding: "4rem 0" }}>
        <div className="container" style={{ maxWidth: "650px", textAlign: "center" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(0,200,150,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", animation: "pulse-glow 2s ease-in-out infinite" }}>
            <CheckCircle size={40} style={{ color: "var(--color-accent)" }} />
          </div>
          <span className="badge badge-success" style={{ marginBottom: "1rem" }}>
            Demande envoyée avec succès
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: "1rem" }}>
            Votre dossier a bien été transmis !
          </h1>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.25rem", fontWeight: "700", color: "var(--color-primary)", background: "var(--color-bg-alt)", borderRadius: "var(--radius-md)", padding: "0.75rem 1.5rem", display: "inline-block", marginBottom: "1.5rem" }}>
            N° dossier : {dossierNumber}
          </div>
          <p style={{ color: "var(--color-text-muted)", lineHeight: "1.7", marginBottom: "2rem" }}>
            Conservez ce numéro de dossier. Un conseiller FinancePro va étudier votre demande
            et vous contactera dans les <strong>24 heures ouvrées</strong> sur l&apos;email fourni.
          </p>
          <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "1.5rem", marginBottom: "2rem", textAlign: "left" }}>
            <h2 style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: "700", marginBottom: "1rem" }}>Prochaines étapes</h2>
            {[
              { step: "1", text: "Votre conseiller dédié vous contacte sous 24h", icon: "📞" },
              { step: "2", text: "Étude complète de votre dossier (24-48h)", icon: "🔍" },
              { step: "3", text: "Réception de l'offre de prêt par email", icon: "📧" },
              { step: "4", text: "Délai de réflexion légal de 10 jours ouvrés", icon: "⏳" },
              { step: "5", text: "Signature électronique et versement des fonds", icon: "✍️" },
            ].map(({ step, text, icon }) => (
              <div key={step} style={{ display: "flex", gap: "0.75rem", padding: "0.5rem 0", borderBottom: "1px solid var(--color-border-light)" }}>
                <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                <span style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>{text}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/espace-client" className="btn btn-primary">
              Accéder à mon espace client
              <ChevronRight size={16} />
            </Link>
            <Link href="/" className="btn btn-ghost">Retour à l&apos;accueil</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", padding: "3rem 0 2.5rem", textAlign: "center" }}>
        <div className="container">
          <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "0.75rem" }}>
            Faire une demande de financement
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem" }}>
            Étape {step} sur 5 — {steps[step - 1].label}
          </p>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)", padding: "2.5rem 0 5rem" }}>
        <div className="container" style={{ maxWidth: "780px" }}>
          <StepIndicator currentStep={step} lang={lang} />

          <div className="card" style={{ padding: "2.5rem" }}>
            {/* ── STEP 1 ── */}
            {step === 1 && (
              <fieldset style={{ border: "none", padding: 0 }}>
                <legend style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.75rem", display: "block" }}>
                  Votre projet de financement
                </legend>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div className="form-group">
                    <label className="form-label form-label-required" htmlFor="loanType">Type de financement</label>
                    <select
                      id="loanType"
                      className="form-select"
                      value={form.loanType}
                      onChange={(e) => updateForm("loanType", e.target.value)}
                    >
                      {loanTypes.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="purpose">Objet du prêt</label>
                    <input
                      id="purpose"
                      type="text"
                      className="form-input"
                      placeholder="Ex : rénovation salle de bain, achat véhicule..."
                      value={form.purpose}
                      onChange={(e) => updateForm("purpose", e.target.value)}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                    <div className="form-group">
                      <label className="form-label form-label-required" htmlFor="amount">Montant demandé (€)</label>
                      <input
                        id="amount"
                        type="number"
                        className={`form-input ${errors.amount ? "error" : ""}`}
                        min={1000}
                        max={750000}
                        value={form.amount}
                        onChange={(e) => updateForm("amount", Number(e.target.value))}
                        aria-describedby={errors.amount ? "amount-error" : undefined}
                      />
                      {errors.amount && <span className="form-error" id="amount-error"><AlertCircle size={12} />{errors.amount}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label form-label-required" htmlFor="duration">Durée souhaitée (mois)</label>
                      <input
                        id="duration"
                        type="number"
                        className={`form-input ${errors.duration ? "error" : ""}`}
                        min={12}
                        max={360}
                        value={form.duration}
                        onChange={(e) => updateForm("duration", Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="neededBy">Date de besoin des fonds</label>
                    <input
                      id="neededBy"
                      type="date"
                      className="form-input"
                      value={form.neededBy}
                      onChange={(e) => updateForm("neededBy", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
              </fieldset>
            )}

            {/* ── STEP 2 ── */}
            {step === 2 && (
              <fieldset style={{ border: "none", padding: 0 }}>
                <legend style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.75rem", display: "block" }}>
                  Votre situation personnelle
                </legend>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "130px 1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="civility">Civilité</label>
                      <select id="civility" className="form-select" value={form.civility} onChange={(e) => updateForm("civility", e.target.value)}>
                        <option>M.</option><option>Mme</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label form-label-required" htmlFor="firstName">Prénom</label>
                      <input id="firstName" type="text" className={`form-input ${errors.firstName ? "error" : ""}`} value={form.firstName} onChange={(e) => updateForm("firstName", e.target.value)} autoComplete="given-name" />
                      {errors.firstName && <span className="form-error"><AlertCircle size={12} />{errors.firstName}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label form-label-required" htmlFor="lastName">Nom</label>
                      <input id="lastName" type="text" className={`form-input ${errors.lastName ? "error" : ""}`} value={form.lastName} onChange={(e) => updateForm("lastName", e.target.value)} autoComplete="family-name" />
                      {errors.lastName && <span className="form-error"><AlertCircle size={12} />{errors.lastName}</span>}
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label form-label-required" htmlFor="birthDate">Date de naissance</label>
                      <input id="birthDate" type="date" className={`form-input ${errors.birthDate ? "error" : ""}`} value={form.birthDate} onChange={(e) => updateForm("birthDate", e.target.value)} autoComplete="bday" max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]} />
                      {errors.birthDate && <span className="form-error"><AlertCircle size={12} />{errors.birthDate}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="nationality">Nationalité</label>
                      <input id="nationality" type="text" className="form-input" value={form.nationality} onChange={(e) => updateForm("nationality", e.target.value)} />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="maritalStatus">Situation familiale</label>
                      <select id="maritalStatus" className="form-select" value={form.maritalStatus} onChange={(e) => updateForm("maritalStatus", e.target.value)}>
                        {["Célibataire", "Marié(e)", "Pacsé(e)", "Divorcé(e)", "Veuf/ve", "En concubinage"].map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="dependents">Personnes à charge</label>
                      <input id="dependents" type="number" min={0} max={10} className="form-input" value={form.dependents} onChange={(e) => updateForm("dependents", Number(e.target.value))} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label form-label-required" htmlFor="address">Adresse</label>
                    <input id="address" type="text" className={`form-input ${errors.address ? "error" : ""}`} placeholder="N° et nom de la rue" value={form.address} onChange={(e) => updateForm("address", e.target.value)} autoComplete="street-address" />
                    {errors.address && <span className="form-error"><AlertCircle size={12} />{errors.address}</span>}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "130px 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label form-label-required" htmlFor="zipCode">Code postal</label>
                      <input id="zipCode" type="text" className="form-input" value={form.zipCode} onChange={(e) => updateForm("zipCode", e.target.value)} autoComplete="postal-code" maxLength={5} />
                    </div>
                    <div className="form-group">
                      <label className="form-label form-label-required" htmlFor="city">Ville</label>
                      <input id="city" type="text" className="form-input" value={form.city} onChange={(e) => updateForm("city", e.target.value)} autoComplete="address-level2" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label form-label-required" htmlFor="email">Email</label>
                    <input id="email" type="email" className={`form-input ${errors.email ? "error" : ""}`} value={form.email} onChange={(e) => updateForm("email", e.target.value)} autoComplete="email" />
                    {errors.email && <span className="form-error"><AlertCircle size={12} />{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label form-label-required" htmlFor="emailConfirm">Confirmation email</label>
                    <input id="emailConfirm" type="email" className={`form-input ${errors.emailConfirm ? "error" : ""}`} value={form.emailConfirm} onChange={(e) => updateForm("emailConfirm", e.target.value)} autoComplete="email" />
                    {errors.emailConfirm && <span className="form-error"><AlertCircle size={12} />{errors.emailConfirm}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label form-label-required" htmlFor="phone">Téléphone mobile</label>
                    <input id="phone" type="tel" className={`form-input ${errors.phone ? "error" : ""}`} value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} autoComplete="mobile tel" placeholder="06 XX XX XX XX" />
                    {errors.phone && <span className="form-error"><AlertCircle size={12} />{errors.phone}</span>}
                  </div>
                </div>
              </fieldset>
            )}

            {/* ── STEP 3 ── */}
            {step === 3 && (
              <fieldset style={{ border: "none", padding: 0 }}>
                <legend style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.75rem", display: "block" }}>
                  Situation professionnelle & financière
                </legend>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div className="form-group">
                    <label className="form-label form-label-required" htmlFor="professionalStatus">Statut professionnel</label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }} role="radiogroup" aria-label="Statut professionnel">
                      {statusOptions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          role="radio"
                          aria-checked={form.professionalStatus === s}
                          onClick={() => updateForm("professionalStatus", s)}
                          style={{
                            padding: "0.625rem 0.5rem",
                            borderRadius: "var(--radius-md)",
                            border: `1.5px solid ${form.professionalStatus === s ? "var(--color-primary-light)" : "var(--color-border)"}`,
                            background: form.professionalStatus === s ? "rgba(42,95,158,0.08)" : "transparent",
                            cursor: "pointer",
                            fontFamily: "var(--font-body)",
                            fontSize: "0.825rem",
                            fontWeight: form.professionalStatus === s ? "600" : "400",
                            color: form.professionalStatus === s ? "var(--color-primary)" : "var(--color-text-muted)",
                            transition: "all 0.15s",
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="employer">Employeur / Entreprise</label>
                      <input id="employer" type="text" className="form-input" value={form.employer} onChange={(e) => updateForm("employer", e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="seniority">Ancienneté dans le poste</label>
                      <select id="seniority" className="form-select" value={form.seniority} onChange={(e) => updateForm("seniority", e.target.value)}>
                        <option value="">Sélectionner</option>
                        {["< 6 mois", "6 mois - 1 an", "1 - 3 ans", "3 - 5 ans", "+ 5 ans"].map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  {[
                    { id: "monthlyIncome" as keyof FormData, label: "Revenus nets mensuels (€)", hint: "Salaires, pensions, loyers perçus…", required: true },
                    { id: "otherIncome" as keyof FormData, label: "Autres revenus mensuels (€)", hint: "Allocations, pensions alimentaires reçues…", required: false },
                    { id: "monthlyCharges" as keyof FormData, label: "Charges mensuelles fixes (€)", hint: "Loyer, charges courantes hors crédits", required: false },
                    { id: "existingCredits" as keyof FormData, label: "Mensualités crédits en cours (€)", hint: "Total de toutes vos mensualités actuelles", required: false },
                    { id: "savings" as keyof FormData, label: "Épargne disponible (€)", hint: "Livrets, épargne accessible rapidement", required: false },
                  ].map(({ id, label, hint, required }) => (
                    <div className="form-group" key={id}>
                      <label className={`form-label ${required ? "form-label-required" : ""}`} htmlFor={id}>{label}</label>
                      <input
                        id={id}
                        type="number"
                        min={0}
                        className={`form-input ${errors[id] ? "error" : ""}`}
                        value={form[id] as number}
                        onChange={(e) => updateForm(id, Number(e.target.value))}
                        aria-describedby={`${id}-hint`}
                      />
                      <span className="form-hint" id={`${id}-hint`}>{hint}</span>
                      {errors[id] && <span className="form-error"><AlertCircle size={12} />{errors[id]}</span>}
                    </div>
                  ))}

                  <div className="form-group">
                    <label className="form-label" htmlFor="housingStatus">Statut d&apos;hébergement</label>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      {["Locataire", "Propriétaire", "Hébergé gratuitement"].map((s) => (
                        <label
                          key={s}
                          className="form-check"
                          style={{
                            padding: "0.625rem 1rem",
                            border: `1.5px solid ${form.housingStatus === s ? "var(--color-accent)" : "var(--color-border)"}`,
                            borderRadius: "var(--radius-md)",
                            cursor: "pointer",
                            flex: 1,
                            justifyContent: "center",
                            background: form.housingStatus === s ? "rgba(0,200,150,0.06)" : "transparent",
                          }}
                        >
                          <input type="radio" name="housingStatus" value={s} checked={form.housingStatus === s} onChange={() => updateForm("housingStatus", s)} style={{ display: "none" }} />
                          <span style={{ fontSize: "0.875rem", fontWeight: form.housingStatus === s ? "600" : "400", color: form.housingStatus === s ? "var(--color-primary)" : "var(--color-text-muted)" }}>{s}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </fieldset>
            )}

            {/* ── STEP 4 ── */}
            {step === 4 && (
              <fieldset style={{ border: "none", padding: 0 }}>
                <legend style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.5rem", display: "block" }}>
                  Vos documents
                </legend>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", marginBottom: "1.75rem" }}>
                  Formats acceptés : PDF, JPG, PNG — Max 5 Mo par fichier.
                  Vos documents sont chiffrés et sécurisés (AES-256).
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {docTypes.map(({ id, label, desc, required }) => {
                    const uploaded = uploadedDocs[id];
                    return (
                      <div
                        key={id}
                        style={{
                          border: `2px ${uploaded ? "solid" : "dashed"} ${uploaded ? "var(--color-accent)" : "var(--color-border)"}`,
                          borderRadius: "var(--radius-md)",
                          padding: "1.25rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          background: uploaded ? "rgba(0,200,150,0.04)" : "var(--color-bg)",
                          transition: "all 0.2s",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                          <div
                            style={{
                              width: "44px",
                              height: "44px",
                              borderRadius: "var(--radius-md)",
                              background: uploaded ? "rgba(0,200,150,0.15)" : "var(--color-bg-alt)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            {uploaded ? (
                              <Check size={20} style={{ color: "var(--color-accent)" }} />
                            ) : (
                              <FileText size={20} style={{ color: "var(--color-text-muted)" }} />
                            )}
                          </div>
                          <div>
                            <p style={{ fontWeight: "600", fontSize: "0.9rem", marginBottom: "0.15rem" }}>
                              {label}
                              {required && <span style={{ color: "var(--color-danger)", marginLeft: "0.25rem" }}>*</span>}
                            </p>
                            <p style={{ fontSize: "0.8rem", color: uploaded ? "var(--color-accent-dark)" : "var(--color-text-muted)" }}>
                              {uploaded || desc}
                            </p>
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          {uploaded && (
                            <button
                              type="button"
                              onClick={() => setUploadedDocs((d) => { const n = { ...d }; delete n[id]; return n; })}
                              style={{ background: "none", border: "none", color: "var(--color-danger)", cursor: "pointer", padding: "0.25rem" }}
                              aria-label={`Supprimer ${label}`}
                            >
                              <X size={16} />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleFileUpload(id)}
                            className="btn btn-ghost btn-sm"
                            style={{ fontSize: "0.8rem" }}
                          >
                            <Upload size={14} />
                            {uploaded ? "Remplacer" : "Choisir"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="alert alert-info" style={{ marginTop: "1.25rem" }}>
                  <Shield size={16} style={{ flexShrink: 0 }} />
                  <p style={{ fontSize: "0.825rem" }}>
                    Vos documents sont chiffrés en transit (TLS 1.3) et au repos (AES-256).
                    Conformément au RGPD, ils ne sont consultés que par les agents habilités et sont supprimés à l&apos;issue du traitement.
                  </p>
                </div>
              </fieldset>
            )}

            {/* ── STEP 5 ── */}
            {step === 5 && (
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.75rem" }}>
                  Récapitulatif & Consentements
                </h2>

                {/* Summary */}
                <div style={{ background: "var(--color-bg-alt)", borderRadius: "var(--radius-lg)", padding: "1.5rem", marginBottom: "2rem" }}>
                  <h3 style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: "700", marginBottom: "1rem" }}>Récapitulatif de votre demande</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.625rem" }}>
                    {[
                      { l: "Type de prêt", v: form.loanType },
                      { l: "Montant", v: `${form.amount.toLocaleString("fr-FR")} €` },
                      { l: "Durée", v: `${form.duration} mois` },
                      { l: "Prénom / Nom", v: `${form.firstName} ${form.lastName}` },
                      { l: "Email", v: form.email || "-" },
                      { l: "Statut", v: form.professionalStatus },
                      { l: "Revenus mensuels", v: `${form.monthlyIncome.toLocaleString("fr-FR")} €` },
                    ].map(({ l, v }) => (
                      <div key={l} style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--color-border)" }}>
                        <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", display: "block" }}>{l}</span>
                        <span style={{ fontSize: "0.9rem", fontWeight: "600" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-primary-light)", fontSize: "0.825rem", textDecoration: "underline", marginTop: "0.75rem", fontFamily: "var(--font-body)" }}
                  >
                    Modifier ma demande
                  </button>
                </div>

                {/* Consents */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                  <h3 style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: "700" }}>Vos consentements</h3>

                  {[
                    { key: "consentCGU" as keyof FormData, text: "J'ai lu et j'accepte les Conditions Générales d'Utilisation", link: "/cgu", required: true },
                    { key: "consentPrivacy" as keyof FormData, text: "J'ai lu et j'accepte la Politique de Confidentialité", link: "/confidentialite", required: true },
                    { key: "consentAccuracy" as keyof FormData, text: "Je certifie l'exactitude et la sincérité des informations fournies", link: null, required: true },
                    { key: "consentProcessing" as keyof FormData, text: "J'accepte que mes données soient traitées pour l'étude de ma demande de crédit", link: "/confidentialite", required: true },
                    { key: "consentMarketing" as keyof FormData, text: "J'accepte de recevoir des offres personnalisées FinancePro par email (facultatif)", link: null, required: false },
                  ].map(({ key, text, link, required }) => (
                    <div key={key}>
                      <label
                        className="form-check"
                        style={{
                          padding: "0.875rem 1rem",
                          background: (form[key] as boolean) ? "rgba(0,200,150,0.06)" : "var(--color-bg-alt)",
                          borderRadius: "var(--radius-md)",
                          border: `1.5px solid ${errors[key] ? "var(--color-danger)" : (form[key] as boolean) ? "var(--color-accent)" : "var(--color-border)"}`,
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={form[key] as boolean}
                          onChange={(e) => updateForm(key, e.target.checked)}
                          aria-required={required}
                        />
                        <span className="form-check-label" style={{ fontSize: "0.9rem" }}>
                          {text}
                          {required && <span style={{ color: "var(--color-danger)" }}> *</span>}
                          {link && (
                            <Link href={link} target="_blank" style={{ color: "var(--color-primary-light)", marginLeft: "0.3rem", fontSize: "0.825rem" }}>
                              (lire)
                            </Link>
                          )}
                        </span>
                      </label>
                      {errors[key] && <span className="form-error" style={{ marginTop: "0.25rem" }}><AlertCircle size={12} />Consentement obligatoire</span>}
                    </div>
                  ))}
                </div>

                {/* Withdrawal right info */}
                <div className="alert alert-info" style={{ marginBottom: "1.5rem" }}>
                  <Shield size={16} style={{ flexShrink: 0 }} />
                  <p style={{ fontSize: "0.825rem" }}>
                    <strong>Droit de rétractation :</strong> Conformément à l&apos;article L312-19 du Code de la consommation,
                    vous disposez d&apos;un délai de <strong>14 jours calendaires</strong> pour vous rétracter à compter de
                    l&apos;acceptation de l&apos;offre de prêt, sans justification ni pénalité.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--color-border)" }}>
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn btn-ghost"
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <ChevronLeft size={16} />
                  Étape précédente
                </button>
              ) : (
                <div />
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn btn-primary"
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  Étape suivante
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-primary btn-lg"
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <Check size={18} />
                  Soumettre ma demande
                </button>
              )}
            </div>
          </div>

          {/* Legal */}
          <div className="legal-banner" style={{ marginTop: "1.25rem" }}>
            <p style={{ fontSize: "0.75rem" }}>
              ⚠️ <strong>Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.</strong>
              Sous réserve d&apos;acceptation de votre dossier par FinancePro SAS, IOBSP enregistré à l&apos;ORIAS sous le n° 00-000-000.
              Conformément à la loi Informatique et Libertés et au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification
              et de suppression de vos données : <Link href="/confidentialite" style={{ color: "inherit", textDecoration: "underline" }}>dpo@financepro.fr</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
