import React, { useRef, useState, useMemo, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Moon, Flashlight, Sparkles, Shield, Footprints, ChevronRight, Eye } from 'lucide-react';

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
          3D Beach Canvas Fallback Mode Active
        </div>
      );
    }
    return this.props.children;
  }
}

// 3D Sea Turtle Crawling On Sand Dunes
function BeachCrawlingTurtle3D({ position = [0, 0, 0], scale = 1.0, isRedLight = true }) {
  const turtleRef = useRef();
  const leftFrontRef = useRef();
  const rightFrontRef = useRef();
  const leftRearRef = useRef();
  const rightRearRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (turtleRef.current) {
      // Slow heavy crawling motion across sand dunes
      turtleRef.current.position.z = position[2] + Math.sin(t * 0.4) * 0.15;
      turtleRef.current.rotation.z = Math.sin(t * 0.8) * 0.04;
      turtleRef.current.position.y = position[1] + Math.abs(Math.sin(t * 1.2)) * 0.03;
    }

    // Heavy flipper drag crawl steps
    const crawlPhase = t * 1.5;
    if (leftFrontRef.current && rightFrontRef.current) {
      leftFrontRef.current.rotation.y = Math.sin(crawlPhase) * 0.35 + 0.2;
      rightFrontRef.current.rotation.y = -Math.sin(crawlPhase) * 0.35 - 0.2;
    }

    if (leftRearRef.current && rightRearRef.current) {
      leftRearRef.current.rotation.y = -Math.sin(crawlPhase) * 0.2;
      rightRearRef.current.rotation.y = Math.sin(crawlPhase) * 0.2;
    }
  });

  return (
    <group ref={turtleRef} position={position} scale={[scale, scale, scale]}>
      {/* Heavy Carapace Shell */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <sphereGeometry args={[1.2, 32, 24]} />
        <meshStandardMaterial 
          color="#1b4731" 
          roughness={0.4} 
          metalness={0.1}
        />
      </mesh>

      {/* Scute Seam Wireframe */}
      <mesh position={[0, 0.31, 0]}>
        <sphereGeometry args={[1.21, 16, 12]} />
        <meshStandardMaterial 
          color={isRedLight ? "#ff4d4d" : "#7bb892"} 
          wireframe={true} 
          emissive={isRedLight ? "#ff4d4d" : "#7bb892"}
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Head Dragging on Sand */}
      <mesh position={[0, 0.28, 1.25]}>
        <sphereGeometry args={[0.42, 20, 16]} />
        <meshStandardMaterial color="#143626" roughness={0.5} />
      </mesh>

      {/* Eyes illuminated by Red Torch */}
      <mesh position={[0.2, 0.35, 1.45]}>
        <sphereGeometry args={[0.075, 12, 12]} />
        <meshBasicMaterial color={isRedLight ? "#ff4d4d" : "#00f2fe"} />
      </mesh>
      <mesh position={[-0.2, 0.35, 1.45]}>
        <sphereGeometry args={[0.075, 12, 12]} />
        <meshBasicMaterial color={isRedLight ? "#ff4d4d" : "#00f2fe"} />
      </mesh>

      {/* Front Crawling Flippers */}
      <group ref={leftFrontRef} position={[1.0, 0.12, 0.5]}>
        <mesh rotation={[0.1, 0.4, 0]}>
          <boxGeometry args={[1.2, 0.1, 0.5]} />
          <meshStandardMaterial color="#143626" roughness={0.5} />
        </mesh>
      </group>

      <group ref={rightFrontRef} position={[-1.0, 0.12, 0.5]}>
        <mesh rotation={[0.1, -0.4, 0]}>
          <boxGeometry args={[1.2, 0.1, 0.5]} />
          <meshStandardMaterial color="#143626" roughness={0.5} />
        </mesh>
      </group>

      {/* Rear Flippers Scooping Sand */}
      <group ref={leftRearRef} position={[0.6, 0.08, -1.1]}>
        <mesh rotation={[-0.1, -0.3, 0]}>
          <boxGeometry args={[0.55, 0.08, 0.75]} />
          <meshStandardMaterial color="#143626" />
        </mesh>
      </group>

      <group ref={rightRearRef} position={[-0.6, 0.08, -1.1]}>
        <mesh rotation={[-0.1, 0.3, 0]}>
          <boxGeometry args={[0.55, 0.08, 0.75]} />
          <meshStandardMaterial color="#143626" />
        </mesh>
      </group>
    </group>
  );
}

