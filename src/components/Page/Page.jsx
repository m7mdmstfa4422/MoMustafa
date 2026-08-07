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
   
      <main className="md:ml-18">
        <Hero />
        <StatsSection />
        <div id="projects">
          <Projects />
        </div>
        <Footer />

      </main>
 
  )
}
