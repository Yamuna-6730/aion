'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/store/AppContext';
import {
  Compass,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  Activity,
  CheckCircle,
  Share2,
  Users,
  Terminal,
  Shield,
  Zap,
  Award
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const { startMission } = useApp();
  const [quickQuery, setQuickQuery] = useState('');

  const handleLaunchWorkspace = () => {
    router.push('/workspace');
  };

  const handleQuickLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      startMission(quickQuery);
      router.push('/planner');
    } else {
      router.push('/workspace');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-accent-blue/30 overflow-x-hidden relative font-sans">
      
      {/* Floating neon blurred background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-accent-blue/15 rounded-full neon-blur" />
      <div className="absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] bg-accent-purple/15 rounded-full neon-blur" />
      <div className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] bg-accent-blue/10 rounded-full neon-blur" />

      {/* Grid Mesh Overlay */}
      <div className="absolute inset-0 grid-overlay opacity-25 pointer-events-none z-0" />

      {/* Glass Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 glass-navbar flex items-center justify-between px-6 md:px-12 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-blue to-accent-purple shadow-md">
            <span className="font-mono font-bold text-white text-base">A</span>
          </div>
          <span className="font-sans font-bold text-lg tracking-wider text-white">AION</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-zinc-400">
          <a href="#why" className="hover:text-white transition-colors">WHY AION</a>
          <a href="#planner" className="hover:text-white transition-colors">HOW IT THINKS</a>
          <a href="#ecosystem" className="hover:text-white transition-colors">AGENT ECOSYSTEM</a>
          <a href="#graph" className="hover:text-white transition-colors">KNOWLEDGE GRAPH</a>
          <a href="#simulation" className="hover:text-white transition-colors">SIMULATION</a>
        </div>

        <button
          onClick={handleLaunchWorkspace}
          className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-lg text-xs font-bold text-white transition-all btn-premium cursor-pointer"
        >
          <span>Enter Workspace</span>
          <ArrowRight size={14} />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 px-6 md:px-12 flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-8 z-10 min-h-[90vh]">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-card-border bg-zinc-950/60 backdrop-blur-md text-[10px] font-bold font-mono tracking-widest text-accent-blue uppercase">
            <Zap size={10} className="animate-pulse text-accent-purple" />
            Next-Gen B2B Discovery System
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            The Enterprise AI Operating System for B2B Discovery
          </h1>
          <p className="text-sm md:text-lg text-zinc-400 font-sans max-w-2xl mx-auto leading-relaxed pt-2">
            AION is not a CRM. AION is not a dashboard. Launch autonomous multi-agent missions to parse deep company telemetry, locate decision makers, and connect verify evidence.
          </p>
        </div>

        {/* Hero Interactive Conversational Prompt */}
        <form
          onSubmit={handleQuickLaunch}
          className="w-full max-w-xl p-2 rounded-xl border border-card-border bg-card-bg/70 glass-panel shadow-2xl flex gap-2"
        >
          <input
            type="text"
            value={quickQuery}
            onChange={(e) => setQuickQuery(e.target.value)}
            placeholder="Type a goal (e.g. Find Manufacturing companies in Germany)..."
            className="flex-1 bg-transparent border-0 outline-none px-3 py-2 text-xs text-white placeholder-zinc-500 focus:ring-0"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-bold rounded-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all cursor-pointer"
          >
            Launch Mission
          </button>
        </form>

        <div className="flex flex-wrap justify-center gap-6 text-[11px] font-mono text-zinc-500 pt-4">
          <span className="flex items-center gap-1.5"><CheckCircle size={12} className="text-accent-blue" /> Zero Data Grids</span>
          <span className="flex items-center gap-1.5"><CheckCircle size={12} className="text-accent-blue" /> Replayable Planners</span>
          <span className="flex items-center gap-1.5"><CheckCircle size={12} className="text-accent-blue" /> Digital Twin Predictions</span>
        </div>
      </section>

      {/* Why AION Section */}
      <section id="why" className="py-24 px-6 md:px-12 max-w-5xl mx-auto space-y-12 z-10 relative">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-mono font-bold tracking-widest text-accent-blue uppercase">Design Philosophy</h2>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white">Why B2B Discovery Needs AION</h3>
          <p className="text-xs text-zinc-500 max-w-md mx-auto mt-1">A bespoke paradigm built to discover rather than list.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-card-border bg-[#070709]/80 glass-card space-y-3 text-left">
            <div className="w-10 h-10 rounded-lg bg-zinc-950 border border-card-border flex items-center justify-center text-accent-blue">
              <Terminal size={18} />
            </div>
            <h4 className="text-sm font-bold text-white">Not a CRM Dashboard</h4>
            <p className="text-xs text-zinc-500 leading-relaxed font-sans">
              Rigid lists and static tables are outdated. AION runs dynamic, goal-driven searches that formulate hypotheses and discover target structures.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-card-border bg-[#070709]/80 glass-card space-y-3 text-left">
            <div className="w-10 h-10 rounded-lg bg-zinc-950 border border-card-border flex items-center justify-center text-accent-purple">
              <Cpu size={18} />
            </div>
            <h4 className="text-sm font-bold text-white">Multi-Agent Autopilot</h4>
            <p className="text-xs text-zinc-500 leading-relaxed font-sans">
              Specialized search agents operate in parallel—scraping tech stacks, locating capital reserves, and drafting talking points.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-card-border bg-[#070709]/80 glass-card space-y-3 text-left">
            <div className="w-10 h-10 rounded-lg bg-zinc-950 border border-card-border flex items-center justify-center text-emerald-400">
              <Shield size={18} />
            </div>
            <h4 className="text-sm font-bold text-white">Evidence-Based Telemetry</h4>
            <p className="text-xs text-zinc-500 leading-relaxed font-sans">
              Every matched company displays verify evidence. No assumptions, only documented buying signals and hiring vacancies.
            </p>
          </div>
        </div>
      </section>

      {/* How Planner Thinks Section */}
      <section id="planner" className="py-24 px-6 md:px-12 max-w-5xl mx-auto space-y-12 z-10 relative">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-mono font-bold tracking-widest text-accent-purple uppercase">Cognitive Process</h2>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white">How the AION Planner Thinks</h3>
          <p className="text-xs text-zinc-500 max-w-md mx-auto mt-1">Witness target planning nodes execute in real-time.</p>
        </div>

        {/* Visual Timeline Cards */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch">
          {[
            { step: "01", name: "Deconstruct Goal", desc: "Planner receives query constraints, establishing geographic and ICP limits." },
            { step: "02", name: "Deploy Sub-Agents", desc: "Spawns Market, Hiring, and Capital agents to query live directories." },
            { step: "03", name: "Aggregate Signals", desc: "Locates job posts, cloud switches, and office lease updates." },
            { step: "04", name: "Synthesize DNA", desc: "Renders radar datasets and maps exact target contact pathways." }
          ].map((item, idx) => (
            <div key={idx} className="flex-1 p-5 rounded-xl border border-card-border bg-[#070709]/60 glass-panel flex flex-col justify-between text-left relative overflow-hidden group">
              <span className="absolute top-2 right-4 text-3xl font-mono font-bold text-zinc-800/40 select-none">{item.step}</span>
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-zinc-200 mt-2 font-mono uppercase tracking-wider">{item.name}</h4>
                <p className="text-xs text-zinc-500 leading-relaxed font-sans">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Agent Ecosystem Section */}
      <section id="ecosystem" className="py-24 px-6 md:px-12 max-w-5xl mx-auto space-y-12 z-10 relative">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-mono font-bold tracking-widest text-accent-blue uppercase">Agent Platform</h2>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white">The Discovery Agent Ecosystem</h3>
          <p className="text-xs text-zinc-500 max-w-md mx-auto mt-1">Click to trigger specialized target hunters inside the sandbox.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Market Discovery Agent", desc: "Scans corporate records, registries, and DNS routing maps." },
            { name: "Hiring Signal Agent", desc: "Monitors job boards for specific programming languages, frameworks, or AI libraries." },
            { name: "Capital & Funding Agent", desc: "Corroborates venture rounds, cap table updates, and cash allocations." },
            { name: "Compliance Validator", desc: "Cross-checks ISO, SOC2, and EU localized sovereign standards." },
            { name: "Digital Twin Twin", desc: "Runs simulations mapping buyer pathway friction points." },
            { name: "Executive Brief Compiler", desc: "Summarizes target telemetry into a presentation layout." }
          ].map((agent, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-card-border bg-[#070709]/70 glass-card text-left space-y-2 cursor-pointer group">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold text-zinc-200 group-hover:text-accent-blue transition-colors font-mono uppercase tracking-wider">{agent.name}</h4>
                <span className="text-[9px] bg-accent-blue/10 border border-accent-blue/20 text-accent-blue px-1.5 py-0.5 rounded font-mono">ACTIVE</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed font-sans">{agent.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Knowledge Graph Section */}
      <section id="graph" className="py-24 px-6 md:px-12 max-w-5xl mx-auto space-y-12 z-10 relative">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-mono font-bold tracking-widest text-accent-purple uppercase">Visual Ecosystem</h2>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white">Interactive Knowledge Graph</h3>
          <p className="text-xs text-zinc-500 max-w-md mx-auto mt-1">Physics-based mapping of target company connections.</p>
        </div>

        {/* Physics graph SVG mockup */}
        <div className="p-8 rounded-xl border border-card-border bg-black/60 glass-panel flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden group">
          <svg width="450" height="250" className="relative z-10 opacity-80 group-hover:opacity-100 transition-opacity">
            {/* Connection lines */}
            <line x1="225" y1="125" x2="100" y2="75" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1.5" className="animate-pulse" />
            <line x1="225" y1="125" x2="350" y2="75" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="1.5" />
            <line x1="225" y1="125" x2="150" y2="200" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1.5" />
            <line x1="225" y1="125" x2="300" y2="200" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1.5" />
            
            {/* Center Core node */}
            <circle cx="225" cy="125" r="14" fill="rgba(59, 130, 246, 0.2)" stroke="var(--accent-primary)" strokeWidth="2" className="animate-pulse" />
            <text x="225" y="129" fill="white" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">AION</text>

            {/* Sub nodes */}
            <circle cx="100" cy="75" r="8" fill="#18181b" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="100" y="90" fill="#a1a1aa" fontSize="8" fontFamily="monospace" textAnchor="middle">Siemens</text>

            <circle cx="350" cy="75" r="8" fill="#18181b" stroke="#8b5cf6" strokeWidth="1.5" />
            <text x="350" y="90" fill="#a1a1aa" fontSize="8" fontFamily="monospace" textAnchor="middle">BMW</text>

            <circle cx="150" cy="200" r="8" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
            <text x="150" y="215" fill="#a1a1aa" fontSize="8" fontFamily="monospace" textAnchor="middle">OpenAI</text>

            <circle cx="300" cy="200" r="8" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="300" y="215" fill="#a1a1aa" fontSize="8" fontFamily="monospace" textAnchor="middle">CrowdStrike</text>
          </svg>
          <span className="text-[10px] text-zinc-500 font-mono mt-4">Hover to expand nodes. Launches with Spring Physics simulations inside the Workspace.</span>
        </div>
      </section>

      {/* Simulation Section */}
      <section id="simulation" className="py-24 px-6 md:px-12 max-w-5xl mx-auto space-y-12 z-10 relative">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-mono font-bold tracking-widest text-accent-blue uppercase">Digital Twin</h2>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white">Digital Twin Simulations</h3>
          <p className="text-xs text-zinc-500 max-w-md mx-auto mt-1">Map probability ratios and project pilot success timelines.</p>
        </div>

        <div className="p-6 rounded-xl border border-card-border bg-[#070709]/60 glass-panel flex flex-col md:flex-row justify-between items-center gap-6 max-w-2xl mx-auto">
          <div className="space-y-2 text-left">
            <span className="text-[10px] font-mono text-accent-purple uppercase tracking-wider font-bold">Simulation Output Preview</span>
            <h4 className="text-sm font-bold text-white">Contact VP of Engineering directly</h4>
            <p className="text-xs text-zinc-500 leading-relaxed font-sans max-w-sm">
              Reroute pathway nodes through shared LinkedIn graphs and highlight Siemens Xcelerator compliance parameters.
            </p>
          </div>
          
          <div className="flex gap-6 text-center">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 block">Probability</span>
              <span className="font-bold text-emerald-400 text-lg">72%</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-500 block">Proj. ARR</span>
              <span className="font-bold text-white text-lg">€450k</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-500 block">Time</span>
              <span className="font-bold text-accent-purple text-lg">3 mos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center z-10 relative">
        <div className="p-8 md:p-16 rounded-2xl border border-card-border bg-gradient-to-tr from-[#08080d] via-zinc-950 to-zinc-950 relative overflow-hidden space-y-6 group">
          {/* Animated glow border */}
          <div className="absolute inset-0 border border-accent-blue/10 rounded-2xl pointer-events-none group-hover:border-accent-blue/30 transition-colors duration-500" />
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Experience AION Operating System
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
            Ready to explore verified targets, configure multi-agent missions, and build evidence databases? Launch the platform.
          </p>

          <button
            onClick={handleLaunchWorkspace}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-bold rounded-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all cursor-pointer"
          >
            <span>Launch Workspace</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-card-border/40 text-center text-xs text-zinc-600 font-mono">
        © 2026 AION platform. Built for Next-Gen B2B Discovery.
      </footer>
    </div>
  );
}
