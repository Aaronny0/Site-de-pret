import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

// ─── Singleton transporter ──────────────────────────────────────────────────
let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (transporter) return transporter;

  const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.EMAIL_PORT || '465', 10);

  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    throw new Error('Missing EMAIL_USER or EMAIL_APP_PASSWORD environment variables');
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  return transporter;
}

// ─── Envoi d'email brut ─────────────────────────────────────────────────────
export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  replyTo?: string,
): Promise<EmailResult> {
  try {
    const fromName = process.env.EMAIL_FROM_NAME || 'FinancePro';
    const transport = getTransporter();

    const info = await transport.sendMail({
      from: `"${fromName}" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });

    console.log(`✅ Email envoyé à ${to} — MessageID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('=========================================');
    console.error('❌ ERREUR SMTP :');
    console.error('Message :', error.message);
    if (error.code) console.error('Code :', error.code);
    if (error.response) console.error('Réponse SMTP :', error.response);
    console.error('=========================================');

    return { success: false, error: error.message };
  }
}

// ─── Envoi vers l'admin ─────────────────────────────────────────────────────
export async function sendAdminEmail(
  subject: string,
  html: string,
  replyTo?: string,
): Promise<EmailResult> {
  const adminEmail = process.env.EMAIL_ADMIN || process.env.EMAIL_USER!;
  return sendEmail(adminEmail, subject, html, replyTo);
}
