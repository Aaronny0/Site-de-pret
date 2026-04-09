import Link from "next/link";
import type { Metadata } from "next";
import { Shield, FileText, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Mentions Légales | FinancePro",
  description: "Mentions légales du site FinancePro — Éditeur, hébergement, activité réglementée IOBSP, ORIAS, ACPR.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", padding: "3.5rem 0 3rem", textAlign: "center" }}>
        <div className="container">
          <div style={{ width: "60px", height: "60px", borderRadius: "var(--radius-lg)", background: "rgba(0,200,150,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
            <Shield size={28} style={{ color: "var(--color-accent)" }} />
          </div>
          <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "0.75rem" }}>
            Mentions Légales
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem" }}>
            Dernière mise à jour : 6 avril 2025
          </p>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <div className="card legal-content" style={{ padding: "3rem" }}>

            <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem", padding: "1rem 1.25rem", background: "var(--color-bg-alt)", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--color-primary)", fontSize: "0.9rem" }}>
              Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la Confiance en l&apos;Économie
              Numérique (LCEN), il est précisé aux utilisateurs du site FinancePro l&apos;identité des différents
              intervenants dans le cadre de sa réalisation et de son suivi.
            </p>

            <h2>1. Éditeur du site</h2>
            <table>
              <tbody>
                {[
                  ["Raison sociale", "FinancePro SAS"],
                  ["Capital social", "100 000 €"],
                  ["RCS", "Paris 000 000 000"],
                  ["SIRET", "000 000 000 00000"],
                  ["Siège social", "1 rue de la Finance, 75001 Paris"],
                  ["Téléphone", "01 00 00 00 00 (non surtaxé)"],
                  ["Email", "contact@financepro.fr"],
                  ["Directeur de la publication", "Jean Dupont, Président"],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td style={{ width: "45%", fontWeight: "600", color: "var(--color-text)" }}>{label}</td>
                    <td style={{ color: "var(--color-text-muted)" }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2>2. Hébergement</h2>
            <table>
              <tbody>
                {[
                  ["Hébergeur", "Vercel Inc."],
                  ["Adresse", "340 S Lemon Ave #4133, Walnut, CA 91789, USA"],
                  ["Contact", "privacy@vercel.com"],
                  ["Localisation des données", "Union Européenne (France / Allemagne)"],
                ].map(([l, v]) => (
                  <tr key={l}><td style={{ width: "45%", fontWeight: "600" }}>{l}</td><td style={{ color: "var(--color-text-muted)" }}>{v}</td></tr>
                ))}
              </tbody>
            </table>

            <h2>3. Activité réglementée</h2>
            <div style={{ background: "rgba(0,200,150,0.06)", border: "1px solid rgba(0,200,150,0.2)", borderRadius: "var(--radius-md)", padding: "1.25rem", marginBottom: "1.25rem" }}>
              <p style={{ color: "var(--color-text)", fontWeight: "600", marginBottom: "0.5rem" }}>
                FinancePro SAS est enregistrée en tant qu&apos;Intermédiaire en Opérations de Banque et en Services de Paiement
                (IOBSP) sous le numéro ORIAS : <strong>00-000-000</strong>
              </p>
              <p style={{ fontSize: "0.875rem" }}>
                Consultable sur{" "}
                <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary-light)", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                  www.orias.fr <ExternalLink size={12} />
                </a>
              </p>
            </div>
            <p>
              FinancePro SAS est soumise au contrôle de l&apos;Autorité de Contrôle Prudentiel et de Résolution (ACPR) —
              4 place de Budapest, CS 92459, 75436 Paris Cedex 09.{" "}
              <a href="https://www.acpr.banque-france.fr" target="_blank" rel="noopener noreferrer">
                www.acpr.banque-france.fr
              </a>
            </p>

            <h2>4. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble du contenu du présent site (textes, images, vidéos, logos, graphismes, icônes, sons, logiciels,
              bases de données, architecture) est la propriété exclusive de FinancePro SAS ou de ses partenaires, et est
              protégé par les lois françaises et internationales relatives à la propriété intellectuelle (notamment le Code
              de la Propriété Intellectuelle).
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, transmission ou adaptation partielle ou totale
              des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite
              préalable de FinancePro SAS, sous peine de poursuites judiciaires.
            </p>

            <h2>5. Liens hypertextes</h2>
            <p>
              Le site FinancePro.fr peut contenir des liens hypertextes vers d&apos;autres sites internet. FinancePro SAS
              n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu, leurs
              politiques de confidentialité ou leurs pratiques.
            </p>

            <h2>6. Limitation de responsabilité</h2>
            <p>
              Les informations contenues sur ce site sont aussi précises que possible et le site est remis à jour
              régulièrement, mais peut toutefois contenir des inexactitudes ou des omissions. FinancePro SAS ne saurait
              être tenue responsable des dommages directs ou indirects causés au matériel de l&apos;utilisateur, lors de
              l&apos;accès au site, résultant de l&apos;utilisation d&apos;un matériel ne répondant pas aux spécifications
              indiquées, ou de l&apos;apparition d&apos;un bug ou d&apos;une incompatibilité.
            </p>

            <h2>7. Droit applicable et juridiction</h2>
            <p>
              Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français
              seront seuls compétents. Le tribunal compétent est celui du ressort du siège social de FinancePro SAS
              (Paris), sauf disposition légale contraire.
            </p>

            <h2>8. Médiation de la consommation</h2>
            <div style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "var(--radius-md)", padding: "1.25rem" }}>
              <p>
                En cas de litige, vous pouvez avoir recours gratuitement à un médiateur de la consommation.
                Conformément à l&apos;article L.616-1 du Code de la consommation :
              </p>
              <p style={{ fontWeight: "600", marginTop: "0.5rem" }}>
                Médiateur de la consommation agréé : Médiateur AME CONSO<br />
                197 Boulevard Saint Germain — 75007 Paris<br />
                <a href="https://www.mediateur-consommation-ame.fr" target="_blank" rel="noopener noreferrer">www.mediateur-consommation-ame.fr</a>
              </p>
            </div>

            <h2>9. Données personnelles</h2>
            <p>
              Le traitement de vos données personnelles est régi par notre{" "}
              <Link href="/confidentialite">Politique de Confidentialité</Link>{" "}
              et notre <Link href="/cookies">Politique de Cookies</Link>.
            </p>
            <p>
              Pour exercer vos droits RGPD : <a href="mailto:dpo@financepro.fr">dpo@financepro.fr</a>
            </p>

            <div style={{ marginTop: "2.5rem", padding: "1.25rem", background: "var(--color-bg-alt)", borderRadius: "var(--radius-md)", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {[
                { label: "Politique de Confidentialité", href: "/confidentialite" },
                { label: "CGU", href: "/cgu" },
                { label: "CGV / CGS", href: "/cgv" },
                { label: "Cookies", href: "/cookies" },
                { label: "Réclamations", href: "/reclamations" },
                { label: "Accessibilité", href: "/accessibilite" },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    fontSize: "0.875rem",
                    color: "var(--color-primary-light)",
                    textDecoration: "none",
                    fontWeight: "500",
                  }}
                >
                  <FileText size={14} />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
