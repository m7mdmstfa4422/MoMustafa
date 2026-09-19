"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Mail,
  FileDown,
  ArrowUp,
  MapPin,
  ExternalLink,
  Terminal,
  Server,
  Cpu,
  Database,
  ArrowRight,
} from "lucide-react";

const CV_URL = `${import.meta.env.BASE_URL}Mohamed_Mustafa_CV.pdf`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative md:ps-20 border-t border-slate-200/80 dark:border-white/10 pt-16 pb-24 sm:pb-12 px-4 sm:px-8 md:px-14 bg-[#f7f8ff] dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      {/* ------------------------------------------------------------- */}
      {/* ATMOSPHERIC BACKGROUND MESH                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-40 dark:opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(rgba(9, 104, 229, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(9, 104, 229, 0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "linear-gradient(to bottom, black 15%, transparent 95%)",
          }}
        />
        <div className="absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-gradient-to-br from-[#0968e5]/20 to-[#091970]/30 blur-3xl" />
        <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-gradient-to-tl from-[#091970]/30 to-[#0968e5]/15 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
      

        {/* ----------------------------------------------------------- */}
        {/* 2. MAIN FOOTER SITEMAP & BRAND NAVIGATION                   */}
        {/* ----------------------------------------------------------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start"
        >
          {/* Brand & Identity Column (5 cols) */}
          <motion.div variants={itemVariants} className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#091970] via-[#094dbf] to-[#0968e5] flex items-center justify-center shadow-lg shadow-[#0968e5]/25">
                <span className="text-white font-black text-lg">Mo</span>
              </div>
              <div>
                <h4 className="text-xl font-black text-slate-900 dark:text-white">Mohammed Mustafa</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Front-End Developer &amp; UI Architect</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Crafting production-grade digital products with mathematical UI precision, modern component architectures, and scalable Node.js backend integration.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#0968e5]" />
              <span>Cairo, Egypt · Available Worldwide</span>
            </div>
          </motion.div>

          {/* Quick Navigation Links (3 cols) */}
          <motion.div variants={itemVariants} className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
              Quick Navigation
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm font-semibold">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("skills");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-[#0968e5] dark:hover:text-[#7ab3ff] transition-colors cursor-pointer text-left"
                >
                  Technical Skills &amp; Stack
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("projects");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-[#0968e5] dark:hover:text-[#7ab3ff] transition-colors cursor-pointer text-left"
                >
                  Featured Projects
                </button>
              </li>
              <li>
                <Link
                  to="/Allprojects"
                  className="hover:text-[#0968e5] dark:hover:text-[#7ab3ff] transition-colors inline-flex items-center gap-1"
                >
                  <span>Complete Project Archive</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <a
                  href={CV_URL}
                  download="Mohamed_Mustafa_CV.pdf"
                  className="hover:text-[#0968e5] dark:hover:text-[#7ab3ff] transition-colors inline-flex items-center gap-1"
                >
                  <span>Download Curriculum Vitae</span>
                  <FileDown className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Connect & Direct Channels (4 cols) */}
          <motion.div variants={itemVariants} className="md:col-span-4 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
              Connect &amp; Socials
            </h5>

            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://github.com/m7mdmstfa4422"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200/80 bg-white/70 dark:border-white/10 dark:bg-white/[0.04] hover:border-[#0968e5] transition-colors text-xs font-bold text-slate-800 dark:text-slate-100"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.92.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.95 10.95 0 012.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.44-2.7 5.42-5.28 5.7.41.35.77 1.04.77 2.09 0 1.5-.01 2.71-.01 3.08 0 .3.21.66.79.55C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
                </svg>
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/mohammed-mustafa-416318362/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200/80 bg-white/70 dark:border-white/10 dark:bg-white/[0.04] hover:border-[#0968e5] transition-colors text-xs font-bold text-slate-800 dark:text-slate-100"
              >
                <svg className="w-4 h-4 fill-current shrink-0 text-[#0968e5]" viewBox="0 0 24 24">
                  <path d="M19 0H5C2.238 0 0 2.238 0 5v14c0 2.762 2.238 5 5 5h14c2.762 0 5-2.238 5-5V5c0-2.762-2.238-5-5-5zM7.5 19H4V8.99h3.5V19zM6 7.21a1.99 1.99 0 110-3.98 1.99 1.99 0 010 3.98zM20 19h-3.5v-4.41c0-1.05-.02-2.4-1.46-2.4-1.46 0-1.68 1.14-1.68 2.33V19H10V8.99h3.36v1.37h.05c.47-.89 1.62-1.83 3.33-1.83C19.62 8.53 20 11.1 20 13.89V19z" />
                </svg>
                <span>LinkedIn</span>
              </a>

              <a
                href="https://wa.me/201003154481"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200/80 bg-white/70 dark:border-white/10 dark:bg-white/[0.04] hover:border-emerald-500 transition-colors text-xs font-bold text-slate-800 dark:text-slate-100"
              >
                <span className="text-emerald-500 text-sm">💬</span>
                <span>WhatsApp</span>
              </a>

              <a
                href="mailto:mohammedmustafaibrahim02@gmail.com"
                className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200/80 bg-white/70 dark:border-white/10 dark:bg-white/[0.04] hover:border-[#0968e5] transition-colors text-xs font-bold text-slate-800 dark:text-slate-100"
              >
                <Mail className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Email</span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* ----------------------------------------------------------- */}
        {/* 3. COPYRIGHT & BACK TO TOP BAR                              */}
        {/* ----------------------------------------------------------- */}
        <div className="pt-6 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Mohammed Mustafa. Engineered with React 19 &amp; Tailwind CSS.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/80 bg-white/80 dark:border-white/10 dark:bg-white/[0.04] hover:border-[#0968e5] hover:text-[#0968e5] dark:hover:text-[#7ab3ff] transition-all cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}