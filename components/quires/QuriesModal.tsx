"use client";

import React, { useState, useEffect, useRef } from "react";
import api from "@/lib/api";
import { X, Send, Loader2, User, Mail, Phone, Briefcase, Inbox, MessageSquare, AlertCircle } from "lucide-react";

interface Investment {
  id: string | number;
  name: string;
  amount: number;
}

interface Customer {
  name: string;
  email: string;
  phone: string;
  investments?: Investment[];
}

interface Message {
  id: string | number;
  sender: "ADMIN" | "CUSTOMER";
  message: string;
  createdAt?: string;
}

interface QueryData {
  id: string | number;
  subject: string;
  status: string;
  customer: Customer;
  messages: Message[];
}

interface QueryModalProps {
  query: QueryData;
  onClose: () => void;
}

export default function QueryModal({ query, onClose }: QueryModalProps) {
  const [reply, setReply] = useState("");
  const [localQuery, setLocalQuery] = useState<QueryData>(query);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isClosed = localQuery.status === "closed";

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll anchor viewport update routine
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const closeQuery = async () => {
    const confirmed = window.confirm(
      "Close this query permanently?"
    );

    if (!confirmed) return;

    try {
      await api.patch(
        `/admin/queries/${localQuery.id}/close`
      );

      setLocalQuery({
        ...localQuery,
        status: "CLOSED",
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [localQuery.messages]);

  // Sync state explicitly if the ancestor component changes the primary dataset reference
  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  const sendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim() || isSending) return;

    try {
      setIsSending(true);
      setErrorMessage(null);

      // 1. Post text message structure to targeting database endpoint route
      await api.post(`/admin/queries/${localQuery.id}/reply`, {
        message: reply.trim(),
      });

      // 2. Optimized singular target request data fetch instead of indexing arrays
      const response = await api.get(`/admin/queries/${localQuery.id}`);
      
      if (response.data) {
        setLocalQuery(response.data);
      } else {
        // Fallback fallback option if isolated fetch isn't supported by legacy routes
        const absoluteIndexFetch = await api.get("/admin/queries");
        const match = absoluteIndexFetch.data.find((q: QueryData) => q.id === localQuery.id);
        if (match) setLocalQuery(match);
      }

      setReply("");
    } catch (err: any) {
      console.error("Communication payload parsing failure:", err);
      setErrorMessage("Message failed to dispatch. Verify system visibility.");
    } finally {
      setIsSending(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status?.toUpperCase()) {
      case "OPEN":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "RESOLVED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-5xl h-[80vh] min-h-[550px] rounded-2xl flex overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in-98 duration-150">
        
        {/* Left Side: Customer Overview Sidebar */}
        <div className="w-[340px] border-r border-slate-100 bg-slate-50/50 flex flex-col overflow-hidden hidden md:flex">
          <div className="p-5 border-b border-slate-100 bg-white shrink-0">
            <h2 className="font-bold text-base text-slate-900 tracking-tight flex items-center gap-2">
              <User size={16} className="text-slate-400" /> Customer Account Profile
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
            {/* Context Metrics Info Data Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-3xs">
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Legal Full Name</p>
                <p className="text-sm font-bold text-slate-800 tracking-tight">{localQuery.customer.name}</p>
              </div>

              <div className="space-y-0.5 flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                  <Mail size={10} /> Email Destination
                </span>
                <a href={`mailto:${localQuery.customer.email}`} className="text-xs font-semibold text-blue-600 hover:underline truncate">
                  {localQuery.customer.email}
                </a>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                  <Phone size={10} /> Telephone Line
                </span>
                <p className="text-xs font-semibold text-slate-700 font-mono">{localQuery.customer.phone || "No Connection Record"}</p>
              </div>
            </div>

            {/* Financial Assets Positions Allocation Accordion Panel */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 px-1">
                <Briefcase size={12} /> Active Capital Allocation Ledger
              </h3>

              <div className="space-y-2">
                {!localQuery.customer.investments || localQuery.customer.investments.length === 0 ? (
                  <div className="bg-white border border-dashed border-slate-200 rounded-xl p-6 text-center text-xs font-medium text-slate-400 space-y-1">
                    <Inbox size={16} className="mx-auto text-slate-300" />
                    <p>No investment portfolio recorded</p>
                  </div>
                ) : (
                  localQuery.customer.investments.map((investment) => (
                    <div key={investment.id} className="bg-white border border-slate-200 rounded-xl p-3 shadow-3xs flex justify-between items-center group hover:border-slate-300 transition">
                      <p className="text-xs font-bold text-slate-800 tracking-tight truncate max-w-[140px]">{investment.name}</p>
                      <p className="text-xs font-mono font-black text-slate-900 bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg">
                        ₹{investment.amount?.toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Primary Dialogue Messaging Pipeline Window */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          
          {/* Internal Thread Toolbar Row Header Context */}
          <div className="p-4 sm:px-6 sm:py-4 border-b border-slate-100 flex justify-between items-center bg-white shrink-0 shadow-3xs">
            <div className="min-w-0 pr-4">
              <h3 className="font-bold text-base text-slate-900 tracking-tight truncate">
                {localQuery.subject || "No Subject Narrative Provided"}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[9px] font-black uppercase font-mono tracking-wider px-1.5 py-0.5 rounded border ${getStatusStyle(localQuery.status)}`}>
                  {localQuery.status || "UNASSIGNED"}
                </span>
                <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                  Ticket Reference ID Node: <span className="font-mono font-bold">#{localQuery.id}</span>
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-xl transition cursor-pointer"
              type="button"
            >
              <X size={18} />
            </button>
          </div>

          {/* Active Dialog Stream Dynamic Display Layout Panel */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/30 custom-scrollbar">
            {!localQuery.messages || localQuery.messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center max-w-xs mx-auto space-y-2">
                <MessageSquare size={24} className="text-slate-300" />
                <p className="text-sm font-bold text-slate-900">Communication log vacant</p>
                <p className="text-xs text-slate-400">Initialize workflow operations by inputting an update or solution framework summary reply statement below.</p>
              </div>
            ) : (
              localQuery.messages.map((message) => {
                const isAdmin = message.sender === "ADMIN";
                return (
                  <div key={message.id} className={`flex ${isAdmin ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-1 duration-100`}>
                    <div className={`flex flex-col max-w-md ${isAdmin ? "items-end" : "items-start"} space-y-1`}>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-1">
                        {isAdmin ? "Account Supervisor" : localQuery.customer.name}
                      </span>
                      <div className={`px-4 py-2.5 text-sm font-medium leading-relaxed rounded-2xl shadow-3xs ${
                        isAdmin
                          ? "bg-slate-900 text-white rounded-tr-none"
                          : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"
                      }`}>
                        {message.message}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={chatEndRef} />
          </div>

          {/* User Interface Interaction Execution Input Controls Strip Area Container Row */}
          {localQuery.status !== "closed" ? (
            <div className="p-4 border-t border-slate-100 bg-white shrink-0 space-y-3">
              {errorMessage && (
                <div className="p-2.5 bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold rounded-xl flex items-center gap-2">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={sendReply} className="flex gap-2.5 items-center">
                <input
                  value={reply}
                  disabled={isSending}
                  onChange={(e) => setFormTextValue(e.target.value)}
                  placeholder={`Formulate transmission update context node details...`}
                  className="flex-1 border border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-900/5 transition bg-slate-50/30 focus:bg-white disabled:bg-slate-50"
                />

                <button
                  type="submit"
                  disabled={!reply.trim() || isSending}
                  className="inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 text-white disabled:text-slate-400 font-bold text-xs uppercase tracking-wider px-5 h-11 rounded-xl transition shadow-xs cursor-pointer disabled:cursor-not-allowed shrink-0"
                >
                  {isSending ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <>
                      <span className="hidden sm:inline">Send</span>
                      <Send size={12} strokeWidth={2.5} />
                    </>
                  )}
                </button>

                {!isClosed && (
                  <button
                    onClick={closeQuery}
                    className="px-3 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700"
                  >
                    Close Query
                  </button>
                )}
              </form>
            </div>
          ) : (
          <div className="p-5 border-t border-slate-100 bg-slate-50 text-center">
            <p className="text-sm font-bold text-red-600">
              This query has been closed.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              No further messages can be exchanged.
            </p>
          </div>
        )}

        </div>

      </div>
    </div>
  );

  // Isolated inline state mutation target function block wrapper
  function setFormTextValue(str: string) {
    setReply(str);
  }
}