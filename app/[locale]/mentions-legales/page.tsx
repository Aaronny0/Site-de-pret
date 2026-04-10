import Link from "next/link";
import type { Metadata } from "next";
import { Shield, FileText, ExternalLink } from "lucide-react";
import { useDictionary } from "@/components/DictionaryProvider";
import { getLocalizedPath, type AppLocale } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Mentions Légales | FinancePro",
  description: "Mentions légales du site FinancePro — Éditeur, hébergement, activité réglementée IOBSP, ORIAS, ACPR.",
};

export default function MentionsLegalesPage() {
  const { lang, dict } = useDictionary();
  const locale = lang as AppLocale;

  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", padding: "3.5rem 0 3rem", textAlign: "center" }}>
        <div className="container">
          <div style={{ width: "60px", height: "60px", borderRadius: "var(--radius-lg)", background: "rgba(0,200,150,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
            <Shield size={28} style={{ color: "var(--color-accent)" }} />
          </div>
          <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "0.75rem" }}>
            {lang === 'fr' ? 'Mentions Légales' : 'Aviso Legal'}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem" }}>
            {lang === 'fr' ? 'Dernière mise à jour : 6 avril 2025' : 'Última actualización: 6 de abril de 2025'}
          </p>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <div className="card legal-content" style={{ padding: "3rem" }}>

            <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem", padding: "1rem 1.25rem", background: "var(--color-bg-alt)", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--color-primary)", fontSize: "0.9rem" }}>
              {lang === 'fr'
                ? "Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la Confiance en l'Économie Numérique (LCEN), il est précisé aux utilisateurs du site FinancePro l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi."
                : "De acuerdo con las disposiciones de la correspondientes leyes sobre Comercio Electrónico y Servicios de la Sociedad de la Información, se especifica a los usuarios del sitio FinancePro la identidad de los diferentes intervinientes en su realización y seguimiento."}
            </p>

            <h2>{lang === 'fr' ? '1. Éditeur du site' : '1. Editor del sitio'}</h2>
            <table>
              <tbody>
                {(lang === 'fr' ? [
                  ["Raison sociale", "FinancePro SAS"],
                  ["Capital social", "100 000 €"],
                  ["RCS", "Paris 000 000 000"],
                  ["SIRET", "000 000 000 00000"],
                  ["Siège social", "1 rue de la Finance, 75001 Paris"],
                  ["Téléphone", "01 00 00 00 00 (non surtaxé)"],
                  ["Email", "contact@financepro.fr"],
                  ["Directeur de la publication", "Jean Dupont, Président"],
                ] : [
                  ["Razón social", "FinancePro SAS"],
                  ["Capital social", "100 000 €"],
                  ["RCS", "Paris 000 000 000"],
                  ["SIRET/CIF", "000 000 000 00000"],
                  ["Sede social", "1 rue de la Finance, 75001 Paris, Francia"],
                  ["Teléfono", "01 00 00 00 00"],
                  ["Email", "contact@financepro.fr"],
                  ["Director de la publicación", "Jean Dupont, Presidente"],
                ]).map(([label, value]) => (
                  <tr key={label}>
                    <td style={{ width: "45%", fontWeight: "600", color: "var(--color-text)" }}>{label}</td>
                    <td style={{ color: "var(--color-text-muted)" }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2>{lang === 'fr' ? '2. Hébergement' : '2. Alojamiento Web'}</h2>
            <table>
              <tbody>
                {(lang === 'fr' ? [
                  ["Hébergeur", "Vercel Inc."],
                  ["Adresse", "340 S Lemon Ave #4133, Walnut, CA 91789, USA"],
                  ["Contact", "privacy@vercel.com"],
                  ["Localisation des données", "Union Européenne (France / Allemagne)"],
                ] : [
                  ["Proveedor", "Vercel Inc."],
                  ["Dirección", "340 S Lemon Ave #4133, Walnut, CA 91789, USA"],
                  ["Contacto", "privacy@vercel.com"],
                  ["Ubicación de los datos", "Unión Europea (Francia / Alemania)"],
                ]).map(([l, v]) => (
                  <tr key={l}><td style={{ width: "45%", fontWeight: "600" }}>{l}</td><td style={{ color: "var(--color-text-muted)" }}>{v}</td></tr>
                ))}
              </tbody>
            </table>

            <h2>{lang === 'fr' ? '3. Activité réglementée' : '3. Actividad regulada'}</h2>
            <div style={{ background: "rgba(0,200,150,0.06)", border: "1px solid rgba(0,200,150,0.2)", borderRadius: "var(--radius-md)", padding: "1.25rem", marginBottom: "1.25rem" }}>
              <p style={{ color: "var(--color-text)", fontWeight: "600", marginBottom: "0.5rem" }}>
                {lang === 'fr' ? "FinancePro SAS est enregistrée en tant qu'Intermédiaire en Opérations de Banque et en Services de Paiement (IOBSP) sous le numéro ORIAS :" : "FinancePro SAS está registrada como Intermediario en Operaciones Bancarias y Servicios de Pago bajo el número de registro oficial:"} <strong>00-000-000</strong>
              </p>
              <p style={{ fontSize: "0.875rem" }}>
                {lang === 'fr' ? 'Consultable sur' : 'Consultable en'}{" "}
                <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary-light)", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                  www.orias.fr <ExternalLink size={12} />
                </a>
              </p>
            </div>
            <p>
              {lang === 'fr' ? "FinancePro SAS est soumise au contrôle de l'Autorité de Contrôle Prudentiel et de Résolution (ACPR) — 4 place de Budapest, CS 92459, 75436 Paris Cedex 09." : "FinancePro SAS está sujeta a la supervisión de las autoridades competentes correspondientes."}{" "}
              <a href="https://www.acpr.banque-france.fr" target="_blank" rel="noopener noreferrer">
                www.acpr.banque-france.fr
              </a>
            </p>

            <h2>{lang === 'fr' ? '4. Propriété intellectuelle' : '4. Propiedad intelectual'}</h2>
            <p>
              {lang === 'fr' ? "L'ensemble du contenu du présent site (textes, images, vidéos, logos, graphismes, icônes, sons, logiciels, bases de données, architecture) est la propriété exclusive de FinancePro SAS ou de ses partenaires, et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle." : "Todo el contenido de este sitio (textos, imágenes, vídeos, logotipos, gráficos, iconos, sonidos, software, bases de datos) es propiedad exclusiva de FinancePro SAS o de sus socios, y está protegido por las leyes de propiedad intelectual."}
            </p>

            <h2>{lang === 'fr' ? '5. Liens hypertextes' : '5. Enlaces hipertexto'}</h2>
            <p>
              {lang === 'fr' ? "Le site FinancePro.fr peut contenir des liens hypertextes vers d'autres sites internet. FinancePro SAS n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu, leurs politiques de confidentialité ou leurs pratiques." : "El sitio puede contener enlaces a otros sitios de internet. FinancePro SAS no ejerce ningún control sobre estos sitios y declina toda responsabilidad respecto a su contenido o sus prácticas de privacidad."}
            </p>

            <h2>{lang === 'fr' ? '6. Limitation de responsabilité' : '6. Limitación de responsabilidad'}</h2>
            <p>
              {lang === 'fr' ? "Les informations contenues sur ce site sont aussi précises que possible et le site est remis à jour régulièrement, mais peut toutefois contenir des inexactitudes ou des omissions. FinancePro SAS ne saurait être tenue responsable des dommages directs ou indirects causés au matériel de l'utilisateur." : "La información de este sitio es lo más precisa posible y se actualiza periódicamente, pero puede contener inexactitudes. FinancePro no se hace responsable de daños informáticos derivados del acceso o uso del servicio."}
            </p>

            <h2>{lang === 'fr' ? '7. Droit applicable et juridiction' : '7. Ley aplicable y jurisdicción'}</h2>
            <p>
              {lang === 'fr' ? "Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents. Le tribunal compétent est celui du ressort du siège social de FinancePro SAS." : "Salvo disposición contraria imperativa, estas condiciones se rigen por la ley de Francia. Cualquier disputa de un usuario se someterá a los tribunales del domicilio del editor."}
            </p>

            <h2>{lang === 'fr' ? '8. Données personnelles' : '8. Datos personales'}</h2>
            <p>
              {lang === 'fr' ? 'Le traitement de vos données personnelles est régi par notre' : 'El tratamiento de sus datos personales se rige por nuestra'}{" "}
              <Link href={getLocalizedPath('privacy', locale)}>{lang === 'fr' ? 'Politique de Confidentialité' : 'Política de Privacidad'}</Link>{" "}
              {lang === 'fr' ? 'et notre' : 'y nuestra'} <Link href={getLocalizedPath('cookies', locale)}>{lang === 'fr' ? 'Politique de Cookies' : 'Política de Cookies'}</Link>.
            </p>
            <p>
              Pour exercer vos droits RGPD : <a href="mailto:dpo@financepro.fr">dpo@financepro.fr</a>
            </p>

            <div style={{ marginTop: "2.5rem", padding: "1.25rem", background: "var(--color-bg-alt)", borderRadius: "var(--radius-md)", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {(lang === 'fr' ? [
                { label: "Politique de Confidentialité", routeKey: "privacy" },
                { label: "CGU", routeKey: "cgu" },
                { label: "CGV / CGS", routeKey: "cgv" },
                { label: "Cookies", routeKey: "cookies" },
                { label: "Réclamations", routeKey: "complaints" },
                { label: "Accessibilité", routeKey: "accessibility" },
              ] : [
                { label: "Política de Privacidad", routeKey: "privacy" },
                { label: "Condiciones de Uso (CGU)", routeKey: "cgu" },
                { label: "Condiciones Generales (CGV)", routeKey: "cgv" },
                { label: "Cookies", routeKey: "cookies" },
                { label: "Reclamaciones", routeKey: "complaints" },
                { label: "Accesibilidad", routeKey: "accessibility" },
              ]).map(({ label, routeKey }) => (
                <Link
                  key={routeKey}
                  href={getLocalizedPath(routeKey, locale)}
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
