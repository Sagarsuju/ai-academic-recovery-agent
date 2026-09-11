'use client';

import React, { useState } from 'react';
import AppShell from '@/components/ui/AppShell';
import { ChatMessage } from '@/types';
import { Bot, Sparkles, Send, User, CornerDownLeft, RefreshCw, MessageSquare } from 'lucide-react';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    text: "Hello Dr. Prasad! I am your AI Academic Recovery & Syllabus Progress Assistant. I analyze departmental teaching pace, attendance logs, and syllabus trajectories in real-time. How can I assist you today?",
    timestamp: '10:00 AM'
  }
];

const SUGGESTED_PROMPTS = [
  "Which courses are at risk?",
  "Which faculty members need attention?",
  "How many extra classes are required for Java?",
  "Which course is predicted to finish late?",
  "What happens if I add 2 classes next week?"
];

export default function HodAiAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getMockResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('risk') || q.includes('courses at risk')) {
      return "Based on real-time syllabus tracking, 4 courses currently require attention:\n\n1. 🔴 **Artificial Intelligence (CS304 - CSE-C)**: 48% actual vs 80% expected (32% deficit, Critical Risk)\n2. 🟠 **Operating Systems (CS303 - CSE-A)**: 64% actual vs 82% expected (18% deficit, Significant Slippage)\n3. 🟡 **Java Programming (CS302 - CSE-B)**: 78% actual vs 88% expected (10% deficit, Minor Slippage)\n4. 🟡 **Compiler Design (CS307 - CSE-B)**: 80% actual vs 88% expected (8% deficit, Minor Slippage)";
    } else if (q.includes('faculty') || q.includes('attention')) {
      return "Faculty workload and pace analysis:\n\n• **Prof. Suresh Verma (AI)**: Missed 4 lectures due to administrative leave. 6 recovery classes recommended.\n• **Dr. Vikramaditya Rao (OS)**: Heavy departmental committee commitments slowed Unit 3 pace. 3 recovery classes recommended.\n\nAll other faculty members (Dr. Ramesh Kumar, Prof. Ananya Sharma) are maintaining optimal teaching velocity.";
    } else if (q.includes('java') || q.includes('extra classes')) {
      return "For **Java Programming (CS302 - CSE-B)**:\n\n• Current Gap: 10%\n• Units Pending: Unit 4 (Collections) & Unit 5 (JavaFX)\n• **Recommendation**: **2 additional classes** scheduled over the next 2 weeks will fully eliminate the lag and ensure completion by December 10.";
    } else if (q.includes('late') || q.includes('predicted')) {
      return "Current Predicted Delay Rankings:\n\n1. **AI & ML (CS304)**: Predicted finish **January 05, 2027** (26 days late)\n2. **Operating Systems (CS303)**: Predicted finish **December 22, 2026** (12 days late)\n3. **Java Programming (CS302)**: Predicted finish **December 14, 2026** (4 days late)";
    } else if (q.includes('2 classes') || q.includes('what happens')) {
      return "⚡ **What-If Simulation Result**:\n\nAdding **2 additional classes** next week for **Operating Systems (CS303)**:\n\n• Syllabus Coverage increases from 64% ➜ 74%\n• Completion Date pulls forward from Dec 22 ➜ **Dec 15**\n• Eliminates 7 days of predicted delay!";
    }
    return `I have analyzed your query regarding "${query}". Based on institutional syllabus tracking data, all core CSE courses have completed Unit 1 & Unit 2. Scheduling 2 to 3 recovery classes for lagging courses will restore 100% on-track status before final exams.`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: getMockResponse(query),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <AppShell>
      {/* Screen Header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="badge" style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(139, 92, 246, 0.2))', color: '#ec4899', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
            <Sparkles size={12} /> Neural Academic Query Engine
          </span>
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginBottom: '4px' }}>
          Academic AI Assistant
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          Ask natural language questions about syllabus progress, risk forecasts, faculty pace, and recovery scenarios.
        </p>
      </div>

      {/* Suggested Prompt Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        {SUGGESTED_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="glass-card glass-card-interactive"
            style={{
              padding: '8px 14px',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#818cf8',
              cursor: 'pointer',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <MessageSquare size={13} /> "{prompt}"
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="glass-card" style={{
        height: '520px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '0',
        overflow: 'hidden'
      }}>
        {/* Messages Scroll Area */}
        <div style={{
          flex: 1,
          padding: '24px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: msg.sender === 'user' ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : 'var(--ai-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: msg.sender === 'assistant' ? '0 0 15px rgba(236, 72, 153, 0.3)' : 'none'
              }}>
                {msg.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>

              <div style={{
                maxWidth: '75%',
                background: msg.sender === 'user' ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'rgba(255, 255, 255, 0.05)',
                border: msg.sender === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                padding: '14px 18px',
                borderRadius: '14px',
                color: '#f8fafc',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                whiteSpace: 'pre-line'
              }}>
                {msg.text}
                <div style={{ fontSize: '0.7rem', color: msg.sender === 'user' ? 'rgba(255,255,255,0.7)' : '#64748b', marginTop: '6px', textAlign: 'right' }}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: '#ec4899', fontSize: '0.85rem' }}>
              <Bot size={20} /> AI Assistant is reasoning...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div style={{
          padding: '16px 20px',
          background: 'rgba(11, 15, 25, 0.95)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask AI about course risk, recovery classes, or syllabus completion dates..."
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#f8fafc',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />

          <button
            onClick={() => handleSendMessage()}
            className="btn-primary"
            style={{ padding: '12px 20px' }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </AppShell>
  );
}
