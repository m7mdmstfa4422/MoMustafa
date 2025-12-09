"use client"
import React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function ProjectCard({ project }) {
  if (!project) return null

  return (
    <Link to={`/projects/${project.id}`} className="block h-full">
      <motion.article
        className="group relative overflow-hidden rounded-2xl bg-gray-200/20 dark:bg-slate-900/85 shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col"
        whileHover={{ translateY: -6 }}
      >
        {/* Image (keep intrinsic 1280x800) */}
        <div className="relative w-full overflow-hidden rounded-t-2xl">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={1280}
            height={800}
            style={{ width: "100%", maxWidth: 1280, height: "auto", objectFit: "cover" }}
            className="block transform transition-transform duration-500 group-hover:scale-105"
          />

          {/* soft gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* badges on image */}
          <div className="absolute left-4 bottom-4 flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-600 text-white rounded-full">{project.category}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 flex flex-col gap-3 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white">{project.title}</h3>
              <p className="mt-1 text-sm text-sky-600 font-medium">{project.subtitle}</p>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <button className="px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold">Preview</button>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {(project.tags || ["html"]).slice(0,6).map((t, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-4 flex items-center justify-end gap-3">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Details</span>
            <motion.div
              className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/70 flex items-center justify-center shadow"
              whileHover={{ scale: 1.06 }}
            >
              <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* thin accent bar */}
        <div className="h-1 bg-gradient-to-r from-cyan-400 to-blue-500 w-full transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
      </motion.article>
    </Link>
  )
}
