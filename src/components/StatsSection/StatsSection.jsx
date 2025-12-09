import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

export default function StatsSection() {
  const skills = [
    { raw: '90%', number: 90, suffix: '%', label: 'HTML & CSS', color: 'from-orange-500 to-pink-500' },
    { raw: '85%', number: 85, suffix: '%', label: 'Bootstrap & Tailwind', color: 'from-teal-500 to-blue-500' },
    { raw: '80%', number: 80, suffix: '%', label: 'React.js', color: 'from-cyan-500 to-sky-500' },
    { raw: '75%', number: 75, suffix: '%', label: 'Database', color: 'from-emerald-500 to-green-500' },
  ]

  const [counts, setCounts] = useState(skills.map(() => 0))
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef(null)
  const controls = useAnimation()
  const isInView = useInView(containerRef, { once: true, threshold: 0.3 })

  useEffect(() => {
    if (isInView) {
      setIsVisible(true)
      controls.start('visible')
    }
  }, [isInView, controls])

  // Count up animation
  useEffect(() => {
    if (!isVisible) return

    const rafIds = []
    skills.forEach((s, i) => {
      const duration = 1500 + i * 200
      const start = performance.now()
      const step = (now) => {
        const t = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - t, 4) // Smoother easing
        const value = Math.round(eased * s.number)
        setCounts((prev) => {
          const copy = [...prev]
          copy[i] = value
          return copy
        })
        if (t < 1) rafIds[i] = requestAnimationFrame(step)
      }
      rafIds[i] = requestAnimationFrame(step)
    })
    return () => rafIds.forEach((id) => cancelAnimationFrame(id))
  }, [isVisible])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8 
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: i * 0.1,
        duration: 0.6
      }
    }),
    hover: { 
      y: -8,
      scale: 1.02,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    }
  }

  const progressVariants = {
    hidden: { width: 0 },
    visible: (i) => ({
      width: `${skills[i].number}%`,
      transition: {
        duration: 1.5,
        delay: 0.8 + i * 0.1,
        ease: "easeOut"
      }
    })
  }

  const numberVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        delay: 1.2 + i * 0.1
      }
    })
  }

  const floatingVariants = {
    animate: (i) => ({
      y: [0, -20, 0],
      x: [0, i % 2 ? 15 : -15, 0],
      opacity: [0.3, 0.7, 0.3],
      transition: {
        duration: 6 + i * 0.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  }

  return (
    <section
      ref={containerRef}
      className="relative px-6 md:px-12 py-24 bg-gradient-to-br  dark:from-black dark:via-slate-900 dark:to-slate-900 text-white overflow-hidden"
      aria-label="Skills"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-tr  dark:from-black/60 dark:via-slate-900/40 dark:to-slate-800/40 mix-blend-overlay"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: -30 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
          }
        }}
        className="text-center mb-16"
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold dark:text-white text-black mb-4"
        >
          Technical Expertise
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
        >
          Mastering modern web technologies to create exceptional digital experiences
        </motion.p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            whileHover="hover"
            /* جربنا هنا نقلل الانتقالات لتأثير الظل والتحويل فقط،
               حتى لا يتم عمل transition على ألوان الخلفية عند تغيير المود */
            className="group relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200/60 dark:border-slate-700/50 hover:shadow-2xl transition-shadow transition-transform duration-300 transform-gpu"
          >
            {/* Card Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
            
            {/* Skill Icon Placeholder */}
            <motion.div 
              className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <div className={`w-6 h-6 bg-gradient-to-r ${skill.color} rounded-lg`}></div>
            </motion.div>

            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-200 mb-4">
              {skill.label}
            </h3>
            
            {/* Progress Bar */}
            <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden mb-3">
              <motion.div
                custom={index}
                variants={progressVariants}
                initial="hidden"
                animate="visible"
                className={`absolute h-full bg-gradient-to-r ${skill.color} rounded-full shadow-lg`}
              />
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: [-100, 300]
                }}
                transition={{
                  duration: 2,
                  delay: 2 + index * 0.2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              />
            </div>

            {/* Percentage Display */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Proficiency
              </span>
              <motion.span
                custom={index}
                variants={numberVariants}
                initial="hidden"
                animate="visible"
                className={`text-2xl font-bold bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}
              >
                {counts[index]}{skill.suffix}
              </motion.span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Floating Particles */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={floatingVariants}
            animate="animate"
            className={`absolute rounded-full ${
              i % 4 === 0 ? 'bg-blue-900/30' : 
              i % 4 === 1 ? 'bg-cyan-900/20' : 
              i % 4 === 2 ? 'bg-teal-900/15' : 
              'bg-slate-700/15'
            }`}
            style={{
              width: 6 + (i % 5) * 4,
              height: 6 + (i % 5) * 4,
              left: `${5 + i * 8}%`,
              top: `${10 + (i * 7) % 80}%`,
            }}
          />
        ))}
        
        {/* Large floating shapes */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className={`absolute opacity-6 ${
              i % 2 === 0 ? 'bg-blue-900' : 'bg-cyan-900'
            }`}
            style={{
              width: 80 + i * 40,
              height: 80 + i * 40,
              left: `${i * 25}%`,
              top: `${60 - i * 10}%`,
              borderRadius: i % 2 === 0 ? '50%' : '30%',
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>
  
    </section>
  )
}