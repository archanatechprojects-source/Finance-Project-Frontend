"use client";

import React, { useState } from "react";
import { X, Send, Loader2, LifeBuoy, AlertCircle } from "lucide-react";

interface RaiseQueryModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void; // Optional success hook callback to alert ancestor components
}

export default function RaiseQueryModal({ open, onClose, onSuccess }: RaiseQueryModalProps) {
  const [form, setForm] = useState({
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!open) return null;

  const handleClearAndClose = () => {
    setForm({ subject: "", message: "" });
    setErrorMessage(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject.trim() || !form.message.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      // Import statement endpoint call integration mapping
      const api = (await import("@/lib/api")).default;
      await api.post("/customers/queries", {
        subject: form.subject.trim(),
        message: form.message.trim(),
      });

      if (onSuccess) onSuccess();
      handleClearAndClose();
    } catch (err: any) {
      console.error("Failed to register corporate platform incident request ticket:", err);
      setErrorMessage(err?.response?.data?.message || "Failed to submit query. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormInvalid = !form.subject.trim() || !form.message.trim();

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Navigation Modal Header Row Layout */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <LifeBuoy size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Raise Support Query
              </h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Submit an inquiry directly to our financial administration team
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

        {/* Core Form Element Handling Wrapper Context */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="p-5 sm:p-6 space-y-4 overflow-y-auto bg-slate-50/30 flex-1">
            
            {/* Error Message Display Callout Block */}
            {errorMessage && (
              <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-2.5 text-xs font-semibold text-rose-700 animate-in fade-in slide-in-from-top-1">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Input Parameter Element: Subject Text Node */}
            <div className="space-y-1.5">
              <label htmlFor="subject" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Inquiry Subject
              </label>
              <input
                id="subject"
                type="text"
                maxLength={80}
                placeholder="Enter a brief subject for your inquiry..."
                value={form.subject}
                disabled={isSubmitting}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition bg-white disabled:bg-slate-50 disabled:text-slate-400"
                required
              />
            </div>

            {/* Input Parameter Element: Textarea Description Block */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Description
              </label>
              <textarea
                id="message"
                rows={5}
                maxLength={2000}
                placeholder="Message your inquiry here..."
                value={form.message}
                disabled={isSubmitting}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition bg-white disabled:bg-slate-50 disabled:text-slate-400 resize-none leading-relaxed"
                required
              />
              <div className="flex justify-between items-center pt-1 px-1">
                <span className="text-[10px] text-slate-400 font-medium">Be explicit to minimize response processing times.</span>
                <span className="text-[10px] text-slate-400 font-mono font-semibold">{form.message.length}/2000</span>
              </div>
            </div>

          </div>

          {/* Form Control Buttons Bar Row Layout */}
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
              className="inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 text-white disabled:text-slate-400 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl active:scale-98 transition shrink-0 shadow-xs cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <>
                  <span>Raise Query</span>
                  <Send size={12} strokeWidth={2.5} />
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}