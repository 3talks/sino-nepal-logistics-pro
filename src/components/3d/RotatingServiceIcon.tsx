import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface RotatingServiceIconProps {
  color: string;
  index: number;
  scrollOffset?: number;
}

const RotatingServiceIcon = ({ color, index, scrollOffset = 0 }: RotatingServiceIconProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5 + index;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.2;
      
      // Add parallax floating with scroll
      const floatY = Math.sin(state.clock.elapsedTime * 0.5 + index * 0.5) * 0.2;
      meshRef.current.position.y = floatY + (scrollOffset * 0.0015);
    }
  });

  return (
    <RoundedBox 
      ref={meshRef} 
      args={[1, 1, 1]} 
      radius={0.1} 
      smoothness={4}
      position={[
        Math.cos((index / 6) * Math.PI * 2) * 3,
        0,
        Math.sin((index / 6) * Math.PI * 2) * 3
      ]}
    >
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </RoundedBox>
  );
};

export default RotatingServiceIcon;
