import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Sky, Clouds, Cloud } from '@react-three/drei';
import { VanguardModel } from './VanguardModel';
import { useDialogueStore } from '../../stores/useDialogueStore';
import * as THREE from 'three';

// ----------------- MODELS -----------------

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 2.2, 6]} />
        <meshStandardMaterial color="#5C4033" roughness={0.9} />
      </mesh>
      <mesh position={[0, 2.8, 0]} castShadow>
        <coneGeometry args={[1.2, 2, 5]} />
        <meshStandardMaterial color="#228B22" roughness={0.6} />
      </mesh>
      <mesh position={[0, 3.8, 0]} castShadow>
        <coneGeometry args={[1, 1.5, 5]} />
        <meshStandardMaterial color="#32CD32" roughness={0.6} />
      </mesh>
    </group>
  );
}

function FloatingIsland() {
  return (
    <group position={[0, -0.5, 0]}>
      <mesh receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[8, 7, 0.5, 8]} />
        <meshStandardMaterial color="#4ade80" roughness={0.8} />
      </mesh>
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[7, 4, 1.5, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={1} />
      </mesh>
      <mesh position={[0, -2.5, 0]}>
        <cylinderGeometry args={[4, 0, 2, 8]} />
        <meshStandardMaterial color="#2d3748" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Windmill() {
  const bladesRef = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (bladesRef.current) bladesRef.current.rotation.z += delta * 0.5;
  });
  return (
    <group position={[3, 0.5, -4]}>
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.8, 1.2, 3, 6]} />
        <meshStandardMaterial color="#d4d4d8" roughness={0.9} />
      </mesh>
      <mesh position={[0, 3.5, 0]} castShadow>
        <coneGeometry args={[1.2, 1, 6]} />
        <meshStandardMaterial color="#8B0000" roughness={0.6} />
      </mesh>
      <group position={[0, 2.5, 1]} ref={bladesRef}>
        <mesh position={[0, 0, 0.1]} castShadow>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color="#3f3f46" />
        </mesh>
        <mesh position={[0, 1.2, 0]} castShadow>
          <boxGeometry args={[0.4, 2.4, 0.05]} />
          <meshStandardMaterial color="#fcd34d" />
        </mesh>
        <mesh position={[0, -1.2, 0]} castShadow>
          <boxGeometry args={[0.4, 2.4, 0.05]} />
          <meshStandardMaterial color="#fcd34d" />
        </mesh>
        <mesh position={[1.2, 0, 0]} rotation={[0, 0, Math.PI/2]} castShadow>
          <boxGeometry args={[0.4, 2.4, 0.05]} />
          <meshStandardMaterial color="#fcd34d" />
        </mesh>
        <mesh position={[-1.2, 0, 0]} rotation={[0, 0, Math.PI/2]} castShadow>
          <boxGeometry args={[0.4, 2.4, 0.05]} />
          <meshStandardMaterial color="#fcd34d" />
        </mesh>
      </group>
    </group>
  );
}

function LandlordModel({ isFreed, isImprisoned = false }: { isFreed: boolean, isImprisoned?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current && isFreed && !isImprisoned) {
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, -8, 0.02);
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 5, 0.02);
    }
  });

  return (
    <group position={[1.5, 0.2, -1]} ref={groupRef}>
      {/* Head */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <sphereGeometry args={[0.35, 64, 64]} />
        <meshPhysicalMaterial color="#FFE0BD" roughness={0.3} clearcoat={0.1} />
      </mesh>
      {/* Monocle */}
      <mesh position={[-0.15, 1.25, 0.33]} castShadow>
        <torusGeometry args={[0.08, 0.015, 16, 32]} />
        <meshPhysicalMaterial color="#FFD700" metalness={1} roughness={0} />
      </mesh>
      {/* Fancy Top Hat */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.28, 0.5, 32]} />
        <meshPhysicalMaterial color="#0a0a0a" roughness={0.4} clearcoat={0.2} />
      </mesh>
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.05, 32]} />
        <meshPhysicalMaterial color="#0a0a0a" roughness={0.4} clearcoat={0.2} />
      </mesh>
      <mesh position={[0, 1.45, 0]} castShadow>
        <cylinderGeometry args={[0.26, 0.26, 0.06, 32]} />
        <meshPhysicalMaterial color="#dc2626" roughness={0.8} />
      </mesh>
      {/* Torso (Purple Velvet) */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <capsuleGeometry args={[0.26, 0.45, 32, 32]} />
        <meshPhysicalMaterial color="#4c1d95" roughness={0.3} clearcoat={0.1} />
      </mesh>
      {/* Gold Chain */}
      <mesh position={[0, 0.7, 0.26]} rotation={[0.4, 0, 0]} castShadow>
        <torusGeometry args={[0.12, 0.02, 16, 32]} />
        <meshPhysicalMaterial color="#FFD700" metalness={1} roughness={0.1} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.12, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.35, 32]} />
        <meshPhysicalMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      <mesh position={[0.12, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.35, 32]} />
        <meshPhysicalMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
    </group>
  );
}

