import { useState, useEffect } from 'react'
import { getVehicles, deleteVehicle } from '../lib/vehicleService'
import { supabase } from '../lib/supabase'
import VehicleForm from './VehicleForm'

const formatPrice = (p) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(p)

const formatMileage = (m) => new Intl.NumberFormat('en-GB').format(m) + ' mi'

export default function AdminDashboard({ onLogout }) {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('list') // 'list' | 'add' | 'edit'
  const [editVehicle, setEditVehicle] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [search, setSearch] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      const data = await getVehicles()
      setVehicles(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleLogout = () => {
    // logged out
    onLogout && onLogout()
  }

  const handleDelete = async (vehicle) => {
    setDeleting(true)
    try {
      await deleteVehicle(vehicle.id)
      setDeleteConfirm(null)
      await load()
    } catch (e) {
      alert('Delete failed: ' + e.message)
    } finally {
      setDeleting(false)
    }
  }

  const handleSaved = () => {
    setView('list')
    setEditVehicle(null)
    load()
  }

  const filtered = vehicles.filter((v) => {
    const q = search.toLowerCase()
    return !q || v.make?.toLowerCase().includes(q) || v.model?.toLowerCase().includes(q) || String(v.year).includes(q)
  })

  const totalValue = vehicles.reduce((sum, v) => sum + (v.price || 0), 0)
  const featured = vehicles.filter((v) => v.featured).length

  if (view === 'add') {
    return (
      <AdminShell onLogout={handleLogout}>
        <VehicleForm onSave={handleSaved} onCancel={() => setView('list')} />
      </AdminShell>
    )
  }

  if (view === 'edit' && editVehicle) {
    return (
      <AdminShell onLogout={handleLogout}>
        <VehicleForm vehicle={editVehicle} onSave={handleSaved} onCancel={() => { setView('list'); setEditVehicle(null) }} />
      </AdminShell>
    )
  }

  return (
    <AdminShell onLogout={handleLogout}>
      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        {[
          { label: 'Total Vehicles', value: vehicles.length, icon: '🚗' },
          { label: 'Stock Value', value: formatPrice(totalValue), icon: '£' },
          { label: 'Featured', value: featured, icon: '⭐' },
          { label: 'Available', value: vehicles.length, icon: '✓' },
        ].map(({ label, value, icon }) => (
          <div
            key={label}
            style={{
              background: '#0E0E12',
              border: '1px solid rgba(212,175,55,0.12)',
              padding: '1.25rem 1.5rem',
            }}
          >
            <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{icon}</div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.6rem',
                fontWeight: '600',
                color: '#D4AF37',
                lineHeight: 1,
                marginBottom: '0.3rem',
              }}
            >
              {value}
            </div>
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.6rem',
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          placeholder="Search vehicles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: '200px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '0.7rem 1rem',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.78rem',
            color: '#fff',
            outline: 'none',
          }}
        />
        <button
          onClick={() => setView('add')}
          style={{
            background: '#D4AF37',
            border: 'none',
            padding: '0.7rem 1.5rem',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.65rem',
            fontWeight: '700',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#08080A',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          + Add New Car
        </button>
      </div>

      {/* Vehicle List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.3)', fontFamily: "'Montserrat', sans-serif", fontSize: '0.8rem' }}>
          Loading vehicles...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: 'rgba(255,255,255,0.2)', marginBottom: '1rem' }}>
            {vehicles.length === 0 ? 'No vehicles yet' : 'No results'}
          </div>
          {vehicles.length === 0 && (
            <button
              onClick={() => setView('add')}
              style={{
                background: '#D4AF37', border: 'none', padding: '0.85rem 2rem',
                fontFamily: "'Montserrat', sans-serif", fontSize: '0.65rem', fontWeight: '700',
                letterSpacing: '0.2em', textTransform: 'uppercase', color: '#08080A', cursor: 'pointer',
              }}
            >
              Add Your First Car
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map((v) => (
            <div
              key={v.id}
              style={{
                background: '#0E0E12',
                border: '1px solid rgba(255,255,255,0.07)',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.25)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
            >
              {/* Thumbnail */}
              <div
                style={{
                  width: '80px',
                  height: '55px',
                  flexShrink: 0,
                  overflow: 'hidden',
                  background: '#050507',
                }}
              >
                {v.image ? (
                  <img
                    src={v.image}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', opacity: 0.3 }}>🚗</div>
                )}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: '140px' }}>
                <div
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '0.58rem',
                    color: '#D4AF37',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    marginBottom: '0.2rem',
                  }}
                >
                  {v.year} · {v.make}
                  {v.featured && (
                    <span style={{ marginLeft: '0.5rem', background: 'rgba(212,175,55,0.15)', padding: '0 0.4rem' }}>
                      ★ Featured
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.1rem',
                    color: '#fff',
                  }}
                >
                  {v.model}
                  {v.trim && (
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', marginLeft: '0.5rem' }}>
                      {v.trim}
                    </span>
                  )}
                </div>
              </div>

              {/* Price */}
              <div style={{ textAlign: 'right', minWidth: '100px' }}>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: '#D4AF37',
                  }}
                >
                  {formatPrice(v.price)}
                </div>
                <div
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '0.62rem',
                    color: 'rgba(255,255,255,0.3)',
                  }}
                >
                  {formatMileage(v.mileage)}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                <button
                  onClick={() => { setEditVehicle(v); setView('edit') }}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(212,175,55,0.3)',
                    color: '#D4AF37',
                    padding: '0.5rem 1rem',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '0.62rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.target.style.background = 'rgba(212,175,55,0.1)' }}
                  onMouseLeave={(e) => { e.target.style.background = 'transparent' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteConfirm(v)}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(220,50,50,0.3)',
                    color: 'rgba(220,80,80,0.8)',
                    padding: '0.5rem 1rem',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '0.62rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.target.style.background = 'rgba(220,50,50,0.1)' }}
                  onMouseLeave={(e) => { e.target.style.background = 'transparent' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5,5,7,0.92)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div
            style={{
              background: '#0E0E12',
              border: '1px solid rgba(220,50,50,0.3)',
              padding: '2.5rem',
              maxWidth: '400px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.6rem',
                color: '#fff',
                marginBottom: '0.75rem',
              }}
            >
              Delete Vehicle?
            </h3>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.78rem',
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.7,
                marginBottom: '2rem',
              }}
            >
              Are you sure you want to delete the{' '}
              <strong style={{ color: '#fff' }}>
                {deleteConfirm.year} {deleteConfirm.make} {deleteConfirm.model}
              </strong>?{' '}
              This cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.5)',
                  padding: '0.75rem 1.5rem',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleting}
                style={{
                  background: deleting ? 'rgba(220,50,50,0.4)' : 'rgba(220,50,50,0.8)',
                  border: 'none',
                  color: '#fff',
                  padding: '0.75rem 1.5rem',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: deleting ? 'not-allowed' : 'pointer',
                }}
              >
                {deleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  )
}

// Shared admin shell/layout
function AdminShell({ children, onLogout }) {
  return (
    <div style={{ background: '#08080A', minHeight: '100vh' }}>
      {/* Admin Header */}
      <header
        style={{
          background: '#0A0A0E',
          borderBottom: '1px solid rgba(212,175,55,0.15)',
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#D4AF37',
                letterSpacing: '0.1em',
              }}
            >
              Harpo Automotives
            </div>
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.52rem',
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
              }}
            >
              Admin Dashboard
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.62rem',
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#D4AF37')}
            onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.35)')}
          >
            View Live Site ↗
          </a>
          <button
            onClick={onLogout}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.4)',
              padding: '0.5rem 1rem',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => { e.target.style.color = '#fff'; e.target.style.borderColor = 'rgba(255,255,255,0.3)' }}
            onMouseLeave={(e) => { e.target.style.color = 'rgba(255,255,255,0.4)'; e.target.style.borderColor = 'rgba(255,255,255,0.12)' }}
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Page Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {children}
      </div>
    </div>
  )
}