// Cute Baby Turtle Scurrying Across Sand
function BeachBabyTurtle3D({ position = [0, 0, 0], scale = 0.35, delay = 0 }) {
  const babyRef = useRef();

  useFrame((state) => {
    const t = (state.clock.getElapsedTime() + delay) * 2.5;

    if (babyRef.current) {
      // Rapid scurrying towards the ocean waves
      babyRef.current.position.z = position[2] + Math.sin(t * 0.8) * 0.2;
      babyRef.current.position.x = position[0] + Math.cos(t * 0.6) * 0.15;
      babyRef.current.position.y = position[1] + Math.abs(Math.sin(t * 2)) * 0.02;
    }
  });

  return (
    <group ref={babyRef} position={position} scale={[scale, scale, scale]}>
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.9, 18, 14]} />
        <meshStandardMaterial color="#193324" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.2, 0.95]}>
        <sphereGeometry args={[0.35, 14, 12]} />
        <meshStandardMaterial color="#122419" roughness={0.4} />
      </mesh>
    </group>
  );
}

// 3D Full Moon in Night Sky
function FullMoon3D() {
  return (
    <group position={[6, 7, -12]}>
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshStandardMaterial 
          color="#fff8e7" 
          emissive="#fff5d6" 
          emissiveIntensity={0.8}
          roughness={0.9} 
        />
      </mesh>
      <pointLight intensity={3.5} color="#d4eaff" distance={30} />
    </group>
  );
}

// 3D Sandy Beach Dunes & Shoreline Waves
function SandyBeachDunes() {
  return (
    <group position={[0, -1.2, 0]}>
      {/* Sandy Dune Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[45, 45, 48, 48]} />
        <MeshWobbleMaterial
          color="#8c734b"
          factor={0.15}
          speed={0.5}
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>

      {/* Crawl Track Marks in Sand */}
      {[-1.5, 0, 1.5].map((zPos, idx) => (
        <mesh key={idx} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, zPos]}>
          <planeGeometry args={[3.5, 12]} />
          <meshStandardMaterial color="#6e5938" roughness={1.0} />
        </mesh>
      ))}

      {/* Foamy Shoreline Waves Crashing at Edge */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 8]}>
        <planeGeometry args={[45, 6, 24, 24]} />
        <MeshWobbleMaterial
          color="#00f2fe"
          factor={0.6}
          speed={2.5}
          roughness={0.1}
          opacity={0.7}
          transparent={true}
        />
      </mesh>
    </group>
  );
}

// Night Sky Stars
function NightSkyStars() {
  const count = 120;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = 3 + Math.random() * 15;
      pos[i * 3 + 2] = -5 - Math.random() * 15;
    }
    return pos;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.14} color="#ffffff" transparent opacity={0.85} />
    </points>
  );
}

