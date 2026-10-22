"use client";

import React from "react";
import { Sparkles } from "lucide-react";

// Asset resolution helper supporting Vite base URL
const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

// Verified technology logos from public/images/webIcon/
const TECHNOLOGIES = [
  { name: "React.js", logo: "react.png" },
  { name: "JavaScript (ES6+)", logo: "js.png" },
  { name: "Node.js", logo: "nodejs.png" },
  { name: "Tailwind CSS", logo: "tailwind.png" },
  { name: "MongoDB", logo: "mongobd.png" },
  { name: "REST APIs", logo: "api.png" },
  { name: "HTML5", logo: "html.png" },
  { name: "CSS3", logo: "css.png" },
  { name: "Bootstrap UI", logo: "bootstrap.png" },
  { name: "jQuery", logo: "jquery.png" },
];

// Replicated items per track to guarantee an uninterrupted loop across any ultra-wide display
const TRACK_SET = [...TECHNOLOGIES, ...TECHNOLOGIES, ...TECHNOLOGIES];

export default function StatsSection() {
  return (
    <section
      id="skills"
      aria-label="Technologies I Work With"
      className="relative overflow-hidden bg-[#f7f8ff] dark:bg-black text-slate-900 dark:text-slate-100 transition-colors duration-500  "
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. AMBIENT BACKDROP LIGHTING (CONSISTENT WITH HERO)           */}
      {/* ------------------------------------------------------------- */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-[34rem] rounded-full bg-gradient-to-r from-[#091970]/5 via-[#0968e5]/8 to-transparent blur-3xl dark:from-[#091970]/20 dark:via-[#0968e5]/15" />
      </div>

      {/* Scoped CSS Fallback for Smooth, 60fps Infinitely Looping Marquee */}
      <style>{`
        @keyframes techMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-tech-marquee {
          display: flex;
          width: max-content;
          animation: techMarquee 42s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-tech-marquee {
            animation-play-state: paused;
          }
        }
      `}</style>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div
          className="marquee-container relative w-full overflow-hidden py-3.5 sm:py-4.5  bg-white/40 dark:bg-white/[0.02] backdrop-blur-xs"
          role="region"
          aria-label="Continuously scrolling technology showcase"
        >
          {/* Soft Left Edge-Fade Mask */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-28 md:w-40 bg-gradient-to-r from-[#f7f8ff] dark:from-black to-transparent"
            aria-hidden="true"
          />

          {/* Soft Right Edge-Fade Mask */}
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-28 md:w-40 bg-gradient-to-l from-[#f7f8ff] dark:from-black to-transparent"
            aria-hidden="true"
          />

          {/* Continuously Translating Track (Moves Right to Left) */}
          <div className="animate-tech-marquee flex items-center">
            {/* Set 1: Primary Stream */}
            <div className="flex shrink-0 items-center">
              {TRACK_SET.map((tech, index) => (
                <React.Fragment key={`set1-${tech.name}-${index}`}>
                  <div className="flex items-center gap-3 sm:gap-3.5 shrink-0 px-4 sm:px-6 md:px-7 py-2 group/tech cursor-default select-none transition-colors">
                    <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 flex items-center justify-center shrink-0">
                      <img
                        src={asset(`images/webIcon/${tech.logo}`)}
                        alt=""
                        className="max-h-full max-w-full object-contain filter transition-transform duration-300 group-hover/tech:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                    <span className="text-sm sm:text-base font-semibold tracking-tight text-slate-800 dark:text-slate-200 group-hover/tech:text-[#0968e5] dark:group-hover/tech:text-[#7ab3ff] transition-colors whitespace-nowrap">
                      {tech.name}
                    </span>
                  </div>
                  <span
                    className="h-3.5 sm:h-4 w-px bg-slate-300/60 dark:bg-white/10 shrink-0"
                    aria-hidden="true"
                  />
                </React.Fragment>
              ))}
            </div>

            {/* Set 2: Duplicate Stream for Unbroken, Gapless Loop */}
            <div className="flex shrink-0 items-center" aria-hidden="true">
              {TRACK_SET.map((tech, index) => (
                <React.Fragment key={`set2-${tech.name}-${index}`}>
                  <div className="flex items-center gap-3 sm:gap-3.5 shrink-0 px-4 sm:px-6 md:px-7 py-2 group/tech cursor-default select-none transition-colors">
                    <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 flex items-center justify-center shrink-0">
                      <img
                        src={asset(`images/webIcon/${tech.logo}`)}
                        alt=""
                        className="max-h-full max-w-full object-contain filter transition-transform duration-300 group-hover/tech:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                    <span className="text-sm sm:text-base font-semibold tracking-tight text-slate-800 dark:text-slate-200 group-hover/tech:text-[#0968e5] dark:group-hover/tech:text-[#7ab3ff] transition-colors whitespace-nowrap">
                      {tech.name}
                    </span>
                  </div>
                  <span
                    className="h-3.5 sm:h-4 w-px bg-slate-300/60 dark:bg-white/10 shrink-0"
                    aria-hidden="true"
                  />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
