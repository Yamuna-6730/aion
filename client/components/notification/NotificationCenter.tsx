'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/store/AppContext';
import { Bell, X, ShieldAlert, Cpu, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const { notifications, addNotification } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-amber-500" />;
      case 'error':
        return <ShieldAlert size={16} className="text-rose-500" />;
      case 'info':
      default:
        return <Cpu size={16} className="text-accent-blue" />;
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-emerald-500/20 bg-emerald-500/5';
      case 'warning':
        return 'border-amber-500/20 bg-amber-500/5';
      case 'error':
        return 'border-rose-500/20 bg-rose-500/5';
      case 'info':
      default:
        return 'border-accent-blue/20 bg-accent-blue/5';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Side Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-[#07070a]/95 glass-panel border-l border-card-border p-4 flex flex-col z-50 text-fg-primary"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-card-border mb-4">
              <div className="flex items-center gap-2">
                <Bell size={18} className="text-accent-blue" />
                <span className="font-semibold text-sm">System Logs & Alerts</span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-md text-zinc-500 hover:text-white hover:bg-white/5"
              >
                <X size={16} />
              </button>
            </div>

            {/* Notification List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {notifications.length === 0 ? (
                <div className="py-12 text-center text-zinc-500 text-xs">
                  No notifications recorded yet.
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 rounded-lg border flex gap-3 text-xs ${getColors(notif.type)}`}
                  >
                    <div className="mt-0.5">{getIcon(notif.type)}</div>
                    <div className="flex-1 space-y-1">
                      <p className="text-zinc-200 leading-normal font-sans">{notif.message}</p>
                      <div className="flex items-center justify-between text-[9px] text-zinc-500 font-mono">
                        <span>{notif.type.toUpperCase()}</span>
                        <span>{notif.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Debug Mock Generator */}
            <div className="pt-3 border-t border-card-border space-y-2">
              <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mb-1">
                Inject Demo Simulator Alerts
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <button
                  onClick={() => addNotification("Mission Complete: Siemens AG discovery validated.", "success")}
                  className="px-2 py-1 bg-zinc-950 border border-card-border hover:bg-zinc-900 rounded text-left text-zinc-300"
                >
                  + Mission Complete
                </button>
                <button
                  onClick={() => addNotification("Confidence Increased: Anthropic ICP score updated to 98%.", "success")}
                  className="px-2 py-1 bg-zinc-950 border border-card-border hover:bg-zinc-900 rounded text-left text-zinc-300"
                >
                  + Confidence Boost
                </button>
                <button
                  onClick={() => addNotification("Validation Agent failed to read German tax ID.", "error")}
                  className="px-2 py-1 bg-zinc-950 border border-card-border hover:bg-zinc-900 rounded text-left text-zinc-300"
                >
                  + Agent Failure
                </button>
                <button
                  onClick={() => addNotification("Planner recovered: rerouted query to Alternate Search API.", "warning")}
                  className="px-2 py-1 bg-zinc-950 border border-card-border hover:bg-zinc-900 rounded text-left text-zinc-300"
                >
                  + Recovery Action
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
