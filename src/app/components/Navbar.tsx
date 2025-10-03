"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MessageSquare,
  FileText,
  Edit3,
  Route,
  Sparkles,
  ArrowRight,
  Menu,
  Star,
  TrendingUp,
  GraduationCap,
  Briefcase,
} from "lucide-react";

export default function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const navbarBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0.7)", "rgba(255, 255, 255, 0.95)"]
  );

  const navbarShadow = useTransform(
    scrollY,
    [0, 100],
    ["0px 1px 3px rgba(0, 0, 0, 0.05)", "0px 4px 12px rgba(0, 0, 0, 0.1)"]
  );

  const features = [
    {
      id: "qa",
      icon: MessageSquare,
      title: "AI Q&A Chatbot",
      description: "Ask any question and get instant, AI-powered answers.",
      color: "from-blue-500 to-cyan-500",
      lightColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: "cv",
      icon: FileText,
      title: "CV Evaluation",
      description: "Upload your CV and receive actionable feedback.",
      color: "from-purple-500 to-pink-500",
      lightColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      id: "cover",
      icon: Edit3,
      title: "Cover Letter Writer",
      description: "Generate tailored cover letters in seconds.",
      color: "from-orange-500 to-red-500",
      lightColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      id: "roadmap",
      icon: Route,
      title: "Roadmap Builder",
      description: "Create personalized learning and career roadmaps.",
      color: "from-green-500 to-emerald-500",
      lightColor: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  return (
    <motion.header
      style={{
        backgroundColor: navbarBackground,
        boxShadow: navbarShadow,
      }}
      className="sticky top-0 z-50 w-full border-b border-slate-200/60 backdrop-blur-xl"
    >
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative"
            >
              <Image
                src="/Mentorly.png"
                alt="Mentorly logo"
                width={48}
                height={48}
                className="object-contain"
              />
              <motion.div
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 blur-xl group-hover:opacity-30 transition-opacity"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <div className="relative">
              <motion.span
                className="font-bold text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                Mentorly
              </motion.span>
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-semibold text-slate-700 hover:text-slate-900 data-[state=open]:text-slate-900 bg-transparent hover:bg-slate-100 transition-all px-4 py-2 rounded-lg group">
                    <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                    Features
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="!w-[700px]">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 bg-gradient-to-br from-white to-slate-50"
                    >
                      <div className="mb-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">
                          Powerful AI Tools
                        </h3>
                        <p className="text-sm text-slate-600">
                          Everything you need to accelerate your career
                        </p>
                      </div>

                      <ul className="grid gap-3 md:grid-cols-2">
                        {features.map((feature, index) => {
                          const Icon = feature.icon;
                          const isHovered = hoveredItem === feature.id;

                          return (
                            <motion.li
                              key={feature.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{
                                y: -6,
                                scale: 1.03,
                              }}
                              whileTap={{ scale: 0.97 }}
                              onMouseEnter={() => setHoveredItem(feature.id)}
                              onMouseLeave={() => setHoveredItem(null)}
                              className="relative"
                            >
                              <NavigationMenuLink asChild>
                                <Link
                                  href={`#${feature.id}`}
                                  className="block group relative overflow-hidden rounded-2xl border-2 border-slate-200 p-5 hover:border-slate-300 transition-all duration-300 bg-white hover:shadow-2xl"
                                >
                                  <motion.div
                                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                                  />
                                  <motion.div
                                    className="absolute inset-0 -translate-x-full"
                                    animate={
                                      isHovered ? { translateX: "100%" } : {}
                                    }
                                    transition={{ duration: 0.6 }}
                                    style={{
                                      background:
                                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                                    }}
                                  />

                                  <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-3">
                                      <motion.div
                                        className={`p-3 rounded-xl ${feature.lightColor} group-hover:scale-110 transition-transform duration-300`}
                                        whileHover={{
                                          rotate: [0, -10, 10, -10, 0],
                                        }}
                                        transition={{ duration: 0.6 }}
                                      >
                                        <Icon
                                          className={`w-6 h-6 ${feature.iconColor}`}
                                        />
                                      </motion.div>

                                      <motion.div
                                        initial={{ x: -5, opacity: 0 }}
                                        animate={{
                                          x: isHovered ? 0 : -5,
                                          opacity: isHovered ? 1 : 0,
                                        }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <ArrowRight className="w-5 h-5 text-slate-400" />
                                      </motion.div>
                                    </div>
                                    <h3 className="font-bold text-base text-slate-900 mb-2">
                                      {feature.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                      {feature.description}
                                    </p>
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            </motion.li>
                          );
                        })}
                      </ul>

                      {/* Footer CTA (Discover) */}
                      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              Ready to Discover Features?
                            </p>
                            <p className="text-xs text-slate-600">
                              Try all features for free
                            </p>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative"
                          >
                            <Button
                              asChild
                              size="sm"
                              className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
                            >
                              <Link href="#features" className="relative z-10">
                                Let’s Discover Features
                              </Link>
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-semibold text-slate-700 hover:text-slate-900 data-[state=open]:text-slate-900 bg-transparent hover:bg-slate-100 transition-all px-4 py-2 rounded-lg group">
                    <TrendingUp className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                    Benefits
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="!w-[700px]">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 bg-gradient-to-br from-white to-slate-50"
                    >
                      <div className="mb-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">
                          Who Benefits from Mentorly?
                        </h3>
                        <p className="text-sm text-slate-600">
                          Different journeys, one platform. See how Mentorly
                          helps everyone.
                        </p>
                      </div>

                      {/* Küçük Benefit Kartları */}
                      <ul className="grid gap-3 md:grid-cols-2">
                        <motion.li
                          whileHover={{ y: -6, scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="relative"
                        >
                          <NavigationMenuLink asChild>
                            <Link
                              href="#benefits"
                              className="block group relative overflow-hidden rounded-2xl border-2 border-slate-200 p-5 hover:border-slate-300 transition-all duration-300 bg-white hover:shadow-2xl"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className="p-3 rounded-xl bg-blue-50">
                                  <GraduationCap className="w-6 h-6 text-blue-600" />
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                              <h3 className="font-bold text-base text-slate-900 mb-2">
                                Students & Graduates
                              </h3>
                              <p className="text-sm text-slate-600 leading-relaxed">
                                Start strong with CVs, interviews, and career
                                paths.
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </motion.li>

                        <motion.li
                          whileHover={{ y: -6, scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="relative"
                        >
                          <NavigationMenuLink asChild>
                            <Link
                              href="#benefits"
                              className="block group relative overflow-hidden rounded-2xl border-2 border-slate-200 p-5 hover:border-slate-300 transition-all duration-300 bg-white hover:shadow-2xl"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className="p-3 rounded-xl bg-purple-50">
                                  <Briefcase className="w-6 h-6 text-purple-600" />
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                              <h3 className="font-bold text-base text-slate-900 mb-2">
                                Job Seekers
                              </h3>
                              <p className="text-sm text-slate-600 leading-relaxed">
                                Land jobs faster with ATS-friendly CVs & cover
                                letters.
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </motion.li>
                      </ul>

                      {/* CTA */}
                      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              Ready to Discover Benefits?
                            </p>
                            <p className="text-xs text-slate-600">
                              Explore how Mentorly helps your journey
                            </p>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative"
                          >
                            <Button
                              asChild
                              size="sm"
                              className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
                            >
                              <Link href="#benefits" className="relative z-10">
                                Let’s Discover Benefits
                              </Link>
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="#pricing"
                      className="relative px-4 py-2 text-sm font-semibold text-slate-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-500 transition-all group"
                    >
                      Pricing
                      <motion.span
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="#about"
                      className="relative px-4 py-2 text-sm font-semibold text-slate-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-500 transition-all group"
                    >
                      About
                      <motion.span
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Navbar CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/30"
              >
                <Link href="/sign-in" className="flex items-center gap-2">
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                      backgroundSize: "200% 100%",
                    }}
                  />
                  <Star className="w-4 h-4 relative z-10 text-yellow-500" />
                  <span className="relative z-10">Get Started</span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
