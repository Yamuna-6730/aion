'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/store/AppContext';
import { Mission } from '@/constants/mockData';
import { Compass, BookOpen, Clock, Users, Play, BarChart3, ArrowRight } from 'lucide-react';

export default function MissionLibraryPage() {
  const { missions, startMission, setActiveMission } = useApp();
  const router = useRouter();

  const templates = [
    {
      title: "Cybersecurity Expansion Germany",
      query: "Find cybersecurity companies expanding into Europe.",
      domain: "Cybersecurity",
      confidence: 95,
      companies: 12
    },
    {
      title: "German Manufacturing AI Refit",
      query: "Find Manufacturing companies in Germany expanding into AI.",
      domain: "Manufacturing",
      confidence: 92,
      companies: 48
    },
    {
      title: "FinTech Compliance Audits",
      query: "Find SaaS FinTech companies matching compliance triggers.",
      domain: "FinTech",
      confidence: 88,
      companies: 15
    },
    {
      title: "Cloud Migration Leads",
      query: "Find Retail companies undergoing AWS migration.",
      domain: "Retail/SaaS",
      confidence: 90,
      companies: 24
    }
  ];

  const handleLaunch = (query: string) => {
    startMission(query);
    router.push('/planner');
  };

  const handleOpenMission = (m: Mission) => {
    setActiveMission(m);
    if (m.status === 'Running' || m.status === 'Thinking') {
      router.push('/planner');
    } else {
      router.push('/companies');
    }
  };

  return (
    <div className="flex-1 p-8 space-y-8 overflow-y-auto max-w-6xl mx-auto w-full">
      {/* Title */}
      <div className="border-b border-card-border pb-5">
        <h2 className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-1">
          <BookOpen size={12} className="text-accent-blue" />
          AION Mission Library
        </h2>
        <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
          Templates & Historical Audits
        </h1>
        <p className="text-zinc-500 text-xs mt-1">
          Replay past missions, execute pre-loaded discovery blueprints, or review active telemetry histories.
        </p>
      </div>

      {/* Grid: Templates vs History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Templates */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
            <Compass size={16} className="text-accent-purple" />
            Standard Blueprints
          </h2>
          <div className="space-y-3">
            {templates.map((tpl, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-card-border bg-zinc-950/20 glass-card flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-accent-purple/10 text-accent-purple border border-accent-purple/20 px-2 py-0.5 rounded font-mono font-medium">
                      {tpl.domain}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {tpl.companies} target companies
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-zinc-200">{tpl.title}</h3>
                  <p className="text-xs text-zinc-400 font-mono italic">"{tpl.query}"</p>
                </div>
                <button
                  onClick={() => handleLaunch(tpl.query)}
                  className="flex items-center justify-center p-2 rounded-lg bg-zinc-900 border border-card-border text-accent-purple hover:text-white hover:bg-accent-purple/20 transition-all cursor-pointer"
                  title="Launch Template"
                >
                  <Play size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* History */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
            <Clock size={16} className="text-accent-blue" />
            Mission Audit Logs
          </h2>
          <div className="space-y-3">
            {missions.map((m) => (
              <div
                key={m.id}
                onClick={() => handleOpenMission(m)}
                className="p-4 rounded-xl border border-card-border bg-zinc-950/20 hover:bg-zinc-900/40 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      m.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {m.status}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      Time: {m.elapsedTime}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors">{m.name}</h3>
                  <p className="text-xs text-zinc-500 truncate max-w-sm">"{m.query}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs font-bold text-accent-blue">{m.confidence}%</div>
                    <div className="text-[9px] text-zinc-500 uppercase font-mono">Confidence</div>
                  </div>
                  <ArrowRight size={14} className="text-zinc-500 group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
