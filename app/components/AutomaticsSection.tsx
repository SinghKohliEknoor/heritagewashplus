"use client";
import React from "react";
import Image from "next/image";

const AutomaticsSection: React.FC = () => {
  const automaticServices = [
    {
      id: 1,
      name: "Automatic Touchless Wash",
      description: "High-pressure water jets and advanced soaps clean your vehicle without physical contact, protecting your paint finish.",
      features: [
        "High-pressure rinse",
        "Pre-soak application", 
        "Soap application",
        "Final rinse & spot-free dry",
        "Undercarriage wash",
        "Quick 5-minute service"
      ],
      washType: "touchless",
      cardColor: "#0033a0" // Shell Blue (matching detailing cards)
    },
    {
      id: 2,
      name: "Automatic Soft-Touch Wash",
      description: "Gentle soft-cloth brushes combined with premium soaps provide thorough cleaning with enhanced dirt removal.",
      features: [
        "Soft-cloth brush system",
        "Premium soap application",
        "Thorough dirt removal",
        "Wheel & tire cleaning",
        "Undercarriage wash",
        "Spot-free rinse & dry"
      ],
      washType: "soft-touch",
      cardColor: "#ffc300" // Shell Yellow
    }
  ];

  return (
    <section className="relative py-16 sm:py-20 w-full" style={{ background: '#f8f9fa' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/98 to-background/95 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 
            className="text-3xl sm:text-5xl font-bold tracking-tight mb-4" 
            style={{ 
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              color: '#0033a0'
            }}
          >
            Automatic Washes
          </h2>
          <p 
            className="text-foreground/70 text-lg" 
            style={{ 
              fontSize: 'clamp(1rem, 3vw, 1.25rem)',
              color: '#666'
            }}
          >
            Quick, convenient, and affordable automatic wash options for busy schedules.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
          {automaticServices.map((service) => (
            <div
              key={service.id}
              className="relative overflow-hidden flex flex-col"
              style={{
                background: service.cardColor,
                borderRadius: '1.5rem',
                border: `4px solid ${service.cardColor === "#ffc300" ? '#0033a0' : '#ffc300'}`,
                boxShadow: `0 4px 24px ${service.cardColor === "#ffc300" ? '#0033a0' : '#ffc300'}`,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                minHeight: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = service.cardColor === "#ffc300" 
                  ? '0 8px 32px #0033a0' 
                  : '0 8px 32px #ffc300';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = service.cardColor === "#ffc300" 
                  ? '0 4px 24px #0033a0' 
                  : '0 4px 24px #ffc300';
              }}
            >
              {/* Full-width image section */}
              <div 
                style={{
                  height: '200px',
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  borderTopLeftRadius: '1.5rem',
                  borderTopRightRadius: '1.5rem'
                }}
              >
                <Image
                  src="/gallery/download.jpeg"
                  alt={`${service.name} equipment`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={service.id === 1}
                />
              </div>

              {/* Card content */}
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div className="mb-6">
                  <h3 
                    className="text-2xl font-bold mb-3" 
                    style={{ 
                      color: service.cardColor === "#ffc300" ? '#0033a0' : '#ffc300',
                      fontSize: 'clamp(1.5rem, 4vw, 1.75rem)'
                    }}
                  >
                    {service.name}
                  </h3>
                  <p 
                    className="text-base leading-relaxed mb-4" 
                    style={{ 
                      color: service.cardColor === "#ffc300" ? '#000' : '#fff',
                      fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
                    }}
                  >
                    {service.description}
                  </p>
                </div>

                <div className="mb-8" style={{ flex: 1 }}>
                  <h4 
                    className="font-semibold mb-4" 
                    style={{ 
                      color: service.cardColor === "#ffc300" ? '#000' : '#fff',
                      fontSize: 'clamp(1rem, 3vw, 1.125rem)'
                    }}
                  >
                    What&apos;s Included:
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span 
                          style={{ 
                            color: service.cardColor === "#ffc300" ? '#0033a0' : '#ffc300',
                            marginRight: '0.75rem',
                            fontSize: '1.25rem',
                            lineHeight: '1',
                            fontWeight: 'bold'
                          }}
                        >
                          ✓
                        </span>
                        <span 
                          style={{ 
                            color: service.cardColor === "#ffc300" ? '#000' : '#fff',
                            fontSize: 'clamp(0.875rem, 2.5vw, 0.95rem)',
                            lineHeight: '1.5'
                          }}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  style={{
                    width: '100%',
                    padding: '1rem 2rem',
                    background: '#ed1c24',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.75rem',
                    fontWeight: 700,
                    fontSize: 'clamp(1rem, 3vw, 1.125rem)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = '#c41620';
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = '#ed1c24';
                  }}
                  onClick={() => {
                    // Navigate to specific wash type page
                    if (service.washType === 'touchless') {
                      window.location.href = '/touchless-wash';
                    } else if (service.washType === 'soft-touch') {
                      window.location.href = '/soft-touch-wash';
                    }
                  }}
                >
                  Know More
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p 
            style={{ 
              fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            🚗 Drive up anytime during business hours • No appointment needed • Average wash time: 5-7 minutes
          </p>
        </div>
      </div>
    </section>
  );
};

export default AutomaticsSection;
