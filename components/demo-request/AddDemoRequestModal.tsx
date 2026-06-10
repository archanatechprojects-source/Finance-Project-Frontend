"use client";

import React, { useEffect, useState, useRef } from "react";
import api from "@/lib/api";
import { X, Search, Loader2, UserPlus, Calendar, Mail, Phone, FileText, CheckCircle2, UserCheck } from "lucide-react";

interface Customer {
  id: string | number;
  name: string;
  email: string;
  phone?: string;
}

interface FormState {
  customerId: string;
  name: string;
  email: string;
  phone: string;
  topic: string;
  scheduledAt: string;
  notes: string;
}

interface AddDemoRequestModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const INITIAL_FORM_STATE: FormState = {
  customerId: "",
  name: "",
  email: "",
  phone: "",
  topic: "",
  scheduledAt: "",
  notes: "",
};

export default function AddDemoRequestModal({ open, onClose, onSuccess }: AddDemoRequestModalProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [customerSearch, setCustomerSearch] = useState("");
  const [showCustomers, setShowCustomers] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch baseline administrative clients repository data
  useEffect(() => {
    if (!open) return;

    api.get("/admin/customers")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error("Error retrieving user indexing mappings:", err));
  }, [open]);

  // Click-away interaction listener for dropdown closure
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCustomers(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClearAndClose = () => {
    setForm(INITIAL_FORM_STATE);
    setCustomerSearch("");
    setShowCustomers(false);
    onClose();
  };

  const createRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.topic.trim() || !form.scheduledAt || loading) return;

    try {
      setLoading(true);
      await api.post("/customers/bookings", {
        ...form,
        customerId: form.customerId || null,
        topic: form.topic.trim(),
        notes: form.notes.trim(),
      });

      onSuccess();
      handleClearAndClose();
    } catch (err) {
      console.error("An error occurred during ticket parsing allocation setup:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter((c) =>
    `${c.name} ${c.email}`.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const getMinDateTimeString = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().slice(0, 16);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Navigation Modal Header Container */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <UserPlus size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Create Demo Request</h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Initialize a consultation block or link a cold marketing lead element</p>
            </div>
          </div>
          <button
            onClick={handleClearAndClose}
            disabled={loading}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition"
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        {/* Input Configuration Grid Area */}
        <form onSubmit={createRequest} className="flex-1 flex flex-col overflow-hidden">
          <div className="p-5 sm:p-6 space-y-4 overflow-y-auto bg-slate-50/40 flex-1 custom-scrollbar">
            
            {/* Realtime Directory Lookup Auto-complete Filter Input */}
            <div className="space-y-1.5 relative" ref={dropdownRef}>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Search size={12} /> For Existing Customer
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search customer"
                  value={customerSearch}
                  onFocus={() => setShowCustomers(true)}
                  onChange={(e) => {
                    setCustomerSearch(e.target.value);
                    setShowCustomers(true);
                    if (!e.target.value) {
                      setForm(prev => ({ ...prev, customerId: "", name: "", email: "", phone: "" }));
                    }
                  }}
                  className="w-full border border-slate-200 focus:border-blue-500 rounded-xl pl-4 pr-10 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition bg-white"
                />
                {form.customerId && (
                  <UserCheck size={16} className="absolute right-3.5 top-3.5 text-emerald-500" />
                )}
              </div>

              {/* Dynamic Overlay Lookup Stream Selection Window */}
              {showCustomers && customerSearch.trim() && (
                <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl max-h-56 overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-1">
                  {filteredCustomers.length === 0 ? (
                    <div className="px-4 py-3 text-xs font-medium text-slate-400 italic">No matching client indexes recorded.</div>
                  ) : (
                    filteredCustomers.map((customer) => (
                      <button
                        key={customer.id}
                        type="button"
                        onClick={() => {
                          setForm({
                            ...form,
                            customerId: String(customer.id),
                            name: customer.name,
                            email: customer.email,
                            phone: customer.phone || "",
                          });
                          setCustomerSearch(customer.name);
                          setShowCustomers(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition flex items-center justify-between border-b border-slate-50 last:border-0"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="font-bold text-xs text-slate-800 tracking-tight truncate">{customer.name}</div>
                          <div className="text-[11px] font-medium text-slate-400 truncate">{customer.email}</div>
                        </div>
                        <span className="shrink-0 text-[9px] font-bold font-mono tracking-wide bg-emerald-50 border border-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded uppercase">
                          Client
                        </span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Target Variable Assignment Context Rows */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-4 space-y-3.5 shadow-3xs">
              <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Add Customer Profile Identity</span>
                <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${form.customerId ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-amber-50 border-amber-100 text-amber-600'}`}>
                  {form.customerId ? "Mapped Profile Identity" : "Manually"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><UserCheck size={10} /> Name</span>
                  <input
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-400 transition"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><Mail size={10} /> Email Address</span>
                  <input
                    type="email"
                    placeholder="name@destination.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-400 transition"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><Phone size={10} /> Contact Line</span>
                  <input
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-400 transition"
                  />
                </div>
              </div>
            </div>

            {/* Core Task Attributes Fields Group */}
            <div className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 size={12} /> Topic
                </label>
                <input
                  placeholder="e.g., Enterprise Interface Demonstration & Pipeline Audit Overview"
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  className="w-full border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition bg-white"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Calendar size={12} /> Timestamp
                </label>
                <input
                  type="datetime-local"
                  min={getMinDateTimeString()}
                  value={form.scheduledAt}
                  onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })}
                  className="w-full border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition bg-white cursor-pointer"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <FileText size={12} /> Notes
                </label>
                <textarea
                  placeholder="Notes"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition bg-white resize-none leading-relaxed"
                  rows={3}
                />
              </div>
            </div>

          </div>

          {/* Core Layout Interface Task Actions Bar Footer Row */}
          <div className="p-4 border-t border-slate-100 flex justify-end gap-2.5 bg-white shrink-0">
            <button
              onClick={handleClearAndClose}
              disabled={loading}
              type="button"
              className="px-4.5 py-2.5 border border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-50 transition disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!form.topic.trim() || !form.scheduledAt || loading}
              className="inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 text-white disabled:text-slate-400 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition shrink-0 shadow-xs cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <span>Generate Allocation</span>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}