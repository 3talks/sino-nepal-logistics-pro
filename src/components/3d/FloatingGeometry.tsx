import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

interface GeometryProps {
  position: [number, number, number];
  type: 'sphere' | 'torus' | 'octahedron';
  scrollOffset?: number;
}

const FloatingGeometry = ({ position, type, scrollOffset = 0 }: GeometryProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.008;
      
      // Add parallax effect based on scroll
      const parallaxY = scrollOffset * 0.002;
      const floatOffset = Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
      meshRef.current.position.y = position[1] + floatOffset + parallaxY;
      meshRef.current.position.x = position[0] + Math.sin(scrollOffset * 0.001) * 0.5;
    }
  });

  const renderGeometry = () => {
    const commonProps = {
      ref: meshRef,
      position: position,
    };

    switch (type) {
      case 'sphere':
        return (
          <Sphere {...commonProps} args={[0.5, 32, 32]}>
            <meshStandardMaterial color="#FFBD00" metalness={0.8} roughness={0.2} />
          </Sphere>
        );
      case 'torus':
        return (
          <Torus {...commonProps} args={[0.4, 0.15, 16, 32]}>
            <meshStandardMaterial color="#00B4A1" metalness={0.9} roughness={0.1} />
          </Torus>
        );
      case 'octahedron':
        return (
          <Octahedron {...commonProps} args={[0.5]}>
            <meshStandardMaterial color="#001F3F" metalness={0.7} roughness={0.3} />
          </Octahedron>
        );
    }
  };

  return renderGeometry();
};

export default FloatingGeometry;
