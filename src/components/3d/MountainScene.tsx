import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Sky, Clouds, Cloud } from '@react-three/drei';
import { VanguardModel } from './VanguardModel';
import { useDialogueStore } from '../../stores/useDialogueStore';
import * as THREE from 'three';

function RoyalGeneralModel({ isActive }: { isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      if (isActive) {
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 0, 0.05);
      } else {
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, -10, 0.05);
      }
    }
  });

  return (
    <group position={[-2, 0.2, -10]} rotation={[0, Math.PI/3, 0]} ref={groupRef}>
      <mesh position={[0, 1.2, 0]} castShadow><sphereGeometry args={[0.35, 64, 64]} /><meshPhysicalMaterial color="#FFE0BD" roughness={0.3} /></mesh>
      {/* General Hat with Plume */}
      <mesh position={[0, 1.5, 0.05]} rotation={[-0.1, 0, 0]} castShadow><cylinderGeometry args={[0.3, 0.35, 0.2, 32]} /><meshPhysicalMaterial color="#172554" roughness={0.6} /></mesh>
      <mesh position={[0, 1.5, 0.4]} rotation={[0, 0, 0]} castShadow><boxGeometry args={[0.5, 0.05, 0.3]} /><meshPhysicalMaterial color="#1a1a1a" roughness={0.5} /></mesh>
      <mesh position={[0, 1.8, 0]} castShadow><capsuleGeometry args={[0.1, 0.4, 16, 16]} /><meshPhysicalMaterial color="#ef4444" roughness={0.9} /></mesh>
      {/* Eyes */}
      <mesh position={[-0.12, 1.25, 0.32]} castShadow><sphereGeometry args={[0.04, 32, 32]} /><meshPhysicalMaterial color="#000000" /></mesh>
      <mesh position={[0.12, 1.25, 0.32]} castShadow><sphereGeometry args={[0.04, 32, 32]} /><meshPhysicalMaterial color="#000000" /></mesh>
      {/* Epic Torso with Medals */}
      <mesh position={[0, 0.6, 0]} castShadow><capsuleGeometry args={[0.26, 0.4, 32, 32]} /><meshPhysicalMaterial color="#172554" roughness={0.6} /></mesh>
      <mesh position={[-0.1, 0.7, 0.26]} castShadow><boxGeometry args={[0.05, 0.05, 0.05]} /><meshPhysicalMaterial color="#FFD700" metalness={1} /></mesh>
      <mesh position={[-0.15, 0.75, 0.26]} castShadow><boxGeometry args={[0.05, 0.05, 0.05]} /><meshPhysicalMaterial color="#eab308" metalness={1} /></mesh>
      <mesh position={[-0.05, 0.75, 0.26]} castShadow><boxGeometry args={[0.05, 0.05, 0.05]} /><meshPhysicalMaterial color="#fef08a" metalness={1} /></mesh>
      {/* Shoulders */}
      <mesh position={[-0.3, 0.85, 0]} castShadow><boxGeometry args={[0.2, 0.05, 0.2]} /><meshPhysicalMaterial color="#FFD700" metalness={1} /></mesh>
      <mesh position={[0.3, 0.85, 0]} castShadow><boxGeometry args={[0.2, 0.05, 0.2]} /><meshPhysicalMaterial color="#FFD700" metalness={1} /></mesh>
      {/* Arms */}
      <mesh position={[-0.3, 0.65, 0]} rotation={[0, 0, -0.2]} castShadow><capsuleGeometry args={[0.08, 0.3, 16, 16]} /><meshPhysicalMaterial color="#172554" roughness={0.6} /></mesh>
      <group position={[0.3, 0.65, 0]} rotation={[0, 0, 0.2]}>
        <mesh castShadow><capsuleGeometry args={[0.08, 0.3, 16, 16]} /><meshPhysicalMaterial color="#172554" roughness={0.6} /></mesh>
        {/* Sword */}
        <mesh position={[0, -0.3, 0.3]} rotation={[Math.PI/4, 0, 0]} castShadow><boxGeometry args={[0.02, 0.8, 0.08]} /><meshPhysicalMaterial color="#a1a1aa" metalness={1} roughness={0.2} /></mesh>
        <mesh position={[0, -0.1, 0.1]} rotation={[Math.PI/4, 0, 0]} castShadow><boxGeometry args={[0.1, 0.1, 0.2]} /><meshPhysicalMaterial color="#FFD700" metalness={1} /></mesh>
      </group>
      {/* Legs */}
      <mesh position={[-0.12, 0.15, 0]} castShadow><cylinderGeometry args={[0.08, 0.08, 0.35, 32]} /><meshPhysicalMaterial color="#1a1a1a" roughness={0.9} /></mesh>
      <mesh position={[0.12, 0.15, 0]} castShadow><cylinderGeometry args={[0.08, 0.08, 0.35, 32]} /><meshPhysicalMaterial color="#1a1a1a" roughness={0.9} /></mesh>
    </group>
  );
}

