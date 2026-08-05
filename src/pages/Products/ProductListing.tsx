import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { LayoutGrid, List, Search, Scale, ShoppingCart, Check } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { useCompareStore } from '../../store/compareStore';
import { useCartStore } from '../../store/cartStore';

export const ProductListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const allProducts = useAppStore((state) => state.products);
  const { selectedIds, addItem: addToCompare, removeItem: removeFromCompare } = useCompareStore();
  const addToCart = useCartStore((state) => state.addItem);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedSubcategory, setSelectedSubcategory] = useState(searchParams.get('sub') || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sync category state with search query parameters
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const sub = searchParams.get('sub') || 'all';
    setSelectedCategory(cat);
    setSelectedSubcategory(sub);
  }, [searchParams]);

  // Unique Brands & Subcategories for filter dropdowns
  const brands = Array.from(new Set(allProducts.map((p) => p.brand)));
  const subcategories = Array.from(
    new Set(
      allProducts
        .filter((p) => selectedCategory === 'all' || p.category === selectedCategory)
        .map((p) => p.subcategory)
    )
  );

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedSubcategory('all');
    setSearchParams(cat === 'all' ? {} : { category: cat });
  };

  // Filtered Products lists
  const filteredProducts = allProducts.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSub = selectedSubcategory === 'all' || p.subcategory === selectedSubcategory;
    const matchesBrand = selectedBrand === 'all' || p.brand === selectedBrand;
    const matchesAvail = selectedAvailability === 'all' || p.availability === selectedAvailability;
    const matchesSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSub && matchesBrand && matchesAvail && matchesSearch;
  });

  const toggleCompare = (productId: string) => {
    if (selectedIds.includes(productId)) {
      removeFromCompare(productId);
    } else {
      addToCompare(productId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-display font-bold text-white">Engineering Catalog</h1>
        <p className="text-sm text-slate-400">Discover and specify computing systems, structural sensors, high-speed DAQs, and interfaces.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <div className="space-y-6 bg-navy-900 border border-navy-800 p-5 rounded-xl h-fit">
          <h3 className="font-display font-bold text-white text-sm tracking-wider uppercase border-b border-navy-800 pb-3">Filters</h3>
          
          {/* Category Filter */}
          <div className="space-y-2">
            <label className="block text-xs text-slate-400 font-semibold uppercase">Category</label>
            <div className="space-y-1">
              {[
                { id: 'all', label: 'All Categories' },
                { id: 'computing', label: 'Computing Hardware' },
                { id: 'sensors', label: 'Sensors' },
                { id: 'daq', label: 'Data Acquisition' },
                { id: 'interface-cards', label: 'Interface Cards' },
                { id: 'test-measurement', label: 'Test & Measurement' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleCategoryChange(c.id)}
                  className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${
                    selectedCategory === c.id 
                      ? 'bg-brand-blue text-white font-bold' 
                      : 'text-slate-400 hover:bg-navy-800 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Subcategory Filter */}
          {selectedCategory !== 'all' && (
            <div className="space-y-2">
              <label className="block text-xs text-slate-400 font-semibold uppercase">Subcategory</label>
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-brand-blue"
              >
                <option value="all">All Subcategories</option>
                {subcategories.map((sub) => (
                  <option key={sub} value={sub}>{sub.replace('-', ' ')}</option>
                ))}
              </select>
            </div>
          )}

          {/* Brand Filter */}
          <div className="space-y-2">
            <label className="block text-xs text-slate-400 font-semibold uppercase">Brand</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-brand-blue"
            >
              <option value="all">All Brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Availability Filter */}
          <div className="space-y-2">
            <label className="block text-xs text-slate-400 font-semibold uppercase">Availability</label>
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-brand-blue"
            >
              <option value="all">Any Availability</option>
              <option value="In Stock">In Stock</option>
              <option value="3-4 Weeks">3-4 Weeks</option>
              <option value="6-8 Weeks">6-8 Weeks</option>
            </select>
          </div>

          <button 
            onClick={() => {
              setSelectedCategory('all');
              setSelectedSubcategory('all');
              setSelectedBrand('all');
              setSelectedAvailability('all');
              setSearchQuery('');
              setSearchParams({});
            }}
            className="w-full py-2 bg-navy-950 hover:bg-navy-800 text-xs font-bold text-slate-400 hover:text-white border border-navy-800 rounded-lg transition-colors"
          >
            Clear All Filters
          </button>

        </div>

        {/* Products Grid & View Controls */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center bg-navy-900 border border-navy-800 px-4 py-3 rounded-xl gap-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search models, specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2 pl-9 pr-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-blue"
              />
            </div>

            {/* View Mode & Compare indicator */}
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              {selectedIds.length > 0 && (
                <Link to="/compare" className="text-xs font-bold text-brand-lightBlue hover:underline flex items-center gap-1.5 bg-brand-blue/10 px-3 py-1.5 rounded-lg border border-brand-blue/30">
                  <Scale className="w-3.5 h-3.5" />
                  Compare Active ({selectedIds.length}/4)
                </Link>
              )}

              <div className="flex border border-navy-800 rounded-lg overflow-hidden bg-navy-950">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-brand-blue text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-brand-blue text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Catalog Listing Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-navy-900 border border-navy-800 rounded-xl text-slate-500">
              <p className="text-sm">No products match your active filter specifications.</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredProducts.map((p) => (
                <div 
                  key={p.id} 
                  className={`bg-navy-900 border border-navy-800 hover:border-brand-blue/30 rounded-xl overflow-hidden flex transition-all duration-300 shadow-md ${
                    viewMode === 'grid' ? 'flex-col justify-between' : 'flex-row items-center p-4 gap-6'
                  }`}
                >
                  {/* Card Media */}
                  <div className={`relative bg-navy-950 shrink-0 overflow-hidden ${
                    viewMode === 'grid' ? 'aspect-video w-full' : 'w-24 h-24 rounded-lg'
                  }`}>
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>

                  {/* Card Content */}
                  <div className="flex-1 p-5 flex flex-col justify-between h-full">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-display font-bold text-sm text-white hover:text-brand-lightBlue transition-colors">
                          <Link to={`/products/${p.id}`}>{p.name}</Link>
                        </h3>
                      </div>
                      <p className="text-[10px] font-mono text-slate-500">{p.sku} • {p.brand}</p>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{p.shortDescription}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-navy-800/80 pt-4 mt-4">
                      <span className="text-sm font-bold text-white font-mono">{p.price}</span>
                      
                      <div className="flex items-center gap-2">
                        {/* Compare Toggle */}
                        <button
                          onClick={() => toggleCompare(p.id)}
                          className={`p-2 rounded-lg border text-xs flex items-center justify-center transition-colors ${
                            selectedIds.includes(p.id)
                              ? 'bg-brand-blue/20 border-brand-blue text-brand-lightBlue'
                              : 'border-navy-800 text-slate-500 hover:text-white hover:bg-navy-850'
                          }`}
                          title="Compare"
                        >
                          {selectedIds.includes(p.id) ? <Check className="w-3.5 h-3.5" /> : <Scale className="w-3.5 h-3.5" />}
                        </button>

                        {/* Add to RFQ cart */}
                        <button
                          onClick={() => addToCart(p.id)}
                          className="bg-navy-800 hover:bg-brand-blue hover:text-white p-2 rounded-lg text-slate-400 transition-colors"
                          title="Add to Quote Basket"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                        </button>

                        <Link to={`/products/${p.id}`} className="text-xs font-bold text-brand-lightBlue hover:underline">
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
