'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import CommandMenu from '@/components/command/CommandMenu';
import NotificationCenter from '@/components/notification/NotificationCenter';
import { Bell, Search, Compass, Activity, ShieldAlert, Cpu } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { motion } from 'framer-motion';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const { setIsCommandOpen, notifications } = useApp();
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#050505] text-fg-primary">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Workspace Frame */}
      <div className="flex flex-col flex-1 h-full min-w-0 overflow-hidden relative">
        {/* Top Header Bar */}
        <header className="flex items-center justify-between h-16 px-6 bg-[#050507] border-b border-card-border z-20">
          {/* Breadcrumb or title */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500 font-mono font-medium tracking-wider">AION OS</span>
            <span className="text-zinc-700">/</span>
            <span className="text-sm font-semibold text-zinc-200">Mission Workspace</span>
          </div>

          {/* Right Header actions */}
          <div className="flex items-center gap-4">
            {/* Quick search button */}
            <button
              onClick={() => setIsCommandOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 border border-card-border rounded-lg transition-all"
            >
              <Search size={14} />
              <span>⌘K Search</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => setIsNotifOpen(true)}
              className="relative p-2 rounded-lg bg-zinc-950 border border-card-border text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all cursor-pointer"
            >
              <Bell size={16} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white font-mono text-[9px] flex items-center justify-center font-semibold shadow-md shadow-rose-950">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Avatar mock */}
            <div className="flex items-center gap-2 pl-2 border-l border-card-border">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-blue to-accent-purple p-[1px]">
                <div className="w-full h-full rounded-full bg-[#050507] flex items-center justify-center text-[11px] font-bold text-white uppercase">
                  JD
                </div>
              </div>
              <span className="text-xs font-medium text-zinc-400 hidden md:inline">John Doe</span>
            </div>
          </div>
        </header>

        {/* Workspace Content Router */}
        <main className="flex-1 w-full overflow-hidden flex flex-col relative bg-grid-overlay">
          {/* Subtle grid layer */}
          <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
          
          {/* Neon glow effect */}
          <div className="absolute top-10 left-1/4 w-[500px] h-[300px] bg-accent-blue/10 rounded-full neon-blur" />
          <div className="absolute bottom-20 right-1/4 w-[400px] h-[250px] bg-accent-purple/10 rounded-full neon-blur" />

          {/* Children View */}
          <div className="relative flex flex-col flex-1 h-full min-w-0 z-10">
            {children}
          </div>
        </main>
      </div>

      {/* Global Modals */}
      <CommandMenu />
      <NotificationCenter isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </div>
  );
}
