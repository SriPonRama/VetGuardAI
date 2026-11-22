import React from 'react';
import { motion } from 'framer-motion';

const EarlyWarningSection = () => {
  return (
    <section className="py-32 bg-dark relative overflow-hidden">
      
      {/* Abstract Map/Network Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(182,95,69,0.15)_0%,transparent_70%)]"></div>
        {/* Conceptual network nodes */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-terracotta shadow-[0_0_15px_rgba(182,95,69,0.8)] animate-pulse"></div>
        <div className="absolute top-1/3 left-1/2 w-1.5 h-1.5 rounded-full bg-white/50"></div>
        <div className="absolute top-2/3 right-1/4 w-3 h-3 rounded-full bg-terracotta shadow-[0_0_20px_rgba(182,95,69,1)] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-white/30"></div>
        
        {/* Conceptual lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="25%" y1="25%" x2="50%" y2="33%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <line x1="50%" y1="33%" x2="75%" y2="66%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <line x1="25%" y1="25%" x2="33%" y2="75%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm font-semibold tracking-wider text-terracotta uppercase mb-4">Broader Impact</div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              From individual care to regional intelligence.
            </h2>
            
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              While VetGuard focuses on individual animal health, the aggregated, anonymized data can help veterinary authorities identify potential patterns in time, location, and symptoms.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex-1">
                <div className="text-terracotta font-bold text-2xl mb-1">Context</div>
                <p className="text-xs text-white/60">Location, time, and weather</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex-1">
                <div className="text-terracotta font-bold text-2xl mb-1">Symptoms</div>
                <p className="text-xs text-white/60">Reported signs and AI analysis</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex-1">
                <div className="text-terracotta font-bold text-2xl mb-1">Patterns</div>
                <p className="text-xs text-white/60">Potential regional trends</p>
              </div>
            </div>

            <p className="text-sm text-white/40 italic">
              * Note: Broader intelligence features rely on anonymized data and are accessible only to verified veterinary authorities to support early investigation.
            </p>
          </motion.div>

          {/* Visual Data Flow Concept */}
          <div className="relative h-80 lg:h-[400px] flex items-center justify-center">
            
            {/* Center Node */}
            <motion.div 
              className="absolute z-30 w-32 h-32 rounded-full border border-terracotta/50 bg-dark flex flex-col items-center justify-center shadow-[0_0_40px_rgba(182,95,69,0.3)]"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-terracotta font-bold text-sm text-center">Potential<br/>Pattern</div>
              <div className="w-2 h-2 rounded-full bg-terracotta mt-2 animate-ping"></div>
            </motion.div>

            {/* Orbiting Elements */}
            <motion.div 
              className="absolute w-64 h-64 rounded-full border border-white/10 z-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white/80 border border-white/20">Case A</div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white/80 border border-white/20">Case B</div>
              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white/80 border border-white/20">Case C</div>
            </motion.div>

            <motion.div 
              className="absolute w-96 h-96 rounded-full border border-white/5 z-10"
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-1/4 left-0 -translate-x-1/2 -translate-y-1/2 bg-white/5 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white/50 border border-white/10">Location Data</div>
              <div className="absolute bottom-1/4 right-0 translate-x-1/2 translate-y-1/2 bg-white/5 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white/50 border border-white/10">Temporal Data</div>
            </motion.div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default EarlyWarningSection;
