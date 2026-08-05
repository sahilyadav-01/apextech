import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Cpu, Activity, HelpCircle, FileText } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { mockSolutions, mockResources } from '../../data/mockData';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const allProducts = useAppStore((state) => state.products);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Handle Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  // Perform search matching
  const matchingProducts = query.trim()
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.sku.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const matchingSolutions = query.trim()
    ? mockSolutions.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          s.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const matchingResources = query.trim()
    ? mockResources.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const hasResults =
    matchingProducts.length > 0 || matchingSolutions.length > 0 || matchingResources.length > 0;

  const selectItem = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-navy-950/80 backdrop-blur-md flex items-start justify-center pt-[10vh] px-4 font-sans">
      <div className="bg-navy-900 border border-navy-700 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-zoom-in">
        
        {/* Search Input Box */}
        <div className="flex items-center border-b border-navy-800 p-4 gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products, models, specifications, solutions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-white placeholder-slate-500 focus:outline-none focus:ring-0 text-base"
          />
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-navy-800 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {!query.trim() ? (
            <div className="text-center py-8 text-slate-500 space-y-2">
              <HelpCircle className="w-8 h-8 mx-auto opacity-40 text-brand-lightBlue" />
              <p className="text-sm">Type to search the platform...</p>
              <p className="text-xs">Examples: "Xeon", "Strain", "cDAQ", "Structural"</p>
            </div>
          ) : !hasResults ? (
            <div className="text-center py-8 text-slate-500">
              <p className="text-sm">No results match your search term.</p>
            </div>
          ) : (
            <>
              {/* Product Results */}
              {matchingProducts.length > 0 && (
                <div>
                  <h4 className="text-xs font-display font-bold text-brand-lightBlue tracking-widest uppercase mb-2 px-2">Products ({matchingProducts.length})</h4>
                  <div className="space-y-1">
                    {matchingProducts.slice(0, 5).map((p) => (
                      <button
                        key={p.id}
                        onClick={() => selectItem(`/products/${p.id}`)}
                        className="w-full text-left p-3 hover:bg-navy-800 rounded-lg flex items-center gap-3 transition-colors group"
                      >
                        <Cpu className="w-5 h-5 text-slate-400 group-hover:text-brand-lightBlue shrink-0" />
                        <div>
                          <p className="font-medium text-white text-sm">{p.name}</p>
                          <p className="text-xs text-slate-500">{p.sku} • {p.brand}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Solutions Results */}
              {matchingSolutions.length > 0 && (
                <div>
                  <h4 className="text-xs font-display font-bold text-brand-lightBlue tracking-widest uppercase mb-2 px-2">Solutions ({matchingSolutions.length})</h4>
                  <div className="space-y-1">
                    {matchingSolutions.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => selectItem(`/solutions/${s.id}`)}
                        className="w-full text-left p-3 hover:bg-navy-800 rounded-lg flex items-center gap-3 transition-colors group"
                      >
                        <Activity className="w-5 h-5 text-slate-400 group-hover:text-brand-lightBlue shrink-0" />
                        <div>
                          <p className="font-medium text-white text-sm">{s.name}</p>
                          <p className="text-xs text-slate-500">{s.subtitle}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Resource Results */}
              {matchingResources.length > 0 && (
                <div>
                  <h4 className="text-xs font-display font-bold text-brand-lightBlue tracking-widest uppercase mb-2 px-2">Resources ({matchingResources.length})</h4>
                  <div className="space-y-1">
                    {matchingResources.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => selectItem(`/resources`)}
                        className="w-full text-left p-3 hover:bg-navy-800 rounded-lg flex items-center gap-3 transition-colors group"
                      >
                        <FileText className="w-5 h-5 text-slate-400 group-hover:text-brand-lightBlue shrink-0" />
                        <div>
                          <p className="font-medium text-white text-sm">{r.title}</p>
                          <p className="text-xs text-slate-500">{r.type} • {r.category}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};
