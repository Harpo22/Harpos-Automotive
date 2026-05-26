import { useState } from 'react'
import { createVehicle, updateVehicle } from '../lib/vehicleService'
import ImageUploader from './ImageUploader'

const EMPTY_FORM = {
  year: new Date().getFullYear(),
  make: '',
  model: '',
  trim: '',
  price: '',
  mileage: '',
  fuel: 'Petrol',
  transmission: 'Automatic',
  engine: '',
  power: '',
  color: '',
  doors: 4,
  seats: 5,
  body_type: '',
  featured: false,
  badge: '',
  description: '',
  features: '',
  images: [],
}

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.12)',
  padding: '0.85rem 1rem',
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '0.82rem',
  color: '#fff',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.3s',
}

const labelStyle = {
  display: 'block',
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '0.58rem',
  fontWeight: '600',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.4)',
  marginBottom: '0.4rem',
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: '1.1rem' }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  )
}

function Input({ label, value, onChange, type = 'text', placeholder }) {
  return (
    <Field label={label}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={inputStyle}
        onFocus={(e) => (e.target.style.borderColor = '#D4AF37')}
        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
      />
    </Field>
  )
}

function Select({ label, value, onChange, options }) {
  return (
    <Field label={label}>
      <select
        value={value}
        onChange={onChange}
        style={{ ...inputStyle, background: '#0E0E12', cursor: 'pointer' }}
        onFocus={(e) => (e.target.style.borderColor = '#D4AF37')}
        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
      >
        {options.map((o) => (
          <option key={o} value={o} style={{ background: '#0E0E12' }}>{o}</option>
        ))}
      </select>
    </Field>
  )
}

