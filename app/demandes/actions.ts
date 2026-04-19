'use server'

import { createClient } from '@supabase/supabase-js'
import { sendEmail, sendAdminEmail } from '@/lib/mailer'
import {
  applicationSubmittedTemplate,
  adminNewApplicationTemplate,
} from '@/lib/emailTemplates'

function getSupabaseAdmin() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing Supabase environment variables. Please configure SUPABASE_SERVICE_ROLE_KEY.");
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export async function submitLoanApplication(formData: any, uploadedDocs: any) {
  try {
    const {
      loanType,
      amount,
      duration,
      dossierNumber,
      userId,
      ...personalData
    } = formData

    // 1. Préparer les documents pour l'insertion
    const documents = Object.entries(uploadedDocs).map(([key, value]: [string, any]) => ({
      id: key,
      label: value.label,
      name: value.name,
      path: value.path,
      type: value.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
      size: value.size ? `${(value.size / 1024 / 1024).toFixed(1)} Mo` : 'N/A',
      uploaded_at: new Date().toISOString().split('T')[0]
    }))

    // 2. Insérer dans loan_applications
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from('loan_applications')
      .insert({
        user_id: userId,
        dossier_number: dossierNumber,
        loan_type: loanType,
        amount: amount,
        duration: duration,
        personal_data: personalData,
        documents: documents,
        status: 'pending'
      })
      .select()
      .single()

    if (error) throw error

    // 3. Envoi des emails (non-bloquant — on ne fait pas échouer la soumission si l'email rate)
    try {
      const clientEmail = personalData.email;
      const firstName = personalData.firstName;
      const lastName = personalData.lastName;

      if (clientEmail && firstName) {
        // Email de confirmation au client
        const clientTemplate = applicationSubmittedTemplate({
          firstName,
          dossierNumber,
          loanType,
          amount,
          duration,
        });
        await sendEmail(clientEmail, clientTemplate.subject, clientTemplate.html);

        // Notification admin
        const adminTemplate = adminNewApplicationTemplate({
          firstName,
          lastName: lastName || '',
          email: clientEmail,
          phone: personalData.phone,
          dossierNumber,
          loanType,
          amount,
          duration,
        });
        await sendAdminEmail(adminTemplate.subject, adminTemplate.html, clientEmail);
      }
    } catch (emailError) {
      // Log mais ne pas faire échouer la soumission
      console.error('Emails post-soumission échoués (non-bloquant):', emailError);
    }

    return { success: true, data }
  } catch (error) {
    console.error('Erreur submitLoanApplication:', error)
    return { success: false, error: 'Impossible d\'enregistrer votre demande.' }
  }
}

export async function getUserApplications(userId: string) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from('loan_applications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { success: true, applications: data || [] }
  } catch (error: any) {
    console.error('Erreur getUserApplications:', error)
    return { success: false, error: error.message }
  }
}

export async function getUserProfile(userId: string) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return { success: true, profile: data }
  } catch (error: any) {
    console.error('Erreur getUserProfile:', error)
    return { success: false, error: error.message }
  }
}

export async function updateUserProfile(userId: string, profileData: any) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update(profileData)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return { success: true, profile: data }
  } catch (error: any) {
    console.error('Erreur updateUserProfile:', error)
    return { success: false, error: error.message }
  }
}
