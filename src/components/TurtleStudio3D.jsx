import React, { useRef, useState, useMemo, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, Sliders, Play, Pause, Sun, Moon, Maximize2, Shield, Eye, Info, RotateCw, RefreshCw, Layers } from 'lucide-react';

// Species Configuration Database
const SPECIES_PRESETS = {
  green: {
    name: 'Green Sea Turtle (Chelonia mydas)',
    sinhala: 'Veli Kassa',
    carapaceBase: '#1a4731',
    scuteLines: '#7bb892',
    skinColor: '#123625',
    bellyColor: '#e3d7b8',
    eyeColor: '#00f2fe',
    scale: 1.2,
    desc: 'Famous for its heart-shaped carapace, olive-green hue, and smooth radiating growth ring scutes.'
  },
  hawksbill: {
    name: 'Hawksbill Turtle (Eretmochelys imbricata)',
    sinhala: 'Pothu Kassa',
    carapaceBase: '#b85e14',
    scuteLines: '#f4a261',
    skinColor: '#6e3408',
    bellyColor: '#e6b578',
    eyeColor: '#ffd166',
    scale: 1.1,
    desc: 'Distinctive overlapping tortoiseshell scutes with rich golden-amber patterns and a sharp curved beak.'
  },
  leatherback: {
    name: 'Leatherback Turtle (Dermochelys coriacea)',
    sinhala: 'Dhara Kassa',
    carapaceBase: '#0b1424',
    scuteLines: '#00f2fe',
    skinColor: '#132033',
    bellyColor: '#9ec5fe',
    eyeColor: '#00f2fe',
    scale: 1.55,
    desc: 'The largest sea turtle on Earth. Has a tough leathery skin with 7 distinct longitudinal ridges instead of a hard shell.'
  },
  ridley: {
    name: 'Olive Ridley Turtle (Lepidochelys olivacea)',
    sinhala: 'Mada Kassa',
    carapaceBase: '#3c5443',
    scuteLines: '#7ca683',
    skinColor: '#25382b',
    bellyColor: '#c5d9c8',
    eyeColor: '#a7c957',
    scale: 1.0,
    desc: 'Compact heart-shaped shell with a muted mossy green color and fine reptilian scale patterns.'
  },
  loggerhead: {
    name: 'Loggerhead Turtle (Caretta caretta)',
    sinhala: 'Olugu Kassa',
    carapaceBase: '#803218',
    scuteLines: '#e76f51',
    skinColor: '#521f0e',
    bellyColor: '#f4a261',
    eyeColor: '#ffb703',
    scale: 1.35,
    desc: 'Recognizable by its heavy reddish-brown shell and massive muscular head used to crush crustaceans.'
  }
};

// Lighting Environment Presets
const LIGHTING_PRESETS = {
  bioluminescent: {
    name: 'Bioluminescent Ocean',
    bg: 'radial-gradient(circle at 50% 35%, #0a1f3d 0%, #040914 80%)',
    ambient: 0.65,
    dirColor: '#00f2fe',
    dirIntensity: 1.6,
    pointColor: '#0066ff',
    icon: Moon
  },
  sunset: {
    name: 'Sri Lankan Sunset',
    bg: 'radial-gradient(circle at 50% 35%, #3d1b10 0%, #0c050a 80%)',
    ambient: 0.8,
    dirColor: '#ff9e00',
    dirIntensity: 2.0,
    pointColor: '#ff4800',
    icon: Sun
  },
  studio: {
    name: 'Studio Inspection Light',
    bg: 'radial-gradient(circle at 50% 35%, #1e293b 0%, #0f172a 80%)',
    ambient: 1.0,
    dirColor: '#ffffff',
    dirIntensity: 2.2,
    pointColor: '#38bdf8',
    icon: Sparkles
  }
};

