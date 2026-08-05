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

// V3 Modals
import { GlobalSearchModal } from './components/v3/ui/GlobalSearchModal';
import { AiRecommendationModal } from './components/v3/ui/AiRecommendationModal';
import { InvoicePdfModal } from './components/v3/ui/InvoicePdfModal';
import { PaymentGatewayModal } from './components/v3/ui/PaymentGatewayModal';
import { PwaInstallBanner } from './components/v3/ui/PwaInstallBanner';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-poppins antialiased selection:bg-amber-500 selection:text-slate-950">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LuxuryHomePage />} />
            <Route path="/services" element={<ServicesPackagesPage />} />
            <Route path="/gallery" element={<InteractiveGalleryPage />} />
            <Route path="/ai-planner" element={<AiEventPlannerPage />} />
            <Route path="/blogs" element={<LuxuryBlogPage />} />
            <Route path="/portal" element={<CustomerPortal />} />
            <Route path="/admin" element={<AdminLayout />} />
          </Routes>
        </main>

        <Footer />

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
