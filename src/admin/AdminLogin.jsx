import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('Incorrect email or password. Please try again.')
      setLoading(false)
      return
    }

    onLogin(data.user)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#050507',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          position: 'relative',
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '2.2rem',
              fontWeight: '600',
              color: '#D4AF37',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            Harpo
          </div>
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.6rem',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              marginTop: '2px',
            }}
          >
            Automotives · Admin
          </div>
        </div>

        {/* Card */}
        <div
          style={{
            background: '#0E0E12',
            border: '1px solid rgba(212,175,55,0.2)',
            padding: '2.5rem',
          }}
        >
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.8rem',
              fontWeight: '300',
              color: '#fff',
              marginBottom: '0.5rem',
            }}
          >
            Admin Login
          </h1>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.35)',
              marginBottom: '2rem',
            }}
          >
            Sign in to manage your vehicle inventory
          </p>

          {error && (
            <div
              style={{
                background: 'rgba(220,50,50,0.1)',
                border: '1px solid rgba(220,50,50,0.3)',
                padding: '0.85rem 1rem',
                marginBottom: '1.5rem',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.75rem',
                color: '#ff6b6b',
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.6rem',
                  fontWeight: '600',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: '0.5rem',
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  padding: '0.85rem 1rem',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.85rem',
                  color: '#fff',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#D4AF37')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '2rem' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.6rem',
                  fontWeight: '600',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: '0.5rem',
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  padding: '0.85rem 1rem',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.85rem',
                  color: '#fff',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#D4AF37')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? 'rgba(212,175,55,0.5)' : '#D4AF37',
                border: 'none',
                padding: '1rem',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.68rem',
                fontWeight: '600',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#08080A',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.3s',
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p
          style={{
            textAlign: 'center',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.65rem',
            color: 'rgba(255,255,255,0.2)',
            marginTop: '1.5rem',
          }}
        >
          Harpo Automotives — Authorised Access Only
        </p>
      </div>
    </div>
  )
}
