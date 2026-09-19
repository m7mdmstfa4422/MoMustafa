"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";

export default function ProjectCard({ project }) {
  if (!project) return null;

  const tags = (project.tags?.length ? project.tags : ["HTML"]).slice(0, 4);

  return (
    <div className="group block h-full rounded-[1.75rem] outline-none">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={{ y: -7 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/75 shadow-xl shadow-[#091970]/[0.06] backdrop-blur-2xl transition-all duration-300 hover:border-[#0968e5]/40 hover:shadow-2xl hover:shadow-[#0968e5]/15 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-black/25"
      >
        {/* Browser Mockup Window Chrome Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200/70 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.03]">
          {/* Traffic Light Dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
          </div>

          {/* Category Pill */}
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {project.category}
          </span>
        </div>

        {/* Project Preview Image Canvas */}
        <Link to={`/projects/${project.id}`} className="relative aspect-[16/10] overflow-hidden block">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Corner Year Badge */}
          {project.year && (
            <div className="absolute top-3 right-3">
              <span className="rounded-full border border-white/20 bg-slate-950/60 px-2.5 py-0.5 text-[10px] font-mono font-bold text-white backdrop-blur-md">
                {project.year}
              </span>
            </div>
          )}

          {/* Quick Hover Action Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/20 backdrop-blur-[2px]">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 dark:bg-slate-950/90 text-xs font-bold text-[#091970] dark:text-[#7ab3ff] shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <span>View Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>

        {/* Card Content */}
        <div className="relative flex flex-1 flex-col p-5 md:p-6">
          <Link to={`/projects/${project.id}`} className="block">
            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#0968e5] dark:text-[#7ab3ff]">
              {project.subtitle}
            </p>
            <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-[#0968e5] dark:group-hover:text-[#7ab3ff] transition-colors">
              {project.title}
            </h3>
            <p className="mt-2.5 line-clamp-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {project.description}
            </p>
          </Link>

          {/* Micro Tags Strip */}
          <div className="relative mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-[#0968e5]/20 bg-[#0968e5]/5 px-2 py-0.5 text-[11px] font-medium text-[#091970] dark:border-white/10 dark:bg-white/[0.05] dark:text-[#7ab3ff]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Card Action Footer */}
          <div className="relative mt-auto flex items-center justify-between border-t border-slate-200/70 dark:border-white/10 pt-4 mt-5">
            <Link
              to={`/projects/${project.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#0968e5] dark:hover:text-[#7ab3ff] transition-colors"
            >
              <span>Case Study</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0968e5] dark:text-[#7ab3ff] hover:underline"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Hover Bottom Sweep Accent Line */}
        <span className="h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-[#091970] via-[#094dbf] to-[#0968e5] transition-transform duration-300 group-hover:scale-x-100" />
      </motion.article>
    </div>
  );
}
