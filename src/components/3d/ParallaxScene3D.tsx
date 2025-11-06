import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ParallaxScene3DProps {
  children: React.ReactNode;
  className?: string;
  scrollY?: number;
  parallaxStrength?: number;
}

const ParallaxScene3D = ({ 
  children, 
  className = '', 
  scrollY = 0,
  parallaxStrength = 1
}: ParallaxScene3DProps) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    if (cameraRef.current) {
      // Apply parallax effect to camera position
      const parallaxY = (scrollY * 0.001 * parallaxStrength);
      const parallaxX = Math.sin(scrollY * 0.0005) * parallaxStrength;
      
      cameraRef.current.position.y = parallaxY;
      cameraRef.current.position.x = parallaxX;
      cameraRef.current.lookAt(0, 0, 0);
    }
  }, [scrollY, parallaxStrength]);

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas>
        <PerspectiveCamera 
          ref={cameraRef}
          makeDefault 
          position={[0, 0, 8]} 
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        <pointLight position={[0, 0, 5]} intensity={0.5} color="#00B4A1" />
        <spotLight position={[5, 5, 5]} intensity={0.3} color="#FFBD00" />
        
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ParallaxScene3D;
