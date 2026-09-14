'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Zap,
  Calendar,
  ShieldCheck,
  Cpu,
  Bot,
  Database,
  Users,
  GraduationCap,
  ShieldAlert,
  UserCheck,
  CheckCircle2,
  BookOpen,
  MapPin,
  Award,
  Layers,
  Box
} from 'lucide-react';

// Dynamic WebGL 3D Canvas Import with SSR safety
const HeroNetworkScene = dynamic(() => import('../components/3d/HeroNetworkScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-transparent" />
});


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

export default function PublicLandingPage() {
  const [isPlayingIntro, setIsPlayingIntro] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check sessionStorage on client mount: show intro once per browser session
  useEffect(() => {
    try {
      const hasSeenIntro = sessionStorage.getItem('vignan_intro_seen');
      if (!hasSeenIntro) {
        setIsPlayingIntro(true);
        if (typeof document !== 'undefined') {
          document.body.style.overflow = 'hidden';
        }
      }
    } catch {
      setIsPlayingIntro(false);
    }
  }, []);

  // Dismiss intro and persist to sessionStorage for this session
  const handleDismissIntro = () => {
    setIsPlayingIntro(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
    try {
      sessionStorage.setItem('vignan_intro_seen', 'true');
    } catch {}
  };

  // Attempt video playback safely; if autoplay fails, auto-reveal landing page
  useEffect(() => {
    if (isPlayingIntro && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          handleDismissIntro();
        });
      }
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [isPlayingIntro]);

  // Parallax 3D mouse tilt motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const parallaxXBg = useSpring(useTransform(mouseX, [-600, 600], [-12, 12]), springConfig);
  const parallaxYBg = useSpring(useTransform(mouseY, [-600, 600], [-12, 12]), springConfig);

  const cardRotateX = useSpring(useTransform(mouseY, [-600, 600], [8, -8]), springConfig);
  const cardRotateY = useSpring(useTransform(mouseX, [-600, 600], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen text-[#1E2333] relative overflow-hidden bg-[#F4F7FC] font-sans selection:bg-[#3B82F6]/20"
      style={{ perspective: 1200 }}
    >
      {/* Google Font for Cursive Calligraphy Overlay & 3D CSS Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .font-cursive {
          font-family: 'Caveat', cursive, sans-serif;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .card-3d-glow {
          box-shadow: 0 20px 40px -15px rgba(59, 130, 246, 0.25), 0 0 20px rgba(79, 70, 229, 0.1);
        }
        .text-glow-3d {
          text-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
      `}</style>

      {/* Full-Screen Introductory Video Overlay */}
      <AnimatePresence>
        {isPlayingIntro && (
          <motion.div
            key="vignan-intro-fullscreen"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.03,
              filter: 'blur(8px)',
              transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
            }}
            className="fixed inset-0 z-[99999] bg-[#020617] flex items-center justify-center overflow-hidden"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              backgroundColor: '#020617',
              width: '100vw',
              height: '100vh',
              overflow: 'hidden'
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={handleDismissIntro}
              onError={handleDismissIntro}
              style={{
                width: '100vw',
                height: '100vh',
                objectFit: 'cover'
              }}
              className="w-screen h-screen object-cover select-none pointer-events-none"
            >
              <source src="/intro.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Subtle cinematic gradient vignette at bottom */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Skip Intro Button */}
            <button
              type="button"
              onClick={handleDismissIntro}
              aria-label="Skip Intro"
              className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-[100000] px-5 py-2.5 rounded-full bg-black/40 hover:bg-black/70 active:scale-95 text-white/90 hover:text-white border border-white/20 hover:border-white/50 backdrop-blur-md text-xs sm:text-sm font-semibold tracking-wide shadow-2xl transition-all duration-300 flex items-center gap-2 group cursor-pointer"
            >
              <span>Skip Intro</span>
              <div className="w-5 h-5 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                <ArrowRight className="w-3 h-3 text-white transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D WEBGL GRAPHICS BACKGROUND CANVAS */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
        <HeroNetworkScene />
      </div>


      {/* Ambient Radial Background Glows */}
      <motion.div
        style={{ x: parallaxXBg, y: parallaxYBg }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-[-100px] left-[-100px] w-[750px] h-[750px] rounded-full bg-[radial-gradient(circle,rgba(224,231,255,0.7)_0%,rgba(244,247,252,0)_70%)] blur-3xl" />
        <div className="absolute top-[-50px] right-[-100px] w-[850px] h-[850px] rounded-full bg-[radial-gradient(circle,rgba(219,234,254,0.7)_0%,rgba(244,247,252,0)_70%)] blur-3xl" />
        <div className="absolute top-[40%] left-[30%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(207,250,254,0.5)_0%,rgba(244,247,252,0)_70%)] blur-3xl" />
      </motion.div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Vignan's Foundation for Science, Technology and Research"
              className="h-10 sm:h-14 w-auto object-contain max-w-[260px] sm:max-w-[380px]"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.includes('logo.png')) {
                  target.src = '/vignan_logo.png';
                } else if (target.src.includes('vignan_logo.png')) {
                  target.src = '/vignan.png';
                }
              }}
            />
          </Link>


          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#475569]">
            <a href="#" className="text-[#3B82F6] font-bold border-b-2 border-[#3B82F6] pb-1">
              Home
            </a>
            <a href="#features" className="hover:text-[#3B82F6] transition">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-[#3B82F6] transition">
              How It Works
            </a>
            <a href="#about" className="hover:text-[#3B82F6] transition">
              About
            </a>
            <a href="#contact" className="hover:text-[#3B82F6] transition">
              Contact
            </a>
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs sm:text-sm font-semibold text-[#475569] hover:text-[#3B82F6] px-3 py-2 transition hidden sm:inline-block"
            >
              Role Access
            </Link>
            <Link
              href="/login"
              className="bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] hover:from-[#4338CA] hover:to-[#2563EB] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-md hover:shadow-indigo-500/30 transition flex items-center gap-1.5"
            >
              <span>Sign In to Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-8 pb-16 px-4 sm:px-6 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* LEFT COLUMN: Content & Stat Cards */}
          <div className="lg:col-span-6 space-y-6">

            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#CBD5E1] text-xs font-bold text-[#4338CA] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
              <span>Autonomous Academic Recovery & Syllabus Intelligence</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-[2.75rem] font-extrabold text-[#0F172A] tracking-tight leading-[1.15]">
              Intelligent syllabus tracking & remedial recovery powered by{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#3B82F6] to-[#06B6D4]">
                multi-agent AI
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base text-[#475569] leading-relaxed max-w-xl">
              Detect course deficits weeks ahead of examinations, formulate personalized remedial class schedules, and resolve timetable conflicts automatically.
            </p>

            {/* Dual Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                href="/login"
                className="bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] hover:from-[#4338CA] hover:to-[#2563EB] text-white text-sm font-bold px-6 py-3.5 rounded-full shadow-lg shadow-indigo-500/25 transition flex items-center gap-2"
              >
                <span>Launch Academic Workstation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login?role=STUDENT"
                className="bg-white hover:bg-[#F8FAFC] text-[#334155] border border-[#CBD5E1] text-sm font-bold px-6 py-3.5 rounded-full shadow-xs transition"
              >
                Student Portal
              </Link>
            </div>

            {/* 3D Stat Cards Horizontal Strip */}
            <motion.div 
              style={{ rotateX: cardRotateX, rotateY: cardRotateY }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6 border-t border-[#E2E8F0] preserve-3d"
            >
              {/* Stat 1 */}
              <motion.div 
                whileHover={{ scale: 1.05, z: 20 }}
                className="p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#E2E8F0] card-3d-glow flex items-center gap-3 transition cursor-pointer"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#F0EEFF] border border-[#E0DBFF] flex items-center justify-center shrink-0 shadow-inner">
                  <Database className="w-5 h-5 text-[#4F46E5]" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[#4F46E5]">100%</div>
                  <div className="text-[11px] text-[#64748B] font-semibold">Offline ChromaDB RAG</div>
                </div>
              </motion.div>

              {/* Stat 2 */}
              <motion.div 
                whileHover={{ scale: 1.05, z: 20 }}
                className="p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#E2E8F0] card-3d-glow flex items-center gap-3 transition cursor-pointer"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#EAF6FF] border border-[#BAE6FD] flex items-center justify-center shrink-0 shadow-inner">
                  <Users className="w-5 h-5 text-[#0284C7]" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[#0284C7]">5 Agents</div>
                  <div className="text-[11px] text-[#64748B] font-semibold">LangGraph Pipeline</div>
                </div>
              </motion.div>

              {/* Stat 3 */}
              <motion.div 
                whileHover={{ scale: 1.05, z: 20 }}
                className="p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#E2E8F0] card-3d-glow flex items-center gap-3 transition cursor-pointer"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center shrink-0 shadow-inner">
                  <Calendar className="w-5 h-5 text-[#10B981]" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[#10B981]">0 Conflicts</div>
                  <div className="text-[11px] text-[#64748B] font-semibold">Timetable Allocator</div>
                </div>
              </motion.div>
            </motion.div>

          </div>


          {/* RIGHT COLUMN: 3D Robot + Exactly the 3 Uploaded Campus Photos */}
          <div className="lg:col-span-6 relative min-h-[460px] sm:min-h-[520px] flex items-center justify-center">

            {/* Calligraphic Handwriting Quotes */}
            <div className="absolute top-2 left-6 z-30 font-cursive text-2xl text-[#3B82F6] font-bold opacity-80 pointer-events-none transform -rotate-6">
              Learn<br />Grow<br />Achieve
            </div>
            <div className="absolute top-6 right-2 z-30 font-cursive text-2xl text-[#3B82F6] font-bold opacity-85 pointer-events-none transform rotate-3">
              A Brighter<br />Tomorrow
            </div>
            <div className="absolute bottom-16 left-2 z-30 font-cursive text-xl text-[#3B82F6] font-bold opacity-80 pointer-events-none transform -rotate-3">
              Better<br />Students<br />Brighter<br />Futures
            </div>
            <div className="absolute bottom-4 right-6 z-30 font-cursive text-2xl text-[#3B82F6] font-bold opacity-85 pointer-events-none transform rotate-2">
              From<br />Knowledge<br />to Impact
            </div>

            {/* Decorative Dot Matrix Patterns */}
            <div className="absolute top-4 right-12 w-16 h-16 grid grid-cols-4 gap-1.5 opacity-30 pointer-events-none z-0">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              ))}
            </div>

            {/* CENTER MASCOT: 3D AI Robot Waving on Stack of Books */}
            <div className="absolute top-1/2 left-2 sm:left-6 -translate-y-1/2 z-40 flex flex-col items-center drop-shadow-xl pointer-events-none">
              {/* Cute 3D AI Robot Avatar */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-28 h-32 flex flex-col items-center justify-center"
              >
                <svg viewBox="0 0 160 180" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="rBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="60%" stopColor="#F1F5F9" />
                      <stop offset="100%" stopColor="#CBD5E1" />
                    </linearGradient>
                    <radialGradient id="rEyeGlowGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#38BDF8" />
                      <stop offset="100%" stopColor="#0284C7" />
                    </radialGradient>
                  </defs>

                  {/* Antenna */}
                  <line x1="80" y1="30" x2="80" y2="14" stroke="#94A3B8" strokeWidth="3" />
                  <circle cx="80" cy="10" r="5" fill="#38BDF8" className="animate-ping" />

                  {/* Graduation Cap */}
                  <polygon points="80,12 112,22 80,32 48,22" fill="#1E293B" />
                  <rect x="68" y="27" width="24" height="8" rx="2" fill="#0F172A" />
                  <line x1="106" y1="22" x2="110" y2="38" stroke="#F59E0B" strokeWidth="2" />
                  <circle cx="110" cy="40" r="3" fill="#F59E0B" />

                  {/* Head */}
                  <rect x="42" y="32" width="76" height="52" rx="22" fill="url(#rBodyGrad)" stroke="#94A3B8" strokeWidth="1.5" />
                  {/* Visor Screen */}
                  <rect x="50" y="40" width="60" height="34" rx="14" fill="#0F172A" />

                  {/* Waving Arm (Left) */}
                  <motion.g
                    animate={{ rotate: [0, 20, 0, 20, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transformOrigin: '38px 90px' }}
                  >
                    <path d="M 40 92 Q 22 75 25 58" stroke="url(#rBodyGrad)" strokeWidth="10" strokeLinecap="round" fill="none" />
                    <circle cx="25" cy="56" r="6" fill="#38BDF8" />
                  </motion.g>

                  {/* Right Arm resting */}
                  <path d="M 120 92 Q 132 105 130 115" stroke="url(#rBodyGrad)" strokeWidth="10" strokeLinecap="round" fill="none" />

                  {/* Eyes */}
                  <g>
                    <ellipse cx="68" cy="56" rx="7" ry="8" fill="url(#rEyeGlowGrad)" />
                    <circle cx="66" cy="54" r="2.5" fill="#FFFFFF" />
                    <ellipse cx="92" cy="56" rx="7" ry="8" fill="url(#rEyeGlowGrad)" />
                    <circle cx="90" cy="54" r="2.5" fill="#FFFFFF" />
                  </g>

                  {/* Body Torso */}
                  <rect x="48" y="86" width="64" height="48" rx="22" fill="url(#rBodyGrad)" stroke="#94A3B8" strokeWidth="1.5" />
                  {/* Center Emblem */}
                  <circle cx="80" cy="110" r="9" fill="#F0F9FF" stroke="#38BDF8" strokeWidth="1.5" />
                  <circle cx="80" cy="110" r="4" fill="#38BDF8" />

                  {/* Legs */}
                  <rect x="60" y="132" width="12" height="20" rx="5" fill="url(#rBodyGrad)" />
                  <rect x="88" y="132" width="12" height="20" rx="5" fill="url(#rBodyGrad)" />
                </svg>
              </motion.div>

              {/* Stack of 4 Books */}
              <div className="flex flex-col items-center -mt-2 gap-1 w-28">
                <div className="w-24 h-5 rounded-sm bg-[#4F46E5] text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                  Learn
                </div>
                <div className="w-26 h-5 rounded-sm bg-[#3B82F6] text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                  Practice
                </div>
                <div className="w-28 h-5 rounded-sm bg-[#0EA5E9] text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                  Improve
                </div>
                <div className="w-30 h-5 rounded-sm bg-[#10B981] text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                  Succeed
                </div>
              </div>
            </div>

            {/* DYNAMIC 3-PHOTO CAMPUS COLLAGE (Using user's exact uploaded photos) */}
            <div className="relative w-full h-[450px] max-w-[540px] ml-auto">

              {/* Photo 1 (Image 2): Campus Courtyard */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="absolute top-0 right-0 w-[65%] h-[56%] rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white z-10"
              >
                <img
                  src="/campus/campus1.jpg"
                  alt="Vignan Campus Life Courtyard"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-md border border-[#E2E8F0] flex items-center gap-1.5 text-xs font-bold text-[#1E293B]">
                  <MapPin className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>Campus Life</span>
                </div>
              </motion.div>

              {/* Photo 2 (Image 3): Vignan Foundation Main Building */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="absolute top-12 left-10 w-[55%] h-[46%] rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white z-20"
              >
                <img
                  src="/campus/campus2.jpg"
                  alt="Vignan Foundation Building"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-md border border-[#E2E8F0] flex items-center gap-1.5 text-xs font-bold text-[#1E293B]">
                  <BookOpen className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>Knowledge</span>
                </div>
              </motion.div>

              {/* Photo 3 (Image 4): I Love Vignan Orange Building */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="absolute bottom-0 right-6 w-[62%] h-[50%] rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white z-30"
              >
                <img
                  src="/campus/campus3.jpg"
                  alt="I Love Vignan Campus Landmark"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-md border border-[#E2E8F0] flex items-center gap-1.5 text-xs font-bold text-[#1E293B]">
                  <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Innovation</span>
                </div>
              </motion.div>

            </div>

          </div>

        </div>
      </section>

      {/* VIGNAN CAMPUS PHOTO GALLERY SHOWCASE */}
      <section className="py-12 px-6 bg-gradient-to-b from-white to-[#F4F7FC] border-b border-[#E2E8F0] relative z-10">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3B82F6] bg-[#EAF6FF] px-3.5 py-1 rounded-full border border-[#BAE6FD]">
              Vignan University Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              Our State-of-the-Art Campus Environment
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Empowering students with world-class academic infrastructure, research facilities, and modern learning hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Campus Photo 1 */}
            <motion.div
              whileHover={{ y: -6 }}
              className="rounded-2xl overflow-hidden bg-white border border-[#E2E8F0] shadow-md hover:shadow-xl transition flex flex-col"
            >
              <div className="relative h-56 w-full overflow-hidden bg-[#F1F5F9]">
                <img
                  src="/campus/campus1.jpg"
                  alt="Vignan Campus Courtyard"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#3B82F6] shadow-sm flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#3B82F6]" /> Campus Life
                </div>
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-bold text-base text-[#0F172A]">Modern Academic Courtyard</h3>
                <p className="text-xs text-[#64748B]">Spacious curved architectural design surrounded by lush greenery and vibrant student activities.</p>
              </div>
            </motion.div>

            {/* Campus Photo 2 */}
            <motion.div
              whileHover={{ y: -6 }}
              className="rounded-2xl overflow-hidden bg-white border border-[#E2E8F0] shadow-md hover:shadow-xl transition flex flex-col"
            >
              <div className="relative h-56 w-full overflow-hidden bg-[#F1F5F9]">
                <img
                  src="/campus/campus2.jpg"
                  alt="Vignan Foundation Building"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#8B5CF6] shadow-sm flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#8B5CF6]" /> Knowledge & Admin
                </div>
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-bold text-base text-[#0F172A]">Vignan's Foundation Main Building</h3>
                <p className="text-xs text-[#64748B]">Grand white administrative edifice housing university leadership, research labs, and academic departments.</p>
              </div>
            </motion.div>

            {/* Campus Photo 3 */}
            <motion.div
              whileHover={{ y: -6 }}
              className="rounded-2xl overflow-hidden bg-white border border-[#E2E8F0] shadow-md hover:shadow-xl transition flex flex-col"
            >
              <div className="relative h-56 w-full overflow-hidden bg-[#F1F5F9]">
                <img
                  src="/campus/campus3.jpg"
                  alt="I Love Vignan Building"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#F59E0B] shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" /> Innovation Hub
                </div>
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-bold text-base text-[#0F172A]">I ❤️ VIGNAN Innovation Center</h3>
                <p className="text-xs text-[#64748B]">Iconic campus landmark and engineering complex supporting multi-agent AI research and innovation.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}

      <section id="how-it-works" className="py-20 px-6 bg-white/80 backdrop-blur-sm border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] bg-[#F0EEFF] px-3.5 py-1 rounded-full border border-[#E0DBFF]">
              End-to-End Autonomous Pipeline
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F172A]">
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
                className="p-6 rounded-2xl border border-[#E2E8F0] bg-white shadow-md relative flex flex-col justify-between"
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

                  <h3 className="text-base font-bold text-[#0F172A] mb-2">
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

      {/* SPECIALIZED MULTI-AGENT MICROSERVICES */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7] bg-[#EAF6FF] px-3.5 py-1 rounded-full border border-[#BAE6FD]">
              Coordinated Architecture
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F172A]">
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
                className="p-6 rounded-2xl border border-[#E2E8F0] bg-white shadow-md space-y-4"
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
                  <h3 className="text-base font-bold text-[#0F172A]">
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

      {/* ROLE PORTALS & ACCESS */}
      <section id="contact" className="py-16 px-6 bg-white border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
            Access Your Academic Portal
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            <Link href="/login?role=HOD" className="p-6 rounded-2xl border border-[#E2E8F0] bg-white hover:border-[#4F46E5] transition shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#F0EEFF] text-[#4F46E5] flex items-center justify-center mb-3">
                <ShieldAlert size={20} />
              </div>
              <h3 className="font-bold text-base text-[#0F172A]">HOD Portal</h3>
              <p className="text-xs text-[#64748B] mt-1">
                Department overview, AI recovery approval, and risk analytics.
              </p>
            </Link>

            <Link href="/login?role=FACULTY" className="p-6 rounded-2xl border border-[#E2E8F0] bg-white hover:border-[#3B82F6] transition shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#EAF6FF] text-[#0284C7] flex items-center justify-center mb-3">
                <UserCheck size={20} />
              </div>
              <h3 className="font-bold text-base text-[#0F172A]">Faculty Portal</h3>
              <p className="text-xs text-[#64748B] mt-1">
                Class updates, attendance logging, and topic pace tracking.
              </p>
            </Link>

            <Link href="/login?role=STUDENT" className="p-6 rounded-2xl border border-[#E2E8F0] bg-white hover:border-[#10B981] transition shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center mb-3">
                <GraduationCap size={20} />
              </div>
              <h3 className="font-bold text-base text-[#0F172A]">Student Portal</h3>
              <p className="text-xs text-[#64748B] mt-1">
                Course progress, remedial support timetable, and attendance alerts.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-[#E2E8F0] bg-[#F8FAFC] text-center text-xs text-[#64748B]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0F172A]">Vignan's Foundation for Science, Technology & Research</span>
            <span>• NAAC A+ Accredited</span>
          </div>
          <div>
            Department of Computer Science & Engineering • AI Academic Recovery Agent
          </div>
        </div>
      </footer>
    </div>
  );
}