function PeasantMob({ isFreed }: { isFreed: boolean }) {
  const mobRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (mobRef.current) {
      if (!isFreed) {
        mobRef.current.position.x = -2.5 + Math.sin(state.clock.elapsedTime * 20) * 0.02;
      } else {
        mobRef.current.position.x = THREE.MathUtils.lerp(mobRef.current.position.x, -2.5, 0.05);
        mobRef.current.position.z = THREE.MathUtils.lerp(mobRef.current.position.z, 0.5, 0.05);
      }
    }
  });

  const Peasant = ({ pos, color, tool }: { pos: [number, number, number], color: string, tool?: boolean }) => (
    <group position={pos}>
      <mesh position={[0, 1.0, 0]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshPhysicalMaterial color="#FFE0BD" roughness={0.6} />
      </mesh>
      {/* Dirt on face */}
      <mesh position={[0.1, 1.0, 0.28]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshPhysicalMaterial color="#a8a29e" roughness={1} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.1, 1.05, 0.28]} castShadow><sphereGeometry args={[0.03, 16, 16]} /><meshPhysicalMaterial color="#000000" /></mesh>
      <mesh position={[0.1, 1.05, 0.28]} castShadow><sphereGeometry args={[0.03, 16, 16]} /><meshPhysicalMaterial color="#000000" /></mesh>
      {/* Torso */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <capsuleGeometry args={[0.2, 0.35, 32, 32]} />
        <meshPhysicalMaterial color={color} roughness={0.9} />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.25, 0.55, 0]} rotation={[0, 0, -0.2]} castShadow>
        <capsuleGeometry args={[0.06, 0.3, 16, 16]} />
        <meshPhysicalMaterial color={color} roughness={0.9} />
      </mesh>
      <group position={[0.25, 0.55, 0]} rotation={[tool ? -0.5 : 0, 0, tool ? -0.2 : 0.2]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.06, 0.3, 16, 16]} />
          <meshPhysicalMaterial color={color} roughness={0.9} />
        </mesh>
        {tool && (
          <mesh position={[0, -0.2, 0.2]} rotation={[Math.PI/2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 1.2, 8]} />
            <meshPhysicalMaterial color="#3E2723" roughness={0.9} />
          </mesh>
        )}
      </group>
      {/* Legs */}
      <mesh position={[-0.1, 0.15, 0]} castShadow><cylinderGeometry args={[0.07, 0.07, 0.3, 16]} /><meshPhysicalMaterial color="#292524" roughness={1} /></mesh>
      <mesh position={[0.1, 0.15, 0]} castShadow><cylinderGeometry args={[0.07, 0.07, 0.3, 16]} /><meshPhysicalMaterial color="#292524" roughness={1} /></mesh>
    </group>
  );

  return (
    <group position={[-2.5, 0.2, 1.5]} ref={mobRef}>
      <Peasant pos={[0, 0, 0]} color="#78716c" tool={true} />
      <Peasant pos={[-0.6, 0, -0.4]} color="#57534e" />
      <Peasant pos={[0.5, 0, -0.5]} color="#44403c" tool={true} />
      <Peasant pos={[0.2, 0, 0.5]} color="#a8a29e" />
    </group>
  );
}

