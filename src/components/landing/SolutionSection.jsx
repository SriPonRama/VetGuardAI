import React from 'react';
import { motion } from 'framer-motion';

const SolutionSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const steps = [
    {
      id: '01',
      title: 'REPORT',
      heading: 'Health Concern Reporting',
      desc: 'Farmers can report an animal health concern and provide relevant information.',
    },
    {
      id: '02',
      title: 'UNDERSTAND',
      heading: 'Animal Health Records',
      desc: 'Maintain organized information about animals and their reported health history.',
    },
    {
      id: '03',
      title: 'ASSESS',
      heading: 'AI-Assisted Assessment',
      desc: 'VetGuard can use submitted information to help assess potential health concerns and risk.',
    },
    {
      id: '04',
      title: 'ACT',
      heading: 'Veterinary Connection',
      desc: 'Cases that require professional attention can be connected to veterinary services.',
    },
    {
      id: '05',
      title: 'MONITOR',
      heading: 'Follow-up & Regional Intelligence',
      desc: 'Health cases can be monitored over time, while aggregated information supports broader monitoring of potential health patterns.',
    }
  ];

  return (
    <section id="product" className="py-24 md:py-32 bg-warm-ivory relative overflow-hidden">
      {/* Background subtleties */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-sand/30 rounded-l-[100px] pointer-events-none"></div>
      <div className="absolute -left-40 top-40 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mb-20 md:mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-terracotta"></span>
            <span className="text-sm font-semibold tracking-[0.2em] text-terracotta uppercase">Product</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-charcoal mb-8 leading-[1.1] text-balance"
          >
            Smarter livestock health, <br className="hidden md:block" />
            <span className="font-semibold">from the first concern to the next action.</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-charcoal/70 leading-relaxed font-light max-w-2xl text-balance"
          >
            VetGuard is designed as a complete support ecosystem. We provide the tools to capture information, assist with assessment, and connect you to professional care.
          </motion.p>
        </motion.div>

        {/* Product Journey */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Animated Connecting Line */}
          <motion.div 
            className="absolute left-[27px] md:left-[33.333%] top-2 bottom-0 w-[1px] bg-gradient-to-b from-terracotta via-terracotta/40 to-transparent origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          ></motion.div>

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id}
                className="relative flex flex-col md:flex-row md:items-start gap-6 md:gap-0"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={itemVariants}
              >
                {/* Node Dot */}
                <div className="absolute left-[24px] md:left-[33.333%] w-2 h-2 bg-warm-ivory border-[1.5px] border-terracotta rounded-full -translate-x-1/2 mt-[26px] md:mt-[34px] z-10 shadow-[0_0_0_4px_rgba(247,243,237,1)]"></div>
                
                {/* Left side: Label */}
                <div className="pl-16 md:pl-0 md:w-1/3 md:pr-16 pt-4 md:pt-6 md:text-right">
                  <span className="text-xs font-bold tracking-[0.2em] text-terracotta/70 uppercase block mb-1">{step.id}</span>
                  <h3 className="text-xl md:text-2xl font-light tracking-wide text-charcoal uppercase">{step.title}</h3>
                </div>
                
                {/* Right side: Card */}
                <div className="pl-16 md:pl-16 md:w-2/3">
                  <div className="bg-white/60 backdrop-blur-md border border-border/60 p-8 md:p-10 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-terracotta/30 transition-all duration-400 group">
                    <div className="w-8 h-[1px] bg-terracotta/50 mb-6 group-hover:w-16 group-hover:bg-terracotta transition-all duration-400"></div>
                    <h4 className="text-xl md:text-2xl font-medium text-charcoal mb-4">{step.heading}</h4>
                    <p className="text-base md:text-lg text-charcoal/70 leading-relaxed font-light">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SolutionSection;
