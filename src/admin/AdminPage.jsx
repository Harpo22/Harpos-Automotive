import { useState, useEffect } from 'react'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    // Check if already logged in this session
    if (sessionStorage.getItem('harpo_admin') === 'true') {
      setLoggedIn(true)
    }
  }, [])

  if (!loggedIn) {
    return <AdminLogin onLogin={() => setLoggedIn(true)} />
  }

  return <AdminDashboard onLogout={() => {
    sessionStorage.removeItem('harpo_admin')
    setLoggedIn(false)
  }} />
}
