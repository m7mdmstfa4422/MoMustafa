"use client";

import { useRef, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  Code2,
  GraduationCap,
  Sparkles,
  Server,
  Database,
  Layers,
  Cpu,
  Workflow,
  Globe,
  Monitor,
  ArrowRight,
} from "lucide-react";

const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

// -------------------------------------------------------------
// TECHNICAL STACK (CONCISE & FOCUSED)
// -------------------------------------------------------------
const TECH_STACK = [
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    role: "Backend Runtime & APIs",
    logo: "nodejs.png",
    badge: "Backend Core",
    description: "Event-driven runtime for scalable REST APIs, custom middleware, and authentication.",
    tags: ["Express.js", "REST APIs", "JWT Auth", "Middleware"],
    icon: Server,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "backend",
    role: "NoSQL Document Database",
    logo: "mongobd.png",
    badge: "Database",
    description: "Schema design, Mongoose ODM modeling, aggregation pipelines, and secure storage.",
    tags: ["Mongoose ODM", "Data Modeling", "Aggregations", "CRUD"],
    icon: Database,
  },
  {
    id: "rest-api",
    name: "REST APIs",
    category: "backend",
    role: "Client-Server Architecture",
    logo: "api.png",
    badge: "Networking",
    description: "Seamless HTTP/HTTPS protocols, JSON serialization, and robust error handling.",
    tags: ["Axios / Fetch", "JWT Security", "JSON Payload", "Status Codes"],
    icon: Workflow,
  },
  {
    id: "react",
    name: "React.js (v19)",
    category: "frontend",
    role: "Modern Reactive UI Engine",
    logo: "react.png",
    badge: "UI Engine",
    description: "Component architecture, custom hooks, context management, and fast Virtual DOM rendering.",
    tags: ["Hooks & Context", "Component System", "React Router", "State"],
    icon: Cpu,
  },
  {
    id: "javascript",
    name: "JavaScript (ES6+)",
    category: "frontend",
    role: "Core Logic & Async Programming",
    logo: "js.png",
    badge: "Core Logic",
    description: "Modern ECMAScript standards, asynchronous workflows, DOM APIs, and OOP patterns.",
    tags: ["ES6+ Syntax", "Async / Await", "DOM APIs", "OOP"],
    icon: Code2,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    role: "Design Token Systems",
    logo: "tailwind.png",
    badge: "Design Tokens",
    description: "Utility-first design tokens, responsive breakpoints, and dark mode theming.",
    tags: ["Responsive Grids", "Design Tokens", "Dark Mode", "Micro-interactions"],
    icon: Sparkles,
  },
  {
    id: "html5",
    name: "HTML5",
    category: "frontend",
    role: "Semantic Web & Accessibility",
    logo: "html.png",
    badge: "Structure",
    description: "Accessible structures, strict SEO standards, form validation, and WCAG compliance.",
    tags: ["Semantic Markup", "WCAG a11y", "SEO", "Validation"],
    icon: Globe,
  },
  {
    id: "css3",
    name: "CSS3 & Animations",
    category: "frontend",
    role: "Fluid Layouts & Dynamics",
    logo: "css.png",
    badge: "Visuals",
    description: "CSS Grid and Flexbox layouts, fluid scaling, keyframe physics, and transitions.",
    tags: ["CSS Grid & Flex", "Keyframes", "Glassmorphism", "Responsive"],
    icon: Monitor,
  },
  {
    id: "bootstrap",
    name: "Bootstrap UI",
    category: "frontend",
    role: "Rapid UI Prototyping",
    logo: "bootstrap.png",
    badge: "UI Kit",
    description: "12-column grid systems, prebuilt components, and rapid responsive interfaces.",
    tags: ["12-Col Grid", "Modals", "Responsive Utilities"],
    icon: Layers,
  },
];

