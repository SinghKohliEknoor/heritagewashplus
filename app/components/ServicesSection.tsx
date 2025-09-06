"use client";
import React from "react";
import useSWR from "swr";

interface ServiceTier {
  id: string;
  name: string;
  description: string;
  price_sedan: number;
  price_suv: number;
  features: string[];
}

const currency = (n: number) => `$${n.toFixed(2)}`;
const fetcher = (url: string) => fetch(url).then(res => res.json());

const ServicesSection: React.FC = () => {
  const { data, error, isLoading } = useSWR('/api/services', fetcher);
  if (error) return <div className="text-red-500">Failed to load services.</div>;
  if (isLoading) return <div className="text-center py-10">Loading services...</div>;
  if (!Array.isArray(data)) return <div className="text-center py-10">No services found.</div>;
  return (
    <section id="services" className="relative py-16 sm:py-28 w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)' }}>Detailing Packages</h2>
          <p className="text-foreground/70 text-lg" style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}>Transparent pricing. Premium products. Tailored care for sedans, SUVs & trucks.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-3">
          {data.map((tier: ServiceTier) => (
              <div
                key={tier.id}
                style={{
                  background: tier.name === 'Basic Detail' ? '#ffc300' : '#0033a0',
                  color: tier.name === 'Basic Detail' ? '#0033a0' : '#fff',
                  borderRadius: '1.5rem',
                  border: '4px solid #0033a0',
                  boxShadow: '0 4px 24px #0033a0',
                  padding: 'min(6vw, 2rem)',
                  margin: '0 0 2rem 0',
                  position: 'relative',
                  minHeight: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  maxWidth: '420px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                className="group"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 8px 32px #0033a0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 24px #0033a0';
                }}
              >
                {tier.name === 'Basic Detail' && (
                  <span style={{
                    position: 'absolute',
                    top: '-1.5rem',
                    left: '1.5rem',
                    padding: '0.35rem 1.1rem',
                    borderRadius: '9999px',
                    background: '#0033a0',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    boxShadow: '0 2px 8px #0033a055',
                    zIndex: 2,
                  }}>
                    Most Popular
                  </span>
                )}
                <h3 style={{ color: tier.name === 'Basic Detail' ? '#0033a0' : '#fff', fontWeight: 800, fontSize: 'clamp(1.1rem, 4vw, 1.35rem)', marginBottom: '0.5rem', textAlign: 'center' }}>{tier.name}</h3>
                <p style={{ color: tier.name === 'Basic Detail' ? '#ed1c24' : '#ffc300', fontWeight: 600, marginBottom: '1rem', minHeight: '48px', textAlign: 'center', fontSize: 'clamp(1rem, 3vw, 1.1rem)' }}>{tier.description}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', marginBottom: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ color: tier.name === 'Basic Detail' ? '#0033a0' : '#ffc300', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.85rem' }}>Sedan</span>
                    <span style={{ color: tier.name === 'Basic Detail' ? '#ed1c24' : '#fff', fontWeight: 800, fontSize: 'clamp(1.2rem, 5vw, 2rem)', display: 'block' }}>{currency(tier.price_sedan)}</span>
                  </div>
                  <div>
                    <span style={{ color: tier.name === 'Basic Detail' ? '#0033a0' : '#ffc300', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.85rem' }}>SUV / Truck</span>
                    <span style={{ color: tier.name === 'Basic Detail' ? '#ed1c24' : '#fff', fontWeight: 800, fontSize: 'clamp(1.2rem, 5vw, 2rem)', display: 'block' }}>{currency(tier.price_suv)}</span>
                  </div>
                </div>
                <ul style={{ fontSize: 'clamp(0.95rem, 3vw, 1rem)', flex: 1, marginBottom: '2rem', paddingLeft: 0, listStyle: 'none' }}>
                  {(tier.features || []).map((f: string) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ display: 'inline-block', width: '0.75rem', height: '0.75rem', borderRadius: '50%', background: tier.name === 'Basic Detail' ? '#0033a0' : '#ffc300' }} />
                      <span style={{ color: tier.name === 'Basic Detail' ? '#0033a0' : '#fff', fontWeight: 500 }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <div>
                  <button 
                    style={{
                      width: '100%',
                      background: '#ed1c24',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 'clamp(1rem, 3vw, 1.1rem)',
                      border: 'none',
                      borderRadius: '9999px',
                      padding: '0.75rem 2rem',
                      boxShadow: '0 2px 8px #0033a055',
                      marginTop: '1rem',
                      cursor: 'pointer',
                      transition: 'background 0.18s, color 0.18s',
                    }}
                    onClick={() => {
                      window.location.href = '/#booking-section';
                    }}
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = '#c41620';
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = '#ed1c24';
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;