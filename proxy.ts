import { NextResponse, type NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { updateSession } from '@/lib/supabase/middleware'

const locales = ['es', 'fr']
const defaultLocale = 'es'

function getLocale(request: NextRequest): string {
  const headers = { 'accept-language': request.headers.get('accept-language') || '' }
  const languages = new Negotiator({ headers }).languages()
  
  try {
    return match(languages, locales, defaultLocale)
  } catch (e) {
    return defaultLocale
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // Skip localization for Supabase auth callbacks, API routes, or static files
  if (pathname.startsWith('/auth') || pathname.startsWith('/api') || pathname.match(/\.(.*)$/)) {
    return await updateSession(request)
  }

  // Redirect if there is no locale
  if (!pathnameHasLocale) {
    const locale = getLocale(request)
    const newUrl = request.nextUrl.clone()
    newUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
    // Maintain query string
    newUrl.search = request.nextUrl.search
    return NextResponse.redirect(newUrl)
  }

  // Otherwise handle supabase session
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
