'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  LayoutDashboard,
  BookOpen,
  Zap,
  Calendar,
  Sliders,
  Bot,
  FileText,
  CheckSquare,
  Users,
  Server,
  Sparkles,
  ArrowRight,
  GraduationCap
} from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Portals' | 'Academic Tools' | 'Administration';
  href: string;
  icon: React.ReactNode;
}

const COMMAND_ITEMS: CommandItem[] = [
  {
    id: 'cmd-hod',
    title: 'HOD Academic Dashboard',
    subtitle: 'Department-wide syllabus trajectory & KPI metrics',
    category: 'Portals',
    href: '/hod',
    icon: <LayoutDashboard className="w-4 h-4 text-[#6C63FF]" />
  },
  {
    id: 'cmd-faculty',
    title: 'Faculty Workstation',
    subtitle: 'Course workload, pending lectures & syllabus updates',
    category: 'Portals',
    href: '/faculty',
    icon: <CheckSquare className="w-4 h-4 text-[#34D399]" />
  },
  {
    id: 'cmd-student',
    title: 'Student Learning Portal',
    subtitle: 'My attendance %, recovery classes & enrolled syllabus',
    category: 'Portals',
    href: '/student/dashboard',
    icon: <GraduationCap className="w-4 h-4 text-[#4FACFE]" />
  },
  {
    id: 'cmd-admin-users',
    title: 'Admin User Management',
    subtitle: 'Manage faculty, student, HOD, and institutional accounts',
    category: 'Administration',
    href: '/admin/users',
    icon: <Users className="w-4 h-4 text-[#F59E0B]" />
  },
  {
    id: 'cmd-admin-system',
    title: 'System Diagnostics & RAG Knowledge Hub',
    subtitle: 'APScheduler sync pipelines & offline ChromaDB policies',
    category: 'Administration',
    href: '/admin/system',
    icon: <Server className="w-4 h-4 text-[#EC4899]" />
  },
  {
    id: 'cmd-courses',
    title: 'Course Progress Tracker',
    subtitle: 'Expected vs actual syllabus completion percentages',
    category: 'Academic Tools',
    href: '/hod/courses',
    icon: <BookOpen className="w-4 h-4 text-[#6C63FF]" />
  },
  {
    id: 'cmd-recovery',
    title: 'AI Recovery Engine',
    subtitle: 'Formulate remedial class quotas to eliminate syllabus lag',
    category: 'Academic Tools',
    href: '/hod/recovery',
    icon: <Zap className="w-4 h-4 text-[#F59E0B]" />
  },
  {
    id: 'cmd-whatif',
    title: 'What-If Recovery Simulator',
    subtitle: 'Simulate syllabus completion by adjusting extra hours',
    category: 'Academic Tools',
    href: '/hod/recovery/what-if',
    icon: <Sliders className="w-4 h-4 text-[#4FACFE]" />
  },
  {
    id: 'cmd-assistant',
    title: 'Academic AI Assistant',
    subtitle: 'Ask questions about regulations, pace, and risk',
    category: 'Academic Tools',
    href: '/hod/ai-assistant',
    icon: <Bot className="w-4 h-4 text-[#EC4899]" />
  },
  {
    id: 'cmd-timetable',
    title: 'Timetable Slot Scheduler',
    subtitle: 'Find conflict-free periods for remedial sessions',
    category: 'Academic Tools',
    href: '/hod/timetable',
    icon: <Calendar className="w-4 h-4 text-[#34D399]" />
  },
  {
    id: 'cmd-reports',
    title: 'Institutional Academic Reports',
    subtitle: 'Audit logs, compliance metrics, and syllabus reports',
    category: 'Academic Tools',
    href: '/hod/reports',
    icon: <FileText className="w-4 h-4 text-[#6B7280]" />
  }
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setSearch('');
    }
  }, [isOpen]);

  const filteredItems = COMMAND_ITEMS.filter((item) => {
    const q = search.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const handleSelect = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex].href);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-xl bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[80vh] transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200/80 gap-3">
          <Search className="w-5 h-5 text-[#6C63FF]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or jump to page... (e.g. 'recovery', 'student')"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-[#1E2333] text-sm placeholder-slate-400 outline-none font-medium"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-400">
              No matching pages or tools found for "{search}"
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.href)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition text-left ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#6C63FF]/10 to-[#4FACFE]/10 border border-[#6C63FF]/30 text-[#1E2333]'
                      : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-slate-200 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#1E2333] flex items-center gap-2">
                        {item.title}
                        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-xs text-[#6B7280] truncate max-w-md">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition ${
                      isSelected ? 'text-[#6C63FF] translate-x-1' : 'text-slate-300'
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="px-4 py-2.5 bg-slate-50/80 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 shadow-xs font-mono text-[10px]">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 shadow-xs font-mono text-[10px]">
                ↓
              </kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 shadow-xs font-mono text-[10px]">
                ↵
              </kbd>
              Open
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 shadow-xs font-mono text-[10px]">
              ESC
            </kbd>
            Close
          </span>
        </div>
      </div>
    </div>
  );
}