function SilasModel({ isFreed }: { isFreed: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      if (!isFreed) {
        groupRef.current.position.set(-2, 0.2, -1.5);
        groupRef.current.rotation.y = 0;
      } else {
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, -1.5, 0.05);
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, -0.5, 0.05);
      }
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 1.2, 0]} castShadow>
        <sphereGeometry args={[0.35, 64, 64]} />
        <meshPhysicalMaterial color="#E8C396" roughness={0.6} /> {/* Slightly dirtier skin */}
      </mesh>
      <mesh position={[-0.12, 1.25, 0.32]} castShadow><sphereGeometry args={[0.04, 32, 32]} /><meshPhysicalMaterial color="#000000" roughness={0.1} /></mesh>
      <mesh position={[0.12, 1.25, 0.32]} castShadow><sphereGeometry args={[0.04, 32, 32]} /><meshPhysicalMaterial color="#000000" roughness={0.1} /></mesh>
      {/* Straw Hat High Poly */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <coneGeometry args={[0.5, 0.3, 32]} />
        <meshPhysicalMaterial color="#d97706" roughness={0.9} clearcoat={0.1} />
      </mesh>
      <mesh position={[0, 0.6, 0]} castShadow>
        <capsuleGeometry args={[0.22, 0.4, 32, 32]} />
        <meshPhysicalMaterial color="#57534e" roughness={0.9} />
      </mesh>
      {/* Tied Rope */}
      {!isFreed && (
        <mesh position={[0, 0.6, 0]} castShadow>
          <torusGeometry args={[0.24, 0.02, 16, 32]} />
          <meshPhysicalMaterial color="#d4d4d8" roughness={1} />
        </mesh>
      )}
      {/* Arms */}
      <mesh position={[-0.3, 0.65, isFreed ? 0 : -0.2]} rotation={[0, 0, isFreed ? -0.2 : 0.5]} castShadow>
        <capsuleGeometry args={[0.07, 0.3, 16, 16]} />
        <meshPhysicalMaterial color="#57534e" roughness={0.9} />
      </mesh>
      <mesh position={[0.3, 0.65, isFreed ? 0 : -0.2]} rotation={[0, 0, isFreed ? 0.2 : -0.5]} castShadow>
        <capsuleGeometry args={[0.07, 0.3, 16, 16]} />
        <meshPhysicalMaterial color="#57534e" roughness={0.9} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.12, 0.15, 0]} castShadow><cylinderGeometry args={[0.08, 0.08, 0.35, 32]} /><meshPhysicalMaterial color="#292524" roughness={1} /></mesh>
      <mesh position={[0.12, 0.15, 0]} castShadow><cylinderGeometry args={[0.08, 0.08, 0.35, 32]} /><meshPhysicalMaterial color="#292524" roughness={1} /></mesh>
    </group>
  );
}

