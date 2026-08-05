import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Activity, ChevronRight, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { mockSolutions, mockProducts } from '../../data/mockData';

export const SolutionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const solution = mockSolutions.find((s) => s.id === id);

  if (!solution) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500 font-sans">
        <HelpCircle className="w-12 h-12 mx-auto text-brand-lightBlue mb-4 opacity-40" />
        <h2 className="text-xl font-bold text-white mb-2">Solution Not Found</h2>
        <Link to="/solutions" className="bg-brand-blue text-white px-5 py-2.5 rounded-lg font-bold">Return to Solutions</Link>
      </div>
    );
  }

  // Get matching products used in this solution
  const products = solution.productsUsed.map((pid) =>
    mockProducts.find((p) => p.id === pid)
  ).filter((p) => p !== undefined);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-slate-300">
      
      {/* Header Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-12 border border-navy-800 shadow-xl">
        <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm z-10" />
        <img src={solution.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        
        <div className="relative z-20 p-8 sm:p-12 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 text-xs text-brand-lightBlue font-bold uppercase tracking-wider">
            <Activity className="w-4 h-4 animate-pulse" /> Engineering Application
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight">{solution.name}</h1>
          <p className="text-base text-slate-300 leading-relaxed">{solution.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Side: Scope details, problem and solution workflow */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Challenge & Solution details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-navy-900 border border-navy-800 p-8 rounded-2xl">
            <div className="space-y-3">
              <h3 className="font-display font-bold text-sm text-brand-accent uppercase tracking-wider">The Engineering Challenge</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{solution.problem}</p>
            </div>
            <div className="space-y-3 border-t md:border-t-0 md:border-l border-navy-800/80 pt-6 md:pt-0 md:pl-8">
              <h3 className="font-display font-bold text-sm text-emerald-400 uppercase tracking-wider">The Deployed Technology</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{solution.solutionText}</p>
            </div>
          </div>

          {/* Workflow flow steps */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-lg text-white border-b border-navy-850 pb-3">Service Deployed Workflow</h3>
            <div className="relative border-l border-navy-800 pl-6 ml-3 space-y-8">
              {solution.workflow.map((step, i) => (
                <div key={i} className="relative">
                  {/* Step bullet dot */}
                  <span className="absolute -left-9 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-navy-950 border border-navy-800 text-[10px] font-bold text-brand-lightBlue">
                    0{i+1}
                  </span>
                  <h4 className="font-display font-bold text-sm text-white">{step}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Case Studies / Projects */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-lg text-white border-b border-navy-850 pb-3">Case Study Spotlight</h3>
            {solution.caseStudies.map((cs, i) => (
              <div key={i} className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white font-display text-base">{cs.title}</span>
                  <span className="text-brand-lightBlue font-bold font-mono">Client: {cs.client}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-400 border-t border-navy-800/60 pt-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">The Challenge</span>
                    <p className="leading-relaxed">{cs.challenge}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Implementation</span>
                    <p className="leading-relaxed">{cs.implementation}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block font-display text-brand-lightBlue">Project Results</span>
                    <p className="leading-relaxed text-slate-300 font-medium">{cs.results}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Side: Products Used list */}
        <div className="space-y-8">
          <div className="bg-navy-900 border border-navy-800 p-6 rounded-2xl space-y-6">
            <h3 className="font-display font-bold text-base text-white border-b border-navy-800 pb-3">Recommended Hardware</h3>
            
            <div className="space-y-4">
              {products.map((p) => (
                <div key={p.id} className="flex gap-3 items-center p-2.5 bg-navy-950 border border-navy-800/80 rounded-xl hover:border-brand-blue/30 transition-colors">
                  <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-lg bg-navy-800 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-display font-bold text-white text-xs truncate">
                      <Link to={`/products/${p.id}`} className="hover:underline">{p.name}</Link>
                    </h4>
                    <p className="text-[9px] font-mono text-slate-500 truncate">{p.sku}</p>
                  </div>
                  <Link to={`/products/${p.id}`} className="p-1.5 bg-navy-900 border border-navy-800 text-slate-400 hover:text-white rounded">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
            
            <Link 
              to="/products"
              className="w-full inline-flex items-center justify-center gap-1.5 bg-brand-blue hover:bg-brand-darkBlue text-white font-bold py-2.5 rounded-lg text-xs transition-colors"
            >
              Browse Full Catalog <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-navy-900 to-navy-800 border border-navy-800 p-6 rounded-2xl space-y-4 text-center">
            <ShieldCheck className="w-10 h-10 text-brand-lightBlue mx-auto opacity-80" />
            <h4 className="font-display font-bold text-white text-sm">Need a Customized Dynamic System?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Our designers can package custom sensor arrays to integrate directly with your telemetry databases.</p>
            <Link to="/contact" className="inline-block text-xs font-bold text-brand-lightBlue hover:underline">Contact System Designers →</Link>
          </div>
        </div>

      </div>

    </div>
  );
};
