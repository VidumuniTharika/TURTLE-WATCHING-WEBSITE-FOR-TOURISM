import React, { useState } from 'react';
import { Compass, Waves, Sun, Camera, Volume2, Sparkles, MapPin, ArrowRight } from 'lucide-react';

export default function LagoonExplorer() {
  const [activeSpot, setActiveSpot] = useState(0);

  const lagoonHotspots = [
    {
      title: 'Mangrove Kayak Channels',
      tag: 'PADDLE EXPERIENCE',
      desc: 'Paddling silently through shaded mangrove tunnels where roots dip into brackish waters. One of the quietest kayak routes on Sri Lanka’s south coast.',
      icon: '🚣‍♂️',
      highlights: ['Silent non-motorized paddling', 'Lush red & white mangrove forests', 'Calm glassy mirror waters'],
      bestTime: 'Early Morning (6:30 AM) or Late Afternoon (4:30 PM)'
    },
    {
      title: 'Asian Water Monitor Lizards',
      tag: 'WILDLIFE SPOTTER',
      desc: 'Rekawa Lagoon is famous for harmless giant Asian Water Monitors (Varanus salvator) sunbathing on fallen trees or swimming effortlessly past kayaks.',
      icon: '🦎',
      highlights: ['Can reach up to 2 meters long', 'Excellent aquatic swimmers', 'Harmless to quiet kayak observers'],
      bestTime: 'Mid-morning sunbathing hours'
    },
    {
      title: 'Exotic Lagoon Birdlife',
      tag: 'BIRDWATCHING PARADISE',
      desc: 'Over 150 species of coastal & wetland birds reside in Rekawa Lagoon. Hovering Pied Kingfishers, Painted Storks, Sea Eagles, and Purple Herons.',
      icon: '🦅',
      highlights: ['Pied Kingfisher hovering dives', 'Painted Storks wading in shallow sandbars', 'Brahminy Kites & Sea Eagles overhead'],
      bestTime: 'Dawn chorus (6:00 AM - 8:00 AM)'
    },
    {
      title: 'Wild Water Buffalo Herds',
      tag: 'ECO-HABITAT',
      desc: 'Domestic and wild water buffalo cool off in the shallow muddy banks of Rekawa Lagoon, creating an authentic rural Sri Lankan countryside atmosphere.',
      icon: '🦬',
      highlights: ['Local village buffalo herds', 'Cooling off in lagoon mud flats', 'Picturesque countryside photo backdrop'],
      bestTime: 'Late afternoon sunset hours'
    },
    {
      title: 'Glassy Sunset Waters',
      tag: 'PHOTOGRAPHY HOTSPOT',
      desc: 'As the sun dips below the horizon, Rekawa Lagoon reflects dramatic hues of orange, purple, and gold. Perfect for peaceful evening boat tours.',
      icon: '🌅',
      highlights: ['Stunning reflection photography', 'Gentle evening sea breeze', 'Peaceful village catamarans'],
      bestTime: '5:30 PM - 6:30 PM Sunset'
    }
  ];

  return (
    <section id="lagoon" style={{ padding: '6rem 0', background: 'rgba(2, 6, 16, 0.6)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem auto' }}>
          <div className="badge-pill" style={{ marginBottom: '1rem', background: 'rgba(0, 210, 196, 0.1)', color: 'var(--primary-teal)', borderColor: 'rgba(0, 210, 196, 0.3)' }}>
            <Waves size={14} /> TRANQUIL ECO-WETLANDS
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#fff', marginBottom: '1rem' }}>
            Rekawa <span className="gradient-gold">Lagoon & Mangroves</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7' }}>
            Beyond the wild ocean beach lies a serene brackish lagoon. Rent a wooden kayak or traditional catamaran to explore untamed mangrove waterways home to exotic birds, water monitors, and breathtaking sunsets.
          </p>
        </div>

        {/* Interactive Spot Selector */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.75rem',
          marginBottom: '3.5rem'
        }}>
          {lagoonHotspots.map((spot, idx) => {
            const isSelected = activeSpot === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveSpot(idx)}
                className="glass-panel"
                style={{
                  padding: '1.75rem',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid var(--accent-gold)' : '1px solid var(--border-glass)',
                  background: isSelected ? 'rgba(246, 211, 101, 0.08)' : 'var(--bg-card)',
                  transform: isSelected ? 'translateY(-4px)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '2rem' }}>{spot.icon}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: '12px', background: 'rgba(255,255,255,0.06)', color: 'var(--accent-gold)' }}>
                    {spot.tag}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem' }}>
                  {spot.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                  {spot.desc}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isSelected ? 'var(--accent-gold)' : 'var(--primary-cyan)', fontSize: '0.85rem', fontWeight: 600 }}>
                  Explore Details <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Spot Detail Display */}
        {lagoonHotspots[activeSpot] && (
          <div className="glass-panel" style={{
            padding: '2.5rem',
            background: 'linear-gradient(135deg, rgba(8, 24, 48, 0.9), rgba(4, 12, 28, 0.95))',
            border: '1px solid rgba(246, 211, 101, 0.25)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                {lagoonHotspots[activeSpot].icon}
              </div>
              <span className="badge-pill" style={{ marginBottom: '1rem', background: 'rgba(246, 211, 101, 0.1)', color: 'var(--accent-gold)', borderColor: 'rgba(246, 211, 101, 0.3)' }}>
                {lagoonHotspots[activeSpot].tag}
              </span>
              <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '1rem' }}>
                {lagoonHotspots[activeSpot].title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                {lagoonHotspots[activeSpot].desc}
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: 600 }}>
                <Sun size={16} /> Best Viewing Time: {lagoonHotspots[activeSpot].bestTime}
              </div>
            </div>

            {/* Key Highlights Checklist */}
            <div style={{
              background: 'rgba(4, 10, 24, 0.75)',
              padding: '1.75rem',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={16} style={{ color: 'var(--primary-cyan)' }} /> Key Visitor Highlights
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {lagoonHotspots[activeSpot].highlights.map((hl, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)', fontSize: '0.92rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-cyan)', flexShrink: 0 }}></div>
                    {hl}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
