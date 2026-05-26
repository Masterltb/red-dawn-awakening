import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export function VanguardModel(props: any) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.03 + (props.position?.[1] || 0.2);
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.05}>
        {/* Head */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <sphereGeometry args={[0.35, 64, 64]} />
          <meshPhysicalMaterial color="#FFE0BD" roughness={0.3} clearcoat={0.2} />
        </mesh>
        
        {/* Detailed Hair */}
        <group position={[0, 1.25, 0]}>
          <mesh position={[0, 0.15, -0.05]} castShadow>
            <sphereGeometry args={[0.37, 32, 32]} />
            <meshPhysicalMaterial color="#1a1a1a" roughness={0.7} />
          </mesh>
          <mesh position={[-0.15, 0.2, 0.25]} rotation={[0, 0, 0.5]} castShadow>
            <capsuleGeometry args={[0.08, 0.2, 16, 16]} />
            <meshPhysicalMaterial color="#1a1a1a" roughness={0.7} />
          </mesh>
          <mesh position={[0.15, 0.15, 0.28]} rotation={[0, 0, -0.3]} castShadow>
            <capsuleGeometry args={[0.06, 0.15, 16, 16]} />
            <meshPhysicalMaterial color="#1a1a1a" roughness={0.7} />
          </mesh>
        </group>

        {/* Eyes */}
        <mesh position={[-0.12, 1.25, 0.32]} castShadow>
          <sphereGeometry args={[0.04, 32, 32]} />
          <meshPhysicalMaterial color="#000000" clearcoat={1.0} roughness={0.1} />
        </mesh>
        <mesh position={[0.12, 1.25, 0.32]} castShadow>
          <sphereGeometry args={[0.04, 32, 32]} />
          <meshPhysicalMaterial color="#000000" clearcoat={1.0} roughness={0.1} />
        </mesh>
        
        {/* Torso - Military Coat */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <capsuleGeometry args={[0.22, 0.4, 32, 32]} />
          <meshPhysicalMaterial color="#b91c1c" roughness={0.6} clearcoat={0.1} />
        </mesh>
        
        {/* Collar */}
        <mesh position={[0, 0.9, 0]} rotation={[0.2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.25, 0.1, 32]} />
          <meshPhysicalMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>

        {/* Gold Buttons */}
        <mesh position={[0, 0.7, 0.22]} rotation={[Math.PI/2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
          <meshPhysicalMaterial color="#fbbf24" metalness={1.0} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.5, 0.22]} rotation={[Math.PI/2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
          <meshPhysicalMaterial color="#fbbf24" metalness={1.0} roughness={0.1} />
        </mesh>

        {/* Belt */}
        <mesh position={[0, 0.45, 0]} castShadow>
          <cylinderGeometry args={[0.23, 0.23, 0.1, 32]} />
          <meshPhysicalMaterial color="#1a1a1a" roughness={0.5} />
        </mesh>
        {/* Belt Buckle */}
        <mesh position={[0, 0.45, 0.23]} castShadow>
          <boxGeometry args={[0.12, 0.08, 0.05]} />
          <meshPhysicalMaterial color="#fbbf24" metalness={1.0} roughness={0.1} />
        </mesh>

        {/* Arms */}
        <mesh position={[-0.3, 0.65, 0]} rotation={[0, 0, -0.2]} castShadow>
          <capsuleGeometry args={[0.08, 0.3, 16, 16]} />
          <meshPhysicalMaterial color="#b91c1c" roughness={0.6} />
        </mesh>
        <mesh position={[0.3, 0.65, 0]} rotation={[0, 0, 0.2]} castShadow>
          <capsuleGeometry args={[0.08, 0.3, 16, 16]} />
          <meshPhysicalMaterial color="#b91c1c" roughness={0.6} />
        </mesh>
        
        {/* Hands */}
        <mesh position={[-0.35, 0.35, 0]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshPhysicalMaterial color="#FFE0BD" roughness={0.4} />
        </mesh>
        <mesh position={[0.35, 0.35, 0]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshPhysicalMaterial color="#FFE0BD" roughness={0.4} />
        </mesh>

        {/* Legs / Pants */}
        <mesh position={[-0.12, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.09, 0.35, 32]} />
          <meshPhysicalMaterial color="#1c1917" roughness={0.9} />
        </mesh>
        <mesh position={[0.12, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.09, 0.35, 32]} />
          <meshPhysicalMaterial color="#1c1917" roughness={0.9} />
        </mesh>

        {/* Boots */}
        <mesh position={[-0.12, -0.05, 0.05]} castShadow>
          <boxGeometry args={[0.14, 0.1, 0.22]} />
          <meshPhysicalMaterial color="#000000" roughness={0.2} clearcoat={0.8} />
        </mesh>
        <mesh position={[0.12, -0.05, 0.05]} castShadow>
          <boxGeometry args={[0.14, 0.1, 0.22]} />
          <meshPhysicalMaterial color="#000000" roughness={0.2} clearcoat={0.8} />
        </mesh>
      </Float>
    </group>
  );
}
