import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gradient-to-br from-[#1e1f2f] to-[#2e2f3f] p-6 flex flex-col justify-between min-h-screen">
      <div className="space-y-6">
        <div className="text-2xl font-bold">TaskChain</div>
        <nav className="space-y-4">
          <Link to="/" className="block text-slate-300 hover:text-white">
            Overview
          </Link>
          <Link to="/create" className="block text-white font-semibold">
            Create Task
          </Link>
          <Link
            to="/dashboard"
            className="block text-slate-300 hover:text-white"
          >
            Dashboard
          </Link>
          <Link to="/dispute" className="block text-slate-300 hover:text-white">
            Disputes
          </Link>
        </nav>
      </div>
      <div className="text-xs text-slate-500">© 2025 TaskChain</div>
    </aside>
  );
}