function VillageElderModel({ isActive }: { isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      if (isActive) {
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 1, 0.05);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0.2, 0.05);
      } else {
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -3, 0.1);
        groupRef.current.position.x = 1;
      }
    }
  });

  return (
    <group position={[1, -3, -0.5]} ref={groupRef}>
      <mesh position={[0, 1.2, 0]} castShadow>
        <sphereGeometry args={[0.35, 64, 64]} />
        <meshPhysicalMaterial color="#FFE0BD" roughness={0.5} />
      </mesh>
      {/* High Poly White beard */}
      <mesh position={[0, 1.0, 0.3]} castShadow>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshPhysicalMaterial color="#f8fafc" roughness={0.9} clearcoat={0.1} />
      </mesh>
      <mesh position={[-0.15, 1.1, 0.3]} castShadow>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshPhysicalMaterial color="#f8fafc" roughness={0.9} />
      </mesh>
      <mesh position={[0.15, 1.1, 0.3]} castShadow>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshPhysicalMaterial color="#f8fafc" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.8, 0.35]} castShadow>
        <capsuleGeometry args={[0.1, 0.2, 16, 16]} />
        <meshPhysicalMaterial color="#f8fafc" roughness={0.9} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.12, 1.25, 0.32]} castShadow><sphereGeometry args={[0.04, 32, 32]} /><meshPhysicalMaterial color="#000000" roughness={0.1} /></mesh>
      <mesh position={[0.12, 1.25, 0.32]} castShadow><sphereGeometry args={[0.04, 32, 32]} /><meshPhysicalMaterial color="#000000" roughness={0.1} /></mesh>
      {/* Torso (Brown robe) */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <capsuleGeometry args={[0.26, 0.45, 32, 32]} />
        <meshPhysicalMaterial color="#713f12" roughness={0.8} />
      </mesh>
      {/* Arms folded */}
      <mesh position={[-0.2, 0.65, 0.25]} rotation={[0, 0, -1]} castShadow>
        <capsuleGeometry args={[0.08, 0.3, 16, 16]} />
        <meshPhysicalMaterial color="#713f12" roughness={0.8} />
      </mesh>
      <mesh position={[0.2, 0.65, 0.25]} rotation={[0, 0, 1]} castShadow>
        <capsuleGeometry args={[0.08, 0.3, 16, 16]} />
        <meshPhysicalMaterial color="#713f12" roughness={0.8} />
      </mesh>
      {/* Staff */}
      <mesh position={[0.4, 0.6, 0.2]} rotation={[0.1, 0, -0.1]} castShadow>
        <cylinderGeometry args={[0.03, 0.02, 1.4, 16]} />
        <meshPhysicalMaterial color="#3E2723" roughness={0.9} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.12, 0.15, 0]} castShadow><cylinderGeometry args={[0.08, 0.08, 0.35, 32]} /><meshPhysicalMaterial color="#44403c" roughness={1} /></mesh>
      <mesh position={[0.12, 0.15, 0]} castShadow><cylinderGeometry args={[0.08, 0.08, 0.35, 32]} /><meshPhysicalMaterial color="#44403c" roughness={1} /></mesh>
      
      {/* High Quality Realistic Rice Bags */}
      <group position={[1.5, 0, 0]}>
        {/* Bag 1 - Bottom Left */}
        <group position={[-0.3, 0.2, 0]} rotation={[0, Math.PI / 4, Math.PI / 2 - 0.1]}>
          <mesh castShadow><capsuleGeometry args={[0.22, 0.4, 16, 16]} /><meshPhysicalMaterial color="#c2a077" roughness={1} /></mesh>
          <mesh position={[0, 0.42, 0]} castShadow><coneGeometry args={[0.15, 0.15, 16]} /><meshPhysicalMaterial color="#c2a077" roughness={1} /></mesh>
          <mesh position={[0, 0.35, 0]} rotation={[Math.PI/2, 0, 0]} castShadow><torusGeometry args={[0.1, 0.02, 8, 16]} /><meshPhysicalMaterial color="#78350f" roughness={1} /></mesh>
        </group>

        {/* Bag 2 - Bottom Right */}
        <group position={[0.3, 0.2, 0.1]} rotation={[0, -Math.PI / 6, Math.PI / 2 + 0.1]}>
          <mesh castShadow><capsuleGeometry args={[0.22, 0.4, 16, 16]} /><meshPhysicalMaterial color="#c2a077" roughness={1} /></mesh>
          <mesh position={[0, 0.42, 0]} castShadow><coneGeometry args={[0.15, 0.15, 16]} /><meshPhysicalMaterial color="#c2a077" roughness={1} /></mesh>
          <mesh position={[0, 0.35, 0]} rotation={[Math.PI/2, 0, 0]} castShadow><torusGeometry args={[0.1, 0.02, 8, 16]} /><meshPhysicalMaterial color="#78350f" roughness={1} /></mesh>
        </group>

        {/* Bag 3 - Stacked on top */}
        <group position={[0, 0.6, 0.05]} rotation={[0, 0, Math.PI / 2]}>
          <mesh castShadow><capsuleGeometry args={[0.22, 0.4, 16, 16]} /><meshPhysicalMaterial color="#c2a077" roughness={1} /></mesh>
          <mesh position={[0, 0.42, 0]} castShadow><coneGeometry args={[0.15, 0.15, 16]} /><meshPhysicalMaterial color="#c2a077" roughness={1} /></mesh>
          <mesh position={[0, 0.35, 0]} rotation={[Math.PI/2, 0, 0]} castShadow><torusGeometry args={[0.1, 0.02, 8, 16]} /><meshPhysicalMaterial color="#78350f" roughness={1} /></mesh>
        </group>
        
        {/* Bag 4 - Standing up slightly behind */}
        <group position={[0, 0.42, -0.4]} rotation={[0.2, Math.PI / 3, 0.1]}>
          <mesh castShadow><capsuleGeometry args={[0.22, 0.4, 16, 16]} /><meshPhysicalMaterial color="#c2a077" roughness={1} /></mesh>
          <mesh position={[0, 0.42, 0]} castShadow><coneGeometry args={[0.15, 0.15, 16]} /><meshPhysicalMaterial color="#c2a077" roughness={1} /></mesh>
          <mesh position={[0, 0.35, 0]} rotation={[Math.PI/2, 0, 0]} castShadow><torusGeometry args={[0.1, 0.02, 8, 16]} /><meshPhysicalMaterial color="#78350f" roughness={1} /></mesh>
        </group>
      </group>
    </group>
  );
}

