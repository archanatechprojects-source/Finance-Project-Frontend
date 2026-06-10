"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import { X, Edit2, Loader2, AlertCircle, User, Mail, Phone, Calendar, Sparkles, FileText } from "lucide-react";

interface Booking {
  id: string | number;
  name?: string;
  email?: string;
  phone?: string;
  topic?: string;
  scheduledAt?: string;
  notes?: string;
}

interface EditDemoRequestModalProps {
  open: boolean;
  booking: Booking | null;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  topic: string;
  scheduledAt: string;
  notes: string;
}

const INITIAL_FORM_STATE: FormState = {
  name: "",
  email: "",
  phone: "",
  topic: "",
  scheduledAt: "",
  notes: "",
};

export default function EditDemoRequestModal({
  open,
  booking,
  onClose,
  onSuccess,
}: EditDemoRequestModalProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync state data whenever a target booking allocation object shifts
  useEffect(() => {
    if (!booking) {
      setForm(INITIAL_FORM_STATE);
      return;
    }

    setForm({
      name: booking.name || "",
      email: booking.email || "",
      phone: booking.phone || "",
      topic: booking.topic || "",
      scheduledAt: booking.scheduledAt?.slice(0, 16) || "",
      notes: booking.notes || "",
    });
    setErrorMessage(null);
  }, [booking]);

  if (!open || !booking) return null;

  const updateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.topic.trim() || !form.scheduledAt || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      await api.patch(`/admin/bookings/${booking.id}`, {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        topic: form.topic.trim(),
        scheduledAt: form.scheduledAt,
        notes: form.notes.trim(),
      });

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error("Error executing patch routine mapping updates:", err);
      setErrorMessage(err?.response?.data?.message || "Failed to update demo request records. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormInvalid = !form.topic.trim() || !form.scheduledAt;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Navigation Modal Header Row Layout */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Edit2 size={16} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Edit Demo Request</h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Modify consultation parameters, logs, or primary schedule variables</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition disabled:opacity-40"
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        {/* Dynamic Form Controller Block */}
        <form onSubmit={updateRequest} className="flex-1 flex flex-col overflow-hidden">
          <div className="p-5 sm:p-6 space-y-4 overflow-y-auto bg-slate-50/40 flex-1 custom-scrollbar">
            
            {/* Realtime Action Execution Error Display */}
            {errorMessage && (
              <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-2.5 text-xs font-semibold text-rose-700 animate-in fade-in slide-in-from-top-1">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Combined User Profile Field Bounds */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-4 space-y-3.5 shadow-3xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block border-b border-slate-50 pb-1.5">
              Customer Info
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <User size={10} /> Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    disabled={isSubmitting}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-400 transition bg-white disabled:bg-slate-50"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Mail size={10} /> Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    disabled={isSubmitting}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-400 transition bg-white disabled:bg-slate-50"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="phone" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Phone size={10} /> Phone Line
                  </label>
                  <input
                    id="phone"
                    type="text"
                    value={form.phone}
                    disabled={isSubmitting}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-400 transition bg-white disabled:bg-slate-50"
                  />
                </div>
              </div>
            </div>

            {/* Core Scheduling Functional Modifiers */}
            <div className="space-y-3.5">
              <div className="space-y-1.5">
                <label htmlFor="topic" className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={12} /> Topic
                </label>
                <input
                  id="topic"
                  type="text"
                  maxLength={120}
                  value={form.topic}
                  disabled={isSubmitting}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  className="w-full border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition bg-white disabled:bg-slate-50"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="scheduledAt" className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Calendar size={12} /> Time
                </label>
                <input
                  id="scheduledAt"
                  type="datetime-local"
                  value={form.scheduledAt}
                  disabled={isSubmitting}
                  onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })}
                  className="w-full border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition bg-white cursor-pointer disabled:bg-slate-50"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="notes" className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <FileText size={12} /> Notes
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  maxLength={1500}
                  value={form.notes}
                  disabled={isSubmitting}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition bg-white resize-none leading-relaxed disabled:bg-slate-50"
                />
                <div className="text-right px-1">
                  <span className="text-[10px] text-slate-400 font-mono font-semibold">{form.notes.length}/1500</span>
                </div>
              </div>
            </div>

          </div>

          {/* Core Controls Actions Execution Row Footer */}
          <div className="p-4 border-t border-slate-100 flex justify-end gap-2.5 bg-white shrink-0">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              type="button"
              className="px-4.5 py-2.5 border border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-50 transition disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isFormInvalid || isSubmitting}
              className="inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 text-white disabled:text-slate-400 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition shrink-0 shadow-xs cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <span>Commit Changes</span>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}