"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { X, Lock, Mail, Loader2, Eye, EyeOff, AlertCircle } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: Props) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!open) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Quick validation check before dispatching network request
    if (!email.trim() || !password.trim() || isLoading) return;

    try {
      setIsLoading(true);
      setErrorMessage(null);

      const res = await api.post("/auth/login", {
        email: email.trim(),
        password,
      });

      // Commit authorization credentials to local persistence cache layers
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      onClose();

      // Route management resolution according to user security clear levels
      const userRole = res.data.user?.role;
      if (userRole === "ADMIN" || userRole === "SUPER_ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error("Authentication lifecycle fault:", err);
      setErrorMessage(
        err?.response?.data?.message || 
        "Invalid email or password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 relative border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Close Button Anchor */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition disabled:opacity-40"
          type="button"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Header Block Typography */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Sign In</h2>
          <p className="text-xs font-medium text-slate-400 mt-1">
            Access secure dashboard parameters by logging into your account management portal.
          </p>
        </div>

        {/* Semantic Data Submission Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Realtime Feedback Error Alert Box */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-2.5 text-xs font-semibold text-rose-700 animate-in fade-in slide-in-from-top-1">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Email Form Configuration Frame */}
          <div className="space-y-1">
            <label htmlFor="login-email" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Mail size={10} /> Email Address
            </label>
            <input
              id="login-email"
              type="email"
              required
              disabled={isLoading}
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-900/5 transition bg-slate-50/30 focus:bg-white disabled:bg-slate-50"
            />
          </div>

          {/* Password Form Configuration Frame */}
          <div className="space-y-1">
            <label htmlFor="login-password" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Lock size={10} /> Password Credentials
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                required
                disabled={isLoading}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-200 focus:border-slate-900 rounded-xl pl-4 pr-11 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-900/5 transition bg-slate-50/30 focus:bg-white disabled:bg-slate-50"
              />
              <button
                type="button"
                tabIndex={-1}
                disabled={isLoading}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Execution Command Controller Button Element */}
          <button
            type="submit"
            disabled={isLoading || !email.trim() || !password.trim()}
            className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 text-white disabled:text-slate-400 font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <span>LOGIN</span>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}