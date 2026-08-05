import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useV3Store } from '../../../store/v3Store';
import { GlassCard } from '../../../components/v3/ui/GlassCard';


export const LuxuryBlogPage: React.FC = () => {
  const { blogs } = useV3Store();
  const [selectedCat, setSelectedCat] = useState('All');
  const [activeBlog, setActiveBlog] = useState<any>(null);

  const filteredBlogs = selectedCat === 'All'
    ? blogs
    : blogs.filter((b) => b.category.toLowerCase() === selectedCat.toLowerCase());

  return (
    <div className="space-y-12 pb-16 font-poppins max-w-7xl mx-auto px-4 animate-fade-in">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-semibold rounded-full border border-amber-500/40">
          SEO Optimized Masterclasses &amp; Guides
        </div>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-100">
          Luxury Event Staging &amp; Design Journal
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Expert insights on royal palace wedding decor, DMX kinetic light programming, and fresh orchid hydration.
        </p>
      </div>

      {/* Categories Bar */}
      <div className="flex justify-center items-center gap-2 overflow-x-auto pb-2">
        {['All', 'Wedding Tips', 'Decoration Ideas', 'Lighting', 'Event Planning', 'Flower Decoration'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
              selectedCat === cat ? 'bg-amber-500 text-slate-950 shadow-glow-gold' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Detail Reader Modal if selected */}
      {activeBlog ? (
        <GlassCard goldBorder hoverEffect={false} className="max-w-4xl mx-auto p-8 space-y-6 animate-fade-in">
          <button onClick={() => setActiveBlog(null)} className="text-xs text-amber-400 hover:underline">
            ← Back to All Articles
          </button>
          <img src={activeBlog.image} alt={activeBlog.title} className="w-full h-80 object-cover rounded-xl" />
          <div className="space-y-3">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full">
              {activeBlog.category}
            </span>
            <h2 className="text-3xl font-heading font-bold text-slate-100">{activeBlog.title}</h2>
            <div className="flex items-center gap-4 text-xs text-slate-400 border-b border-slate-800 pb-4">
              <span>Author: <strong className="text-slate-200">{activeBlog.author}</strong></span>
              <span>Published: <strong className="text-slate-200">{activeBlog.date}</strong></span>
              <span>Reading Time: <strong className="text-amber-400">{activeBlog.readTime}</strong></span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{activeBlog.content}</p>
          </div>
        </GlassCard>
      ) : (
        /* Blog Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <GlassCard
              key={blog.id}
              hoverEffect={true}
              onClick={() => setActiveBlog(blog)}
              className="flex flex-col justify-between p-5 space-y-4 cursor-pointer"
            >
              <div className="space-y-3">
                <img src={blog.image} alt={blog.title} className="w-full h-48 rounded-lg object-cover" />
                <div className="flex items-center justify-between text-xs text-amber-400 font-semibold">
                  <span>{blog.category}</span>
                  <span className="text-slate-400">{blog.readTime}</span>
                </div>
                <h3 className="text-lg font-heading font-bold text-slate-100 hover:text-amber-400 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3">{blog.summary}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400 font-medium">
                <span>By {blog.author}</span>
                <span className="text-amber-400 flex items-center gap-1">Read Article <ArrowRight className="w-3.5 h-3.5" /></span>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};
