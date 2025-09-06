"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

// Reuse the CarWashIcon from Navbar for consistency
const CarWashIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}
  >
    <path 
      d="M20 14c0-1.1-.9-2-2-2h-1.5l-1.5-3h-6l-1.5 3H6c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h1v1c0 .5.4 1 1 1h2c.6 0 1-.5 1-1v-1h6v1c0 .5.4 1 1 1h2c.6 0 1-.5 1-1v-1h1c1.1 0 2-.9 2-2v-4z" 
      fill="#ed1c24"
    />
    <path 
      d="M8.5 9h7l1 2H7.5l1-2z" 
      fill="#fff"
      style={{ opacity: 0.8 }}
    />
    <ellipse cx="7" cy="15.5" rx="1.2" ry="0.8" fill="#fff"/>
    <ellipse cx="17" cy="15.5" rx="1.2" ry="0.8" fill="#fff"/>
    <rect x="11" y="14" width="2" height="1" fill="#fff" rx="0.5"/>
    <g fill="#fff">
      <circle cx="5" cy="6" r="1.2"/>
      <circle cx="6.5" cy="5.5" r="1"/>
      <circle cx="6" cy="7" r="0.8"/>
      <circle cx="4" cy="7.5" r="0.9"/>
      <circle cx="17" cy="5" r="1.3"/>
      <circle cx="18.5" cy="6" r="1.1"/>
      <circle cx="19" cy="4" r="0.9"/>
      <circle cx="15.5" cy="6.5" r="1"/>
    </g>
    <rect x="3" y="8" width="1.5" height="6" fill="#ffc300" rx="0.5"/>
    <rect x="19" y="8" width="1.5" height="6" fill="#ffc300" rx="0.5"/>
  </svg>
);

