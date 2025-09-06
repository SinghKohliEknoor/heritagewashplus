"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FaCarSide } from "react-icons/fa";

// Professional car wash icon based on the provided design
const CarWashIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}
  >
    {/* Car body in Shell red */}
    <path 
      d="M20 14c0-1.1-.9-2-2-2h-1.5l-1.5-3h-6l-1.5 3H6c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h1v1c0 .5.4 1 1 1h2c.6 0 1-.5 1-1v-1h6v1c0 .5.4 1 1 1h2c.6 0 1-.5 1-1v-1h1c1.1 0 2-.9 2-2v-4z" 
      fill="#ed1c24"
    />
    
    {/* Car windshield */}
    <path 
      d="M8.5 9h7l1 2H7.5l1-2z" 
      fill="#fff"
      style={{ opacity: 0.8 }}
    />
    
    {/* Car lights */}
    <ellipse cx="7" cy="15.5" rx="1.2" ry="0.8" fill="#fff"/>
    <ellipse cx="17" cy="15.5" rx="1.2" ry="0.8" fill="#fff"/>
    
    {/* Car grille */}
    <rect x="11" y="14" width="2" height="1" fill="#fff" rx="0.5"/>
    
    {/* Soap foam clouds - large ones */}
    <g fill="#fff">
      {/* Left foam cloud */}
      <circle cx="5" cy="6" r="1.2"/>
      <circle cx="6.5" cy="5.5" r="1"/>
      <circle cx="6" cy="7" r="0.8"/>
      <circle cx="4" cy="7.5" r="0.9"/>
      
      {/* Right foam cloud */}
      <circle cx="17" cy="5" r="1.3"/>
      <circle cx="18.5" cy="6" r="1.1"/>
      <circle cx="19" cy="4" r="0.9"/>
      <circle cx="15.5" cy="6.5" r="1"/>
    </g>
    
    {/* Wash brushes/sprayers */}
    <rect x="3" y="8" width="1.5" height="6" fill="#ffc300" rx="0.5"/>
    <rect x="19" y="8" width="1.5" height="6" fill="#ffc300" rx="0.5"/>
    
    {/* Small soap bubbles floating around */}
    <g fill="#fff" style={{ opacity: 0.8 }}>
      <circle cx="2" cy="4" r="0.4"/>
      <circle cx="8" cy="3" r="0.3"/>
      <circle cx="12" cy="2" r="0.4"/>
      <circle cx="16" cy="4" r="0.3"/>
      <circle cx="21" cy="5" r="0.4"/>
      <circle cx="20" cy="9" r="0.3"/>
    </g>
  </svg>
);

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
          <CarWashIcon />
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