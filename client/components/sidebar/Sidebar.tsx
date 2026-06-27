'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/store/AppContext';
import {
  Activity,
  Users,
  Compass,
  TrendingUp,
  Brain,
  Cpu,
  Share2,
  Play,
  Layers,
  ShoppingBag,
  BarChart3,
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Search,
  Bell
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme, setIsCommandOpen, notifications } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const menuItems = [
    { name: 'Mission Control', path: '/workspace', icon: Compass },
    { name: 'Planner', path: '/planner', icon: Cpu },
    { name: 'Companies', path: '/companies', icon: Users },
    { name: 'Knowledge Graph', path: '/workspace?tab=graph', icon: Share2 },
    { name: 'Signals', path: '/workspace/signals', icon: Activity },
    { name: 'Decision Makers', path: '/workspace?tab=decision-makers', icon: Brain },
    { name: 'Business DNA', path: '/workspace?tab=dna', icon: TrendingUp },
    { name: 'Digital Twins', path: '/workspace?tab=twins', icon: Layers },
    { name: 'Simulation Studio', path: '/simulations', icon: Play },
    { name: 'Workflow Studio', path: '/workflows', icon: Cpu },
    { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
    { name: 'Analytics', path: '/workspace?tab=analytics', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <motion.div
      animate={{ width: isCollapsed ? 70 : 260 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col h-screen border-r border-card-border bg-[#050507] text-fg-primary select-none z-30"
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-card-border">
        <Link href="/workspace" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-blue to-accent-purple shadow-md">
            <span className="font-mono font-bold text-white text-base">A</span>
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-sans font-bold text-lg tracking-wider text-white"
              >
                AION
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        {!isCollapsed && (
          <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-accent-blue/15 text-accent-blue border border-accent-blue/20">
            OS 1
          </span>
        )}
      </div>

      {/* Global Command Bar & Notif Shortcut */}
      <div className="px-3 py-3 border-b border-card-border flex flex-col gap-2">
        <button
          onClick={() => setIsCommandOpen(true)}
          className="flex items-center gap-2 w-full px-3 py-2 text-xs text-zinc-500 hover:text-zinc-200 bg-zinc-950/50 hover:bg-zinc-900/60 rounded-lg border border-card-border transition-colors text-left"
        >
          <Search size={14} />
          {!isCollapsed && <span className="flex-1">Search AION...</span>}
          {!isCollapsed && <kbd className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">⌘K</kbd>}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.path}>
              <div
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white bg-white/[0.04] border-l-2 border-accent-blue font-medium'
                    : 'text-zinc-400 hover:text-zinc-150 hover:bg-white/[0.02]'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-accent-blue' : 'text-zinc-400'} />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>

                {isActive && !isCollapsed && (
                  <motion.div
                    layoutId="activeGlow"
                    className="absolute right-2 w-1.5 h-1.5 rounded-full bg-accent-blue shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer controls (collapse, notify, light/dark) */}
      <div className="p-3 border-t border-card-border space-y-2">
        {/* Theme and notifications togglers */}
        <div className="flex items-center justify-between gap-1">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-2 rounded-lg bg-zinc-950/65 hover:bg-zinc-900 border border-card-border text-zinc-400 hover:text-white transition-colors flex-1"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {!isCollapsed && <span className="text-xs ml-2">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center justify-center p-2 rounded-lg bg-zinc-950/65 hover:bg-zinc-900 border border-card-border text-zinc-400 hover:text-white transition-colors"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
