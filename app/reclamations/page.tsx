import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ChevronRight, Mail, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Réclamations | FinancePro",
  description: "Procédure de réclamation FinancePro : comment déposer une réclamation, délais de traitement, médiation et recours.",
};

export default function ReclamationsPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", padding: "3.5rem 0 3rem", textAlign: "center" }}>
        <div className="container">
          <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "0.5rem" }}>
            Procédure de Réclamation
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem" }}>
            Conformément aux articles L. 616-1, R. 616-1 du Code de la consommation
          </p>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <div className="card legal-content" style={{ padding: "3rem" }}>

            <div className="alert alert-info" style={{ marginBottom: "2rem" }}>
              <AlertTriangle size={16} style={{ flexShrink: 0 }} />
              <p>
                FinancePro SAS s&apos;engage à traiter toute réclamation avec la plus grande diligence.
                Conformément à la réglementation bancaire et à notre engagement qualité.
              </p>
            </div>

            <h2>1. Étape 1 — Service Réclamations FinancePro</h2>
            <p>Adressez votre réclamation à notre Service Réclamations :</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", margin: "1rem 0" }}>
              <div style={{ background: "var(--color-bg-alt)", borderRadius: "var(--radius-md)", padding: "1.25rem" }}>
                <p style={{ fontWeight: "700", marginBottom: "0.5rem" }}>Par email (recommandé)</p>
                <a href="mailto:reclamations@financepro.fr" style={{ color: "var(--color-primary-light)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <Mail size={14} />
                  reclamations@financepro.fr
                </a>
                <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: "0.4rem" }}>
                  Délai de réponse : 10 jours ouvrables
                </p>
              </div>
              <div style={{ background: "var(--color-bg-alt)", borderRadius: "var(--radius-md)", padding: "1.25rem" }}>
                <p style={{ fontWeight: "700", marginBottom: "0.5rem" }}>Par courrier recommandé</p>
                <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
                  FinancePro SAS — Service Réclamations<br />
                  1 rue de la Finance<br />
                  75001 Paris
                </p>
              </div>
            </div>
            <p>
              <strong>Délais légaux :</strong> Accusé de réception sous 10 jours ouvrables (Recommandation ACPR 2011-R-05).
              Réponse définitive sous 15 jours ouvrables (35 jours pour les situations complexes).
            </p>

            <h2>2. Étape 2 — Médiation</h2>
            <p>
              Si notre réponse ne vous satisfait pas, ou en l&apos;absence de réponse dans les délais,
              vous pouvez saisir gratuitement le médiateur : 
            </p>
            <div style={{ background: "rgba(0,200,150,0.06)", border: "1px solid rgba(0,200,150,0.2)", borderRadius: "var(--radius-lg)", padding: "1.5rem", margin: "1rem 0" }}>
              <p style={{ fontWeight: "700", fontSize: "1rem", marginBottom: "0.5rem" }}>Médiateur AME CONSO</p>
              <p>197 Boulevard Saint Germain — 75007 Paris</p>
              <p>Formulaire en ligne : <a href="https://www.mediateur-consommation-ame.fr" target="_blank" rel="noopener noreferrer">www.mediateur-consommation-ame.fr</a></p>
              <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: "0.5rem" }}>
                La médiation est gratuite. Le médiateur rend un avis dans un délai de 90 jours.
                Son avis n&apos;est pas contraignant.
              </p>
            </div>

            <h2>3. Étape 3 — Recours institutionnels</h2>
            <ul>
              <li><strong>ACPR</strong> (Autorité de Contrôle Prudentiel et de Résolution) — 4 place de Budapest, 75436 Paris Cedex 09 — <a href="https://www.acpr.banque-france.fr" target="_blank" rel="noopener noreferrer">www.acpr.banque-france.fr</a></li>
              <li><strong>DGCCRF</strong> (Direction Générale de la Concurrence) — <a href="https://www.economie.gouv.fr/dgccrf" target="_blank" rel="noopener noreferrer">www.economie.gouv.fr/dgccrf</a></li>
              <li><strong>Plateforme européenne de résolution des litiges</strong> (REL) : <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">ec.europa.eu/consumers/odr</a></li>
            </ul>

            <h2>4. Informations à fournir</h2>
            <p>Pour un traitement efficace de votre réclamation, merci d&apos;indiquer :</p>
            <ul>
              <li>Vos nom, prénom, coordonnées complètes</li>
              <li>Votre numéro de dossier ou contrat</li>
              <li>L&apos;objet précis de votre réclamation</li>
              <li>Toute pièce justificative pertinente</li>
              <li>Le résultat escompté</li>
            </ul>

            <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem" }}>
              <Link href="/contact" className="btn btn-primary btn-sm">
                <ArrowRight size={14} />
                Nous contacter
              </Link>
              <Link href="/mentions-legales" className="btn btn-ghost btn-sm">Mentions légales</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
