import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, Plus, Calculator } from 'lucide-react';
import { useV3Store } from '../../../store/v3Store';
import { GlassCard } from '../../../components/v3/ui/GlassCard';
import { Button } from '../../../components/v3/ui/Button';

export const ServicesPackagesPage: React.FC = () => {
  const { packages, services, setPaymentModalOpen, bookings } = useV3Store();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const filteredPackages = selectedCategory === 'All'
    ? packages
    : packages.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const selectedAddonsTotal = selectedAddons.reduce((acc, id) => {
    const srv = services.find((s) => s.id === id);
    return acc + (srv ? srv.startingPrice : 0);
  }, 0);

  const handleBookCustomAddons = () => {
    const baseBooking = bookings[0];
    const customBooking = {
      ...baseBooking,
      packageName: `Custom Staging Package (${selectedAddons.length} Add-Ons)`,
      totalAmount: baseBooking.totalAmount + selectedAddonsTotal,
      remainingAmount: baseBooking.remainingAmount + selectedAddonsTotal,
    };
    setPaymentModalOpen(true, customBooking);
  };

  return (
    <div className="space-y-12 pb-16 font-poppins animate-fade-in max-w-7xl mx-auto px-4 pt-8">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold rounded-full uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-400" /> Enterprise Event Staging Packages
        </div>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-100">
          Luxury Packages &amp; Custom Add-On Calculator
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Select a master staging package, add architectural lighting, exotic floral canopy, or gourmet catering add-ons.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex justify-center items-center gap-2 overflow-x-auto pb-2">
        {['All', 'Wedding', 'Concert', 'Gala', 'Corporate'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              selectedCategory === cat ? 'bg-amber-500 text-slate-950 shadow-glow-gold font-bold' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Signature Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPackages.map((pkg) => (
          <GlassCard key={pkg.id} goldBorder={pkg.popular} hoverEffect={true} className="flex flex-col justify-between p-6 space-y-6">
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden">
                <img src={pkg.image} alt={pkg.name} className="w-full h-56 object-cover" />
                <div className="absolute top-3 left-3 px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded text-amber-400 font-bold text-xs">
                  {pkg.category}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-heading font-bold text-slate-100">{pkg.name}</h3>
                <span className="text-2xl font-heading font-bold text-amber-400">${pkg.price.toLocaleString()}</span>
              </div>

              <p className="text-xs text-slate-300">{pkg.tagline}</p>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                <div className="font-semibold text-amber-400 uppercase text-[10px] tracking-wider mb-2">Included In Package</div>
                {pkg.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full shadow-glow-gold"
              onClick={() => {
                const bk = bookings[0];
                setPaymentModalOpen(true, bk);
              }}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Book {pkg.name} Now
            </Button>
          </GlassCard>
        ))}
      </div>

      {/* Custom Add-On Calculator Section */}
      <section className="max-w-5xl mx-auto bg-slate-900/90 border border-slate-800 p-8 rounded-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono">
              <Calculator className="w-4 h-4" /> INTERACTIVE ESTIMATOR
            </div>
            <h3 className="text-xl font-heading font-bold text-slate-100">Custom Service Add-Ons</h3>
            <p className="text-xs text-slate-400">Build your bespoke event by toggling optional luxury services below.</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Selected Add-Ons Total</span>
            <span className="text-2xl font-bold text-amber-400 font-heading">+${selectedAddonsTotal.toLocaleString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((srv) => {
            const isSelected = selectedAddons.includes(srv.id);
            return (
              <div
                key={srv.id}
                onClick={() => toggleAddon(srv.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected ? 'border-amber-500 bg-amber-500/10 shadow-glow-gold' : 'border-slate-800 bg-slate-950/60 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-100 text-sm flex items-center gap-2">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${isSelected ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>
                      {isSelected ? '✓' : '+'}
                    </span>
                    {srv.name}
                  </div>
                  <span className="text-amber-400 font-bold text-xs">+${srv.startingPrice.toLocaleString()}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1 pl-6">{srv.description}</p>
              </div>
            );
          })}
        </div>

        {selectedAddons.length > 0 && (
          <div className="pt-4 border-t border-slate-800 flex justify-between items-center animate-fade-in">
            <span className="text-xs text-slate-300">
              {selectedAddons.length} Custom Service Add-On{selectedAddons.length > 1 ? 's' : ''} Selected
            </span>
            <Button variant="primary" size="md" onClick={handleBookCustomAddons} icon={<Plus className="w-4 h-4" />}>
              Book Custom Package (+${selectedAddonsTotal.toLocaleString()})
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

