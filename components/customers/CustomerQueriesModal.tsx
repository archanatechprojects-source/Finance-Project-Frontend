"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import CustomerQueryModal from "./CustomerQueryModal";
import { X, MessageSquare, Clock, Inbox, Loader2, LifeBuoy, ArrowRight } from "lucide-react";

interface CustomerQueriesModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CustomerQueriesModal({ open, onClose }: CustomerQueriesModalProps) {
  const [queries, setQueries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuery, setSelectedQuery] = useState<any>(null);

  const loadQueries = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/customers/queries");
      setQueries(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to pull open support data profiles:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      loadQueries();
    }
  }, [open]);

  if (!open) return null;

  // Refined support status pill styling map
  const getStatusStyle = (status: string) => {
    const base = "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide border";
    switch (status?.toUpperCase()) {
      case "NEW":
      case "OPEN":
        return `${base} bg-blue-50 text-blue-700 border-blue-100`;
      case "PENDING":
        return `${base} bg-amber-50 text-amber-700 border-amber-100`;
      case "RESOLVED":
      case "CLOSED":
        return `${base} bg-slate-100 text-slate-600 border-slate-200`;
      default:
        return `${base} bg-slate-50 text-slate-600 border-slate-200`;
    }
  };

  return (
    <>
      {/* Modal Backdrop Layer */}
      <div className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white w-full max-w-3xl h-[650px] rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          
          {/* Header Bar Area */}
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <LifeBuoy size={18} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  My Support Queries
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Track your active conversations and developer responses</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition"
              type="button"
            >
              <X size={18} />
            </button>
          </div>

          {/* Core Content Area Scroll Frame */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-slate-50/50">
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-white border border-slate-200/60 rounded-xl p-4 animate-pulse flex justify-between items-center">
                    <div className="space-y-2 w-2/3">
                      <div className="h-4 bg-slate-200 rounded w-1/2" />
                      <div className="h-3 bg-slate-200 rounded w-1/4" />
                    </div>
                    <div className="h-8 bg-slate-200 rounded-lg w-20" />
                  </div>
                ))}
              </div>
            ) : queries.length > 0 ? (
              <div className="space-y-3">
                {queries.map((query: any) => (
                  <div
                    key={query.id}
                    className="group bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-3xs transition"
                  >
                    <div className="space-y-1.5 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-sm sm:text-base text-slate-900 tracking-tight truncate max-w-md group-hover:text-blue-600 transition-colors">
                          {query.subject || "No Subject Given Specified"}
                        </h3>
                        <span className={getStatusStyle(query.status)}>
                          {query.status || "OPEN"}
                        </span>
                      </div>

                      {/* Timeline Sub-markers */}
                      {query.updatedAt && (
                        <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                          <Clock size={12} />
                          Updated {new Date(query.updatedAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedQuery(query)}
                      className="inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition shrink-0 group-hover:bg-blue-600"
                    >
                      <MessageSquare size={14} />
                      <span>Open Chat</span>
                      <ArrowRight size={12} className="opacity-60 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              /* Completely Empty Fallback Block Illustration */
              <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center max-w-sm mx-auto my-8 space-y-3 shadow-3xs">
                <div className="w-10 h-10 bg-slate-50 text-slate-400 border rounded-xl flex items-center justify-center mx-auto">
                  <Inbox size={20} />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-slate-900">No support tickets found</h3>
                  <p className="text-xs text-slate-400 font-medium">
                    You haven't requested technical help messages or conversations yet.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Simple Clean Sticky Footer Container */}
          <div className="p-4 border-t border-slate-100 flex justify-end bg-white shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-50 transition"
              type="button"
            >
              Close Window
            </button>
          </div>

        </div>
      </div>

      {/* Layer-Stacked Dialog Focus Element Mount */}
      {selectedQuery && (
        <CustomerQueryModal
          query={selectedQuery}
          onClose={() => setSelectedQuery(null)}
          onRefresh={loadQueries}
        />
      )}
    </>
  );
}