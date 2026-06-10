"use client";

import { motion } from "framer-motion";
import {
  Phone,
  FileText,
  Target,
  TrendingUp,
  RefreshCcw,
} from "lucide-react";

const steps = [
  {
    icon: Phone,
    number: "01",
    title: "Discovery Call",
    description:
      "We understand your financial goals, investment horizon, income, and future aspirations.",
  },
  {
    icon: FileText,
    number: "02",
    title: "Financial Assessment",
    description:
      "A complete review of your assets, liabilities, cash flow, insurance and existing investments.",
  },
  {
    icon: Target,
    number: "03",
    title: "Strategy Design",
    description:
      "We create a personalized wealth strategy aligned with your goals and risk profile.",
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Portfolio Implementation",
    description:
      "We build and execute an investment plan using carefully selected financial products.",
  },
  {
    icon: RefreshCcw,
    number: "05",
    title: "Continuous Review",
    description:
      "Regular portfolio reviews ensure your investments remain aligned with changing goals.",
  },
];

export default function WorkflowSection() {
  return (
    <section
      id="workflow"
      className="relative py-20 bg-white overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-medium">
            Our Process
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-slate-900">
            A Clear Path To
            <span className="block bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Financial Confidence
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            Our structured advisory process ensures every decision
            is aligned with your goals, risk profile and long-term
            wealth creation journey.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-24">

          {/* Desktop Line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-[2px] bg-linear-to-r from-blue-200 via-cyan-300 to-blue-200" />

          <div className="grid lg:grid-cols-5 gap-8">

            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                className="relative"
              >
                {/* Step Circle */}
                <div className="relative z-10 w-24 h-24 mx-auto rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center">
                  <step.icon
                    size={32}
                    className="text-blue-600"
                  />
                </div>

                {/* Number */}
                <p className="mt-6 text-center text-sm font-bold tracking-wider text-blue-600">
                  STEP {step.number}
                </p>

                {/* Card */}
                <div className="mt-4 p-6 rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-slate-600 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}