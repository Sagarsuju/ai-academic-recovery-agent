'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
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
  CheckCircle2
} from 'lucide-react';

// Lazy load 3D scene without SSR
const HeroNetworkScene = dynamic(
  () => import('@/components/3d/HeroNetworkScene'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[420px] md:h-[480px] rounded-3xl bg-white/70 border border-[#E8ECF3] animate-pulse flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#64748B] text-sm font-semibold">
          <Sparkles className="w-5 h-5 text-[#6C63FF] animate-spin" />
          Initializing 3D Academic Graph...
        </div>
      </div>
    )
  }
);

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
  return (
    <div className="min-h-screen text-[#1E2333] relative overflow-hidden" style={{ backgroundColor: '#F7F9FC', fontFamily: 'var(--font-sans)' }}>
      {/* Multi-Point Ambient Light Pastel Background Glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.18)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-0 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(79,172,254,0.18)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute top-[800px] left-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.14)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute top-[1400px] right-10 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.14)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      {/* Faint Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(108, 99, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(108, 99, 255, 0.02) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-[#E8ECF3] shadow-xs">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          {/* Logo & University Name */}
          <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-xl border border-[#E8ECF3] shadow-xs">
              <img
                src="/vignan_logo.jpg"
                alt="Vignan University"
                className="h-9 w-auto object-contain"
              />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-[#1E2333] flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Vignan Academic AI
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#F0EEFF] text-[#6C63FF] border border-[#E0DBFF]">
                  R22 Ready
                </span>
              </span>
              <p className="text-xs text-[#64748B]">
                Department of Computer Science & Engineering
              </p>
            </div>
          </div>

          {/* Nav & Login CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-semibold text-[#475569] hover:text-[#6C63FF] px-3 py-2 rounded-lg transition"
            >
              Role Access
            </Link>
            <Link
              href="/login"
              className="btn-primary gradient-btn text-xs font-semibold px-4 py-2"
            >
              Sign In to Portal <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-14 pb-20 px-6 border-b border-[#E8ECF3]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8ECF3] text-xs font-semibold text-[#6C63FF] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#6C63FF]" />
              Autonomous Academic Recovery & Syllabus Intelligence
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1E2333] leading-[1.18]" style={{ fontFamily: 'var(--font-heading)' }}>
              Intelligent syllabus tracking & remedial recovery powered by{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] via-[#4FACFE] to-[#38BDF8]">
                multi-agent AI
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
              Detect course deficits weeks ahead of examinations, formulate personalized remedial class schedules, and resolve timetable conflicts automatically.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/login" className="btn-primary gradient-btn text-sm px-7 py-3">
                Launch Academic Workstation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login?role=STUDENT"
                className="btn-secondary text-sm px-6 py-3"
              >
                Student Portal
              </Link>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E8ECF3]">
              <div className="p-3 rounded-xl bg-white/80 border border-[#E8ECF3] shadow-xs">
                <div className="text-2xl font-extrabold text-[#6C63FF]" style={{ fontFamily: 'var(--font-heading)' }}>100%</div>
                <div className="text-xs text-[#64748B] mt-0.5 font-medium">Offline ChromaDB RAG</div>
              </div>
              <div className="p-3 rounded-xl bg-white/80 border border-[#E8ECF3] shadow-xs">
                <div className="text-2xl font-extrabold text-[#0284C7]" style={{ fontFamily: 'var(--font-heading)' }}>5 Agents</div>
                <div className="text-xs text-[#64748B] mt-0.5 font-medium">LangGraph Pipeline</div>
              </div>
              <div className="p-3 rounded-xl bg-white/80 border border-[#E8ECF3] shadow-xs">
                <div className="text-2xl font-extrabold text-[#10B981]" style={{ fontFamily: 'var(--font-heading)' }}>0 Conflicts</div>
                <div className="text-xs text-[#64748B] mt-0.5 font-medium">Timetable Allocator</div>
              </div>
            </div>
          </div>

          {/* Right 3D Interactive Scene */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden shadow-card border border-white/80 bg-white/60 backdrop-blur-md">
            <HeroNetworkScene />
          </div>
        </div>
      </section>

      {/* "How It Works" Section */}
      <section className="py-20 px-6 bg-white/70 backdrop-blur-sm border-b border-[#E8ECF3]">
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
              <div
                key={idx}
                className="glass-card glass-card-interactive p-6 rounded-2xl border border-[#E8ECF3] bg-white/90 relative flex flex-col justify-between"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Specialized Autonomous Agents */}
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
              <div
                key={idx}
                className="glass-card glass-card-interactive p-6 rounded-2xl border border-[#E8ECF3] bg-white/90 space-y-4"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Workstation Portals */}
      <section className="py-16 px-6 bg-white/80 border-t border-[#E8ECF3]">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E2333]" style={{ fontFamily: 'var(--font-heading)' }}>
            Access Your Academic Portal
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            <Link href="/login?role=HOD" className="glass-card glass-card-interactive p-6 rounded-2xl border border-[#E8ECF3] bg-white hover:border-[#6C63FF] transition">
              <div className="w-10 h-10 rounded-xl bg-[#F0EEFF] text-[#6C63FF] flex items-center justify-center mb-3">
                <ShieldAlert size={20} />
              </div>
              <h3 className="font-bold text-base text-[#1E2333]">HOD Portal</h3>
              <p className="text-xs text-[#64748B] mt-1">
                Department overview, AI recovery approval, and risk analytics.
              </p>
            </Link>

            <Link href="/login?role=FACULTY" className="glass-card glass-card-interactive p-6 rounded-2xl border border-[#E8ECF3] bg-white hover:border-[#4FACFE] transition">
              <div className="w-10 h-10 rounded-xl bg-[#EAF6FF] text-[#0284C7] flex items-center justify-center mb-3">
                <UserCheck size={20} />
              </div>
              <h3 className="font-bold text-base text-[#1E2333]">Faculty Portal</h3>
              <p className="text-xs text-[#64748B] mt-1">
                Class updates, attendance logging, and topic pace tracking.
              </p>
            </Link>

            <Link href="/login?role=STUDENT" className="glass-card glass-card-interactive p-6 rounded-2xl border border-[#E8ECF3] bg-white hover:border-[#10B981] transition">
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

      {/* Institutional Footer */}
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
