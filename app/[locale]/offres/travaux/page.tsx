"use client";

import { useState } from "react";
import Link from "next/link";
import { Hammer, Check, FileText, ChevronRight, ArrowRight } from "lucide-react";
import { useDictionary } from "@/components/DictionaryProvider";
import { getLocalizedPath, type AppLocale } from "@/lib/routes";

export default function PretTravauxPage() {
  const { lang } = useDictionary();
  const locale = lang as AppLocale;

  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, rgba(234, 88, 12, 0.4) 100%)", padding: "4rem 0 3rem" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto]" style={{gap: "3rem", alignItems: "center"}}>
            <div>
              <nav aria-label="Fil d'Ariane" style={{ marginBottom: "1.5rem" }}>
                <ol style={{ display: "flex", gap: "0.5rem", listStyle: "none", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                  <li><Link href={getLocalizedPath('home', locale)} style={{ color: "rgba(255,255,255,0.5)" }}>{lang === 'fr' ? 'Accueil' : 'Inicio'}</Link></li>
                  <li><ChevronRight size={12} style={{ display: "inline" }} /></li>
                  <li><Link href={getLocalizedPath('offers', locale)} style={{ color: "rgba(255,255,255,0.5)" }}>{lang === 'fr' ? 'Nos offres' : 'Nuestras ofertas'}</Link></li>
                  <li><ChevronRight size={12} style={{ display: "inline" }} /></li>
                  <li style={{ color: "#FDBA74" }}>{lang === 'fr' ? 'Prêt Travaux' : 'Préstamo Reformas'}</li>
                </ol>
              </nav>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "var(--radius-lg)", background: "rgba(249, 115, 22, 0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Hammer size={28} style={{ color: "#FB923C" }} />
                </div>
                <span className="badge badge-success" style={{ background: "rgba(234, 88, 12, 0.4)", color: "white" }}>{lang === 'fr' ? "Éco-PTZ & Rénovation" : "Ayudas & Renovación"}</span>
              </div>
              <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", marginBottom: "1rem" }}>
                {lang === 'fr' ? 'Rénovez votre Télétravail ou Maison' : 'Renueve su Hogar o Espacio de Trabajo'}
              </h1>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.1rem", lineHeight: "1.7", maxWidth: "550px" }}>
                {lang === 'fr' ? "Financez vos travaux d'aménagement, d'agrandissement, de décoration ou de transition énergétique (MaPrimeRénov). Taux avantageux pour les travaux \"Verts\"." : "Financie sus obras de acondicionamiento, ampliación, decoración o transición energética. Tipos ventajosos para inversiones sostenibles."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container">
           <div style={{ background: "var(--color-surface)", padding: "3rem", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: "800px", width: "100%", margin: "0 auto" }}>
             <h2 style={{ marginBottom: "1rem", fontSize: "1.75rem" }}>{lang === 'fr' ? "Des taux préférentiels pour l'Eco-Rénovation" : "Tipos preferentes para Eco-Renovación"}</h2>
             <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem", fontSize: "1.1rem" }}>
               {lang === 'fr' ? "FinancePro propose des taux débiteurs annuels fixes à partir de " : "FinancePro ofrece tipos deudores anuales fijos desde "}
               <strong>4,40 %</strong>
               {lang === 'fr' ? " (TAEG fixe : 4,75 %) pour les travaux permettant le passage d'un classement DPE F ou G à D au minimum." : " (TAE fija: 4,75 %) para obras que mejoren significativamente la calificación energética de su vivienda."}
             </p>
             <Link href={getLocalizedPath('simulator', locale)} className="btn btn-primary btn-lg" style={{ background: "#EA580C", border: "none" }}>
               {lang === 'fr' ? 'Simuler mes travaux' : 'Simular mis obras'}
               <ArrowRight size={18} />
             </Link>
           </div>
        </div>
      </section>
    </>
  );
}
