import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Sky } from '@react-three/drei';
import { VanguardModel } from './VanguardModel';
import { useDialogueStore } from '../../stores/useDialogueStore';
import * as THREE from 'three';

// Tribal people arguing (Red vs Blue tribes)
function TribalMob({ isFighting }: { isFighting: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      if (isFighting) {
        // Chaotic fighting movement
        groupRef.current.children.forEach((child, i) => {
          child.position.y = Math.sin(state.clock.elapsedTime * 10 + i) * 0.1;
          child.rotation.y = Math.sin(state.clock.elapsedTime * 5 + i) * 0.5;
        });
      } else {
        // Calm breathing
        groupRef.current.children.forEach((child, i) => {
          child.position.y = Math.sin(state.clock.elapsedTime * 2 + i) * 0.02;
          child.rotation.y = 0;
        });
      }
    }
  });

  const Tribesman = ({ color, pos, rot }: { color: string, pos: [number, number, number], rot: [number, number, number] }) => (
    <group position={pos} rotation={rot}>
      {/* Head */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshPhysicalMaterial color="#b45309" roughness={0.7} />
      </mesh>
      {/* Headband */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <cylinderGeometry args={[0.31, 0.31, 0.08, 16]} />
        <meshPhysicalMaterial color={color} roughness={0.9} />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <capsuleGeometry args={[0.2, 0.4, 16, 16]} />
        <meshPhysicalMaterial color="#422006" roughness={0.9} />
      </mesh>
      {/* Loincloth/Sash */}
      <mesh position={[0, 0.4, 0.15]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.25, 0.3, 0.05]} />
        <meshPhysicalMaterial color={color} roughness={0.9} />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.25, 0.65, 0]} rotation={[0, 0, -0.2]} castShadow>
        <capsuleGeometry args={[0.06, 0.3, 16, 16]} />
        <meshPhysicalMaterial color="#b45309" />
      </mesh>
      <mesh position={[0.25, 0.65, 0]} rotation={[0, 0, 0.2]} castShadow>
        <capsuleGeometry args={[0.06, 0.3, 16, 16]} />
        <meshPhysicalMaterial color="#b45309" />
      </mesh>
      {/* Spear */}
      <mesh position={[0.35, 0.6, 0.2]} rotation={[0.2, 0, -0.1]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 1.5, 8]} />
        <meshPhysicalMaterial color="#78350f" />
      </mesh>
      <mesh position={[0.35, 1.35, 0.35]} rotation={[0.2, 0, -0.1]} castShadow>
        <coneGeometry args={[0.04, 0.2, 8]} />
        <meshPhysicalMaterial color="#94a3b8" metalness={0.8} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.1, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.35, 16]} />
        <meshPhysicalMaterial color="#b45309" />
      </mesh>
      <mesh position={[0.1, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.35, 16]} />
        <meshPhysicalMaterial color="#b45309" />
      </mesh>
    </group>
  );

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      {/* Red Tribe (Arguing with Blue) */}
      <Tribesman color="#dc2626" pos={[-1, 0, 0]} rot={[0, Math.PI / 4, 0]} />
      <Tribesman color="#dc2626" pos={[-1.8, 0, 0.5]} rot={[0, Math.PI / 3, 0]} />
      
      {/* Blue Tribe */}
      <Tribesman color="#2563eb" pos={[1, 0, 0]} rot={[0, -Math.PI / 4, 0]} />
      <Tribesman color="#2563eb" pos={[1.8, 0, 0.5]} rot={[0, -Math.PI / 3, 0]} />
    </group>
  );
}

