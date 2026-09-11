'use client';

import React from 'react';

export default function RobotMascot() {
  return (
    <div className="relative pointer-events-none z-20 flex flex-col items-center">
      {/* Speech Bubble */}
      <div 
        style={{
          animation: 'floatBubble 3.5s ease-in-out infinite alternate',
          marginBottom: '10px'
        }}
        className="bg-white/95 backdrop-blur-md border border-[#E0DBFF] px-3.5 py-1.5 rounded-2xl shadow-lg flex items-center gap-1.5 text-xs font-bold text-[#4C1D95] pointer-events-auto"
      >
        <span>Welcome Back!</span>
        <span className="text-sm">👋</span>
        {/* Tail indicator */}
        <div 
          style={{
            position: 'absolute',
            bottom: '-6px',
            left: '50%',
            transform: 'translateX(-50%) rotate(45deg)',
            width: '10px',
            height: '10px',
            backgroundColor: '#FFFFFF',
            borderRight: '1px solid #E0DBFF',
            borderBottom: '1px solid #E0DBFF'
          }}
        />
      </div>

      {/* Floating Robot Body Container */}
      <div 
        style={{
          animation: 'robotFloat 4s ease-in-out infinite alternate'
        }}
        className="relative w-36 h-44 sm:w-44 sm:h-52 flex flex-col items-center justify-center"
      >
        <svg 
          viewBox="0 0 200 240" 
          className="w-full h-full drop-shadow-xl overflow-visible"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#F1F5F9" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>

            <linearGradient id="visorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>

            <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>

            <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="70%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </radialGradient>

            <linearGradient id="laptopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>
          </defs>

          {/* Shadow Underneath */}
          <ellipse cx="100" cy="225" rx="45" ry="8" fill="rgba(15, 23, 42, 0.12)" />

          {/* Left Leg (Swinging Pendulum) */}
          <g 
            style={{
              transformOrigin: '80px 155px',
              animation: 'swingLegLeft 2.4s ease-in-out infinite alternate'
            }}
          >
            <rect x="72" y="155" width="16" height="38" rx="8" fill="url(#bodyGrad)" stroke="#CBD5E1" strokeWidth="1.5" />
            <circle cx="80" cy="190" r="7" fill="#0284C7" />
          </g>

          {/* Right Leg (Swinging Pendulum Offset) */}
          <g 
            style={{
              transformOrigin: '120px 155px',
              animation: 'swingLegRight 2.4s ease-in-out infinite alternate-reverse'
            }}
          >
            <rect x="112" y="155" width="16" height="38" rx="8" fill="url(#bodyGrad)" stroke="#CBD5E1" strokeWidth="1.5" />
            <circle cx="120" cy="190" r="7" fill="#0284C7" />
          </g>

          {/* Main Torso (Sitting Base) */}
          <rect x="55" y="100" width="90" height="65" rx="30" fill="url(#bodyGrad)" stroke="#CBD5E1" strokeWidth="2" />
          {/* Belly Cyan Accent Ring */}
          <rect x="75" y="115" width="50" height="28" rx="14" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="1.5" />
          <circle cx="100" cy="129" r="6" fill="url(#cyanGlow)" />

          {/* Antenna */}
          <line x1="100" y1="45" x2="100" y2="25" stroke="#94A3B8" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="100" cy="22" r="7" fill="url(#cyanGlow)" className="animate-pulse" />

          {/* Ear Accent Caps */}
          <circle cx="48" cy="72" r="8" fill="#0284C7" />
          <circle cx="152" cy="72" r="8" fill="#0284C7" />

          {/* Head Capsule */}
          <rect x="52" y="42" width="96" height="62" rx="26" fill="url(#bodyGrad)" stroke="#CBD5E1" strokeWidth="2" />
          
          {/* Dark Glass Visor */}
          <rect x="62" y="52" width="76" height="42" rx="18" fill="url(#visorGrad)" />

          {/* Eyes Group (Blinking & Gaze Shift) */}
          <g 
            style={{
              transformOrigin: '100px 73px',
              animation: 'eyeBlink 4s infinite, eyeGaze 6s ease-in-out infinite'
            }}
          >
            {/* Left Eye */}
            <ellipse cx="84" cy="73" rx="9" ry="10" fill="url(#eyeGlow)" />
            <circle cx="82" cy="70" r="3" fill="#FFFFFF" />

            {/* Right Eye */}
            <ellipse cx="116" cy="73" rx="9" ry="10" fill="url(#eyeGlow)" />
            <circle cx="114" cy="70" r="3" fill="#FFFFFF" />
          </g>

          {/* Cute Smile Curve */}
          <path d="M 94 85 Q 100 89, 106 85" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8" />

          {/* Laptop (Held in Lap) */}
          <g transform="translate(68, 135)">
            {/* Base */}
            <rect x="0" y="16" width="64" height="12" rx="4" fill="url(#laptopGrad)" stroke="#475569" strokeWidth="1" />
            {/* Screen lid angled */}
            <path d="M 4 16 L 8 0 L 56 0 L 60 16 Z" fill="#1E293B" stroke="#475569" strokeWidth="1" />
            {/* Screen Inner Glow */}
            <polygon points="10,2 54,2 51,14 13,14" fill="#0F172A" />
            {/* Glowing Graduation Cap Icon on Laptop Screen */}
            <polygon points="32,4 42,8 32,12 22,8" fill="#38BDF8" />
            <line x1="42" y1="8" x2="42" y2="12" stroke="#38BDF8" strokeWidth="1" />
          </g>

          {/* Hands holding Laptop */}
          <circle cx="65" cy="148" r="7" fill="url(#bodyGrad)" stroke="#94A3B8" strokeWidth="1.5" />
          <circle cx="135" cy="148" r="7" fill="url(#bodyGrad)" stroke="#94A3B8" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Embedded Scoped Keyframe Animations */}
      <style jsx>{`
        @keyframes robotFloat {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-10px);
          }
        }

        @keyframes floatBubble {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-4px);
          }
        }

        @keyframes swingLegLeft {
          0% {
            transform: rotate(-10deg);
          }
          100% {
            transform: rotate(12deg);
          }
        }

        @keyframes swingLegRight {
          0% {
            transform: rotate(10deg);
          }
          100% {
            transform: rotate(-12deg);
          }
        }

        @keyframes eyeBlink {
          0%, 46%, 48%, 94%, 96%, 100% {
            transform: scaleY(1);
          }
          47%, 95% {
            transform: scaleY(0.1);
          }
        }

        @keyframes eyeGaze {
          0%, 100% {
            transform: translateX(0px);
          }
          25% {
            transform: translateX(-3px);
          }
          75% {
            transform: translateX(3px);
          }
        }
      `}</style>
    </div>
  );
}
