import React from 'react';
import { Sparkles, Trophy, Calendar, MapPin, ArrowRight, Layers, Sliders } from 'lucide-react';
import { GlassCard } from '../../components/v3/ui/GlassCard';
import { Button } from '../../components/v3/ui/Button';
import { useNavigate } from 'react-router-dom';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();

  const caseStudies = [
    {
      id: 'cs-1',
      title: 'Udaipur Lake Palace Royal Wedding',
      client: 'Private Royal Family',
      location: 'Udaipur, India',
      date: 'November 2025',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
      category: 'Palace Wedding',
      challenge: 'Architecting floating stage platforms over water with 15,000 fresh Holland orchids without damaging historical heritage structures.',
      implementation: 'Deployed custom wireless DMX kinetic LED spheres, floating aluminum modular trussing, and real-time hydraulic level sensors.',
      result: 'Flawless 3-day royal celebration covered in Architectural Digest, zero delay, 100% safety rating.',
      specs: ['15,000 Fresh Orchids', '48 DMX Channels', '3,500 Guests'],
    },
    {
      id: 'cs-2',
      title: 'Cyberpunk Neon Horizon Concert',
      client: 'Global EDM Festival Tour',
      location: 'Miami Beach, FL',
      date: 'January 2026',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80',
      category: 'DMX Concert Staging',
      challenge: 'Synchronizing 120 motorized laser heads with sub-millisecond audio beats in 95% ocean humidity.',
      implementation: 'Used Apex V3 DMX Laser Console with IP68 waterproof laser fixtures and AI strobe frequency balancing.',
      result: 'Attended by 45,000 fans, zero laser sync dropouts, rated #1 Stage Production of Miami Music Week.',
      specs: ['120 Laser Heads', '360° Surround Fog', '45,000 Fans'],
    },
    {
      id: 'cs-3',
      title: 'Monaco Sovereign Gala & Charity Ball',
      client: 'International Philanthropy Foundation',
      location: 'Monte Carlo, Monaco',
      date: 'December 2025',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80',
      category: 'Corporate Luxury Gala',
      challenge: 'Transforming a classic opera hall into a futuristic crystal pavilion within a strict 6-hour setup window.',
      implementation: 'Pre-programmed modular stage pods mapped via AI spatial design and rapid-deployment velvet drapes.',
      result: 'Raised $8.4M in charity, completed stage setup in 4 hours 15 minutes (45 mins ahead of schedule).',
      specs: ['4h Setup Window', 'Bespoke Crystal Canopy', '$8.4M Raised'],
    },
  ];

  return (
    <div className="space-y-12 pb-20 font-poppins max-w-7xl mx-auto px-4 animate-fade-in pt-8">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
          <Trophy className="w-4 h-4 text-amber-400" /> High-Profile Event Case Studies
        </div>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-100">
          V.I.P. Staging &amp; <span className="gold-gradient-text">Royal Production Showcase</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 font-light max-w-2xl mx-auto">
          Explore technical blueprints, structural solutions, and real-world outcomes of iconic events staged by Apex Events V3.0.
        </p>
      </div>

      {/* Case Studies Grid */}
      <div className="space-y-10">
        {caseStudies.map((cs) => (
          <GlassCard key={cs.id} goldBorder={true} hoverEffect={false} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="relative rounded-xl overflow-hidden group border border-slate-800 h-64 lg:h-80">
                <img
                  src={cs.image}
                  alt={cs.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded text-amber-400 font-bold text-xs">
                  {cs.category}
                </div>
              </div>

              <div className="lg:col-span-2 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-100">{cs.title}</h2>
                    <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-amber-400" /> {cs.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-amber-400" /> {cs.date}</span>
                      <span className="text-slate-300 font-semibold">Client: {cs.client}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-amber-400 font-bold uppercase text-[10px]">The Challenge</span>
                    <p className="text-slate-300 leading-relaxed">{cs.challenge}</p>
                  </div>

                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-amber-400 font-bold uppercase text-[10px]">Apex Implementation</span>
                    <p className="text-slate-300 leading-relaxed">{cs.implementation}</p>
                  </div>

                  <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/30 space-y-1">
                    <span className="text-emerald-400 font-bold uppercase text-[10px]">Verified Result</span>
                    <p className="text-emerald-200 leading-relaxed font-medium">{cs.result}</p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {cs.specs.map((sp, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300">
                        ✨ {sp}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/contact')}
                    icon={<ArrowRight className="w-4 h-4 text-amber-400" />}
                  >
                    Request Similar Setup
                  </Button>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

