"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Shield,
  Landmark,
  PieChart,
  Wallet,
  Target,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    title: "Mutual Funds",
    desc: "Professionally curated portfolios aligned with your risk profile and financial goals.",
    icon: TrendingUp,
  },
  {
    title: "Insurance Planning",
    desc: "Comprehensive protection strategies for you and your family's future.",
    icon: Shield,
  },
  {
    title: "Retirement Planning",
    desc: "Structured plans that help you build long-term financial independence.",
    icon: Landmark,
  },
  {
    title: "Tax Planning",
    desc: "Efficient strategies to optimize taxation while preserving wealth.",
    icon: PieChart,
  },
  {
    title: "Portfolio Management",
    desc: "Active monitoring and optimization of your investments.",
    icon: Wallet,
  },
  {
    title: "Goal-Based Investing",
    desc: "Investment solutions designed around your life milestones.",
    icon: Target,
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-24 bg-[#f8fbff] overflow-hidden"
    >
      {/* Background Glow */}

      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-50 rounded-full blur-3xl opacity-70" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <span className="inline-flex px-4 py-2 rounded-full border border-blue-100 bg-white text-blue-700 font-medium">
            Services
          </span>

          <h2 className="mt-6 text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
            Financial Solutions
            <span className="block text-slate-500">
              Designed Around Your Goals
            </span>
          </h2>

          <p className="mt-6 text-xl text-slate-600 leading-relaxed">
            We offer comprehensive wealth management and advisory
            solutions tailored to every stage of your financial journey.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid lg:grid-cols-2 gap-8 mt-16">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[32px]
                  bg-white
                  border
                  border-slate-200
                  p-8
                  shadow-sm
                  hover:shadow-2xl
                  transition-all
                  duration-500
                "
              >
                {/* Hover Glow */}

                <div
                  className="
                    absolute
                    inset-0
                    opacity-0
                    group-hover:opacity-100
                    transition
                    duration-500
                    bg-linear-to-br
                    from-blue-50
                    via-white
                    to-cyan-50
                  "
                />

                <div className="relative z-10">

                  <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                    <Icon
                      size={30}
                      className="text-white"
                    />
                  </div>

                  <h3 className="mt-8 text-2xl font-bold text-slate-900">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-slate-600 leading-relaxed">
                    {service.desc}
                  </p>

                  <div className="mt-8 flex items-center gap-2 text-blue-600 font-semibold">
                    Learn More

                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition"
                    />
                  </div>

                </div>
              </motion.div>
            );
          })}

        </div>

        {/* Bottom CTA */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-bold text-slate-900">
            Not sure where to begin?
          </h3>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Speak with our advisors and get a personalized roadmap
            based on your financial goals and investment profile.
          </p>

          <button className="mt-8 px-8 py-4 rounded-2xl gradient-primary text-white font-semibold shadow-lg hover:scale-[1.02] transition">
            Book Free Consultation
          </button>
        </motion.div>

      </div>
    </section>
  );
} 



// "use client";

// import { motion } from "framer-motion";
// import {
//   TrendingUp,
//   Shield,
//   Landmark,
//   PieChart,
//   Wallet,
//   Target,
//   ArrowRight,
// } from "lucide-react";

// const services = [
//   {
//     title: "Mutual Funds",
//     subtitle: "Professionally curated portfolios",
//     icon: TrendingUp,
//     gradient: "from-blue-500 to-cyan-500",
//   },
//   {
//     title: "Insurance Planning",
//     subtitle: "Protect your family's future",
//     icon: Shield,
//     gradient: "from-violet-500 to-purple-600",
//   },
//   {
//     title: "Retirement Planning",
//     subtitle: "Financial freedom starts today",
//     icon: Landmark,
//     gradient: "from-emerald-500 to-teal-500",
//   },
//   {
//     title: "Tax Planning",
//     subtitle: "Maximize wealth legally",
//     icon: PieChart,
//     gradient: "from-orange-500 to-red-500",
//   },
//   {
//     title: "Portfolio Management",
//     subtitle: "Active wealth optimization",
//     icon: Wallet,
//     gradient: "from-cyan-500 to-blue-600",
//   },
//   {
//     title: "Goal Based Investing",
//     subtitle: "Invest with purpose",
//     icon: Target,
//     gradient: "from-pink-500 to-rose-500",
//   },
// ];

