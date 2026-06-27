'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/store/AppContext';
import { Search, X, Users, Activity, Cpu, FileText, Compass } from 'lucide-react';

export default function CommandMenu() {
  const { isCommandOpen, setIsCommandOpen, companies, startMission } = useApp();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'companies' | 'agents' | 'signals'>('all');
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on Escape, open on CMD+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(!isCommandOpen);
      }
      if (e.key === 'Escape') {
        setIsCommandOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandOpen, setIsCommandOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isCommandOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
    }
  }, [isCommandOpen]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsCommandOpen(false);
      }
    };
    if (isCommandOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCommandOpen, setIsCommandOpen]);

  const agents = [
    { name: 'Market Discovery Agent', description: 'Scans DNS, company registries, and news wires.' },
    { name: 'Hiring Signal Agent', description: 'Parses active job postings and recruiter activity.' },
    { name: 'Funding & Capital Agent', description: 'Evaluates cap tables and corporate investment logs.' },
    { name: 'Validation Agent', description: 'Corroborates company size and revenue boundaries.' },
    { name: 'Decision Maker Finder', description: 'Retrieves LinkedIn links and profile details.' },
    { name: 'Executive Brief Builder', description: 'Formats discovery metrics into executive briefs.' },
  ];

  const allSignals = companies.flatMap(c => 
    c.recentSignals.map(s => ({ ...s, companyName: c.name, companyId: c.id }))
  );

  // Filter items
  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) || 
    c.industry.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAgents = agents.filter(a => 
    a.name.toLowerCase().includes(query.toLowerCase()) || 
    a.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredSignals = allSignals.filter(s => 
    s.title.toLowerCase().includes(query.toLowerCase()) || 
    s.description.toLowerCase().includes(query.toLowerCase()) ||
    s.companyName.toLowerCase().includes(query.toLowerCase())
  );

  const navigateTo = (path: string) => {
    setIsCommandOpen(false);
    router.push(path);
  };

  const handleCreateMission = () => {
    if (query.trim()) {
      startMission(query);
      setIsCommandOpen(false);
      router.push('/planner');
    }
  };

  return (
    <AnimatePresence>
      {isCommandOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            ref={modalRef}
            className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-card-border bg-[#0a0a0d] shadow-2xl glass-panel text-fg-primary"
          >
            {/* Search Input Area */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-card-border">
              <Search size={20} className="text-zinc-500" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search companies, agents, buying signals, or run a new mission..."
                className="flex-1 bg-transparent border-0 outline-0 text-sm text-zinc-100 placeholder-zinc-500 focus:ring-0"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-md text-zinc-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
              <kbd className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400 border border-zinc-700">ESC</kbd>
            </div>

            {/* Category Filter Chips */}
            <div className="flex gap-2 px-4 py-2 border-b border-card-border/50 text-xs">
              {(['all', 'companies', 'agents', 'signals'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full border transition-all capitalize ${
                    selectedCategory === cat
                      ? 'bg-accent-blue/15 border-accent-blue/40 text-white'
                      : 'bg-zinc-900 border-card-border text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Results Area */}
            <div className="max-h-[350px] overflow-y-auto p-2 space-y-4">
              {/* If query has text, offer generating a mission directly */}
              {query.trim().length > 3 && (
                <div className="px-2">
                  <div
                    onClick={handleCreateMission}
                    className="flex items-center justify-between p-3 rounded-lg bg-accent-blue/10 border border-accent-blue/20 hover:bg-accent-blue/25 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Cpu className="text-accent-blue animate-pulse" size={18} />
                      <div>
                        <div className="text-xs text-accent-blue font-bold uppercase tracking-wider">Execute AI Discovery Mission</div>
                        <div className="text-sm font-medium text-white">"{query}"</div>
                      </div>
                    </div>
                    <span className="text-xs text-accent-blue border border-accent-blue/30 px-2 py-0.5 rounded-full">Launch ➔</span>
                  </div>
                </div>
              )}

              {/* Companies Results */}
              {(selectedCategory === 'all' || selectedCategory === 'companies') && filteredCompanies.length > 0 && (
                <div>
                  <div className="px-2 text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-1 flex items-center gap-1">
                    <Users size={12} /> Companies
                  </div>
                  <div className="space-y-1">
                    {filteredCompanies.map(company => (
                      <div
                        key={company.id}
                        onClick={() => navigateTo(`/companies/${company.id}`)}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.04] transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded bg-zinc-900 border border-card-border text-xs font-bold text-accent-blue">
                            {company.logo}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-zinc-200">{company.name}</div>
                            <div className="text-xs text-zinc-500">{company.industry} • {company.headquarters}</div>
                          </div>
                        </div>
                        <span className="text-xs bg-zinc-900 border border-card-border px-2 py-0.5 rounded text-zinc-400">
                          {company.icpMatch}% ICP Match
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Agents Results */}
              {(selectedCategory === 'all' || selectedCategory === 'agents') && filteredAgents.length > 0 && (
                <div>
                  <div className="px-2 text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-1 flex items-center gap-1">
                    <Cpu size={12} /> Specialized Agents
                  </div>
                  <div className="space-y-1">
                    {filteredAgents.map(agent => (
                      <div
                        key={agent.name}
                        onClick={() => navigateTo('/planner')}
                        className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/[0.04] transition-all cursor-pointer"
                      >
                        <div className="p-1.5 rounded bg-zinc-900 border border-card-border text-accent-purple mt-0.5">
                          <Cpu size={16} />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-zinc-200">{agent.name}</div>
                          <div className="text-xs text-zinc-500">{agent.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Signals Results */}
              {(selectedCategory === 'all' || selectedCategory === 'signals') && filteredSignals.length > 0 && (
                <div>
                  <div className="px-2 text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-1 flex items-center gap-1">
                    <Activity size={12} /> buying signals
                  </div>
                  <div className="space-y-1">
                    {filteredSignals.map((sig, i) => (
                      <div
                        key={i}
                        onClick={() => navigateTo(`/companies/${sig.companyId}?tab=signals`)}
                        className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/[0.04] transition-all cursor-pointer"
                      >
                        <div className="p-1.5 rounded bg-zinc-900 border border-card-border text-amber-500 mt-0.5">
                          <Activity size={16} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-zinc-200">{sig.title}</span>
                            <span className="text-[10px] text-zinc-500 font-mono">{sig.companyName}</span>
                          </div>
                          <div className="text-xs text-zinc-500">{sig.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {filteredCompanies.length === 0 && filteredAgents.length === 0 && filteredSignals.length === 0 && (
                <div className="py-8 text-center text-zinc-500 text-xs flex flex-col items-center justify-center gap-2">
                  <FileText size={24} className="text-zinc-600" />
                  No results found for "{query}"
                  <button
                    onClick={handleCreateMission}
                    className="mt-2 text-xs bg-zinc-900 hover:bg-zinc-800 text-white border border-card-border px-3 py-1.5 rounded-lg"
                  >
                    Create a Mission for "{query}"
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-card-border text-[11px] text-zinc-500 font-mono bg-[#070709]">
              <div className="flex gap-4">
                <span>↑↓ to navigate</span>
                <span>⏎ to select</span>
              </div>
              <div>Press ESC to close</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
