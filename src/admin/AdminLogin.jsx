// ============================================================
// ADMIN LOGIN — Simple password protection
// To change your password, update the ADMIN_PASSWORD value below
// ============================================================

const ADMIN_PASSWORD = 'Harpo2024!'

export default function AdminLogin({ onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const password = e.target.password.value
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('harpo_admin', 'true')
      onLogin(true)
    } else {
      alert('Incorrect password. Please try again.')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#050507', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '420px', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: '600', color: '#D4AF37', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Harpo</div>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.35em', textTransform: 'uppercase', marginTop: '2px' }}>Automotives · Admin</div>
        </div>
        <div style={{ background: '#0E0E12', border: '1px solid rgba(212,175,55,0.2)', padding: '2.5rem' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: '300', color: '#fff', marginBottom: '0.5rem' }}>Admin Login</h1>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginBottom: '2rem' }}>Enter your password to manage inventory</p>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontSize: '0.6rem', fontWeight: '600', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' }}>Password</label>
              <input type="password" name="password" placeholder="••••••••" required style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', padding: '0.85rem 1rem', fontFamily: "'Montserrat', sans-serif", fontSize: '0.85rem', color: '#fff', outline: 'none', boxSizing: 'border-box' }} onFocus={(e) => (e.target.style.borderColor = '#D4AF37')} onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')} />
            </div>
            <button type="submit" style={{ width: '100%', background: '#D4AF37', border: 'none', padding: '1rem', fontFamily: "'Montserrat', sans-serif", fontSize: '0.68rem', fontWeight: '600', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#08080A', cursor: 'pointer' }}>Sign In</button>
          </form>
        </div>
        <p style={{ textAlign: 'center', fontFamily: "'Montserrat', sans-serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', marginTop: '1.5rem' }}>Harpo Automotives — Authorised Access Only</p>
      </div>
    </div>
  )
}
