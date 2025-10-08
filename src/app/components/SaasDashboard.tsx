"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Trophy,
  Target,
  Zap,
  TrendingUp,
  Clock,
  ClipboardList,
  Map,
  PenTool,
  ArrowRight,
  Rocket,
  BarChart3,
  FileCheck,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
  interface DashboardStats {
    cvAnalyzed: number;
    aiChats: number;
    careerScore: number;
    daysActive: number;
    coverLetters: number;
    roadmaps: number;
  }

  const [stats, setStats] = useState<DashboardStats>({
    cvAnalyzed: 0,
    aiChats: 0,
    careerScore: 0,
    daysActive: 0,
    coverLetters: 0,
    roadmaps: 0,
  });
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/dashboard-stats");
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data: DashboardStats = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setStats({
          cvAnalyzed: 0,
          aiChats: 0,
          careerScore: 0,
          daysActive: 0,
          coverLetters: 0,
          roadmaps: 0,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    {
      label: "CV Analysis",
      value: stats.cvAnalyzed,
      unit: "Items",
      icon: ClipboardList,
      color: "from-blue-400 to-blue-600",
      description: "Total CVs analyzed by AI.",
    },
    {
      label: "AI Chats",
      value: stats.aiChats,
      unit: "Sessions",
      icon: Sparkles,
      color: "from-purple-400 to-pink-500",
      description: "Conversations held with AI Career Coach.",
    },
    {
      label: "Career Score",
      value: stats.careerScore,
      unit: "%",
      icon: TrendingUp,
      color: "from-green-400 to-emerald-600",
      description: "Overall career progress towards your goals.",
    },
    {
      label: "Cover Letters",
      value: stats.coverLetters,
      unit: "Docs",
      icon: PenTool,
      color: "from-amber-400 to-orange-500",
      description: "Custom cover letters generated with AI.",
    },
    {
      label: "Roadmaps",
      value: stats.roadmaps,
      unit: "Plans",
      icon: Map,
      color: "from-sky-400 to-indigo-500",
      description: "AI-generated career learning roadmaps.",
    },
    {
      label: "Days Active",
      value: stats.daysActive,
      unit: "Days",
      icon: Clock,
      color: "from-pink-400 to-red-500",
      description: "Days active on your career journey.",
    },
  ];

  const achievements = [
    { icon: Trophy, label: "First Upload", unlocked: true },
    { icon: Target, label: "5 AI Chats", unlocked: stats.aiChats >= 5 },
    { icon: Sparkles, label: "Pro Membership", unlocked: false },
    { icon: Zap, label: "Quick Start", unlocked: stats.daysActive >= 1 },
  ];

  const fullName = user?.fullName || user?.firstName;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-300 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)] animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          <div className="flex items-center justify-center mb-4">
            <Zap className="w-10 h-10 text-blue-400 animate-spin-slow" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Loading Your Dashboard...</h2>
          <p className="text-slate-500 text-sm">
            Fetching your data and personalizing insights
          </p>
        </motion.div>
      </div>
    );
  }

  const GridAndDotBackground = ({
    children,
  }: {
    children: React.ReactNode;
  }) => (
    <div className="h-full w-full bg-slate-950 relative">
      <div className="absolute inset-0 bg-dot-white/[0.1] pointer-events-none" />
      <div className="absolute inset-0 bg-slate-950/80 [mask-image:radial-gradient(transparent,black)] pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );

  return (
    <GridAndDotBackground>
      <div className="min-h-screen relative max-w-7xl mx-auto p-6 md:p-10 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3 pb-6 border-b border-white/10"
        >
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-400" />
            <span className="text-sm text-blue-400 uppercase tracking-widest font-semibold">
              Career Dashboard
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome Back, <span>{fullName}</span>
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-3xl">
            Track your progress and plan your next career move.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.07, type: "spring" }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 8px 20px rgba(59,130,246,0.2)",
                }}
              >
                <Card className="relative overflow-hidden bg-slate-900/70 backdrop-blur-lg border border-white/10 hover:border-blue-400/30 transition-all duration-500 group h-full">
                  <CardContent className="p-6 flex flex-col justify-between h-full space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-md shadow-blue-500/20`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-100 tracking-wide">
                          {stat.label}
                        </h3>
                      </div>
                      <motion.span
                        className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {stat.value}
                        <span className="text-sm text-slate-400 ml-1">
                          {stat.unit}
                        </span>
                      </motion.span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {stat.description}
                    </p>
                  </CardContent>

                  <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-700"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 20%, rgba(59,130,246,0.15), transparent 70%)",
                    }}
                  />
                </Card>
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="md:col-span-2 xl:col-span-3"
          >
            <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/80 backdrop-blur-lg border border-white/10 hover:border-blue-400/30 transition-all duration-500 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  <Rocket className="w-6 h-6 text-blue-400" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/cv-analyze">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl cursor-pointer hover:border-blue-400/60 transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-all">
                          <FileCheck className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-100 text-lg mb-1">
                            Analyze Your CV
                          </h3>
                          <p className="text-sm text-slate-400 leading-relaxed">
                            Get AI-powered insights and improvements for your
                            resume
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </motion.div>
                  </Link>

                  <Link href="/roadmap">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl cursor-pointer hover:border-purple-400/60 transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-all">
                          <Map className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-100 text-lg mb-1">
                            Create Career Roadmap
                          </h3>
                          <p className="text-sm text-slate-400 leading-relaxed">
                            Build a personalized learning path to reach your
                            goals
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </motion.div>
                  </Link>

                  <Link href="/coverletter">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl cursor-pointer hover:border-green-400/60 transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-all">
                          <PenTool className="w-6 h-6 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-100 text-lg mb-1">
                            Generate Cover Letter
                          </h3>
                          <p className="text-sm text-slate-400 leading-relaxed">
                            Create professional cover letters in seconds with AI
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </motion.div>
                  </Link>

                  <Link href="/ai-chat">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl cursor-pointer hover:border-amber-400/60 transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-amber-500/20 rounded-lg group-hover:bg-amber-500/30 transition-all">
                          <Sparkles className="w-6 h-6 text-amber-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-100 text-lg mb-1">
                            AI Career Coach
                          </h3>
                          <p className="text-sm text-slate-400 leading-relaxed">
                            Get personalized career advice from our AI assistant
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </motion.div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="md:col-span-2 xl:col-span-3"
          >
            <Card className="bg-slate-900/80 backdrop-blur-lg border border-white/10 hover:border-purple-400/30 transition-all duration-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent">
                  <Trophy className="w-6 h-6 text-amber-400" />
                  Your Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <motion.div
                        key={achievement.label}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        className={`p-4 rounded-xl transition-all flex flex-col items-center justify-center space-y-2 border ${
                          achievement.unlocked
                            ? "bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/40 shadow-md shadow-blue-500/10"
                            : "bg-slate-800/30 border-slate-700/30 opacity-70"
                        }`}
                      >
                        <Icon
                          className={`w-7 h-7 ${
                            achievement.unlocked
                              ? "text-blue-400"
                              : "text-slate-600"
                          }`}
                        />
                        <p
                          className={`text-xs font-medium text-center ${
                            achievement.unlocked
                              ? "text-slate-200"
                              : "text-slate-500"
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="md:col-span-2 xl:col-span-3"
          >
            <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/80 backdrop-blur-lg border border-white/10 hover:border-green-400/30 transition-all duration-500 overflow-hidden relative">
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-3xl" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  <BarChart3 className="w-6 h-6 text-green-400" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 relative z-10">
                <div className="space-y-4">
                  <ActivityItem
                    icon={FileCheck}
                    title="CV Analysis Completed"
                    time="2 hours ago"
                    color="blue"
                  />
                  <ActivityItem
                    icon={PenTool}
                    title="Cover Letter Generated"
                    time="1 day ago"
                    color="green"
                  />
                  <ActivityItem
                    icon={Map}
                    title="New Roadmap Created"
                    time="3 days ago"
                    color="purple"
                  />
                  <ActivityItem
                    icon={Sparkles}
                    title="AI Chat Session"
                    time="1 week ago"
                    color="amber"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </GridAndDotBackground>
  );
}

const ActivityItem = ({
  icon: Icon,
  title,
  time,
  color,
}: {
  icon: any;
  title: string;
  time: string;
  color: string;
}) => {
  const colorMap: Record<string, string> = {
    blue: "from-blue-500/20 to-blue-600/20 border-blue-500/40",
    green: "from-green-500/20 to-green-600/20 border-green-500/40",
    purple: "from-purple-500/20 to-purple-600/20 border-purple-500/40",
    amber: "from-amber-500/20 to-amber-600/20 border-amber-500/40",
  };

  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="flex items-center gap-4 p-4 bg-slate-800/40 border border-slate-700/40 rounded-xl hover:bg-slate-800/60 transition-all"
    >
      <div className={`p-2 rounded-lg bg-gradient-to-br ${colorMap[color]}`}>
        <Icon className="w-5 h-5 text-slate-200" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-slate-200">{title}</h4>
        <p className="text-sm text-slate-500">{time}</p>
      </div>
    </motion.div>
  );
};
