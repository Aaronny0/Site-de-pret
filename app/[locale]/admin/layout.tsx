'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  LogOut,
  TrendingUp,
  Menu,
  X,
} from 'lucide-react'

const ADMIN_ID = 'admin'
const ADMIN_PWD = 'admin'
const SESSION_KEY = 'fp_admin_session'

function getSession(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return false
    const data = JSON.parse(raw)
    // Session valide 4h
    return data.isAdmin && Date.now() - data.loginTime < 4 * 60 * 60 * 1000
  } catch {
    return false
  }
}

function setSession() {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ isAdmin: true, loginTime: Date.now() }))
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY)
}

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [id, setId] = useState('admin')
  const [pwd, setPwd] = useState('admin')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    setTimeout(() => {
      if (id === ADMIN_ID && pwd === ADMIN_PWD) {
        setSession()
        onLogin()
      } else {
        setError('Identifiant ou mot de passe incorrect.')
        setLoading(false)
      }
    }, 500)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 50%, #1E4976 100%)',
        padding: '2rem',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          padding: '3rem',
          maxWidth: '420px',
          width: '100%',
          boxShadow: '0 25px 80px rgba(0,0,0,0.25)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              boxShadow: '0 4px 20px rgba(0,200,150,0.3)',
            }}
          >
            <TrendingUp size={28} color="white" />
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--color-text)',
              marginBottom: '0.5rem',
            }}
          >
            Administration
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Accès réservé aux administrateurs FinancePro
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: '0.75rem 1rem',
              background: 'rgba(220,38,38,0.06)',
              color: 'var(--color-danger)',
              border: '1px solid rgba(220,38,38,0.15)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              fontWeight: 500,
              marginBottom: '1.25rem',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="admin-id" style={{ fontWeight: 600 }}>
                Identifiant
              </label>
              <input
                id="admin-id"
                type="text"
                className="form-input"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Identifiant admin"
                autoComplete="username"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="admin-pwd" style={{ fontWeight: 600 }}>
                Mot de passe
              </label>
              <input
                id="admin-pwd"
                type="password"
                className="form-input"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="Mot de passe"
                autoComplete="current-password"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              marginTop: '1.5rem',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}

const sidebarItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, href: '' },
  { id: 'demandes', label: 'Demandes', icon: FileText, href: '/demandes' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [checking, setChecking] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setAuthenticated(getSession())
    setChecking(false)
  }, [])

  if (checking) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Chargement...</p>
      </div>
    )
  }

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />
  }

  const locale = pathname.split('/')[1] || 'fr'

  function handleLogout() {
    clearSession()
    setAuthenticated(false)
  }

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      background: 'radial-gradient(circle at top right, rgba(0, 200, 150, 0.12), transparent 500px), radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.08), transparent 500px), var(--color-bg)',
      backgroundAttachment: 'fixed'
    }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '260px',
          background: 'linear-gradient(180deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          position: 'fixed',
          top: 0,
          left: sidebarOpen ? 0 : '-260px',
          bottom: 0,
          zIndex: 1100,
          transition: 'left 0.3s ease',
        }}
        className="admin-sidebar"
      >
        {/* Logo */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href={`/${locale}`} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TrendingUp size={20} color="white" />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>
                Finance<span style={{ color: 'var(--color-accent)' }}>Pro</span>
              </span>
            </Link>
            <button
              className="hide-desktop"
              onClick={() => setSidebarOpen(false)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>
          <span
            style={{
              display: 'inline-block',
              marginTop: '0.5rem',
              fontSize: '0.7rem',
              fontWeight: 600,
              color: 'var(--color-accent)',
              background: 'rgba(0,200,150,0.1)',
              padding: '0.2rem 0.6rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(0,200,150,0.2)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Admin Panel
          </span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {sidebarItems.map(({ id, label, icon: Icon, href }) => {
            const fullHref = `/${locale}/admin${href}`
            const isActive = pathname === fullHref || (href !== '' && pathname.startsWith(fullHref))

            return (
              <Link
                key={id}
                href={fullHref}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  color: isActive ? 'white' : 'rgba(255,255,255,0.6)',
                  background: isActive ? 'rgba(0,200,150,0.15)' : 'transparent',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '0.9rem',
                  transition: 'all 0.2s',
                }}
              >
                <Icon size={18} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              width: '100%',
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.6)',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-body)',
              transition: 'all 0.2s',
            }}
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, marginLeft: '0', minHeight: '100vh' }} className="admin-content">
        {/* Top bar for mobile */}
        <div
          className="hide-desktop"
          style={{
            padding: '0.75rem 1rem',
            background: 'var(--color-primary-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
          >
            <Menu size={24} />
          </button>
          <span style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>Admin Panel</span>
          <div style={{ width: '24px' }} />
        </div>

        <div style={{ padding: '2rem clamp(1rem, 3vw, 2rem)' }}>
          {children}
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1050,
          }}
        />
      )}

      <style>{`
        @media (min-width: 768px) {
          .admin-sidebar { left: 0 !important; }
          .admin-content { margin-left: 260px !important; }
        }
      `}</style>
    </div>
  )
}
