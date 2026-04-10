"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User, Home, Briefcase, RefreshCw, Wrench, Car,
  ArrowRight, Star, Filter, ChevronRight, TrendingUp,
} from "lucide-react";
import { useDictionary } from "@/components/DictionaryProvider";
import { getLocalizedPath, type AppLocale } from "@/lib/routes";

const offers_fr = [
  {
    id: "personnel",
    icon: User,
    label: "Prêt Personnel",
    routeKey: "offers_personal",
    rate: "dès 5,50%",
    taeg: "dès 5,98%",
    min: "1 000 €",
    max: "75 000 €",
    duration: "12 à 84 mois",
    color: "#3B82F6",
    tag: "Populaire",
    tagColor: "badge-primary",
    advantages: ["Sans justificatif d'utilisation", "Réponse en 24h", "Taux fixe"],
    type: "consommation",
  },
  {
    id: "immobilier",
    icon: Home,
    label: "Prêt Immobilier",
    routeKey: "offers_realestate",
    rate: "dès 3,40%",
    taeg: "dès 3,52%",
    min: "50 000 €",
    max: "700 000 €",
    duration: "15 à 30 ans",
    color: "#8B5CF6",
    tag: "Meilleur taux",
    tagColor: "badge-success",
    advantages: ["Taux fixe ou variable", "PTZ disponible", "Assurance intégrée"],
    type: "immobilier",
  },
  {
    id: "professionnel",
    icon: Briefcase,
    label: "Prêt Professionnel",
    routeKey: "offers_professional",
    rate: "dès 4,80%",
    taeg: "dès 5,35%",
    min: "5 000 €",
    max: "500 000 €",
    duration: "12 à 120 mois",
    color: "#F59E0B",
    tag: "TPE / PME",
    tagColor: "badge-gold",
    advantages: ["Tous secteurs d'activité", "Apport possible 0%", "Garantie BPI France"],
    type: "professionnel",
  },
  {
    id: "rachat",
    icon: RefreshCw,
    label: "Rachat de Crédit",
    routeKey: "offers_consolidation",
    rate: "dès 4,20%",
    taeg: "dès 4,70%",
    min: "10 000 €",
    max: "300 000 €",
    duration: "12 à 180 mois",
    color: "#00C896",
    tag: "Économies garanties",
    tagColor: "badge-success",
    advantages: ["1 seule mensualité", "Mensualité réduite", "Taux unique"],
    type: "consommation",
  },
  {
    id: "travaux",
    icon: Wrench,
    label: "Prêt Travaux",
    routeKey: "offers_renovation",
    rate: "dès 4,90%",
    taeg: "dès 5,30%",
    min: "1 000 €",
    max: "75 000 €",
    duration: "12 à 84 mois",
    color: "#EC4899",
    tag: "Éco-PTZ dispo",
    tagColor: "badge-info",
    advantages: ["Rénovation énergétique", "Artisans RGE", "MaPrimeRénov'"],
    type: "consommation",
  },
  {
    id: "auto",
    icon: Car,
    label: "Prêt Auto",
    routeKey: "offers_auto",
    rate: "dès 4,50%",
    taeg: "dès 4,95%",
    min: "3 000 €",
    max: "60 000 €",
    duration: "12 à 84 mois",
    color: "#06B6D4",
    tag: "Neuf & Occasion",
    tagColor: "badge-primary",
    advantages: ["Neuf ou occasion", "LOA disponible", "Crédit affecté"],
    type: "consommation",
  },
];

