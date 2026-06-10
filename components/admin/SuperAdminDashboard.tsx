"use client";

import React from "react";
import { Users, Calendar, Wallet, MessageSquare, ArrowUpRight, TrendingUp, Crown, Activity } from "lucide-react";

export default function SuperAdminDashboard() {
  const stats = [
    {
      title: "Global Customers",
      value: "124",
      icon: Users,
      trend: "+14% from Q1",
      isPositive: true,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "Platform Bookings",
      value: "32",
      icon: Calendar,
      trend: "4 pending sync",
      isPositive: true,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      title: "Managed Funds",
      value: "87",
      icon: Wallet,
      trend: "₹18L net new delta",
      isPositive: true,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Unresolved Queries",
      value: "14",
      icon: MessageSquare,
      trend: "-8% SLA backlog",
      isPositive: true,
      color: "text-rose-600 bg-rose-50 border-rose-100",
    },
  ];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-12 px-4 sm:px-6">
      
      {/* Super Admin Top Context Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-amber-600 bg-amber-50 border border-amber-200/60 w-fit px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider">
            <Crown size={12} strokeWidth={2.5} />
            <span>Super Admin Core</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1.5">
            System Control Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            High-level analytical matrix monitoring client activity, portfolio structures, and systemic tasks.
          </p>
        </div>

        {/* Global Node Telemetry Status */}
        <div className="text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 self-start md:self-center flex items-center gap-2.5 shadow-3xs">
          <Activity size={14} className="text-emerald-500 animate-pulse" />
          <span className="font-mono text-slate-400">Cluster:</span>
          <span>Node-IND-West-01</span>
        </div>
      </div>

      {/* Analytics Summary Scorecards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-3xs hover:shadow-md hover:border-slate-300 transition-all duration-200"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-wider">
                    {item.title}
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {item.value}
                  </h2>
                </div>

                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105 ${item.color}`}>
                  <Icon size={20} strokeWidth={2.2} />
                </div>
              </div>

              {/* Trend Vector Row */}
              <div className="mt-4 pt-3 border-t border-slate-50 flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                <TrendingUp size={13} className="text-slate-400" />
                <span>{item.trend}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Structural Micro-Ledger Columns split section */}
      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Recent Customers Control Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-3xs flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Recent Customer Onboarding
              </h2>
              <p className="text-xs text-slate-400 font-medium">Verify structural operational access profiles</p>
            </div>
            <button className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50/50 hover:bg-blue-50 border border-blue-100/50 px-3 py-1.5 rounded-xl transition">
              Manage Users
            </button>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            {[
              { name: "Rahul Sharma", email: "rahul@gmail.com", initial: "R" },
              { name: "Priya Kumar", email: "priya@gmail.com", initial: "P" },
              { name: "Arjun Reddy", email: "arjun@gmail.com", initial: "A" },
            ].map((customer) => (
              <div
                key={customer.email}
                className="flex justify-between items-center py-3.5 first:pt-0 last:pb-0 group/row"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 flex items-center justify-center text-sm font-bold group-hover/row:bg-blue-50 group-hover/row:text-blue-700 group-hover/row:border-blue-100 transition-colors">
                    {customer.initial}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-slate-800 tracking-tight truncate">
                      {customer.name}
                    </p>
                    <p className="text-xs text-slate-400 font-medium truncate">
                      {customer.email}
                    </p>
                  </div>
                </div>

                <button className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-blue-600 border border-transparent hover:border-slate-100 bg-transparent hover:bg-slate-50 px-2.5 py-1.5 rounded-xl transition">
                  Audit <ArrowUpRight size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings Monitoring Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-3xs flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                System Booking Queue
              </h2>
              <p className="text-xs text-slate-400 font-medium">Real-time scheduling allocation telemetry</p>
            </div>
            <button className="text-xs font-bold text-slate-600 hover:text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl transition">
              View Log
            </button>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            {[
              { topic: "Retirement Planning", date: "12 Jun 2026", segment: "Wealth" },
              { topic: "Mutual Fund Review", date: "13 Jun 2026", segment: "Equity" },
              { topic: "Insurance Planning", date: "15 Jun 2026", segment: "Risk Mgmt" },
            ].map((booking) => (
              <div
                key={booking.topic}
                className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
              >
                <div className="space-y-1 min-w-0 pr-4">
                  <p className="font-bold text-sm text-slate-800 tracking-tight truncate">
                    {booking.topic}
                  </p>
                  <p className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    {booking.date}
                  </p>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-slate-50 text-slate-500 border border-slate-200/60 shrink-0 font-mono">
                  {booking.segment}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Global Investments System Ledger Overview */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-3xs">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Macro Assets & Portfolio Metrics
          </h2>
          <p className="text-xs text-slate-400 font-medium">Platform-wide transactional aggregates and portfolio allocations.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          
          {/* Card Component Item Block: Total AUM */}
          <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-5 hover:bg-slate-50 transition-colors">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Assets Under Management (AUM)
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1.5">
              ₹4.8 Cr
            </h3>
            <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block bg-emerald-50 px-2 py-0.5 rounded-md">
              +4.2% QoQ Variance
            </span>
          </div>

          {/* Card Component Item Block: SIP Clients */}
          <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-5 hover:bg-slate-50 transition-colors">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Active Systematic Pipelines (SIP)
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1.5">
              68 <span className="text-sm font-semibold text-slate-400">Nodes</span>
            </h3>
            <span className="text-[11px] text-blue-600 font-bold mt-1 inline-block bg-blue-50 px-2 py-0.5 rounded-md">
              94% Target Health
            </span>
          </div>

          {/* Card Component Item Block: Insurance Portfolios */}
          <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-5 hover:bg-slate-50 transition-colors">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Underwritten Indemnity Contracts
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1.5">
              42 <span className="text-sm font-semibold text-slate-400">Policies</span>
            </h3>
            <span className="text-[11px] text-amber-600 font-bold mt-1 inline-block bg-amber-50 px-2 py-0.5 rounded-md">
              12 Renewal Pools Pending
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}