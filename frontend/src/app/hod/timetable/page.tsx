'use client';

import React, { useState, useEffect } from 'react';
import AppShell from '@/components/ui/AppShell';
import { getRecommendedRecoverySlots, approveRecoveryTimetable } from '@/services/timetableService';
import { TimetableSlot } from '@/types';
import { Calendar, Clock, CheckCircle2, AlertCircle, Send, Check, Sparkles, UserCheck, Users, MapPin } from 'lucide-react';

export default function HodTimetablePage() {
  const [slots, setSlots] = useState<TimetableSlot[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>(['slot-1', 'slot-2', 'slot-3']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    async function loadData() {
      const data = await getRecommendedRecoverySlots('course-os-a');
      setSlots(data);
    }
    loadData();
  }, []);

  const toggleSlot = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((s) => s !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleApprove = async () => {
    setIsSubmitting(true);
    await approveRecoveryTimetable(selectedIds);
    setIsSubmitting(false);
    setIsApproved(true);
  };

  return (
    <AppShell>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
            <Calendar size={12} /> Conflict-Free Timetable Slot Allocator
          </span>
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginBottom: '4px' }}>
          Timetable Recovery & Extra Class Scheduling
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          AI automated check against faculty schedules, student section timetables, and available laboratory/lecture halls.
        </p>
      </div>

      {/* Success Modal / Banner when Approved */}
      {isApproved && (
        <div className="glass-card" style={{
          padding: '24px',
          marginBottom: '28px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)',
          borderColor: 'rgba(16, 185, 129, 0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CheckCircle2 size={30} color="#fff" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc' }}>
              ✓ Recovery Schedule Approved & Dispatched!
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
              3 extra classes added to CSE-A timetable. Push notifications sent to Dr. Vikramaditya Rao and 58 enrolled students.
            </p>
          </div>
        </div>
      )}

      {/* Target Course Banner */}
      <div className="glass-card" style={{
        padding: '20px 24px',
        marginBottom: '24px',
        background: 'rgba(17, 24, 39, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Target Course</span>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc' }}>
            Operating Systems (CS303 - CSE-A)
          </h2>
        </div>
        <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
          Faculty: <strong style={{ color: '#f8fafc' }}>Dr. Vikramaditya Rao</strong> • <span style={{ color: '#ec4899', fontWeight: 700 }}>3 Extra Slots Required</span>
        </div>
      </div>

      {/* Recommended Recovery Slots Grid */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} color="#818cf8" /> Recommended Conflict-Free Slots
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {slots.map((slot) => {
            const isSelected = selectedIds.includes(slot.id);
            return (
              <div
                key={slot.id}
                onClick={() => toggleSlot(slot.id)}
                className="glass-card glass-card-interactive"
                style={{
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid #6366f1' : '1px solid rgba(255, 255, 255, 0.08)',
                  background: isSelected ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(17, 24, 39, 0.9) 100%)' : 'rgba(17, 24, 39, 0.75)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Selection Checkbox */}
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    border: isSelected ? 'none' : '2px solid #64748b',
                    background: isSelected ? '#6366f1' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {isSelected && <Check size={16} color="#fff" />}
                  </div>

                  <div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span>{slot.day}</span>
                      <span style={{ fontSize: '0.85rem', color: '#818cf8', fontWeight: 600 }}>({slot.startTime} - {slot.endTime})</span>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                      Venue: <strong style={{ color: '#f8fafc' }}>{slot.room}</strong>
                    </div>
                  </div>
                </div>

                {/* 4 Checkmark Badges */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span className="badge badge-on-track">
                    <UserCheck size={12} /> Faculty ✓
                  </span>
                  <span className="badge badge-on-track">
                    <Users size={12} /> Students ✓
                  </span>
                  <span className="badge badge-on-track">
                    <MapPin size={12} /> Room ✓
                  </span>
                  <span className="badge badge-on-track">
                    <CheckCircle2 size={12} /> No Conflict ✓
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timetable Visual Grid */}
      <div className="glass-card" style={{ padding: '24px', marginBottom: '28px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '16px' }}>
          CSE-A Department Weekly Schedule Matrix
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '100px repeat(5, 1fr)',
          gap: '8px',
          fontSize: '0.78rem',
          textAlign: 'center'
        }}>
          {/* Header Row */}
          <div style={{ fontWeight: 700, color: '#64748b', padding: '8px' }}>Time</div>
          <div style={{ fontWeight: 700, color: '#f8fafc', padding: '8px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px' }}>Mon</div>
          <div style={{ fontWeight: 700, color: '#f8fafc', padding: '8px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px' }}>Tue</div>
          <div style={{ fontWeight: 700, color: '#f8fafc', padding: '8px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px' }}>Wed</div>
          <div style={{ fontWeight: 700, color: '#f8fafc', padding: '8px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px' }}>Thu</div>
          <div style={{ fontWeight: 700, color: '#f8fafc', padding: '8px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px' }}>Fri</div>

          {/* Row 10-11 */}
          <div style={{ color: '#94a3b8', padding: '12px 0' }}>10:00 - 11:00</div>
          <div style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', color: '#cbd5e1' }}>DBMS</div>
          <div style={{ padding: '10px', background: 'rgba(99,102,241,0.25)', border: '1px solid #6366f1', borderRadius: '6px', color: '#fff', fontWeight: 700 }}>OS Extra Slot</div>
          <div style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', color: '#cbd5e1' }}>Java</div>
          <div style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', color: '#cbd5e1' }}>AI Lab</div>
          <div style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', color: '#cbd5e1' }}>CN</div>

          {/* Row 2-3 */}
          <div style={{ color: '#94a3b8', padding: '12px 0' }}>02:00 - 03:00</div>
          <div style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', color: '#cbd5e1' }}>Maths</div>
          <div style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', color: '#cbd5e1' }}>CN</div>
          <div style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', color: '#cbd5e1' }}>Library</div>
          <div style={{ padding: '10px', background: 'rgba(99,102,241,0.25)', border: '1px solid #6366f1', borderRadius: '6px', color: '#fff', fontWeight: 700 }}>OS Extra Slot</div>
          <div style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', color: '#cbd5e1' }}>SE</div>
        </div>
      </div>

      {/* Action Button */}
      <div style={{ textAlign: 'right' }}>
        <button
          onClick={handleApprove}
          className="btn-primary"
          disabled={isSubmitting || selectedIds.length === 0}
          style={{ padding: '14px 28px', fontSize: '1rem', boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)' }}
        >
          <Send size={18} /> {isSubmitting ? 'Dispatching Schedule...' : `Send for Approval (${selectedIds.length} Slots Selected)`}
        </button>
      </div>
    </AppShell>
  );
}
