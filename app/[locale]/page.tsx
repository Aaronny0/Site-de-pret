"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Zap,
  Eye,
  Home,
  Briefcase,
  Car,
  Wrench,
  RefreshCw,
  User,
  Star,
  Check,
  ChevronRight,
  Info,
  TrendingUp,
  Clock,
  Users,
  Award,
} from "lucide-react";
import {
  calculateMonthlyPayment,
  calculateTAEG,
  getIndicativeRate,
  calculateTotalCost,
  formatCurrency,
} from "@/lib/loanCalculations";
import { useDictionary } from "@/components/DictionaryProvider";
import { getLocalizedPath, type AppLocale } from "@/lib/routes";

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "", decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(current);
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observerRef.current.observe(ref.current);
    return () => observerRef.current?.disconnect();
  }, [target]);

  return (
    <span ref={ref} style={{ fontFamily: "var(--font-mono)" }}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString("es-ES")}
      {suffix}
    </span>
  );
}

// ─── Quick Simulator ───────────────────────────────────────────────────────────
function QuickSimulator() {
  const { dict, lang } = useDictionary();
  const locale = lang as AppLocale;

  const [amount, setAmount] = useState(15000);
  const [months, setMonths] = useState(60);

  const rate = getIndicativeRate("personnel", months, amount);
  const monthly = calculateMonthlyPayment(amount, rate, months);
  const taeg = calculateTAEG(rate, "personnel", months, amount);
  const totalCost = calculateTotalCost(monthly, months, amount);

  const amountProgress = ((amount - 1000) / (75000 - 1000)) * 100;
  const monthsProgress = ((months - 12) / (120 - 12)) * 100;

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "var(--radius-xl)",
        padding: "2rem",
      }}
    >
      <h3 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "1.4rem", marginBottom: "1.5rem" }}>
        {dict?.simulator?.title || 'Simulación rápida'}
      </h3>

      {/* Amount */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <label style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.875rem", fontWeight: "500" }}>
            {dict?.simulator?.amount || 'Importe deseado'}
          </label>
          <span style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)", fontWeight: "700", fontSize: "1.1rem" }}>
            {amount.toLocaleString("es-ES")} €
          </span>
        </div>
        <input
          type="range"
          min={1000}
          max={75000}
          step={500}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="form-range"
          style={{ "--progress": `${amountProgress}%` } as React.CSSProperties}
          aria-label="Montant du prêt"
          aria-valuemin={1000}
          aria-valuemax={75000}
          aria-valuenow={amount}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginTop: "0.25rem" }}>
          <span>1 000 €</span>
          <span>75 000 €</span>
        </div>
      </div>

      {/* Duration */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <label style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.875rem", fontWeight: "500" }}>
            {dict?.simulator?.duration || 'Duración del reembolso'}
          </label>
          <span style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)", fontWeight: "700", fontSize: "1.1rem" }}>
            {months} {dict?.common?.months || 'meses'}
          </span>
        </div>
        <input
          type="range"
          min={12}
          max={120}
          step={6}
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
          className="form-range"
          style={{ "--progress": `${monthsProgress}%` } as React.CSSProperties}
          aria-label="Durée du prêt en mois"
          aria-valuemin={12}
          aria-valuemax={120}
          aria-valuenow={months}
        />
        {/* Quick select */}
        <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
          {[12, 24, 36, 60, 84, 120].map((m) => (
            <button
              key={m}
              onClick={() => setMonths(m)}
              style={{
                padding: "0.25rem 0.625rem",
                borderRadius: "var(--radius-full)",
                border: `1px solid ${months === m ? "var(--color-accent)" : "rgba(255,255,255,0.2)"}`,
                background: months === m ? "var(--color-accent)" : "transparent",
                color: months === m ? "white" : "rgba(255,255,255,0.6)",
                fontSize: "0.75rem",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                transition: "all 0.2s",
              }}
            >
              {m} {dict?.common?.months || 'meses'}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div
        style={{
          background: "rgba(0,200,150,0.12)",
          border: "1px solid rgba(0,200,150,0.3)",
          borderRadius: "var(--radius-lg)",
          padding: "1.25rem",
          marginBottom: "1.25rem",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)", marginBottom: "0.25rem" }}>
            {dict?.simulator?.monthly_payment || 'Cuota mensual estimada'}
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "2.5rem", fontWeight: "700", color: "var(--color-accent)", lineHeight: "1.1" }}>
            {formatCurrency(monthly)}
            <span style={{ fontSize: "1rem", fontWeight: "400", color: "rgba(255,255,255,0.6)" }}>{dict?.common?.per_month || '/mes'}</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          {[
            { label: lang === 'fr' ? 'TAEG indicatif' : 'TAE indicativa', value: `${taeg.toFixed(2)} %` },
            { label: lang === 'fr' ? 'Coût total' : 'Coste total', value: formatCurrency(totalCost) },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.2rem" }}>{label}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: "700", color: "white" }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Legal */}
      <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", lineHeight: "1.5", marginBottom: "1rem", textAlign: "center" }}>
        ⚠️ {lang === 'fr' ? 'Simulation non contractuelle. Taux indicatifs. TAEG définitif communiqué dans votre offre. Un crédit vous engage et doit être remboursé.' : 'Simulación no contractual. Tasas indicativas. TAE definitiva comunicada en su oferta. Un crédito le compromete y debe ser reembolsado.'}
      </p>

      <Link
        href={getLocalizedPath('simulator', locale)}
        className="btn btn-primary"
        style={{ width: "100%", justifyContent: "center" }}
      >
        {lang === 'fr' ? 'Affiner ma simulation' : 'Perfeccionar mi simulación'}
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}

// ─── Testimonial data ──────────────────────────────────────────────────────────
const testimonials_es = [
  {
    name: "María L.",
    city: "Barcelona",
    rating: 5,
    text: "¡Proceso increíblemente fluido! Obtuve mi financiación para mi renovación en 3 días. Asesores muy profesionales.",
    loan: "Préstamo Obras — 18.000 €",
  },
  {
    name: "Tomás B.",
    city: "Madrid",
    rating: 5,
    text: "Como autónomo, los bancos me rechazaban. FinancePro comprendió mi perfil y me encontró una solución adaptada.",
    loan: "Préstamo Profesional — 35.000 €",
  },
  {
    name: "Sofía & Marcos R.",
    city: "Valencia",
    rating: 5,
    text: "¡Nuestra primera compra inmobiliaria! El simulador es realmente útil para entender las tasas. Gracias por su acompañamiento.",
    loan: "Préstamo Hipotecario — 220.000 €",
  },
  {
    name: "Ahmed K.",
    city: "Sevilla",
    rating: 5,
    text: "Reagrupación de mis 3 créditos en una sola cuota. Ahorro 380€/mes. Lo recomiendo sin dudar.",
    loan: "Reagrupación de Créditos — 45.000 €",
  },
  {
    name: "Isabel P.",
    city: "Bilbao",
    rating: 4,
    text: "Muy reactivos, respuesta en menos de 24h como prometido. Un poco de papeleo pero nada inusual para un crédito.",
    loan: "Préstamo Personal — 12.000 €",
  },
  {
    name: "Florencio D.",
    city: "Málaga",
    rating: 5,
    text: "Interfaz moderna, transparente sobre las tasas desde la simulación. Sin sorpresas desagradables. Exactamente lo que se busca.",
    loan: "Préstamo Auto — 22.000 €",
  },
];

const testimonials_fr = [
  {
    name: "Marie L.",
    city: "Lyon",
    rating: 5,
    text: "Processus incroyablement fluide ! J'ai obtenu mon financement pour ma rénovation en 3 jours. Conseillers très professionnels.",
    loan: "Prêt Travaux — 18 000 €",
  },
  {
    name: "Thomas B.",
    city: "Paris",
    rating: 5,
    text: "En tant qu'auto-entrepreneur, les banques me refusaient. FinancePro a compris mon profil et m'a trouvé une solution adaptée.",
    loan: "Prêt Professionnel — 35 000 €",
  },
  {
    name: "Sophie & Marc R.",
    city: "Bordeaux",
    rating: 5,
    text: "Notre premier achat immobilier ! Le simulateur est vraiment utile pour comprendre les taux. Merci pour votre accompagnement.",
    loan: "Prêt Immobilier — 220 000 €",
  },
  {
    name: "Ahmed K.",
    city: "Marseille",
    rating: 5,
    text: "Rachat de mes 3 crédits en une seule mensualité. J'économise 380€/mois. Je recommande sans hésiter.",
    loan: "Rachat de Crédit — 45 000 €",
  },
  {
    name: "Isabelle P.",
    city: "Lille",
    rating: 4,
    text: "Très réactive, réponse en moins de 24h comme promis. Un peu de paperasse mais rien d'inhabituel pour un crédit.",
    loan: "Prêt Personnel — 12 000 €",
  },
  {
    name: "Florent D.",
    city: "Nantes",
    rating: 5,
    text: "Interface moderne, transparent sur les taux dès la simulation. Pas de mauvaises surprises. Exactement ce qu'on cherche.",
    loan: "Prêt Auto — 22 000 €",
  },
];

// ─── Loan Types ────────────────────────────────────────────────────────────────
const loanTypes_fr = [
  { icon: User, label: "Prêt Personnel", href: "/offres/personnel", routeKey: "offers/personal", rate: "dès 5,50%", color: "#3B82F6", desc: "Sans justificatif d'utilisation" },
  { icon: Home, label: "Prêt Immobilier", href: "/offres/immobilier", routeKey: "offers/mortgage", rate: "dès 3,40%", color: "#8B5CF6", desc: "Résidence principale & investissement" },
  { icon: Briefcase, label: "Prêt Professionnel", href: "/offres/professionnel", routeKey: "offers/business", rate: "dès 4,80%", color: "#F59E0B", desc: "TPE, PME & indépendants" },
  { icon: RefreshCw, label: "Rachat de Crédit", href: "/offres/rachat-credit", routeKey: "offers/consolidation", rate: "dès 4,20%", color: "var(--color-accent)", desc: "Regroupez tous vos crédits" },
  { icon: Wrench, label: "Prêt Travaux", href: "/offres/travaux", routeKey: "offers/renovation", rate: "dès 4,90%", color: "#EC4899", desc: "Rénovation & éco-travaux" },
  { icon: Car, label: "Prêt Auto", href: "/offres/auto", routeKey: "offers/auto", rate: "dès 4,50%", color: "#06B6D4", desc: "Neuf, occasion & LOA" },
];

const loanTypes_es = [
  { icon: User, label: "Préstamo Personal", href: "/offres/personnel", routeKey: "offers/personal", rate: "desde 5,50%", color: "#3B82F6", desc: "Sin justificar finalidad" },
  { icon: Home, label: "Préstamo Hipotecario", href: "/offres/immobilier", routeKey: "offers/mortgage", rate: "desde 3,40%", color: "#8B5CF6", desc: "Vivienda habitual e inversión" },
  { icon: Briefcase, label: "Préstamo Profesional", href: "/offres/professionnel", routeKey: "offers/business", rate: "desde 4,80%", color: "#F59E0B", desc: "Autónomos y Pymes" },
  { icon: RefreshCw, label: "Reagrupación de Deudas", href: "/offres/rachat-credit", routeKey: "offers/consolidation", rate: "desde 4,20%", color: "var(--color-accent)", desc: "Unifique sus cuotas" },
  { icon: Wrench, label: "Préstamo Reformas", href: "/offres/travaux", routeKey: "offers/renovation", rate: "desde 4,90%", color: "#EC4899", desc: "Reformas y eficiencia energética" },
  { icon: Car, label: "Préstamo Auto", href: "/offres/auto", routeKey: "offers/auto", rate: "desde 4,50%", color: "#06B6D4", desc: "Coche nuevo y de ocasión" },
];

// ─── Process Steps ─────────────────────────────────────────────────────────────
const steps_fr = [
  { n: 1, icon: "⚡", label: "Simulation", desc: "En 2 minutes, gratuit, sans engagement", duration: "2 min" },
  { n: 2, icon: "📄", label: "Dossier numérique", desc: "Upload sécurisé de vos documents", duration: "10 min" },
  { n: 3, icon: "🔍", label: "Étude du dossier", desc: "Analyse par nos experts financiers", duration: "24h" },
  { n: 4, icon: "✍️", label: "Signature électronique", desc: "Offre et délai légal de réflexion", duration: "10 jours" },
  { n: 5, icon: "💳", label: "Versement", desc: "Fonds sur votre compte bancaire", duration: "48h" },
];

const steps_es = [
  { n: 1, icon: "⚡", label: "Simulación", desc: "En 2 minutos, gratis, sin compromiso", duration: "2 min" },
  { n: 2, icon: "📄", label: "Expediente digital", desc: "Subida segura de sus documentos", duration: "10 min" },
  { n: 3, icon: "🔍", label: "Estudio del expediente", desc: "Análisis por nuestros expertos", duration: "24h" },
  { n: 4, icon: "✍️", label: "Firma electrónica", desc: "Oferta y firma 100% digital", duration: "10 días" },
  { n: 5, icon: "💳", label: "Desembolso", desc: "Fondos en su cuenta bancaria", duration: "48h" },
];

// ─── FAQ data ──────────────────────────────────────────────────────────────────
const quickFAQ_fr = [
  { q: "La simulation est-elle vraiment gratuite ?", a: "Oui, la simulation est 100% gratuite, sans engagement et sans impact sur votre score bancaire. Vous pouvez simuler autant de fois que vous le souhaitez." },
  { q: "Quels sont les délais de réponse ?", a: "Vous recevez une réponse de principe sous 24h en jours ouvrés. Si votre dossier est complet, les fonds sont versés sous 48h après accord définitif et signature." },
  { q: "Puis-je faire une demande si je suis en CDD ?", a: "Oui. Nous étudions tous les profils : CDI, CDD, indépendants, fonctionnaires, retraités. Le CDD nécessite généralement une ancienneté minimale de 6 mois." },
];

const quickFAQ_es = [
  { q: "¿Es la simulación realmente gratuita?", a: "Sí, la simulación es 100% gratuita, sin compromiso y sin impacto en su calificación crediticia. Puede simular tantas veces como desee." },
  { q: "¿Cuáles son los plazos de respuesta?", a: "Recibe una respuesta de principio en 24h laborables. Si su expediente está completo, los fondos se transfieren en 48h tras el acuerdo definitivo y firma." },
  { q: "¿Puedo hacer una solicitud con un contrato temporal?", a: "Sí. Analizamos todos los perfiles: indefinidos, temporales, autónomos, funcionarios, jubilados. El contrato temporal requiere generalmente una antigüedad mínima de 6 meses." },
];

// ─── Main Page Component ───────────────────────────────────────────────────────
export default function HomePage() {
  const { dict, lang } = useDictionary();
  const locale = lang as AppLocale;
  const testimonials = lang === 'fr' ? testimonials_fr : testimonials_es;
  const quickFAQ = lang === 'fr' ? quickFAQ_fr : quickFAQ_es;
  const loanTypes = lang === 'fr' ? loanTypes_fr : loanTypes_es;
  const steps = lang === 'fr' ? steps_fr : steps_es;
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section
        className="hero-bg"
        style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative" }}
        aria-label="Section hero principale"
      >
        <div className="container" style={{ padding: "6rem var(--container-padding) 4rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            {/* Left — Content */}
            <div className="animate-fade-in-up">
              {/* Trust Badge */}
              <div style={{ marginBottom: "1.5rem" }}>
                <span className="trust-badge animate-fade-in delay-100">
                  <Star size={14} style={{ color: "var(--color-gold)" }} />
                  <span>4,8/5 — +15 000 {lang === 'fr' ? 'clients satisfaits' : 'clientes satisfechos'}</span>
                </span>
              </div>

              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
                  fontWeight: "800",
                  color: "white",
                  lineHeight: "1.1",
                  marginBottom: "1.5rem",
                  letterSpacing: "-0.02em",
                }}
                className="animate-fade-in-up delay-100"
              >
                {dict?.home?.hero_title || "Votre projet mérite "}
                <span
                  style={{
                    background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-light))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {dict?.home?.hero_highlight || "le meilleur financement"}
                </span>
              </h1>

              <p
                style={{
                  fontSize: "1.15rem",
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: "1.7",
                  marginBottom: "2rem",
                  maxWidth: "500px",
                }}
                className="animate-fade-in-up delay-200"
              >
                {dict?.home?.hero_desc || "Simulation gratuite en 2 minutes • Réponse de principe en 24h • Sans engagement"}
              </p>

              {/* Benefits */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "2.5rem" }}>
                {(lang === 'fr' ? [
                  "Aucun frais caché — TAEG transparent dès la simulation",
                  "Données protégées RGPD, connexion SSL 256 bits",
                  "Intermédiaire agréé ORIAS, contrôlé par l'ACPR",
                ] : [
                  "Sin comisiones ocultas — TAE transparente desde la simulación",
                  "Datos protegidos RGPD, conexión SSL 256 bits",
                  "Intermediario registrado ORIAS, controlado por la ACPR",
                ]).map((benefit, i) => (
                  <div
                    key={i}
                    className={`animate-fade-in-up delay-${300 + i * 100}`}
                    style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
                  >
                    <div
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        background: "rgba(0,200,150,0.2)",
                        border: "1.5px solid var(--color-accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Check size={12} color="var(--color-accent)" strokeWidth={3} />
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.925rem" }}>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }} className="animate-fade-in-up delay-500">
                <Link href={getLocalizedPath('simulator', locale)} className="btn btn-primary btn-lg">
                  {dict?.home?.simulate_btn || "Simuler mon prêt"}
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href={getLocalizedPath('offers', locale)}
                  className="btn btn-white btn-lg"
                  style={{ background: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.3)", color: "white" }}
                >
                  {dict?.home?.offers_btn || "Découvrir nos offres"}
                </Link>
              </div>
            </div>

            {/* Right — Simulator */}
            <div className="animate-slide-right delay-300">
              <QuickSimulator />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.75rem",
          }}
          aria-hidden="true"
        >
          <span>{lang === 'fr' ? 'Défiler' : 'Desplazar'}</span>
          <div
            style={{
              width: "2px",
              height: "30px",
              background: "linear-gradient(to bottom, rgba(0,200,150,0.8), transparent)",
              animation: "float 2s ease-in-out infinite",
            }}
          />
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container" style={{ padding: "0 var(--container-padding)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {[
              { icon: Users, value: 15000, suffix: "+", label: dict?.home?.stats_funded || "Projets financés", color: "var(--color-primary)" },
              { icon: Star, value: 98, suffix: "%", label: dict?.home?.stats_sat || "Satisfaction client", color: "var(--color-gold)" },
              { icon: TrendingUp, value: 2.1, suffix: "%", label: dict?.home?.stats_apr || "TAEG à partir de", color: "var(--color-accent)", decimals: 1 },
              { icon: Clock, value: 24, suffix: "h", label: dict?.home?.stats_time || "Délai de réponse", color: "#8B5CF6" },
            ].map(({ icon: Icon, value, suffix, label, color, decimals }, i) => (
              <div
                key={label}
                className="reveal stat-card"
                style={{
                  borderRight: i < 3 ? "1px solid var(--color-border)" : "none",
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <Icon size={28} style={{ color, margin: "0 auto 0.75rem" }} aria-hidden="true" />
                <div className="stat-value" style={{ color }}>
                  <AnimatedCounter target={value} suffix={suffix} decimals={decimals || 0} />
                </div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="section dot-pattern reveal" aria-labelledby="why-us-title">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="badge badge-success" style={{ marginBottom: "1rem" }}>
              <Award size={12} />
              {lang === 'fr' ? 'Pourquoi nous choisir' : '¿Por qué elegirnos?'}
            </span>
            <h2 id="why-us-title" style={{ marginBottom: "1rem" }}>
              {lang === 'fr' ? <>La finance, <em>simplement</em></> : <>Las finanzas, <em>simplemente</em></>}
            </h2>
            <p style={{ color: "var(--color-text-muted)", maxWidth: "600px", margin: "0 auto" }}>
              {lang === 'fr' ? 'FinancePro réunit expertise financière, technologie moderne et engagement humain pour vous offrir la meilleure expérience de financement.' : 'FinancePro combina experiencia financiera, tecnología moderna y compromiso humano para ofrecerle la mejor experiencia de financiación.'}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
            {(lang === 'fr' ? [
              {
                icon: Shield,
                color: "#3B82F6",
                title: "🔒 Sécurité maximale",
                desc: "Données protégées RGPD, connexion SSL 256 bits. Intermédiaire agréé ORIAS, sous contrôle ACPR.",
                points: ["ORIAS enregistré", "Contrôlé par l'ACPR", "Chiffrement TLS 1.3"],
              },
              {
                icon: Zap,
                color: "var(--color-gold)",
                title: "⚡ Rapidité inégalée",
                desc: "Réponse de principe en 24h, fonds versés sous 48h après accord définitif.",
                points: ["Réponse 24h ouvrées", "Versement 48h + accord", "Dossier 100% digital"],
              },
              {
                icon: Eye,
                color: "var(--color-accent)",
                title: "💚 Transparence totale",
                desc: "Aucun frais caché. TAEG affiché dès la première simulation.",
                points: ["Aucun frais caché", "TAEG dès la simulation", "Offre contractuelle claire"],
              },
            ] : [
              {
                icon: Shield,
                color: "#3B82F6",
                title: "🔒 Seguridad máxima",
                desc: "Datos protegidos RGPD, conexión SSL 256 bits. Intermediario registrado ORIAS, bajo control ACPR.",
                points: ["ORIAS registrado", "Controlado por la ACPR", "Cifrado TLS 1.3"],
              },
              {
                icon: Zap,
                color: "var(--color-gold)",
                title: "⚡ Rapidez inigualable",
                desc: "Respuesta en 24h, fondos transferidos en 48h tras acuerdo definitivo.",
                points: ["Respuesta 24h laborables", "Transferencia 48h + acuerdo", "Expediente 100% digital"],
              },
              {
                icon: Eye,
                color: "var(--color-accent)",
                title: "💚 Transparencia total",
                desc: "Sin comisiones ocultas. TAE mostrada desde la primera simulación.",
                points: ["Sin comisiones ocultas", "TAE desde la simulación", "Oferta contractual clara"],
              },
            ]).map(({ icon: Icon, color, title, desc, points }) => (
              <div key={title} className="card reveal" style={{ padding: "2rem" }}>
                <div
                  className="feature-icon"
                  style={{
                    marginBottom: "1.25rem",
                    background: `${color}20`,
                    color,
                    width: "64px",
                    height: "64px",
                    borderRadius: "var(--radius-lg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={28} />
                </div>
                <h3 style={{ fontSize: "1.15rem", marginBottom: "0.75rem" }}>{title}</h3>
                <p style={{ color: "var(--color-text-muted)", marginBottom: "1.25rem", fontSize: "0.925rem", lineHeight: "1.7" }}>
                  {desc}
                </p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {points.map((p) => (
                    <li key={p} style={{ display: "flex", alignItems: "center", gap: "0.625rem", fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
                      <Check size={14} style={{ color, flexShrink: 0 }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOAN TYPES ===== */}
      <section className="section-sm section-gradient" aria-labelledby="loan-types-title">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 id="loan-types-title">{lang === 'fr' ? 'Nos solutions de financement' : 'Nuestras soluciones de financiación'}</h2>
            <p style={{ color: "var(--color-text-muted)", marginTop: "0.75rem" }}>
              {lang === 'fr' ? 'Des offres adaptées à chaque projet, à chaque profil' : 'Ofertas adaptadas a cada proyecto, a cada perfil'}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {loanTypes.map(({ icon: Icon, label, href, routeKey, rate, color, desc }, i) => (
              <Link
                key={href}
                href={getLocalizedPath(routeKey, locale)}
                className="loan-type-card reveal"
                style={{ animationDelay: `${i * 0.1}s`, textDecoration: "none" }}
                aria-label={`${label} — ${rate}`}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "var(--radius-lg)",
                    background: `${color}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color,
                    transition: "all 0.3s",
                  }}
                >
                  <Icon size={26} />
                </div>
                <div>
                  <div style={{ fontWeight: "700", fontSize: "1rem", color: "var(--color-text)", marginBottom: "0.25rem" }}>
                    {label}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>{desc}</div>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1rem",
                    fontWeight: "700",
                    color,
                  }}
                >
                  {rate}
                </div>
                <ChevronRight size={16} style={{ color: "var(--color-text-muted)" }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS / STEPPER ===== */}
      <section className="section" aria-labelledby="process-title" style={{ background: "var(--color-surface)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="badge badge-primary" style={{ marginBottom: "1rem" }}>
              {dict?.navbar?.how_it_works || 'Cómo funciona'}
            </span>
            <h2 id="process-title">{lang === 'fr' ? '5 étapes vers votre financement' : '5 pasos hacia su financiación'}</h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "0",
              position: "relative",
            }}
          >
            {/* Connection line */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "28px",
                left: "10%",
                right: "10%",
                height: "2px",
                background: "linear-gradient(90deg, var(--color-accent), var(--color-primary), var(--color-accent))",
                opacity: 0.3,
              }}
            />

            {steps.map((step, i) => (
              <div
                key={step.n}
                className="reveal"
                style={{
                  textAlign: "center",
                  padding: "1.5rem 1rem",
                  animationDelay: `${i * 0.15}s`,
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem",
                    fontSize: "1.5rem",
                    boxShadow: "var(--shadow-accent)",
                    position: "relative",
                    zIndex: 1,
                  }}
                  aria-hidden="true"
                >
                  {step.icon}
                </div>
                <span className="badge badge-success" style={{ marginBottom: "0.625rem" }}>
                  {step.duration}
                </span>
                <h3 style={{ fontSize: "0.925rem", marginBottom: "0.5rem" }}>{step.label}</h3>
                <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", lineHeight: "1.5" }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link href={getLocalizedPath('how_it_works', locale)} className="btn btn-secondary">
              {lang === 'fr' ? 'Voir le guide détaillé' : 'Ver la guía detallada'}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section" style={{ background: "var(--color-bg)" }} aria-labelledby="testimonials-title">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="badge badge-gold" style={{ marginBottom: "1rem" }}>
              <Star size={12} />
              {lang === 'fr' ? 'Témoignages vérifiés' : 'Testimonios verificados'}
            </span>
            <h2 id="testimonials-title">{dict?.home?.testimonials_title || 'Lo que dicen nuestros clientes'}</h2>
          </div>

          {/* Featured testimonial */}
          <div
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
              borderRadius: "var(--radius-xl)",
              padding: "3rem",
              marginBottom: "2rem",
              position: "relative",
              overflow: "hidden",
            }}
            aria-live="polite"
            aria-atomic="true"
          >
            <div style={{ position: "absolute", top: "-20px", right: "30px", fontSize: "12rem", fontFamily: "var(--font-display)", color: "rgba(255,255,255,0.04)", lineHeight: "1" }} aria-hidden="true">
              &ldquo;
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <div className="stars" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>
                {Array(testimonials[activeTestimonial].rating).fill(null).map((_, i) => (
                  <Star key={i} size={20} fill="var(--color-gold)" style={{ color: "var(--color-gold)" }} aria-hidden="true" />
                ))}
              </div>
              <p
                style={{
                  fontSize: "1.25rem",
                  color: "white",
                  textAlign: "center",
                  lineHeight: "1.7",
                  fontStyle: "italic",
                  fontFamily: "var(--font-display)",
                  maxWidth: "700px",
                  margin: "0 auto 1.5rem",
                }}
              >
                &ldquo;{testimonials[activeTestimonial].text}&rdquo;
              </p>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "white", fontWeight: "700" }}>{testimonials[activeTestimonial].name}</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>
                  {testimonials[activeTestimonial].city} — {testimonials[activeTestimonial].loan}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "2rem" }} role="tablist" aria-label="Sélection de témoignages">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                role="tab"
                aria-selected={activeTestimonial === i}
                aria-label={`Témoignage de ${t.name}`}
                style={{
                  width: activeTestimonial === i ? "28px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background: activeTestimonial === i ? "var(--color-accent)" : "var(--color-border)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Grid of all testimonials */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="testimonial-card reveal"
                style={{
                  opacity: activeTestimonial === i ? 1 : 0.85,
                  transition: "opacity 0.3s",
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <div className="stars" style={{ marginBottom: "0.75rem" }}>
                  {Array(t.rating).fill(null).map((_, j) => (
                    <Star key={j} size={14} fill="var(--color-gold)" style={{ color: "var(--color-gold)" }} aria-hidden="true" />
                  ))}
                </div>
                <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: "1.6", marginBottom: "1rem", fontStyle: "italic" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <span style={{ fontWeight: "700", fontSize: "0.875rem" }}>{t.name}</span>
                  <span style={{ color: "var(--color-text-muted)", fontSize: "0.8rem" }}> — {t.city}</span>
                  <div style={{ fontSize: "0.775rem", color: "var(--color-accent)", fontWeight: "600", marginTop: "0.25rem" }}>{t.loan}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUICK FAQ ===== */}
      <section className="section-sm" style={{ background: "var(--color-surface)" }} aria-labelledby="faq-quick-title">
        <div className="container" style={{ maxWidth: "800px" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2 id="faq-quick-title" style={{ fontSize: "1.75rem" }}>{lang === 'fr' ? 'Questions fréquentes' : 'Preguntas frecuentes'}</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {quickFAQ.map((item, i) => (
              <div key={i} className="accordion-item">
                <button
                  className="accordion-trigger"
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  aria-expanded={openFAQ === i}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                >
                  {item.q}
                  <ChevronRight
                    size={18}
                    className="accordion-icon"
                    style={{ transform: openFAQ === i ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}
                    aria-hidden="true"
                  />
                </button>
                {openFAQ === i && (
                  <div
                    className="accordion-body"
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                  >
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link href={getLocalizedPath('faq', locale)} className="btn btn-ghost">
              {lang === 'fr' ? 'Voir toutes les questions' : 'Ver todas las preguntas'}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section
        className="section mesh-gradient"
        style={{ textAlign: "center" }}
        aria-labelledby="cta-final-title"
      >
        <div className="container" style={{ maxWidth: "700px" }}>
          <span className="badge" style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)", marginBottom: "1.5rem" }}>
            {lang === 'fr' ? 'Sans engagement' : 'Sin compromiso'}
          </span>
          <h2
            id="cta-final-title"
            style={{
              color: "white",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              marginBottom: "1.25rem",
            }}
          >
            {lang === 'fr' ? 'Prêt à concrétiser votre projet ?' : '¿Listo para hacer realidad su proyecto?'}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "2.5rem" }}>
            {lang === 'fr' ? 'Rejoignez les 15 000+ clients qui nous font confiance. Votre demande prend 10 minutes, notre réponse arrive en 24h.' : 'Únase a los más de 15.000 clientes que confían en nosotros. Su solicitud toma 10 minutos, nuestra respuesta llega en 24h.'}
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href={getLocalizedPath('request', locale)} className="btn btn-white btn-xl">
              {lang === 'fr' ? 'Commencer ma demande' : 'Empezar mi solicitud'}
              <ArrowRight size={20} />
            </Link>
            <Link
              href={getLocalizedPath('simulator', locale)}
              className="btn btn-xl"
              style={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.3)", color: "white" }}
            >
              {lang === 'fr' ? "D'abord simuler" : 'Simular primero'}
            </Link>
          </div>

          <div style={{ marginTop: "2rem" }}>
            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
              {lang === 'fr' ? "⚠️ Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager. Service gratuit et sans engagement. Sous réserve d'acceptation de votre dossier." : "⚠️ Un crédito le compromete y debe ser reembolsado. Compruebe su capacidad de reembolso antes de comprometerse. Servicio gratuito y sin compromiso. Sujeto a la aprobación de su expediente."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
