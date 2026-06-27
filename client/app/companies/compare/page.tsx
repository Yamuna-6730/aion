'use client';

import React from 'react';
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
  ArrowLeft,
  DollarSign,
  Activity,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import WorkspaceLayout from '@/app/workspace/layout';

export default function CompanyComparePage() {
  const { companies, compareList, toggleCompare, clearCompare } = useApp();
  const router = useRouter();

  // Get selected company objects
  const selectedCompanies = companies.filter(c => compareList.includes(c.id));

  const handleClearAll = () => {
    clearCompare();
    router.push('/companies');
  };

  if (selectedCompanies.length < 2) {
    return (
      <WorkspaceLayout>
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-zinc-900 border border-card-border flex items-center justify-center text-accent-blue mb-2">
            <Users size={28} />
          </div>
          <h1 className="text-xl font-bold text-white">Compare Matrix Needs Targets</h1>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Please select at least 2 target companies (maximum 3) from the directory cache to perform side-by-side intelligence analysis.
          </p>
          <Link href="/companies">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-semibold rounded-lg hover:shadow-md transition-all cursor-pointer">
              <ArrowLeft size={14} />
              <span>Back to Directory</span>
            </button>
          </Link>
        </div>
      </WorkspaceLayout>
    );
  }

  return (
    <WorkspaceLayout>
      <div className="flex-1 p-6 space-y-6 overflow-y-auto max-w-7xl mx-auto w-full">
        {/* Header navigation bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-card-border pb-5">
          <div className="flex items-center gap-3">
            <Link href="/companies">
              <button className="p-2 rounded-lg bg-zinc-950 border border-card-border hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                <ArrowLeft size={16} />
              </button>
            </Link>
            <div>
              <h2 className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
                AION Side-by-Side Analysis
              </h2>
              <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
                Company Compare Matrix
              </h1>
            </div>
          </div>

          <button
            onClick={handleClearAll}
            className="flex items-center gap-1.5 px-4 py-2 border border-card-border hover:bg-rose-950/20 hover:text-rose-400 rounded-lg text-xs text-zinc-400 transition-all cursor-pointer"
          >
            <Trash2 size={14} />
            <span>Clear Matrix</span>
          </button>
        </div>

        {/* Matrix Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedCompanies.map((c) => (
            <div
              key={c.id}
              className="p-6 rounded-xl border border-card-border bg-[#070709] relative flex flex-col justify-between space-y-6 overflow-hidden"
            >
              {/* Remove button */}
              <button
                onClick={() => toggleCompare(c.id)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-zinc-950 border border-card-border hover:bg-rose-950/30 text-zinc-500 hover:text-rose-400 transition-all cursor-pointer"
                title="Remove from compare"
              >
                ✕
              </button>

              {/* Column Brand header */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-zinc-950 border border-card-border flex items-center justify-center font-bold text-base text-accent-blue">
                    {c.logo}
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">{c.name}</h2>
                    <p className="text-[11px] text-zinc-500">{c.industry}</p>
                  </div>
                </div>

                {/* Telemetry Block */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-zinc-950 rounded border border-card-border/60">
                    <span className="text-[9px] text-zinc-500 font-mono block">ICP Match</span>
                    <span className="font-bold text-accent-blue">{c.icpMatch}%</span>
                  </div>
                  <div className="p-2 bg-zinc-950 rounded border border-card-border/60">
                    <span className="text-[9px] text-zinc-500 font-mono block">DNA Score</span>
                    <span className="font-bold text-accent-purple">{c.opportunityScore}</span>
                  </div>
                  <div className="p-2 bg-zinc-950 rounded border border-card-border/60">
                    <span className="text-[9px] text-zinc-500 font-mono block">Confidence</span>
                    <span className="font-bold text-emerald-500">{c.confidence}%</span>
                  </div>
                </div>
              </div>

              {/* Section 1: Business DNA Details */}
              <div className="space-y-2 border-t border-card-border/50 pt-4">
                <h3 className="text-[10px] font-mono uppercase font-bold text-zinc-500 tracking-wider">
                  Business DNA Metrics
                </h3>
                <div className="space-y-2 text-xs">
                  {[
                    { label: 'Innovation Quotient', val: c.businessDna.innovation },
                    { label: 'Growth Profile', val: c.businessDna.growth },
                    { label: 'Hiring Intensity', val: c.businessDna.hiring },
                    { label: 'Technology Core', val: c.businessDna.technology },
                    { label: 'AI Adoption Factor', val: c.businessDna.aiAdoption },
                    { label: 'Compliance Level', val: c.businessDna.compliance }
                  ].map((dna, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-zinc-400">{dna.label}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1 bg-zinc-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent-blue"
                            style={{ width: `${dna.val}%` }}
                          />
                        </div>
                        <span className="font-mono text-zinc-200 font-bold w-6 text-right">
                          {dna.val}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Key Tech badges */}
              <div className="space-y-2 border-t border-card-border/50 pt-4">
                <h3 className="text-[10px] font-mono uppercase font-bold text-zinc-500 tracking-wider">
                  Core Cloud & AI Tech
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {[...c.techStack.ai, ...c.techStack.cloud].slice(0, 6).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-zinc-950 border border-card-border text-zinc-400 text-[10px] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Section 3: Funding */}
              <div className="space-y-2 border-t border-card-border/50 pt-4 text-xs">
                <h3 className="text-[10px] font-mono uppercase font-bold text-zinc-500 tracking-wider">
                  Funding & Capital
                </h3>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Total Capital:</span>
                  <span className="font-bold text-zinc-200">{c.funding.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Recent Stage:</span>
                  <span className="font-bold text-zinc-200 truncate max-w-[120px]">{c.funding.recentRound}</span>
                </div>
              </div>

              {/* Section 4: Recent Signals */}
              <div className="space-y-2 border-t border-card-border/50 pt-4 text-xs">
                <h3 className="text-[10px] font-mono uppercase font-bold text-zinc-500 tracking-wider">
                  Active Market Signals
                </h3>
                <div className="space-y-2">
                  {c.recentSignals.slice(0, 2).map((sig, sIdx) => (
                    <div key={sIdx} className="flex gap-2 items-start bg-zinc-950/40 p-2 rounded border border-card-border/60">
                      <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-accent-blue" />
                      <div>
                        <div className="font-bold text-zinc-300 text-[11px]">{sig.title}</div>
                        <div className="text-[10px] text-zinc-500">{sig.description.slice(0, 70)}...</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 5: Recommendation Pitch */}
              <div className="space-y-2 border-t border-card-border/50 pt-4">
                <h3 className="text-[10px] font-mono uppercase font-bold text-zinc-500 tracking-wider">
                  Playbook Recommendation
                </h3>
                <div className="p-3 bg-accent-blue/5 rounded-lg border border-accent-blue/15 text-xs text-zinc-300 leading-relaxed font-sans">
                  {c.recommendation}
                </div>
              </div>

              {/* Action shortcuts */}
              <div className="pt-4 border-t border-card-border/50 flex gap-2">
                <Link href={`/companies/${c.id}`} className="flex-1">
                  <button className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 border border-card-border rounded-lg text-xs font-semibold text-zinc-300 hover:text-white transition-all cursor-pointer">
                    View Intelligence
                  </button>
                </Link>
                <Link href={`/companies/${c.id}?tab=brief`} className="flex-1">
                  <button className="w-full py-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-semibold rounded-lg hover:shadow-md transition-all cursor-pointer">
                    Brief
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
}
