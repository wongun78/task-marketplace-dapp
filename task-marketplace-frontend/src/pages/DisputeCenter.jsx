import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';
import { getStatusText } from '../utils/status';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function MyDashboard() {
  const [tasks, setTasks] = useState([]);
  const [account, setAccount] = useState("");

  useEffect(() => {
    async function load() {
      if (!window.ethereum) {
        alert("Please install MetaMask");
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const myAccount = await signer.getAddress();
      setAccount(myAccount);

      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      const taskCount = await contract.taskCount();
      const count = Number(taskCount);
      const fetchedTasks = [];
      for (let i = 1; i <= count; i++) {
        const t = await contract.tasks(i);
        fetchedTasks.push({
          id: Number(t.taskId),
          title: t.title,
          description: t.description,
          reward: ethers.formatEther(t.reward),
          client: t.client,
          freelancer: t.freelancer,
          status: Number(t.status),
        });
      }
      setTasks(fetchedTasks);
    }
    load();
  }, []);

  const myCreatedTasks = tasks.filter(t => t.client === account);
  const myAcceptedTasks = tasks.filter(t => t.freelancer === account);

  return (
    <div className="max-w-7xl mx-auto mt-16 px-6 space-y-20">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <h1 className="text-4xl font-extrabold mb-10">My Created Tasks</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {myCreatedTasks.map(task => (
            <Link key={task.id} to={`/task/${task.id}`}>
              <motion.div whileHover={{ scale: 1.03, y: -5 }} transition={{ type: 'spring', stiffness: 300 }}
                className="bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition cursor-pointer">
                <h2 className="text-2xl font-bold mb-3">{task.title}</h2>
                <p className="text-gray-600 mb-5">{task.description}</p>
                <p className="text-blue-600 font-extrabold text-lg mb-2">{task.reward} ETH</p>
                <p className="text-sm text-gray-500">Status: {getStatusText(task.status)}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
        <h1 className="text-4xl font-extrabold mb-10">My Accepted Tasks</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {myAcceptedTasks.map(task => (
            <Link key={task.id} to={`/task/${task.id}`}>
              <motion.div whileHover={{ scale: 1.03, y: -5 }} transition={{ type: 'spring', stiffness: 300 }}
                className="bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition cursor-pointer">
                <h2 className="text-2xl font-bold mb-3">{task.title}</h2>
                <p className="text-gray-600 mb-5">{task.description}</p>
                <p className="text-blue-600 font-extrabold text-lg mb-2">{task.reward} ETH</p>
                <p className="text-sm text-gray-500">Status: {getStatusText(task.status)}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
