'use client';

import React from 'react';
import { Settings as SettingsIcon, Shield, Key, Sliders } from 'lucide-react';
import WorkspaceLayout from '@/app/workspace/layout';

export default function SettingsPage() {
  return (
    <WorkspaceLayout>
      <div className="flex-1 p-8 space-y-6 overflow-y-auto max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="border-b border-card-border pb-5">
          <h2 className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-1.5">
            <SettingsIcon size={12} className="text-accent-blue" />
            AION Platform Settings
          </h2>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
            System & Provider Configurations
          </h1>
          <p className="text-zinc-500 text-xs mt-1">
            Manage your credentials, LLM routing tokens, and API credentials.
          </p>
        </div>

        {/* Options List */}
        <div className="space-y-6">
          {/* Section 1 */}
          <div className="p-5 rounded-xl border border-card-border bg-[#070709] space-y-4">
            <h3 className="text-xs font-bold text-zinc-200 flex items-center gap-2">
              <Key size={14} className="text-accent-blue" />
              API Provider Credentials
            </h3>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="text-zinc-400">OpenAI API Key:</span>
                <input
                  type="password"
                  value="sk-proj-••••••••••••••••"
                  disabled
                  className="col-span-2 p-2 bg-zinc-950 border border-card-border rounded text-zinc-500 font-mono text-[10px]"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="text-zinc-400">Anthropic API Key:</span>
                <input
                  type="password"
                  value="sk-ant-••••••••••••••••"
                  disabled
                  className="col-span-2 p-2 bg-zinc-950 border border-card-border rounded text-zinc-500 font-mono text-[10px]"
                />
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="p-5 rounded-xl border border-card-border bg-[#070709] space-y-4">
            <h3 className="text-xs font-bold text-zinc-200 flex items-center gap-2">
              <Sliders size={14} className="text-accent-purple" />
              Discovery Thresholds
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Default Match Threshold:</span>
                <span className="font-mono text-zinc-200 font-bold">85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Max Crawl Hops:</span>
                <span className="font-mono text-zinc-200 font-bold">3 Hops</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
