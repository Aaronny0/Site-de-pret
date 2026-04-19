'use server'

import { createClient } from '@supabase/supabase-js'
import { sendEmail, sendAdminEmail } from '@/lib/mailer'
import {
  contactConfirmationTemplate,
  contactReceivedTemplate,
} from '@/lib/emailTemplates'

function getSupabaseAdmin() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing Supabase environment variables.");
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export async function submitContactForm(formData: ContactFormData) {
  try {
    const { firstName, lastName, email, phone, subject, message } = formData;

    // 1. Insérer dans contact_messages
    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin
      .from('contact_messages')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phone || null,
        subject: subject || null,
        message,
      });

    if (error) throw error;

    // 2. Emails (non-bloquant)
    try {
      // Accusé de réception au client
      const clientTemplate = contactConfirmationTemplate({
        firstName,
        lastName,
        subject,
        message,
      });
      await sendEmail(email, clientTemplate.subject, clientTemplate.html);

      // Notification admin
      const adminTemplate = contactReceivedTemplate({
        firstName,
        lastName,
        email,
        phone,
        subject,
        message,
      });
      await sendAdminEmail(adminTemplate.subject, adminTemplate.html, email);
    } catch (emailError) {
      console.error('Emails contact échoués (non-bloquant):', emailError);
    }

    return { success: true };
  } catch (error: any) {
    console.error('Erreur submitContactForm:', error);
    return { success: false, error: 'Impossible d\'envoyer votre message.' };
  }
}
