'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NodePoint {
  position: [number, number, number];
  color: string;
  size: number;
}

function NetworkGraph() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Track mouse for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate node coordinates and connections
  const { nodes, lineSegments } = useMemo(() => {
    const nodeCount = 32;
    const generatedNodes: NodePoint[] = [];
    const colors = ['#6C63FF', '#4FACFE', '#818CF8', '#38BDF8', '#A78BFA', '#34D399'];

    for (let i = 0; i < nodeCount; i++) {
      const radius = 2.4 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = (radius * Math.sin(phi) * Math.sin(theta)) * 0.8;
      const z = radius * Math.cos(phi);

      generatedNodes.push({
        position: [x, y, z],
        color: colors[i % colors.length],
        size: 0.08 + Math.random() * 0.07
      });
    }

    // Connect nodes within threshold distance
    const lines: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < generatedNodes.length; i++) {
      const p1 = new THREE.Vector3(...generatedNodes[i].position);
      for (let j = i + 1; j < generatedNodes.length; j++) {
        const p2 = new THREE.Vector3(...generatedNodes[j].position);
        if (p1.distanceTo(p2) < 2.1) {
          lines.push([p1, p2]);
        }
      }
    }

    return { nodes: generatedNodes, lineSegments: lines };
  }, []);

  // Frame animation loop
  useFrame((_, delta) => {
    if (groupRef.current) {
      // Continuous slow rotation
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.05;

      // Gentle mouse parallax interpolation
      groupRef.current.rotation.y += (mouse.current.x * 0.3 - groupRef.current.rotation.y) * 0.02;
      groupRef.current.rotation.x += (-mouse.current.y * 0.2 - groupRef.current.rotation.x) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Network Nodes */}
      {nodes.map((node, idx) => (
        <mesh key={idx} position={node.position}>
          <sphereGeometry args={[node.size, 16, 16]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}

      {/* Network Edge Lines */}
      {lineSegments.map((segment, idx) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(segment);
        return (
          <lineSegments key={idx} geometry={geometry}>
            <lineBasicMaterial
              color="#6C63FF"
              transparent
              opacity={0.35}
              blending={THREE.NormalBlending}
            />
          </lineSegments>
        );
      })}
    </group>
  );
}

export default function HeroNetworkScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile / low-power CSS gradient fallback
  if (isMobile) {
    return (
      <div className="w-full h-full flex items-center justify-center relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#6C63FF]/15 via-[#4FACFE]/10 to-transparent border border-slate-200/80 shadow-glass">
        <div className="absolute w-48 h-48 rounded-full bg-gradient-to-tr from-[#6C63FF]/30 to-[#4FACFE]/30 blur-2xl animate-pulse" />
        <div className="relative z-10 text-center p-6">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-[#6C63FF] to-[#4FACFE] flex items-center justify-center shadow-lg shadow-[#6C63FF]/30">
            <span className="text-white text-2xl font-black">AI</span>
          </div>
          <span className="text-xs font-semibold text-[#6C63FF] tracking-wider uppercase">
            Autonomous Academic Engine
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[420px] md:h-[480px] relative rounded-3xl overflow-hidden bg-gradient-to-b from-white/70 to-slate-50/70 border border-slate-200/80 shadow-glass">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.9} />
        <pointLight position={[6, 6, 6]} intensity={1.5} color="#6C63FF" />
        <pointLight position={[-6, -4, 4]} intensity={1.2} color="#4FACFE" />
        <pointLight position={[0, 4, -4]} intensity={0.8} color="#A78BFA" />
        <NetworkGraph />
      </Canvas>

      {/* Floating Badge overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none px-2">
        <span className="text-[11px] font-semibold text-slate-500 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-xs flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
          Interactive 3D Graph • Mouse Tilt Enabled
        </span>
        <span className="text-[11px] font-semibold text-[#6C63FF] bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-xs">
          WebGL Powered
        </span>
      </div>
    </div>
  );
}
