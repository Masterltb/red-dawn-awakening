import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { VillageScene } from './components/3d/VillageScene';
import { ValleyScene } from './components/3d/ValleyScene';
import { FactoryScene } from './components/3d/FactoryScene';
import { MountainScene } from './components/3d/MountainScene';
import { MainMenu } from './ui/MainMenu';
import { HUD } from './ui/HUD';
import { DialogueSystem } from './ui/DialogueSystem';
import { ResultScreen } from './ui/ResultScreen';
import { useGameStore } from './stores/useGameStore';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  const isStarted = useGameStore((state) => state.isStarted);
  const chapter = useGameStore((state) => state.chapter);
  const endGameStatus = useGameStore((state) => state.endGameStatus);
  const setEndGameStatus = useGameStore((state) => state.setEndGameStatus);

  // Restart handler
  const handleRestart = () => {
    setEndGameStatus(null);
    useGameStore.setState({ isStarted: false, chapter: 1, ideology: 50, forces: 1000 });
  };

  return (
    <>
      {/* 3D Layer (Z-Index: 0) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1a1a3a] to-[#0a0a0a]">
        {/* Giới hạn DPR (Device Pixel Ratio) từ 1 đến 1.5 để chống giật lag trên màn hình Retina/High-DPI */}
        <Canvas camera={{ position: [0, 5, 12], fov: 45 }} shadows dpr={[1, 1.5]} gl={{ antialias: false }}>
          <Suspense fallback={null}>
            {chapter === 1 && <VillageScene />}
            {chapter === 2 && <ValleyScene />}
            {chapter === 3 && <FactoryScene />}
            {chapter === 4 && <MountainScene />}
            
            {/* Tắt multisampling để giảm tải GPU đáng kể */}
            <EffectComposer multisampling={0}>
              <Bloom luminanceThreshold={0.8} luminanceSmoothing={0.9} height={300} opacity={0.8} />
              <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
          </Suspense>

          <OrbitControls 
            enableZoom={true} 
            enablePan={false} 
            autoRotate={!isStarted} 
            autoRotateSpeed={0.5} 
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Canvas>
      </div>

      {/* UI Layer (Z-Index: 10) */}
      <AnimatePresence>
        {!isStarted && !endGameStatus && <MainMenu key="main-menu" />}
        
        {isStarted && !endGameStatus && (
          <>
            <HUD key="hud" />
            <DialogueSystem key="dialogue" />
          </>
        )}

        {endGameStatus && (
          <motion.div 
            key="game-over"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <ResultScreen onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