// Procedural Organic Texture Generator
function generateStudioTextures(speciesKey, scuteDensity = 1.0) {
  const config = SPECIES_PRESETS[speciesKey] || SPECIES_PRESETS.green;
  
  const cCanvas = document.createElement('canvas');
  cCanvas.width = 512;
  cCanvas.height = 512;
  const cCtx = cCanvas.getContext('2d');

  cCtx.fillStyle = config.carapaceBase;
  cCtx.fillRect(0, 0, 512, 512);

  cCtx.strokeStyle = config.scuteLines;
  cCtx.lineWidth = 4 * scuteDensity;
  cCtx.globalAlpha = 0.65;

  const centers = [
    [256, 120], [256, 256], [256, 390],
    [140, 180], [372, 180], [140, 320], [372, 320]
  ];

  centers.forEach(([cx, cy]) => {
    for (let r = 12; r < 55; r += 10) {
      cCtx.beginPath();
      cCtx.arc(cx, cy, r, 0, Math.PI * 2);
      cCtx.stroke();
    }
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
      cCtx.beginPath();
      cCtx.moveTo(cx, cy);
      cCtx.lineTo(cx + Math.cos(a) * 50, cy + Math.sin(a) * 50);
      cCtx.stroke();
    }
  });

  const bCanvas = document.createElement('canvas');
  bCanvas.width = 512;
  bCanvas.height = 512;
  const bCtx = bCanvas.getContext('2d');
  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, 512, 512);
  bCtx.drawImage(cCanvas, 0, 0);

  const textureMap = new THREE.CanvasTexture(cCanvas);
  const bumpMap = new THREE.CanvasTexture(bCanvas);
  textureMap.wrapS = textureMap.wrapT = THREE.RepeatWrapping;
  bumpMap.wrapS = bumpMap.wrapT = THREE.RepeatWrapping;

  return { textureMap, bumpMap };
}

