import React, { useState } from 'react';
import { Calendar, MapPin, Navigation, ShieldCheck, PhoneCall, Sparkles, Download, CheckCircle, Car, AlertCircle } from 'lucide-react';

export default function TravelPlanner() {
  const [selectedMonth, setSelectedMonth] = useState('April');

  const months = [
    { name: 'Jan', peak: false, text: 'Occasional Nesting (3-5 turtles/week)' },
    { name: 'Feb', peak: false, text: 'Nesting season building up' },
    { name: 'Mar', peak: false, text: 'Good sightings on moonlit nights' },
    { name: 'April', peak: true, text: '🔥 PEAK NESTING (High turtle activity daily)' },
    { name: 'May', peak: true, text: '🔥 PEAK NESTING (Multiple turtle species nightly)' },
    { name: 'June', peak: true, text: '🔥 PEAK NESTING (Excellent hatching & nesting sightings)' },
    { name: 'July', peak: true, text: '🔥 PEAK NESTING (Hatching season at peak)' },
    { name: 'Aug', peak: false, text: 'Moderate nesting activity' },
    { name: 'Sept', peak: false, text: 'Late nesting season' },
    { name: 'Oct', peak: false, text: 'Inter-monsoon gentle activity' },
    { name: 'Nov', peak: false, text: 'Occasional turtles coming ashore' },
    { name: 'Dec', peak: false, text: 'Year-end nesting begins' }
  ];

  const travelRoutes = [
    {
      from: 'Colombo / BIA Airport',
      dist: '210 km (~2.5 hrs)',
      route: 'Take Southern Expressway (E01) south to Kasagala or Beliatta exit, then drive 15 mins to Netolpitiya / Rekawa Beach.',
      icon: Car
    },
    {
      from: 'Galle Fort / Mirissa',
      dist: '75 km (~1.2 hrs)',
      route: 'Drive east along coastal route A2 through Matara and Tangalle town, turning right at Netolpitiya junction towards Rekawa Beach.',
      icon: Navigation
    },
    {
      from: 'Yala / Udawalawe National Park',
      dist: '65 km (~1 hr)',
      route: 'Drive west via Hambantota expressway connection towards Netolpitiya — perfect evening trip after a morning safari!',
      icon: MapPin
    }
  ];

  return (
    <section id="travel" style={{ padding: '6rem 0', background: 'rgba(2, 6, 16, 0.7)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem auto' }}>
          <div className="badge-pill" style={{ marginBottom: '1rem', background: 'rgba(246, 211, 101, 0.1)', color: 'var(--accent-gold)', borderColor: 'rgba(246, 211, 101, 0.3)' }}>
            <Calendar size={14} /> FOREIGN TOURIST TRAVEL PLANNER
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#fff', marginBottom: '1rem' }}>
            Plan Your Visit To <span className="gradient-gold">Rekawa Sanctuary</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7' }}>
            Everything you need to know before visiting: peak nesting months, directions from Colombo or Galle, and essential ethical visitor guidelines.
          </p>
        </div>

        {/* Peak Season Interactive Calendar */}
        <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '0.5rem' }}>
              🗓️ Peak Nesting Season Tracker
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              While turtles nest year-round at Rekawa, the highest density of nesting turtles occurs between <strong>April and July</strong>.
            </p>
          </div>

          {/* Month Pills */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
            gap: '0.5rem',
            marginBottom: '2rem'
          }}>
            {months.map((m) => {
              const isSelected = selectedMonth === m.name;
              return (
                <button
                  key={m.name}
                  onClick={() => setSelectedMonth(m.name)}
                  style={{
                    padding: '0.75rem 0.25rem',
                    borderRadius: '14px',
                    border: isSelected ? '1px solid var(--accent-gold)' : (m.peak ? '1px solid rgba(246, 211, 101, 0.3)' : '1px solid var(--border-glass)'),
                    background: isSelected ? 'rgba(246, 211, 101, 0.2)' : (m.peak ? 'rgba(246, 211, 101, 0.06)' : 'rgba(255,255,255,0.02)'),
                    color: isSelected ? '#fff' : (m.peak ? 'var(--accent-gold)' : 'var(--text-muted)'),
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {m.name}
                  {m.peak && <div style={{ fontSize: '0.65rem', color: 'var(--accent-gold)' }}>PEAK</div>}
                </button>
              );
            })}
          </div>

          {/* Selected Month Detail Card */}
          {months.find(m => m.name === selectedMonth) && (
            <div style={{
              padding: '1.5rem',
              borderRadius: '16px',
              background: 'rgba(4, 10, 24, 0.8)',
              border: '1px solid rgba(246, 211, 101, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 700 }}>SELECTED MONTH: {selectedMonth.toUpperCase()}</span>
                <h4 style={{ fontSize: '1.25rem', color: '#fff', marginTop: '2px' }}>
                  {months.find(m => m.name === selectedMonth).text}
                </h4>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-cyan)', fontSize: '0.85rem' }}>
                <Sparkles size={16} /> Night Tours Run Daily 8:00 PM – 12:00 AM
              </div>
            </div>
          )}
        </div>

        {/* Travel Routes & Code of Conduct Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          marginBottom: '4rem'
        }}>
          
          {/* Routes Card */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Navigation size={20} style={{ color: 'var(--primary-cyan)' }} /> Getting To Rekawa Beach
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {travelRoutes.map((r, i) => {
                const IconC = r.icon;
                return (
                  <div key={i} style={{ padding: '1.25rem', borderRadius: '16px', background: 'rgba(4, 10, 24, 0.7)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: 700, color: '#fff', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <IconC size={16} style={{ color: 'var(--primary-cyan)' }} /> {r.from}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', background: 'rgba(246,211,101,0.1)', padding: '0.2rem 0.6rem', borderRadius: '8px' }}>
                        {r.dist}
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                      {r.route}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ethical Rules Card */}
          <div className="glass-panel" style={{ padding: '2rem', border: '1px solid rgba(0, 210, 196, 0.3)' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={20} style={{ color: 'var(--primary-teal)' }} /> Visitor Ethical Code
            </h3>

            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {[
                { title: 'No White Flash Photography', desc: 'White light blinds sea turtles and disorients hatchlings. Use low-intensity red light torches only.' },
                { title: 'Maintain 10-Meter Distance', desc: 'Stay behind the female sea turtle while she crawls ashore. Do not block her pathway to the dry dunes.' },
                { title: 'Follow Official Local Guides', desc: 'Never walk the beach alone at night without a licensed Rekawa Turtle Watch community guide.' },
                { title: 'Support Community Patrols', desc: 'Entry ticket fees directly fund 24/7 nest guards, protecting eggs from poachers and predators.' }
              ].map((rule, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle size={18} style={{ color: 'var(--primary-teal)', flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <h5 style={{ color: '#fff', fontSize: '0.98rem', fontWeight: 700 }}>{rule.title}</h5>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>{rule.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Tourist Guide Download Banner */}
        <div className="glass-panel" style={{
          padding: '2.5rem',
          background: 'linear-gradient(135deg, rgba(0,242,254,0.12), rgba(0,102,255,0.15))',
          border: '1px solid var(--primary-cyan)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem'
        }}>
          <div>
            <span className="badge-pill" style={{ marginBottom: '0.5rem' }}>
              <Download size={14} /> FREE TRAVELER RESOURCE
            </span>
            <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.25rem' }}>
              Rekawa Eco-Tourist Pocket Guide (PDF / Printable)
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Includes emergency contacts, nesting calendar, tuk-tuk routes, and local homestay list.
            </p>
          </div>

          <button
            onClick={() => alert("Downloading Rekawa Eco-Tourist Guide (PDF format)... Thank you for supporting wild turtle conservation!")}
            className="btn-primary"
          >
            <Download size={18} /> Download Eco Guide
          </button>
        </div>

      </div>
    </section>
  );
}
