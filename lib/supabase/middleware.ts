import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Rafraîchissement silencieux de la session
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Redirection des utilisateurs non connectés protégeant l'espace client
  if (!user && request.nextUrl.pathname.startsWith('/espace-client')) {
    const url = request.nextUrl.clone()
    url.pathname = '/connexion' // Il faudra créer cette page ou configurer le routage vers la page de login
    return NextResponse.redirect(url)
  }

  // Rediriger vers l'espace client si déjà connecté mais qu'il essaie d'aller sur connexion
  if (user && request.nextUrl.pathname.startsWith('/connexion')) {
    const url = request.nextUrl.clone()
    url.pathname = '/espace-client' 
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
