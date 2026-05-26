import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Sky } from '@react-three/drei';
import { VanguardModel } from './VanguardModel';
import { useDialogueStore } from '../../stores/useDialogueStore';
import * as THREE from 'three';

function WorkerModel({ position, rotation, isAngry }: { position: [number, number, number], rotation: [number, number, number], isAngry: boolean }) {
  const rightArmRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (rightArmRef.current) {
      if (isAngry) {
        rightArmRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 5) * 0.5 - 2.5;
      } else {
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, 0.1);
      }
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 1.2, 0]} castShadow><sphereGeometry args={[0.35, 32, 32]} /><meshPhysicalMaterial color="#FFE0BD" roughness={0.6} /></mesh>
      <mesh position={[0, 1.5, 0.05]} rotation={[-0.2, 0, 0]} castShadow><cylinderGeometry args={[0.36, 0.36, 0.15, 32]} /><meshPhysicalMaterial color="#3f3f46" roughness={0.9} /></mesh>
      <mesh position={[0, 1.45, 0.35]} rotation={[-0.1, 0, 0]} castShadow><boxGeometry args={[0.4, 0.05, 0.2]} /><meshPhysicalMaterial color="#18181b" roughness={0.9} /></mesh>
      
      <mesh position={[0, 0.6, 0]} castShadow><capsuleGeometry args={[0.22, 0.4, 32, 32]} /><meshPhysicalMaterial color="#475569" roughness={0.8} /></mesh>
      <mesh position={[-0.3, 0.65, 0]} rotation={[0, 0, -0.2]} castShadow><capsuleGeometry args={[0.07, 0.3, 16, 16]} /><meshPhysicalMaterial color="#475569" roughness={0.8} /></mesh>
      
      <group position={[0.3, 0.75, 0]} ref={rightArmRef}>
        <mesh position={[0, -0.15, 0]} castShadow><capsuleGeometry args={[0.07, 0.3, 16, 16]} /><meshPhysicalMaterial color="#475569" roughness={0.8} /></mesh>
        <mesh position={[0, -0.4, 0]} castShadow><sphereGeometry args={[0.08, 16, 16]} /><meshPhysicalMaterial color="#FFE0BD" /></mesh>
        <mesh position={[0, -0.4, 0.2]} rotation={[Math.PI/2, 0, 0]} castShadow><cylinderGeometry args={[0.03, 0.03, 0.6, 16]} /><meshPhysicalMaterial color="#8B4513" /></mesh>
        <mesh position={[0, -0.4, 0.5]} castShadow><boxGeometry args={[0.15, 0.2, 0.4]} /><meshPhysicalMaterial color="#a1a1aa" metalness={0.8} roughness={0.4} /></mesh>
      </group>

      <mesh position={[-0.12, 0.15, 0]} castShadow><cylinderGeometry args={[0.08, 0.08, 0.35, 32]} /><meshPhysicalMaterial color="#1e293b" roughness={0.9} /></mesh>
      <mesh position={[0.12, 0.15, 0]} castShadow><cylinderGeometry args={[0.08, 0.08, 0.35, 32]} /><meshPhysicalMaterial color="#1e293b" roughness={0.9} /></mesh>
    </group>
  );
}

function RosaModel({ isActive }: { isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      if (isActive) {
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0.2, 0.05);
      } else {
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -3, 0.1);
      }
    }
  });

  return (
    <group position={[-1, -3, 2]} rotation={[0, Math.PI/3, 0]} ref={groupRef}>
      <mesh position={[0, 1.2, 0]} castShadow><sphereGeometry args={[0.32, 64, 64]} /><meshPhysicalMaterial color="#FFE0BD" roughness={0.3} /></mesh>
      {/* Hair */}
      <mesh position={[0, 1.35, -0.05]} castShadow><sphereGeometry args={[0.34, 32, 32]} /><meshPhysicalMaterial color="#1a1a1a" roughness={0.8} /></mesh>
      {/* Red bandana */}
      <mesh position={[0, 1.45, 0]} rotation={[0.2, 0, 0]} castShadow><cylinderGeometry args={[0.345, 0.345, 0.08, 32]} /><meshPhysicalMaterial color="#dc2626" roughness={0.8} /></mesh>
      <mesh position={[-0.1, 1.25, 0.3]} castShadow><sphereGeometry args={[0.04, 32, 32]} /><meshPhysicalMaterial color="#000000" /></mesh>
      <mesh position={[0.1, 1.25, 0.3]} castShadow><sphereGeometry args={[0.04, 32, 32]} /><meshPhysicalMaterial color="#000000" /></mesh>
      
      <mesh position={[0, 0.6, 0]} castShadow><capsuleGeometry args={[0.2, 0.4, 32, 32]} /><meshPhysicalMaterial color="#475569" roughness={0.8} /></mesh>
      <mesh position={[-0.28, 0.65, 0]} rotation={[0, 0, -0.2]} castShadow><capsuleGeometry args={[0.06, 0.3, 16, 16]} /><meshPhysicalMaterial color="#475569" roughness={0.8} /></mesh>
      <mesh position={[0.28, 0.65, 0]} rotation={[0, 0, 0.2]} castShadow><capsuleGeometry args={[0.06, 0.3, 16, 16]} /><meshPhysicalMaterial color="#475569" roughness={0.8} /></mesh>
      <mesh position={[-0.1, 0.15, 0]} castShadow><cylinderGeometry args={[0.07, 0.07, 0.35, 32]} /><meshPhysicalMaterial color="#1e293b" roughness={0.9} /></mesh>
      <mesh position={[0.1, 0.15, 0]} castShadow><cylinderGeometry args={[0.07, 0.07, 0.35, 32]} /><meshPhysicalMaterial color="#1e293b" roughness={0.9} /></mesh>
    </group>
  );
}

