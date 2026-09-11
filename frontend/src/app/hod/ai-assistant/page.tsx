'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import AppShell from '@/components/ui/AppShell';
import StatusMarker from '@/components/ui/StatusMarker';
import {
  Bot,
  Sparkles,
  Send,
  User,
  TrendingUp,
  Zap,
  Calendar,
  ShieldAlert,
  CheckCircle2,
  Clock,
  BookOpen,
  MapPin,
  FileText,
  AlertTriangle,
  ArrowRight,
  Cpu
} from 'lucide-react';

// Lazy load 3D Thinking Orb
const ThinkingOrb = dynamic(() => import('@/components/3d/ThinkingOrb'), {
  ssr: false,
  loading: () => (
    <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-[#6C63FF] animate-spin" />
  )
});

interface ToolOutput {
  type: 'prediction' | 'recovery' | 'timetable' | 'rag' | 'general';
  data?: any;
}

interface StructuredChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text?: string;
  toolOutput?: ToolOutput;
  timestamp: string;
}

const INITIAL_MESSAGES: StructuredChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    text: "Hello Dr. Prasad! I am your AI Academic Recovery & Syllabus Intelligence Assistant. Ask me about course delay forecasts, remedial extra-class formulas, conflict-free timetable slots, or Vignan academic regulations.",
    timestamp: '10:00 AM'
  },
  {
    id: 'msg-demo',
    sender: 'assistant',
    text: 'Pacing Audit: The completion prediction engine has flagged an active pacing deficit in Artificial Intelligence & Search:',
    toolOutput: {
      type: 'prediction',
      data: {
        courseCode: 'CS304',
        courseName: 'Artificial Intelligence & Search',
        faculty: 'Dr. Priya Desai',
        actual: 48,
        expected: 80,
        deficit: 32,
        predictedCompletion: 'Jan 05, 2027',
        daysLate: 26,
        status: 'CRITICAL'
      }
    },
    timestamp: '10:01 AM'
  }
];

const SUGGESTED_PROMPTS = [
  { label: 'Courses at Risk', query: 'Which courses are predicted to finish late?' },
  { label: 'Java Recovery Plan', query: 'Generate recovery plan for Java (CS302)' },
  { label: 'Timetable Slot Search', query: 'Find available timetable slots for OS extra classes' },
  { label: 'Regulation 3.1 Query', query: 'What is the attendance condonation policy for recovery?' },
  { label: 'Simulate +2 Classes', query: 'What happens if we add 2 classes to Operating Systems?' }
];

