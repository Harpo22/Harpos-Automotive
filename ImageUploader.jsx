import { useState, useRef } from 'react'

// ============================================================
// IMAGE UPLOADER
// Supports two methods:
// 1. Paste an image URL directly
// 2. Upload to Cloudinary (free - see CLOUDINARY SETUP below)
// ============================================================

// CLOUDINARY SETUP (free image hosting):
// 1. Go to cloudinary.com and create a free account
// 2. Go to Settings -> Upload -> Add upload preset
// 3. Set it to "Unsigned" and save
// 4. Replace the values below with your Cloudinary details
const CLOUDINARY_CLOUD_NAME = 'duucnuhkh'  // e.g. 'dxyz123abc'
const CLOUDINARY_UPLOAD_PRESET = 'qvac1hry'  // e.g. 'harpo_cars'

const USE_CLOUDINARY = CLOUDINARY_CLOUD_NAME !== 'YOUR_CLOUD_NAME'

export default function ImageUploader({ images = [], onChange }) {
  const [uploading, setUploading] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const inputRef = useRef()

  const addUrl = () => {
    const url = urlInput.trim()
    if (!url) return
    if (!url.startsWith('http')) {
      alert('Please enter a valid URL starting with http')
      return
    }
    onChange([...images, url])
    setUrlInput('')
  }

  const handleFiles = async (files) => {
    const fileArray = Array.from(files).filter((f) => f.type.startsWith('image/'))
    if (!fileArray.length) return

    if (!USE_CLOUDINARY) {
      alert('To upload photos directly, please set up Cloudinary (free) by following the instructions in src/admin/ImageUploader.jsx\n\nFor now, paste an image URL instead.')
      return
    }

    setUploading(true)
    try {
      const urls = await Promise.all(fileArray.map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
        
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: 'POST', body: formData }
        )
        const data = await res.json()
        if (data.error) throw new Error(data.error.message)
        return data.secure_url
      }))
      onChange([...images, ...urls])
    } catch (err) {
      alert('Upload failed: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index) => {
    onChange(images.filter((_, i) => i !== index))
  }

  const moveImage = (from, to) => {
    const updated = [...images]
    const [moved] = updated.splice(from, 1)
    updated.splice(to, 0, moved)
    onChange(updated)
  }

  return (
    <div>
      <label style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontSize: '0.6rem', fontWeight: '600', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '0.75rem' }}>
        Photo Gallery <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: '400' }}>(first photo = main image)</span>
      </label>

      {/* Existing images */}
      {images.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
          {images.map((url, i) => (
            <div key={i} style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', border: i === 0 ? '2px solid #D4AF37' : '2px solid rgba(255,255,255,0.1)' }}>
              <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {i === 0 && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#D4AF37', fontFamily: "'Montserrat', sans-serif", fontSize: '0.5rem', fontWeight: '700', color: '#08080A', textAlign: 'center', padding: '2px', textTransform: 'uppercase' }}>Main</div>
              )}
              <div style={{ position: 'absolute', top: '4px', right: '4px', display: 'flex', gap: '3px' }}>
                {i > 0 && (
                  <button onClick={() => moveImage(i, i - 1)} style={{ background: 'rgba(0,0,0,0.75)', border: 'none', color: '#fff', width: '22px', height: '22px', cursor: 'pointer', fontSize: '0.6rem' }}>←</button>
                )}
                <button onClick={() => removeImage(i)} style={{ background: 'rgba(200,50,50,0.85)', border: 'none', color: '#fff', width: '22px', height: '22px', cursor: 'pointer', fontSize: '0.7rem' }}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* URL input */}
      <div style={{ marginBottom: '0.75rem' }}>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.58rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
          Paste Image URL
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addUrl()}
            placeholder="https://example.com/car-photo.jpg"
            style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', padding: '0.75rem 1rem', fontFamily: "'Montserrat', sans-serif", fontSize: '0.78rem', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
            onFocus={(e) => (e.target.style.borderColor = '#D4AF37')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
          />
          <button
            onClick={addUrl}
            style={{ background: '#D4AF37', border: 'none', padding: '0.75rem 1.25rem', fontFamily: "'Montserrat', sans-serif", fontSize: '0.65rem', fontWeight: '700', color: '#08080A', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            Add
          </button>
        </div>
      </div>

      {/* Upload button */}
      <div
        onClick={() => inputRef.current?.click()}
        style={{ border: '2px dashed rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.02)', padding: '1.5rem 1rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
      >
        {uploading ? (
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.75rem', color: '#D4AF37' }}>Uploading...</div>
        ) : (
          <>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', opacity: 0.4 }}>📷</div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.2rem' }}>
              {USE_CLOUDINARY ? 'Tap to upload photos' : 'Upload (requires Cloudinary setup)'}
            </div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.62rem', color: 'rgba(255,255,255,0.25)' }}>
              Or paste a URL above
            </div>
          </>
        )}
      </div>

      <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={(e) => handleFiles(e.target.files)} />
    </div>
  )
}