// -------------------------------------------------------------
// VERIFIED CREDENTIALS (CONCISE & FOCUSED)
// -------------------------------------------------------------
const CERTIFICATES = [
  {
    id: "node-2026",
    title: "Backend Development with Node.js & Express",
    issuer: "Professional Backend Engineering Academy",
    year: "2026",
    badge: "Featured 2026",
    isFeatured: true,
    description: "Node.js server architecture, Express.js REST APIs, MongoDB integration, and JWT auth.",
    icon: Server,
    tint: "from-[#091970] via-[#094dbf] to-[#0968e5]",
    competencies: ["Node.js", "Express.js", "MongoDB", "JWT Security", "REST APIs"],
  },
  {
    id: "bachelor-2024",
    title: "Bachelor Degree in Computer Science",
    issuer: "Higher Future Institute for Specialized Technological Studies",
    year: "2024",
    badge: "Degree Conferred",
    isFeatured: false,
    description: "Four-year curriculum in algorithms, data structures, OOP, databases, and software design.",
    icon: GraduationCap,
    tint: "from-indigo-600 to-[#0968e5]",
    competencies: ["Algorithms", "Data Structures", "OOP", "Software Design"],
  },
  {
    id: "route-2024",
    title: "Frontend Development Diploma",
    issuer: "Route IT Training Center",
    year: "2024",
    badge: "Certified",
    isFeatured: false,
    description: "Comprehensive React frontend engineering, modern state management, and responsive systems.",
    icon: Sparkles,
    tint: "from-fuchsia-500 to-violet-600",
    competencies: ["React.js", "State Control", "REST APIs", "Modern ES6+"],
  },
  {
    id: "iti-2024",
    title: "Artificial Intelligence Foundations",
    issuer: "Information Technology Institute (ITI)",
    year: "2024",
    badge: "Certified",
    isFeatured: false,
    description: "Foundations of machine learning, neural network concepts, and data-driven algorithms.",
    icon: Award,
    tint: "from-amber-400 to-orange-500",
    competencies: ["Machine Learning", "Neural Nets", "Python", "Data Analysis"],
  },
  {
    id: "gdsc-2022",
    title: "Advanced Web Development Certificate",
    issuer: "Google Developer Student Clubs (GDSC)",
    year: "2022",
    badge: "Certified",
    isFeatured: false,
    description: "Progressive web apps, modern responsive layouts, web standards, and developer workflows.",
    icon: Code2,
    tint: "from-cyan-500 to-blue-500",
    competencies: ["Modern JS", "Responsive Design", "Git & GitHub", "PWA"],
  },
];

// Motion Timing Constants (0.4s Timing)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4, // تم التعديل إلى 0.4 ثانية
      delayChildren: 0.05,
    },
  },
};

const revealVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4, // تم التعديل إلى 0.4 ثانية
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function StatsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useRef(null);

  // Filter tech stack based on selection
  const filteredSkills = useMemo(() => {
    if (activeFilter === "all") return TECH_STACK;
    if (activeFilter === "backend") return TECH_STACK.filter((s) => s.category === "backend");
    if (activeFilter === "frontend") return TECH_STACK.filter((s) => s.category === "frontend");
    return [];
  }, [activeFilter]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      aria-label="Skills & Qualifications"
      className="relative isolate overflow-hidden bg-[#f7f8ff] px-3 sm:px-3 md:px-3  text-slate-900 dark:bg-[#0b1120] dark:text-slate-100 transition-colors duration-300"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-40 dark:opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(rgba(9, 104, 229, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(9, 104, 229, 0.06) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />
        <div className="absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-gradient-to-br from-[#0968e5]/20 to-[#091970]/25 blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-gradient-to-tl from-[#091970]/30 to-[#0968e5]/15 blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
        className="mx-auto max-w-5xl space-y-9"
      >
        {/* SECTION HEADER (ENLARGED & CONCISE) */}
        <motion.div variants={revealVariants} className="text-center py-6 max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0968e5]/30 bg-[#0968e5]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#091970] dark:text-[#7ab3ff] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#0968e5]" />
            <span>Technical Stack &amp; Credentials</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Skills &amp; Qualifications
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            Full-stack engineering: modern React client interfaces, scalable Node.js servers, and robust MongoDB databases.
          </p>
        </motion.div>

        {/* FILTER TABS SWITCHER */}
        <motion.div variants={revealVariants} className="flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center p-1.5 rounded-2xl border border-white/80 bg-white/75 shadow-md shadow-[#091970]/[0.04] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045] gap-1.5">
            {[
              { id: "all", label: "All Stack", count: TECH_STACK.length, icon: Layers },
              { id: "backend", label: "Backend & DB", count: 3, icon: Server },
              { id: "frontend", label: "Frontend", count: 6, icon: Code2 },
              { id: "certificates", label: "Certifications", count: CERTIFICATES.length, icon: GraduationCap },
            ].map(({ id, label, count, icon: Icon }) => {
              const isActive = activeFilter === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveFilter(id)}
                  className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer outline-none ${
                    isActive
                      ? "text-white shadow-sm shadow-[#0968e5]/25"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeFilterPill"
                      className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-[#091970] via-[#094dbf] to-[#0968e5]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-mono font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-200/80 text-slate-700 dark:bg-white/10 dark:text-slate-300"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* DYNAMIC CONTENT */}
        <AnimatePresence mode="wait">
          {activeFilter !== "certificates" ? (
            /* 1. TECH CARDS */
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-white/80 bg-white/75 p-5 shadow-sm shadow-[#091970]/[0.03] backdrop-blur-xl transition-all duration-200 hover:border-[#0968e5]/40 hover:shadow-md hover:shadow-[#0968e5]/10 dark:border-white/10 dark:bg-white/[0.045]"
                >
                  <div>
                    {/* Header: Logo + Category Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-xs dark:border-white/10 dark:bg-slate-900 group-hover:scale-105 transition-transform duration-200">
                        <img
                          src={asset(`images/webIcon/${skill.logo}`)}
                          alt={skill.name}
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                      <span className="rounded-full border border-[#0968e5]/20 bg-[#0968e5]/10 px-3 py-1 text-xs font-bold text-[#091970] dark:text-[#7ab3ff]">
                        {skill.badge}
                      </span>
                    </div>

                    {/* Title & Role */}
                    <div className="mt-4">
                      <h3 className="text-lg font-black text-slate-900 dark:text-white">
                        {skill.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-[#0968e5] dark:text-[#7ab3ff]">
                        {skill.role}
                      </p>
                     
                    </div>
                  </div>

                  {/* Subtle Accent Bottom Line */}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#091970] via-[#094dbf] to-[#0968e5] transition-transform duration-200 group-hover:scale-x-100" />
                </div>
              ))}
            </motion.div>
          ) : (
            /* 2. CERTIFICATES & DEGREES */
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4.5"
            >
              {CERTIFICATES.map((cert) => {
                const CertIcon = cert.icon;
                const isNode2026 = cert.year === "2026";
                return (
                  <div
                    key={cert.id}
                    className={`group relative flex flex-col justify-between rounded-2xl border p-5 sm:p-6 shadow-sm backdrop-blur-xl transition-all duration-200 hover:shadow-md ${
                      isNode2026
                        ? "border-[#0968e5]/40 bg-white/90 dark:bg-[#070e24]/85 shadow-[#0968e5]/10 ring-1 ring-[#0968e5]/30"
                        : "border-white/80 bg-white/75 dark:border-white/10 dark:bg-white/[0.045]"
                    }`}
                  >
                    <div>
                      {/* Header: Icon + Year */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${cert.tint} text-white shadow-xs`}>
                            <CertIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white line-clamp-1">
                              {cert.title}
                            </h3>
                            <p className="text-xs sm:text-sm font-semibold text-[#0968e5] dark:text-[#7ab3ff] line-clamp-1">
                              {cert.issuer}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                            isNode2026
                              ? "bg-gradient-to-r from-[#091970] to-[#0968e5] text-white shadow-xs"
                              : "bg-[#0968e5]/10 text-[#091970] dark:text-[#7ab3ff] border border-[#0968e5]/20"
                          }`}
                        >
                          {cert.year}
                        </span>
                      </div>

                      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {cert.description}
                      </p>
                    </div>

                    {/* Competencies Chips */}
                    <div className="mt-5 pt-3.5 border-t border-slate-200/70 dark:border-white/10 flex flex-wrap gap-1.5">
                      {cert.competencies.map((comp) => (
                        <span
                          key={comp}
                          className="rounded-md px-2.5 py-0.5 text-[11px] font-medium bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/5"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Accent */}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#091970] via-[#094dbf] to-[#0968e5] transition-transform duration-200 group-hover:scale-x-100" />
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}