"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageSquare,
  FileText,
  Edit3,
  Route,
  Mail,
  Twitter,
  Linkedin,
  Github,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  product: ["Features", "Pricing", "Roadmap", "Changelog"],
  resources: ["Documentation", "Blog", "Tutorials", "Help Center"],
  company: ["About Us", "Careers", "Contact", "Partners"],
  legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
};

const features = [
  { icon: MessageSquare, name: "AI Q&A", href: "#qa" },
  { icon: FileText, name: "CV Analyzer", href: "#cv" },
  { icon: Edit3, name: "Cover Letter", href: "#cover" },
  { icon: Route, name: "Roadmap", href: "#roadmap" },
];

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/oguzhandogandev/",
    label: "LinkedIn",
  },
  { icon: Github, href: "https://github.com/oghuzkhandev", label: "GitHub" },
  { icon: Mail, href: "mailto:oguzhandogandev@hotmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ y: [0, -30, 0], opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container relative z-10 mx-auto px-6">
        <section className="border-b border-white/10 py-16 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-400">
              Stay Updated
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Newsletter
          </h3>
          <p className="text-lg text-slate-400 mb-6">
            Get the latest updates, career tips, and exclusive features
            delivered to your inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 focus:border-blue-500 text-white placeholder:text-slate-500 rounded-xl py-4 pr-4 pl-12 outline-none"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-blue-500/30">
              Subscribe
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <p className="text-sm text-slate-500 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </section>

        <section className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Mentorly</span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Your AI-powered career companion. Transform your professional
              journey with intelligent mentoring.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {features.map(({ icon: Icon, name, href }) => (
                <a
                  key={name}
                  href={href}
                  className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-slate-400 hover:text-white"
                >
                  <Icon className="w-4 h-4 text-blue-400" />
                  {name}
                </a>
              ))}
            </div>

            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-white">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((name) => (
                  <li key={name}>
                    <Link
                      href={`/${name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-slate-400 hover:text-white flex items-center gap-2"
                    >
                      {name}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center text-slate-400 text-md">
          <span>
            © 2025 Mentorly. Built by{" "}
            <span className="font-bold text-green-500 tracking-widest text-lg ml-1">
              Oguzhan Dogan
            </span>
          </span>
          <div className="flex gap-6">
            <Link
              href="/status"
              className="hover:text-white flex items-center gap-2"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />{" "}
              All Systems Operational
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
