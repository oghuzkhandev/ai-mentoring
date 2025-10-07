"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  FileText,
  Edit3,
  Route,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      id: 1,
      icon: MessageSquare,
      title: "AI Q&A Chatbot",
      description:
        "Ask anything about your career, skills, or learning path and get instant, personalized answers.",
      benefits: [
        "24/7 AI career advisor",
        "Personalized guidance",
        "Instant responses",
        "Context-aware answers",
      ],
      gradient: "from-blue-500 to-cyan-500",
      button:
        "bg-gradient-to-r from-blue-300 to-cyan-300 hover:from-blue-500 hover:to-cyan-500 text-white shadow-md hover:shadow-blue-400/50",
      lightBg: "bg-blue-50",
      emoji: "💬",
      demo: "Ask: 'How do I become a senior developer?' and get a detailed roadmap instantly.",
    },
    {
      id: 2,
      icon: FileText,
      title: "CV Analyzer & Suggestions",
      description:
        "Upload your CV and receive detailed analysis with actionable suggestions for improvement.",
      benefits: [
        "ATS compatibility check",
        "Keyword optimization",
        "Design & format tips",
        "Industry-specific advice",
      ],
      gradient: "from-purple-500 to-pink-500",
      button:
        "bg-gradient-to-r from-purple-300 to-pink-300 hover:from-purple-500 hover:to-pink-500 text-white shadow-md hover:shadow-pink-400/50",
      lightBg: "bg-purple-50",
      emoji: "📄",
      demo: "Upload once, get insights on formatting, keywords, and what recruiters look for.",
    },
    {
      id: 3,
      icon: Edit3,
      title: "Cover Letter Writing",
      description:
        "Generate compelling, tailored cover letters in seconds based on job descriptions.",
      benefits: [
        "Job-specific content",
        "Professional tone",
        "Generated in seconds",
        "Customizable templates",
      ],
      gradient: "from-orange-500 to-red-500",
      button:
        "bg-gradient-to-r from-orange-300 to-red-300 hover:from-orange-500 hover:to-red-500 text-white shadow-md hover:shadow-orange-400/50",
      lightBg: "bg-green-50",
      emoji: "✍️",
      demo: "Paste a job posting, and get a perfectly crafted cover letter that matches your CV.",
    },
    {
      id: 4,
      icon: Route,
      title: "Roadmap Generator",
      description:
        "Create personalized learning and career roadmaps with clear milestones and resources.",
      benefits: [
        "Custom learning paths",
        "Milestone tracking",
        "Resource recommendations",
        "Timeline planning",
      ],
      gradient: "from-green-500 to-emerald-500",
      button:
        "bg-gradient-to-r from-green-300 to-emerald-300 hover:from-green-500 hover:to-emerald-500 text-white shadow-md hover:shadow-green-400/50",
      lightBg: "bg-green-50",
      emoji: "🗺️",
      demo: "Set your goal (e.g., 'Become a UX Designer'), and get a step-by-step plan.",
    },
  ];

  return (
    <section
      id="features"
      className="relative py-24 px-6 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl"
      />
      <div className="container relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-slate-700">
              Powerful Features
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Everything You Need to
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Accelerate Your Career
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            AI-powered tools designed to help you land your dream job faster and
            build the career you deserve.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredIndex === index;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
                />
                <div className="relative bg-white border-2 border-slate-200 rounded-3xl p-8 shadow-lg group-hover:shadow-2xl group-hover:border-slate-300 transition-all duration-500 h-full">
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div
                      className={`p-4 rounded-2xl ${feature.lightBg} group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-8 h-8 text-slate-700" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    <motion.span
                      className="text-4xl"
                      animate={
                        isHovered
                          ? { rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                    >
                      {feature.emoji}
                    </motion.span>
                  </div>
                  <div className="space-y-3 mb-6">
                    {feature.benefits.map((benefit, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + i * 0.05 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`p-1 rounded-full`}>
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                          {benefit}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  <div
                    className={`p-4 rounded-xl ${feature.lightBg} border border-slate-200 mb-6`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <Zap className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-slate-600 uppercase">
                        How it works
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {feature.demo}
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className={`w-full justify-between font-semibold py-6 rounded-xl transition-all ${feature.button}`}
                    >
                      <span className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Try {feature.title}
                      </span>
                      <motion.div
                        animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                        transition={{
                          duration: 1,
                          repeat: isHovered ? Infinity : 0,
                        }}
                      >
                        <ArrowRight className="w-5 h-5 transition-transform" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
