"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  CheckCircle2,
  X,
  Maximize2,
  Check,
  Download,
} from "lucide-react";
import { jsPDF } from "jspdf";

export default function RoadmapVisualizer({
  roadmapText,
}: {
  roadmapText: string;
}) {
  const roadmap = useMemo(() => parseRoadmap(roadmapText), [roadmapText]);
  const [fullscreen, setFullscreen] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (fullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [fullscreen]);

  const toggleComplete = (i: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;
    let yPosition = 20;

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Career Roadmap", margin, yPosition);
    yPosition += 15;

    if (roadmap.overview) {
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      const overviewLines = doc.splitTextToSize(roadmap.overview, maxWidth);
      doc.text(overviewLines, margin, yPosition);
      yPosition += overviewLines.length * 6 + 10;
    }

    roadmap.steps.forEach((step, index) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(`${index + 1}. ${step.title}`, margin, yPosition);
      yPosition += 8;

      if (step.content) {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        const contentLines = doc.splitTextToSize(step.content, maxWidth);

        contentLines.forEach((line: string) => {
          if (yPosition > 280) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(line, margin + 5, yPosition);
          yPosition += 5;
        });
      }
      yPosition += 8;
    });

    if (roadmap.finalAdvice) {
      if (yPosition > 260) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Final Advice", margin, yPosition);
      yPosition += 8;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const adviceLines = doc.splitTextToSize(roadmap.finalAdvice, maxWidth);
      doc.text(adviceLines, margin, yPosition);
    }

    doc.save("career-roadmap.pdf");
  };

  return (
    <>
      <div className="border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
        <div className="relative w-full min-h-screen bg-slate-900 text-white px-8 py-12 flex flex-col items-center">
          <motion.div
            className="relative z-10 mb-10 text-center w-full max-w-6xl"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3 flex-1">
                <Target className="text-blue-400 w-10 h-10" />
                <h1 className="text-2xl font-semibold text-blue-300">
                  Roadmap Overview
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={downloadPDF}
                  className="bg-green-800/90 border border-green-600 rounded-lg px-3 py-2 text-sm flex items-center gap-2 hover:bg-green-700 transition text-slate-200 shadow"
                >
                  <Download className="w-4 h-4" />
                  PDF
                </button>
                <button
                  onClick={() => setFullscreen(true)}
                  className="bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-2 text-sm flex items-center gap-2 hover:bg-slate-700 transition text-slate-200 shadow"
                >
                  <Maximize2 className="w-4 h-4" />
                  Fullscreen
                </button>
              </div>
            </div>

            <p className="text-slate-300 mx-auto text-base whitespace-pre-line text-center">
              {roadmap.overview || "Your career roadmap starts here."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {roadmap.steps.map((step, i) => {
              const colorClasses = [
                "from-pink-400/60 to-rose-300/30 border-pink-400/40",
                "from-red-400/60 to-orange-300/30 border-orange-400/40",
                "from-amber-400/60 to-yellow-300/30 border-amber-400/40",
                "from-lime-400/60 to-green-300/30 border-lime-400/40",
                "from-emerald-400/60 to-teal-300/30 border-emerald-400/40",
                "from-sky-400/60 to-cyan-300/30 border-sky-400/40",
                "from-blue-400/60 to-indigo-300/30 border-blue-400/40",
                "from-violet-400/60 to-purple-300/30 border-violet-400/40",
                "from-fuchsia-400/60 to-pink-300/30 border-fuchsia-400/40",
              ];
              const colors = colorClasses[i % colorClasses.length];

              return (
                <StepCard
                  key={i}
                  index={i}
                  step={step}
                  colors={colors}
                  completed={completedSteps.has(i)}
                  onToggle={() => toggleComplete(i)}
                />
              );
            })}
          </div>

          <motion.div
            className="relative z-10 mt-16 text-center max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CheckCircle2 className="mx-auto text-green-400 w-10 h-10 mb-3" />
            <h2 className="text-xl font-semibold text-green-300 mb-2">
              Final Advice
            </h2>
            <p className="text-slate-300 text-base whitespace-pre-line">
              {roadmap.finalAdvice}
            </p>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            className="fixed inset-0 bg-slate-950 z-[9999] overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="min-h-screen w-full px-8 py-12 flex flex-col items-center">
              <div className="absolute top-6 right-6 z-50 flex gap-2">
                <button
                  onClick={downloadPDF}
                  className="bg-green-800/90 border border-green-600 rounded-lg px-4 py-2 text-sm text-slate-200 hover:bg-green-700 transition flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  PDF
                </button>
                <button
                  onClick={() => setFullscreen(false)}
                  className="bg-slate-800/90 border border-slate-600 rounded-lg px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 transition flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Close
                </button>
              </div>

              <motion.div
                className="relative z-10 mb-12 text-center w-full max-w-4xl"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3 justify-center mb-6">
                  <Target className="text-blue-400 w-12 h-12" />
                  <h1 className="text-3xl font-semibold text-blue-300">
                    Roadmap Overview
                  </h1>
                </div>

                <p className="text-slate-300 mx-auto text-lg whitespace-pre-line">
                  {roadmap.overview || "Your career roadmap starts here."}
                </p>
              </motion.div>

              <div className="flex flex-col gap-8 w-full max-w-4xl">
                {roadmap.steps.map((step, i) => {
                  const colorClasses = [
                    "from-pink-500/40 to-pink-700/40 border-pink-300/40",
                    "from-purple-500/40 to-purple-700/40 border-purple-300/50",
                    "from-amber-500/40 to-amber-700/40 border-amber-300/50",
                    "from-emerald-500/40 to-emerald-700/40 border-emerald-300/50",
                    "from-sky-500/40 to-sky-700/40 border-sky-300/50",
                    "from-fuchsia-500/40 to-fuchsia-700/40 border-fuchsia-300/50",
                  ];
                  const colors = colorClasses[i % colorClasses.length];

                  return (
                    <StepCardFullscreen
                      key={i}
                      index={i}
                      step={step}
                      colors={colors}
                      completed={completedSteps.has(i)}
                      onToggle={() => toggleComplete(i)}
                    />
                  );
                })}
              </div>

              <motion.div
                className="relative z-10 mt-16 mb-12 text-center max-w-3xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle2 className="mx-auto text-green-400 w-12 h-12 mb-4" />
                <h2 className="text-2xl font-semibold text-green-300 mb-3">
                  Final Advice
                </h2>
                <p className="text-slate-300 text-lg whitespace-pre-line">
                  {roadmap.finalAdvice}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function StepCard({ step, index, colors, completed, onToggle }: any) {
  const [show, setShow] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        onClick={() => setShow(true)}
        className={`relative bg-gradient-to-b ${colors} border-2 rounded-2xl p-6 text-center shadow-xl cursor-pointer hover:scale-[1.02] transition-all h-full flex flex-col`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="absolute top-3 right-3 w-7 h-7 rounded-full border border-white/40 bg-slate-800/50 hover:bg-slate-700 flex items-center justify-center transition"
        >
          {completed && <Check className="w-4 h-4 text-green-400" />}
        </button>

        <div className="flex justify-center items-center mb-3">
          <span className="font-semibold text-lg bg-slate-900/60 rounded-full w-8 h-8 flex items-center justify-center text-white">
            {index + 1}
          </span>
        </div>

        <h3 className="text-lg font-semibold mb-3 line-clamp-2">
          {step.title}
        </h3>
        <p className="text-slate-200 text-sm leading-relaxed line-clamp-4">
          {step.content.slice(0, 150) || "No details"}
        </p>
      </motion.div>

      <AnimatePresence>
        {show && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 z-[10000]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShow(false)}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 w-[90vw] max-w-2xl max-h-[80vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 bg-slate-900 p-8 rounded-2xl border-2 border-green-500 shadow-2xl z-[10001]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-slate-100 pr-8">
                  Step {index + 1}: {step.title}
                </h3>
                <button
                  onClick={() => setShow(false)}
                  className="text-slate-400 hover:text-white flex-shrink-0"
                >
                  <X size={24} />
                </button>
              </div>
              <p className="text-slate-300 whitespace-pre-wrap text-base leading-relaxed">
                {step.content}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function StepCardFullscreen({ step, index, colors, completed, onToggle }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`relative bg-gradient-to-b ${colors} border-2 border-orange-300 shadow-orange-300 rounded-2xl p-8 shadow-lg`}
    >
      <button
        onClick={onToggle}
        className="absolute top-4 right-4 w-8 h-8 rounded-full border border-green-300 bg-slate-800/50 hover:bg-slate-700 flex items-center justify-center transition"
      >
        {completed && <Check className="w-8 h-8 text-green-400" />}
      </button>

      <div className="flex items-center gap-3 mb-4">
        <span className="font-semibold text-xl bg-indigo-500/90  rounded-full w-10 h-10 flex items-center justify-center text-white">
          {index + 1}
        </span>
        <h3 className="text-xl font-bold text-slate-100">{step.title}</h3>
      </div>

      <p className="text-slate-100 text-lg leading-relaxed whitespace-pre-wrap">
        {step.content || "No details"}
      </p>
    </motion.div>
  );
}

function parseRoadmap(text: string) {
  const overview =
    text.match(/ROADMAP OVERVIEW:(.*?)(?=(PHASE|Step|FINAL))/is)?.[1]?.trim() ||
    "";
  const stepMatches = [
    ...text.matchAll(/Step\s*\d+:(.*?)(?=\n\s*Step\s*\d+:|FINAL ADVICE|$)/gis),
  ];
  const steps = stepMatches.map((m, i) => {
    const raw = m[1].trim();
    const [titleLine, ...rest] = raw.split("\n");
    return {
      title: titleLine.replace(/^[→\-–\s]+|[*_]/g, "").trim(),
      content: rest.join("\n").trim(),
    };
  });
  const finalAdvice =
    text.match(/FINAL ADVICE:(.*)$/is)?.[1]?.trim() || "Good luck!";
  return { overview, steps, finalAdvice };
}