const offers_es = [
  {
    id: "personnel",
    icon: User,
    label: "Préstamo Personal",
    routeKey: "offers_personal",
    rate: "desde 5,50%",
    taeg: "desde 5,98%",
    min: "1.000 €",
    max: "75.000 €",
    duration: "12 a 84 meses",
    color: "#3B82F6",
    tag: "Popular",
    tagColor: "badge-primary",
    advantages: ["Sin justificar uso", "Respuesta en 24h", "Tipo fijo"],
    type: "consommation",
  },
  {
    id: "immobilier",
    icon: Home,
    label: "Préstamo Hipotecario",
    routeKey: "offers_realestate",
    rate: "desde 3,40%",
    taeg: "desde 3,52%",
    min: "50.000 €",
    max: "700.000 €",
    duration: "15 a 30 años",
    color: "#8B5CF6",
    tag: "Mejor tipo",
    tagColor: "badge-success",
    advantages: ["Tipo fijo o variable", "Ayudas disponibles", "Seguro integrado"],
    type: "immobilier",
  },
  {
    id: "professionnel",
    icon: Briefcase,
    label: "Préstamo Profesional",
    routeKey: "offers_professional",
    rate: "desde 4,80%",
    taeg: "desde 5,35%",
    min: "5.000 €",
    max: "500.000 €",
    duration: "12 a 120 meses",
    color: "#F59E0B",
    tag: "Pymes / Autónomos",
    tagColor: "badge-gold",
    advantages: ["Todos los sectores", "Aportación 0% posible", "Garantía estatal"],
    type: "professionnel",
  },
  {
    id: "rachat",
    icon: RefreshCw,
    label: "Reagrupación de Créditos",
    routeKey: "offers_consolidation",
    rate: "desde 4,20%",
    taeg: "desde 4,70%",
    min: "10.000 €",
    max: "300.000 €",
    duration: "12 a 180 meses",
    color: "#00C896",
    tag: "Ahorro garantizado",
    tagColor: "badge-success",
    advantages: ["1 sola cuota", "Cuota reducida", "Tipo único"],
    type: "consommation",
  },
  {
    id: "travaux",
    icon: Wrench,
    label: "Préstamo Obras",
    routeKey: "offers_renovation",
    rate: "desde 4,90%",
    taeg: "desde 5,30%",
    min: "1.000 €",
    max: "75.000 €",
    duration: "12 a 84 meses",
    color: "#EC4899",
    tag: "Eco-préstamo disp.",
    tagColor: "badge-info",
    advantages: ["Reforma energética", "Profesionales certif.", "Ayudas estatales"],
    type: "consommation",
  },
  {
    id: "auto",
    icon: Car,
    label: "Préstamo Auto",
    routeKey: "offers_auto",
    rate: "desde 4,50%",
    taeg: "desde 4,95%",
    min: "3.000 €",
    max: "60.000 €",
    duration: "12 a 84 meses",
    color: "#06B6D4",
    tag: "Nuevo y Ocasión",
    tagColor: "badge-primary",
    advantages: ["Nuevo o segunda mano", "Renting disponible", "Crédito afectado"],
    type: "consommation",
  },
];

const filterTypes_fr = [
  { id: "all", label: "Tous" },
  { id: "consommation", label: "Consommation" },
  { id: "immobilier", label: "Immobilier" },
  { id: "professionnel", label: "Professionnel" },
];

const filterTypes_es = [
  { id: "all", label: "Todos" },
  { id: "consommation", label: "Consumo" },
  { id: "immobilier", label: "Hipotecario" },
  { id: "professionnel", label: "Profesional" },
];

