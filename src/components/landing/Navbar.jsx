import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Product', href: '#product' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Portals', href: '#portals' },
    { name: 'Intelligence', href: '#intelligence' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group transition-transform hover:-translate-y-0.5">
          <div className="relative">
            <img 
              src="/assets/brand/vetguard-logo.png" 
              alt="VetGuard AI Logo" 
              className={`w-10 h-10 object-contain drop-shadow-sm transition-all ${!isScrolled ? 'brightness-0 invert opacity-90' : ''}`}
            />
          </div>
          <div className={`text-xl font-bold tracking-tight group-hover:text-terracotta transition-colors ${isScrolled ? 'text-charcoal' : 'text-warm-ivory'}`}>
            VetGuard <span className="font-light">AI</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`nav-link text-sm font-medium hover:text-terracotta transition-colors ${isScrolled ? 'text-charcoal/80' : 'text-warm-ivory/80'}`}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <a href="#signin" className={`nav-link text-sm font-medium hover:text-terracotta transition-colors ${isScrolled ? 'text-charcoal' : 'text-warm-ivory'}`}>
              Sign In
            </a>
            <a
              href="#get-started"
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 ${
                isScrolled 
                  ? 'bg-charcoal text-white hover:bg-terracotta' 
                  : 'bg-warm-ivory text-charcoal hover:bg-terracotta hover:text-white border border-transparent'
              }`}
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`${isScrolled ? 'text-charcoal' : 'text-warm-ivory'} focus:outline-none`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-border/50 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="nav-link w-max text-base font-medium text-charcoal/80 hover:text-terracotta transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-border/50 flex flex-col space-y-3">
                <a
                  href="#signin"
                  className="nav-link w-max text-base font-medium text-charcoal hover:text-terracotta transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </a>
                <a
                  href="#get-started"
                  className="bg-charcoal text-white px-5 py-3 rounded-xl text-base font-medium hover:bg-terracotta transition-colors text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
