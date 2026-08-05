import React, { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { Trash2, CheckCircle, Database, UploadCloud } from 'lucide-react';
import type { Product } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { customProducts, quotes, addCustomProduct, deleteCustomProduct, getAllProducts } = useAppStore();
  const allProducts = getAllProducts();

  const [activeTab, setActiveTab] = useState<'quotes' | 'cms' | 'import'>('quotes');
  
  // Product Creation States
  const [prodName, setProdName] = useState('');
  const [prodSku, setProdSku] = useState('');
  const [prodBrand, setProdBrand] = useState('');
  const [prodCategory, setProdCategory] = useState<'computing' | 'sensors' | 'daq' | 'interface-cards' | 'test-measurement' | 'industrial'>('computing');
  const [prodSub, setProdSub] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodPrice, setProdPrice] = useState('₹');
  const [prodSpecs, setProdSpecs] = useState('Manufacturer: Brand\nCores: 8');
  
  const [cmsSuccess, setCmsSuccess] = useState(false);

  // Bulk Import States
  const [csvText, setCsvText] = useState('Product Name,SKU,Brand,Category,Subcategory,Price\nSuper Compute Server,SRV-XEON-X1,ApexTech,computing,servers,₹850000');
  const [importCount, setImportCount] = useState<number | null>(null);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName || !prodSku || !prodBrand) return;

    // Parse specifications
    const specs: Record<string, string> = {};
    prodSpecs.split('\n').forEach((line) => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        specs[parts[0].trim()] = parts.slice(1).join(':').trim();
      }
    });

    const newProd: Product = {
      id: `custom-${prodSku.toLowerCase()}-${Math.floor(100 + Math.random() * 900)}`,
      name: prodName,
      sku: prodSku,
      brand: prodBrand,
      category: prodCategory,
      subcategory: prodSub || 'general',
      shortDescription: prodDesc.substring(0, 100) + '...',
      description: prodDesc,
      image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&w=400&q=80',
      price: prodPrice,
      availability: 'In Stock',
      specifications: specs,
      features: ['High durability engineering casing', 'Industrial grade build components'],
      tags: [prodBrand, prodCategory],
      usedInSolutions: [],
      usedInIndustries: []
    };

    addCustomProduct(newProd);
    
    // Clear
    setProdName('');
    setProdSku('');
    setProdBrand('');
    setProdDesc('');
    setProdPrice('₹');
    setProdSpecs('Manufacturer: Brand\nCores: 8');
    
    setCmsSuccess(true);
    setTimeout(() => setCmsSuccess(false), 3000);
  };

  const handleBulkImport = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = csvText.split('\n');
    if (lines.length < 2) return;

    const headers = lines[0].split(',');
    let count = 0;

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      if (values.length < headers.length) continue;

      const pName = values[0]?.trim();
      const pSku = values[1]?.trim();
      const pBrand = values[2]?.trim();
      const pCat = (values[3]?.trim() as any) || 'computing';
      const pSub = values[4]?.trim() || 'general';
      const pPrice = values[5]?.trim() || '₹Contact';

      if (!pName || !pSku) continue;

      const newProd: Product = {
        id: `bulk-${pSku.toLowerCase()}-${Math.floor(100 + Math.random() * 900)}`,
        name: pName,
        sku: pSku,
        brand: pBrand,
        category: pCat,
        subcategory: pSub,
        shortDescription: `${pName} catalog import description.`,
        description: `${pName} imported bulk description specifications.`,
        image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&w=400&q=80',
        price: pPrice,
        availability: 'In Stock',
        specifications: { 'Manufacturer': pBrand, 'SKU': pSku },
        features: ['Standard catalog compliance specifications'],
        tags: [pBrand, pCat],
        usedInSolutions: [],
        usedInIndustries: []
      };

      addCustomProduct(newProd);
      count++;
    }

    setImportCount(count);
    setTimeout(() => setImportCount(null), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-slate-300">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 border-b border-navy-800 pb-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
            <Database className="w-8 h-8 text-brand-lightBlue" />
            Engineering Administration Portal
          </h1>
          <p className="text-sm text-slate-400">Review submitted quotes (RFQs), manage custom products, or perform CSV imports.</p>
        </div>

        {/* Dashboard Quick Stats */}
        <div className="flex gap-4">
          <div className="bg-navy-900 border border-navy-800 rounded-lg px-4 py-2 text-center text-xs">
            <span className="text-slate-500 block mb-0.5">RFQ Inquiries</span>
            <span className="font-bold text-white font-mono text-base">{quotes.length}</span>
          </div>
          <div className="bg-navy-900 border border-navy-800 rounded-lg px-4 py-2 text-center text-xs">
            <span className="text-slate-500 block mb-0.5">Custom Products</span>
            <span className="font-bold text-white font-mono text-base">{customProducts.length}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-navy-800 bg-navy-900/30 rounded-xl p-1.5 gap-2 w-fit mb-8">
        <button 
          onClick={() => setActiveTab('quotes')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'quotes' ? 'bg-brand-blue text-white shadow' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Recent RFQ Quotes ({quotes.length})
        </button>
        <button 
          onClick={() => setActiveTab('cms')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'cms' ? 'bg-brand-blue text-white shadow' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Product Catalog CMS
        </button>
        <button 
          onClick={() => setActiveTab('import')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'import' ? 'bg-brand-blue text-white shadow' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Bulk CSV Import
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'quotes' && (
        <div className="space-y-6">
          <h3 className="font-display font-bold text-lg text-white">Recent RFQs Submitted</h3>
          {quotes.length === 0 ? (
            <div className="text-center py-12 bg-navy-900 border border-navy-800 rounded-xl text-slate-500 text-sm">
              No quotation requests have been submitted yet.
            </div>
          ) : (
            <div className="space-y-4">
              {quotes.map((q) => (
                <div key={q.id} className="bg-navy-900 border border-navy-800 rounded-xl p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-navy-800 pb-3">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500">ID: {q.id} | Date: {q.date}</span>
                      <h4 className="font-display font-bold text-base text-white mt-1">{q.company}</h4>
                      <p className="text-xs text-brand-lightBlue font-medium">Contact: {q.name} ({q.designation || 'Engineer'})</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                      {q.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-400">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Contact Channels</span>
                      <p>Email: {q.email}</p>
                      <p>Phone: {q.phone}</p>
                      <p>Country: {q.country}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Project Details</span>
                      <p>Timeline: <span className="text-white capitalize font-semibold">{q.timeline}</span></p>
                      <p className="line-clamp-2 mt-1 leading-relaxed">{q.projectDetails}</p>
                    </div>
                  </div>

                  {q.items.length > 0 && (
                    <div className="bg-navy-950 p-4 rounded-lg border border-navy-850 text-xs">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block mb-2">Requested Component SKUs</span>
                      <div className="space-y-1">
                        {q.items.map((item) => {
                          const p = allProducts.find((prod) => prod.id === item.productId);
                          return (
                            <div key={item.productId} className="flex justify-between items-center text-slate-300">
                              <span className="font-bold text-white">{p?.name || item.productId}</span>
                              <span className="font-mono text-brand-lightBlue">Qty: {item.quantity}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'cms' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Create Product Form */}
          <div className="lg:col-span-2 bg-navy-900 border border-navy-800 p-6 rounded-xl space-y-6 h-fit relative">
            {cmsSuccess && (
              <div className="absolute inset-0 bg-navy-900/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 rounded-xl z-10 space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-400" />
                <h3 className="font-display font-bold text-white">Product Staged in Catalog</h3>
                <p className="text-xs text-slate-400">Custom SKU immediately visible in filters and comparison matrix.</p>
              </div>
            )}
            
            <h3 className="font-display font-bold text-base text-white">Stage New Product Component</h3>
            
            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    placeholder="e.g. 24-Port Signal Switchboard"
                    className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">SKU / Model Code *</label>
                  <input
                    type="text"
                    required
                    value={prodSku}
                    onChange={(e) => setProdSku(e.target.value)}
                    placeholder="e.g. SWB-NI-24P"
                    className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={prodBrand}
                    onChange={(e) => setProdBrand(e.target.value)}
                    placeholder="e.g. National Instruments"
                    className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Category Class *</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value as any)}
                    className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-brand-blue"
                  >
                    <option value="computing">Computing Hardware</option>
                    <option value="sensors">Sensors</option>
                    <option value="daq">Data Acquisition</option>
                    <option value="interface-cards">Interface Cards</option>
                    <option value="test-measurement">Test &amp; Measurement</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Subcategory Tag</label>
                  <input
                    type="text"
                    value={prodSub}
                    onChange={(e) => setProdSub(e.target.value)}
                    placeholder="e.g. servers"
                    className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Price Label *</label>
                  <input
                    type="text"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    placeholder="₹ or Contact Partner"
                    className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  placeholder="Summarize product features..."
                  className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-brand-blue resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Specifications (Key: Value per line) *</label>
                <textarea
                  rows={4}
                  value={prodSpecs}
                  onChange={(e) => setProdSpecs(e.target.value)}
                  placeholder="Frequency: 200 Hz&#10;Power: 12V DC"
                  className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-brand-blue font-mono resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-blue hover:bg-brand-darkBlue text-white font-bold py-2.5 rounded-lg text-xs transition-colors"
              >
                Create and Stage Product
              </button>
            </form>
          </div>

          {/* Staged Custom List */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-base text-white">Staged Products ({customProducts.length})</h3>
            {customProducts.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No custom staged products in local storage.</p>
            ) : (
              <div className="space-y-2">
                {customProducts.map((p) => (
                  <div key={p.id} className="flex justify-between items-center text-xs p-3 bg-navy-900 border border-navy-800 rounded-lg">
                    <div className="min-w-0 pr-2">
                      <p className="font-bold text-white truncate">{p.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{p.sku}</p>
                    </div>
                    <button 
                      onClick={() => deleteCustomProduct(p.id)}
                      className="p-1.5 bg-navy-950 border border-navy-800 rounded text-slate-400 hover:text-brand-accent transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {activeTab === 'import' && (
        <div className="bg-navy-900 border border-navy-800 p-6 rounded-xl space-y-6 max-w-2xl relative">
          {importCount !== null && (
            <div className="absolute inset-0 bg-navy-900/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 rounded-xl z-10 space-y-2">
              <CheckCircle className="w-12 h-12 text-emerald-400" />
              <h3 className="font-display font-bold text-white">Batch CSV Import Processed</h3>
              <p className="text-xs text-slate-400">Successfully created {importCount} products in local database.</p>
            </div>
          )}

          <h3 className="font-display font-bold text-base text-white">CSV Product Batch Uploader</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Format should be comma-delimited columns: `Product Name,SKU,Brand,Category,Subcategory,Price`. Click Process to append items.
          </p>

          <form onSubmit={handleBulkImport} className="space-y-4">
            <textarea
              rows={8}
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              className="w-full bg-navy-950 border border-navy-800 rounded-lg p-4 text-xs text-white font-mono focus:outline-none focus:border-brand-blue resize-none"
            />
            
            <button
              type="submit"
              className="bg-brand-blue hover:bg-brand-darkBlue text-white font-bold py-2.5 px-6 rounded-lg text-xs flex items-center gap-1.5 shadow active:scale-95"
            >
              <UploadCloud className="w-4 h-4" /> Process Batch Import
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
