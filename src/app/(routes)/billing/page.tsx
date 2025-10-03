"use client";

import React from "react";
import { PricingTable } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  Check,
  Wallet,
  Zap,
  Shield,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  const features = [
    { icon: Zap, text: "AI-Powered Analysis" },
    { icon: Shield, text: "Secure & Private" },
    { icon: TrendingUp, text: "Career Growth Tracking" },
  ];

  return (
    <section className="relative min-h-screen bg-slate-950 overflow-hidden isolate">
      <motion.div
        className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[150px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full shadow-lg"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ y: [0, -60, 0], opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      <div className="container relative z-10 mx-auto px-6 py-20">
        {/* Dashboard Button - Top Right */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-6 right-6 z-50"
        >
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/30">
              Go to Dashboard
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
          >
            <Wallet className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-400">
              Simple, Transparent Pricing
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Choose Your Plan
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Start Growing Today
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Join thousands of professionals accelerating their careers with
            AI-powered guidance
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full"
                >
                  <Icon className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-slate-300">
                    {feature.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="inline-flex items-center gap-2 text-green-400"
          >
            <Check className="w-5 h-5" />
            <span className="text-sm font-semibold">
              30-Day Money Back Guarantee
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-50" />

          <div className="bg-orange-200 backdrop-blur-xl border border-white shadow-orange-200 rounded-3xl p-8 shadow-2xl">
            <PricingTable />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-500 mb-6">Trusted by professionals</p>
        </motion.div>
      </div>
    </section>
  );
}
