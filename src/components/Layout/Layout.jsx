"use client"

import { useEffect } from "react"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../Sidebar/Sidebar"

export default function Layout() {
  const [cont, setcont] = useState(0)
  useEffect(() => {}, [])
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  )
}
