"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Trophy,
  Target,
  Zap,
  TrendingUp,
  Clock,
  Star,
  BookOpen,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const stats = [
    {
      label: "CV Analyzed",
      value: "8",
      icon: CheckCircle2,
      color: "text-blue-400",
    },
    {
      label: "AI Chats",
      value: "24",
      icon: Sparkles,
      color: "text-purple-400",
    },
    {
      label: "Career Score",
      value: "78%",
      icon: TrendingUp,
      color: "text-green-400",
    },
    { label: "Days Active", value: "15", icon: Clock, color: "text-amber-400" },
  ];

  const achievements = [
    { icon: Trophy, label: "First Upload", unlocked: true },
    { icon: Target, label: "5 AI Chats", unlocked: true },
    { icon: Star, label: "Pro Member", unlocked: false },
    { icon: Sparkles, label: "Career Master", unlocked: false },
  ];

  const quickActions = [
    {
      title: "Continue CV Analysis",
      progress: 60,
      href: "/dashboard/cvanalysis",
    },
    {
      title: "Finish Roadmap Setup",
      progress: 35,
      href: "/dashboard/roadmapgenerator",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10 relative overflow-hidden">
      {/* 3D Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid with perspective */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f615_1px,transparent_1px),linear-gradient(to_bottom,#3b82f615_1px,transparent_1px)] bg-[size:50px_50px]"
          style={{
            transform: "perspective(1000px) rotateX(60deg)",
            transformOrigin: "center bottom",
          }}
        />

        {/* Floating 3D Spheres */}
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.3), transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{
            y: [0, 40, 0],
            x: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 70% 70%, rgba(139,92,246,0.3), transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, -40, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 3D Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 to-purple-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: "0 0 20px rgba(59,130,246,0.5)",
            }}
            animate={{
              y: [0, -150, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2 pb-6 border-b border-white/5"
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-6 h-6 text-blue-400" />
            <span className="text-sm text-slate-400 uppercase tracking-widest">
              Dashboard
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome Back
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-3xl">
            Track your progress, continue your learning, and achieve your career
            goals.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.08, type: "spring" }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)",
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card className="bg-slate-900/70 border-white/10 backdrop-blur-xl h-full">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                      <span className={`text-3xl font-extrabold ${stat.color}`}>
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="bg-slate-900/70 border-white/10 backdrop-blur-xl h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  Your Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <motion.div
                        key={achievement.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        whileHover={{
                          scale: 1.1,
                          rotateY: 10,
                          boxShadow: achievement.unlocked
                            ? "0 10px 30px rgba(59,130,246,0.3)"
                            : "none",
                        }}
                        style={{ transformStyle: "preserve-3d" }}
                        className={`p-6 rounded-xl border-2 transition-all ${
                          achievement.unlocked
                            ? "bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30"
                            : "bg-slate-800/30 border-slate-700/30"
                        }`}
                      >
                        <Icon
                          className={`w-8 h-8 mx-auto mb-3 ${
                            achievement.unlocked
                              ? "text-blue-400"
                              : "text-slate-600"
                          }`}
                        />
                        <p
                          className={`text-xs text-center ${
                            achievement.unlocked
                              ? "text-slate-300"
                              : "text-slate-600"
                          }`}
                        >
                          {achievement.label}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Learning Progress */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30 backdrop-blur-xl h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  Career Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Profile Completion</span>
                    <span className="font-extrabold text-blue-400">78%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: "78%" }}
                      transition={{ duration: 1, delay: 0.6 }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span className="text-slate-300">CV uploaded</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span className="text-slate-300">
                      First roadmap created
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm opacity-50">
                    <div className="w-4 h-4 rounded-full border-2 border-slate-600" />
                    <span className="text-slate-500">Complete 5 AI chats</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Continue Setup
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-2xl font-semibold mb-4">
            Continue Where You Left Off
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                whileHover={{ scale: 1.02, rotateY: 2 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Link href={action.href}>
                  <Card className="bg-slate-900/70 border-white/10 backdrop-blur-xl hover:border-white/20 transition-all cursor-pointer">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">
                          {action.title}
                        </h3>
                        <ArrowRight className="w-5 h-5 text-slate-400" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Progress</span>
                          <span className="text-blue-400 font-semibold">
                            {action.progress}%
                          </span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${action.progress}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
