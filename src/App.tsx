import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/v3/layout/Navbar';
import { Footer } from './components/v3/layout/Footer';
import { LuxuryHomePage } from './pages/v3/Customer/LuxuryHomePage';
import { ServicesPackagesPage } from './pages/v3/Customer/ServicesPackagesPage';
import { InteractiveGalleryPage } from './pages/v3/Customer/InteractiveGalleryPage';
import { AiEventPlannerPage } from './pages/v3/Customer/AiEventPlannerPage';
import { LuxuryBlogPage } from './pages/v3/Customer/LuxuryBlogPage';
import { CustomerPortal } from './pages/v3/Customer/CustomerPortal';
import { AdminLayout } from './components/v3/layout/AdminLayout';
import { AboutPage } from './pages/About/AboutPage';
import { ContactPage } from './pages/Contact/ContactPage';
import { ProjectsPage } from './pages/Projects/ProjectsPage';

// V3 Modals & Floating Tools
import { GlobalSearchModal } from './components/v3/ui/GlobalSearchModal';
import { AiRecommendationModal } from './components/v3/ui/AiRecommendationModal';
import { InvoicePdfModal } from './components/v3/ui/InvoicePdfModal';
import { PaymentGatewayModal } from './components/v3/ui/PaymentGatewayModal';
import { PwaInstallBanner } from './components/v3/ui/PwaInstallBanner';
import { WhatsAppActionBtn } from './components/v3/ui/WhatsAppActionBtn';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-poppins antialiased selection:bg-amber-500 selection:text-slate-950 relative">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LuxuryHomePage />} />
            <Route path="/services" element={<ServicesPackagesPage />} />
            <Route path="/gallery" element={<InteractiveGalleryPage />} />
            <Route path="/ai-planner" element={<AiEventPlannerPage />} />
            <Route path="/blogs" element={<LuxuryBlogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/portal" element={<CustomerPortal />} />
            <Route path="/admin" element={<AdminLayout />} />
          </Routes>
        </main>

        <Footer />

        {/* Floating WhatsApp Concierge Action Button */}
        <div className="fixed bottom-6 right-6 z-40 shadow-2xl">
          <WhatsAppActionBtn phone="+15550192834" customerName="Apex Guest" bookingCode="VIP-DIRECT" type="chat" size="lg" />
        </div>

        {/* Global Modals & PWA Overlay */}
        <GlobalSearchModal />
        <AiRecommendationModal />
        <InvoicePdfModal />
        <PaymentGatewayModal />
        <PwaInstallBanner />
      </div>
    </Router>
  );
};

export default App;
