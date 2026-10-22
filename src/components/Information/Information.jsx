"use client";

import { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

// Project Data repository
import { projectsData } from "../../data/projectsData";

// Components imports
import ProjectContent from "../ProjectContent/ProjectContent";
import Footer from "../Footer/Footer";

export default function Information() {
  const { id } = useParams();

  // Find project by ID (safely handles strings, numbers, trailing slashes)
  const project = useMemo(() => {
    if (!id) return projectsData[0];
    const cleanId = String(id).replace(/\/+$/, "").trim();
    const found = projectsData.find((p) => String(p.id) === cleanId);
    return found || null;
  }, [id]);

  // Safe scroll to top upon project change
  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch (_e) {}
  }, [id]);

  // Page title
  useEffect(() => {
    if (project?.title) {
      document.title = `${project.title.trim()} — Case Study | Mohamed Mustafa`;
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#f7f8ff] dark:bg-black flex items-center justify-center p-6 text-slate-900 dark:text-slate-100 md:ml-20">
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
    <div className="relative min-h-screen bg-[#f7f8ff] dark:bg-black text-slate-900 dark:text-slate-100 overflow-x-hidden transition-colors duration-300">
      {/* ------------------------------------------------------------- */}
      {/* LIGHTWEIGHT HARDWARE-SAFE BACKGROUND (ZERO GPU MEMORY LEAK)   */}
      {/* ------------------------------------------------------------- */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* Subtle geometric grid */}
        <div
          className="absolute inset-0 opacity-30 dark:opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(9, 104, 229, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(9, 104, 229, 0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Static soft gradients (No infinite frame recalculations on mobile) */}
        <div className="absolute top-0 left-1/4 w-[32rem] h-[20rem] rounded-full bg-gradient-to-br from-[#0968e5]/15 to-[#091970]/15 blur-2xl pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[24rem] h-[24rem] rounded-full bg-gradient-to-tl from-[#094dbf]/10 to-transparent blur-2xl pointer-events-none" />
      </div>

      {/* Main layout container with desktop sidebar clearance */}
      <main className="relative z-10 md:ml-20">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <ProjectContent project={project} allProjects={projectsData} />
        </motion.div>

        <Footer />
      </main>
    </div>
  );
}
