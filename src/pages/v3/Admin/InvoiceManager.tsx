import React from 'react';
import { Printer, QrCode } from 'lucide-react';
import { useV3Store } from '../../../store/v3Store';
import { GlassCard } from '../../../components/v3/ui/GlassCard';
import { Button } from '../../../components/v3/ui/Button';


export const InvoiceManager: React.FC = () => {
  const { invoices, setInvoiceModalOpen } = useV3Store();

  return (
    <div className="space-y-6 animate-fade-in font-inter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-slate-100">Invoice &amp; Financial Billing Engine</h2>
          <p className="text-xs text-slate-400">Automated 18% GST tax invoices with QR payment codes, signatures &amp; PDF download.</p>
        </div>
      </div>

      {/* Invoice Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {invoices.map((inv) => (
          <GlassCard key={inv.id} hoverEffect={true} className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs text-slate-400">Invoice Number</span>
                <h3 className="text-lg font-bold text-amber-400 font-mono">{inv.invoiceNumber}</h3>
              </div>
              <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                inv.status === 'Paid' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}>
                {inv.status}
              </span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="text-slate-300 font-semibold">{inv.customerName}</div>
              <div className="text-slate-400">{inv.customerEmail} • {inv.customerPhone}</div>
              <div className="text-slate-400">GSTIN: <span className="text-slate-200">{inv.gstNumber}</span></div>
            </div>

            {/* Calculations Breakdown */}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span>${inv.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>GST (18%):</span>
                <span>${inv.gstAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-100 pt-1 border-t border-slate-800">
                <span>Total Amount:</span>
                <span className="text-amber-400">${inv.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Advance Paid:</span>
                <span>${inv.advancePaid.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-200 font-semibold">
                <span>Remaining Due:</span>
                <span>${inv.amountDue.toLocaleString()}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>UPI QR Attached</span>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setInvoiceModalOpen(true, inv)}
                icon={<Printer className="w-4 h-4" />}
              >
                View &amp; Export PDF
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
