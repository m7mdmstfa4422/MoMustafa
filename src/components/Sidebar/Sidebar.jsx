"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function Sidebar() {
  const [activeIcon, setActiveIcon] = useState("Home")
  const [isDark, setIsDark] = useState(true)
  const [language, setLanguage] = useState("en") // إضافة حالة اللغة

  const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDark(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Toggle theme
  const toggleTheme = () => {
    setIsDark(!isDark)
    if (isDark) {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    } else {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    }
  }

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en"
    setLanguage(newLang)
    // تطبيق اللغة على الصفحة
    document.documentElement.lang = newLang
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr"
    localStorage.setItem("language", newLang)
  }

  return (
    <aside className="fixed bottom-5 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 md:top-0 md:bottom-auto h-20 md:h-screen w-11/12 max-w-lg md:w-20 bg-gradient-to-r md:bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-blue-950 dark:via-slate-900 dark:to-blue-950 rounded-full md:rounded-full flex flex-row md:flex-col items-center justify-center md:justify-start py-3 md:py-6 gap-2 md:gap-4 shadow-2xl shadow-blue-200/50 dark:shadow-blue-900/50 border border-blue-200/30 dark:border-blue-800/30 animate-fade-in z-50">
      <div className="hidden md:block mb-2 animate-pulse">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 p-0.5 shadow-lg shadow-blue-500/50">
          <img src={asset("images/me.jpg")} alt="Profile" className="rounded-full w-full h-full object-cover" />
        </div>
      </div>

      {/* Home Icon */}
      <Link to="/">
        <div className="flex md:block">
          <div
            onClick={() => setActiveIcon("Home")}
            className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${activeIcon === "Home"
              ? "bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/50 scale-110"
              : "bg-slate-100/50 dark:bg-slate-700/50 hover:bg-blue-100/60 dark:hover:bg-blue-700/60 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-200 hover:shadow-lg hover:shadow-blue-400/30 dark:hover:shadow-blue-500/30"
              }`}
            aria-label="Home"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
        </div>
      </Link>
      {/* Download CV */}
      <Link to="https://drive.google.com/file/d/1_1VIcpSfC9nUzKrdATvT3g4Srug2cNvd/view?usp=drive_link" target="_blank">
        <div className="flex md:block">
          <button
            onClick={() => setActiveIcon("Email")}
            className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${activeIcon === "Camera"
              ? "bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/50 scale-110"
              : "bg-slate-100/50 dark:bg-slate-700/50 hover:bg-blue-100/60 dark:hover:bg-blue-700/60 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-200 hover:shadow-lg hover:shadow-blue-400/30 dark:hover:shadow-blue-500/30"
              }`}
            aria-label="Email"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3v12m0 0l-3-3m3 3l3-3m-9 6h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2z"></path>
            </svg>
          </button>
        </div>
      </Link>



      {/* email Icon */}
      <Link to="https://mail.google.com/mail/?view=cm&fs=1&to=mohammedmustafaibrahim02@gmail.com" target="_blank">
        <div className="flex md:block">
          <div className="hidden md:block w-8 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent my-2" />
          <button
            onClick={() => setActiveIcon("Email")}
            className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${activeIcon === "Camera"
              ? "bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/50 scale-110"
              : "bg-slate-100/50 dark:bg-slate-700/50 hover:bg-blue-100/60 dark:hover:bg-blue-700/60 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-200 hover:shadow-lg hover:shadow-blue-400/30 dark:hover:shadow-blue-500/30"
              }`}
            aria-label="Email"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
          </button>
        </div>
      </Link>
      {/* LinkedIn Icon */}
      <Link to="https://www.linkedin.com/in/mohammed-mustafa-416318362/" target="_blank" rel="noopener noreferrer">
        <div className="flex md:block">
          <div
            className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${activeIcon === "LinkedIn"
              ? "bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/50 scale-110"
              : "bg-slate-100/50 dark:bg-slate-700/50 hover:bg-blue-100/60 dark:hover:bg-blue-700/60 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-200 hover:shadow-lg hover:shadow-blue-400/30 dark:hover:shadow-blue-500/30"
              }`}
            aria-label="LinkedIn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"></path>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </div>
        </div>
      </Link>
      {/* github Icon */}
      <a
        href="https://github.com/m7mdmstfa4422"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-white dark:from-slate-800 dark:to-slate-700 shadow-sm hover:scale-105 transition-transform"
        title="GitHub"
      >
        <svg className="w-5 h-5 text-slate-800 dark:text-slate-100" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.92.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.95 10.95 0 012.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.44-2.7 5.42-5.28 5.7.41.35.77 1.04.77 2.09 0 1.5-.01 2.71-.01 3.08 0 .3.21.66.79.55C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
        </svg>
      </a>

      {/* Theme Toggle Icon */}
      <div className="flex md:block">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${activeIcon === "Theme"
            ? "bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/50 scale-110"
            : "bg-slate-100/50 dark:bg-slate-700/50 hover:bg-blue-100/60 dark:hover:bg-blue-700/60 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-200 hover:shadow-lg hover:shadow-blue-400/30 dark:hover:shadow-blue-500/30"
            }`}
          aria-label="Theme"
        >
          {isDark ? (
            // Moon icon
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          ) : (
            // Sun icon
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          )}
        </button>
      </div>


    </aside>
  )
}