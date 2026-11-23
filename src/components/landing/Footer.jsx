import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white pt-20 pb-12 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-14 pb-16 border-b border-white/10">
          
          {/* Brand Area */}
          <div className="md:col-span-5 lg:col-span-4 space-y-5">
            <a href="/" className="flex items-center gap-3 group inline-flex transition-transform hover:-translate-y-0.5">
              <div className="relative bg-white/10 p-1.5 rounded-xl border border-white/15 group-hover:border-terracotta/40 transition-colors">
                <img 
                  src="/assets/brand/vetguard-logo.png" 
                  alt="VetGuard AI Logo" 
                  className="w-8 h-8 object-contain brightness-0 invert"
                />
              </div>
              <div className="text-xl font-bold tracking-tight text-white group-hover:text-terracotta transition-colors">
                VetGuard <span className="font-light">AI</span>
              </div>
            </a>

            <p className="text-sm text-white/70 font-light leading-relaxed max-w-sm">
              An AI-assisted livestock health early-warning and veterinary coordination platform.
            </p>

            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-white/70">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta"></span>
                <span>Non-Diagnostic Assistive Platform</span>
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-terracotta">
              Platform Navigation
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#product" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:text-terracotta">
                  Product
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:text-terracotta">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#portals" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:text-terracotta">
                  Portals
                </a>
              </li>
              <li>
                <a href="#intelligence" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:text-terracotta">
                  Intelligence
                </a>
              </li>
              <li>
                <a href="#farmer-experience" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:text-terracotta">
                  Farmer Experience
                </a>
              </li>
              <li>
                <a href="#ecosystem" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:text-terracotta">
                  Ecosystem
                </a>
              </li>
              <li>
                <a href="#early-warning" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:text-terracotta">
                  Early Warning
                </a>
              </li>
            </ul>
          </div>

          {/* Platform Responsibility */}
          <div className="md:col-span-4 lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              Responsibility
            </h4>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              VetGuard AI supports early awareness and structured reporting. It helps organize information for veterinary review and does not replace professional veterinary judgment or clinical decisions.
            </p>
            <div className="text-[11px] text-white/40 pt-1 font-light">
              Clinical diagnostic and prescription decisions belong strictly to licensed veterinarians.
            </div>
          </div>

          {/* Contact Area with id="contact" */}
          <div 
            id="contact" 
            className="md:col-span-12 lg:col-span-3 space-y-4 p-5 rounded-2xl bg-white/5 border border-white/10 scroll-mt-28"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-terracotta"></span>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                Contact & Inquiries
              </h4>
            </div>
            
            <p className="text-xs text-white/70 font-light leading-relaxed">
              For institutional pilot demonstrations, research collaborations, or coordination with veterinary services, connect through official project channels.
            </p>

            <div className="pt-2 text-xs font-mono text-terracotta">
              Institutional Pilot Coordination
            </div>
            
            <div className="text-[10px] text-white/40 font-light">
              Formal direct communication channels are coordinated per deployment jurisdiction.
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>
            &copy; {new Date().getFullYear()} VetGuard AI. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-white/40 text-[11px] font-light">
            <span>Public Landing Page Demonstration</span>
            <span>•</span>
            <span>Human-in-the-Loop Architecture</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;