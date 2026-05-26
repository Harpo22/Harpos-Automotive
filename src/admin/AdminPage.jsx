import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

export default function AdminPage() {
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Check if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setChecking(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (checking) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#050507',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.5rem',
            color: 'rgba(212,175,55,0.5)',
            letterSpacing: '0.1em',
          }}
        >
          Loading...
        </div>
      </div>
    )
  }

  if (!user) {
    return <AdminLogin onLogin={setUser} />
  }

  return <AdminDashboard />
}
