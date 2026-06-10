"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { X, Shield, Lock, Mail, User, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

interface AddAdminModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddAdminModal({ open, onClose, onSuccess }: AddAdminModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [availablePermissions, setAvailablePermissions] = useState<any[]>([]);
  
  // Operational UI State flows
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    
    api
      .get("/admin/permissions")
      .then((res) => {
        // Normalizes incoming payload array arrays or structural data objects safely
        setAvailablePermissions(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Failed to read system permission keys:", err);
        setErrorMessage("Could not download operational protection scopes.");
      });
  }, [open]);

  const togglePermission = (permissionCode: string) => {
    setPermissions((prev) =>
      prev.includes(permissionCode)
        ? prev.filter((p) => p !== permissionCode)
        : [...prev, permissionCode]
    );
  };

  const createAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMessage("Please complete all mandatory credentials before submission.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      await api.post("/auth/admin", {
        name,
        email,
        password,
        permissions,
      });

      // Clear states completely upon downstream validation resolve
      setName("");
      setEmail("");
      setPassword("");
      setPermissions([]);
      setShowPassword(false);
      
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.response?.data?.message || "An unexpected error occurred while saving the profile."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] my-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header Block Frame */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10 rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Shield size={18} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Create Admin Operator
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition"
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        {/* Dynamic Context Form Body */}
        <form onSubmit={createAdmin} className="overflow-y-auto p-5 sm:p-6 flex-1 space-y-5">
          
          {/* Dynamic Error Messaging Container */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-800 text-xs font-semibold rounded-xl flex items-start gap-2.5">
              <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form Credentials Section Grid */}
          <div className="space-b-4">
            
            {/* Input Name Row */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  required
                  placeholder="e.g., Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Input Email Row */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Login Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  required
                  placeholder="s.jenkins@platform.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Input Passphrase Row */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Access Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={16} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

          </div>

          {/* Interactive Custom Permission Badges Segment */}
          <div className="space-y-2.5 pt-2">
            <div className="flex flex-col">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Permissions</label>
              <span className="text-[11px] text-slate-400 font-medium">Give permissions to which files can be used by this admin </span>
            </div>

            {availablePermissions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[180px] overflow-y-auto p-0.5 custom-scrollbar">
                {availablePermissions.map((permission) => {
                  // Standardizes payload items whether arrays are plain strings or mapped code objects
                  const code = typeof permission === "string" ? permission : permission.code;
                  const isChecked = permissions.includes(code);

                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => togglePermission(code)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-xs font-bold tracking-wide transition cursor-pointer select-none ${
                        isChecked
                          ? "bg-blue-50/80 border-blue-300 text-blue-800 shadow-2xs"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        readOnly
                        className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 pointer-events-none"
                      />
                      <span className="font-mono truncate">{code}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center p-6 border border-dashed border-slate-200 rounded-xl text-slate-400 text-xs font-normal">
                No security groups loaded.
              </div>
            )}
          </div>

          {/* Modal Actions Footer Control Bar */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 border border-slate-200 text-slate-700 font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-blue-600 text-white font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-blue-700 transition shadow-sm inline-flex items-center justify-center gap-1.5 disabled:bg-blue-400 min-w-[130px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Create Operator</span>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}