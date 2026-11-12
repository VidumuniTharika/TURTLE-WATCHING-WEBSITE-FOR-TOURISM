import React, { useRef, useState, useMemo, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, Eye, Compass, ChevronDown, Waves, Heart, ShieldCheck, Plus } from 'lucide-react';

// Error Boundary for WebGL
class ThreeErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("WebGL 3D Canvas Error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-cyan)', fontSize: '0.9rem' }}>
          3D Sea Canvas Fallback Mode Active
        </div>
      );
    }
    return this.props.children;
  }
}

// 4K Photorealistic Sea Turtle Texture Generator
function generate4KPBRTextures(species = 'green') {
  const cCanvas = document.createElement('canvas');
  cCanvas.width = 512;
  cCanvas.height = 512;
  const ctx = cCanvas.getContext('2d');

  const colors = species === 'hawksbill' 
    ? { base: '#b55812', scute: '#f4a261', streak: '#5e2a04', skin: '#78380b' }
    : { base: '#1b4731', scute: '#7bb892', streak: '#0d291b', skin: '#123625' };

  ctx.fillStyle = colors.base;
  ctx.fillRect(0, 0, 512, 512);

  ctx.lineWidth = 4;
  ctx.globalAlpha = 0.6;
  const centers = [
    [256, 120], [256, 256], [256, 390],
    [140, 180], [372, 180], [140, 320], [372, 320]
  ];

  centers.forEach(([cx, cy]) => {
    for (let r = 15; r < 55; r += 12) {
      ctx.strokeStyle = colors.scute;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  });

  const carapaceTexture = new THREE.CanvasTexture(cCanvas);
  carapaceTexture.wrapS = carapaceTexture.wrapT = THREE.RepeatWrapping;

  return { carapaceTexture };
}

// 3D Turtle Model Swimming in the Sea
function SeaTurtleInSea({ species = 'green', basePosition = [0, 0, 0], scale = 1.0, mousePosition, mouseTrack = false, isBaby = false }) {
  const turtleRef = useRef();
  const neckRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const leftTipRef = useRef();
  const rightTipRef = useRef();

  const { carapaceTexture } = useMemo(() => generate4KPBRTextures(species), [species]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (turtleRef.current) {
      // Natural Sea Water Glide
      turtleRef.current.position.y = basePosition[1] + Math.sin(t * 0.8) * (isBaby ? 0.18 : 0.22);
      turtleRef.current.position.x = basePosition[0] + Math.cos(t * 0.4) * 0.18;
      
      turtleRef.current.rotation.z = Math.sin(t * 0.5) * 0.09;
      turtleRef.current.rotation.x = Math.sin(t * 1.2) * 0.05;

      if (mouseTrack && mousePosition) {
        turtleRef.current.rotation.y = THREE.MathUtils.lerp(
          turtleRef.current.rotation.y,
          (mousePosition.x || 0) * 0.45,
          0.05
        );
      } else {
        turtleRef.current.rotation.y = Math.sin(t * 0.25) * 0.25;
      }
    }

    // Flipper Hydrofoil Water Stroke
    const strokePhase = t * (isBaby ? 3.5 : 1.8);
    const flapZ = Math.sin(strokePhase) * 0.42 + 0.15;
    const twistX = Math.cos(strokePhase) * 0.22;

    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.z = flapZ;
      leftArmRef.current.rotation.x = twistX;
      rightArmRef.current.rotation.z = -flapZ;
      rightArmRef.current.rotation.x = twistX;
    }

    if (leftTipRef.current && rightTipRef.current) {
      const flexZ = Math.sin(strokePhase - 0.6) * 0.22;
      leftTipRef.current.rotation.z = flexZ;
      rightTipRef.current.rotation.z = -flexZ;
    }
  });

  return (
    <group ref={turtleRef} position={basePosition} scale={[scale, scale, scale]}>
      {/* Shell with Wet Sea Water Clearcoat */}
      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1.2, 32, 24]} />
        <meshPhysicalMaterial 
          map={carapaceTexture}
          color={species === 'hawksbill' ? '#b55812' : '#1b4731'}
          roughness={0.2}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
        />
      </mesh>

      {/* Underbelly */}
      <mesh position={[0, -0.18, 0]} scale={[0.9, 0.35, 0.9]}>
        <sphereGeometry args={[1.1, 20, 16]} />
        <meshPhysicalMaterial color="#e4d9bc" roughness={0.4} clearcoat={0.6} />
      </mesh>

      {/* Head & Eyes */}
      <group ref={neckRef} position={[0, 0.25, 1.1]}>
        <mesh position={[0, 0.05, 0.25]}>
          <sphereGeometry args={[0.4, 20, 16]} />
          <meshPhysicalMaterial color="#143626" roughness={0.35} clearcoat={0.7} />
        </mesh>
        <mesh position={[0.2, 0.12, 0.4]}>
          <sphereGeometry args={[0.075, 14, 14]} />
          <meshBasicMaterial color="#00f2fe" />
        </mesh>
        <mesh position={[-0.2, 0.12, 0.4]}>
          <sphereGeometry args={[0.075, 14, 14]} />
          <meshBasicMaterial color="#00f2fe" />
        </mesh>
      </group>

      {/* Front Flippers */}
      <group ref={leftArmRef} position={[1.0, 0.1, 0.5]}>
        <mesh position={[0.45, 0, 0]} rotation={[0.2, 0.3, 0]}>
          <boxGeometry args={[0.9, 0.08, 0.45]} />
          <meshPhysicalMaterial color="#143626" roughness={0.35} clearcoat={0.7} />
        </mesh>
        <group ref={leftTipRef} position={[0.9, 0, 0]}>
          <mesh position={[0.35, 0, 0]} rotation={[0.1, 0.2, 0]}>
            <boxGeometry args={[0.7, 0.06, 0.35]} />
            <meshPhysicalMaterial color="#143626" roughness={0.35} clearcoat={0.7} />
          </mesh>
        </group>
      </group>

      <group ref={rightArmRef} position={[-1.0, 0.1, 0.5]}>
        <mesh position={[-0.45, 0, 0]} rotation={[0.2, -0.3, 0]}>
          <boxGeometry args={[0.9, 0.08, 0.45]} />
          <meshPhysicalMaterial color="#143626" roughness={0.35} clearcoat={0.7} />
        </mesh>
        <group ref={rightTipRef} position={[-0.9, 0, 0]}>
          <mesh position={[-0.35, 0, 0]} rotation={[0.1, -0.2, 0]}>
            <boxGeometry args={[0.7, 0.06, 0.35]} />
            <meshPhysicalMaterial color="#143626" roughness={0.35} clearcoat={0.7} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// 3D Rising Sea Bubbles Component
