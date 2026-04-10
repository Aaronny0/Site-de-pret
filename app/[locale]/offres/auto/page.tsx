"use client";

import Link from "next/link";
import { Car, ChevronRight, ArrowRight } from "lucide-react";
import { useDictionary } from "@/components/DictionaryProvider";
import { getLocalizedPath, type AppLocale } from "@/lib/routes";

export default function PretAutoPage() {
  const { lang } = useDictionary();
  const locale = lang as AppLocale;

  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, rgba(16, 185, 129, 0.4) 100%)", padding: "4rem 0 3rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "center" }}>
            <div>
              <nav aria-label="Fil d'Ariane" style={{ marginBottom: "1.5rem" }}>
                <ol style={{ display: "flex", gap: "0.5rem", listStyle: "none", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                  <li><Link href={getLocalizedPath('home', locale)} style={{ color: "rgba(255,255,255,0.5)" }}>{lang === 'fr' ? 'Accueil' : 'Inicio'}</Link></li>
                  <li><ChevronRight size={12} style={{ display: "inline" }} /></li>
                  <li><Link href={getLocalizedPath('offers', locale)} style={{ color: "rgba(255,255,255,0.5)" }}>{lang === 'fr' ? 'Nos offres' : 'Nuestras ofertas'}</Link></li>
                  <li><ChevronRight size={12} style={{ display: "inline" }} /></li>
                  <li style={{ color: "#6EE7B7" }}>{lang === 'fr' ? 'Prêt Auto & Moto' : 'Préstamo Coche y Moto'}</li>
                </ol>
              </nav>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "var(--radius-lg)", background: "rgba(16, 185, 129, 0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Car size={28} style={{ color: "#34D399" }} />
                </div>
                <span className="badge badge-success" style={{ background: "rgba(16, 185, 129, 0.4)", color: "white" }}>{lang === 'fr' ? 'Véhicules propres' : 'Vehículos ecológicos'}</span>
              </div>
              <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", marginBottom: "1rem" }}>
                {lang === 'fr' ? 'Financer votre nouveau véhicule' : 'Financie su nuevo vehículo'}
              </h1>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.1rem", lineHeight: "1.7", maxWidth: "550px" }}>
                {lang === 'fr' ? "Neuf ou occasion, hybride ou thermique. Bénéficiez d'un prêt affecté protégeant votre achat avec des conditions exceptionnelles pour les véhicules 100% électriques." : "Nuevo o de ocasión, híbrido o combustión. Benefíciese de un préstamo que protege su compra, con condiciones excepcionales para vehículos 100% eléctricos."}
              </p>
            </div>
             <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "var(--radius-xl)", padding: "2rem", textAlign: "center", minWidth: "220px", backdropFilter: "blur(10px)" }}>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", marginBottom: "0.25rem" }}>{lang === 'fr' ? 'Véhicules électriques dès' : 'Vehículos eléctricos desde'}</p>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "3rem", fontWeight: "700", color: "#6EE7B7", lineHeight: "1" }}>
                4,95<span style={{ fontSize: "1.5rem" }}>%</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", marginTop: "0.25rem" }}>{lang === 'fr' ? 'TAEG fixe' : 'TAE fija'}</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container">
           <div style={{ display: "flex", justifyContent: "center" }}>
             <Link href={getLocalizedPath('simulator', locale)} className="btn btn-primary btn-lg" style={{ background: "#10B981", border: "none" }}>
               {lang === 'fr' ? 'Calculer mes mensualités Auto' : 'Calcular mi cuota de coche'}
               <ArrowRight size={18} />
             </Link>
           </div>
        </div>
      </section>
    </>
  );
}
