"use client";

import CustomerGuard from "@/components/CustomerGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CustomerGuard>
      <div className="min-h-screen bg-slate-100">
        {children}
      </div>
    </CustomerGuard>
  );
}