// Royal Expeditionary Force (Ambush)
function RoyalAmbushForce({ isActive }: { isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetZ = isActive ? -3 : -15; // Move in when active
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smoothly move forward
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, delta * 2);
      
      if (isActive) {
        groupRef.current.children.forEach((child, i) => {
          child.position.y = Math.sin(state.clock.elapsedTime * 8 + i) * 0.1; // Marching
        });
      }
    }
  });

  const Soldier = ({ pos }: { pos: [number, number, number] }) => (
    <group position={pos}>
      {/* Head */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshPhysicalMaterial color="#FFE0BD" roughness={0.5} />
      </mesh>
      {/* Colonial Helmet */}
      <mesh position={[0, 1.35, 0]} castShadow>
        <sphereGeometry args={[0.32, 16, 16, 0, Math.PI * 2, 0, Math.PI/2]} />
        <meshPhysicalMaterial color="#e4e4e7" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Uniform Body */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <capsuleGeometry args={[0.22, 0.4, 16, 16]} />
        <meshPhysicalMaterial color="#1e3a8a" roughness={0.8} />
      </mesh>
      {/* Crossbelts */}
      <mesh position={[0, 0.65, 0.22]} rotation={[0, 0, Math.PI/4]} castShadow>
        <boxGeometry args={[0.05, 0.5, 0.02]} />
        <meshPhysicalMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0.65, 0.22]} rotation={[0, 0, -Math.PI/4]} castShadow>
        <boxGeometry args={[0.05, 0.5, 0.02]} />
        <meshPhysicalMaterial color="#ffffff" />
      </mesh>
      {/* Rifle */}
      <mesh position={[0.25, 0.6, 0.3]} rotation={[Math.PI/4, 0, 0]} castShadow>
        <boxGeometry args={[0.04, 0.8, 0.08]} />
        <meshPhysicalMaterial color="#3f3f46" roughness={0.5} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.1, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.35, 16]} />
        <meshPhysicalMaterial color="#000000" roughness={0.5} />
      </mesh>
      <mesh position={[0.1, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.35, 16]} />
        <meshPhysicalMaterial color="#000000" roughness={0.5} />
      </mesh>
    </group>
  );

  return (
    <group ref={groupRef} position={[0, -0.2, -15]}>
      <Soldier pos={[0, 0, 0]} />
      <Soldier pos={[-1.2, 0, 0.5]} />
      <Soldier pos={[1.2, 0, 0.5]} />
      <Soldier pos={[-2.4, 0, 1]} />
      <Soldier pos={[2.4, 0, 1]} />
    </group>
  );
}

// Tree model for the valley
function PineTree({ pos, scale = 1 }: { pos: [number, number, number], scale?: number }) {
  return (
    <group position={pos} scale={scale}>
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 2]} />
        <meshStandardMaterial color="#451a03" />
      </mesh>
      <mesh position={[0, 2.5, 0]} castShadow>
        <coneGeometry args={[1.5, 3, 5]} />
        <meshStandardMaterial color="#14532d" />
      </mesh>
      <mesh position={[0, 4, 0]} castShadow>
        <coneGeometry args={[1.2, 2.5, 5]} />
        <meshStandardMaterial color="#166534" />
      </mesh>
      <mesh position={[0, 5.2, 0]} castShadow>
        <coneGeometry args={[0.9, 2, 5]} />
        <meshStandardMaterial color="#15803d" />
      </mesh>
    </group>
  );
}

