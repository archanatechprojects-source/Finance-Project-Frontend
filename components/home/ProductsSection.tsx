"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Shield,
  PiggyBank,
  Landmark,
  ArrowRight,
} from "lucide-react";

const products = [
  {
    title: "Mutual Funds",
    icon: TrendingUp,
    description:
      "Professionally managed portfolios designed for long-term wealth creation and goal-based investing.",
    gradient: "from-blue-600 via-cyan-500 to-blue-400",
  },
  {
    title: "SIP Plans",
    icon: TrendingUp,
    description:
      "Invest consistently every month and build wealth through disciplined investing.",
    gradient: "from-violet-600 via-purple-500 to-pink-500",
  },
  {
    title: "Life Insurance",
    icon: Shield,
    description:
      "Protect your loved ones with comprehensive life coverage and future security.",
    gradient: "from-emerald-600 via-green-500 to-teal-400",
  },
  {
    title: "Fixed Deposits",
    icon: PiggyBank,
    description:
      "Stable returns with capital protection from trusted financial institutions.",
    gradient: "from-orange-500 via-amber-500 to-yellow-400",
  },
  {
    title: "Government Bonds",
    icon: Landmark,
    description:
      "Low-risk investments backed by government securities for predictable income.",
    gradient: "from-indigo-600 via-blue-500 to-cyan-500",
  },
];

export default function ProductsSection() {
return (
<section
  id="products"
  className="relative py-32 overflow-hidden bg-slate-950 text-white"
>
  {/* Background Effects */}

  <div className="absolute inset-0">
    <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />

    <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]" />
  </div>

  <div className="max-w-7xl mx-auto px-6 relative z-10">

    {/* Heading */}

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-center mb-20"
    >
      <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm">
        Investment Products
      </span>

      <h2 className="mt-6 text-5xl lg:text-7xl font-bold">
        Solutions For Every
        <span className="block bg-linear-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          Financial Goal
        </span>
      </h2>

      <p className="mt-6 max-w-3xl mx-auto text-slate-400 text-lg">
        Explore carefully curated investment and protection products
        designed to help you grow, preserve and secure your wealth.
      </p>
    </motion.div>

    {/* Featured Product */}

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl p-10 lg:p-14 mb-8"
    >
      <div className="absolute inset-0 bg-linear-to-r from-blue-600/20 to-cyan-500/20" />

      <div className="relative z-10">

        <div className="inline-flex p-4 rounded-2xl bg-linear-to-r from-blue-500 to-cyan-500 mb-6">
          <TrendingUp size={34} />
        </div>

        <h3 className="text-4xl font-bold mb-4">
          Mutual Funds
        </h3>

        <p className="text-slate-300 text-lg max-w-3xl">
          Build long-term wealth through professionally managed portfolios
          aligned with your financial goals and risk appetite.
        </p>

        <button className="mt-8 flex items-center gap-2 px-7 py-4 rounded-xl bg-white text-slate-900 font-semibold">
          Explore Funds
          <ArrowRight size={18} />
        </button>

      </div>
    </motion.div>

    {/* Product Grid */}

    <div className="grid md:grid-cols-2 gap-6">

      {products.slice(1).map((product) => {
        const Icon = product.icon;

        return (
          <motion.div
            key={product.title}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          >
            <div
              className={`absolute inset-0 bg-linear-to-br ${product.gradient} opacity-0 group-hover:opacity-20 transition duration-500`}
            />

            <div className="relative z-10">

              <div
                className={`inline-flex p-4 rounded-2xl bg-linear-to-r ${product.gradient} mb-5`}
              >
                <Icon size={28} />
              </div>

              <h3 className="text-2xl font-bold mb-3">
                {product.title}
              </h3>

              <p className="text-slate-400 mb-6">
                {product.description}
              </p>

              <button className="flex items-center gap-2 text-cyan-400 font-semibold">
                Learn More
                <ArrowRight size={16} />
              </button>

            </div>
          </motion.div>
        );
      })}
    </div>

  </div>
</section>
);
}