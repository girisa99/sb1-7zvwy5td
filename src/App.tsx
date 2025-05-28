import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/landing/LandingPage';
import { UserOnboardingProvider } from './pages/onboarding/user/UserOnboardingContext';
import { UserOnboarding } from './pages/onboarding/user/UserOnboarding';
import { ManufacturerPortal } from './pages/platform/ManufacturerPortal';
import { TreatmentCenterPortal } from './pages/platform/TreatmentCenterPortal';
import { DistributionCenterPortal } from './pages/platform/DistributionCenterPortal';
import { GeneTherapy } from './pages/therapies/GeneTherapy';
import { CellTherapy } from './pages/therapies/CellTherapy';
import { RNATherapeutics } from './pages/therapies/RNATherapeutics';
import { AdvancedTherapeutics } from './pages/therapies/AdvancedTherapeutics';
import { BlogPage } from './pages/blog/BlogPage';
import { BlogPost } from './pages/blog/BlogPost';
import { AboutPage } from './pages/about/AboutPage';
import { PrivacyPolicy } from './pages/legal/PrivacyPolicy';
import { TermsOfService } from './pages/legal/TermsOfService';
import { CookiePolicy } from './pages/legal/CookiePolicy';
import { AuthProvider } from './providers/AuthProvider';
import { Genie } from './components/chatbot/Genie';
import { CookieConsent } from './components/CookieConsent';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/platform/manufacturer" element={<ManufacturerPortal />} />
              <Route path="/platform/treatment-centers" element={<TreatmentCenterPortal />} />
              <Route path="/platform/distribution-centers" element={<DistributionCenterPortal />} />
              <Route 
                path="/user-onboarding/*" 
                element={
                  <UserOnboardingProvider>
                    <UserOnboarding />
                  </UserOnboardingProvider>
                } 
              />
              <Route path="/therapies/gene-therapy" element={<GeneTherapy />} />
              <Route path="/therapies/cell-therapy" element={<CellTherapy />} />
              <Route path="/therapies/rna-therapeutics" element={<RNATherapeutics />} />
              <Route path="/therapies/advanced-therapeutics" element={<AdvancedTherapeutics />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/post/:slug" element={<BlogPost />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
            </Routes>
          </main>
          <Footer />
          <Genie />
          <CookieConsent />
        </div>
      </Router>
    </AuthProvider>
  );
}