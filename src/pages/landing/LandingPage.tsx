import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { MarketTrendsSection } from './MarketTrendsSection';
import { HowItWorksSection } from './HowItWorksSection';
import { CTASection } from './CTASection';
import { InnovationSection } from './InnovationSection';
import { PartnersSection } from './PartnersSection';

export function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToInnovation) {
      const innovationSection = document.getElementById('innovation');
      if (innovationSection) {
        innovationSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.state]);

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-active');
        } else {
          entry.target.classList.remove('section-active');
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
      section.classList.add('scroll-mt-24'); // Add padding for header
    });

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <InnovationSection />
      <FeaturesSection />
      <MarketTrendsSection />
      <HowItWorksSection />
      <PartnersSection />
      <CTASection />
    </div>
  );
}