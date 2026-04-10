'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, User, Mail, Lock, AlertCircle, Eye, EyeOff, Check, TrendingUp } from 'lucide-react'
import { signup } from '@/app/auth/actions'
import { createClient } from '@/lib/supabase/client'
import { useDictionary } from '@/components/DictionaryProvider'

export default function SignupPage() {
  const { lang } = useDictionary()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')

  const passwordChecks = [
    { label: '6 caractères minimum', valid: password.length >= 6 },
    { label: 'Une majuscule', valid: /[A-Z]/.test(password) },
    { label: 'Un chiffre', valid: /[0-9]/.test(password) },
  ]

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const result = await signup(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  async function handleGoogleSignup() {
    setGoogleLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/${lang}/espace-client`,
        },
      })
      if (error) {
        setError(error.message)
        setGoogleLoading(false)
      }
    } catch {
      setError("Erreur lors de l'inscription Google.")
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
            top: '-10rem',
            left: '-8rem',
            width: '30rem',
            height: '30rem',
            background: 'radial-gradient(circle, rgba(0,200,150,0.12) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            animation: 'float 7s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-12rem',
            right: '-8rem',
            width: '30rem',
            height: '30rem',
            background: 'radial-gradient(circle, rgba(42,95,158,0.18) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            animation: 'float 9s ease-in-out infinite 3s',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '540px',
          borderRadius: '2rem',
          overflow: 'hidden',
          boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
          position: 'relative',
          zIndex: 10,
          background: 'white',
        }}
      >
        <div style={{ padding: 'clamp(2rem, 4vw, 3rem)' }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Link
              href={`/${lang}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                marginBottom: '1.5rem',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(0,200,150,0.3)',
                }}
              >
                <TrendingUp size={24} color="white" />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                Finance<span style={{ color: 'var(--color-accent)' }}>Pro</span>
              </span>
            </Link>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
              Créez votre compte
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              Rejoignez FinancePro pour suivre vos projets
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                marginBottom: '1.25rem',
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
            </motion.div>
          )}

          {/* Google Button */}
          <button
            onClick={handleGoogleSignup}
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
              marginBottom: '1.25rem',
            }}
          >
            {googleLoading ? (
              <span>Inscription en cours...</span>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                S&apos;inscrire avec Google
              </>
            )}
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              ou par email
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="signup-first" style={{ fontWeight: 600, fontSize: '0.85rem' }}>Prénom</label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '50%', left: '0.875rem', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }}>
                      <User size={16} />
                    </div>
                    <input id="signup-first" type="text" name="first_name" required className="form-input" placeholder="Jean" style={{ paddingLeft: '2.5rem' }} autoComplete="given-name" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="signup-last" style={{ fontWeight: 600, fontSize: '0.85rem' }}>Nom</label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '50%', left: '0.875rem', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }}>
                      <User size={16} />
                    </div>
                    <input id="signup-last" type="text" name="last_name" required className="form-input" placeholder="Dupont" style={{ paddingLeft: '2.5rem' }} autoComplete="family-name" />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="signup-email" style={{ fontWeight: 600, fontSize: '0.85rem' }}>Adresse Email</label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }}>
                    <Mail size={18} />
                  </div>
                  <input id="signup-email" type="email" name="email" required className="form-input" placeholder="vous@exemple.fr" style={{ paddingLeft: '2.75rem' }} autoComplete="email" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="signup-password" style={{ fontWeight: 600, fontSize: '0.85rem' }}>Mot de passe</label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }}>
                    <Lock size={18} />
                  </div>
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    minLength={6}
                    className="form-input"
                    placeholder="Votre mot de passe"
                    style={{ paddingLeft: '2.75rem', paddingRight: '3rem' }}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    aria-label={showPassword ? 'Masquer' : 'Afficher'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {/* Password strength */}
                {password.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    {passwordChecks.map(({ label, valid }) => (
                      <span
                        key={label}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          fontSize: '0.75rem',
                          color: valid ? 'var(--color-accent-dark)' : 'var(--color-text-muted)',
                          fontWeight: valid ? 600 : 400,
                        }}
                      >
                        <Check size={12} style={{ color: valid ? 'var(--color-accent)' : 'var(--color-border)' }} />
                        {label}
                      </span>
                    ))}
                  </div>
                )}
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
                marginTop: '1.5rem',
                padding: '1rem 2rem',
                fontSize: '1rem',
                borderRadius: '14px',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <svg style={{ animation: 'spin 1s linear infinite', width: '20px', height: '20px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Création en cours...
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  Créer mon compte
                  <ArrowRight size={18} />
                </span>
              )}
            </motion.button>
          </form>

          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border)', textAlign: 'center' }}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              Déjà un compte ?{' '}
              <Link href={`/${lang}/connexion`} style={{ fontWeight: 700, color: 'var(--color-primary)', textDecoration: 'none' }}>
                Se connecter
              </Link>
            </p>
          </div>

          <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--color-text-light)', textAlign: 'center', lineHeight: 1.5 }}>
            En créant un compte, vous acceptez nos{' '}
            <Link href={`/${lang}/cgu`} style={{ color: 'var(--color-text-muted)', textDecoration: 'underline' }}>CGU</Link>
            {' '}et notre{' '}
            <Link href={`/${lang}/confidentialite`} style={{ color: 'var(--color-text-muted)', textDecoration: 'underline' }}>Politique de confidentialité</Link>.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
