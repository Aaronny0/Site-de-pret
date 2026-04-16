import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    console.log("SENDING EMAIL. User: ", process.env.EMAIL_USER ? "DEFINED" : "MISSING", " Password: ", process.env.EMAIL_APP_PASSWORD ? "DEFINED" : "MISSING");
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      console.error("Missing EMAIL_USER or EMAIL_APP_PASSWORD environment variables!");
      return { success: false, error: "Settings missing" };
    }

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
