import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const locales = ['es', 'fr']
const defaultLocale = 'es'

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
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
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

  const locale = request.nextUrl.pathname.split('/')[1] || defaultLocale

  // Protect client area routes (both ES and FR slugs)
  const isClientArea = request.nextUrl.pathname.match(/^\/(fr|es)\/(espace-client|area-cliente)/);
  const isLoginPage = request.nextUrl.pathname.match(/^\/(fr|es)\/(connexion|iniciar-sesion)/);

  // Redirect unauthenticated users trying to access client area
  if (!user && isClientArea) {
    const url = request.nextUrl.clone()
    url.pathname = locale === 'fr' ? `/${locale}/connexion` : `/${locale}/iniciar-sesion`
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from login page
  if (user && isLoginPage) {
    const url = request.nextUrl.clone()
    url.pathname = locale === 'fr' ? `/${locale}/espace-client` : `/${locale}/area-cliente`
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
