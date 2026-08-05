import React, { useState } from 'react';
import { Upload, Zap } from 'lucide-react';
import { useV3Store } from '../../../store/v3Store';
import { GlassCard } from '../../../components/v3/ui/GlassCard';
import { Button } from '../../../components/v3/ui/Button';


export const GalleryManager: React.FC = () => {
  const { galleryItems } = useV3Store();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isUploading, setIsUploading] = useState(false);

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter((g) => g.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fade-in font-inter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-slate-100">Luxury Gallery &amp; WebP Image Optimizer</h2>
          <p className="text-xs text-slate-400">Automatic WebP compression, lazy loading blur placeholders &amp; category tags.</p>
        </div>
        <Button variant="primary" size="md" onClick={handleSimulateUpload} disabled={isUploading} icon={<Upload className="w-4 h-4" />}>
          {isUploading ? 'Compressing WebP...' : 'Upload & Optimize Image'}
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {['All', 'Wedding', 'Stage', 'Lighting', 'Floral', 'Corporate'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
              selectedCategory === cat ? 'bg-amber-500 text-slate-950 shadow-glow-gold' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <GlassCard key={item.id} hoverEffect={true} className="space-y-3 p-4">
            <div className="relative group overflow-hidden rounded-lg">
              <img
                src={item.webpUrl}
                alt={item.title}
                loading="lazy"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 rounded text-[10px] font-bold flex items-center gap-1">
                <Zap className="w-3 h-3" /> {item.compressedSize}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-100">{item.title}</h4>
              <div className="text-xs text-slate-400 mt-0.5">{item.venue}</div>
              <div className="flex justify-between items-center text-xs text-amber-400 mt-2 font-medium">
                <span>{item.category}</span>
                <span>❤️ {item.likes} likes</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
