'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useApp } from '@/store/AppContext';
import { Company, mockCompanies } from '@/constants/mockData';
import {
  Users,
  Compass,
  ArrowLeft,
  DollarSign,
  Activity,
  Briefcase,
  Layers,
  Award,
  Globe,
  ShieldCheck,
  CheckCircle,
  FileText,
  Mail,
  Phone,
  Cpu,
  Brain,
  Trash2,
  AlertTriangle,
  Play
} from 'lucide-react';
import WorkspaceLayout from '@/app/workspace/layout';

export default function CompanyDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { companies, addNotification } = useApp();

  const companyId = params.id as string;
  const company = companies.find((c) => c.id === companyId) || mockCompanies[0];

  // Retrieve active tab from URL or default to overview
  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(searchParams.get('tab') || 'overview');
  }, [searchParams]);

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    router.replace(`/companies/${companyId}?tab=${tabName}`);
  };

  if (!company) {
    return (
      <WorkspaceLayout>
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
          <AlertTriangle size={32} className="text-amber-500" />
          <h1 className="text-xl font-bold text-white">Target Profile Not Found</h1>
          <Link href="/companies">
            <button className="px-4 py-2 bg-zinc-900 border border-card-border rounded-lg text-xs text-zinc-300">
              Return to Directory
            </button>
          </Link>
        </div>
      </WorkspaceLayout>
    );
  }

  // Trigonometry helper to draw the Radar Chart
  const renderRadarChart = () => {
    const dimensions = [
      { key: 'innovation', label: 'Innovation' },
      { key: 'growth', label: 'Growth' },
      { key: 'hiring', label: 'Hiring' },
      { key: 'technology', label: 'Technology' },
      { key: 'security', label: 'Security' },
      { key: 'cloud', label: 'Cloud' },
      { key: 'aiAdoption', label: 'AI Adoption' },
      { key: 'investment', label: 'Investment' },
      { key: 'compliance', label: 'Compliance' }
    ];

    const cx = 160;
    const cy = 160;
    const maxVal = 100;
    const radius = 100;
    const totalAxes = dimensions.length;

    // Calculate background concentric nonagons
    const concentricLevels = [0.2, 0.4, 0.6, 0.8, 1.0];
    const gridPolygons = concentricLevels.map((level) => {
      const points = [];
      for (let i = 0; i < totalAxes; i++) {
        const angle = (i * 2 * Math.PI) / totalAxes - Math.PI / 2;
        const x = cx + radius * level * Math.cos(angle);
        const y = cy + radius * level * Math.sin(angle);
        points.push(`${x},${y}`);
      }
      return points.join(' ');
    });

    // Calculate company data polygon points
    const dataPoints = [];
    const nodeCoords = [];
    for (let i = 0; i < totalAxes; i++) {
      const dim = dimensions[i];
      const val = company.businessDna[dim.key as keyof typeof company.businessDna] || 50;
      const angle = (i * 2 * Math.PI) / totalAxes - Math.PI / 2;
      const scaleRadius = (val / maxVal) * radius;
      const x = cx + scaleRadius * Math.cos(angle);
      const y = cy + scaleRadius * Math.sin(angle);
      dataPoints.push(`${x},${y}`);
      nodeCoords.push({ x, y, label: dim.label, val });
    }
    const dataPolygonPoints = dataPoints.join(' ');

    return (
      <div className="flex flex-col items-center justify-center p-6 bg-zinc-950/40 border border-card-border/80 rounded-xl relative overflow-hidden group">
        <h3 className="text-xs font-bold text-zinc-300 mb-4 font-mono uppercase tracking-wider">Business DNA Analytics</h3>
        
        <svg width="320" height="320" className="relative z-10 select-none">
          {/* Grids */}
          {gridPolygons.map((points, idx) => (
            <polygon
              key={idx}
              points={points}
              fill="none"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="1"
            />
          ))}

          {/* Axes lines */}
          {Array.from({ length: totalAxes }).map((_, i) => {
            const angle = (i * 2 * Math.PI) / totalAxes - Math.PI / 2;
            const x = cx + radius * Math.cos(angle);
            const y = cy + radius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1"
              />
            );
          })}

          {/* Core Data Polygon */}
          <polygon
            points={dataPolygonPoints}
            fill="rgba(59, 130, 246, 0.15)"
            stroke="var(--accent-primary)"
            strokeWidth="2"
            className="transition-all duration-700"
          />

          {/* Text Labels and Data Nodes */}
          {nodeCoords.map((coord, i) => {
            const angle = (i * 2 * Math.PI) / totalAxes - Math.PI / 2;
            // Push text slightly outwards
            const labelX = cx + (radius + 20) * Math.cos(angle);
            const labelY = cy + (radius + 15) * Math.sin(angle);

            return (
              <g key={i}>
                {/* Dot */}
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r="3.5"
                  fill="var(--accent-sec)"
                  stroke="white"
                  strokeWidth="1"
                />
                {/* Text */}
                <text
                  x={labelX}
                  y={labelY}
                  fill="rgba(255,255,255,0.6)"
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  {coord.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="flex gap-4 text-[10px] font-mono text-zinc-500 mt-4 border-t border-card-border/40 pt-3 w-full justify-center">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-accent-blue/30 border border-accent-blue" /> Value Index</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-accent-purple" /> Node Anchor</span>
        </div>
      </div>
    );
  };

  const handleDownloadBrief = () => {
    addNotification(`Exporting executive brief for ${company.name} as presentation layout...`, 'success');
  };

  return (
    <WorkspaceLayout>
      <div className="flex-1 p-6 space-y-6 overflow-y-auto max-w-6xl mx-auto w-full">
        {/* Back navigation header */}
        <div className="flex items-center justify-between border-b border-card-border pb-5">
          <div className="flex items-center gap-3">
            <Link href="/companies">
              <button className="p-2 rounded-lg bg-zinc-950 border border-card-border hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                <ArrowLeft size={16} />
              </button>
            </Link>
            <div>
              <h2 className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-1">
                <Brain size={12} className="text-accent-blue animate-pulse" />
                Enterprise Target Intelligence
              </h2>
              <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
                {company.name} Profile
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-zinc-950 border border-card-border px-3 py-1.5 rounded-lg text-zinc-400 font-mono">
              Confidence Score: <span className="font-bold text-accent-blue">{company.confidence}%</span>
            </span>
          </div>
        </div>

        {/* Primary Meta statistics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-zinc-950/40 rounded-xl border border-card-border text-xs">
          <div>
            <span className="text-zinc-500 font-mono block">Founded Year</span>
            <span className="text-sm font-bold text-zinc-200 mt-1 block">{company.founded}</span>
          </div>
          <div>
            <span className="text-zinc-500 font-mono block">Headquarters</span>
            <span className="text-sm font-bold text-zinc-200 mt-1 block">{company.headquarters}</span>
          </div>
          <div>
            <span className="text-zinc-500 font-mono block">Employees</span>
            <span className="text-sm font-bold text-zinc-200 mt-1 block">{company.employees.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-zinc-500 font-mono block">Annual Revenue</span>
            <span className="text-sm font-bold text-zinc-200 mt-1 block">{company.revenue}</span>
          </div>
        </div>

        {/* Tab switch Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-card-border/60 pb-2 text-xs">
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'signals', label: 'Signals' },
            { key: 'technology', label: 'Technology Stack' },
            { key: 'decision-makers', label: 'Decision Makers' },
            { key: 'dna', label: 'Business DNA' },
            { key: 'evidence', label: 'Evidence Tab' },
            { key: 'simulation', label: 'Digital Twin Simulation' },
            { key: 'brief', label: 'Executive Brief' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`pb-2 px-3 transition-all relative font-semibold cursor-pointer ${
                activeTab === tab.key
                  ? 'text-white border-b-2 border-accent-blue'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Tab Panel Content */}
        <div className="pt-4">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column Description */}
              <div className="md:col-span-2 space-y-6">
                <div className="p-5 rounded-xl border border-card-border bg-zinc-950/20 space-y-3">
                  <h3 className="text-sm font-bold text-white">Value Proposition & ICP Match</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    AION algorithms flag {company.name} as a priority prospect. They match {company.icpMatch}% of ideal customer variables (e.g. {company.industry} core, active hiring lists for deep technology capabilities, and budget windows representing expansion).
                  </p>
                  <div className="pt-3 border-t border-card-border/60 text-xs">
                    <span className="text-[10px] text-zinc-500 font-mono uppercase block font-semibold">Discovery Playbook</span>
                    <p className="text-zinc-300 leading-relaxed mt-1 font-sans italic">
                      "{company.recommendation}"
                    </p>
                  </div>
                </div>

                {/* News timeline */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Activity size={16} className="text-accent-blue" />
                    Latest Citations & News Timeline
                  </h3>
                  <div className="space-y-4 relative border-l border-card-border pl-4 ml-2">
                    {company.latestNews.map((news, idx) => (
                      <div key={idx} className="space-y-1 text-xs relative">
                        {/* Dot indicator */}
                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-accent-blue border border-black" />
                        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                          <span>{news.date}</span>
                          <span>•</span>
                          <span className="text-zinc-400 font-semibold">{news.source}</span>
                          <span className="bg-zinc-900 border border-card-border px-1.5 py-0.5 rounded text-[9px] text-accent-purple font-mono">
                            {news.citation}
                          </span>
                        </div>
                        <h4 className="font-bold text-zinc-200">{news.headline}</h4>
                        <p className="text-zinc-400 leading-relaxed text-[11px] font-sans">{news.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column DNA chart preview */}
              <div>{renderRadarChart()}</div>
            </div>
          )}

          {activeTab === 'signals' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity size={16} className="text-accent-blue animate-pulse" />
                Core Target Signals
              </h3>
              <div className="space-y-3">
                {company.recentSignals.map((sig, sIdx) => (
                  <div key={sIdx} className="p-4 rounded-lg border border-card-border bg-[#070709] flex gap-3 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-purple mt-1.5 flex-shrink-0" />
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-zinc-200">{sig.title}</span>
                        <span className="text-[10px] text-zinc-500 font-mono">{sig.date}</span>
                        <span className="text-[10px] text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-1 py-0.5 rounded font-mono">
                          {sig.confidence}% Confidence
                        </span>
                      </div>
                      <p className="text-zinc-400 leading-relaxed text-xs font-sans">
                        {sig.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'technology' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
              {[
                { label: 'Cloud Infrastructure', list: company.techStack.cloud },
                { label: 'Languages', list: company.techStack.languages },
                { label: 'Frameworks & Libraries', list: company.techStack.frameworks },
                { label: 'Databases & Cache', list: company.techStack.databases },
                { label: 'Artificial Intelligence Stack', list: company.techStack.ai },
                { label: 'DevOps & Pipeline CI', list: company.techStack.devops }
              ].map((stack, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-card-border bg-zinc-950/40 space-y-3">
                  <h4 className="text-[10px] font-mono uppercase font-bold text-zinc-400 tracking-wider flex items-center gap-1.5">
                    <Cpu size={12} className="text-accent-blue" />
                    {stack.label}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {stack.list.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded bg-[#070709] border border-card-border text-xs text-zinc-300 font-mono font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'decision-makers' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              {company.decisionMakers.map((dm, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-card-border bg-[#070709] hover:bg-[#09090c] transition-all flex flex-col justify-between space-y-4"
                >
                  {/* Bio row */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-blue to-accent-purple p-[1px] flex-shrink-0">
                      <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-xs font-bold text-white uppercase">
                        {dm.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-150">{dm.name}</h4>
                      <p className="text-xs text-zinc-400">{dm.role}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[9px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 rounded bg-zinc-900 border border-card-border text-zinc-500">
                          Influence: <span className="text-accent-blue">{dm.influence}</span>
                        </span>
                        <span className="text-[9px] text-emerald-500 font-mono bg-emerald-500/10 border border-emerald-500/20 px-1 py-0.5 rounded">
                          {dm.confidence}% Confidence
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contact details */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-400 bg-zinc-950 p-2 rounded.md border border-card-border/60">
                    <div className="flex items-center gap-1.5">
                      <Mail size={10} className="text-zinc-500" />
                      <span>{dm.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone size={10} className="text-zinc-500" />
                      <span>{dm.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2 pt-1 border-t border-card-border/30">
                      <svg className="w-2.5 h-2.5 text-zinc-500 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                      </svg>
                      <span>{dm.linkedin}</span>
                    </div>
                  </div>

                  {/* Talking points */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono uppercase font-bold text-zinc-500 tracking-wider">
                      Target Talking Points
                    </div>
                    <ul className="space-y-1.5 text-xs text-zinc-300 font-sans list-disc list-inside">
                      {dm.talkingPoints.map((tp, tpIdx) => (
                        <li key={tpIdx} className="leading-relaxed">
                          {tp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'dna' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl items-start">
              <div>{renderRadarChart()}</div>
              
              {/* Detailed DNA analysis notes */}
              <div className="p-5 rounded-xl border border-card-border bg-zinc-950/20 space-y-4">
                <h3 className="text-sm font-bold text-white">Ecosystem Parameter Indicators</h3>
                <div className="space-y-3 text-xs">
                  {[
                    { label: "Innovation Quotient", score: company.businessDna.innovation, desc: "High investment in patent filing pipelines and advanced AI research groups." },
                    { label: "Growth Profile", score: company.businessDna.growth, desc: "Stable double-digit digital revenue growth projections year-over-year." },
                    { label: "Hiring Intensity", score: company.businessDna.hiring, desc: "Spikes in smart manufacturing and cloud automation vacancies." },
                    { label: "AI Adoption Quotient", score: company.businessDna.aiAdoption, desc: "Widespread integrations of Generative AI nodes inside active pipelines." }
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-zinc-200">{item.label}</span>
                        <span className="font-mono text-accent-blue font-bold">{item.score}%</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'evidence' && (
            <div className="max-w-xl space-y-6">
              <div className="border-b border-card-border pb-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck size={16} className="text-accent-blue" />
                  Telemetry Verification Evidence
                </h3>
                <p className="text-zinc-500 text-xs mt-1">
                  Confidence verification markers extracted by Discovery Agents.
                </p>
              </div>

              {/* Evidence cards */}
              <div className="space-y-3">
                {company.evidence.map((ev, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-card-border bg-[#070709] flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </div>
                      <span className="font-medium text-zinc-200 font-sans">{ev.label}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block">Confidence</span>
                      <span className="font-bold font-mono text-emerald-400">{ev.confidence}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'simulation' && (
            <div className="max-w-2xl space-y-6">
              <div className="border-b border-card-border pb-2 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Layers size={16} className="text-accent-purple" />
                    Digital Twin Contact Path Simulation
                  </h3>
                  <p className="text-zinc-500 text-xs mt-1">
                    Forecasting pilot engagement pathway probability and projected revenue.
                  </p>
                </div>
              </div>

              {/* Simulation columns */}
              <div className="space-y-4">
                {company.simulation.map((sim, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-card-border bg-zinc-950/20 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between text-xs"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-accent-blue uppercase tracking-wider font-semibold">Simulated Action Pathway</span>
                      <h4 className="text-xs font-bold text-zinc-200">{sim.action}</h4>
                    </div>

                    <div className="flex gap-6">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 block">Probability</span>
                        <span className="font-bold text-emerald-400 font-mono text-sm">{sim.probability}%</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 block">Proj. Revenue</span>
                        <span className="font-bold text-zinc-200 font-mono text-sm">{sim.projectedRevenue}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 block">Timeframe</span>
                        <span className="font-bold text-accent-purple font-mono text-sm">{sim.timeframe}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'brief' && (
            <div className="max-w-2xl p-8 rounded-xl border border-card-border bg-[#070709]/80 glass-panel shadow-lg space-y-6">
              {/* slide frame mockup */}
              <div className="border border-card-border/60 bg-black p-6 rounded-lg font-sans relative overflow-hidden space-y-4">
                <div className="flex justify-between items-center border-b border-card-border pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-zinc-900 border border-card-border flex items-center justify-center font-bold text-xs text-accent-blue">
                      {company.logo}
                    </div>
                    <span className="text-xs font-bold text-zinc-200">{company.name} Executive Summary</span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500">AION Discovery Brief v1.2</span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-white tracking-tight">
                    Discovery Opportunity: Industrial Autonomous Systems Play
                  </h2>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                    {company.name} is accelerating their smart infrastructure pipelines, utilizing Generative AI for industrial Edge and digital twin operations. By prioritizing our agentic verification models, AION models predict a {company.simulation[0]?.probability}% probability of pilot activation within {company.simulation[0]?.timeframe}, generating {company.simulation[0]?.projectedRevenue} ARR.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
                  <div className="p-2 bg-zinc-950/80 rounded border border-card-border/50">
                    <div className="text-[9px] text-zinc-500 uppercase font-mono">ICP Alignment</div>
                    <div className="font-bold text-accent-blue mt-0.5">{company.icpMatch}%</div>
                  </div>
                  <div className="p-2 bg-zinc-950/80 rounded border border-card-border/50">
                    <div className="text-[9px] text-zinc-500 uppercase font-mono">Opportunity Index</div>
                    <div className="font-bold text-accent-purple mt-0.5">{company.opportunityScore}</div>
                  </div>
                  <div className="p-2 bg-zinc-950/80 rounded border border-card-border/50">
                    <div className="text-[9px] text-zinc-500 uppercase font-mono">Verified Decisions</div>
                    <div className="font-bold text-emerald-400 mt-0.5">{company.decisionMakers.length} Profile</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-500 font-mono">Format: Presentation Brief Slide</span>
                <button
                  onClick={handleDownloadBrief}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-semibold rounded-lg hover:shadow-md transition-all cursor-pointer"
                >
                  <FileText size={14} />
                  <span>Download Briefing Slides</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </WorkspaceLayout>
  );
}
