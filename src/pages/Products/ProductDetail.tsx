import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Scale, ShoppingCart, FileText, Activity, ChevronRight, CheckCircle, HelpCircle } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { useCartStore } from '../../store/cartStore';
import { useCompareStore } from '../../store/compareStore';
import { QuoteRequestModal } from '../../components/quote/QuoteRequestModal';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const allProducts = useAppStore((state) => state.products);
  const { addItem: addToCompare } = useCompareStore();
  const addToCart = useCartStore((state) => state.addItem);

  const [directQuoteOpen, setDirectQuoteOpen] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500 font-sans">
        <HelpCircle className="w-12 h-12 mx-auto text-brand-lightBlue mb-4 opacity-40" />
        <h2 className="text-xl font-bold text-white mb-2">Product Not Found</h2>
        <p className="text-sm mb-6">The requested SKU does not exist in our active catalog.</p>
        <Link to="/products" className="bg-brand-blue text-white px-5 py-2.5 rounded-lg font-bold">Return to Catalog</Link>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-slate-300">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-8 font-mono">
        <Link to="/products" className="hover:text-slate-300">Catalog</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="capitalize">{product.category}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-300 truncate">{product.name}</span>
      </div>

      {/* Main product showcase info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        
        {/* Left Col: Dynamic Media Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-navy-900 border border-navy-800">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-navy-900 border border-navy-800 overflow-hidden opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                <img src={product.image} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Product Info */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] font-mono font-bold tracking-widest bg-brand-blue/15 border border-brand-blue/30 text-brand-lightBlue px-2.5 py-0.5 rounded-full uppercase">
                {product.category.replace('-', ' ')}
              </span>
              <span className={`text-[10px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full uppercase ${
                product.availability === 'In Stock' 
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                  : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
              }`}>
                {product.availability}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight">{product.name}</h1>
            <p className="text-xs text-slate-500 font-mono">Model / SKU: <span className="text-white font-bold">{product.sku}</span> | Brand: <span className="text-white font-bold">{product.brand}</span></p>
            <p className="text-sm text-slate-400 leading-relaxed">{product.description}</p>
          </div>

          <div className="bg-navy-900/60 border border-navy-800 p-6 rounded-2xl space-y-6 mt-6">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-500 font-semibold uppercase">B2B Indicative Price</span>
              <span className="text-2xl font-bold text-white font-mono">{product.price}</span>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setDirectQuoteOpen(true)}
                className="w-full bg-brand-blue hover:bg-brand-darkBlue text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-brand-blue/15 hover:shadow-brand-blue/25 text-center text-sm"
              >
                Request Custom RFQ
              </button>
              <button
                onClick={() => addToCart(product.id)}
                className="w-full bg-navy-850 hover:bg-navy-800 text-white border border-navy-700 hover:border-brand-blue/40 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
              >
                <ShoppingCart className="w-4 h-4 text-brand-lightBlue" />
                Add to Quote Basket
              </button>
            </div>

            <div className="flex flex-wrap gap-4 justify-between items-center text-xs text-slate-500 border-t border-navy-800/80 pt-4">
              <button 
                onClick={() => addToCompare(product.id)}
                className="hover:text-white flex items-center gap-1.5"
              >
                <Scale className="w-3.5 h-3.5" />
                Add to Side Comparison
              </button>
              <button onClick={handleCopyLink} className="hover:text-white">
                {copiedMsg ? '✅ Copied Product Link' : 'Copy Product Link'}
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Specifications & Features Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Specs Table */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="font-display font-bold text-lg text-white border-b border-navy-850 pb-3">Technical Specifications</h3>
          <div className="overflow-hidden border border-navy-800 rounded-xl">
            <table className="min-w-full divide-y divide-navy-800 text-sm">
              <tbody className="bg-navy-900/40 divide-y divide-navy-800">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key} className="hover:bg-navy-900/90 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-400 uppercase text-[10px] tracking-wider w-1/3">{key}</td>
                    <td className="px-6 py-4 text-white font-medium">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Features & Related connections */}
        <div className="space-y-8">
          
          {/* Features Checklist */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-white border-b border-navy-850 pb-3">Core Features</h3>
            <ul className="space-y-3 text-sm">
              {product.features.map((feat, i) => (
                <li key={i} className="flex gap-2.5 items-start">
                  <CheckCircle className="w-4 h-4 text-brand-lightBlue shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Connection */}
          {product.usedInSolutions.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-lg text-white border-b border-navy-850 pb-3">Used in Solutions</h3>
              <div className="space-y-2">
                {product.usedInSolutions.map((solId) => (
                  <Link
                    key={solId}
                    to={`/solutions/${solId}`}
                    className="p-3 bg-navy-900 border border-navy-800 rounded-lg flex items-center justify-between text-xs hover:border-brand-blue/40 group transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-brand-lightBlue" />
                      <span className="font-bold text-white group-hover:text-brand-lightBlue transition-colors">
                        {solId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* PDF Downloads */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-white border-b border-navy-850 pb-3">Documentation</h3>
            <div className="space-y-2.5">
              <a href="#" className="flex items-center gap-3 p-3.5 bg-navy-900 border border-navy-800 rounded-xl hover:border-brand-blue/30 text-xs">
                <FileText className="w-5 h-5 text-brand-lightBlue" />
                <div>
                  <p className="font-bold text-white">Download Product Datasheet</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">PDF Format (1.4 MB)</p>
                </div>
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Quote Direct Modal */}
      <QuoteRequestModal
        isOpen={directQuoteOpen}
        onClose={() => setDirectQuoteOpen(false)}
        preselectedProductId={product.id}
      />

    </div>
  );
};
