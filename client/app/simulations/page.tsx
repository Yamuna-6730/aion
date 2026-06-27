'use client';

import React from 'react';
import { Layers, Play, CheckCircle2, TrendingUp, HelpCircle } from 'lucide-react';
import WorkspaceLayout from '@/app/workspace/layout';

export default function SimulationStudioPage() {
  const simulations = [
    { target: "Siemens AG", path: "Contact CIO directly", prob: 72, arr: "€450,000", time: "3 Months", status: "Active" },
    { target: "BMW Group", path: "Partner with Neue Klasse Supply Chain Division", prob: 65, arr: "€750,000", time: "4 Months", status: "Active" },
    { target: "OpenAI", path: "Integrate AION inside ChatGPT Enterprise Store", prob: 80, arr: "$2,200,000", time: "3 Months", status: "Pending approval" }
  ];

  return (
    <WorkspaceLayout>
      <div className="flex-1 p-8 space-y-6 overflow-y-auto max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-card-border pb-5">
          <div>
            <h2 className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-1.5">
              <Layers size={12} className="text-accent-blue" />
              AION Simulation Studio
            </h2>
            <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
              Outreach & Partner Pathway Simulations
            </h1>
            <p className="text-zinc-500 text-xs mt-1">
              Forecast pilot pathways, compute friction rates, and simulate B2B outreach pathways.
            </p>
          </div>
        </div>

        {/* Simulation Grid */}
        <div className="space-y-4">
          {simulations.map((sim, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-card-border bg-[#070709] hover:bg-[#09090c] transition-all flex flex-col md:flex-row gap-5 items-start md:items-center justify-between"
            >
              <div className="space-y-1.5">
                <span className="text-[10px] bg-accent-purple/10 text-accent-purple border border-accent-purple/20 px-2 py-0.5 rounded font-mono font-medium">
                  Target: {sim.target}
                </span>
                <h3 className="text-xs font-bold text-zinc-200">{sim.path}</h3>
                <div className="text-[10px] text-zinc-500 font-mono">Status: {sim.status}</div>
              </div>

              <div className="flex gap-6 text-xs text-right border-t md:border-t-0 border-card-border/50 pt-3 md:pt-0 w-full md:w-auto justify-end">
                <div>
                  <span className="text-[9px] text-zinc-500 font-mono block">Probability</span>
                  <span className="font-bold text-emerald-400 font-mono text-sm">{sim.prob}%</span>
                </div>
                <div>
                  <span className="text-[9px] text-zinc-500 font-mono block">Projected Revenue</span>
                  <span className="font-bold text-zinc-200 font-mono text-sm">{sim.arr}</span>
                </div>
                <div>
                  <span className="text-[9px] text-zinc-500 font-mono block">Timeframe</span>
                  <span className="font-bold text-accent-purple font-mono text-sm">{sim.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
}
