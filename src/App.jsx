"use client"

import "./App.css"
import { createHashRouter, RouterProvider } from "react-router-dom"
import Page from "./components/Page/Page"
import Layout from "./components/Layout/Layout"
import Information from "./components/Information/Information"


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
])

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
