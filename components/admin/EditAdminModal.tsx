"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { X, ShieldAlert, Lock, Mail, User, Eye, EyeOff, Loader2, CheckSquare, Square } from "lucide-react";

interface EditAdminModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  admin: {
    id: string | number;
    name?: string;
    email?: string;
    permissions?: Array<{ code: string } | string | any>;
  } | null;
}

export default function EditAdminModal({ open, onClose, onSuccess, admin }: EditAdminModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [permissions, setPermissions] = useState<string[]>([]);
  const [availablePermissions, setAvailablePermissions] = useState<any[]>([]);
  
  // Local operation indicators
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync state data on target admin profile updates
  useEffect(() => {
    if (admin) {
      setName(admin.name || "");
      setEmail(admin.email || "");
      setPassword(""); // Clear explicit modification targets safely
      setErrorMessage(null);
      
      // Defensively parse nested permission arrays regardless of formatting patterns
      const initialPermissions = admin.permissions?.map((p: any) => 
        typeof p === "string" ? p : p?.code || ""
      ).filter(Boolean) || [];
      
      setPermissions(initialPermissions);
    }
  }, [admin, open]);

  // Load available security clearance definitions
  useEffect(() => {
    if (!open) return;

    api.get("/admin/permissions")
      .then((res) => {
        setAvailablePermissions(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Failed to load permission descriptors:", err);
        setErrorMessage("Unable to fetch platform configuration settings.");
      });
  }, [open]);

  const togglePermission = (permissionCode: string) => {
    setPermissions((prev) =>
      prev.includes(permissionCode)
        ? prev.filter((p) => p !== permissionCode)
        : [...prev, permissionCode]
    );
  };

  const updateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setErrorMessage("Full Name and Core Email properties cannot be left empty.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      await api.patch(`/admin/admins/${admin?.id}`, {
        name,
        email,
        password: password.trim() ? password : undefined, // Omit field changes if empty
        permissions,
      });

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.response?.data?.message || "An exception occurred while processing modifications."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open || !admin) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] my-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Window Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10 rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <User size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Edit Admin Profile</h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">ID Ref Token: #{admin.id}</p>
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

        {/* Form Container Wrapper */}
        <form onSubmit={updateAdmin} className="overflow-y-auto p-5 sm:p-6 flex-1 space-y-5">
          
          {/* Diagnostic Error Banner Frame */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-800 text-xs font-semibold rounded-xl flex items-start gap-2.5">
              <ShieldAlert size={16} className="text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Core Configuration Data Inputs */}
          <div className="space-b-4">
            
            {/* Input Element: Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  placeholder="e.g., Jane Doe"
                />
              </div>
            </div>

            {/* Input Element: Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            {/* Input Element: Password Override Modification */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                {/* <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded-sm">Optional</span> */}
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={16} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  placeholder="Leave blank to maintain existing credential records"
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

          {/* Platform Capability Checklist Framework */}
          <div className="space-y-2.5 pt-2">
            <div className="flex flex-col">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Access Given </label>
              <span className="text-[11px] text-slate-400 font-medium">Remove or add permission to access the page</span>
            </div>

            {availablePermissions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[160px] overflow-y-auto p-0.5 custom-scrollbar">
                {availablePermissions.map((permission) => {
                  const code = typeof permission === "string" ? permission : permission?.code;
                  const isChecked = permissions.includes(code);

                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => togglePermission(code)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-xs font-bold tracking-wide transition select-none cursor-pointer ${
                        isChecked
                          ? "bg-blue-50/80 border-blue-300 text-blue-800 shadow-2xs"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div className={isChecked ? "text-blue-600" : "text-slate-300"}>
                        {isChecked ? <CheckSquare size={16} strokeWidth={2.5} /> : <Square size={16} />}
                      </div>
                      <span className="font-mono truncate">{code}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center p-6 border border-dashed border-slate-200 rounded-xl text-slate-400 text-xs font-normal">
                No custom platform capabilities available.
              </div>
            )}
          </div>

          {/* Command Row Footer Controls */}
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
              className="px-5 py-2.5 bg-blue-600 text-white font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-blue-700 transition shadow-sm inline-flex items-center justify-center gap-1.5 disabled:bg-blue-400 min-w-[140px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}