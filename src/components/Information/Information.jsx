"use client";
/* eslint-disable no-unused-vars */

import { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

// Project Data repository
import { projectsData } from "../../data/projectsData";

// Components imports
import ProjectContent from "../ProjectContent/ProjectContent";
import Footer from "../Footer/Footer";

export default function Information() {
  const { id } = useParams();

  // Find project by ID with robust string matching
  const project = useMemo(() => {
    if (!id) return projectsData[0] || null;
    const found = projectsData.find((p) => String(p.id) === String(id));
    return found || null;
  }, [id]);

  // Instant scroll-to-top on route change to prevent mobile Safari layout thrashing
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [id]);

  // Dynamic Document Title
  useEffect(() => {
    if (project?.title) {
      document.title = `${project.title} — Case Study | Mohamed Mustafa`;
    }
  }, [project?.title]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#f7f8ff] dark:bg-[#0b1120] flex items-center justify-center p-6 text-slate-900 dark:text-slate-100 md:ml-20">
        <div className="text-center space-y-4 max-w-md">
          <span className="inline-block p-4 rounded-3xl bg-[#0968e5]/10 dark:bg-white/5 border border-[#0968e5]/20 dark:border-white/10 text-[#0968e5] dark:text-[#7ab3ff]">
            <Sparkles className="w-8 h-8" />
          </span>
          <h2 className="text-2xl font-black">Project Not Found</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            The requested project could not be located in the portfolio archive.
          </p>
          <Link
            to="/Allprojects"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#091970] via-[#094dbf] to-[#0968e5] text-white font-semibold text-sm hover:scale-105 transition-transform shadow-lg shadow-[#0968e5]/25"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse All Projects</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#f7f8ff] dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 overflow-x-hidden transition-colors duration-300">
      {/* ------------------------------------------------------------- */}
      {/* ATMOSPHERIC BACKGROUND (MOBILE GPU & MEMORY SAFE)             */}
      {/* ------------------------------------------------------------- */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* Subtle geometric grid */}
        <div
          className="absolute inset-0 opacity-40 dark:opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(rgba(9, 104, 229, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(9, 104, 229, 0.07) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            maskImage: "linear-gradient(to bottom, black 20%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent 95%)",
          }}
        />

        {/* Mobile Static Lightweight Glows (Zero blur raster overhead to prevent OOM) */}
        <div className="md:hidden absolute inset-0">
          <div
            className="absolute -top-16 -left-16 w-72 h-72 rounded-full opacity-30 dark:opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(9,104,229,0.3) 0%, rgba(9,25,112,0.15) 50%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-1/3 -right-16 w-72 h-72 rounded-full opacity-30 dark:opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(9,25,112,0.25) 0%, rgba(9,104,229,0.15) 50%, transparent 70%)",
            }}
          />
        </div>

        {/* Desktop Animated Glows (Enabled only on md+ viewports) */}
        <div className="hidden md:block absolute inset-0">
          {/* Ambient Top Left Glow */}
          <motion.div
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 -left-20 w-[32rem] h-[32rem] rounded-full bg-gradient-to-br from-[#0968e5]/20 to-[#091970]/25 blur-3xl"
          />

          {/* Ambient Right Glow */}
          <motion.div
            animate={{
              x: [0, -30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -right-24 w-[34rem] h-[34rem] rounded-full bg-gradient-to-tl from-[#091970]/25 via-[#094dbf]/15 to-[#0968e5]/15 blur-3xl"
          />

          {/* Ambient Bottom Glow */}
          <div className="absolute -bottom-28 left-1/3 w-[28rem] h-[28rem] rounded-full bg-[#0968e5]/10 blur-3xl dark:bg-[#091970]/20" />
        </div>
      </div>

      {/* Main layout container with desktop sidebar clearance */}
      <main className="relative z-10 md:ml-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <ProjectContent project={project} allProjects={projectsData} />
          </motion.div>
        </AnimatePresence>

        <Footer />
      </main>
    </div>
  );
}