// Articulated Isolated 3D Turtle Model
function IsolatedTurtleModel({ speciesKey, roughness, bumpDepth, isSwimming, swimSpeed, flapAmp }) {
  const turtleGroupRef = useRef();
  const neckRef = useRef();
  const leftArmRef = useRef();
  const leftTipRef = useRef();
  const rightArmRef = useRef();
  const rightTipRef = useRef();
  const leftRearRef = useRef();
  const rightRearRef = useRef();

  const config = SPECIES_PRESETS[speciesKey] || SPECIES_PRESETS.green;
  const { textureMap, bumpMap } = useMemo(() => generateStudioTextures(speciesKey), [speciesKey]);

  useFrame((state) => {
    if (!isSwimming) return;
    
    const t = state.clock.getElapsedTime() * swimSpeed;
    
    if (turtleGroupRef.current) {
      turtleGroupRef.current.position.y = Math.sin(t * 0.7) * 0.2;
      turtleGroupRef.current.rotation.z = Math.sin(t * 0.5) * 0.07;
      turtleGroupRef.current.rotation.x = Math.sin(t * 1.4) * 0.04;
    }

    if (neckRef.current) {
      neckRef.current.rotation.y = Math.sin(t * 0.6) * 0.08;
    }

    const strokePhase = t * 1.8;
    const flapZ = (Math.sin(strokePhase) * 0.38 + 0.15) * flapAmp;
    const twistX = Math.cos(strokePhase) * 0.22;

    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.z = flapZ;
      leftArmRef.current.rotation.x = twistX;
      rightArmRef.current.rotation.z = -flapZ;
      rightArmRef.current.rotation.x = twistX;
    }

    if (leftTipRef.current && rightTipRef.current) {
      const flexZ = Math.sin(strokePhase - 0.6) * 0.22 * flapAmp;
      leftTipRef.current.rotation.z = flexZ;
      rightTipRef.current.rotation.z = -flexZ;
    }

    if (leftRearRef.current && rightRearRef.current) {
      const rearZ = Math.sin(t * 1.4) * 0.1 * flapAmp;
      leftRearRef.current.rotation.z = rearZ;
      rightRearRef.current.rotation.z = -rearZ;
    }
  });

  return (
    <group ref={turtleGroupRef} position={[0, -0.2, 0]} scale={[config.scale, config.scale, config.scale]}>
      {/* Upper Carapace */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1.2, 36, 28]} />
        <meshStandardMaterial 
          map={textureMap}
          bumpMap={bumpMap}
          bumpScale={bumpDepth}
          color={config.carapaceBase}
          roughness={roughness}
          metalness={0.15}
        />
      </mesh>

      {/* Leatherback Ridges or Hard Scutes */}
      {speciesKey === 'leatherback' ? (
        <group position={[0, 0.22, 0]}>
          {[-0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6].map((xPos, idx) => (
            <mesh key={idx} position={[xPos, 0, 0]}>
              <boxGeometry args={[0.04, 1.2, 2.1]} />
              <meshStandardMaterial color={config.scuteLines} emissive={config.scuteLines} emissiveIntensity={0.6} />
            </mesh>
          ))}
        </group>
      ) : (
        <mesh position={[0, 0.22, 0]}>
          <sphereGeometry args={[1.21, 18, 14]} />
          <meshStandardMaterial 
            color={config.scuteLines} 
            wireframe={true} 
            emissive={config.scuteLines}
            emissiveIntensity={0.4}
          />
        </mesh>
      )}

      {/* Underbelly Plastron */}
      <mesh position={[0, -0.18, 0]} scale={[0.9, 0.35, 0.9]}>
        <sphereGeometry args={[1.1, 20, 16]} />
        <meshStandardMaterial color={config.bellyColor} roughness={0.45} />
      </mesh>

      {/* Articulated Neck & Head */}
      <group ref={neckRef} position={[0, 0.25, 1.1]}>
        <mesh position={[0, 0.05, 0.25]} scale={speciesKey === 'loggerhead' ? [1.3, 1.2, 1.3] : [1, 1, 1]}>
          <sphereGeometry args={[0.4, 24, 20]} />
          <meshStandardMaterial color={config.skinColor} roughness={0.4} />
        </mesh>

        {speciesKey === 'hawksbill' && (
          <mesh position={[0, -0.05, 0.55]} rotation={[0.4, 0, 0]}>
            <coneGeometry args={[0.16, 0.38, 16]} />
            <meshStandardMaterial color="#d48817" roughness={0.3} />
          </mesh>
        )}

        <mesh position={[0.2, 0.12, 0.4]}>
          <sphereGeometry args={[0.07, 14, 14]} />
          <meshBasicMaterial color={config.eyeColor} />
        </mesh>
        <mesh position={[-0.2, 0.12, 0.4]}>
          <sphereGeometry args={[0.07, 14, 14]} />
          <meshBasicMaterial color={config.eyeColor} />
        </mesh>
      </group>

      {/* Articulated Flippers */}
      <group ref={leftArmRef} position={[1.0, 0.1, 0.5]}>
        <mesh position={[0.45, 0, 0]} rotation={[0.2, 0.3, 0]}>
          <boxGeometry args={[0.9, 0.08, 0.45]} />
          <meshStandardMaterial color={config.skinColor} roughness={0.4} />
        </mesh>
        <group ref={leftTipRef} position={[0.9, 0, 0]}>
          <mesh position={[0.35, 0, 0]} rotation={[0.1, 0.2, 0]}>
            <boxGeometry args={[0.7, 0.06, 0.35]} />
            <meshStandardMaterial color={config.skinColor} roughness={0.4} />
          </mesh>
        </group>
      </group>

      <group ref={rightArmRef} position={[-1.0, 0.1, 0.5]}>
        <mesh position={[-0.45, 0, 0]} rotation={[0.2, -0.3, 0]}>
          <boxGeometry args={[0.9, 0.08, 0.45]} />
          <meshStandardMaterial color={config.skinColor} roughness={0.4} />
        </mesh>
        <group ref={rightTipRef} position={[-0.9, 0, 0]}>
          <mesh position={[-0.35, 0, 0]} rotation={[0.1, -0.2, 0]}>
            <boxGeometry args={[0.7, 0.06, 0.35]} />
            <meshStandardMaterial color={config.skinColor} roughness={0.4} />
          </mesh>
        </group>
      </group>

      {/* Rear Flippers */}
      <group ref={leftRearRef} position={[0.55, 0.05, -1.15]}>
        <mesh rotation={[-0.2, -0.3, 0]}>
          <boxGeometry args={[0.55, 0.07, 0.75]} />
          <meshStandardMaterial color={config.skinColor} />
        </mesh>
      </group>
      <group ref={rightRearRef} position={[-0.55, 0.05, -1.15]}>
        <mesh rotation={[-0.2, 0.3, 0]}>
          <boxGeometry args={[0.55, 0.07, 0.75]} />
          <meshStandardMaterial color={config.skinColor} />
        </mesh>
      </group>
    </group>
  );
}

