"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const CV_URL = `${import.meta.env.BASE_URL}Mohamed_Mustafa_CV.pdf`;
const links = [
  { id: "home", label: "Home", icon: "home", to: "/" },
  { id: "cv", label: "Download CV", icon: "download", href: CV_URL },
  { id: "email", label: "Email me", icon: "mail", href: "https://mail.google.com/mail/?view=cm&fs=1&to=mohammedmustafaibrahim02@gmail.com" },
  { id: "linkedin", label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/mohammed-mustafa-416318362/" },
  { id: "github", label: "GitHub", icon: "github", href: "https://github.com/m7mdmstfa4422" },
  { id: "whatsapp", label: "WhatsApp", icon: "whatsapp", href: "https://wa.me/201003154481" },
];

function Icon({ name, className = "" }) {
  const props = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, className };
  const artwork = {
    home: <><path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /><path d="M9 22v-8h6v8" /></>,
    download: <><path d="M12 3v11" /><path d="m8 10 4 4 4-4" /><path d="M5 15v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    linkedin: <><path d="M7 10v7M7 7.2v.1M11 17v-4a3 3 0 0 1 6 0v4M11 10v7" /><rect x="3" y="3" width="18" height="18" rx="2" /></>,
    github: <path fill="currentColor" stroke="none" d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.2 3.3 1 .1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3 0 0 1-.3 3.1 1.2.9-.2 1.9-.4 2.9-.4s2 .1 2.9.4c2.2-1.5 3.1-1.2 3.1-1.2.6 1.5.2 2.7.1 3 .7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1 .8 2.1v3.1c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5Z" />,
    whatsapp: <path fill="currentColor" stroke="none" d="M12 2a10 10 0 0 0-8.5 15.25L2 22l4.9-1.44A10 10 0 1 0 12 2Zm0 18a7.94 7.94 0 0 1-4.05-1.11l-.29-.17-2.91.86.86-2.84-.19-.3A7.94 7.94 0 1 1 12 20Zm4.49-5.74c-.25-.13-1.47-.73-1.7-.81-.23-.09-.4-.13-.56.12-.17.25-.65.81-.8.97-.15.17-.3.19-.55.07-.25-.13-1.07-.39-2.04-1.24-.75-.67-1.26-1.49-1.41-1.74-.15-.25-.02-.38.11-.5.12-.12.25-.3.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09 0 1.23.9 2.42 1.02 2.59.13.17 1.77 2.7 4.28 3.79 2.52 1.09 2.52.73 2.98.68.46-.04 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29Z" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
    moon: <path d="M21 14.1A8.6 8.6 0 0 1 9.9 3 9 9 0 1 0 21 14.1Z" />,
  };
  return <svg {...props}>{artwork[name]}</svg>;
}

function DockItem({ item, active, select }) {
  const styles = "group relative grid h-10 w-10 place-items-center rounded-xl text-slate-600 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 dark:text-slate-300 sm:h-11 sm:w-11";
  const content = <><span className={`absolute inset-0 rounded-xl transition-all ${active ? "bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 shadow-lg shadow-blue-500/30" : "bg-white/45 opacity-0 group-hover:opacity-100 dark:bg-white/[.09]"}`} />{active && <motion.span layoutId="active-glow" className="absolute -inset-1 rounded-2xl bg-cyan-400/25 blur-lg" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}<Icon name={item.icon} className={`relative z-10 h-5 w-5 ${active ? "text-white" : ""}`} /><span className="pointer-events-none absolute left-1/2 top-full z-30 mt-3 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/15 bg-slate-950/90 px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100 md:left-full md:top-1/2 md:ml-3 md:mt-0 md:-translate-y-1/2 md:translate-x-0">{item.label}</span></>;
  const animation = { whileHover: { scale: 1.12, y: -2 }, whileTap: { scale: 0.92 } };
  return item.to ? <motion.div {...animation}><Link to={item.to} onClick={select} aria-label={item.label} aria-current={active ? "page" : undefined} className={styles}>{content}</Link></motion.div> : <motion.a {...animation} href={item.href} target="_blank" rel="noopener noreferrer" onClick={select} aria-label={item.label} className={styles}>{content}</motion.a>;
}

