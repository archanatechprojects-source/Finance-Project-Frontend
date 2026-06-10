"use client";

import React from "react";
import { X, Briefcase, Inbox, TrendingUp, Info } from "lucide-react";

interface InvestmentItem {
  id: string | number;
  assetName?: string;
  name?: string; // Fallback definition for dashboard schema parity
  amount: number;
  notes?: string;
  category?: string;
}

interface InvestmentsModalProps {
  open: boolean;
  investments: InvestmentItem[];
  onClose: () => void;
}

export default function InvestmentsModal({ open, investments, onClose }: InvestmentsModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-100 flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Navigation Modal Header Container */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white rounded-t-2xl shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Briefcase size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Asset Investment Ledger
              </h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Detailed portfolio positions and allocated assets
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Holdings Container Block */}
        <div className="p-5 sm:p-6 overflow-y-auto bg-slate-50/50 flex-1 space-y-3 custom-scrollbar">
          {!investments || investments.length === 0 ? (
            /* Empty State State Fallback View Panel */
            <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center max-w-sm mx-auto my-6 space-y-3 shadow-3xs">
              <div className="w-10 h-10 bg-slate-50 text-slate-400 border rounded-xl flex items-center justify-center mx-auto">
                <Inbox size={20} />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-slate-900">No active assets</h3>
                <p className="text-xs text-slate-400 font-medium">
                  There are currently no investment allocations logged under this account.
                </p>
              </div>
            </div>
          ) : (
            investments.map((investment) => {
              // Gracefully handle schema variances between components
              const assetTitle = investment.assetName || investment.name || "Unnamed Allocation Asset";

              return (
                <div
                  key={investment.id}
                  className="group bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4.5 shadow-3xs transition flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                >
                  <div className="space-y-2 min-w-0 flex-1">
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1 text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                        {investment.category || "General Asset Class"}
                      </span>
                      <h3 className="font-bold text-base text-slate-900 tracking-tight truncate group-hover:text-blue-600 transition-colors">
                        {assetTitle}
                      </h3>
                    </div>

                    {investment.notes && (
                      <p className="text-xs text-slate-500 font-medium leading-relaxed bg-slate-50 border border-slate-100 rounded-lg p-2.5 flex items-start gap-2">
                        <Info size={14} className="text-slate-400 shrink-0 mt-0.5" />
                        <span>{investment.notes}</span>
                      </p>
                    )}
                  </div>

                  {/* Financial Evaluation Metric Node */}
                  <div className="sm:text-right shrink-0 flex sm:flex-col items-baseline sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block sm:hidden">
                      Value
                    </span>
                    <div className="space-y-0.5">
                      <p className="font-mono font-black text-slate-900 text-base sm:text-lg">
                        ₹{investment.amount?.toLocaleString("en-IN")}
                      </p>
                      <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded hidden sm:inline-flex items-center gap-0.5">
                        <TrendingUp size={10} /> Active Position
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Form Controls Base Actions Row */}
        <div className="p-4 border-t border-slate-100 flex justify-end bg-white rounded-b-2xl shrink-0">
          <button
            onClick={onClose}
            type="button"
            className="px-4.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition shadow-xs"
          >
            Close Ledger View
          </button>
        </div>

      </div>
    </div>
  );
}