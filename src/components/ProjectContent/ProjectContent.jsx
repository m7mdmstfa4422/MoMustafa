"use client"

import React, { useRef, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ChevronRight, Sparkles, ExternalLink, Github, Palette, Zap, Calendar, Code } from "lucide-react"

export default function ProjectContent({ project }) {
  const ref = useRef(null)
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const data = project || {
    title: "Project Title",
    subtitle: "A short, polished summary that highlights the project's purpose and value.",
    category: "Web Design"
  }

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress,
    [0, 0.2, 0.4, 1],
    [0, 0.3, 1, 1]
  )
  const scale = useTransform(scrollYProgress,
    [0, 0.4],
    [0.96, 1]
  )

  const containerVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.99 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.08 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.99 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index)
  }

  const handleMainImageClick = () => {
    setIsLightboxOpen(true)
  }

  const handleNavigateLightbox = (direction) => {
    if (!project?.gallery?.length) return
    if (direction === 'next') {
      setSelectedImageIndex((prev) =>
        prev === project.gallery.length - 1 ? 0 : prev + 1
      )
    } else {
      setSelectedImageIndex((prev) =>
        prev === 0 ? project.gallery.length - 1 : prev - 1
      )
    }
  }

  useEffect(() => {
    document.title = (project?.title || "Title") + "| Project";
  }, []);


  const currentMainImage = project?.gallery?.[selectedImageIndex] || project?.gallery?.[0] || project?.image

  return (

    <motion.section
      ref={ref}
      className="relative px-6 md:px-8 py-16 md:py-24 transition-colors duration-300"
      style={{ opacity, scale }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Sky-themed animated gradient background */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0.06 }}
        animate={{ opacity: [0.06, 0.18, 0.06] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{
          background: `radial-gradient(700px 350px at 12% 24%, rgba(14,165,233,0.12), transparent 30%), radial-gradient(500px 260px at 88% 76%, rgba(56,189,248,0.10), transparent 35%)`,
          filter: "blur(44px)"
        }}
      />

      {/* Subtle moving blue stripes for depth */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-20 opacity-8"
        animate={{ backgroundPosition: ["0% 0%", "60% 40%", "0% 0%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(14,165,233,0.02) 0%, rgba(56,189,248,0.02) 50%, rgba(99,102,241,0.02) 100%)`,
          backgroundSize: "320% 320%"
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <motion.nav className="flex items-center gap-2 mb-8 text-sm" variants={item}>
          <motion.div whileHover={{ x: -3 }}>
            <Link
              to="/"
              className="flex items-center gap-2 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors group"
            >
              <Sparkles className="w-6 h-6" />
              Home
            </Link>
          </motion.div>
          <ChevronRight className="w-6 h-6 text-sky-400/60" />
          <motion.button
            type="button"
            onClick={() => {
              try {
                localStorage.setItem('scrollTo', 'projects')
                localStorage.setItem('showAllProjects', '1')
              } catch { }
              navigate('/')
            }}
            className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors cursor-pointer"
            whileHover={{ x: -2 }}
          >
            Projects
          </motion.button>
          <ChevronRight className="w-6 h-6 text-sky-400/60" />
          <span className="text-sky-800/80 dark:text-sky-300/80 font-semibold">
            {data.title}
          </span>
        </motion.nav>
        <motion.div
          className="rounded-4xl p-8 md:p-12 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-sky-100/40 dark:border-0 shadow-2xl"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-start">
            {/* Left: Content */}
            <motion.div className="lg:col-span-3 space-y-8" variants={itemVariants}>
              {/* Header Section */}
              <div className="space-y-4">
                <motion.h2
                  className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-sky-500 to-cyan-400 dark:from-white dark:via-sky-300 dark:to-cyan-300"
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05, duration: 0.6, ease: "easeOut" }}
                >
                  {project?.title || "Project Title"}
                </motion.h2>

                <div className="flex flex-wrap gap-3 items-center">
                  <div className="px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 text-sm font-medium">
                    {project?.category || "Web Development"}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-slate-400">Yesr : {project?.year || ""}</div>
                </div>
              </div>

              {/* Description */}
              <motion.p
                className="text-lg text-gray-700 dark:text-slate-300 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                {project?.description || "A comprehensive project showcasing modern web development practices with focus on performance, accessibility, and user experience."}
              </motion.p>

              {/* Feature Highlights (softer cards) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <motion.div
                  className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 border border-sky-50 dark:border-0 shadow-soft"
                  whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.22 } }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center mb-3">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-sky-400 rounded-lg" />
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Project Overview</h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400">Modern web application built with clean UI, smooth interactions and performant code.</p>
                </motion.div>

                <motion.div
                  className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 border border-sky-50 dark:border-0 shadow-soft"
                  whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.22 } }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center mb-3">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-sky-400 rounded-lg" />
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Technical Stack</h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400">React, Vite, Tailwind, Framer Motion — focused on developer DX and UX.</p>
                </motion.div>
              </div>

              {/* Technologies */}
              <motion.div className="pt-4" variants={itemVariants}>
                <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Technologies Used</h5>
                <div className="flex flex-wrap gap-3">
                  {project?.icons && project.icons.length > 0 ? (
                    project.icons.map((src, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.12, y: -3 }}
                        className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-sky-100 dark:border-0 shadow-sm transition-all"
                      >
                        <img src={src} alt={`tech-${i}`} className="w-8 h-8 object-contain" />
                      </motion.div>
                    ))
                  ) : (
                    <div className="flex flex-wrap gap-3">
                      {["React", "Vite", "Tailwind"].map((tech, i) => (
                        <div key={i} className="px-4 py-2 bg-sky-100 dark:bg-sky-900/20 rounded-full text-sm text-sky-700 dark:text-sky-300">
                          {tech}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Action Buttons: sky gradient and glass button */}
              <motion.div className="flex flex-wrap gap-4 pt-6 items-center" variants={itemVariants}>
                <motion.a
                  href={project?.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-3 rounded-full text-white font-semibold shadow-lg"
                  style={{
                    background: "linear-gradient(90deg, #0ea5e9, #0284c7, #06b6d4)",
                    backgroundSize: "200% 200%"
                  }}
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Preview project"
                >
                  <ExternalLink className="w-5 h-5" />
                  Preview
                </motion.a>

                <motion.a
                  href={project?.github || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-sky-100 dark:border-0 text-gray-900 dark:text-white font-semibold backdrop-blur shadow-sm"
                  whileHover={{ scale: 1.02, y: -2, boxShadow: "0 8px 30px rgba(14,165,233,0.12)" }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="View source"
                >
                  <Github className="w-5 h-5" />
                  Source
                </motion.a>

              </motion.div>
            </motion.div>

            {/* Right: Gallery */}
            <motion.div className="lg:col-span-2 space-y-6" variants={itemVariants}>
              {/* Main image card with gentle float */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                onClick={handleMainImageClick}
                className="relative overflow-hidden rounded-[32px] shadow-2xl cursor-pointer group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 opacity-16 blur-2xl z-0 group-hover:opacity-28 transition-opacity" />
                <motion.img
                  key={selectedImageIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  src={currentMainImage || project?.image || "/placeholder.svg"}
                  alt="main gallery"
                  className="relative w-full aspect-[16/10] object-cover rounded-[28px] z-10"
                />
                {/* Overlay badges */}
                <div className="absolute right-4 top-4 bg-black/60 text-white text-sm px-3 py-1.5 rounded-full backdrop-blur z-30 font-medium">
                  {selectedImageIndex + 1} / {(project?.gallery?.length) || 1}
                </div>
                <div className="absolute left-4 top-4 bg-white/90 dark:bg-slate-900/90 text-gray-900 dark:text-white text-sm px-3 py-1.5 rounded-full backdrop-blur z-30 font-medium">
                  Zoom
                </div>
              </motion.div>

              {/* Thumbnails: sky accents */}
              {project?.gallery && project.gallery.length > 1 && (
                <motion.div className="grid grid-cols-4 gap-3" variants={itemVariants}>
                  {project.gallery.map((img, i) => (
                    <motion.button
                      key={i}
                      onClick={() => handleThumbnailClick(i)}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative overflow-hidden rounded-2xl aspect-square transition-shadow shadow-sm ${selectedImageIndex === i
                        ? "ring-2 ring-sky-400/60 shadow-[0_6px_30px_rgba(14,165,233,0.08)]"
                        : "ring-1 ring-sky-50 dark:ring-sky-800 hover:shadow-md"
                        }`}
                      aria-label={`Open thumbnail ${i + 1}`}
                    >
                      <img src={img || "/placeholder.svg"} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                      <div className={`absolute inset-0 ${selectedImageIndex === i ? "bg-sky-400/10" : "bg-black/0 hover:bg-black/4"} transition-colors`} />
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLightboxOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 20 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-8"
            >
              <motion.button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close lightbox"
              >
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </motion.button>

              <div className="relative max-w-6xl w-full">
                <motion.img
                  key={selectedImageIndex}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.35 }}
                  src={currentMainImage}
                  alt="lightbox"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />

                <motion.button
                  onClick={() => handleNavigateLightbox('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </motion.button>

                <motion.button
                  onClick={() => handleNavigateLightbox('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </motion.button>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur">
                  {selectedImageIndex + 1} / {project?.gallery?.length || 1}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.section>
  )
}