"use client";
/* eslint-disable no-unused-vars */

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Sparkles,
  Search,
  Code2,
  Cpu,
  Monitor,
  CheckCircle2,
  X,
  ArrowRight,
} from "lucide-react";

// Project Data
import { projectsData } from "../../data/projectsData";

// Components
import Sidebar from "../Sidebar/Sidebar";
import ProjectCard from "../ProjectCard/ProjectCard";
import Footer from "../Footer/Footer";

// Apple-signature spring curve
const appleSpring = { type: "spring", stiffness: 380, damping: 30 };

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

const cardVariants = {
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

const CATEGORIES = [
  { id: "all", label: "All Projects", icon: Layers },
  { id: "fullstack", label: "React & Full-Stack", icon: Cpu },
  { id: "javascript", label: "JavaScript & OOP", icon: Code2 },
  { id: "bootstrap", label: "Bootstrap & UI", icon: Monitor },
];

export default function LayoutPro() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Update document title
  useEffect(() => {
    document.title = "All Projects Archive — Mohamed Mustafa";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Filter projects by category and search query
  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      // Category filter
      const matchesCategory =
        activeCategory === "all" ||
        project.filterCategory === activeCategory ||
        (activeCategory === "fullstack" && (project.filterCategory === "react" || project.filterCategory === "fullstack"));

      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.subtitle?.toLowerCase().includes(q) ||
        project.category?.toLowerCase().includes(q) ||
        project.tags?.some((t) => t.toLowerCase().includes(q)) ||
        project.description?.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Counts per category for the pills
  const counts = useMemo(() => {
    return {
      all: projectsData.length,
      fullstack: projectsData.filter(
        (p) => p.filterCategory === "fullstack" || p.filterCategory === "react"
      ).length,
      javascript: projectsData.filter((p) => p.filterCategory === "javascript").length,
      bootstrap: projectsData.filter((p) => p.filterCategory === "bootstrap").length,
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#f7f8ff] dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 overflow-x-hidden font-sans transition-colors duration-300">
      {/* ------------------------------------------------------------- */}
      {/* ATMOSPHERIC APPLE MESH GRADIENTS (LIGHT & DARK)               */}
      {/* ------------------------------------------------------------- */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* Subtle geometric 52px grid */}
        <div
          className="absolute inset-0 opacity-45 dark:opacity-100"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,.06) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            maskImage: "linear-gradient(to bottom, black 25%, transparent 95%)",
          }}
        />

        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-20 w-[40rem] h-[40rem] rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-500/15"
        />

        <motion.div
          animate={{ x: [0, -45, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -right-24 w-[38rem] h-[38rem] rounded-full bg-cyan-400/15 blur-3xl dark:bg-cyan-500/12"
        />

        <motion.div
          animate={{ y: [0, -35, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-28 left-1/4 w-[34rem] h-[34rem] rounded-full bg-violet-400/15 blur-3xl dark:bg-violet-600/10"
        />
      </div>

      {/* Floating Apple Dock Sidebar */}
      <Sidebar />

      {/* Main Content with proper desktop clearance */}
      <main className="relative z-10 md:ml-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-12 md:py-20">
          {/* --------------------------------------------------------- */}
          {/* 1. APPLE-GRADE ARCHIVE HERO HEADER                        */}
          {/* --------------------------------------------------------- */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-12 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/80 dark:bg-white/5 border border-indigo-200/80 dark:border-white/10 text-indigo-600 dark:text-cyan-300 shadow-xs backdrop-blur-xl">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Projects Archive</span>
              <span className="opacity-30">•</span>
              <span>{projectsData.length} Creations</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white">
              All Projects &amp; Creations.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              A comprehensive showcase of responsive web applications, full-stack systems, modular
              logic, and high-performance user interfaces crafted by Mohamed Mustafa.
            </p>
          </motion.section>

          {/* --------------------------------------------------------- */}
          {/* 2. INTERACTIVE CONTROLS: CATEGORIES & SEARCH BAR          */}
          {/* --------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-12 flex flex-col lg:flex-row items-center justify-between gap-4"
          >
            {/* Apple Segmented Category Tabs */}
            <div className="flex flex-wrap items-center justify-center p-1.5 rounded-[1.75rem] border border-white/80 bg-white/70 shadow-lg shadow-indigo-950/[0.04] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.045]">
              {CATEGORIES.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeCategory === tab.id;
                const count = counts[tab.id];

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCategory(tab.id)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-colors outline-none cursor-pointer ${
                      isActive
                        ? "text-white"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFilterPill"
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#091970] via-[#094dbf] to-[#0968e5] shadow-md shadow-[#0968e5]/30"
                        transition={appleSpring}
                      />
                    )}
                    <Icon className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">{tab.label}</span>
                    <span
                      className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-200/70 dark:bg-white/10 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Live Search Bar */}
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects or tech..."
                className="w-full pl-10 pr-9 py-2.5 rounded-2xl border border-white/80 bg-white/70 shadow-xs backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-cyan-400/50 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>

          {/* --------------------------------------------------------- */}
          {/* 3. RESPONSIVE PROJECT CARDS GRID                          */}
          {/* --------------------------------------------------------- */}
          {filteredProjects.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${searchQuery}`}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20"
            >
              {filteredProjects.map((project) => (
                <motion.div key={project.id} variants={cardVariants} className="h-full">
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="py-20 text-center space-y-4">
              <span className="inline-block p-4 rounded-3xl bg-indigo-50 dark:bg-white/5 border border-indigo-100 dark:border-white/10 text-indigo-600 dark:text-cyan-400">
                <Search className="w-8 h-8" />
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                No projects match your criteria
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Try searching for a different keyword or select another category filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="px-5 py-2 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold hover:scale-105 transition-transform"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Global Footer */}
        <Footer />
      </main>
    </div>
  );
}