function EngineerModel({ isActive }: { isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      if (isActive) {
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0.2, 0.05);
      } else {
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -3, 0.1);
      }
    }
  });

  return (
    <group position={[1, -3, 1.5]} rotation={[0, -Math.PI/6, 0]} ref={groupRef}>
      <mesh position={[0, 1.2, 0]} castShadow><sphereGeometry args={[0.35, 64, 64]} /><meshPhysicalMaterial color="#FFE0BD" roughness={0.4} /></mesh>
      {/* Glasses */}
      <mesh position={[-0.15, 1.25, 0.32]} castShadow><torusGeometry args={[0.08, 0.015, 16, 32]} /><meshPhysicalMaterial color="#333333" metalness={0.8} /></mesh>
      <mesh position={[0.15, 1.25, 0.32]} castShadow><torusGeometry args={[0.08, 0.015, 16, 32]} /><meshPhysicalMaterial color="#333333" metalness={0.8} /></mesh>
      
      {/* Formal Suit */}
      <mesh position={[0, 0.6, 0]} castShadow><capsuleGeometry args={[0.22, 0.4, 32, 32]} /><meshPhysicalMaterial color="#1e3a8a" roughness={0.6} /></mesh>
      {/* Blueprint roll */}
      <mesh position={[-0.3, 0.5, 0.2]} rotation={[Math.PI/4, 0, -0.2]} castShadow><cylinderGeometry args={[0.06, 0.06, 0.5, 16]} /><meshPhysicalMaterial color="#dbeafe" roughness={0.9} /></mesh>
      <mesh position={[-0.3, 0.65, 0]} rotation={[0, 0, -0.2]} castShadow><capsuleGeometry args={[0.07, 0.3, 16, 16]} /><meshPhysicalMaterial color="#1e3a8a" roughness={0.6} /></mesh>
      <mesh position={[0.3, 0.65, 0]} rotation={[0, 0, 0.2]} castShadow><capsuleGeometry args={[0.07, 0.3, 16, 16]} /><meshPhysicalMaterial color="#1e3a8a" roughness={0.6} /></mesh>
      <mesh position={[-0.12, 0.15, 0]} castShadow><cylinderGeometry args={[0.08, 0.08, 0.35, 32]} /><meshPhysicalMaterial color="#1a1a1a" roughness={0.9} /></mesh>
      <mesh position={[0.12, 0.15, 0]} castShadow><cylinderGeometry args={[0.08, 0.08, 0.35, 32]} /><meshPhysicalMaterial color="#1a1a1a" roughness={0.9} /></mesh>
    </group>
  );
}

function GuardsModel({ isActive }: { isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      if (isActive) {
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 2, 0.05);
      } else {
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 10, 0.05);
      }
    }
  });

  const Guard = ({ pos }: { pos: [number, number, number] }) => (
    <group position={pos}>
      <mesh position={[0, 1.2, 0]} castShadow><sphereGeometry args={[0.35, 32, 32]} /><meshPhysicalMaterial color="#FFE0BD" roughness={0.4} /></mesh>
      {/* Helmet */}
      <mesh position={[0, 1.35, 0]} castShadow><sphereGeometry args={[0.36, 32, 32, 0, Math.PI * 2, 0, Math.PI/2]} /><meshPhysicalMaterial color="#a1a1aa" metalness={1} roughness={0.2} /></mesh>
      <mesh position={[0, 0.6, 0]} castShadow><capsuleGeometry args={[0.22, 0.4, 32, 32]} /><meshPhysicalMaterial color="#172554" roughness={0.6} /></mesh>
      {/* Rifle */}
      <mesh position={[0.2, 0.6, 0.4]} rotation={[Math.PI/4, 0, 0]} castShadow><boxGeometry args={[0.05, 0.8, 0.1]} /><meshPhysicalMaterial color="#27272a" roughness={0.5} /></mesh>
      <mesh position={[-0.12, 0.15, 0]} castShadow><cylinderGeometry args={[0.08, 0.08, 0.35, 32]} /><meshPhysicalMaterial color="#000000" roughness={0.4} /></mesh>
      <mesh position={[0.12, 0.15, 0]} castShadow><cylinderGeometry args={[0.08, 0.08, 0.35, 32]} /><meshPhysicalMaterial color="#000000" roughness={0.4} /></mesh>
    </group>
  );

  return (
    <group position={[2.5, 0.2, 10]} rotation={[0, -Math.PI/6, 0]} ref={groupRef}>
      <Guard pos={[0, 0, 0]} />
      <Guard pos={[1, 0, 0.5]} />
      <Guard pos={[-1, 0, -0.5]} />
    </group>
  );
}

