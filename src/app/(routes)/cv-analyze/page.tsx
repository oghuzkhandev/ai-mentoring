"use client";

import React, { useState, useEffect } from "react";
import {
  Upload,
  FileText,
  Sparkles,
  Loader2,
  CheckCircle2,
  Shield,
  Zap,
  TrendingUp,
} from "lucide-react";
import SideBar from "../../components/SideBar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { LampContainer } from "../../../components/ui/lamp";
import { toast } from "sonner";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Analysis",
    description: "Advanced algorithms analyze every detail of your CV",
  },
  {
    icon: Shield,
    title: "ATS Optimization",
    description: "Ensure your CV passes Applicant Tracking Systems",
  },
  {
    icon: TrendingUp,
    title: "Industry Insights",
    description: "Get recommendations based on current market trends",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "Receive comprehensive analysis in seconds",
  },
];

type AnalysisResult = {
  id: string;
  score: number | null;
  analysis: string;
  fileUrl: string;
  status: string;
};

export default function CVAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isPro, setIsPro] = useState<boolean>(false);

  function formatAnalysisForDisplay(text: string): string {
    if (!text) return "";

    text = text.replace(/\*\*/g, "").replace(/[*_]+/g, "");

    text = text.replace(
      /(📊\s*Scoring Breakdown|🚨\s*Top 5 Critical Issues|💪\s*Top Strengths|🔧\s*Areas for Improvement|🧩\s*ATS & Structure Optimization|🧠\s*Skills & Competency Insights |🚀\s*Strategic Career Recommendations|💼\s*Overall Impression)/gi,
      (match) =>
        `<h2 class="text-xl font-bold mt-8 mb-4 tracking-wide text-white uppercase">${match}</h2>`
    );

    // Liste işaretlerini düzelt
    text = text.replace(/^[-•*]\s+/gm, "• ");

    // Paragraf aralarını düzenle
    text = text.replace(/\n{2,}/g, "</div><div class='mt-6'>");
    text = text.replace(/\n/g, "<br>");

    return `<div class="text-gray-100 leading-relaxed tracking-wide text-[1.05rem]">${text}</div>`;
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  useEffect(() => {
    const fetchProStatus = async () => {
      try {
        const res = await fetch("/api/dashboard-stats");
        if (res.ok) {
          const data = await res.json();
          setIsPro(data?.credits?.isPro || false);
        } else {
          console.error("Failed to fetch pro status");
        }
      } catch (err) {
        console.error("❌ Error fetching pro status:", err);
      }
    };

    fetchProStatus();
  }, []);

  const analyzeCV = async () => {
    if (!file) return;
    if (!isPro) {
      toast.error(
        "🚫 This feature is available for Pro users only. Upgrade to Pro to use CV Analysis!"
      );
      return;
    }
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setError("Only PDF files are supported.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File too large. Max 5MB allowed.");
      return;
    }
    setAnalyzing(true);
    setError(null);
    setResult(null);
    setProgress(0);
    const formData = new FormData();
    formData.append("cv", file);

    try {
      const uploadRes = await fetch("/api/cv-analyze", {
        method: "POST",
        body: formData,
      });
      const data = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(data.error || "Upload failed");
      const { recordId: serverRecordId } = data;
      let attempts = 0;
      const maxAttempts = 40;
      while (attempts < maxAttempts) {
        const checkRes = await fetch(`/api/cv-analyze?id=${serverRecordId}`);
        if (!checkRes.ok) throw new Error("Server error during analysis check");
        const checkData = await checkRes.json();
        if (checkData.status === "completed") {
          setResult(checkData);
          setAnalyzing(false);
          setProgress(100);
          toast.success(
            `✅ CV analysis complete! ${
              checkData.score ? `Your score: ${checkData.score}/100` : ""
            }`
          );
          return;
        }
        if (checkData.status === "failed")
          throw new Error("Analysis failed. Please try again.");
        setProgress(((attempts + 1) / maxAttempts) * 100);
        await new Promise((r) => setTimeout(r, 4000));
        attempts++;
      }
      throw new Error("Analysis timeout. Please try again.");
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-white">
      <SideBar />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="py-16 text-center">
            <Badge className="py-2 px-4 bg-blue-500/20 border-blue-500/40 text-blue-200 backdrop-blur-xl text-sm tracking-wide">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              AI-Powered CV Analysis
            </Badge>
            <LampContainer className="min-h-[400px] flex flex-col items-center justify-center mt-6">
              <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Transform Your CV
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mt-4 leading-relaxed">
                Get instant, AI-powered feedback to make your CV stand out and
                impress recruiters.
              </p>
            </LampContainer>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-10"
          >
            <Card className="bg-slate-900/60 border-white/20 backdrop-blur-2xl shadow-2xl">
              <CardContent>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed transition-all duration-300 ${
                    dragActive
                      ? "border-blue-400 bg-blue-500/10"
                      : "border-white/30 hover:border-blue-300"
                  } ${file ? "bg-slate-800/40" : ""} p-16`}
                >
                  <input
                    type="file"
                    id="cv-upload"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {!file ? (
                    <label
                      htmlFor="cv-upload"
                      className="flex flex-col items-center justify-center cursor-pointer space-y-8"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="p-8 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-xl"
                      >
                        <Upload className="w-16 h-16 text-blue-300" />
                      </motion.div>
                      <div className="text-center space-y-4">
                        <div className="space-y-2">
                          <p className="text-2xl font-bold text-white">
                            Drop your CV here
                          </p>
                          <p className="text-lg text-white">
                            or click to browse files
                          </p>
                        </div>
                        <div className="flex items-center justify-center gap-6 text-sm text-white">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />{" "}
                            PDF Only
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />{" "}
                            Max 5MB
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />{" "}
                            Secure & Private
                          </div>
                        </div>
                      </div>
                    </label>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between p-6 rounded-xl bg-slate-800/60 border border-white/20 backdrop-blur-xl">
                        <div className="flex items-center gap-4">
                          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-600/40 to-purple-600/40">
                            <FileText className="w-8 h-8 text-blue-300" />
                          </div>
                          <div>
                            <p className="font-semibold text-lg text-white">
                              {file.name}
                            </p>
                            <p className="text-white text-sm">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setFile(null);
                              setResult(null);
                              setError(null);
                              setProgress(0);
                              const input = document.getElementById(
                                "cv-upload"
                              ) as HTMLInputElement;
                              if (input) input.value = "";
                            }}
                            disabled={analyzing}
                            className="px-6 py-3 rounded-xl bg-red-500/30 hover:bg-red-500/40 text-white font-medium disabled:opacity-50"
                          >
                            Remove
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={analyzeCV}
                            disabled={analyzing}
                            className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 font-semibold text-white disabled:opacity-50"
                          >
                            <span className="flex items-center gap-2">
                              {analyzing ? (
                                <>
                                  <Loader2 className="w-5 h-5 animate-spin" />{" "}
                                  Analyzing...
                                </>
                              ) : (
                                <>
                                  <Sparkles className="w-5 h-5" /> Analyze CV
                                </>
                              )}
                            </span>
                          </motion.button>
                        </div>
                      </div>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="p-4 rounded-xl bg-red-500/20 border border-red-500/40"
                        >
                          <p className="text-red-300">{error}</p>
                        </motion.div>
                      )}
                      {result && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="space-y-4"
                        >
                          <div className="p-6 rounded-xl bg-green-500/20 border border-green-500/40">
                            <div className="flex items-center gap-3">
                              <CheckCircle2 className="w-6 h-6 text-green-400" />
                              <div>
                                <p className="font-semibold text-white text-lg">
                                  Analysis Complete!
                                </p>
                                {result.score && (
                                  <p className="text-lg text-yellow-400">
                                    Score: {result.score}/100
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="p-8 rounded-xl bg-slate-900/70 border border-white/20 space-y-4 text-left overflow-auto">
                            <div
                              className="text-white text-base leading-relaxed whitespace-pre-line"
                              dangerouslySetInnerHTML={{
                                __html: formatAnalysisForDisplay(
                                  result.analysis
                                ),
                              }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-16 px-10">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="bg-slate-900/60 border-white/20 backdrop-blur-xl h-full">
                    <CardContent className="p-6 space-y-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 w-fit">
                        <Icon className="w-6 h-6 text-blue-300" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-bold text-lg text-white">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-white">
                          {feature.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pb-16 px-10"
          >
            <Card className="bg-slate-900/60 border-white/20 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-green-400" />
                    <div>
                      <p className="font-semibold text-white">
                        Your data is secure
                      </p>
                      <p className="text-sm text-white">
                        Enterprise-grade encryption
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-500/30 text-green-200 border-green-400/40">
                      <CheckCircle2 className="w-4 h-4 mr-2" /> SSL Encrypted
                    </Badge>
                    <Badge className="bg-blue-500/30 text-blue-200 border-blue-400/40">
                      <Shield className="w-4 h-4 mr-2" /> GDPR Compliant
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
