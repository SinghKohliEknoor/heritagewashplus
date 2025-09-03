
"use client";
import React, { useState, FormEvent } from "react";// Helper component for available times
type TimeSelectProps = {
  selectedDate: Date | null;
  value: string;
  onChange: (v: string) => void;
};

function TimeSelect({ selectedDate, value, onChange }: TimeSelectProps) {
  function getAvailableTimes() {
    const times: string[] = [];
    const now = new Date();
    let startHour = 8;
    const endHour = 18;
    if (selectedDate) {
      const isToday = selectedDate.toDateString() === now.toDateString();
      if (isToday) {
        startHour = now.getHours();
        if (now.getMinutes() > 30) startHour += 1;
      }
    }
    for (let h = startHour; h <= endHour; h++) {
      for (const m of [0, 30]) {
        const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        if (selectedDate) {
          const isToday = selectedDate.toDateString() === now.toDateString();
          if (isToday) {
            const timeDate = new Date(selectedDate);
            timeDate.setHours(h, m, 0, 0);
            if (timeDate.getTime() <= now.getTime()) continue;
          }
        }
        times.push(timeStr);
      }
    }
    return times;
  }
  const options = getAvailableTimes();
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="rounded-xl border border-border/60 dark:border-border/30 bg-white/70 dark:bg-white/[0.07] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
      required
    >
      <option value="" disabled>Select a time</option>
      {options.map((t: string) => (
        <option key={t} value={t}>{t}</option>
      ))}
    </select>
  );
}

import dynamic from "next/dynamic";
const Calendar = dynamic(() => import("react-calendar"), { ssr: false });
import 'react-calendar/dist/Calendar.css';
import './bookingFormCustom.css';

type BookingData = {
  name: string;
  phone: string;
  email: string;
  carType: string;
  carMake: string;
  carModel: string;
  detailType: string;
  date: Date | null;
  time: string;
};

const initialState: BookingData = {
  name: "",
  phone: "",
  email: "",
  carType: "Sedan",
  carMake: "",
  carModel: "",
  detailType: "Express Detail",
  date: null,
  time: "",
};

const detailOptions = ["Express Detail", "Basic Detail", "Advance Detail"];
const carTypes = ["Sedan", "SUV / Truck", "Other"];

