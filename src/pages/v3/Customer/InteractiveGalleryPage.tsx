import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useV3Store } from '../../../store/v3Store';
import { GlassCard } from '../../../components/v3/ui/GlassCard';


export const InteractiveGalleryPage: React.FC = () => {
  const { galleryItems } = useV3Store();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<any>(null);

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((g) => g.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="space-y-8 pb-16 font-poppins animate-fade-in">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-100">
          Pinterest Luxury Staging Gallery
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          High-definition photography converted automatically to optimized WebP format with lazy load support.
        </p>
      </div>

      {/* Categories Bar */}
      <div className="flex justify-center items-center gap-2 overflow-x-auto pb-2">
        {['All', 'Wedding', 'Stage', 'Lighting', 'Floral', 'Corporate'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              activeCategory === cat ? 'bg-amber-500 text-slate-950 shadow-glow-gold' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {filteredItems.map((item) => (
          <GlassCard
            key={item.id}
            hoverEffect={true}
            onClick={() => setActiveLightboxItem(item)}
            className="p-3 space-y-3 cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-lg group">
              <img
                src={item.webpUrl}
                alt={item.title}
                loading="lazy"
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-xs">
                <span className="text-amber-400 font-bold uppercase text-[10px]">{item.category}</span>
                <span className="text-slate-100 font-bold text-sm">{item.title}</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-400 px-1">
              <span>{item.venue}</span>
              <span className="text-rose-400 font-semibold flex items-center gap-1">❤️ {item.likes}</span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl animate-zoom-in">
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-slate-950/80 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <img src={activeLightboxItem.imageUrl} alt={activeLightboxItem.title} className="w-full max-h-[70vh] object-cover" />
            <div className="p-6 space-y-2 bg-slate-900">
              <div className="text-amber-400 font-bold text-xs uppercase">{activeLightboxItem.category} • {activeLightboxItem.compressedSize}</div>
              <h3 className="text-2xl font-heading font-bold text-slate-100">{activeLightboxItem.title}</h3>
              <p className="text-xs text-slate-400">Venue: {activeLightboxItem.venue} • Event Date: {activeLightboxItem.date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
