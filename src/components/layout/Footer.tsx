import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 border-t border-navy-800 text-slate-400 font-sans pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3 text-white">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-gradient-to-br from-brand-blue to-brand-lightBlue">
                <span className="font-display font-extrabold text-sm">IS</span>
              </div>
              <span className="font-display font-bold text-base leading-tight tracking-wide">ApexTech Instrumentation</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Complete B2B engineering, technical instrumentation, and high-performance computing systems from concept to integration. Certified ISO 9001 quality.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="p-2 bg-navy-900 hover:bg-brand-blue/20 hover:text-white rounded-lg transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </a>
              <a href="#" className="p-2 bg-navy-900 hover:bg-brand-blue/20 hover:text-white rounded-lg transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="p-2 bg-navy-900 hover:bg-brand-blue/20 hover:text-white rounded-lg transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Solutions Col */}
          <div>
            <h4 className="font-display font-bold text-white text-xs tracking-wider uppercase mb-4">Solutions</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/solutions/structural-health-monitoring" className="hover:text-white transition-colors">Structural Health</Link></li>
              <li><Link to="/solutions/pavement-evaluation" className="hover:text-white transition-colors">Pavement Testing</Link></li>
              <li><Link to="/solutions" className="hover:text-white transition-colors">Geophysical Studies</Link></li>
              <li><Link to="/solutions" className="hover:text-white transition-colors">Railway Evaluation</Link></li>
            </ul>
          </div>

          {/* Products Col */}
          <div>
            <h4 className="font-display font-bold text-white text-xs tracking-wider uppercase mb-4">Products</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/products?category=computing" className="hover:text-white transition-colors">Computing Hardware</Link></li>
              <li><Link to="/products?category=sensors" className="hover:text-white transition-colors">Sensors & Strain Gauges</Link></li>
              <li><Link to="/products?category=daq" className="hover:text-white transition-colors">Data Acquisition</Link></li>
              <li><Link to="/products?category=interface-cards" className="hover:text-white transition-colors">PCIe / CAN Cards</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="font-display font-bold text-white text-xs tracking-wider uppercase mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-lightBlue shrink-0 mt-0.5" />
                <span className="leading-relaxed">Plot No. 42, Industrial Area Phase-2, Chandigarh, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-lightBlue shrink-0" />
                <span>+91 12345 67890</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-lightBlue shrink-0" />
                <span>sales@apextech.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Panel */}
        <div className="border-t border-navy-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© 2026 ApexTech Instrumentation Pvt. Ltd. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <Link to="/admin" className="hover:text-slate-300">Admin Console</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
