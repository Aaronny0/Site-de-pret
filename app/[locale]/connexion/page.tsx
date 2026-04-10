'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Lock, Mail, AlertCircle, ShieldCheck, PieChart, TrendingUp, Eye, EyeOff } from 'lucide-react'
import { login } from '@/app/auth/actions'
import { createClient } from '@/lib/supabase/client'
import { useDictionary } from '@/components/DictionaryProvider'
import { getLocalizedPath, type AppLocale } from '@/lib/routes'

export default function LoginPage() {
  const { lang, dict } = useDictionary()
  const locale = lang as AppLocale
  const t = dict?.login || {}
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const result = await login(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  async function handleGoogleLogin() {
    setGoogleLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${getLocalizedPath("client_area", locale)}`,
        },
      })
      if (error) {
        setError(error.message)
        setGoogleLoading(false)
      }
    } catch {
      setError(t.error_google || 'Error durante la conexión con Google.')
      setGoogleLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 35%, #1E4976 55%, #163956 80%, #0D2338 100%)',
      }}
    >
      {/* Background decorations */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute',
            top: '-15rem',
            right: '-10rem',
            width: '35rem',
            height: '35rem',
            background: 'radial-gradient(circle, rgba(0,200,150,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            animation: 'float 6s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-15rem',
            left: '-10rem',
            width: '35rem',
            height: '35rem',
            background: 'radial-gradient(circle, rgba(42,95,158,0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            animation: 'float 8s ease-in-out infinite 2s',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 1, scale: 1, y: 0 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '64rem',
          borderRadius: '2rem',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'row',
          boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
          position: 'relative',
          zIndex: 10,
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Left pane - Branding & Features */}
        <div
          className="hide-mobile"
          style={{
            width: '42%',
            background: 'rgba(17,40,64,0.8)',
            backdropFilter: 'blur(15px)',
            padding: '3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(26,60,94,0.5) 0%, rgba(17,40,64,0.95) 100%)',
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.15,
              background: 'radial-gradient(circle at top right, var(--color-accent), transparent 60%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <Link
              href={getLocalizedPath("home", locale)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '3rem',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(0,200,150,0.3)',
                }}
              >
                <TrendingUp size={28} color="white" />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: 'white',
                  letterSpacing: '-0.02em',
                }}
              >
                Finance<span style={{ color: 'var(--color-accent)' }}>Pro</span>
              </span>
            </Link>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 700,
                  color: 'white',
                  lineHeight: 1.2,
                  marginBottom: '1.25rem',
                }}
              >
                {t.branding_title || 'Gestione su futuro'} <br />
                <span style={{ color: 'var(--color-accent)' }}>{t.branding_highlight || 'con total simplicidad.'}</span>
              </h2>
              <p
                style={{
                  color: 'rgba(200,220,255,0.7)',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  marginBottom: '2rem',
                }}
              >
                {t.branding_desc || 'Acceda a su espacio personalizado, siga sus solicitudes de préstamo y gestione sus finanzas en tiempo real.'}
              </p>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: ShieldCheck, title: t.feature_security || 'Seguridad bancaria', desc: t.feature_security_desc || 'Datos cifrados de extremo a extremo.' },
                { icon: PieChart, title: t.feature_dashboard || 'Cuadro de mando', desc: t.feature_dashboard_desc || 'Analice el progreso de sus proyectos.' },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.15 }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: '1rem',
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(5px)',
                  }}
                >
                  <div
                    style={{
                      padding: '0.625rem',
                      borderRadius: '12px',
                      background: 'rgba(0,200,150,0.15)',
                      color: 'var(--color-accent)',
                      flexShrink: 0,
                    }}
                  >
                    <feature.icon size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600, color: 'white', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                      {feature.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(200,220,255,0.5)' }}>
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 1, marginTop: '2rem', fontSize: '0.8rem', color: 'rgba(200,220,255,0.3)', fontWeight: 500 }}>
            &copy; {new Date().getFullYear()} FinancePro. {t.copyright || 'Todos los derechos reservados.'}
          </div>
        </div>

        {/* Right pane - Login Form */}
        <div
          style={{
            width: '100%',
            maxWidth: '58%',
            background: 'white',
            padding: 'clamp(2rem, 4vw, 4rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ maxWidth: '420px', width: '100%', margin: '0 auto' }}>
            {/* Mobile Header */}
            <div className="hide-desktop" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <Link href={getLocalizedPath("home", locale)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TrendingUp size={22} color="white" />
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                  Finance<span style={{ color: 'var(--color-accent)' }}>Pro</span>
                </span>
              </Link>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                {t.title || '¡Hola de nuevo! 👋'}
              </h1>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
                {t.subtitle || 'Conéctese a su espacio personal'}
              </p>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                style={{ marginBottom: '1.5rem', overflow: 'hidden' }}
              >
                <div
                  style={{
                    padding: '0.875rem 1rem',
                    background: 'rgba(220,38,38,0.06)',
                    color: 'var(--color-danger)',
                    border: '1px solid rgba(220,38,38,0.15)',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    fontSize: '0.9rem',
                  }}
                >
                  <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '1px' }} />
                  <p style={{ fontWeight: 500 }}>{error}</p>
                </div>
              </motion.div>
            )}

            {/* Google OAuth Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              type="button"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                padding: '0.9rem 1.5rem',
                border: '2px solid var(--color-border)',
                borderRadius: '14px',
                background: 'var(--color-surface)',
                cursor: googleLoading ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                transition: 'all 0.2s',
                opacity: googleLoading ? 0.7 : 1,
                marginBottom: '1.5rem',
              }}
              onMouseEnter={(e) => { if (!googleLoading) e.currentTarget.style.borderColor = 'var(--color-primary-light)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {googleLoading ? (
                <span>{t.google_loading || 'Conexión en curso...'}</span>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  {t.google_btn || 'Continuar con Google'}
                </>
              )}
            </button>

            {/* Divider */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {t.divider || 'o por email'}
              </span>
              <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="login-email" style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                    {t.email_label || 'Dirección de correo electrónico'}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '1rem',
                        transform: 'translateY(-50%)',
                        color: 'var(--color-text-muted)',
                        pointerEvents: 'none',
                      }}
                    >
                      <Mail size={18} />
                    </div>
                    <input
                      id="login-email"
                      type="email"
                      name="email"
                      required
                      className="form-input"
                      placeholder={t.email_placeholder || 'usted@ejemplo.es'}
                      style={{ paddingLeft: '2.75rem' }}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className="form-label" htmlFor="login-password" style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      {t.password_label || 'Contraseña'}
                    </label>
                    <Link
                      href="#"
                      style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--color-accent)', textDecoration: 'none' }}
                    >
                      {t.password_forgot || '¿Olvidada?'}
                    </Link>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '1rem',
                        transform: 'translateY(-50%)',
                        color: 'var(--color-text-muted)',
                        pointerEvents: 'none',
                      }}
                    >
                      <Lock size={18} />
                    </div>
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      required
                      className="form-input"
                      placeholder="••••••••"
                      style={{ paddingLeft: '2.75rem', paddingRight: '3rem', letterSpacing: showPassword ? 'normal' : '0.15em' }}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        right: '1rem',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-text-muted)',
                        padding: '0.25rem',
                      }}
                      aria-label={showPassword ? (t.hide_password || 'Ocultar la contraseña') : (t.show_password || 'Mostrar la contraseña')}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  marginTop: '1.75rem',
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  borderRadius: '14px',
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <svg
                      style={{ animation: 'spin 1s linear infinite', width: '20px', height: '20px' }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {t.loading_btn || 'Conexión...'}
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {t.submit_btn || 'Iniciar sesión'}
                    <ArrowRight size={18} />
                  </span>
                )}
              </motion.button>
            </form>

            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)', textAlign: 'center' }}>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.925rem' }}>
                {t.register_prompt || '¿Nuevo en FinancePro?'}{' '}
                <Link
                  href={getLocalizedPath("register", locale)}
                  style={{ fontWeight: 700, color: 'var(--color-primary)', textDecoration: 'none' }}
                >
                  {t.register_link || 'Crear una cuenta'}
                </Link>
              </p>
            </div>

            {/* Admin Dashboard Link */}
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <Link
                href={`/${locale}/admin`}
                style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: 600, 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'underline',
                  background: 'var(--color-primary)',
                  padding: '0.4rem 1rem',
                  borderRadius: 'var(--radius-full)'
                }}
              >
                {locale === 'fr' ? 'Accéder au tableau de bord Administrateur' : 'Acceder al panel de Administrador'}
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
