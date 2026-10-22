"use client";

import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Page from "./components/Page/Page";
import Layout from "./components/Layout/Layout";
import Information from "./components/Information/Information";
import LayoutPro from "./components/LayoutPro/LayoutPro";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

function RouteErrorFallback() {
  return (
    <div className="min-h-screen bg-[#f7f8ff] dark:bg-black text-slate-900 dark:text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-4 p-8 rounded-3xl bg-white/90 dark:bg-zinc-950/90 border border-slate-200 dark:border-white/10 shadow-xl">
        <h2 className="text-xl font-bold">Unable to display page</h2>
        <p className="text-sm text-slate-500">Please return to the main portfolio page.</p>
        <a
          href="/MoMustafa/#/"
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#091970] via-[#094dbf] to-[#0968e5] text-white text-sm font-semibold"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <RouteErrorFallback />,
    children: [
      {
        index: true,
        element: <Page />,
      },
      {
        path: "projects/:id",
        element: <Information />,
        errorElement: <RouteErrorFallback />,
      },
    ],
  },
  {
    path: "/Allprojects",
    element: <LayoutPro />,
    errorElement: <RouteErrorFallback />,
  },
  {
    path: "*",
    element: <Page />,
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
