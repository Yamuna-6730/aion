'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/store/AppContext';
import PanelLayout from '@/components/workspace/PanelLayout';
import { suggestedMissions, mockMissions, Mission } from '@/constants/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  ArrowRight,
  TrendingUp,
  Cpu,
  Users,
  Search,
  BookOpen,
  Activity,
  History,
  Info,
  Layers,
  Settings,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  X
} from 'lucide-react';

export default function MissionControlPage() {
  const router = useRouter();
  const { startMission, activeMission, setActiveMission, missions } = useApp();
  const [query, setQuery] = useState('');
  
  // Conversational Wizard state
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);
  const [wizardData, setWizardData] = useState({
    domain: 'Manufacturing',
    icp: 'Enterprise B2B',
    rules: 'Must have active cloud migrations',
    personas: 'CTO, VP Engineering',
    size: '1000+ employees',
    revenue: '>$50M',
    countries: 'Germany, Austria',
    technologies: 'AWS, Kubernetes, PyTorch',
    triggers: 'Hiring AI Engineers, recent funding',
    goal: 'Find Manufacturing companies in Germany expanding into AI.'
  });

  const wizardFields = [
    { key: 'domain', label: 'Business Domain', placeholder: 'e.g. Manufacturing, Healthcare, FinTech' },
    { key: 'icp', label: 'Ideal Customer Profile (ICP)', placeholder: 'e.g. Mid-market SaaS, Enterprise Retail' },
    { key: 'rules', label: 'Qualification Rules', placeholder: 'e.g. Must have a security certification, ISO27001' },
    { key: 'personas', label: 'Target Personas', placeholder: 'e.g. CTO, VP of Security, Head of IT' },
    { key: 'size', label: 'Company Size / Employee Count', placeholder: 'e.g. 500-2000 employees, 10k+' },
    { key: 'revenue', label: 'Annual Revenue Threshold', placeholder: 'e.g. >$10M, €50M+' },
    { key: 'countries', label: 'Geographic Focus / Countries', placeholder: 'e.g. Germany, UK, North America' },
    { key: 'technologies', label: 'Technology Stack Requirements', placeholder: 'e.g. AWS, React, Snowflake' },
    { key: 'triggers', label: 'Key Business Triggers', placeholder: 'e.g. Expanding offices, hiring AI talent' },
    { key: 'goal', label: 'Natural Language Goal Summary', placeholder: 'Summarize the mission objective...' }
  ];

  const handleRunMission = (goalQuery: string) => {
    if (!goalQuery.trim()) return;
    startMission(goalQuery);
    router.push('/planner');
  };

  const handleNextWizardStep = () => {
    if (wizardStep < wizardFields.length - 1) {
      setWizardStep(prev => prev + 1);
    } else {
      // Completed wizard!
      setShowWizard(false);
      startMission(wizardData.goal);
      router.push('/planner');
    }
  };

  const handleWizardInputChange = (key: string, val: string) => {
    setWizardData(prev => {
      const next = { ...prev, [key]: val };
      // Auto-generate goal if updating other fields
      if (key !== 'goal') {
        next.goal = `Find ${next.domain} companies in ${next.countries} with ${next.size} employees, using ${next.technologies}, triggered by ${next.triggers}.`;
      }
      return next;
    });
  };

  const handleLoadMissionFromList = (m: Mission) => {
    setActiveMission(m);
    if (m.status === 'Running' || m.status === 'Thinking') {
      router.push('/planner');
    } else {
      router.push('/companies');
    }
  };

  // Render Left Panel (Mission Commander)
  const leftPanel = (
    <div className="flex-1 p-8 flex flex-col justify-between max-w-4xl mx-auto w-full relative">
      <div className="space-y-8">
        {/* Title */}
        <div>
          <h2 className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-2">
            <Sparkles size={12} className="text-accent-blue animate-pulse" />
            Mission Command Console
          </h2>
          <h1 className="text-3xl font-extrabold tracking-tight mt-2 text-white">
            Enterprise AI Operating System
          </h1>
        </div>

        {/* Large Conversational Input */}
        <div className="p-6 rounded-xl border border-card-border bg-card-bg/60 glass-panel shadow-lg space-y-4">
          <label className="block text-sm font-semibold text-zinc-300">
            What business objective do you want to accomplish today?
          </label>
          <div className="flex gap-2">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Find cybersecurity companies in USA expanding into Europe..."
              className="flex-1 min-h-[70px] max-h-[150px] p-3 text-sm rounded-lg bg-zinc-950 border border-card-border text-white placeholder-zinc-500 outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue resize-none transition-all"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleRunMission(query);
                }
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setWizardStep(0);
                setShowWizard(true);
              }}
              className="flex items-center gap-1.5 text-xs text-accent-purple font-semibold hover:text-purple-400 transition-colors"
            >
              <Layers size={14} />
              Open Conversational Mission Builder
            </button>
            <button
              onClick={() => handleRunMission(query)}
              disabled={!query.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-semibold rounded-lg hover:shadow-[0_0_12px_rgba(59,130,246,0.4)] disabled:opacity-50 disabled:pointer-events-none transition-all"
            >
              <span>Initialize Mission</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-zinc-500 font-mono tracking-wider uppercase">Quick Sandbox Scenarios</div>
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              "Find Manufacturing companies in Germany expanding into AI.",
              "Find AI startups in USA hiring ML Engineers.",
              "Find SaaS companies matching my ICP.",
              "Find cybersecurity companies expanding into Europe."
            ].map((suggestedQuery, i) => (
              <button
                key={i}
                onClick={() => setQuery(suggestedQuery)}
                className="px-3 py-1.5 rounded-lg border border-card-border bg-zinc-950/40 hover:bg-zinc-900 hover:text-white text-zinc-400 transition-all text-left max-w-md truncate"
              >
                {suggestedQuery}
              </button>
            ))}
          </div>
        </div>

        {/* Suggested Missions (Grid of Cards) */}
        <div className="space-y-4 pt-4">
          <div className="text-xs font-bold text-zinc-500 font-mono tracking-wider uppercase">Suggested B2B Discovery Blueprints</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestedMissions.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setQuery(`${item.title}: Search for enterprise indicators matching ${item.description.toLowerCase()}`);
                }}
                className="p-4 rounded-xl border border-card-border bg-zinc-950/20 glass-card cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-card-border flex items-center justify-center text-accent-blue group-hover:text-accent-purple transition-colors mb-3">
                  <Activity size={16} />
                </div>
                <h3 className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversational Builder Modal Overlay */}
      <AnimatePresence>
        {showWizard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg overflow-hidden rounded-xl border border-card-border bg-[#0a0a0d] p-6 glass-panel text-fg-primary space-y-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-2 border-b border-card-border">
                <div>
                  <h3 className="text-xs text-accent-purple font-mono uppercase tracking-widest">Conversational Mission Builder</h3>
                  <h2 className="text-lg font-bold text-white mt-1">Configure Search Parameters</h2>
                </div>
                <button
                  onClick={() => setShowWizard(false)}
                  className="p-1 rounded-md text-zinc-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent-blue to-accent-purple transition-all duration-300"
                  style={{ width: `${((wizardStep + 1) / wizardFields.length) * 100}%` }}
                />
              </div>

              {/* Step Input */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-semibold tracking-wider text-zinc-400 uppercase">
                  Step {wizardStep + 1} of {wizardFields.length}: {wizardFields[wizardStep].label}
                </label>
                <input
                  type="text"
                  value={wizardData[wizardFields[wizardStep].key as keyof typeof wizardData]}
                  onChange={(e) => handleWizardInputChange(wizardFields[wizardStep].key, e.target.value)}
                  placeholder={wizardFields[wizardStep].placeholder}
                  className="w-full p-3 rounded-lg bg-zinc-950 border border-card-border text-zinc-200 focus:border-accent-blue outline-none transition-all text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleNextWizardStep();
                  }}
                />
              </div>

              {/* Live compilation summary */}
              <div className="p-3 bg-zinc-950/80 rounded-lg border border-card-border text-xs">
                <div className="font-mono text-zinc-500 uppercase tracking-widest text-[9px] mb-1">Generated Mission Goal</div>
                <div className="text-zinc-300 font-sans italic">"{wizardData.goal}"</div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-between">
                <button
                  onClick={() => setWizardStep(prev => Math.max(0, prev - 1))}
                  disabled={wizardStep === 0}
                  className="px-4 py-2 border border-card-border rounded-lg text-xs hover:bg-zinc-900 text-zinc-300 disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleNextWizardStep}
                  className="px-5 py-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-semibold rounded-lg hover:shadow-md transition-all"
                >
                  {wizardStep === wizardFields.length - 1 ? 'Launch Mission ➔' : 'Next Step'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  // Render Right Panel (Telemetry & Mission History)
  const activeTelemetry = activeMission || missions[0];

  const rightPanel = (
    <div className="flex-1 p-6 flex flex-col justify-between h-full bg-[#070709] border-l border-card-border">
      <div className="space-y-6">
        {/* Telemetry Title */}
        <div className="flex items-center justify-between border-b border-card-border pb-3">
          <div className="flex items-center gap-2">
            <Compass size={18} className="text-accent-blue" />
            <h2 className="text-sm font-bold text-zinc-200">Active Telemetry</h2>
          </div>
          {activeTelemetry && (
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider ${
              activeTelemetry.status === 'Running' || activeTelemetry.status === 'Thinking'
                ? 'bg-amber-500/10 text-amber-500 border border-amber-500/25 animate-pulse'
                : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/25'
            }`}>
              {activeTelemetry.status}
            </span>
          )}
        </div>

        {/* Telemetry Indicators (Grid) */}
        {activeTelemetry ? (
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-zinc-950/80 rounded-lg border border-card-border space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-mono font-semibold">Planner State</span>
              <p className="text-sm font-bold text-zinc-200">{activeTelemetry.plannerState}</p>
            </div>
            <div className="p-3 bg-zinc-950/80 rounded-lg border border-card-border space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-mono font-semibold">Active Agents</span>
              <p className="text-sm font-bold text-zinc-200">{activeTelemetry.agentsActive} Running</p>
            </div>
            <div className="p-3 bg-zinc-950/80 rounded-lg border border-card-border space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-mono font-semibold">Companies Identified</span>
              <p className="text-sm font-bold text-zinc-200">{activeTelemetry.companiesFound} Match</p>
            </div>
            <div className="p-3 bg-zinc-950/80 rounded-lg border border-card-border space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-mono font-semibold">Telemetry Clock</span>
              <p className="text-sm font-bold text-zinc-200">{activeTelemetry.elapsedTime}</p>
            </div>
            <div className="col-span-2 p-3 bg-zinc-950/80 rounded-lg border border-card-border space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-zinc-500 uppercase font-mono font-semibold">Confidence Indicator</span>
                <span className="text-xs font-bold text-accent-blue">{activeTelemetry.confidence}%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent-blue to-accent-purple transition-all duration-500"
                  style={{ width: `${activeTelemetry.confidence}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center text-zinc-600 text-xs">
            No mission currently selected. Type a query on the left.
          </div>
        )}

        {/* Console Streaming Logs shortcut */}
        {activeTelemetry && (
          <div className="space-y-2">
            <span className="text-[10px] text-zinc-500 uppercase font-mono font-semibold flex items-center gap-1.5">
              <Activity size={12} className="text-accent-blue" />
              Agent Console Stream
            </span>
            <div className="p-3 rounded-lg bg-black border border-card-border font-mono text-[11px] text-zinc-400 space-y-1.5 max-h-[140px] overflow-y-auto">
              {activeTelemetry.consoleStream.map((log, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-accent-blue/60 select-none">❯</span>
                  <span className={log.includes('Confidence') ? 'text-white font-bold' : ''}>{log}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mission Library (History list) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 border-b border-card-border/50 pb-2">
            <History size={14} className="text-zinc-500" />
            <span className="text-xs font-bold text-zinc-400 uppercase font-mono">Mission Library</span>
          </div>
          <div className="space-y-2 max-h-[160px] overflow-y-auto">
            {missions.map((m) => (
              <div
                key={m.id}
                onClick={() => handleLoadMissionFromList(m)}
                className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${
                  activeTelemetry?.id === m.id
                    ? 'bg-zinc-900 border-accent-blue/30 text-white'
                    : 'bg-zinc-950 border-card-border hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="truncate pr-2">
                  <div className="font-semibold truncate">{m.name}</div>
                  <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{m.companiesFound} Companies found</div>
                </div>
                <ChevronRight size={14} className="text-zinc-500 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-[10px] text-zinc-600 font-mono mt-4 text-center border-t border-card-border/30 pt-3">
        AION Operating System • Secure Sandbox
      </div>
    </div>
  );

  return (
    <PanelLayout
      leftElement={leftPanel}
      rightElement={rightPanel}
      initialLeftWidthPercent={68}
      minWidthPixels={350}
    />
  );
}
