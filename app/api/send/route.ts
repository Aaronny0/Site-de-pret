import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { to, subject, html } = await request.json();

    console.log("SENDING EMAIL VIA API. User:", process.env.EMAIL_USER ? "DEFINED" : "MISSING", " Password: ", process.env.EMAIL_APP_PASSWORD ? "DEFINED" : "MISSING");

    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      console.error("Missing EMAIL_USER or EMAIL_APP_PASSWORD environment variables!");
      return NextResponse.json(
        { error: 'Configuration serveur manquante pour l\'envoi d\'email.' },
        { status: 500 }
      );
    }

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: 'Paramètres manquants: "to", "subject", ou "html" sont requis.' },
        { status: 400 }
      );
    }

    // Configuration explicite et robuste du transporteur SMTP pour Gmail
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', 
      port: 465,              
      secure: true,           
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

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
    console.error("❌ ERREUR CRITIQUE D'ENVOI SMTP :");
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
