"use client";

import React from "react";
import { Users, Calendar, Wallet, MessageSquare, ArrowUpRight, TrendingUp, ShieldCheck } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Active Customers",
      value: "124",
      icon: Users,
      trend: "+12% this month",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50/70 text-blue-600 border-blue-100",
    },
    {
      title: "Scheduled Bookings",
      value: "32",
      icon: Calendar,
      trend: "5 pending triage",
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50/70 text-amber-600 border-amber-100",
    },
    {
      title: "Total Investments",
      value: "87",
      icon: Wallet,
      trend: "₹18L fresh inflows",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50/70 text-emerald-600 border-emerald-100",
    },
    {
      title: "Open Queries",
      value: "14",
      icon: MessageSquare,
      trend: "Avg 14m response",
      color: "from-rose-500 to-pink-600",
      bgColor: "bg-rose-50/70 text-rose-600 border-rose-100",
    },
  ];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-12 px-4 sm:px-6">
      
      {/* Main Structural Header Container */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-blue-600 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck size={14} />
            <span>Operational Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            Monitor client acquisition trends, asset metrics, and open communication channels.
          </p>
        </div>
        <div className="text-xs font-bold text-slate-400 bg-slate-50 border border-slate-200/60 rounded-xl px-3.5 py-2 self-start md:self-center flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          System Status: Operational
        </div>
      </div>

      {/* Grid Allocation Matrix for Stats */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 relative overflow-hidden"
            >
              <div className="flex justify-between items-start relative z-10">
                <div className="space-y-1">
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-wider">
                    {item.title}
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {item.value}
                  </h2>
                </div>

                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-110 duration-200 ${item.bgColor}`}>
                  <Icon size={20} strokeWidth={2.2} />
                </div>
              </div>

              {/* Trend Badge Element */}
              <div className="mt-4 pt-3 border-t border-slate-50 flex items-center gap-1.5 text-xs text-slate-500 font-medium relative z-10">
                <TrendingUp size={13} className="text-slate-400" />
                <span>{item.trend}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Double Column Component Split Grid */}
      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Recent Customers Ledger Section Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Recent Customers
              </h2>
              <p className="text-xs text-slate-400 font-medium">Newly authenticated system entities</p>
            </div>
            <button className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50/50 hover:bg-blue-50 border border-blue-100/50 px-3 py-1.5 rounded-xl transition">
              See All
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
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 flex items-center justify-center text-sm font-bold shadow-3xs group-hover/row:bg-blue-50 group-hover/row:text-blue-700 group-hover/row:border-blue-100 transition-colors">
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
                  Profile <ArrowUpRight size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings Queue Frame Container Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Recent Bookings
              </h2>
              <p className="text-xs text-slate-400 font-medium">Upcoming advisor meeting consultations</p>
            </div>
            <button className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50/50 hover:bg-blue-50 border border-blue-100/50 px-3 py-1.5 rounded-xl transition">
              Calendar View
            </button>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            {[
              { topic: "Retirement Planning", date: "12 Jun 2026", type: "Wealth" },
              { topic: "Mutual Fund Review", date: "13 Jun 2026", type: "Equity" },
              { topic: "Insurance Planning", date: "15 Jun 2026", type: "Risk" },
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
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {booking.date}
                  </p>
                </div>
                <span className="inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-50 text-slate-500 border border-slate-200/60 shrink-0">
                  {booking.type}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Global Macro Investments Segment Wrapper */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Investment Performance Overview
          </h2>
          <p className="text-xs text-slate-400 font-medium">Aggregated operational metrics for active capital accounts.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          
          {/* Card Component Item Block: Total AUM */}
          <div className="bg-slate-50/60 border border-slate-100 rounded-xl p-5 hover:bg-slate-50 transition-colors">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Assets Under Management (AUM)
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1.5">
              ₹4.8 Cr
            </h3>
            <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block bg-emerald-50 px-2 py-0.5 rounded-md">
              +4.2% QoQ
            </span>
          </div>

          {/* Card Component Item Block: SIP Clients */}
          <div className="bg-slate-50/60 border border-slate-100 rounded-xl p-5 hover:bg-slate-50 transition-colors">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Active Systematic Investment Plans (SIP)
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1.5">
              68 <span className="text-sm font-semibold text-slate-400">Accounts</span>
            </h3>
            <span className="text-[11px] text-blue-600 font-bold mt-1 inline-block bg-blue-50 px-2 py-0.5 rounded-md">
              94% Retention Rate
            </span>
          </div>

          {/* Card Component Item Block: Insurance Portfolios */}
          <div className="bg-slate-50/60 border border-slate-100 rounded-xl p-5 hover:bg-slate-50 transition-colors">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Underwritten Insurance Clients
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1.5">
              42 <span className="text-sm font-semibold text-slate-400">Policies</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-bold mt-1 inline-block bg-slate-200/60 px-2 py-0.5 rounded-md">
              12 Renewal Windows Due
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}