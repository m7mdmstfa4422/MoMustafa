export const backgroundEffects = {
  mainGradient: {
    animate: {
      background: [
        "radial-gradient(circle at 0% 0%, rgb(6,182,212) 0%, transparent 50%)",
        "radial-gradient(circle at 100% 100%, rgb(6,182,212) 0%, transparent 50%)",
        "radial-gradient(circle at 0% 0%, rgb(6,182,212) 0%, transparent 50%)",
      ]
    },
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear"
    }
  },
  
  floatingParticles: (index) => ({
    animate: {
      y: [0, -20, 0],
      x: [0, index % 2 ? 20 : -20, 0],
      opacity: [0, 0.8, 0],
    },
    transition: {
      duration: 6 + Math.random() * 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: index * 0.5
    }
  }),

  glowEffect: {
    animate: {
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.2, 1],
    },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}