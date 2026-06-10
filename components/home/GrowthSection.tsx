"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Target,
  ShieldCheck,
  Landmark,
} from "lucide-react";

const journey = [
  {
    year: "Step 01",
    title: "Understand Your Goals",
    desc: "We begin by understanding your financial aspirations, risk appetite and future plans.",
    icon: Target,
  },
  {
    year: "Step 02",
    title: "Build A Strategy",
    desc: "A personalized investment and protection roadmap is designed around your objectives.",
    icon: ShieldCheck,
  },
  {
    year: "Step 03",
    title: "Invest Consistently",
    desc: "Disciplined investing helps you stay focused through market cycles.",
    icon: TrendingUp,
  },
  {
    year: "Step 04",
    title: "Create Lasting Wealth",
    desc: "Continuous monitoring and optimization support long-term financial growth.",
    icon: Landmark,
  },
];

export default function GrowthSection() {
  return (
    <section
      id="growth"
      className="relative py-6 bg-white overflow-hidden"
    >
      {/* Background Glow */}

      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-50 rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center"
        >
          <span className="inline-flex px-4 py-2 rounded-full border border-blue-100 bg-blue-50 text-blue-700 font-medium">
            Wealth Growth Journey
          </span>

          <h2 className="mt-6 text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
            A Disciplined Path
            <span className="block text-slate-500">
              Towards Financial Freedom
            </span>
          </h2>

          <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Building wealth isn&apos;t about timing the market.
            It&apos;s about having the right strategy, staying
            consistent, and making informed decisions over time.
          </p>
        </motion.div>

        {/* Growth Chart */}

        <div className="mt-20 relative">

          {/* Curve */}

          <svg
            viewBox="0 0 1200 300"
            className="absolute top-10 left-0 w-full hidden lg:block"
          >
            <path
              d="M50 250 C250 240, 350 180, 500 180 C700 180, 750 90, 1150 50"
              stroke="url(#gradient)"
              strokeWidth="5"
              fill="none"
            />

            <defs>
              <linearGradient
                id="gradient"
                x1="0"
                x2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="#4f7dda"
                />
                <stop
                  offset="100%"
                  stopColor="#6ac9d6"
                />
              </linearGradient>
            </defs>
          </svg>

          {/* Journey Cards */}

          <div className="grid lg:grid-cols-4 gap-8 relative z-10">

            {journey.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
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
                    delay: index * 0.15,
                  }}
                  whileHover={{
                    y: -10,
                  }}
                  className="
                    bg-white
                    border
                    border-slate-200
                    rounded-[32px]
                    p-8
                    shadow-sm
                    hover:shadow-xl
                    transition-all
                  "
                >
                  <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                    <Icon
                      size={30}
                      className="text-white"
                    />
                  </div>

                  <p className="mt-6 text-blue-600 font-semibold">
                    {item.year}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Numbers */}

        {/* <div className="mt-20 rounded-[40px] bg-gradient-to-r from-blue-600 to-cyan-500 p-10 md:p-14">

          <div className="grid md:grid-cols-4 gap-10 text-center">

            <div>
              <h3 className="text-4xl font-bold text-white">
                ₹500Cr+
              </h3>

              <p className="text-blue-100 mt-2">
                Assets Managed
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-white">
                10K+
              </h3>

              <p className="text-blue-100 mt-2">
                Happy Clients
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-white">
                15+
              </h3>

              <p className="text-blue-100 mt-2">
                Years Experience
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-white">
                98%
              </h3>

              <p className="text-blue-100 mt-2">
                Client Retention
              </p>
            </div>

          </div>

        </div> */}

      </div>
    </section>
  );
}