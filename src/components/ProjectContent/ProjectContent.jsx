"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Code2, ExternalLink, Github, Home, Maximize2, Sparkles, X, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const reveal = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 110, damping: 18 } } };

export default function ProjectContent({ project }) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const gallery = project?.gallery?.length ? project.gallery : (project?.image ? [project.image] : ["/placeholder.svg"]);
  const currentImage = gallery[selectedImageIndex] || gallery[0];
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.45], [0, 0.35, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.975, 1]);

  useEffect(() => { document.title = `${project?.title || "Project"} | Project`; }, [project?.title]);
  useEffect(() => {
    const onKeyDown = (event) => {
      if (!isLightboxOpen) return;
      if (event.key === "Escape") setIsLightboxOpen(false);
      if (event.key === "ArrowLeft") setSelectedImageIndex((i) => (i + gallery.length - 1) % gallery.length);
      if (event.key === "ArrowRight") setSelectedImageIndex((i) => (i + 1) % gallery.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [gallery.length, isLightboxOpen]);

  const openProjects = () => {
    try { localStorage.setItem("scrollTo", "projects"); localStorage.setItem("showAllProjects", "1"); } catch { /* storage is optional */ }
    navigate("/");
  };
  const moveImage = (direction) => setSelectedImageIndex((i) => (i + direction + gallery.length) % gallery.length);

  return (
    <motion.section ref={ref} style={{ opacity, scale }} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} className="relative isolate overflow-hidden bg-[#f5f7ff] px-6 py-16 dark:bg-[#0b1120] md:px-10 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 opacity-70 dark:opacity-100" style={{ backgroundImage: "linear-gradient(rgba(129,140,248,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(129,140,248,.07) 1px,transparent 1px)", backgroundSize: "52px 52px", maskImage: "linear-gradient(to bottom,transparent,black 15%,black 85%,transparent)" }} />
        <motion.div className="absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-500/18" animate={{ x: [0, 70, 0], y: [0, -40, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute -bottom-40 -right-20 h-[32rem] w-[32rem] rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-400/12" animate={{ x: [0, -60, 0], scale: [1, 1.12, 1] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
      </div>

      <div className="mx-auto max-w-7xl">
        <motion.nav variants={reveal} className="mb-8 flex flex-wrap items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400" aria-label="Breadcrumb">
          <Link to="/" className="inline-flex items-center gap-2 transition hover:text-indigo-600 dark:hover:text-cyan-300"><Home className="h-4 w-4" />Home</Link><ChevronRight className="h-4 w-4 opacity-50" />
          <button type="button" onClick={openProjects} className="transition hover:text-indigo-600 dark:hover:text-cyan-300">Projects</button><ChevronRight className="h-4 w-4 opacity-50" />
          <span className="max-w-[12rem] truncate font-semibold text-slate-800 dark:text-slate-200">{project?.title || "Project"}</span>
        </motion.nav>

        <motion.div variants={reveal} className="rounded-[2rem] border border-white/70 bg-white/55 p-5 shadow-2xl shadow-indigo-950/[.08] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[.045] dark:shadow-black/30 md:p-9 lg:p-12">
          <div className="grid items-start gap-10 lg:grid-cols-5 lg:gap-12">
            <div className="space-y-8 lg:col-span-3">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-2"><span className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50/70 px-3 py-1.5 text-xs font-bold text-indigo-700 dark:border-cyan-300/15 dark:bg-cyan-300/[.07] dark:text-cyan-200"><Sparkles className="h-3.5 w-3.5" />{project?.category || "Web development"}</span>{project?.year && <span className="rounded-full border border-slate-200 bg-white/60 px-3 py-1.5 text-xs font-semibold text-slate-500 dark:border-white/10 dark:bg-white/[.04] dark:text-slate-300">{project.year}</span>}</div>
                <h1 className="text-4xl font-bold tracking-tight text-transparent bg-gradient-to-r from-slate-900 via-indigo-600 to-cyan-500 bg-clip-text dark:from-white dark:via-indigo-200 dark:to-cyan-300 md:text-6xl">{project?.title || "Project title"}</h1>
                {project?.subtitle && <p className="mt-4 text-lg font-medium text-indigo-600 dark:text-cyan-300">{project.subtitle}</p>}
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">{project?.description || "A carefully crafted project focused on performance, accessibility, and an excellent user experience."}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[{ icon: Zap, title: "Thoughtful experience", text: "Clean interactions and a focused interface designed around the user." }, { icon: Code2, title: "Modern build", text: "Responsive foundations, maintainable components, and reliable performance." }].map(({ icon: Icon, title, text }) => <motion.div key={title} whileHover={{ y: -5 }} className="rounded-2xl border border-white/70 bg-white/55 p-5 shadow-lg shadow-indigo-950/[.04] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/20"><span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25"><Icon className="h-5 w-5" /></span><h2 className="font-bold text-slate-900 dark:text-white">{title}</h2><p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{text}</p></motion.div>)}
              </div>

              <div><h2 className="mb-4 text-sm font-bold uppercase tracking-[.15em] text-slate-600 dark:text-slate-300">Technologies</h2>{project?.icons?.length ? <div className="flex flex-wrap gap-3">{project.icons.map((src, index) => <motion.div key={`${src}-${index}`} whileHover={{ y: -4, scale: 1.07 }} className="grid h-14 w-14 place-items-center rounded-2xl border border-white/70 bg-white/65 p-3 shadow-md dark:border-white/10 dark:bg-white/[.055]"><img src={src} alt={`Technology ${index + 1}`} className="h-full w-full object-contain" /></motion.div>)}</div> : <div className="flex flex-wrap gap-2">{(project?.tags?.length ? project.tags : ["React", "Vite", "Tailwind CSS"]).map((tag) => <span key={tag} className="rounded-full border border-indigo-100 bg-indigo-50/70 px-3 py-1.5 text-sm font-medium text-indigo-700 dark:border-white/10 dark:bg-white/[.055] dark:text-indigo-200">{tag}</span>)}</div>}</div>

              <div className="flex flex-wrap gap-3 pt-2">
                {project?.link && <motion.a href={project.link} target="_blank" rel="noopener noreferrer" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 px-6 py-3 font-bold text-white shadow-lg shadow-indigo-500/30"><ExternalLink className="h-4 w-4" />Live preview</motion.a>}
                {project?.github && <motion.a href={project.github} target="_blank" rel="noopener noreferrer" whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/65 px-6 py-3 font-bold text-slate-800 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[.055] dark:text-white"><Github className="h-4 w-4" />Source code</motion.a>}
              </div>
            </div>

            <div className="space-y-4 lg:col-span-2">
              <motion.button type="button" onClick={() => setIsLightboxOpen(true)} whileHover={{ y: -5 }} className="group relative block w-full overflow-hidden rounded-[1.65rem] border border-white/50 p-1.5 text-left shadow-2xl shadow-indigo-950/20 outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/60 dark:border-white/10">
                <img src={currentImage} alt={`${project?.title || "Project"} preview`} className="aspect-[16/10] w-full rounded-[1.25rem] object-cover transition duration-700 group-hover:scale-[1.035]" />
                <span className="absolute inset-1.5 rounded-[1.25rem] bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-slate-950/40 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md"><Maximize2 className="h-3.5 w-3.5" />View gallery</span>
                <span className="absolute right-5 top-5 rounded-full border border-white/25 bg-slate-950/40 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">{selectedImageIndex + 1} / {gallery.length}</span>
              </motion.button>
              {gallery.length > 1 && <div className="grid grid-cols-4 gap-3">{gallery.map((image, index) => <button key={`${image}-${index}`} type="button" onClick={() => setSelectedImageIndex(index)} className={`overflow-hidden rounded-xl border p-1 outline-none transition focus-visible:ring-2 focus-visible:ring-cyan-400 ${selectedImageIndex === index ? "border-cyan-400 bg-cyan-400/20" : "border-white/60 bg-white/45 hover:border-indigo-300 dark:border-white/10 dark:bg-white/[.045]"}`} aria-label={`Show image ${index + 1}`}><img src={image} alt="" className="aspect-square w-full rounded-lg object-cover" /></button>)}</div>}
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>{isLightboxOpen && <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/80 p-4 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsLightboxOpen(false)} role="dialog" aria-modal="true" aria-label="Project image gallery"><motion.div initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ type: "spring", stiffness: 250, damping: 25 }} onClick={(event) => event.stopPropagation()} className="relative w-full max-w-6xl"><img src={currentImage} alt={`${project?.title || "Project"} enlarged`} className="max-h-[84vh] w-full rounded-2xl object-contain shadow-2xl" /><button type="button" onClick={() => setIsLightboxOpen(false)} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-slate-950/55 text-white backdrop-blur transition hover:bg-white/20" aria-label="Close gallery"><X className="h-5 w-5" /></button>{gallery.length > 1 && <><button type="button" onClick={() => moveImage(-1)} className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-slate-950/55 text-white backdrop-blur transition hover:bg-white/20" aria-label="Previous image"><ChevronLeft className="h-6 w-6" /></button><button type="button" onClick={() => moveImage(1)} className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-slate-950/55 text-white backdrop-blur transition hover:bg-white/20" aria-label="Next image"><ChevronRight className="h-6 w-6" /></button></>}<span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-950/55 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">{selectedImageIndex + 1} / {gallery.length}</span></motion.div></motion.div>}</AnimatePresence>
    </motion.section>
  );
}
