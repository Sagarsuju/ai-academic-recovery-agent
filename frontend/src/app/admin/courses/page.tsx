'use client';

import React, { useState } from 'react';
import AppShell from '@/components/ui/AppShell';
import StatCard from '@/components/ui/StatCard';
import StatusMarker from '@/components/ui/StatusMarker';
import {
  BookOpen,
  GraduationCap,
  Calendar,
  Clock,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  ListOrdered,
  X,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Award,
  UserCheck
} from 'lucide-react';

interface CourseRecord {
  id: string;
  code: string;
  title: string;
  department: string;
  semester: string;
  facultyName: string;
  facultyEmail: string;
  credits: number;
  plannedHours: number;
  completedHours: number;
  status: 'ON_TRACK' | 'AT_RISK' | 'CRITICAL';
  topicsCount: number;
  topics: {
    unit: string;
    title: string;
    hours: number;
    completed: boolean;
  }[];
}

const INITIAL_COURSES: CourseRecord[] = [
  {
    id: 'c-1',
    code: 'CS301',
    title: 'Database Management Systems',
    department: 'Computer Science & Engineering',
    semester: 'Semester 5',
    facultyName: 'Dr. Ramesh Kumar',
    facultyEmail: 'ramesh.kumar@vignan.edu.in',
    credits: 4,
    plannedHours: 60,
    completedHours: 36,
    status: 'AT_RISK',
    topicsCount: 12,
    topics: [
      { unit: 'Unit I', title: 'ER Model & Relational Algebra', hours: 8, completed: true },
      { unit: 'Unit I', title: 'Relational Database Design', hours: 7, completed: true },
      { unit: 'Unit II', title: 'SQL & Advanced Queries', hours: 10, completed: true },
      { unit: 'Unit II', title: 'Constraints, Triggers & Views', hours: 6, completed: true },
      { unit: 'Unit III', title: 'Normalization (1NF to BCNF)', hours: 10, completed: false },
      { unit: 'Unit IV', title: 'Transaction Processing & ACID', hours: 9, completed: false },
      { unit: 'Unit V', title: 'Concurrency Control & Recovery', hours: 10, completed: false }
    ]
  },
  {
    id: 'c-2',
    code: 'CS302',
    title: 'Object-Oriented Programming (Java)',
    department: 'Computer Science & Engineering',
    semester: 'Semester 5',
    facultyName: 'Prof. Ananya Sharma',
    facultyEmail: 'prof.ananya@vignan.edu.in',
    credits: 4,
    plannedHours: 60,
    completedHours: 52,
    status: 'ON_TRACK',
    topicsCount: 14,
    topics: [
      { unit: 'Unit I', title: 'OOP Foundations & Java Basics', hours: 8, completed: true },
      { unit: 'Unit II', title: 'Inheritance, Interfaces & Packages', hours: 12, completed: true },
      { unit: 'Unit III', title: 'Exception Handling & Multithreading', hours: 12, completed: true },
      { unit: 'Unit IV', title: 'Java Collections Framework', hours: 12, completed: true },
      { unit: 'Unit V', title: 'JDBC & JavaFX GUI Design', hours: 16, completed: false }
    ]
  },
  {
    id: 'c-3',
    code: 'CS303',
    title: 'Operating Systems & Architecture',
    department: 'Computer Science & Engineering',
    semester: 'Semester 5',
    facultyName: 'Dr. Vikramaditya Rao',
    facultyEmail: 'vikramaditya.rao@vignan.edu.in',
    credits: 4,
    plannedHours: 60,
    completedHours: 42,
    status: 'ON_TRACK',
    topicsCount: 11,
    topics: [
      { unit: 'Unit I', title: 'OS Structures & System Calls', hours: 8, completed: true },
      { unit: 'Unit II', title: 'CPU Scheduling Algorithms', hours: 12, completed: true },
      { unit: 'Unit III', title: 'Deadlocks & Synchronization', hours: 12, completed: true },
      { unit: 'Unit IV', title: 'Memory Management & Paging', hours: 14, completed: false },
      { unit: 'Unit V', title: 'File Systems & Disk I/O', hours: 14, completed: false }
    ]
  },
  {
    id: 'c-4',
    code: 'CS304',
    title: 'Artificial Intelligence & Search',
    department: 'Computer Science & Engineering',
    semester: 'Semester 5',
    facultyName: 'Dr. Priya Desai',
    facultyEmail: 'priya.desai@vignan.edu.in',
    credits: 3,
    plannedHours: 45,
    completedHours: 24,
    status: 'AT_RISK',
    topicsCount: 9,
    topics: [
      { unit: 'Unit I', title: 'Agents & Problem Spaces', hours: 6, completed: true },
      { unit: 'Unit II', title: 'Heuristic Search (A*, Greedy)', hours: 10, completed: true },
      { unit: 'Unit III', title: 'Adversarial Search & Games', hours: 8, completed: true },
      { unit: 'Unit IV', title: 'Knowledge Representation', hours: 10, completed: false },
      { unit: 'Unit V', title: 'Probabilistic Reasoning', hours: 11, completed: false }
    ]
  },
  {
    id: 'c-5',
    code: 'CS305',
    title: 'Computer Networks & Protocols',
    department: 'Computer Science & Engineering',
    semester: 'Semester 5',
    facultyName: 'Dr. Ramesh Kumar',
    facultyEmail: 'ramesh.kumar@vignan.edu.in',
    credits: 3,
    plannedHours: 45,
    completedHours: 38,
    status: 'ON_TRACK',
    topicsCount: 10,
    topics: [
      { unit: 'Unit I', title: 'Network Models (OSI/TCP-IP)', hours: 6, completed: true },
      { unit: 'Unit II', title: 'Data Link Layer & MAC', hours: 10, completed: true },
      { unit: 'Unit III', title: 'Routing Algorithms (OSPF, BGP)', hours: 12, completed: true },
      { unit: 'Unit IV', title: 'Transport Layer (TCP, UDP)', hours: 10, completed: true },
      { unit: 'Unit V', title: 'Application Protocols & Security', hours: 7, completed: false }
    ]
  },
  {
    id: 'c-6',
    code: 'CS306',
    title: 'Software Engineering & Agile',
    department: 'Computer Science & Engineering',
    semester: 'Semester 5',
    facultyName: 'Prof. Ananya Sharma',
    facultyEmail: 'prof.ananya@vignan.edu.in',
    credits: 3,
    plannedHours: 45,
    completedHours: 40,
    status: 'ON_TRACK',
    topicsCount: 8,
    topics: [
      { unit: 'Unit I', title: 'Software Process & Agile Scrum', hours: 8, completed: true },
      { unit: 'Unit II', title: 'Requirements & SRS Specifications', hours: 9, completed: true },
      { unit: 'Unit III', title: 'Architectural & Component Design', hours: 10, completed: true },
      { unit: 'Unit IV', title: 'Testing Strategies & CI/CD', hours: 10, completed: true },
      { unit: 'Unit V', title: 'Project Management & Quality', hours: 8, completed: false }
    ]
  }
];