// export default function ServicesSection() {
//   return (
//     <section
//       id="services"
//       className="relative py-32 bg-slate-950 overflow-hidden"
//     >
//       {/* Background Glow */}

//       <div className="absolute inset-0">
//         <div className="absolute top-20 left-0 w-96 h-96 bg-blue-500/20 blur-[150px]" />
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 blur-[150px]" />
//       </div>

//       <div className="max-w-7xl mx-auto px-6 relative z-10">

//         <div className="grid lg:grid-cols-2 gap-20">

//           {/* LEFT SIDE */}

//           <div className="lg:sticky lg:top-32 self-start">

//             <motion.span
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}
//               className="inline-flex px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 font-medium"
//             >
//               Our Expertise
//             </motion.span>

//             <motion.h2
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="mt-8 text-5xl lg:text-7xl font-bold text-white leading-tight"
//             >
//               Services Built
//               <span className="block bg-linear-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
//                 Around Your Goals
//               </span>
//             </motion.h2>

//             <motion.p
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}
//               className="mt-8 text-slate-400 text-xl leading-relaxed"
//             >
//               Every investor is unique. We design customized wealth
//               strategies combining investments, insurance, retirement,
//               taxation and portfolio management.
//             </motion.p>

//             <motion.button
//               whileHover={{ scale: 1.04 }}
//               whileTap={{ scale: .96 }}
//               className="mt-10 px-8 py-4 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold flex items-center gap-3"
//             >
//               Talk To Advisor
//               <ArrowRight size={18} />
//             </motion.button>
//           </div>

//           {/* RIGHT SIDE */}

//           <div className="space-y-8">

//             {services.map((service, index) => {
//               const Icon = service.icon;

//               return (
//                 <motion.div
//                   key={service.title}
//                   initial={{
//                     opacity: 0,
//                     x: 100,
//                   }}
//                   whileInView={{
//                     opacity: 1,
//                     x: 0,
//                   }}
//                   viewport={{
//                     once: true,
//                   }}
//                   transition={{
//                     duration: 0.6,
//                     delay: index * 0.1,
//                   }}
//                   whileHover={{
//                     scale: 1.03,
//                     y: -5,
//                   }}
//                   className="
//                   group
//                   relative
//                   overflow-hidden
//                   rounded-3xl
//                   border
//                   border-white/10
//                   bg-white/5
//                   backdrop-blur-2xl
//                   p-8
//                   "
//                 >
//                   {/* Gradient Hover */}

//                   <div
//                     className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-linear-to-r ${service.gradient}`}
//                     style={{
//                       maskImage:
//                         "linear-gradient(to bottom, rgba(0,0,0,.25), transparent)",
//                     }}
//                   />

//                   <div className="relative z-10 flex items-center gap-6">

//                     <div
//                       className={`w-16 h-16 rounded-2xl bg-linear-to-r ${service.gradient} flex items-center justify-center shadow-xl`}
//                     >
//                       <Icon className="w-8 h-8 text-white" />
//                     </div>

//                     <div>
//                       <h3 className="text-2xl font-bold text-white">
//                         {service.title}
//                       </h3>

//                       <p className="text-slate-400 mt-2">
//                         {service.subtitle}
//                       </p>
//                     </div>
//                   </div>

//                   <motion.div
//                     className="mt-6 h-0.5 bg-linear-to-r opacity-20  group-hover:opacity-100 transition-all duration-500"
//                     style={{
//                       background:
//                         "linear-gradient(to right,#3b82f6,#06b6d4,#10b981)",
//                     }}
//                   />
//                 </motion.div>
//               );
//             })}
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }