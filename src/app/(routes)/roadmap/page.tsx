"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  Map,
  Sparkles,
  Brain,
  Workflow,
  TrendingUp,
  Target,
  Users,
  Award,
  Zap,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import SideBar from "@/app/components/SideBar";
import RoadmapVisualizer from "@/app/components/RoadmapVisualizer";

export default function RoadmapGeneratorPage() {
  const { user } = useUser();
  const roadmapRef = React.useRef<HTMLDivElement | null>(null);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!userInput.trim()) {
      setError("Please describe your career goal first 😅");
      return;
    }

    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userInput,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userId: user?.id,
        }),
      });

      if (!res.ok) throw new Error("Failed to start roadmap generation");

      const { roadmapId } = await res.json();
      if (!roadmapId) throw new Error("No roadmap ID returned from server");

      let attempts = 0;
      const maxAttempts = 45;

      while (attempts < maxAttempts) {
        const check = await fetch(`/api/roadmap?id=${roadmapId}`);
        if (!check.ok) throw new Error("Server error during roadmap check");

        const data = await check.json();
        if (data.status === "Completed") {
          setResult(data.roadmapData || "No roadmap data returned");
          setLoading(false);
          return;
        }

        if (data.status === "failed") {
          throw new Error("Roadmap generation failed. Try again later.");
        }

        await new Promise((r) => setTimeout(r, 4000));
        attempts++;
      }

      throw new Error("Timeout: Roadmap took too long to generate.");
    } catch (err) {
      console.error("Error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while generating the roadmap."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (result && roadmapRef.current) {
      setTimeout(() => {
        roadmapRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 200);
    }
  }, [result]);

  const benefits = [
    {
      icon: <Target className="w-6 h-6 text-blue-400" />,
      title: "Crystal Clear Direction",
      description:
        "No more confusion about what to learn next. Get a step-by-step path tailored to your goals.",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-400" />,
      title: "Accelerate Your Growth",
      description:
        "Learn 3x faster with a structured approach designed by AI analyzing thousands of success stories.",
    },
    {
      icon: <Award className="w-6 h-6 text-pink-400" />,
      title: "Stay Competitive",
      description:
        "Keep ahead of industry trends with roadmaps updated to reflect the latest market demands.",
    },
    {
      icon: <Users className="w-6 h-6 text-cyan-400" />,
      title: "Join Elite Professionals",
      description:
        "Thousands of successful professionals have transformed their careers using our AI roadmaps.",
    },
  ];

  const stats = [
    { value: "85%", label: "Career Success Rate" },
    { value: "100%", label: "Easy to understand" },
    { value: "3x", label: "Faster Learning" },
    { value: "4.9/5", label: "User Rating" },
  ];

  return (
    <div className="flex min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <SideBar />

      <main className="flex-1 flex flex-col items-center px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-6xl w-full"
        >
          {/* Hero Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30"
            >
              <span className="text-sm font-semibold text-blue-300">
                ✨ Powered by Advanced AI Technology
              </span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              Transform Your Career
              <br />
              With AI-Powered Roadmaps
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
              Join thousands of professionals who've accelerated their career
              growth with personalized, data-driven learning paths
            </p>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 * idx }}
                className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Card */}
          <Card className="relative bg-slate-900/40 border border-white/10 backdrop-blur-2xl shadow-[0_0_80px_-20px_rgba(59,130,246,0.6)] rounded-3xl overflow-hidden mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 pointer-events-none" />

            <CardHeader className="relative z-10 pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl font-bold text-white">
                <Brain className="w-6 h-6 text-blue-400" />
                Create Your Career Roadmap
              </CardTitle>
              <p className="text-slate-300 text-sm mt-2">
                Describe your career aspirations and watch AI build your
                personalized learning journey
              </p>
            </CardHeader>

            <CardContent className="space-y-6 relative z-10 pb-8">
              <div className="relative">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Example: I want to transition from marketing to data science within 18 months, focusing on machine learning and predictive analytics..."
                  className="w-full h-40 p-5 text-base rounded-2xl bg-slate-800/40 border border-slate-600/50 text-slate-100 placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent transition-all shadow-inner"
                />
                <Sparkles className="absolute right-5 bottom-5 w-5 h-5 text-purple-400 animate-pulse" />
              </div>

              <motion.div
                className="flex justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full py-6 text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-2xl transition-all rounded-2xl relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                  {loading ? (
                    <motion.div
                      className="flex items-center gap-3"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Loader2 className="w-5 h-5 animate-spin text-white" />
                      <span>Generating Your Roadmap...</span>
                    </motion.div>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Zap className="w-5 h-5" />
                      Generate My Roadmap
                    </span>
                  )}
                </Button>
              </motion.div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-center text-sm"
                >
                  ⚠️ {error}
                </motion.p>
              )}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col items-center gap-2 mt-6 text-slate-300"
                >
                  <Workflow className="w-8 h-8 text-purple-400 animate-pulse" />
                  <p className="text-sm italic">
                    AI is analyzing thousands of career paths to craft your
                    perfect roadmap...
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Benefits Section */}
          {!result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Why Professionals Choose Our Roadmaps
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl group-hover:scale-110 transition-transform">
                        {benefit.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Social Proof */}
          {!result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center py-12 px-8 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 rounded-3xl border border-white/5 backdrop-blur-xl"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm font-semibold text-green-400">
                  Trusted by Industry Leaders
                </span>
              </div>
              <blockquote className="text-xl italic text-slate-300 max-w-3xl mx-auto mb-4">
                "This AI roadmap helped me transition from teaching to software
                engineering in just 4 months. The personalized approach made all
                the difference in my career journey."
              </blockquote>
              <p className="text-slate-500 text-sm">
                — Sarah Chen, Senior Software Engineer at Meta
              </p>
            </motion.div>
          )}
        </motion.div>

        {result && (
          <motion.div
            ref={roadmapRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-16 w-full max-w-6xl"
          >
            <Card className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_60px_-15px_rgba(139,92,246,0.5)]">
              <CardHeader className="border-b border-white/5 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
                <CardTitle className="flex items-center gap-3 text-2xl font-semibold text-white">
                  <Map className="w-7 h-7 text-blue-400" />
                  Your Personalized Career Roadmap
                </CardTitle>
                <p className="text-slate-400 text-sm mt-2">
                  Follow this path to achieve your career goals efficiently
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <RoadmapVisualizer roadmapText={result} />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  );
}
