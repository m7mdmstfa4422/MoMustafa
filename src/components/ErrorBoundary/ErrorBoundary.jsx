import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    try {
      window.location.hash = "#/";
      window.location.reload();
    } catch (_e) {
      window.location.href = "/MoMustafa/";
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#f7f8ff] dark:bg-black text-slate-900 dark:text-slate-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-white/90 dark:bg-zinc-950/90 border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-md">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 grid place-items-center">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tight">Something went wrong</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                We encountered an unexpected rendering issue. Please reload or return to the home page.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#091970] via-[#094dbf] to-[#0968e5] text-white text-sm font-semibold shadow-md cursor-pointer hover:opacity-95"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>
              <Link
                to="/"
                onClick={() => this.setState({ hasError: false })}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white text-sm font-semibold hover:bg-slate-200 dark:hover:bg-white/15"
              >
                <Home className="w-4 h-4" />
                <span>Back Home</span>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
