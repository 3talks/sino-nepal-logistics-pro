import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LogisticsTruckProps {
  scrollOffset?: number;
}

const LogisticsTruck = ({ scrollOffset = 0 }: LogisticsTruckProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const wheelRefs = useRef<THREE.Mesh[]>([]);

  // Create path for truck to follow
  const path = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-8, -1, 2),
      new THREE.Vector3(-4, -0.5, 1),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(4, -0.5, 1),
      new THREE.Vector3(8, -1, 2),
    ]);
    return curve;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Calculate progress along path (0 to 1)
      const time = state.clock.elapsedTime * 0.1;
      const progress = (time % 1);
      
      // Get position and tangent from path
      const position = path.getPointAt(progress);
      const tangent = path.getTangentAt(progress);
      
      // Update truck position
      groupRef.current.position.copy(position);
      
      // Rotate truck to face direction of travel
      const angle = Math.atan2(tangent.x, tangent.z);
      groupRef.current.rotation.y = angle;
      
      // Add subtle bobbing motion
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.05;
      
      // Rotate wheels
      wheelRefs.current.forEach((wheel) => {
        if (wheel) {
          wheel.rotation.x += 0.1;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Container/Cargo */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.5, 1, 2.5]} />
        <meshStandardMaterial 
          color="#00B4A1" 
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Container details - stripes */}
      <mesh position={[0, 0.5, -0.6]}>
        <boxGeometry args={[1.52, 0.1, 0.1]} />
        <meshStandardMaterial color="#FFBD00" />
      </mesh>
      <mesh position={[0, 0.5, 0.6]}>
        <boxGeometry args={[1.52, 0.1, 0.1]} />
        <meshStandardMaterial color="#FFBD00" />
      </mesh>

      {/* Truck Cab */}
      <mesh position={[0, 0.4, 1.5]}>
        <boxGeometry args={[1.2, 0.8, 0.8]} />
        <meshStandardMaterial 
          color="#001F3F" 
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Cab roof */}
      <mesh position={[0, 0.9, 1.5]}>
        <boxGeometry args={[1.2, 0.2, 0.6]} />
        <meshStandardMaterial color="#001F3F" />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 0.5, 1.85]}>
        <boxGeometry args={[0.8, 0.4, 0.05]} />
        <meshStandardMaterial 
          color="#4A90E2" 
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Wheels */}
      {/* Front Left */}
      <mesh 
        ref={(el) => { if (el) wheelRefs.current[0] = el; }}
        position={[-0.7, -0.2, 1.3]} 
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>

      {/* Front Right */}
      <mesh 
        ref={(el) => { if (el) wheelRefs.current[1] = el; }}
        position={[0.7, -0.2, 1.3]} 
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>

      {/* Rear Left */}
      <mesh 
        ref={(el) => { if (el) wheelRefs.current[2] = el; }}
        position={[-0.7, -0.2, -0.8]} 
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>

      {/* Rear Right */}
      <mesh 
        ref={(el) => { if (el) wheelRefs.current[3] = el; }}
        position={[0.7, -0.2, -0.8]} 
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>

      {/* Wheel rims */}
      {[-0.7, 0.7].map((x, i) => 
        [1.3, -0.8].map((z, j) => (
          <mesh 
            key={`rim-${i}-${j}`}
            position={[x, -0.2, z]} 
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.15, 0.15, 0.22, 8]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.8} />
          </mesh>
        ))
      )}
    </group>
  );
};

export default LogisticsTruck;
