import React from 'react';
import { Link } from 'react-router-dom';
import { mockIndustries } from '../../data/mockData';

export const IndustriesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-slate-300">
      <div className="space-y-4 mb-12 text-center">
        <div className="text-brand-lightBlue font-display font-bold text-xs tracking-widest uppercase">INDUSTRIES WE SERVE</div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">Built for Demanding Environments</h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">We provide certified hardware and integration support for key sectors including aerospace, railways, and infrastructure.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {mockIndustries.map((ind) => (
          <div key={ind.id} className="bg-navy-900 border border-navy-800 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xl">
            <div>
              <img src={ind.image} alt={ind.name} className="w-full h-48 object-cover border-b border-navy-800" />
              <div className="p-6 space-y-3">
                <h3 className="font-display font-bold text-lg text-white">{ind.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{ind.description}</p>
              </div>
            </div>
            
            <div className="p-6 pt-0 mt-4 border-t border-navy-800/60 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-mono">Solutions: {ind.solutions.length}</span>
              <Link to="/solutions" className="text-xs font-bold text-brand-lightBlue hover:underline">Explore Solutions →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