export default function Sidebar() {
  const { pathname } = useLocation();
  const [isDark, setIsDark] = useState(true);
  const [active, setActive] = useState("home");
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
  useEffect(() => { const dark = localStorage.theme === "dark" || (!localStorage.theme && window.matchMedia("(prefers-color-scheme: dark)").matches); setIsDark(dark); document.documentElement.classList.toggle("dark", dark); }, []);
  useEffect(() => { if (pathname === "/") setActive("home"); }, [pathname]);
  const toggleTheme = () => { const next = !isDark; setIsDark(next); localStorage.theme = next ? "dark" : "light"; document.documentElement.classList.toggle("dark", next); };

  return <motion.aside initial={{ opacity: 0, y: 28, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 180, damping: 20, delay: 0.15 }} onPointerMove={(event) => { const box = event.currentTarget.getBoundingClientRect(); setPointer({ x: ((event.clientX - box.left) / box.width) * 100, y: ((event.clientY - box.top) / box.height) * 100 }); }} className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-[35rem] -translate-x-1/2 items-center justify-between overflow-hidden rounded-[1.65rem] border border-white/70 bg-[#f5f7ff]/70 p-2 shadow-2xl shadow-indigo-950/10 backdrop-blur-2xl dark:border-white/10 dark:bg-[#0b1120]/72 dark:shadow-black/45 md:bottom-auto md:left-4 md:top-1/2 md:h-[calc(100vh-2rem)] md:w-[5.5rem] md:max-w-none md:-translate-y-1/2 md:translate-x-0 md:flex-col md:rounded-[2rem] md:p-3">
    <span aria-hidden="true" className="pointer-events-none absolute inset-0"><span className="absolute -inset-20 blur-3xl transition-all duration-300" style={{ background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(34,211,238,.26), transparent 26%)` }} /><span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent dark:via-cyan-300/60" /><span className="absolute inset-0 bg-gradient-to-br from-white/45 via-transparent to-indigo-200/25 dark:from-white/[.06] dark:via-transparent dark:to-indigo-500/[.09]" /></span>
    <motion.div whileHover={{ rotate: 4, scale: 1.06 }} className="relative hidden md:block"><div className="rounded-2xl bg-gradient-to-br from-cyan-300 via-blue-500 to-violet-500 p-[2px] shadow-lg shadow-blue-500/35"><img src={asset("images/me2.jpeg")} alt="Mohamed Mustafa" className="h-12 w-12 rounded-[14px] object-cover" /></div><span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-[#0b1120] bg-emerald-400" /></motion.div>
    <nav className="relative z-10 flex items-center gap-1 sm:gap-2 md:flex-col md:gap-3" aria-label="Portfolio navigation">{links.map((item) => <DockItem key={item.id} item={item} active={active === item.id} select={() => setActive(item.id)} />)}</nav>
    <div className="relative z-10 flex items-center border-l border-slate-200/70 pl-2 dark:border-white/10 md:border-l-0 md:border-t md:pl-0 md:pt-3"><motion.button type="button" onClick={toggleTheme} whileHover={{ rotate: isDark ? -18 : 18, scale: 1.08 }} whileTap={{ scale: 0.9 }} aria-label={isDark ? "Use light theme" : "Use dark theme"} className="grid h-10 w-10 place-items-center rounded-xl text-amber-500 transition hover:bg-amber-400/15 focus-visible:ring-2 focus-visible:ring-cyan-400"><AnimatePresence mode="wait" initial={false}><motion.span key={isDark ? "moon" : "sun"} initial={{ opacity: 0, rotate: -45, scale: 0.7 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 45, scale: 0.7 }}><Icon name={isDark ? "moon" : "sun"} className="h-5 w-5" /></motion.span></AnimatePresence></motion.button></div>
  </motion.aside>;
}
