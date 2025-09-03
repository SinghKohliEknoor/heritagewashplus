"use client";
import React from "react";

export const Hero: React.FC = () => {
  return (
    <header
      className="relative min-h-[88vh] w-full flex items-center justify-center text-center overflow-hidden"
      style={{ background: '#0033a0' }}
    >
      <div
        className="relative z-10 mx-auto flex flex-col items-center gap-8"
        style={{
          maxWidth: '48rem',
          width: '100%',
          padding: '2rem 1rem',
        }}
      >
        <h1
          style={{
            color: '#ffc300',
            fontWeight: 900,
            fontSize: 'clamp(2rem, 8vw, 3rem)',
            letterSpacing: '2px',
            textShadow: '0 2px 8px #0002',
            marginBottom: '1rem',
            textAlign: 'center',
          }}
        >
          Heritage Wash Plus
        </h1>
        <p
          style={{
            color: '#fff',
            fontSize: 'clamp(1rem, 4vw, 1.25rem)',
            fontWeight: 500,
            maxWidth: '32rem',
            margin: '1rem 0',
            textAlign: 'center',
            lineHeight: '1.6',
          }}
        >
          Professional eco‑friendly car detailing. Revive your vehicle&apos;s heritage shine with premium care packages for every need.
        </p>
        <div
          className="flex flex-col sm:flex-row justify-center gap-4"
          style={{ width: '100%', maxWidth: '500px' }}
        >
          <a
            href="#services"
            style={{
              background: '#ffc300',
              color: '#0033a0',
              fontWeight: 700,
              fontSize: 'clamp(1rem, 3vw, 1.1rem)',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.75rem 2rem',
              boxShadow: '0 2px 8px #ed1c2433',
              cursor: 'pointer',
              transition: 'background 0.18s, color 0.18s',
              textDecoration: 'none',
              textAlign: 'center',
              flex: '1',
              minWidth: '160px',
            }}
            onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#ed1c24'; (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; }}
            onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#ffc300'; (e.currentTarget as HTMLAnchorElement).style.color = '#0033a0'; }}
          >
            View Packages
          </a>
          <button
            style={{
              background: '#fff',
              color: '#ed1c24',
              fontWeight: 700,
              fontSize: 'clamp(1rem, 3vw, 1.1rem)',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.75rem 2rem',
              boxShadow: '0 2px 8px #0033a055',
              cursor: 'pointer',
              transition: 'background 0.18s, color 0.18s',
              flex: '1',
              minWidth: '160px',
            }}
            onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.background = '#ed1c24'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
            onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fff'; (e.currentTarget as HTMLButtonElement).style.color = '#ed1c24'; }}
            type="button"
            onClick={() => {
              const el = document.getElementById("contact");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </header>
  );
};

export default Hero;

