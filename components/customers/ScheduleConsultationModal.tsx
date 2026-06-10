"use client";

import React, { useState } from "react";
import api from "@/lib/api";
import { X, Calendar, Loader2, AlertCircle, Sparkles, FileText } from "lucide-react";

interface CustomerData {
  id: string | number;
  name: string;
  email: string;
  phone?: string;
}

interface ScheduleConsultationModalProps {
  open: boolean;
  customer: CustomerData;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ScheduleConsultationModal({
  open,
  customer,
  onClose,
  onSuccess,
}: ScheduleConsultationModalProps) {
  const [form, setForm] = useState({
    topic: "",
    scheduledAt: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!open) return null;

  // Calculates current client timezone local string ISO sequence for form validation barriers
  const getMinDateTimeString = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now.getTime() - offset).toISOString();
    return localISOTime.slice(0, 16); // Extract precisely "YYYY-MM-DDTHH:MM"
  };

  const handleClearAndClose = () => {
    setForm({ topic: "", scheduledAt: "", notes: "" });
    setErrorMessage(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.topic.trim() || !form.scheduledAt || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      await api.post("/customers/bookings", {
        customerId: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone || "Not Shared",
        topic: form.topic.trim(),
        scheduledAt: form.scheduledAt,
        notes: form.notes.trim(),
      });

      if (onSuccess) onSuccess();
      handleClearAndClose();
    } catch (err: any) {
      console.error("Failed to commit calendar booking allocation:", err);
      setErrorMessage(err?.response?.data?.message || "Failed to schedule advisory session. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormInvalid = !form.topic.trim() || !form.scheduledAt;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Navigation Modal Header Row Layout */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Calendar size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Schedule Consultation
              </h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Book a direct digital advisory block with your account supervisor
              </p>
            </div>
          </div>
          <button
            onClick={handleClearAndClose}
            disabled={isSubmitting}
            type="button"
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition disabled:opacity-40"
          >
            <X size={18} />
          </button>
        </div>

        {/* Dynamic Form Element Layer */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="p-5 sm:p-6 space-y-4 overflow-y-auto bg-slate-50/30 flex-1">
            
            {/* Dynamic Operations Error Callout Panel */}
            {errorMessage && (
              <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-2.5 text-xs font-semibold text-rose-700 animate-in fade-in slide-in-from-top-1">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Input Component Element: Topic Parameter */}
            <div className="space-y-1.5">
              <label htmlFor="topic" className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={12} className="text-slate-300" /> Consultation Topic
              </label>
              <input
                id="topic"
                type="text"
                maxLength={100}
                placeholder="e.g., Q3 Asset Rebalancing Strategy Review"
                value={form.topic}
                disabled={isSubmitting}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className="w-full border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition bg-white disabled:bg-slate-50"
                required
              />
            </div>

            {/* Input Component Element: DateTime Selection Node */}
            <div className="space-y-1.5">
              <label htmlFor="scheduledAt" className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Calendar size={12} className="text-slate-300" />Date & Time
              </label>
              <input
                id="scheduledAt"
                type="datetime-local"
                min={getMinDateTimeString()}
                value={form.scheduledAt}
                disabled={isSubmitting}
                onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })}
                className="w-full border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition bg-white disabled:bg-slate-50 cursor-pointer text-left"
                required
              />
            </div>

            {/* Input Component Element: Context Notes Block Textarea */}
            <div className="space-y-1.5">
              <label htmlFor="notes" className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <FileText size={12} className="text-slate-300" /> Notes
              </label>
              <textarea
                id="notes"
                rows={4}
                maxLength={1000}
                placeholder="Additional Info.."
                value={form.notes}
                disabled={isSubmitting}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition bg-white disabled:bg-slate-50 resize-none leading-relaxed"
              />
              <div className="text-right px-1">
                <span className="text-[10px] text-slate-400 font-mono font-semibold">{form.notes.length}/1000</span>
              </div>
            </div>

          </div>

          {/* Core Controls Base Action Panel */}
          <div className="p-4 border-t border-slate-100 flex justify-end gap-2.5 bg-white shrink-0">
            <button
              onClick={handleClearAndClose}
              disabled={isSubmitting}
              type="button"
              className="px-4.5 py-2.5 border border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-50 active:scale-98 transition disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isFormInvalid || isSubmitting}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 text-white disabled:text-slate-400 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl active:scale-98 transition shrink-0 shadow-xs cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <span>Confirm Session</span>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}