import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  User, 
  Stethoscope, 
  Building2, 
  Cpu, 
  ArrowRight, 
  ArrowLeftRight, 
  ShieldCheck, 
  Globe, 
  Lock, 
  CheckCircle2, 
  Workflow
} from 'lucide-react';

const EcosystemSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeStakeholder, setActiveStakeholder] = useState('all');

  const lifecycleStages = [
    {
      step: '01',
      title: 'OBSERVE',
      actor: 'Farmer',
      desc: 'Farmer notices initial anomalies in animal behavior, feeding patterns, or physical appearance.'
    },
    {
      step: '02',
      title: 'REPORT',
      actor: 'Farmer',
      desc: 'Observations, voice memos, captured photos, and contextual records are structured.'
    },
    {
      step: '03',
      title: 'ASSESS',
      actor: 'VetGuard AI',
      desc: 'The platform organizes data, references animal history, and prepares a non-diagnostic triage brief.'
    },
    {
      step: '04',
      title: 'REVIEW',
      actor: 'Veterinarian',
      desc: 'A licensed veterinary clinician examines the case, diagnoses condition, and issues clinical orders.'
    },
    {
      step: '05',
      title: 'FOLLOW UP',
      actor: 'Farmer & Vet',
      desc: 'Recovery milestones are tracked over subsequent days, maintaining care continuity to full resolution.'
    }
  ];

  const stakeholderDetails = {
    all: {
      title: 'Integrated Care & Oversight Network',
      subtitle: 'Seamless collaboration across farm, clinic, and regional administration',
      desc: 'VetGuard AI unites all livestock health participants into one coordinated workflow. Farmers initiate observations, veterinarians deliver authoritative medical treatment, and veterinary departments monitor regional risk patterns—all while maintaining clear boundaries of responsibility.',
      flows: [
        'Farmers relay observations & media directly into the system',
        'AI structures intake and generates clinical case briefs for veterinarians',
        'Veterinarians return care protocols and follow-up instructions to farmers',
        'Aggregated, anonymized spatial indicators support authorized regional oversight'
      ]
    },
    farmer: {
      title: 'Farmer — The Observation Originator',
      subtitle: 'First line of defense in animal health management',
      desc: 'Livestock farmers observe their herds daily. VetGuard provides them with low-friction tools to digitize animal records, record observed symptoms without medical jargon, and securely share structured case files with veterinary dispensaries.',
      flows: [
        'Maintains individual animal profiles, ear tag IDs, and health history',
        'Logs multi-modal observations via voice notes, photography, and text',
        'Receives preliminary AI-assisted triage context before clinical visits',
        'Logs follow-up checkpoints during post-treatment recovery'
      ]
    },
    vet: {
      title: 'Veterinarian — Professional Medical Authority',
      subtitle: 'Exclusive decision-maker for clinical diagnosis and treatment',
      desc: 'Veterinarians receive pre-organized, prioritized case briefs complete with symptom history, photos, and contextual vitals. This eliminates guesswork, accelerates triage, and ensures all medical decisions remain strictly in professional hands.',
      flows: [
        'Reviews incoming cases prioritized by urgency and risk indicators',
        'Inspects high-resolution imagery and historical baseline vitals',
        'Communicates treatment instructions or schedules on-farm visits',
        'Authorizes prescriptions and records official clinical outcomes'
      ]
    },
    authority: {
      title: 'Veterinary Authority — Regional Oversight',
      subtitle: 'Public health monitoring and strategic resource allocation',
      desc: 'Authorized regional veterinary officers and public health departments gain macro-level visibility into aggregated spatial patterns, helping track potential disease clusters and plan vaccine or clinical staffing deployments.',
      flows: [
        'Monitors anonymized regional disease trends across districts',
        'Identifies potential geographic clusters requiring field investigation',
        'Allocates mobile veterinary units and pharmaceutical supplies',
        'Operates with strict privacy controls—no unwarranted access to private farm data'
      ]
    }
  };

  const currentDetail = stakeholderDetails[activeStakeholder];

  return (
    <section id="ecosystem" className="py-24 md:py-32 bg-warm-ivory relative overflow-hidden border-t border-border/60 text-charcoal">
      {/* Subtle Background Grid Accent */}
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
              Connected Health Ecosystem
            </span>
            <span className="w-8 h-[1px] bg-terracotta"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-charcoal leading-[1.15] mb-6 text-balance">
            One connected ecosystem. <br className="hidden sm:block" />
            <span className="font-semibold italic text-terracotta">Better-informed decisions.</span> <br className="hidden sm:block" />
            Continuous livestock care.
          </h2>

          <p className="text-base md:text-lg text-charcoal/75 font-light leading-relaxed max-w-2xl mx-auto">
            VetGuard links farmers, veterinary clinicians, and authorized animal-health departments into a coordinated care network — respecting professional authority and distinct operational boundaries.
          </p>
        </motion.div>

        {/* Stakeholder Perspective Selector Tabs */}
        <motion.div 
          className="max-w-4xl mx-auto mb-12 flex justify-center"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div 
            className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-border shadow-xs overflow-x-auto max-w-full scrollbar-none"
            role="tablist"
            aria-label="Ecosystem Stakeholder Perspectives"
          >
            {[
              { id: 'all', label: 'Full Ecosystem', icon: Workflow },
              { id: 'farmer', label: 'Farmer Flow', icon: User },
              { id: 'vet', label: 'Veterinary Loop', icon: Stethoscope },
              { id: 'authority', label: 'Regional Oversight', icon: Building2 }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeStakeholder === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveStakeholder(tab.id)}
                  role="tab"
                  id={`eco-tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`eco-panel-${tab.id}`}
                  tabIndex={0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta ${
                    isActive
                      ? 'bg-charcoal text-white shadow-2xs'
                      : 'text-charcoal/70 hover:text-charcoal hover:bg-warm-ivory/80'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-terracotta' : 'text-charcoal/50'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Central Connected Ecosystem Visualization Panel */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-white/90 backdrop-blur-sm border border-border rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm relative overflow-hidden">
            
            {/* Top Diagram: Primary Triangular / Flow System */}
            <div className="relative">
              
              {/* Desktop/Tablet Horizontal Relationship Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-center">
                
                {/* 1. Farmer Node (Left) */}
                <motion.div 
                  className={`md:col-span-4 p-5 sm:p-6 rounded-2xl border transition-all duration-300 relative z-10 ${
                    activeStakeholder === 'farmer' || activeStakeholder === 'all'
                      ? 'bg-white border-terracotta/40 shadow-sm ring-1 ring-terracotta/30'
                      : 'bg-warm-ivory/50 border-border/80 opacity-60'
                  }`}
                  animate={{ scale: activeStakeholder === 'farmer' ? 1.02 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-terracotta">
                      PARTICIPANT 01
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-warm-ivory border border-border flex items-center justify-center text-terracotta">
                      <User size={16} />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-charcoal mb-1">Livestock Farmers</h3>
                  <p className="text-xs font-semibold text-charcoal/60 mb-3">Source of Observations</p>
                  
                  <p className="text-xs text-charcoal/75 leading-relaxed font-light mb-4">
                    Initiates the care workflow by recording symptoms, capturing photos, and providing real-time herd context.
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-border/60 text-[11px] text-charcoal/70">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta"></span>
                      <span>Digital herd registry & history</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta"></span>
                      <span>Multi-modal intake (Voice/Photo)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta"></span>
                      <span>Logs post-treatment follow-up</span>
                    </div>
                  </div>
                </motion.div>

                {/* Central Connector: Farmer -> AI -> Vet (Desktop) */}
                <div className="hidden md:flex md:col-span-4 flex-col items-center justify-center px-2 py-4 relative">
                  
                  {/* VetGuard AI Core Center Hub */}
                  <motion.div 
                    className="w-full p-5 rounded-2xl bg-charcoal text-white border border-charcoal shadow-float text-center relative z-20"
                    animate={{ scale: activeStakeholder === 'all' ? 1.02 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-terracotta mx-auto mb-2">
                      <Cpu size={18} />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-terracotta block mb-1">
                      COORDINATION HUB
                    </span>
                    <h4 className="text-sm font-bold text-white mb-1">VetGuard AI Engine</h4>
                    <p className="text-[11px] text-white/70 font-light leading-snug">
                      Signal synthesis & structured triage. Connects farmer observations directly with veterinary clinicians.
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-center gap-2 text-[10px] text-white/50">
                      <ShieldCheck size={12} className="text-terracotta" />
                      <span>Non-Diagnostic Assistive Layer</span>
                    </div>
                  </motion.div>

                  {/* Flow Indicators Above / Below */}
                  <div className="w-full flex items-center justify-between text-[10px] font-mono text-charcoal/50 mt-3 px-1">
                    <div className="flex items-center gap-1">
                      <span>Intake</span>
                      <ArrowRight size={10} className="text-terracotta" />
                    </div>
                    <div className="flex items-center gap-1">
                      <ArrowLeftRight size={10} className="text-terracotta" />
                      <span>Care Loop</span>
                    </div>
                  </div>

                </div>

                {/* 2. Veterinarian Node (Right) */}
                <motion.div 
                  className={`md:col-span-4 p-5 sm:p-6 rounded-2xl border transition-all duration-300 relative z-10 ${
                    activeStakeholder === 'vet' || activeStakeholder === 'all'
                      ? 'bg-white border-terracotta/40 shadow-sm ring-1 ring-terracotta/30'
                      : 'bg-warm-ivory/50 border-border/80 opacity-60'
                  }`}
                  animate={{ scale: activeStakeholder === 'vet' ? 1.02 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-terracotta">
                      PARTICIPANT 02
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-warm-ivory border border-border flex items-center justify-center text-terracotta">
                      <Stethoscope size={16} />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-charcoal mb-1">Veterinarians</h3>
                  <p className="text-xs font-semibold text-charcoal/60 mb-3">Professional Medical Authority</p>
                  
                  <p className="text-xs text-charcoal/75 leading-relaxed font-light mb-4">
                    Examines prioritized case packets, delivers authoritative medical judgment, and oversees care plans.
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-border/60 text-[11px] text-charcoal/70">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta"></span>
                      <span>Review prioritized clinical briefs</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta"></span>
                      <span>Direct treatment & prescription orders</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta"></span>
                      <span>Exclusive diagnostic authority</span>
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Mobile AI Engine Stack (Visible only on small screens) */}
              <div className="md:hidden my-4 p-4 rounded-2xl bg-charcoal text-white text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Cpu size={16} className="text-terracotta" />
                  <span className="text-xs font-bold text-white">VetGuard AI Hub</span>
                </div>
                <p className="text-xs text-white/70 font-light">
                  Coordinates data intake from farmers and routes structured briefs to attending veterinarians.
                </p>
              </div>

              {/* Connecting Conduit to Regional Authorities (Downward Vector) */}
              <div className="my-6 flex flex-col items-center justify-center">
                <div className="w-[1.5px] h-8 bg-gradient-to-b from-charcoal/40 to-terracotta"></div>
                <div className="px-3 py-1 rounded-full bg-warm-ivory border border-border text-[10px] font-mono text-charcoal/70 flex items-center gap-1.5 -my-1 z-10 shadow-2xs">
                  <Lock size={10} className="text-terracotta" />
                  <span>Anonymized & Aggregated Spatial Conduit</span>
                </div>
                <div className="w-[1.5px] h-8 bg-gradient-to-b from-terracotta to-border"></div>
              </div>

              {/* 3. Veterinary Authority Node (Bottom - Regional Oversight) */}
              <motion.div 
                className={`max-w-3xl mx-auto p-5 sm:p-6 rounded-2xl border transition-all duration-300 relative z-10 ${
                  activeStakeholder === 'authority' || activeStakeholder === 'all'
                    ? 'bg-white border-terracotta/40 shadow-sm ring-1 ring-terracotta/30'
                    : 'bg-warm-ivory/50 border-border/80 opacity-60'
                }`}
                animate={{ scale: activeStakeholder === 'authority' ? 1.02 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-warm-ivory border border-border flex items-center justify-center text-terracotta">
                      <Building2 size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-terracotta block">
                        PARTICIPANT 03 • MACRO OVERSIGHT
                      </span>
                      <h3 className="text-lg font-bold text-charcoal">Authorized Veterinary Authorities</h3>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-warm-ivory border border-border text-charcoal/60 self-start sm:self-auto">
                    District & Regional Level
                  </span>
                </div>

                <p className="text-xs text-charcoal/75 leading-relaxed font-light mb-4">
                  Veterinary departments and public health officers monitor high-level aggregated signals to detect spatial trends, investigate potential clusters, and mobilize field support.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-border/60 text-[11px] text-charcoal/70">
                  <div className="flex items-center gap-1.5">
                    <Globe size={13} className="text-terracotta flex-shrink-0" />
                    <span>Spatial pattern mapping</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-terracotta flex-shrink-0" />
                    <span>Outbreak investigation support</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Lock size={13} className="text-terracotta flex-shrink-0" />
                    <span>Private farm data protected</span>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>
        </div>

        {/* Selected Stakeholder Detail Callout Card */}
        <motion.div 
          key={`detail-${activeStakeholder}`}
          className="max-w-4xl mx-auto mb-20 p-6 sm:p-8 rounded-3xl bg-white border border-border shadow-xs"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold tracking-[0.2em] text-terracotta uppercase">
              Role & Information Pathways
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
            <span className="text-[11px] font-semibold text-charcoal/60 uppercase">
              {currentDetail.subtitle}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-charcoal mb-3">
            {currentDetail.title}
          </h3>

          <p className="text-sm sm:text-base text-charcoal/75 leading-relaxed font-light mb-6">
            {currentDetail.desc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-border/70">
            {currentDetail.flows.map((flow, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-charcoal/80">
                <div className="w-4 h-4 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ArrowRight size={10} />
                </div>
                <span className="leading-snug">{flow}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Collaboration Lifecycle Sequence: OBSERVE -> REPORT -> ASSESS -> REVIEW -> FOLLOW UP */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-[0.2em] text-terracotta uppercase block mb-2">
              Case Progression Lifecycle
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-charcoal">
              From First Observation to Resolution
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {lifecycleStages.map((stage) => (
              <div 
                key={stage.step}
                className="p-4 rounded-2xl bg-white border border-border/80 flex flex-col justify-between relative group hover:border-terracotta/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono text-terracotta">{stage.step}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-warm-ivory text-charcoal/60">
                      {stage.actor}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-charcoal mb-1.5">{stage.title}</h4>
                  <p className="text-xs text-charcoal/70 font-light leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-border/50 text-[10px] font-semibold text-terracotta flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Continuous Care</span>
                  <ArrowRight size={10} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust, Privacy, and Responsibility Matrix */}
        <div className="max-w-5xl mx-auto p-6 sm:p-8 rounded-3xl bg-warm-ivory/70 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={18} className="text-terracotta" />
            <h3 className="text-base sm:text-lg font-bold text-charcoal">
              Trust, Privacy & Responsibility Framework
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-white border border-border/70">
              <span className="font-bold text-charcoal block mb-1">01. Observation Source</span>
              <p className="text-charcoal/70 font-light leading-relaxed">
                Farmers supply observational signals and context. Data is utilized strictly to facilitate their animal's care.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-border/70">
              <span className="font-bold text-charcoal block mb-1">02. Assistive AI Boundary</span>
              <p className="text-charcoal/70 font-light leading-relaxed">
                AI organizes signals and evaluates potential indicators; it never issues autonomous medical prescriptions.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-border/70">
              <span className="font-bold text-charcoal block mb-1">03. Exclusive Medical Authority</span>
              <p className="text-charcoal/70 font-light leading-relaxed">
                Licensed veterinarians retain complete legal and clinical responsibility for diagnosis and treatment plans.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-border/70">
              <span className="font-bold text-charcoal block mb-1">04. Aggregated Regional Privacy</span>
              <p className="text-charcoal/70 font-light leading-relaxed">
                Oversight bodies analyze anonymized spatial trends; private farm records require statutory authorization.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EcosystemSection;