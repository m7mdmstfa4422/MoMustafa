"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

// Components imports

import ProjectContent from "../ProjectContent/ProjectContent"

import Footer from "../Footer/Footer"

export default function Information() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Resolve asset paths correctly for hash-based deployments (e.g., GitHub Pages)
  const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`

  // Project data with consistent color schemes
  const projectsData = {
    1: {
      id: 1,
      title: "Daniels Page",
      subtitle: "Personal Portfolio",
      category: "Bootstrap",
      description: "A modern and responsive personal portfolio built using Bootstrap components and utilities",
      year: "2024",
      image: asset("images/p2/proto1.png"),
      gallery: [asset("images/p2/proto1.png"), asset("images/p2/proto2.png"), asset("images/p2/proto3.png"), asset("images/p2/proto4.png")],
      gradient: "from-indigo-900 via-purple-800 to-pink-700",
      link: "https://m7mdmstfa4422.github.io/Daniels-Page/",
      github: "https://github.com/m7mdmstfa4422/Daniels-Page",
      icons: [asset("images/webIcon/html.png"), asset("images/webIcon/bootstrap.png"), asset("images/webIcon/js.png")],
    },

    2: {
      id: 2,
      title: "Book marker",
      subtitle: "Save & Manage Links",
      category: "JavaScript",
      description: "A simple and efficient tool to save, organize, and access your favorite websites",
      year: "2024",
      image: asset("images/p3/Book1.png"),
      gallery: [asset("images/p3/Book1.png"), asset("images/p3/Book2.png")],
      gradient: "from-indigo-900 via-purple-800 to-pink-700",
      link: "https://m7mdmstfa4422.github.io/Bookmark/",
      github: "https://github.com/m7mdmstfa4422/Bookmark",
      icons: [asset("images/webIcon/html.png"), asset("images/webIcon/bootstrap.png"), asset("images/webIcon/js.png")],
    },

    3: {
      id: 3,
      title: "Weather App",
      subtitle: "Live Weather Forecast",
      category: "JavaScript API",
      description: "Real-time weather updates with a clean and intuitive interface",
      year: "2024",
      image: asset("images/p5/weather1.png"),
      gallery: [asset("images/p5/weather1.png"), asset("images/p5/weather2.png")],
      gradient: "from-indigo-900 via-purple-800 to-pink-700",
      link: "https://m7mdmstfa4422.github.io/WeatherApi-V1.1.1/",
      github: "https://github.com/m7mdmstfa4422/WeatherApi-V1.1.1",
      icons: [asset("images/webIcon/html.png"), asset("images/webIcon/bootstrap.png"), asset("images/webIcon/js.png")],
    },

    4: {
      id: 4,
      title: "Yummy Foods",
      subtitle: "Menu Design",
      category: "JavaScript Oop & jQuery",
      description: "A modern food ordering app with interactive menu and seamless user experience",
      year: "2025",
      image: asset("images/p4/yummy1.png"),
      gallery: [asset("images/p4/yummy1.png"), asset("images/p4/yummy2.png"), asset("images/p4/yummy2.1.png"), asset("images/p4/yummy3.png"), asset("images/p4/yummy4.png")],
      gradient: "from-indigo-900 via-purple-800 to-pink-700",
      link: "https://m7mdmstfa4422.github.io/YummyFood/",
      github: "https://github.com/m7mdmstfa4422/YummyFood",
      icons: [asset("images/webIcon/html.png"), asset("images/webIcon/bootstrap.png"), asset("images/webIcon/js.png"), asset("images/webIcon/jquery.png")],

    },

    5: {
      id: 5,
      title: "Oop Game",
      subtitle: "Interactive Apps",
      category: "JavaScript Oop",
      description: "A modular OOP-based game library",
      year: "2025",
      image: asset("images/p6/game1.png"),
      gallery: [asset("images/p6/game1.png"), asset("images/p6/game2.png"), asset("images/p6/game3.png"), asset("images/p6/game4.png")],
      gradient: "from-indigo-900 via-purple-800 to-pink-700",
      link: "https://m7mdmstfa4422.github.io/GameOop/",
      github: "https://github.com/m7mdmstfa4422/GameOop",
      icons: [asset("images/webIcon/html.png"), asset("images/webIcon/tailwind.png"), asset("images/webIcon/js.png")],

    },

    6: {
      id: 6,
      title: "E-Commerce",
      subtitle: "Online Store",
      category: "Development",
      description: "Full-featured e-commerce solutions",
      year: "2025",
      image: asset("images/p8/ecom3.png"),
      gallery: [asset("images/p8/ecom3.png"), asset("images/p8/ecom1.png"), asset("images/p8/ecom4.png"), asset("images/p8/ecom5.png"), asset("images/p8/ecom7.png"), asset("images/p8/ecom8.png"), asset("images/p8/ecom9.png")],
      gradient: "from-cyan-500 via-blue-600 to-cyan-700",
      link: "https://m7mdmstfa4422.github.io/e-commerce_app/",
      github: "https://github.com/m7mdmstfa4422/e-commerce_app",
      icons: [asset("images/webIcon/html.png"), asset("images/webIcon/tailwind.png"), asset("images/webIcon/react.png")],

    },

    7: {
      id: 7,
      title: "Food App",
      subtitle: "Menu & Ordering",
      category: "React Vite",
      description: "A modern food ordering app with interactive menu and seamless user experience",
      year: "2025",
      image: asset("mobile-app-design.png"),
      gallery: [asset("images/p7/cover.png"), asset("images/p7/img1.png"), asset("images/p7/img2.png"), asset("images/p7/img3.png"), asset("images/p7/img4.png"), asset("images/p7/img5.png")],
      video: asset("images/p7/VP7.mp4"),
      gradient: "from-purple-600 via-pink-600 to-orange-500",
      link: "https://m7mdmstfa4422.github.io/EgyMenu/",
      github: "https://github.com/m7mdmstfa4422/EgyMenu/tree/main",
      icons: [asset("images/webIcon/html.png"), asset("images/webIcon/tailwind.png"), asset("images/webIcon/react.png")],

    },
  };


  useEffect(() => {
    const loadProject = async () => {
      setIsLoading(true)
      if (id && projectsData[id]) {
        await new Promise(resolve => setTimeout(resolve, 800)) // Smooth loading transition
        setProject(projectsData[id])
      }
      setIsLoading(false)
    }
    loadProject()
  }, [id])

  // Page transitions and animations
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  // Loading animation
  if (isLoading) {
    return (
      <motion.div
        className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="relative">
          <motion.div
            className="w-16 h-16 border-4 border-cyan-500/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-0 left-0 w-16 h-16 border-4 border-t-cyan-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    )
  }

  if (!project) {
    return (
      <motion.div
        className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950 text-cyan-600 dark:text-cyan-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Project not found
      </motion.div>
    )
  }

  const accentColor = project.accentColor || "#22d3ee"

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="relative bg-white dark:bg-slate-950 min-h-screen overflow-hidden transition-colors duration-300"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Animated background elements */}
        <motion.div
          className="absolute inset-0 opacity-10 dark:opacity-30"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, ${accentColor}20, transparent 70%)`,
            backgroundSize: "100% 100%",
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full"
              animate={{
                y: [-20, window.innerHeight + 20],
                x: Math.random() * window.innerWidth,
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Content with stagger animation */}
        <motion.div
          className="relative z-10"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {/* Development Section */}
          <div className="md:ml-20 ">

            <ProjectContent project={project} />

          </div>
          <Footer />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}