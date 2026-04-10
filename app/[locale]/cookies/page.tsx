import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestion des Cookies | FinancePro",
};

export default function CookiesPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", padding: "3.5rem 0 3rem", textAlign: "center" }}>
         <div className="container"><h1 style={{ color: "white" }}>Politique des Cookies</h1></div>
      </section>
      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <div className="card legal-content" style={{ padding: "3rem" }}>
             <h2>1. Qu'est-ce qu'un cookie ?</h2>
             <p>Un cookie est un fichier texte stocké sur votre appareil qui nous permet de retenir vos informations de navigation.</p>

             <h2>2. Cookies Essentiels (Techniques)</h2>
             <p>Actifs par défaut. Ils sont indispensables au fonctionnement du simulateur, de l'espace client et pour mémoriser votre choix sur les autres cookies (ex: cookie_consent).</p>

             <h2>3. Cookies de Performance & Analytique</h2>
             <p>Soumis à votre consentement. Ils nous aident à mesurer l'audience et détecter les pages ayant des erreurs de navigation.</p>

             <h2>4. Comment gérer vos consentements ?</h2>
             <p>Vous pouvez à tout moment modifier vos choix d'acceptation en cliquant sur l'icône de paramétrage présente en bas de votre écran ou modifier les réglages de votre navigateur web (Chrome, Firefox, Safari...).</p>
          </div>
        </div>
      </section>
    </>
  );
}
