'use client';

import React from 'react';
import { Cpu, Plus, Play, ToggleLeft, ToggleRight, Settings } from 'lucide-react';
import WorkspaceLayout from '@/app/workspace/layout';

export default function WorkflowStudioPage() {
  const workflows = [
    { name: "German Tech Stack Crawler", desc: "Automated cron scraping Siemens, BMW, and SAP systems for cloud and database changes.", status: true, agents: 3, latency: "250ms" },
    { name: "Executive Intelligence brief compiler", desc: "Formats daily discovered ICP prospects into briefing slides.", status: true, agents: 2, latency: "120ms" },
    { name: "GDPR Compliance Auditor", desc: "Filters targets failing European sovereign compliance metrics.", status: false, agents: 4, latency: "N/A" }
  ];

  return (
    <WorkspaceLayout>
      <div className="flex-1 p-8 space-y-6 overflow-y-auto max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-card-border pb-5">
          <div>
            <h2 className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-1.5">
              <Cpu size={12} className="text-accent-blue" />
              AION Workflow Studio
            </h2>
            <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
              Agent Pipelines & Autopilots
            </h1>
            <p className="text-zinc-500 text-xs mt-1">
              Construct multi-agent search sequences to scrape directories and qualify prospects.
            </p>
          </div>

          <button className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-bold rounded-lg hover:shadow-md transition-all cursor-pointer">
            <Plus size={14} />
            <span>Create Workflow</span>
          </button>
        </div>

        {/* Workflow List */}
        <div className="grid grid-cols-1 gap-4">
          {workflows.map((wf, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-card-border bg-[#070709] hover:bg-[#09090c] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              <div className="space-y-1.5 text-left flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-accent-blue/10 text-accent-blue border border-accent-blue/20 px-2 py-0.5 rounded font-mono font-medium">
                    {wf.agents} Agents linked
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    Latency: {wf.latency}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">{wf.name}</h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">{wf.desc}</p>
              </div>

              <div className="flex items-center gap-4 border-t sm:border-t-0 border-card-border/50 pt-3 sm:pt-0 w-full sm:w-auto justify-end">
                <button
                  className="p-2 rounded-lg bg-zinc-950 border border-card-border hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Test Pipeline"
                >
                  <Play size={14} />
                </button>
                <button
                  className="p-2 rounded-lg bg-zinc-950 border border-card-border hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Configure"
                >
                  <Settings size={14} />
                </button>
                <button className="text-zinc-400 hover:text-white transition-colors cursor-pointer">
                  {wf.status ? <ToggleRight size={24} className="text-accent-blue" /> : <ToggleLeft size={24} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
}