export default function VehicleForm({ vehicle, onSave, onCancel }) {
  const isEdit = !!vehicle

  const [form, setForm] = useState(
    isEdit
      ? {
          ...vehicle,
          features: Array.isArray(vehicle.features)
            ? vehicle.features.join('\n')
            : vehicle.features || '',
          images: vehicle.images || [],
        }
      : EMPTY_FORM
  )

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const featuresArray = form.features
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean)

      const payload = {
        ...form,
        price: Number(form.price),
        mileage: Number(form.mileage),
        year: Number(form.year),
        doors: Number(form.doors),
        seats: Number(form.seats),
        features: featuresArray,
        image: form.images[0] || '',
        gallery: form.images,
      }

      if (isEdit) {
        await updateVehicle(vehicle.id, payload)
      } else {
        await createVehicle(payload)
      }

      onSave()
    } catch (err) {
      setError('Save failed: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const sectionTitle = (title) => (
    <div
      style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '0.6rem',
        fontWeight: '700',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: '#D4AF37',
        padding: '1rem 0 0.75rem',
        borderTop: '1px solid rgba(212,175,55,0.15)',
        marginBottom: '1rem',
        marginTop: '0.5rem',
      }}
    >
      {title}
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '2rem',
              fontWeight: '300',
              color: '#fff',
            }}
          >
            {isEdit ? 'Edit Vehicle' : 'Add New Vehicle'}
          </h2>
          {isEdit && (
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.35)',
                marginTop: '0.25rem',
              }}
            >
              {vehicle.year} {vehicle.make} {vehicle.model}
            </p>
          )}
        </div>
        <button
          onClick={onCancel}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.5)',
            padding: '0.6rem 1.25rem',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            cursor: 'pointer',
          }}
        >
          ← Back
        </button>
      </div>

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

      <form onSubmit={handleSubmit}>
        {/* Photos */}
        <div style={{ marginBottom: '1.5rem' }}>
          {sectionTitle('Photos')}
          <ImageUploader
            images={form.images}
            onChange={(imgs) => setForm((f) => ({ ...f, images: imgs }))}
          />
        </div>

        {/* Basic Info */}
        {sectionTitle('Vehicle Details')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0 1rem' }}>
          <Input label="Make *" value={form.make} onChange={set('make')} placeholder="e.g. Audi" />
          <Input label="Model *" value={form.model} onChange={set('model')} placeholder="e.g. RS6 Avant" />
          <Input label="Trim" value={form.trim} onChange={set('trim')} placeholder="e.g. Performance" />
          <Input label="Year *" type="number" value={form.year} onChange={set('year')} />
          <Input label="Price (£) *" type="number" value={form.price} onChange={set('price')} placeholder="e.g. 89995" />
          <Input label="Mileage *" type="number" value={form.mileage} onChange={set('mileage')} placeholder="e.g. 4200" />
        </div>

        {/* Specs */}
        {sectionTitle('Specifications')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0 1rem' }}>
          <Select
            label="Fuel Type"
            value={form.fuel}
            onChange={set('fuel')}
            options={['Petrol', 'Diesel', 'Hybrid', 'Mild Hybrid', 'Electric', 'Other']}
          />
          <Select
            label="Transmission"
            value={form.transmission}
            onChange={set('transmission')}
            options={['Automatic', 'Manual']}
          />
          <Input label="Engine" value={form.engine} onChange={set('engine')} placeholder="e.g. 4.0L Twin-Turbo V8" />
          <Input label="Power" value={form.power} onChange={set('power')} placeholder="e.g. 630 bhp" />
          <Input label="Colour" value={form.color} onChange={set('color')} placeholder="e.g. Nardo Grey" />
          <Input label="Body Type" value={form.body_type} onChange={set('body_type')} placeholder="e.g. Estate" />
          <Input label="Doors" type="number" value={form.doors} onChange={set('doors')} />
          <Input label="Seats" type="number" value={form.seats} onChange={set('seats')} />
        </div>

        {/* Listing Options */}
        {sectionTitle('Listing Options')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0 1rem' }}>
          <Input label="Badge Text" value={form.badge} onChange={set('badge')} placeholder="e.g. Just Arrived" />
          <Field label="Show on Homepage">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem 1rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.12)',
                cursor: 'pointer',
              }}
              onClick={() => setForm((f) => ({ ...f, featured: !f.featured }))}
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  border: `2px solid ${form.featured ? '#D4AF37' : 'rgba(255,255,255,0.2)'}`,
                  background: form.featured ? '#D4AF37' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  flexShrink: 0,
                }}
              >
                {form.featured && (
                  <span style={{ color: '#08080A', fontSize: '0.7rem', fontWeight: '700' }}>✓</span>
                )}
              </div>
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.65)',
                }}
              >
                Featured on homepage
              </span>
            </div>
          </Field>
        </div>

        {/* Description */}
        {sectionTitle('Description & Features')}
        <Field label="Vehicle Description">
          <textarea
            value={form.description}
            onChange={set('description')}
            placeholder="Write a compelling description of this vehicle..."
            rows={5}
            style={{
              ...inputStyle,
              resize: 'vertical',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#D4AF37')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
          />
        </Field>

        <Field label="Key Features (one per line)">
          <textarea
            value={form.features}
            onChange={set('features')}
            placeholder={`Carbon Ceramic Brakes\nBang & Olufsen Sound\nPanoramic Sunroof\nHead-Up Display`}
            rows={6}
            style={{
              ...inputStyle,
              resize: 'vertical',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#D4AF37')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
          />
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.62rem',
              color: 'rgba(255,255,255,0.25)',
              marginTop: '0.4rem',
            }}
          >
            Enter each feature on a new line
          </div>
        </Field>

        {/* Save Button */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            flexWrap: 'wrap',
          }}
        >
          <button
            type="submit"
            disabled={saving}
            style={{
              background: saving ? 'rgba(212,175,55,0.5)' : '#D4AF37',
              border: 'none',
              padding: '1rem 2.5rem',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.68rem',
              fontWeight: '700',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#08080A',
              cursor: saving ? 'not-allowed' : 'pointer',
              transition: 'background 0.3s',
              flex: 1,
              maxWidth: '300px',
            }}
          >
            {saving ? 'Saving...' : isEdit ? '✓ Save Changes' : '+ Add Vehicle'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)',
              padding: '1rem 2rem',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.68rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
