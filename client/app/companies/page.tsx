'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/store/AppContext';
import { Company } from '@/constants/mockData';
import {
  Users,
  Compass,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  Search,
  Activity,
  FileText,
  Briefcase,
  DollarSign,
  Award,
  Plus,
  Check
} from 'lucide-react';
import WorkspaceLayout from '@/app/workspace/layout';

export default function CompaniesPage() {
  const { companies, compareList, toggleCompare, clearCompare } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.techStack.ai.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCompareSubmit = () => {
    if (compareList.length >= 2) {
      router.push('/companies/compare');
    }
  };

  return (
    <WorkspaceLayout>
      <div className="flex-1 p-6 space-y-6 overflow-y-auto max-w-7xl mx-auto w-full relative">
        
        {/* Page Title & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-card-border pb-5">
          <div>
            <h2 className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-1.5">
              <Users size={12} className="text-accent-blue" />
              B2B Target Directory
            </h2>
            <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
              Verified ICP Opportunities
            </h1>
            <p className="text-zinc-500 text-xs mt-1">
              Identified targets representing maximum discovery alignment. Check Compare boxes to view side-by-side matrices.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3 top-2.5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies, tech or industry..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-zinc-950 border border-card-border text-white placeholder-zinc-500 outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
            />
          </div>
        </div>

        {/* Company Cards Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-24">
          {filteredCompanies.length === 0 ? (
            <div className="col-span-2 py-16 text-center text-zinc-500 text-xs">
              No matching companies found in the discovery cache.
            </div>
          ) : (
            filteredCompanies.map((c) => {
              const isSelectedForCompare = compareList.includes(c.id);

              return (
                <div
                  key={c.id}
                  className="p-6 rounded-xl border border-card-border bg-[#070709] hover:bg-[#09090c] transition-all duration-300 relative group flex flex-col justify-between space-y-6 overflow-hidden"
                >
                  {/* Neon top-border hover glow */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-accent-blue via-accent-purple to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Header Row: logo, meta scores */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      {/* Logo avatar */}
                      <div className="w-12 h-12 rounded-lg bg-zinc-950 border border-card-border flex items-center justify-center font-sans font-bold text-lg text-accent-blue group-hover:text-accent-purple group-hover:scale-105 transition-all">
                        {c.logo}
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-white group-hover:text-accent-blue transition-colors">
                          {c.name}
                        </h2>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          {c.industry} • Founded {c.founded}
                        </p>
                      </div>
                    </div>

                    {/* Scores */}
                    <div className="flex gap-2">
                      <div className="text-right">
                        <span className="text-[10px] text-zinc-500 font-mono block">ICP Match</span>
                        <span className="text-xs font-mono font-bold text-accent-blue">{c.icpMatch}%</span>
                      </div>
                      <div className="w-[1px] h-6 bg-card-border self-center" />
                      <div className="text-right">
                        <span className="text-[10px] text-zinc-500 font-mono block">Score</span>
                        <span className="text-xs font-mono font-bold text-accent-purple">{c.opportunityScore}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body highlights: HQ, Employees, Revenue, Funding */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-zinc-950/45 p-3 rounded-lg border border-card-border/60 text-xs">
                    <div>
                      <span className="text-[9px] text-zinc-500 font-mono uppercase block">HQ Location</span>
                      <span className="text-zinc-300 font-medium truncate block">{c.headquarters}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 font-mono uppercase block">Employees</span>
                      <span className="text-zinc-300 font-medium block">{c.employees.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 font-mono uppercase block">Revenue</span>
                      <span className="text-zinc-300 font-medium block">{c.revenue}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 font-mono uppercase block">Funding</span>
                      <span className="text-zinc-300 font-medium block truncate">{c.funding.recentRound !== 'N/A' ? c.funding.recentRound : 'Public'}</span>
                    </div>
                  </div>

                  {/* Signals & Hiring Highlight */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-1.5 text-accent-blue/80 font-semibold">
                      <Activity size={12} />
                      <span>Hiring Trend & Signal Indicators</span>
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed italic">
                      "{c.hiringTrend}"
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {c.recentSignals.slice(0, 2).map((sig, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] bg-zinc-900 border border-card-border/80 px-2 py-0.5 rounded text-zinc-400"
                        >
                          {sig.title}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack highlights */}
                  <div className="space-y-1.5 text-xs">
                    <span className="text-[9px] text-zinc-500 uppercase font-mono font-semibold">Discovery Tech Stack Core</span>
                    <div className="flex flex-wrap gap-1.5">
                      {[...c.techStack.ai, ...c.techStack.cloud, ...c.techStack.devops].slice(0, 5).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-zinc-950 border border-card-border text-zinc-400 text-[10px]"
                        >
                          {tech}
                        </span>
                      ))}
                      {c.techStack.ai.length + c.techStack.cloud.length > 5 && (
                        <span className="text-[10px] text-zinc-600 self-center">
                          +{c.techStack.ai.length + c.techStack.cloud.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Recommendation play */}
                  <div className="p-3 bg-accent-blue/5 rounded-lg border border-accent-blue/15 text-xs">
                    <div className="font-mono text-accent-blue uppercase tracking-widest text-[9px] font-semibold mb-0.5">
                      Recommendation Agent play
                    </div>
                    <p className="text-zinc-300 font-sans leading-relaxed">
                      {c.recommendation}
                    </p>
                  </div>

                  {/* Footer Row: Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-card-border/50">
                    {/* Compare Checkbox */}
                    <button
                      onClick={() => toggleCompare(c.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                        isSelectedForCompare
                          ? 'bg-accent-purple/15 border-accent-purple/40 text-accent-purple font-semibold'
                          : 'bg-zinc-950 border-card-border text-zinc-400 hover:text-white hover:bg-zinc-900'
                      }`}
                    >
                      {isSelectedForCompare ? <Check size={12} /> : <Plus size={12} />}
                      <span>{isSelectedForCompare ? 'Selected' : 'Compare'}</span>
                    </button>

                    {/* Navigation Actions */}
                    <div className="flex gap-2">
                      <Link href={`/companies/${c.id}`}>
                        <button className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-card-border rounded-lg text-xs font-semibold text-zinc-300 hover:text-white transition-all cursor-pointer">
                          View Intelligence
                        </button>
                      </Link>
                      <button
                        onClick={() => router.push(`/companies/${c.id}?tab=brief`)}
                        className="flex items-center gap-1 px-3.5 py-1.5 bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-semibold rounded-lg hover:shadow-md transition-all cursor-pointer"
                      >
                        <FileText size={12} />
                        <span>Brief</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Floating Bottom Compare Notification Bar */}
        <AnimatePresence>
          {compareList.length > 0 && (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-lg px-4"
            >
              <div className="p-4 rounded-xl border border-accent-purple/40 bg-zinc-950/95 shadow-2xl backdrop-blur-md flex items-center justify-between gap-4">
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-accent-purple uppercase font-mono font-bold tracking-widest">
                    Company Compare Matrix
                  </span>
                  <p className="text-xs text-zinc-300 mt-0.5">
                    {compareList.length} of 3 target profiles selected for analysis.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={clearCompare}
                    className="px-3 py-1.5 border border-card-border hover:bg-zinc-900 rounded-lg text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleCompareSubmit}
                    disabled={compareList.length < 2}
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer"
                  >
                    <span>Compare Now</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </WorkspaceLayout>
  );
}
