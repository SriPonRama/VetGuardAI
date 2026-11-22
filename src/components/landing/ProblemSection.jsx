import React from 'react';
import { motion } from 'framer-motion';
import { Eye, FilePlus, Cpu, Stethoscope, Clock } from 'lucide-react';

const ProblemSection = () => {
  const steps = [
    {
      id: '01',
      title: 'NOTICE',
      phase: 'USER INPUT',
      icon: Eye,
      heading: 'Observe the Animal',
      desc: 'A farmer notices something unusual about an animal, such as behavioral changes, visible symptoms, or reduced activity.',
    },
    {
      id: '02',
      title: 'REPORT',
      phase: 'USER INPUT',
      icon: FilePlus,
      heading: 'Submit Information',
      desc: 'The farmer easily submits relevant information including symptoms, images, and contextual notes.',
    },
    {
      id: '03',
      title: 'ASSESS',
      phase: 'AI PROCESSING',
      icon: Cpu,
      heading: 'Risk Assessment',
      desc: 'VetGuard processes the submitted information to support an initial health-risk assessment based on known indicators.',
    },
    {
      id: '04',
      title: 'CONNECT',
      phase: 'PROFESSIONAL SUPPORT',
      icon: Stethoscope,
      heading: 'Veterinary Review',
      desc: 'If professional attention is appropriate, the case moves toward veterinary support for informed review.',
    },
    {
      id: '05',
      title: 'FOLLOW UP',
      phase: 'FOLLOW-UP',
      icon: Clock,
      heading: 'Monitor Progress',
      desc: 'The case can be monitored over time with updated observations, case status, and veterinary notes.',
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-terracotta"></span>
            <span className="text-sm font-semibold tracking-[0.2em] text-terracotta uppercase">How It Works</span>
            <span className="w-8 h-[1px] bg-terracotta"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal leading-tight mb-6">
            From a concern <br />
            <span className="font-light italic text-terracotta">to informed action.</span>
          </h2>
          <p className="text-lg text-charcoal/70 font-light">
            VetGuard connects farmer input, AI-assisted assessment and veterinary support into one seamless workflow.
          </p>
        </motion.div>

        {/* Workflow Journey */}
        <div className="relative">
          
          {/* Desktop/Tablet Horizontal Line */}
          <div className="hidden lg:block absolute top-[19px] left-[10%] right-[10%] h-[2px] bg-border/40 z-0">
            <motion.div 
              className="h-full bg-terracotta origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2.5, ease: "linear" }}
            />
          </div>

          {/* Mobile Vertical Line */}
          <div className="lg:hidden absolute top-[10px] bottom-[10px] left-[39px] w-[2px] bg-border/40 z-0">
            <motion.div 
              className="w-full bg-terracotta origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2.5, ease: "linear" }}
            />
          </div>

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-4 relative z-10">
            {steps.map((step, i) => (
              <motion.div 
                key={step.id}
                className="flex flex-row lg:flex-col items-start lg:items-center relative group focus:outline-none"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.5 + 0.2 }}
                tabIndex={0}
              >
                {/* Node & Icon Container */}
                <div className="flex-shrink-0 w-20 lg:w-full flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-warm-ivory border-2 border-border group-hover:border-terracotta group-focus-visible:border-terracotta flex items-center justify-center transition-colors duration-300 shadow-sm z-10 lg:mb-6">
                    <step.icon size={18} className="text-charcoal/30 group-hover:text-terracotta group-focus-visible:text-terracotta transition-colors duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 lg:text-center pt-1 lg:pt-0 pb-8 lg:pb-0 transform group-hover:-translate-y-1 group-focus-visible:-translate-y-1 transition-transform duration-300">
                  <div className="inline-block px-2 py-1 mb-4 rounded text-[10px] font-bold tracking-widest uppercase bg-charcoal/5 text-charcoal/60 group-hover:bg-terracotta/10 group-hover:text-terracotta group-focus-visible:bg-terracotta/10 group-focus-visible:text-terracotta transition-colors duration-300">
                    {step.phase}
                  </div>
                  <div className="text-xs font-bold tracking-[0.2em] text-terracotta mb-2">{step.id} — {step.title}</div>
                  <h3 className="text-lg font-medium text-charcoal mb-3 group-hover:text-terracotta transition-colors duration-300">{step.heading}</h3>
                  <p className="text-sm text-charcoal/70 font-light leading-relaxed group-hover:text-charcoal transition-colors duration-300 lg:px-2">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
