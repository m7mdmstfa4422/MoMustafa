"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Award, Code2, GraduationCap, Sparkles } from "lucide-react";

const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const skills = [
  { name: "HTML5", logo: "html.png", tint: "from-orange-400 to-rose-500", description: "Semantic, accessible structure" },
  { name: "CSS3", logo: "css.png", tint: "from-blue-400 to-indigo-500", description: "Responsive layouts & motion" },
  { name: "JavaScript", logo: "js.png", tint: "from-amber-300 to-orange-500", description: "Interactive web experiences" },
  { name: "React.js", logo: "react.png", tint: "from-cyan-300 to-blue-500", description: "Reusable component systems" },
  { name: "Tailwind CSS", logo: "tailwind.png", tint: "from-teal-300 to-cyan-500", description: "Fast, consistent UI design" },
  { name: "REST APIs", logo: "api.png", tint: "from-violet-400 to-indigo-500", description: "Data-driven applications" },
];

const certificates = [
  { title: "Bachelor Degree", issuer: "Faculty of Computers and Information — Higher Future Institute for Specialized Technological Studies", year: "2024", description: "Bachelor of Computer Science", icon: GraduationCap, tint: "from-indigo-500 to-violet-500" },
  { title: "Frontend Development", issuer: "GDSC Web Course", year: "2022", description: "Advanced user interface development", icon: Code2, tint: "from-cyan-500 to-blue-500" },
  { title: "Artificial Intelligence", issuer: "Information Technology Institute", year: "2024", description: "Machine learning, deep learning, and AI algorithms", icon: Award, tint: "from-amber-400 to-orange-500" },
  { title: "Frontend Development Diploma", issuer: "Route IT Training Center", year: "2024", description: "React, responsive design, and web performance optimization", icon: Sparkles, tint: "from-fuchsia-500 to-violet-500" },
];

const reveal = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 105, damping: 17 } } };

export default function StatsSection() {
  const [tab, setTab] = useState("skills");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.16 });

  return (
    <section ref={sectionRef} aria-label="Skills and qualifications" className="relative isolate overflow-hidden bg-[#f5f7ff] px-6 py-24 text-slate-900 dark:bg-[#0b1120] dark:text-slate-100 md:px-12 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 opacity-70 dark:opacity-100" style={{ backgroundImage: "linear-gradient(rgba(129,140,248,.07) 1px, transparent 1px),linear-gradient(90deg,rgba(129,140,248,.07) 1px,transparent 1px)", backgroundSize: "52px 52px", maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)" }} />
        <motion.div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-violet-400/15 blur-3xl dark:bg-violet-500/15" animate={{ x: [0, 60, 0], y: [0, -35, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-400/10" animate={{ x: [0, -55, 0], scale: [1, 1.15, 1] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
      </div>

      <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="mx-auto max-w-6xl">
        <motion.div variants={reveal} className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[.16em] text-indigo-600 shadow-sm dark:border-cyan-300/15 dark:bg-white/[.05] dark:text-cyan-200"><Sparkles className="h-3.5 w-3.5" /> Craft & learning</span>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Skills &amp; qualifications</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">A focused toolkit for crafting fast, accessible, and polished digital products.</p>
        </motion.div>

        <motion.div variants={reveal} className="mx-auto mb-10 flex w-fit rounded-2xl border border-white/70 bg-white/60 p-1.5 shadow-lg shadow-indigo-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/[.045]">
          {[{ id: "skills", label: "Core skills", icon: Code2 }, { id: "certificates", label: "Qualifications", icon: GraduationCap }].map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" onClick={() => setTab(id)} className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none transition md:px-6 ${tab === id ? "text-white" : "text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"}`}>
              {tab === id && <motion.span layoutId="active-tab" className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 shadow-lg shadow-indigo-500/25" transition={{ type: "spring", stiffness: 370, damping: 30 }} />}
              <Icon className="h-4 w-4" />{label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {tab === "skills" ? (
            <motion.div key="skills" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.24 }}>
              <div className="mb-8 rounded-[1.75rem] border border-white/70 bg-white/55 p-6 text-center shadow-xl shadow-indigo-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/[.04] md:p-8">
                <h3 className="text-2xl font-bold">Frontend development</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">The technologies I use to turn ideas into refined web interfaces.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {skills.map((skill, index) => (
                  <motion.article key={skill.name} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }} whileHover={{ y: -7, transition: { type: "spring", stiffness: 330, damping: 22 } }} className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/65 p-5 shadow-lg shadow-indigo-950/[.04] backdrop-blur-xl dark:border-white/10 dark:bg-white/[.045]">
                    <span className={`absolute -right-12 -top-12 h-28 w-28 rounded-full bg-gradient-to-br ${skill.tint} opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30`} />
                    <div className="relative flex items-center gap-4">
                      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-slate-100 bg-white p-2.5 shadow-sm dark:border-white/10 dark:bg-slate-950/30"><img src={asset(`images/webIcon/${skill.logo}`)} alt="" className="h-full w-full object-contain" /></div>
                      <div><h4 className="font-bold">{skill.name}</h4><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{skill.description}</p></div>
                    </div>
                  </motion.article>
                ))}
              </div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-8 flex flex-wrap justify-center gap-2">
                {["Responsive design", "Accessibility", "Performance", "Component architecture", "Modern ES6+", "Cross-browser support"].map((item) => <span key={item} className="rounded-full border border-indigo-100 bg-indigo-50/70 px-3 py-1.5 text-sm font-medium text-indigo-700 dark:border-white/10 dark:bg-white/[.045] dark:text-indigo-200">{item}</span>)}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="certificates" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.24 }}>
              <div className="grid gap-5 md:grid-cols-2">
                {certificates.map((certificate, index) => {
                  const Icon = certificate.icon;
                  return <motion.article key={certificate.title} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} whileHover={{ y: -6 }} className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/65 p-6 shadow-lg shadow-indigo-950/[.05] backdrop-blur-xl dark:border-white/10 dark:bg-white/[.045]">
                    <span className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${certificate.tint} opacity-10 blur-2xl transition-opacity group-hover:opacity-30`} />
                    <div className="relative flex gap-4"><div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${certificate.tint} p-3 text-white shadow-lg`}><Icon className="h-6 w-6" /></div><div className="min-w-0 flex-1"><div className="mb-2 flex items-start justify-between gap-3"><h3 className="text-lg font-bold">{certificate.title}</h3><span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600 dark:border-white/10 dark:bg-slate-950/30 dark:text-slate-300">{certificate.year}</span></div><p className="text-sm font-semibold text-indigo-600 dark:text-cyan-300">{certificate.issuer}</p><p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{certificate.description}</p></div></div>
                  </motion.article>;
                })}
              </div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-8 rounded-[1.75rem] border border-indigo-200/70 bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-cyan-400/10 p-7 text-center dark:border-cyan-300/15 dark:from-indigo-500/10 dark:via-violet-500/10 dark:to-cyan-400/10"><GraduationCap className="mx-auto h-9 w-9 text-indigo-600 dark:text-cyan-300" /><h3 className="mt-3 text-xl font-bold">Built on strong foundations</h3><p className="mx-auto mt-2 max-w-2xl text-slate-600 dark:text-slate-300">Computer science fundamentals paired with practical, modern frontend development.</p></motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
