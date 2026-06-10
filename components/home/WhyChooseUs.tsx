"use client";

import { motion } from "framer-motion";
import {
  Award,
  Shield,
  Users,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import BookingModal from "../BookingModal";
import { useState } from "react";

const reasons = [
  {
    icon: Award,
    title: "15+ Years Experience",
    description:
      "Deep expertise across wealth management, investments and financial planning.",
  },
  {
    icon: Shield,
    title: "Transparent Advisory",
    description:
      "Clear recommendations with complete transparency and client-first ethics.",
  },
  {
    icon: Users,
    title: "Personalized Solutions",
    description:
      "Strategies tailored around your financial goals, risk profile and future plans.",
  },
  {
    icon: TrendingUp,
    title: "Growth Focused",
    description:
      "Disciplined investing and continuous monitoring for long-term wealth creation.",
  },
];

export default function WhyChooseUs() {
  const [openBooking, setOpenBooking] = useState(false);
  
  return (
    <>
      <section
        id="why-us"
        className="relative py-16 md:py-24 overflow-hidden bg-[#f8fbff]"
      >
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[700px] h-[700px] bg-blue-50 rounded-full blur-3xl opacity-70 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Grid Divider */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">

            {/* LEFT SIDE CONTENT */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex px-4 py-1.5 rounded-full border border-blue-100 bg-white text-blue-700 text-sm font-medium">
                Why Choose Us
              </span>

              {/* RESPONSIVE TEXT: Scales text-3xl -> text-5xl -> text-6xl safely */}
              <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
                Trusted By Families
                <span className="block text-slate-500 mt-1 font-medium text-2xl sm:text-4xl lg:text-5xl">
                  Building Wealth For Generations
                </span>
              </h2>

              <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                We combine disciplined investing, personalized advisory and long-term financial planning to help individuals and families achieve financial confidence.
              </p>

              <button 
                className="w-full sm:w-auto mt-8 px-8 py-4 rounded-2xl gradient-primary text-white font-semibold flex items-center justify-center gap-3 shadow-lg cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform"
                onClick={() => setOpenBooking(true)}
              >
                Book Consultation
                <ArrowRight size={18} />
              </button>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 sm:gap-8 mt-12 sm:mt-16 border-t border-slate-200/60 pt-8">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                    ₹500Cr+
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Assets Managed
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                    10K+
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Clients Served
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                    15+
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Years Experience
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                    98%
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Client Retention
                  </p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE FEATURE REASONS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full"
            >
              {/* RESPONSIVE LAYOUT CONTAINER: 
                - Mobile/Tablet: Flat dynamic CSS Grid matrix layout blocks 
                - Desktop (lg): Restores fixed layout spatial frame (h-[650px] lg:block) 
              */}
              <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:block gap-4 sm:gap-6 lg:h-[650px] w-full max-w-2xl mx-auto lg:max-w-none">
                
                {/* Visual Glow Core */}
                <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none">
                  <div className="w-80 h-80 bg-blue-100 rounded-full blur-[100px]" />
                </div>

                {reasons.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 4 + index,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className={`
                        w-full lg:w-[280px] rounded-[32px] bg-white border 
                        border-slate-200 p-6 sm:p-7 shadow-xl lg:absolute
                        
                        ${index === 0 ? "lg:top-0 lg:left-0" : ""}
                        ${index === 1 ? "lg:top-24 lg:right-0" : ""}
                        ${index === 2 ? "lg:bottom-24 lg:left-10" : ""}
                        ${index === 3 ? "lg:bottom-0 lg:right-12" : ""}
                      `}
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl gradient-primary flex items-center justify-center shrink-0">
                        <Icon size={24} className="text-white" />
                      </div>

                      <h3 className="mt-5 text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                        {item.title}
                      </h3>

                      <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  );
                })}

                {/* Center Badge Vector - Only renders on large viewports where layout spacing permits */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="
                    hidden
                    lg:block
                    absolute
                    top-1/2
                    left-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    bg-white
                    rounded-full
                    shadow-2xl
                    border
                    border-slate-200
                    p-6
                    z-20
                  "
                >
                  <CheckCircle2 size={40} className="text-blue-600" />
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
// import {
//   Award,
//   Users,
//   Shield,
//   TrendingUp,
//   Zap,
//   CheckCircle2,
// } from "lucide-react";

// const reasons = [
//   {
//     title: "15+ Years Experience",
//     description:
//       "A dedicated team of certified advisors helping investors build wealth confidently.",
//     icon: Award,
//   },
//   {
//     title: "Personalized Strategies",
//     description:
//       "Every investment recommendation is tailored to your goals and risk profile.",
//     icon: Users,
//   },
//   {
//     title: "Transparent & Secure",
//     description:
//       "Complete transparency, secure investments and trusted financial partnerships.",
//     icon: Shield,
//   },
//   {
//     title: "Consistent Growth",
//     description:
//       "Data-driven investing focused on long-term wealth creation and stability.",
//     icon: TrendingUp,
//   },
//   {
//     title: "Real-Time Tracking",
//     description:
//       "Track your portfolio performance and investment growth from anywhere.",
//     icon: Zap,
//   },
//   {
//     title: "Trusted by Thousands",
//     description:
//       "More than 10,000 investors trust us with their financial future.",
//     icon: CheckCircle2,
//   },
// ];

// export default function WhyChooseUs() {
//   return (
//     <section
//       id="why-us"
//       className="relative py-32 bg-slate-950 overflow-hidden"
//     >
//       {/* Background Glow */}

//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 left-0  h-125 bg-blue-600/20 blur-[150px] rounded-full" />

//         <div className="absolute bottom-0 right-0 w-125 h-125 bg-cyan-500/20 blur-[150px] rounded-full" />
//       </div>

//       <div className="max-w-7xl mx-auto px-6 relative z-10">

//         <div className="grid lg:grid-cols-2 gap-16 items-start">

//           {/* LEFT SIDE */}

//           <div className="lg:sticky lg:top-32">

//             <span className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm">
//               Why Choose FleetWise
//             </span>

//             <h2 className="mt-6 text-5xl lg:text-7xl font-bold text-white leading-tight">
//               Trusted by
//               <span className="block bg-linear-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
//                 Thousands
//               </span>
//             </h2>

//             <p className="mt-6 text-slate-400 text-lg leading-relaxed max-w-xl">
//               We combine technology, expert financial advice and proven
//               investment strategies to help you build, protect and grow
//               your wealth confidently.
//             </p>

//             {/* Stats */}

//             <div className="grid grid-cols-2 gap-6 mt-12">

//               <div>
//                 <h3 className="text-4xl font-bold text-white">
//                   10K+
//                 </h3>
//                 <p className="text-slate-400 mt-2">
//                   Happy Clients
//                 </p>
//               </div>

//               <div>
//                 <h3 className="text-4xl font-bold text-white">
//                   ₹500Cr+
//                 </h3>
//                 <p className="text-slate-400 mt-2">
//                   Assets Managed
//                 </p>
//               </div>

//               <div>
//                 <h3 className="text-4xl font-bold text-white">
//                   15+
//                 </h3>
//                 <p className="text-slate-400 mt-2">
//                   Years Experience
//                 </p>
//               </div>

//               <div>
//                 <h3 className="text-4xl font-bold text-white">
//                   98%
//                 </h3>
//                 <p className="text-slate-400 mt-2">
//                   Client Satisfaction
//                 </p>
//               </div>

//             </div>
//           </div>

//           {/* RIGHT SIDE */}

//           <div className="space-y-6">

//             {reasons.map((reason, index) => {
//               const Icon = reason.icon;

//               return (
//                 <motion.div
//                   key={reason.title}
//                   initial={{
//                     opacity: 0,
//                     x: 50,
//                   }}
//                   whileInView={{
//                     opacity: 1,
//                     x: 0,
//                   }}
//                   viewport={{ once: true }}
//                   transition={{
//                     delay: index * 0.1,
//                   }}
//                   whileHover={{
//                     scale: 1.02,
//                   }}
//                   className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
//                 >
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-r from-blue-600/10 via-cyan-500/10 to-emerald-500/10" />

//                   <div className="relative z-10 flex gap-5">

//                     <div className="shrink-0 w-16 h-16 rounded-2xl bg-linear-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white">
//                       <Icon size={30} />
//                     </div>

//                     <div>
//                       <h3 className="text-2xl font-bold text-white mb-3">
//                         {reason.title}
//                       </h3>

//                       <p className="text-slate-400 leading-relaxed">
//                         {reason.description}
//                       </p>
//                     </div>

//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>

//         </div>

//         {/* CTA */}

//         <div className="text-center mt-24">

//           <button className="px-10 py-5 rounded-2xl bg-linear-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white font-semibold text-lg shadow-2xl hover:scale-105 transition">
//             Start Building Wealth Today
//           </button>

//         </div>

//       </div>
//     </section>
//   );
// }