export default function BeachNesting3D() {
  const [redTorchMode, setRedTorchMode] = useState(true);

  return (
    <section id="beach-3d" style={{ padding: '6rem 0', background: 'linear-gradient(180deg, #030c1c 0%, #0c182e 50%, #171d18 100%)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge-pill" style={{ marginBottom: '1rem', background: redTorchMode ? 'rgba(255, 77, 77, 0.15)' : 'rgba(0, 242, 254, 0.15)', color: redTorchMode ? '#ff6666' : 'var(--primary-cyan)', borderColor: redTorchMode ? 'rgba(255,77,77,0.4)' : 'rgba(0,242,254,0.4)' }}>
            <Moon size={14} /> REKAWA NIGHT BEACH NESTING EXPERIENCE
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#fff', marginBottom: '1rem' }}>
            Wild Sea Turtles <span className="gradient-gold">On Rekawa Beach</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7' }}>
            At night under the full moon, giant mother sea turtles crawl out of the Indian Ocean surf up into Rekawa’s golden sand dunes to lay eggs, while tiny baby hatchlings scurry to sea.
          </p>
        </div>

        {/* Red Light Torch Mode Banner */}
        <div className="glass-panel" style={{
          padding: '1.25rem 2rem',
          marginBottom: '2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem',
          background: redTorchMode ? 'rgba(40, 10, 15, 0.85)' : 'rgba(6, 18, 38, 0.85)',
          borderColor: redTorchMode ? 'rgba(255, 77, 77, 0.4)' : 'var(--border-glass)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: redTorchMode ? 'rgba(255, 77, 77, 0.25)' : 'rgba(0, 242, 254, 0.15)',
              border: redTorchMode ? '1px solid #ff4d4d' : '1px solid var(--primary-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: redTorchMode ? '#ff4d4d' : 'var(--primary-cyan)'
            }}>
              <Flashlight size={22} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '1.05rem' }}>
                {redTorchMode ? '🔴 Ethical Red Torch Light Mode Active' : '⚪ White Flash Light Mode'}
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Red light allows foreign visitors to observe nesting turtles on the beach without blinding them.
              </p>
            </div>
          </div>

          <button
            onClick={() => setRedTorchMode(!redTorchMode)}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '9999px',
              border: redTorchMode ? '1px solid #ff4d4d' : '1px solid var(--border-glass)',
              background: redTorchMode ? '#ff4d4d' : 'rgba(255,255,255,0.08)',
              color: redTorchMode ? '#fff' : 'var(--text-main)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            {redTorchMode ? 'Switch to Normal Light' : 'Enable Red Torch Filter'}
          </button>
        </div>

        {/* 3D Beach Canvas Box */}
        <div className="glass-panel" style={{
          height: '520px',
          borderRadius: '24px',
          overflow: 'hidden',
          position: 'relative',
          background: 'linear-gradient(180deg, #020813 0%, #0c182c 60%, #302619 100%)',
          border: redTorchMode ? '1px solid rgba(255, 77, 77, 0.4)' : '1px solid rgba(0, 242, 254, 0.3)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.8)'
        }}>
          {/* Controls hint */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            zIndex: 10,
            background: 'rgba(4, 10, 24, 0.85)',
            backdropFilter: 'blur(10px)',
            padding: '0.4rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.78rem',
            color: '#fff',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Footprints size={14} style={{ color: 'var(--accent-gold)' }} />
            360° DRAG TO EXPLORE MOONLIT BEACH & CRAWLING TURTLES
          </div>

          <ThreeErrorBoundary>
            <Canvas camera={{ position: [0, 2.2, 5.8], fov: 50 }}>
              <ambientLight intensity={redTorchMode ? 0.35 : 0.5} />
              
              {/* Moonlight */}
              <directionalLight position={[6, 9, -10]} intensity={1.8} color="#d4eaff" />

              {/* Red Torch Light Beam */}
              {redTorchMode && (
                <spotLight 
                  position={[0, 4, 3]} 
                  angle={0.6} 
                  penumbra={0.5} 
                  intensity={3.5} 
                  color="#ff3333" 
                />
              )}

              {/* Crawling Mother Turtle On Sand */}
              <BeachCrawlingTurtle3D position={[0, -0.6, 0.5]} scale={1.2} isRedLight={redTorchMode} />

              {/* Baby Turtles Scurrying Across Sand Dunes */}
              <BeachBabyTurtle3D position={[-1.8, -0.8, 1.8]} scale={0.35} delay={0} />
              <BeachBabyTurtle3D position={[1.6, -0.8, 2.2]} scale={0.32} delay={1.2} />
              <BeachBabyTurtle3D position={[-2.8, -0.8, 2.6]} scale={0.3} delay={2.4} />
              <BeachBabyTurtle3D position={[2.9, -0.8, 3.0]} scale={0.34} delay={0.6} />

              {/* 3D Moon & Starry Night Sky */}
              <FullMoon3D />
              <NightSkyStars />

              {/* Sandy Dunes & Waves */}
              <SandyBeachDunes />

              <OrbitControls enableZoom={true} enablePan={true} maxPolarAngle={Math.PI / 2.05} minPolarAngle={Math.PI / 3.5} />
            </Canvas>
          </ThreeErrorBoundary>
        </div>

      </div>
    </section>
  );
}
