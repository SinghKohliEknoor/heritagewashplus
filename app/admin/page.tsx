"use client";
import React, { useState } from "react";

const AdminPanel = () => {
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!beforeFile || !afterFile || !caption) {
      setMessage("Please fill all fields and select both images");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append('before', beforeFile);
      formData.append('after', afterFile);
      formData.append('caption', caption);

      const response = await fetch('/api/gallery-images', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Images uploaded successfully!");
        setBeforeFile(null);
        setAfterFile(null);
        setCaption("");
        // Reset file inputs
        const fileInputs = document.querySelectorAll('input[type="file"]') as NodeListOf<HTMLInputElement>;
        fileInputs.forEach(input => input.value = '');
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage("Upload failed. Please try again.");
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const adminStyles = `
    @media (max-width: 768px) {
      #admin-section {
        padding: 2rem 0.75rem !important;
      }
      #admin-container {
        max-width: 100% !important;
        padding: 0 0.5rem !important;
      }
      #admin-form {
        border-radius: 1rem !important;
        padding: 1.5rem 1rem !important;
        gap: 1.25rem !important;
      }
      .admin-input {
        border-radius: 0.5rem !important;
        font-size: 0.9rem !important;
      }
    }
  `;

  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = adminStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <section id="admin-section" style={{ background: '#0033a0', padding: 'min(8vw, 4rem) 1rem', minHeight: '100vh' }}>
      <div id="admin-container" style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#ffc300', fontWeight: 900, fontSize: 'clamp(1.5rem, 6vw, 2.5rem)', letterSpacing: '1px', marginBottom: '1rem', textShadow: '0 2px 8px #0002' }}>
            Admin Panel
          </h1>
          <p style={{ color: '#fff', fontSize: 'clamp(1rem, 3vw, 1.1rem)' }}>
            Upload new before & after gallery images
          </p>
        </div>

        <form
          id="admin-form"
          onSubmit={handleSubmit}
          style={{ 
            background: '#fff', 
            borderRadius: '1.5rem', 
            boxShadow: '0 2px 16px #0033a055', 
            padding: '2rem', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1.5rem', 
            border: '3px solid #ffc300', 
            width: '100%', 
            maxWidth: '100%' 
          }}
        >
          {message && (
            <div style={{ 
              borderRadius: '1rem', 
              background: message.includes('Error') ? '#ed1c2411' : '#ffc30022', 
              border: message.includes('Error') ? '2px solid #ed1c24' : '2px solid #ffc300', 
              color: message.includes('Error') ? '#ed1c24' : '#0033a0', 
              padding: '0.75rem 1.5rem', 
              fontWeight: 700, 
              fontSize: '1rem',
              textAlign: 'center'
            }}>
              {message}
            </div>
          )}

          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 700, color: '#0033a0' }}>Before Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setBeforeFile(e.target.files?.[0] || null)}
                className="admin-input"
                style={{ 
                  background: '#fff', 
                  color: '#0033a0', 
                  border: '2px solid #0033a0', 
                  borderRadius: '0.75rem', 
                  padding: '0.75rem 1rem', 
                  fontWeight: 600, 
                  width: '100%', 
                  fontSize: '1rem', 
                  boxSizing: 'border-box' 
                }}
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 700, color: '#0033a0' }}>After Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAfterFile(e.target.files?.[0] || null)}
                className="admin-input"
                style={{ 
                  background: '#fff', 
                  color: '#0033a0', 
                  border: '2px solid #0033a0', 
                  borderRadius: '0.75rem', 
                  padding: '0.75rem 1rem', 
                  fontWeight: 600, 
                  width: '100%', 
                  fontSize: '1rem', 
                  boxSizing: 'border-box' 
                }}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 700, color: '#0033a0' }}>Caption *</label>
            <input
              type="text"
              placeholder="e.g. 2023 Honda Civic - Full Detail"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="admin-input"
              style={{ 
                background: '#fff', 
                color: '#0033a0', 
                border: '2px solid #0033a0', 
                borderRadius: '0.75rem', 
                padding: '0.75rem 1rem', 
                fontWeight: 600, 
                width: '100%', 
                fontSize: '1rem', 
                boxSizing: 'border-box' 
              }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            style={{ 
              background: '#ffc300', 
              color: '#0033a0', 
              fontWeight: 700, 
              fontSize: '1.1rem', 
              border: 'none', 
              borderRadius: '9999px', 
              padding: '0.75rem 2rem', 
              boxShadow: '0 2px 8px #ed1c2433', 
              cursor: uploading ? 'not-allowed' : 'pointer', 
              transition: 'background 0.18s, color 0.18s', 
              width: '100%',
              maxWidth: '300px',
              margin: '0 auto',
              opacity: uploading ? 0.7 : 1
            }}
            onMouseOver={e => {
              if (!uploading) {
                (e.currentTarget as HTMLButtonElement).style.background = '#ed1c24';
                (e.currentTarget as HTMLButtonElement).style.color = '#fff';
              }
            }}
            onMouseOut={e => {
              if (!uploading) {
                (e.currentTarget as HTMLButtonElement).style.background = '#ffc300';
                (e.currentTarget as HTMLButtonElement).style.color = '#0033a0';
              }
            }}
          >
            {uploading ? 'Uploading...' : 'Upload Images'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminPanel;
