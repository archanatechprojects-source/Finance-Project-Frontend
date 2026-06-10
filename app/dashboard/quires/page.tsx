"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import CustomerQueryModal from "@/components/customers/CustomerQueryModal";
import { MessageSquare, Clock, Calendar, ChevronRight, Inbox, LifeBuoy } from "lucide-react";

export default function CustomerQueriesPage() {
  const [queries, setQueries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuery, setSelectedQuery] = useState<any>(null);

  const loadQueries = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/customers/queries");
      setQueries(res.data || []);
    } catch (err) {
      console.error("Failed to load customer customer query threads:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadQueries();
  }, []);

  // Customer status badges matching a refined palette
  const getStatusBadge = (status: string) => {
    const base = "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border tracking-wide";
    switch (status?.toUpperCase()) {
      case "NEW":
      case "OPEN":
        return `${base} bg-blue-50 text-blue-700 border-blue-100`;
      case "PENDING":
      case "AWATING_RESPONSE":
        return `${base} bg-amber-50 text-amber-700 border-amber-100`;
      case "RESOLVED":
      case "CLOSED":
        return `${base} bg-slate-100 text-slate-600 border-slate-200`;
      default:
        return `${base} bg-slate-50 text-slate-600 border-slate-200`;
    }
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-12 px-4 sm:px-6">
      
      {/* Title Block Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600">
            <LifeBuoy size={20} className="animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider">Help Desk Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Support Queries
          </h1>
          <p className="text-sm text-slate-500">
            Track active chat conversations, review technical support tickets, and follow up with developers.
          </p>
        </div>
      </div>

      {/* Conditional Layout Stream Renderer */}
      {isLoading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-slate-50 border border-slate-100 rounded-2xl p-5 animate-pulse space-y-3">
              <div className="flex justify-between items-center">
                <div className="h-5 bg-slate-200 rounded-md w-1/3" />
                <div className="h-6 bg-slate-200 rounded-full w-16" />
              </div>
              <div className="h-4 bg-slate-200 rounded-md w-2/3" />
            </div>
          ))}
        </div>
      ) : queries.length > 0 ? (
        <div className="grid gap-4">
          {queries.map((query) => (
            <div
              key={query.id}
              className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg tracking-tight truncate max-w-xl group-hover:text-blue-600 transition-colors">
                    {query.subject || "Untitled Query Ticket"}
                  </h3>
                  <span className={getStatusBadge(query.status)}>
                    {query.status || "OPEN"}
                  </span>
                </div>

                {/* Subtext description clips or fallback timestamp nodes */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                  {query.createdAt && (
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar size={13} />
                      Opened {new Date(query.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </span>
                  )}
                  {query.lastMessageAt && (
                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      Updated {new Date(query.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                </div>

                {query.description && (
                  <p className="text-sm text-slate-500 font-medium line-clamp-1 mt-1 pr-4">
                    {query.description}
                  </p>
                )}
              </div>

              {/* Action Button trigger row */}
              <div className="pt-2 sm:pt-0 shrink-0">
                <button
                  onClick={() => setSelectedQuery(query)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition shadow-xs group-hover:bg-blue-600 group-hover:text-white"
                >
                  <MessageSquare size={16} />
                  <span>Open Chat</span>
                  <ChevronRight size={14} className="opacity-70 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty Fallback Block Frame State Illustration */
        <div className="bg-white border border-dashed border-slate-300 rounded-3xl p-12 text-center max-w-md mx-auto my-12 space-y-4 shadow-2xs">
          <div className="w-12 h-12 bg-slate-50 text-slate-400 border rounded-2xl flex items-center justify-center mx-auto shadow-3xs">
            <Inbox size={22} />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900">No tickets found</h2>
            <p className="text-sm text-slate-500 font-medium">
              You haven't initiated any help-desk questions or conversational support threads yet.
            </p>
          </div>
        </div>
      )}

      {/* Modal Dialog Mount Core */}
      {selectedQuery && (
        <CustomerQueryModal
          query={selectedQuery}
          onClose={() => setSelectedQuery(null)}
          onRefresh={loadQueries}
        />
      )}

    </div>
  );
}