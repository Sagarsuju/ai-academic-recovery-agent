'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedOrbMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.8;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.3}>
      <sphereGeometry args={[1, 32, 32]} />
      <MeshDistortMaterial
        color="#6C63FF"
        emissive="#4FACFE"
        emissiveIntensity={0.5}
        distort={0.45}
        speed={2.6}
        roughness={0.2}
        metalness={0.4}
      />
    </mesh>
  );
}

export default function ThinkingOrb() {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // Fallback CSS spinner if WebGL is unsupported
  if (!isClient || !hasWebGL) {
    return (
      <div className="w-10 h-10 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-[#6C63FF] animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-12 h-12 relative flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        style={{ width: '48px', height: '48px', background: 'transparent' }}
      >
        <ambientLight intensity={1.2} />
        <pointLight position={[3, 3, 3]} intensity={1.5} color="#4FACFE" />
        <pointLight position={[-3, -3, 2]} intensity={1.0} color="#6C63FF" />
        <AnimatedOrbMesh />
      </Canvas>
    </div>
  );
}
