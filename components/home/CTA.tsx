"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CTAProps {
  title: string;
  description: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export default function CTA({
  title,
  description,

  
  primaryButtonText = "Get Started",
  secondaryButtonText = "Learn More",
  onPrimaryClick,
  onSecondaryClick,
}: CTAProps) {
  return (
    <section className="py-24 gradient-brand text-white overflow-hidden relative">
      {/* Decorative blobs */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-6 text-center relative z-10"
      >
        {/* Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl lg:text-6xl font-bold mb-4 leading-tight"
        >
          {title}
        </motion.h2>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl lg:text-2xl text-brand-soft mb-8 leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex gap-6 justify-center flex-wrap"
        >
          {/* Primary Button */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPrimaryClick}
            className="px-10 py-4 bg-white text-brand rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2 group"
          >
            {primaryButtonText}
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={20} />
            </motion.span>
          </motion.button>

          {/* Secondary Button */}
          {secondaryButtonText && (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSecondaryClick}
              className="px-10 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-brand transition-all duration-300"
            >
              {secondaryButtonText}
            </motion.button>
          )}
        </motion.div>

        {/* Trust message */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-brand-soft text-sm"
        >
          ✓ No credit card required • 10,000+ happy clients • ₹500Cr+ AUM
        </motion.p>
      </motion.div>
    </section>
  );
}
