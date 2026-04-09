import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation (CGU) | FinancePro",
  description: "Conditions générales d'utilisation du site FinancePro et de l'espace client.",
};

export default function CGUPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", padding: "3.5rem 0 3rem", textAlign: "center" }}>
        <div className="container">
          <div style={{ width: "60px", height: "60px", borderRadius: "var(--radius-lg)", background: "rgba(0,200,150,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
            <FileText size={28} style={{ color: "var(--color-accent)" }} />
          </div>
          <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "0.75rem" }}>
            Conditions Générales d'Utilisation
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem" }}>
            Dernière mise à jour : 6 avril 2025
          </p>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <div className="card legal-content" style={{ padding: "3rem" }}>
            <h2>1. Objet</h2>
            <p>
              Les présentes Conditions Générales d'Utilisation (CGU) encadrent juridiquement l'utilisation des services du site FinancePro (ci-après dénommé « le site »). Constituant le contrat entre la société FinancePro SAS et l'Utilisateur, l'accès au site signifie l'acceptation des présentes CGU.
            </p>

            <h2>2. Accès au site et aux services</h2>
            <p>
              Le site est accessible gratuitement en tout lieu à tout Utilisateur ayant un accès à Internet. Tous les frais supportés pour y accéder (matériel informatique, logiciels, connexion Internet, etc.) sont à sa charge. FinancePro met en œuvre tous les moyens raisonnables à sa disposition pour assurer un accès de qualité, mais n'est tenu à aucune obligation d'y parvenir.
            </p>

            <h2>3. Espace personnel</h2>
            <p>
              L'accès à certains services nécessite la création d'un Espace Personnel. L'Utilisateur s'engage à fournir des informations exactes et à maintenir à jour ses données. Les identifiants sont strictement personnels et confidentiels.
            </p>

            <h2>4. Engagements de l'Utilisateur</h2>
            <p>L'Utilisateur s'engage à :</p>
            <ul>
               <li>Ne pas utiliser le site à des fins illégales ou non autorisées.</li>
               <li>Ne pas perturber ni interrompre les réseaux connectés au site.</li>
               <li>Fournir des documents et informations sincères lors des demandes de crédit. La fausse déclaration est passible de sanctions pénales.</li>
            </ul>

            <h2>5. Propriété intellectuelle</h2>
            <p>
              Les marques, logos, signes et tout autre contenu du site font l'objet d'une protection par le Code de la propriété intellectuelle (voir <Link href="/mentions-legales">Mentions Légales</Link>).
            </p>

            <h2>6. Responsabilité</h2>
            <p>
              FinancePro SAS s'efforce de fournir sur son site des informations aussi précises que possible. Toutefois, les simulateurs financiers sont fournis à titre indicatif et ne constituent pas une offre de crédit contractuelle ("Offre préalable de crédit"). Seule l'offre de crédit signée engage les parties.
            </p>

            <h2>7. Liens hypertextes</h2>
            <p>
              Des liens hypertextes sortants peuvent être présents sur le site. Les pages web où mènent ces liens n'engagent en rien la responsabilité de FinancePro SAS.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
