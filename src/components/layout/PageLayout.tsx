import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { GlobalSearch } from '../common/GlobalSearch';
import { QuoteBasketDrawer } from '../quote/QuoteBasketDrawer';
import { QuoteRequestModal } from '../quote/QuoteRequestModal';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-navy-950 text-slate-100 font-sans selection:bg-brand-blue selection:text-white">
      
      {/* Navbar with handles */}
      <Navbar
        onSearchOpen={() => setIsSearchOpen(true)}
        onCartOpen={() => setIsCartOpen(true)}
        onQuoteOpen={() => setIsQuoteOpen(true)}
      />

      {/* Main content body with top header offset */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Search Modal */}
      <GlobalSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Cart Slider Drawer */}
      <QuoteBasketDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => setIsQuoteOpen(true)}
      />

      {/* General Quote Modal */}
      <QuoteRequestModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />

    </div>
  );
};