export const BookingForm: React.FC = () => {
  const [data, setData] = useState<BookingData>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mobile styles that will be injected for screens < 768px
  const mobileStyles = `
    @media (max-width: 768px) {
      #booking-section {
        padding: 2rem 0.75rem !important;
      }
      #booking-container {
        max-width: 100% !important;
        padding: 0 0.5rem !important;
      }
      #booking-form {
        border-radius: 1rem !important;
        padding: 1.5rem 1rem !important;
        gap: 1.25rem !important;
        border-width: 2px !important;
      }
      #booking-grid {
        grid-template-columns: 1fr !important;
      }
      #booking-fieldset {
        grid-column: span 1 !important;
      }
      #booking-fieldset .date-time-grid {
        grid-template-columns: 1fr !important;
      }
      #detailing-type-container {
        grid-column: span 1 !important;
      }
      #detailing-type-grid {
        grid-template-columns: 1fr !important;
        gap: 0.75rem !important;
      }
      .booking-input {
        border-radius: 0.5rem !important;
        font-size: 0.9rem !important;
      }
      .booking-label {
        font-size: 0.85rem !important;
      }
      .detailing-button {
        border-radius: 0.75rem !important;
        padding: 0.75rem 1rem !important;
        align-items: center !important;
      }
    }
    
    @media (max-width: 400px) {
      #booking-section {
        padding: 1.5rem 0.25rem !important;
      }
      #booking-container {
        padding: 0 !important;
        max-width: calc(100vw - 0.5rem) !important;
      }
      #booking-form {
        padding: 1rem 0.5rem !important;
        border-radius: 0.5rem !important;
        margin: 0 !important;
        max-width: 100% !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      .booking-input {
        padding: 0.5rem 0.75rem !important;
        font-size: 0.875rem !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      .booking-label {
        font-size: 0.75rem !important;
      }
      .detailing-button {
        padding: 0.5rem 0.75rem !important;
        font-size: 0.875rem !important;
      }
      #booking-grid {
        gap: 0.75rem !important;
      }
      .custom-calendar {
        width: 100% !important;
        max-width: 100% !important;
        font-size: 0.8rem !important;
      }
    }
    
    @media (max-width: 375px) {
      #booking-section {
        padding: 1rem 0.125rem !important;
      }
      #booking-container {
        padding: 0 !important;
        margin: 0 !important;
        max-width: calc(100vw - 0.25rem) !important;
      }
      #booking-form {
        padding: 0.75rem 0.375rem !important;
        border-radius: 0.375rem !important;
        border-width: 1px !important;
        max-width: 100% !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      .booking-input {
        padding: 0.5rem 0.5rem !important;
        font-size: 0.8rem !important;
        border-radius: 0.375rem !important;
      }
      .booking-label {
        font-size: 0.7rem !important;
        margin-bottom: 0.25rem !important;
      }
      .detailing-button {
        padding: 0.5rem 0.5rem !important;
        font-size: 0.8rem !important;
        border-radius: 0.5rem !important;
      }
      #booking-grid {
        gap: 0.5rem !important;
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

  const update = (field: keyof BookingData, value: string | Date | null) => {
    setData(d => ({ ...d, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!data.name || !data.phone || !data.email || !data.date || !data.time) {
      setError("Please fill all required fields including date & time.");
      return;
    }
    const today = new Date();
    const chosenDate = new Date(data.date as Date);
    chosenDate.setHours(Number(data.time.split(":")[0] || 0), Number(data.time.split(":")[1] || 0), 0, 0);
    if (chosenDate.getTime() < today.getTime() - 5 * 60 * 1000) {
      setError("Selected appointment time is in the past.");
      return;
    }
    // Submit to API
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        phone: data.phone,
        email: data.email,
        carType: data.carType,
        carMake: data.carMake,
        carModel: data.carModel,
        detailType: data.detailType,
        date: chosenDate.toISOString().split("T")[0],
        time: data.time,
      }),
    });
    const result = await res.json();
    if (!res.ok) {
      setError(result.error || "Failed to submit booking.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setData(initialState);
  };

  return (
    <section id="booking-section" style={{ background: '#0033a0', padding: 'min(8vw, 4rem) 1rem' }}>
      <div id="booking-container" style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: '#ffc300', fontWeight: 900, fontSize: 'clamp(1.5rem, 6vw, 2.5rem)', letterSpacing: '1px', marginBottom: '1rem', textShadow: '0 2px 8px #0002' }}>Book a Detailing Appointment</h2>
          <p style={{ color: '#fff', fontSize: 'clamp(1rem, 3vw, 1.1rem)', maxWidth: '32rem', margin: '0 auto' }}>Reserve your preferred detailing package. We&apos;ll confirm availability shortly.</p>
        </div>
        <form
          id="booking-form"
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
          {error && (
            <div style={{ borderRadius: '1rem', background: '#ed1c2411', border: '2px solid #ed1c24', color: '#ed1c24', padding: '0.75rem 1.5rem', fontWeight: 700, fontSize: '1rem' }}>
              {error}
            </div>
          )}
          {submitted && (
            <div style={{ borderRadius: '1rem', background: '#ffc30022', border: '2px solid #ffc300', color: '#0033a0', padding: '0.75rem 1.5rem', fontWeight: 700, fontSize: '1rem' }}>
              Request received! We&apos;ll be in touch.
            </div>
          )}
          <div id="booking-grid" style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="name" className="booking-label" style={{ fontWeight: 700, color: '#0033a0' }}>Name *</label>
              <input
                id="name"
                required
                value={data.name}
                onChange={e => update("name", e.target.value)}
                placeholder="Full name"
                className="booking-input"
                style={{ background: '#fff', color: '#0033a0', border: '2px solid #0033a0', borderRadius: '0.75rem', padding: '0.75rem 1rem', fontWeight: 600, width: '100%', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="phone" className="booking-label" style={{ fontWeight: 700, color: '#0033a0' }}>Phone Number *</label>
              <input
                id="phone"
                required
                value={data.phone}
                onChange={e => update("phone", e.target.value)}
                placeholder="e.g. 555-123-4567"
                inputMode="tel"
                className="booking-input"
                style={{ background: '#fff', color: '#0033a0', border: '2px solid #0033a0', borderRadius: '0.75rem', padding: '0.75rem 1rem', fontWeight: 600, width: '100%', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="email" className="booking-label" style={{ fontWeight: 700, color: '#0033a0' }}>Email *</label>
              <input
                id="email"
                type="email"
                required
                value={data.email}
                onChange={e => update("email", e.target.value)}
                placeholder="you@example.com"
                className="booking-input"
                style={{ background: '#fff', color: '#0033a0', border: '2px solid #0033a0', borderRadius: '0.75rem', padding: '0.75rem 1rem', fontWeight: 600, width: '100%', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="carType" className="booking-label" style={{ fontWeight: 700, color: '#0033a0' }}>Car Type *</label>
              <select
                id="carType"
                value={data.carType}
                onChange={e => update("carType", e.target.value)}
                className="booking-input"
                style={{ background: '#ffc300', color: '#0033a0', border: '2px solid #0033a0', borderRadius: '0.75rem', padding: '0.75rem 1rem', fontWeight: 700, width: '100%', fontSize: '1rem', boxSizing: 'border-box' }}
              >
                {carTypes.map(t => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="carMake" className="booking-label" style={{ fontWeight: 700, color: '#0033a0' }}>Car Company Name *</label>
              <input
                id="carMake"
                required
                value={data.carMake}
                onChange={e => update("carMake", e.target.value)}
                placeholder="e.g. Toyota"
                className="booking-input"
                style={{ background: '#fff', color: '#0033a0', border: '2px solid #0033a0', borderRadius: '0.75rem', padding: '0.75rem 1rem', fontWeight: 600, width: '100%', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="carModel" className="booking-label" style={{ fontWeight: 700, color: '#0033a0' }}>Car Name / Model *</label>
              <input
                id="carModel"
                required
                value={data.carModel}
                onChange={e => update("carModel", e.target.value)}
                placeholder="e.g. Camry"
                className="booking-input"
                style={{ background: '#fff', color: '#0033a0', border: '2px solid #0033a0', borderRadius: '0.75rem', padding: '0.75rem 1rem', fontWeight: 600, width: '100%', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>
            <fieldset id="booking-fieldset" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', border: 'none', padding: 0, margin: 0, gridColumn: 'span 2' }}>
              <legend className="booking-label" style={{ fontWeight: 700, color: '#0033a0', marginBottom: '0.5rem' }}>Preferred Appointment *</legend>
              <div className="date-time-grid" style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#0033a0', fontWeight: 700 }}>Date</label>
                  <div style={{ width: '100%', maxWidth: '100%' }}>
                    <Calendar
                      value={data.date}
                      onChange={date => update("date", date as Date)}
                      minDate={new Date()}
                      tileClassName={({ date, view }) =>
                        view === 'month' && date.getDay() === 0 ? 'react-calendar__tile--sunday' : undefined
                      }
                      className="custom-calendar"
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#0033a0', fontWeight: 700 }}>Time</label>
                  <div style={{ width: '100%' }}>
                    <TimeSelect
                      selectedDate={data.date}
                      value={data.time}
                      onChange={value => update("time", value)}
                    />
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#0033a0', marginTop: '0.5rem' }}>Business hours 08:00–18:00. We&apos;ll confirm or suggest alternatives if unavailable.</p>
            </fieldset>
            <div id="detailing-type-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', gridColumn: 'span 2' }}>
              <label htmlFor="detailType" className="booking-label" style={{ fontWeight: 700, color: '#0033a0' }}>Detailing Type *</label>
              <div id="detailing-type-grid" style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
                {detailOptions.map(opt => {
                  const active = data.detailType === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => update("detailType", opt)}
                      className="detailing-button"
                      style={{
                        borderRadius: '1rem',
                        border: active ? '2px solid #ffc300' : '2px solid #0033a0',
                        background: active ? '#ffc300' : '#fff',
                        color: active ? '#0033a0' : '#0033a0',
                        fontWeight: 700,
                        fontSize: '1rem',
                        padding: '0.75rem 1.5rem',
                        boxShadow: active ? '0 2px 8px #ed1c2433' : 'none',
                        cursor: 'pointer',
                        transition: 'background 0.18s, color 0.18s',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '0.25rem',
                      }}
                      aria-pressed={active}
                    >
                      <span>{opt}</span>
                      {active && <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#ed1c24', fontWeight: 700 }}>Selected</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.5rem', paddingTop: '1rem' }}>
            <button
              type="submit"
              style={{ background: '#ffc300', color: '#0033a0', fontWeight: 700, fontSize: '1.1rem', border: 'none', borderRadius: '9999px', padding: '0.75rem 2rem', boxShadow: '0 2px 8px #ed1c2433', cursor: 'pointer', transition: 'background 0.18s, color 0.18s', width: '100%', maxWidth: '300px' }}
              onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.background = '#ed1c24'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
              onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.background = '#ffc300'; (e.currentTarget as HTMLButtonElement).style.color = '#0033a0'; }}
            >
              Book Now
            </button>
            <p style={{ fontSize: '0.85rem', color: '#0033a0' }}>* All fields required. We&apos;ll confirm schedule & pricing via phone or email.</p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;
