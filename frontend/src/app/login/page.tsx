'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShieldAlert, UserCheck, Lock, Mail, ArrowRight, Sparkles, GraduationCap, Settings, Building2, CheckCircle2 } from 'lucide-react';
import { Role } from '@/types';
import RobotMascot from '@/components/ui/RobotMascot';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get('role') as Role) || 'HOD';

  const [role, setRole] = useState<Role>(initialRole);
  const [email, setEmail] = useState('hod.cse@vignan.edu.in');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  // Sync role & default email when URL params change or role changes
  useEffect(() => {
    const paramRole = searchParams.get('role') as Role;
    if (paramRole && ['HOD', 'FACULTY', 'STUDENT', 'ADMIN'].includes(paramRole)) {
      setRole(paramRole);
      updateDefaultEmail(paramRole);
    }
  }, [searchParams]);

  const updateDefaultEmail = (selectedRole: Role) => {
    if (selectedRole === 'HOD') setEmail('hod.cse@vignan.edu.in');
    else if (selectedRole === 'FACULTY') setEmail('prof.ananya@vignan.edu.in');
    else if (selectedRole === 'STUDENT') setEmail('kavya.cse23@vignan.edu.in');
    else if (selectedRole === 'ADMIN') setEmail('admin.academic@vignan.edu.in');
  };

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    updateDefaultEmail(selectedRole);
  };

  // 3D Parallax Mouse Tilt Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const rotateX = useSpring(useTransform(mouseY, [-400, 400], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('vignan_user_role', role);
      localStorage.setItem('vignan_user_email', email);
    }
    setTimeout(() => {
      if (role === 'HOD') {
        router.push('/hod');
      } else if (role === 'FACULTY') {
        router.push('/faculty');
      } else if (role === 'STUDENT') {
        router.push('/student/dashboard');
      } else if (role === 'ADMIN') {
        router.push('/admin/users');
      }
    }, 500);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4 sm:p-6 font-sans bg-[#0F172A]"
      style={{ perspective: 1200 }}
    >
      {/* HIGH DEFINITION VIGNAN CAMPUS BACKGROUND PHOTO WITH GLASS OVERLAY */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/campus/campus1.jpg"
          alt="Vignan Campus Background"
          className="w-full h-full object-cover filter brightness-[0.45] contrast-[1.1] scale-105 transform transition duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0F172A]/90 via-[#0F172A]/70 to-[#1E1B4B]/80 backdrop-blur-[4px]" />
      </div>

      {/* Floating Ambient Glowing Orbs */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.35)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.3)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      {/* 3D INTERACTIVE GLASSMORPHISM LOGIN CARD */}
      <motion.div
        style={{ rotateX, rotateY }}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[510px] p-8 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-2xl border border-white/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] transform-style-3d"
      >
        {/* Floating 3D AI Robot Mascot Sitting on Top Right */}
        <div className="absolute -top-16 -right-8 z-50 pointer-events-none drop-shadow-2xl">
          <RobotMascot />
        </div>

        {/* Top University Branding Header */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <img
              src="/logo.png"
              alt="Vignan University Logo"
              className="h-10 sm:h-12 w-auto object-contain max-w-[280px]"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mb-1">
            Academic Recovery Portal
          </h1>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] text-xs font-bold text-[#4338CA] mt-1 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>Department of Computer Science & Engineering</span>
          </div>
        </div>

        {/* 3D Interactive Role Selector Grid */}
        <div className="grid grid-cols-2 gap-2 bg-[#F1F5F9]/90 p-1.5 rounded-2xl mb-6 border border-[#E2E8F0] shadow-inner">
          {/* HOD */}
          <button
            type="button"
            onClick={() => handleRoleSelect('HOD')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              role === 'HOD'
                ? 'bg-white text-[#4F46E5] shadow-md border border-[#C7D2FE]'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <ShieldAlert className={`w-4 h-4 ${role === 'HOD' ? 'text-[#4F46E5]' : 'text-[#64748B]'}`} />
            <span>HOD Portal</span>
          </button>

          {/* FACULTY */}
          <button
            type="button"
            onClick={() => handleRoleSelect('FACULTY')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              role === 'FACULTY'
                ? 'bg-white text-[#0284C7] shadow-md border border-[#BAE6FD]'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <UserCheck className={`w-4 h-4 ${role === 'FACULTY' ? 'text-[#0284C7]' : 'text-[#64748B]'}`} />
            <span>Faculty Portal</span>
          </button>

          {/* STUDENT */}
          <button
            type="button"
            onClick={() => handleRoleSelect('STUDENT')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              role === 'STUDENT'
                ? 'bg-white text-[#10B981] shadow-md border border-[#A7F3D0]'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <GraduationCap className={`w-4 h-4 ${role === 'STUDENT' ? 'text-[#10B981]' : 'text-[#64748B]'}`} />
            <span>Student Portal</span>
          </button>

          {/* ADMIN */}
          <button
            type="button"
            onClick={() => handleRoleSelect('ADMIN')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              role === 'ADMIN'
                ? 'bg-white text-[#8B5CF6] shadow-md border border-[#DDD6FE]'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Settings className={`w-4 h-4 ${role === 'ADMIN' ? 'text-[#8B5CF6]' : 'text-[#64748B]'}`} />
            <span>Admin Portal</span>
          </button>
        </div>

        {/* Interactive Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#334155] mb-1.5">
              Institutional Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#CBD5E1] text-sm text-[#0F172A] font-medium focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition shadow-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#334155] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#CBD5E1] text-sm text-[#0F172A] font-medium focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition shadow-xs"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-xl text-white text-sm font-bold bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] hover:from-[#4338CA] hover:to-[#2563EB] shadow-lg shadow-indigo-500/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-2"
          >
            <span>{isLoading ? 'Authenticating...' : `Sign In to ${role} Portal`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security Footer Note */}
        <div className="mt-6 text-center text-[11px] font-semibold text-[#64748B] flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Vignan University Secure Single Sign-On (SSO) • v2.4</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">Loading Login Portal...</div>}>
      <LoginContent />
    </Suspense>
  );
}

