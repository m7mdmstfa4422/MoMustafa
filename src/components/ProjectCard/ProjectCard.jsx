"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  if (!project) return null;

  const tags = (project.tags?.length ? project.tags : ["HTML"]).slice(0, 5);

  return (
    <Link to={`/projects/${project.id}`} className="group block h-full rounded-[1.5rem] outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/70">
      <motion.article
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={{ y: -9 }}
        transition={{ type: "spring", stiffness: 230, damping: 22 }}
        className="relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/65 shadow-xl shadow-indigo-950/[.07] backdrop-blur-xl transition-shadow duration-300 group-hover:shadow-2xl group-hover:shadow-indigo-950/[.16] dark:border-white/10 dark:bg-white/[.045] dark:shadow-black/25"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img src={project.image || "/placeholder.svg"} alt={project.title} className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
            <span className="rounded-full border border-white/20 bg-slate-950/45 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">{project.category}</span>
            <motion.span whileHover={{ rotate: 45 }} className="grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md"><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M8 7h9v9" /></svg></motion.span>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col p-5 md:p-6">
          <span className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-cyan-400/0 blur-3xl transition duration-500 group-hover:bg-cyan-400/15" />
          <div className="relative">
            <p className="mb-2 text-sm font-semibold text-indigo-600 dark:text-cyan-300">{project.subtitle}</p>
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{project.title}</h3>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.description}</p>
          </div>

          <div className="relative mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => <span key={tag} className="rounded-full border border-indigo-100 bg-indigo-50/70 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:border-white/10 dark:bg-white/[.06] dark:text-indigo-200">{tag}</span>)}
          </div>

          <div className="relative mt-auto flex items-center justify-between border-t border-slate-200/70 pt-5 text-sm font-bold text-slate-700 dark:border-white/10 dark:text-slate-200">
            <span>View case study</span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25 transition-transform duration-300 group-hover:translate-x-1"><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg></span>
          </div>
        </div>
        <span className="h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 transition-transform duration-500 group-hover:scale-x-100" />
      </motion.article>
    </Link>
  );
}
