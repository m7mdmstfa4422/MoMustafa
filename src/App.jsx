"use client"

import "./App.css"
import { createHashRouter, RouterProvider } from "react-router-dom"
import Page from "./components/Page/Page"
import Layout from "./components/Layout/Layout"
import Information from "./components/Information/Information"
import Projects from "./components/Projects/Projects"
import LayoutPro from "./components/LayoutPro/LayoutPro"


const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Page />,
      },
      {
        path: "/projects/:id",
        element: <Information />,
      },

    ],
  },
  {
    path: "/Allprojects", element: <LayoutPro />,
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
