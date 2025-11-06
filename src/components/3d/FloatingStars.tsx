import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingStars = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  // Create star shapes at different positions
  const starPositions = [
    [-3, 2, 0],
    [3, 1, -1],
    [0, -2, 1],
    [-2, -1, -2],
    [2, 2, -1],
  ];

  return (
    <group ref={groupRef}>
      {starPositions.map((pos, index) => (
        <mesh key={index} position={pos as [number, number, number]}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial
            color="#FFBD00"
            metalness={0.9}
            roughness={0.1}
            emissive="#FFBD00"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

export default FloatingStars;
