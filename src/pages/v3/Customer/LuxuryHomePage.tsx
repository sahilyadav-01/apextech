import React, { useState } from 'react';
import { Sparkles, ArrowRight, Star, Play, Camera, Video, ChevronDown, HelpCircle, ShieldCheck, Compass } from 'lucide-react';
import { useV3Store } from '../../../store/v3Store';
import { GlassCard } from '../../../components/v3/ui/GlassCard';
import { Button } from '../../../components/v3/ui/Button';
import { useNavigate } from 'react-router-dom';

export const LuxuryHomePage: React.FC = () => {
  const { setAiModalOpen, setPaymentModalOpen, packages, galleryItems, reviews, bookings } = useV3Store();
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the AI Decor Architect generate stage recommendations?',
      a: 'Our proprietary generative spatial engine analyzes your venue length, guest count, ceiling clearance, and theme preferences to compute optimal stage truss dimensions, floral stem density, and DMX channel presets.',
    },
    {
      q: 'Can we customize lighting colors and lasers during live event execution?',
      a: 'Yes! Our DMX Laser Console supports real-time wireless channel control, allowing audio-reactive light sweeps, strobe intensity shifts, and fog machine volume management on the fly.',
    },
    {
      q: 'How are instant PDF tax invoices and WhatsApp confirmations handled?',
      a: 'Upon booking confirmation or balance payment, our automated billing service generates an official tax PDF invoice with breakdown itemization and dispatches a copy directly to your WhatsApp concierge chat.',
    },
    {
      q: 'Are all stage trussing and aerial rigs structurally certified for safety?',
      a: 'Absolutely. All aluminum trussing, kinetic winches, and floral backdrops meet ISO 9001 and European structural safety standards, backed by $10M liability insurance.',
    },
  ];

  return (
    <div className="space-y-20 pb-16 font-poppins">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 max-w-7xl mx-auto text-center space-y-8">
        {/* Glow ambient background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-400 text-xs font-medium shadow-glow-gold animate-slide-up">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Version 3.0 Enterprise Luxury SaaS Event Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold text-slate-100 tracking-tight leading-tight animate-fade-in">
          Architecting <span className="gold-gradient-text">Unforgettable</span> Royal Events &amp; Staging
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
          Inspired by Apple, Airbnb &amp; Tesla engineering. Powered by AI decoration architecture, real-time DMX lighting control, instant PDF invoices &amp; WhatsApp concierge.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => setAiModalOpen(true)}
            icon={<Sparkles className="w-5 h-5" />}
          >
            Launch AI Decor Architect
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/services')}
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Explore Luxury Packages
          </Button>
        </div>

        {/* Stats Strip */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-bold font-heading text-amber-400">500+</div>
            <div className="text-xs text-slate-400 mt-1">Palace Weddings Executed</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-bold font-heading text-amber-400">$12M+</div>
            <div className="text-xs text-slate-400 mt-1">Annual Event Operations</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-bold font-heading text-amber-400">4.9 / 5</div>
            <div className="text-xs text-slate-400 mt-1">Google Reviews Rating</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-bold font-heading text-amber-400">100%</div>
            <div className="text-xs text-slate-400 mt-1">WhatsApp &amp; PDF Automated</div>
          </div>
        </div>
      </section>

      {/* Featured Luxury Packages */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="text-xs uppercase text-amber-400 font-semibold tracking-wider mb-1">Curated Staging Bundles</div>
            <h2 className="text-3xl font-heading font-bold text-slate-100">Signature Event Packages</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/services')} icon={<ArrowRight className="w-4 h-4" />}>
            View All Packages
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <GlassCard key={pkg.id} hoverEffect={true} className="flex flex-col justify-between p-5 space-y-4">
              <div className="space-y-3">
                <div className="relative overflow-hidden rounded-lg">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
                  {pkg.popular && (
                    <span className="absolute top-2 right-2 px-2.5 py-1 bg-amber-500 text-slate-950 text-[10px] font-bold uppercase rounded shadow-glow-gold">
                      Most Popular
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="text-amber-400 font-semibold">{pkg.category}</span>
                  <span className="flex items-center gap-1 font-bold text-slate-200">⭐ {pkg.rating} ({pkg.reviewCount})</span>
                </div>

                <h3 className="text-lg font-heading font-bold text-slate-100">{pkg.name}</h3>
                <p className="text-xs text-slate-300 line-clamp-2">{pkg.tagline}</p>

                <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs">
                  {pkg.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-300">
                      <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Starting From</span>
                  <span className="text-xl font-bold text-amber-400 font-heading">${pkg.price.toLocaleString()}</span>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    const bk = bookings[0];
                    setPaymentModalOpen(true, bk);
                  }}
                >
                  Book Package
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Pinterest Style Masonry Gallery Showcase */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="text-xs uppercase text-amber-400 font-semibold tracking-wider">Pinterest Visual Inspiration</div>
          <h2 className="text-3xl font-heading font-bold text-slate-100">Luxury Staging &amp; Floral Portfolio</h2>
          <p className="text-xs text-slate-400">Compressed with next-gen WebP technology for sub-second image loading.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryItems.map((gal) => (
            <div
              key={gal.id}
              onClick={() => navigate('/gallery')}
              className="relative group rounded-xl overflow-hidden cursor-pointer glass-panel"
            >
              <img
                src={gal.webpUrl}
                alt={gal.title}
                loading="lazy"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-xs">
                <span className="text-amber-400 font-bold uppercase text-[10px]">{gal.category}</span>
                <h4 className="text-sm font-bold text-slate-100">{gal.title}</h4>
                <p className="text-slate-300">{gal.venue}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Media Integration */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard hoverEffect={false} className="space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <Camera className="w-5 h-5" /> Live Instagram Feed (@ApexEventsV3)
            </div>
            <p className="text-xs text-slate-400">Behind the scenes palace setups, DMX laser tests &amp; fresh orchid installs.</p>
            <div className="grid grid-cols-3 gap-2">
              {galleryItems.map((g, i) => (
                <img key={i} src={g.imageUrl} alt="Insta" className="w-full h-20 rounded object-cover" />
              ))}
            </div>
          </GlassCard>

          <GlassCard hoverEffect={false} className="space-y-4">
            <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
              <Video className="w-5 h-5" /> YouTube 4K Stage Walkthroughs
            </div>

            <div className="relative rounded-lg overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80" alt="Video" className="w-full h-40 object-cover" />
              <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-glow-gold group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-300 font-medium">Starlight Symphony Concert 40kW Sound Test (4K 60FPS)</p>
          </GlassCard>

          <GlassCard hoverEffect={false} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Star className="w-5 h-5 fill-amber-400" /> Google Verified Reviews
              </div>
              <span className="text-xs text-emerald-400 font-bold">5.0 Star</span>
            </div>
            <div className="space-y-3">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-100">{rev.customerName}</span>
                    <span className="text-amber-400">{"★".repeat(rev.rating)}</span>
                  </div>
                  <p className="text-slate-300 italic">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Interactive FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-semibold">
            <HelpCircle className="w-4 h-4 text-amber-400" /> Customer Clarity &amp; FAQs
          </div>
          <h2 className="text-3xl font-heading font-bold text-slate-100">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-100 text-sm hover:text-amber-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-amber-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* VIP Bottom Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <GlassCard goldBorder hoverEffect={false} className="p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-100">
            Ready to Stage Your <span className="gold-gradient-text">Royal Event</span>?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Experience sub-second AI decor recommendations, real-time DMX light orchestration, and 24/7 dedicated VIP concierge.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
            <Button variant="primary" size="lg" onClick={() => navigate('/contact')} icon={<Sparkles className="w-5 h-5" />}>
              Get Custom Consultation
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/ai-planner')} icon={<Compass className="w-5 h-5" />}>
              Try AI Decor Planner
            </Button>
          </div>
        </GlassCard>
      </section>
    </div>
  );
};

