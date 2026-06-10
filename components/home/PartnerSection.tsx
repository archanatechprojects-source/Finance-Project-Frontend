"use client";

import { motion } from "framer-motion";
import {
  Shield,
  BadgeCheck,
  Landmark,
} from "lucide-react";

const partners = [
  "HDFC Bank",
  "ICICI Bank",
  "SBI",
  "Axis Bank",
  "Kotak",
  "LIC",
  "Nippon India",
  "ICICI Prudential",
  "Aditya Birla",
  "Mirae Asset",
];

export default function PartnersSection() {
  return (
    <section
      id="partners"
      className="relative py-24 bg-slate-950 overflow-hidden"
    >
      {/* Background Glow */}

      <div className="absolute inset-0">

        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 blur-[140px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 blur-[140px] rounded-full" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white text-sm">
            Trusted Partnerships
          </span>

          <h2 className="mt-6 text-5xl lg:text-7xl font-bold text-white">
            Backed By
            <span className="block bg-linear-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-400">
            We collaborate with India&apos;s most trusted banks,
            AMCs and insurance providers to deliver
            secure investment opportunities.
          </p>
        </motion.div>

        {/* Infinite Logo Marquee */}

        <div className="mt-16 overflow-hidden">

          <motion.div
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-6 whitespace-nowrap"
          >
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="shrink-0 px-8 py-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-white font-semibold text-lg"
              >
                {partner}
              </div>
            ))}
          </motion.div>

        </div>

        {/* Trust Cards */}

        <div className="grid md:grid-cols-3 gap-8 mt-24">

          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          >
            <Shield
              size={36}
              className="text-cyan-400 mb-5"
            />

            <h3 className="text-white text-2xl font-bold">
              Fully Secure
            </h3>

            <p className="mt-3 text-slate-400">
              Investments routed through trusted and
              regulated financial institutions.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          >
            <Landmark
              size={36}
              className="text-blue-400 mb-5"
            />

            <h3 className="text-white text-2xl font-bold">
              Trusted Partners
            </h3>

            <p className="mt-3 text-slate-400">
              Access products from leading banks,
              AMCs and insurance providers.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          >
            <BadgeCheck
              size={36}
              className="text-emerald-400 mb-5"
            />

            <h3 className="text-white text-2xl font-bold">
              Verified Solutions
            </h3>

            <p className="mt-3 text-slate-400">
              Every investment opportunity is
              carefully evaluated before recommendation.
            </p>
          </motion.div>

        </div>

        {/* Stats */}

        {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-24">

          {[
            {
              number: "25+",
              label: "Financial Partners",
            },
            {
              number: "₹500Cr+",
              label: "Assets Managed",
            },
            {
              number: "10K+",
              label: "Investors",
            },
            {
              number: "100%",
              label: "Regulated",
            },
          ].map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <h3 className="text-4xl lg:text-5xl font-bold text-white">
                {item.number}
              </h3>

              <p className="mt-2 text-slate-400">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div> */}

        {/* Bottom CTA */}

        {/* <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <button className="px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white font-semibold text-lg shadow-2xl hover:scale-105 transition">
            Explore Investment Opportunities
          </button>
        </motion.div> */}

      </div>
    </section>
  );
}