'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Simple validation
  if (!email || !password) {
    return { error: 'Veuillez remplir tous les champs.' }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: "Email ou mot de passe invalide." }
  }

  revalidatePath('/espace-client', 'layout')
  redirect('/espace-client')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const firstName = formData.get('first_name') as string
  const lastName = formData.get('last_name') as string

  if (!email || !password || !firstName || !lastName) {
    return { error: 'Veuillez remplir tous les champs.' }
  }

  if (password.length < 6) {
    return { error: 'Le mot de passe doit contenir au moins 6 caractères.' }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      }
    }
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/espace-client', 'layout')
  
  // Si require email confirmation est activé sur Supabase, on peut rediriger vers un message.
  // Mais par défaut on redirige vers l'espace client.
  redirect('/espace-client?message=Check-Email')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/connexion')
}
