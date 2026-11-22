import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="py-24 bg-terracotta relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Better visibility.<br />
            Earlier action.<br />
            Healthier livestock.
          </h2>
          
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-medium">
            Join the ecosystem connecting farmers, veterinarians, and authorities for smarter animal health monitoring.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="#portal" 
              className="inline-flex items-center justify-center gap-2 bg-charcoal text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-dark transition-all shadow-float hover:-translate-y-1"
            >
              Explore VetGuard
              <ArrowRight size={20} />
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
