import React, { useState, useEffect } from 'react';
import { Search, X, Calendar, Package, Sparkles, User, FileText, ArrowRight } from 'lucide-react';
import { useV3Store } from '../../store/v3Store';
import { useNavigate } from 'react-router-dom';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setSearchOpen, packages, services, galleryItems, blogs, employees } = useV3Store();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredPackages = packages.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()));
  const filteredServices = services.filter(s => s.name.toLowerCase().includes(query.toLowerCase()) || s.description.toLowerCase().includes(query.toLowerCase()));
  const filteredGallery = galleryItems.filter(g => g.title.toLowerCase().includes(query.toLowerCase()) || g.category.toLowerCase().includes(query.toLowerCase()));
  const filteredBlogs = blogs.filter(b => b.title.toLowerCase().includes(query.toLowerCase()) || b.category.toLowerCase().includes(query.toLowerCase()));
  const filteredEmployees = employees.filter(e => e.name.toLowerCase().includes(query.toLowerCase()) || e.role.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (path: string) => {
    setSearchOpen(false);
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-800">
          <Search className="w-5 h-5 text-amber-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Gallery, Services, Packages, Blogs, Staff & FAQs... (ESC to close)"
            className="w-full bg-transparent text-slate-100 placeholder-slate-400 text-sm focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Window */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {query.trim() === '' && (
            <div className="text-center py-8 text-slate-400 text-sm">
              <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-2 opacity-80" />
              Type to instantly search across Apex Events V3 platform data.
              <div className="flex justify-center gap-2 mt-4 text-xs">
                <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">Ctrl + K</span>
                <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">ESC</span>
              </div>
            </div>
          )}

          {/* Packages */}
          {filteredPackages.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5" /> Event Packages ({filteredPackages.length})
              </div>
              <div className="space-y-1">
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => handleSelect('/services')}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800/80 cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={pkg.image} alt={pkg.name} className="w-10 h-10 rounded object-cover" />
                      <div>
                        <div className="text-sm font-medium text-slate-100 group-hover:text-amber-400">{pkg.name}</div>
                        <div className="text-xs text-slate-400">${pkg.price.toLocaleString()} • {pkg.category}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-1" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services */}
          {filteredServices.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Luxury Services ({filteredServices.length})
              </div>
              <div className="space-y-1">
                {filteredServices.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => handleSelect('/services')}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800/80 cursor-pointer group transition-colors"
                  >
                    <div>
                      <div className="text-sm font-medium text-slate-100 group-hover:text-amber-400">{srv.name}</div>
                      <div className="text-xs text-slate-400">{srv.description}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blogs */}
          {filteredBlogs.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Published Articles ({filteredBlogs.length})
              </div>
              <div className="space-y-1">
                {filteredBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    onClick={() => handleSelect('/blogs')}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800/80 cursor-pointer group transition-colors"
                  >
                    <div>
                      <div className="text-sm font-medium text-slate-100 group-hover:text-amber-400">{blog.title}</div>
                      <div className="text-xs text-slate-400">{blog.category} • {blog.readTime}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Staff */}
          {filteredEmployees.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> Staff Roster ({filteredEmployees.length})
              </div>
              <div className="space-y-1">
                {filteredEmployees.map((emp) => (
                  <div
                    key={emp.id}
                    onClick={() => handleSelect('/admin')}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800/80 cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="text-sm font-medium text-slate-100 group-hover:text-amber-400">{emp.name}</div>
                        <div className="text-xs text-slate-400">{emp.role} • Status: {emp.status}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