export function ValleyScene() {
  const currentNode = useDialogueStore((state) => state.currentNode);
  
  const isBonusNode = currentNode?.id.startsWith('ch2_resA_bonus') ||
                      currentNode?.id.startsWith('ch2_resA_maxbonus');
                      
  const isFighting = (currentNode?.id === 'ch2_start' || currentNode?.id === 'ch2_choice1') && !isBonusNode;
  const isAmbushed = currentNode?.id === 'ch2_resB' || 
                     currentNode?.id === 'ch2_ambush_puzzle' ||
                     currentNode?.id === 'ch2_resDtrap';
                     
  const isGameOver = currentNode?.id === 'ch2_resC' || currentNode?.id === 'ending';

  return (
    <>
      <Sky distance={450000} sunPosition={[-2, 0.5, -5]} turbidity={isGameOver ? 15 : 8} rayleigh={isGameOver ? 4 : 2} mieCoefficient={0.05} />
      <fog attach="fog" args={[isGameOver ? '#000000' : '#27272a', isGameOver ? 2 : 5, isGameOver ? 15 : 30]} />
      
      <ambientLight intensity={isGameOver ? 0.1 : 0.4} color={isGameOver ? '#ef4444' : '#a1a1aa'} />
      {!isGameOver && (
        <directionalLight 
          position={[0, 20, -20]} 
          intensity={2} 
          color="#fef08a"
          castShadow 
          shadow-mapSize={[512, 512]}
          shadow-camera-far={60}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
      )}
      
      <Environment preset="sunset" />
      <ContactShadows position={[0, -0.2, 0]} opacity={0.7} scale={20} blur={2} far={4} color={isGameOver ? '#000000' : '#451a03'} />

      {/* Ground - Valley floor (Dirt/Grass) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -10]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#3f6212" roughness={1} />
      </mesh>
      
      {/* Epic Valley Walls (Left side) */}
      <group position={[-12, 0, -10]}>
        <mesh position={[0, 5, 0]} rotation={[0, Math.PI / 8, 0]} receiveShadow castShadow>
          <boxGeometry args={[8, 12, 30]} />
          <meshStandardMaterial color="#3f3f46" roughness={1} />
        </mesh>
        <mesh position={[4, 2, 10]} rotation={[0.1, -Math.PI / 6, 0.1]} receiveShadow castShadow>
          <boxGeometry args={[5, 6, 10]} />
          <meshStandardMaterial color="#27272a" roughness={1} />
        </mesh>
        <mesh position={[2, 1, -5]} rotation={[-0.1, Math.PI / 4, 0]} receiveShadow castShadow>
          <boxGeometry args={[6, 4, 8]} />
          <meshStandardMaterial color="#52525b" roughness={1} />
        </mesh>
      </group>

      {/* Epic Valley Walls (Right side) */}
      <group position={[12, 0, -10]}>
        <mesh position={[0, 5, 0]} rotation={[0, -Math.PI / 8, 0]} receiveShadow castShadow>
          <boxGeometry args={[8, 12, 30]} />
          <meshStandardMaterial color="#3f3f46" roughness={1} />
        </mesh>
        <mesh position={[-4, 2, 10]} rotation={[0.1, Math.PI / 6, -0.1]} receiveShadow castShadow>
          <boxGeometry args={[5, 6, 10]} />
          <meshStandardMaterial color="#27272a" roughness={1} />
        </mesh>
        <mesh position={[-2, 1, -5]} rotation={[0.1, -Math.PI / 4, 0]} receiveShadow castShadow>
          <boxGeometry args={[6, 4, 8]} />
          <meshStandardMaterial color="#52525b" roughness={1} />
        </mesh>
      </group>

      {/* Forest Trees (Background context) */}
      <PineTree pos={[-6, 0, -8]} scale={1.2} />
      <PineTree pos={[-8, 0, -4]} scale={0.9} />
      <PineTree pos={[-5, 0, -12]} scale={1.5} />
      
      <PineTree pos={[6, 0, -8]} scale={1.1} />
      <PineTree pos={[8, 0, -4]} scale={0.8} />
      <PineTree pos={[5, 0, -12]} scale={1.4} />

      {/* Player (Lowered to fix floating) */}
      <group position={[0, -0.4, 4]} rotation={[0, Math.PI, 0]}>
        <VanguardModel />
      </group>

      {/* Characters */}
      <TribalMob isFighting={isFighting} />
      <RoyalAmbushForce isActive={isAmbushed} />

      <ContactShadows resolution={256} scale={40} blur={1} opacity={0.6} far={10} color="#000000" />
      <Environment preset="dawn" />
    </>
  );
}
