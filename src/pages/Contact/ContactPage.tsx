import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Sparkles, Send, Calendar, Clock, ShieldCheck } from 'lucide-react';
import { GlassCard } from '../../components/v3/ui/GlassCard';
import { Button } from '../../components/v3/ui/Button';
import { WhatsAppActionBtn } from '../../components/v3/ui/WhatsAppActionBtn';
import { useV3Store } from '../../store/v3Store';

export const ContactPage: React.FC = () => {
  const { addNotification } = useV3Store();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('Palace Wedding');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState('250-500 Guests');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Trigger toast notification into live sockets bar
    addNotification({
      id: 'concierge_' + Date.now(),
      title: 'New VIP Concierge Inquiry',
      message: `Inquiry received from ${name} for ${eventType} (${eventDate || 'Date TBD'}).`,
      time: 'Just now',
      read: false,
    });

    setSuccess(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setTimeout(() => setSuccess(false), 6000);
  };

  return (
    <div className="space-y-12 pb-20 font-poppins max-w-7xl mx-auto px-4 animate-fade-in pt-8">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold rounded-full uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-400" /> 24/7 VIP Concierge &amp; Direct Consultation
        </div>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-100">
          Connect With Our <span className="gold-gradient-text">Event Architects</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 font-light max-w-2xl mx-auto">
          Planning a royal wedding, corporate summit, or DMX kinetic light spectacle? Submit your parameters below for instant response within 2 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Direct Concierge & Global Offices */}
        <div className="space-y-6 lg:col-span-1">
          <GlassCard goldBorder hoverEffect={false} className="p-6 space-y-6">
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <span className="text-[10px] text-amber-400 font-mono font-bold uppercase">INSTANT WHATSAPP LINK</span>
              <h3 className="text-xl font-heading font-bold text-slate-100">VIP Direct Line</h3>
              <p className="text-xs text-slate-400">Connect with our head producer directly on WhatsApp for expedited venue site audits.</p>
            </div>

            <WhatsAppActionBtn phone="+15550192834" customerName="Apex Guest" bookingCode="VIP-ENQUIRY" type="quote" size="lg" />
          </GlassCard>

          <GlassCard hoverEffect={false} className="p-6 space-y-6">
            <h3 className="text-lg font-heading font-bold text-slate-100 border-b border-slate-800 pb-3">Global Headquarters</h3>

            <div className="space-y-5 text-xs text-slate-300">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-100">Executive Design Studio</div>
                  <div className="text-slate-400 mt-0.5">767 Fifth Avenue, Suite 800, New York, NY 10153</div>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="font-bold text-slate-100">24/7 Concierge Hotline</div>
                  <div className="text-slate-400 mt-0.5">+1 (555) 019-2834 • Toll Free: +1 (800) 902-APEX</div>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="font-bold text-slate-100">Direct Desk Email</div>
                  <div className="text-slate-400 mt-0.5">concierge@apexevents.com • staging@apexevents.com</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" /> ISO 9001 Certified Event Security &amp; NDA Protected
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Inquiry Form */}
        <GlassCard hoverEffect={false} className="lg:col-span-2 p-8 space-y-6 relative">
          {success && (
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 rounded-2xl z-20 space-y-4 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/40">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-slate-100">VIP Consultation Request Received</h3>
              <p className="text-xs text-slate-300 max-w-md">
                Our Chief Event Architect has received your event specs. A personalized design portfolio &amp; initial staging estimate will be dispatched to <strong className="text-amber-400">{email || 'your email'}</strong> within 2 hours.
              </p>
            </div>
          )}

          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-2xl font-heading font-bold text-slate-100">Request Custom Staging Estimate</h3>
              <p className="text-xs text-slate-400">Pre-populate your preferences for expedited design turnarounds.</p>
            </div>
            <span className="text-[10px] bg-amber-500/20 border border-amber-500/40 text-amber-400 px-2.5 py-1 rounded font-mono font-bold">
              ESTIMATE REQ V3.0
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 uppercase text-[10px] tracking-wider">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lord Alexander Wright"
                  className="w-full glass-input p-3 rounded-xl text-slate-100 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 uppercase text-[10px] tracking-wider">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alexander@domain.com"
                  className="w-full glass-input p-3 rounded-xl text-slate-100 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 uppercase text-[10px] tracking-wider">Phone / WhatsApp</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full glass-input p-3 rounded-xl text-slate-100 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 uppercase text-[10px] tracking-wider">Event Category</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full glass-input p-3 rounded-xl text-slate-100 text-xs bg-slate-900"
                >
                  <option value="Palace Wedding">Palace Royal Wedding</option>
                  <option value="Arena Light Show">Arena / DMX Light Concert</option>
                  <option value="Corporate Gala">Corporate Summit / Gala</option>
                  <option value="Private Estate Party">Private Estate / Villa Event</option>
                  <option value="Bespoke Production">Custom Architectural Setup</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 uppercase text-[10px] tracking-wider">Target Date</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full glass-input p-3 rounded-xl text-slate-100 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 uppercase text-[10px] tracking-wider">Guest Count &amp; Venue Specs</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['50-150 Guests', '150-300 Guests', '300-600 Guests', '1000+ V.I.P.'].map((cnt) => (
                  <button
                    type="button"
                    key={cnt}
                    onClick={() => setGuestCount(cnt)}
                    className={`p-2.5 rounded-lg text-[11px] font-semibold border transition-all ${
                      guestCount === cnt ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cnt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 uppercase text-[10px] tracking-wider">Event Vision &amp; Special Requirements *</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mention desired floral colors, DMX laser themes, stage height, catering spaces, or preferred budget range..."
                className="w-full glass-input p-3 rounded-xl text-slate-100 text-xs resize-none"
              />
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full shadow-glow-gold"
              icon={<Send className="w-4 h-4" />}
            >
              Submit Consultation Inquiry
            </Button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

