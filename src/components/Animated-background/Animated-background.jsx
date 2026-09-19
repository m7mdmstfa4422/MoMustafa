import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100

      const blendLayer = container.querySelector("[data-blend]")
      if (blendLayer) {
        const moveX = (x - 50) * 0.3
        const moveY = (y - 50) * 0.3
        blendLayer.style.transform = `translate(${moveX}px, ${moveY}px)`
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#091970]/80 to-slate-900" />

      <div
        className="absolute inset-0 bg-gradient-to-tr from-[#091970]/50 via-[#094dbf]/20 to-slate-950 opacity-80"
        style={{ animation: "colorShift 15s ease-in-out infinite" }}
      />

      <div
        data-blend
        className="absolute inset-0 bg-gradient-to-bl from-[#091970] via-slate-950 to-[#0968e5]/25 opacity-60"
        style={{ animation: "colorShift 20s ease-in-out infinite reverse" }}
      />

      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0968e5]/15 to-transparent opacity-40"
        style={{ animation: "colorShift 25s ease-in-out infinite" }}
      />

      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 0%, rgba(9, 25, 112, 0.4) 100%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(rgba(9,104,229,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(9,104,229,0.15)_1px,transparent_1px)",
          backgroundSize: "50px 50px",
          animation: "gridShift 30s linear infinite",
        }}
      />

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox=%220 0 400 400%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 result=%22noise%22 /%3E%3C/filter%3E%3Crect width=%22400%22 height=%22400%22 fill=%22%23fff%22 filter=%22url(%23noiseFilter)%22 /%3E%3C/svg%3E')",
          backgroundSize: "200px 200px",
        }}
      />

      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
          animation: "shimmer 4s infinite",
        }}
      />
    </div>
  )
}
