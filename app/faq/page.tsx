"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

const faqData = {
  "Généralités": [
    { q: "Qu'est-ce que FinancePro ?", a: "FinancePro est un Intermédiaire en Opérations de Banque et en Services de Paiement (IOBSP) enregistré à l'ORIAS sous le n° 00-000-000. Nous mettons en relation les particuliers et professionnels avec des établissements de crédit partenaires agréés par l'ACPR, pour vous offrir les meilleures conditions de financement." },
    { q: "Êtes-vous un établissement de crédit agréé ?", a: "Non. FinancePro n'est pas un établissement de crédit. Nous sommes un intermédiaire agréé (IOBSP) qui vous met en relation avec des établissements prêteurs. Nos partenaires bancaires sont, eux, agréés par l'ACPR. Notre enregistrement ORIAS est vérifiable sur www.orias.fr." },
    { q: "Dans quels délais puis-je obtenir une réponse ?", a: "Vous recevez une réponse de principe sous 24 heures ouvrées après dépôt d'un dossier complet. En cas de dossier incomplet, un conseiller vous contacte pour obtenir les documents manquants. Le versement des fonds intervient sous 48 heures après signature et à l'issue du délai légal." },
    { q: "Quels sont vos horaires d'ouverture ?", a: "Notre équipe est disponible du lundi au vendredi de 9h à 18h, et le samedi de 9h à 12h. En dehors de ces horaires, notre assistant virtuel répond à vos questions fréquentes et vous pouvez déposer une demande à tout moment via notre site." },
    { q: "Mes données sont-elles en sécurité ?", a: "Oui. Nous utilisons le chiffrement TLS 1.3 pour les communications et AES-256 pour le stockage. Vos données sont hébergées en Union Européenne et ne sont jamais vendues à des tiers. Nous sommes conformes au RGPD. Consultez notre Politique de Confidentialité pour plus de détails." },
    { q: "Puis-je faire une demande si je suis fiché FICP ?", a: "Si vous êtes inscrit au Fichier des Incidents de Crédit aux Particuliers (FICP), l'accès au crédit est réglementairement limité. Nous sommes légalement tenus de consulter ce fichier. Nous vous invitons à vous rapprocher d'un conseiller pour étudier votre situation particulière." },
    { q: "Y a-t-il des frais de dossier ?", a: "La simulation et l'étude de votre dossier sont entièrement gratuites. FinancePro est rémunéré par les établissements prêteurs sous forme de commission. Des frais de dossier peuvent être facturés par l'établissement prêteur et seront clairement indiqués dans l'offre de crédit, avant toute signature." },
    { q: "Comment contacter un conseiller ?", a: "Par téléphone au 01 00 00 00 00 (non surtaxé, lun-ven 9h-18h), par email à contact@financepro.fr, via le formulaire de contact, le chat en ligne sur le site, ou depuis votre espace client. Temps de réponse garanti : 24 heures ouvrées." },
  ],
  "Simulation": [
    { q: "La simulation engage-t-elle ma responsabilité ?", a: "Non. La simulation est un outil indicatif, gratuit et sans engagement. Elle ne constitue pas une offre de crédit et ne crée aucune obligation. Vous pouvez simuler autant de fois que vous le souhaitez, modifier les paramètres librement." },
    { q: "Pourquoi le taux affiché est-il indicatif ?", a: "Le taux indicatif est calculé sur la base des paramètres que vous saisissez. Le TAEG définitif est déterminé après analyse complète de votre dossier (revenus, charges, historique bancaire, montant, durée). Il sera communiqué dans l'offre de contrat de crédit, conformément à la loi." },
    { q: "Puis-je refaire une simulation ?", a: "Oui, vous pouvez effectuer autant de simulations que vous souhaitez, à tout moment, gratuitement et sans vous identifier. Chaque simulation est indépendante et n'a aucun impact sur votre score de crédit." },
    { q: "À quoi correspond le TAEG ?", a: "Le Taux Annuel Effectif Global (TAEG) représente le coût total de votre crédit exprimé en pourcentage annuel. Il intègre le taux d'intérêt nominal, les frais de dossier et toute autre charge obligatoire liée au crédit. C'est l'indicateur de comparaison légalement imposé (art. L314-1 Code de la consommation)." },
    { q: "Comment est calculée ma mensualité ?", a: "Votre mensualité est calculée selon la formule actuarielle standard : M = P × [r(1+r)^n] / [(1+r)^n - 1], où P = capital, r = taux mensuel (taux annuel / 12) et n = nombre de mensualités. Cette formule est identique pour tous les établissements de crédit français." },
  ],
  "Demande de prêt": [
    { q: "Quels documents dois-je fournir ?", a: "Les documents standards sont : pièce d'identité (CNI ou passeport), 3 derniers bulletins de salaire ou 2 derniers bilans, 3 derniers relevés bancaires, justificatif de domicile de moins de 3 mois, et RIB. Des documents supplémentaires peuvent être demandés selon la nature de votre projet." },
    { q: "Puis-je faire une demande en couple ?", a: "Oui, vous pouvez faire une demande en co-emprunteur (conjoint, partenaire de PACS, concubin). Les deux revenus sont pris en compte, ce qui peut améliorer votre capacité d'emprunt. Chaque co-emprunteur devra fournir les documents justificatifs de sa situation." },
    { q: "Ma demande sera-t-elle visible sur mes relevés bancaires ?", a: "La simulation n'apparaît pas sur vos relevés. Lors de l'étude complète du dossier, nous consultons le FICP (Fichier des Incidents de Crédit aux Particuliers) de la Banque de France. Cette consultation est discrète et n'impacte pas votre score bancaire." },
    { q: "Que se passe-t-il si ma demande est refusée ?", a: "En cas de refus, nous vous en informons par écrit. Vous pouvez demander les motifs du refus (dans les limites légales). Un refus n'est pas définitif : vous pouvez représenter votre dossier après un délai de 3 mois ou si votre situation évolue. Des recours existent si vous estimez le refus injustifié." },
    { q: "Puis-je annuler ma demande ?", a: "Oui, à tout moment avant la signature de l'offre de crédit. Après signature, vous disposez d'un délai légal de rétractation de 14 jours calendaires (art. L312-19 Code de la consommation), sans frais ni pénalités." },
    { q: "Mon dossier sera-t-il étudié par un humain ?", a: "Oui. Nos conseillers examinent chaque dossier personnellement. Des outils d'aide à la décision peuvent être utilisés pour une première analyse, mais la décision finale implique toujours une intervention humaine. Conformément à l'art. 22 du RGPD, vous pouvez demander une intervention humaine sur toute décision automatisée." },
    { q: "Puis-je modifier ma demande après envoi ?", a: "Vous pouvez contacter votre conseiller pour modifier certains éléments de votre demande tant qu'elle est en cours d'étude. Des modifications importantes (montant, durée, type de prêt) peuvent nécessiter une nouvelle instruction du dossier." },
  ],
  "Remboursement": [
    { q: "Puis-je rembourser par anticipation ?", a: "Oui, vous pouvez rembourser votre crédit partiellement ou totalement par anticipation à tout moment. Pour les remboursements supérieurs à 10 000 € sur 12 mois consécutifs, une indemnité de remboursement anticipé peut s'appliquer (art. L312-34 Code de la consommation), plafonnée à 1% du capital remboursé." },
    { q: "Y a-t-il des pénalités de remboursement anticipé ?", a: "Pour les crédits à la consommation : des indemnités peuvent s'appliquer si le remboursement anticipé dépasse 10 000 € sur 12 mois (max 1% du capital). Si la durée restante est inférieure à 1 an, ce plafond est de 0,5%. Ces règles sont définies par l'art. L312-34 du Code de la consommation." },
    { q: "Que se passe-t-il en cas de difficultés financières ?", a: "Contactez immédiatement votre conseiller. Des solutions existent : report d'échéances (selon contrat), modulation des mensualités, restructuration du prêt. En cas de surendettement : Banque de France, numéro 3414 (gratuit). N'attendez pas d'accumuler des retards." },
    { q: "Puis-je modifier la date de prélèvement ?", a: "Oui, sous réserve d'accord de l'établissement prêteur et selon les conditions contractuelles. La demande doit être effectuée au moins 15 jours avant la prochaine échéance, depuis votre espace client ou par courrier recommandé." },
    { q: "Puis-je faire une pause dans mes remboursements ?", a: "Certains contrats incluent une clause de modulation permettant une suspension temporaire des mensualités (généralement 1 à 3 mois, 1 fois par an). Cette possibilité figure dans les conditions particulières de votre contrat. Hors clause contractuelle, une demande de report peut être étudiée au cas par cas." },
    { q: "Comment obtenir mon tableau d'amortissement ?", a: "Votre tableau d'amortissement complet est disponible dans votre espace client, rubrique 'Mes documents'. Vous pouvez le télécharger au format PDF à tout moment. Vous pouvez également en demander un exemplaire papier à votre conseiller." },
  ],
  "Légal & Sécurité": [
    { q: "Quel est le délai légal de rétractation ?", a: "Conformément aux articles L312-19 et suivants du Code de la consommation, vous disposez d'un délai de 14 jours calendaires pour vous rétracter après acceptation de l'offre de crédit. Ce délai court à compter du lendemain de l'acceptation. Aucun motif n'est nécessaire, aucune pénalité n'est applicable." },
    { q: "Que faire si je veux exercer mon droit de rétractation ?", a: "Utilisez le formulaire de rétractation joint à votre offre de crédit, ou adressez une lettre recommandée avec accusé de réception à : FinancePro SAS — Service Rétractation — 1 rue de la Finance, 75001 Paris. Dans les 14 jours suivant la rétractation, remboursez le capital versé et les intérêts courus." },
    { q: "Comment exercer mon droit d'accès à mes données ?", a: "Vous pouvez demander l'accès, la rectification ou la suppression de vos données personnelles par email à dpo@financepro.fr ou par courrier à : FinancePro SAS — DPO — 1 rue de la Finance, 75001 Paris. Nous répondons dans un délai maximum de 30 jours conformément à l'article 15 du RGPD." },
    { q: "Êtes-vous couvert par le Fonds de Garantie des Dépôts ?", a: "Non. FinancePro est un intermédiaire, pas une banque. Nous ne recevons pas de dépôts. Le Fonds de Garantie des Dépôts (FGDR) couvre les dépôts auprès des établissements bancaires. En revanche, nos partenaires prêteurs sont agréés par l'ACPR et couverts par les mécanismes de protection applicables." },
    { q: "Comment déposer une réclamation ?", a: "Étape 1 : contactez notre service réclamations à reclamations@financepro.fr (réponse sous 10 jours ouvrables). Étape 2 : si insatisfait, saisissez notre médiateur agréé. Étape 3 : recours auprès de l'ACPR ou de la DGCCRF. Notre procédure complète est disponible sur la page Réclamations." },
  ],
};

