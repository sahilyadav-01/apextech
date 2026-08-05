import React, { useState } from 'react';
import { Plus, Eye } from 'lucide-react';
import { useV3Store } from '../../../store/v3Store';
import { GlassCard } from '../../../components/v3/ui/GlassCard';
import { Button } from '../../../components/v3/ui/Button';


export const BlogCMS: React.FC = () => {
  const { blogs } = useV3Store();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter((b) => b.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-6 animate-fade-in font-inter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-slate-100">SEO Blog &amp; Content Management</h2>
          <p className="text-xs text-slate-400">Publish search-engine optimized articles, wedding tips &amp; luxury lighting masterclasses.</p>
        </div>
        <Button variant="primary" size="md" icon={<Plus className="w-4 h-4" />}>
          Create New Article
        </Button>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {['All', 'Wedding Tips', 'Decoration Ideas', 'Lighting', 'Event Planning', 'Flower Decoration'].map((cat) => (
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

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <GlassCard key={blog.id} hoverEffect={true} className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <img src={blog.image} alt={blog.title} className="w-full h-44 rounded-lg object-cover" />
              <div className="flex items-center justify-between text-[11px] text-amber-400 font-semibold">
                <span>{blog.category}</span>
                <span className="flex items-center gap-1 text-slate-400"><Eye className="w-3 h-3" /> {blog.views} views</span>
              </div>
              <h3 className="text-base font-heading font-bold text-slate-100 hover:text-amber-400 transition-colors">
                {blog.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2">{blog.summary}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
              <span>Author: {blog.author}</span>
              <span>{blog.readTime}</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
