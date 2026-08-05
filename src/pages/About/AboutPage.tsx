import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-slate-300">
      
      <div className="text-center space-y-4 mb-16">
        <div className="text-brand-lightBlue font-display font-bold text-xs tracking-widest uppercase">ABOUT US</div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">ApexTech Instrumentation</h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">Providing advanced metrology sensors, data acquisition setups, and professional workstations nationwide.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">Our Engineering Mission</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Founded with a vision to bridge the gap between heavy structural engineering and advanced computing hardware, ApexTech delivers traceably calibrated, ISO-compliant instrumentation systems.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            Our teams operate nationwide, assisting road testing campaigns, earthquake seismology networks, and advanced composite materials laboratories.
          </p>
        </div>
        <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-navy-800 bg-navy-900">
          <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80" alt="" className="w-full h-full object-cover" />
        </div>
      </div>

    </div>
  );
};
