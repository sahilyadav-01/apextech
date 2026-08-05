import React, { useState } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { useV3Store } from '../../../store/v3Store';
import { Button } from './Button';
import type { AiRecommendationResult } from '../../../types/v3';


export const AiRecommendationModal: React.FC = () => {
  const { isAiModalOpen, setAiModalOpen, generateAiRecommendation, setPaymentModalOpen, createBooking, customers } = useV3Store();

  const [budget, setBudget] = useState<number>(25000);
  const [guests, setGuests] = useState<number>(300);
  const [eventType, setEventType] = useState<'Wedding' | 'Corporate Gala' | 'Concert Stage' | 'Luxury Birthday'>('Wedding');
  const [venueType, setVenueType] = useState<'Indoor Banquet' | 'Outdoor Lawn' | 'Beachfront Resort' | 'Palace Courtyard'>('Palace Courtyard');
  const [result, setResult] = useState<AiRecommendationResult | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  if (!isAiModalOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const res = generateAiRecommendation({
        budget,
        guests,
        eventType,
        venueType
      });
      setResult(res);
      setIsGenerating(false);
    }, 600);
  };

  const handleBookAiPackage = () => {
    if (!result) return;
    const defaultCust = customers[0];
    const newBk = createBooking({
      customerId: defaultCust.id,
      customerName: defaultCust.name,
      customerEmail: defaultCust.email,
      customerPhone: defaultCust.phone,
      eventType: eventType === 'Corporate Gala' ? 'Corporate' : eventType === 'Concert Stage' ? 'Concert' : eventType === 'Luxury Birthday' ? 'Private Luxury Party' : 'Wedding',
      eventDate: '2026-11-20',
      venueName: `${venueType} Venue`,
      venueAddress: '100 Luxury Avenue, Suite 1',
      guestCount: guests,
      packageName: `AI Custom: ${result.recommendedPackageName}`,
      totalAmount: result.estimatedPrice,
      advancePaid: 5000,
      remainingAmount: result.estimatedPrice - 5000,
      paymentStatus: 'advance_paid',
      status: 'Confirmed',
      assignedEmployees: ['Marcus Vance', 'Elena Rostova'],
      customRequirements: `AI Generated Theme: ${result.suggestedStyle}`
    });

    setAiModalOpen(false);
    setPaymentModalOpen(true, newBk);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-3xl bg-slate-900 border border-amber-500/30 rounded-2xl shadow-luxury overflow-hidden animate-zoom-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-slate-100">AI Decoration &amp; Staging Architect</h3>
              <p className="text-xs text-amber-400/90">Instant AI recommendation engine based on venue, budget &amp; guest count</p>
            </div>
          </div>
          <button
            onClick={() => setAiModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Input Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Event Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Event Category</label>
              <select
                value={eventType}
                onChange={(e: any) => setEventType(e.target.value)}
                className="w-full glass-input px-3.5 py-2.5 rounded-lg text-sm"
              >
                <option value="Wedding" className="bg-slate-900">Royal Wedding</option>
                <option value="Corporate Gala" className="bg-slate-900">Corporate Gala &amp; Launch</option>
                <option value="Concert Stage" className="bg-slate-900">Concert Stage</option>
                <option value="Luxury Birthday" className="bg-slate-900">Opulent Luxury Soirée</option>
              </select>
            </div>

            {/* Venue Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Venue Type</label>
              <select
                value={venueType}
                onChange={(e: any) => setVenueType(e.target.value)}
                className="w-full glass-input px-3.5 py-2.5 rounded-lg text-sm"
              >
                <option value="Palace Courtyard" className="bg-slate-900">Palace Courtyard</option>
                <option value="Indoor Banquet" className="bg-slate-900">Indoor Hotel Ballroom</option>
                <option value="Outdoor Lawn" className="bg-slate-900">Outdoor Luxury Lawn</option>
                <option value="Beachfront Resort" className="bg-slate-900">Beachfront Resort</option>
              </select>
            </div>

            {/* Budget Slider */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="font-semibold uppercase tracking-wider text-slate-300">Target Budget</span>
                <span className="text-amber-400 font-bold">${budget.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="100000"
                step="2500"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Guest Slider */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="font-semibold uppercase tracking-wider text-slate-300">Guest Count</span>
                <span className="text-amber-400 font-bold">{guests} Guests</span>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="50"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Action Trigger */}
          <Button
            variant="primary"
            size="lg"
            className="w-full shadow-glow-gold"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin" /> Analyzing 500+ Luxury Staging Templates...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Run AI Architecture Generator
              </span>
            )}
          </Button>

          {/* AI Result View */}
          {result && (
            <div className="mt-6 p-5 rounded-xl border border-amber-500/30 bg-slate-950/70 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="text-xs uppercase text-amber-400 font-semibold tracking-wider">AI Optimal Match ({result.matchScore}%)</div>
                  <h4 className="text-lg font-heading text-slate-100 font-semibold">{result.suggestedStyle}</h4>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Estimated Cost</div>
                  <div className="text-xl font-bold text-amber-400">${result.estimatedPrice.toLocaleString()}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block mb-1">Lighting Architecture:</span>
                  <span className="text-slate-200 font-medium">{result.lightingTheme}</span>
                </div>
                <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block mb-1">Floral Canopy:</span>
                  <span className="text-slate-200 font-medium">{result.floralArrangement}</span>
                </div>
                <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block mb-1">Stage &amp; Trussing:</span>
                  <span className="text-slate-200 font-medium">{result.stageArchitecture}</span>
                </div>
                <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block mb-1">Base Package Match:</span>
                  <span className="text-amber-400 font-medium">{result.recommendedPackageName}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 italic bg-slate-900/50 p-3 rounded border border-slate-800/80">
                "{result.aiReasoning}"
              </p>

              <div className="pt-2 flex justify-end gap-3">
                <Button variant="outline" size="sm" onClick={() => setResult(null)}>
                  Recalculate
                </Button>
                <Button variant="primary" size="sm" onClick={handleBookAiPackage} icon={<ArrowRight className="w-4 h-4" />}>
                  Book AI Suggested Package Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
