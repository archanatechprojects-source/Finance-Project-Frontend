"use client";

import { motion } from "framer-motion";
import {
  Home,
  GraduationCap,
  Briefcase,
  ArrowRight,
} from "lucide-react";

const stories = [
  {
    name: "Retirement Planning",
    icon: Briefcase,
    amount: "₹3.2 Cr",
    result: "Retirement Corpus Built",
    description:
      "A business owner systematically invested over 12 years and achieved financial independence ahead of schedule.",
  },
  {
    name: "Child Education Goal",
    icon: GraduationCap,
    amount: "₹45 Lakh",
    result: "Education Fund Created",
    description:
      "Disciplined SIP investments helped a family fully fund their child’s international education goals.",
  },
  {
    name: "Dream Home Planning",
    icon: Home,
    amount: "₹1.1 Cr",
    result: "Property Purchase Goal",
    description:
      "Goal-based investing enabled a young couple to purchase their dream home without financial stress.",
  },
];

const metrics = [
  {
    value: "10,000+",
    label: "Investors Served",
  },
  {
    value: "₹500Cr+",
    label: "Assets Managed",
  },
  {
    value: "98%",
    label: "Client Retention",
  },
  {
    value: "15+",
    label: "Years Experience",
  },
];

export default function SuccessStories() {
  return (
    <section
      id="success-stories"
      className="relative pb-12 sm:py-20 lg:py-28 bg-white overflow-hidden"
    >
      {/* Background Glows - Responsive sizing to fix mobile layout overflows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-blue-50 rounded-full blur-3xl opacity-70" />
        <div className="absolute bottom-0 right-0 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-cyan-50 rounded-full blur-3xl opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-medium text-xs sm:text-sm">
            Success Stories
          </span>

          {/* Fluid typographic scale from mobile to monitor */}
          <h2 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
            Turning Financial Goals
            <span className="block text-slate-500 mt-1">
              Into Real Outcomes
            </span>
          </h2>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed px-2 sm:px-0">
            Every portfolio tells a story. Here are examples of how
            disciplined planning and strategic investing help investors
            achieve meaningful life goals.
          </p>
        </motion.div>

        {/* Success Stories Grid */}
        {/* Mobile: 1 Col | Tablet: 1 Col (Max-width optimized) | Laptop & Monitor: 3 Cols */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 max-w-md sm:max-w-xl lg:max-w-none mx-auto">
          {stories.map((story, index) => {
            const Icon = story.icon;

            return (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl sm:rounded-[32px] border border-slate-200 p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl gradient-primary flex items-center justify-center text-white shrink-0">
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>

                  <h3 className="mt-5 sm:mt-6 text-xl sm:text-2xl font-bold text-slate-900">
                    {story.name}
                  </h3>

                  <p className="mt-3 text-slate-600 leading-relaxed text-xs sm:text-sm">
                    {story.description}
                  </p>
                </div>

                <div className="mt-6 sm:mt-8 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                    Outcome Achieved
                  </p>
                  <h4 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                    {story.amount}
                  </h4>
                  <p className="text-blue-600 font-medium text-xs sm:text-sm mt-0.5">
                    {story.result}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live Metrics Grid Wrapper */}
        {/* Mobile: 2x2 Grid | Tablet/Laptop: 4 side-by-side items */}
        {/* <div className="mt-16 sm:mt-24 rounded-2xl sm:rounded-[40px] gradient-primary p-[1px]">
          <div className="bg-white rounded-2xl sm:rounded-[40px] px-4 py-8 sm:px-8 sm:py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 text-center divide-x-0 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {metrics.map((item) => (
                <div key={item.label} className="pt-2 md:pt-0 first:pt-0">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                    {item.value}
                  </h3>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-slate-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        {/* CTA Button Action */}
        {/* <div className="text-center mt-12 sm:mt-16 px-4">
          <button className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl gradient-primary text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:opacity-95 transition-all duration-200">
            Create Your Success Story
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div> */}

      </div>
    </section>
  );
}