export default function TurtleStudio3D() {
  const [species, setSpecies] = useState('green');
  const [lighting, setLighting] = useState('bioluminescent');
  const [roughness, setRoughness] = useState(0.25);
  const [bumpDepth, setBumpDepth] = useState(0.06);
  const [isSwimming, setIsSwimming] = useState(true);
  const [swimSpeed, setSwimSpeed] = useState(1.0);
  const [flapAmp, setFlapAmp] = useState(1.0);
  const [activeTab, setActiveTab] = useState('textures'); // 'textures', 'motion', 'lighting'

  const activeLight = LIGHTING_PRESETS[lighting];
  const activeSpecies = SPECIES_PRESETS[species];

  return (
    <section id="studio3d" style={{ padding: '6rem 0', background: 'rgba(2, 6, 16, 0.85)', borderTop: '1px solid rgba(0, 242, 254, 0.2)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <div className="badge-pill" style={{ marginBottom: '1rem' }}>
            <RotateCw size={14} className="animate-spin" /> ISOLATED 3D MODEL STUDIO & INSPECTOR
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#fff', marginBottom: '1rem' }}>
            Real Turtle <span className="gradient-text">3D Inspector Studio</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7' }}>
            Isolate and inspect Sri Lanka’s 5 sea turtle species in 360°. Customize shell glossiness, scute 3D ridge depth, lighting, and hydrofoil swimming kinematics until it feels 100% real.
          </p>
        </div>

        {/* Studio Workspace Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>
          
          {/* 3D Viewport Box */}
          <div className="glass-panel" style={{
            position: 'relative',
            height: '520px',
            borderRadius: '24px',
            overflow: 'hidden',
            background: activeLight.bg,
            border: '1px solid rgba(0, 242, 254, 0.35)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.8)'
          }}>
            {/* Viewport Control Badge */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              zIndex: 10,
              background: 'rgba(4, 10, 24, 0.85)',
              backdropFilter: 'blur(10px)',
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              border: '1px solid rgba(0,242,254,0.3)',
              fontSize: '0.8rem',
              color: '#fff',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-cyan)' }}></span>
              360° DRAG TO ROTATE & SCROLL TO ZOOM
            </div>

            {/* Three.js Canvas */}
            <Canvas camera={{ position: [0, 1.2, 4.5], fov: 45 }}>
              <ambientLight intensity={activeLight.ambient} />
              <directionalLight position={[5, 8, 5]} intensity={activeLight.dirIntensity} color={activeLight.dirColor} />
              <pointLight position={[-5, -3, -4]} intensity={1.5} color={activeLight.pointColor} />

              <IsolatedTurtleModel 
                speciesKey={species}
                roughness={roughness}
                bumpDepth={bumpDepth}
                isSwimming={isSwimming}
                swimSpeed={swimSpeed}
                flapAmp={flapAmp}
              />

              <OrbitControls enableZoom={true} enablePan={true} maxDistance={8} minDistance={2.2} />
            </Canvas>

            {/* Bottom Info Banner */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
              zIndex: 10,
              background: 'rgba(4, 10, 24, 0.9)',
              backdropFilter: 'blur(12px)',
              padding: '0.85rem 1.25rem',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#fff',
              fontSize: '0.85rem'
            }}>
              <div>
                <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>{activeSpecies.sinhala}</span> • {activeSpecies.name}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Scale: {activeSpecies.scale}x
              </div>
            </div>
          </div>

          {/* Inspector Control Panel */}
          <div className="glass-panel" style={{ padding: '2rem', background: 'rgba(6, 13, 27, 0.9)' }}>
            
            {/* Species Selector Tabs */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-cyan)', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={16} /> 1. SELECT TURTLE SPECIES
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {Object.keys(SPECIES_PRESETS).map((key) => {
                  const sp = SPECIES_PRESETS[key];
                  const isSel = species === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSpecies(key)}
                      style={{
                        padding: '0.5rem 0.85rem',
                        borderRadius: '12px',
                        border: isSel ? `2px solid ${sp.scuteLines}` : '1px solid rgba(255, 255, 255, 0.1)',
                        background: isSel ? 'rgba(0, 242, 254, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                        color: isSel ? '#ffffff' : 'var(--text-muted)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: sp.carapaceBase }}></span>
                      {sp.name.split(' (')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mode Tab Switcher */}
            <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '14px', marginBottom: '1.75rem' }}>
              {[
                { id: 'textures', label: 'Textures & Shell' },
                { id: 'motion', label: 'Hydrofoil Motion' },
                { id: 'lighting', label: 'Lighting Studio' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    borderRadius: '10px',
                    border: 'none',
                    background: activeTab === tab.id ? 'var(--primary-cyan)' : 'transparent',
                    color: activeTab === tab.id ? '#040814' : 'var(--text-muted)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: TEXTURES & SHELL */}
            {activeTab === 'textures' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#fff', marginBottom: '4px' }}>
                    <span>Shell Glossiness / Wet Sheen</span>
                    <span style={{ color: 'var(--primary-cyan)' }}>{Math.round((1 - roughness) * 100)}% Wet</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.85"
                    step="0.01"
                    value={roughness}
                    onChange={(e) => setRoughness(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--primary-cyan)', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                    <span>Matte Dry Beach</span>
                    <span>Glistening Ocean Wet</span>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#fff', marginBottom: '4px' }}>
                    <span>Scute 3D Groove Bump Depth</span>
                    <span style={{ color: 'var(--accent-gold)' }}>{Math.round(bumpDepth * 1000)} mm</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="0.15"
                    step="0.005"
                    value={bumpDepth}
                    onChange={(e) => setBumpDepth(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent-gold)', cursor: 'pointer' }}
                  />
                </div>

                <div style={{ padding: '1rem', borderRadius: '14px', background: 'rgba(4, 10, 24, 0.7)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 700, marginBottom: '2px' }}>SPECIES ANATOMY NOTE</div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    {activeSpecies.desc}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: HYDROFOIL MOTION */}
            {activeTab === 'motion' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <button
                  onClick={() => setIsSwimming(!isSwimming)}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '14px',
                    border: isSwimming ? '1px solid var(--primary-cyan)' : '1px solid var(--border-glass)',
                    background: isSwimming ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255,255,255,0.05)',
                    color: isSwimming ? 'var(--primary-cyan)' : 'var(--text-muted)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {isSwimming ? <Pause size={18} /> : <Play size={18} />}
                  <span>{isSwimming ? 'Pause Swimming Biomechanics' : 'Play Hydrofoil Swimming Stroke'}</span>
                </button>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#fff', marginBottom: '4px' }}>
                    <span>Swimming Speed</span>
                    <span style={{ color: 'var(--primary-cyan)' }}>{swimSpeed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.1"
                    value={swimSpeed}
                    onChange={(e) => setSwimSpeed(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--primary-cyan)', cursor: 'pointer' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#fff', marginBottom: '4px' }}>
                    <span>Flipper Stroke Amplitude</span>
                    <span style={{ color: 'var(--accent-gold)' }}>{Math.round(flapAmp * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.3"
                    max="1.8"
                    step="0.1"
                    value={flapAmp}
                    onChange={(e) => setFlapAmp(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent-gold)', cursor: 'pointer' }}
                  />
                </div>
              </div>
            )}

            {/* TAB 3: LIGHTING STUDIO */}
            {activeTab === 'lighting' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {Object.keys(LIGHTING_PRESETS).map((key) => {
                  const lp = LIGHTING_PRESETS[key];
                  const IconComp = lp.icon;
                  const isSelected = lighting === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setLighting(key)}
                      style={{
                        padding: '0.85rem 1rem',
                        borderRadius: '14px',
                        border: isSelected ? '1px solid var(--primary-cyan)' : '1px solid rgba(255, 255, 255, 0.08)',
                        background: isSelected ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        color: isSelected ? '#ffffff' : 'var(--text-muted)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <IconComp size={18} style={{ color: isSelected ? 'var(--primary-cyan)' : 'var(--text-muted)' }} />
                      <span>{lp.name}</span>
                    </button>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
