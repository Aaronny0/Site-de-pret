"use client";

import { useState } from "react";
import Link from "next/link";
import { Hammer, Check, FileText, ChevronRight, ArrowRight } from "lucide-react";

export default function PretTravauxPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, rgba(234, 88, 12, 0.4) 100%)", padding: "4rem 0 3rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "center" }}>
            <div>
              <nav aria-label="Fil d'Ariane" style={{ marginBottom: "1.5rem" }}>
                <ol style={{ display: "flex", gap: "0.5rem", listStyle: "none", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                  <li><Link href="/" style={{ color: "rgba(255,255,255,0.5)" }}>Accueil</Link></li>
                  <li><ChevronRight size={12} style={{ display: "inline" }} /></li>
                  <li><Link href="/offres" style={{ color: "rgba(255,255,255,0.5)" }}>Nos offres</Link></li>
                  <li><ChevronRight size={12} style={{ display: "inline" }} /></li>
                  <li style={{ color: "#FDBA74" }}>Prêt Travaux</li>
                </ol>
              </nav>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "var(--radius-lg)", background: "rgba(249, 115, 22, 0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Hammer size={28} style={{ color: "#FB923C" }} />
                </div>
                <span className="badge badge-success" style={{ background: "rgba(234, 88, 12, 0.4)", color: "white" }}>Éco-PTZ & Rénovation</span>
              </div>
              <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", marginBottom: "1rem" }}>
                Rénovez votre Télétravail ou Maison
              </h1>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.1rem", lineHeight: "1.7", maxWidth: "550px" }}>
                Financez vos travaux d'aménagement, d'agrandissement, de décoration ou de transition énergétique (MaPrimeRénov). Taux avantageux pour les travaux "Verts".
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container">
           <div style={{ background: "var(--color-surface)", padding: "3rem", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
             <h2 style={{ marginBottom: "1rem", fontSize: "1.75rem" }}>Des taux préférentiels pour l'Eco-Rénovation</h2>
             <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem", fontSize: "1.1rem" }}>
               FinancePro propose des taux débiteurs annuels fixes à partir de <strong>4,40 %</strong> (TAEG fixe : 4,75 %) pour les travaux permettant le passage d'un classement DPE F ou G à D au minimum.
             </p>
             <Link href="/simulateur" className="btn btn-primary btn-lg" style={{ background: "#EA580C", border: "none" }}>
               Simuler mes travaux
               <ArrowRight size={18} />
             </Link>
           </div>
        </div>
      </section>
    </>
  );
}
