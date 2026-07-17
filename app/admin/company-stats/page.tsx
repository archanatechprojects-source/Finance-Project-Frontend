"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  Building2,
  Loader2,
  Save,
  TrendingUp,
  Users,
  Briefcase,
  Calendar,
} from "lucide-react";

export default function CompanyStatsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    yearsInIndustry: 0,
    customersServed: 0,
    assetsManaged: 0,
    portfolios: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await api.get("/admin/company-stats");

      setForm({
        yearsInIndustry: res.data?.yearsInIndustry || 0,
        customersServed: res.data?.customersServed || 0,
        assetsManaged: res.data?.assetsManaged || 0,
        portfolios: res.data?.portfolios || 0,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveStats = async () => {
    try {
      setSaving(true);

      await api.patch("/admin/company-stats", form);

      alert("Company statistics updated successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to update company statistics.");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (
    key: keyof typeof form,
    value: number
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const formatIndianCount = (value: number) => {
    if (value >= 10000000) {
        return `${(value / 10000000).toFixed(1).replace(".0", "")}Cr+`;
    }

    if (value >= 100000) {
        return `${(value / 100000).toFixed(1).replace(".0", "")}L+`;
    }

    if (value >= 1000) {
        return `${(value / 1000).toFixed(1).replace(".0", "")}K+`;
    }

    return `${value}+`;
    };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2
          size={30}
          className="animate-spin text-blue-600"
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">

      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Building2 size={22} />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Company Statistics
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Manage website counters displayed on the public homepage.
            </p>
          </div>
        </div>
      </div>

      {/* Preview Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-xs font-bold uppercase text-slate-400">
                Years In Industry
              </p>

              <h3 className="text-3xl font-black text-slate-900 mt-2">
                {form.yearsInIndustry}+
              </h3>
            </div>

            <Calendar className="text-blue-600" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-xs font-bold uppercase text-slate-400">
                Customers Served
              </p>

              <h3 className="text-3xl font-black text-slate-900 mt-2">
                {formatIndianCount(form.customersServed)}
              </h3>
            </div>

            <Users className="text-green-600" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-xs font-bold uppercase text-slate-400">
                Assets Managed
              </p>

              <h3 className="text-3xl font-black text-slate-900 mt-2">
                ₹{formatIndianCount(form.assetsManaged)} 
              </h3>
            </div>

            <TrendingUp className="text-amber-600" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-xs font-bold uppercase text-slate-400">
                Portfolios
              </p>

              <h3 className="text-3xl font-black text-slate-900 mt-2">
                {form.portfolios}+
              </h3>
            </div>

            <Briefcase className="text-purple-600" />
          </div>
        </div>

      </div>

      {/* Form */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">

        <h2 className="text-lg font-bold text-slate-900 mb-6">
          Edit Statistics
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Years In Industry
            </label>

            <input
              type="number"
              value={form.yearsInIndustry}
              onChange={(e) =>
                updateField(
                  "yearsInIndustry",
                  Number(e.target.value)
                )
              }
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Customers Served
            </label>

            <input
              type="number"
              value={form.customersServed}
              onChange={(e) =>
                updateField(
                  "customersServed",
                  Number(e.target.value)
                )
              }
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Assets Managed (Cr)
            </label>

            <input
              type="number"
              value={form.assetsManaged}
              onChange={(e) =>
                updateField(
                  "assetsManaged",
                  Number(e.target.value)
                )
              }
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Portfolios
            </label>

            <input
              type="number"
              value={form.portfolios}
              onChange={(e) =>
                updateField(
                  "portfolios",
                  Number(e.target.value)
                )
              }
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-semibold"
            />
          </div>

        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={saveStats}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            {saving ? (
              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Statistics
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}