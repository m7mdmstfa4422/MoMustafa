"use client";
/* eslint-disable no-unused-vars */

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  FolderGit2,
  FileDown,
  Mail,
  Linkedin,
  Github,
  MessageCircle,
  Sun,
  Moon,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Layers,
  Code2,
  ArrowUpRight,
  X,
} from "lucide-react";

const CV_URL = `${import.meta.env.BASE_URL}Mohamed_Mustafa_CV.pdf`;

// Apple-signature spring physics (0.3s feel)
const appleSpring = { type: "spring", stiffness: 400, damping: 28 };

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null); // 'profile' | 'connect' | null
  const [hoveredItem, setHoveredItem] = useState(null);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const sidebarRef = useRef(null);

  const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

  // Theme initialization
  useEffect(() => {
    const dark =
      localStorage.theme === "dark" ||
      (!localStorage.theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.theme = next ? "dark" : "light";
    document.documentElement.classList.toggle("dark", next);
  };

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Quick section scroll & navigation helper
  const scrollToSection = (sectionId) => {
    setActiveMenu(null);
    if (pathname !== "/") {
      try {
        localStorage.setItem("scrollTo", sectionId);
      } catch (_err) {
        // storage is optional
      }
      navigate("/");
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isHomeActive = pathname === "/";
  const isArchiveActive = pathname === "/Allprojects";

  // Socials list for the simplified flyout
  const socialLinks = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      subtitle: "Direct Chat",
      icon: (
        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
          💬
        </span>
      ),
      href: "https://wa.me/201003154481",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      subtitle: "Professional Network",
      icon: (
        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#0968e5]/10 text-[#0968e5]">
          <Linkedin className="h-4 w-4" />
        </span>
      ),
      href: "https://www.linkedin.com/in/mohammed-mustafa-416318362/",
    },
    {
      id: "github",
      label: "GitHub",
      subtitle: "Repositories & Code",
      icon: (
        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-800/10 dark:bg-white/10 text-slate-900 dark:text-white">
          <Github className="h-4 w-4" />
        </span>
      ),
      href: "https://github.com/m7mdmstfa4422",
    },
    {
      id: "email",
      label: "Email",
      subtitle: "Send a Message",
      icon: (
        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
          <Mail className="h-4 w-4" />
        </span>
      ),
      href: "mailto:mohammedmustafaibrahim02@gmail.com",
    },
  ];

  return (
    <div ref={sidebarRef}>
      {/* ------------------------------------------------------------- */}
      {/* 1. DESKTOP EXECUTIVE FLOATING NAVIGATION RAIL                */}
      {/* ------------------------------------------------------------- */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onPointerMove={(e) => {
          const box = e.currentTarget.getBoundingClientRect();
          setPointer({
            x: ((e.clientX - box.left) / box.width) * 100,
            y: ((e.clientY - box.top) / box.height) * 100,
          });
        }}
        className="hidden md:flex fixed left-5 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-3 w-[4.6rem] p-2.5 rounded-[2.2rem] border border-white/80 bg-white/75 dark:border-white/10 dark:bg-[#0b1120]/80 shadow-2xl shadow-[#091970]/15 dark:shadow-black/60 backdrop-blur-2xl transition-colors duration-300 select-none"
        aria-label="Executive Navigation Rail"
      >
        {/* Specular Ambient Glow inside the rail */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.2rem]">
          <span
            className="absolute -inset-10 blur-2xl opacity-40 dark:opacity-30 transition-all duration-300"
            style={{
              background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(9, 104, 229, 0.3), transparent 55%)`,
            }}
          />
          <span className="absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#0968e5]/40 to-transparent" />
        </span>

        {/* --- Top Identity / Profile Squircle --- */}
        <div className="relative">
          <motion.button
            type="button"
            onClick={() => setActiveMenu(activeMenu === "profile" ? null : "profile")}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="relative grid place-items-center rounded-2xl p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-[#0968e5] cursor-pointer"
            aria-label="Toggle profile information"
          >
            <div className="relative h-11 w-11 overflow-hidden rounded-xl bg-gradient-to-br from-[#091970] via-[#094dbf] to-[#0968e5] p-[2px] shadow-md shadow-[#0968e5]/25">
              <img
                src={asset("images/me2.jpeg")}
                alt="Mohamed Mustafa"
                className="h-full w-full rounded-[10px] object-cover"
              />
            </div>
            {/* Pulsing Status Beacon */}
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full border-2 border-white dark:border-[#0b1120] bg-emerald-500" />
            </span>
          </motion.button>

          {/* Simplified Profile Popover Card */}
          <AnimatePresence>
            {activeMenu === "profile" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, x: 8 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.92, x: 8 }}
                transition={appleSpring}
                className="absolute left-full ml-3.5 top-0 w-72 rounded-3xl border border-white/80 bg-white/90 p-4 shadow-2xl shadow-[#091970]/15 backdrop-blur-3xl dark:border-white/15 dark:bg-[#0b1120]/90 text-slate-900 dark:text-slate-100 z-50"
              >
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200/80 dark:border-white/10">
                  <img
                    src={asset("images/me2.jpeg")}
                    alt=""
                    className="h-11 w-11 rounded-2xl object-cover border border-white/80 shadow-md"
                  />
                  <div>
                    <h3 className="text-sm font-black tracking-tight">Mohamed Mustafa</h3>
                    <p className="text-xs text-[#0968e5] font-semibold">Front-End Developer</p>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Available for 2026
                    </span>
                  </div>
                </div>

                <div className="pt-3 space-y-1.5 text-xs font-semibold">
                  <a
                    href={CV_URL}
                    download="Mohamed_Mustafa_CV.pdf"
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#0968e5]/10 dark:hover:bg-[#0968e5]/15 text-slate-800 dark:text-slate-200 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <FileDown className="w-4 h-4 text-[#0968e5]" />
                      Download Resume (PDF)
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                  </a>

                  <a
                    href="mailto:mohammedmustafaibrahim02@gmail.com"
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#0968e5]/10 dark:hover:bg-[#0968e5]/15 text-slate-800 dark:text-slate-200 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#0968e5]" />
                      Direct Email
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-40" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hairline Divider */}
        <span className="w-8 h-px bg-slate-200/80 dark:bg-white/10" />

        {/* --- Core Navigation Items --- */}
        <nav className="flex flex-col items-center gap-2 relative z-10" aria-label="Desktop Nav">
          {/* 1. Home */}
          <div className="relative">
            <motion.button
              type="button"
              onClick={() => {
                if (pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  navigate("/");
                }
              }}
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.92 }}
              onMouseEnter={() => setHoveredItem("home")}
              onMouseLeave={() => setHoveredItem(null)}
              className={`relative grid h-11 w-11 place-items-center rounded-2xl transition-all duration-200 cursor-pointer ${
                isHomeActive
                  ? "bg-gradient-to-br from-[#091970] via-[#094dbf] to-[#0968e5] text-white shadow-lg shadow-[#0968e5]/30"
                  : "text-slate-600 hover:text-[#0968e5] dark:text-slate-300 dark:hover:text-[#0968e5] hover:bg-slate-100 dark:hover:bg-white/[0.08]"
              }`}
              aria-label="Home"
            >
              <Home className="h-5 w-5" />
              {isHomeActive && (
                <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#0968e5] shadow-[0_0_6px_#0968e5]" />
              )}
            </motion.button>
            <AnimatePresence>
              {hoveredItem === "home" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, x: 4 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.88, x: 4 }}
                  transition={{ duration: 0.15 }}
                  className="pointer-events-none absolute left-full ml-3.5 top-1/2 -translate-y-1/2 z-50 whitespace-nowrap rounded-xl border border-white/80 bg-slate-950/85 px-3 py-1.5 text-xs font-semibold text-white shadow-2xl backdrop-blur-xl dark:border-white/20 dark:bg-white/10 dark:text-slate-100"
                >
                  Home
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 2. Skills */}
          <div className="relative">
            <motion.button
              type="button"
              onClick={() => scrollToSection("skills")}
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.92 }}
              onMouseEnter={() => setHoveredItem("skills")}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative grid h-11 w-11 place-items-center rounded-2xl text-slate-600 hover:text-[#0968e5] dark:text-slate-300 dark:hover:text-[#0968e5] hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-all duration-200 cursor-pointer"
              aria-label="Skills & Stack"
            >
              <Code2 className="h-5 w-5" />
            </motion.button>
            <AnimatePresence>
              {hoveredItem === "skills" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, x: 4 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.88, x: 4 }}
                  transition={{ duration: 0.15 }}
                  className="pointer-events-none absolute left-full ml-3.5 top-1/2 -translate-y-1/2 z-50 whitespace-nowrap rounded-xl border border-white/80 bg-slate-950/85 px-3 py-1.5 text-xs font-semibold text-white shadow-2xl backdrop-blur-xl dark:border-white/20 dark:bg-white/10 dark:text-slate-100"
                >
                  Skills &amp; Qualifications
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. Featured Projects */}
          <div className="relative">
            <motion.button
              type="button"
              onClick={() => scrollToSection("projects")}
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.92 }}
              onMouseEnter={() => setHoveredItem("projects")}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative grid h-11 w-11 place-items-center rounded-2xl text-slate-600 hover:text-[#0968e5] dark:text-slate-300 dark:hover:text-[#0968e5] hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-all duration-200 cursor-pointer"
              aria-label="Featured Projects"
            >
              <FolderGit2 className="h-5 w-5" />
            </motion.button>
            <AnimatePresence>
              {hoveredItem === "projects" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, x: 4 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.88, x: 4 }}
                  transition={{ duration: 0.15 }}
                  className="pointer-events-none absolute left-full ml-3.5 top-1/2 -translate-y-1/2 z-50 whitespace-nowrap rounded-xl border border-white/80 bg-slate-950/85 px-3 py-1.5 text-xs font-semibold text-white shadow-2xl backdrop-blur-xl dark:border-white/20 dark:bg-white/10 dark:text-slate-100"
                >
                  Featured Projects
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 4. All Projects Archive */}
          <div className="relative">
            <Link
              to="/Allprojects"
              onMouseEnter={() => setHoveredItem("archive")}
              onMouseLeave={() => setHoveredItem(null)}
              aria-label="All Projects Archive"
              className="outline-none"
            >
              <motion.div
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.92 }}
                className={`relative grid h-11 w-11 place-items-center rounded-2xl transition-all duration-200 cursor-pointer ${
                  isArchiveActive
                    ? "bg-gradient-to-br from-[#091970] via-[#094dbf] to-[#0968e5] text-white shadow-lg shadow-[#0968e5]/30"
                    : "text-slate-600 hover:text-[#0968e5] dark:text-slate-300 dark:hover:text-[#0968e5] hover:bg-slate-100 dark:hover:bg-white/[0.08]"
                }`}
              >
                <Layers className="h-5 w-5" />
                {isArchiveActive && (
                  <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#0968e5] shadow-[0_0_6px_#0968e5]" />
                )}
              </motion.div>
            </Link>
            <AnimatePresence>
              {hoveredItem === "archive" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, x: 4 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.88, x: 4 }}
                  transition={{ duration: 0.15 }}
                  className="pointer-events-none absolute left-full ml-3.5 top-1/2 -translate-y-1/2 z-50 whitespace-nowrap rounded-xl border border-white/80 bg-slate-950/85 px-3 py-1.5 text-xs font-semibold text-white shadow-2xl backdrop-blur-xl dark:border-white/20 dark:bg-white/10 dark:text-slate-100"
                >
                  All Projects Archive
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Hairline Divider */}
        <span className="w-8 h-px bg-slate-200/80 dark:bg-white/10" />

        {/* --- Utilities: CV, Connect, Theme --- */}
        <div className="flex flex-col items-center gap-2 relative z-10">
          {/* Download CV */}
          <div className="relative">
            <a
              href={CV_URL}
              download="Mohamed_Mustafa_CV.pdf"
              onMouseEnter={() => setHoveredItem("cv")}
              onMouseLeave={() => setHoveredItem(null)}
              aria-label="Download CV"
              className="outline-none"
            >
              <motion.div
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.92 }}
                className="grid h-11 w-11 place-items-center rounded-2xl text-slate-600 hover:text-[#0968e5] dark:text-slate-300 dark:hover:text-[#0968e5] hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-all duration-200 cursor-pointer"
              >
                <FileDown className="h-5 w-5" />
              </motion.div>
            </a>
            <AnimatePresence>
              {hoveredItem === "cv" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, x: 4 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.88, x: 4 }}
                  transition={{ duration: 0.15 }}
                  className="pointer-events-none absolute left-full ml-3.5 top-1/2 -translate-y-1/2 z-50 whitespace-nowrap rounded-xl border border-white/80 bg-slate-950/85 px-3 py-1.5 text-xs font-semibold text-white shadow-2xl backdrop-blur-xl dark:border-white/20 dark:bg-white/10 dark:text-slate-100"
                >
                  Download CV (PDF)
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Connect & Socials Popover Trigger */}
          <div className="relative">
            <motion.button
              type="button"
              onClick={() => setActiveMenu(activeMenu === "connect" ? null : "connect")}
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.92 }}
              onMouseEnter={() => setHoveredItem("connect")}
              onMouseLeave={() => setHoveredItem(null)}
              className={`grid h-11 w-11 place-items-center rounded-2xl transition-all duration-200 cursor-pointer ${
                activeMenu === "connect"
                  ? "bg-[#0968e5]/15 text-[#0968e5] border border-[#0968e5]/40"
                  : "text-slate-600 hover:text-[#0968e5] dark:text-slate-300 dark:hover:text-[#0968e5] hover:bg-slate-100 dark:hover:bg-white/[0.08]"
              }`}
              aria-label="Connect and Socials"
            >
              <MessageCircle className="h-5 w-5" />
            </motion.button>
            <AnimatePresence>
              {hoveredItem === "connect" && activeMenu !== "connect" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, x: 4 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.88, x: 4 }}
                  transition={{ duration: 0.15 }}
                  className="pointer-events-none absolute left-full ml-3.5 top-1/2 -translate-y-1/2 z-50 whitespace-nowrap rounded-xl border border-white/80 bg-slate-950/85 px-3 py-1.5 text-xs font-semibold text-white shadow-2xl backdrop-blur-xl dark:border-white/20 dark:bg-white/10 dark:text-slate-100"
                >
                  Connect &amp; Socials
                </motion.div>
              )}
            </AnimatePresence>

            {/* Simplified Socials Popover (قائمة صغيرة ومبسطة) */}
            <AnimatePresence>
              {activeMenu === "connect" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, x: 8 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.92, x: 8 }}
                  transition={appleSpring}
                  className="absolute left-full ml-3.5 top-1/2 -translate-y-1/2 w-64 rounded-3xl border border-white/80 bg-white/90 p-2.5 shadow-2xl shadow-[#091970]/15 backdrop-blur-3xl dark:border-white/15 dark:bg-[#0b1120]/90 text-slate-900 dark:text-slate-100 z-50"
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                    <span>Direct Channels</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  <div className="pt-2 space-y-1">
                    {socialLinks.map((s) => (
                      <a
                        key={s.id}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-[#0968e5]/10 dark:hover:bg-[#0968e5]/15 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          {s.icon}
                          <div>
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#0968e5] dark:group-hover:text-[#7ab3ff] transition-colors">
                              {s.label}
                            </p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                              {s.subtitle}
                            </p>
                          </div>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#0968e5]" />
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Switcher Button */}
          <div className="relative">
            <motion.button
              type="button"
              onClick={toggleTheme}
              whileHover={{ scale: 1.12, rotate: isDark ? -20 : 20 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setHoveredItem("theme")}
              onMouseLeave={() => setHoveredItem(null)}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="grid h-11 w-11 place-items-center rounded-2xl text-amber-500 hover:bg-amber-400/10 transition-colors cursor-pointer"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? "moon" : "sun"}
                  initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <AnimatePresence>
              {hoveredItem === "theme" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, x: 4 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.88, x: 4 }}
                  transition={{ duration: 0.15 }}
                  className="pointer-events-none absolute left-full ml-3.5 top-1/2 -translate-y-1/2 z-50 whitespace-nowrap rounded-xl border border-white/80 bg-slate-950/85 px-3 py-1.5 text-xs font-semibold text-white shadow-2xl backdrop-blur-xl dark:border-white/20 dark:bg-white/10 dark:text-slate-100"
                >
                  {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* ------------------------------------------------------------- */}
      {/* 2. MOBILE DYNAMIC FLOATING GLASS DOCK (ERGONOMIC & SLEEK)     */}
      {/* ------------------------------------------------------------- */}
      <motion.aside
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 350, damping: 26 }}
        className="fixed bottom-3 inset-x-3 max-w-[22.5rem] sm:max-w-sm mx-auto z-50 flex items-center justify-between rounded-full border border-white/80 bg-white/85 p-1.5 shadow-2xl shadow-[#091970]/15 backdrop-blur-2xl dark:border-white/15 dark:bg-[#0b1120]/85 dark:shadow-black/70 md:hidden transition-colors select-none"
        aria-label="Mobile Navigation Dock"
      >
        {/* Profile Avatar Button */}
        <button
          type="button"
          onClick={() => setActiveMenu(activeMenu === "mobile-profile" ? null : "mobile-profile")}
          className="relative grid place-items-center rounded-full p-0.5"
          aria-label="Profile quick menu"
        >
          <div className="h-9 w-9 rounded-full overflow-hidden p-[1.5px] bg-gradient-to-br from-[#091970] via-[#094dbf] to-[#0968e5]">
            <img
              src={asset("images/me2.jpeg")}
              alt="Mohamed Mustafa"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-[#0b1120] bg-emerald-500" />
        </button>

        {/* Home */}
        <button
          type="button"
          onClick={() => {
            if (pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              navigate("/");
            }
          }}
          className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${
            isHomeActive
              ? "bg-gradient-to-br from-[#091970] via-[#094dbf] to-[#0968e5] text-white shadow-md shadow-[#0968e5]/30"
              : "text-slate-600 dark:text-slate-300"
          }`}
          aria-label="Home"
        >
          <Home className="h-4 w-4" />
        </button>

        {/* Projects */}
        <button
          type="button"
          onClick={() => scrollToSection("projects")}
          className="grid h-9 w-9 place-items-center rounded-full text-slate-600 dark:text-slate-300"
          aria-label="Projects"
        >
          <FolderGit2 className="h-4 w-4" />
        </button>

        {/* Skills */}
        <button
          type="button"
          onClick={() => scrollToSection("skills")}
          className="grid h-9 w-9 place-items-center rounded-full text-slate-600 dark:text-slate-300"
          aria-label="Skills"
        >
          <Code2 className="h-4 w-4" />
        </button>

        {/* Archive */}
        <Link
          to="/Allprojects"
          className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${
            isArchiveActive
              ? "bg-gradient-to-br from-[#091970] via-[#094dbf] to-[#0968e5] text-white shadow-md shadow-[#0968e5]/30"
              : "text-slate-600 dark:text-slate-300"
          }`}
          aria-label="Projects Archive"
        >
          <Layers className="h-4 w-4" />
        </Link>

        {/* Connect Flyout */}
        <button
          type="button"
          onClick={() => setActiveMenu(activeMenu === "mobile-connect" ? null : "mobile-connect")}
          className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${
            activeMenu === "mobile-connect"
              ? "bg-[#0968e5]/20 text-[#0968e5]"
              : "text-slate-600 dark:text-slate-300"
          }`}
          aria-label="Connect and Socials"
        >
          <MessageCircle className="h-4 w-4" />
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="grid h-9 w-9 place-items-center rounded-full text-amber-500"
          aria-label="Toggle theme"
        >
          {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>
      </motion.aside>

      {/* --- Mobile Profile Popover Sheet --- */}
      <AnimatePresence>
        {activeMenu === "mobile-profile" && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={appleSpring}
            className="fixed bottom-18 inset-x-4 max-w-xs mx-auto z-50 rounded-3xl border border-white/80 bg-white/95 p-4 shadow-2xl shadow-[#091970]/20 backdrop-blur-3xl dark:border-white/15 dark:bg-[#0b1120]/95 text-slate-900 dark:text-slate-100 md:hidden"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
              <div className="flex items-center gap-3">
                <img
                  src={asset("images/me2.jpeg")}
                  alt=""
                  className="h-10 w-10 rounded-2xl object-cover border border-white/80 shadow-md"
                />
                <div>
                  <h3 className="text-sm font-black tracking-tight">Mohamed Mustafa</h3>
                  <p className="text-xs text-[#0968e5] font-semibold">Front-End Developer</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveMenu(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-3 space-y-1.5 text-xs font-semibold">
              <a
                href={CV_URL}
                download="Mohamed_Mustafa_CV.pdf"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#0968e5]/10 dark:hover:bg-[#0968e5]/15 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <FileDown className="w-4 h-4 text-[#0968e5]" />
                  Download Resume (PDF)
                </span>
                <ChevronRight className="w-3.5 h-3.5 opacity-40" />
              </a>

              <a
                href="mailto:mohammedmustafaibrahim02@gmail.com"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#0968e5]/10 dark:hover:bg-[#0968e5]/15 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#0968e5]" />
                  Direct Email
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-40" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Mobile Connect Popover Sheet --- */}
      <AnimatePresence>
        {activeMenu === "mobile-connect" && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={appleSpring}
            className="fixed bottom-18 inset-x-4 max-w-xs mx-auto z-50 rounded-3xl border border-white/80 bg-white/95 p-3.5 shadow-2xl shadow-[#091970]/20 backdrop-blur-3xl dark:border-white/15 dark:bg-[#0b1120]/95 text-slate-900 dark:text-slate-100 md:hidden"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-white/10 px-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
                  Direct Channels
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <button
                type="button"
                onClick={() => setActiveMenu(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-2 space-y-1">
              {socialLinks.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-[#0968e5]/10 dark:hover:bg-[#0968e5]/15 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    {s.icon}
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#0968e5] dark:group-hover:text-[#7ab3ff] transition-colors">
                        {s.label}
                      </p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                        {s.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-40 text-[#0968e5]" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
