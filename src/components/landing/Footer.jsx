import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          
          <div className="col-span-2 lg:col-span-2">
            <a href="/" className="flex items-center gap-3 group transition-transform hover:-translate-y-0.5 mb-6 inline-flex">
              <div className="relative bg-white/10 p-1.5 rounded-lg border border-white/20">
                <img 
                  src="/assets/brand/vetguard-logo.png" 
                  alt="VetGuard AI Bull Logo" 
                  className="w-8 h-8 object-contain brightness-0 invert"
                />
              </div>
              <div className="text-2xl font-bold tracking-tight text-white">
                VetGuard <span className="font-light">AI</span>
              </div>
            </a>
            <p className="text-white/60 text-sm max-w-xs mb-8 leading-relaxed">
              An AI-powered livestock health early-warning and veterinary assistance platform designed to protect animal health through better intelligence.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6">Product</h4>
            <ul className="space-y-4">
              <li><a href="#how-it-works" className="text-white/60 hover:text-white transition-colors text-sm">How it Works</a></li>
              <li><a href="#intelligence" className="text-white/60 hover:text-white transition-colors text-sm">AI Intelligence</a></li>
              <li><a href="#portals" className="text-white/60 hover:text-white transition-colors text-sm">Portals</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#documentation" className="text-white/60 hover:text-white transition-colors text-sm">Documentation</a></li>
              <li><a href="#about" className="text-white/60 hover:text-white transition-colors text-sm">About</a></li>
              <li><a href="#contact" className="text-white/60 hover:text-white transition-colors text-sm">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#privacy" className="text-white/60 hover:text-white transition-colors text-sm">Privacy</a></li>
              <li><a href="#terms" className="text-white/60 hover:text-white transition-colors text-sm">Terms</a></li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} VetGuard AI. All rights reserved.
          </p>
          <div className="flex gap-6">
             <span className="text-white/20 text-sm italic">Concept Demonstration</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
