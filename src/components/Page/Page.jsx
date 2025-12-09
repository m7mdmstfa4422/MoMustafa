import React, { useEffect } from 'react'

import Sidebar from '../Sidebar/Sidebar'
import Hero from '../Hero/Hero'
import StatsSection from '../StatsSection/StatsSection'
import Projects from '../Projects/Projects'
import Footer from '../Footer/Footer'


export default function Home() {
  useEffect(() => {
    document.title = "Mohamed Mustafa | Portfolio"
    // Scroll if URL has hash or localStorage flag
    const scrollTarget = (typeof window !== 'undefined' && (window.location.hash?.replace('#', '') || localStorage.getItem('scrollTo'))) || null
    if (scrollTarget) {
      const el = document.getElementById(scrollTarget)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      try { localStorage.removeItem('scrollTo') } catch {}
    }
  }, [])

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white dark:bg-slate-950">
      <main className="flex-1 flex flex-col mb-20 md:mb-0 md:ml-20">
        <Hero />
        <StatsSection />
        <div id="projects">
          <Projects />
        </div>
        <Footer />

      </main>
    </div>
  )
}
