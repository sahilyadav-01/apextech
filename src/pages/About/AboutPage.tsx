import React from 'react';
import { Sparkles, Award, ShieldCheck, Users, Clock, Compass, ArrowRight } from 'lucide-react';
import { GlassCard } from '../../components/v3/ui/GlassCard';
import { Button } from '../../components/v3/ui/Button';
import { useNavigate } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const leadershipTeam = [
    {
      name: 'Alexander DeWitt',
      role: 'Founder & Chief Architect',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: 'Former Tesla automation engineer & royal event designer with 15+ years architecting multi-million dollar staging.',
    },
    {
      name: 'Sophia Laurent',
      role: 'Head of Floral Architecture & Decor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bio: 'Renowned Parisian floral sculptor behind celebrity palace weddings & global luxury summits across Monaco & NY.',
    },
    {
      name: 'Marcus Vance',
      role: 'Director of DMX & Visual Engineering',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bio: 'Pioneer in synchronized concert laser arrays and kinetic light structures with 500+ arena performances.',
    },
  ];

  const coreValues = [
    {
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      title: 'AI-Powered Precision',
      desc: 'Generative decor spatial mapping guarantees exact floral counts, lighting wattage, and truss load calculations before setup.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: 'ISO-Grade Safety & Structural Rigging',
      desc: 'All stage trusses, aerial rigging, and flame-retardant drapes exceed European and US structural engineering safety standards.',
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-400" />,
      title: 'Flawless On-Time Delivery',
      desc: 'Integrated logistics radar and real-time crew tracking guarantee stage readiness 3 hours prior to guest arrival.',
    },
    {
      icon: <Award className="w-6 h-6 text-amber-400" />,
      title: 'Uncompromised Luxury Aesthetics',
      desc: 'Custom-dyed silk curtains, imported Holland orchids, and high-frequency DMX lighting tailored to your signature aesthetic.',
    },
  ];

  return (
    <div className="space-y-16 pb-20 font-poppins max-w-7xl mx-auto px-4 animate-fade-in pt-8">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
          <Compass className="w-4 h-4 text-amber-400" /> Discover Our Heritage
        </div>
        <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-slate-100 leading-tight">
          Architecting <span className="gold-gradient-text">Royal Grandeur</span> &amp; Modern Event Engineering
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
          Apex Events V3.0 combines world-class staging artistry with cutting-edge SaaS technology, DMX lighting control, instant PDF tax billing, and AI spatial design.
        </p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard hoverEffect={true} className="p-6 text-center space-y-1">
          <div className="text-3xl sm:text-4xl font-heading font-extrabold text-amber-400">500+</div>
          <div className="text-xs text-slate-300 font-medium">Palace &amp; Estate Weddings</div>
        </GlassCard>
        <GlassCard hoverEffect={true} className="p-6 text-center space-y-1">
          <div className="text-3xl sm:text-4xl font-heading font-extrabold text-emerald-400">99.9%</div>
          <div className="text-xs text-slate-300 font-medium">Safety &amp; On-Time Track Record</div>
        </GlassCard>
        <GlassCard hoverEffect={true} className="p-6 text-center space-y-1">
          <div className="text-3xl sm:text-4xl font-heading font-extrabold text-amber-400">$25M+</div>
          <div className="text-xs text-slate-300 font-medium">Production Assets Managed</div>
        </GlassCard>
        <GlassCard hoverEffect={true} className="p-6 text-center space-y-1">
          <div className="text-3xl sm:text-4xl font-heading font-extrabold text-blue-400">12+</div>
          <div className="text-xs text-slate-300 font-medium">Global Luxury Destinations</div>
        </GlassCard>
      </div>

      {/* Brand Mission & Story */}
      <GlassCard goldBorder hoverEffect={false} className="p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest">Our Engineering Mission</div>
          <h2 className="text-3xl font-heading font-bold text-slate-100">Where High Tech Meets Haute Event Decor</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Founded with a vision to bridge structural engineering, intelligent visual fixtures, and bespoke floral architecture, Apex Events empowers clients and event planners to visualize, orchestrate, and execute grand celebrations without friction.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every fixture in our inventory is indexed with real-time DMX channel addressing, weight parameters, and color rendering metrics.
          </p>
          <Button variant="primary" size="md" onClick={() => navigate('/services')} icon={<ArrowRight className="w-4 h-4" />}>
            Explore Signature Packages
          </Button>
        </div>
        <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl group">
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80"
            alt="Apex Event Luxury Stage"
            className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-6 flex flex-col justify-end">
            <span className="text-amber-400 text-xs font-bold font-mono">LIVE PRODUCTION SNAPSHOT</span>
            <span className="text-slate-100 font-heading font-bold text-lg">Grand Ballroom Staging &amp; Crystal Chandeliers</span>
          </div>
        </div>
      </GlassCard>

      {/* Core Pillars */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-heading font-bold text-slate-100">Why Royalty &amp; Enterprises Trust Apex</h2>
          <p className="text-xs text-slate-400">Our four foundational principles for legendary event execution.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val, idx) => (
            <GlassCard key={idx} hoverEffect={true} className="p-6 space-y-3">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl w-fit">{val.icon}</div>
              <h3 className="text-lg font-heading font-bold text-slate-100">{val.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{val.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Leadership Team */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs uppercase text-amber-400 font-semibold tracking-wider">Creative Minds</div>
          <h2 className="text-3xl font-heading font-bold text-slate-100">Leadership &amp; Master Designers</h2>
          <p className="text-xs text-slate-400">The visionaries behind our royal productions and technology stack.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leadershipTeam.map((member, idx) => (
            <GlassCard key={idx} hoverEffect={true} className="p-5 space-y-4">
              <div className="relative rounded-xl overflow-hidden h-64">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-heading font-bold text-slate-100">{member.name}</h3>
                <div className="text-xs text-amber-400 font-medium">{member.role}</div>
                <p className="text-xs text-slate-400 pt-2 leading-relaxed">{member.bio}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};

