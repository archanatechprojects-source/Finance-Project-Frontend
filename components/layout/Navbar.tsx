"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import BookingModal from "@/components/BookingModal";
import LoginModal from "@/components/LoginModal";

const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "How It Works", id: "workflow" },
  { name: "Growth", id: "growth" },
  // { name: "Services", id: "services" },
  // { name: "Products", id: "products" },
  { name: "Why Us", id: "why-us" },
  { name: "Calculator", id: "calculator" },
  { name: "Success Stories", id: "success-stories" },
  // { name: "Partners", id: "partners" },
  // { name: "FAQ", id: "faq" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const [openBooking, setOpenBooking] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-2 sm:top-4 lg:top-5 left-0 right-0 z-50 w-full px-2 sm:px-0"
      >
        {/* Expanded max-width wrapper for premium desktop displays */}
        <div className="w-full max-w-[1700px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12">
          <div
            className={`
              flex items-center justify-between
              h-16 sm:h-18 lg:h-20
              rounded-xl sm:rounded-2xl
              transition-all duration-500
              ${
                scrolled
                  ? "bg-white/90 backdrop-blur-xl border border-white/50 shadow-[0_20px_60px_rgba(15,23,42,0.08)] px-4 sm:px-6"
                  : "bg-white/50 backdrop-blur-md border border-white/20 px-4 sm:px-6 lg:px-8"
              }
            `}
          >
            {/* Logo */}
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-3 group text-left"
            >
              <motion.div 
                whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                className="h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 rounded-xl bg-linear-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-500/20"
              >
                <span className="text-white font-bold text-sm sm:text-base lg:text-lg tracking-tight">OI</span>
              </motion.div>

              <div className="hidden md:block">
                <h6 className="font-bold text-sm lg:text-base text-slate-900 tracking-tight transition-colors group-hover:text-blue-600">
                 At Olive Investment Services
                </h6>
                {/* <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                  Private Financial Advisory
                </p> */}
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center gap-1 bg-slate-900/5 p-1.5 rounded-full backdrop-blur-sm">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative px-5 py-2 transition-colors duration-300"
                >
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-white shadow-sm rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <span
                    className={`
                      relative z-10 text-sm font-semibold tracking-wide transition-colors duration-300
                      ${activeSection === item.id ? "text-blue-600" : "text-slate-600 hover:text-slate-900"}
                    `}
                  >
                    {item.name}
                  </span>
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden xl:flex items-center gap-4">
              <button
                onClick={() =>setOpenLogin(true)}
                className="text-sm font-semibold text-slate-600 hover:text-blue-600"
              >
                LOGIN
              </button>

              <motion.button 
                whileHover={{ scale: 1.03, boxShadow: "0 20px 30px rgba(37, 99, 235, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOpenBooking(true)}
                className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/10 transition-all"
              >
                Schedule Call
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </motion.button>
            </div>

            {/* Mobile Toggle */}
            <button
              className="xl:hidden text-slate-800 p-2 hover:bg-slate-100 rounded-xl transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-md z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed top-20 sm:top-24 left-3 right-3 sm:left-4 sm:right-4 z-50 rounded-2xl bg-white shadow-2xl border border-slate-100 p-4 sm:p-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`
                      w-full text-left px-4 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-medium
                      transition-all duration-200
                      ${
                        activeSection === item.id
                          ? "bg-blue-50 text-blue-600 font-semibold"
                          : "hover:bg-slate-50 text-slate-700"
                      }
                    `}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  setOpenLogin(true);
                  setIsOpen(false);
                }}
                className="w-full mt-4 border border-slate-300 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-600 hover:bg-slate-50 hover:text-slate-700"
              >
                LOGIN
              </button>
              <button className="w-full mt-4 py-3.5 rounded-xl bg-linear-to-r from-blue-600 to-cyan-600 text-white font-semibold text-sm sm:text-base shadow-xl shadow-blue-500/10">
                Schedule Consultation
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BookingModal
        open={openBooking}
        onClose={() =>
          setOpenBooking(false)
        }
      />
      <LoginModal
        open={openLogin}
        onClose={() =>
          setOpenLogin(false)
        }
      />
    </>
  );
}
