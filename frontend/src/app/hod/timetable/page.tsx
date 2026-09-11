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
          <span className="badge" style={{ background: '#FFFFFF', color: 'var(--ink)', border: '1px solid var(--line)' }}>
            <Calendar size={12} color="var(--brass)" /> Constraint-Satisfaction Slot Allocator
          </span>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.8rem',
          fontWeight: 800,
          color: 'var(--ink)',
          marginBottom: '4px',
          letterSpacing: '-0.02em'
        }}>
          Automated Remedial Timetable Optimization
        </h1>
        <p style={{ color: 'var(--ink-muted)', fontSize: '0.88rem' }}>
          AI automated check against faculty schedules, student section timetables, and available laboratory/lecture halls.
        </p>
      </div>

      {/* Success Modal / Banner when Approved */}
      {isApproved && (
        <div className="glass-card" style={{
          padding: '20px 24px',
          marginBottom: '24px',
          background: '#FAF8F3',
          border: '1px solid var(--line)',
          borderLeft: '4px solid var(--ontrack)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'var(--ontrack)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <CheckCircle2 size={24} color="#fff" />
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--ink)' }}>
              ✓ Recovery Schedule Approved & Dispatched!
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
              3 extra classes added to CSE-A timetable. Push notifications sent to Dr. Vikramaditya Rao and 58 enrolled students.
            </p>
          </div>
        </div>
      )}

      {/* Target Course Banner */}
      <div className="glass-card" style={{
        padding: '20px 24px',
        marginBottom: '24px',
        background: '#FFFFFF',
        border: '1px solid var(--line)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <span style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>Target Course</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)' }}>
            Operating Systems (CS303 - CSE-A)
          </h2>
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
          Faculty: <strong style={{ color: 'var(--ink)' }}>Dr. Vikramaditya Rao</strong> • <span style={{ color: 'var(--atrisk)', fontWeight: 700 }}>3 Extra Slots Required</span>
        </div>
      </div>

      {/* Recommended Recovery Slots Grid */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} color="var(--brass)" /> Recommended Conflict-Free Slots
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {slots.map((slot) => {
            const isSelected = selectedIds.includes(slot.id);
            return (
              <div
                key={slot.id}
                onClick={() => toggleSlot(slot.id)}
                style={{
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  border: isSelected ? '2px solid var(--ink)' : '1px solid var(--line)',
                  borderLeft: isSelected ? '4px solid var(--brass)' : '1px solid var(--line)',
                  background: isSelected ? '#FAF8F3' : '#FFFFFF',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Selection Checkbox */}
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '4px',
                    border: isSelected ? 'none' : '1px solid var(--line)',
                    background: isSelected ? 'var(--ink)' : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {isSelected && <Check size={14} color="#FAF8F3" />}
                  </div>

                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontFamily: 'var(--font-serif)' }}>{slot.day}</span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', fontWeight: 600 }}>({slot.startTime} - {slot.endTime})</span>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginTop: '2px' }}>
                      Venue: <strong style={{ color: 'var(--ink)' }}>{slot.room}</strong>
                    </div>
                  </div>
                </div>

                {/* 4 Checkmark Badges */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge" style={{ background: '#FAF8F3', color: 'var(--ontrack)', border: '1px solid var(--line)' }}>
                    <UserCheck size={12} /> Faculty ✓
                  </span>
                  <span className="badge" style={{ background: '#FAF8F3', color: 'var(--ontrack)', border: '1px solid var(--line)' }}>
                    <Users size={12} /> Students ✓
                  </span>
                  <span className="badge" style={{ background: '#FAF8F3', color: 'var(--ontrack)', border: '1px solid var(--line)' }}>
                    <MapPin size={12} /> Room ✓
                  </span>
                  <span className="badge" style={{ background: '#FAF8F3', color: 'var(--ontrack)', border: '1px solid var(--line)' }}>
                    <CheckCircle2 size={12} /> No Conflict ✓
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timetable Visual Grid */}
      <div className="glass-card" style={{ padding: '24px', marginBottom: '28px', background: '#FFFFFF', border: '1px solid var(--line)' }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '16px' }}>
          CSE-A Department Weekly Schedule Matrix
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '100px repeat(5, 1fr)',
          gap: '6px',
          fontSize: '0.78rem',
          textAlign: 'center'
        }}>
          {/* Header Row */}
          <div style={{ fontWeight: 700, color: 'var(--ink-muted)', padding: '8px' }}>Time</div>
          <div style={{ fontWeight: 700, color: 'var(--ink)', padding: '8px', background: 'var(--paper)', borderRadius: '4px', border: '1px solid var(--line)' }}>Mon</div>
          <div style={{ fontWeight: 700, color: 'var(--ink)', padding: '8px', background: 'var(--paper)', borderRadius: '4px', border: '1px solid var(--line)' }}>Tue</div>
          <div style={{ fontWeight: 700, color: 'var(--ink)', padding: '8px', background: 'var(--paper)', borderRadius: '4px', border: '1px solid var(--line)' }}>Wed</div>
          <div style={{ fontWeight: 700, color: 'var(--ink)', padding: '8px', background: 'var(--paper)', borderRadius: '4px', border: '1px solid var(--line)' }}>Thu</div>
          <div style={{ fontWeight: 700, color: 'var(--ink)', padding: '8px', background: 'var(--paper)', borderRadius: '4px', border: '1px solid var(--line)' }}>Fri</div>

          {/* Row 10-11 */}
          <div style={{ color: 'var(--ink-muted)', padding: '12px 0', fontFamily: 'var(--font-serif)' }}>10:00 - 11:00</div>
          <div style={{ padding: '10px', background: 'var(--paper)', borderRadius: '4px', border: '1px solid var(--line)', color: 'var(--ink)' }}>DBMS</div>
          <div style={{ padding: '10px', background: '#FAF8F3', border: '1px solid var(--ink)', borderLeft: '3px solid var(--brass)', borderRadius: '4px', color: 'var(--ink)', fontWeight: 700 }}>OS Extra Slot</div>
          <div style={{ padding: '10px', background: 'var(--paper)', borderRadius: '4px', border: '1px solid var(--line)', color: 'var(--ink)' }}>Java</div>
          <div style={{ padding: '10px', background: 'var(--paper)', borderRadius: '4px', border: '1px solid var(--line)', color: 'var(--ink)' }}>AI Lab</div>
          <div style={{ padding: '10px', background: 'var(--paper)', borderRadius: '4px', border: '1px solid var(--line)', color: 'var(--ink)' }}>CN</div>

          {/* Row 2-3 */}
          <div style={{ color: 'var(--ink-muted)', padding: '12px 0', fontFamily: 'var(--font-serif)' }}>02:00 - 03:00</div>
          <div style={{ padding: '10px', background: 'var(--paper)', borderRadius: '4px', border: '1px solid var(--line)', color: 'var(--ink)' }}>Maths</div>
          <div style={{ padding: '10px', background: 'var(--paper)', borderRadius: '4px', border: '1px solid var(--line)', color: 'var(--ink)' }}>CN</div>
          <div style={{ padding: '10px', background: 'var(--paper)', borderRadius: '4px', border: '1px solid var(--line)', color: 'var(--ink)' }}>Library</div>
          <div style={{ padding: '10px', background: '#FAF8F3', border: '1px solid var(--ink)', borderLeft: '3px solid var(--brass)', borderRadius: '4px', color: 'var(--ink)', fontWeight: 700 }}>OS Extra Slot</div>
          <div style={{ padding: '10px', background: 'var(--paper)', borderRadius: '4px', border: '1px solid var(--line)', color: 'var(--ink)' }}>SE</div>
        </div>
      </div>

      {/* Action Button */}
      <div style={{ textAlign: 'right' }}>
        <button
          onClick={handleApprove}
          className="btn-primary"
          disabled={isSubmitting || selectedIds.length === 0}
          style={{ padding: '12px 24px', fontSize: '0.95rem' }}
        >
          <Send size={16} /> {isSubmitting ? 'Dispatching Schedule...' : `Send for Approval (${selectedIds.length} Slots Selected)`}
        </button>
      </div>
    </AppShell>
  );
}
