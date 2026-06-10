"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Trusted Advisory",
    desc: "Transparent and research-driven financial guidance.",
  },
  {
    icon: TrendingUp,
    title: "Growth Focused",
    desc: "Strategies built for long-term wealth creation.",
  },
  {
    icon: Users,
    title: "Client First",
    desc: "Every recommendation starts with your goals.",
  },
  {
    icon: Award,
    title: "Proven Expertise",
    desc: "Experienced advisors with deep market insights.",
  },
];

const cards = [
  {
    title: "Wealth Management",
    value: "₹500Cr+",
    desc: "Assets Under Advisory",
  },
  {
    title: "Satisfied Clients",
    value: "10,000+",
    desc: "Across India & NRI Investors",
  },
  {
    title: "Experience",
    value: "15+ Years",
    desc: "Helping families build wealth",
  },
  {
    title: "Success Rate",
    value: "98%",
    desc: "Client retention & satisfaction",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-16 md:py-24 overflow-hidden bg-slate-950 text-white"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 md:w-96 md:h-96 bg-blue-600/10 md:bg-blue-600/20 rounded-full blur-[100px] md:blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-72 h-72 md:w-96 md:h-96 bg-cyan-500/10 md:bg-cyan-500/20 rounded-full blur-[100px] md:blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Grid Splitter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-cyan-400 text-sm font-medium border border-cyan-500/20">
              About FleetWise
            </span>

            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              Helping Investors Build{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Wealth With Confidence
              </span>
            </h2>

            <p className="mt-6 text-slate-400 text-base sm:text-lg leading-relaxed">
              At FleetWise Wealth Management, we combine technology,
              research, and personalized financial planning to help
              investors make smarter financial decisions.
            </p>

            <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">
              Whether you&apos;re planning for retirement, creating wealth,
              protecting your family, or investing globally, we create
              strategies tailored to your life goals.
            </p>

            {/* Sub-Features Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl transition-colors hover:bg-white/[0.08]"
                >
                  <item.icon className="w-7 h-7 text-cyan-400 mb-3" />
                  <h3 className="font-semibold text-base sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE STATS PANELS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full"
          >
            {/* RESPONSIVE SYSTEM: 
              - Mobile/Tablet: Flat predictable grid tracking (`grid grid-cols-1 sm:grid-cols-2`)
              - Desktop (lg): Transitions back into an absolute structured layout container
            */}
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:block gap-4 sm:gap-6 lg:h-[480px] w-full max-w-2xl mx-auto lg:max-w-none">
              
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`
                    w-full lg:w-[280px] rounded-3xl p-6 sm:p-7 
                    bg-white/5 lg:bg-white/10 backdrop-blur-2xl 
                    border border-white/10 shadow-xl lg:absolute
                    
                    ${index === 0 ? "lg:top-0 lg:left-0" : ""}
                    ${index === 1 ? "lg:top-16 lg:right-0" : ""}
                    ${index === 2 ? "lg:bottom-20 lg:left-12" : ""}
                    ${index === 3 ? "lg:bottom-0 lg:right-8" : ""}
                  `}
                >
                  <p className="text-slate-400 text-xs sm:text-sm">
                    {card.title}
                  </p>

                  <h3 className="text-3xl sm:text-4xl font-bold mt-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
                    {card.value}
                  </h3>

                  <p className="mt-3 text-sm text-slate-300 leading-normal">
                    {card.desc}
                  </p>
                </motion.div>
              ))}

              {/* Decorative behind-card center glow element */}
              <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none">
                <div className="w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]" />
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}