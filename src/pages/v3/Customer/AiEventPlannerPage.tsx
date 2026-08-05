import React, { useState } from 'react';
import { Sparkles, MapPin, Navigation } from 'lucide-react';
import { useV3Store } from '../../../store/v3Store';
import { GlassCard } from '../../../components/v3/ui/GlassCard';
import { Button } from '../../../components/v3/ui/Button';


export const AiEventPlannerPage: React.FC = () => {
  const { setAiModalOpen } = useV3Store();
  const [venueSearch, setVenueSearch] = useState('The Plaza Grand Ballroom, New York');
  const [calculatedDistance, setCalculatedDistance] = useState<number | null>(12.4);

  return (
    <div className="space-y-12 pb-16 font-poppins max-w-7xl mx-auto px-4 animate-fade-in">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-semibold rounded-full border border-amber-500/40">
          AI &amp; Location Intelligence Engine
        </div>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-100">
          AI Decoration Architecture &amp; Google Maps Radar
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Calculates venue distance, stage dimensions, lighting load requirements &amp; AI decoration recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Launch Hero Box */}
        <GlassCard goldBorder hoverEffect={false} className="space-y-6 flex flex-col justify-between p-6">
          <div className="space-y-4">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl w-fit">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-slate-100">Smart AI Staging Recommender</h3>
            <p className="text-xs text-slate-300">
              Input your target budget, guest capacity, and venue style. Our AI algorithm instantly generates optimal stage trussing, lighting colors, and fresh floral specs.
            </p>
          </div>

          <Button variant="primary" size="lg" className="w-full shadow-glow-gold" onClick={() => setAiModalOpen(true)}>
            Open AI Architect Engine
          </Button>
        </GlassCard>

        {/* Google Maps Integration Simulator */}
        <GlassCard hoverEffect={false} className="lg:col-span-2 space-y-6 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-slate-100 font-bold text-base">
              <MapPin className="w-5 h-5 text-amber-400" /> Google Maps Venue Intelligence Radar
            </div>
            <div className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <Navigation className="w-4 h-4" /> Live Route Calculated ({calculatedDistance} miles)
            </div>
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={venueSearch}
              onChange={(e) => setVenueSearch(e.target.value)}
              placeholder="Search any hotel, palace, resort address..."
              className="w-full glass-input p-3 rounded-xl text-xs"
            />
            <Button variant="secondary" size="md" onClick={() => setCalculatedDistance(Number((8 + Math.random() * 15).toFixed(1)))}>
              Recalculate
            </Button>
          </div>

          {/* Interactive Map Visual Mock */}
          <div className="relative w-full h-72 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center">
            {/* Styled Map Background Grid */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative text-center space-y-3 z-10">
              <div className="w-12 h-12 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center mx-auto shadow-glow-gold animate-bounce">
                <MapPin className="w-6 h-6 fill-slate-950" />
              </div>
              <div className="bg-slate-900/90 border border-slate-700 px-4 py-2 rounded-lg backdrop-blur-md">
                <div className="font-bold text-slate-100 text-xs">{venueSearch}</div>
                <div className="text-[10px] text-amber-400 mt-0.5">Stage Logistics Delivery: {calculatedDistance} miles ({Math.round(calculatedDistance! * 3)} mins drive)</div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
