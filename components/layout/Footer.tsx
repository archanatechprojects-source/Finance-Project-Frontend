"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Award,
  TrendingUp,
  Clock,
  UserCheck,
  Scale,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import BookingModal from "../BookingModal";
import { useState } from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  const [openBooking, setOpenBooking] = useState(false);

  return (
    <>
      <footer className="relative overflow-hidden bg-slate-950 text-white">
        {/* Background Gradients & Grid */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        <div className="relative z-10">
          {/* CTA Banner */}
          <div className="max-w-7xl mx-auto px-6 pt-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[36px] bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 p-[1px]"
            >
              <div className="rounded-[36px] bg-slate-950 px-8 py-12 lg:px-16 lg:py-16">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                  <div>
                    <p className="text-cyan-400 font-semibold">Start Your Wealth Journey</p>
                    <h2 className="mt-3 text-4xl lg:text-6xl font-bold leading-tight">
                      Let&apos;s Build Your{" "}
                      <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Financial Future
                      </span>
                    </h2>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setOpenBooking(true)}
                    className="px-8 py-4 rounded-2xl bg-white text-slate-900 font-semibold flex items-center gap-3 shadow-xl"
                  >
                    Book Consultation
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Footer Links & Info */}
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid lg:grid-cols-12 gap-14">
              
              {/* Brand Section */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center font-bold text-xl">
                    FW
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">FleetWise Wealth</h3>
                    <p className="text-slate-400">Financial Planning & Advisory</p>
                  </div>
                </div>

                <p className="mt-6 text-slate-400 leading-relaxed max-w-md">
                  Helping individuals, families and businesses build, preserve and transfer wealth through
                  disciplined financial planning and investment strategies.
                </p>

                {/* Trust Cards */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  {[
                    { icon: TrendingUp, value: "₹500Cr+", label: "Assets" },
                    { icon: Award, value: "15+", label: "Years" },
                    { icon: ShieldCheck, value: "10K+", label: "Clients" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                        <Icon size={18} className="text-cyan-400 mb-2" />
                        <h4 className="font-bold">{item.value}</h4>
                        <p className="text-xs text-slate-400">{item.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* New Content Column 1: Core Pillars */}
              <div className="lg:col-span-2">
                <h4 className="font-semibold text-lg mb-6">Our Pillars</h4>
                <ul className="space-y-4">
                  {[
                    { icon: ShieldCheck, text: "Unbiased Advice" },
                    { icon: UserCheck, text: "Client-Centric" },
                    { icon: Scale, text: "Fiduciary Duty" },
                    { icon: Clock, text: "Long-term Vision" },
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-slate-400">
                      <item.icon size={16} className="text-cyan-400 shrink-0" />
                      <span className="text-sm">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* New Content Column 2: Regulatory Credentials */}
              <div className="lg:col-span-2">
                <h4 className="font-semibold text-lg mb-6">Registrations</h4>
                <div className="space-y-4 text-sm text-slate-400">
                  <div>
                    <p className="text-white font-medium text-xs uppercase tracking-wider">AMFI Registered</p>
                    <p className="text-xs text-slate-500 mt-0.5">ARN-XXXXXX</p>
                  </div>
                  <div>
                    <p className="text-white font-medium text-xs uppercase tracking-wider">SEBI RIA Status</p>
                    <p className="text-xs text-slate-500 mt-0.5">INAXXXXXXXXX</p>
                  </div>
                  <div>
                    <p className="text-white font-medium text-xs uppercase tracking-wider">Corporate Identification</p>
                    <p className="text-xs text-slate-500 mt-0.5">UXXXXXKAXXXXPTCXXXXXX</p>
                  </div>
                </div>
              </div>

              {/* Contact Column */}
              <div className="lg:col-span-3">
                <h4 className="font-semibold text-lg mb-6">Contact</h4>
                <div className="space-y-5">
                  <div className="flex gap-3">
                    <MapPin size={18} className="text-cyan-400 mt-1" />
                    <p className="text-slate-400">Bengaluru, Karnataka, India</p>
                  </div>
                  <div className="flex gap-3">
                    <Phone size={18} className="text-cyan-400 mt-1" />
                    <p className="text-slate-400">+91 XXXXX XXXXX</p>
                  </div>
                  <div className="flex gap-3">
                    <Mail size={18} className="text-cyan-400 mt-1" />
                    <p className="text-slate-400">info@fleetwisewealth.com</p>
                  </div>
                </div>

                {/* Social Icons */}
                <div className="flex gap-3 mt-8">
                  {[FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter].map((Icon, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      whileHover={{ y: -4, scale: 1.1 }}
                      className="w-11 h-11 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center hover:bg-blue-600 transition"
                    >
                      <Icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Regulatory Disclaimer */}
            <div className="mt-16 p-6 rounded-3xl border border-white/10 bg-white/5">
              <p className="text-sm text-slate-400 leading-relaxed">
                Investments in securities markets are subject to market risks. Read all scheme related documents
                carefully before investing. Past performance does not guarantee future results. Financial planning
                and investment recommendations should be evaluated based on individual objectives and risk tolerance.
              </p>
            </div>

            {/* Copyright and Legal Links */}
            <div className="border-t border-white/10 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-slate-500 text-sm">
                &copy; {year} FleetWise Wealth. All Rights Reserved.
              </p>
              <div className="flex gap-6 text-sm">
                {["Privacy Policy", "Terms & Conditions", "Disclaimer"].map((text) => (
                  <Link key={text} href="#" className="text-slate-500 hover:text-white">
                    {text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      <BookingModal open={openBooking} onClose={() => setOpenBooking(false)} />
    </>
  );
}
// "use client";

// import Link from "next/link";
// import {
//   Mail,
//   Phone,
//   MapPin,
//   ArrowRight,
//   ShieldCheck,
//   Award,
//   TrendingUp,
// } from "lucide-react";

// import {
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
//   FaXTwitter,
// } from "react-icons/fa6";

// import { motion } from "framer-motion";

// export default function Footer() {
//   const year = new Date().getFullYear();

//   return (
//     <footer className="relative overflow-hidden bg-slate-950 text-white">
//       {/* Background Effects */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-0 left-0 w-125 h-125 bg-blue-600/10 rounded-full blur-3xl" />

//         <div className="absolute bottom-0 right-0 w-125 h-125 bg-cyan-500/10 rounded-full blur-3xl" />

//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[80px_80px]" />
//       </div>

//       <div className="relative z-10">
//         {/* CTA Banner */}
//         <div className="max-w-7xl mx-auto px-6 pt-20">
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="rounded-3xl bg-linear-to-r from-blue-600 via-cyan-500 to-emerald-500 p-px"
//           >
//             <div className="rounded-3xl bg-slate-950 px-8 py-12 lg:px-16 lg:py-16">
//               <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
//                 <div>
//                   <p className="text-cyan-400 font-semibold mb-3">
//                     Start Your Financial Journey
//                   </p>

//                   <h2 className="text-3xl lg:text-5xl font-bold leading-tight">
//                     Let&apos;s Build Your Wealth
//                     <span className="block text-transparent bg-linear-to-r from-cyan-400 to-emerald-400 bg-clip-text">
//                       Together.
//                     </span>
//                   </h2>
//                 </div>

//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-8 py-4 rounded-xl bg-white text-slate-900 font-semibold flex items-center gap-2"
//                 >
//                   Book Consultation
//                   <ArrowRight size={18} />
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Main Footer */}
//         <div className="max-w-7xl mx-auto px-6 py-20">
//           <div className="grid lg:grid-cols-12 gap-12">
//             {/* Brand */}
//             <div className="lg:col-span-5">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-14 h-14 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-xl font-bold">
//                   💼
//                 </div>

//                 <div>
//                   <h3 className="text-2xl font-bold">
//                     FleetWise Finance
//                   </h3>

//                   <p className="text-slate-400">
//                     Wealth Management Experts
//                   </p>
//                 </div>
//               </div>

//               <p className="text-slate-400 leading-relaxed max-w-md mb-8">
//                 Helping individuals and families create, grow,
//                 and preserve wealth through expert financial
//                 planning, investments, insurance, and retirement
//                 solutions.
//               </p>

//               {/* Trust Metrics */}
//               <div className="grid grid-cols-3 gap-4">
//                 {[
//                   {
//                     icon: TrendingUp,
//                     value: "₹500Cr+",
//                     label: "AUM",
//                   },
//                   {
//                     icon: Award,
//                     value: "15+",
//                     label: "Years",
//                   },
//                   {
//                     icon: ShieldCheck,
//                     value: "10K+",
//                     label: "Clients",
//                   },
//                 ].map((item) => {
//                   const Icon = item.icon;

//                   return (
//                     <div
//                       key={item.label}
//                       className="rounded-xl border border-white/10 bg-white/5 p-4"
//                     >
//                       <Icon
//                         size={18}
//                         className="text-cyan-400 mb-2"
//                       />

//                       <p className="font-bold text-lg">
//                         {item.value}
//                       </p>

//                       <p className="text-xs text-slate-400">
//                         {item.label}
//                       </p>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Quick Links */}
//             <div className="lg:col-span-2">
//               <h4 className="font-semibold text-lg mb-6">
//                 Company
//               </h4>

//               <div className="space-y-4">
//                 {[
//                   "Home",
//                   "About",
//                   "Services",
//                   "Products",
//                   "Contact",
//                 ].map((item) => (
//                   <Link
//                     key={item}
//                     href="#"
//                     className="block text-slate-400 hover:text-white transition-colors"
//                   >
//                     {item}
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {/* Services */}
//             <div className="lg:col-span-2">
//               <h4 className="font-semibold text-lg mb-6">
//                 Services
//               </h4>

//               <div className="space-y-4">
//                 {[
//                   "Financial Planning",
//                   "Mutual Funds",
//                   "Insurance",
//                   "Retirement",
//                   "Tax Planning",
//                 ].map((item) => (
//                   <Link
//                     key={item}
//                     href="#"
//                     className="block text-slate-400 hover:text-white transition-colors"
//                   >
//                     {item}
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {/* Contact */}
//             <div className="lg:col-span-3">
//               <h4 className="font-semibold text-lg mb-6">
//                 Contact
//               </h4>

//               <div className="space-y-5">
//                 <div className="flex gap-3">
//                   <MapPin
//                     size={18}
//                     className="text-cyan-400 mt-1"
//                   />
//                   <p className="text-slate-400">
//                     Bangalore, Karnataka,
//                     India
//                   </p>
//                 </div>

//                 <div className="flex gap-3">
//                   <Phone
//                     size={18}
//                     className="text-cyan-400 mt-1"
//                   />
//                   <p className="text-slate-400">
//                     +91 98765 43210
//                   </p>
//                 </div>

//                 <div className="flex gap-3">
//                   <Mail
//                     size={18}
//                     className="text-cyan-400 mt-1"
//                   />
//                   <p className="text-slate-400">
//                     info@fleetwisefinance.com
//                   </p>
//                 </div>
//               </div>

//               {/* Social */}
//               <div className="flex gap-3 mt-8">
//                 {[
//                   FaFacebookF,
//                   FaInstagram,
//                   FaLinkedinIn,
//                   FaXTwitter,
//                 ].map((Icon, i) => (
//                   <motion.a
//                     key={i}
//                     href="#"
//                     whileHover={{
//                       y: -4,
//                       scale: 1.1,
//                     }}
//                     className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-all"
//                   >
//                     <Icon size={18} />
//                   </motion.a>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Bottom */}
//           <div className="border-t border-white/10 mt-16 pt-8">
//             <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//               <p className="text-slate-500 text-sm">
//                 © {year} FleetWise Finance. All Rights Reserved.
//               </p>

//               <div className="flex gap-6 text-sm">
//                 <Link
//                   href="#"
//                   className="text-slate-500 hover:text-white"
//                 >
//                   Privacy Policy
//                 </Link>

//                 <Link
//                   href="#"
//                   className="text-slate-500 hover:text-white"
//                 >
//                   Terms
//                 </Link>

//                 <Link
//                   href="#"
//                   className="text-slate-500 hover:text-white"
//                 >
//                   Disclaimer
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }