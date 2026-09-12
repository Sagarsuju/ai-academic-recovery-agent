'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Zap,
  Calendar,
  ShieldCheck,
  Cpu,
  Bot,
  Layers,
  Database,
  Users,
  GraduationCap,
  ShieldAlert,
  UserCheck,
  CheckCircle2,
  BookOpen,
  Award
} from 'lucide-react';

const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Deficit Prediction',
    badge: 'Agent 1',
    description: 'Tracks weekly syllabus completion pace and student attendance trends to predict end-of-term delays weeks in advance.',
    icon: <TrendingUp className="w-6 h-6 text-[#6C63FF]" />,
    bg: '#F0EEFF',
    border: '#E0DBFF'
  },
  {
    step: '02',
    title: 'Smart Recovery',
    badge: 'Agent 2',
    description: 'Calculates the exact remedial lecture hours needed and selects high-weight examination topics to recover syllabus velocity.',
    icon: <Zap className="w-6 h-6 text-[#F59E0B]" />,
    bg: '#FFFBEB',
    border: '#FDE68A'
  },
  {
    step: '03',
    title: 'Timetable Optimization',
    badge: 'Agent 3',
    description: 'Automatically detects student and faculty free periods, allocating conflict-free classroom slots for remedial sessions.',
    icon: <Calendar className="w-6 h-6 text-[#0284C7]" />,
    bg: '#EAF6FF',
    border: '#BAE6FD'
  },
  {
    step: '04',
    title: 'Signoff & Live Sync',
    badge: 'HOD + Agent 4',
    description: 'HOD approves the generated plan in one click, broadcasting schedules to student dashboards and syncing with university SIS.',
    icon: <ShieldCheck className="w-6 h-6 text-[#10B981]" />,
    bg: '#ECFDF5',
    border: '#A7F3D0'
  }
];

const AGENTS = [
  {
    name: 'Completion Predictor',
    category: 'Risk Forecaster',
    description: 'Applies trajectory modeling to forecast course syllabus completion dates and flag lagging courses before midterms.',
    icon: <TrendingUp className="w-5 h-5 text-[#6C63FF]" />,
    bg: '#F0EEFF',
    border: '#E0DBFF'
  },
  {
    name: 'Recovery Plan Formulator',
    category: 'Syllabus Optimizer',
    description: 'Ranks prerequisite units and computes the minimum number of remedial classes required to restore full on-track status.',
    icon: <Zap className="w-5 h-5 text-[#F59E0B]" />,
    bg: '#FFFBEB',
    border: '#FDE68A'
  },
  {
    name: 'Conflict-Free Scheduler',
    category: 'Timetable Constraint Engine',
    description: 'Parses room availability, faculty schedules, and student cohort timetables to propose optimal extra class timings.',
    icon: <Calendar className="w-5 h-5 text-[#0284C7]" />,
    bg: '#EAF6FF',
    border: '#BAE6FD'
  },
  {
    name: 'Attendance & SIS Sync',
    category: 'Microservice Connector',
    description: 'Continuously syncs with external attendance systems and lesson plan databases on an automated APScheduler cadence.',
    icon: <Database className="w-5 h-5 text-[#10B981]" />,
    bg: '#ECFDF5',
    border: '#A7F3D0'
  },
  {
    name: 'University Policy RAG',
    category: 'Offline Knowledge Base',
    description: 'Offline ChromaDB vectorstore with sentence embeddings answering questions about R22 regulations and remedial rules.',
    icon: <Bot className="w-5 h-5 text-[#EC4899]" />,
    bg: '#FDF2F8',
    border: '#FBCFE8'
  }
];

// Interactive 3D Knowledge Network Overlay Nodes
const GRAPH_NODES = [
  { label: 'Students', x: '18%', y: '22%', color: '#38BDF8', size: 10 },
  { label: 'Courses', x: '45%', y: '15%', color: '#6C63FF', size: 12 },
  { label: 'Syllabus', x: '82%', y: '28%', color: '#F59E0B', size: 11 },
  { label: 'Attendance', x: '12%', y: '68%', color: '#10B981', size: 10 },
  { label: 'Remedial', x: '52%', y: '82%', color: '#EC4899', size: 13 },
  { label: 'Exams', x: '85%', y: '75%', color: '#0284C7', size: 11 }
];

