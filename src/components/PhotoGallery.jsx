import React, { useState } from 'react';
import { Camera, Eye, Sparkles, Compass, Maximize2, X, RotateCw } from 'lucide-react';

export default function PhotoGallery() {
  const [filter, setFilter] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [is360Mode, setIs360Mode] = useState(false);
  const [panAngle, setPanAngle] = useState(0);

  const galleryItems = [
    {
      id: 1,
      title: 'Moonlit Sea Turtle Nesting',
      category: 'turtles',
      desc: 'A wild Green Sea Turtle emerging from the waves under the night sky at Rekawa Beach.',
      image: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=800&q=80',
      badge: 'Nesting Experience'
    },
    {
      id: 2,
      title: 'Pristine Rekawa Golden Coast',
      category: 'beach',
      desc: 'Miles of quiet, undeveloped sand dunes lined with swaying coconut palms along the Indian Ocean.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      badge: 'Untouched Beach'
    },
    {
      id: 3,
      title: 'Rekawa Mangrove Lagoon Kayaking',
      category: 'lagoon',
      desc: 'Paddling through calm brackish waters bordered by dense green mangrove ecosystems.',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      badge: 'Lagoon Waters'
    },
    {
      id: 4,
      title: 'Southern Sri Lankan Sunset',
      category: 'sunset',
      desc: 'Breathtaking hues of violet and gold over the horizon of the southern Sri Lankan coastline.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      badge: 'Coastal Sunset'
    },
    {
      id: 5,
      title: 'Hatchling Return to Ocean',
      category: 'turtles',
      desc: 'Tiny baby sea turtles instinctively scurrying across the wet sand into the Indian Ocean breakers.',
      image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=800&q=80',
      badge: 'Conservation'
    },
    {
      id: 6,
      title: 'Local Village Catamaran',
      category: 'village',
      desc: 'Traditional wooden outrigger boats used by Sri Lankan fishermen along Rekawa Lagoon.',
      image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=800&q=80',
      badge: 'Culture'
    }
  ];

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  return (
    <section id="gallery" style={{ padding: '6rem 0' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge-pill" style={{ marginBottom: '1rem' }}>
            <Camera size={14} /> VISUAL SHOWCASE & 360° TOUR
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#fff', marginBottom: '1rem' }}>
            Rekawa In <span className="gradient-text">Pictures & 360° Panorama</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7' }}>
            Glimpse the serene beauty of natural nesting beaches, mangrove kayak routes, vibrant sunsets, and Sri Lanka's ocean biodiversity.
          </p>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', justifyCenter: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '3rem', justifyContent: 'center' }}>
          {[
            { id: 'all', label: 'All Showcase' },
            { id: 'turtles', label: 'Sea Turtles & Nesting' },
            { id: 'beach', label: 'Golden Beaches' },
            { id: 'lagoon', label: 'Mangrove Lagoon' },
            { id: 'sunset', label: 'Village & Sunsets' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              style={{
                padding: '0.6rem 1.35rem',
                borderRadius: '9999px',
                border: filter === cat.id ? '1px solid var(--primary-cyan)' : '1px solid var(--border-glass)',
                background: filter === cat.id ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255,255,255,0.03)',
                color: filter === cat.id ? 'var(--primary-cyan)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="glass-panel"
              style={{
                overflow: 'hidden',
                cursor: 'pointer',
                borderRadius: '24px',
                position: 'relative'
              }}
            >
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
                <span style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(4, 10, 24, 0.8)',
                  backdropFilter: 'blur(10px)',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  color: 'var(--primary-cyan)',
                  fontWeight: 600,
                  border: '1px solid rgba(0, 242, 254, 0.3)'
                }}>
                  {item.badge}
                </span>
              </div>

              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.5' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 360 Degree Interactive Beach View Banner */}
        <div className="glass-panel" style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.08), rgba(0, 102, 255, 0.12))',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ maxWidth: '650px', margin: '0 auto' }}>
            <span className="badge-pill" style={{ marginBottom: '1rem', background: 'rgba(0,242,254,0.15)' }}>
              <RotateCw size={14} className="animate-spin" /> INTERACTIVE 360° EXPERIENCE
            </span>
            <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '1rem' }}>
              Virtually Stand On Rekawa Beach At Dusk
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}>
              Drag your mouse across the interactive 360° panorama viewer to experience the serene golden ocean front before night turtle watch patrols begin.
            </p>

            {/* Simulated 360 Viewer Box */}
            <div 
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                setPanAngle((x / rect.width - 0.5) * 60);
              }}
              style={{
                height: '220px',
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(0, 242, 254, 0.4)',
                cursor: 'grab'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
                alt="360 Beach View"
                style={{
                  width: '120%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: `translateX(${panAngle}px) scale(1.15)`,
                  transition: 'transform 0.1s ease-out'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(4, 10, 24, 0.85)',
                backdropFilter: 'blur(8px)',
                padding: '0.4rem 1rem',
                borderRadius: '9999px',
                color: 'var(--primary-cyan)',
                fontSize: '0.78rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <RotateCw size={14} /> Drag Mouse Left/Right to Pan 360°
              </div>
            </div>
          </div>
        </div>

        {/* Modal Lightbox */}
        {selectedPhoto && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            background: 'rgba(4, 8, 20, 0.95)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}>
            <div style={{ maxWidth: '800px', width: '100%', position: 'relative' }}>
              <button
                onClick={() => setSelectedPhoto(null)}
                style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '0',
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#fff',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={20} />
              </button>

              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                style={{ width: '100%', maxHeight: '70vh', objectFit: 'cover', borderRadius: '20px', marginBottom: '1.5rem' }}
              />
              <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '0.5rem' }}>{selectedPhoto.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>{selectedPhoto.desc}</p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
