import React from 'react';
import { Heart, ShieldCheck, MapPin, Globe, Compass, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ 
      background: 'rgba(4, 8, 20, 0.95)', 
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '4rem 0 2rem 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '3rem',
          marginBotton: '3rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          
          {/* Brand & Mandate */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '1.8rem' }}>🐢</span>
              <h3 style={{ fontSize: '1.4rem', color: '#fff', fontFamily: 'var(--font-heading)' }}>
                REKAWA <span style={{ color: 'var(--primary-cyan)' }}>ECO-SANCTUARY</span>
              </h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
              Rekawa is home to one of Sri Lanka’s rare <em>in-situ</em> nesting beaches where five endangered sea turtle species lay eggs naturally under moonlight. We support ethical eco-tourism, local community guides, and ocean conservation.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', fontSize: '0.85rem' }}>
              <ShieldCheck size={16} /> 100% Community Protection & Non-Intrusive Observation
            </div>
          </div>

          {/* Quick Explore */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1.25rem', fontFamily: 'var(--font-heading)' }}>
              Explore Rekawa
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="#hero" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>3D Ocean & Sea Turtle Showcase</a></li>
              <li><a href="#turtle-watch" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Night Turtle Watch Patrol Simulator</a></li>
              <li><a href="#lagoon" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Rekawa Lagoon Kayak & Mangroves</a></li>
              <li><a href="#gallery" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>High-Res Visual Gallery & 360° View</a></li>
              <li><a href="#travel" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Foreign Tourist Visitor Guide</a></li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1.25rem', fontFamily: 'var(--font-heading)' }}>
              Location & Details
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin size={18} style={{ color: 'var(--primary-cyan)', flexShrink: 0, marginTop: '3px' }} />
                <span>Rekawa Beach & Sanctuary, Netolpitiya, Tangalle, Southern Province, Sri Lanka</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Globe size={18} style={{ color: 'var(--primary-cyan)', flexShrink: 0 }} />
                <span>Coordinates: 6.0461° N, 80.8653° E</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Compass size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                <span>Peak Nesting Season: April to July (Nightly Tours 8 PM - 12 AM)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          gap: '1rem',
          paddingTop: '1.5rem',
          fontSize: '0.85rem',
          color: 'var(--text-dim)'
        }}>
          <div>
            © {new Date().getFullYear()} Rekawa Sri Lanka Eco-Tourism Guide. Made with <Heart size={14} style={{ color: 'var(--accent-coral)', display: 'inline', margin: '0 2px' }} /> for Wildlife Conservation.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Sri Lanka Wildlife Protection</span>
            <span>Ethical Turtle Watch Project</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
