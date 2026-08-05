import React, { useState } from 'react';
import { mockResources } from '../../data/mockData';
import { Download } from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'datasheet' | 'brochure' | 'whitepaper' | 'video'>('all');

  const filtered = activeTab === 'all' 
    ? mockResources 
    : mockResources.filter((r) => r.type === activeTab);

  const handleDownload = (title: string) => {
    alert(`Starting download simulation for: ${title}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-slate-300">
      
      <div className="space-y-4 mb-12">
        <h1 className="text-3xl font-display font-bold text-white">Technical Resources Hub</h1>
        <p className="text-sm text-slate-400">Download user manuals, structural dynamic whitepapers, and product datasheet indices.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-navy-800 bg-navy-900/30 rounded-xl overflow-hidden p-1.5 gap-1.5 mb-8 w-fit">
        {[
          { id: 'all', label: 'All Resources' },
          { id: 'datasheet', label: 'Datasheets' },
          { id: 'brochure', label: 'Manuals & Brochures' },
          { id: 'whitepaper', label: 'Whitepapers' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`py-2 px-4 rounded-lg text-xs font-bold transition-all ${
              activeTab === t.id 
                ? 'bg-brand-blue text-white shadow' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((res) => (
          <div key={res.id} className="bg-navy-900 border border-navy-800 p-6 rounded-xl flex flex-col justify-between hover:border-brand-blue/35 transition-all">
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-2">
                <span className="text-[10px] font-mono font-bold text-brand-lightBlue bg-brand-blue/10 border border-brand-blue/30 px-2 py-0.5 rounded uppercase">
                  {res.type}
                </span>
                <span className="text-[9px] text-slate-500 font-mono">{res.date}</span>
              </div>
              <h3 className="font-display font-bold text-base text-white line-clamp-2">{res.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{res.description}</p>
            </div>
            
            <button
              onClick={() => handleDownload(res.title)}
              className="mt-6 w-full py-2.5 bg-navy-950 hover:bg-brand-blue hover:text-white text-xs font-bold text-slate-400 rounded-lg flex items-center justify-center gap-1.5 border border-navy-800 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" /> Download Documentation
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
