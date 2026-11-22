import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  Tag, 
  Camera, 
  Mic, 
  Cpu, 
  Stethoscope, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  PhoneCall, 
  MessageSquare, 
  ArrowRight, 
  PlusCircle, 
  ShieldCheck, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

const FarmerExperience = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: 'profiles',
      step: '01',
      title: 'Animal Profiles',
      navLabel: 'Animal Profiles',
      journeyMilestone: 'Know Your Animals',
      summary: 'Keep organized digital profiles for every animal in your herd, preserving health baselines and previous observations in one accessible place.',
      fieldHighlights: [
        'Ear tag & RFID-linked identification',
        'Species, breed & lactation cycle tracking',
        'Longitudinal health history & past checkups'
      ],
      fieldInsight: 'Built for fast field lookup even in low-connectivity sheds, allowing quick baseline comparisons before reporting concerns.',
      safetyDisclaimer: 'Sample livestock record for demonstration. Real deployments link with official ear tags and farm herd registries.'
    },
    {
      id: 'report',
      step: '02',
      title: 'Report a Concern',
      navLabel: 'Report Concern',
      journeyMilestone: 'Report a Concern',
      summary: 'Log observed abnormalities quickly through voice notes, captured photos, or typed notes without cumbersome paperwork or medical jargon.',
      fieldHighlights: [
        'Multi-modal reporting: Voice, Photo, or Text',
        'Automatic timestamp & environmental context tagging',
        'One-tap animal selection from your existing herd'
      ],
      fieldInsight: 'Hands-free voice recording allows farmers to describe symptoms naturally while examining the animal in the pen.',
      safetyDisclaimer: 'Observations are structured for veterinary review. Reporting does not initiate autonomous medicinal prescriptions.'
    },
    {
      id: 'assessment',
      step: '03',
      title: 'AI-Assisted Assessment',
      navLabel: 'AI Assessment',
      journeyMilestone: 'Understand the Assessment',
      summary: 'VetGuard synthesizes observations against animal history and known risk patterns to surface potential health concerns and suggest triage urgency.',
      fieldHighlights: [
        'Structured observation breakdown & key signal flags',
        'Suggested triage urgency: Baseline vs. Priority Attention',
        'Prepared clinical brief ready for veterinary transmission'
      ],
      fieldInsight: 'Helps farmers prioritize which cases require urgent professional attention versus those that can be safely monitored.',
      safetyDisclaimer: 'Non-diagnostic triage assistance. All indicators are preliminary and require evaluation by a licensed veterinarian.'
    },
    {
      id: 'veterinary',
      step: '04',
      title: 'Veterinary Support',
      navLabel: 'Connect with Vet',
      journeyMilestone: 'Connect with a Veterinarian',
      summary: 'Directly transmit the structured case file to your local veterinarian or veterinary dispensary for professional review, guidance, or scheduling.',
      fieldHighlights: [
        'Instant case transmission with photos & symptom audio',
        'Attending veterinarian review status & callback updates',
        'Direct call & messaging channel with your veterinary officer'
      ],
      fieldInsight: 'Vets arrive on-farm already informed with the animal’s profile, photos, and vitals history, saving critical time.',
      safetyDisclaimer: 'All diagnosis, treatment plans, and prescriptions remain the sole legal authority of licensed veterinary professionals.'
    },
    {
      id: 'monitoring',
      step: '05',
      title: 'Follow-up & Monitoring',
      navLabel: 'Track Progress',
      journeyMilestone: 'Track Progress',
      summary: 'Track patient recovery over time with simple follow-up checkpoints, logging post-treatment updates to close the loop on every health concern.',
      fieldHighlights: [
        'Day-by-day recovery milestone checkpoints',
        'Quick logging of temperature, milk yield, & feed intake',
        'Case closed or escalated based on follow-up observations'
      ],
      fieldInsight: 'Prevents cases from being forgotten after treatment, ensuring complications are flagged early before relapses occur.',
      safetyDisclaimer: 'Follow-up logs maintain continuity for subsequent veterinary visits and ongoing herd productivity records.'
    }
  ];

  const currentStage = stages[activeStage];

  return (
    <section id="farmer-experience" className="py-24 md:py-32 bg-white relative overflow-hidden text-charcoal">
      {/* Subtle Warm Background Gradient Accent */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(#B65F45 1px, transparent 1px)',
          backgroundSize: '28px 28px'
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
              Farmer Experience
            </span>
            <span className="w-8 h-[1px] bg-terracotta"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-charcoal leading-[1.15] mb-6 text-balance">
            Designed for the field, <br className="hidden sm:block" />
            <span className="font-semibold italic text-terracotta">built for rapid care.</span>
          </h2>

          <p className="text-base md:text-lg text-charcoal/75 font-light leading-relaxed max-w-2xl mx-auto">
            From individual herd profiles to instant concern intake and veterinary continuity, VetGuard gives livestock managers a practical, low-friction tool right on their mobile device.
          </p>
        </motion.div>

        {/* 5-Stage Interactive Journey Stepper Bar */}
        <motion.div 
          className="max-w-5xl mx-auto mb-14"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div 
            className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none md:justify-center"
            role="tablist"
            aria-label="Farmer Experience Workflow Stages"
          >
            {stages.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(idx)}
                  role="tab"
                  id={`farmer-tab-${stage.id}`}
                  aria-selected={isActive}
                  aria-controls={`farmer-panel-${stage.id}`}
                  tabIndex={0}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide transition-all duration-200 whitespace-nowrap border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 ${
                    isActive
                      ? 'bg-charcoal text-white border-charcoal shadow-sm'
                      : 'bg-warm-ivory/70 text-charcoal/80 border-border hover:bg-warm-ivory hover:border-terracotta/40'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center transition-colors ${
                    isActive ? 'bg-terracotta text-white' : 'bg-charcoal/10 text-charcoal/70'
                  }`}>
                    {stage.step}
                  </span>
                  <span>{stage.navLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Stepper Progress Subtitle */}
          <div className="hidden sm:flex items-center justify-center gap-2 mt-3 text-xs text-charcoal/50">
            <span className="font-semibold text-terracotta">{currentStage.journeyMilestone}</span>
            <span>•</span>
            <span>Step {activeStage + 1} of 5 in the VetGuard Farmer Care Lifecycle</span>
          </div>
        </motion.div>

        {/* Product Showcase Composition: Sidebar Details + Central Mockup */}
        <div 
          id={`farmer-panel-${currentStage.id}`}
          role="tabpanel"
          aria-labelledby={`farmer-tab-${currentStage.id}`}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Contextual Stage Brief & Capabilities */}
            <motion.div 
              key={`details-${currentStage.id}`}
              className="lg:col-span-5 space-y-6 order-2 lg:order-1"
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-bold tracking-[0.2em] text-terracotta uppercase">
                    STAGE {currentStage.step}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
                  <span className="text-[11px] font-semibold tracking-wider text-charcoal/60 uppercase">
                    {currentStage.journeyMilestone}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight mb-3">
                  {currentStage.title}
                </h3>

                <p className="text-base text-charcoal/75 leading-relaxed font-light">
                  {currentStage.summary}
                </p>
              </div>

              {/* Key Highlights List */}
              <div className="space-y-3 pt-1">
                {currentStage.fieldHighlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-charcoal/85">
                    <div className="w-5 h-5 rounded-full bg-terracotta/10 border border-terracotta/30 flex items-center justify-center text-terracotta flex-shrink-0 mt-0.5">
                      <CheckCircle2 size={12} />
                    </div>
                    <span className="font-medium leading-snug">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Practical Field Insight Card */}
              <div className="p-4 rounded-2xl bg-warm-ivory border border-border/80">
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles size={14} className="text-terracotta" />
                  <span className="text-[11px] font-bold tracking-wider text-charcoal/70 uppercase">
                    Practical Field Value
                  </span>
                </div>
                <p className="text-xs text-charcoal/70 font-light leading-relaxed">
                  {currentStage.fieldInsight}
                </p>
              </div>

              {/* Safety & Compliance Notice */}
              <div className="flex items-start gap-2.5 pt-2 text-xs text-charcoal/60 border-t border-border/60">
                <ShieldCheck size={15} className="text-terracotta/80 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong className="text-charcoal/80 font-semibold">Care Standard:</strong> {currentStage.safetyDisclaimer}
                </span>
              </div>
            </motion.div>

            {/* Right Column: Central Phone Interface Mockup with Surrounding Micro-Cards */}
            <div className="lg:col-span-7 flex justify-center relative order-1 lg:order-2 py-4">
              
              {/* Contextual Floating Card: Top-Left (Desktop/Tablet) */}
              <motion.div 
                key={`badge-top-${currentStage.id}`}
                className="hidden md:flex absolute -top-4 -left-4 z-20 p-3.5 rounded-2xl bg-white border border-border shadow-float items-center gap-3 max-w-[220px]"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="w-9 h-9 rounded-xl bg-warm-ivory border border-border flex items-center justify-center text-terracotta flex-shrink-0">
                  {activeStage === 0 && <Tag size={16} />}
                  {activeStage === 1 && <Camera size={16} />}
                  {activeStage === 2 && <Cpu size={16} />}
                  {activeStage === 3 && <Stethoscope size={16} />}
                  {activeStage === 4 && <RefreshCw size={16} />}
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-bold tracking-wider text-charcoal/50 uppercase">Active State</div>
                  <div className="text-xs font-bold text-charcoal leading-tight truncate">
                    {activeStage === 0 && 'Tag #VG-804 Verified'}
                    {activeStage === 1 && 'Multimodal Intake'}
                    {activeStage === 2 && 'Priority: Clinical Eval'}
                    {activeStage === 3 && 'Relayed to Dr. Kumar'}
                    {activeStage === 4 && 'Recovery Logged'}
                  </div>
                </div>
              </motion.div>

              {/* Contextual Floating Card: Bottom-Right (Desktop/Tablet) */}
              <motion.div 
                key={`badge-bot-${currentStage.id}`}
                className="hidden md:flex absolute -bottom-4 -right-2 z-20 p-3 rounded-2xl bg-charcoal text-white border border-charcoal shadow-float items-center gap-3 max-w-[210px]"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                <div className="w-2 h-2 rounded-full bg-terracotta animate-pulse flex-shrink-0"></div>
                <div className="text-left text-xs">
                  <div className="text-white/60 text-[10px] font-semibold uppercase tracking-wider">Field Mode</div>
                  <div className="font-medium text-white truncate">VetGuard OS • Dairy Pen A</div>
                </div>
              </motion.div>

              {/* Main Smartphone-Style Application Mockup */}
              <div className="w-full max-w-[340px] sm:max-w-[360px] bg-charcoal rounded-[44px] p-3 shadow-2xl border-4 border-charcoal/80 relative z-10">
                {/* Physical Bezel & Dynamic Island Notch */}
                <div className="w-full bg-white rounded-[36px] overflow-hidden border border-charcoal/20 flex flex-col min-h-[580px] sm:min-h-[620px]">
                  
                  {/* Phone Status Bar */}
                  <div className="bg-warm-ivory/80 px-6 pt-3 pb-2 flex items-center justify-between border-b border-border/50 text-[11px] font-semibold text-charcoal/70">
                    <span>09:42</span>
                    <div className="w-20 h-4 bg-charcoal rounded-full flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-charcoal/60 mr-1.5"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-terracotta"></div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>5G</span>
                      <div className="w-3.5 h-2 rounded-xs border border-charcoal/60 p-0.5">
                        <div className="w-full h-full bg-charcoal/60"></div>
                      </div>
                    </div>
                  </div>

                  {/* In-App Header */}
                  <div className="bg-warm-ivory px-5 py-3 border-b border-border flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-terracotta"></span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/60">VetGuard Farmer</span>
                      </div>
                      <div className="text-sm font-bold text-charcoal">
                        {activeStage === 0 && 'Herd Registry'}
                        {activeStage === 1 && 'Intake Report'}
                        {activeStage === 2 && 'Triage Summary'}
                        {activeStage === 3 && 'Veterinary Relay'}
                        {activeStage === 4 && 'Recovery Tracker'}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-white border border-border text-charcoal/70">
                      Sample UI
                    </span>
                  </div>

                  {/* Dynamic Mobile Screen Body */}
                  <div className="p-4 flex-1 bg-warm-ivory/30 overflow-y-auto flex flex-col justify-between space-y-4">
                    <AnimatePresence mode="wait">
                      
                      {/* SCREEN A: Animal Profiles */}
                      {activeStage === 0 && (
                        <motion.div 
                          key="screen-profiles"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-3"
                        >
                          {/* Animal Identity Header Card */}
                          <div className="p-4 rounded-2xl bg-white border border-border shadow-2xs">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-terracotta/10 text-terracotta mb-1">
                                  TAG #VG-804
                                </span>
                                <h4 className="text-lg font-bold text-charcoal leading-tight">Lakshmi</h4>
                                <p className="text-xs text-charcoal/60">Murrah Cross • Female • 3.5 yrs</p>
                              </div>
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-charcoal/5 text-charcoal/70">
                                Milking Pen A
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/60 text-xs">
                              <div className="p-2 rounded-lg bg-warm-ivory/60">
                                <span className="block text-[10px] text-charcoal/50">Lactation</span>
                                <span className="font-semibold text-charcoal">Cycle 2 • Day 84</span>
                              </div>
                              <div className="p-2 rounded-lg bg-warm-ivory/60">
                                <span className="block text-[10px] text-charcoal/50">Baseline Temp</span>
                                <span className="font-semibold text-charcoal">38.6 °C (Normal)</span>
                              </div>
                            </div>
                          </div>

                          {/* Longitudinal Health History Snippet */}
                          <div className="p-3.5 rounded-2xl bg-white border border-border/80">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-2 flex items-center justify-between">
                              <span>Health History</span>
                              <span className="text-terracotta">2 Recorded</span>
                            </div>

                            <div className="space-y-2 text-xs">
                              <div className="flex items-center justify-between p-2 rounded-lg bg-warm-ivory/40">
                                <div>
                                  <div className="font-semibold text-charcoal">FMD Booster Dose</div>
                                  <div className="text-[10px] text-charcoal/50">60 days ago • Dr. Kumar</div>
                                </div>
                                <span className="text-[10px] font-semibold text-terracotta">Logged</span>
                              </div>
                              <div className="flex items-center justify-between p-2 rounded-lg bg-warm-ivory/40">
                                <div>
                                  <div className="font-semibold text-charcoal">Post-Calving Inspection</div>
                                  <div className="text-[10px] text-charcoal/50">180 days ago • Clear</div>
                                </div>
                                <span className="text-[10px] font-semibold text-charcoal/60">Routine</span>
                              </div>
                            </div>
                          </div>

                          {/* Quick Action Button */}
                          <button 
                            onClick={() => setActiveStage(1)}
                            className="w-full py-2.5 px-4 rounded-xl bg-terracotta text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-terracotta/90 transition-colors shadow-2xs"
                          >
                            <PlusCircle size={14} />
                            <span>Report Concern for #VG-804</span>
                          </button>
                        </motion.div>
                      )}

                      {/* SCREEN B: Report a Health Concern */}
                      {activeStage === 1 && (
                        <motion.div 
                          key="screen-report"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-3"
                        >
                          {/* Animal Selector Pill */}
                          <div className="p-2.5 rounded-xl bg-white border border-border flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <Tag size={14} className="text-terracotta" />
                              <span className="font-bold text-charcoal">#VG-804 (Lakshmi)</span>
                            </div>
                            <span className="text-[10px] text-charcoal/50">Change Animal</span>
                          </div>

                          {/* Multimodal Input Form Showcase */}
                          <div className="p-3.5 rounded-2xl bg-white border border-border/80 space-y-2.5">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-charcoal/50">
                              Observed Symptoms
                            </div>

                            {/* Voice Note Pill */}
                            <div className="p-2.5 rounded-xl bg-warm-ivory/80 border border-border/60 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-terracotta text-white flex items-center justify-center">
                                  <Mic size={12} />
                                </div>
                                <div className="text-left">
                                  <div className="text-[11px] font-bold text-charcoal">Voice Note Recorded</div>
                                  <div className="text-[9px] text-charcoal/50">0:18s • "Sudden milk drop, warm rear udder"</div>
                                </div>
                              </div>
                              <span className="text-[9px] font-mono text-terracotta font-semibold">Ready</span>
                            </div>

                            {/* Captured Photo Attachment */}
                            <div className="p-2.5 rounded-xl bg-warm-ivory/80 border border-border/60 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-charcoal/10 text-charcoal flex items-center justify-center">
                                  <Camera size={12} />
                                </div>
                                <div className="text-left">
                                  <div className="text-[11px] font-semibold text-charcoal">IMG_2026_0941.jpg</div>
                                  <div className="text-[9px] text-charcoal/50">Udder posture photo attached</div>
                                </div>
                              </div>
                              <span className="text-[9px] text-charcoal/60">1.8 MB</span>
                            </div>

                            {/* Text Input Context */}
                            <div className="p-2.5 rounded-xl bg-warm-ivory/40 border border-border/40 text-[11px] text-charcoal/80 leading-relaxed">
                              "Reduced feed intake by 40% since morning milking. Standing isolated from pen."
                            </div>
                          </div>

                          {/* Submit Action Button */}
                          <button 
                            onClick={() => setActiveStage(2)}
                            className="w-full py-2.5 px-4 rounded-xl bg-terracotta text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-terracotta/90 transition-colors shadow-2xs"
                          >
                            <span>Synthesize Assessment</span>
                            <ArrowRight size={14} />
                          </button>
                        </motion.div>
                      )}

                      {/* SCREEN C: AI-Assisted Assessment */}
                      {activeStage === 2 && (
                        <motion.div 
                          key="screen-assessment"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-3"
                        >
                          {/* Triage Urgency Header */}
                          <div className="p-3.5 rounded-2xl bg-white border border-terracotta/30 shadow-2xs">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/50">
                                Case #VG-2026-881
                              </span>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-terracotta/10 text-terracotta border border-terracotta/30">
                                Priority Review
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-charcoal">
                              Localized Inflammation Indicators
                            </h4>
                            <p className="text-xs text-charcoal/70 font-light mt-0.5 leading-snug">
                              Observed symptoms suggest acute onset requiring timely veterinary evaluation.
                            </p>
                          </div>

                          {/* Correlated Factors */}
                          <div className="p-3.5 rounded-2xl bg-white border border-border/80 space-y-2 text-xs">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-charcoal/50">
                              Synthesized Risk Factors
                            </div>
                            <div className="flex items-center gap-2 p-1.5 rounded-lg bg-warm-ivory/60">
                              <AlertCircle size={13} className="text-terracotta flex-shrink-0" />
                              <span className="text-charcoal/80">Sudden 40% milk yield decline</span>
                            </div>
                            <div className="flex items-center gap-2 p-1.5 rounded-lg bg-warm-ivory/60">
                              <AlertCircle size={13} className="text-terracotta flex-shrink-0" />
                              <span className="text-charcoal/80">Reported localized heat & lethargy</span>
                            </div>
                          </div>

                          {/* Safety Boundary Banner */}
                          <div className="p-2.5 rounded-xl bg-warm-ivory border border-border/80 text-[10px] text-charcoal/70 leading-relaxed">
                            <strong>Supportive Notice:</strong> Non-diagnostic evaluation. Clinical assessment remains with licensed veterinary doctors.
                          </div>

                          {/* Connect Action Button */}
                          <button 
                            onClick={() => setActiveStage(3)}
                            className="w-full py-2.5 px-4 rounded-xl bg-charcoal text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-dark transition-colors shadow-2xs"
                          >
                            <Stethoscope size={14} className="text-terracotta" />
                            <span>Share with Dr. Kumar (Vet)</span>
                          </button>
                        </motion.div>
                      )}

                      {/* SCREEN D: Veterinary Support */}
                      {activeStage === 3 && (
                        <motion.div 
                          key="screen-veterinary"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-3"
                        >
                          {/* Practitioner Contact Brief */}
                          <div className="p-3.5 rounded-2xl bg-white border border-border shadow-2xs">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <span className="text-[10px] font-bold text-terracotta uppercase tracking-wider">
                                  District Vet Dispensary
                                </span>
                                <h4 className="text-sm font-bold text-charcoal">Dr. Ramesh Kumar, MVSc</h4>
                                <p className="text-xs text-charcoal/60">Duty Veterinary Officer</p>
                              </div>
                              <span className="w-2.5 h-2.5 rounded-full bg-terracotta"></span>
                            </div>

                            <div className="flex items-center gap-2 pt-2 border-t border-border/60">
                              <div className="px-2 py-1 rounded bg-warm-ivory border border-border text-[10px] font-medium text-charcoal/80">
                                Case #VG-2026-881 Transmitted
                              </div>
                            </div>
                          </div>

                          {/* Veterinary Message / Instructions Card */}
                          <div className="p-3.5 rounded-2xl bg-white border border-border/80 space-y-2">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-charcoal/50 flex items-center justify-between">
                              <span>Veterinary Response</span>
                              <span className="text-charcoal/40 font-mono">09:54 AM</span>
                            </div>

                            <div className="p-2.5 rounded-xl bg-warm-ivory/60 border border-border/60 text-xs text-charcoal/80 leading-relaxed italic">
                              "Reviewed photo and voice intake. Isolate #VG-804 in clean stall, hold evening concentrate. Field assistant dispatched for 11:30 AM inspection."
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-1">
                              <button className="py-2 px-3 rounded-lg bg-warm-ivory border border-border text-charcoal font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-white transition-colors">
                                <PhoneCall size={12} className="text-terracotta" />
                                <span>Call Clinic</span>
                              </button>
                              <button className="py-2 px-3 rounded-lg bg-warm-ivory border border-border text-charcoal font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-white transition-colors">
                                <MessageSquare size={12} className="text-charcoal/60" />
                                <span>Reply</span>
                              </button>
                            </div>
                          </div>

                          {/* Action Button */}
                          <button 
                            onClick={() => setActiveStage(4)}
                            className="w-full py-2.5 px-4 rounded-xl bg-terracotta text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-terracotta/90 transition-colors shadow-2xs"
                          >
                            <span>Open Follow-up Tracker</span>
                            <ChevronRight size={14} />
                          </button>
                        </motion.div>
                      )}

                      {/* SCREEN E: Follow-up and Monitoring */}
                      {activeStage === 4 && (
                        <motion.div 
                          key="screen-monitoring"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-3"
                        >
                          {/* Case Recovery Status */}
                          <div className="p-3.5 rounded-2xl bg-white border border-border shadow-2xs">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/50">
                                Case #VG-2026-881
                              </span>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-warm-ivory border border-border text-charcoal">
                                Day 3 Active
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-charcoal">Recovery Trajectory</h4>
                            <p className="text-xs text-charcoal/70 font-light mt-0.5">
                              Status: Stabilizing under veterinary treatment protocol.
                            </p>
                          </div>

                          {/* Longitudinal Timeline Mini-Card */}
                          <div className="p-3.5 rounded-2xl bg-white border border-border/80 space-y-2.5">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-charcoal/50">
                              Continuity Timeline
                            </div>

                            <div className="relative pl-5 space-y-2 text-xs before:absolute before:left-1.5 before:top-1.5 before:bottom-1.5 before:w-[1.5px] before:bg-border">
                              <div className="relative">
                                <div className="absolute -left-[19px] top-1 w-2 h-2 rounded-full bg-charcoal/40"></div>
                                <span className="font-semibold text-charcoal">Day 1:</span>
                                <span className="text-charcoal/70 ml-1">Reported & Vet Visited</span>
                              </div>
                              <div className="relative">
                                <div className="absolute -left-[19px] top-1 w-2 h-2 rounded-full bg-charcoal/40"></div>
                                <span className="font-semibold text-charcoal">Day 2:</span>
                                <span className="text-charcoal/70 ml-1">Temp 38.8°C (Easing)</span>
                              </div>
                              <div className="relative">
                                <div className="absolute -left-[19px] top-1 w-2 h-2 rounded-full bg-terracotta"></div>
                                <span className="font-bold text-terracotta">Day 3 (Today):</span>
                                <span className="text-charcoal/80 ml-1">Yield 80% restored</span>
                              </div>
                            </div>
                          </div>

                          {/* Log New Observation Quick Action */}
                          <button className="w-full py-2.5 px-4 rounded-xl bg-charcoal text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-dark transition-colors shadow-2xs">
                            <PlusCircle size={14} className="text-terracotta" />
                            <span>Log Today's Observation / Photo</span>
                          </button>
                        </motion.div>
                      )}

                    </AnimatePresence>
                  </div>

                  {/* Phone Bottom Navigation Bar */}
                  <div className="bg-white px-6 py-2.5 border-t border-border/60 flex items-center justify-around text-charcoal/40">
                    <button 
                      onClick={() => setActiveStage(0)}
                      className={`flex flex-col items-center gap-0.5 text-[9px] font-medium transition-colors ${activeStage === 0 ? 'text-terracotta font-bold' : 'hover:text-charcoal'}`}
                    >
                      <Tag size={15} />
                      <span>Herd</span>
                    </button>
                    <button 
                      onClick={() => setActiveStage(1)}
                      className={`flex flex-col items-center gap-0.5 text-[9px] font-medium transition-colors ${activeStage === 1 ? 'text-terracotta font-bold' : 'hover:text-charcoal'}`}
                    >
                      <PlusCircle size={15} />
                      <span>Report</span>
                    </button>
                    <button 
                      onClick={() => setActiveStage(2)}
                      className={`flex flex-col items-center gap-0.5 text-[9px] font-medium transition-colors ${activeStage === 2 ? 'text-terracotta font-bold' : 'hover:text-charcoal'}`}
                    >
                      <Cpu size={15} />
                      <span>Triage</span>
                    </button>
                    <button 
                      onClick={() => setActiveStage(3)}
                      className={`flex flex-col items-center gap-0.5 text-[9px] font-medium transition-colors ${activeStage === 3 ? 'text-terracotta font-bold' : 'hover:text-charcoal'}`}
                    >
                      <Stethoscope size={15} />
                      <span>Vet</span>
                    </button>
                    <button 
                      onClick={() => setActiveStage(4)}
                      className={`flex flex-col items-center gap-0.5 text-[9px] font-medium transition-colors ${activeStage === 4 ? 'text-terracotta font-bold' : 'hover:text-charcoal'}`}
                    >
                      <RefreshCw size={15} />
                      <span>Track</span>
                    </button>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default FarmerExperience;