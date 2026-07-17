"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { hasPermission } from "@/lib/auth";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  MessageSquareQuoteIcon, 
  TrendingUp, 
  ShieldCheck,
  Building2,
  LogOut,
  X
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function AdminSidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  if (!mounted) return null;

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard, permission: null },
    { name: "Customers", href: "/admin/customers", icon: Users, permission: "CUSTOMER_VIEW" },
    { name: "Demo Requests", href: "/admin/bookings", icon: CalendarCheck, permission: "BOOKING_VIEW" },
    { name: "Queries", href: "/admin/queries", icon: MessageSquareQuoteIcon, permission: "QUERY_VIEW" },
    { name: "Investments", href: "/admin/investments", icon: TrendingUp, permission: "INVESTMENT_VIEW" },
    { name: "Admins", href: "/admin/admins", icon: ShieldCheck, permission: "ADMIN_VIEW" },
    { name: "Company Stats", href: "/admin/company-stats", icon: Building2, permission: "SETTINGS_EDIT" },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-40 w-72 h-full bg-slate-900 border-r border-slate-800 flex flex-col 
      transition-transform duration-300 ease-in-out transform shrink-0
      lg:static lg:translate-x-0
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}>
      
      {/* Brand Header Section */}
      <div className="h-20 shrink-0 px-6 flex items-center justify-between border-b border-slate-800 bg-slate-950/40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
            <Building2 size={18} />
          </div>
          <h2 className="font-extrabold text-lg text-white tracking-tight">
             Olive Investment <span className="text-blue-500 font-medium text-xs ml-1 px-1.5 py-0.5 rounded bg-blue-500/10">Admin</span>
          </h2>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation Options - Scrollable inside if links overflow */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        {navItems.map((item, index) => {
          if (item.permission && !hasPermission(item.permission)) return null;

          const isActive = pathname === item.href;

          return (
            <Link
              key={index}
              href={item.href}
              className={`group flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-600/10"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
              }`}
            >
              <item.icon 
                size={18} 
                className={`transition-colors shrink-0 ${
                  isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                }`} 
              />
              <span className="truncate">{item.name}</span>
              
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Option Layout Panels */}
      <div className="p-4 shrink-0">
        <button
          onClick={logout}
          className="w-full group flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold text-sm text-slate-400 hover:text-slate-100 hover:bg-red-900/20 transition-all"
        >
          <LogOut
            size={18}
            className="text-slate-500 group-hover:text-red-400 shrink-0"
          />
          <span>Logout</span>
        </button>
      </div>

      {/* Operator Footer Panel */}
      <div className="p-4 shrink-0 border-t border-slate-800 bg-slate-950/20">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-800/40 border border-slate-800/50">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-black text-xs flex items-center justify-center shrink-0">
            FW
          </div>
          <div className="truncate">
            <p className="text-xs font-bold text-slate-200 truncate">System Operator</p>
            <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block animate-ping" />
              Secure Session
            </p>
          </div>
        </div>
      </div>

    </aside>
  );
}