function Smokestack({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 2, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.4, 4, 8]} />
        <meshStandardMaterial color="#4a4a4a" />
      </mesh>
      <mesh position={[0, 4.2, 0]}>
        <sphereGeometry args={[0.4, 8, 8]} />
        <meshStandardMaterial color="#2d3748" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

function FactoryIsland() {
  return (
    <group position={[0, -0.5, 0]}>
      <mesh receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[8, 7, 0.5, 8]} />
        <meshStandardMaterial color="#71717a" roughness={0.9} />
      </mesh>
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[7, 4, 1.5, 8]} />
        <meshStandardMaterial color="#3f3f46" roughness={1} />
      </mesh>
      <mesh position={[2, 1.5, -2]} castShadow>
        <boxGeometry args={[4, 3, 3]} />
        <meshStandardMaterial color="#881337" roughness={0.8} />
      </mesh>
      <mesh position={[2, 3.5, -2]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[3, 3, 3.2]} />
        <meshStandardMaterial color="#3f3f46" roughness={0.7} />
      </mesh>
    </group>
  );
}

export function FactoryScene() {
  const currentNode = useDialogueStore((state) => state.currentNode);
  
  const isLudditeRage = currentNode?.id === 'ch3_resCluddite';
  const isTrapNode = currentNode?.id === 'ch3_resDtrap';

  const isAngry = !currentNode?.id.startsWith('ch3_resA') && 
                  !currentNode?.id.startsWith('ch3_rosa') &&
                  !currentNode?.id.startsWith('ch3_sidequest') &&
                  !currentNode?.id.startsWith('ch3_sq') &&
                  !currentNode?.id.startsWith('ch3_defense') &&
                  !isTrapNode;
                  
  const isRosaActive = currentNode?.id.startsWith('ch3_context2') ||
                       currentNode?.id.startsWith('ch3_choice1') ||
                       currentNode?.id.startsWith('ch3_rosa') || 
                       currentNode?.id.startsWith('ch3_resA') ||
                       currentNode?.id.startsWith('ch3_sidequest') ||
                       currentNode?.id.startsWith('ch3_sq') ||
                       currentNode?.id.startsWith('ch3_defense_win');

  const isEngineerActive = currentNode?.id.startsWith('ch3_sidequest') || 
                           currentNode?.id.startsWith('ch3_sq');
                           
  const isGuardsActive = (currentNode?.id.startsWith('ch3_resB') || 
                          currentNode?.id.startsWith('ch3_defense') ||
                          isTrapNode) && !currentNode?.id.startsWith('ch3_defense_win');
                          
  const isGameOver = currentNode?.id === 'ch3_resC' || currentNode?.id === 'ending';

  return (
    <>
      <Sky distance={450000} sunPosition={[0, -1, -5]} turbidity={10} rayleigh={2} mieCoefficient={0.05} mieDirectionalG={0.8} />
      <fog attach="fog" args={[isGameOver ? '#000000' : '#27272a', isGameOver ? 2 : 5, isGameOver ? 15 : 25]} />
      
      <ambientLight intensity={isGameOver ? 0.1 : 0.5} color={isGameOver ? '#ef4444' : '#d4d4d8'} />
      {!isGameOver && (
        <directionalLight position={[10, 10, -5]} intensity={1.5} color="#fda4af" castShadow shadow-mapSize={[512, 512]} />
      )}
      
      <Environment preset="night" />
      <ContactShadows position={[0, -0.2, 0]} opacity={0.8} scale={20} resolution={256} blur={1} far={4} color="#000000" />

      <group>
        <FactoryIsland />
        <Smokestack position={[0, 0, -4]} />
        <Smokestack position={[3.5, 0, -4]} />
        
        {/* Mob of Workers */}
        <WorkerModel position={[-1.5, 0.2, 1]} rotation={[0, Math.PI/3, 0]} isAngry={isAngry} />
        <WorkerModel position={[-2.2, 0.2, 0]} rotation={[0, Math.PI/2.5, 0]} isAngry={isAngry} />
        <WorkerModel position={[-0.8, 0.2, 1.5]} rotation={[0, Math.PI/4, 0]} isAngry={isAngry} />
        <WorkerModel position={[-2.8, 0.2, 1.2]} rotation={[0, Math.PI/3.5, 0]} isAngry={isAngry} />

        {/* Dynamic Characters */}
        <RosaModel isActive={isRosaActive} />
        <EngineerModel isActive={isEngineerActive} />
        <GuardsModel isActive={isGuardsActive} />

        {/* Vanguard arriving */}
        <VanguardModel position={[1.5, 0.2, 3.5]} rotation={[0, -Math.PI/4, 0]} />
      </group>
    </>
  );
}