export default function OffresPage() {
  const { lang } = useDictionary();
  const locale = lang as AppLocale;
  const offers = lang === 'fr' ? offers_fr : offers_es;
  const filterTypes = lang === 'fr' ? filterTypes_fr : filterTypes_es;

  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? offers : offers.filter((o) => o.type === filter);

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)",
          padding: "4rem 0 3rem",
          textAlign: "center",
        }}
      >
        <div className="container">
          <span className="badge" style={{ background: "rgba(0,200,150,0.15)", color: "var(--color-accent)", border: "1px solid rgba(0,200,150,0.3)", marginBottom: "1.25rem" }}>
            <TrendingUp size={12} />
            {lang === 'fr' ? 'Nos solutions' : 'Nuestras soluciones'}
          </span>
          <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1rem" }}>
            {lang === 'fr' ? 'Des offres adaptées à chaque projet' : 'Ofertas adaptadas a cada proyecto'}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "560px", margin: "0 auto" }}>
            {lang === 'fr' ? 'Taux compétitifs, transparents et affichés dès la simulation. Trouvez le financement qui correspond à votre situation.' : 'Tipos competitivos, transparentes y mostrados desde la simulación. Encuentre la financiación que mejor se adapte a su situación.'}
          </p>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container">

          {/* Filters */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "2.5rem",
              flexWrap: "wrap",
            }}
          >
            <Filter size={16} style={{ color: "var(--color-text-muted)" }} aria-hidden="true" />
            <span style={{ fontSize: "0.875rem", fontWeight: "600", color: "var(--color-text-muted)" }}>
              {lang === 'fr' ? 'Filtrer :' : 'Filtrar:'}
            </span>
            {filterTypes.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                aria-pressed={filter === id}
                style={{
                  padding: "0.5rem 1.25rem",
                  borderRadius: "var(--radius-full)",
                  border: `1.5px solid ${filter === id ? "var(--color-primary)" : "var(--color-border)"}`,
                  background: filter === id ? "var(--color-primary)" : "white",
                  color: filter === id ? "white" : "var(--color-text)",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  transition: "all 0.2s",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {filtered.map(({ id, icon: Icon, label, routeKey, rate, taeg, min, max, duration, color, tag, tagColor, advantages }) => (
              <article
                key={id}
                className="card"
                style={{ padding: "0", overflow: "hidden" }}
                aria-label={`Offre ${label}`}
              >
                {/* Card header */}
                <div
                  style={{
                    background: `linear-gradient(135deg, ${color}15, ${color}08)`,
                    borderBottom: "1px solid var(--color-border)",
                    padding: "1.5rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "var(--radius-md)",
                        background: `${color}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color,
                      }}
                    >
                      <Icon size={24} aria-hidden="true" />
                    </div>
                    <span className={`badge ${tagColor}`}>{tag}</span>
                  </div>
                  <h2 style={{ fontSize: "1.15rem", marginBottom: "0.25rem" }}>{label}</h2>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.75rem", fontWeight: "700", color }}>{rate}</span>
                    <span style={{ fontSize: "0.825rem", color: "var(--color-text-muted)" }}>TAEG {taeg}</span>
                  </div>
                </div>

                {/* Card body */}
                <div style={{ padding: "1.25rem 1.5rem" }}>
                  {/* Specs */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1.25rem" }}>
                    {[
                      { label: "Min", value: min },
                      { label: "Max", value: max },
                      { label: lang === 'fr' ? "Durée" : "Plazo", value: duration },
                      { label: lang === 'fr' ? "Réponse" : "Respuesta", value: "24h" },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        style={{
                          background: "var(--color-bg-alt)",
                          borderRadius: "var(--radius-sm)",
                          padding: "0.5rem 0.75rem",
                        }}
                      >
                        <div style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", fontWeight: "700", color: "var(--color-text)" }}>{value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Advantages */}
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.25rem" }}>
                    {advantages.map((adv) => (
                      <li key={adv} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
                        <Star size={12} style={{ color, flexShrink: 0 }} aria-hidden="true" />
                        {adv}
                      </li>
                    ))}
                  </ul>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "0.625rem" }}>
                    <Link href={getLocalizedPath(routeKey, locale)} className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: "center" }}>
                      {lang === 'fr' ? 'En savoir plus' : 'Saber más'}
                    </Link>
                    <Link href={getLocalizedPath('simulator', locale)} className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: "center" }}>
                      {lang === 'fr' ? 'Simuler' : 'Simular'}
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Legal Note */}
          <div className="legal-banner" style={{ marginTop: "2.5rem" }}>
            <p>
              <strong>⚠️ {lang === 'fr' ? 'Important :' : 'Importante :'}</strong> {lang === 'fr' ? "Les taux affichés sont des taux indicatifs à partir de. Le TAEG définitif dépend de votre profil, du montant et de la durée. Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager. Sous réserve d'acceptation de votre dossier par FinancePro." : "Los tipos mostrados son orientativos a partir de. La TAE definitiva dependerá de su perfil, importe y duración. Un crédito le compromete y debe ser reembolsado. Compruebe su capacidad de reembolso antes de comprometerse. Sujeto a la aprobación de su expediente por FinancePro."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
