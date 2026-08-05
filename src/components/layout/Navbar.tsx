import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Scale, ShoppingCart, Menu, X, ChevronDown, Cpu, Activity, Database } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useCompareStore } from '../../store/compareStore';

interface NavbarProps {
  onSearchOpen: () => void;
  onCartOpen: () => void;
  onQuoteOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchOpen, onCartOpen, onQuoteOpen }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const cartItemsCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
  const compareCount = useCompareStore((state) => state.selectedIds.length);

  const handleProductsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setProductsMenuOpen(!productsMenuOpen);
  };

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setProductsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-950/95 backdrop-blur-md border-b border-navy-800 text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" onClick={closeMenus} className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-brand-blue to-brand-lightBlue shadow-lg shadow-brand-blue/30">
              <span className="font-display font-extrabold text-xl text-white">IS</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg leading-tight tracking-wide">ApexTech</span>
              <span className="font-sans text-[10px] tracking-widest text-brand-lightBlue uppercase font-semibold">Instrumentation</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link to="/" onClick={closeMenus} className="px-3 py-2 text-sm font-medium hover:text-brand-lightBlue transition-colors">Home</Link>
            
            {/* Solutions Dropdown Trigger */}
            <Link to="/solutions" onClick={closeMenus} className="px-3 py-2 text-sm font-medium hover:text-brand-lightBlue transition-colors">Solutions</Link>
            
            {/* Products Mega Menu Trigger */}
            <div className="relative group">
              <button 
                onClick={handleProductsClick}
                onMouseEnter={() => setProductsMenuOpen(true)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium hover:text-brand-lightBlue transition-colors focus:outline-none"
              >
                Products <ChevronDown className="w-4 h-4" />
              </button>

              {/* Mega Menu Dropdown */}
              {(productsMenuOpen) && (
                <div 
                  onMouseLeave={() => setProductsMenuOpen(false)}
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-[720px] bg-navy-900 border border-navy-700 rounded-xl shadow-2xl p-6 grid grid-cols-4 gap-6 animate-fade-in"
                >
                  <div>
                    <div className="flex items-center gap-2 font-display font-bold text-brand-lightBlue text-xs tracking-wider uppercase mb-3">
                      <Cpu className="w-4 h-4" /> Computing
                    </div>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li><Link to="/products?category=computing&sub=cpu-processors" onClick={closeMenus} className="hover:text-white transition-colors">Processors / CPU</Link></li>
                      <li><Link to="/products?category=computing&sub=gpu" onClick={closeMenus} className="hover:text-white transition-colors">Professional GPUs</Link></li>
                      <li><Link to="/products?category=computing&sub=motherboards" onClick={closeMenus} className="hover:text-white transition-colors">Workstation Boards</Link></li>
                      <li><Link to="/products?category=computing&sub=servers" onClick={closeMenus} className="hover:text-white transition-colors">Servers & Storage</Link></li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 font-display font-bold text-brand-lightBlue text-xs tracking-wider uppercase mb-3">
                      <Activity className="w-4 h-4" /> Sensors
                    </div>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li><Link to="/products?category=sensors&sub=accelerometers" onClick={closeMenus} className="hover:text-white transition-colors">Accelerometers</Link></li>
                      <li><Link to="/products?category=sensors&sub=strain" onClick={closeMenus} className="hover:text-white transition-colors">Strain Gauges</Link></li>
                      <li><Link to="/products?category=sensors&sub=load" onClick={closeMenus} className="hover:text-white transition-colors">Load Cells</Link></li>
                      <li><Link to="/products?category=sensors&sub=pressure" onClick={closeMenus} className="hover:text-white transition-colors">Pressure Sensors</Link></li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 font-display font-bold text-brand-lightBlue text-xs tracking-wider uppercase mb-3">
                      <Database className="w-4 h-4" /> DAQ System
                    </div>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li><Link to="/products?category=daq&sub=daq" onClick={closeMenus} className="hover:text-white transition-colors">CompactDAQ Chassis</Link></li>
                      <li><Link to="/products?category=daq&sub=data-loggers" onClick={closeMenus} className="hover:text-white transition-colors">Data Loggers</Link></li>
                      <li><Link to="/products?category=daq&sub=signal-conditioning" onClick={closeMenus} className="hover:text-white transition-colors">Signal Conditioning</Link></li>
                    </ul>
                  </div>

                  <div className="bg-navy-800/40 rounded-lg p-4 flex flex-col justify-between border border-navy-700/50">
                    <div>
                      <h4 className="font-display font-bold text-white text-sm mb-1">Workstation Configurator</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">Build and check dynamic B2B workstation specs.</p>
                    </div>
                    <Link 
                      to="/configurator" 
                      onClick={closeMenus}
                      className="inline-flex items-center justify-center text-xs font-bold bg-brand-blue hover:bg-brand-darkBlue text-white py-2 px-3 rounded-md transition-colors"
                    >
                      Configure Now
                    </Link>
                  </div>
                  
                  <div className="col-span-4 border-t border-navy-800 pt-4 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Looking for other components?</span>
                    <Link to="/products" onClick={closeMenus} className="font-bold text-brand-lightBlue hover:underline">View All Product Categories →</Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/industries" onClick={closeMenus} className="px-3 py-2 text-sm font-medium hover:text-brand-lightBlue transition-colors">Industries</Link>
            <Link to="/services" onClick={closeMenus} className="px-3 py-2 text-sm font-medium hover:text-brand-lightBlue transition-colors">Services</Link>
            <Link to="/projects" onClick={closeMenus} className="px-3 py-2 text-sm font-medium hover:text-brand-lightBlue transition-colors">Projects</Link>
            <Link to="/resources" onClick={closeMenus} className="px-3 py-2 text-sm font-medium hover:text-brand-lightBlue transition-colors">Resources</Link>
            <Link to="/about" onClick={closeMenus} className="px-3 py-2 text-sm font-medium hover:text-brand-lightBlue transition-colors">About</Link>
            <Link to="/contact" onClick={closeMenus} className="px-3 py-2 text-sm font-medium hover:text-brand-lightBlue transition-colors">Contact</Link>
          </div>

          {/* Action Utilities (Right side) */}
          <div className="hidden lg:flex items-center space-x-4">
            
            {/* Search Trigger */}
            <button 
              onClick={onSearchOpen} 
              className="p-2 text-slate-300 hover:text-white transition-colors hover:bg-navy-800 rounded-lg"
              title="Search Ctrl+K"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Compare Trigger */}
            <Link 
              to="/compare" 
              className="p-2 text-slate-300 hover:text-white transition-colors hover:bg-navy-800 rounded-lg relative"
              title="Compare Products"
            >
              <Scale className="w-5 h-5" />
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-lightBlue text-[10px] font-bold text-white shadow-md shadow-brand-lightBlue/20">
                  {compareCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button 
              onClick={onCartOpen}
              className="p-2 text-slate-300 hover:text-white transition-colors hover:bg-navy-800 rounded-lg relative"
              title="Quote Basket"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-accent text-[10px] font-bold text-white shadow-md shadow-brand-accent/20 animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* RFQ Trigger */}
            <button 
              onClick={onQuoteOpen}
              className="bg-brand-blue hover:bg-brand-darkBlue text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-all shadow-md shadow-brand-blue/20 hover:shadow-brand-blue/30 active:scale-95"
            >
              Request a Quote
            </button>

            {/* Admin shortcut */}
            <Link to="/admin" className="text-[10px] text-slate-500 hover:text-slate-300 font-mono transition-colors">/admin</Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center space-x-3">
            <button onClick={onSearchOpen} className="p-2 text-slate-300"><Search className="w-5 h-5" /></button>
            <button onClick={onCartOpen} className="p-2 text-slate-300 relative">
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 h-4.5 w-4.5 rounded-full bg-brand-accent text-[9px] font-bold flex items-center justify-center text-white">{cartItemsCount}</span>
              )}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-900 border-t border-navy-800 p-4 space-y-2 animate-fade-in">
          <Link to="/" onClick={closeMenus} className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-navy-800 hover:text-white">Home</Link>
          <Link to="/solutions" onClick={closeMenus} className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-navy-800 hover:text-white">Solutions</Link>
          <Link to="/products" onClick={closeMenus} className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-navy-800 hover:text-white font-bold text-brand-lightBlue">Products Catalog</Link>
          <Link to="/configurator" onClick={closeMenus} className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-navy-800 hover:text-white">Workstation Configurator</Link>
          <Link to="/compare" onClick={closeMenus} className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-navy-800 hover:text-white">Compare Products ({compareCount})</Link>
          <Link to="/industries" onClick={closeMenus} className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-navy-800 hover:text-white">Industries</Link>
          <Link to="/services" onClick={closeMenus} className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-navy-800 hover:text-white">Services</Link>
          <Link to="/projects" onClick={closeMenus} className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-navy-800 hover:text-white">Projects</Link>
          <Link to="/resources" onClick={closeMenus} className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-navy-800 hover:text-white">Resources</Link>
          <Link to="/about" onClick={closeMenus} className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-navy-800 hover:text-white">About</Link>
          <Link to="/contact" onClick={closeMenus} className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-navy-800 hover:text-white">Contact</Link>
          <div className="pt-4 border-t border-navy-800">
            <button 
              onClick={() => { closeMenus(); onQuoteOpen(); }}
              className="w-full bg-brand-blue hover:bg-brand-darkBlue text-white font-bold py-3 rounded-lg text-center"
            >
              Request a Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
