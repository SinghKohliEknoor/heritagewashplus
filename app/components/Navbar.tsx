"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const router = useRouter();
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'absolute', top: 0, left: 0, zIndex: 40, pointerEvents: 'none' }}>
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
          width: 'clamp(320px, 92vw, 900px)',
          margin: '1rem auto 0 auto',
          padding: '0.75rem 1.5rem',
          background: 'rgba(0,51,160,0.55)',
          borderRadius: '2rem',
          boxShadow: '0 8px 32px 0 rgba(0,51,160,0.18)',
          border: '2px solid #ffc300',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          pointerEvents: 'auto',
        }}
      >
        <div className="text-2xl font-extrabold tracking-wide flex items-center gap-2" style={{ color: '#ffc300', letterSpacing: '2px', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}>
          <span style={{ color: '#fff', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', fontWeight: 900 }}>⛽</span>
          <span className="hidden sm:inline">Heritage Wash Plus</span>
          <span className="sm:hidden">Heritage</span>
        </div>
        <button
          style={{
            background: '#fff',
            color: '#ed1c24',
            fontWeight: 700,
            fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
            border: 'none',
            borderRadius: '9999px',
            padding: '0.6rem 1.5rem',
            boxShadow: '0 2px 8px #0033a055',
            cursor: 'pointer',
            transition: 'background 0.18s, color 0.18s',
            whiteSpace: 'nowrap',
          }}
          onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.background = '#ed1c24'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
          onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fff'; (e.currentTarget as HTMLButtonElement).style.color = '#ed1c24'; }}
          onClick={() => router.push("/auth")}
        >
          <span className="hidden sm:inline">Sign In / Sign Up</span>
          <span className="sm:hidden">Sign In</span>
        </button>
      </nav>
    </div>
  );
};

export default Navbar;