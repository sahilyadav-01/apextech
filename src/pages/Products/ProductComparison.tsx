import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scale, Trash2, ShoppingCart } from 'lucide-react';
import { useCompareStore } from '../../store/compareStore';
import { useAppStore } from '../../store/appStore';
import { useCartStore } from '../../store/cartStore';
import { QuoteRequestModal } from '../../components/quote/QuoteRequestModal';

export const ProductComparison: React.FC = () => {
  const { selectedIds, removeItem, clear } = useCompareStore();
  const allProducts = useAppStore((state) => state.products);
  const addToCart = useCartStore((state) => state.addItem);

  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [rfqProductId, setRfqProductId] = useState<string | undefined>(undefined);

  const comparedProducts = selectedIds
    .map((id) => allProducts.find((p) => p.id === id))
    .filter((p) => p !== undefined);

  if (comparedProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500 font-sans">
        <Scale className="w-12 h-12 mx-auto text-brand-lightBlue mb-4 opacity-40 animate-pulse" />
        <h2 className="text-xl font-bold text-white mb-2">No Products Selected</h2>
        <p className="text-sm mb-6">Select up to 4 items in our catalog to compare parameters side-by-side.</p>
        <Link to="/products" className="bg-brand-blue text-white px-5 py-2.5 rounded-lg font-bold">Browse Products</Link>
      </div>
    );
  }

  // Get all unique specification keys across selected products
  const specKeys = Array.from(
    new Set(
      comparedProducts.flatMap((p) => Object.keys(p?.specifications || {}))
    )
  );

  const handleSingleRfq = (id: string) => {
    setRfqProductId(id);
    setRfqModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-slate-300">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
            <Scale className="w-8 h-8 text-brand-lightBlue" />
            Product Specification Matrix
          </h1>
          <p className="text-sm text-slate-400">Comparing parameters side-by-side to assist product selection.</p>
        </div>
        <button 
          onClick={clear}
          className="text-xs font-bold text-slate-400 hover:text-brand-accent transition-colors"
        >
          Clear Selection Array
        </button>
      </div>

      <div className="overflow-x-auto border border-navy-800 rounded-2xl bg-navy-900/20">
        <table className="min-w-full divide-y divide-navy-800 text-left border-collapse">
          
          {/* Headers */}
          <thead>
            <tr className="bg-navy-900 divide-x divide-navy-800">
              <th className="p-6 text-xs text-slate-400 font-bold uppercase tracking-wider w-1/5 min-w-[200px]">Product Info</th>
              
              {comparedProducts.map((p) => (
                <th key={p.id} className="p-6 min-w-[250px] vertical-align-top relative group">
                  <button
                    onClick={() => removeItem(p.id)}
                    className="absolute top-4 right-4 p-1 bg-navy-950 border border-navy-800 rounded text-slate-500 hover:text-brand-accent transition-colors"
                    title="Remove comparison"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="space-y-4">
                    <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded-lg bg-navy-950 border border-navy-800" />
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono font-bold text-brand-lightBlue bg-brand-blue/10 border border-brand-blue/30 px-2 py-0.5 rounded-full uppercase">
                        {p.category}
                      </span>
                      <h4 className="font-display font-bold text-sm text-white line-clamp-2 mt-2">
                        <Link to={`/products/${p.id}`} className="hover:underline">{p.name}</Link>
                      </h4>
                      <p className="text-[10px] font-mono text-slate-500">{p.sku}</p>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => handleSingleRfq(p.id)}
                        className="w-full bg-brand-blue hover:bg-brand-darkBlue text-white font-bold py-2 rounded-lg text-xs transition-colors shadow shadow-brand-blue/10"
                      >
                        Request Quote
                      </button>
                      <button
                        onClick={() => addToCart(p.id)}
                        className="w-full bg-navy-850 hover:bg-navy-800 text-white border border-navy-800 rounded-lg py-2 text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" /> Basket
                      </button>
                    </div>
                  </div>
                </th>
              ))}

              {/* Pad remaining columns up to 4 */}
              {Array.from({ length: 4 - comparedProducts.length }).map((_, i) => (
                <th key={i} className="p-6 text-center text-slate-500 text-xs border-l border-navy-800">
                  <div className="border-2 border-dashed border-navy-800 rounded-xl p-8 h-full flex flex-col items-center justify-center gap-2">
                    <PlusPlaceholder />
                    <span>Slot Available</span>
                  </div>
                </th>
              ))}

            </tr>
          </thead>

          {/* Body Parameters Comparison */}
          <tbody className="divide-y divide-navy-800 text-xs bg-navy-950/20">
            <tr className="divide-x divide-navy-800 hover:bg-navy-900/40">
              <td className="p-4 font-semibold text-slate-400 uppercase text-[10px] tracking-wider">Manufacturer</td>
              {comparedProducts.map((p) => <td key={p.id} className="p-4 text-white font-bold">{p.brand}</td>)}
              {Array.from({ length: 4 - comparedProducts.length }).map((_, i) => <td key={i} className="p-4" />)}
            </tr>
            
            <tr className="divide-x divide-navy-800 hover:bg-navy-900/40">
              <td className="p-4 font-semibold text-slate-400 uppercase text-[10px] tracking-wider">B2B Price</td>
              {comparedProducts.map((p) => <td key={p.id} className="p-4 text-white font-mono font-bold">{p.price}</td>)}
              {Array.from({ length: 4 - comparedProducts.length }).map((_, i) => <td key={i} className="p-4" />)}
            </tr>

            {specKeys.map((key) => (
              <tr key={key} className="divide-x divide-navy-800 hover:bg-navy-900/40">
                <td className="p-4 font-semibold text-slate-400 uppercase text-[10px] tracking-wider">{key}</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-4 text-white">
                    {p.specifications[key] !== undefined ? p.specifications[key] : <span className="text-slate-600">—</span>}
                  </td>
                ))}
                {Array.from({ length: 4 - comparedProducts.length }).map((_, i) => <td key={i} className="p-4" />)}
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      <QuoteRequestModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        preselectedProductId={rfqProductId}
      />

    </div>
  );
};

const PlusPlaceholder = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-30"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
);
