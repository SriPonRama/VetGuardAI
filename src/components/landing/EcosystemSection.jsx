import React from 'react';
import { motion } from 'framer-motion';

const EcosystemSection = () => {
  return (
    <section className="py-24 bg-warm-ivory relative border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="text-sm font-semibold tracking-wider text-terracotta uppercase mb-4">The Flow of Information</div>
          <h2 className="text-3xl md:text-5xl font-bold text-charcoal mb-6">
            Beyond the individual farm.
          </h2>
          <p className="text-lg text-charcoal/70">
            Information flows securely through the ecosystem, allowing for both immediate individual care and broader contextual intelligence.
          </p>
        </div>

        {/* Layered Ecosystem Visualization */}
        <div className="relative max-w-4xl mx-auto py-10">
          
          <div className="flex flex-col items-center gap-4 relative z-10">
            
            {/* Authority Layer */}
            <motion.div 
              className="w-full max-w-xs sm:max-w-md bg-white border border-border p-6 rounded-2xl shadow-sm flex flex-col items-center text-center relative z-40"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="font-bold text-lg text-charcoal mb-1">Authority</h3>
              <p className="text-xs text-charcoal/50 uppercase tracking-wider font-semibold">Regional Intelligence</p>
            </motion.div>

            {/* Connection */}
            <motion.div 
              className="w-0.5 h-8 bg-terracotta/30 relative"
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: 32, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <div className="absolute -left-1 -top-1 w-2.5 h-2.5 rounded-full bg-terracotta/50"></div>
            </motion.div>

            {/* Veterinarian Layer */}
            <motion.div 
              className="w-full max-w-sm sm:max-w-lg bg-charcoal p-6 rounded-2xl shadow-md flex flex-col items-center text-center relative z-30"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="font-bold text-lg text-white mb-1">Veterinarian</h3>
              <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">Case Assessment</p>
            </motion.div>

            {/* Connection */}
            <motion.div 
              className="w-0.5 h-8 bg-terracotta/30 relative"
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: 32, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="absolute -left-1 -top-1 w-2.5 h-2.5 rounded-full bg-terracotta/50"></div>
            </motion.div>

            {/* AI Layer */}
            <motion.div 
              className="w-full max-w-md sm:max-w-xl bg-white border-2 border-terracotta/20 p-6 rounded-2xl shadow-sm flex flex-col items-center text-center relative z-20"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-bold text-lg text-charcoal mb-1">VetGuard AI</h3>
              <p className="text-xs text-terracotta uppercase tracking-wider font-semibold">Analysis & Triage</p>
            </motion.div>

            {/* Connection */}
            <motion.div 
              className="w-0.5 h-8 bg-terracotta/30 relative"
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: 32, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="absolute -left-1 -top-1 w-2.5 h-2.5 rounded-full bg-terracotta/50"></div>
            </motion.div>

            {/* Farmer Layer */}
            <motion.div 
              className="w-full max-w-lg sm:max-w-2xl bg-sand/30 border border-border/50 p-6 rounded-2xl flex flex-col items-center text-center relative z-10"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-bold text-lg text-charcoal mb-1">Farmer</h3>
              <p className="text-xs text-charcoal/50 uppercase tracking-wider font-semibold">Observation & Reporting</p>
            </motion.div>

          </div>

          {/* Background concentric circles for depth */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center z-0 pointer-events-none opacity-30">
            <div className="w-[800px] h-[300px] rounded-[100%] border border-border/60 absolute"></div>
            <div className="w-[600px] h-[200px] rounded-[100%] border border-border/80 absolute"></div>
            <div className="w-[400px] h-[100px] rounded-[100%] border border-terracotta/20 absolute"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EcosystemSection;
