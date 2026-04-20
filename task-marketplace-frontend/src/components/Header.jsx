import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Header() {
  const [account, setAccount] = useState("");

  useEffect(() => {
    async function loadAccount() {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      }
      window.ethereum.on("accountsChanged", () => window.location.reload());
    }
    loadAccount();
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10 shadow-inner font-orbitron"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-5 px-8">
        <div className="text-3xl font-extrabold tracking-wide text-white drop-shadow">
          TaskChain
        </div>

        <nav className="hidden md:flex gap-10 text-sm font-bold">
          <Link
            to="/"
            className="text-slate-200 hover:text-white transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/create"
            className="text-slate-200 hover:text-white transition duration-300"
          >
            Create
          </Link>
          <Link
            to="/dashboard"
            className="text-slate-200 hover:text-white transition duration-300"
          >
            Dashboard
          </Link>
          <Link
            to="/dispute"
            className="text-slate-200 hover:text-white transition duration-300"
          >
            Disputes
          </Link>
        </nav>

        <div className="text-xs font-mono text-white bg-white/10 px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm">
          {account
            ? `${account.substring(0, 6)}...${account.slice(-4)}`
            : "Connect Wallet"}
        </div>
      </div>
    </motion.header>
  );
}
