import React, { useEffect } from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import ProblemSection from '../components/landing/ProblemSection';
import SolutionSection from '../components/landing/SolutionSection';
import IntelligenceSection from '../components/landing/IntelligenceSection';
import PortalSection from '../components/landing/PortalSection';
import FarmerExperience from '../components/landing/FarmerExperience';
import EcosystemSection from '../components/landing/EcosystemSection';
import EarlyWarningSection from '../components/landing/EarlyWarningSection';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
  // Add dark background to body when hitting the Early Warning section (optional enhancement)
  // For now, keeping it simple as requested.
  
  // To handle smooth scrolling when clicking on anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="font-sans antialiased bg-warm-ivory text-charcoal selection:bg-terracotta/20">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <IntelligenceSection />
        <PortalSection />
        <FarmerExperience />
        <EcosystemSection />
        <EarlyWarningSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
