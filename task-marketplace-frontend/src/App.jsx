import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import CreateTask from "./pages/CreateTask";
import TaskDetail from "./pages/TaskDetail";
import MyDashboard from "./pages/MyDashboard";
import DisputeCenter from "./pages/DisputeCenter";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex bg-[#0e1014] text-white font-sans">
        <Sidebar />
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateTask />} />
            <Route path="/task/:id" element={<TaskDetail />} />
            <Route path="/dashboard" element={<MyDashboard />} />
            <Route path="/dispute" element={<DisputeCenter />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
