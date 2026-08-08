import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';


export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-12 font-poppins text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand info */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold font-heading text-lg">
              A
            </div>
            <span className="font-heading font-extrabold text-slate-100 text-lg tracking-wider">APEX EVENTS</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Enterprise luxury event management &amp; staging platform. Powered by AI decoration suggestors, instant PDF tax invoices, and real-time Socket.IO synchronization.
          </p>
          <div className="text-amber-400 font-semibold">© 2026 Apex Events Inc. All rights reserved.</div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-slate-100 uppercase text-xs tracking-wider">Platform Modules</h4>
          <ul className="space-y-2">
            <li><Link to="/services" className="hover:text-amber-400 transition-colors">Event Packages &amp; Add-ons</Link></li>
            <li><Link to="/gallery" className="hover:text-amber-400 transition-colors">Pinterest WebP Gallery</Link></li>
            <li><Link to="/ai-planner" className="hover:text-amber-400 transition-colors">AI Decor Architect</Link></li>
            <li><Link to="/projects" className="hover:text-amber-400 transition-colors">VIP Case Studies</Link></li>
            <li><Link to="/blogs" className="hover:text-amber-400 transition-colors">Design Journal &amp; Guides</Link></li>
            <li><Link to="/about" className="hover:text-amber-400 transition-colors">About Apex Events</Link></li>
            <li><Link to="/contact" className="hover:text-amber-400 transition-colors">VIP Consultation Inquiry</Link></li>
            <li><Link to="/portal" className="hover:text-amber-400 transition-colors">Customer Portal</Link></li>
          </ul>
        </div>

        {/* Admin Suite */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-slate-100 uppercase text-xs tracking-wider">Enterprise Admin</h4>
          <ul className="space-y-2">
            <li><Link to="/admin" className="hover:text-amber-400 transition-colors">Executive Dashboard</Link></li>
            <li><Link to="/admin" className="hover:text-amber-400 transition-colors">Bookings Kanban</Link></li>
            <li><Link to="/admin" className="hover:text-amber-400 transition-colors">VIP CRM Contacts</Link></li>
            <li><Link to="/admin" className="hover:text-amber-400 transition-colors">Employee Roster</Link></li>
            <li><Link to="/admin" className="hover:text-amber-400 transition-colors">GST Invoice Builder</Link></li>
          </ul>
        </div>

        {/* Concierge & Contact */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-slate-100 uppercase text-xs tracking-wider">Concierge Support</h4>
          <div className="space-y-2 text-slate-300">
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-400" /> 767 5th Ave, Suite 800, NY</div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-amber-400" /> +1 (555) 019-2834</div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-amber-400" /> concierge@apexevents.com</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
