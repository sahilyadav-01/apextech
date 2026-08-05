import React from 'react';
import { mockSolutions } from '../../data/mockData';

export const ProjectsPage: React.FC = () => {
  const allCaseStudies = mockSolutions.flatMap((s) =>
    s.caseStudies.map((cs) => ({
      ...cs,
      solutionName: s.name,
      solutionId: s.id,
    }))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-slate-300">
      <div className="space-y-4 mb-12">
        <h1 className="text-3xl font-display font-bold text-white">Project Case Studies</h1>
        <p className="text-sm text-slate-400">Discover details on real-world instrumentation systems and computing architectures deployed in structural and research fields.</p>
      </div>

      <div className="space-y-8">
        {allCaseStudies.map((cs, i) => (
          <div key={i} className="bg-navy-900 border border-navy-800 rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold text-brand-lightBlue uppercase tracking-wider bg-brand-blue/15 border border-brand-blue/30 px-2.5 py-0.5 rounded-full">
                {cs.solutionName}
              </span>
              <h2 className="font-display font-bold text-xl text-white mt-2">{cs.title}</h2>
              <p className="text-xs text-slate-500 font-mono">Client: {cs.client}</p>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-400">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">The Challenge</span>
                <p className="leading-relaxed">{cs.challenge}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Implementation</span>
                <p className="leading-relaxed">{cs.implementation}</p>
              </div>
              <div className="space-y-1 bg-navy-950 p-4 rounded-xl border border-navy-850">
                <span className="text-[10px] uppercase font-bold text-brand-lightBlue block">Project Results</span>
                <p className="leading-relaxed text-white font-medium mt-1">{cs.results}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