function TribalChiefModel({ isActive }: { isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      if (isActive) {
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 1.5, 0.05);
      } else {
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 10, 0.05);
      }
    }
  });

  return (
    <group position={[10, 0.2, -1]} rotation={[0, -Math.PI/4, 0]} ref={groupRef}>
      <mesh position={[0, 1.2, 0]} castShadow><sphereGeometry args={[0.35, 64, 64]} /><meshPhysicalMaterial color="#b45309" roughness={0.7} /></mesh>
      {/* Tribal Headband */}
      <mesh position={[0, 1.3, 0]} castShadow><cylinderGeometry args={[0.36, 0.36, 0.1, 32]} /><meshPhysicalMaterial color="#ef4444" roughness={0.9} /></mesh>
      {/* Feathers */}
      <mesh position={[0, 1.5, -0.3]} rotation={[0.2, 0, 0]} castShadow><coneGeometry args={[0.05, 0.3, 16]} /><meshPhysicalMaterial color="#3b82f6" roughness={0.8} /></mesh>
      <mesh position={[-0.1, 1.5, -0.3]} rotation={[0.2, 0, 0.2]} castShadow><coneGeometry args={[0.05, 0.3, 16]} /><meshPhysicalMaterial color="#fcd34d" roughness={0.8} /></mesh>
      {/* Eyes */}
      <mesh position={[-0.12, 1.25, 0.32]} castShadow><sphereGeometry args={[0.04, 32, 32]} /><meshPhysicalMaterial color="#000000" /></mesh>
      <mesh position={[0.12, 1.25, 0.32]} castShadow><sphereGeometry args={[0.04, 32, 32]} /><meshPhysicalMaterial color="#000000" /></mesh>
      {/* Tribal Garb */}
      <mesh position={[0, 0.6, 0]} castShadow><capsuleGeometry args={[0.22, 0.4, 32, 32]} /><meshPhysicalMaterial color="#14532d" roughness={0.9} /></mesh>
      <mesh position={[0, 0.6, 0.23]} castShadow><boxGeometry args={[0.3, 0.4, 0.05]} /><meshPhysicalMaterial color="#fcd34d" roughness={0.9} /></mesh>
      {/* Arms */}
      <mesh position={[-0.3, 0.65, 0]} rotation={[0, 0, -0.2]} castShadow><capsuleGeometry args={[0.07, 0.3, 16, 16]} /><meshPhysicalMaterial color="#b45309" roughness={0.7} /></mesh>
      <mesh position={[0.3, 0.65, 0]} rotation={[0, 0, 0.2]} castShadow><capsuleGeometry args={[0.07, 0.3, 16, 16]} /><meshPhysicalMaterial color="#b45309" roughness={0.7} /></mesh>
      {/* Staff / Spear */}
      <mesh position={[0.4, 0.6, 0.2]} rotation={[0.2, 0, -0.1]} castShadow><cylinderGeometry args={[0.02, 0.02, 1.5, 16]} /><meshPhysicalMaterial color="#78350f" roughness={0.9} /></mesh>
      <mesh position={[0.4, 1.35, 0.35]} rotation={[0.2, 0, -0.1]} castShadow><coneGeometry args={[0.05, 0.2, 16]} /><meshPhysicalMaterial color="#94a3b8" metalness={1} roughness={0.2} /></mesh>
      {/* Legs */}
      <mesh position={[-0.12, 0.15, 0]} castShadow><cylinderGeometry args={[0.08, 0.08, 0.35, 32]} /><meshPhysicalMaterial color="#1a1a1a" roughness={0.9} /></mesh>
      <mesh position={[0.12, 0.15, 0]} castShadow><cylinderGeometry args={[0.08, 0.08, 0.35, 32]} /><meshPhysicalMaterial color="#1a1a1a" roughness={0.9} /></mesh>
    </group>
  );
}

