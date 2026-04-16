import type { Metadata } from "next";
import Link from "next/link";
import { Lock, Shield, Eye, Database, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Politique de Confidentialité & RGPD | FinancePro",
  description: "Politique de confidentialité et protection des données personnelles de FinancePro, conformément au RGPD et à la loi Informatique et Libertés.",
};

export default function ConfidentialitePage() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", padding: "3.5rem 0 3rem", textAlign: "center" }}>
        <div className="container">
          <div style={{ width: "60px", height: "60px", borderRadius: "var(--radius-lg)", background: "rgba(0,200,150,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
            <Lock size={28} style={{ color: "var(--color-accent)" }} />
          </div>
          <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "0.5rem" }}>
            Politique de Confidentialité
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem" }}>Dernière mise à jour : 6 avril 2025 — Version 3.1</p>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container" style={{ maxWidth: "860px" }}>

          {/* Quick nav */}
          <div className="card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
            <h2 style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: "700", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-muted)" }}>
              Table des matières
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2" style={{gap: "0.5rem"}}>
              {[
                ["1. Responsable du traitement", "#rt"],
                ["2. Données collectées", "#donnees"],
                ["3. Bases légales", "#bases"],
                ["4. Finalités du traitement", "#finalites"],
                ["5. Destinataires", "#destinataires"],
                ["6. Transferts hors UE", "#transferts"],
                ["7. Durée de conservation", "#duree"],
                ["8. Vos droits", "#droits"],
                ["9. Cookies", "#cookies"],
                ["10. Sécurité", "#securite"],
              ].map(([label, href]) => (
                <a key={href} href={href} style={{ fontSize: "0.875rem", color: "var(--color-primary-light)", textDecoration: "none" }}>
                  → {label}
                </a>
              ))}
            </div>
          </div>

          <div className="card legal-content" style={{ padding: "3rem" }}>
            <div className="alert alert-info" style={{ marginBottom: "2rem" }}>
              <Shield size={16} style={{ flexShrink: 0 }} />
              <p style={{ fontSize: "0.875rem" }}>
                FinancePro SAS traite vos données conformément au Règlement (UE) 2016/679 du 25 mai 2018 (RGPD)
                et à la loi n° 78-17 du 6 janvier 1978 modifiée (Informatique et Libertés).
              </p>
            </div>

            <h2 id="rt">1. Responsable du traitement</h2>
            <p>
              <strong>FinancePro SAS</strong> — 1 rue de la Finance, 75001 Paris — SIRET : 000 000 000 00000<br />
              <strong>DPO (Délégué à la Protection des Données) :</strong>{" "}
              <a href="mailto:dpo@financepro.fr">dpo@financepro.fr</a>
            </p>

            <h2 id="donnees">2. Données personnelles collectées</h2>
            <h3>2.1 Données collectées lors de la simulation</h3>
            <ul>
              <li>Paramètres de simulation (montant, durée, type de prêt) — non nominatifs</li>
              <li>Données de profil indicatif (revenus, charges, statut professionnel) — non nominatifs</li>
              <li>Données techniques (adresse IP, navigateur, système d&apos;exploitation)</li>
            </ul>

            <h3>2.2 Données collectées lors d&apos;une demande de crédit</h3>
            <ul>
              <li><strong>État civil :</strong> nom, prénom, date et lieu de naissance, nationalité</li>
              <li><strong>Coordonnées :</strong> adresse, email, téléphone</li>
              <li><strong>Situation familiale :</strong> statut marital, nombre de personnes à charge</li>
              <li><strong>Situation professionnelle :</strong> statut, employeur, ancienneté, revenus</li>
              <li><strong>Situation financière :</strong> revenus, charges, épargne, crédits en cours</li>
              <li><strong>Documents justificatifs :</strong> pièce d&apos;identité, bulletins de salaire, relevés bancaires</li>
              <li><strong>Données sensibles :</strong> aucune donnée de catégorie particulière (art. 9 RGPD) n&apos;est collectée</li>
            </ul>

            <h3>2.3 Données collectées automatiquement</h3>
            <ul>
              <li>Logs de connexion et d&apos;activité (adresse IP, horodatage, pages visitées)</li>
              <li>Cookies (voir section 9)</li>
              <li>Données de performance et d&apos;utilisation du site (analytics)</li>
            </ul>

            <h2 id="bases">3. Bases légales du traitement</h2>
            <table>
              <thead>
                <tr><th>Traitement</th><th>Base légale (art. 6 RGPD)</th></tr>
              </thead>
              <tbody>
                {[
                  ["Étude de votre demande de crédit", "Mesures précontractuelles (art. 6.1.b)"],
                  ["Gestion de votre contrat", "Exécution du contrat (art. 6.1.b)"],
                  ["Obligations légales (KYC, LCB-FT, FICP)", "Obligation légale (art. 6.1.c)"],
                  ["Lutte contre la fraude", "Intérêt légitime (art. 6.1.f)"],
                  ["Analytics de performance", "Intérêt légitime (art. 6.1.f)"],
                  ["Communication marketing", "Consentement (art. 6.1.a)"],
                  ["Cookies non essentiels", "Consentement (art. 6.1.a)"],
                  ["Décisions automatisées", "Consentement explicite / mesures nécessaires (art. 22)"],
                ].map(([t, b]) => (
                  <tr key={t}><td>{t}</td><td>{b}</td></tr>
                ))}
              </tbody>
            </table>

            <h2 id="finalites">4. Finalités du traitement</h2>
            <ul>
              <li>Analyse et traitement des demandes de financement</li>
              <li>Vérification de votre identité et lutte contre le blanchiment (LCB-FT — Directive 2015/849)</li>
              <li>Consultation du FICP (Banque de France) — obligation légale</li>
              <li>Communication avec les partenaires bancaires</li>
              <li>Gestion de votre espace client et des contrats</li>
              <li>Amélioration de nos services et audit interne</li>
              <li>Marketing direct (avec votre consentement)</li>
              <li>Lutte contre la fraude et la cybersécurité</li>
              <li>Archivage légal et comptabilité</li>
            </ul>

            <h2 id="destinataires">5. Destinataires des données</h2>
            <p>Vos données peuvent être communiquées aux catégories de destinataires suivantes :</p>
            <ul>
              <li><strong>Établissements prêteurs partenaires</strong> agréés ACPR (pour l&apos;instruction de votre dossier)</li>
              <li><strong>Sous-traitants techniques</strong> (hébergement, CRM, signature électronique) sous contrat RGPD</li>
              <li><strong>Banque de France</strong> (consultation FICP — obligation légale)</li>
              <li><strong>Autorités de contrôle</strong> (ACPR, CNIL) sur réquisition</li>
              <li><strong>Assureurs</strong> partenaires (si souscription d&apos;assurance emprunteur)</li>
            </ul>
            <p><strong>Vos données ne sont jamais vendues à des tiers.</strong></p>

            <h2 id="transferts">6. Transferts hors UE</h2>
            <p>
              Certains sous-traitants (ex : Vercel Inc., outils analytics) sont localisés hors de l&apos;Espace Économique Européen.
              Ces transferts sont encadrés par :
            </p>
            <ul>
              <li>Des Clauses Contractuelles Types (CCT) adoptées par la Commission Européenne</li>
              <li>Décision d&apos;adéquation (pour les pays reconnus comme offrant une protection suffisante)</li>
              <li>Des mesures techniques supplémentaires (chiffrement de bout en bout)</li>
            </ul>

            <h2 id="duree">7. Durée de conservation</h2>
            <table>
              <thead>
                <tr><th>Type de données</th><th>Durée de conservation</th><th>Base légale</th></tr>
              </thead>
              <tbody>
                {[
                  ["Simulation non aboutie", "12 mois", "Intérêt légitime"],
                  ["Dossier refusé", "3 ans", "Intérêt légitime"],
                  ["Contrat de crédit actif", "Durée du contrat + 5 ans", "Obligation légale"],
                  ["Contrat de crédit solder", "10 ans", "Prescription commerciale"],
                  ["Documents justificatifs", "5 ans après fin contrat", "C. conso. art. L312-26"],
                  ["Logs de connexion", "12 mois", "Décret n° 2011-219"],
                  ["Données marketing", "3 ans (prorogeable)", "Consentement"],
                  ["Données KYC/LCB-FT", "5 ans après relation d'affaires", "LCB-FT art. L561-12"],
                ].map(([t, d, b]) => (
                  <tr key={t}><td>{t}</td><td>{d}</td><td style={{ fontSize: "0.8rem" }}>{b}</td></tr>
                ))}
              </tbody>
            </table>

            <h2 id="droits">8. Vos droits</h2>
            <p>Conformément aux articles 15 à 22 du RGPD, vous disposez des droits suivants :</p>
            <div className="grid grid-cols-1 md:grid-cols-2" style={{gap: "0.75rem", margin: "1rem 0"}}>
              {[
                { icon: Eye, title: "Droit d'accès", desc: "Obtenir une copie de vos données" },
                { icon: Database, title: "Droit de rectification", desc: "Corriger vos données inexactes" },
                { icon: Database, title: "Droit à l'effacement", desc: "Faire supprimer vos données" },
                { icon: Lock, title: "Droit de limitation", desc: "Restreindre le traitement" },
                { icon: Shield, title: "Droit à la portabilité", desc: "Recevoir vos données (format structuré)" },
                { icon: Mail, title: "Droit d'opposition", desc: "S'opposer au traitement (marketing)" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} style={{ padding: "0.875rem", background: "var(--color-bg-alt)", borderRadius: "var(--radius-md)", display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
                  <Icon size={16} style={{ color: "var(--color-primary-light)", flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <p style={{ fontWeight: "700", fontSize: "0.875rem", marginBottom: "0.15rem" }}>{title}</p>
                    <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p>
              <strong>Pour exercer vos droits :</strong>
            </p>
            <ul>
              <li>Email : <a href="mailto:dpo@financepro.fr">dpo@financepro.fr</a> (réponse sous 30 jours)</li>
              <li>Courrier recommandé : FinancePro SAS — DPO — 1 rue de la Finance, 75001 Paris</li>
              <li>Espace client : rubrique &laquo; Mes données &raquo;</li>
            </ul>
            <p>
              En cas d&apos;insatisfaction, vous pouvez saisir la{" "}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer"><strong>CNIL</strong></a>{" "}
              (Commission Nationale de l&apos;Informatique et des Libertés) — 3 place de Fontenoy, 75007 Paris.
              Téléphone : 01 53 73 22 22.
            </p>

            <h2 id="cookies">9. Cookies</h2>
            <p>
              Pour toute information sur notre utilisation des cookies et pour gérer vos préférences,
              consultez notre <Link href="/cookies">Politique de Cookies</Link>.
            </p>

            <h2 id="securite">10. Sécurité des données</h2>
            <ul>
              <li>Chiffrement des communications (TLS 1.3)</li>
              <li>Chiffrement des données au repos (AES-256)</li>
              <li>Authentification à deux facteurs pour les accès internes</li>
              <li>Journalisation des accès aux données personnelles</li>
              <li>Tests d&apos;intrusion semestriels</li>
              <li>Formation RGPD de tous les collaborateurs</li>
              <li>Plan de réponse aux violations de données (notification CNIL sous 72h)</li>
            </ul>

            <h2>11. Modifications</h2>
            <p>
              Cette politique peut être modifiée à tout moment. Les modifications substantielles vous seront notifiées
              par email ou via une bannière sur le site. La date de dernière mise à jour est indiquée en haut de ce document.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
