"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PARTICLES = Array.from({ length: 8 }, (_, index) => index);

export default function Hero() {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const name = "Mohamed Mustafa";
  const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
  };
  const reveal = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 110, damping: 18 } },
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-[#f7f8ff] px-2 py-10 dark:border-white/10 dark:bg-[#0b1120] md:px-12 md:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 opacity-45 dark:opacity-100" style={{ backgroundImage: "linear-gradient(rgba(99,102,241,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,.07) 1px, transparent 1px)", backgroundSize: "52px 52px", maskImage: "linear-gradient(to bottom, black, transparent 80%)" }} />
        <motion.div className="absolute -left-24 top-12 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl dark:bg-violet-500/20" animate={{ x: [0, 55, 0], y: [0, -25, 0], scale: [1, 1.12, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute -bottom-28 right-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-400/15" animate={{ x: [0, -45, 0], scale: [1.08, 0.95, 1.08] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
        {PARTICLES.map((i) => (
          <motion.span key={i} className="absolute rounded-full bg-indigo-400/25 dark:bg-cyan-200/20" style={{ width: 6 + (i % 3) * 4, height: 6 + (i % 3) * 4, left: `${8 + i * 12}%`, top: `${15 + ((i * 13) % 72)}%` }} animate={{ y: [0, -18 - i, 0], x: [0, i % 2 ? 7 : -7, 0], opacity: [0.25, 0.8, 0.25] }} transition={{ duration: 4.5 + i * 0.35, repeat: Infinity, ease: "easeInOut" }} />
        ))}
      </div>

      <motion.div variants={container} initial="hidden" animate="visible" className="relative z-10 mx-auto max-w-5xl rounded-[2rem] border border-white/60 bg-white/45 p-7 shadow-[0_22px_70px_-35px_rgba(67,56,202,.28)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045] dark:shadow-[0_22px_90px_-35px_rgba(0,0,0,.8)] md:p-11">
        <motion.div variants={reveal} className="mb-7 flex flex-wrap items-center gap-5 md:gap-6">
          <motion.button type="button" aria-label="View Mohamed Mustafa's profile photo" onClick={() => setIsImageOpen(true)} className="relative shrink-0 rounded-full p-1 outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/60" whileHover={{ scale: 1.05, rotate: 3 }} whileTap={{ scale: 0.97 }}>
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-cyan-400 to-violet-500 blur-lg opacity-40" />
            <span className="relative block rounded-full bg-gradient-to-br from-indigo-500 via-cyan-400 to-violet-500 p-[3px] shadow-xl shadow-indigo-500/25">
              <img src={asset("images/me2.jpeg")} alt="Mohamed Mustafa" className="h-20 w-20 rounded-full border-2 border-white object-cover dark:border-slate-800 md:h-24 md:w-24" />
            </span>
          </motion.button>

          <div>
            <motion.div variants={reveal} className="mb-2 flex items-center gap-3">
              <span className="h-1 w-10 rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400" />
              <span className="flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 shadow-sm dark:border-cyan-300/15 dark:bg-white/[0.055] dark:text-cyan-200"><motion.span animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>✦</motion.span> Hi, I’m</span>
            </motion.div>
            <h1 className="text-3xl  font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-50 md:text-6xl lg:text-7xl">
              {name.split("").map((letter, index) => <motion.span key={`${letter}-${index}`} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 + index * 0.035, type: "spring", stiffness: 150, damping: 15 }} whileHover={{ y: -4, scale: 1.06 }} className="inline-block cursor-default hover:bg-gradient-to-r hover:from-violet-500 hover:via-indigo-500 hover:to-cyan-400 hover:bg-clip-text hover:text-transparent">{letter === " " ? "\u00A0" : letter}</motion.span>)}
            </h1>
          </div>
        </motion.div>

        <motion.div variants={reveal} className="max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 md:text-xl">
          <p className="mb-5">A dedicated <span className="font-semibold text-transparent bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 bg-clip-text dark:from-cyan-200 dark:to-violet-300">Front-End Developer</span> focused on creating responsive, fast, and visually polished web applications.</p>
          <p>I blend clean code with modern technologies to build engaging user experiences that look great and perform even better.</p>
        </motion.div>

        <motion.div variants={reveal} className="mt-10 inline-flex items-center gap-3 rounded-full border border-slate-200/80 bg-white/60 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/[0.045] dark:text-slate-300">
          <span className="relative flex h-3 w-3"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" /><span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" /></span>
          Available for new opportunities
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isImageOpen && (
          <motion.div className="fixed inset-0 z-[70] grid place-items-center bg-slate-900/60 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsImageOpen(false)} role="dialog" aria-modal="true" aria-label="Mohamed Mustafa profile photo">
            <motion.div className="relative w-full max-w-xl" initial={{ opacity: 0, scale: 0.88, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: "spring", stiffness: 260, damping: 24 }} onClick={(event) => event.stopPropagation()}>
              <img src={asset("images/me2.jpeg")} alt="Mohamed Mustafa — full size" className="w-full rounded-3xl border border-white/20 shadow-2xl" />
              <button type="button" onClick={() => setIsImageOpen(false)} aria-label="Close profile photo" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-slate-800 shadow-lg transition hover:scale-105 hover:bg-white focus-visible:ring-4 focus-visible:ring-cyan-400">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 6 12 12M18 6 6 18" /></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