const SoftTouchWashPage: React.FC = () => {
  const softTouchWashes = [
    {
      id: 1,
      name: "Basic",
      price: "$11.99",
      color: "#ffc300", // Yellow
      textColor: "#0033a0", // Blue text
      buttonColor: "#0033a0", // Blue button
      features: [
        "Initial presoak",
        "Second presoak", 
        "High pressure (full body)",
        "Spot free",
        "Wax",
        "Air dryer"
      ]
    },
    {
      id: 2,
      name: "Deluxe", 
      price: "$13.99",
      color: "#ed1c24", // Red
      textColor: "#fff", // White text
      buttonColor: "#ffc300", // Yellow button
      features: [
        "Basic +",
        "High pressure undercarriage",
        "High pressure wheel/tire",
        "2nd high pressure rinse (full body)"
      ]
    },
    {
      id: 3,
      name: "Ultimate",
      price: "$19.99", 
      color: "#0033a0", // Blue
      textColor: "#ffc300", // Yellow text
      buttonColor: "#ed1c24", // Red button
      features: [
        "Deluxe +",
        "Foaming soap",
        "Blue foaming solution"
      ]
    },
    {
      id: 4,
      name: "Ultimate+",
      price: "$21.99",
      color: "#4a90e2", // Light Blue
      textColor: "#fff", // White text
      buttonColor: "#ffc300", // Yellow button
      features: [
        "Ultimate +",
        "Ceramic brilliant shine",
        "Polish"
      ]
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: '#f8f9fa' }}>
      {/* Navigation - consistent with main navbar */}
      <nav className="relative z-50 w-full">
        <div
          className="w-full"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '0 0 2rem 2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="flex items-center space-x-3">
                <CarWashIcon />
                <span
                  className="font-bold tracking-wide"
                  style={{
                    color: '#0033a0',
                    fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
                  }}
                >
                  Heritage Wash+
                </span>
              </Link>
              <Link
                href="/"
                className="px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:opacity-90"
                style={{
                  backgroundColor: '#ffc300',
                  color: '#0033a0',
                  fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                }}
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - consistent with main hero */}
      <section
        className="relative py-16 sm:py-20 w-full flex items-center justify-center text-center"
        style={{ background: '#0033a0' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/98 to-background/95 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <h1
            className="font-bold tracking-tight mb-4"
            style={{
              color: '#ffc300',
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              fontWeight: 900,
              letterSpacing: '2px',
              textShadow: '0 2px 8px #0002',
            }}
          >
            Soft-Touch Car Wash
          </h1>
          <p
            className="text-white max-w-2xl mx-auto"
            style={{
              fontSize: 'clamp(1rem, 3vw, 1.25rem)',
              fontWeight: 500,
              lineHeight: '1.6',
            }}
          >
            Gentle soft-cloth brushes combined with premium soaps provide thorough cleaning with enhanced dirt removal for a comprehensive wash experience.
          </p>
        </div>
      </section>

      {/* Wash Options - consistent with ServicesSection styling */}
      <section className="relative py-16 sm:py-20 w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <h2
              className="font-bold tracking-tight mb-4"
              style={{
                fontSize: 'clamp(2rem, 6vw, 3rem)',
                color: '#0033a0'
              }}
            >
              Choose Your Soft-Touch Wash
            </h2>
            <p
              className="text-foreground/70"
              style={{
                fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                color: '#666'
              }}
            >
              All prices include tax. Select the perfect wash level for your vehicle.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {softTouchWashes.map((wash) => (
              <div
                key={wash.id}
                style={{
                  background: wash.color,
                  color: wash.textColor,
                  borderRadius: '1.5rem',
                  border: `4px solid ${wash.color === "#ffc300" ? '#0033a0' : (wash.color === "#ed1c24" ? '#ffc300' : (wash.color === "#0033a0" ? '#ed1c24' : '#ffc300'))}`,
                  boxShadow: `0 4px 24px ${wash.color}`,
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
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = `0 8px 32px ${wash.color}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 4px 24px ${wash.color}`;
                }}
              >
                {/* Header */}
                <div className="text-center mb-6">
                  <h3
                    className="font-bold mb-2"
                    style={{
                      color: wash.textColor,
                      fontSize: 'clamp(1.5rem, 4vw, 1.875rem)',
                    }}
                  >
                    {wash.name}
                  </h3>
                  <div
                    className="font-bold"
                    style={{
                      color: wash.textColor,
                      fontSize: 'clamp(1.75rem, 5vw, 2.25rem)',
                    }}
                  >
                    {wash.price}
                    <span
                      style={{
                        fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                        fontWeight: 'normal'
                      }}
                    >
                      +TX
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex-grow mb-6">
                  <ul className="space-y-3">
                    {wash.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span
                          className="mr-3 font-bold"
                          style={{
                            color: wash.id === 1 ? '#0033a0' : (wash.textColor === '#fff' ? '#ffc300' : wash.textColor),
                            fontSize: '1.25rem',
                            lineHeight: '1'
                          }}
                        >
                          ●
                        </span>
                        <span
                          style={{
                            color: wash.id === 1 ? '#000' : (wash.textColor === '#fff' ? '#fff' : '#000'),
                            fontSize: 'clamp(0.875rem, 2.5vw, 0.95rem)',
                            lineHeight: '1.5',
                            fontWeight: 500
                          }}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Select Button - consistent with other buttons */}
                <button
                  className="w-full py-3 px-6 rounded-full font-bold transition-all duration-300 hover:opacity-90"
                  style={{
                    backgroundColor: wash.buttonColor || (wash.id === 1 ? '#0033a0' : (wash.textColor === '#fff' ? '#ffc300' : '#0033a0')),
                    color: wash.buttonColor === '#ed1c24' ? '#fff' : (wash.buttonColor === '#ffc300' ? '#0033a0' : (wash.buttonColor === '#0033a0' ? '#fff' : '#0033a0')),
                    fontSize: 'clamp(1rem, 3vw, 1.125rem)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  onClick={() => {
                    window.location.href = '/#booking-section';
                  }}
                >
                  Select {wash.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info - consistent with website sections */}
      <section className="relative py-16 sm:py-20 w-full bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/98 to-background/95 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h3
            className="font-bold tracking-tight mb-4"
            style={{
              color: '#0033a0',
              fontSize: 'clamp(1.5rem, 5vw, 2rem)',
            }}
          >
            Benefits of Soft-Touch Technology
          </h3>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#ffc300' }}
              >
                <span style={{ fontSize: '2rem' }}>🧽</span>
              </div>
              <h4
                className="font-semibold mb-2"
                style={{
                  color: '#0033a0',
                  fontSize: 'clamp(1rem, 3vw, 1.125rem)',
                }}
              >
                Deep Cleaning Action
              </h4>
              <p
                style={{
                  color: '#666',
                  fontSize: 'clamp(0.875rem, 2.5vw, 0.95rem)',
                  lineHeight: '1.5'
                }}
              >
                Gentle brushes provide superior dirt and grime removal for heavily soiled vehicles.
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#ffc300' }}
              >
                <span style={{ fontSize: '2rem' }}>✨</span>
              </div>
              <h4
                className="font-semibold mb-2"
                style={{
                  color: '#0033a0',
                  fontSize: 'clamp(1rem, 3vw, 1.125rem)',
                }}
              >
                Enhanced Shine
              </h4>
              <p
                style={{
                  color: '#666',
                  fontSize: 'clamp(0.875rem, 2.5vw, 0.95rem)',
                  lineHeight: '1.5'
                }}
              >
                Soft-cloth brushes help distribute soaps and waxes evenly for a brilliant finish.
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#ffc300' }}
              >
                <span style={{ fontSize: '2rem' }}>🎯</span>
              </div>
              <h4
                className="font-semibold mb-2"
                style={{
                  color: '#0033a0',
                  fontSize: 'clamp(1rem, 3vw, 1.125rem)',
                }}
              >
                Thorough Coverage
              </h4>
              <p
                style={{
                  color: '#666',
                  fontSize: 'clamp(0.875rem, 2.5vw, 0.95rem)',
                  lineHeight: '1.5'
                }}
              >
                Comprehensive cleaning reaches all vehicle surfaces for complete coverage and care.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SoftTouchWashPage;
