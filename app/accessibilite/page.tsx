import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Déclaration d'accessibilité | FinancePro",
};

export default function AccessibilitePage() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", padding: "3.5rem 0 3rem", textAlign: "center" }}>
         <div className="container"><h1 style={{ color: "white" }}>Déclaration d'accessibilité</h1></div>
      </section>
      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <div className="card legal-content" style={{ padding: "3rem" }}>
             <h2>Engagement d'Accessibilité</h2>
             <p>
               FinancePro s'engage à rendre ses sites internet et applications accessibles conformément à l'article 47 de la loi n°2005-102 du 11 février 2005. Notre objectif est de garantir un accès équitable aux services bancaires en ligne pour tous les utilisateurs, y compris ceux souffrant de handicaps visuels, auditifs, moteurs ou cognitifs.
             </p>

             <h2>État de conformité</h2>
             <p>
               Ce site est conçu pour être <strong>partiellement conforme</strong> avec le Référentiel Général d'Amélioration de l'Accessibilité (RGAA), version 4.1. L'audit complet est en cours de réalisation par un tiers indépendant afin de dresser une liste précise des non-conformités et de les corriger.
             </p>

             <h2>Technologies utilisées</h2>
             <ul>
               <li>HTML5 / React (Next.js)</li>
               <li>WAI-ARIA pour les composants dynamiques</li>
               <li>Contrastes élevés par défaut (et mode sombre natif)</li>
             </ul>

             <h2>Retour d'information et contact</h2>
             <p>Si vous n'arrivez pas à accéder à un contenu ou à un service de simulation de crédit, vous pouvez contacter le responsable du site web pour être orienté vers une alternative ou obtenir le contenu sous une autre forme : <a href="mailto:contact@financepro.fr">contact@financepro.fr</a>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