const DEPARTMENTS = [
  'All Departments',
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Communication',
  'Electrical & Electronics'
];

const SEMESTERS = ['All Semesters', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6'];

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<CourseRecord[]>(INITIAL_COURSES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedSem, setSelectedSem] = useState('All Semesters');
  const [selectedRisk, setSelectedRisk] = useState<'ALL' | 'ON_TRACK' | 'AT_RISK'>('ALL');

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseRecord | null>(null);
  const [topicsModalCourse, setTopicsModalCourse] = useState<CourseRecord | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    department: 'Computer Science & Engineering',
    semester: 'Semester 5',
    facultyName: '',
    facultyEmail: '',
    credits: 3,
    plannedHours: 45
  });

  // Filtered courses
  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.facultyName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDept === 'All Departments' || c.department === selectedDept;
    const matchesSem = selectedSem === 'All Semesters' || c.semester === selectedSem;
    const matchesRisk = selectedRisk === 'ALL' || c.status === selectedRisk;

    return matchesSearch && matchesDept && matchesSem && matchesRisk;
  });

  const totalCourses = courses.length;
  const atRiskCount = courses.filter((c) => c.status === 'AT_RISK' || c.status === 'CRITICAL').length;
  const totalPlannedHours = courses.reduce((sum, c) => sum + c.plannedHours, 0);
  const totalCompletedHours = courses.reduce((sum, c) => sum + c.completedHours, 0);
  const avgSyllabusPercent = Math.round((totalCompletedHours / totalPlannedHours) * 100);

  const handleOpenAddModal = () => {
    setEditingCourse(null);
    setFormData({
      code: '',
      title: '',
      department: 'Computer Science & Engineering',
      semester: 'Semester 5',
      facultyName: '',
      facultyEmail: '',
      credits: 3,
      plannedHours: 45
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (course: CourseRecord) => {
    setEditingCourse(course);
    setFormData({
      code: course.code,
      title: course.title,
      department: course.department,
      semester: course.semester,
      facultyName: course.facultyName,
      facultyEmail: course.facultyEmail,
      credits: course.credits,
      plannedHours: course.plannedHours
    });
    setIsModalOpen(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCourse) {
      // Update
      setCourses(
        courses.map((c) =>
          c.id === editingCourse.id
            ? {
                ...c,
                code: formData.code.toUpperCase(),
                title: formData.title,
                department: formData.department,
                semester: formData.semester,
                facultyName: formData.facultyName,
                facultyEmail: formData.facultyEmail,
                credits: Number(formData.credits),
                plannedHours: Number(formData.plannedHours)
              }
            : c
        )
      );
    } else {
      // Add
      const newCourse: CourseRecord = {
        id: `c-${Date.now()}`,
        code: formData.code.toUpperCase(),
        title: formData.title,
        department: formData.department,
        semester: formData.semester,
        facultyName: formData.facultyName,
        facultyEmail: formData.facultyEmail,
        credits: Number(formData.credits),
        plannedHours: Number(formData.plannedHours),
        completedHours: 0,
        status: 'ON_TRACK',
        topicsCount: 5,
        topics: [
          { unit: 'Unit I', title: 'Introduction & Foundations', hours: 9, completed: false },
          { unit: 'Unit II', title: 'Core Concepts & Techniques', hours: 9, completed: false },
          { unit: 'Unit III', title: 'Design & Application', hours: 9, completed: false },
          { unit: 'Unit IV', title: 'Advanced Topics', hours: 9, completed: false },
          { unit: 'Unit V', title: 'Case Studies & Review', hours: 9, completed: false }
        ]
      };
      setCourses([newCourse, ...courses]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm('Are you sure you want to remove this course and its syllabus allocations?')) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header Title Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-heading tracking-tight text-[var(--ink)] flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[var(--ink)]" />
              Course & Curriculum Management
            </h1>
            <p className="text-[var(--ink-muted)] text-sm mt-1">
              Administer course catalog, department curriculum allocations, faculty assignments, and syllabus requirements.
            </p>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="btn-primary text-xs self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Add New Course
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Catalog Courses"
            value={totalCourses}
            subtitle="Department of CSE"
            icon={<BookOpen size={18} color="var(--ink)" />}
          />
          <StatCard
            title="Curriculum Health"
            value={`${totalCourses - atRiskCount}/${totalCourses}`}
            subtitle={atRiskCount > 0 ? `${atRiskCount} syllabus at risk` : 'All on track'}
            icon={<Award size={18} color="var(--ontrack)" />}
          />
          <StatCard
            title="Academic Term"
            value="Semester 5"
            subtitle="AY 2024-25 (B.Tech III Year)"
            icon={<Calendar size={18} color="var(--ink)" />}
          />
          <StatCard
            title="Avg Syllabus Coverage"
            value={`${avgSyllabusPercent}%`}
            subtitle={`${totalCompletedHours} of ${totalPlannedHours} hrs taught`}
            icon={<Clock size={18} color="var(--brass)" />}
          />
        </div>

        {/* Filter and Search Bar */}
        <div className="glass-card p-3.5 rounded-md space-y-3 bg-[#FFFFFF] border border-[var(--line)]">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]" />
              <input
                type="text"
                placeholder="Search by code, title, faculty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-[var(--paper)] border border-[var(--line)] rounded text-xs text-[var(--ink)] placeholder-[var(--ink-muted)] focus:outline-none focus:border-[var(--ink)]"
              />
            </div>

            {/* Select Filters */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="bg-[var(--paper)] border border-[var(--line)] rounded text-xs text-[var(--ink)] px-3 py-1.5 focus:outline-none focus:border-[var(--ink)]"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <select
                value={selectedSem}
                onChange={(e) => setSelectedSem(e.target.value)}
                className="bg-[var(--paper)] border border-[var(--line)] rounded text-xs text-[var(--ink)] px-3 py-1.5 focus:outline-none focus:border-[var(--ink)]"
              >
                {SEMESTERS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-1 bg-[var(--paper)] p-1 rounded border border-[var(--line)] text-xs">
                <button
                  onClick={() => setSelectedRisk('ALL')}
                  className={`px-2 py-0.5 rounded text-xs transition ${
                    selectedRisk === 'ALL'
                      ? 'bg-[var(--ink)] text-white font-semibold'
                      : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedRisk('ON_TRACK')}
                  className={`px-2 py-0.5 rounded text-xs transition ${
                    selectedRisk === 'ON_TRACK'
                      ? 'bg-[var(--ontrack)] text-white font-semibold'
                      : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                  }`}
                >
                  On Pace
                </button>
                <button
                  onClick={() => setSelectedRisk('AT_RISK')}
                  className={`px-2 py-0.5 rounded text-xs transition ${
                    selectedRisk === 'AT_RISK'
                      ? 'bg-[var(--atrisk)] text-white font-semibold'
                      : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                  }`}
                >
                  At Risk
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Table */}
        <div className="glass-card rounded-md overflow-hidden bg-[#FFFFFF] border border-[var(--line)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--paper)] text-xs uppercase font-semibold text-[var(--ink-muted)] border-b border-[var(--line)]">
                <tr>
                  <th className="px-5 py-3">Course Code & Title</th>
                  <th className="px-5 py-3">Dept & Semester</th>
                  <th className="px-5 py-3">Faculty In-Charge</th>
                  <th className="px-5 py-3">Credits / Hours</th>
                  <th className="px-5 py-3">Syllabus Progress</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)]">
                {filteredCourses.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-8 text-center text-[var(--ink-muted)] text-xs">
                      No courses found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredCourses.map((c) => {
                    const progressPct = Math.round((c.completedHours / c.plannedHours) * 100);
                    return (
                      <tr key={c.id} className="hover:bg-[var(--paper)] transition">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded bg-[var(--paper)] border border-[var(--line)] flex items-center justify-center font-mono font-bold text-[var(--ink)] text-xs">
                              {c.code}
                            </div>
                            <div>
                              <div className="font-semibold text-[var(--ink)] text-sm">{c.title}</div>
                              <div className="text-xs text-[var(--ink-muted)] flex items-center gap-1.5 mt-0.5">
                                <Layers className="w-3 h-3 text-[var(--ink-muted)]" />
                                {c.topicsCount} Planned Topics
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-3.5">
                          <div className="text-[var(--ink)] text-xs font-medium">{c.semester}</div>
                          <div className="text-[var(--ink-muted)] text-xs truncate max-w-[180px]">{c.department}</div>
                        </td>

                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-[var(--paper)] border border-[var(--line)] flex items-center justify-center text-xs font-bold text-[var(--ink)]">
                              {c.facultyName.charAt(0)}
                            </div>
                            <div>
                              <div className="text-[var(--ink)] text-xs font-medium">{c.facultyName}</div>
                              <div className="text-[11px] text-[var(--ink-muted)] font-mono">{c.facultyEmail}</div>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-3.5">
                          <div className="text-xs text-[var(--ink)]">
                            <span className="font-semibold">{c.credits}</span> Credits
                          </div>
                          <div className="text-[11px] text-[var(--ink-muted)] font-mono">
                            {c.completedHours} / {c.plannedHours} hrs
                          </div>
                        </td>

                        <td className="px-5 py-3.5 min-w-[140px]">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-[var(--ink-muted)] font-mono">{c.completedHours}/{c.plannedHours}h</span>
                            <span className="font-semibold text-[var(--ink)] numeral">{progressPct}%</span>
                          </div>
                          <div className="w-full bg-[var(--paper)] border border-[var(--line)] rounded h-1.5 overflow-hidden">
                            <div
                              className="h-full rounded"
                              style={{
                                width: `${Math.min(progressPct, 100)}%`,
                                background: c.status === 'AT_RISK' ? 'var(--atrisk)' : c.status === 'CRITICAL' ? 'var(--critical)' : 'var(--ontrack)'
                              }}
                            />
                          </div>
                        </td>

                        <td className="px-5 py-3.5">
                          <StatusMarker status={c.status} />
                        </td>

                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setTopicsModalCourse(c)}
                              title="View Topics & Syllabus Breakdown"
                              className="p-1.5 text-[var(--ink-muted)] hover:text-[var(--ink)] rounded transition"
                            >
                              <ListOrdered className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleOpenEditModal(c)}
                              title="Edit Course"
                              className="p-1.5 text-[var(--ink-muted)] hover:text-[var(--ink)] rounded transition"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCourse(c.id)}
                              title="Delete Course"
                              className="p-1.5 text-[var(--ink-muted)] hover:text-[var(--critical)] rounded transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Course Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
            <div className="glass-card w-full max-w-lg rounded-2xl p-6 border border-slate-700 shadow-2xl relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {editingCourse ? 'Edit Course Record' : 'Add New Academic Course'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Define course catalog attributes and syllabus teaching quotas.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveCourse} className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Course Code *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. CS307"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#b91c1c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Credits *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={6}
                      value={formData.credits}
                      onChange={(e) => setFormData({ ...formData, credits: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b91c1c]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cloud Computing & Microservices"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#b91c1c]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Department
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b91c1c]"
                    >
                      <option value="Computer Science & Engineering">CSE</option>
                      <option value="Information Technology">IT</option>
                      <option value="Electronics & Communication">ECE</option>
                      <option value="Electrical & Electronics">EEE</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Semester
                    </label>
                    <select
                      value={formData.semester}
                      onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b91c1c]"
                    >
                      <option value="Semester 3">Semester 3</option>
                      <option value="Semester 4">Semester 4</option>
                      <option value="Semester 5">Semester 5</option>
                      <option value="Semester 6">Semester 6</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Faculty In-Charge *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Ramesh Kumar"
                      value={formData.facultyName}
                      onChange={(e) => setFormData({ ...formData, facultyName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#b91c1c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Planned Teaching Hours *
                    </label>
                    <input
                      type="number"
                      required
                      min={20}
                      max={90}
                      value={formData.plannedHours}
                      onChange={(e) => setFormData({ ...formData, plannedHours: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b91c1c]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Faculty Email
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. faculty@vignan.edu.in"
                    value={formData.facultyEmail}
                    onChange={(e) => setFormData({ ...formData, facultyEmail: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#b91c1c]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-medium transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-semibold transition shadow-md shadow-red-950/50"
                  >
                    {editingCourse ? 'Save Changes' : 'Create Course'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Topics & Syllabus Modal */}
        {topicsModalCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
            <div className="glass-card w-full max-w-2xl rounded-2xl p-6 border border-slate-700 shadow-2xl relative max-h-[85vh] flex flex-col">
              <button
                onClick={() => setTopicsModalCourse(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-400 font-mono font-bold text-xs">
                  {topicsModalCourse.code}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {topicsModalCourse.title}
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-normal">
                      {topicsModalCourse.semester}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Faculty: {topicsModalCourse.facultyName} • Total Planned Hours: {topicsModalCourse.plannedHours} hrs
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {topicsModalCourse.topics.map((t, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                        {t.unit}
                      </span>
                      <span className="text-white font-medium">{t.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 font-mono">{t.hours} hrs</span>
                      {t.completed ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px]">
                          <CheckCircle2 className="w-3 h-3" /> Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px]">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  Completed: <span className="text-white font-bold">{topicsModalCourse.completedHours} hrs</span> / {topicsModalCourse.plannedHours} hrs
                </div>
                <button
                  onClick={() => setTopicsModalCourse(null)}
                  className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
