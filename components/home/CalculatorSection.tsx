"use client";

import { motion } from "framer-motion";
import { Calculator, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";

export default function CalculatorSection() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [years, setYears] = useState(15);
  const [returnRate, setReturnRate] = useState(12);

  const result = useMemo(() => {
    const r = returnRate / 100 / 12;
    const n = years * 12;

    const futureValue =
      monthlyInvestment *
      (((Math.pow(1 + r, n) - 1) / r) * (1 + r));

    const invested = monthlyInvestment * n;

    return {
      invested,
      wealth: futureValue,
      gain: futureValue - invested,
    };
  }, [monthlyInvestment, years, returnRate]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IN").format(value);

  return (
    <section
      id="calculator"
      className="relative py-12 md:py-20 lg:py-24 bg-white overflow-hidden"
    >
      {/* Background Glow - Scaled down on mobile to prevent overflow/stretching */}
      <div className="absolute top-0 left-0 w-[300px] sm:w-[500px] md:w-[700px] h-[300px] sm:h-[500px] md:h-[700px] bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-blue-100 bg-blue-50 text-blue-700 font-medium text-xs sm:text-sm">
            SIP Calculator
          </span>

          {/* Fluid typography using responsive text sizes */}
          <h2 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
            See How Small Investments
            <span className="block text-slate-500 mt-1">
              Grow Into Significant Wealth
            </span>
          </h2>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-2 sm:px-0">
            Estimate the future value of your SIP investments and
            understand the power of compounding.
          </p>
        </div>

        {/* Form and Results Grid */}
        {/* Mobile: 1 col | Tablet/Small Laptop: 1 col (max-w optimized) | Large Laptop & Monitor: 2 cols */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mt-10 sm:mt-16 max-w-xl lg:max-w-none mx-auto">

          {/* Left Card: Inputs */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white border border-slate-200 rounded-2xl sm:rounded-[32px] p-5 sm:p-8 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <Calculator className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Investment Inputs
              </h3>
            </div>

            {/* Monthly Investment Input */}
            <div className="mb-6 sm:mb-8">
              <div className="flex justify-between items-center mb-3 text-sm sm:text-base">
                <span className="text-slate-700 font-medium">
                  Monthly Investment
                </span>
                <span className="font-bold text-blue-600 text-base sm:text-lg">
                  ₹{monthlyInvestment.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Investment Period Input */}
            <div className="mb-6 sm:mb-8">
              <div className="flex justify-between items-center mb-3 text-sm sm:text-base">
                <span className="text-slate-700 font-medium">
                  Investment Period
                </span>
                <span className="font-bold text-blue-600 text-base sm:text-lg">
                  {years} Years
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Expected Return Input */}
            <div>
              <div className="flex justify-between items-center mb-3 text-sm sm:text-base">
                <span className="text-slate-700 font-medium">
                  Expected Return
                </span>
                <span className="font-bold text-blue-600 text-base sm:text-lg">
                  {returnRate}%
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                value={returnRate}
                onChange={(e) => setReturnRate(Number(e.target.value))}
                className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </motion.div>

          {/* Right Card: Output Results */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-2xl sm:rounded-[32px] gradient-primary p-6 sm:p-10 text-white shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-8 sm:mb-10">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                <h3 className="text-xl sm:text-2xl font-bold">
                  Projected Growth
                </h3>
              </div>

              {/* Data Rows */}
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <p className="text-white/70 text-xs sm:text-sm uppercase tracking-wider font-medium">
                    Total Investment
                  </p>
                  <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-1 sm:mt-2">
                    ₹{formatCurrency(Math.round(result.invested))}
                  </h4>
                </div>

                <div>
                  <p className="text-white/70 text-xs sm:text-sm uppercase tracking-wider font-medium">
                    Wealth Generated
                  </p>
                  <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-1 sm:mt-2">
                    ₹{formatCurrency(Math.round(result.gain))}
                  </h4>
                </div>

                <div className="border-t border-white/10 pt-4 sm:pt-6">
                  <p className="text-white/70 text-xs sm:text-sm uppercase tracking-wider font-medium">
                    Future Value
                  </p>
                  <h4 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-1 sm:mt-2 text-yellow-300">
                    ₹{formatCurrency(Math.round(result.wealth))}
                  </h4>
                </div>
              </div>
            </div>

            {/* Button container ensures full width behavior on mobile devices */}
            <button className="mt-8 sm:mt-12 bg-white text-blue-700 hover:bg-blue-50 transition-colors w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base shadow-sm">
              Get Personalized Plan
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}