function RoyalArmyGroup({ isActive }: { isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      if (isActive) {
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 0, 0.05);
      } else {
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, -15, 0.05);
      }
    }
  });

  const ArmySoldier = ({ pos }: { pos: [number, number, number] }) => (
    <group position={pos}>
      <mesh position={[0, 1.2, 0]} castShadow><sphereGeometry args={[0.35, 32, 32]} /><meshPhysicalMaterial color="#FFE0BD" roughness={0.4} /></mesh>
      <mesh position={[0, 1.35, 0]} castShadow><sphereGeometry args={[0.36, 32, 32, 0, Math.PI * 2, 0, Math.PI/2]} /><meshPhysicalMaterial color="#a1a1aa" metalness={1} roughness={0.2} /></mesh>
      <mesh position={[0, 0.6, 0]} castShadow><capsuleGeometry args={[0.22, 0.4, 32, 32]} /><meshPhysicalMaterial color="#172554" roughness={0.6} /></mesh>
      <mesh position={[0.2, 0.6, 0.4]} rotation={[Math.PI/4, 0, 0]} castShadow><boxGeometry args={[0.05, 0.8, 0.1]} /><meshPhysicalMaterial color="#27272a" roughness={0.5} /></mesh>
      <mesh position={[-0.12, 0.15, 0]} castShadow><cylinderGeometry args={[0.08, 0.08, 0.35, 32]} /><meshPhysicalMaterial color="#000000" roughness={0.4} /></mesh>
      <mesh position={[0.12, 0.15, 0]} castShadow><cylinderGeometry args={[0.08, 0.08, 0.35, 32]} /><meshPhysicalMaterial color="#000000" roughness={0.4} /></mesh>
    </group>
  );

  return (
    <group position={[-15, 0.2, 4]} rotation={[0, Math.PI/4, 0]} ref={groupRef}>
      <ArmySoldier pos={[0, 0, 0]} />
      <ArmySoldier pos={[1.5, 0, 0]} />
      <ArmySoldier pos={[-1.5, 0, 0]} />
      <ArmySoldier pos={[0.75, 0, -1]} />
      <ArmySoldier pos={[-0.75, 0, -1]} />
    </group>
  );
}

function RosaCommissarModel({ isActive }: { isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      if (isActive) {
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 2, 0.05);
      } else {
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, -10, 0.05);
      }
    }
  });

  return (
    <group position={[-1, 0.2, -10]} rotation={[0, Math.PI/4, 0]} ref={groupRef}>
      <mesh position={[0, 1.2, 0]} castShadow><sphereGeometry args={[0.32, 64, 64]} /><meshPhysicalMaterial color="#FFE0BD" roughness={0.3} /></mesh>
      {/* Hair */}
      <mesh position={[0, 1.35, -0.05]} castShadow><sphereGeometry args={[0.34, 32, 32]} /><meshPhysicalMaterial color="#1a1a1a" roughness={0.8} /></mesh>
      {/* Red bandana / Commissar hat */}
      <mesh position={[0, 1.45, 0]} rotation={[0.1, 0, 0]} castShadow><cylinderGeometry args={[0.34, 0.35, 0.15, 32]} /><meshPhysicalMaterial color="#dc2626" roughness={0.8} /></mesh>
      <mesh position={[-0.1, 1.25, 0.3]} castShadow><sphereGeometry args={[0.04, 32, 32]} /><meshPhysicalMaterial color="#000000" /></mesh>
      <mesh position={[0.1, 1.25, 0.3]} castShadow><sphereGeometry args={[0.04, 32, 32]} /><meshPhysicalMaterial color="#000000" /></mesh>
      
      {/* Commissar Coat (Dark blue/black with red sash) */}
      <mesh position={[0, 0.6, 0]} castShadow><capsuleGeometry args={[0.2, 0.4, 32, 32]} /><meshPhysicalMaterial color="#1e293b" roughness={0.8} /></mesh>
      <mesh position={[0, 0.5, 0.15]} rotation={[-0.2, 0, 0.2]} castShadow><boxGeometry args={[0.3, 0.05, 0.15]} /><meshPhysicalMaterial color="#dc2626" roughness={0.9} /></mesh>
      
      <mesh position={[-0.28, 0.65, 0]} rotation={[0, 0, -0.2]} castShadow><capsuleGeometry args={[0.06, 0.3, 16, 16]} /><meshPhysicalMaterial color="#1e293b" roughness={0.8} /></mesh>
      <mesh position={[0.28, 0.65, 0]} rotation={[0, 0, 0.2]} castShadow><capsuleGeometry args={[0.06, 0.3, 16, 16]} /><meshPhysicalMaterial color="#1e293b" roughness={0.8} /></mesh>
      <mesh position={[-0.1, 0.15, 0]} castShadow><cylinderGeometry args={[0.07, 0.07, 0.35, 32]} /><meshPhysicalMaterial color="#0f172a" roughness={0.9} /></mesh>
      <mesh position={[0.1, 0.15, 0]} castShadow><cylinderGeometry args={[0.07, 0.07, 0.35, 32]} /><meshPhysicalMaterial color="#0f172a" roughness={0.9} /></mesh>
    </group>
  );
}

