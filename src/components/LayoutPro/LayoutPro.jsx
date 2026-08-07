"use client"

import { useEffect } from "react"
import { useState } from "react"
import Sidebar from "../Sidebar/Sidebar"
import Projects from "../Projects/Projects"

export default function LayoutPro() {
  const [cont, setcont] = useState(0)
  useEffect(() => {}, [])
  return (
    <>
      <Sidebar />
      <Projects />

    </>
  )
}
