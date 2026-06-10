"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminGuard from "@/components/AdminGuard";
import { Menu } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminGuard>
      {/* h-screen + overflow-hidden prevents the outer viewport wrapper from scrolling */}
      <div className="flex h-screen w-screen bg-slate-100 overflow-hidden">
        
        {/* Fixed Height Sidebar Element */}
        <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Backdrop overlay for mobile devices */}
        {sidebarOpen && (
          <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-xs"
          />
        )}

        {/* Layout Column Wrapper */}
        <div className="flex-1 flex flex-col min-w-0 h-full">
          
          {/* Top Mobile Control Bar */}
          <header className="h-16 shrink-0 lg:hidden bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 z-20 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                FW
              </div>
              <span className="font-extrabold text-sm text-white tracking-tight">FleetWise</span>
            </div>
            
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>
          </header>

          {/* Main Content Workspace: Independent scroll container */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-100 custom-scrollbar">
            {children}
          </main>
        </div>

      </div>
    </AdminGuard>
  );
}