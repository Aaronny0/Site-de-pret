"use client";

import Link from "next/link";
import { Users, ShieldCheck, Target, Heart, ArrowRight } from "lucide-react";

export default function AProposPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)", padding: "5rem 0", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "1rem" }}>
            Mieux financer demain
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.2rem", lineHeight: "1.6", marginBottom: "2rem" }}>
            FinancePro a été fondée avec une mission claire : rendre l'accès au crédit rapide, transparent et équitable pour tous les Français.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)", padding: "4rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "5rem" }}>
            {[
              { icon: Target, title: "Notre Mission", text: "Accompagner vos projets de vie (logement, mobilité, études) en vous trouvant le meilleur financement du marché, avec une technologie fluide et intuitive." },
              { icon: ShieldCheck, title: "Notre Promesse", text: "Zéro frais cachés, une sécurité bancaire maximale (certifications ACPR/ORIAS) et une transparence totale sur les taux et conditions." },
              { icon: Heart, title: "Nos Valeurs", text: "L'humain au cœur de la finance. Même dans un monde digitalisé, nos conseillers basés en France restent disponibles à chaque étape." }
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="card" style={{ padding: "2.5rem", borderTop: "4px solid var(--color-accent)", textAlign: "center" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(0, 200, 150, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                  <Icon size={28} style={{ color: "var(--color-accent)" }} />
                </div>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", fontFamily: "var(--font-body)", fontWeight: "700" }}>{title}</h3>
                <p style={{ color: "var(--color-text-muted)", lineHeight: "1.7" }}>{text}</p>
              </div>
            ))}
          </div>

          <div style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", padding: "3rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>L'équipe FinancePro</h2>
              <p style={{ color: "var(--color-text-muted)", lineHeight: "1.8", marginBottom: "1.5rem" }}>
                Nous sommes une équipe de 50 passionnés, composée d'experts en crédit, de développeurs et de spécialistes de la relation client. 
                Basés à Paris, nous travaillons main dans la main avec plus de 20 partenaires bancaires.
              </p>
              <Link href="/contact" className="btn btn-ghost">
                Nous contacter <ArrowRight size={16} />
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[
                { number: "20+", label: "Partenaires bancaires" },
                { number: "150k+", label: "Projets financés" },
                { number: "4.8/5", label: "Note Trustpilot" },
                { number: "100%", label: "Indépendance" },
              ].map((stat, i) => (
                <div key={i} style={{ background: "var(--color-bg-alt)", padding: "1.5rem", borderRadius: "var(--radius-lg)", textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--color-primary-light)", fontFamily: "var(--font-mono)" }}>{stat.number}</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", fontWeight: "600", marginTop: "0.5rem" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