function PrisonCell({ isOpen = false }: { isOpen?: boolean }) {
  const doorRef = useRef<THREE.Group>(null);
  const guardArmRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (doorRef.current) {
      // Cửa lùa ngang sang trái khi mở
      doorRef.current.position.x = THREE.MathUtils.lerp(doorRef.current.position.x, isOpen ? -1.8 : 0, 0.05);
    }
    if (guardArmRef.current) {
      // Tay lính gác đưa lên mở khóa
      guardArmRef.current.rotation.x = THREE.MathUtils.lerp(guardArmRef.current.rotation.x, isOpen ? -1.5 : 0, 0.08);
    }
  });

  return (
    <group position={[0, -0.05, 0]}>
      {/* Floor */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[10, 0.5, 10]} />
        <meshStandardMaterial color="#1f2937" roughness={0.9} />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, 2.5, -5]} receiveShadow castShadow>
        <boxGeometry args={[10, 6, 1]} />
        <meshStandardMaterial color="#111827" roughness={1} />
      </mesh>
      {/* Side walls */}
      <mesh position={[-5, 2.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[1, 6, 10]} />
        <meshStandardMaterial color="#111827" roughness={1} />
      </mesh>
      <mesh position={[5, 2.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[1, 6, 10]} />
        <meshStandardMaterial color="#111827" roughness={1} />
      </mesh>
      
      {/* Static Iron bars */}
      {[...Array(10)].map((_, i) => {
        if (i >= 4 && i <= 6) return null; // Khoảng trống cho cửa
        return (
          <mesh key={i} position={[-4.5 + i, 2.5, 5]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 6, 8]} />
            <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.4} />
          </mesh>
        );
      })}

      {/* Animated Door (3 bars) */}
      <group ref={doorRef}>
        {[4, 5, 6].map((i) => (
          <mesh key={`door-${i}`} position={[-4.5 + i, 2.5, 5]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 6, 8]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.3} />
          </mesh>
        ))}
        {/* Door frame horizontal bar */}
        <mesh position={[0.5, 2.5, 5]} castShadow>
          <boxGeometry args={[3, 0.2, 0.15]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.3} />
        </mesh>
      </group>

      <mesh position={[0, 5, 5]} castShadow>
        <boxGeometry args={[10, 0.2, 0.1]} />
        <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Guard Model (Outside) */}
      <group position={[1.5, 0.2, 6.5]} rotation={[0, Math.PI - 0.5, 0]}>
        <mesh position={[0, 1.2, 0]} castShadow><sphereGeometry args={[0.3, 32, 32]} /><meshPhysicalMaterial color="#FFE0BD" /></mesh>
        <mesh position={[0, 1.5, 0]} castShadow><cylinderGeometry args={[0.2, 0.3, 0.4, 16]} /><meshPhysicalMaterial color="#1e293b" /></mesh>
        <mesh position={[0, 0.6, 0]} castShadow><capsuleGeometry args={[0.22, 0.4, 16, 16]} /><meshPhysicalMaterial color="#334155" /></mesh>
        <mesh position={[0.3, 0.65, 0]} rotation={[0, 0, 0.2]} castShadow><capsuleGeometry args={[0.07, 0.3, 16, 16]} /><meshPhysicalMaterial color="#334155" /></mesh>
        
        {/* Animated Arm */}
        <group position={[-0.3, 0.75, 0]} ref={guardArmRef}>
          <mesh position={[0, -0.15, 0]} castShadow><capsuleGeometry args={[0.07, 0.3, 16, 16]} /><meshPhysicalMaterial color="#334155" /></mesh>
          <mesh position={[0, -0.4, 0]} castShadow><sphereGeometry args={[0.08, 16, 16]} /><meshPhysicalMaterial color="#FFE0BD" /></mesh>
        </group>

        <mesh position={[-0.1, 0.15, 0]} castShadow><cylinderGeometry args={[0.08, 0.08, 0.35, 16]} /><meshPhysicalMaterial color="#0f172a" /></mesh>
        <mesh position={[0.1, 0.15, 0]} castShadow><cylinderGeometry args={[0.08, 0.08, 0.35, 16]} /><meshPhysicalMaterial color="#0f172a" /></mesh>
      </group>
    </group>
  );
}

