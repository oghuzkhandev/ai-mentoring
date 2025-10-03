"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Edit3,
  Route,
  Settings,
  LogOut,
  PanelLeftOpen,
  Crown,
  HelpCircle,
  PanelRightOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserButton, useUser, useClerk } from "@clerk/nextjs";

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();
  const { signOut } = useClerk();

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      badge: null,
    },
    {
      title: "AI Chat",
      icon: MessageSquare,
      href: "/ai-chat",
      badge: "New",
    },
    {
      title: "CV Evaluation",
      icon: FileText,
      href: "/dashboard/cv",
      badge: null,
    },
    {
      title: "Cover Letter",
      icon: Edit3,
      href: "/dashboard/cover-letter",
      badge: null,
    },
    { title: "Roadmap", icon: Route, href: "/dashboard/roadmap", badge: "Pro" },
  ];

  const bottomItems = [
    { title: "Help & Support", icon: HelpCircle, href: "/dashboard/help" },
    { title: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-white/10 flex flex-col"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />

      <motion.div
        className="absolute top-20 left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Header */}
      <div className="relative p-6 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50"
          >
            <Image src="/Mentorly.png" alt="#" width={40} height={40} />
          </motion.div>

          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              >
                Mentorly
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        {/* Collapse Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-8 w-6 h-6 bg-slate-700 hover:bg-slate-600 border border-white/10 rounded-full flex items-center justify-center transition-colors"
        >
          {collapsed ? (
            <PanelLeftOpen className="w-4 h-4 text-slate-300" />
          ) : (
            <PanelRightOpen className="w-4 h-4 text-slate-300" />
          )}
        </motion.button>
      </div>

      {/* User Profile */}
      <div className="relative p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <UserButton />
          <AnimatePresence mode="wait">
            {!collapsed && user && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col"
              >
                <p className="text-sm font-semibold text-white truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-slate-400 truncate">
                  {user.primaryEmailAddress?.emailAddress}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Menu (scrollbar kaldırıldı) */}
      <nav className="relative flex-1 p-4 space-y-1 overflow-y-hidden">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/30"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <div className="relative z-10">
                    <Icon
                      className={`w-5 h-5 ${
                        isActive
                          ? "text-blue-400"
                          : "text-slate-400 group-hover:text-white"
                      }`}
                    />
                  </div>
                  <AnimatePresence mode="wait">
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="relative z-10 flex-1 font-medium text-sm"
                      >
                        {item.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    {!collapsed && item.badge && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className={`relative z-10 px-2 py-0.5 text-xs font-semibold rounded-full ${
                          item.badge === "Pro"
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Upgrade Card */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="relative m-4 p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/20 rounded-full blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-bold text-white">
                Upgrade to Pro
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Unlock all features and get unlimited access
            </p>
            <Link href="/billing">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-sm py-2 rounded-lg">
                Upgrade Now
              </Button>
            </Link>
          </div>
        </motion.div>
      )}

      {/* Bottom Menu */}
      <div className="relative p-4 border-t border-white/10 space-y-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-5 h-5" />
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="text-sm font-medium"
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}

        {/* Logout */}
        <motion.button
          whileHover={{ x: 4 }}
          onClick={() => signOut()}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all w-full"
        >
          <LogOut className="w-5 h-5" />
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-sm font-medium"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.aside>
  );
}
