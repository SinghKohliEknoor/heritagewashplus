"use client";
import React, { useState } from "react";

import useSWR from 'swr';

export const GalleryCarousel: React.FC = () => {
  const { data: images, error, isLoading } = useSWR('/api/gallery-images', (url) => fetch(url).then(res => res.json()));
  const [idx, setIdx] = useState(0);
  const [modalImg, setModalImg] = useState<string|null>(null);
  const [modalAlt, setModalAlt] = useState<string>("");
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  const handleImageError = (imageUrl: string) => {
    setImageErrors(prev => ({ ...prev, [imageUrl]: true }));
  };
  
  if (error) {
    console.error('Gallery loading error:', error);
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#ed1c24', background: '#fff' }}>
        <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>Failed to load gallery images.</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Please try refreshing the page.</p>
      </div>
    );
  }
  
  if (isLoading || !images) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', background: '#fff' }}>
        <div style={{ color: '#0033a0', fontSize: '1.1rem', fontWeight: 600 }}>Loading gallery...</div>
        <div style={{ marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>Please wait while we fetch the latest images</div>
      </div>
    );
  }
  
  if (!images.length) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', background: '#fff' }}>
        <div style={{ color: '#0033a0', fontSize: '1.1rem', fontWeight: 600 }}>No gallery images found.</div>
        <div style={{ marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>Check back soon for before & after photos!</div>
      </div>
    );
  }
  
  const { before_url: before, after_url: after, caption } = images[idx];
  const next = () => setIdx(i => (i + 1) % images.length);
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length);
  return (
    <section className="relative py-10 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 style={{ color: '#ffc300', fontWeight: 900, fontSize: 'clamp(1.8rem, 6vw, 2.2rem)', textAlign: 'center', marginBottom: '2rem', letterSpacing: '1px', textShadow: '0 2px 8px #0002' }}>
          Before & After Gallery
        </h2>
        {/* Desktop layout - side by side */}
        <div className="hidden sm:flex flex-row gap-8 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <span className="text-base font-semibold text-blue mb-2" style={{ color: '#0033a0', fontWeight: 700 }}>Before</span>
            <div className="overflow-hidden rounded-3xl border-4 border-blue shadow-xl group cursor-pointer" style={{ borderColor: '#0033a0' }} onClick={() => {setModalImg(before);setModalAlt("Before detailing");}}>
              {imageErrors[before] ? (
                <div style={{ width: '380px', height: '260px', background: '#f3f3f3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                  <span>Image not available</span>
                </div>
              ) : (
                <img
                  src={before}
                  alt="Before detailing"
                  className="w-[380px] h-[260px] object-cover transition-transform duration-300 group-hover:scale-105"
                  style={{ boxShadow: "0 8px 32px rgba(0,51,160,0.12)" }}
                  onError={() => handleImageError(before)}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <span className="text-base font-semibold text-red mb-2" style={{ color: '#ed1c24', fontWeight: 700 }}>After</span>
            <div className="overflow-hidden rounded-3xl border-4 border-yellow shadow-xl group cursor-pointer" style={{ borderColor: '#ffc300' }} onClick={() => {setModalImg(after);setModalAlt("After detailing");}}>
              {imageErrors[after] ? (
                <div style={{ width: '380px', height: '260px', background: '#f3f3f3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                  <span>Image not available</span>
                </div>
              ) : (
                <img
                  src={after}
                  alt="After detailing"
                  className="w-[380px] h-[260px] object-cover transition-transform duration-300 group-hover:scale-105"
                  style={{ boxShadow: "0 8px 32px rgba(255,195,0,0.12)" }}
                  onError={() => handleImageError(after)}
                />
              )}
            </div>
          </div>
        </div>
        
        {/* Mobile layout - stacked */}
        <div className="sm:hidden flex flex-col gap-6 items-center">
          <div className="flex flex-col items-center gap-3 w-full">
            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0033a0', marginBottom: '0.5rem' }}>Before</span>
            <div style={{ overflow: 'hidden', borderRadius: '1.5rem', border: '4px solid #0033a0', boxShadow: '0 4px 24px #0033a0', width: '100%', maxWidth: '350px', cursor: 'pointer' }} onClick={() => { setModalImg(before); setModalAlt('Before detailing'); }}>
              {imageErrors[before] ? (
                <div style={{ width: '100%', height: '200px', background: '#f3f3f3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                  <span>Image not available</span>
                </div>
              ) : (
                <img
                  src={before}
                  alt="Before detailing"
                  style={{ width: '100%', height: '200px', objectFit: 'cover', transition: 'transform 0.3s' }}
                  onTouchStart={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.02)'; }}
                  onTouchEnd={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                  onError={() => handleImageError(before)}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 w-full">
            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ed1c24', marginBottom: '0.5rem' }}>After</span>
            <div style={{ overflow: 'hidden', borderRadius: '1.5rem', border: '4px solid #ffc300', boxShadow: '0 4px 24px #ffc300', width: '100%', maxWidth: '350px', cursor: 'pointer' }} onClick={() => { setModalImg(after); setModalAlt('After detailing'); }}>
              {imageErrors[after] ? (
                <div style={{ width: '100%', height: '200px', background: '#f3f3f3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                  <span>Image not available</span>
                </div>
              ) : (
                <img
                  src={after}
                  alt="After detailing"
                  style={{ width: '100%', height: '200px', objectFit: 'cover', transition: 'transform 0.3s' }}
                  onTouchStart={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.02)'; }}
                  onTouchEnd={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                  onError={() => handleImageError(after)}
                />
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-4 mt-6">
          <button onClick={prev} className="btn-secondary" style={{ background: '#0033a0', color: '#fff', border: 'none', borderRadius: '999px', padding: '0.5rem 1.5rem', fontWeight: 700 }}>Prev</button>
          <span className="text-sm font-medium" style={{ color: '#0033a0', fontWeight: 700, fontSize: 'clamp(0.9rem, 3vw, 1rem)' }}>{caption}</span>
          <button onClick={next} className="btn-secondary" style={{ background: '#0033a0', color: '#fff', border: 'none', borderRadius: '999px', padding: '0.5rem 1.5rem', fontWeight: 700 }}>Next</button>
        </div>
      </div>
      {modalImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue/80 backdrop-blur-sm" style={{ background: 'rgba(0,51,160,0.85)' }} onClick={() => setModalImg(null)}>
          <div className="relative max-w-3xl w-full flex flex-col items-center px-4">
            <img src={modalImg} alt={modalAlt} className="rounded-2xl shadow-2xl max-h-[80vh] object-contain border-4 border-yellow" style={{ borderColor: '#ffc300', maxWidth: '90vw' }} />
            <button
              className="absolute top-2 right-2 text-white rounded-full px-4 py-2 text-lg font-bold"
              style={{ background: '#ed1c24', border: 'none', cursor: 'pointer' }}
              onClick={e => {e.stopPropagation();setModalImg(null);}}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default GalleryCarousel;