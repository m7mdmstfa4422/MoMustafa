"use client";
/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Maximize2,
  X,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Globe,
  Share2,
  Sparkles,
  Layers,
  Cpu,
  Zap,
  Lock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Apple-signature spring curve & quintic ease
const appleSpring = { type: "spring", stiffness: 380, damping: 30 };
const appleEase = [0.16, 1, 0.3, 1];

// Orchestrated Staggered Container Variants - 0.3s
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.1,
    },
  },
};

// Cascading Child Item Variants
const itemVariants = {
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

// Bento Grid Sub-container Stagger
const bentoContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.05,
    },
  },
};

export default function ProjectContent({ project, allProjects = [] }) {
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Gallery array fallback
  const gallery = project?.gallery?.length
    ? project.gallery
    : project?.image
      ? [project.image]
      : ["/placeholder.svg"];

  const currentImage = gallery[selectedImageIndex] || gallery[0];

  // Set document title
  useEffect(() => {
    if (project?.title) {
      document.title = `${project.title} — Case Study | Mohamed Mustafa`;
    }
  }, [project?.title]);

  // Reset selected image index when project changes
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [project?.id]);

  // Keyboard navigation for gallery & lightbox
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        if (isLightboxOpen) setIsLightboxOpen(false);
      }
      if (event.key === "ArrowLeft") {
        setSelectedImageIndex((i) => (i + gallery.length - 1) % gallery.length);
      }
      if (event.key === "ArrowRight") {
        setSelectedImageIndex((i) => (i + 1) % gallery.length);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [gallery.length, isLightboxOpen]);

  // Find previous and next project for bottom navigation
  const currentIndex = allProjects.findIndex((p) => p.id === project?.id);
  const prevProject =
    currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject =
    currentIndex >= 0 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : allProjects[0];

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2400);
    }
  };

  const domainDisplay = project?.link
    ? project.link.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "mohamed-portfolio.local";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-14 text-slate-900 dark:text-slate-100 font-sans"
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. CASE STUDY HEADER (PROGRESSIVE STAGGERED REVEAL)           */}
      {/* ------------------------------------------------------------- */}
      <header className="mb-12 space-y-6">
        <div className="text-center max-w-5xl mx-auto space-y-6">
          {/* Step 1: Status & Category Tags (Centered Pills) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-bold"
          >
            <span className="px-4 py-1.5 rounded-full bg-[#0968e5]/10 text-[#0968e5] dark:text-[#3b8bfd] border border-[#0968e5]/30 shadow-sm shadow-[#0968e5]/10">
              {project?.category}
            </span>
            {project?.year && (
              <span className="px-4 py-1.5 rounded-full bg-white/80 dark:bg-[#091970]/30 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                {project.year}
              </span>
            )}
            {project?.role && (
              <span className="px-4 py-1.5 rounded-full bg-white/80 dark:bg-[#091970]/30 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                {project.role}
              </span>
            )}
            {project?.status && (
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/25 text-xs font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                {project.status}
              </span>
            )}
          </motion.div>

          {/* Step 2: Giant Headline & Gradient Subtitle */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] text-slate-950 dark:text-white">
              {project?.title}
            </h1>

            {project?.subtitle && (
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-transparent bg-gradient-to-r from-[#0968e5] via-[#4592ff] to-[#091970] dark:from-[#3b8bfd] dark:via-[#7ab3ff] dark:to-cyan-300 bg-clip-text max-w-3xl mx-auto leading-snug">
                {project.subtitle}
              </p>
            )}
          </motion.div>

          {/* Step 3: Comfortable Centered Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-xl leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal"
          >
            {project?.description}
          </motion.p>

          {/* Step 4: Centered Action Buttons & Tech Icons Stack */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-6 pt-4"
          >
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              {/* Live Demo */}
              {project?.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative group inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm sm:text-base font-bold text-white shadow-xl shadow-[#091970]/50 hover:shadow-[#0968e5]/40 transition-all duration-300 overflow-hidden bg-gradient-to-r from-[#091970] via-[#083c9c] to-[#0968e5] hover:from-[#0b218f] hover:via-[#094bbd] hover:to-[#227bff] border border-[#0968e5]/40"
                >
                  <span className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 transform -skew-x-12" />
                  <ExternalLink className="w-4 h-4 relative z-10 text-[#7ab3ff] group-hover:text-white transition-colors group-hover:rotate-12" />
                  <span className="relative z-10">Live Demo</span>
                </motion.a>
              )}

              {/* View Source (GitHub) */}
              {project?.github ? (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative group inline-flex items-center rounded-full p-[2px] bg-gradient-to-r from-[#0968e5] via-[#4592ff] to-[#091970] shadow-lg shadow-[#091970]/30 hover:shadow-[#0968e5]/30 transition-all duration-300"
                >
                  <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white dark:bg-[#050b2b] group-hover:bg-opacity-80 dark:group-hover:bg-opacity-70 transition-colors text-sm sm:text-base font-bold text-slate-800 dark:text-white">
                    <Github className="w-4 h-4 text-[#0968e5] dark:text-[#3b8bfd] transition-transform group-hover:rotate-12" />
                    <span>View Source</span>
                  </span>
                </motion.a>
              ) : (
                <div
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-500 cursor-not-allowed select-none text-sm sm:text-base font-semibold backdrop-blur-md"
                  title="Source code is private or confidential"
                >
                  <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <span className="line-through decoration-slate-400/50">Private Repo</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400">
                    Restricted
                  </span>
                </div>
              )}

              {/* Share Button */}
              <motion.button
                type="button"
                onClick={handleShare}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="relative group inline-flex items-center rounded-full p-[2px] bg-gradient-to-r from-[#0968e5]/50 via-blue-400/30 to-[#091970] shadow-xs hover:shadow-md hover:shadow-[#0968e5]/20 transition-all duration-300"
                title="Copy share link"
              >
                <span className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white dark:bg-[#050b2b] group-hover:bg-opacity-80 dark:group-hover:bg-opacity-70 transition-colors text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {copiedLink ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-bounce" />
                      <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 text-[#0968e5] dark:text-[#3b8bfd] group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold">Share</span>
                    </>
                  )}
                </span>
              </motion.button>
            </div>

            {/* Tech Stack Icons */}
            {project?.icons?.length ? (
              <div className="flex items-center justify-center gap-2.5 pt-2">
                {project.icons.map((src, i) => (
                  <div
                    key={i}
                    className="w-11 h-11 rounded-2xl bg-white/90 dark:bg-[#091970]/40 border border-slate-200/80 dark:border-[#0968e5]/20 p-2 flex items-center justify-center shadow-sm backdrop-blur-md hover:border-[#0968e5] hover:scale-110 transition-all"
                    title="Technology"
                  >
                    <img src={src} alt="Tech" className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            ) : null}
          </motion.div>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* 2. APPLE STUDIO DISPLAY SHOWCASE (STAGGERED REVEAL)           */}
      {/* ------------------------------------------------------------- */}
      <motion.section variants={itemVariants} className="mb-14">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 shadow-2xl shadow-[#091970]/[0.08] backdrop-blur-2xl dark:border-[#0968e5]/25 dark:bg-[#091970]/15 dark:shadow-black/60 p-3 sm:p-5 md:p-6 transition-colors">
          {/* macOS Safari Chrome Bar */}
          <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-200/80 dark:border-white/10 px-2">
            {/* Traffic light dots */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/10 shadow-xs" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/10 shadow-xs" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/10 shadow-xs" />
            </div>

            {/* URL Pill */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100/90 dark:bg-[#091970]/40 border border-slate-200/80 dark:border-[#0968e5]/20 text-xs font-mono text-slate-500 dark:text-slate-400 max-w-sm truncate">
              <Globe className="w-3.5 h-3.5 text-[#0968e5] shrink-0" />
              <span className="truncate">{domainDisplay}</span>
            </div>

            {/* View controls */}
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-mono text-[11px]">
                {selectedImageIndex + 1} / {gallery.length}
              </span>
              <motion.button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0968e5]/10 hover:bg-[#0968e5]/20 border border-[#0968e5]/30 text-[#0968e5] dark:text-[#3b8bfd] transition-all font-semibold cursor-pointer shadow-xs"
                title="View Fullscreen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Expand</span>
              </motion.button>
            </div>
          </div>

          {/* Uncropped Image Viewport Canvas */}
          <div className="relative flex items-center justify-center min-h-[320px] sm:min-h-[440px] md:min-h-[520px] py-4 px-2 rounded-2xl bg-gradient-to-b from-[#0968e5]/5 via-white/70 to-slate-100/50 border border-slate-200/60 shadow-inner dark:from-[#091970]/40 dark:via-[#050b2b]/70 dark:to-[#091970]/40 dark:border-white/5 overflow-hidden">
            {/* Ambient Glow behind active screenshot */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-25 dark:opacity-35 blur-3xl transition-opacity"
              style={{
                backgroundImage: `radial-gradient(circle at center, #0968e5, #091970 70%, transparent 85%)`,
              }}
            />

            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={currentImage}
                alt={`${project?.title} preview ${selectedImageIndex + 1}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="max-h-[540px] w-auto h-auto max-w-full object-contain rounded-xl shadow-xl shadow-[#091970]/25 dark:shadow-black/60 cursor-zoom-in relative z-10"
                onClick={() => setIsLightboxOpen(true)}
              />
            </AnimatePresence>

            {/* Chevrons for gallery pagination */}
            {gallery.length > 1 && (
              <>
                <motion.button
                  type="button"
                  onClick={() =>
                    setSelectedImageIndex((i) => (i + gallery.length - 1) % gallery.length)
                  }
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-white/95 to-slate-100/95 dark:from-[#091970]/95 dark:to-[#050b2b]/95 border border-white/80 dark:border-[#0968e5]/30 hover:border-[#0968e5] text-slate-700 dark:text-slate-200 shadow-xl backdrop-blur-md transition-all cursor-pointer"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() =>
                    setSelectedImageIndex((i) => (i + 1) % gallery.length)
                  }
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-white/95 to-slate-100/95 dark:from-[#091970]/95 dark:to-[#050b2b]/95 border border-white/80 dark:border-[#0968e5]/30 hover:border-[#0968e5] text-slate-700 dark:text-slate-200 shadow-xl backdrop-blur-md transition-all cursor-pointer"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </>
            )}
          </div>

          {/* Thumbnails Strip */}
          {gallery.length > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2.5 overflow-x-auto py-2 px-1">
              {gallery.map((img, idx) => {
                const isActive = selectedImageIndex === idx;
                return (
                  <button
                    key={`${img}-${idx}`}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 sm:w-20 h-12 sm:h-14 rounded-xl overflow-hidden border transition-all shrink-0 p-0.5 cursor-pointer ${
                      isActive
                        ? "border-[#0968e5] ring-2 ring-[#0968e5]/40 scale-105 opacity-100 shadow-md shadow-[#0968e5]/25"
                        : "border-slate-200 dark:border-white/10 opacity-55 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-contain rounded-lg bg-slate-100 dark:bg-[#091970]/40"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Video Showcase (if available) */}
        {project?.video && (
          <div className="mt-8 rounded-[2rem] border border-white/80 bg-white/70 shadow-xl shadow-[#091970]/[0.05] backdrop-blur-xl dark:border-[#0968e5]/20 dark:bg-[#091970]/15 p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-[#0968e5]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Live Video Walkthrough
              </h3>
            </div>
            <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/50 dark:border-white/10 shadow-lg">
              <video
                src={project.video}
                controls
                className="w-full max-h-[460px] object-contain mx-auto"
              />
            </div>
          </div>
        )}
      </motion.section>

      {/* ------------------------------------------------------------- */}
      {/* 3. APPLE BENTO SPECIFICATIONS (STAGGERED REVEAL)              */}
      {/* ------------------------------------------------------------- */}
      <motion.section variants={itemVariants} className="mb-14 space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#0968e5]" />
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Architecture &amp; Key Highlights
          </h2>
        </div>

        {/* Bento Cards Sub-Grid */}
        <motion.div
          variants={bentoContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {project?.features?.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="flex items-start gap-4 p-5 sm:p-6 rounded-[1.75rem] border border-white/80 bg-white/70 shadow-lg shadow-[#091970]/[0.03] backdrop-blur-xl dark:border-[#0968e5]/15 dark:bg-[#091970]/20 hover:border-[#0968e5]/40 transition-colors"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#0968e5]/10 text-[#0968e5] dark:text-[#3b8bfd] border border-[#0968e5]/20 shadow-xs">
                <CheckCircle2 className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bento Strip: Tech Stack Tags */}
        {project?.tags?.length ? (
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-[1.75rem] border border-white/80 bg-white/70 shadow-lg shadow-[#091970]/[0.03] backdrop-blur-xl dark:border-[#0968e5]/15 dark:bg-[#091970]/20"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Technologies &amp; Libraries
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#0968e5]/25 bg-[#0968e5]/10 px-3.5 py-1.5 text-xs font-semibold text-[#0968e5] dark:text-[#7ab3ff]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ) : null}
      </motion.section>

      {/* ------------------------------------------------------------- */}
      {/* 4. BOTTOM NEXT / PREV PROJECT EXPLORER (STAGGERED REVEAL)     */}
      {/* ------------------------------------------------------------- */}
      <motion.footer variants={itemVariants} className="pt-10 border-t border-slate-200/80 dark:border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {prevProject ? (
            <motion.button
              type="button"
              onClick={() => navigate(`/projects/${prevProject.id}`)}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex items-center justify-between p-5 rounded-2xl border border-white/80 bg-white/70 hover:bg-white dark:border-[#0968e5]/15 dark:bg-[#091970]/25 dark:hover:bg-[#091970]/40 transition-all text-left shadow-md hover:shadow-xl hover:shadow-[#091970]/10 dark:hover:shadow-[#0968e5]/10 overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#0968e5]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-3 relative z-10">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 group-hover:bg-[#0968e5] group-hover:text-white transition-all">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </span>
                <div>
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Previous Project
                  </span>
                  <p className="text-base font-bold text-slate-900 dark:text-white">
                    {prevProject.title}
                  </p>
                </div>
              </div>
            </motion.button>
          ) : <div />}

          {nextProject ? (
            <motion.button
              type="button"
              onClick={() => navigate(`/projects/${nextProject.id}`)}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex items-center justify-between p-5 rounded-2xl border border-white/80 bg-white/70 hover:bg-white dark:border-[#0968e5]/15 dark:bg-[#091970]/25 dark:hover:bg-[#091970]/40 transition-all text-right shadow-md hover:shadow-xl hover:shadow-[#091970]/10 dark:hover:shadow-[#0968e5]/10 overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-l from-[#0968e5]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-end gap-3 w-full relative z-10">
                <div>
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Next Project
                  </span>
                  <p className="text-base font-bold text-slate-900 dark:text-white">
                    {nextProject.title}
                  </p>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 group-hover:bg-[#0968e5] group-hover:text-white transition-all">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.button>
          ) : <div />}
        </div>
      </motion.footer>

      {/* ------------------------------------------------------------- */}
      {/* 5. VISIONOS FULLSCREEN LIGHTBOX MODAL                         */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col justify-between p-4 sm:p-6 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Top Lightbox bar */}
            <div
              className="flex items-center justify-between max-w-6xl mx-auto w-full text-white pb-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{project?.title}</span>
                <span className="opacity-40">•</span>
                <span className="text-xs font-mono opacity-60">
                  {selectedImageIndex + 1} of {gallery.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Centered Large Uncropped Image */}
            <div
              className="flex-1 flex items-center justify-center p-2 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={currentImage}
                src={currentImage}
                alt={project?.title}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="max-h-[82vh] max-w-full object-contain rounded-2xl shadow-2xl"
              />

              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedImageIndex((i) => (i + gallery.length - 1) % gallery.length)
                    }
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/10 hover:bg-[#0968e5]/30 text-white backdrop-blur-md transition-transform active:scale-90 cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedImageIndex((i) => (i + 1) % gallery.length)
                    }
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/10 hover:bg-[#0968e5]/30 text-white backdrop-blur-md transition-transform active:scale-90 cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Lightbox instructions */}
            <div className="text-center text-xs font-mono text-white/50 pt-2">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">Esc</kbd> to close • Use <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">→</kbd> to navigate
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}