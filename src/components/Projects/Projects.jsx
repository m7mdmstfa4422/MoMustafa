import React, { useState, useMemo, useEffect } from "react"
import ProjectCard from "../ProjectCard/ProjectCard"
import { motion, AnimatePresence } from "framer-motion"

export default function Projects() {
  const [showAll, setShowAll] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // If coming from breadcrumb request to show all projects
    try {
      const flag = localStorage.getItem('showAllProjects')
      if (flag === '1') {
        setShowAll(true)
        localStorage.removeItem('showAllProjects')
      }
    } catch { }
  }, [])
  // Resolve asset paths correctly for hash-based deployments (e.g., GitHub Pages)
  const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`


  const projects = [
    {
      id: 1,
      title: "Daniels Page",
      subtitle: "Personal Portfolio",
      category: "Bootstrap",
      description: "A modern and responsive personal portfolio built using Bootstrap components and utilities",
      image: asset("images/p2/proto1.png"),
      tags: ["Bootsrap", "JavaScript"],
    },

    {
      id: 2,
      title: "Book marker",
      subtitle: "Save & Manage Links",
      category: "JavaScript",
      description: "A simple and efficient tool to save, organize, and access your favorite websites",
      image: asset("images/p3/Book1.png"),
      tags: ["Bootsrap", "JavaScript"],

    },

    {
      id: 3,
      title: "Weather App",
      subtitle: "Live Weather Forecast",
      category: "JavaScript API",
      description: "Real-time weather updates with a clean and intuitive interface",
      image: asset("images/p5/weather1.png"),
      tags: ["Bootsrap", "API", "JavaScript"],

    },


    {
      id: 4,
      title: "Yummy Foods",
      subtitle: "Menu Design",
      category: "JavaScript Oop & jQuery ",
      description: "A modern food ordering app with interactive menu and seamless user experience",
      image: asset("images/p4/yummy1.png"),
      tags: ["Bootsrap", "API", "jQuery", "JavaScript"],

    },
    {
      id: 5,
      title: "Oop Game",
      subtitle: "Interactive Apps",
      category: "javaScript Oop",
      description: "A modular OOP-based game library",
      image: asset("images/p6/game1.png"),
      tags: ["Tailwind", "API", "JavaScript"],
    },
    {
      id: 6,
      title: "E-Commerce",
      subtitle: "Online Store",
      category: "React vite",
      description: "Full-featured e-commerce solutions",
      image: asset("images/p8/ecom3.png"),
      tags: ["React", "Tailwind", "API", "Vite", "JavaScript"],
    },

    {
      id: 7,
      title: "Food App",
      subtitle: "Menu & Ordering",
      category: "React vite",
      description: "A modern food ordering app with interactive menu and seamless user experience",
      image: asset("images/p7/cover.png"),
      tags: ["React", "Tailwind", "API", "Vite", "JavaScript"],
    },

  ]

  // ترتيب تنازلي حسب id (الأكبر أولاً)
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => b.id - a.id)
  }, [projects])

  const handleToggleProjects = async () => {
    setIsLoading(true)
    setShowAll(!showAll)
    setTimeout(() => setIsLoading(false), 300)
  }

  const displayedProjects = showAll ? sortedProjects : sortedProjects.slice(0, 3)

  const animationSettings = showAll ? {
    stagger: 0.03,
    duration: 0.3
  } : {
    stagger: 0.08,
    duration: 0.4
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: animationSettings.stagger,
        when: "beforeChildren"
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: showAll ? 10 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: animationSettings.duration,
        ease: "easeOut",
      }
    },
  }

  return (
    <section className="relative px-6 md:px-12 py-20 overflow-hidden ">
      <div className="container mx-auto">

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr dark:from-black/60 dark:via-slate-900/40 dark:to-slate-800/40 from-black/60 via-slate-900/40 to-slate-800/40 mix-blend-overlay"></div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200/40 rounded-full blur-3xl dark:bg-emerald-900/20" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl dark:bg-blue-900/20" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-100/30 rounded-full blur-3xl dark:bg-violet-900/10" />
        </div>

        {/* Animated Orbs */}
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          initial="hidden"
          animate="visible"
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${i % 2 === 0 ? 'bg-slate-700/10' : 'bg-blue-900/10'
                } dark:bg-slate-600/10`}
              style={{
                width: 100 + i * 60,
                height: 100 + i * 60,
                left: `${20 + i * 15}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Content Container */}
        <div className="relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <motion.div
              className="flex items-center justify-center gap-3 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 dark:from-blue-400 dark:to-cyan-400 rounded-full" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-300 tracking-widest uppercase bg-white/80 dark:bg-slate-700/80 px-4 py-2 rounded-full backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/30 shadow-sm">
                Portfolio
              </span>
              <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 dark:from-cyan-400 dark:to-blue-400 rounded-full" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-500 via-cyan-500 to-slate-500 dark:from-slate-200 dark:via-blue-300 dark:to-slate-200 bg-clip-text text-transparent mb-4">
              Featured Work
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              A curated collection of my creative projects and professional work
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="text-slate-600 dark:text-slate-300">Loading projects...</p>
              </motion.div>
            </div>
          )}

          {/* Projects Grid */}
          {!isLoading && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={showAll ? "all-projects" : "few-projects"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="wait">
                {displayedProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={cardVariants}
                    layout
                    whileHover={!showAll ? {
                      scale: 1.03,
                      transition: { duration: 0.2 }
                    } : undefined}
                    className="perspective-1000 group h-full"
                  >
                    <div className="relative h-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/50 rounded-2xl shadow-lg shadow-slate-200/20 dark:shadow-slate-900/30 overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:shadow-slate-300/30 dark:group-hover:shadow-slate-700/50 group-hover:border-slate-300/80 dark:group-hover:border-slate-600/70">
                      <div className="h-full flex flex-col">
                        <ProjectCard project={project} />
                      </div>

                      {/* Hover Effects - تعطيل للعرض الكامل */}
                      {!showAll && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-slate-700/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 dark:from-blue-400/10 dark:via-transparent dark:to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mt-16"
          >
            <motion.button
              onClick={handleToggleProjects}
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.05 }}
              whileTap={{ scale: isLoading ? 1 : 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 dark:from-blue-600 dark:to-cyan-600 hover:from-blue-600 hover:to-cyan-500 dark:hover:from-blue-500 dark:hover:to-cyan-500 text-white font-semibold rounded-full shadow-lg shadow-blue-500/25 dark:shadow-blue-900/30 hover:shadow-blue-500/40 dark:hover:shadow-blue-500/40 transition-all duration-300 border border-blue-400/20 dark:border-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : (showAll ? 'Show Less' : 'View All Projects')}
            </motion.button>
          </motion.div>
        </div>
      </div>

    </section>
  )
}