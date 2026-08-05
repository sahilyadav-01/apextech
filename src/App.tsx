import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { HomePage } from './pages/Home/HomePage';
import { ProductListing } from './pages/Products/ProductListing';
import { ProductDetail } from './pages/Products/ProductDetail';
import { ProductComparison } from './pages/Products/ProductComparison';
import { ProductConfigurator } from './pages/Products/ProductConfigurator';
import { SolutionsPage } from './pages/Solutions/SolutionsPage';
import { SolutionDetail } from './pages/Solutions/SolutionDetail';
import { IndustriesPage } from './pages/Industries/IndustriesPage';
import { ServicesPage } from './pages/Services/ServicesPage';
import { ProjectsPage } from './pages/Projects/ProjectsPage';
import { ResourcesPage } from './pages/Resources/ResourcesPage';
import { AboutPage } from './pages/About/AboutPage';
import { ContactPage } from './pages/Contact/ContactPage';
import { AdminDashboard } from './pages/Admin/AdminDashboard';

export const App: React.FC = () => {
  return (
    <Router>
      <PageLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/compare" element={<ProductComparison />} />
          <Route path="/configurator" element={<ProductConfigurator />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/:id" element={<SolutionDetail />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </PageLayout>
    </Router>
  );
};

export default App;
