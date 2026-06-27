'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/store/AppContext';
import { Company } from '@/constants/mockData';
import {
  Activity,
  ArrowRight,
  TrendingUp,
  Briefcase,
  Globe,
  Award,
  Users,
  Search,
  Zap,
  DollarSign,
  Building,
  Key
} from 'lucide-react';

export default function SignalsDashboardPage() {
  const { companies } = useApp();
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract all signals
  const allSignals = companies.flatMap(c =>
    c.recentSignals.map(s => ({
      ...s,
      companyId: c.id,
      companyName: c.name,
      companyIndustry: c.industry,
      companyLogo: c.logo
    }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Filter signals
  const filteredSignals = allSignals.filter(sig => {
    const matchesType = filterType === 'all' || sig.type === filterType;
    const matchesSearch =
      sig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sig.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sig.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getSignalIcon = (type: string) => {
    switch (type) {
      case 'funding':
        return <DollarSign size={16} className="text-emerald-400" />;
      case 'hiring':
        return <Briefcase size={16} className="text-accent-blue" />;
      case 'leadership':
        return <Users size={16} className="text-accent-purple" />;
      case 'expansion':
        return <Globe size={16} className="text-violet-400" />;
      case 'technology':
        return <Key size={16} className="text-amber-400" />;
      case 'acquisition':
        return <Zap size={16} className="text-rose-400" />;
      case 'partnership':
        return <Award size={16} className="text-cyan-400" />;
      case 'office':
        return <Building size={16} className="text-indigo-400" />;
      default:
        return <Activity size={16} className="text-zinc-400" />;
    }
  };

  const getSignalBadgeColor = (type: string) => {
    switch (type) {
      case 'funding':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'hiring':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
      case 'leadership':
        return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
      case 'expansion':
        return 'bg-violet-500/10 text-violet-400 border border-violet-500/20';
      case 'technology':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'acquisition':
        return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
      case 'partnership':
        return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20';
      case 'office':
        return 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
      default:
        return 'bg-zinc-800 text-zinc-400 border border-zinc-700';
    }
  };

  return (
    <div className="flex-1 p-8 space-y-6 overflow-y-auto max-w-6xl mx-auto w-full">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-card-border pb-5">
        <div>
          <h2 className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-1">
            <Activity size={12} className="text-accent-blue" />
            B2B Discovery Signals Intelligence
          </h2>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
            Real-time Buying Triggers & Events
          </h1>
          <p className="text-zinc-500 text-xs mt-1">
            These active triggers explain exactly WHY companies match your criteria.
          </p>
        </div>

        {/* Filter Input */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-2.5 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search signals, triggers or companies..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-zinc-950 border border-card-border text-white placeholder-zinc-500 outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
          />
        </div>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex flex-wrap gap-2 text-xs">
        {[
          { key: 'all', label: 'All Triggers' },
          { key: 'funding', label: 'Funding Updates' },
          { key: 'hiring', label: 'Hiring Spikes' },
          { key: 'expansion', label: 'Geographic Expansion' },
          { key: 'technology', label: 'Tech Stack Changes' },
          { key: 'leadership', label: 'Leadership Swaps' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterType(tab.key)}
            className={`px-3.5 py-1.5 rounded-full border transition-all ${
              filterType === tab.key
                ? 'bg-accent-blue/15 border-accent-blue/40 text-white font-semibold'
                : 'bg-zinc-950 border-card-border text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Signals List */}
      <div className="space-y-4">
        {filteredSignals.length === 0 ? (
          <div className="py-16 text-center text-zinc-500 text-xs">
            No active signals found. Try adjusting filters or searches.
          </div>
        ) : (
          filteredSignals.map((sig, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-card-border bg-[#070709] hover:bg-[#0a0a0d] transition-all flex flex-col md:flex-row gap-5 items-start justify-between relative overflow-hidden group"
            >
              {/* Subtle top glow line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex gap-4 items-start flex-1">
                {/* Icon wrapper */}
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-card-border flex items-center justify-center text-zinc-400 mt-1 flex-shrink-0">
                  {getSignalIcon(sig.type)}
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded ${getSignalBadgeColor(sig.type)}`}>
                      {sig.type}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">{sig.date}</span>
                    <span className="text-[10px] text-emerald-500 font-mono bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                      {sig.confidence}% Confidence
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-zinc-100 group-hover:text-white transition-colors">
                    {sig.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">
                    {sig.description}
                  </p>
                </div>
              </div>

              {/* Target Company card shortcut */}
              <div className="w-full md:w-auto flex md:flex-col justify-between md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-card-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-zinc-900 border border-card-border flex items-center justify-center text-[10px] font-bold text-accent-blue">
                    {sig.companyLogo}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-300">{sig.companyName}</div>
                    <div className="text-[10px] text-zinc-500">{sig.companyIndustry}</div>
                  </div>
                </div>
                <Link href={`/companies/${sig.companyId}`}>
                  <button className="flex items-center gap-1.5 text-xs text-accent-blue hover:text-white font-semibold transition-colors">
                    <span>Analyze Intelligence</span>
                    <ArrowRight size={12} />
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
