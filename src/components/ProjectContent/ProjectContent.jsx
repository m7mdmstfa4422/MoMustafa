"use client";
/* eslint-disable no-unused-vars */

import { useEffect, useState, useCallback, useMemo } from "react";
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
  Zap,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Standard lightweight animation variants (Low CPU/GPU footprint)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

export default function ProjectContent({ project, allProjects = [] }) {
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Gallery array fallback
  const gallery = useMemo(() => {
    if (project?.gallery?.length) return project.gallery;
    if (project?.image) return [project.image];
    return ["/placeholder.svg"];
  }, [project?.gallery, project?.image]);

  const currentImage = gallery[selectedImageIndex] || gallery[0];

  // Reset selected image index when project changes
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [project?.id]);

  // Lock body scroll when lightbox is open (Mobile Safari safe)
  useEffect(() => {
    if (isLightboxOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isLightboxOpen]);

  // Gallery navigation handlers
  const handlePrevImage = useCallback(() => {
    setSelectedImageIndex((i) => (i + gallery.length - 1) % gallery.length);
  }, [gallery.length]);

  const handleNextImage = useCallback(() => {
    setSelectedImageIndex((i) => (i + 1) % gallery.length);
  }, [gallery.length]);

  // Keyboard navigation for gallery & lightbox
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (event.key === "ArrowLeft") {
        handlePrevImage();
      } else if (event.key === "ArrowRight") {
        handleNextImage();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handlePrevImage, handleNextImage]);

  // Find previous and next project for bottom navigation (Robust string matching)
  const { prevProject, nextProject } = useMemo(() => {
    if (!allProjects.length) return { prevProject: null, nextProject: null };
    const currentIndex = allProjects.findIndex(
      (p) => String(p.id) === String(project?.id)
    );
    const prev =
      currentIndex > 0
        ? allProjects[currentIndex - 1]
        : allProjects[allProjects.length - 1];
    const next =
      currentIndex >= 0 && currentIndex < allProjects.length - 1
        ? allProjects[currentIndex + 1]
        : allProjects[0];
    return { prevProject: prev, nextProject: next };
  }, [allProjects, project?.id]);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2400);
    }
  };

  const domainDisplay = useMemo(() => {
    if (!project?.link) return "mohamed-portfolio.local";
    return project.link.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }, [project?.link]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
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
              <span className="px-4 py-1.5 rounded-full bg-white/90 dark:bg-[#091970]/40 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                {project.year}
              </span>
            )}
            {project?.role && (
              <span className="px-4 py-1.5 rounded-full bg-white/90 dark:bg-[#091970]/40 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10">
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

          {/* Step 2: Headline & Gradient Subtitle */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.08] text-slate-950 dark:text-white">
              {project?.title}
            </h1>

            {project?.subtitle && (
              <p className="text-lg sm:text-2xl md:text-3xl font-semibold tracking-tight text-transparent bg-gradient-to-r from-[#0968e5] via-[#4592ff] to-[#091970] dark:from-[#3b8bfd] dark:via-[#7ab3ff] dark:to-cyan-300 bg-clip-text max-w-3xl mx-auto leading-snug">
                {project.subtitle}
              </p>
            )}
          </motion.div>

          {/* Step 3: Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal"
          >
            {project?.description}
          </motion.p>

          {/* Step 4: Centered Action Buttons & Tech Icons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-6 pt-4"
          >
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              {/* Live Demo */}
              {project?.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm sm:text-base font-bold text-white shadow-xl shadow-[#091970]/30 hover:shadow-[#0968e5]/40 transition-all duration-200 overflow-hidden bg-gradient-to-r from-[#091970] via-[#083c9c] to-[#0968e5] hover:scale-105 active:scale-95 border border-[#0968e5]/40"
                >
                  <ExternalLink className="w-4 h-4 relative z-10 text-[#7ab3ff] group-hover:text-white transition-colors" />
                  <span className="relative z-10">Live Demo</span>
                </a>
              )}

              {/* View Source (GitHub) */}
              {project?.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group inline-flex items-center rounded-full p-[2px] bg-gradient-to-r from-[#0968e5] via-[#4592ff] to-[#091970] shadow-lg shadow-[#091970]/20 hover:shadow-[#0968e5]/30 hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-[#050b2b] group-hover:bg-opacity-80 dark:group-hover:bg-opacity-70 transition-colors text-sm sm:text-base font-bold text-slate-800 dark:text-white">
                    <Github className="w-4 h-4 text-[#0968e5] dark:text-[#3b8bfd]" />
                    <span>View Source</span>
                  </span>
                </a>
              ) : (
                <div
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-slate-100/90 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-500 cursor-not-allowed select-none text-sm sm:text-base font-semibold"
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
              <button
                type="button"
                onClick={handleShare}
                className="relative group inline-flex items-center rounded-full p-[2px] bg-gradient-to-r from-[#0968e5]/50 via-blue-400/30 to-[#091970] shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                title="Copy share link"
              >
                <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white dark:bg-[#050b2b] group-hover:bg-opacity-80 dark:group-hover:bg-opacity-70 transition-colors text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {copiedLink ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-bounce" />
                      <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 text-[#0968e5] dark:text-[#3b8bfd]" />
                      <span className="text-xs font-bold">Share</span>
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Tech Stack Icons */}
            {project?.icons?.length ? (
              <div className="flex items-center justify-center gap-2.5 pt-2 flex-wrap">
                {project.icons.map((src, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/90 dark:bg-[#091970]/40 border border-slate-200/80 dark:border-[#0968e5]/20 p-2 flex items-center justify-center shadow-sm hover:border-[#0968e5] hover:scale-110 transition-all"
                    title="Technology"
                  >
                    <img
                      src={src}
                      alt="Tech"
                      className="w-full h-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </motion.div>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* 2. APPLE STUDIO DISPLAY SHOWCASE                              */}
      {/* ------------------------------------------------------------- */}
      <motion.section variants={itemVariants} className="mb-14">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 shadow-2xl shadow-[#091970]/[0.08] backdrop-blur-none sm:backdrop-blur-xl dark:border-[#0968e5]/25 dark:bg-[#091970]/20 dark:shadow-black/60 p-3 sm:p-5 md:p-6 transition-colors">
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
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0968e5]/10 hover:bg-[#0968e5]/20 border border-[#0968e5]/30 text-[#0968e5] dark:text-[#3b8bfd] transition-all font-semibold cursor-pointer shadow-xs active:scale-95"
                title="View Fullscreen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Expand</span>
              </button>
            </div>
          </div>

          {/* Uncropped Image Viewport Canvas */}
          <div className="relative flex items-center justify-center min-h-[260px] sm:min-h-[420px] md:min-h-[500px] py-3 px-2 rounded-2xl bg-gradient-to-b from-[#0968e5]/5 via-white/80 to-slate-100/60 border border-slate-200/60 shadow-inner dark:from-[#091970]/40 dark:via-[#050b2b]/80 dark:to-[#091970]/40 dark:border-white/5 overflow-hidden">
            {/* Ambient Background Glow (Safe CSS radial without GPU blur thrashing) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-30 transition-opacity"
              style={{
                backgroundImage: `radial-gradient(circle at center, rgba(9,104,229,0.35), rgba(9,25,112,0.2) 65%, transparent 85%)`,
              }}
            />

            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={currentImage}
                alt={`${project?.title || "Project"} preview ${selectedImageIndex + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                decoding="async"
                fetchPriority="high"
                className="max-h-[500px] w-auto h-auto max-w-full object-contain rounded-xl shadow-xl shadow-[#091970]/20 dark:shadow-black/60 cursor-zoom-in relative z-10"
                onClick={() => setIsLightboxOpen(true)}
              />
            </AnimatePresence>

            {/* Chevrons for gallery pagination */}
            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full bg-white/95 dark:bg-[#091970]/95 border border-slate-200 dark:border-[#0968e5]/30 hover:border-[#0968e5] text-slate-700 dark:text-slate-200 shadow-xl active:scale-90 transition-transform cursor-pointer"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full bg-white/95 dark:bg-[#091970]/95 border border-slate-200 dark:border-[#0968e5]/30 hover:border-[#0968e5] text-slate-700 dark:text-slate-200 shadow-xl active:scale-90 transition-transform cursor-pointer"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails Strip (VRAM optimized with lazy decoding) */}
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
                        : "border-slate-200 dark:border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      loading="lazy"
                      decoding="async"
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
          <div className="mt-8 rounded-[2rem] border border-white/80 bg-white/90 shadow-xl shadow-[#091970]/[0.05] dark:border-[#0968e5]/20 dark:bg-[#091970]/20 p-4 sm:p-6">
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
                playsInline
                preload="metadata"
                className="w-full max-h-[460px] object-contain mx-auto"
              />
            </div>
          </div>
        )}
      </motion.section>

      {/* ------------------------------------------------------------- */}
      {/* 3. APPLE BENTO SPECIFICATIONS                                 */}
      {/* ------------------------------------------------------------- */}
      <motion.section variants={itemVariants} className="mb-14 space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#0968e5]" />
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Architecture &amp; Key Highlights
          </h2>
        </div>

        {/* Bento Cards Sub-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {project?.features?.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-5 sm:p-6 rounded-[1.75rem] border border-white/80 bg-white/90 shadow-sm dark:border-[#0968e5]/15 dark:bg-[#091970]/20 hover:border-[#0968e5]/40 transition-colors"
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
            </div>
          ))}
        </div>

        {/* Bento Strip: Tech Stack Tags */}
        {project?.tags?.length ? (
          <div className="p-5 sm:p-6 rounded-[1.75rem] border border-white/80 bg-white/90 shadow-sm dark:border-[#0968e5]/15 dark:bg-[#091970]/20">
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
          </div>
        ) : null}
      </motion.section>

      {/* ------------------------------------------------------------- */}
      {/* 4. BOTTOM NEXT / PREV PROJECT EXPLORER                        */}
      {/* ------------------------------------------------------------- */}
      <motion.footer variants={itemVariants} className="pt-10 border-t border-slate-200/80 dark:border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {prevProject ? (
            <button
              type="button"
              onClick={() => navigate(`/projects/${prevProject.id}`)}
              className="group relative flex items-center justify-between p-5 rounded-2xl border border-white/80 bg-white/90 hover:bg-white dark:border-[#0968e5]/15 dark:bg-[#091970]/25 dark:hover:bg-[#091970]/40 transition-all text-left shadow-sm hover:shadow-md overflow-hidden cursor-pointer active:scale-98"
            >
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
            </button>
          ) : <div />}

          {nextProject ? (
            <button
              type="button"
              onClick={() => navigate(`/projects/${nextProject.id}`)}
              className="group relative flex items-center justify-between p-5 rounded-2xl border border-white/80 bg-white/90 hover:bg-white dark:border-[#0968e5]/15 dark:bg-[#091970]/25 dark:hover:bg-[#091970]/40 transition-all text-right shadow-sm hover:shadow-md overflow-hidden cursor-pointer active:scale-98"
            >
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
            </button>
          ) : <div />}
        </div>
      </motion.footer>

      {/* ------------------------------------------------------------- */}
      {/* 5. FULLSCREEN LIGHTBOX MODAL (SAFE BACKDROP & SCROLL LOCK)     */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col justify-between p-4 sm:p-6 bg-slate-950/90 backdrop-blur-sm sm:backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
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
              <img
                key={currentImage}
                src={currentImage}
                alt={project?.title}
                decoding="async"
                className="max-h-[80vh] max-w-full object-contain rounded-2xl shadow-2xl"
              />

              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/15 hover:bg-[#0968e5]/40 text-white transition-transform active:scale-90 cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/15 hover:bg-[#0968e5]/40 text-white transition-transform active:scale-90 cursor-pointer"
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
