"use client";

import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Layers,
  Cpu,
  Code2,
  Monitor,
} from "lucide-react";
import ProjectCard from "../ProjectCard/ProjectCard";
import { projectsData } from "../../data/projectsData";

const CATEGORIES = [
  { id: "all", label: "All Projects", icon: Layers },
  { id: "fullstack", label: "Full-Stack (Node & React)", icon: Cpu },
  { id: "javascript", label: "JavaScript & OOP", icon: Code2 },
  { id: "bootstrap", label: "Bootstrap & UI", icon: Monitor },
];

// Motion Timing Constants (0.4s Timing)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const revealVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  // Sorted projects descending by ID
  const sortedProjects = useMemo(() => {
    return [...projectsData].sort((a, b) => b.id - a.id);
  }, []);

  // Filter projects according to category
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return sortedProjects;
    return sortedProjects.filter((p) => {
      if (activeCategory === "fullstack") {
        return (
          p.filterCategory === "fullstack" ||
          p.tags?.some((t) => ["Node.js", "Express", "React"].includes(t))
        );
      }
      if (activeCategory === "javascript") {
        return (
          p.filterCategory === "javascript" ||
          (p.tags?.includes("JavaScript") && !p.tags?.includes("Node.js"))
        );
      }
      if (activeCategory === "bootstrap") {
        return (
          p.filterCategory === "bootstrap" ||
          p.tags?.some((t) => ["Bootstrap", "CSS", "HTML"].includes(t))
        );
      }
      return true;
    });
  }, [sortedProjects, activeCategory]);

  // Projects to display (Uniform Grid with Slice / Show More)
  const displayProjects = useMemo(() => {
    return showAll ? filteredProjects : filteredProjects.slice(0, 6);
  }, [filteredProjects, showAll]);

  return (
    <section
      id="projects"
      aria-label="Featured Projects Portfolio"
      className="relative px-4 sm:px-6 md:px-12 py-16 md:py-24 overflow-hidden bg-[#f7f8ff] dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 transition-colors duration-300"
    >
      {/* ------------------------------------------------------------- */}
      {/* ATMOSPHERIC BACKGROUND MESH                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-40 dark:opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(rgba(9, 104, 229, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(9, 104, 229, 0.06) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />

        <motion.div
          animate={{ x: [0, 45, 0], y: [0, -25, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-20 w-[36rem] h-[36rem] rounded-full bg-gradient-to-br from-[#0968e5]/20 to-[#091970]/25 blur-3xl"
        />

        <motion.div
          animate={{ x: [0, -40, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 -right-24 w-[36rem] h-[36rem] rounded-full bg-gradient-to-tl from-[#091970]/30 to-[#0968e5]/15 blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        {/* ----------------------------------------------------------- */}
        {/* 1. SECTION HEADER                                           */}
        {/* ----------------------------------------------------------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={revealVariants}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0968e5]/10 border border-[#0968e5]/30 text-[#091970] dark:text-[#7ab3ff] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#0968e5]" />
            <span>Featured Engineering Work</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Featured Work &amp; Case Studies
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            A curated portfolio of production web applications, full-stack architectures with Node.js and React, and interactive front-end systems.
          </p>
        </motion.div>

        {/* ----------------------------------------------------------- */}
        {/* 2. INTERACTIVE CATEGORY TABS SWITCHER                       */}
        {/* ----------------------------------------------------------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={revealVariants}
          className="flex justify-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center p-1.5 rounded-2xl border border-white/80 bg-white/75 shadow-md shadow-[#091970]/[0.04] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045] gap-1.5">
            {CATEGORIES.map(({ id, label, icon: Icon }) => {
              const isActive = activeCategory === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(id);
                    setShowAll(false);
                  }}
                  className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer outline-none ${
                    isActive
                      ? "text-white shadow-sm shadow-[#0968e5]/25"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="projectsTabPill"
                      className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-[#091970] via-[#094dbf] to-[#0968e5]"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ----------------------------------------------------------- */}
        {/* 3. UNIFORM PROJECTS GRID (ALL CARDS EXACT SAME SHAPE)       */}
        {/* ----------------------------------------------------------- */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {displayProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={revealVariants}
                className="h-full flex"
              >
                <div className="w-full flex flex-col">
                  <ProjectCard project={project} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ----------------------------------------------------------- */}
        {/* 4. ACTIONS & ARCHIVE BUTTONS                                */}
        {/* ----------------------------------------------------------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={revealVariants}
          className="text-center pt-6 flex flex-wrap items-center justify-center gap-4"
        >
          {filteredProjects.length > 6 && (
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="px-7 py-3.5 rounded-2xl bg-white dark:bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-white/15 font-bold text-sm shadow-xs hover:bg-slate-50 dark:hover:bg-white/15 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              {showAll ? "Show Less" : `View More (${filteredProjects.length} Projects)`}
            </button>
          )}

          <Link
            to="/Allprojects"
            className="relative group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#091970] via-[#094dbf] to-[#0968e5] hover:from-[#0968e5] hover:via-[#094dbf] hover:to-[#091970] text-white font-bold text-sm shadow-xl shadow-[#0968e5]/30 hover:shadow-[#0968e5]/50 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden cursor-pointer"
          >
            <span className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 transform -skew-x-12" />
            <span className="relative z-10">Explore Complete Archive</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}