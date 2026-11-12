import React, { useState, useEffect } from 'react';
import { Compass, Volume2, VolumeX, Menu, X, Sparkles, MapPin } from 'lucide-react';

export default function Navbar({ isAudioPlaying, toggleAudio }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '3D Sea', href: '#hero' },
    { name: '3D Beach Dunes', href: '#beach-3d' },
    { name: '3D Studio', href: '#studio3d' },
    { name: 'Night Turtle Patrol', href: '#turtle-watch' },
    { name: 'Lagoon Kayaking', href: '#lagoon' },
    { name: 'Photos & 360°', href: '#gallery' },
    { name: 'Travel Planner', href: '#travel' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#040814]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-lg' 
        : 'bg-transparent py-5'
    }`}>
      <div className="container flex items-center justify-between" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Logo */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '12px', 
            background: 'linear-gradient(135deg, rgba(0,242,254,0.2), rgba(0,102,255,0.4))', 
            border: '1px solid rgba(0,242,254,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem'
          }}>
            🐢
          </div>
          <div>
            <span style={{ 
              fontFamily: 'var(--font-heading)', 
              fontWeight: 800, 
              fontSize: '1.25rem', 
              color: '#fff',
              letterSpacing: '-0.02em',
              display: 'block',
              lineHeight: 1
            }}>
              REKAWA <span style={{ color: 'var(--primary-cyan)' }}>SRI LANKA</span>
            </span>
            <span style={{ 
              fontSize: '0.7rem', 
              color: 'var(--accent-gold)', 
              letterSpacing: '0.12em', 
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <MapPin size={10} /> Tangalle Coast • Eco Sanctuary
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.95rem',
                transition: 'color 0.2s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--primary-cyan)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleAudio}
            title={isAudioPlaying ? "Mute Ocean Soundscape" : "Play Coastal Ocean Waves & Nature Ambiance"}
            style={{
              background: isAudioPlaying ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.06)',
              border: isAudioPlaying ? '1px solid var(--primary-cyan)' : '1px solid var(--border-glass)',
              color: isAudioPlaying ? 'var(--primary-cyan)' : 'var(--text-muted)',
              padding: '0.55rem 1rem',
              borderRadius: '9999px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'all 0.3s ease'
            }}
          >
            {isAudioPlaying ? <Volume2 size={16} className="animate-pulse" /> : <VolumeX size={16} />}
            <span>{isAudioPlaying ? "Audio ON" : "Soundscape"}</span>
          </button>

          {/* Book Tour CTA */}
          <a
            href="#travel"
            className="btn-primary"
            style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
          >
            <Sparkles size={14} /> Plan Visit
          </a>
        </div>
      </div>
    </header>
  );
}