export default function FAQPage() {
  const [openSection, setOpenSection] = useState<string | null>("Généralités");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const allQuestions = Object.entries(faqData).flatMap(([cat, items]) =>
    items.map((item) => ({ ...item, category: cat }))
  );

  const filteredQuestions = search.length > 2
    ? allQuestions.filter((item) =>
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
      )
    : null;

  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", padding: "4rem 0 3rem", textAlign: "center" }}>
        <div className="container">
          <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1.25rem" }}>
            Questions Fréquentes
          </h1>
          <div style={{ maxWidth: "500px", margin: "0 auto", position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
            <input
              type="search"
              placeholder="Rechercher une question..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
              style={{ paddingLeft: "2.75rem", borderRadius: "var(--radius-full)" }}
              aria-label="Rechercher dans la FAQ"
            />
          </div>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container" style={{ maxWidth: "860px" }}>

          {filteredQuestions ? (
            <div>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
                {filteredQuestions.length} résultat{filteredQuestions.length !== 1 ? "s" : ""} pour &laquo; {search} &raquo;
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {filteredQuestions.map(({ q, a, category }) => (
                  <div key={q} className="accordion-item">
                    <button
                      className="accordion-trigger"
                      onClick={() => setOpenQuestion(openQuestion === q ? null : q)}
                      aria-expanded={openQuestion === q}
                    >
                      <div>
                        <span className="badge badge-primary" style={{ marginBottom: "0.25rem", fontSize: "0.7rem" }}>{category}</span>
                        <div>{q}</div>
                      </div>
                      <ChevronDown size={18} className="accordion-icon" aria-hidden="true" />
                    </button>
                    {openQuestion === q && <div className="accordion-body">{a}</div>}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "2rem", alignItems: "start" }}>
              {/* Category nav */}
              <nav style={{ position: "sticky", top: "5rem" }} aria-label="Catégories FAQ">
                <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                  {Object.keys(faqData).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setOpenSection(cat)}
                      aria-pressed={openSection === cat}
                      style={{
                        padding: "0.75rem 1rem",
                        borderRadius: "var(--radius-md)",
                        border: "none",
                        background: openSection === cat ? "var(--color-primary)" : "transparent",
                        color: openSection === cat ? "white" : "var(--color-text-muted)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        fontWeight: openSection === cat ? "700" : "400",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.2s",
                      }}
                    >
                      {cat}
                      <span style={{
                        float: "right",
                        background: openSection === cat ? "rgba(255,255,255,0.2)" : "var(--color-bg-alt)",
                        color: openSection === cat ? "white" : "var(--color-text-muted)",
                        borderRadius: "99px",
                        padding: "0.1rem 0.5rem",
                        fontSize: "0.75rem",
                        fontWeight: "700",
                      }}>
                        {faqData[cat as keyof typeof faqData].length}
                      </span>
                    </button>
                  ))}
                </div>
              </nav>

              {/* Questions */}
              <div>
                {openSection && (
                  <div>
                    <h2 style={{ marginBottom: "1.5rem", fontSize: "1.5rem" }}>{openSection}</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                      {faqData[openSection as keyof typeof faqData].map(({ q, a }, i) => (
                        <div key={i} className="accordion-item">
                          <button
                            className="accordion-trigger"
                            onClick={() => setOpenQuestion(openQuestion === q ? null : q)}
                            aria-expanded={openQuestion === q}
                            id={`faq-${i}`}
                          >
                            {q}
                            <ChevronDown size={18} className="accordion-icon" aria-hidden="true" />
                          </button>
                          {openQuestion === q && (
                            <div className="accordion-body" role="region" aria-labelledby={`faq-${i}`}>
                              {a}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Still have questions */}
          <div
            style={{
              marginTop: "3rem",
              background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
              borderRadius: "var(--radius-xl)",
              padding: "2.5rem",
              textAlign: "center",
            }}
          >
            <h2 style={{ color: "white", fontSize: "1.5rem", marginBottom: "0.75rem" }}>
              Vous n&apos;avez pas trouvé votre réponse ?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "1.5rem" }}>
              Nos conseillers répondent à toutes vos questions sous 24h ouvrées.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-white btn-sm">Nous contacter</Link>
              <a href="tel:+33100000000" className="btn btn-sm" style={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.3)", color: "white" }}>
                01 00 00 00 00
              </a>
            </div>
          </div>

          {/* JSON-LD FAQ Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: allQuestions.map(({ q, a }) => ({
                  "@type": "Question",
                  name: q,
                  acceptedAnswer: { "@type": "Answer", text: a },
                })),
              }),
            }}
          />
        </div>
      </section>
    </>
  );
}
