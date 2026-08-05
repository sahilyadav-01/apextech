import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Hammer, ShoppingCart } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { useCartStore } from '../../store/cartStore';
import { QuoteRequestModal } from '../../components/quote/QuoteRequestModal';
import type { Product } from '../../types';
export const ProductConfigurator: React.FC = () => {
  const allProducts = useAppStore((state) => state.products);
  const addToCart = useCartStore((state) => state.addItem);

  // Configuration Choices
  const [selectedCpu, setSelectedCpu] = useState<Product | null>(null);
  const [selectedMobo, setSelectedMobo] = useState<Product | null>(null);
  const [selectedRam, setSelectedRam] = useState<Product | null>(null);
  const [selectedGpu, setSelectedGpu] = useState<Product | null>(null);
  const [selectedDaq, setSelectedDaq] = useState<Product | null>(null);

  const [rfqOpen, setRfqOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<'cpu' | 'mobo' | 'ram' | 'gpu' | 'daq'>('cpu');

  // Filter pools by class
  const cpus = allProducts.filter((p) => p.subcategory === 'cpu-processors');
  const mobos = allProducts.filter((p) => p.subcategory === 'motherboards');
  const rams = allProducts.filter((p) => p.subcategory === 'memory');
  const gpus = allProducts.filter((p) => p.subcategory === 'gpu');
  const daqs = allProducts.filter((p) => p.category === 'daq' || p.category === 'interface-cards');

  // Compatibility engine validation checks
  const cpuSocket = selectedCpu?.specifications['Socket'];
  const moboSocket = selectedMobo?.specifications['Socket'];
  const isSocketCompatible = !selectedCpu || !selectedMobo || cpuSocket === moboSocket;

  const moboMemoryType = selectedMobo?.specifications['Memory Type'];
  const ramMemoryType = selectedRam?.specifications['Memory Type'];
  const isMemoryCompatible = !selectedMobo || !selectedRam || moboMemoryType === ramMemoryType;

  const totalTdp = 
    (selectedCpu ? parseInt(selectedCpu.specifications['TDP'] as string) || 0 : 0) +
    (selectedGpu ? parseInt(selectedGpu.specifications['Power Consumption'] as string) || 0 : 0) +
    (selectedMobo ? 80 : 0) + (selectedRam ? 10 : 0);

  const isConfigValid = isSocketCompatible && isMemoryCompatible;
  const isConfigComplete = selectedCpu && selectedMobo && selectedRam && selectedGpu;

  const handleSelectProduct = (product: Product) => {
    if (activeStep === 'cpu') { setSelectedCpu(product); setActiveStep('mobo'); }
    else if (activeStep === 'mobo') { setSelectedMobo(product); setActiveStep('ram'); }
    else if (activeStep === 'ram') { setSelectedRam(product); setActiveStep('gpu'); }
    else if (activeStep === 'gpu') { setSelectedGpu(product); setActiveStep('daq'); }
    else if (activeStep === 'daq') { setSelectedDaq(product); }
  };

  const handleAddConfigurationToBasket = () => {
    if (selectedCpu) addToCart(selectedCpu.id, 1);
    if (selectedMobo) addToCart(selectedMobo.id, 1);
    if (selectedRam) addToCart(selectedRam.id, 1);
    if (selectedGpu) addToCart(selectedGpu.id, 1);
    if (selectedDaq) addToCart(selectedDaq.id, 1);
    alert('System configuration items added to your Quote Basket!');
  };

  const activePool = 
    activeStep === 'cpu' ? cpus :
    activeStep === 'mobo' ? mobos :
    activeStep === 'ram' ? rams :
    activeStep === 'gpu' ? gpus : daqs;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-slate-300">
      
      <div className="space-y-2 mb-12">
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
          <Hammer className="w-8 h-8 text-brand-lightBlue" />
          Engineering Workstation Configurator
        </h1>
        <p className="text-sm text-slate-400">Design custom compute-hardware stacks. Our compatibility checking validator runs automatically.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Step Navigation & Component Pool */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Step tabs */}
          <div className="flex border-b border-navy-800 bg-navy-900/30 rounded-xl overflow-hidden p-1.5 gap-1.5">
            {[
              { id: 'cpu', label: '1. CPU' },
              { id: 'mobo', label: '2. Motherboard' },
              { id: 'ram', label: '3. Memory / RAM' },
              { id: 'gpu', label: '4. Graphics / GPU' },
              { id: 'daq', label: '5. Expansion / DAQ' }
            ].map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id as any)}
                className={`flex-1 text-center py-2.5 rounded-lg text-xs font-bold transition-all ${
                  activeStep === step.id 
                    ? 'bg-brand-blue text-white shadow' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {step.label}
              </button>
            ))}
          </div>

          {/* Component Selection Pool */}
          <div className="space-y-4">
            <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">Select {activeStep.toUpperCase()} Component</h3>
            
            {activePool.length === 0 ? (
              <div className="text-center py-10 bg-navy-900 border border-navy-800 rounded-xl text-slate-500 text-xs">
                No items of this category currently exist in the database catalog.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activePool.map((p) => {
                  const isSelected = 
                    selectedCpu?.id === p.id || selectedMobo?.id === p.id || 
                    selectedRam?.id === p.id || selectedGpu?.id === p.id || selectedDaq?.id === p.id;
                  
                  return (
                    <div 
                      key={p.id}
                      className={`p-4 bg-navy-900 border rounded-xl flex flex-col justify-between hover:border-brand-blue/35 transition-colors ${
                        isSelected ? 'border-brand-blue ring-1 ring-brand-blue/30' : 'border-navy-800'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-display font-bold text-sm text-white">{p.name}</h4>
                          <span className="text-[9px] font-mono text-slate-500">{p.sku}</span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2">{p.shortDescription}</p>
                        
                        <div className="text-[10px] font-mono text-slate-500 space-y-0.5">
                          {Object.entries(p.specifications).slice(0, 3).map(([k, v]) => (
                            <div key={k}>{k}: <span className="text-white font-bold">{v}</span></div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-navy-800/80 pt-3 mt-4">
                        <span className="text-xs font-mono font-bold text-white">{p.price}</span>
                        <button
                          onClick={() => handleSelectProduct(p)}
                          className={`text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all ${
                            isSelected 
                              ? 'bg-brand-blue/20 text-brand-lightBlue border border-brand-blue/40'
                              : 'bg-brand-blue hover:bg-brand-darkBlue text-white'
                          }`}
                        >
                          {isSelected ? 'Selected' : 'Select Component'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Right Col: Configuration Summary Panel */}
        <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 h-fit space-y-6 shadow-xl">
          <h3 className="font-display font-bold text-white text-base tracking-wide border-b border-navy-800 pb-3 flex items-center gap-2">
            Configuration Summary
          </h3>

          <div className="space-y-3.5">
            {[
              { label: 'CPU', val: selectedCpu, remove: () => setSelectedCpu(null) },
              { label: 'Motherboard', val: selectedMobo, remove: () => setSelectedMobo(null) },
              { label: 'Memory / RAM', val: selectedRam, remove: () => setSelectedRam(null) },
              { label: 'Graphics / GPU', val: selectedGpu, remove: () => setSelectedGpu(null) },
              { label: 'Expansion / DAQ', val: selectedDaq, remove: () => setSelectedDaq(null) }
            ].map((slot, i) => (
              <div key={i} className="flex justify-between items-center text-xs p-3 bg-navy-950 rounded-xl border border-navy-800">
                <div className="min-w-0 flex-1 pr-3">
                  <span className="text-[10px] text-slate-500 font-semibold block mb-0.5">{slot.label}</span>
                  {slot.val ? (
                    <span className="text-white font-bold block truncate">{slot.val.name}</span>
                  ) : (
                    <span className="text-slate-600 block italic">Empty slot</span>
                  )}
                </div>
                {slot.val && (
                  <button 
                    onClick={slot.remove}
                    className="text-slate-500 hover:text-brand-accent p-1 hover:bg-navy-900 rounded"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Validation Engine alerts logs */}
          <div className="space-y-3 border-t border-navy-800 pt-6">
            
            {/* Socket Check */}
            {!isSocketCompatible && (
              <div className="flex gap-2.5 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <div>
                  <p className="font-bold">Socket Mismatch</p>
                  <p className="mt-0.5 text-[10px] text-red-400/80 leading-relaxed">
                    CPU requires Socket {cpuSocket} but motherboard chip uses {moboSocket}.
                  </p>
                </div>
              </div>
            )}

            {/* Memory check */}
            {!isMemoryCompatible && (
              <div className="flex gap-2.5 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <div>
                  <p className="font-bold">Memory Incompatible</p>
                  <p className="mt-0.5 text-[10px] text-red-400/80 leading-relaxed">
                    Motherboard supports {moboMemoryType} but selected memory is {ramMemoryType}.
                  </p>
                </div>
              </div>
            )}

            {isConfigComplete && isConfigValid && (
              <div className="flex gap-2.5 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <div>
                  <p className="font-bold">Configuration Fully Compatible</p>
                  <p className="mt-0.5 text-[10px] text-emerald-400/80 leading-relaxed">
                    All socket, chipset, and memory structures successfully validated.
                  </p>
                </div>
              </div>
            )}

            {/* Power Estimate */}
            <div className="flex justify-between items-center text-xs border-t border-navy-850 pt-4">
              <span className="text-slate-400">Estimated Workstation TDP:</span>
              <span className="font-bold text-white font-mono">{totalTdp} W</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => setRfqOpen(true)}
              disabled={!isConfigComplete || !isConfigValid}
              className="w-full bg-brand-blue hover:bg-brand-darkBlue disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow shadow-brand-blue/20 text-sm"
            >
              Request Config RFQ
            </button>
            <button
              onClick={handleAddConfigurationToBasket}
              disabled={!isConfigComplete || !isConfigValid}
              className="w-full bg-navy-850 hover:bg-navy-800 disabled:opacity-20 text-slate-300 font-bold py-3 rounded-xl border border-navy-800 transition-all text-sm flex items-center justify-center gap-1.5"
            >
              <ShoppingCart className="w-4 h-4 text-brand-lightBlue" />
              Add Config to Basket
            </button>
          </div>

        </div>

      </div>

      <QuoteRequestModal
        isOpen={rfqOpen}
        onClose={() => setRfqOpen(false)}
      />

    </div>
  );
};
