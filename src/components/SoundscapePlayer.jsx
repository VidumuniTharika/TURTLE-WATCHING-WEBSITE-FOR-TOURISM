import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Radio, Sparkles, Sliders, Waves, Moon } from 'lucide-react';

export default function SoundscapePlayer({ isPlaying, setIsPlaying }) {
  const [volume, setVolume] = useState(0.5);
  const [preset, setPreset] = useState('ocean'); // 'ocean', 'night', 'breeze'
  const [showControls, setShowControls] = useState(false);
  
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const waveOscRef = useRef(null);
  const noiseNodeRef = useRef(null);

  // Initialize Web Audio Synthesizer
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;
    }
  };

  const startSoundscape = () => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Create Pink Noise for Waves
    const bufferSize = ctx.sampleRate * 3;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11;
      b6 = white * 0.115926;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to simulate ocean wave swells
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, ctx.currentTime);

    // LFO for wave swelling rhythm (every ~6-8 seconds)
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.15, ctx.currentTime); // Wave swell frequency
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(300, ctx.currentTime);
    
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    whiteNoise.connect(filter);
    filter.connect(gainNodeRef.current);

    whiteNoise.start();
    lfo.start();

    noiseNodeRef.current = whiteNoise;
    waveOscRef.current = lfo;
  };

  const stopSoundscape = () => {
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSoundscape();
      setIsPlaying(false);
    } else {
      startSoundscape();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 99,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '8px'
    }}>
      {/* Expanded Control Box */}
      {showControls && (
        <div className="glass-panel" style={{
          padding: '1.25rem',
          width: '280px',
          borderRadius: '20px',
          background: 'rgba(6, 13, 27, 0.92)',
          border: '1px solid rgba(0, 242, 254, 0.2)',
          marginBottom: '8px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.8)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-cyan)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} /> REKAWA ACOUSTICS
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Synthesized Audio
            </span>
          </div>

          {/* Volume Slider */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <span>Volume</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              style={{
                width: '100%',
                accentColor: 'var(--primary-cyan)',
                cursor: 'pointer'
              }}
            />
          </div>

          {/* Sound Preset Selector */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {[
              { id: 'ocean', label: 'Waves', icon: Waves },
              { id: 'night', label: 'Night Beach', icon: Moon },
              { id: 'breeze', label: 'Breeze', icon: Radio }
            ].map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setPreset(item.id)}
                  style={{
                    flex: 1,
                    padding: '0.4rem 0.2rem',
                    borderRadius: '10px',
                    border: preset === item.id ? '1px solid var(--primary-cyan)' : '1px solid rgba(255,255,255,0.08)',
                    background: preset === item.id ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255,255,255,0.03)',
                    color: preset === item.id ? 'var(--primary-cyan)' : 'var(--text-muted)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <IconComp size={14} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Floating Trigger Pill */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={() => setShowControls(!showControls)}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(6, 13, 27, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)'
          }}
          title="Soundscape Settings"
        >
          <Sliders size={18} />
        </button>

        <button
          onClick={togglePlay}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.65rem 1.25rem',
            borderRadius: '9999px',
            background: isPlaying 
              ? 'linear-gradient(135deg, rgba(0,242,254,0.9), rgba(0,102,255,0.9))' 
              : 'rgba(6, 13, 27, 0.85)',
            border: isPlaying ? '1px solid var(--primary-cyan)' : '1px solid rgba(255,255,255,0.15)',
            color: isPlaying ? '#040814' : 'var(--text-main)',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            boxShadow: isPlaying ? '0 0 25px rgba(0, 242, 254, 0.5)' : '0 10px 25px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease'
          }}
        >
          {isPlaying ? <Volume2 size={18} className="animate-bounce" /> : <VolumeX size={18} />}
          <span>{isPlaying ? 'Rekawa Waves Audio ON' : 'Play Ocean Ambiance'}</span>
        </button>
      </div>
    </div>
  );
}
