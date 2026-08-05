import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Activity, Settings, UserCheck, Wrench, Headphones } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-slate-300">
      
      <div className="text-center space-y-4 mb-16">
        <div className="text-brand-lightBlue font-display font-bold text-xs tracking-widest uppercase">TECHNICAL SERVICES</div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">End-to-End Engineering Support</h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">We provide comprehensive field and laboratory services to ensure your testing is accurate and compliant.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { title: 'Installation & Commissioning', desc: 'On-site sensor mountings, cabling channels, junction box wiring, and local loop calibration tests.', icon: <Wrench className="w-6 h-6" /> },
          { title: 'System Design & Consulting', desc: 'Developing custom instrumentation indices, interface hook-ups, and workstation hardware compatibility sheets.', icon: <Settings className="w-6 h-6" /> },
          { title: 'ISO/IEC 17025 Calibration', desc: 'Certified dynamic sensor calibration traceable to national standard metrology reference protocols.', icon: <Activity className="w-6 h-6" /> },
          { title: 'Annual Maintenance Contracts', desc: 'Structured field audits, diagnostic diagnostics, hardware firmware updates, and rapid spare swapping.', icon: <ShieldCheck className="w-6 h-6" /> },
          { title: 'Operator Training Programs', desc: 'Hands-on courses covering measurement basics, software settings, and data logging diagnostics.', icon: <UserCheck className="w-6 h-6" /> },
          { title: '24/7 Technical Support', desc: 'Rapid priority ticketing channels and emergency diagnostic dispatching for critical facilities.', icon: <Headphones className="w-6 h-6" /> }
        ].map((s, i) => (
          <div key={i} className="bg-navy-900 border border-navy-800 p-6 rounded-xl flex flex-col justify-between hover:border-brand-blue/35 transition-colors">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-brand-blue/10 border border-brand-blue/30 text-brand-lightBlue flex items-center justify-center">
                {s.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-white">{s.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
            <Link to="/contact" className="text-xs font-bold text-brand-lightBlue hover:underline mt-6 block">Request Quote for Service →</Link>
          </div>
        ))}
      </div>

    </div>
  );
};
