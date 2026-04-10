import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';

export async function POST(request: Request) {
  try {
    const { to, subject, html } = await request.json();

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: 'Paramètres manquants: to, subject, ou html sont requis.' },
        { status: 400 }
      );
    }

    const result = await sendEmail(to, subject, html);

    if (result.success) {
      return NextResponse.json({ success: true, messageId: result.messageId });
    } else {
      return NextResponse.json(
        { error: 'Erreur envoi email.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erreur Serveur (send-email):', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur.' },
      { status: 500 }
    );
  }
}
