import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-dark">
      {/* 
        Background layer reserved for future 3D canvas. 
        Currently holding subtle architectural/grid lines to provide depth.
      */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        {/* Vertical lines */}
        <div className="absolute left-[10%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
        <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
        <div className="absolute right-[20%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
        
        {/* Horizontal lines */}
        <div className="absolute top-[30%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute bottom-[20%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        
        {/* Subtle geometric shapes */}
        <div className="absolute top-[10%] right-[10%] w-64 h-64 border border-white/5 rounded-full blur-[1px]"></div>
        <div className="absolute bottom-[10%] left-[20%] w-96 h-96 border border-white/5 rounded-full blur-[2px]"></div>
        
        {/* Subtle gradient glow */}
        <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] bg-terracotta/5 rounded-full blur-3xl mix-blend-screen"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Main Content spanning 8 columns to avoid centering */}
          <motion.div 
            className="lg:col-span-10 lg:col-start-2 xl:col-span-9 xl:col-start-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8 sm:mb-10">
              <div className="relative bg-white/5 p-2 rounded-lg border border-white/10">
                <img 
                  src="/assets/brand/vetguard-logo.png" 
                  alt="VetGuard AI" 
                  className="w-6 h-6 sm:w-8 sm:h-8 object-contain brightness-0 invert opacity-90" 
                />
              </div>
              <span className="w-8 sm:w-12 h-[1px] bg-terracotta/70"></span>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-terracotta uppercase">Early Warning Platform</span>
            </motion.div>
            
            {/* Heading */}
            <motion.h1 
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-bold tracking-tight text-warm-ivory mb-8 leading-[1.05] text-balance"
            >
              A smarter way to protect <br className="hidden sm:block" />
              <span className="text-terracotta italic pr-2">livestock</span> health.
            </motion.h1>
            
            {/* Supporting Text */}
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl text-warm-ivory/70 mb-12 max-w-2xl leading-relaxed font-light text-balance"
            >
              VetGuard AI helps farmers report concerns, assess potential health risks early, and connect with veterinary services for continuous monitoring.
            </motion.p>
            
            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5">
              <a 
                href="#product" 
                className="group relative inline-flex items-center justify-center gap-3 bg-charcoal text-warm-ivory border border-white/10 px-8 py-4 sm:py-5 rounded-full text-base font-medium overflow-hidden transition-all focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 focus:ring-offset-dark"
              >
                <div className="absolute inset-0 bg-terracotta/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative z-10">Explore VetGuard</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              
              <a 
                href="#how-it-works" 
                className="inline-flex items-center justify-center gap-2 bg-transparent text-warm-ivory border border-white/20 px-8 py-4 sm:py-5 rounded-full text-base font-medium hover:bg-white/5 hover:border-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-dark"
              >
                How it works
              </a>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
