import React, { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../config/contract";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");
  const [deadline, setDeadline] = useState("");
  const [pending, setPending] = useState(false);

  const handleCreateTask = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    setPending(true);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000);
    const value = ethers.parseEther(reward);

    try {
      const tx = await contract.createTask(
        title,
        description,
        deadlineTimestamp,
        { value }
      );
      await tx.wait();
      alert("Task created successfully");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    }
    setPending(false);
  };

  return (
    <div className="min-h-screen bg-[#0e1014] text-white font-sans">
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8">Create Task</h1>
        <div className="bg-[#181b23] p-8 rounded-2xl max-w-2xl">
          <div className="space-y-6">
            <div>
              <label className="block mb-1 text-sm font-medium text-slate-300">
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#10131c] border border-[#2d2f3a] rounded-lg p-3 text-white placeholder-slate-500"
                placeholder="Task title"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-slate-300">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="w-full bg-[#10131c] border border-[#2d2f3a] rounded-lg p-3 text-white placeholder-slate-500"
                placeholder="Describe the task in detail"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-slate-300">
                Reward (ETH)
              </label>
              <input
                type="number"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                className="w-full bg-[#10131c] border border-[#2d2f3a] rounded-lg p-3 text-white placeholder-slate-500"
                placeholder="e.g., 0.05"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-slate-300">
                Deadline
              </label>
              <input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-[#10131c] border border-[#2d2f3a] rounded-lg p-3 text-white"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={pending}
              onClick={handleCreateTask}
              className={`w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold py-3 rounded-lg transition ${
                pending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {pending ? "Processing..." : "Create Task"}
            </motion.button>
          </div>
        </div>
      </main>
    </div>
  );
}
