"use client";

import Link from "next/link";
import { BookOpen, Clock, ChevronRight, User } from "lucide-react";

const mainArticle = {
  title: "Comment préparer son dossier de prêt immobilier en 2025 ?",
  category: "Conseils Immo",
  excerpt: "Avec la remontée des taux et le durcissement du HCSF, obtenir un financement nécessite plus de préparation qu'avant. Découvrez nos 5 stratégies.",
  readTime: "7 min",
  author: "Sarah L.",
  date: "12 Avril 2025"
};

const articles = [
  {
    title: "Le vrai coût d'un rachat de crédits",
    category: "Rachat",
    excerpt: "Comprendre les IRA et les frais de courtage avant de se lancer dans une opération de regroupement.",
    readTime: "5 min",
    author: "Marc D.",
    date: "5 Avril 2025"
  },
  {
    title: "DPE F ou G : comment financer ses travaux de rénovation énergétique ?",
    category: "Éco-Rénovation",
    excerpt: "MaPrimeRénov', Éco-PTZ... panorama complet des aides et solutions de prêt pour sortir des passoires thermiques.",
    readTime: "8 min",
    author: "Claire M.",
    date: "28 Mars 2025"
  },
  {
    title: "Emprunter sans CDI, c'est encore possible ?",
    category: "Prêt Personnel",
    excerpt: "Indépendants, CDD, intérimaires : quelles banques acceptent votre profil et sous quelles conditions financières ?",
    readTime: "4 min",
    author: "Sarah L.",
    date: "15 Mars 2025"
  }
];

export default function BlogPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", padding: "4rem 0 3rem", textAlign: "center" }}>
        <div className="container">
          <div style={{ width: "60px", height: "60px", borderRadius: "var(--radius-lg)", background: "rgba(0,200,150,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
            <BookOpen size={28} style={{ color: "var(--color-accent)" }} />
          </div>
          <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "0.75rem" }}>
            Blog & Conseils Experts
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.1rem" }}>
            L'actualité financière et nos guides pratiques pour maîtriser votre budget.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)", padding: "4rem 0" }}>
        <div className="container">
           {/* Article à la une */}
           <div style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", marginBottom: "4rem", border: "1px solid var(--color-border)" }}>
             <div style={{ background: "var(--color-bg-alt)", minHeight: "300px" }}>
               <div style={{ width: "100%", height: "100%", background: "linear-gradient(45deg, #eee, #ddd)", display: "flex", alignItems: "center", justifyContent: "center", color: "#999" }}>
                  Image "Une"
               </div>
             </div>
             <div style={{ padding: "3rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
               <span className="badge badge-success" style={{ alignSelf: "flex-start", marginBottom: "1rem" }}>{mainArticle.category}</span>
               <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem", lineHeight: "1.3" }}>
                 <Link href="#" style={{ color: "var(--color-text)", textDecoration: "none" }}>{mainArticle.title}</Link>
               </h2>
               <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem", lineHeight: "1.6" }}>{mainArticle.excerpt}</p>
               <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
                 <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><User size={16} /> {mainArticle.author}</div>
                 <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Clock size={16} /> {mainArticle.readTime}</div>
               </div>
             </div>
           </div>

           {/* Grille d'articles */}
           <h3 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>Derniers articles</h3>
           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem", paddingBottom: "4rem" }}>
             {articles.map((article, i) => (
                <div key={i} className="card" style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", padding: "0" }}>
                  <div style={{ height: "180px", background: "var(--color-bg-alt)", borderBottom: "1px solid var(--color-border)" }} />
                  <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flexGrow: "1" }}>
                    <span style={{ color: "var(--color-primary-light)", fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", marginBottom: "0.75rem" }}>{article.category}</span>
                    <h4 style={{ fontSize: "1.1rem", marginBottom: "0.75rem", lineHeight: "1.4" }}>
                      <Link href="#" style={{ color: "var(--color-text)", textDecoration: "none" }}>{article.title}</Link>
                    </h4>
                    <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "1.5rem", flexGrow: 1 }}>
                      {article.excerpt}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem", borderTop: "1px solid var(--color-border-light)", fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                      <span>{article.date}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><Clock size={14} /> {article.readTime}</span>
                    </div>
                  </div>
                </div>
             ))}
           </div>
        </div>
      </section>
    </>
  );
}
