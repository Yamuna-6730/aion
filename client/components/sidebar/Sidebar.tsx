'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/store/AppContext';
import logo from '@/app/logo.png';
import {
  Activity,
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  Compass,
  Cpu,
  Play,
  Search,
  Settings as SettingsIcon,
  ShoppingBag,
  Sun,
  Moon,
  Users,
  Workflow
} from 'lucide-react';

const navigationGroups = [
  {
    label: 'Discovery',
    items: [
      { name: 'Mission Control', path: '/workspace', icon: Compass },
      { name: 'Planner', path: '/planner', icon: Cpu },
      { name: 'Companies', path: '/companies', icon: Users },
      { name: 'Signals', path: '/workspace/signals', icon: Activity }
    ]
  },
  {
    label: 'Studio',
    items: [
      { name: 'Workflow Studio', path: '/workflows', icon: Workflow },
      { name: 'Simulation Studio', path: '/simulations', icon: Play },
      { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag }
    ]
  },
  {
    label: 'System',
    items: [
      { name: 'Analytics', path: '/workspace/library', icon: BarChart3 },
      { name: 'Settings', path: '/settings', icon: SettingsIcon }
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme, setIsCommandOpen, notifications } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 68 : 238 }}
      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col h-screen border-r border-card-border bg-[#050507] text-fg-primary select-none z-30"
      aria-label="Workspace navigation"
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-card-border">
        <Link
          href="/"
          aria-label="AION landing page"
          className="group flex items-center min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/70 rounded-lg"
        >
          <Image
            src={logo}
            alt="AION"
            className="h-9 w-auto object-contain transition duration-300 group-hover:drop-shadow-[0_0_14px_rgba(139,92,246,0.7)]"
            priority
          />
        </Link>

        {!isCollapsed && (
          <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-accent-blue/15 text-accent-blue border border-accent-blue/20">
            OS 1
          </span>
        )}
      </div>

      <div className="px-3 py-3 border-b border-card-border flex flex-col gap-2">
        <button
          onClick={() => setIsCommandOpen(true)}
          className="flex items-center gap-2 w-full px-3 py-2 text-xs text-zinc-500 hover:text-zinc-200 bg-zinc-950/50 hover:bg-zinc-900/60 rounded-lg border border-card-border transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/70"
          aria-label="Open global search"
        >
          <Search size={14} />
          {!isCollapsed && <span className="flex-1 truncate">Search companies, missions, agents...</span>}
          {!isCollapsed && <kbd className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">⌘K</kbd>}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {navigationGroups.map((group) => (
          <div key={group.label} className="space-y-1.5">
            {!isCollapsed && (
              <div className="px-3 text-[10px] font-mono uppercase tracking-widest text-zinc-600">
                {group.label}
              </div>
            )}
            {group.items.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;

              return (
                <Link key={item.name} href={item.path} aria-label={item.name}>
                  <div
                    className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer focus-within:outline-none ${
                      isActive
                        ? 'text-white bg-white/[0.05] border border-accent-blue/25 font-medium shadow-[0_0_18px_rgba(59,130,246,0.08)]'
                        : 'text-zinc-400 border border-transparent hover:text-zinc-100 hover:bg-white/[0.03] hover:border-white/[0.04]'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-accent-blue' : 'text-zinc-400'} />
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          className="whitespace-nowrap truncate"
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
        ))}
      </div>

      <div className="p-3 border-t border-card-border space-y-2">
        {!isCollapsed && unreadCount > 0 && (
          <div className="flex items-center gap-2 rounded-lg border border-accent-purple/20 bg-accent-purple/10 px-3 py-2 text-xs text-zinc-300">
            <Bell size={14} className="text-accent-purple" />
            <span>{unreadCount} unread updates</span>
          </div>
        )}
        <div className="flex items-center justify-between gap-1">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-2 rounded-lg bg-zinc-950/65 hover:bg-zinc-900 border border-card-border text-zinc-400 hover:text-white transition-colors flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/70"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {!isCollapsed && <span className="text-xs ml-2">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center justify-center p-2 rounded-lg bg-zinc-950/65 hover:bg-zinc-900 border border-card-border text-zinc-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/70"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
