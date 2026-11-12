import React, { useMemo } from 'react';

// Realistic SVG Sea Turtle based on real reference photos
// Each turtle is a detailed SVG with proper anatomy
function TurtleSVG({ color = 'green', size = 120, flipX = false }) {
  const configs = {
    green: {
      shell: '#2d5a3d',
      shellLight: '#3d7a52',
      scute: '#4a9960',
      skin: '#1e3d2a',
      belly: '#c8b97a',
      eye: '#a0d8a0',
      pupil: '#1a2e1a',
    },
    hawksbill: {
      shell: '#8b4513',
      shellLight: '#c4651a',
      scute: '#e8891a',
      skin: '#6b3410',
      belly: '#d4a84b',
      eye: '#d4a84b',
      pupil: '#3d1f0a',
    },
    loggerhead: {
      shell: '#7a3520',
      shellLight: '#b05030',
      scute: '#d4703a',
      skin: '#5a2810',
      belly: '#e8c888',
      eye: '#c8a830',
      pupil: '#2a1408',
    },
    leatherback: {
      shell: '#1a2635',
      shellLight: '#2a4055',
      scute: '#4a90b8',
      skin: '#131e2a',
      belly: '#8ab4d8',
      eye: '#6ad8f8',
      pupil: '#0a1218',
    },
    ridley: {
      shell: '#3d5c40',
      shellLight: '#567a58',
      scute: '#6a9e6e',
      skin: '#2a3e2c',
      belly: '#b8c89a',
      eye: '#a8c8a0',
      pupil: '#1a2a1c',
    },
  };
  const c = configs[color] || configs.green;

  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 200 140"
      style={{ transform: flipX ? 'scaleX(-1)' : 'none', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}
    >
      {/* ---- BODY / CARAPACE ---- */}
      {/* Main Shell - realistic oval shape */}
      <ellipse cx="100" cy="68" rx="62" ry="46" fill={c.shell} />

      {/* Shell gradient / lighter ridge on top */}
      <ellipse cx="100" cy="60" rx="52" ry="30" fill={c.shellLight} opacity="0.5" />

      {/* Vertebral (central) scute row */}
      <ellipse cx="100" cy="40" rx="16" ry="10" fill={c.scute} opacity="0.75" />
      <ellipse cx="100" cy="58" rx="18" ry="12" fill={c.scute} opacity="0.75" />
      <ellipse cx="100" cy="75" rx="16" ry="11" fill={c.scute} opacity="0.75" />

      {/* Costal scutes left */}
      <ellipse cx="78" cy="42" rx="13" ry="9" fill={c.scute} opacity="0.6" transform="rotate(-10 78 42)" />
      <ellipse cx="74" cy="60" rx="14" ry="10" fill={c.scute} opacity="0.6" />
      <ellipse cx="78" cy="77" rx="12" ry="9" fill={c.scute} opacity="0.6" transform="rotate(10 78 77)" />

      {/* Costal scutes right */}
      <ellipse cx="122" cy="42" rx="13" ry="9" fill={c.scute} opacity="0.6" transform="rotate(10 122 42)" />
      <ellipse cx="126" cy="60" rx="14" ry="10" fill={c.scute} opacity="0.6" />
      <ellipse cx="122" cy="77" rx="12" ry="9" fill={c.scute} opacity="0.6" transform="rotate(-10 122 77)" />

      {/* Scute grid lines */}
      <line x1="100" y1="25" x2="100" y2="100" stroke={c.shell} strokeWidth="1.5" opacity="0.8" />
      <line x1="60" y1="50" x2="140" y2="50" stroke={c.shell} strokeWidth="1" opacity="0.6" />
      <line x1="58" y1="68" x2="142" y2="68" stroke={c.shell} strokeWidth="1" opacity="0.6" />

      {/* Shell edge / rim */}
      <ellipse cx="100" cy="68" rx="62" ry="46" fill="none" stroke={c.skin} strokeWidth="2" opacity="0.6" />

      {/* ---- FRONT FLIPPERS ---- */}
      {/* Left front flipper - sweeping wing shape like real photos */}
      <path
        d="M 42 65 C 20 50, -5 38, 8 28 C 18 20, 36 30, 44 48 Z"
        fill={c.skin}
        opacity="0.95"
      />
      {/* Flipper highlight */}
      <path
        d="M 42 65 C 25 52, 5 42, 15 32 C 22 26, 36 34, 44 50"
        fill="none"
        stroke={c.shellLight}
        strokeWidth="1.5"
        opacity="0.5"
      />

      {/* Right front flipper */}
      <path
        d="M 158 65 C 180 50, 205 38, 192 28 C 182 20, 164 30, 156 48 Z"
        fill={c.skin}
        opacity="0.95"
      />
      <path
        d="M 158 65 C 175 52, 195 42, 185 32 C 178 26, 164 34, 156 50"
        fill="none"
        stroke={c.shellLight}
        strokeWidth="1.5"
        opacity="0.5"
      />

      {/* ---- REAR FLIPPERS ---- */}
      <path
        d="M 55 105 C 38 112, 25 125, 38 132 C 48 137, 60 120, 65 108 Z"
        fill={c.skin}
        opacity="0.9"
      />
      <path
        d="M 145 105 C 162 112, 175 125, 162 132 C 152 137, 140 120, 135 108 Z"
        fill={c.skin}
        opacity="0.9"
      />

      {/* ---- HEAD ---- */}
      {/* Neck */}
      <ellipse cx="100" cy="26" rx="12" ry="10" fill={c.skin} />
      {/* Head */}
      <ellipse cx="100" cy="14" rx="14" ry="12" fill={c.skin} />
      {/* Head top slightly lighter */}
      <ellipse cx="100" cy="11" rx="10" ry="8" fill={c.shellLight} opacity="0.3" />
      {/* Mouth line */}
      <path d="M 90 18 Q 100 22 110 18" fill="none" stroke={c.shell} strokeWidth="1.5" opacity="0.7" />

      {/* ---- EYES ---- */}
      <circle cx="93" cy="11" r="4.5" fill={c.eye} />
      <circle cx="93" cy="11" r="2.5" fill={c.pupil} />
      <circle cx="92" cy="10" r="1" fill="white" opacity="0.8" />

      <circle cx="107" cy="11" r="4.5" fill={c.eye} />
      <circle cx="107" cy="11" r="2.5" fill={c.pupil} />
      <circle cx="106" cy="10" r="1" fill="white" opacity="0.8" />

      {/* ---- TAIL ---- */}
      <path d="M 95 112 Q 100 128 105 112" fill={c.skin} opacity="0.9" />
    </svg>
  );
}

