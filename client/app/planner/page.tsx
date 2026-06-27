'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useApp } from '@/store/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Play,
  RotateCcw,
  Activity,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  FileText,
  AlertCircle
} from 'lucide-react';
import WorkspaceLayout from '@/app/workspace/layout';

export default function PlannerPage() {
  const { activeMission, addNotification } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1500); // ms per step
  const consoleEndRef = useRef<HTMLDivElement>(null);

  const steps = [
    { name: 'MISSION', label: 'Mission Input', desc: 'Find Manufacturing Companies in Germany expanding into AI' },
    { name: 'PLANNER', label: 'Planner Core', desc: 'Thinking and outlining query strategy...' },
    { name: 'DISCOVERING SIGNALS', label: 'Discovering Signals', desc: 'Searching Hiring, Funding, and Expansion events...' },
    { name: 'CONNECTING EVIDENCE', label: 'Connecting Evidence', desc: 'Corroborating target web signatures...' },
    { name: 'GENERATING HYPOTHESES', label: 'Generating Hypotheses', desc: 'Formulating buyer fit theories...' },
    { name: 'VALIDATING', label: 'Validating ICP', desc: 'Cross-verifying revenue boundaries (>€10M)...' },
    { name: 'BUILDING KNOWLEDGE GRAPH', label: 'Building Knowledge Graph', desc: 'Mapping ecosystem linkages...' },
    { name: 'SCORING', label: 'Opportunity Scoring', desc: 'Calculating final discovery weightings...' },
    { name: 'COMPANIES', label: 'Companies Output', desc: 'Compiling list of 48 target matching profiles...' },
    { name: 'RECOMMENDATIONS', label: 'Recommendations', desc: 'Personalizing VP and CTO playbooks...' },
    { name: 'EXECUTIVE BRIEF', label: 'Executive Brief', desc: 'Preparing downloadable brief templates...' }
  ];

  const consoleLogs = [
    [
      "Planner: Received natural language objective.",
      "Planner: Goal set: 'Find Manufacturing companies in Germany expanding into AI.'",
      "Planner: Initiating semantic analysis..."
    ],
    [
      "Planner: Query parsed successfully.",
      "Planner: Identified constraints (Industry: Manufacturing, Region: Germany, Trigger: AI Expansion).",
      "Planner: Delegating targets to Market Discovery Agent..."
    ],
    [
      "Market Agent: Querying Munich and Nuremberg corporate registries...",
      "Market Agent: Identified 145 industrial manufacturing entities.",
      "Discovering Signals: Scanning press wires and news databases for 'AI', 'generative', 'LLM' triggers..."
    ],
    [
      "Connecting Evidence: Pulling active SEC and EU registry files...",
      "Hiring Agent: Scraping active corporate job boards...",
      "Hiring Agent: Located 75+ active machine vision and PyTorch engineering vacancies..."
    ],
    [
      "Validation Agent: Formulating purchase authority hypothesis...",
      "Validation Agent: Correlating AI vacancies with plant hardware upgrades...",
      "Validation Agent: Flagged Siemens and BMW as top-tier candidates."
    ],
    [
      "Validation Agent: Checking financial boundaries...",
      "Validation Agent: Verified revenue thresholds (Siemens: €78.8B, BMW: €155.5B).",
      "Validation Agent: Confirmed high-level budget allocations."
    ],
    [
      "Knowledge Graph: Drawing node linkages between companies and partners...",
      "Knowledge Graph: Mapped NVIDIA hardware co-development agreements.",
      "Knowledge Graph: Synced 12 corporate clusters."
    ],
    [
      "Telemetry Scoring: Executing match calculations...",
      "Telemetry Scoring: Siemens match rated 95% ICP.",
      "Telemetry Scoring: BMW match rated 92% ICP."
    ],
    [
      "Companies Agent: Output compiled.",
      "Companies Agent: Identified 48 high-probability manufacturing targets.",
      "Companies Agent: Structuring cards..."
    ],
    [
      "Recommendation Agent: Formatting target playbooks...",
      "Recommendation Agent: Generated talking points for Dr. Hanna Hennig (CIO, Siemens).",
      "Recommendation Agent: Personalized Figure Robotics talking points for BMW CEO."
    ],
    [
      "Briefing Agent: Compiling executive summary...",
      "Briefing Agent: Mock presentation card is ready.",
      "AION OS: Mission complete. Awaiting user interaction."
    ]
  ];

  const activityFeed = [
    { time: '17:15:01', msg: 'Planner started query strategy' },
    { time: '17:15:04', msg: 'Market Agent discovered 145 German manufacturing domains' },
    { time: '17:15:08', msg: 'Hiring Agent detected active AI engineering requirements' },
    { time: '17:15:12', msg: 'Funding Agent validated corporate capital reserves' },
    { time: '17:15:15', msg: 'Knowledge Graph clustered and mapped' },
    { time: '17:15:20', msg: 'Validation Agent confirmed target scoring limits' },
    { time: '17:15:23', msg: 'Executive Brief compile complete' }
  ];

  // Auto-advance steps
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep((prev) => prev + 1);
      }, speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, speed]);

  useEffect(() => {
    if (currentStep === steps.length - 1 && isPlaying) {
      setIsPlaying(false);
      addNotification("Mission successfully completed! 48 companies identified.", "success");
    }
  }, [currentStep, isPlaying, addNotification, steps.length]);

  // Auto-scroll console
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentStep]);

  const handleReplay = () => {
    setCurrentStep(0);
    setIsPlaying(true);
    addNotification("Replaying discovery mission...", "info");
  };

  const getCombinedLogs = () => {
    let combined: string[] = [];
    for (let i = 0; i <= currentStep; i++) {
      combined = [...combined, ...consoleLogs[i]];
    }
    return combined;
  };

  return (
    <WorkspaceLayout>
      <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden p-6 gap-6 max-w-7xl mx-auto w-full">
        {/* Left Column: Replay Node Graph (Visual) */}
        <div className="flex-1 flex flex-col justify-between p-6 rounded-xl border border-card-border bg-[#070709]/80 glass-panel relative">
          
          {/* Header Controls */}
          <div className="flex items-center justify-between border-b border-card-border/60 pb-3">
            <div>
              <h2 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-1.5">
                <Cpu size={12} className="text-accent-blue" />
                Active Replay Planner
              </h2>
              <h1 className="text-lg font-bold text-white mt-1">
                {activeMission?.query || "German Manufacturing AI Exploration"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {/* Play/Pause */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={currentStep === steps.length - 1}
                className="p-2 rounded-lg bg-zinc-950 border border-card-border hover:bg-zinc-900 text-zinc-300 hover:text-white transition-all disabled:opacity-40"
              >
                {isPlaying ? (
                  <span className="text-xs font-mono font-semibold px-2 py-0.5">Pause</span>
                ) : (
                  <span className="text-xs font-mono font-semibold px-2 py-0.5">Resume</span>
                )}
              </button>
              {/* Replay */}
              <button
                onClick={handleReplay}
                className="p-2 rounded-lg bg-zinc-950 border border-card-border hover:bg-zinc-900 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5"
                title="Restart Simulation"
              >
                <RotateCcw size={14} />
                <span className="text-xs font-mono font-semibold">Replay</span>
              </button>
            </div>
          </div>

          {/* Graph Nodes Visual Area */}
          <div className="flex-1 py-8 overflow-y-auto flex flex-col items-center justify-center relative space-y-4">
            {steps.map((step, idx) => {
              const isCurrent = idx === currentStep;
              const isPast = idx < currentStep;
              const isFuture = idx > currentStep;

              return (
                <div key={idx} className="w-full max-w-md flex flex-col items-center relative">
                  {/* Connecting Line from previous */}
                  {idx > 0 && (
                    <div className="w-[1.5px] h-6 bg-zinc-800 relative">
                      <div
                        className={`absolute inset-0 bg-gradient-to-b from-accent-blue to-accent-purple transition-all duration-500`}
                        style={{ height: isPast || isCurrent ? '100%' : '0%' }}
                      />
                    </div>
                  )}

                  {/* Node Panel */}
                  <motion.div
                    animate={isCurrent ? { scale: 1.02 } : { scale: 1 }}
                    className={`w-full p-3 rounded-lg border text-xs flex items-center justify-between gap-3 transition-all duration-300 ${
                      isCurrent
                        ? 'bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 border-accent-blue shadow-[0_0_15px_rgba(59,130,246,0.25)] text-white'
                        : isPast
                        ? 'bg-zinc-950 border-emerald-500/20 text-zinc-300'
                        : 'bg-zinc-950/40 border-card-border text-zinc-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Check/Indicator Icon */}
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[9px] font-bold ${
                        isCurrent
                          ? 'bg-accent-blue text-white animate-pulse'
                          : isPast
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-zinc-900 border border-card-border text-zinc-500'
                      }`}>
                        {isPast ? '✓' : idx + 1}
                      </div>

                      <div className="text-left">
                        <div className="font-bold tracking-wide font-mono text-[10px]">
                          {step.name}
                        </div>
                        {isCurrent && (
                          <div className="text-[10px] text-zinc-400 mt-0.5 transition-all">
                            {step.desc}
                          </div>
                        )}
                      </div>
                    </div>

                    {isCurrent && (
                      <span className="text-[9px] font-mono text-accent-purple animate-pulse uppercase">
                        Active Agent
                      </span>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Bottom Call to Action */}
          <AnimatePresence>
            {currentStep === steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="pt-4 border-t border-card-border flex justify-between items-center bg-[#070709]/95 z-10"
              >
                <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                  <CheckCircle className="text-emerald-500" size={16} />
                  <span>Discovery compilation completed (48 matches found).</span>
                </div>
                <Link href="/companies">
                  <button className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-semibold rounded-lg hover:shadow-[0_0_12px_rgba(59,130,246,0.3)] transition-all">
                    <span>Explore Companies</span>
                    <ArrowRight size={14} />
                  </button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Console & Activity Log Feed */}
        <div className="w-full md:w-96 flex flex-col gap-6">
          
          {/* Agent Console Stream */}
          <div className="flex-1 flex flex-col p-4 rounded-xl border border-card-border bg-black font-mono text-[11px] text-zinc-400 overflow-hidden relative">
            {/* Console Header */}
            <div className="flex items-center justify-between border-b border-card-border/50 pb-2 mb-3">
              <span className="text-[10px] uppercase font-bold text-accent-blue tracking-wider flex items-center gap-1.5">
                <Activity size={12} className="animate-pulse" />
                Live Agent Console
              </span>
              <span className="text-[9px] text-zinc-600">Streaming</span>
            </div>

            {/* Logs Area */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 scroll-smooth">
              {getCombinedLogs().map((log, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-accent-blue/50 select-none">❯</span>
                  <span className={log.includes('complete') || log.includes('verified') ? 'text-emerald-400' : log.includes('Confidence') ? 'text-white font-bold' : ''}>
                    {log}
                  </span>
                </div>
              ))}
              <div ref={consoleEndRef} />
            </div>

            {/* Glowing bar representing active scanner */}
            <div className="h-[2px] bg-gradient-to-r from-accent-blue via-accent-purple to-transparent w-full mt-2 animate-pulse-slow" />
          </div>

          {/* Activity Feed Feed */}
          <div className="p-4 rounded-xl border border-card-border bg-[#070709]/80 glass-panel space-y-4">
            <h2 className="text-xs uppercase font-bold tracking-wider text-zinc-400 font-mono border-b border-card-border/50 pb-2 flex items-center gap-1.5">
              <FileText size={14} className="text-accent-purple" />
              Chronological Activity
            </h2>

            <div className="space-y-3 max-h-[220px] overflow-y-auto">
              {activityFeed.map((act, i) => {
                // Display items based on currentStep pacing
                const stepThresholds = [0, 1, 2, 3, 4, 5, 7, 10];
                const shouldShow = currentStep >= (stepThresholds[i] || 0);

                if (!shouldShow) return null;

                return (
                  <div key={i} className="flex gap-3 text-xs">
                    <span className="text-zinc-600 font-mono mt-0.5">{act.time}</span>
                    <p className="text-zinc-300 leading-normal font-sans">{act.msg}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
