import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import BeachNesting3D from './components/BeachNesting3D';
import TurtleStudio3D from './components/TurtleStudio3D';
import TurtleSimulator from './components/TurtleSimulator';
import LagoonExplorer from './components/LagoonExplorer';
import PhotoGallery from './components/PhotoGallery';
import TravelPlanner from './components/TravelPlanner';
import SoundscapePlayer from './components/SoundscapePlayer';
import Footer from './components/Footer';
import TurtleSwimOverlay from './components/TurtleSwimOverlay';

export default function App() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-main)' }}>
      {/* 🐢 Turtles swimming across the full screen overlay */}
      <TurtleSwimOverlay />
      {/* Header Navigation */}
      <Navbar isAudioPlaying={isAudioPlaying} toggleAudio={toggleAudio} />

      {/* 1. 3D Sea Water Swimming Scene */}
      <Hero3D />

      {/* 2. 3D Sand Dunes & Night Beach Nesting Scene */}
      <BeachNesting3D />

      {/* 3. Isolated 3D Model Inspector Studio */}
      <TurtleStudio3D />

      {/* 4. Night Turtle Patrol Ethical Simulator */}
      <TurtleSimulator />

      {/* 5. Rekawa Lagoon Kayak & Wildlife Explorer */}
      <LagoonExplorer />

      {/* 6. High-Res Photo Gallery & 360° Panorama Viewer */}
      <PhotoGallery />

      {/* 7. Foreign Tourist Travel Guide & Peak Nesting Calendar */}
      <TravelPlanner />

      {/* Web Audio Synthesizer */}
      <SoundscapePlayer isPlaying={isAudioPlaying} setIsPlaying={setIsAudioPlaying} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
