// Alternative Car Wash Icon Options
// You can replace the CarWashIcon component with any of these:

// Option 1: Current Custom Multi-Color Icon (Shell colors)
const CarWashIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z" fill="#0033a0"/>
    <circle cx="6.5" cy="15.5" r="1.5" fill="#ed1c24"/>
    <circle cx="17.5" cy="15.5" r="1.5" fill="#ed1c24"/>
    <circle cx="8" cy="3" r="1" fill="#ffc300"/>
    <circle cx="12" cy="2" r="1" fill="#ffc300"/>
    <circle cx="16" cy="3" r="1" fill="#ffc300"/>
    <circle cx="10" cy="4" r="0.5" fill="#fff"/>
    <circle cx="14" cy="4" r="0.5" fill="#fff"/>
  </svg>
);

// Option 2: Red Car with Yellow Wash
const RedCarWashIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z" fill="#ed1c24"/>
    <circle cx="6.5" cy="15.5" r="1.5" fill="#333"/>
    <circle cx="17.5" cy="15.5" r="1.5" fill="#333"/>
    <path d="M8 3 L12 1 L16 3 L14 5 L10 5 Z" fill="#ffc300"/>
  </svg>
);

// Option 3: Yellow Car with Blue Wash
const YellowCarWashIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z" fill="#ffc300"/>
    <circle cx="6.5" cy="15.5" r="1.5" fill="#333"/>
    <circle cx="17.5" cy="15.5" r="1.5" fill="#333"/>
    <path d="M8 3 Q12 1 16 3 Q14 5 10 5 Z" fill="#0033a0"/>
  </svg>
);

// Option 4: Using react-icons with custom colors
import { FaCarSide } from "react-icons/fa";
import { IoWaterOutline } from "react-icons/io5";

const SimpleCarWashIcon = () => (
  <div style={{ position: 'relative', display: 'inline-block' }}>
    <FaCarSide style={{ color: '#ed1c24', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }} />
    <IoWaterOutline 
      style={{ 
        color: '#ffc300', 
        fontSize: 'clamp(0.8rem, 2vw, 1rem)',
        position: 'absolute',
        top: '-8px',
        left: '50%',
        transform: 'translateX(-50%)'
      }} 
    />
  </div>
);

// Option 5: Animated Car Wash Icon
const AnimatedCarWashIcon = () => (
  <div style={{ position: 'relative', display: 'inline-block' }}>
    <FaCarSide style={{ color: '#0033a0', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }} />
    <div 
      style={{
        position: 'absolute',
        top: '-10px',
        left: '0',
        right: '0',
        height: '8px',
        background: 'linear-gradient(90deg, #ffc300, #ed1c24, #ffc300)',
        borderRadius: '4px',
        animation: 'wash 2s infinite'
      }}
    />
    <style jsx>{`
      @keyframes wash {
        0%, 100% { opacity: 0.3; transform: translateY(0px); }
        50% { opacity: 1; transform: translateY(-2px); }
      }
    `}</style>
  </div>
);
