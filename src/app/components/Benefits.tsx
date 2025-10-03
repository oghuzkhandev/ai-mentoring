"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  RefreshCw,
  TrendingUp,
  Clock,
  Target,
  Sparkles,
  CheckCircle2,
  Award,
  Zap,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Benefits() {
  const [activeTab, setActiveTab] = useState(0);

  const useCases = [
    {
      id: 0,
      title: "Students & Fresh Graduates",
      icon: GraduationCap,
      emoji: "🎓",
      description: "Start your career journey with confidence",
      color: "from-blue-500 to-cyan-500",
      lightBg: "bg-blue-50",
      accentColor: "text-blue-600",
      benefits: [
        {
          icon: Target,
          title: "Build Your First CV",
          description:
            "Create a professional CV that stands out to employers, even without experience.",
        },
        {
          icon: TrendingUp,
          title: "Learn Career Paths",
          description:
            "Discover different career options and get personalized roadmaps for your field.",
        },
        {
          icon: Sparkles,
          title: "Ace Your Interviews",
          description:
            "Get AI-powered interview tips and practice questions for your target roles.",
        },
      ],
      stats: {
        users: "15K+ Students",
        success: "87% Got Interviews",
        time: "2 weeks avg. to first job offer",
      },
    },
    {
      id: 1,
      title: "Job Seekers",
      icon: Briefcase,
      emoji: "💼",
      description: "Land your dream job faster",
      color: "from-purple-500 to-pink-500",
      lightBg: "bg-purple-50",
      accentColor: "text-purple-600",
      benefits: [
        {
          icon: Zap,
          title: "Optimize Your CV",
          description:
            "Get ATS-friendly CV suggestions that pass recruiter screenings automatically.",
        },
        {
          icon: Clock,
          title: "Save 10+ Hours",
          description:
            "Generate tailored cover letters in seconds instead of spending hours writing.",
        },
        {
          icon: Award,
          title: "Stand Out",
          description:
            "Highlight your unique skills and achievements in a way that grabs attention.",
        },
      ],
      stats: {
        users: "25K+ Job Seekers",
        success: "92% Improved CV Score",
        time: "50% faster job search",
      },
    },
    {
      id: 2,
      title: "Career Changers",
      icon: RefreshCw,
      emoji: "🔄",
      description: "Transition to your new career smoothly",
      color: "from-orange-500 to-red-500",
      lightBg: "bg-orange-50",
      accentColor: "text-orange-600",
      benefits: [
        {
          icon: Target,
          title: "Clear Transition Plan",
          description:
            "Get a step-by-step roadmap to acquire new skills and make the switch.",
        },
        {
          icon: Users,
          title: "Transfer Your Skills",
          description:
            "Learn how to position your existing experience for your new industry.",
        },
        {
          icon: TrendingUp,
          title: "Build Confidence",
          description:
            "Understand what employers look for and how to present yourself effectively.",
        },
      ],
      stats: {
        users: "10K+ Career Changers",
        success: "78% Successfully Transitioned",
        time: "3-6 months avg. transition",
      },
    },
  ];

  const activeUseCase = useCases[activeTab];

  const globalBenefits = [
    {
      icon: Clock,
      title: "Save Time",
      description: "Reduce job search time by 50%",
      metric: "10+ hours saved weekly",
    },
    {
      icon: TrendingUp,
      title: "Better Results",
      description: "Higher interview conversion rates",
      metric: "3x more interviews",
    },
    {
      icon: Award,
      title: "Expert Quality",
      description: "Professional-grade documents",
      metric: "95% satisfaction rate",
    },
    {
      icon: Sparkles,
      title: "Always Learning",
      description: "AI improves with every use",
      metric: "Updated daily",
    },
  ];

  return (
    <section
      className="relative py-24 px-6 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden"
      id="benefits"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.05),transparent_50%)]" />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 mb-6"
          >
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-slate-700">
              Built for Everyone
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Who Benefits from
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Mentorly?
            </span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Whether you're just starting out, looking for a change, or climbing
            the ladder—we've got you covered.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-4 justify-center mb-12">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            const isActive = activeTab === index;

            return (
              <motion.button
                key={useCase.id}
                onClick={() => setActiveTab(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-white shadow-xl border-2 border-blue-200"
                    : "bg-white/60 border-2 border-slate-200 hover:border-slate-300"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 bg-gradient-to-r ${useCase.color} opacity-5 rounded-2xl`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <div
                  className={`relative p-2 rounded-lg ${
                    isActive ? useCase.lightBg : "bg-slate-100"
                  } transition-colors`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? useCase.accentColor : "text-slate-600"
                    }`}
                  />
                </div>

                <div className="relative text-left">
                  <div
                    className={`text-sm md:text-base ${
                      isActive ? "text-slate-900" : "text-slate-600"
                    }`}
                  >
                    {useCase.title}
                  </div>
                </div>

                <span className="text-2xl relative">{useCase.emoji}</span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-20"
          >
            <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl p-8 md:p-12">
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${activeUseCase.color} mb-6`}
                >
                  <span className="text-4xl">{activeUseCase.emoji}</span>
                </motion.div>

                <h3 className="text-3xl font-bold text-slate-900 mb-3">
                  {activeUseCase.title}
                </h3>
                <p className="text-lg text-slate-600">
                  {activeUseCase.description}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {activeUseCase.benefits.map((benefit, index) => {
                  const BenefitIcon = benefit.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-6 rounded-2xl ${activeUseCase.lightBg} border border-slate-200`}
                    >
                      <div
                        className={`inline-flex p-2.5 rounded-xl bg-white mb-4`}
                      >
                        <BenefitIcon
                          className={`w-6 h-6 ${activeUseCase.accentColor}`}
                        />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              <div
                className={`grid grid-cols-3 gap-6 p-6 rounded-2xl ${activeUseCase.lightBg} border border-slate-200`}
              >
                <div className="text-center">
                  <div
                    className={`text-2xl md:text-3xl font-bold ${activeUseCase.accentColor} mb-1`}
                  >
                    {activeUseCase.stats.users}
                  </div>
                  <div className="text-xs md:text-sm text-slate-600">
                    Active Users
                  </div>
                </div>
                <div className="text-center border-x border-slate-300">
                  <div
                    className={`text-2xl md:text-3xl font-bold ${activeUseCase.accentColor} mb-1`}
                  >
                    {activeUseCase.stats.success}
                  </div>
                  <div className="text-xs md:text-sm text-slate-600">
                    Success Rate
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`text-2xl md:text-3xl font-bold ${activeUseCase.accentColor} mb-1`}
                  >
                    {activeUseCase.stats.time}
                  </div>
                  <div className="text-xs md:text-sm text-slate-600">
                    Average Time
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900">
            What You'll{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Gain
            </span>
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {globalBenefits.map((benefit, index) => {
              const BenIcon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

                  <div className="relative bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-lg group-hover:shadow-xl group-hover:border-slate-300 transition-all duration-300">
                    <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 mb-4 group-hover:scale-110 transition-transform">
                      <BenIcon className="w-6 h-6 text-blue-600" />
                    </div>

                    <h4 className="text-xl font-bold text-slate-900 mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-slate-600 mb-3">
                      {benefit.description}
                    </p>

                    <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-xs font-semibold text-slate-700">
                        {benefit.metric}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
