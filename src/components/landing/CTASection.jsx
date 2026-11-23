import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Mail, ShieldCheck } from 'lucide-react';

const CTASection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="cta" className="py-24 md:py-36 bg-warm-ivory relative overflow-hidden text-charcoal border-t border-border/80">
      
      {/* Subtle Agricultural Land-Contour & Geometric Grid Motif */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1200 800">
          <path d="M 0 200 C 300 280, 600 120, 1200 220" fill="none" stroke="#171717" strokeWidth="1" strokeDasharray="4 6" />
          <path d="M 0 400 C 350 480, 750 320, 1200 420" fill="none" stroke="#B65F45" strokeWidth="1.5" />
          <path d="M 0 600 C 400 680, 800 520, 1200 620" fill="none" stroke="#171717" strokeWidth="1" strokeDasharray="6 8" />
        </svg>
      </div>

      {/* Gentle Radial Glow Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-terracotta/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-terracotta"></span>
            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] text-terracotta uppercase">
              The Connected Platform
            </span>
            <span className="w-8 h-[1px] bg-terracotta"></span>
          </div>

          {/* Core Headline */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-charcoal leading-[1.12] mb-8 text-balance max-w-4xl mx-auto">
            Better awareness. <br />
            <span className="font-semibold italic text-terracotta">Better coordination.</span> <br />
            Healthier livestock.
          </h2>
          
          {/* Supporting Copy */}
          <p className="text-lg md:text-xl text-charcoal/75 font-light leading-relaxed max-w-2xl mx-auto mb-12 text-balance">
            Bring animal-health observations, veterinary expertise, and regional awareness into one connected platform.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a 
              href="#product" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-charcoal text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wide hover:bg-terracotta transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
              aria-label="Explore VetGuard AI product capabilities"
            >
              <span>Explore VetGuard AI</span>
              <ArrowRight size={16} />
            </a>
            
            <a 
              href="#contact" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white text-charcoal border border-border px-8 py-4 rounded-full text-sm font-semibold tracking-wide hover:border-terracotta/50 hover:bg-warm-ivory transition-all duration-300 shadow-2xs hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
              aria-label="Contact the VetGuard AI team"
            >
              <Mail size={16} className="text-terracotta" />
              <span>Contact Us</span>
            </a>
          </div>

          {/* Three Ecosystem Pillars Ribbon */}
          <div className="pt-10 border-t border-border/80 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-charcoal/70">
              <div className="flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta"></span>
                <span className="font-medium">Farmer Field Observations</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta"></span>
                <span className="font-medium">Clinical Veterinary Care</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta"></span>
                <span className="font-medium">Regional Health Oversight</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-charcoal/50">
              <ShieldCheck size={13} className="text-terracotta" />
              <span>Non-diagnostic intelligence layer • Human & veterinary clinical leadership</span>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default CTASection;