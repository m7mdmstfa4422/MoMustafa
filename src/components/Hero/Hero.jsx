"use client";
/* eslint-disable no-unused-vars */

import { useState, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  FolderGit2,
  FileDown,
  Mail,
  Linkedin,
  Github,
  X,
  Code2,
  Cpu,
  Layers,
  CheckCircle2,
  Briefcase,
  MapPin,
  Terminal,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const PARTICLES = Array.from({ length: 9 }, (_, index) => index);
const CV_URL = `${import.meta.env.BASE_URL}Mohamed_Mustafa_CV.pdf`;

// Signature Apple / Cyber-luxury easing curve
const appleEase = [0.16, 1, 0.3, 1];
const springPhysics = { type: "spring", stiffness: 400, damping: 28 };

// Staggered Container Variants (0.3s timing requirement)
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.1,
    },
  },
};

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// Tech tags with #091970 and #0968e5 accents
const TECH_TAGS = [
  { name: "React 19", role: "UI Library" },
  { name: "Tailwind CSS", role: "Styling" },
  { name: "Vite", role: "Bundler" },
  { name: "Framer Motion", role: "Physics & Animation" },
  { name: "JavaScript ES6+", role: "Core Logic" },
  { name: "REST APIs", role: "Data Sync" },
];

export default function Hero() {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const cardRef = useRef(null);
  const name = "Mohamed Mustafa";
  const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

  // -------------------------------------------------------------
  // 1. TACTILE 3D CARD TILT & MOUSE PARALLAX (#091970 & #0968e5)
  // -------------------------------------------------------------
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useMotionValue(300);
  const spotY = useMotionValue(300);

  const springConfig = { stiffness: 240, damping: 24, mass: 0.4 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Smooth rotational 3D tilt
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  // Opposing Parallax for background orbs
  const orb1X = useTransform(mouseXSpring, [-0.5, 0.5], [-45, 45]);
  const orb1Y = useTransform(mouseYSpring, [-0.5, 0.5], [-35, 35]);
  const orb2X = useTransform(mouseXSpring, [-0.5, 0.5], [50, -50]);
  const orb2Y = useTransform(mouseYSpring, [-0.5, 0.5], [35, -35]);

  // Spotlight radial highlight using electric blue #0968e5
  const spotlightGradient = useMotionTemplate`radial-gradient(650px circle at ${spotX}px ${spotY}px, rgba(9, 104, 229, 0.18), transparent 75%)`;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    spotX.set(x);
    spotY.set(y);

    const xPct = x / rect.width - 0.5;
    const yPct = y / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-[#f7f8ff] px-3 sm:px-6 py-10 sm:py-16 md:py-24 dark:border-[#0968e5]/20 dark:bg-[#060b18] text-slate-900 dark:text-slate-100 transition-colors duration-300 [perspective:1400px]">
      {/* ------------------------------------------------------------- */}
      {/* AMBIENT MESH BACKDROP: #091970 (NAVY) & #0968e5 (ELECTRIC BLUE) */}
      {/* ------------------------------------------------------------- */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Subtle geometric 52px cyber grid */}
        <div
          className="absolute inset-0 opacity-40 dark:opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(rgba(9, 104, 229, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(9, 104, 229, 0.08) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            maskImage: "linear-gradient(to bottom, black 25%, transparent 90%)",
          }}
        />

        {/* Ambient Top Left Glow: #0968e5 (Electric Blue) */}
        <motion.div
          style={{ x: orb1X, y: orb1Y }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.35, 0.25] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-28 -top-20 h-96 w-96 rounded-full bg-gradient-to-br from-[#0968e5]/30 to-[#091970]/35 blur-3xl dark:from-[#0968e5]/35 dark:to-[#091970]/50"
        />

        {/* Ambient Bottom Right Glow: #091970 (Midnight Royal Navy) */}
        <motion.div
          style={{ x: orb2X, y: orb2Y }}
          animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.3, 0.45, 0.3] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 right-0 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tl from-[#091970]/40 via-[#0940b5]/25 to-[#0968e5]/25 blur-3xl"
        />

        {/* Dynamic Micro Particles */}
        {PARTICLES.map((i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-[#0968e5]/30 dark:bg-[#7ab3ff]/25"
            style={{
              width: 5 + (i % 3) * 3,
              height: 5 + (i % 3) * 3,
              left: `${8 + i * 11}%`,
              top: `${12 + ((i * 13) % 74)}%`,
            }}
            animate={{
              y: [0, -22 - i, 0],
              x: [0, i % 2 ? 8 : -8, 0],
              opacity: [0.25, 0.8, 0.25],
            }}
            transition={{ duration: 4.5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* RADICAL 3D CYBER-LUXURY HERO CONTAINER (#091970 & #0968e5)    */}
      {/* ------------------------------------------------------------- */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="group relative z-10 mx-auto max-w-6xl rounded-[2.5rem] border border-white/80 bg-white/75 shadow-2xl shadow-[#091970]/15 backdrop-blur-3xl dark:border-[#0968e5]/25 dark:bg-[#091970]/25 dark:shadow-black/60 p-6 sm:p-10 md:p-14 transition-all duration-200 ring-1 ring-[#0968e5]/15"
      >
        {/* Dynamic Cursor-Following Specular Spotlight */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
          style={{ background: spotlightGradient }}
        />

        {/* Specular Bevel Accent on Top Border */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-12 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#0968e5] to-transparent opacity-60 dark:opacity-80"
        />

        {/* Corner Tech Crosshairs (Cyber-Luxury Aesthetic) */}
        <span className="pointer-events-none absolute top-4 left-4 text-[#0968e5]/40 text-xs font-mono select-none">┌</span>
        <span className="pointer-events-none absolute top-4 right-4 text-[#0968e5]/40 text-xs font-mono select-none">┐</span>
        <span className="pointer-events-none absolute bottom-4 left-4 text-[#0968e5]/40 text-xs font-mono select-none">└</span>
        <span className="pointer-events-none absolute bottom-4 right-4 text-[#0968e5]/40 text-xs font-mono select-none">┘</span>

        {/* ----------------------------------------------------------- */}
        {/* ASYMMETRICAL 2-COLUMN LUXURY HERO LAYOUT                    */}
        {/* ----------------------------------------------------------- */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN: TYPOGRAPHY, HEADLINE & ACTIONS (8 COLS) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step 1: Futuristic Role Badge */}
            <motion.div variants={reveal} className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#0968e5]/30 bg-[#0968e5]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#091970] dark:text-[#7ab3ff] shadow-xs">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="text-[#0968e5] dark:text-[#3b8bfd]"
                >
                  ✦
                </motion.span>
                <span>Front-End Developer &amp; UI Architect</span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>Available for New Projects</span>
              </div>
            </motion.div>

            {/* Step 2: Interactive Kinetic Headline */}
            <motion.div variants={reveal} className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0968e5] dark:text-[#7ab3ff] block">
                Portfolio // 2026
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] text-slate-900 dark:text-white select-none">
                {name.split("").map((letter, index) => (
                  <motion.span
                    key={`${letter}-${index}`}
                    whileHover={{
                      y: -8,
                      scale: 1.16,
                      color: "#0968e5",
                      transition: springPhysics,
                    }}
                    className="inline-block cursor-default transition-colors duration-150"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </h1>

              <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#091970] via-[#0968e5] to-[#257cf0] dark:from-[#7ab3ff] dark:via-[#3b8bfd] dark:to-[#0968e5] bg-clip-text text-transparent pt-1">
                Engineering Digital Experiences with Mathematical Precision.
              </p>
            </motion.div>

            {/* Step 3: Value Proposition */}
            <motion.p variants={reveal} className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 max-w-2xl">
              Specialized in crafting modern web applications, high-performance user interfaces, and responsive architectural component libraries. Combining clean code with fluid 60fps Framer Motion physics.
            </motion.p>

            {/* Step 4: Interactive Micro Tech Badges */}
            <motion.div variants={reveal} className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-1 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#0968e5]" /> Stack:
              </span>
              {TECH_TAGS.map((tech) => (
                <motion.span
                  key={tech.name}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl border border-[#0968e5]/20 bg-[#0968e5]/5 hover:bg-[#0968e5]/15 px-3 py-1 text-xs font-semibold text-[#091970] dark:text-[#7ab3ff] transition-colors cursor-default shadow-xs"
                >
                  {tech.name}
                </motion.span>
              ))}
            </motion.div>

            {/* Step 5: High-Impact Action Hub (Colors: #091970 & #0968e5) */}
            <motion.div variants={reveal} className="pt-4 flex flex-wrap items-center gap-4">
              {/* Primary Button: #091970 via #094dbf to #0968e5 */}
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/Allprojects"
                  className="relative group inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-bold text-white shadow-xl shadow-[#0968e5]/30 hover:shadow-[#0968e5]/50 transition-all duration-300 overflow-hidden bg-gradient-to-r from-[#091970] via-[#094dbf] to-[#0968e5] hover:from-[#0968e5] hover:via-[#094dbf] hover:to-[#091970] cursor-pointer"
                >
                  <span className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 transform -skew-x-12" />
                  <FolderGit2 className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Explore All Projects</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Secondary Button: Gradient Border (#0968e5 to #091970) */}
              <motion.a
                href={CV_URL}
                download="Mohamed_Mustafa_CV.pdf"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative group inline-flex items-center rounded-2xl p-[2px] bg-gradient-to-r from-[#0968e5] via-[#257cf0] to-[#091970] shadow-md shadow-[#091970]/10 hover:shadow-[#0968e5]/30 transition-all duration-300 cursor-pointer"
              >
                <span className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[14px] bg-white dark:bg-[#070e24] group-hover:bg-opacity-80 dark:group-hover:bg-opacity-70 transition-colors text-sm font-bold text-[#091970] dark:text-white">
                  <FileDown className="w-4 h-4 text-[#0968e5] dark:text-[#7ab3ff] transition-transform group-hover:-translate-y-0.5" />
                  <span>Download CV</span>
                </span>
              </motion.a>

              {/* Social Quick Links */}
              <div className="flex items-center gap-2 sm:ml-2">
                <motion.a
                  href="https://github.com/m7mdmstfa4422"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-[#0968e5]/25 bg-white/80 dark:bg-white/10 shadow-xs text-slate-800 dark:text-white hover:border-[#0968e5] hover:text-[#0968e5] transition-colors"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/mohammed-mustafa-416318362/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-[#0968e5]/25 bg-white/80 dark:bg-white/10 shadow-xs text-slate-800 dark:text-white hover:border-[#0968e5] hover:text-[#0968e5] transition-colors"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: 3D CYBERNETIC AVATAR PORTAL & HIGHLIGHT STATS (4 COLS) */}
          <motion.div
            variants={reveal}
            className="lg:col-span-4 flex flex-col items-center justify-center relative"
          >
            {/* Holographic Avatar Frame with Dual Concentric Spinning Rings */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsImageOpen(true)}
              className="relative cursor-pointer group p-3"
            >
              {/* Ring 1: Outer Slow Spinning Cobalt Halo */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 rounded-[2.8rem] bg-gradient-to-tr from-[#091970] via-[#0968e5] to-[#38bdf8] opacity-60 blur-md group-hover:opacity-90 transition-opacity"
              />

              {/* Ring 2: Inner Fast Spinning Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1 rounded-[2.5rem] border border-[#0968e5]/40 opacity-75"
              />

              {/* Avatar Picture Squircle */}
              <div className="relative h-44 w-44 sm:h-52 sm:w-52 rounded-[2.2rem] p-[3px] bg-gradient-to-br from-[#0968e5] via-[#094dbf] to-[#091970] shadow-2xl shadow-[#091970]/30 overflow-hidden">
                <img
                  src={asset("images/me2.jpeg")}
                  alt="Mohamed Mustafa"
                  className="h-full w-full rounded-[2.1rem] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091970]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3 text-white text-xs font-bold">
                  <span>View Card</span>
                </div>
              </div>

              {/* Glowing Corner Badge */}
              <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-white dark:bg-[#070e24] border border-[#0968e5]/30 text-[11px] font-bold text-[#091970] dark:text-[#7ab3ff] shadow-lg flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#0968e5]" />
                <span>Frontend Dev</span>
              </div>
            </motion.div>

            {/* Quick Floating Stat Cards beneath Avatar */}
            <div className="mt-6 w-full max-w-xs grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl border border-white/80 bg-white/70 dark:border-[#0968e5]/20 dark:bg-[#091970]/30 text-center shadow-sm">
                <span className="block text-xl font-black text-[#0968e5] dark:text-[#3b8bfd]">9+</span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Live Projects</span>
              </div>

              <div className="p-3 rounded-2xl border border-white/80 bg-white/70 dark:border-[#0968e5]/20 dark:bg-[#091970]/30 text-center shadow-sm">
                <span className="block text-xl font-black text-[#0968e5] dark:text-[#3b8bfd]">100%</span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Responsive UI</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ------------------------------------------------------------- */}
      {/* LUXURY PROFILE MODAL (#091970 & #0968e5 BRANDING)              */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isImageOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 p-4 sm:p-6 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Mohamed Mustafa profile showcase"
          >
            <motion.div
              className="relative w-full max-w-lg rounded-[2.5rem] border border-[#0968e5]/30 bg-white/95 dark:bg-[#070e24]/95 shadow-2xl shadow-[#091970]/40 p-5 sm:p-7 backdrop-blur-3xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsImageOpen(false)}
                aria-label="Close profile modal"
                className="absolute right-5 top-5 z-20 grid h-10 w-10 place-items-center rounded-full bg-slate-950/70 text-white backdrop-blur-md transition-transform hover:scale-105 hover:bg-slate-950 cursor-pointer shadow-lg"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Photo Frame */}
              <div className="relative aspect-square w-full rounded-[1.8rem] overflow-hidden border border-[#0968e5]/25 shadow-xl mb-5">
                <img
                  src={asset("images/me2.jpeg")}
                  alt="Mohamed Mustafa"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091970]/80 via-transparent to-transparent" />
                <div className="absolute inset-x-5 bottom-4 text-white">
                  <h3 className="text-2xl font-black">{name}</h3>
                  <p className="text-sm font-semibold text-[#7ab3ff]">Front-End Developer &amp; UI Architect</p>
                </div>
              </div>

              {/* Floating Highlight Information Dock */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-100/80 dark:bg-[#091970]/30 border border-slate-200/80 dark:border-[#0968e5]/20 text-slate-700 dark:text-slate-200">
                  <Briefcase className="w-4 h-4 text-[#0968e5] shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Status</span>
                    <span className="font-bold">Production Ready</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-100/80 dark:bg-[#091970]/30 border border-slate-200/80 dark:border-[#0968e5]/20 text-slate-700 dark:text-slate-200">
                  <MapPin className="w-4 h-4 text-[#0968e5] shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Location</span>
                    <span className="font-bold">Egypt · Worldwide</span>
                  </div>
                </div>

                <div className="col-span-2 flex items-center justify-between p-3 rounded-2xl bg-[#0968e5]/10 border border-[#0968e5]/25 text-[#091970] dark:text-[#7ab3ff]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0968e5]" />
                    <span className="font-bold">Core Stack:</span>
                    <span className="font-medium text-slate-600 dark:text-slate-300">React, Tailwind, Vite &amp; Framer Motion</span>
                  </div>
                </div>
              </div>

              {/* Action in Modal */}
              <div className="mt-5 flex items-center justify-end gap-2">
                <a
                  href={CV_URL}
                  download="Mohamed_Mustafa_CV.pdf"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#091970] to-[#0968e5] hover:opacity-95 text-white font-bold text-xs shadow-md shadow-[#0968e5]/30 transition-all"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download Resume</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
