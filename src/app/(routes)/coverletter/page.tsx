"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Loader2,
  Send,
  Copy,
  Download,
  Sparkles,
  CheckCircle2,
  Clock,
  Target,
  TrendingUp,
  Shield,
  Zap,
  FileText,
  Award,
  Star,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import jsPDF from "jspdf";

export default function CoverLetterAIPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const outputRef = React.useRef<HTMLDivElement | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [coverLetterId, setCoverLetterId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateLetter = async () => {
    if (!jobDescription.trim())
      return toast.error("Please enter a job description!");
    if (!isSignedIn || !user) return toast.error("Please sign in first.");

    setLoading(true);
    setCoverLetter("");
    setCoverLetterId(null);

    setTimeout(() => {
      outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);

    try {
      const res = await fetch("/api/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          userEmail: user.primaryEmailAddress?.emailAddress,
          userName:
            user.fullName ||
            `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
            user.username ||
            user.primaryEmailAddress?.emailAddress,
          jobDescription,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong!");
        setLoading(false);
        return;
      }

      if (data.remainingCredits !== undefined) {
        toast.info(`You have ${data.remainingCredits} credits left.`);
      }

      if (!data?.coverLetterId) throw new Error("Cover letter ID not returned");

      setCoverLetterId(data.coverLetterId);
    } catch (error) {
      console.error("Error generating letter:", error);
      toast.error("Failed to start generation process.");
      setCoverLetter("Failed to start generation process.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!coverLetterId) return;

    const interval = setInterval(async () => {
      const res = await fetch(`/api/cover-letter/?id=${coverLetterId}`);
      const data = await res.json();

      if (data?.status === "completed" && data?.content) {
        setCoverLetter(data.content);
        setLoading(false);
        clearInterval(interval);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [coverLetterId]);

  const copyLetter = () => {
    if (!coverLetter) return;
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPDF = () => {
    if (!coverLetter) return;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const margin = 40;
    const maxWidth = doc.internal.pageSize.getWidth() - margin * 2;
    let y = 60;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Professional Cover Letter", margin, y);
    y += 25;

    doc.setFont("times", "normal");
    doc.setFontSize(12);

    const lines = doc.splitTextToSize(coverLetter, maxWidth);
    lines.forEach((line: string) => {
      if (y > 780) {
        doc.addPage();
        y = 60;
      }
      doc.text(line, margin, y);
      y += 18;
    });

    doc.save("cover-letter.pdf");
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
        <Loader2 className="w-6 h-6 animate-spin text-sky-400" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white text-center">
        <p className="text-lg text-slate-300">
          Please <span className="text-sky-400 font-semibold">sign in</span> to
          generate your AI cover letter.
        </p>
      </div>
    );
  }

  const benefits = [
    {
      icon: Clock,
      title: "Save Time",
      description: "Generate professional letters in under 30 seconds",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Target,
      title: "Tailored Content",
      description: "Each letter is customized to the specific job posting",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: TrendingUp,
      title: "Increase Success Rate",
      description: "Stand out with compelling, well-structured letters",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Shield,
      title: "ATS-Friendly",
      description: "Optimized for Applicant Tracking Systems",
      color: "from-amber-500 to-orange-500",
    },
  ];

  const stats = [
    { value: "10K+", label: "Letters Generated", icon: FileText },
    { value: "92%", label: "Success Rate", icon: Award },
    { value: "30s", label: "Average Time", icon: Zap },
    { value: "4.9/5", label: "User Rating", icon: Star },
  ];

  return (
    <div className="min-h-screen flex bg-slate-950 text-white overflow-hidden relative">
      <Sidebar />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.12),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-[linear-gradient(to_bottom_right,rgba(168,85,247,0.12),rgba(34,197,94,0.1))]" />

      <main className="flex-1 relative z-10 p-8 md:p-12 lg:p-16 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-300 via-fuchsia-300 to-emerald-300">
                AI Cover Letter Generator
              </h1>
              <p className="text-slate-400 mt-1">
                Create professional, personalized cover letters in seconds
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:border-blue-400/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <stat.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-slate-400">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="relative bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-lg ring-1 ring-slate-700/40 hover:ring-sky-400/30 transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <label className="text-lg font-semibold text-slate-200">
                  Paste Job Description
                </label>
              </div>
              <textarea
                rows={10}
                className="w-full rounded-xl bg-slate-800/60 border border-slate-700 text-slate-200 placeholder-slate-500 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition resize-none"
                placeholder="Paste the full job posting here... Include required skills, responsibilities, and qualifications for the best results."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateLetter}
                disabled={loading || !jobDescription.trim()}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-fuchsia-500 px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-sky-500/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Your Cover Letter...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Generate Cover Letter
                  </>
                )}
              </motion.button>
            </div>

            <AnimatePresence>
              {coverLetter && (
                <motion.div
                  ref={outputRef}
                  key="output"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                      <h3 className="text-xl font-bold text-slate-900">
                        Your Cover Letter
                      </h3>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={copyLetter}
                        className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg px-4 py-2 text-sm transition"
                      >
                        {copied ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" /> Copy
                          </>
                        )}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={downloadPDF}
                        className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-lime-500 px-4 py-2 rounded-lg text-sm font-medium text-white shadow-md hover:shadow-emerald-500/30 transition"
                      >
                        <Download className="w-4 h-4" /> PDF
                      </motion.button>
                    </div>
                  </div>

                  <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed">
                    {coverLetter.split(/\n\s*\n/).map((para, i) => (
                      <p key={i} className="mb-4">
                        {para.trim()}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {loading && !coverLetter && (
              <motion.div
                ref={outputRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-2xl p-12 animate-pulse"
              >
                <Loader2 className="w-12 h-12 animate-spin text-sky-400 mx-auto mb-4" />
                <p className="text-center text-slate-300 text-lg font-medium">
                  AI is crafting your perfect cover letter...
                </p>
                <p className="text-center text-slate-500 text-sm mt-2">
                  This usually takes 20-30 seconds
                </p>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-bold text-white">Why Use AI?</h3>
              </div>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex gap-3"
                  >
                    <div
                      className={`p-2 bg-gradient-to-br ${benefit.color} rounded-lg flex-shrink-0 h-fit`}
                    >
                      <benefit.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-green-400" />
                Pro Tips
              </h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Include the complete job description for best results
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Review and personalize before sending</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Use keywords from the job posting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Keep it concise and professional</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-green-400" />
                Success Stories
              </h3>
              <div className="space-y-3">
                <div className="bg-slate-900/40 rounded-lg p-3">
                  <p className="text-sm text-slate-300 italic mb-2">
                    "Got 3 interviews in one week!"
                  </p>
                  <p className="text-xs text-slate-500">- Sarah, Developer</p>
                </div>
                <div className="bg-slate-900/40 rounded-lg p-3">
                  <p className="text-sm text-slate-300 italic mb-2">
                    "Saved hours of writing time"
                  </p>
                  <p className="text-xs text-slate-500">- Mike, Designer</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
