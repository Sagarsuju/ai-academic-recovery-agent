'use client';

import React, { useState } from 'react';
import AppShell from '@/components/ui/AppShell';
import StatCard from '@/components/ui/StatCard';
import StatusMarker from '@/components/ui/StatusMarker';
import { AdminUserAccount, Role } from '@/types';
import {
  Users,
  UserCheck,
  ShieldAlert,
  GraduationCap,
  Plus,
  Search,
  Edit2,
  Trash2,
  Filter,
  X,
  Mail,
  Building,
  Shield
} from 'lucide-react';

const INITIAL_USERS: AdminUserAccount[] = [
  {
    id: 'usr-1',
    name: 'Dr. K. Prasad',
    email: 'hod.cse@vignan.edu.in',
    role: 'HOD',
    department: 'Computer Science & Engineering',
    designationOrSection: 'Head of Department & Professor',
    status: 'ACTIVE',
    lastLogin: '10 mins ago'
  },
  {
    id: 'usr-2',
    name: 'Dr. Ramesh Kumar',
    email: 'ramesh.kumar@vignan.edu.in',
    role: 'FACULTY',
    department: 'Computer Science & Engineering',
    designationOrSection: 'Professor (DBMS, Networks)',
    status: 'ACTIVE',
    lastLogin: '1 hour ago'
  },
  {
    id: 'usr-3',
    name: 'Prof. Ananya Sharma',
    email: 'prof.ananya@vignan.edu.in',
    role: 'FACULTY',
    department: 'Computer Science & Engineering',
    designationOrSection: 'Assistant Professor (Java, SE)',
    status: 'ACTIVE',
    lastLogin: '30 mins ago'
  },
  {
    id: 'usr-4',
    name: 'Dr. Vikramaditya Rao',
    email: 'vikramaditya.rao@vignan.edu.in',
    role: 'FACULTY',
    department: 'Computer Science & Engineering',
    designationOrSection: 'Associate Professor (OS)',
    status: 'ACTIVE',
    lastLogin: '3 hours ago'
  },
  {
    id: 'usr-5',
    name: 'Prof. Suresh Verma',
    email: 'suresh.verma@vignan.edu.in',
    role: 'FACULTY',
    department: 'Computer Science & Engineering',
    designationOrSection: 'Assistant Professor (AI & ML)',
    status: 'ACTIVE',
    lastLogin: 'Yesterday'
  },
  {
    id: 'usr-6',
    name: 'Kavya Reddy',
    email: 'kavya.cse23@vignan.edu.in',
    role: 'STUDENT',
    department: 'Computer Science & Engineering',
    designationOrSection: 'B.Tech CSE Year 3 • Section A',
    status: 'ACTIVE',
    lastLogin: '5 mins ago'
  },
  {
    id: 'usr-7',
    name: 'Rahul Sharma',
    email: 'rahul.s23@vignan.edu.in',
    role: 'STUDENT',
    department: 'Computer Science & Engineering',
    designationOrSection: 'B.Tech CSE Year 3 • Section B',
    status: 'ACTIVE',
    lastLogin: '2 hours ago'
  },
  {
    id: 'usr-8',
    name: 'Pooja Verma',
    email: 'pooja.v23@vignan.edu.in',
    role: 'STUDENT',
    department: 'Computer Science & Engineering',
    designationOrSection: 'B.Tech CSE Year 3 • Section C',
    status: 'ACTIVE',
    lastLogin: 'Yesterday'
  },
  {
    id: 'usr-9',
    name: 'System Administrator',
    email: 'admin.academic@vignan.edu.in',
    role: 'ADMIN',
    department: 'Central Academic Affairs',
    designationOrSection: 'Super Admin',
    status: 'ACTIVE',
    lastLogin: 'Just now'
  }
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUserAccount[]>(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'FACULTY' as Role,
    department: 'Computer Science & Engineering',
    designationOrSection: '',
    status: 'ACTIVE' as 'ACTIVE' | 'INACTIVE'
  });

  // Filter users
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Open modal for Create
  const handleOpenCreate = () => {
    setEditingUserId(null);
    setFormData({
      name: '',
      email: '',
      role: 'FACULTY',
      department: 'Computer Science & Engineering',
      designationOrSection: '',
      status: 'ACTIVE'
    });
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (user: AdminUserAccount) => {
    setEditingUserId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      designationOrSection: user.designationOrSection,
      status: user.status
    });
    setIsModalOpen(true);
  };

  // Save User (Create or Update)
  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    if (editingUserId) {
      setUsers(
        users.map((u) =>
          u.id === editingUserId
            ? {
                ...u,
                ...formData
              }
            : u
        )
      );
    } else {
      const newUser: AdminUserAccount = {
        id: `usr-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        department: formData.department,
        designationOrSection: formData.designationOrSection || 'Member',
        status: formData.status,
        lastLogin: 'Never'
      };
      setUsers([newUser, ...users]);
    }

    setIsModalOpen(false);
  };

  // Delete User
  const handleDeleteUser = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name}'s account?`)) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  // Metrics
  const totalCount = users.length;
  const facultyCount = users.filter((u) => u.role === 'FACULTY').length;
  const studentCount = users.filter((u) => u.role === 'STUDENT').length;
  const hodCount = users.filter((u) => u.role === 'HOD').length;

  const getRoleBadge = (role: Role) => {
    switch (role) {
      case 'HOD':
        return <span className="badge" style={{ background: '#FFFBEB', color: '#D97706', border: '1px solid #FDE68A' }}><ShieldAlert size={12} /> HOD</span>;
      case 'FACULTY':
        return <span className="badge" style={{ background: '#EAF6FF', color: '#0284C7', border: '1px solid #BAE6FD' }}><UserCheck size={12} /> Faculty</span>;
      case 'STUDENT':
        return <span className="badge" style={{ background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0' }}><GraduationCap size={12} /> Student</span>;
      case 'ADMIN':
        return <span className="badge" style={{ background: '#EEF2FF', color: '#4F46E5', border: '1px solid #C7D2FE' }}><Shield size={12} /> Admin</span>;
    }
  };

  return (
    <AppShell>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.85rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginBottom: '4px',
            letterSpacing: '-0.02em'
          }}>
            User Account Directory
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Manage faculty, student, HOD, and administrative permissions across departments.
          </p>
        </div>

        <button onClick={handleOpenCreate} className="btn-primary gradient-btn">
          <Plus size={16} /> Add New Account
        </button>
      </div>

      {/* Summary StatCards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <StatCard title="Total Accounts" value={totalCount} subtitle="Active institutional users" colorIdentity="blue" icon={<Users size={18} />} />
        <StatCard title="Faculty Members" value={facultyCount} subtitle="CSE teaching faculty" colorIdentity="purple" icon={<UserCheck size={18} />} />
        <StatCard title="Enrolled Students" value={studentCount} subtitle="Batch of 2022-2026" colorIdentity="green" icon={<GraduationCap size={18} />} />
        <StatCard title="Department Leadership" value={hodCount} subtitle="CSE HOD & Coordinators" colorIdentity="indigo" icon={<ShieldAlert size={18} />} />
      </div>

      {/* Search & Filter Toolbar */}
      <div className="glass-card" style={{
        padding: '16px 20px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        background: '#FFFFFF',
        border: '1px solid var(--line)'
      }}>
        <div style={{ position: 'relative', width: '340px' }}>
          <Search size={16} color="var(--ink-muted)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
          <input
            type="text"
            placeholder="Search by name, email, department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 14px 8px 36px',
              borderRadius: '6px',
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              color: 'var(--ink)',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Role Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['ALL', 'HOD', 'FACULTY', 'STUDENT', 'ADMIN'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: roleFilter === r ? '1px solid var(--ink)' : '1px solid var(--line)',
                background: roleFilter === r ? 'var(--ink)' : '#FFFFFF',
                color: roleFilter === r ? '#FAF8F3' : 'var(--ink-muted)',
                fontWeight: 600,
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden', background: '#FFFFFF', border: '1px solid var(--line)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: 'var(--paper)', borderBottom: '1px solid var(--line)' }}>
              <th style={{ padding: '14px 20px', color: 'var(--ink)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>User Profile</th>
              <th style={{ padding: '14px 20px', color: 'var(--ink)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Role</th>
              <th style={{ padding: '14px 20px', color: 'var(--ink)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Department & Details</th>
              <th style={{ padding: '14px 20px', color: 'var(--ink)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Status</th>
              <th style={{ padding: '14px 20px', color: 'var(--ink)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Last Login</th>
              <th style={{ padding: '14px 20px', color: 'var(--ink)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '36px', textAlign: 'center', color: 'var(--ink-muted)' }}>
                  No accounts found matching your query.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  style={{
                    borderBottom: '1px solid var(--line)',
                    transition: 'background 0.15s ease'
                  }}
                >
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--ink)' }}>{user.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>{user.email}</div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    {getRoleBadge(user.role)}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ color: 'var(--ink)', fontWeight: 500 }}>{user.department}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>{user.designationOrSection}</div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <StatusMarker
                      status={user.status === 'ACTIVE' ? 'ON_TRACK' : 'CRITICAL'}
                      label={user.status}
                    />
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--ink-muted)', fontSize: '0.82rem', fontFamily: 'var(--font-serif)' }}>
                    {user.lastLogin}
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button
                        onClick={() => handleOpenEdit(user)}
                        className="btn-secondary"
                        style={{ padding: '5px 10px', fontSize: '0.75rem' }}
                        title="Edit User"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id, user.name)}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '6px',
                          background: 'rgba(193, 80, 46, 0.08)',
                          border: '1px solid rgba(193, 80, 46, 0.25)',
                          color: 'var(--atrisk)',
                          cursor: 'pointer',
                          fontSize: '0.75rem'
                        }}
                        title="Delete User"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Add / Edit User */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(27, 35, 64, 0.6)',
          backdropFilter: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px'
        }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '520px', padding: '28px', background: '#FFFFFF', border: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--ink)' }}>
                {editingUserId ? 'Edit User Account' : 'Add New Account'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--ink-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveUser} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Reddy"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '9px 14px',
                    borderRadius: '6px',
                    background: 'var(--paper)',
                    border: '1px solid var(--line)',
                    color: 'var(--ink)',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                  Institutional Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rajesh.r@vignan.edu.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '9px 14px',
                    borderRadius: '6px',
                    background: 'var(--paper)',
                    border: '1px solid var(--line)',
                    color: 'var(--ink)',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                    Account Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as Role })}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '6px',
                      background: 'var(--paper)',
                      border: '1px solid var(--line)',
                      color: 'var(--ink)',
                      fontSize: '0.85rem'
                    }}
                  >
                    <option value="FACULTY">FACULTY</option>
                    <option value="STUDENT">STUDENT</option>
                    <option value="HOD">HOD</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                    Account Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '6px',
                      background: 'var(--paper)',
                      border: '1px solid var(--line)',
                      color: 'var(--ink)',
                      fontSize: '0.85rem'
                    }}
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                  Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '6px',
                    background: 'var(--paper)',
                    border: '1px solid var(--line)',
                    color: 'var(--ink)',
                    fontSize: '0.85rem'
                  }}
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics & Communication Engineering">Electronics & Communication</option>
                  <option value="Artificial Intelligence & Data Science">AI & Data Science</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                  Designation / Cohort Section
                </label>
                <input
                  type="text"
                  placeholder="e.g. Associate Professor / B.Tech CSE Section A"
                  value={formData.designationOrSection}
                  onChange={(e) => setFormData({ ...formData, designationOrSection: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '9px 14px',
                    borderRadius: '6px',
                    background: 'var(--paper)',
                    border: '1px solid var(--line)',
                    color: 'var(--ink)',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary" style={{ padding: '8px 16px' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ padding: '8px 20px' }}>
                  {editingUserId ? 'Save Changes' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
}
