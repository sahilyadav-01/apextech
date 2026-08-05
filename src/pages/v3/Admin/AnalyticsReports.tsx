import React from 'react';
import { TrendingUp, PieChart as PieIcon, BarChart3 } from 'lucide-react';
import { useV3Store } from '../../../store/v3Store';
import { GlassCard } from '../../../components/v3/ui/GlassCard';

export const AnalyticsReports: React.FC = () => {
  const { packages } = useV3Store();


  const monthlyRevenueData = [
    { month: 'Jan', revenue: 42000, bookings: 4 },
    { month: 'Feb', revenue: 58000, bookings: 6 },
    { month: 'Mar', revenue: 75000, bookings: 8 },
    { month: 'Apr', revenue: 92000, bookings: 10 },
    { month: 'May', revenue: 110000, bookings: 12 },
    { month: 'Jun', revenue: 135000, bookings: 15 },
    { month: 'Jul', revenue: 168000, bookings: 18 },
  ];

  const categoryDistribution = [
    { name: 'Royal Weddings', percentage: 45, color: '#F59E0B' },
    { name: 'Corporate Galas', percentage: 30, color: '#3B82F6' },
    { name: 'Concert Stages', percentage: 15, color: '#10B981' },
    { name: 'Luxury Soirées', percentage: 10, color: '#F43F5E' },
  ];

  return (
    <div className="space-y-6 animate-fade-in font-inter">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-heading font-bold text-slate-100">Enterprise Financial &amp; Analytics Dashboard</h2>
        <p className="text-xs text-slate-400">Monthly revenue growth, category volume, customer retention &amp; package metrics.</p>
      </div>

      {/* SVG Monthly Revenue Chart */}
      <GlassCard goldBorder hoverEffect={false} className="space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-400" /> Revenue Growth Trend (2026 YTD)
            </h3>
            <p className="text-xs text-slate-400">Monthly collected advance &amp; balance revenues</p>
          </div>
          <span className="text-amber-400 font-bold text-lg">$168,000 / mo</span>
        </div>

        {/* SVG Bar Chart */}
        <div className="h-56 w-full flex items-end justify-between gap-3 pt-6 px-2">
          {monthlyRevenueData.map((d, i) => {
            const heightPct = (d.revenue / 180000) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="text-[10px] text-amber-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  ${(d.revenue / 1000).toFixed(0)}k
                </div>
                <div
                  style={{ height: `${heightPct}%` }}
                  className="w-full max-w-[40px] bg-gradient-to-t from-amber-600 via-amber-500 to-amber-300 rounded-t-md shadow-glow-gold transition-all duration-500 group-hover:brightness-125"
                />
                <span className="text-xs font-medium text-slate-400">{d.month}</span>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Grid: Category Breakdown & Top Packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Share */}
        <GlassCard hoverEffect={false} className="space-y-4">
          <h3 className="text-base font-heading font-semibold text-slate-100 flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-amber-400" /> Event Category Distribution
          </h3>

          <div className="space-y-3">
            {categoryDistribution.map((cat, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-200">{cat.name}</span>
                  <span className="text-amber-400 font-bold">{cat.percentage}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                    className="h-full rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Popular Packages */}
        <GlassCard hoverEffect={false} className="space-y-4">
          <h3 className="text-base font-heading font-semibold text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-amber-400" /> Top Performing Packages
          </h3>

          <div className="space-y-3 text-xs">
            {packages.map((pkg) => (
              <div key={pkg.id} className="flex items-center justify-between p-3 bg-slate-950/80 rounded-lg border border-slate-800">
                <div className="flex items-center gap-3">
                  <img src={pkg.image} alt={pkg.name} className="w-10 h-10 rounded object-cover" />
                  <div>
                    <div className="font-bold text-slate-100">{pkg.name}</div>
                    <div className="text-slate-400">{pkg.category} • ⭐ {pkg.rating} ({pkg.reviewCount} reviews)</div>
                  </div>
                </div>
                <div className="text-right font-bold text-amber-400">${pkg.price.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
