"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Mobile styles for responsive design
  const mobileStyles = `
    @media (max-width: 768px) {
      #auth-section {
        padding: 2rem 0.75rem !important;
      }
      #auth-container {
        max-width: 100% !important;
        padding: 0 0.5rem !important;
      }
      #auth-form {
        border-radius: 1rem !important;
        padding: 1.5rem 1rem !important;
        gap: 1.25rem !important;
        border-width: 2px !important;
      }
      .auth-input {
        border-radius: 0.5rem !important;
        font-size: 0.9rem !important;
      }
      .auth-label {
        font-size: 0.85rem !important;
      }
    }
    
    @media (max-width: 400px) {
      #auth-section {
        padding: 1.5rem 0.25rem !important;
      }
      #auth-container {
        padding: 0 !important;
        max-width: calc(100vw - 0.5rem) !important;
      }
      #auth-form {
        padding: 1rem 0.5rem !important;
        border-radius: 0.75rem !important;
      }
      .auth-input {
        padding: 0.5rem 0.75rem !important;
        font-size: 0.875rem !important;
      }
    }
    
    @media (max-width: 375px) {
      #auth-section {
        padding: 1rem 0.125rem !important;
      }
      #auth-container {
        max-width: calc(100vw - 0.25rem) !important;
      }
      #auth-form {
        padding: 0.75rem 0.375rem !important;
        border-radius: 0.375rem !important;
        border-width: 1px !important;
      }
      .auth-input {
        padding: 0.5rem 0.5rem !important;
        font-size: 0.8rem !important;
        border-radius: 0.375rem !important;
      }
    }
  `;

  // Inject mobile styles
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = mobileStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setSuccess("Sign up successful! Check your email for confirmation.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setSuccess("Sign in successful!");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="auth-section" style={{ background: '#0033a0', padding: 'min(8vw, 4rem) 1rem', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div id="auth-container" style={{ maxWidth: '28rem', margin: '0 auto', padding: '0 1rem', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: '#ffc300', fontWeight: 900, fontSize: 'clamp(1.5rem, 6vw, 2rem)', letterSpacing: '1px', marginBottom: '1rem', textShadow: '0 2px 8px #0002' }}>
            {mode === 'signin' ? 'Welcome Back' : 'Join Heritage Wash Plus'}
          </h2>
          <p style={{ color: '#fff', fontSize: 'clamp(1rem, 3vw, 1.1rem)' }}>
            {mode === 'signin' ? 'Sign in to manage your bookings' : 'Create an account to get started'}
          </p>
        </div>
        <form
          id="auth-form"
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
            maxWidth: '100%',
            boxSizing: 'border-box'
          }}
        >
          {error && (
            <div style={{ borderRadius: '1rem', background: '#ed1c2411', border: '2px solid #ed1c24', color: '#ed1c24', padding: '0.75rem 1.5rem', fontWeight: 700, fontSize: '1rem', textAlign: 'center' }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ borderRadius: '1rem', background: '#ffc30022', border: '2px solid #ffc300', color: '#0033a0', padding: '0.75rem 1.5rem', fontWeight: 700, fontSize: '1rem', textAlign: 'center' }}>
              {success}
            </div>
          )}
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 700, color: '#0033a0', fontSize: '1rem' }}>Email Address *</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="auth-input"
              style={{ 
                background: '#fff', 
                color: '#0033a0', 
                border: '2px solid #0033a0', 
                borderRadius: '0.75rem', 
                padding: '0.75rem 1rem', 
                fontWeight: 600, 
                width: '100%', 
                fontSize: '1rem', 
                boxSizing: 'border-box',
                outline: 'none'
              }}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 700, color: '#0033a0', fontSize: '1rem' }}>Password *</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="auth-input"
              style={{ 
                background: '#fff', 
                color: '#0033a0', 
                border: '2px solid #0033a0', 
                borderRadius: '0.75rem', 
                padding: '0.75rem 1rem', 
                fontWeight: 600, 
                width: '100%', 
                fontSize: '1rem', 
                boxSizing: 'border-box',
                outline: 'none'
              }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ 
              background: '#ffc300', 
              color: '#0033a0', 
              fontWeight: 700, 
              fontSize: '1.1rem', 
              border: 'none', 
              borderRadius: '9999px', 
              padding: '0.75rem 2rem', 
              boxShadow: '0 2px 8px #ed1c2433', 
              cursor: loading ? 'not-allowed' : 'pointer', 
              transition: 'background 0.18s, color 0.18s', 
              width: '100%',
              opacity: loading ? 0.7 : 1
            }}
            onMouseOver={e => {
              if (!loading) {
                (e.currentTarget as HTMLButtonElement).style.background = '#ed1c24';
                (e.currentTarget as HTMLButtonElement).style.color = '#fff';
              }
            }}
            onMouseOut={e => {
              if (!loading) {
                (e.currentTarget as HTMLButtonElement).style.background = '#ffc300';
                (e.currentTarget as HTMLButtonElement).style.color = '#0033a0';
              }
            }}
          >
            {loading ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            {mode === 'signin' ? (
              <button 
                type="button"
                onClick={() => setMode('signup')}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#0033a0', 
                  fontWeight: 600, 
                  fontSize: '1rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Don&apos;t have an account? Sign Up
              </button>
            ) : (
              <button 
                type="button"
                onClick={() => setMode('signin')}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#0033a0', 
                  fontWeight: 600, 
                  fontSize: '1rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Already have an account? Sign In
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default AuthForm;
