import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Search, Bell, Menu, X } from 'lucide-react';
import { useV3Store } from '../../../store/v3Store';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const { setSearchOpen, setAiModalOpen, unreadNotificationCount, markNotificationsAsRead, notifications } = useV3Store();
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();


  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Packages', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'AI Planner', path: '/ai-planner' },
    { name: 'Journal', path: '/blogs' },
    { name: 'My Portal', path: '/portal' },
    { name: 'Admin Panel', path: '/admin' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 font-poppins">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-heading font-extrabold text-xl shadow-glow-gold transition-transform group-hover:scale-105">
            A
          </div>
          <div>
            <div className="text-xl font-heading font-extrabold text-slate-100 tracking-wider group-hover:text-amber-400 transition-colors">
              APEX EVENTS
            </div>
            <div className="text-[9px] text-amber-400 font-mono tracking-widest uppercase">
              VERSION 3.0 LUXURY SAAS
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors py-1 ${
                  isActive ? 'text-amber-400 font-semibold border-b-2 border-amber-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions (Search, AI Button, Notifications) */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Universal Search (Ctrl+K) */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span>Search...</span>
            <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] border border-slate-700">Ctrl+K</span>
          </button>

          {/* AI Trigger */}
          <Button
            variant="primary"
            size="sm"
            onClick={() => setAiModalOpen(true)}
            icon={<Sparkles className="w-3.5 h-3.5" />}
          >
            AI Decor
          </Button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                if (unreadNotificationCount > 0) markNotificationsAsRead();
              }}
              className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center shadow-glow-gold">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-4 space-y-3 z-50 animate-fade-in text-xs">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="font-bold text-slate-100">Live Socket Alerts</span>
                  <span className="text-[10px] text-amber-400">Real-Time</span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2 bg-slate-950/80 rounded border border-slate-800 space-y-0.5">
                      <div className="font-semibold text-slate-200">{n.title}</div>
                      <p className="text-slate-400 text-[11px]">{n.message}</p>
                      <span className="text-[9px] text-slate-500 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 py-4 space-y-3 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-amber-400 py-1.5"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
