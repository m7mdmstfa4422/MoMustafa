import React from "react"
import { useParams, Link } from "react-router-dom"

export default function ProjectDetails() {
  const { id } = useParams()

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center text-white bg-slate-950">
      <h1 className="text-5xl font-bold mb-4">Project Details - ID: {id}</h1>
      <p className="text-slate-400 mb-6">Here you can show more info about this project.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg transition-all"
      >
        ← Back to Projects
      </Link>
    </section>
  )
}
