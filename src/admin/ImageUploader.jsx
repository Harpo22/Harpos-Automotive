import { useState, useRef } from 'react'
import { uploadImage, deleteImage } from '../lib/vehicleService'

export default function ImageUploader({ images = [], onChange }) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef()

  const handleFiles = async (files) => {
    const fileArray = Array.from(files).filter((f) => f.type.startsWith('image/'))
    if (!fileArray.length) return

    setUploading(true)
    try {
      const urls = await Promise.all(fileArray.map(uploadImage))
      onChange([...images, ...urls])
    } catch (err) {
      alert('Image upload failed: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

  const removeImage = async (url, index) => {
    await deleteImage(url)
    const updated = images.filter((_, i) => i !== index)
    onChange(updated)
  }

  const moveImage = (from, to) => {
    const updated = [...images]
    const [moved] = updated.splice(from, 1)
    updated.splice(to, 0, moved)
    onChange(updated)
  }

  return (
    <div>
      <label
        style={{
          display: 'block',
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '0.6rem',
          fontWeight: '600',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: '0.75rem',
        }}
      >
        Photo Gallery{' '}
        <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: '400' }}>
          (first photo = main image)
        </span>
      </label>

      {/* Existing images */}
      {images.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: '0.75rem',
            marginBottom: '1rem',
          }}
        >
          {images.map((url, i) => (
            <div
              key={url}
              style={{
                position: 'relative',
                aspectRatio: '4/3',
                overflow: 'hidden',
                border: i === 0
                  ? '2px solid #D4AF37'
                  : '2px solid rgba(255,255,255,0.1)',
              }}
            >
              <img
                src={url}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              {/* Main badge */}
              {i === 0 && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: '#D4AF37',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '0.5rem',
                    fontWeight: '700',
                    letterSpacing: '0.15em',
                    color: '#08080A',
                    textAlign: 'center',
                    padding: '2px',
                    textTransform: 'uppercase',
                  }}
                >
                  Main
                </div>
              )}
              {/* Controls */}
              <div
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  display: 'flex',
                  gap: '3px',
                }}
              >
                {i > 0 && (
                  <button
                    onClick={() => moveImage(i, i - 1)}
                    title="Move left"
                    style={{
                      background: 'rgba(0,0,0,0.75)',
                      border: 'none',
                      color: '#fff',
                      width: '22px',
                      height: '22px',
                      cursor: 'pointer',
                      fontSize: '0.6rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    ←
                  </button>
                )}
                <button
                  onClick={() => removeImage(url, i)}
                  title="Remove"
                  style={{
                    background: 'rgba(200,50,50,0.85)',
                    border: 'none',
                    color: '#fff',
                    width: '22px',
                    height: '22px',
                    cursor: 'pointer',
                    fontSize: '0.7rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? '#D4AF37' : 'rgba(255,255,255,0.15)'}`,
          background: dragOver
            ? 'rgba(212,175,55,0.05)'
            : 'rgba(255,255,255,0.02)',
          padding: '2.5rem 1rem',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s',
        }}
      >
        {uploading ? (
          <div>
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.75rem',
                color: '#D4AF37',
                marginBottom: '0.5rem',
              }}
            >
              Uploading...
            </div>
            <div
              style={{
                width: '60px',
                height: '2px',
                background: 'rgba(212,175,55,0.3)',
                margin: '0 auto',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: '#D4AF37',
                  animation: 'slide 1s ease-in-out infinite',
                }}
              />
            </div>
          </div>
        ) : (
          <>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem', opacity: 0.5 }}>📷</div>
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.75rem',
                fontWeight: '500',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '0.3rem',
              }}
            >
              Tap to upload photos
            </div>
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.65rem',
                color: 'rgba(255,255,255,0.3)',
              }}
            >
              or drag and drop · JPG, PNG, WEBP
            </div>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={(e) => handleFiles(e.target.files)}
      />

      <style>{`
        @keyframes slide {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  )
}
