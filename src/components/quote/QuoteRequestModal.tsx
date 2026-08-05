import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Package } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useAppStore } from '../../store/appStore';

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProductId?: string; // option to request quote for a single product directly
}

export const QuoteRequestModal: React.FC<QuoteRequestModalProps> = ({
  isOpen,
  onClose,
  preselectedProductId,
}) => {
  const { items, clearCart } = useCartStore();
  const { addQuoteRequest, getAllProducts } = useAppStore();
  const allProducts = getAllProducts();

  // Form states
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [application, setApplication] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [timeline, setTimeline] = useState('');
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Collect RFQ items
  const rfqItems = preselectedProductId
    ? [{ productId: preselectedProductId, quantity: 1 }]
    : items;

  const rfqProducts = rfqItems.map((item) => {
    const p = allProducts.find((product) => product.id === item.productId);
    return { ...item, product: p };
  }).filter((item) => item.product !== undefined);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!company.trim()) newErrors.company = 'Company is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid email is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    if (!country.trim()) newErrors.country = 'Country is required';
    if (!projectDetails.trim()) newErrors.projectDetails = 'Project details are required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addQuoteRequest({
      name,
      company,
      designation,
      email,
      phone,
      country,
      application,
      projectDetails,
      timeline,
      items: rfqItems,
    });

    if (!preselectedProductId) {
      clearCart(); // clear cart on successful multi-product quote
    }
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto font-sans">
      <div className="bg-navy-900 border border-navy-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col my-8 animate-zoom-in">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-navy-800 flex items-center justify-between text-white">
          <h2 className="text-lg font-display font-bold">Request a Technical Quote (RFQ)</h2>
          <button onClick={onClose} className="p-1 hover:bg-navy-800 rounded-lg text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {isSubmitted ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-4 flex flex-col items-center justify-center">
            <CheckCircle className="w-16 h-16 text-emerald-500 animate-bounce" />
            <h3 className="text-xl font-display font-bold text-white">Quotation Request Submitted</h3>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Thank you. Our technical engineering team will review your specifications, product configurations, and project details and reach out within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-4 bg-brand-blue hover:bg-brand-darkBlue text-white font-bold py-2.5 px-6 rounded-lg transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Products List Preview */}
            <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 space-y-3">
              <h4 className="text-xs font-display font-bold text-brand-lightBlue tracking-wider uppercase flex items-center gap-1.5">
                <Package className="w-4 h-4" /> Selected Items ({rfqProducts.length})
              </h4>
              {rfqProducts.length === 0 ? (
                <p className="text-xs text-slate-500">No specific products selected. Requesting generic technical consultation.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {rfqProducts.map((item) => (
                    <div key={item.productId} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <span className="font-mono text-brand-lightBlue font-bold bg-navy-900 border border-navy-800 px-1.5 py-0.5 rounded">
                        x{item.quantity}
                      </span>
                      <span className="truncate font-medium text-white">{item.product?.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2.5 px-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-brand-blue transition-colors text-sm"
                />
                {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Company / Institution *</label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Research Lab Ltd"
                  className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2.5 px-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-brand-blue transition-colors text-sm"
                />
                {errors.company && <span className="text-red-500 text-xs mt-1 block">{errors.company}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Designation</label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="e.g. Lead Instrument Engineer"
                  className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2.5 px-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-brand-blue transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Work Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. engineering@company.com"
                  className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2.5 px-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-brand-blue transition-colors text-sm"
                />
                {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Contact Phone *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2.5 px-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-brand-blue transition-colors text-sm"
                />
                {errors.phone && <span className="text-red-500 text-xs mt-1 block">{errors.phone}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Country *</label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. India"
                  className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2.5 px-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-brand-blue transition-colors text-sm"
                />
                {errors.country && <span className="text-red-500 text-xs mt-1 block">{errors.country}</span>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Application Industry</label>
              <select
                value={application}
                onChange={(e) => setApplication(e.target.value)}
                className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2.5 px-3.5 text-white focus:outline-none focus:border-brand-blue transition-colors text-sm"
              >
                <option value="">Select Application Area</option>
                <option value="infrastructure">Infrastructure & Bridges</option>
                <option value="aerospace">Aerospace / Military Testing</option>
                <option value="automotive">Automotive Calibration</option>
                <option value="research">University / Physics Research</option>
                <option value="other">Other Industrial Applications</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Project Details / Custom Requirements *</label>
              <textarea
                required
                rows={4}
                value={projectDetails}
                onChange={(e) => setProjectDetails(e.target.value)}
                placeholder="Detail sensor ranges, operating environments, motherboard specs, expected system loads, or general project engineering scopes..."
                className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2.5 px-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-brand-blue transition-colors text-sm"
              />
              {errors.projectDetails && <span className="text-red-500 text-xs mt-1 block">{errors.projectDetails}</span>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Expected Delivery Timeline</label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2.5 px-3.5 text-white focus:outline-none focus:border-brand-blue transition-colors text-sm"
              >
                <option value="immediate">Immediate (1-2 weeks)</option>
                <option value="medium">Medium (1 month)</option>
                <option value="planning">Planning Phase (3+ months)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-blue hover:bg-brand-darkBlue text-white font-bold py-3 rounded-xl shadow-lg shadow-brand-blue/20 transition-all hover:shadow-brand-blue/30 active:scale-95 text-sm"
            >
              Submit RFQ Request
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