function SeaBubbles3D() {
  const bubblesRef = useRef();
  const count = 90;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (bubblesRef.current) {
      const posArr = bubblesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        posArr[i * 3 + 1] += 0.02; // Rise up in sea
        if (posArr[i * 3 + 1] > 6) {
          posArr[i * 3 + 1] = -6; // Reset at bottom of sea
        }
      }
      bubblesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={bubblesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        color="#70d6ff"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// 3D Sea Floor Bed with Undulating Sea Kelp & Corals
function SeaBed3D() {
  return (
    <group position={[0, -3.2, 0]}>
      {/* Sandy Seabed Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[45, 45, 32, 32]} />
        <MeshWobbleMaterial
          color="#062e54"
          factor={0.4}
          speed={1.2}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>

      {/* Sea Kelp Plants */}
      {[-4, -2, 2, 4.5, -6, 6].map((x, i) => (
        <mesh key={i} position={[x, 1.2, -2 - (i % 3)]}>
          <cylinderGeometry args={[0.05, 0.12, 2.5, 8]} />
          <MeshWobbleMaterial color="#00a88e" factor={0.6} speed={2} />
        </mesh>
      ))}
    </group>
  );
}

export default function Hero3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [seaTurtleCount, setSeaTurtleCount] = useState(12);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: (clientX / innerWidth) * 2 - 1,
      y: -(clientY / innerHeight) * 2 + 1
    });
  };

  // Swarming Sea Turtles in the Sea
  const turtlesInSea = useMemo(() => {
    const list = [];
    for (let i = 0; i < seaTurtleCount; i++) {
      list.push({
        pos: [
          (Math.sin(i * 0.7) * 4.2),
          (Math.cos(i * 0.4) * 1.8) - 0.3,
          -1.0 - (i * 0.3)
        ],
        scale: 0.38 + (i % 3) * 0.08,
        species: i % 2 === 0 ? 'green' : 'hawksbill'
      });
    }
    return list;
  }, [seaTurtleCount]);

  return (
    <section 
      id="hero" 
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '80px',
        // REALISTIC DEEP OCEAN SEA WATER COLOR GRADIENT
        background: 'linear-gradient(180deg, #0d386b 0%, #061e3d 45%, #030c1c 100%)'
      }}
    >
      {/* 3D WebGL Underwater Sea Canvas */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}>
        <ThreeErrorBoundary>
          <Canvas camera={{ position: [0, 1.2, 5.5], fov: 50 }} gl={{ alpha: true, antialias: true }}>
            {/* Underwater Sea Water Fog & Lighting */}
            <fog attach="fog" args={['#061e3d', 3, 16]} />
            <ambientLight intensity={0.7} />
            
            {/* Sun Rays Filtering Down Through Sea Water Surface */}
            <directionalLight position={[0, 10, 2]} intensity={2.2} color="#00f2fe" />
            <pointLight position={[-6, -2, -4]} intensity={1.8} color="#0066ff" />
            <pointLight position={[6, 3, 2]} intensity={1.6} color="#00d2c4" />

            {/* Main Big Mother Sea Turtle Swimming in the Sea */}
            <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.45}>
              <SeaTurtleInSea 
                species="green"
                basePosition={[0, -0.1, 0]}
                scale={1.25}
                mousePosition={mousePosition}
                mouseTrack={true}
              />
            </Float>

            {/* Multiple Sea Turtles Swimming Together in the Sea */}
            {turtlesInSea.map((t, idx) => (
              <Float key={idx} speed={1.7 + (idx % 3) * 0.2} rotationIntensity={0.25} floatIntensity={0.5}>
                <SeaTurtleInSea 
                  species={t.species}
                  basePosition={t.pos}
                  scale={t.scale}
                  mousePosition={mousePosition}
                  isBaby={true}
                />
              </Float>
            ))}

            {/* Rising Sea Bubbles & Seabed */}
            <SeaBubbles3D />
            <SeaBed3D />

            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              maxPolarAngle={Math.PI / 2.1} 
              minPolarAngle={Math.PI / 3.2} 
            />
          </Canvas>
        </ThreeErrorBoundary>
      </div>

      {/* Hero UI Content Overlay */}
      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%', padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: '780px' }}>
          
          {/* Badge */}
          <div className="badge-pill" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
            <Waves size={14} /> REKAWA 3D DEEP SEA WATER SANCTUARY
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            lineHeight: 1.1,
            color: '#ffffff',
            marginBottom: '1.25rem',
            fontWeight: 800,
            textShadow: '0 4px 25px rgba(0,0,0,0.9)'
          }}>
            Explore Sea Turtles Swimming In The <span className="gradient-text">Indian Ocean Sea</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: '#cbd5e1',
            marginBottom: '2rem',
            lineHeight: 1.7,
            maxWidth: '660px',
            textShadow: '0 2px 10px rgba(0,0,0,0.9)'
          }}>
            Submerge into the turquoise waters of Rekawa, Sri Lanka. Watch mother and baby sea turtles swim through crystal clear sea currents, rising bubbles, and coral reefs.
          </p>

          {/* Sea Turtles Controller */}
          <div style={{
            background: 'rgba(6, 24, 52, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(0, 242, 254, 0.35)',
            borderRadius: '20px',
            padding: '1.25rem 1.5rem',
            marginBottom: '2.5rem',
            maxWidth: '680px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.7)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary-cyan)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                <Waves size={16} /> REKAWA DEEP SEA WATER ENVIRONMENT
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Turtles Swimming in Sea: <strong style={{ color: 'var(--accent-gold)', fontSize: '1rem' }}>{seaTurtleCount + 1} Turtles</strong>
              </div>
            </div>

            <button
              onClick={() => setSeaTurtleCount(prev => prev + 6)}
              className="btn-primary"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
            >
              <Plus size={16} /> Add +6 Turtles In Sea! 🐢
            </button>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '3rem' }}>
            <a href="#turtle-watch" className="btn-primary">
              <Eye size={18} /> Night Turtle Patrol Simulator
            </a>
            <a href="#lagoon" className="btn-secondary">
              <Compass size={18} /> Rekawa Lagoon Kayaking
            </a>
          </div>

        </div>
      </div>

      {/* Down Arrow */}
      <a href="#turtle-watch" style={{
        position: 'absolute',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        color: 'var(--primary-cyan)',
        animation: 'float 2s ease-in-out infinite',
        textDecoration: 'none'
      }}>
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
