import React, { useEffect } from 'react'

import Sidebar from '../Sidebar/Sidebar'
import Hero from '../Hero/Hero'
import StatsSection from '../StatsSection/StatsSection'
import Projects from '../Projects/Projects'
import Footer from '../Footer/Footer'


export default function Home() {
  useEffect(() => {
    document.title = "Mohamed Mustafa | Portfolio";
    try {
      let scrollTarget = null;
      const hash = window.location.hash?.replace(/^#\/?/, "");
      if (hash && !hash.includes("/")) {
        scrollTarget = hash;
      } else {
        scrollTarget = localStorage.getItem("scrollTo");
      }
      if (scrollTarget) {
        const el = document.getElementById(scrollTarget);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        localStorage.removeItem("scrollTo");
      }
    } catch (_e) {}
  }, []);

  return (
    <main className="md:ml-18">
      <Hero />
      <StatsSection />
      <div id="projects">
        <Projects />
      </div>
      <Footer />
    </main>
  );
}