export default function HodAiAssistantPage() {
  const [messages, setMessages] = useState<StructuredChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getStructuredResponse = (query: string): StructuredChatMessage => {
    const q = query.toLowerCase();
    const ts = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (q.includes('risk') || q.includes('late') || q.includes('predict')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: 'The completion prediction engine has audited current teaching velocities across CSE:',
        toolOutput: {
          type: 'prediction',
          data: {
            courseCode: 'CS304',
            courseName: 'Artificial Intelligence & Search',
            faculty: 'Dr. Priya Desai',
            actual: 48,
            expected: 80,
            deficit: 32,
            predictedCompletion: 'Jan 05, 2027',
            daysLate: 26,
            status: 'CRITICAL'
          }
        },
        timestamp: ts
      };
    }

    if (q.includes('java') || q.includes('recovery plan') || q.includes('recovery')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: 'Recovery Plan formulated based on prerequisite dependency chains and exam weightage:',
        toolOutput: {
          type: 'recovery',
          data: {
            courseCode: 'CS302',
            courseName: 'Object-Oriented Programming (Java)',
            faculty: 'Prof. Ananya Sharma',
            requiredClasses: 2,
            currentGap: '10%',
            targetCompletion: 'Dec 10, 2026',
            recommendedPace: '1.25x (Accelerated)',
            topics: [
              { unit: 'Unit IV', title: 'Java Collections Framework', hours: 4 },
              { unit: 'Unit V', title: 'JDBC & JavaFX GUI Design', hours: 4 }
            ]
          }
        },
        timestamp: ts
      };
    }

    if (q.includes('timetable') || q.includes('slot') || q.includes('available')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: 'Found 2 conflict-free remedial timetable slots for Operating Systems (CS301):',
        toolOutput: {
          type: 'timetable',
          data: {
            courseCode: 'CS301',
            faculty: 'Dr. Priya Desai',
            slots: [
              { day: 'Wednesday', time: '04:00 PM - 05:00 PM', room: 'Hall 302', type: 'Remedial' },
              { day: 'Friday', time: '03:00 PM - 04:00 PM', room: 'Lab 4', type: 'Problem Solving' }
            ]
          }
        },
        timestamp: ts
      };
    }

    if (q.includes('regulation') || q.includes('policy') || q.includes('attendance') || q.includes('condonation')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: 'Retrieved from Vignan Academic Regulations Knowledge Base (Regulation 4.2):',
        toolOutput: {
          type: 'rag',
          data: {
            regulation: 'Vignan University Academic Regulations 2024 • Section 4.2',
            answer: 'Students falling below 75% attendance but above 65% are eligible for condonation on medical or university deputation grounds, provided they attend at least 80% of designated academic recovery classes.',
            sources: ['vignan_regulations_2024.pdf', 'academic_council_minutes_jul24.docx']
          }
        },
        timestamp: ts
      };
    }

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: `I've analyzed your query regarding "${query}". Currently, 4 of 24 courses require syllabus velocity adjustments. The highest priority is CS304 (AI & Search), running 26 days behind schedule. Would you like me to formulate a 4-hour remedial recovery schedule?`,
      timestamp: ts
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: StructuredChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = getStructuredResponse(query);
      setMessages((prev) => [...prev, response]);
    }, 1200);
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Header with Subtle Atmospheric Gradient Accent */}
        <div className="glass-card p-6 rounded-2xl border border-[rgba(199,210,254,0.5)] bg-[rgba(255,255,255,0.85)] flex items-center justify-between flex-wrap gap-4 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 bg-[#F0EEFF] text-[#6C63FF] rounded-full border border-[#E0DBFF]">
                <Cpu size={13} /> LangGraph Multi-Tool Orchestrator
              </span>
              <span className="text-xs text-[#059669] font-semibold bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
                ChromaDB Active
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#1E2333] tracking-tight">
              Academic AI Assistant
            </h1>
            <p className="text-sm text-[#64748B]">
              Query completion forecasting, formulate instant syllabus recovery plans, and cross-reference university regulations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-white border border-[#E8ECF3] shadow-xs text-xs font-medium text-[#475569] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>Vector KB Online</span>
            </div>
          </div>
        </div>

        {/* Suggested Prompts Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-semibold text-[#64748B] flex-shrink-0 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#6C63FF]" /> Quick Queries:
          </span>
          {SUGGESTED_PROMPTS.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(p.query)}
              className="text-xs px-3.5 py-1.5 rounded-full bg-white border border-[#E8ECF3] hover:border-[#6C63FF] hover:text-[#6C63FF] hover:bg-[#F0EEFF] text-[#475569] font-medium transition-all shadow-xs flex-shrink-0"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Chat Container with Subtle Atmospheric Purple-Blue Glow Atmosphere */}
        <div
          className="glass-card rounded-2xl overflow-hidden flex flex-col h-[580px] border border-[rgba(199,210,254,0.6)] bg-[rgba(255,255,255,0.9)] shadow-card relative"
          style={{
            backgroundImage: 'radial-gradient(at 10% 10%, rgba(108, 99, 255, 0.035) 0px, transparent 40%), radial-gradient(at 90% 90%, rgba(79, 172, 254, 0.035) 0px, transparent 40%)'
          }}
        >
          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3.5 items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatars */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs ${
                      isUser
                        ? 'bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5]'
                        : 'bg-gradient-to-br from-[#6C63FF] to-[#4FACFE] text-white'
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4 text-[#4F46E5]" /> : <Bot className="w-5 h-5 text-white" />}
                  </div>

                  {/* Bubble & Inline Cards */}
                  <div className={`max-w-[82%] space-y-3 ${isUser ? 'text-right' : 'text-left'}`}>
                    {/* Message Bubble */}
                    {msg.text && (
                      <div
                        className={`inline-block px-4 py-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                          isUser
                            ? 'bg-[#6C63FF] text-white rounded-tr-none'
                            : 'bg-white border border-[#E8ECF3] text-[#1E2333] rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    )}

                    {/* Structured Tool Output Cards */}
                    {msg.toolOutput && (
                      <div className="space-y-3 w-full text-left">
                        {/* 1. Prediction Tool Card - Soft Light Purple Theme */}
                        {msg.toolOutput.type === 'prediction' && (
                          <div className="p-4 rounded-xl border border-[#E0DBFF] bg-[#FDFBFF] space-y-3 shadow-xs relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#6C63FF]" />
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-xs text-[#6C63FF] bg-[#F0EEFF] px-2 py-0.5 rounded border border-[#E0DBFF]">
                                  {msg.toolOutput.data.courseCode}
                                </span>
                                <span className="font-bold text-xs text-[#1E2333]">
                                  {msg.toolOutput.data.courseName}
                                </span>
                              </div>
                              <StatusMarker status={msg.toolOutput.data.status || 'CRITICAL'} label="Critical Deficit" />
                            </div>

                            <div className="grid grid-cols-3 gap-2.5 text-xs bg-white p-3 rounded-lg border border-[#E8ECF3]">
                              <div>
                                <span className="text-[#64748B] block text-[10px] uppercase font-semibold">Actual vs Exp</span>
                                <strong className="text-sm font-extrabold text-[#DC2626]">
                                  {msg.toolOutput.data.actual}% / {msg.toolOutput.data.expected}%
                                </strong>
                              </div>
                              <div>
                                <span className="text-[#64748B] block text-[10px] uppercase font-semibold">Net Deficit</span>
                                <strong className="text-sm font-extrabold text-[#DC2626]">
                                  -{msg.toolOutput.data.deficit}%
                                </strong>
                              </div>
                              <div>
                                <span className="text-[#64748B] block text-[10px] uppercase font-semibold">Predicted Finish</span>
                                <strong className="text-sm font-bold text-[#1E2333]">
                                  {msg.toolOutput.data.predictedCompletion}
                                </strong>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-1">
                              <span>Forecasted Delay: <strong className="text-[#DC2626] font-bold">{msg.toolOutput.data.daysLate} days late</strong></span>
                              <button
                                onClick={() => handleSendMessage(`Generate recovery plan for ${msg.toolOutput.data.courseCode}`)}
                                className="btn-primary gradient-btn text-[11px] py-1.5 px-3.5"
                              >
                                Formulate Recovery <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        )}

                        {/* 2. Recovery Plan Tool Card - Soft Light Green Theme */}
                        {msg.toolOutput.type === 'recovery' && (
                          <div className="p-4 rounded-xl border border-[#A7F3D0] bg-[#F7FEFA] space-y-3 shadow-xs relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#10B981]" />
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="p-1 rounded-md bg-[#ECFDF5] text-[#10B981]">
                                  <Zap className="w-4 h-4 text-[#10B981]" />
                                </div>
                                <span className="font-bold text-xs text-[#1E2333]">
                                  {msg.toolOutput.data.courseCode} • Remedial Syllabus Formula
                                </span>
                              </div>
                              <StatusMarker status="AT_RISK" label={`Required: +${msg.toolOutput.data.requiredClasses} Classes`} />
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-xs bg-white p-3 rounded-lg border border-[#E8ECF3]">
                              <div>
                                <span className="text-[#64748B] block text-[10px] uppercase font-semibold">Target Date</span>
                                <strong className="text-[#1E2333] font-bold">{msg.toolOutput.data.targetCompletion}</strong>
                              </div>
                              <div>
                                <span className="text-[#64748B] block text-[10px] uppercase font-semibold">Recommended Velocity</span>
                                <strong className="text-[#D97706] font-bold">{msg.toolOutput.data.recommendedPace}</strong>
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <span className="text-[11px] font-bold text-[#475569]">Prioritized High-Weight Units:</span>
                              {msg.toolOutput.data.topics.map((t: any, i: number) => (
                                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#E8ECF3] text-xs">
                                  <span className="font-mono text-[#6C63FF] font-semibold text-[10px]">{t.unit}</span>
                                  <span className="font-medium text-[#1E2333] text-xs">{t.title}</span>
                                  <span className="font-bold text-xs text-[#10B981]">{t.hours} hrs</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 3. Timetable Slot Tool Card - Soft Light Blue Theme */}
                        {msg.toolOutput.type === 'timetable' && (
                          <div className="p-4 rounded-xl border border-[#BAE6FD] bg-[#F0F9FF] space-y-3 shadow-xs relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#38BDF8]" />
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="p-1 rounded-md bg-[#EAF6FF] text-[#0284C7]">
                                  <Calendar className="w-4 h-4 text-[#0284C7]" />
                                </div>
                                <span className="font-bold text-xs text-[#1E2333]">
                                  Available Remedial Periods ({msg.toolOutput.data.courseCode})
                                </span>
                              </div>
                              <StatusMarker status="ON_PACE" label="Conflict-Free" />
                            </div>

                            <div className="space-y-2">
                              {msg.toolOutput.data.slots.map((s: any, i: number) => (
                                <div key={i} className="p-2.5 rounded-lg bg-white border border-[#E8ECF3] flex items-center justify-between text-xs">
                                  <div>
                                    <span className="font-bold text-[#1E2333]">{s.day}, {s.time}</span>
                                    <div className="text-[11px] text-[#64748B] flex items-center gap-1 mt-0.5">
                                      <MapPin className="w-3 h-3 text-[#38BDF8]" /> {s.room} • {s.type}
                                    </div>
                                  </div>
                                  <StatusMarker status="ON_PACE" label="Slot Open" />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 4. RAG Knowledge Policy Tool Card */}
                        {msg.toolOutput.type === 'rag' && (
                          <div className="p-4 rounded-xl border border-[#C7D2FE] bg-[#EEF2FF] space-y-2.5 shadow-xs relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#818CF8]" />
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-[#6C63FF]" />
                              <span className="font-bold text-xs text-[#1E2333]">
                                {msg.toolOutput.data.regulation}
                              </span>
                            </div>

                            <p className="text-xs text-[#1E2333] leading-relaxed bg-white p-3 rounded-lg border border-[#E8ECF3] italic">
                              "{msg.toolOutput.data.answer}"
                            </p>

                            <div className="flex items-center gap-1.5 text-[10px] text-[#64748B]">
                              <span>Cited Sources:</span>
                              {msg.toolOutput.data.sources.map((src: string, i: number) => (
                                <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-[#E8ECF3] font-mono text-[10px] text-[#475569]">
                                  {src}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="text-[10px] text-[#94A3B8] px-1">{msg.timestamp}</div>
                  </div>
                </div>
              );
            })}

            {/* 3D Thinking Orb when typing */}
            {isTyping && (
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#E8ECF3] shadow-xs w-fit">
                <ThinkingOrb />
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-[#1E2333] block">
                    AI Agent Reasoning
                  </span>
                  <span className="text-[11px] text-[#64748B]">
                    Evaluating curriculum velocity & regulation constraints...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-3.5 bg-white border-t border-[#E8ECF3] flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about syllabus delay, remedial hours, or regulations (e.g. 'recovery plan for Java')..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E8ECF3] text-xs text-[#1E2333] placeholder-[#94A3B8] outline-none focus:border-[#6C63FF] focus:bg-white transition-all"
            />
            <button
              onClick={() => handleSendMessage()}
              className="btn-primary gradient-btn text-xs py-2.5 px-5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
