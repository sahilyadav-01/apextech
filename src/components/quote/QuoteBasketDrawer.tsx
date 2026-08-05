import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useAppStore } from '../../store/appStore';

interface QuoteBasketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}
export const QuoteBasketDrawer: React.FC<QuoteBasketDrawerProps> = ({ isOpen, onClose, onCheckout }) => {
  const { items, removeItem, updateQuantity } = useCartStore();
  const allProducts = useAppStore((state) => state.products);

  if (!isOpen) return null;

  const basketItems = items.map((item) => {
    const p = allProducts.find((product) => product.id === item.productId);
    return {
      ...item,
      product: p,
    };
  }).filter((item) => item.product !== undefined);

  return (
    <div className="fixed inset-0 z-[90] overflow-hidden font-sans">
      <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-navy-900 border-l border-navy-800 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-navy-800 flex items-center justify-between text-white">
            <h2 className="text-lg font-display font-bold flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-lightBlue" />
              Quote Request Basket
            </h2>
            <button onClick={onClose} className="p-1 hover:bg-navy-800 rounded-lg text-slate-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {basketItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-slate-500 py-16">
                <ShoppingBag className="w-12 h-12 opacity-30 text-brand-lightBlue" />
                <div>
                  <p className="font-semibold text-white">Your basket is empty</p>
                  <p className="text-sm">Browse our engineering catalog to add products.</p>
                </div>
              </div>
            ) : (
              basketItems.map((item) => (
                <div key={item.productId} className="flex gap-4 p-3 bg-navy-950 rounded-xl border border-navy-800/80">
                  <img
                    src={item.product?.image}
                    alt={item.product?.name}
                    className="w-16 h-16 rounded-lg object-cover bg-navy-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-bold text-white text-sm truncate">{item.product?.name}</h4>
                    <p className="text-xs text-slate-500 mb-2">{item.product?.sku}</p>
                    
                    <div className="flex items-center justify-between">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-navy-800 rounded-md overflow-hidden bg-navy-900">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="px-2 py-1 text-slate-400 hover:text-white hover:bg-navy-800 text-xs"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs text-white font-mono">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="px-2 py-1 text-slate-400 hover:text-white hover:bg-navy-800 text-xs"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-slate-500 hover:text-brand-accent p-1.5 rounded-lg hover:bg-navy-800 transition-colors"
                        title="Remove product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer actions */}
          {basketItems.length > 0 && (
            <div className="border-t border-navy-800 p-6 bg-navy-950/80 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Total Items:</span>
                <span className="font-bold text-white">{basketItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-darkBlue text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-brand-blue/20 transition-all hover:shadow-brand-blue/30 active:scale-95"
              >
                Proceed to RFQ Request
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
