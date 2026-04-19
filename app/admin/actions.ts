'use server'

import { createClient } from '@supabase/supabase-js'
import { sendEmail } from '@/lib/mailer'
import {
  statusChangeTemplate,
  missingDocumentsTemplate,
} from '@/lib/emailTemplates'

// Initialiser le client admin avec la Service Role Key pour contourner le RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function getAdminStats() {
  try {
    // Total demandes
    const { count: totalCount, error: totalError } = await supabaseAdmin
      .from('loan_applications')
      .select('*', { count: 'exact', head: true })
    
    if (totalError) throw totalError

    // En attente
    const { count: pendingCount, error: pendingError } = await supabaseAdmin
      .from('loan_applications')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')

    if (pendingError) throw pendingError

    // Approuvées
    const { count: approvedCount, error: approvedError } = await supabaseAdmin
      .from('loan_applications')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved')

    if (approvedError) throw approvedError

    // Montant total réclamé (tout statut)
    const { data: amountsData, error: amountsError } = await supabaseAdmin
      .from('loan_applications')
      .select('amount')

    if (amountsError) throw amountsError

    const totalAmount = amountsData.reduce((acc, curr) => acc + Number(curr.amount), 0)

    return {
      total: totalCount || 0,
      pending: pendingCount || 0,
      approved: approvedCount || 0,
      totalAmount: totalAmount || 0,
      success: true,
    }
  } catch (error) {
    console.error('Erreur getAdminStats:', error)
    return { success: false, error: 'Impossible de récupérer les statistiques.' }
  }
}

export async function getAllDemandes() {
  try {
    // Tenter la jointure d'abord
    const { data, error } = await supabaseAdmin
      .from('loan_applications')
      .select(`
        *,
        profiles (
          id,
          first_name,
          last_name,
          phone,
          address,
          city,
          postal_code,
          country
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      // Si la jointure échoue (ex: FK manquante), on récupère les données sans profiles
      console.warn("Jointure profiles échouée, récupération sans profiles:", error.message);
      const { data: simpleData, error: simpleError } = await supabaseAdmin
        .from('loan_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (simpleError) throw simpleError;
      return { success: true, demandes: simpleData };
    }

    return { success: true, demandes: data }
  } catch (error: any) {
    console.error('Erreur getAllDemandes:', error)
    return { success: false, error: 'Impossible de récupérer les demandes : ' + error.message }
  }
}

export async function updateDemandeStatus(id: string, status: string, notes?: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('loan_applications')
      .update({ status, notes: notes || null, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    // Envoi d'email automatique selon le statut
    if (status === 'approved' || status === 'rejected' || status === 'processing') {
      const email = data.personal_data?.email;
      const firstName = data.personal_data?.firstName;
      
      if (email && firstName) {
        const template = statusChangeTemplate({
          firstName,
          dossierNumber: data.dossier_number,
          status: status as 'approved' | 'rejected' | 'processing',
          notes: notes || undefined,
        });

        console.log(`Envoi email statut "${status}" à ${email}`);
        const emailResult = await sendEmail(email, template.subject, template.html);
        
        if (!emailResult.success) {
          console.error("Échec envoi email statut:", emailResult.error);
        }
      }
    }

    return { success: true, demande: data }
  } catch (error) {
    console.error('Erreur updateDemandeStatus:', error)
    return { success: false, error: 'Impossible de mettre à jour la demande.' }
  }
}

export async function getDocumentUrl(path: string) {
  try {
    const { data, error } = await supabaseAdmin
      .storage
      .from('loan-documents')
      .createSignedUrl(path, 3600) // 1 heure

    if (error) throw error

    return { success: true, url: data.signedUrl }
  } catch (error) {
    console.error('Erreur getDocumentUrl:', error)
    return { success: false, error: 'Impossible de récupérer le lien du document.' }
  }
}

export async function requestMissingDocuments(id: string, email: string, firstName: string, dossierNumber: string, notes: string) {
  try {
    // Mettre à jour les notes dans la BDD pour garder une trace
    await supabaseAdmin
      .from('loan_applications')
      .update({ notes })
      .eq('id', id);

    const template = missingDocumentsTemplate({
      firstName,
      dossierNumber,
      notes: notes || 'Merci de bien vouloir vous connecter à votre espace client pour vérifier les documents demandés.',
    });

    const res = await sendEmail(email, template.subject, template.html);
    if (!res.success) throw new Error("L'envoi de l'email a échoué.");

    return { success: true };
  } catch (error) {
    console.error('Erreur requestMissingDocuments:', error);
    return { success: false, error: 'Impossible d\'envoyer l\'email.' };
  }
}
