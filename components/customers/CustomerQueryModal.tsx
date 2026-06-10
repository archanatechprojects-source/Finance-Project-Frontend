"use client";

import { useState, useEffect, useRef } from "react";
import api from "@/lib/api";
import { X, Send, Loader2, User, MessageCircle } from "lucide-react";

interface Message {
  id: string | number;
  sender: "CUSTOMER" | "ADMIN" | string;
  message: string;
  timestamp?: string;
}

interface Query {
  id: string | number;
  subject: string;
  status: string;
  messages?: Message[];
}

interface CustomerQueryModalProps {
  query: Query;
  onClose: () => void;
  onRefresh?: () => void;
}

export default function CustomerQueryModal({ query, onClose, onRefresh }: CustomerQueryModalProps) {
  const [message, setMessage] = useState("");
  const [localQuery, setLocalQuery] = useState<Query>(query);
  const [isSending, setIsSending] = useState(false);
  const isClosed = localQuery.status === "closed";
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat window viewport to terminal bottom position on update metrics
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [localQuery.messages]);

  const sendReply = async () => {
    if (!message.trim() || isSending) return;

    try {
      setIsSending(true);
      
      // Submit response node payload back to database endpoint
      await api.post(`/customers/queries/${query.id}/reply`, {
        message: message.trim(),
      });

      // Target explicit query item ID directory for fast item processing
      const response = await api.get(`/customers/queries/${query.id}`);
      
      if (response.data) {
        setLocalQuery(response.data);
      } else {
        // Fallback array lookup parsing pattern match 
        const updatedQueryList = await api.get(`/customers/queries`);
        const currentQuery = updatedQueryList.data.find((q: any) => q.id === query.id);
        if (currentQuery) setLocalQuery(currentQuery);
      }

      setMessage("");
      if (onRefresh) onRefresh(); // Force trigger layout syncing updates down matching nodes
    } catch (err) {
      console.error("Failed to append communication reply context entry:", err);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendReply();
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "NEW":
      case "OPEN":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-100";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-3xl h-[650px] rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Window Navigation Header Context Layout */}
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-500 border flex items-center justify-center shrink-0">
              <MessageCircle size={20} />
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-base sm:text-lg text-slate-900 tracking-tight truncate max-w-lg sm:max-w-xl">
                {localQuery.subject || "Support Query Dialogue"}
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-slate-400 font-medium font-mono">ID Token: #{query.id}</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide border uppercase ${getStatusBadgeColor(localQuery.status)}`}>
                  {localQuery.status || "OPEN"}
                </span>
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition shrink-0"
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Conversation Stream Pane */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-slate-50/50 space-y-4 custom-scrollbar">
          {localQuery.messages && localQuery.messages.length > 0 ? (
            localQuery.messages.map((msg: any) => {
              const isCustomer = msg.sender === "CUSTOMER";
              return (
                <div
                  key={msg.id}
                  className={`flex ${isCustomer ? "justify-end" : "justify-start"} items-end gap-2`}
                >
                  {!isCustomer && (
                    <div className="w-6 h-6 rounded-md bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold shrink-0 mb-1">
                      AD
                    </div>
                  )}
                  
                  <div className={`flex flex-col max-w-[75%] sm:max-w-md space-y-1`}>
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm font-medium leading-relaxed shadow-3xs ${
                        isCustomer
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-white border border-slate-200 text-slate-900 rounded-bl-none"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>

                  {isCustomer && (
                    <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0 mb-1">
                      CU
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
              <p className="text-slate-400 text-sm font-medium">No conversation entries posted yet on this ticket sequence.</p>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Interactive Text Injection Input Component Tray */}
        {!isClosed ? (
            <div className="border-t border-slate-100 p-4 bg-white flex items-center gap-3 shrink-0">
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isSending}
                placeholder="Type your response narrative here..."
                className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-slate-50/50 focus:bg-white disabled:opacity-60"
            />

            <button
                onClick={sendReply}
                disabled={!message.trim() || isSending}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 text-white disabled:text-slate-400 h-[46px] px-5 rounded-xl font-bold text-xs uppercase tracking-wider transition inline-flex items-center justify-center gap-2 shrink-0 shadow-sm cursor-pointer disabled:cursor-not-allowed"
                type="button"
            >
                {isSending ? (
                <Loader2 size={15} className="animate-spin" />
                ) : (
                <>
                    <span>Send</span>
                    <Send size={13} strokeWidth={2.5} />
                </>
                )}
            </button>
            </div>
        ) : (
        <div className="border-t border-slate-100 p-5 bg-slate-50 text-center">
            <p className="text-sm font-bold text-red-600">
            Query Closed
            </p>
            <p className="text-xs text-slate-500 mt-1">
            This conversation has been locked by support.
            </p>
        </div>
        )}

      </div>
    </div>
  );
}