function MountainIsland() {
  return (
    <group position={[0, -0.5, 0]}>
      {/* Rocky Peak */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[6, 8, 0.5, 32]} />
        <meshPhysicalMaterial color="#a1a1aa" roughness={1} />
      </mesh>
      {/* Deep Mountain */}
      <mesh position={[0, -3, 0]}>
        <cylinderGeometry args={[8, 3, 5.5, 32]} />
        <meshPhysicalMaterial color="#52525b" roughness={1} />
      </mesh>
      {/* Flagpole */}
      <mesh position={[0, 2.5, -2]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 5, 16]} />
        <meshPhysicalMaterial color="#e4e4e7" metalness={1} roughness={0.2} />
      </mesh>
      {/* Flag */}
      <mesh position={[1, 4.5, -2]} castShadow>
        <boxGeometry args={[2, 1, 0.05]} />
        <meshPhysicalMaterial color="#DC143C" roughness={0.4} />
      </mesh>
      <mesh position={[1, 4.5, -1.95]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshPhysicalMaterial color="#FFD700" metalness={0.8} />
      </mesh>
    </group>
  );
}

export function MountainScene() {
  const currentNode = useDialogueStore((state) => state.currentNode);
  
  const isGeneralActive = (currentNode?.id.startsWith('ch4_start') || 
                           currentNode?.id.startsWith('ch4_choice1') ||
                           currentNode?.id.startsWith('ch4_resCcoalition')) &&
                           !currentNode?.id.startsWith('ch4_resA');
                           
  const isRosaActive = currentNode?.id.startsWith('ch4_context2') ||
                       currentNode?.id.startsWith('ch4_choice1') ||
                       currentNode?.id.startsWith('ch4_resA') ||
                       currentNode?.id.startsWith('ch4_victory_true') ||
                       currentNode?.id.startsWith('ch4_final_win');
                          
  const isTribalActive = currentNode?.id.startsWith('ch4_sidequest') || 
                         currentNode?.id.startsWith('ch4_sq');
                         
  const isArmyActive = (currentNode?.id.startsWith('ch4_resB') || 
                        currentNode?.id.startsWith('ch4_final') ||
                        currentNode?.id.startsWith('ch4_resCcoalition')) &&
                        !currentNode?.id.startsWith('ch4_final_win');
                       
  const isVictoryActive = currentNode?.id === 'ch4_victory_true' || 
                          currentNode?.id === 'ch4_resA';
                          
  const isGameOver = currentNode?.id === 'ch4_resC' || currentNode?.id === 'ending';

  return (
    <>
      <Sky distance={450000} sunPosition={[5, 2, 8]} turbidity={isGameOver ? 15 : 5} rayleigh={1.5} mieCoefficient={0.02} />
      {/* Light background fog, pushed far away */}
      <fog attach="fog" args={[isGameOver ? '#000000' : (isVictoryActive ? '#dc2626' : '#fbbf24'), 20, 60]} />
      
      {/* Removed heavy Clouds component to improve FPS */}
      
      <ambientLight intensity={isGameOver ? 0.1 : (isVictoryActive ? 1.0 : 0.6)} color={isGameOver ? '#ef4444' : (isVictoryActive ? '#ffedd5' : '#ffffff')} />
      {!isGameOver && (
        <directionalLight position={[10, 20, 10]} intensity={isVictoryActive ? 5 : 3} color={isVictoryActive ? '#fca5a5' : '#ffffff'} castShadow shadow-mapSize={[512, 512]} />
      )}
      {!isGameOver && (
        <directionalLight position={[-10, 10, -10]} intensity={1} color={isVictoryActive ? '#ef4444' : '#93c5fd'} />
      )}
      
      <Environment preset="city" />
      <ContactShadows position={[0, -0.2, 0]} opacity={0.6} scale={20} resolution={256} blur={1} far={4} color={isGameOver ? '#000000' : '#451a03'} />

      <group>
        <MountainIsland />
        
        {/* Dynamic Story Elements */}
        <RoyalGeneralModel isActive={isGeneralActive} />
        <RosaCommissarModel isActive={isRosaActive} />
        <TribalChiefModel isActive={isTribalActive} />
        <RoyalArmyGroup isActive={isArmyActive} />

        {/* Player Character */}
        <VanguardModel position={[0.5, 0.2, 2]} rotation={[0, -Math.PI/6, 0]} />
      </group>
    </>
  );
}
