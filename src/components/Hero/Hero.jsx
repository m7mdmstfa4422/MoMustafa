import React from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  const name = "Mohamed Mustafa"

  // Variants للأنيميشنات
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

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  }

  const textVariants = {
    hidden: { 
      opacity: 0, 
      x: -50 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  }

  const floatingVariants = {
    animate: (i) => ({
      y: [0, -20, 0],
      x: [0, i % 2 ? 10 : -10, 0],
      opacity: [0.3, 0.7, 0.3],
      transition: {
        duration: 4 + i * 0.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  }

  return (
    <section className="relative px-6 md:px-12 py-24 border-b border-gray-200 dark:border-slate-800/50 bg-white dark:bg-transparent overflow-hidden">
      {/* الخلفية المتحركة */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* جسيمات عائمة */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={floatingVariants}
            animate="animate"
            className={`absolute rounded-full ${
              i % 4 === 0 ? 'bg-blue-400/10' : 
              i % 4 === 1 ? 'bg-cyan-400/10' : 
              i % 4 === 2 ? 'bg-teal-400/10' : 
              'bg-slate-400/10'
            }`}
            style={{
              width: 6 + (i % 3) * 4,
              height: 6 + (i % 3) * 4,
              left: `${10 + i * 12}%`,
              top: `${20 + (i * 10) % 70}%`,
            }}
          />
        ))}
        
        {/* توهج خلفي */}
        <motion.div
          className="absolute top-1/4 -left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto relative z-10"
      >
        {/* Badge مع الأنيميشن */}
        <motion.div
          variants={itemVariants}
          className="mb-2 flex items-center gap-4 group"
        >
          <motion.div 
            className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
            whileHover={{ width: 60 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <motion.span 
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-widest uppercase flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-lg"
            >
              ✦
            </motion.span>
            Hi, I’m
          </motion.span>
        </motion.div>

        {/* الاسم الرئيسي */}
        <motion.h1
          variants={textVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-5 leading-tight"
        >
          {name.split('').map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5 + index * 0.1,
                type: "spring",
                stiffness: 150
              }}
              className="inline-block hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 cursor-default"
              whileHover={{ 
                scale: 1.1,
                y: -5 
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* النص الوصفي */}
        <motion.div
          variants={itemVariants}
          className="text-gray-600 dark:text-slate-300 max-w-3xl leading-relaxed text-lg md:text-xl"
        >
          <motion.p className="mb-6">
            a dedicated {" "}
            <motion.span 
              className="font-semibold text-gray-900  dark:text-white bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Front-End Developer
            </motion.span>
            focused on creating responsive, fast, and visually polished web applications.{" "}
  
          </motion.p>

          <motion.p>
           I blend clean code with modern technologies to build engaging user experiences that look great and perform even{" "}
   
          </motion.p>
        </motion.div>

      
        {/* مؤشر التمرير */}
        <motion.div
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-slate-600 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-gray-400 dark:bg-slate-600 rounded-full mt-2"
              animate={{
                y: [0, 12, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}