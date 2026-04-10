import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ChevronRight } from "lucide-react";
import { useDictionary } from "@/components/DictionaryProvider";
import { getLocalizedPath, type AppLocale } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation (CGU) | FinancePro",
  description: "Conditions générales d'utilisation du site FinancePro et de l'espace client.",
};

export default function CGUPage() {
  const { lang } = useDictionary();
  const locale = lang as AppLocale;

  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", padding: "3.5rem 0 3rem", textAlign: "center" }}>
        <div className="container">
          <div style={{ width: "60px", height: "60px", borderRadius: "var(--radius-lg)", background: "rgba(0,200,150,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
            <FileText size={28} style={{ color: "var(--color-accent)" }} />
          </div>
          <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "0.75rem" }}>
            {lang === 'fr' ? "Conditions Générales d'Utilisation" : "Condiciones Generales de Uso"}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem" }}>
            {lang === 'fr' ? 'Dernière mise à jour : 6 avril 2025' : 'Última actualización: 6 de abril de 2025'}
          </p>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <div className="card legal-content" style={{ padding: "3rem" }}>
            <h2>{lang === 'fr' ? '1. Objet' : '1. Objeto'}</h2>
            <p>
              {lang === 'fr' ? "Les présentes Conditions Générales d'Utilisation (CGU) encadrent juridiquement l'utilisation des services du site FinancePro (ci-après dénommé « le site »). Constituant le contrat entre la société FinancePro SAS et l'Utilisateur, l'accès au site signifie l'acceptation des présentes CGU." : "Las presentes Condiciones Generales de Uso (CGU) regulan jurídicamente el uso de los servicios del sitio web FinancePro (en adelante «el sitio»). Constituyendo el contrato entre FinancePro SAS y el Usuario, el acceso al sitio implica la aceptación de estas CGU."}
            </p>

            <h2>{lang === 'fr' ? '2. Accès au site et aux services' : '2. Acceso al sitio y a los servicios'}</h2>
            <p>
              {lang === 'fr' ? "Le site est accessible gratuitement en tout lieu à tout Utilisateur ayant un accès à Internet. Tous les frais supportés pour y accéder (matériel informatique, logiciels, connexion Internet, etc.) sont à sa charge. FinancePro met en œuvre tous les moyens raisonnables à sa disposition pour assurer un accès de qualité, mais n'est tenu à aucune obligation d'y parvenir." : "El sitio es accesible gratuitamente en cualquier lugar a cualquier Usuario con acceso a Internet. Todos los gastos soportados para acceder (hardware, software, conexión a Internet, etc.) corren a su cargo. FinancePro pone todos los medios razonables a su disposición para asegurar un acceso de calidad, pero no está sujeto a ninguna obligación de resultados."}
            </p>

            <h2>{lang === 'fr' ? '3. Espace personnel' : '3. Área personal'}</h2>
            <p>
              {lang === 'fr' ? "L'accès à certains services nécessite la création d'un Espace Personnel. L'Utilisateur s'engage à fournir des informations exactes et à maintenir à jour ses données. Les identifiants sont strictement personnels et confidentiels." : "El acceso a determinados servicios requiere la creación de un Área Personal. El Usuario se compromete a proporcionar información exacta y a mantener sus datos actualizados. Las credenciales son estrictamente personales y confidenciales."}
            </p>

            <h2>{lang === 'fr' ? "4. Engagements de l'Utilisateur" : "4. Obligaciones del Usuario"}</h2>
            <p>{lang === 'fr' ? "L'Utilisateur s'engage à :" : "El Usuario se compromete a:"}</p>
            <ul>
               <li>{lang === 'fr' ? "Ne pas utiliser le site à des fins illégales ou non autorisées." : "No utilizar el sitio con fines ilegales o no autorizados."}</li>
               <li>{lang === 'fr' ? "Ne pas perturber ni interrompre les réseaux connectés au site." : "No perturbar ni interrumpir las redes conectadas al sitio."}</li>
               <li>{lang === 'fr' ? "Fournir des documents et informations sincères lors des demandes de crédit. La fausse déclaration est passible de sanctions pénales." : "Proporcionar documentos e información veraz durante las solicitudes de crédito. La declaración falsa está sujeta a sanciones penales."}</li>
            </ul>

            <h2>{lang === 'fr' ? '5. Propriété intellectuelle' : '5. Propiedad intelectual'}</h2>
            <p>
              {lang === 'fr' ? "Les marques, logos, signes et tout autre contenu du site font l'objet d'une protection par le Code de la propriété intellectuelle (voir " : "Las marcas, logotipos, signos y cualquier otro contenido del sitio están protegidos por el Código de Propiedad Intelectual (ver "}
              <Link href={getLocalizedPath('legal', locale)}>{lang === 'fr' ? 'Mentions Légales' : 'Aviso Legal'}</Link>).
            </p>

            <h2>{lang === 'fr' ? '6. Responsabilité' : '6. Responsabilidad'}</h2>
            <p>
              {lang === 'fr' ? 'FinancePro SAS s\'efforce de fournir sur son site des informations aussi précises que possible. Toutefois, les simulateurs financiers sont fournis à titre indicatif et ne constituent pas une offre de crédit contractuelle ("Offre préalable de crédit"). Seule l\'offre de crédit signée engage les parties.' : 'FinancePro SAS se esfuerza por proporcionar información lo más precisa posible en su sitio. Sin embargo, los simuladores financieros se proporcionan a título indicativo y no constituyen una oferta de crédito contractual ("Oferta previa de crédito"). Sólo la oferta de crédito firmada vincula a las partes.'}
            </p>

            <h2>{lang === 'fr' ? '7. Liens hypertextes' : '7. Enlaces hipertexto'}</h2>
            <p>
              {lang === 'fr' ? "Des liens hypertextes sortants peuvent être présents sur le site. Les pages web où mènent ces liens n'engagent en rien la responsabilité de FinancePro SAS." : "El sitio puede contener enlaces hipertexto de salida. Las páginas web a las que conducen estos enlaces no comprometen en modo alguno la responsabilidad de FinancePro SAS."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
