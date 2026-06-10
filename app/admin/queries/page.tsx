"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import QueryModal from "@/components/quires/QuriesModal";
import { Search, MessageSquare, User, Eye, Inbox } from "lucide-react";

export default function QueriesPage() {
  const [queries, setQueries] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedQuery, setSelectedQuery] = useState<any>(null);

  const loadQueries = async () => {
    try {
      const res = await api.get("/admin/queries");
      setQueries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadQueries();
  }, []);

  // Safe filtration loop with optional chaining guards
  const filteredQueries = queries.filter((q) =>
    `${q.customer?.name || ""} ${q.subject || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Formats query workflows elegantly depending on operational logs
  const getStatusBadge = (status: string) => {
    const base = "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold tracking-wide border";
    switch (status?.toUpperCase()) {
      case "NEW":
      case "OPEN":
        return `${base} bg-blue-50 text-blue-700 border-blue-200`;
      case "PENDING":
        return `${base} bg-amber-50 text-amber-700 border-amber-200`;
      case "RESOLVED":
      case "CLOSED":
        return `${base} bg-emerald-50 text-emerald-700 border-emerald-200`;
      default:
        return `${base} bg-slate-100 text-slate-600 border-slate-200`;
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      
      {/* Header Description Frame */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Customer Queries
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Monitor incoming support tickets, triage feedback requests, and audit conversational threads.
        </p>
      </div>

      {/* Enhanced Interactive Search Component Input wrapper */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Search support index by customer name or query subject lines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-2xl bg-white text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-sm"
        />
      </div>

      {/* Main Structural Outer Wrapper */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Desktop Layout Matrix View Frame */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                <th className="p-4 lg:p-5 w-[25%]">Customer Account</th>
                <th className="p-4 lg:p-5 w-[45%]">Subject / Intent</th>
                <th className="p-4 lg:p-5 w-[15%]">Triage Status</th>
                <th className="p-4 lg:p-5 text-right w-[15%]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
              {filteredQueries.length > 0 ? (
                filteredQueries.map((query) => (
                  <tr key={query.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 lg:p-5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 font-bold text-xs border border-slate-200">
                          {query.customer?.name?.charAt(0).toUpperCase() || <User size={14} />}
                        </div>
                        <span className="font-bold text-slate-900 text-base line-clamp-1">
                          {query.customer?.name || "Anonymous Guest"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 lg:p-5">
                      <div className="flex items-center gap-2 max-w-xl">
                        <MessageSquare size={16} className="text-slate-400 shrink-0" />
                        <span className="text-slate-700 font-semibold truncate" title={query.subject}>
                          {query.subject || "No Subject Context Provided"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 lg:p-5">
                      <span className={getStatusBadge(query.status)}>
                        {query.status || "UNKNOWN"}
                      </span>
                    </td>
                    <td className="p-4 lg:p-5">
                      <div className="flex justify-end">
                        <button
                          onClick={() => setSelectedQuery(query)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl border border-blue-200 transition"
                        >
                          <Eye size={14} /> Open Thread
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-16 text-center text-slate-400 font-normal">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Inbox size={32} className="text-slate-300" />
                      <span>No customer queries matching your specific filter criteria were found.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile + Tablet Responsive Stack Deck Cards Grid */}
        <div className="block lg:hidden divide-y divide-slate-100">
          {filteredQueries.length > 0 ? (
            filteredQueries.map((query) => (
              <div key={query.id} className="p-5 space-y-4">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 font-bold text-xs border border-slate-200">
                      {query.customer?.name?.charAt(0).toUpperCase() || <User size={14} />}
                    </div>
                    <h3 className="font-bold text-slate-900 text-base line-clamp-1">
                      {query.customer?.name || "Anonymous Guest"}
                    </h3>
                  </div>
                  <span className={getStatusBadge(query.status)}>
                    {query.status || "UNKNOWN"}
                  </span>
                </div>

                {/* Subject Block Detail */}
                <div className="flex items-start gap-2 text-sm text-slate-600 bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <MessageSquare size={16} className="text-slate-400 mt-0.5 shrink-0" />
                  <p className="font-semibold text-slate-800 line-clamp-2">
                    {query.subject || "No Subject Context Provided"}
                  </p>
                </div>

                {/* Mobile Trigger Button View Row */}
                <div className="pt-1 flex">
                  <button
                    onClick={() => setSelectedQuery(query)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs"
                  >
                    <Eye size={14} /> Review Active Ticket
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-slate-400 text-sm flex flex-col items-center justify-center gap-2">
              <Inbox size={28} className="text-slate-300" />
              <span>No customer queries matching your specific filter criteria were found.</span>
            </div>
          )}
        </div>

      </div>

      {/* Control Overlay Modal System Flow */}
      {selectedQuery && (
        <QueryModal
          query={selectedQuery}
          onClose={() => setSelectedQuery(null)}
        />
      )}

    </div>
  );
}