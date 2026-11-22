import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  AlertTriangle
} from 'lucide-react';

const EarlyWarningSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState(0);
  const [selectedSector, setSelectedSector] = useState('beta');

  const stages = [
    {
      id: 'observations',
      step: '01',
      title: 'Individual Observations',
      shortTitle: '01. Observations',
      tagline: 'Farmers log localized symptoms and behavioral changes.',
      description: 'The process originates when individual livestock managers notice and report unusual signs—such as appetite loss, coughing, or sudden milk drops. Each report captures time, location context, animal species, and optional photos or voice memos.',
      keyAspects: [
        'Decentralized reporting by livestock farmers',
        'Multi-modal data: images, voice memos, and notes',
        'Individual baseline history provides vital baseline context'
      ],
      caution: 'Individual reports reflect observations, not confirmed medical diagnoses.',
      mapState: 'observations'
    },
    {
      id: 'patterns',
      step: '02',
      title: 'Case Patterns',
      shortTitle: '02. Case Patterns',
      tagline: 'Organizing related reports by species, symptoms, and timing.',
      description: 'VetGuard cross-references incoming cases to recognize preliminary similarities across reporting dates, species groups, and symptom classifications, structuring the reports for orderly professional review.',
      keyAspects: [
        'Grouping by symptom similarities and species profile',
        'Temporal clustering within defined reporting windows',
        'Distinguishing isolated incidents from multiple reports'
      ],
      caution: 'Similar symptoms do not automatically indicate the same underlying disease.',
      mapState: 'patterns'
    },
    {
      id: 'signals',
      step: '03',
      title: 'Regional Signals',
      shortTitle: '03. Regional Signals',
      tagline: 'Aggregating anonymized data across geographic territories.',
      description: 'When multiple related cases occur across a shared geographic corridor, appropriately aggregated and anonymized indicators become visible to authorized veterinary authorities for macro-level spatial awareness.',
      keyAspects: [
        'Anonymized territory-level spatial aggregation',
        'Cross-sector indicator mapping without revealing farm identity',
        'Surfaces emerging signals that warrant closer examination'
      ],
      caution: 'A regional signal is an indicator for investigation, never a confirmed outbreak.',
      mapState: 'signals'
    },
    {
      id: 'investigation',
      step: '04',
      title: 'Veterinary Investigation',
      shortTitle: '04. Investigation',
      tagline: 'Professional examination and on-the-ground verification.',
      description: 'Authorized veterinary officers review aggregated signals, inspect clinical briefs, and initiate field visits or diagnostic sample collection to investigate the root cause with scientific rigor.',
      keyAspects: [
        'Human veterinary review remains strictly indispensable',
        'Field inspection, biological sampling, and lab testing',
        'Correlating local environmental and feed factors'
      ],
      caution: 'Only licensed veterinarians and diagnostic laboratories can confirm disease.',
      mapState: 'investigation'
    },
    {
      id: 'response',
      step: '05',
      title: 'Informed Response',
      shortTitle: '05. Informed Action',
      tagline: 'Coordinated awareness, advisory distribution, and resource support.',
      description: 'Verified findings allow veterinary departments and farm communities to take targeted preventive actions—such as distributing health advisories, mobilizing mobile veterinary dispensaries, or coordinating vaccine reserves.',
      keyAspects: [
        'Targeted local veterinary advisories to farmers',
        'Proactive deployment of pharmaceutical & clinical resources',
        'Continuous monitoring to evaluate intervention efficacy'
      ],
      caution: 'VetGuard supports human decision-making; it does not claim autonomous disease prevention.',
      mapState: 'response'
    }
  ];

  const sectors = [
    { id: 'alpha', code: 'SEC-01', name: 'Sector Alpha', sub: 'North Dairy Corridor', hasAlert: false },
    { id: 'beta', code: 'SEC-02 [ALERT]', name: 'Sector Beta', sub: 'Central Grazing Plains', hasAlert: true },
    { id: 'gamma', code: 'SEC-03', name: 'Sector Gamma', sub: 'Eastern River Valley', hasAlert: false },
    { id: 'delta', code: 'SEC-04', name: 'Sector Delta', sub: 'South Pastoral Zone', hasAlert: false }
  ];

  const currentStage = stages[activeStage];

  return (
    <section id="early-warning" className="py-24 md:py-32 bg-dark relative overflow-hidden text-warm-ivory border-t border-white/10">
      {/* Background Subtle Spatial Contour Effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(#F7F3ED 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-terracotta/10 rounded-full blur-[140px] pointer-events-none" />

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
              Early Warning & Regional Awareness
            </span>
            <span className="w-8 h-[1px] bg-terracotta"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.15] mb-6 text-balance">
            Recognize emerging signals. <br className="hidden sm:block" />
            <span className="font-semibold italic text-terracotta">Support earlier awareness.</span> <br className="hidden sm:block" />
            Enable informed action.
          </h2>

          <p className="text-base md:text-lg text-white/70 font-light leading-relaxed max-w-2xl mx-auto">
            By organizing individual observations into aggregated spatial context, VetGuard helps authorized veterinary officers identify potential patterns early — supporting investigation before widespread disruption occurs.
          </p>
        </motion.div>

        {/* 5-Stage Interactive Progression Stepper Bar */}
        <motion.div 
          className="max-w-5xl mx-auto mb-12"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div 
            className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none md:justify-center"
            role="tablist"
            aria-label="Early Warning Progression Stages"
          >
            {stages.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(idx)}
                  role="tab"
                  id={`early-tab-${stage.id}`}
                  aria-selected={isActive}
                  aria-controls={`early-panel-${stage.id}`}
                  tabIndex={0}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 whitespace-nowrap border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta ${
                    isActive
                      ? 'bg-terracotta text-white border-terracotta shadow-md'
                      : 'bg-charcoal/80 text-white/70 border-white/10 hover:bg-charcoal hover:text-white hover:border-terracotta/40'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center transition-colors ${
                    isActive ? 'bg-white text-charcoal' : 'bg-white/10 text-white/70'
                  }`}>
                    {stage.step}
                  </span>
                  <span>{stage.title}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center justify-center gap-2 mt-3 text-xs text-white/50">
            <span className="font-semibold text-terracotta">{currentStage.title}</span>
            <span>•</span>
            <span>Phase {activeStage + 1} of 5 in the Awareness Progression</span>
          </div>
        </motion.div>

        {/* Main Composition: Conceptual Territory Map + Dynamic Briefing Console */}
        <div 
          id={`early-panel-${currentStage.id}`}
          role="tabpanel"
          aria-labelledby={`early-tab-${currentStage.id}`}
          className="max-w-6xl mx-auto mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Conceptual Abstract Geographic Map Canvas (7 cols) */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-3xl bg-charcoal/90 border border-white/10 shadow-2xl relative overflow-hidden">
                
                {/* Map Console Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2.5">
                    <Compass size={16} className="text-terracotta" />
                    <div>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-terracotta block">
                        SPATIAL INTELLIGENCE CONSOLE
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        Territory Signal Monitor (Illustrative)
                      </h4>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60">
                    ANONYMIZED GRID
                  </span>
                </div>

                {/* Conceptual Vector Territory Canvas */}
                <div className="relative w-full h-[320px] sm:h-[380px] bg-dark/60 rounded-2xl border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
                  
                  {/* Decorative Coordinate Grid Lines & Contours */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    {/* Abstract Topo Contours */}
                    <path d="M 50 100 Q 180 50 320 120 T 550 110" fill="none" stroke="rgba(182,95,69,0.4)" strokeWidth="1" strokeDasharray="3 3" />
                    <path d="M 30 220 Q 200 180 340 240 T 570 200" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                    <path d="M 80 320 Q 240 280 400 310 T 540 320" fill="none" stroke="rgba(182,95,69,0.3)" strokeWidth="1" strokeDasharray="2 2" />
                  </svg>

                  {/* Territory Sectors Grid Interactive Layout */}
                  <div className="relative z-10 grid grid-cols-2 gap-4 h-full">
                    {sectors.map((sec) => {
                      const isSelected = selectedSector === sec.id;
                      return (
                        <button 
                          key={sec.id}
                          onClick={() => setSelectedSector(sec.id)}
                          className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between relative overflow-hidden ${
                            sec.hasAlert
                              ? isSelected
                                ? 'bg-terracotta/20 border-terracotta ring-1 ring-terracotta'
                                : 'bg-terracotta/10 border-terracotta/30 hover:bg-terracotta/15'
                              : isSelected
                                ? 'bg-white/10 border-terracotta/60 ring-1 ring-terracotta'
                                : 'bg-white/5 border-white/5 hover:bg-white/8'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-[10px] font-mono ${sec.hasAlert ? 'text-terracotta font-semibold' : 'text-white/50'}`}>
                              {sec.code}
                            </span>
                            <span className={`w-2.5 h-2.5 rounded-full ${sec.hasAlert ? 'bg-terracotta animate-pulse' : 'bg-white/30'}`}></span>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white flex items-center gap-1.5">
                              <span>{sec.name}</span>
                              {sec.hasAlert && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] bg-terracotta text-white font-bold">Signal</span>
                              )}
                            </div>
                            <div className="text-[10px] text-white/60">{sec.sub}</div>
                          </div>
                          <div className={`text-[9px] font-mono pt-1 border-t ${sec.hasAlert ? 'text-terracotta font-semibold border-terracotta/20' : 'text-white/40 border-white/5'}`}>
                            {sec.hasAlert 
                              ? (activeStage >= 3 ? 'Veterinary Investigation Active' : 'Symptom Cluster Under Review')
                              : 'Status: Normal Baseline'
                            }
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Interactive Map Status Legend Bar */}
                  <div className="relative z-10 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] text-white/60">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-white/30"></span>
                        <span>Baseline (Normal)</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-terracotta"></span>
                        <span>Correlated Signal Flag</span>
                      </span>
                    </div>
                    <span className="font-mono text-white/40">5km² Spatial Grid Smoothing</span>
                  </div>

                </div>

                {/* Disclaimer Footnote */}
                <div className="mt-4 flex items-center justify-between text-[11px] text-white/40">
                  <span>* Conceptual visualization based on simulated territory scenarios.</span>
                  <span className="text-terracotta">Non-Diagnostic System</span>
                </div>

              </div>
            </div>

            {/* Right: Dynamic Stage Explanation & Triage Protocol (5 cols) */}
            <motion.div 
              key={`stage-details-${currentStage.id}`}
              className="lg:col-span-5 space-y-6"
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-bold tracking-[0.2em] text-terracotta uppercase">
                    STAGE {currentStage.step} OF 05
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                  <span className="text-[11px] font-semibold tracking-wider text-white/60 uppercase">
                    Awareness Lifecycle
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                  {currentStage.title}
                </h3>

                <p className="text-sm font-medium text-terracotta leading-relaxed italic mb-4">
                  "{currentStage.tagline}"
                </p>

                <p className="text-sm text-white/75 leading-relaxed font-light">
                  {currentStage.description}
                </p>
              </div>

              {/* Core Aspects Breakdown */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1 flex items-center justify-between">
                  <span>Key Principles at this Stage</span>
                  <span className="text-terracotta">Phase {currentStage.step}</span>
                </div>

                {currentStage.keyAspects.map((aspect, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-white/80">
                    <div className="w-4 h-4 rounded-full bg-terracotta/20 text-terracotta flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 size={11} />
                    </div>
                    <span className="leading-snug">{aspect}</span>
                  </div>
                ))}
              </div>

              {/* Human Authority Caution Card */}
              <div className="p-4 rounded-2xl bg-charcoal border border-terracotta/30 flex items-start gap-3">
                <AlertTriangle size={16} className="text-terracotta flex-shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <strong className="text-white font-semibold block mb-0.5">Scientific Restraint:</strong>
                  <span className="text-white/70 font-light">{currentStage.caution}</span>
                </div>
              </div>

              {/* Step Navigation Button */}
              <div className="pt-2">
                <button 
                  onClick={() => setActiveStage((prev) => (prev + 1) % stages.length)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-terracotta hover:bg-terracotta/90 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Advance to {stages[(activeStage + 1) % stages.length].title}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>

          </div>
        </div>

        {/* The 4 Trust, Science & Safety Pillars */}
        <div className="max-w-6xl mx-auto pt-8 border-t border-white/10">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-[0.2em] text-terracotta uppercase block mb-2">
              Scientific Boundaries
            </span>
            <h3 className="text-2xl font-bold text-white">
              Guiding Principles of Early Warning
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            
            <div className="p-5 rounded-2xl bg-charcoal border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-terracotta font-mono font-bold text-xs block mb-1">01 / Observation</span>
                <h4 className="text-sm font-bold text-white mb-2">Observation ≠ Confirmation</h4>
                <p className="text-white/70 font-light leading-relaxed">
                  An initial symptom report captures observed changes. Verified diagnosis strictly requires clinical examination and laboratory assays.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-charcoal border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-terracotta font-mono font-bold text-xs block mb-1">02 / Patterns</span>
                <h4 className="text-sm font-bold text-white mb-2">Pattern ≠ Outbreak</h4>
                <p className="text-white/70 font-light leading-relaxed">
                  Similar symptoms can arise from concurrent weather changes, seasonal forage shifts, or localized feeding issues. Human investigation separates coincidence from pathology.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-charcoal border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-terracotta font-mono font-bold text-xs block mb-1">03 / Human Authority</span>
                <h4 className="text-sm font-bold text-white mb-2">AI Assistance ≠ Clinical Judgment</h4>
                <p className="text-white/70 font-light leading-relaxed">
                  VetGuard organizes incoming observational signals to assist public health veterinarians; it never replaces expert veterinary epidemiological investigation.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-charcoal border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-terracotta font-mono font-bold text-xs block mb-1">04 / Privacy</span>
                <h4 className="text-sm font-bold text-white mb-2">Anonymized Spatial Aggregation</h4>
                <p className="text-white/70 font-light leading-relaxed">
                  Regional awareness operates on aggregated spatial smoothing. Individual farm locations and private herd files remain protected against unauthorized viewing.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Mandatory Safety Notice */}
        <div className="mt-12 text-center max-w-3xl mx-auto">
          <p className="text-[11px] text-white/40 leading-relaxed font-light">
            * <strong className="text-white/60">Important Notice:</strong> Early warning capabilities represent an assistive spatial-awareness framework. VetGuard AI does not provide automatic outbreak prediction, guaranteed disease forecasting, or replacement for statutory government veterinary diagnostic services.
          </p>
        </div>

      </div>
    </section>
  );
};

export default EarlyWarningSection;