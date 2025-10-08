"use client";
import React from "react";
import ElectricBorder from "../../components/ElectricBorder";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  Zap,
  Stars,
  TrendingUp,
  ArrowRight,
  UserCheck,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const stats = [
    { number: "20K+", label: "Active Users", icon: TrendingUp },
    { number: "100K+", label: "CVs Analyzed", icon: Sparkles },
    { number: "95%", label: "Success Rate", icon: Stars },
    { number: "4.8/5", label: "User Rating", icon: Zap },
  ];

  const floatingIcons = [
    { icon: "💼", delay: 0.5, x: -15, y: -15 },
    { icon: "🎯", delay: 0.8, x: 15, y: -20 },
    { icon: "📊", delay: 1, x: -15, y: 20 },
    { icon: "✨", delay: 1.2, x: 15, y: 20 },
    { icon: "🚀", delay: 1.5, x: 0, y: -25 },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl opacity-30"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-gradient-to-tr from-purple-400 to-pink-500 rounded-full blur-3xl opacity-20"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-3xl opacity-25"
      />

      <div className="container relative z-10 px-6 mx-auto max-w-7xl mt-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 backdrop-blur-sm border border-green-300 shadow-lg shadow-green-500/70 mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
            </motion.div>
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI-Powered Career Platform
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent"
            >
              Your AI Career
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mt-2"
            >
              Mentor, Always Ready
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Transform your career journey with{" "}
            <span className="text-blue-600 font-semibold">
              AI-powered CV analysis
            </span>
            ,{" "}
            <span className="text-purple-600 font-semibold">
              personalized roadmaps
            </span>
            , and{" "}
            <span className="text-pink-600 font-semibold">
              intelligent mentoring
            </span>
            .
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center mb-4 relative flex justify-center items-center"
          >
            {floatingIcons.slice(0, 2).map((item, index) => (
              <motion.div
                key={`left-${index}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0],
                  x: [0, item.x, item.x * 0.8],
                  y: [0, item.y, item.y * 0.8],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: "easeInOut",
                }}
                className="absolute left-[-20px] text-4xl"
                style={{ top: `${120 + index * 60}px` }}
              >
                {item.icon}
              </motion.div>
            ))}

            {floatingIcons.slice(2, 5).map((item, index) => (
              <motion.div
                key={`right-${index}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0],
                  x: [0, item.x, item.x * 0.8],
                  y: [0, item.y, item.y * 0.8],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: "easeInOut",
                }}
                className="absolute right-[-20px] text-4xl"
                style={{ top: `${100 + index * 55}px` }}
              >
                {item.icon}
              </motion.div>
            ))}

            <ElectricBorder
              color="#ff003c"
              speed={1.2}
              chaos={1}
              thickness={2.5}
              style={{ borderRadius: 24, maxWidth: 420 }}
            >
              <div className="p-10 bg-white/90 backdrop-blur-md rounded-2xl text-center shadow-xl relative overflow-hidden">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-red-100 text-red-600 text-sm font-semibold">
                  <Zap className="w-4 h-4" />
                  Limited Beta Access
                </div>

                <h2 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-red-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                  Supercharge Your Career
                </h2>

                <p className="text-slate-600 mb-8 text-base leading-relaxed">
                  Harness{" "}
                  <span className="font-semibold text-red-600">
                    AI-driven mentoring
                  </span>
                  ,{" "}
                  <span className="font-semibold text-pink-600">
                    CV insights
                  </span>
                  , and{" "}
                  <span className="font-semibold text-orange-600">
                    personalized roadmaps
                  </span>{" "}
                  to fast-track your success.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8 text-left text-slate-700">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-medium">
                      Smart CV Feedback
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-pink-500" />
                    <span className="text-sm font-medium">
                      Career Growth Paths
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-medium">AI Mentorship</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-medium">Fast Results</span>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    asChild
                    className="relative bg-gradient-to-r from-red-600 via-pink-600 to-orange-500 
                      text-white font-semibold px-6 py-3 rounded-xl shadow-lg 
                      transition-all flex items-center gap-2
                      hover:scale-105 hover:rotate-1 hover:shadow-[0_0_20px_rgba(255,0,60,0.6)] hover:brightness-110
                      active:scale-95"
                  >
                    <Link href="/sign-in/">
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                      Get Started
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </ElectricBorder>
          </motion.div>

          <p className="text-md text-slate-500 py-10">
            Trusted by professionals worldwide
          </p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-10"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  <div className="relative bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-slate-600 font-semibold">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
