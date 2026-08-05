import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

export const ContactPage: React.FC = () => {
  const { addQuoteRequest } = useAppStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !msg) return;

    addQuoteRequest({
      name,
      company: 'General Contact Form',
      email,
      phone: 'Not provided',
      country: 'India',
      application: 'general',
      projectDetails: msg,
      timeline: 'medium',
      items: [],
    });
    setName('');
    setEmail('');
    setMsg('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-slate-300">
      
      <div className="space-y-4 mb-12">
        <h1 className="text-3xl font-display font-bold text-white">Contact Our Engineering Offices</h1>
        <p className="text-sm text-slate-400">Get in touch directly with our sales, support, or technical departments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Col: Details */}
        <div className="space-y-8 bg-navy-900 border border-navy-800 p-8 rounded-2xl h-fit">
          <div className="space-y-2">
            <h3 className="font-display font-bold text-lg text-white">Office Locations</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Operated from Gurgaon and Chandigarh, with local sales channels nationwide.</p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <MapPin className="w-6 h-6 text-brand-lightBlue shrink-0 mt-0.5" />
              <div>
                <h4 className="font-display font-bold text-sm text-white">Chandigarh Head Office</h4>
                <p className="text-xs text-slate-400 mt-1">Plot No. 42, Industrial Area Phase-2, Chandigarh - 160002, India</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone className="w-6 h-6 text-brand-lightBlue shrink-0" />
              <div>
                <h4 className="font-display font-bold text-sm text-white">Phone Support Channels</h4>
                <p className="text-xs text-slate-400 mt-1">+91 124 4929000 (Board Line)<br/>+91 85860 52255 (Enquiries)</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Mail className="w-6 h-6 text-brand-lightBlue shrink-0" />
              <div>
                <h4 className="font-display font-bold text-sm text-white">Direct Email Channels</h4>
                <p className="text-xs text-slate-400 mt-1">sales@apextech-instruments.com<br/>enquiries@instrumentation-solutions.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Consultation Form */}
        <div className="bg-navy-900 border border-navy-800 p-8 rounded-2xl relative shadow-xl">
          {success && (
            <div className="absolute inset-0 bg-navy-900/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 rounded-2xl z-10 space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-400" />
              <h3 className="font-display font-bold text-white text-lg">Message Submitted Successfully</h3>
              <p className="text-xs text-slate-400 max-w-xs">An administrator will direct your query to the appropriate department.</p>
            </div>
          )}
          
          <h3 className="font-display font-bold text-xl text-white mb-6">Drop Us a Message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Your Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-brand-blue"
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@company.com"
                className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Message / Project Brief</label>
              <textarea 
                rows={5} 
                required
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Specify what type of services or hardware components you need..."
                className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-brand-blue resize-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-brand-blue hover:bg-brand-darkBlue text-white font-bold py-3 rounded-lg text-sm transition-colors mt-2"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
