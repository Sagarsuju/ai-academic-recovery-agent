'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export type BloomAnimationPhase = 'contained' | 'breakout' | 'bloom' | 'settled';

interface NodePoint {
  position: [number, number, number];
  basePosition: [number, number, number];
  color: string;
  size: number;
  speed: number;
  offset: number;
}

interface HeroNetworkBloomSceneProps {
  phase: BloomAnimationPhase;
  isLowTier?: boolean;
}

function DynamicCameraAndBloom({ phase }: { phase: BloomAnimationPhase }) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    let targetZ = 5.2;

    if (phase === 'contained') {
      targetZ = 5.2;
    } else if (phase === 'breakout') {
      // Dramatic forward zoom
      targetZ = 3.3;
    } else if (phase === 'bloom') {
      targetZ = 3.8;
    } else {
      // Settled state
      targetZ = 4.6;
    }

    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2.5, delta);
  });

  return null;
}

function NetworkGraph({ phase, isLowTier }: { phase: BloomAnimationPhase; isLowTier: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Mouse tilt tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 1. Generate nodes: 18 nodes (or 10 for low-tier)
  // Palette: Cyan-Blue (#3B82F6), Violet-Purple (#8B5CF6), Emerald-Green (#10B981)
  const nodes = useMemo(() => {
    const count = isLowTier ? 10 : 18;
    const generated: NodePoint[] = [];

    // Distribution: 6 Blue, 7 Violet, 5 Green (or scaled down for low-tier)
    const colorPalette = [
      '#3B82F6', '#8B5CF6', '#10B981', '#3B82F6', '#8B5CF6', '#3B82F6',
      '#8B5CF6', '#10B981', '#8B5CF6', '#3B82F6', '#10B981', '#8B5CF6',
      '#3B82F6', '#8B5CF6', '#10B981', '#3B82F6', '#8B5CF6', '#10B981'
    ];

    const sizes = [
      0.14, 0.17, 0.11, 0.15, 0.18, 0.12,
      0.16, 0.10, 0.15, 0.13, 0.12, 0.17,
      0.11, 0.16, 0.09, 0.14, 0.15, 0.12
    ];

    for (let i = 0; i < count; i++) {
      const radius = 2.1 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta) * 0.85;
      const z = radius * Math.cos(phi);

      generated.push({
        position: [x, y, z],
        basePosition: [x, y, z],
        color: colorPalette[i % colorPalette.length],
        size: sizes[i % sizes.length],
        speed: 0.3 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2
      });
    }

    return generated;
  }, [isLowTier]);

  // 2. k-Nearest-Neighbors (k=2 to 3) edge connectivity rule
  const initialEdges = useMemo(() => {
    const lines: [number, number][] = [];
    const connectedPairs = new Set<string>();

    for (let i = 0; i < nodes.length; i++) {
      const p1 = new THREE.Vector3(...nodes[i].basePosition);
      const distances: { index: number; dist: number }[] = [];

      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const p2 = new THREE.Vector3(...nodes[j].basePosition);
        distances.push({ index: j, dist: p1.distanceTo(p2) });
      }

      // Sort ascending by Euclidean distance
      distances.sort((a, b) => a.dist - b.dist);

      // Connect to the 2 or 3 closest neighbors (k-NN)
      const k = i % 2 === 0 ? 3 : 2;
      for (let n = 0; n < k && n < distances.length; n++) {
        const neighbor = distances[n].index;
        const key = i < neighbor ? `${i}-${neighbor}` : `${neighbor}-${i}`;
        if (!connectedPairs.has(key)) {
          connectedPairs.add(key);
          lines.push([i, neighbor]);
        }
      }
    }

    return lines;
  }, [nodes]);

  // Create dynamic line geometry
  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(initialEdges.length * 6);
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [initialEdges]);

  // Current runtime node positions
  const currentPositions = useRef<THREE.Vector3[]>(
    nodes.map((n) => new THREE.Vector3(...n.basePosition))
  );

  // Mesh refs for individual spheres
  const sphereRefs = useRef<(THREE.Mesh | null)[]>([]);

  // 3. Animation loop: floating physics + breakout expansion + mouse parallax
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Expansion multiplier based on phase
    let expansionFactor = 1.0;
    let nodeScaleMultiplier = 1.0;

    if (phase === 'breakout') {
      expansionFactor = 1.38;
      nodeScaleMultiplier = 1.25;
    } else if (phase === 'bloom') {
      expansionFactor = 1.22;
      nodeScaleMultiplier = 1.15;
    } else if (phase === 'settled') {
      expansionFactor = 1.08;
      nodeScaleMultiplier = 1.0;
    }

    // Update node positions and meshes
    const posAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    nodes.forEach((node, i) => {
      // Natural organic drift
      const waveX = Math.sin(time * node.speed + node.offset) * 0.16;
      const waveY = Math.cos(time * (node.speed * 0.8) + node.offset) * 0.16;
      const waveZ = Math.sin(time * (node.speed * 1.2) + node.offset) * 0.12;

      const current = currentPositions.current[i];
      const targetX = (node.basePosition[0] + waveX) * expansionFactor;
      const targetY = (node.basePosition[1] + waveY) * expansionFactor;
      const targetZ = (node.basePosition[2] + waveZ) * expansionFactor;

      current.x = THREE.MathUtils.damp(current.x, targetX, 3.5, delta);
      current.y = THREE.MathUtils.damp(current.y, targetY, 3.5, delta);
      current.z = THREE.MathUtils.damp(current.z, targetZ, 3.5, delta);

      const mesh = sphereRefs.current[i];
      if (mesh) {
        mesh.position.copy(current);
        const targetScale = nodeScaleMultiplier;
        mesh.scale.setScalar(
          THREE.MathUtils.damp(mesh.scale.x, targetScale, 4.0, delta)
        );
      }
    });

    // Update connecting lines
    initialEdges.forEach(([i, j], edgeIdx) => {
      const p1 = currentPositions.current[i];
      const p2 = currentPositions.current[j];
      const offset = edgeIdx * 6;

      posArray[offset] = p1.x;
      posArray[offset + 1] = p1.y;
      posArray[offset + 2] = p1.z;
      posArray[offset + 3] = p2.x;
      posArray[offset + 4] = p2.y;
      posArray[offset + 5] = p2.z;
    });

    posAttr.needsUpdate = true;

    // Line material shimmer
    if (linesRef.current) {
      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      const baseOpacity = phase === 'breakout' ? 0.55 : phase === 'bloom' ? 0.45 : 0.32;
      mat.opacity = baseOpacity + Math.sin(time * 2.0) * 0.08;
    }

    // Gentle global rotation + Mouse Parallax
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x += delta * 0.04;

      const targetRotY = mouse.current.x * 0.32;
      const targetRotX = -mouse.current.y * 0.22;

      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 2.0, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 2.0, delta);
    }
  });

  return (
    <group ref={groupRef}>
      {/* 18 Spherical Nodes */}
      {nodes.map((node, i) => (
        <mesh
          key={i}
          ref={(el) => {
            sphereRefs.current[i] = el;
          }}
          position={node.basePosition}
        >
          <sphereGeometry args={[node.size, 24, 24]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={phase === 'breakout' || phase === 'bloom' ? 0.85 : 0.48}
            roughness={0.22}
            metalness={0.65}
          />
        </mesh>
      ))}

      {/* k-NN Connected Lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#94A3B8"
          transparent
          opacity={0.32}
          blending={THREE.NormalBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export default function HeroNetworkBloomScene({
  phase = 'contained',
  isLowTier = false
}: HeroNetworkBloomSceneProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
    }
  }, []);

  return (
    <div className="w-full h-full relative" style={{ minHeight: '440px' }}>
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 46 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: !isLowTier, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.1} />
        <pointLight position={[6, 6, 6]} intensity={1.8} color="#6C63FF" />
        <pointLight position={[-6, -4, 4]} intensity={1.4} color="#3B82F6" />
        <pointLight position={[0, 4, -4]} intensity={1.0} color="#10B981" />
        <pointLight position={[0, 0, 4]} intensity={phase === 'breakout' || phase === 'bloom' ? 2.5 : 0.8} color="#FFFFFF" />

        {!reducedMotion && <DynamicCameraAndBloom phase={phase} />}
        <NetworkGraph phase={reducedMotion ? 'settled' : phase} isLowTier={isLowTier} />
      </Canvas>
    </div>
  );
}
