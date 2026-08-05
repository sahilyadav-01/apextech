import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ChevronRight } from 'lucide-react';
import { mockSolutions } from '../../data/mockData';

export const SolutionsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-slate-300">
      <div className="space-y-4 mb-12">
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
          <Activity className="w-8 h-8 text-brand-lightBlue" />
          Engineering Applications &amp; Solutions
        </h1>
        <p className="text-sm text-slate-400">Discover integrated sensor arrays and telemetry platforms deployed in critical civil and industrial frameworks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockSolutions.map((sol) => (
          <div key={sol.id} className="bg-navy-900 border border-navy-800 hover:border-brand-blue/30 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-xl">
            <div>
              <div className="relative aspect-[21/9] overflow-hidden">
                <img src={sol.image} alt={sol.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="font-display font-bold text-xl text-white group-hover:text-brand-lightBlue transition-colors">{sol.name}</h3>
                <p className="text-xs text-brand-lightBlue font-medium">{sol.subtitle}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{sol.description}</p>
              </div>
            </div>
            
            <div className="p-6 pt-0 border-t border-navy-800/50 mt-4 flex items-center justify-between">
              <div className="flex gap-2">
                {sol.industries.map((ind) => (
                  <span key={ind} className="bg-navy-950 px-2.5 py-0.5 rounded text-[10px] uppercase font-mono text-slate-500">
                    {ind}
                  </span>
                ))}
              </div>
              <Link to={`/solutions/${sol.id}`} className="text-xs font-bold text-brand-lightBlue hover:underline flex items-center gap-0.5">Explore Case Studies <ChevronRight className="w-3.5 h-3.5" /></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
