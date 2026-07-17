"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowUpRight,
  PieChart,
  Wallet,
  Target,
} from "lucide-react";
import BookingModal from "../BookingModal";
import { useCompanyStats } from "@/lib/useCompanyStats";
import { formatIndianNumber } from "@/lib/utils";

const dashboardSlides = [
  {
    title: "Portfolio Overview",
    value: "₹2.45 Cr",
    change: "+18.4%",
    icon: Wallet,
  },
  {
    title: "Asset Allocation",
    value: "68% Equity",
    change: "22% Debt",
    icon: PieChart,
  },
  {
    title: "Investment Growth",
    value: "+24.8%",
    change: "YTD Return",
    icon: ArrowUpRight,
  },
  {
    title: "Financial Goals",
    value: "4 / 5",
    change: "Goals Achieved",
    icon: Target,
  },
];

export default function PremiumHero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [openBooking, setOpenBooking] = useState(false);

  const stats = useCompanyStats();
  
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) =>
        prev === dashboardSlides.length - 1 ? 0 : prev + 1
      );
    }, 3500);
  
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section
        id="home"
        // FIXED: Added deliberate pt-28 on small screens to prevent navbar overlap, and min-h-screen centering for large viewports
        className="relative min-h-screen flex items-center overflow-hidden bg-[#f8fbff] pt-28 pb-12 md:pt-36 lg:py-0"
      >
        {/* Background Decorative Blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[700px] h-[700px] bg-blue-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[700px] h-[700px] bg-cyan-100 rounded-full blur-3xl opacity-50" />
        </div>

        {/* Max Width Layout container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          {/* RESPONSIVE GRID: Stacked on mobile/tablet (cols-1), split on laptop/monitor (lg:cols-2) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Content Column */}
            <div className="text-left order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-100 bg-white shadow-sm"
              >
                <span className="text-blue-600 font-medium text-xs sm:text-sm">
                  Trusted Wealth Advisory
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                // RESPONSIVE TEXT: Dynamic sizing per screen break
                className="mt-6 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.05] lg:leading-[0.95] tracking-[-0.04em] text-slate-900"
              >
                Preserve Wealth.
                <br />
                <span className="text-slate-500">
                  Build Legacy.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl"
              >
                Personalized financial planning, investment advisory and wealth
                management solutions designed for long-term financial confidence.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4 mt-8"
              >
                <button 
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl gradient-primary text-white font-semibold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer" 
                  onClick={() => setOpenBooking(true)}
                >
                  Schedule Consultation
                </button>
              </motion.div>

              {/* Stats Grid: Scales cleanly from 3 even columns down to compact viewports */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16 border-t border-slate-200/60 pt-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                     ₹{formatIndianNumber(stats.assetsManaged)}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 whitespace-nowrap">
                    Assets Managed
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    {formatIndianNumber(stats.customersServed)}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 whitespace-nowrap">
                    Clients Served
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    {stats.yearsInIndustry}+
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 whitespace-nowrap">
                    Years Experience
                  </p>
                </div>
              </div>
            </div>

            {/* Right Visual Card Column */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative w-full max-w-xl mx-auto lg:max-w-none order-2 lg:order-2"
            >
              <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] lg:shadow-[0_30px_80px_rgba(0,0,0,0.08)] p-5 sm:p-8 border border-slate-100">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <div>
                    <p className="text-slate-500 text-xs sm:text-sm">
                      Wealth Dashboard
                    </p>
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                      Private Client View
                    </h3>
                  </div>

                  {/* Carousel Indicators */}
                  <div className="flex gap-1.5">
                    {dashboardSlides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveSlide(i)}
                        className={`h-2 rounded-full transition-all ${
                          activeSlide === i
                            ? "w-6 sm:w-8 bg-blue-600"
                            : "w-2 bg-slate-300"
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Main Dynamic Panel */}
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 p-6 sm:p-8"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-slate-500 text-xs sm:text-sm">
                        {dashboardSlides[activeSlide].title}
                      </p>
                      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 sm:mt-3">
                        {dashboardSlides[activeSlide].value}
                      </h2>
                      <p className="text-green-600 font-medium text-sm mt-1 sm:mt-2">
                        {dashboardSlides[activeSlide].change}
                      </p>
                    </div>

                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl gradient-primary flex items-center justify-center shrink-0">
                      {(() => {
                        const Icon = dashboardSlides[activeSlide].icon;
                        return <Icon size={22} className="text-white" />;
                      })()}
                    </div>
                  </div>

                  {/* Asset Allocation Bars */}
                  <div className="mt-6 sm:mt-8 space-y-3.5 sm:space-y-4">
                    <div>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs sm:text-sm text-slate-500">Equity</span>
                        <span className="text-xs sm:text-sm font-medium">68%</span>
                      </div>
                      <div className="h-2 bg-white rounded-full overflow-hidden">
                        <div className="h-full w-[68%] bg-blue-600 rounded-full" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs sm:text-sm text-slate-500">Debt</span>
                        <span className="text-xs sm:text-sm font-medium">22%</span>
                      </div>
                      <div className="h-2 bg-white rounded-full overflow-hidden">
                        <div className="h-full w-[22%] bg-cyan-500 rounded-full" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs sm:text-sm text-slate-500">Gold</span>
                        <span className="text-xs sm:text-sm font-medium">10%</span>
                      </div>
                      <div className="h-2 bg-white rounded-full overflow-hidden">
                        <div className="h-full w-[10%] bg-slate-400 rounded-full" />
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <BookingModal
        open={openBooking}
        onClose={() => setOpenBooking(false)}
      />
    </>
  );
}



// "use client";

// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";

// export default function PremiumHero() {
//   return (
//     <section id="home" className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-white flex items-center pt-20">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Primary gradient blob */}
//         <motion.div 
//           animate={{ 
//             top: ['0%', '100%', '0%'],
//             left: ['0%', '50%', '0%']
//           }}
//           transition={{ duration: 20, repeat: Infinity }}
//           className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl"
//         />
        
//         {/* Secondary gradient blob */}
//         <motion.div 
//           animate={{ 
//             bottom: ['0%', '100%', '0%'],
//             right: ['0%', '50%', '0%']
//           }}
//           transition={{ duration: 20, repeat: Infinity, delay: 1 }}
//           className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl"
//         />

//         {/* Accent blob */}
//         <motion.div 
//           animate={{ 
//             scale: [1, 1.2, 1],
//             opacity: [0.3, 0.6, 0.3]
//           }}
//           transition={{ duration: 15, repeat: Infinity }}
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"
//         />
//       </div>

//       {/* Grid pattern overlay */}
//       <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />

//       {/* Content */}
//       <div className="max-w-7xl mx-auto px-6 relative z-10">
//         <motion.div 
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="mb-6"
//         >
//           <motion.span 
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2 }}
//             className="inline-block px-4 py-2 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full text-sm font-semibold text-white shadow-lg"
//           >
//             ✨ Your Trusted Financial Partner
//           </motion.span>
//         </motion.div>

//         <motion.h1
//           initial={{ opacity: 0, y: 60 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.1 }}
//           className="text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight"
//         >
//           Build Your Wealth
//           <motion.span 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6 }}
//             className="block bg-linear-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent"
//           >
//             With Confidence
//           </motion.span>
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4, duration: 0.8 }}
//           className="mt-8 text-xl lg:text-2xl max-w-3xl text-slate-300 font-light leading-relaxed"
//         >
//           Expert financial planning, wealth management, and investment solutions tailored to your unique goals. Let us guide you toward financial freedom.
//         </motion.p>

//         {/* CTA Buttons */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6, duration: 0.8 }}
//           className="flex gap-6 mt-12 flex-wrap"
//         >
//           <motion.button 
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-8 py-4 bg-linear-to-r from-blue-600 to-blue-700 rounded-xl font-semibold text-white shadow-lg hover:shadow-blue-500/50 shadow-blue-600/50 transition-all duration-300 flex items-center gap-2 group"
//           >
//             Start Investing
//             <motion.span
//               animate={{ x: [0, 4, 0] }}
//               transition={{ duration: 1.5, repeat: Infinity }}
//             >
//               <ArrowRight size={20} />
//             </motion.span>
//           </motion.button>

//           <motion.button 
//             whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
//             whileTap={{ scale: 0.95 }}
//             className="px-8 py-4 border-2 border-white rounded-xl font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
//           >
//             Learn More
//           </motion.button>
//         </motion.div>

//         {/* Stats preview */}
//         <motion.div 
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.8 }}
//           className="mt-20 grid grid-cols-3 gap-8 max-w-2xl"
//         >
//           {[
//             { number: "10K+", label: "Happy Clients" },
//             { number: "₹500Cr+", label: "Assets Managed" },
//             { number: "15+", label: "Years Experience" }
//           ].map((stat, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ y: -5 }}
//               className="text-center"
//             >
//               <p className="text-3xl lg:text-4xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//                 {stat.number}
//               </p>
//               <p className="text-slate-400 mt-2">{stat.label}</p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }