'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface TopicItem {
  id: string;
  unit: string;
  title: string;
  completed: boolean;
}

interface BlockProps {
  position: [number, number, number];
  completed: boolean;
  title: string;
  unit: string;
  onClick: () => void;
}

function FloatingTopicBlock({ position, completed, title, unit, onClick }: BlockProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Gentle float & spin
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.12;
    }
  });

  const materialColor = completed ? '#6C63FF' : '#CBD5E1';
  const emissiveColor = completed ? '#4FACFE' : '#94A3B8';
  const emissiveIntensity = completed ? (hovered ? 0.9 : 0.6) : 0.1;

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.15 : 1.0}
      >
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial
          color={materialColor}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={completed ? 0.9 : 0.55}
          roughness={0.2}
          metalness={completed ? 0.7 : 0.2}
        />
      </mesh>
    </group>
  );
}

interface TopicsSceneProps {
  topics: TopicItem[];
  onToggleTopic: (id: string) => void;
}

function TopicsScene({ topics, onToggleTopic }: TopicsSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  // Arrange blocks in an arc/orbit
  const positions = useMemo(() => {
    const total = topics.length;
    return topics.map((_, idx) => {
      const angle = (idx / total) * Math.PI * 2;
      const radius = 2.2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (idx % 2 === 0 ? 0.2 : -0.2);
      return [x, y, z] as [number, number, number];
    });
  }, [topics.length]);

  return (
    <group ref={groupRef}>
      {topics.map((topic, idx) => (
        <FloatingTopicBlock
          key={topic.id}
          position={positions[idx] || [0, 0, 0]}
          completed={topic.completed}
          title={topic.title}
          unit={topic.unit}
          onClick={() => onToggleTopic(topic.id)}
        />
      ))}
    </group>
  );
}

interface Topics3DWidgetProps {
  initialTopics?: TopicItem[];
  courseCode?: string;
  courseTitle?: string;
  onTopicToggled?: (updatedTopics: TopicItem[]) => void;
}

const DEFAULT_TOPICS: TopicItem[] = [
  { id: 't-1', unit: 'Unit I', title: 'ER Model & Schema Design', completed: true },
  { id: 't-2', unit: 'Unit II', title: 'Relational Algebra & Calculus', completed: true },
  { id: 't-3', unit: 'Unit III', title: 'SQL & Advanced Subqueries', completed: true },
  { id: 't-4', unit: 'Unit IV', title: 'Functional Dependencies & BCNF', completed: false },
  { id: 't-5', unit: 'Unit V', title: 'ACID & Concurrency Control', completed: false },
  { id: 't-6', unit: 'Unit V', title: 'Failure Recovery Techniques', completed: false }
];

export default function Topics3DWidget({
  initialTopics = DEFAULT_TOPICS,
  courseCode = 'CS301',
  courseTitle = 'Database Management Systems',
  onTopicToggled
}: Topics3DWidgetProps) {
  const [topics, setTopics] = useState<TopicItem[]>(initialTopics);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mount only when in viewport via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleToggle = (id: string) => {
    const updated = topics.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    setTopics(updated);
    if (onTopicToggled) {
      onTopicToggled(updated);
    }
  };

  const completedCount = topics.filter((t) => t.completed).length;
  const percent = Math.round((completedCount / topics.length) * 100);

  return (
    <div ref={containerRef} className="glass-card p-5 rounded-2xl relative overflow-hidden space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-mono font-bold text-xs text-[#6C63FF] bg-[#6C63FF]/10 px-2 py-0.5 rounded">
              {courseCode}
            </span>
            <span className="text-xs font-semibold text-[#6B7280]">Interactive 3D Topics</span>
          </div>
          <h4 className="text-sm font-bold text-[#1E2333]">{courseTitle}</h4>
        </div>

        <div className="text-right">
          <div className="text-base font-extrabold text-[#6C63FF] font-mono">{percent}%</div>
          <div className="text-[11px] text-[#6B7280]">
            {completedCount}/{topics.length} Units Done
          </div>
        </div>
      </div>

      {/* 3D Canvas Area (Mounts on Viewport Intersection) */}
      <div className="w-full h-44 rounded-xl bg-gradient-to-b from-slate-50 to-white/50 border border-slate-200/80 relative overflow-hidden">
        {isVisible ? (
          <Canvas camera={{ position: [0, 1.2, 4.2], fov: 45 }}>
            <ambientLight intensity={0.9} />
            <pointLight position={[5, 5, 5]} intensity={1.2} color="#6C63FF" />
            <pointLight position={[-5, -3, 3]} intensity={0.9} color="#4FACFE" />
            <TopicsScene topics={topics} onToggleTopic={handleToggle} />
          </Canvas>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
            Scroll to activate 3D blocks...
          </div>
        )}

        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] text-slate-500 pointer-events-none">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded bg-[#6C63FF] shadow-xs" /> Completed (Glowing)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded bg-slate-300" /> Pending (Translucent)
          </span>
          <span className="text-[#6C63FF] font-medium pointer-events-auto cursor-pointer">
            Click block to toggle
          </span>
        </div>
      </div>

      {/* Topic Mini Pill Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => handleToggle(topic.id)}
            className={`p-2 rounded-xl text-left border text-xs transition flex flex-col justify-between ${
              topic.completed
                ? 'bg-gradient-to-r from-[#6C63FF]/10 to-[#4FACFE]/10 border-[#6C63FF]/30 text-[#1E2333]'
                : 'bg-white/80 border-slate-200 text-slate-500 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-mono mb-1">
              <span className={topic.completed ? 'text-[#6C63FF] font-bold' : 'text-slate-400'}>
                {topic.unit}
              </span>
              <span className={`w-1.5 h-1.5 rounded-full ${topic.completed ? 'bg-[#34D399]' : 'bg-slate-300'}`} />
            </div>
            <span className="truncate text-[11px] font-medium">
              {topic.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
