import React, { useState } from 'react';
import { Sparkles, MapPin, Navigation, Truck, Zap, ShieldAlert, Cpu } from 'lucide-react';
import { useV3Store } from '../../../store/v3Store';
import { GlassCard } from '../../../components/v3/ui/GlassCard';
import { Button } from '../../../components/v3/ui/Button';

export const AiEventPlannerPage: React.FC = () => {
  const { setAiModalOpen } = useV3Store();
  const [venueSearch, setVenueSearch] = useState('The Plaza Grand Ballroom, New York');
  const [calculatedDistance, setCalculatedDistance] = useState<number>(12.4);

  const venuePresets = [
    { name: 'The Plaza Grand Ballroom, New York', dist: 12.4, fleet: '2 Trucks', wattage: '25 kW', height: '24 ft' },
    { name: 'Taj Lake Palace, Udaipur', dist: 45.8, fleet: '4 Watercraft + 3 Trucks', wattage: '40 kW', height: '30 ft' },
    { name: 'Bellagio Conservatory, Las Vegas', dist: 8.2, fleet: '2 Trucks', wattage: '35 kW', height: '28 ft' },
    { name: 'Château de Versailles, France', dist: 18.6, fleet: '3 Trucks', wattage: '50 kW', height: '32 ft' },
  ];

  const handleSelectPreset = (presetName: string) => {
    const selected = venuePresets.find(v => v.name === presetName);
    if (selected) {
      setVenueSearch(selected.name);
      setCalculatedDistance(selected.dist);
    }
  };

  const currentPreset = venuePresets.find(v => v.name === venueSearch) || {
    name: venueSearch,
    dist: calculatedDistance,
    fleet: '2 Transport Trucks',
    wattage: '30 kW DMX',
    height: '22 ft Trussing',
  };

  return (
    <div className="space-y-12 pb-16 font-poppins max-w-7xl mx-auto px-4 animate-fade-in pt-8">
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

          <div className="space-y-3 pt-4 border-t border-slate-800 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-400" />
              <span>Generative 3D Spatial Rendering</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>DMX Channel Allocation Engine</span>
            </div>
          </div>

          <Button variant="primary" size="lg" className="w-full shadow-glow-gold mt-4" onClick={() => setAiModalOpen(true)}>
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
              <Navigation className="w-4 h-4" /> Live Route ({calculatedDistance} miles)
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-2">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Popular Venue Presets</span>
            <div className="flex flex-wrap gap-2">
              {venuePresets.map((vp) => (
                <button
                  key={vp.name}
                  onClick={() => handleSelectPreset(vp.name)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    venueSearch === vp.name ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold' : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {vp.name.split(',')[0]}
                </button>
              ))}
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
          <div className="relative w-full h-64 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center">
            {/* Styled Map Background Grid */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative text-center space-y-3 z-10">
              <div className="w-12 h-12 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center mx-auto shadow-glow-gold animate-bounce">
                <MapPin className="w-6 h-6 fill-slate-950" />
              </div>
              <div className="bg-slate-900/95 border border-slate-700 px-4 py-2 rounded-lg backdrop-blur-md">
                <div className="font-bold text-slate-100 text-xs">{venueSearch}</div>
                <div className="text-[10px] text-amber-400 mt-0.5">Stage Logistics Delivery: {calculatedDistance} miles ({Math.round(calculatedDistance * 2.8)} mins drive)</div>
              </div>
            </div>
          </div>

          {/* Calculated Specs Bar */}
          <div className="grid grid-cols-3 gap-4 pt-2 text-center text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <Truck className="w-4 h-4 text-amber-400 mx-auto" />
              <div className="text-slate-400 text-[10px]">Logistics Fleet</div>
              <div className="font-bold text-slate-100">{currentPreset.fleet}</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <Zap className="w-4 h-4 text-amber-400 mx-auto" />
              <div className="text-slate-400 text-[10px]">Power Requirement</div>
              <div className="font-bold text-slate-100">{currentPreset.wattage}</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <ShieldAlert className="w-4 h-4 text-amber-400 mx-auto" />
              <div className="text-slate-400 text-[10px]">Max Ceiling Clearance</div>
              <div className="font-bold text-slate-100">{currentPreset.height}</div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

