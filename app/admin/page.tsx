"use client";

import { useEffect, useState } from "react";
import AdminDashboard from "@/components/admin/SuperAdminDashboard";
import SuperAdminDashboard from "@/components/admin/SuperAdminDashboard";

export default function AdminPage() {
  const [role, setRole] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setRole(JSON.parse(user).role);
    }
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto">
      {role === "SUPER_ADMIN" ? (
        <SuperAdminDashboard />
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
}