import React from 'react';
import { motion } from 'framer-motion';

const UIPreview = ({ role, labels, colorTheme }) => {
  const isDark = colorTheme === 'dark';
  const bgClass = isDark ? 'bg-charcoal border-white/10' : 'bg-white border-border/50';
  const headerBg = isDark ? 'bg-white/5' : 'bg-warm-ivory/30';
  const textClass = isDark ? 'text-white/80' : 'text-charcoal/80';
  const barClass = isDark ? 'bg-white/10' : 'bg-charcoal/5';
  const activeTabColor = 'border-terracotta text-terracotta';
  const inactiveTabColor = isDark ? 'border-transparent text-white/40' : 'border-transparent text-charcoal/40';

  return (
    <motion.div 
      className={`relative w-full h-[280px] md:h-[320px] rounded-2xl border overflow-hidden flex flex-col ${bgClass} shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2 group-focus-within:shadow-xl group-focus-within:-translate-y-2`}
      initial={{ scale: 0.98, opacity: 0.5 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className={`h-12 border-b ${isDark ? 'border-white/10' : 'border-border/50'} flex items-center px-5 justify-between ${headerBg}`}>
        <div className="flex gap-3 items-center">
          <div className="flex gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-white/20' : 'bg-charcoal/20'}`}></div>
            <div className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-white/20' : 'bg-charcoal/20'}`}></div>
          </div>
          <div className={`text-[10px] font-bold tracking-widest uppercase ${textClass}`}>{role} UI</div>
        </div>
      </div>
      
      {/* Body */}
      <div className="p-6 flex flex-col gap-5 flex-1 pointer-events-none">
        {/* Nav tabs */}
        <div className="flex gap-4 border-b border-charcoal/5 dark:border-white/5 pb-2">
          {labels.slice(0,2).map((label, i) => (
             <div key={i} className={`text-[10px] uppercase font-bold tracking-wider pb-2 border-b-2 -mb-[2px] transition-colors ${i === 0 ? activeTabColor : inactiveTabColor}`}>{label}</div>
          ))}
        </div>
        
        {/* Content grids */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-warm-ivory/50 border-border/50'}`}>
            <div className={`text-[9px] uppercase font-bold tracking-wider mb-3 ${isDark ? 'text-white/40' : 'text-charcoal/40'}`}>{labels[2]}</div>
            <div className={`w-full h-10 rounded-md ${barClass}`}></div>
          </div>
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-warm-ivory/50 border-border/50'}`}>
            <div className={`text-[9px] uppercase font-bold tracking-wider mb-3 ${isDark ? 'text-white/40' : 'text-charcoal/40'}`}>{labels[3]}</div>
            <div className={`w-full h-10 rounded-md ${barClass}`}></div>
          </div>
        </div>
        
        {/* List items */}
        <div className="flex flex-col gap-3 mt-auto">
           <div className={`w-full h-8 rounded-md flex items-center px-3 ${isDark ? 'bg-white/5' : 'bg-charcoal/5'}`}>
             <div className={`w-3/4 h-2 rounded ${barClass}`}></div>
           </div>
           <div className={`w-full h-8 rounded-md flex items-center px-3 ${isDark ? 'bg-white/5' : 'bg-charcoal/5'}`}>
             <div className={`w-1/2 h-2 rounded ${barClass}`}></div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

const PortalSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="portals" className="py-24 md:py-32 bg-warm-ivory relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20 md:mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-terracotta"></span>
            <span className="text-sm font-semibold tracking-[0.2em] text-terracotta uppercase">Three Connected Experiences</span>
            <span className="w-8 h-[1px] bg-terracotta"></span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-charcoal leading-[1.1] mb-6 text-balance">
            One platform. <br className="hidden sm:block" />
            <span className="font-semibold italic">Different roles.</span> <br className="hidden sm:block" />
            One connected health ecosystem.
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-charcoal/70 font-light leading-relaxed">
            VetGuard gives each participant the tools and information relevant to their role, while keeping the overall workflow connected.
          </motion.p>
        </motion.div>

        {/* Portals Journey */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Subtle Connecting Background Line (Desktop Only) */}
          <div className="hidden lg:block absolute left-1/2 top-[10%] bottom-[10%] w-[1px] bg-gradient-to-b from-transparent via-border to-transparent -translate-x-1/2 z-0"></div>

          {/* 01 - Farmer */}
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-10 md:gap-16 mb-24 lg:mb-32 relative z-10 group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            tabIndex={0}
          >
            <div className="w-full lg:w-1/2 lg:pr-12 order-2 lg:order-1">
              <motion.div variants={itemVariants}>
                <span className="text-xs font-bold tracking-[0.2em] text-terracotta/70 uppercase block mb-2">01 — Role</span>
                <h3 className="text-3xl font-bold text-charcoal mb-4 group-hover:text-terracotta transition-colors duration-300">Farmer</h3>
                <p className="text-lg text-charcoal/70 leading-relaxed font-light mb-8">
                  Help farmers identify and report concerns, understand potential health risks, manage animal information, and stay connected with veterinary support.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Report a health concern', 'Animal profiles', 'Health history', 
                    'AI-assisted assessment', 'Case tracking', 'Veterinary support', 'Follow-up'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-charcoal/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-terracotta/50 group-hover:bg-terracotta transition-colors duration-300"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
               <UIPreview 
                 role="Farmer" 
                 labels={['Animal Profile', 'Health Concern', 'Recent Cases', 'Follow-up']} 
                 colorTheme="light" 
               />
            </div>
          </motion.div>

          {/* 02 - Veterinarian */}
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-10 md:gap-16 mb-24 lg:mb-32 relative z-10 group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            tabIndex={0}
          >
            <div className="w-full lg:w-1/2 lg:order-1">
               <UIPreview 
                 role="Veterinarian" 
                 labels={['Open Cases', 'Animal History', 'Assessment', 'Follow-up']} 
                 colorTheme="dark" 
               />
            </div>
            <div className="w-full lg:w-1/2 lg:pl-12 lg:order-2">
              <motion.div variants={itemVariants}>
                <span className="text-xs font-bold tracking-[0.2em] text-terracotta/70 uppercase block mb-2">02 — Role</span>
                <h3 className="text-3xl font-bold text-charcoal mb-4 group-hover:text-terracotta transition-colors duration-300">Veterinarian</h3>
                <p className="text-lg text-charcoal/70 leading-relaxed font-light mb-8">
                  Help veterinarians review cases, examine relevant animal information, provide professional assessment, manage treatment/follow-up, and communicate with farmers.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Case queue', 'Case details', 'Animal history', 
                    'AI-assisted case information', 'Professional assessment', 'Treatment/follow-up', 'Farmer communication'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-charcoal/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-terracotta/50 group-hover:bg-terracotta transition-colors duration-300"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* 03 - Authority */}
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-10 md:gap-16 relative z-10 group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            tabIndex={0}
          >
            <div className="w-full lg:w-1/2 lg:pr-12 order-2 lg:order-1">
              <motion.div variants={itemVariants}>
                <span className="text-xs font-bold tracking-[0.2em] text-terracotta/70 uppercase block mb-2">03 — Role</span>
                <h3 className="text-3xl font-bold text-charcoal mb-4 group-hover:text-terracotta transition-colors duration-300">Veterinary Authority</h3>
                <p className="text-lg text-charcoal/70 leading-relaxed font-light mb-8">
                  Provide a broader view for authorized veterinary/public-health users to monitor regional information and identify potential patterns that may require investigation.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Regional monitoring', 'Disease-risk visualization', 'Case analytics', 
                    'Geographic patterns', 'Trend monitoring', 'Resource planning'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-charcoal/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-terracotta/50 group-hover:bg-terracotta transition-colors duration-300"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
               <UIPreview 
                 role="Authority" 
                 labels={['Regional Overview', 'Risk Indicators', 'Case Trends', 'Monitoring']} 
                 colorTheme="light" 
               />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PortalSection;
