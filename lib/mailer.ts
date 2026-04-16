import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Explicité : Adresse officielle du serveur SMTP de Google
  port: 465,              // Explicité : Port SMTPS (Secure SMTP)
  secure: true,           // Explicité : true pour forcer l'usage exclusif du port 465 en TLS/SSL direct
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
  tls: {
    // Ne pas échouer en cas de problème mineur de vérification de certificat
    rejectUnauthorized: false
  }
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"FinancePro" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      html, // html body
    });

    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    // LOGGING ROBUSTE exigé par production
    console.error('=========================================');
    console.error('❌ ERREUR CRITIQUE D\'ENVOI SMTP :');
    console.error('Nom erreur :', error.name);
    console.error('Message erreur :', error.message);
    if (error.response) {
      console.error('Réponse SMTP :', error.response);
    }
    if (error.code) {
      console.error('Code erreur SMTP :', error.code);
    }
    console.error('Pile (Stack) :', error.stack);
    console.error('=========================================');
    
    return { success: false, error: error.message };
  }
};
