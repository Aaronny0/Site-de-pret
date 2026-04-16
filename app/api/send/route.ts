import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configuration explicite et robuste du transporteur SMTP pour Gmail
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Serveur SMTP sortant officiel de Google
  port: 465,              // Port natif pour SMTP sécurisé (SMTPS)
  secure: true,           // Oblige la connexion à être immédiatement sécurisée en SSL/TLS (requis pour le port 465)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
  tls: {
    // Évite certaines erreurs de SSL dans des environnements serverless agressifs
    rejectUnauthorized: false
  }
});

export async function POST(request: Request) {
  try {
    const { to, subject, html } = await request.json();

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: 'Paramètres manquants: "to", "subject", ou "html" sont requis.' },
        { status: 400 }
      );
    }

    const info = await transporter.sendMail({
      from: `"FinancePro" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    // LOGGING ROBUSTE POUR DEBUGGER SUR VERCEL
    console.error('=========================================');
    console.error('❌ ERREUR CRITIQUE D\\'ENVOI SMTP :');
    console.error('Nom erreur :', error.name);
    console.error('Message erreur :', error.message);
    if (error.response) {
      console.error('Réponse SMTP (Refus Google) :', error.response);
    }
    if (error.code) {
      console.error('Code erreur SMTP :', error.code);
    }
    console.error('Pile (Stack) :', error.stack);
    console.error('=========================================');

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
