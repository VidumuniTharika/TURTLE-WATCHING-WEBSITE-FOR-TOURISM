import React, { useState } from 'react';
import { Eye, ShieldAlert, Sparkles, Moon, Sun, Flashlight, CheckCircle2, AlertTriangle, ChevronRight, Info } from 'lucide-react';

export default function TurtleSimulator() {
  const [activeStep, setActiveStep] = useState(0);
  const [redLightMode, setRedLightMode] = useState(true);
  const [selectedSpecies, setSelectedSpecies] = useState('green');

  const speciesInfo = {
    green: {
      name: 'Green Sea Turtle (Chelonia mydas)',
      sinhalaName: 'Veli Kassa',
      status: 'Endangered',
      nestingFreq: 'Most common in Rekawa',
      desc: 'Known for their large smooth carapace and heart-shaped shell. They crawl ashore slowly under cover of darkness to lay up to 100-120 eggs.',
      color: '#00d2c4'
    },
    leatherback: {
      name: 'Leatherback Turtle (Dermochelys coriacea)',
      sinhalaName: 'Dhara Kassa',
      status: 'Critically Endangered',
      nestingFreq: 'Rare & Special Sighting',
      desc: 'The largest living sea turtle on Earth! Instead of a hard shell, they have a thick leathery skin with 7 distinctive longitudinal ridges.',
      color: '#00f2fe'
    },
    ridley: {
      name: 'Olive Ridley Turtle (Lepidochelys olivacea)',
      sinhalaName: 'Mada Kassa',
      status: 'Vulnerable',
      nestingFreq: 'Frequent Nesting Visitor',
      desc: 'Smaller sea turtles with an olive-green heart-shaped carapace. Famous for their synchronized nesting behavior.',
      color: '#f6d365'
    },
    loggerhead: {
      name: 'Loggerhead Turtle (Caretta caretta)',
      sinhalaName: 'Olugu Kassa',
      status: 'Vulnerable',
      nestingFreq: 'Occasional Visitor',
      desc: 'Named for their massive heads and powerful jaws used to crush hard-shelled prey like crabs and sea urchins.',
      color: '#ff6b6b'
    },
    hawksbill: {
      name: 'Hawksbill Turtle (Eretmochelys imbricata)',
      sinhalaName: 'Pothu Kassa',
      status: 'Critically Endangered',
      nestingFreq: 'Rare coastal visits',
      desc: 'Recognizable by their sharp curved beak and striking amber & gold patterned carapace scales.',
      color: '#e2b714'
    }
  };

  const steps = [
    {
      title: 'Step 1: Night Beach Patrol',
      time: '8:30 PM - 10:00 PM',
      desc: 'Walk quietly along Rekawa Beach led by trained local community nest protectors. Turn off all white flashlights and phones to protect sea turtle navigation.',
      action: 'Patrol Beach in Red Light Mode',
      tip: 'Sea turtles are extremely sensitive to white light and will return to the sea without laying eggs if startled.'
    },
    {
      title: 'Step 2: Spotting Crawl Tracks',
      time: '10:15 PM',
      desc: 'Notice tractor-like track marks extending from the roaring Indian Ocean surf up into the dry coastal sand dunes.',
      action: 'Follow Tracks Quietly',
      tip: 'Wait until the turtle finishes crawling and begins digging her nest before approaching.'
    },
    {
      title: 'Step 3: Egg Chamber Excavation',
      time: '10:45 PM',
      desc: 'The female turtle uses her rear flippers to scoop out a flask-shaped egg pit roughly 50cm deep in the warm sand.',
      action: 'Observe Egg Laying Stage',
      tip: 'During the egg-laying trance, the turtle enters a state of deep focus. Maintain a respectful distance behind her.'
    },
    {
      title: 'Step 4: Camouflaging & Ocean Return',
      time: '11:30 PM',
      desc: 'She carefully covers the nest with sand and sweeps her flippers to disguise the location from predators before making her slow journey back to the waves.',
      action: 'Wish Her Safe Journey',
      tip: 'Your entry ticket directly pays former egg poachers to act as 24/7 nest guards to safeguard eggs from wild monitor lizards.'
    }
  ];

  return (
    <section id="turtle-watch" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textTransform: 'center', textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem auto' }}>
          <div className="badge-pill" style={{ marginBottom: '1rem' }}>
            <Moon size={14} /> ETHICAL ECO-TOURISM SIMULATOR
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#fff', marginBottom: '1rem' }}>
            Interactive <span className="gradient-text">Night Turtle Patrol</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7' }}>
            Unlike commercial hatcheries with concrete tanks, Rekawa protects sea turtles naturally on the wild open beach. Experience how foreign tourists participate in ethical, low-light night patrols.
          </p>
        </div>

        {/* Red Torch Light Control Panel */}
        <div className="glass-panel" style={{
          padding: '1.5rem 2rem',
          marginBottom: '3rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          background: redLightMode ? 'rgba(40, 10, 15, 0.75)' : 'var(--bg-card)',
          borderColor: redLightMode ? 'rgba(255, 100, 100, 0.4)' : 'var(--border-glass)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: redLightMode ? 'rgba(255, 50, 50, 0.25)' : 'rgba(0, 242, 254, 0.15)',
              border: redLightMode ? '1px solid #ff4d4d' : '1px solid var(--primary-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: redLightMode ? '#ff4d4d' : 'var(--primary-cyan)'
            }}>
              <Flashlight size={24} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '2px' }}>
                {redLightMode ? '🔴 Red Torch Light Mode Active' : '⚪ White Light Mode (Prohibited on Beach)'}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {redLightMode ? 'Required by Sri Lanka Wildlife Dept — preserves turtle vision.' : 'Warning: White flashlights turn nesting turtles away back to sea!'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setRedLightMode(!redLightMode)}
            style={{
              padding: '0.65rem 1.35rem',
              borderRadius: '9999px',
              border: redLightMode ? '1px solid #ff4d4d' : '1px solid var(--border-glass)',
              background: redLightMode ? '#ff4d4d' : 'rgba(255,255,255,0.08)',
              color: redLightMode ? '#fff' : 'var(--text-main)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {redLightMode ? 'Switch to Normal View' : 'Enable Red Torch Filter'}
          </button>
        </div>

        {/* Main Patrol Interactive Stepper */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          
          {/* Stepper Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {steps.map((step, idx) => (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  cursor: 'pointer',
                  borderLeft: activeStep === idx 
                    ? `4px solid ${redLightMode ? '#ff4d4d' : 'var(--primary-cyan)'}` 
                    : '1px solid var(--border-glass)',
                  background: activeStep === idx 
                    ? (redLightMode ? 'rgba(50, 15, 20, 0.85)' : 'rgba(12, 28, 58, 0.85)') 
                    : 'var(--bg-card)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: redLightMode ? '#ff7777' : 'var(--primary-cyan)' }}>
                    {step.time}
                  </span>
                  <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem', borderRadius: '12px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>
                    Step {idx + 1} of 4
                  </span>
                </div>
                <h4 style={{ color: '#fff', fontSize: '1.15rem', marginBottom: '0.5rem' }}>{step.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Active Step Preview Window */}
          <div className="glass-panel" style={{
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: redLightMode ? 'rgba(30, 8, 12, 0.95)' : 'rgba(6, 15, 33, 0.95)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', marginBottom: '1rem', fontSize: '0.85rem' }}>
                <Sparkles size={16} /> PATROL SIMULATOR INTERACTION
              </div>
              <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '1rem' }}>
                {steps[activeStep].title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '2rem', lineHeight: '1.7' }}>
                {steps[activeStep].desc}
              </p>

              {/* Pro Tip Box */}
              <div style={{
                padding: '1.25rem',
                borderRadius: '16px',
                background: redLightMode ? 'rgba(255, 77, 77, 0.1)' : 'rgba(0, 242, 254, 0.08)',
                border: redLightMode ? '1px solid rgba(255, 77, 77, 0.3)' : '1px solid rgba(0, 242, 254, 0.2)',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: redLightMode ? '#ff7777' : 'var(--primary-cyan)', fontWeight: 700, marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                  <Info size={16} /> Eco Patrol Protocol
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                  {steps[activeStep].tip}
                </p>
              </div>
            </div>

            {/* Next Step Button */}
            <button
              onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
              className="btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                background: redLightMode ? 'linear-gradient(135deg, #ff4d4d, #cc0000)' : 'linear-gradient(135deg, var(--primary-cyan), var(--primary-blue))',
                color: redLightMode ? '#fff' : '#040814'
              }}
            >
              Advance Patrol ({activeStep + 1}/4) <ChevronRight size={18} />
            </button>
          </div>

        </div>

        {/* 5 Nesting Species Showcase Selector */}
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '0.5rem' }}>
              Meet The 5 Species Of <span className="gradient-gold">Rekawa Sea Turtles</span>
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Rekawa is one of the few places on Earth where five out of seven world sea turtle species nest on the same beach.
            </p>
          </div>

          {/* Species Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
            {Object.keys(speciesInfo).map((key) => {
              const sp = speciesInfo[key];
              const isSelected = selectedSpecies === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedSpecies(key)}
                  style={{
                    padding: '0.65rem 1.25rem',
                    borderRadius: '9999px',
                    border: isSelected ? `1px solid ${sp.color}` : '1px solid var(--border-glass)',
                    background: isSelected ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
                    color: isSelected ? '#fff' : 'var(--text-muted)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: sp.color }}></span>
                  {sp.name.split(' (')[0]}
                </button>
              );
            })}
          </div>

          {/* Selected Species Detail Card */}
          {speciesInfo[selectedSpecies] && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              padding: '1.75rem',
              borderRadius: '20px',
              background: 'rgba(4, 10, 24, 0.8)',
              border: `1px solid ${speciesInfo[selectedSpecies].color}44`
            }}>
              <div>
                <div style={{ fontSize: '0.85rem', color: speciesInfo[selectedSpecies].color, fontWeight: 700, marginBottom: '4px' }}>
                  SINHALA NAME: {speciesInfo[selectedSpecies].sinhalaName}
                </div>
                <h4 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.75rem' }}>
                  {speciesInfo[selectedSpecies].name}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {speciesInfo[selectedSpecies].desc}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', justifyLeft: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <ShieldAlert size={20} style={{ color: speciesInfo[selectedSpecies].color }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>CONSERVATION STATUS</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{speciesInfo[selectedSpecies].status}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Sparkles size={20} style={{ color: 'var(--accent-gold)' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>REKAWA FREQUENCY</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{speciesInfo[selectedSpecies].nestingFreq}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
