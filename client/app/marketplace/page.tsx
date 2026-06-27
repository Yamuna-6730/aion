'use client';

import React from 'react';
import { Cpu, ShoppingBag, Star, Download } from 'lucide-react';
import WorkspaceLayout from '@/app/workspace/layout';

export default function MarketplacePage() {
  const marketplaceAgents = [
    { name: "Salesforce CRM Linker", author: "AION Labs", rating: 4.9, desc: "Directly syncs discovered targets and decision makers into active CRM pipelines.", downloads: "2.4k" },
    { name: "Crunchbase Funding Aggregator", author: "Crunchbase", rating: 4.8, desc: "Connects real-time Series A/B/C/D cap table changes directly into the Funding Agent.", downloads: "4.1k" },
    { name: "European Sovereign Compliance Guard", author: "GDPR Trust", rating: 4.7, desc: "Validates EU localized hosting compliance parameters before flagging targets.", downloads: "1.2k" }
  ];

  return (
    <WorkspaceLayout>
      <div className="flex-1 p-8 space-y-6 overflow-y-auto max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-card-border pb-5">
          <div>
            <h2 className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-1.5">
              <ShoppingBag size={12} className="text-accent-blue" />
              AION Agent Marketplace
            </h2>
            <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
              Extend Your Operating System
            </h1>
            <p className="text-zinc-500 text-xs mt-1">
              Add third-party scrapers, CRM connectors, and validation models to your discovery timeline.
            </p>
          </div>
        </div>

        {/* Marketplace Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketplaceAgents.map((agent, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-card-border bg-[#070709] hover:bg-[#09090c] transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-zinc-500 font-mono">By {agent.author}</span>
                  <span className="flex items-center gap-0.5 text-[10px] text-amber-500 font-bold">
                    <Star size={10} fill="currentColor" /> {agent.rating}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors">{agent.name}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed font-sans">{agent.desc}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-card-border/50 text-[10px] text-zinc-500 font-mono">
                <span>{agent.downloads} installs</span>
                <button className="flex items-center gap-1 text-accent-blue hover:text-white transition-colors cursor-pointer font-bold">
                  <Download size={10} />
                  <span>Install</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
}