// ----------------- SCENE -----------------

export function VillageScene() {
  const currentNode = useDialogueStore((state) => state.currentNode);
  
  // Logic: The landlord is defeated and Silas is freed ONLY AT OR AFTER 'ch1_resA'
  const isFreed = currentNode?.id.startsWith('ch1_resA') || 
                  currentNode?.id.startsWith('ch1_silas') ||
                  currentNode?.id.startsWith('ch1_sidequest') ||
                  currentNode?.id.startsWith('ch1_sq1');

  const isImprisoned = currentNode?.id.startsWith('ch1_prison') || currentNode?.id === 'ch1_resC';
  const isPrisonOpen = currentNode?.id === 'ch1_prison_escape';
  const isGameOver = currentNode?.id === 'ch1_resC' || currentNode?.id === 'ending';

  // Sidequest logic: Trưởng thôn Oros & Bao gạo
  const isSidequest = currentNode?.id.startsWith('ch1_sidequest') || 
                      currentNode?.id.startsWith('ch1_sq');

  return (
    <>
      {!isImprisoned ? (
        <>
          <Sky distance={450000} sunPosition={[10, 2, 5]} inclination={0} azimuth={0.25} />
          <Clouds material={THREE.MeshBasicMaterial}>
            <Cloud segments={40} bounds={[10, 2, 2]} volume={10} color="#ffb38a" position={[-15, -2, -15]} />
            <Cloud segments={40} bounds={[10, 2, 2]} volume={10} color="#ffb38a" position={[15, -2, -15]} />
          </Clouds>
          <ambientLight intensity={0.3} color="#ffe4e1" />
          <directionalLight position={[10, 5, 5]} intensity={2.5} color="#ff7e67" castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} />
          <Environment preset="dawn" />
        </>
      ) : (
        <>
          <fog attach="fog" args={[isGameOver ? '#450a0a' : '#0f172a', 3, 30]} />
          <ambientLight intensity={isGameOver ? 0.2 : 0.5} color={isGameOver ? '#ef4444' : '#94a3b8'} />
          <spotLight position={[0, 8, 2]} intensity={isGameOver ? 20 : 50} color={isGameOver ? '#ef4444' : '#fef08a'} angle={0.9} penumbra={1} castShadow distance={20} />
          <directionalLight position={[0, 2, 5]} intensity={0.8} color={isGameOver ? '#ef4444' : '#93c5fd'} />
        </>
      )}

      <ContactShadows position={[0, -0.2, 0]} opacity={0.6} scale={20} blur={2} far={4} color="#451a03" />

      <group>
        {!isImprisoned ? (
          <>
            <FloatingIsland />
            
            <Tree position={[-2, 0, -2]} /> {/* Tree where Silas is tied */}
            <Tree position={[-3, 0, -5]} />
            <Tree position={[5, 0, -1]} />
            <Windmill />

            {/* Dynamic Story Elements */}
            <LandlordModel isFreed={isFreed || isSidequest} isImprisoned={isImprisoned} />
            <SilasModel isFreed={isFreed} />
            <PeasantMob isFreed={isFreed} />
            <VillageElderModel isActive={isSidequest} />
          </>
        ) : (
          <PrisonCell isOpen={isPrisonOpen} />
        )}

        <VanguardModel position={[isSidequest ? 0 : 0.5, 0.2, 3]} />
      </group>
    </>
  );
}
