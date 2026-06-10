"use client";

import { useState } from "react";
import api from "@/lib/api";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function BookingModal({ open, onClose }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    scheduledAt: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const submitBooking = async () => {
    try {
      setLoading(true);

      await api.post("/public/bookings", {
        ...form,
      });

      alert("Consultation Requested");

      setForm({
        name: "",
        email: "",
        phone: "",
        topic: "",
        scheduledAt: "",
        notes: "",
      });

      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to book consultation");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white w-full max-w-xl rounded-2xl md:rounded-3xl shadow-2xl p-5 sm:p-8 relative max-h-[calc(100vh-2rem)] flex flex-col">
        
        {/* Header Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Form Header */}
        <div className="mb-5 sm:mb-6 pr-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Schedule Consultation
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Fill out the details below to request a strategic call.
          </p>
        </div>

        {/* Scrollable Form Body Container */}
        <div className="space-y-4 overflow-y-auto flex-1 pr-1 sm:pr-0 pb-2">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5 ml-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-slate-200 rounded-xl p-3 sm:p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition text-sm sm:text-base"
            />
          </div>

          {/* Grid for Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5 ml-1">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-slate-200 rounded-xl p-3 sm:p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5 ml-1">Phone Number</label>
              <input
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-slate-200 rounded-xl p-3 sm:p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Date & Time Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5 ml-1">Preferred Date & Time</label>
            <input
              type="datetime-local"
              value={form.scheduledAt}
              onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })}
              className="w-full border border-slate-200 rounded-xl p-3 sm:p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition text-sm sm:text-base"
            />
          </div>

          {/* Topic (Returned to Text Input) */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5 ml-1">Consultation Topic</label>
            <input
              type="text"
              placeholder="e.g., Retirement Planning / Portfolio Review"
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              className="w-full border border-slate-200 rounded-xl p-3 sm:p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition text-sm sm:text-base"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5 ml-1">Additional Notes</label>
            <textarea
              rows={3}
              placeholder="Tell us a little about your financial goals..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full border border-slate-200 rounded-xl p-3 sm:p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition resize-none text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Sticky Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6 border-t border-slate-100 pt-4">
          <button
            onClick={onClose}
            className="w-full sm:flex-1 border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 transition text-sm sm:text-base"
          >
            Cancel
          </button>

          <button
            onClick={submitBooking}
            disabled={loading}
            className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition text-sm sm:text-base shadow-md shadow-blue-600/10"
          >
            {loading ? "Booking..." : "Book Call"}
          </button>
        </div>

      </div>
    </div>
  );
}