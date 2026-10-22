"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDown,
  Sparkles,
  FileDown,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Code2,
  Terminal,
  Globe,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

// Asset resolution helper with Vite base URL support
const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const PORTRAIT_SRC = asset("images/me2.jpeg");
const LOGO_SRC = asset("images/icon.png");
const CV_URL = `${import.meta.env.BASE_URL}Mohamed_Mustafa_CV.pdf`;

// Core technological disciplines requested
const CORE_TECH = [
  "React.js",
  "JavaScript (ES6+)",
  "Tailwind CSS",
  "HTML5 & CSS3",
  "Bootstrap",
  "Responsive Design",
];

// Apple-signature cubic-bezier easing curve
const appleEase = [0.16, 1, 0.3, 1];

// Orchestrated entrance animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: appleEase,
    },
  },
};

const portraitVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 28 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: appleEase,
      delay: 0.2,
    },
  },
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      aria-label="Introduction and personal overview"
      className="relative overflow-hidden bg-[#f7f8ff] dark:bg-black text-slate-900 dark:text-slate-100 transition-colors duration-500 border-b border-slate-200/70 dark:border-white/10 pb-10"
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. ATMOSPHERIC LIGHTING & SUBTLE DIFFUSE AMBIENT BACKDROP      */}
      {/* ------------------------------------------------------------- */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        {/* Soft, architectural grid lines — whisper light opacity */}
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(9, 104, 229, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(9, 104, 229, 0.06) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%)",
          }}
        />

        {/* Ambient Top Glow: Soft Indigo / Electric Blue (#0968e5) */}
        <div className="absolute -top-36 left-1/4 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-[#0968e5]/10 via-[#094dbf]/10 to-transparent blur-3xl dark:from-[#0968e5]/20 dark:via-[#091970]/25" />

        {/* Ambient Right Glow: Midnight Navy / Azure highlight */}
        <div className="absolute top-1/3 -right-24 h-[36rem] w-[36rem] rounded-full bg-gradient-to-bl from-[#0968e5]/10 via-[#091970]/10 to-transparent blur-3xl dark:from-[#0968e5]/15 dark:via-[#091970]/30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 pt-8 sm:pt-12 md:pt-16 ">
        {/* ----------------------------------------------------------- */}
        {/* 2. EDITORIAL MASTHEAD (BRAND IDENTITY & AVAILABILITY BAR)   */}
        {/* ----------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: appleEase }}
          className="hidden flex-wrap items-center justify-between gap-2 rounded-[1.35rem] border border-slate-200/70 p-2 pb-3 shadow-[0_12px_35px_rgba(9,25,112,0.06)] backdrop-blur-2xl transition-colors dark:border-white/10 dark:shadow-black/20 sm:gap-4 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:pb-12 sm:shadow-none sm:backdrop-blur-none lg:flex"
        >
          {/* Personal Logo & Brand Wordmark */}
          <div className="flex w-full min-w-0 items-center gap-2 sm:gap-3 lg:w-auto">
            <div className="relative hidden h-10 w-10 shrink-0 overflow-hidden rounded-[0.8rem] border border-slate-200/90 bg-gradient-to-r from-[#091970] via-[#094dbf] to-[#0968e5] p-1 shadow-sm dark:border-white/15 dark:bg-neutral-900 sm:block">
              <img
                src={LOGO_SRC}
                alt="Mohammed Mustafa personal brand logo"
                className="h-full w-full object-contain"
                loading="eager"
              />
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-[10px] font-black uppercase tracking-tight text-slate-900 dark:text-white sm:text-sm">
                Mohammed Mustafa
              </span>
              <span className="truncate text-[8px] font-mono tracking-[0.1em] text-slate-500 dark:text-slate-400 sm:text-[11px] sm:tracking-wider">
                Full-Stack  Developer
              </span>
            </div>
          </div>

          {/* Availability Status Badge & Geography */}
          <div className="flex w-full items-center gap-2 text-xs text-slate-600 dark:text-slate-300 sm:w-auto sm:gap-6">
            <div className="hidden md:flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-mono">
              <MapPin className="w-3.5 h-3.5 text-[#0968e5]" />
              <span>Cairo, Egypt · Worldwide</span>
            </div>
          </div>
        </motion.div>

        {/* ----------------------------------------------------------- */}
        {/* 3. MAIN EDITORIAL BODY: ASYMMETRICAL 12-COLUMN COMPOSITION  */}
        {/* ----------------------------------------------------------- */}
        <div className="grid grid-cols-1 gap-8 pt-8 sm:gap-10 sm:pt-12 md:gap-14 md:pt-14 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          {/* LEFT COLUMN: EDITORIAL TYPOGRAPHY & STORY (7 COLS) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-last flex flex-col items-start space-y-6 sm:space-y-7 lg:order-none lg:col-span-7"
          >
            {/* Oversized Apple-Grade Headline */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.15rem] xl:text-[4.5rem] font-black tracking-tight leading-[1.06] text-slate-900 dark:text-white">
                Building web experiences with{" "}
                <span className="bg-gradient-to-r from-[#091970] via-[#094dbf] to-[#0968e5] bg-clip-text text-transparent">
                  clarity, craft,
                </span>{" "}
                and precision.
              </h1>
            </motion.div>

            {/* Editorial Narrative */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl"
            >
              Hi, I’m{" "}
              <strong className="font-bold text-slate-900 dark:text-white">
                Mohammed Mustafa
              </strong>
              , a dedicated Full-Stack  Developer. I engineer responsive,
              performant web applications and component-driven interfaces that
              combine architectural rigor with fluid, intuitive user
              experiences.
            </motion.p>

            {/* CTA Action Cluster: Exact Requested Blue Gradient */}
            <motion.div
              variants={itemVariants}
              className="flex w-full flex-wrap items-center justify-center gap-3.5 pt-2 sm:w-auto sm:justify-start sm:gap-4"
            >
              {/* Primary CTA: "Explore My Work" with requested gradient and reverse hover */}
              <button
                type="button"
                onClick={scrollToProjects}
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm sm:text-base font-bold text-white shadow-xl shadow-[#091970]/20 hover:shadow-[#0968e5]/35 transition-all duration-300 overflow-hidden bg-gradient-to-r from-[#091970] via-[#094dbf] to-[#0968e5] hover:from-[#0968e5] hover:via-[#094dbf] hover:to-[#091970] cursor-pointer"
              >
                <span className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 transform -skew-x-12" />
                <span className="relative z-10">Explore My Work</span>
                <ArrowDown className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>

              {/* Secondary CTA: "Get In Touch" minimal ghost button */}
              <a
                href="https://wa.me/201003154481"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm sm:text-base font-bold text-slate-800 dark:text-white bg-white/90 dark:bg-white/[0.05] border border-slate-300/80 dark:border-white/15 hover:border-[#0968e5] dark:hover:border-[#0968e5] hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] dark:text-[#55e98b]" />
                <span>Get In Touch</span>
              </a>

              {/* Download CV Minimal Pill */}
              <a
                href={CV_URL}
                download="Mohamed_Mustafa_CV.pdf"
                className="inline-flex items-center gap-1.5 px-5 py-4 rounded-full text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#0968e5] dark:hover:text-[#7ab3ff] transition-colors"
                title="Download Mohamed Mustafa's CV"
              >
                <FileDown className="w-4 h-4 text-[#0968e5]" />
                <span className="underline underline-offset-4 decoration-slate-300 dark:decoration-white/20 hover:decoration-[#0968e5]">
                  Resume
                </span>
              </a>
            </motion.div>

            {/* Social Connectivity Strip */}
            <motion.div
              variants={itemVariants}
              className="flex w-full items-center justify-center gap-3 pt-2 text-slate-500 dark:text-slate-400 sm:w-auto sm:justify-start"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Connect:
              </span>

              <a
                href="https://github.com/m7mdmstfa4422"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] text-slate-700 dark:text-slate-200 hover:text-[#0968e5] hover:border-[#0968e5] transition-all hover:scale-105"
                title="GitHub"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/mohammed-mustafa-416318362/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] text-slate-700 dark:text-slate-200 hover:text-[#0968e5] hover:border-[#0968e5] transition-all hover:scale-105"
                title="LinkedIn"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 text-[#0968e5]" />
              </a>

              <a
                href="mailto:mohammedmustafaibrahim02@gmail.com"
                className="p-2 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] text-slate-700 dark:text-slate-200 hover:text-[#0968e5] hover:border-[#0968e5] transition-all hover:scale-105"
                title="Email Direct"
                aria-label="Send direct email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </motion.div>

          
          </motion.div>

          {/* RIGHT COLUMN: EDITORIAL PORTRAIT SHOWCASE (5 COLS) */}
          <motion.div
            variants={portraitVariants}
            initial="hidden"
            animate="visible"
            className="relative hidden justify-center lg:order-none lg:col-span-5 lg:flex lg:justify-end "
          >
            <div className="relative w-full max-w-[9rem] sm:max-w-md">
              {/* Diffuse Editorial Aura behind portrait */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2 sm:-inset-6 rounded-[3rem] bg-gradient-to-tr from-[#091970]/15 via-[#094dbf]/15 to-[#0968e5]/20 blur-2xl dark:from-[#091970]/30 dark:via-[#094dbf]/25 dark:to-[#0968e5]/25 opacity-70"
              />

              {/* Architectural Editorial Picture Monolith */}
              <div className="relative rounded-full sm:rounded-[2.75rem] p-1.5 sm:p-3.5 bg-white/80 dark:bg-white/[0.05] border border-[#0968e5]/20 sm:border-white dark:border-white/15 shadow-[0_12px_35px_rgba(9,104,229,0.16)] sm:shadow-2xl sm:shadow-[#091970]/10 dark:shadow-black/60 backdrop-blur-xl">
                {/* Image Viewport Frame */}
                <div className="relative aspect-square sm:aspect-[4/5] w-full overflow-hidden rounded-full sm:rounded-[2.25rem] bg-slate-100 dark:bg-black border border-[#0968e5]/15 sm:border-slate-200/70 dark:border-white/10">
                  <img
                    src={PORTRAIT_SRC}
                    alt="Mohammed Mustafa — Full-Stack  Developer portrait"
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                    loading="eager"
                  />

                  {/* Gentle editorial vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />

                  {/* Corner Authentic Logo Seal */}
                  <div className="absolute top-2 left-2 hidden items-center gap-1 sm:top-4 sm:left-4 sm:flex sm:gap-2 sm:px-3 sm:py-1.5 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-md border border-white/40 dark:border-white/15 shadow-sm">
                    <img
                      src={LOGO_SRC}
                      alt="Logo mark"
                      className="w-3 h-3 sm:w-4 sm:h-4 object-contain"
                    />
                    <span className="text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                      Verified Identity
                    </span>
                  </div>

                  {/* Editorial Nameplate on Image Base */}
                  <div className="absolute hidden sm:block inset-x-4 bottom-4 p-4 rounded-2xl bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/60 dark:border-white/15 shadow-lg">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <h2 className="text-[11px] sm:text-lg font-black tracking-tight text-slate-900 dark:text-white">
                          Mohammed Mustafa
                        </h2>
                        <p className="text-[8px] leading-tight sm:text-xs sm:leading-normal font-semibold text-[#0968e5] dark:text-[#7ab3ff]">
                          Full-Stack  Developer &amp; UI Architect
                        </p>
                      </div>

                      <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 hidden text-center sm:block">
                  <p className="text-sm font-black tracking-tight text-slate-900 dark:text-white">
                    Mohammed Mustafa
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold text-[#0968e5] dark:text-[#7ab3ff]">
                    Full-Stack  Developer
                  </p>
                </div>

                {/* Editorial Metadata Caption underneath frame */}
                <div className="mt-2.5 hidden px-2 items-center justify-between text-[10px] sm:mt-3 sm:flex sm:text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span>PLATE // 01</span>
                  <span>UI CRAFT · 2026</span>
                </div>
              </div>

              <div className="mt-3 text-center sm:hidden">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#0968e5]/15 bg-white/75 px-3 py-1.5 shadow-sm backdrop-blur-md dark:border-[#7ab3ff]/15 dark:bg-white/[0.06]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0968e5] dark:bg-[#7ab3ff]" />
                  <span className="text-[11px] font-bold tracking-tight text-slate-800 dark:text-white">
                    Mohammed Mustafa
                  </span>
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#0968e5] dark:text-[#7ab3ff]" />
                </div>
                <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Full-Stack  Developer
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      
      </div>
    </section>
  );
}