export default function PublicLandingPage() {
  const [isPlayingIntro, setIsPlayingIntro] = useState(true);

  // Mouse Parallax Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const parallaxXBg = useSpring(useTransform(mouseX, [-500, 500], [-8, 8]), springConfig);
  const parallaxYBg = useSpring(useTransform(mouseY, [-500, 500], [-8, 8]), springConfig);

  const parallaxXMid = useSpring(useTransform(mouseX, [-500, 500], [-18, 18]), springConfig);
  const parallaxYMid = useSpring(useTransform(mouseY, [-500, 500], [-18, 18]), springConfig);

  const parallaxXFore = useSpring(useTransform(mouseX, [-500, 500], [-30, 30]), springConfig);
  const parallaxYFore = useSpring(useTransform(mouseY, [-500, 500], [-30, 30]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen text-[#1E2333] relative overflow-hidden" 
      style={{ backgroundColor: '#F7F9FC', fontFamily: 'var(--font-sans)' }}
    >
      {/* Intro Video Fullscreen Overlay */}
      {isPlayingIntro && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          backgroundColor: '#0F172A',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          <video
            autoPlay
            muted
            playsInline
            onEnded={() => setIsPlayingIntro(false)}
            style={{
              width: '100vw',
              height: '100vh',
              objectFit: 'contain'
            }}
          >
            <source src="/intro_video.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>

          <button
            onClick={() => setIsPlayingIntro(false)}
            style={{
              position: 'absolute',
              bottom: '32px',
              right: '32px',
              zIndex: 10000,
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '10px 20px',
              borderRadius: '999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              transition: 'all 0.2s ease'
            }}
          >
            <span>Skip Intro</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* BACKGROUND DEPTH LAYER */}
      <motion.div 
        style={{ x: parallaxXBg, y: parallaxYBg }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-0 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.18)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-10 right-0 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(79,172,254,0.18)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-[800px] left-1/4 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.14)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-[1400px] right-10 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.14)_0%,transparent_70%)] blur-3xl" />
        
        {/* Faint Architectural Grid Texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(108, 99, 255, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(108, 99, 255, 0.025) 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />
      </motion.div>

      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#E8ECF3] shadow-xs">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Top Left Vignan's University Official Logo */}
          <Link href="/" className="flex items-center justify-start text-decoration-none">
            <img
              src="/logo.png"
              alt="Vignan's Foundation for Science, Technology and Research"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain max-w-[280px] sm:max-w-[380px] md:max-w-[480px]"
            />
          </Link>

          {/* Nav & Login CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-semibold text-[#475569] hover:text-[#6C63FF] px-3.5 py-2 rounded-lg transition"
            >
              Role Access
            </Link>
            <Link
              href="/login"
              className="btn-primary gradient-btn text-xs font-semibold px-4.5 py-2.5 rounded-xl"
            >
              Sign In to Portal <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </header>

      {/* IMMERSIVE 3D HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-24 px-6 border-b border-[#E8ECF3]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT HERO CONTENT */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 z-10"
          >
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E0DBFF] text-xs font-bold text-[#6C63FF] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#6C63FF]" />
              Autonomous Academic Recovery & Syllabus Intelligence
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1E2333] leading-[1.18]" style={{ fontFamily: 'var(--font-heading)' }}>
              Intelligent syllabus tracking & remedial recovery powered by{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] via-[#4FACFE] to-[#38BDF8]">
                multi-agent AI
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
              Detect course deficits weeks ahead of examinations, formulate personalized remedial class schedules, and resolve timetable conflicts automatically.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/login" className="btn-primary gradient-btn text-sm font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-indigo-500/25 transition">
                Launch Academic Workstation <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link
                href="/login?role=STUDENT"
                className="btn-secondary text-sm font-semibold px-6 py-3.5 rounded-xl border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#334155] transition"
              >
                Student Portal
              </Link>
            </div>

            {/* 3D Floating Glass Metric Cards */}
            <motion.div 
              style={{ x: parallaxXFore, y: parallaxYFore }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E8ECF3]"
            >
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#E8ECF3] shadow-md hover:border-[#6C63FF] transition"
              >
                <div className="flex items-center gap-1.5 text-xs text-[#64748B] mb-1 font-semibold">
                  <Database className="w-3.5 h-3.5 text-[#6C63FF]" /> RAG Engine
                </div>
                <div className="text-2xl font-extrabold text-[#6C63FF]" style={{ fontFamily: 'var(--font-heading)' }}>100%</div>
                <div className="text-[11px] text-[#64748B] mt-0.5 font-medium">Offline ChromaDB RAG</div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#E8ECF3] shadow-md hover:border-[#0284C7] transition"
              >
                <div className="flex items-center gap-1.5 text-xs text-[#64748B] mb-1 font-semibold">
                  <Cpu className="w-3.5 h-3.5 text-[#0284C7]" /> Orchestration
                </div>
                <div className="text-2xl font-extrabold text-[#0284C7]" style={{ fontFamily: 'var(--font-heading)' }}>5 Agents</div>
                <div className="text-[11px] text-[#64748B] mt-0.5 font-medium">LangGraph Pipeline</div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#E8ECF3] shadow-md hover:border-[#10B981] transition"
              >
                <div className="flex items-center gap-1.5 text-xs text-[#64748B] mb-1 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-[#10B981]" /> Scheduler
                </div>
                <div className="text-2xl font-extrabold text-[#10B981]" style={{ fontFamily: 'var(--font-heading)' }}>0 Conflicts</div>
                <div className="text-[11px] text-[#64748B] mt-0.5 font-medium">Timetable Allocator</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT HERO SIDE: 3D ORGANIC COLLAGE OF 4 CAMPUS PHOTOS + AI MESH + ROBOT */}
          <div className="lg:col-span-6 relative min-h-[500px] flex items-center justify-center">
            
            {/* MIDDLE DEPTH LAYER: Organic Layered Collage of 4 Campus Photos */}
            <motion.div 
              style={{ x: parallaxXMid, y: parallaxYMid }}
              className="relative w-full h-[480px] max-w-[560px] mx-auto"
            >
              {/* Photo 1 (Main Background Base): Courtyard */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-x-4 top-6 bottom-6 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/80 bg-white/40 backdrop-blur-sm"
              >
                <img 
                  src="/campus/courtyard.jpg" 
                  alt="Vignan Campus Courtyard" 
                  className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 bg-white/90 backdrop-blur-md border border-white/80 px-3 py-1 rounded-full shadow-md text-[11px] font-bold text-[#0F172A] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" /> Campus Life
                </div>
              </motion.div>

              {/* Photo 2 (Floating Glass Card Top Right): Vignan Foundation Building */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [2, 1, 2] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 right-0 w-[240px] h-[155px] rounded-2xl overflow-hidden shadow-xl border-2 border-white/90 bg-white/80 backdrop-blur-md z-20 hover:scale-105 transition duration-300"
              >
                <img 
                  src="/campus/foundation.jpg" 
                  alt="Vignan Foundation Building" 
                  className="w-full h-full object-cover filter brightness-[0.98]"
                />
                <div className="absolute bottom-2 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#6C63FF]">
                  Innovation
                </div>
              </motion.div>

              {/* Photo 3 (Floating Glass Card Bottom Left): Orange Building / I Love Vignan */}
              <motion.div
                animate={{ y: [0, 8, 0], rotate: [-3, -1, -3] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 left-0 w-[230px] h-[150px] rounded-2xl overflow-hidden shadow-xl border-2 border-white/90 bg-white/80 backdrop-blur-md z-20 hover:scale-105 transition duration-300"
              >
                <img 
                  src="/campus/ilovevignan.jpg" 
                  alt="Vignan Campus Orange Building" 
                  className="w-full h-full object-cover filter brightness-[0.98]"
                />
                <div className="absolute bottom-2 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#EA580C]">
                  Academic Hub
                </div>
              </motion.div>

              {/* Photo 4 (Floating Glass Card Center-Right Overlay): Aryabhatta Bhavan */}
              <motion.div
                animate={{ y: [0, -6, 0], rotate: [-1, 2, -1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/2 -right-4 -translate-y-1/2 w-[210px] h-[140px] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/90 bg-white/80 backdrop-blur-md z-20 hover:scale-105 transition duration-300"
              >
                <img 
                  src="/campus/aryabhatta.jpg" 
                  alt="Aryabhatta Bhavan Vignan Campus" 
                  className="w-full h-full object-cover filter brightness-[0.98]"
                />
                <div className="absolute bottom-2 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#0284C7]">
                  Research
                </div>
              </motion.div>

              {/* FOREGROUND DEPTH LAYER: 3D Knowledge Graph Network Overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible">
                {/* Connecting Lines */}
                <line x1="20%" y1="22%" x2="45%" y2="15%" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="45%" y1="15%" x2="82%" y2="28%" stroke="rgba(108, 99, 255, 0.6)" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="12%" y1="68%" x2="52%" y2="82%" stroke="rgba(16, 185, 129, 0.6)" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="52%" y1="82%" x2="85%" y2="75%" stroke="rgba(236, 72, 153, 0.6)" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="45%" y1="15%" x2="52%" y2="82%" stroke="rgba(245, 158, 11, 0.5)" strokeWidth="1" strokeDasharray="2 2" />

                {GRAPH_NODES.map((node, i) => (
                  <g key={i}>
                    <circle 
                      cx={node.x} 
                      cy={node.y} 
                      r={node.size} 
                      fill={node.color} 
                      fillOpacity="0.85" 
                      className="animate-pulse" 
                    />
                    <circle 
                      cx={node.x} 
                      cy={node.y} 
                      r={node.size + 4} 
                      fill="none" 
                      stroke={node.color} 
                      strokeWidth="1.5" 
                      strokeOpacity="0.5" 
                    />
                  </g>
                ))}
              </svg>

              {/* 3D ACADEMIC AI ROBOT MASCOT SITTING ON A STACK OF BOOKS */}
              <motion.div 
                style={{ x: parallaxXFore, y: parallaxYFore }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 left-6 z-40 flex flex-col items-center pointer-events-none drop-shadow-2xl"
              >
                {/* Robot Floating Speech Bubble */}
                <div className="bg-white/95 backdrop-blur-md border border-[#E0DBFF] px-3 py-1 rounded-full shadow-lg text-[11px] font-extrabold text-[#4C1D95] mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#6C63FF]" /> AI Assistant Active
                </div>

                {/* Robot SVG Avatar */}
                <div className="relative w-28 h-32">
                  <svg viewBox="0 0 160 180" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="rBody" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="70%" stopColor="#F1F5F9" />
                        <stop offset="100%" stopColor="#CBD5E1" />
                      </linearGradient>
                      <radialGradient id="rEyeGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#38BDF8" />
                        <stop offset="100%" stopColor="#0284C7" />
                      </radialGradient>
                    </defs>

                    {/* Antenna */}
                    <line x1="80" y1="30" x2="80" y2="12" stroke="#94A3B8" strokeWidth="3" />
                    <circle cx="80" cy="10" r="5" fill="#38BDF8" className="animate-ping" />

                    {/* Graduation Cap */}
                    <polygon points="80,12 110,22 80,32 50,22" fill="#1E293B" />
                    <rect x="68" y="27" width="24" height="8" rx="2" fill="#0F172A" />
                    <line x1="105" y1="22" x2="108" y2="38" stroke="#F59E0B" strokeWidth="2" />
                    <circle cx="108" cy="40" r="2.5" fill="#F59E0B" />

                    {/* Head */}
                    <rect x="42" y="32" width="76" height="50" rx="20" fill="url(#rBody)" stroke="#94A3B8" strokeWidth="1.5" />
                    {/* Visor Screen */}
                    <rect x="50" y="40" width="60" height="34" rx="14" fill="#0F172A" />
                    
                    {/* Eyes (Animated Blink) */}
                    <g style={{ animation: 'eyeBlink 4s infinite' }}>
                      <ellipse cx="68" cy="56" rx="7" ry="8" fill="url(#rEyeGlow)" />
                      <circle cx="66" cy="54" r="2.5" fill="#FFFFFF" />
                      <ellipse cx="92" cy="56" rx="7" ry="8" fill="url(#rEyeGlow)" />
                      <circle cx="90" cy="54" r="2.5" fill="#FFFFFF" />
                    </g>

                    {/* Torso */}
                    <rect x="48" y="86" width="64" height="48" rx="22" fill="url(#rBody)" stroke="#94A3B8" strokeWidth="1.5" />
                    <circle cx="80" cy="110" r="10" fill="#F0F9FF" stroke="#38BDF8" strokeWidth="1.5" />
                    <circle cx="80" cy="110" r="5" fill="#38BDF8" />

                    {/* Sitting Legs Hanging */}
                    <rect x="60" y="132" width="12" height="24" rx="6" fill="url(#rBody)" />
                    <rect x="88" y="132" width="12" height="24" rx="6" fill="url(#rBody)" />
                  </svg>
                </div>

                {/* Stack of Academic Books (SUCCEED, IMPROVE, PRACTICE, LEARN) */}
                <div className="flex flex-col items-center -mt-3 gap-0.5">
                  <div className="w-24 h-4 rounded-sm bg-[#6C63FF] text-white text-[9px] font-extrabold flex items-center justify-center shadow-xs">
                    SUCCEED
                  </div>
                  <div className="w-26 h-4 rounded-sm bg-[#38BDF8] text-white text-[9px] font-extrabold flex items-center justify-center shadow-xs">
                    IMPROVE
                  </div>
                  <div className="w-28 h-4 rounded-sm bg-[#F59E0B] text-white text-[9px] font-extrabold flex items-center justify-center shadow-xs">
                    PRACTICE
                  </div>
                  <div className="w-30 h-4 rounded-sm bg-[#10B981] text-white text-[9px] font-extrabold flex items-center justify-center shadow-xs">
                    LEARN
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* ELEGANT TRANSLUCENT FLOWING WAVE BOUNDARY */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full opacity-40">
            <path 
              d="M0,0 C150,90 350,-40 500,50 C650,140 900,10 1200,40 L1200,120 L0,120 Z" 
              fill="url(#waveGrad)" 
            />
            <defs>
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6C63FF" />
                <stop offset="50%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#34D399" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* "HOW IT WORKS" SECTION */}
      <section className="py-20 px-6 bg-white/80 backdrop-blur-sm border-b border-[#E8ECF3]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6C63FF] bg-[#F0EEFF] px-3.5 py-1 rounded-full border border-[#E0DBFF]">
              End-to-End Autonomous Pipeline
            </span>
            <h2 className="text-3xl font-extrabold text-[#1E2333]" style={{ fontFamily: 'var(--font-heading)' }}>
              How the Academic Recovery Agent Works
            </h2>
            <p className="text-sm text-[#64748B]">
              From real-time attendance ingestion to automated remedial classroom allocation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS_STEPS.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-card glass-card-interactive p-6 rounded-2xl border border-[#E8ECF3] bg-white/90 shadow-md relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#64748B]">
                      STEP {item.step}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#475569]">
                      {item.badge}
                    </span>
                  </div>

                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: item.bg, border: `1px solid ${item.border}` }}
                  >
                    {item.icon}
                  </div>

                  <h3 className="text-base font-bold text-[#1E2333] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 SPECIALIZED AUTONOMOUS AGENTS */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7] bg-[#EAF6FF] px-3.5 py-1 rounded-full border border-[#BAE6FD]">
              Coordinated Architecture
            </span>
            <h2 className="text-3xl font-extrabold text-[#1E2333]" style={{ fontFamily: 'var(--font-heading)' }}>
              Specialized Multi-Agent Microservices
            </h2>
            <p className="text-sm text-[#64748B]">
              Each agent operates independently to predict risk, synthesize recovery, and resolve room allocations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AGENTS.map((agent, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card glass-card-interactive p-6 rounded-2xl border border-[#E8ECF3] bg-white/90 shadow-md space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: agent.bg, border: `1px solid ${agent.border}` }}
                  >
                    {agent.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-[#64748B] bg-[#F1F5F9] px-2.5 py-0.5 rounded-full">
                    {agent.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#1E2333]" style={{ fontFamily: 'var(--font-heading)' }}>
                    {agent.name}
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                    {agent.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLE WORKSTATION PORTALS */}
      <section className="py-16 px-6 bg-white/90 border-t border-[#E8ECF3]">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E2333]" style={{ fontFamily: 'var(--font-heading)' }}>
            Access Your Academic Portal
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            <Link href="/login?role=HOD" className="glass-card glass-card-interactive p-6 rounded-2xl border border-[#E8ECF3] bg-white hover:border-[#6C63FF] transition shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#F0EEFF] text-[#6C63FF] flex items-center justify-center mb-3">
                <ShieldAlert size={20} />
              </div>
              <h3 className="font-bold text-base text-[#1E2333]">HOD Portal</h3>
              <p className="text-xs text-[#64748B] mt-1">
                Department overview, AI recovery approval, and risk analytics.
              </p>
            </Link>

            <Link href="/login?role=FACULTY" className="glass-card glass-card-interactive p-6 rounded-2xl border border-[#E8ECF3] bg-white hover:border-[#4FACFE] transition shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#EAF6FF] text-[#0284C7] flex items-center justify-center mb-3">
                <UserCheck size={20} />
              </div>
              <h3 className="font-bold text-base text-[#1E2333]">Faculty Portal</h3>
              <p className="text-xs text-[#64748B] mt-1">
                Class updates, attendance logging, and topic pace tracking.
              </p>
            </Link>

            <Link href="/login?role=STUDENT" className="glass-card glass-card-interactive p-6 rounded-2xl border border-[#E8ECF3] bg-white hover:border-[#10B981] transition shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center mb-3">
                <GraduationCap size={20} />
              </div>
              <h3 className="font-bold text-base text-[#1E2333]">Student Portal</h3>
              <p className="text-xs text-[#64748B] mt-1">
                Course progress, remedial support timetable, and attendance alerts.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL FOOTER */}
      <footer className="py-8 px-6 border-t border-[#E8ECF3] bg-[#F8FAFC] text-center text-xs text-[#64748B]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#1E2333]">Vignan's Foundation for Science, Technology & Research</span>
            <span>• NAAC A+ Accredited</span>
          </div>
          <div>
            Department of Computer Science & Engineering • AI Academic Recovery Agent v2.4
          </div>
        </div>
      </footer>
    </div>
  );
}
