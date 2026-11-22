import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Eye, 
  Activity, 
  ShieldAlert, 
  FolderClock, 
  Globe, 
  RefreshCw, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Stethoscope, 
  Layers, 
  Scan
} from 'lucide-react';

const IntelligenceSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState(0);

  const capabilities = [
    {
      id: 'visual',
      number: '01',
      title: 'Visual Analysis',
      shortTitle: 'Visual',
      icon: Eye,
      tagline: 'Surface visual indicators for further assessment.',
      description: 'Analyzes submitted animal imagery to identify potentially relevant morphological and visual indicators, preparing a structured visual summary for veterinary review.',
      formula: [
        { label: 'Submitted Image' },
        { symbol: '+' },
        { label: 'Visual Indicator Library' },
        { symbol: '→' },
        { label: 'Potential Visual Indicators', highlight: true }
      ],
      aiRole: 'Detects visible surface variations & anomalies',
      humanRole: 'Veterinarian evaluates clinical relevance',
      safetyNote: 'Visual analysis is assistive and does not provide an automated disease diagnosis.'
    },
    {
      id: 'symptoms',
      number: '02',
      title: 'Symptom & Context Analysis',
      shortTitle: 'Symptoms',
      icon: Activity,
      tagline: 'Combine reported observations with relevant animal and contextual signals.',
      description: 'Cross-correlates farmer observations with animal species, age, physiological status, and local environmental context to surface relevant risk indicators.',
      formula: [
        { label: 'Symptoms' },
        { symbol: '+' },
        { label: 'Animal Information' },
        { symbol: '+' },
        { label: 'Context' },
        { symbol: '→' },
        { label: 'Potential Health Indicators', highlight: true }
      ],
      aiRole: 'Cross-correlates multi-factor observational signals',
      humanRole: 'Farmer provides observations; vet verifies context',
      safetyNote: 'Organizes reported observations to support professional evaluation.'
    },
    {
      id: 'risk',
      number: '03',
      title: 'Risk Assessment',
      shortTitle: 'Risk',
      icon: ShieldAlert,
      tagline: 'AI-assisted risk assessment to organize potential indicators.',
      description: 'Structures potential risk indicators and prioritizes cases that may require timely veterinary attention, helping farmers take appropriate next steps.',
      formula: [
        { label: 'Observed Indicators' },
        { symbol: '+' },
        { label: 'Case Context' },
        { symbol: '+' },
        { label: 'Urgency Signals' },
        { symbol: '→' },
        { label: 'AI-Assisted Risk Assessment', highlight: true }
      ],
      aiRole: 'Organizes severity indicators & prioritizes case urgency',
      humanRole: 'Veterinarian delivers diagnostic conclusions',
      safetyNote: 'Supports case prioritization; does not replace veterinary clinical judgment.'
    },
    {
      id: 'cases',
      number: '04',
      title: 'Case Intelligence',
      shortTitle: 'Cases',
      icon: FolderClock,
      tagline: 'Use available case history to provide richer context during follow-up.',
      description: 'Maintains longitudinal continuity by connecting historical health records, past treatments, and current symptoms into a consolidated clinical brief.',
      formula: [
        { label: 'Previous Observations' },
        { symbol: '+' },
        { label: 'Current Case' },
        { symbol: '+' },
        { label: 'Follow-up Information' },
        { symbol: '→' },
        { label: 'Case Context', highlight: true }
      ],
      aiRole: 'Links temporal patterns & surfaces pertinent historical notes',
      humanRole: 'Practitioner reviews unified historical trajectory',
      safetyNote: 'Synthesizes past case records to assist ongoing care management.'
    },
    {
      id: 'regional',
      number: '05',
      title: 'Regional Intelligence',
      shortTitle: 'Regional',
      icon: Globe,
      tagline: 'Aggregate appropriate information to understand broader regional patterns.',
      description: 'Provides authorized veterinary authorities with aggregated, anonymized spatial indicators to observe potential regional trends and support early investigation.',
      formula: [
        { label: 'Anonymized Cases' },
        { symbol: '+' },
        { label: 'Spatial Signals' },
        { symbol: '+' },
        { label: 'Temporal Clusters' },
        { symbol: '→' },
        { label: 'Potential Regional Patterns', highlight: true }
      ],
      aiRole: 'Aggregates spatial-temporal risk indicators',
      humanRole: 'Public health authorities investigate patterns',
      safetyNote: 'Identifies potential patterns for investigation; does not confirm outbreaks.'
    },
    {
      id: 'followup',
      number: '06',
      title: 'Follow-up Intelligence',
      shortTitle: 'Follow-up',
      icon: RefreshCw,
      tagline: 'Use updated observations and case information for ongoing monitoring.',
      description: 'Supports continuous monitoring across the recovery lifecycle by tracking post-consultation observations, treatment progress, and recovery indicators over time.',
      formula: [
        { label: 'Initial Assessment' },
        { symbol: '+' },
        { label: 'Treatment Plan' },
        { symbol: '+' },
        { label: 'Updated Observations' },
        { symbol: '→' },
        { label: 'Ongoing Monitoring Context', highlight: true }
      ],
      aiRole: 'Tracks outcome trajectory & prompts follow-up check-ins',
      humanRole: 'Farmer logs progress; vet adjusts care if needed',
      safetyNote: 'Ensures case care continues beyond a single point-in-time check.'
    }
  ];

  const activeCapability = capabilities[activeTab];

  return (
    <section id="intelligence" className="py-24 md:py-32 bg-white relative overflow-hidden text-charcoal">
      {/* Background Subtle Grid Accent */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#171717 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Intro */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-[1px] bg-terracotta"></span>
            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] text-terracotta uppercase">
              VETGUARD INTELLIGENCE
            </span>
            <span className="w-8 h-[1px] bg-terracotta"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-charcoal leading-[1.15] mb-6 text-balance">
            Intelligence that turns <br className="hidden sm:block" />
            <span className="font-semibold italic text-terracotta">information into action.</span>
          </h2>

          <p className="text-base md:text-lg text-charcoal/75 font-light leading-relaxed max-w-2xl mx-auto">
            VetGuard combines reported observations, animal information, contextual signals and case history to help surface relevant health concerns and support informed decisions.
          </p>
        </motion.div>

        {/* System Data Flow Pipeline Banner */}
        <motion.div 
          className="mb-14 p-5 md:p-6 bg-warm-ivory/70 border border-border rounded-2xl max-w-5xl mx-auto shadow-sm"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-charcoal/60">
              <Cpu size={15} className="text-terracotta" />
              <span>Supporting Intelligence Layer</span>
            </div>
            
            <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-2 text-[11px] sm:text-xs font-medium text-charcoal/80 overflow-x-auto py-1">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-border shadow-2xs whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-charcoal/40"></span>
                <span>01. Input</span>
              </div>
              <ArrowRight size={12} className="text-terracotta flex-shrink-0" />
              
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-border shadow-2xs whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-charcoal/40"></span>
                <span>02. Interpret</span>
              </div>
              <ArrowRight size={12} className="text-terracotta flex-shrink-0" />

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-terracotta/10 border border-terracotta/30 text-terracotta font-semibold whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta"></span>
                <span>03. AI Assessment</span>
              </div>
              <ArrowRight size={12} className="text-terracotta flex-shrink-0" />

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-border shadow-2xs whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-charcoal/40"></span>
                <span>04. Context</span>
              </div>
              <ArrowRight size={12} className="text-terracotta flex-shrink-0" />

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-charcoal text-white font-semibold whitespace-nowrap">
                <Stethoscope size={11} className="text-terracotta" />
                <span>05. Human Action</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Capability Selector Tabs */}
        <motion.div 
          className="max-w-5xl mx-auto mb-10"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div 
            className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:justify-center"
            role="tablist"
            aria-label="VetGuard AI Capabilities"
          >
            {capabilities.map((cap, index) => {
              const Icon = cap.icon;
              const isActive = activeTab === index;
              return (
                <button
                  key={cap.id}
                  onClick={() => setActiveTab(index)}
                  role="tab"
                  id={`tab-${cap.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${cap.id}`}
                  tabIndex={0}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold tracking-wide transition-all duration-200 whitespace-nowrap border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 ${
                    isActive
                      ? 'bg-terracotta text-white border-terracotta shadow-sm'
                      : 'bg-warm-ivory/60 text-charcoal/80 border-border/80 hover:bg-warm-ivory hover:border-terracotta/40'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-white' : 'text-charcoal/60'} />
                  <span>{cap.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Central Intelligence Interactive Console */}
        <div className="max-w-5xl mx-auto">
          <motion.div 
            key={activeCapability.id}
            id={`panel-${activeCapability.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeCapability.id}`}
            className="bg-warm-ivory/50 border border-border rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
              
              {/* Left Column: Capability Details & Signal Formula */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-terracotta uppercase">
                      CAPABILITY {activeCapability.number}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
                    <span className="text-[11px] font-medium tracking-wider text-charcoal/60 uppercase">
                      Supporting Layer
                    </span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight mb-3">
                    {activeCapability.title}
                  </h3>

                  <p className="text-base font-medium text-terracotta/90 leading-relaxed italic mb-4">
                    "{activeCapability.tagline}"
                  </p>

                  <p className="text-sm md:text-base text-charcoal/75 leading-relaxed font-light">
                    {activeCapability.description}
                  </p>
                </div>

                {/* Synthesis Formula Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-border/80 shadow-2xs">
                  <div className="text-[10px] font-bold tracking-widest text-charcoal/50 uppercase mb-3 flex items-center justify-between">
                    <span>Synthesized Signal Flow</span>
                    <span className="text-terracotta">Structured Input</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
                    {activeCapability.formula.map((item, idx) => (
                      item.symbol ? (
                        <span key={idx} className="text-charcoal/40 font-bold px-0.5 text-xs">
                          {item.symbol}
                        </span>
                      ) : (
                        <span 
                          key={idx} 
                          className={`px-2.5 py-1 rounded-md font-medium text-xs border ${
                            item.highlight 
                              ? 'bg-terracotta/10 text-terracotta border-terracotta/30 font-semibold' 
                              : 'bg-warm-ivory text-charcoal/80 border-border/70'
                          }`}
                        >
                          {item.label}
                        </span>
                      )
                    ))}
                  </div>
                </div>

                {/* Roles Division Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-white border border-border/70 flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Cpu size={14} className="text-terracotta" />
                      <span className="text-[10px] font-bold tracking-wider text-charcoal/70 uppercase">AI Function</span>
                    </div>
                    <span className="text-xs text-charcoal/80 font-light leading-snug">
                      {activeCapability.aiRole}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-border/70 flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Stethoscope size={14} className="text-charcoal" />
                      <span className="text-[10px] font-bold tracking-wider text-charcoal/70 uppercase">Human Authority</span>
                    </div>
                    <span className="text-xs text-charcoal/80 font-light leading-snug">
                      {activeCapability.humanRole}
                    </span>
                  </div>
                </div>

                {/* Safety Guarantee Notice */}
                <div className="flex items-start gap-2.5 pt-1 text-xs text-charcoal/60">
                  <CheckCircle2 size={15} className="text-terracotta/80 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    <strong className="text-charcoal/80 font-semibold">Safety Boundary:</strong> {activeCapability.safetyNote}
                  </span>
                </div>
              </div>

              {/* Right Column: Central Schematic Visualization */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="relative w-full rounded-2xl bg-white border border-border p-6 shadow-sm overflow-hidden min-h-[360px] flex flex-col justify-between">
                  
                  {/* Console Header Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-border/60">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-terracotta"></div>
                      <span className="text-[11px] font-bold tracking-wider text-charcoal/70 uppercase">
                        VETGUARD CORE ENGINE
                      </span>
                    </div>
                    <span className="text-[10px] font-mono tracking-wider text-charcoal/50 uppercase px-2 py-0.5 rounded bg-warm-ivory border border-border/60">
                      STATUS: ACTIVE
                    </span>
                  </div>

                  {/* Dynamic Interactive Diagram Body */}
                  <div className="py-6 flex flex-col items-center justify-center flex-1">
                    
                    {/* Visual Schematic: Visual Analysis */}
                    {activeCapability.id === 'visual' && (
                      <div className="w-full max-w-sm space-y-4">
                        <div className="relative p-5 rounded-xl bg-warm-ivory/60 border border-border/80 flex flex-col items-center justify-center text-center">
                          <div className="w-16 h-16 rounded-2xl bg-white border border-terracotta/30 flex items-center justify-center text-terracotta mb-3 shadow-2xs relative">
                            <Scan size={30} className="animate-pulse" />
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-terracotta"></span>
                          </div>
                          <span className="text-xs font-semibold text-charcoal">Visual Feature Matrix</span>
                          <span className="text-[11px] text-charcoal/60 font-light mt-0.5">Surface geometry & anomaly scanning</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2.5 rounded-lg bg-white border border-border/80 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-terracotta"></span>
                            <span className="text-charcoal/80">Region Segmentation</span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-white border border-border/80 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-terracotta"></span>
                            <span className="text-charcoal/80">Morphology Scan</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Visual Schematic: Symptom & Context */}
                    {activeCapability.id === 'symptoms' && (
                      <div className="w-full max-w-sm space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-warm-ivory/80 border border-border/80 text-xs">
                          <span className="text-charcoal/70">Farmer Observation</span>
                          <span className="font-semibold text-charcoal">Lethargy & Appetite Shift</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-warm-ivory/80 border border-border/80 text-xs">
                          <span className="text-charcoal/70">Animal Context</span>
                          <span className="font-semibold text-charcoal">Bovine • Lactating</span>
                        </div>
                        <div className="flex items-center justify-center my-1">
                          <div className="w-7 h-7 rounded-full bg-terracotta/10 border border-terracotta/30 flex items-center justify-center text-terracotta text-xs font-bold">
                            ↓
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-terracotta/10 border border-terracotta/30 text-xs text-center">
                          <span className="font-bold text-terracotta">Correlated Risk Indicators Ready</span>
                        </div>
                      </div>
                    )}

                    {/* Visual Schematic: Risk Assessment */}
                    {activeCapability.id === 'risk' && (
                      <div className="w-full max-w-sm space-y-3">
                        <div className="text-[11px] font-bold text-charcoal/60 uppercase tracking-wider text-center mb-1">
                          Triage & Prioritization Hierarchy
                        </div>
                        <div className="space-y-2">
                          <div className="p-3 rounded-xl bg-warm-ivory/50 border border-border/60 flex items-center justify-between text-xs opacity-60">
                            <span>01 — Standard Observation</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/50">Baseline</span>
                          </div>
                          <div className="p-3 rounded-xl bg-warm-ivory/80 border border-border/80 flex items-center justify-between text-xs opacity-75">
                            <span>02 — Moderate Health Watch</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/60">Monitored</span>
                          </div>
                          <div className="p-3.5 rounded-xl bg-terracotta text-white flex items-center justify-between text-xs shadow-xs">
                            <span className="font-semibold">03 — Priority Attention</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded text-white">
                              Vet Referral
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Visual Schematic: Case Intelligence */}
                    {activeCapability.id === 'cases' && (
                      <div className="w-full max-w-sm space-y-3">
                        <div className="relative pl-6 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-border">
                          <div className="relative">
                            <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-border"></div>
                            <div className="text-[11px] text-charcoal/50">Historical Record</div>
                            <div className="text-xs font-semibold text-charcoal">Previous vaccination & baseline log</div>
                          </div>
                          <div className="relative">
                            <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-border"></div>
                            <div className="text-[11px] text-charcoal/50">Current Incident</div>
                            <div className="text-xs font-semibold text-charcoal">Reported acute observations</div>
                          </div>
                          <div className="relative">
                            <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-terracotta"></div>
                            <div className="text-[11px] text-terracotta font-semibold">Unified Context</div>
                            <div className="text-xs font-bold text-terracotta">Longitudinal record synthesized</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Visual Schematic: Regional Intelligence */}
                    {activeCapability.id === 'regional' && (
                      <div className="w-full max-w-sm space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-center text-xs">
                          <div className="p-3 rounded-xl bg-warm-ivory border border-border/70">
                            <span className="block text-[10px] uppercase tracking-wider text-charcoal/50 font-bold mb-1">Sector 01</span>
                            <span className="text-xs font-semibold text-charcoal/80">Normal Baseline</span>
                          </div>
                          <div className="p-3 rounded-xl bg-terracotta/10 border border-terracotta/30">
                            <span className="block text-[10px] uppercase tracking-wider text-terracotta font-bold mb-1">Sector 02</span>
                            <span className="text-xs font-bold text-terracotta">Pattern Signal</span>
                          </div>
                          <div className="p-3 rounded-xl bg-warm-ivory border border-border/70">
                            <span className="block text-[10px] uppercase tracking-wider text-charcoal/50 font-bold mb-1">Sector 03</span>
                            <span className="text-xs font-semibold text-charcoal/80">Normal Baseline</span>
                          </div>
                          <div className="p-3 rounded-xl bg-warm-ivory border border-border/70">
                            <span className="block text-[10px] uppercase tracking-wider text-charcoal/50 font-bold mb-1">Sector 04</span>
                            <span className="text-xs font-semibold text-charcoal/80">Normal Baseline</span>
                          </div>
                        </div>
                        <div className="text-[10px] text-center text-charcoal/50 font-medium">
                          Anonymized aggregate spatial signals for investigation
                        </div>
                      </div>
                    )}

                    {/* Visual Schematic: Follow-up Intelligence */}
                    {activeCapability.id === 'followup' && (
                      <div className="w-full max-w-sm space-y-3">
                        <div className="flex items-center justify-between text-xs pb-2 border-b border-border/60">
                          <span className="text-charcoal/70">Care Lifecycle</span>
                          <span className="font-semibold text-terracotta">Ongoing Monitoring</span>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-warm-ivory/80">
                            <CheckCircle2 size={14} className="text-terracotta" />
                            <span>Initial Concern Reported & Logged</span>
                          </div>
                          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-warm-ivory/80">
                            <CheckCircle2 size={14} className="text-terracotta" />
                            <span>Veterinary Consultation Completed</span>
                          </div>
                          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-terracotta/10 text-terracotta font-semibold border border-terracotta/30">
                            <RefreshCw size={14} className="text-terracotta animate-spin" style={{ animationDuration: '6s' }} />
                            <span>Day 7 Follow-up Checkpoint Active</span>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Console Footer Ribbon */}
                  <div className="pt-4 border-t border-border/60 flex items-center justify-between text-[11px] text-charcoal/50">
                    <div className="flex items-center gap-1.5">
                      <Layers size={13} className="text-terracotta" />
                      <span>Support Architecture</span>
                    </div>
                    <span>Non-Diagnostic System</span>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default IntelligenceSection;
