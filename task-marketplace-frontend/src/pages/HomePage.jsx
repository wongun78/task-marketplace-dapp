import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../config/contract";
import { Link } from "react-router-dom";
import { getStatusText } from "../utils/status";
import { motion } from "framer-motion";

export default function HomePage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      if (!window.ethereum) {
        alert("Please install MetaMask");
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider
      );
      const taskCount = await contract.taskCount();
      const count = Number(taskCount);
      const fetchedTasks = [];
      for (let i = 1; i <= count; i++) {
        const task = await contract.tasks(i);
        fetchedTasks.push({
          id: task.taskId,
          title: task.title,
          description: task.description,
          reward: ethers.formatEther(task.reward),
          status: task.status,
        });
      }
      setTasks(fetchedTasks);
    }
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto mt-10 px-6"
      >
        <h1 className="text-4xl font-bold text-white mb-10">
          Discover Open Tasks 🔎
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-[#181b23] rounded-2xl shadow-inner hover:shadow-xl p-6 transition cursor-pointer border border-white/5"
            >
              <Link to={`/task/${task.id}`} className="block space-y-3">
                <h2 className="text-xl font-semibold text-white">
                  {task.title}
                </h2>
                <p className="text-sm text-slate-400">{task.description}</p>
                <div className="text-indigo-400 font-bold text-lg">
                  {task.reward} ETH
                </div>
                <p className="text-xs text-slate-500">
                  Status: {getStatusText(task.status)}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