// Individual swimming turtle with CSS animation
function SwimmingTurtle({ id, color, size, startY, duration, delay, direction, flipY }) {
  const swimStyle = {
    position: 'fixed',
    top: `${startY}%`,
    zIndex: 999,
    pointerEvents: 'none',
    animation: `
      turtle-swim-${direction === 'rtl' ? 'rtl' : 'ltr'}-${id} ${duration}s ${delay}s linear infinite,
      turtle-bob ${(duration * 0.3).toFixed(1)}s ${delay}s ease-in-out infinite,
      turtle-flap ${(duration * 0.15).toFixed(1)}s ${delay}s ease-in-out infinite
    `,
    transform: flipY ? 'scaleY(-1)' : 'none',
    willChange: 'transform',
  };

  return (
    <div style={swimStyle}>
      <TurtleSVG color={color} size={size} flipX={direction === 'rtl'} />
    </div>
  );
}

export default function TurtleSwimOverlay() {
  // Define the turtle swarm - different sizes, speeds, positions, colors
  const turtles = useMemo(() => [
    // Large mother turtles
    { id: 1,  color: 'green',      size: 160, startY: 12,  duration: 22, delay: 0,   direction: 'ltr', flipY: false },
    { id: 2,  color: 'hawksbill',  size: 145, startY: 68,  duration: 26, delay: 4,   direction: 'rtl', flipY: false },
    { id: 3,  color: 'leatherback',size: 180, startY: 42,  duration: 30, delay: 8,   direction: 'ltr', flipY: false },
    { id: 4,  color: 'loggerhead', size: 150, startY: 82,  duration: 24, delay: 2,   direction: 'rtl', flipY: false },
    { id: 5,  color: 'ridley',     size: 135, startY: 28,  duration: 20, delay: 12,  direction: 'ltr', flipY: false },

    // Medium turtles
    { id: 6,  color: 'green',      size: 110, startY: 55,  duration: 18, delay: 6,   direction: 'ltr', flipY: false },
    { id: 7,  color: 'hawksbill',  size: 120, startY: 20,  duration: 23, delay: 14,  direction: 'rtl', flipY: false },
    { id: 8,  color: 'loggerhead', size: 105, startY: 75,  duration: 19, delay: 1,   direction: 'ltr', flipY: false },
    { id: 9,  color: 'ridley',     size: 115, startY: 90,  duration: 21, delay: 9,   direction: 'rtl', flipY: false },
    { id: 10, color: 'leatherback',size: 130, startY: 35,  duration: 27, delay: 16,  direction: 'ltr', flipY: false },

    // Baby turtles - small and fast
    { id: 11, color: 'green',      size: 60,  startY: 8,   duration: 12, delay: 3,   direction: 'rtl', flipY: false },
    { id: 12, color: 'green',      size: 55,  startY: 48,  duration: 10, delay: 7,   direction: 'ltr', flipY: false },
    { id: 13, color: 'hawksbill',  size: 65,  startY: 62,  duration: 13, delay: 11,  direction: 'rtl', flipY: false },
    { id: 14, color: 'green',      size: 50,  startY: 85,  duration: 11, delay: 5,   direction: 'ltr', flipY: false },
    { id: 15, color: 'ridley',     size: 58,  startY: 32,  duration: 14, delay: 15,  direction: 'rtl', flipY: false },
    { id: 16, color: 'green',      size: 52,  startY: 72,  duration: 9,  delay: 0.5, direction: 'ltr', flipY: false },
    { id: 17, color: 'hawksbill',  size: 62,  startY: 18,  duration: 15, delay: 13,  direction: 'rtl', flipY: false },
    { id: 18, color: 'green',      size: 48,  startY: 95,  duration: 10, delay: 17,  direction: 'ltr', flipY: false },
    { id: 19, color: 'ridley',     size: 56,  startY: 58,  duration: 12, delay: 2.5, direction: 'rtl', flipY: false },
    { id: 20, color: 'green',      size: 54,  startY: 42,  duration: 11, delay: 19,  direction: 'ltr', flipY: false },
  ], []);

  return (
    <>
      {/* Inject CSS keyframes */}
      <style>{`
        @keyframes turtle-swim-ltr-1  { from { left: -200px; } to { left: 110vw; } }
        @keyframes turtle-swim-ltr-2  { from { left: -200px; } to { left: 110vw; } }
        @keyframes turtle-swim-ltr-3  { from { left: -200px; } to { left: 110vw; } }
        @keyframes turtle-swim-ltr-4  { from { left: -200px; } to { left: 110vw; } }
        @keyframes turtle-swim-ltr-5  { from { left: -200px; } to { left: 110vw; } }
        @keyframes turtle-swim-ltr-6  { from { left: -200px; } to { left: 110vw; } }
        @keyframes turtle-swim-ltr-7  { from { left: -200px; } to { left: 110vw; } }
        @keyframes turtle-swim-ltr-8  { from { left: -200px; } to { left: 110vw; } }
        @keyframes turtle-swim-ltr-9  { from { left: -200px; } to { left: 110vw; } }
        @keyframes turtle-swim-ltr-10 { from { left: -200px; } to { left: 110vw; } }
        @keyframes turtle-swim-ltr-11 { from { left: -200px; } to { left: 110vw; } }
        @keyframes turtle-swim-ltr-12 { from { left: -200px; } to { left: 110vw; } }
        @keyframes turtle-swim-ltr-13 { from { left: -200px; } to { left: 110vw; } }
        @keyframes turtle-swim-ltr-14 { from { left: -200px; } to { left: 110vw; } }
        @keyframes turtle-swim-ltr-15 { from { left: -200px; } to { left: 110vw; } }
        @keyframes turtle-swim-ltr-16 { from { left: -200px; } to { left: 110vw; } }
        @keyframes turtle-swim-ltr-17 { from { left: -200px; } to { left: 110vw; } }
        @keyframes turtle-swim-ltr-18 { from { left: -200px; } to { left: 110vw; } }
        @keyframes turtle-swim-ltr-19 { from { left: -200px; } to { left: 110vw; } }
        @keyframes turtle-swim-ltr-20 { from { left: -200px; } to { left: 110vw; } }

        @keyframes turtle-swim-rtl-1  { from { right: -200px; left: auto; } to { right: 110vw; left: auto; } }
        @keyframes turtle-swim-rtl-2  { from { right: -200px; left: auto; } to { right: 110vw; left: auto; } }
        @keyframes turtle-swim-rtl-3  { from { right: -200px; left: auto; } to { right: 110vw; left: auto; } }
        @keyframes turtle-swim-rtl-4  { from { right: -200px; left: auto; } to { right: 110vw; left: auto; } }
        @keyframes turtle-swim-rtl-5  { from { right: -200px; left: auto; } to { right: 110vw; left: auto; } }
        @keyframes turtle-swim-rtl-6  { from { right: -200px; left: auto; } to { right: 110vw; left: auto; } }
        @keyframes turtle-swim-rtl-7  { from { right: -200px; left: auto; } to { right: 110vw; left: auto; } }
        @keyframes turtle-swim-rtl-8  { from { right: -200px; left: auto; } to { right: 110vw; left: auto; } }
        @keyframes turtle-swim-rtl-9  { from { right: -200px; left: auto; } to { right: 110vw; left: auto; } }
        @keyframes turtle-swim-rtl-10 { from { right: -200px; left: auto; } to { right: 110vw; left: auto; } }
        @keyframes turtle-swim-rtl-11 { from { right: -200px; left: auto; } to { right: 110vw; left: auto; } }
        @keyframes turtle-swim-rtl-12 { from { right: -200px; left: auto; } to { right: 110vw; left: auto; } }
        @keyframes turtle-swim-rtl-13 { from { right: -200px; left: auto; } to { right: 110vw; left: auto; } }
        @keyframes turtle-swim-rtl-14 { from { right: -200px; left: auto; } to { right: 110vw; left: auto; } }
        @keyframes turtle-swim-rtl-15 { from { right: -200px; left: auto; } to { right: 110vw; left: auto; } }
        @keyframes turtle-swim-rtl-16 { from { right: -200px; left: auto; } to { right: 110vw; left: auto; } }
        @keyframes turtle-swim-rtl-17 { from { right: -200px; left: auto; } to { right: 110vw; left: auto; } }
        @keyframes turtle-swim-rtl-18 { from { right: -200px; left: auto; } to { right: 110vw; left: auto; } }
        @keyframes turtle-swim-rtl-19 { from { right: -200px; left: auto; } to { right: 110vw; left: auto; } }
        @keyframes turtle-swim-rtl-20 { from { right: -200px; left: auto; } to { right: 110vw; left: auto; } }

        /* Gentle vertical bobbing while swimming */
        @keyframes turtle-bob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25%       { transform: translateY(-8px) rotate(-2deg); }
          75%       { transform: translateY(8px) rotate(2deg); }
        }

        /* Flipper flap subtle scale pulse */
        @keyframes turtle-flap {
          0%, 100% { transform: scaleX(1); }
          50%       { transform: scaleX(1.04); }
        }
      `}</style>

      {turtles.map((t) => (
        <SwimmingTurtle key={t.id} {...t} />
      ))}
    </>
  );
}
