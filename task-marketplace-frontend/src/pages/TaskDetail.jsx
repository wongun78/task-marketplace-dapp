import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';
import { getStatusText } from '../utils/status';
import LoadingSpinner from '../components/LoadingSpinner';
import { motion } from 'framer-motion';

export default function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [account, setAccount] = useState(null);
  const [proofLink, setProofLink] = useState("");
  const [pending, setPending] = useState(false);

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
      const t = await contract.tasks(id);
      setTask({
        id: Number(t.taskId),
        title: t.title,
        description: t.description,
        reward: ethers.formatEther(t.reward),
        client: t.client,
        freelancer: t.freelancer,
        status: Number(t.status),
        proofLink: t.proofLink,
        deadline: Number(t.deadline)
      });
    }
    load();
  }, [id]);

  if (!task) return <LoadingSpinner />;

  const now = Math.floor(Date.now() / 1000);
  const canRefund = (task.status === 2) && (now > task.deadline) && (task.client === account || task.freelancer === account);

  const handleTransaction = async (callback) => {
    setPending(true);
    try {
      await callback();
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    }
    setPending(false);
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-purple-50 opacity-60 -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full bg-white p-10 rounded-3xl shadow-2xl"
      >
        <h1 className="text-4xl font-extrabold mb-4">{task.title}</h1>
        <p className="mb-6 text-gray-600">{task.description}</p>

        <div className="space-y-3 mb-10">
          <p><strong>Reward:</strong> {task.reward} ETH</p>
          <p><strong>Status:</strong> {getStatusText(task.status)}</p>
          <p><strong>Client:</strong> {task.client}</p>
          <p><strong>Freelancer:</strong> {task.freelancer}</p>
          <p><strong>Deadline:</strong> {new Date(task.deadline * 1000).toLocaleString()}</p>
        </div>

        <div className="space-y-6">
          {task.status === 0 && task.client !== account && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={pending}
              onClick={() => handleTransaction(async () => {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
                const tx = await contract.acceptTask(task.id);
                await tx.wait();
              })}
              className={`w-full bg-green-500 text-white py-4 text-lg rounded-full shadow-lg transition ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {pending ? "Processing..." : "Accept Task"}
            </motion.button>
          )}

          {task.status === 1 && task.freelancer === account && (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Proof link"
                value={proofLink}
                onChange={e => setProofLink(e.target.value)}
                className="w-full border rounded-xl p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={pending}
                onClick={() => handleTransaction(async () => {
                  const provider = new ethers.BrowserProvider(window.ethereum);
                  const signer = await provider.getSigner();
                  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
                  const tx = await contract.submitProof(task.id, proofLink);
                  await tx.wait();
                })}
                className={`w-full bg-blue-500 text-white py-4 text-lg rounded-full shadow-lg transition ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {pending ? "Processing..." : "Submit Proof"}
              </motion.button>
            </div>
          )}

          {task.status === 2 && task.client === account && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={pending}
              onClick={() => handleTransaction(async () => {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
                const tx = await contract.approveTask(task.id);
                await tx.wait();
              })}
              className={`w-full bg-purple-500 text-white py-4 text-lg rounded-full shadow-lg transition ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {pending ? "Processing..." : "Approve Task"}
            </motion.button>
          )}

          {canRefund && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={pending}
              onClick={() => handleTransaction(async () => {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
                const tx = await contract.refundTask(task.id);
                await tx.wait();
              })}
              className={`w-full bg-red-500 text-white py-4 text-lg rounded-full shadow-lg transition ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {pending ? "Processing..." : "Refund Task"}
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
