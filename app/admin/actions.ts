'use server'

import { createClient } from '@supabase/supabase-js'

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
    if (status === 'approved' || status === 'rejected') {
      const email = data.personal_data?.email;
      const firstName = data.personal_data?.firstName;
      
      if (email) {
        let subject = '';
        let html = '';

        if (status === 'approved') {
          subject = `Félicitations, votre demande de prêt ${data.dossier_number} est acceptée !`;
          html = `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #059669;">Bonne nouvelle ${firstName} !</h2>
              <p>Nous avons le plaisir de vous annoncer que votre demande de financement (dossier n° <strong>${data.dossier_number}</strong>) a été <strong>approuvée</strong> par notre équipe.</p>
              <p>Votre conseiller dédié reviendra vers vous très prochainement avec l'offre de prêt formelle et les prochaines étapes.</p>
              <p>Pour toute question, n'hésitez pas à nous contacter.</p>
              <br/>
              <p>Cordialement,</p>
              <p><strong>L'équipe FinancePro</strong></p>
            </div>
          `;
        } else if (status === 'rejected') {
          subject = `Décision concernant votre demande de prêt ${data.dossier_number}`;
          html = `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
              <h2>Bonjour ${firstName},</h2>
              <p>Suite à l'étude attentive de votre demande de financement (dossier n° <strong>${data.dossier_number}</strong>), nous avons le regret de vous informer que nous ne pouvons pas y donner une suite favorable pour le moment.</p>
              <p>Cette décision est motivée par les critères actuels de notre institution. Nous restons à votre disposition pour analyser des projets futurs ou vous fournir de plus amples explications.</p>
              <br/>
              <p>Soyez assuré(e) de notre plus grand respect pour l'intérêt que vous portez à nos services.</p>
              <br/>
              <p>Cordialement,</p>
              <p><strong>L'équipe FinancePro</strong></p>
            </div>
          `;
        }
        
        // On fetch l'API en absolu si on connaît l'URL, sinon en local
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        fetch(`${baseUrl}/api/send-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: email,
            subject,
            html
          })
        }).catch(e => console.error("API send-email error", e));
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
    const subject = `Action requise : Pièces complémentaires (Dossier n° ${dossierNumber})`;
    const html = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #D97706;">Bonjour ${firstName},</h2>
        <p>Afin d'avancer sur l'analyse de votre dossier (<strong>${dossierNumber}</strong>), nous avons besoin de pièces complémentaires :</p>
        <div style="background-color: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0; white-space: pre-wrap;">${notes || "Merci de bien vouloir vous connecter à votre espace client pour vérifier les documents demandés."}</p>
        </div>
        <p>Vous pouvez téléverser ces documents directement dans votre <strong>Espace Client</strong>.</p>
        <p>Nous restons à votre entière disposition pour toute question.</p>
        <br/>
        <p>Cordialement,</p>
        <p><strong>L'équipe FinancePro</strong></p>
      </div>
    `;

    // Mettre à jour les notes dans la BDD pour garder une trace
    await supabaseAdmin
      .from('loan_applications')
      .update({ notes: notes })
      .eq('id', id);

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: email, subject, html })
    });

    if (!res.ok) throw new Error("L'API d'envoi d'email a échoué.");

    return { success: true };
  } catch (error) {
    console.error('Erreur requestMissingDocuments:', error);
    return { success: false, error: 'Impossible d\'envoyer l\'email.' };
  }
}

