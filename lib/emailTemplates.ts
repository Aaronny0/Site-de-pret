/**
 * Email Templates — FinancePro
 * Templates HTML responsives pour tous les emails transactionnels
 */

// ─── Couleurs ────────────────────────────────────────────────────────────────
const COLORS = {
  primary: '#1B4D7A',
  primaryDark: '#0F2D4A',
  accent: '#00C896',
  gold: '#D4A547',
  danger: '#DC2626',
  warning: '#D97706',
  info: '#2563EB',
  text: '#1f2937',
  textMuted: '#6b7280',
  bgLight: '#f8fafc',
  border: '#e5e7eb',
  white: '#ffffff',
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// ─── Base Layout ─────────────────────────────────────────────────────────────
function baseLayout(content: string, preheader?: string): string {
  return `<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <title>FinancePro</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0; padding:0; background-color:${COLORS.bgLight}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  ${preheader ? `<div style="display:none;font-size:1px;color:${COLORS.bgLight};line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${preheader}</div>` : ''}
  
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.bgLight};">
    <tr>
      <td align="center" style="padding: 24px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">
          
          <!-- HEADER -->
          <tr>
            <td style="background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark}); padding: 28px 32px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="margin:0; color:${COLORS.white}; font-size:26px; font-weight:800; letter-spacing:-0.5px;">
                Finance<span style="color:${COLORS.accent};">Pro</span>
              </h1>
              <p style="margin:4px 0 0; color:rgba(255,255,255,0.6); font-size:12px; letter-spacing:1px; text-transform:uppercase;">
                Solutions de financement
              </p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background-color:${COLORS.white}; padding: 36px 32px; border-left:1px solid ${COLORS.border}; border-right:1px solid ${COLORS.border};">
              ${content}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:${COLORS.bgLight}; padding: 24px 32px; border-radius: 0 0 12px 12px; border:1px solid ${COLORS.border}; border-top:none;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align:center;">
                    <p style="margin:0 0 8px; color:${COLORS.textMuted}; font-size:13px;">
                      <a href="${SITE_URL}" style="color:${COLORS.primary}; text-decoration:none; font-weight:600;">FinancePro</a>
                      &nbsp;·&nbsp;
                      <a href="${SITE_URL}/fr/contact" style="color:${COLORS.primary}; text-decoration:none;">Contact</a>
                      &nbsp;·&nbsp;
                      <a href="${SITE_URL}/fr/faq" style="color:${COLORS.primary}; text-decoration:none;">FAQ</a>
                    </p>
                    <p style="margin:0 0 4px; color:${COLORS.textMuted}; font-size:11px;">
                      © ${new Date().getFullYear()} FinancePro — Tous droits réservés
                    </p>
                    <p style="margin:0; color:${COLORS.textMuted}; font-size:11px;">
                      Cet email a été envoyé automatiquement. Merci de ne pas y répondre directement.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Composants réutilisables ────────────────────────────────────────────────

function statusBadge(status: string, label: string): string {
  const colors: Record<string, { bg: string; color: string; border: string }> = {
    pending:    { bg: 'rgba(245,158,11,0.1)', color: COLORS.warning, border: 'rgba(245,158,11,0.3)' },
    processing: { bg: 'rgba(59,130,246,0.1)', color: COLORS.info, border: 'rgba(59,130,246,0.3)' },
    approved:   { bg: 'rgba(0,200,150,0.1)', color: COLORS.accent, border: 'rgba(0,200,150,0.3)' },
    rejected:   { bg: 'rgba(220,38,38,0.1)', color: COLORS.danger, border: 'rgba(220,38,38,0.3)' },
  };
  const c = colors[status] || colors.pending;
  return `<span style="display:inline-block; padding:4px 14px; border-radius:20px; font-size:13px; font-weight:700; background:${c.bg}; color:${c.color}; border:1.5px solid ${c.border};">${label}</span>`;
}

function ctaButton(text: string, href: string, color?: string): string {
  const bg = color || COLORS.primary;
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;">
    <tr>
      <td style="background-color:${bg}; border-radius:8px; padding:14px 28px;">
        <a href="${href}" target="_blank" style="color:${COLORS.white}; text-decoration:none; font-weight:700; font-size:15px; display:inline-block;">${text}</a>
      </td>
    </tr>
  </table>`;
}

function infoBox(content: string, borderColor?: string): string {
  const bc = borderColor || COLORS.info;
  return `<div style="background-color:${COLORS.bgLight}; padding:16px 20px; border-left:4px solid ${bc}; border-radius:4px; margin:20px 0; font-size:14px; line-height:1.6; color:${COLORS.text};">
    ${content}
  </div>`;
}

function detailRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 12px; font-size:14px; color:${COLORS.textMuted}; border-bottom:1px solid ${COLORS.border}; font-weight:600; width:40%;">${label}</td>
    <td style="padding:8px 12px; font-size:14px; color:${COLORS.text}; border-bottom:1px solid ${COLORS.border};">${value}</td>
  </tr>`;
}

function detailsTable(rows: { label: string; value: string }[]): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${COLORS.border}; border-radius:8px; overflow:hidden; margin:20px 0;">
    ${rows.map(r => detailRow(r.label, r.value)).join('')}
  </table>`;
}


// ═══════════════════════════════════════════════════════════════════════════
// TEMPLATES
// ═══════════════════════════════════════════════════════════════════════════

// ─── 1. Bienvenue (inscription) ──────────────────────────────────────────────

export interface WelcomeData {
  firstName: string;
  lastName: string;
  email: string;
}

export function welcomeTemplate(data: WelcomeData): { subject: string; html: string } {
  const content = `
    <h2 style="margin:0 0 8px; color:${COLORS.text}; font-size:22px;">
      Bienvenue ${data.firstName} ! 🎉
    </h2>
    <p style="color:${COLORS.textMuted}; font-size:15px; line-height:1.7; margin:0 0 20px;">
      Votre compte FinancePro a été créé avec succès. Vous pouvez dès à présent accéder à tous nos services.
    </p>
    
    ${detailsTable([
      { label: 'Nom', value: `${data.firstName} ${data.lastName}` },
      { label: 'Email', value: data.email },
    ])}

    <p style="color:${COLORS.text}; font-size:15px; line-height:1.7;">
      Avec votre espace client, vous pouvez :
    </p>
    <ul style="color:${COLORS.text}; font-size:14px; line-height:2; padding-left:20px;">
      <li>📊 Simuler votre prêt en quelques clics</li>
      <li>📝 Soumettre et suivre vos demandes de financement</li>
      <li>📄 Téléverser vos documents en toute sécurité</li>
      <li>💬 Échanger directement avec votre conseiller</li>
    </ul>

    ${ctaButton('Accéder à mon espace client', `${SITE_URL}/fr/espace-client`, COLORS.accent)}
    
    <p style="color:${COLORS.textMuted}; font-size:13px; margin:0;">
      Si vous n'êtes pas à l'origine de cette inscription, vous pouvez ignorer cet email.
    </p>
  `;

  return {
    subject: 'Bienvenue chez FinancePro — Votre compte est prêt !',
    html: baseLayout(content, 'Bienvenue chez FinancePro ! Votre espace client est prêt.'),
  };
}


// ─── 2. Demande soumise (confirmation client) ────────────────────────────────

export interface ApplicationSubmittedData {
  firstName: string;
  dossierNumber: string;
  loanType: string;
  amount: number;
  duration: number;
}

export function applicationSubmittedTemplate(data: ApplicationSubmittedData): { subject: string; html: string } {
  const amountFormatted = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(data.amount);

  const loanTypeLabels: Record<string, string> = {
    personnel: 'Prêt personnel',
    immobilier: 'Prêt immobilier',
    professionnel: 'Prêt professionnel',
    rachat: 'Rachat de crédit',
    travaux: 'Prêt travaux',
    auto: 'Prêt auto',
  };

  const content = `
    <h2 style="margin:0 0 8px; color:${COLORS.text}; font-size:22px;">
      Demande enregistrée ✅
    </h2>
    <p style="color:${COLORS.textMuted}; font-size:15px; line-height:1.7; margin:0 0 20px;">
      Bonjour <strong>${data.firstName}</strong>, votre demande de financement a bien été reçue et est en cours de traitement.
    </p>

    ${detailsTable([
      { label: 'N° Dossier', value: `<strong>${data.dossierNumber}</strong>` },
      { label: 'Type de prêt', value: loanTypeLabels[data.loanType] || data.loanType },
      { label: 'Montant demandé', value: amountFormatted },
      { label: 'Durée', value: `${data.duration} mois` },
      { label: 'Statut', value: statusBadge('pending', 'En attente') },
    ])}

    ${infoBox(`
      <strong>⏱️ Prochaines étapes :</strong><br/>
      Notre équipe va étudier votre dossier sous <strong>48 à 72 heures ouvrées</strong>. 
      Vous recevrez un email à chaque mise à jour de votre dossier.
    `, COLORS.info)}

    ${ctaButton('Suivre mon dossier', `${SITE_URL}/fr/espace-client`)}

    <p style="color:${COLORS.textMuted}; font-size:13px; margin:0;">
      Conservez votre numéro de dossier <strong>${data.dossierNumber}</strong> pour tout échange avec nos services.
    </p>
  `;

  return {
    subject: `Demande ${data.dossierNumber} — Confirmation de réception`,
    html: baseLayout(content, `Votre demande ${data.dossierNumber} a bien été enregistrée.`),
  };
}


// ─── 3. Notification admin — nouvelle demande ───────────────────────────────

export interface AdminNewApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dossierNumber: string;
  loanType: string;
  amount: number;
  duration: number;
}

export function adminNewApplicationTemplate(data: AdminNewApplicationData): { subject: string; html: string } {
  const amountFormatted = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(data.amount);

  const content = `
    <h2 style="margin:0 0 8px; color:${COLORS.text}; font-size:22px;">
      🆕 Nouvelle demande de prêt
    </h2>
    <p style="color:${COLORS.textMuted}; font-size:15px; line-height:1.7; margin:0 0 20px;">
      Un nouveau dossier vient d'être soumis sur FinancePro.
    </p>

    ${detailsTable([
      { label: 'N° Dossier', value: `<strong>${data.dossierNumber}</strong>` },
      { label: 'Client', value: `${data.firstName} ${data.lastName}` },
      { label: 'Email', value: data.email },
      { label: 'Téléphone', value: data.phone || 'Non renseigné' },
      { label: 'Type', value: data.loanType },
      { label: 'Montant', value: amountFormatted },
      { label: 'Durée', value: `${data.duration} mois` },
    ])}

    ${ctaButton('Voir dans le panel admin', `${SITE_URL}/fr/admin`, COLORS.primary)}
  `;

  return {
    subject: `🆕 Nouvelle demande — ${data.dossierNumber} (${amountFormatted})`,
    html: baseLayout(content, `Nouveau dossier ${data.dossierNumber} soumis par ${data.firstName} ${data.lastName}`),
  };
}


// ─── 4. Changement de statut ─────────────────────────────────────────────────

export interface StatusChangeData {
  firstName: string;
  dossierNumber: string;
  status: 'processing' | 'approved' | 'rejected';
  notes?: string;
}

export function statusChangeTemplate(data: StatusChangeData): { subject: string; html: string } {
  const statusConfig: Record<string, { emoji: string; label: string; color: string; title: string; message: string }> = {
    processing: {
      emoji: '🔄',
      label: 'En traitement',
      color: COLORS.info,
      title: 'Votre dossier est pris en charge',
      message: 'Bonne nouvelle ! Un conseiller a été assigné à votre dossier et l\'étude de votre demande est en cours. Nous reviendrons vers vous dans les plus brefs délais.',
    },
    approved: {
      emoji: '🎉',
      label: 'Approuvé',
      color: COLORS.accent,
      title: 'Félicitations, votre demande est acceptée !',
      message: 'Nous avons le plaisir de vous informer que votre demande de financement a été <strong>approuvée</strong> par notre équipe. Votre conseiller dédié vous contactera très prochainement avec l\'offre de prêt formelle.',
    },
    rejected: {
      emoji: '📋',
      label: 'Non retenu',
      color: COLORS.danger,
      title: 'Décision concernant votre dossier',
      message: 'Suite à l\'étude attentive de votre demande, nous avons le regret de vous informer que nous ne pouvons pas y donner une suite favorable pour le moment. Cette décision repose sur les critères actuels de notre institution.',
    },
  };

  const config = statusConfig[data.status] || statusConfig.processing;

  const content = `
    <div style="text-align:center; margin-bottom:24px;">
      <span style="font-size:48px;">${config.emoji}</span>
    </div>
    <h2 style="margin:0 0 8px; color:${COLORS.text}; font-size:22px; text-align:center;">
      ${config.title}
    </h2>
    <p style="color:${COLORS.textMuted}; font-size:15px; line-height:1.7; margin:16px 0 20px;">
      Bonjour <strong>${data.firstName}</strong>,
    </p>
    <p style="color:${COLORS.text}; font-size:15px; line-height:1.7; margin:0 0 20px;">
      ${config.message}
    </p>

    ${detailsTable([
      { label: 'N° Dossier', value: `<strong>${data.dossierNumber}</strong>` },
      { label: 'Nouveau statut', value: statusBadge(data.status, config.label) },
    ])}

    ${data.notes ? infoBox(`<strong>📝 Remarques :</strong><br/>${data.notes}`, config.color) : ''}

    ${data.status === 'rejected' ? `
      <p style="color:${COLORS.text}; font-size:14px; line-height:1.7;">
        Nous restons à votre disposition pour analyser d'éventuels projets futurs ou pour toute explication complémentaire.
      </p>
    ` : ''}

    ${ctaButton('Consulter mon espace', `${SITE_URL}/fr/espace-client`, config.color)}

    <p style="color:${COLORS.textMuted}; font-size:13px; margin:0;">
      Pour toute question, n'hésitez pas à nous <a href="${SITE_URL}/fr/contact" style="color:${COLORS.primary};">contacter</a>.
    </p>
  `;

  return {
    subject: `${config.emoji} ${config.title} — Dossier ${data.dossierNumber}`,
    html: baseLayout(content, `${config.title} — Dossier ${data.dossierNumber}`),
  };
}


// ─── 5. Demande de documents manquants ──────────────────────────────────────

export interface MissingDocumentsData {
  firstName: string;
  dossierNumber: string;
  notes: string;
}

export function missingDocumentsTemplate(data: MissingDocumentsData): { subject: string; html: string } {
  const content = `
    <h2 style="margin:0 0 8px; color:${COLORS.warning}; font-size:22px;">
      ⚠️ Pièces complémentaires requises
    </h2>
    <p style="color:${COLORS.textMuted}; font-size:15px; line-height:1.7; margin:0 0 8px;">
      Bonjour <strong>${data.firstName}</strong>,
    </p>
    <p style="color:${COLORS.text}; font-size:15px; line-height:1.7; margin:0 0 20px;">
      Afin de poursuivre l'analyse de votre dossier <strong>${data.dossierNumber}</strong>, nous avons besoin de pièces complémentaires :
    </p>

    ${infoBox(`<div style="white-space:pre-wrap;">${data.notes}</div>`, COLORS.warning)}
    
    <p style="color:${COLORS.text}; font-size:15px; line-height:1.7; margin:20px 0;">
      Vous pouvez téléverser ces documents directement depuis votre <strong>Espace Client</strong>. 
      Le traitement de votre dossier reprendra dès réception de l'ensemble des pièces.
    </p>

    ${ctaButton('Téléverser mes documents', `${SITE_URL}/fr/espace-client`, COLORS.warning)}

    <p style="color:${COLORS.textMuted}; font-size:13px; margin:0;">
      Pour toute question, contactez-nous à l'adresse indiquée ci-dessous.
    </p>
  `;

  return {
    subject: `⚠️ Action requise — Pièces complémentaires (${data.dossierNumber})`,
    html: baseLayout(content, `Pièces manquantes pour le dossier ${data.dossierNumber}`),
  };
}


// ─── 6. Contact — accusé de réception client ────────────────────────────────

export interface ContactConfirmationData {
  firstName: string;
  lastName: string;
  subject?: string;
  message: string;
}

export function contactConfirmationTemplate(data: ContactConfirmationData): { subject: string; html: string } {
  const content = `
    <h2 style="margin:0 0 8px; color:${COLORS.text}; font-size:22px;">
      Message bien reçu ✉️
    </h2>
    <p style="color:${COLORS.textMuted}; font-size:15px; line-height:1.7; margin:0 0 20px;">
      Bonjour <strong>${data.firstName}</strong>, nous avons bien reçu votre message et nous vous en remercions.
    </p>

    ${infoBox(`
      ${data.subject ? `<strong>Objet :</strong> ${data.subject}<br/><br/>` : ''}
      <strong>Votre message :</strong><br/>
      <div style="white-space:pre-wrap; margin-top:8px; color:${COLORS.textMuted};">${data.message}</div>
    `, COLORS.primary)}

    <p style="color:${COLORS.text}; font-size:15px; line-height:1.7; margin:20px 0;">
      Un conseiller vous répondra dans un délai de <strong>24 heures ouvrées</strong>.
    </p>

    <p style="color:${COLORS.textMuted}; font-size:13px; margin:0;">
      Nous restons à votre entière disposition.
    </p>
  `;

  return {
    subject: 'FinancePro — Nous avons bien reçu votre message',
    html: baseLayout(content, 'Votre message a bien été reçu par FinancePro.'),
  };
}


// ─── 7. Contact — notification admin ────────────────────────────────────────

export interface ContactReceivedData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export function contactReceivedTemplate(data: ContactReceivedData): { subject: string; html: string } {
  const content = `
    <h2 style="margin:0 0 8px; color:${COLORS.text}; font-size:22px;">
      📬 Nouveau message de contact
    </h2>
    <p style="color:${COLORS.textMuted}; font-size:15px; line-height:1.7; margin:0 0 20px;">
      Un visiteur a envoyé un message via le formulaire de contact.
    </p>

    ${detailsTable([
      { label: 'Nom', value: `${data.firstName} ${data.lastName}` },
      { label: 'Email', value: `<a href="mailto:${data.email}" style="color:${COLORS.primary};">${data.email}</a>` },
      { label: 'Téléphone', value: data.phone || 'Non renseigné' },
      { label: 'Objet', value: data.subject || 'Aucun' },
    ])}

    ${infoBox(`<strong>Message :</strong><br/><div style="white-space:pre-wrap; margin-top:8px;">${data.message}</div>`, COLORS.accent)}

    <p style="color:${COLORS.textMuted}; font-size:13px; margin:16px 0 0;">
      Répondre directement à : <a href="mailto:${data.email}" style="color:${COLORS.primary};">${data.email}</a>
    </p>
  `;

  return {
    subject: `📬 Contact — ${data.firstName} ${data.lastName}${data.subject ? ` : ${data.subject}` : ''}`,
    html: baseLayout(content, `Nouveau message de ${data.firstName} ${data.lastName}`),
  };
}
