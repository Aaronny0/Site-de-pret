'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import ChatWidget from '@/components/ChatWidget'

/**
 * Conditionally renders Navbar/Footer based on the current route.
 * Routes like /admin, /connexion, /inscription have their own layouts.
 */
export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Routes that should NOT show the global Navbar/Footer
  const hideShell =
    pathname.includes('/admin') ||
    pathname.includes('/connexion') ||
    pathname.includes('/iniciar-sesion') ||
    pathname.includes('/inscription') ||
    pathname.includes('/registro')

  if (hideShell) {
    return (
      <>
        <main id="main-content" className="flex-1">
          {children}
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <CookieBanner />
      <ChatWidget />
    </>
  )
}
