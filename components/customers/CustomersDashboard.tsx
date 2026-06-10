"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { 
  TrendingUp, 
  Wallet, 
  PieChart, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  ShieldAlert, 
  MessageSquare, 
  ArrowUpRight,
  Loader2,
  Briefcase
} from "lucide-react";

import ScheduleConsultationModal from "./ScheduleConsultationModal";
import InvestmentsModal from "./InvestmentsModal";
import RaiseQueryModal from "./RaiseQueryModal";
import CustomerQueriesModal from "./CustomerQueriesModal";

interface Investment {
  id: string | number;
  name: string;
  amount: number;
}

interface CustomerProfile {
  id: string | number;
  name: string;
  email: string;
  phone?: string;
  growth?: {
    invested?: number;
    growth?: number;
    currentValue?: number;
  };
  investments?: Investment[];
}

export default function CustomerDashboard() {
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<CustomerProfile | null>(null);

  // Modal Control States
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showInvestmentsModal, setShowInvestmentsModal] = useState(false);
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [showQueries, setShowQueries] = useState(false);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get("/customers/profile");
      setCustomer(res.data);
    } catch (err) {
      console.error("Failed to fetch customer security matrix profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const invested = customer?.growth?.invested || 0;
  const growth = customer?.growth?.growth || 0;
  const portfolioValue = customer?.growth?.currentValue || (invested + growth);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Loading Dashboard Asset Engine...</span>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-6">
        <div className="bg-white border border-rose-100 p-8 rounded-2xl max-w-sm w-full text-center space-y-3.5 shadow-3xs">
          <div className="w-11 h-11 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl flex items-center justify-center mx-auto">
            <ShieldAlert size={20} />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900">Authentication Context Error</h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">We were unable to load your secure portfolio layout profile context at this juncture.</p>
          </div>
          <button 
            onClick={loadProfile}
            className="w-full text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-xl transition"
          >
            Retry Authorization Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50/60 p-4 sm:p-8 max-w-[1440px] mx-auto space-y-8">

        {/* Global Dashboard Dynamic Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Welcome back, {customer.name.split(" ")[0]} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Monitor your system performance aggregates, active investments, and structural delta metrics.
            </p>
          </div>
          <div className="text-[11px] font-mono font-bold text-slate-400 bg-white border border-slate-200/60 shadow-3xs rounded-xl px-3 py-2 self-start sm:self-center">
            System Node: <span className="text-slate-700">Client-Live-Session</span>
          </div>
        </div>

        {/* Financial Portfolio Asset Summary Scorecards */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
          <StatCard
            title="Invested Principal"
            value={`₹${invested.toLocaleString("en-IN")}`}
            icon={Wallet}
            color="text-blue-600 bg-blue-50 border-blue-100"
          />
          <StatCard
            title="Net Accrued Growth"
            value={`₹${growth.toLocaleString("en-IN")}`}
            icon={TrendingUp}
            color={growth >= 0 ? "text-emerald-600 bg-emerald-50 border-emerald-100" : "text-rose-600 bg-rose-50 border-rose-100"}
          />
          <StatCard
            title="Total Valuation Yield"
            value={`₹${portfolioValue.toLocaleString("en-IN")}`}
            icon={PieChart}
            color="text-indigo-600 bg-indigo-50 border-indigo-100"
          />
        </div>

        {/* Micro Information Matrix Columns */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">

          {/* Secure Client Profile Ledger Block */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-3xs p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                  <User size={15} />
                </div>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                  Profile Target Details
                </h2>
              </div>

              <div className="space-y-1">
                <InfoRow label="Legal Profile Name" value={customer.name} icon={User} />
                <InfoRow label="System Delivery Email" value={customer.email} icon={Mail} />
                <InfoRow label="Verified Phone Element" value={customer.phone || "No Record Appended"} icon={Phone} />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50 mt-6 flex justify-end">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-200/40">
                KYC Status verified
              </span>
            </div>
          </div>

          {/* Real-time Open Assets Allocation Module */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-3xs p-5 sm:p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                  <Briefcase size={15} />
                </div>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                  Asset Class Allocation
                </h2>
              </div>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 bg-slate-100 text-slate-500 rounded border border-slate-200/40">
                {(customer.investments || []).length} Active Allocation channels
              </span>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[190px] pr-1 space-y-3 custom-scrollbar">
              {(!customer.investments || customer.investments.length === 0) ? (
                <div className="h-full flex items-center justify-center border border-dashed border-slate-200 rounded-xl p-8 text-center text-xs font-medium text-slate-400">
                  No explicit portfolio deployment configurations mapped.
                </div>
              ) : (
                customer.investments.map((investment) => (
                  <div
                    key={investment.id}
                    className="group bg-slate-50/50 border border-slate-200/60 hover:border-slate-300 rounded-xl p-3.5 flex items-center justify-between transition-all"
                  >
                    <div className="space-y-0.5 min-w-0 pr-4">
                      <p className="font-bold text-sm text-slate-800 tracking-tight truncate">
                        {investment.name}
                      </p>
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                        Asset Allocation Unit
                      </p>
                    </div>
                    <p className="font-mono font-bold text-sm text-slate-900 text-right shrink-0">
                      ₹{investment.amount?.toLocaleString("en-IN")}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Global Dashboard Control Center Action Deck */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-3xs p-5 sm:p-6">
          {/* <div className="mb-5">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              Operational Task Infrastructure
            </h2>
            <p className="text-xs text-slate-400 font-medium">Deploy portal queries, calendar triggers, or check configuration structures.</p>
          </div> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            <button
              onClick={() => setShowConsultationModal(true)}
              className="group flex items-center justify-between px-4 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-xs transition cursor-pointer"
            >
              <span className="flex items-center gap-2"><Calendar size={14} /> Schedule Advisory</span>
              <ArrowUpRight size={14} className="opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => setShowInvestmentsModal(true)}
              className="group flex items-center justify-between px-4 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-xs transition cursor-pointer"
            >
              <span className="flex items-center gap-2"><PieChart size={14} /> Audit Your Money Allocation</span>
              <ArrowUpRight size={14} className="opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => setShowQueryModal(true)}
              className="group flex items-center justify-between px-4 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-xs transition cursor-pointer"
            >
              <span className="flex items-center gap-2"><MessageSquare size={14} /> Raise A Query</span>
              <ArrowUpRight size={14} className="opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => setShowQueries(true)}
              className="group flex items-center justify-between px-4 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider shadow-xs transition cursor-pointer"
            >
              <span className="flex items-center gap-2"><MessageSquare size={14} /> View Queries History</span>
              <ArrowUpRight size={14} className="opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

          </div>
        </div>

      </div>

      {/* Execution Control Focus Modal Portals Layer Stack */}
      <ScheduleConsultationModal
        open={showConsultationModal}
        customer={customer}
        onClose={() => setShowConsultationModal(false)}
        onSuccess={loadProfile}
      />

      <InvestmentsModal
        open={showInvestmentsModal}
        investments={customer?.investments || []}
        onClose={() => setShowInvestmentsModal(false)}
      />

      <RaiseQueryModal
        open={showQueryModal}
        onClose={() => setShowQueryModal(false)}
      />

      <CustomerQueriesModal
        open={showQueries}
        onClose={() => setShowQueries(false)}
      />
    </>
  );
}

// Unified Context Scorecard Functional Component
function StatCard({ title, value, icon: Icon, color }: { title: string; value: string; icon: any; color: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-3xs p-5 sm:p-6 flex justify-between items-start group hover:shadow-sm transition">
      <div className="space-y-1.5">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {title}
        </p>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-mono tracking-tight">
          {value}
        </h2>
      </div>
      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${color}`}>
        <Icon size={16} strokeWidth={2.2} />
      </div>
    </div>
  );
}

// Unified Ledger Row Line Item Functional Component 
function InfoRow({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3.5 border-b border-slate-100 last:border-b-0 gap-1 sm:gap-4">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
        <Icon size={14} className="text-slate-300" />
        {label}
      </span>
      <span className="text-sm font-semibold text-slate-800 tracking-tight truncate max-w-xs">
        {value}
      </span>
    </div>
  );
}