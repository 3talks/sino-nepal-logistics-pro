import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingShieldProps {
  scrollOffset?: number;
}

const FloatingShield = ({ scrollOffset = 0 }: FloatingShieldProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      
      // Add parallax effect
      const floatY = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      groupRef.current.position.y = floatY + (scrollOffset * 0.002);
      groupRef.current.position.x = Math.sin(scrollOffset * 0.0005) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Shield shape made of boxes */}
      <RoundedBox args={[2, 2.5, 0.3]} radius={0.2} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#22C55E" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#22C55E"
          emissiveIntensity={0.2}
        />
      </RoundedBox>
      
      {/* Shield emblem */}
      <RoundedBox args={[1.2, 1.5, 0.4]} radius={0.15} position={[0, 0, 0.2]}>
        <meshStandardMaterial 
          color="#FFBD00" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#FFBD00"
          emissiveIntensity={0.3}
        />
      </RoundedBox>
    </group>
  );
};

export default FloatingShield;
