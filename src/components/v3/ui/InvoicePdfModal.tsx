import React from 'react';
import { X, Printer, QrCode, CheckCircle } from 'lucide-react';
import { useV3Store } from '../../../store/v3Store';
import { Button } from './Button';


export const InvoicePdfModal: React.FC = () => {
  const { isInvoiceModalOpen, setInvoiceModalOpen, activeInvoice } = useV3Store();

  if (!isInvoiceModalOpen || !activeInvoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header toolbar */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-slate-950 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2 text-slate-200 font-semibold text-sm">
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Enterprise Invoice Viewer - {activeInvoice.invoiceNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint} icon={<Printer className="w-4 h-4" />}>
              Print / Save PDF
            </Button>
            <button
              onClick={() => setInvoiceModalOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Sheet */}
        <div className="p-8 overflow-y-auto bg-slate-900 text-slate-100 space-y-8" id="printable-invoice">
          {/* Top Banner */}
          <div className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-800 pb-6 gap-4">
            <div>
              <div className="text-2xl font-heading font-bold text-amber-400 tracking-wider">APEX EVENTS V3</div>
              <p className="text-xs text-slate-400 mt-1">Enterprise Luxury Event Architecture &amp; Staging Inc.</p>
              <p className="text-xs text-slate-400">GSTIN: {activeInvoice.gstNumber} | Support: concierge@apexevents.com</p>
            </div>
            <div className="sm:text-right">
              <div className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded text-amber-400 font-bold text-xs uppercase mb-2">
                INVOICE #{activeInvoice.invoiceNumber}
              </div>
              <div className="text-xs text-slate-400">Issue Date: <span className="text-slate-200">{activeInvoice.issueDate}</span></div>
              <div className="text-xs text-slate-400">Due Date: <span className="text-amber-400 font-medium">{activeInvoice.dueDate}</span></div>
            </div>
          </div>

          {/* Customer & Billing Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-950/60 p-5 rounded-xl border border-slate-800 text-xs">
            <div>
              <span className="text-slate-500 font-semibold uppercase tracking-wider block mb-2">Billed To</span>
              <div className="text-sm font-bold text-slate-100">{activeInvoice.customerName}</div>
              <div className="text-slate-300 mt-1">{activeInvoice.customerEmail}</div>
              <div className="text-slate-300">{activeInvoice.customerPhone}</div>
              <div className="text-slate-400 mt-1">{activeInvoice.customerAddress}</div>
            </div>
            <div className="sm:text-right">
              <span className="text-slate-500 font-semibold uppercase tracking-wider block mb-2">Payment Status</span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                <CheckCircle className="w-3.5 h-3.5" /> {activeInvoice.status}
              </div>
              <div className="text-slate-400 mt-3">Preferred Gateway: <span className="text-slate-200 font-medium">{activeInvoice.paymentMethod}</span></div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Item Description</th>
                  <th className="py-3 px-4 text-center">Qty</th>
                  <th className="py-3 px-4 text-right">Unit Price</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {activeInvoice.lineItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-950/40">
                    <td className="py-3.5 px-4 font-medium text-slate-200">{item.description}</td>
                    <td className="py-3.5 px-4 text-center text-slate-300">{item.quantity}</td>
                    <td className="py-3.5 px-4 text-right text-slate-300">${item.unitPrice.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-right font-semibold text-slate-100">${item.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Calculations & QR Code Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
            {/* Payment QR Code */}
            <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-xl border border-amber-500/30">
              <img src={activeInvoice.qrCodeUrl} alt="UPI QR Code" className="w-24 h-24 rounded bg-white p-1 shrink-0" />
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-1">
                  <QrCode className="w-4 h-4" /> Scan &amp; Pay via UPI / Razorpay
                </div>
                <p className="text-xs text-slate-400">Scan code with Google Pay, PhonePe, Paytm or Banking app for instant receipt.</p>
                <div className="text-xs font-bold text-slate-200 mt-2">Amount Due: ${activeInvoice.amountDue.toLocaleString()}</div>
              </div>
            </div>

            {/* Totals Breakdown */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span className="text-slate-200">${activeInvoice.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>GST (18% Enterprise Tax):</span>
                <span className="text-slate-200">${activeInvoice.gstAmount.toLocaleString()}</span>
              </div>
              {activeInvoice.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Special Discount:</span>
                  <span>-${activeInvoice.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Advance Paid:</span>
                <span className="text-emerald-400 font-medium">${activeInvoice.advancePaid.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-amber-400 pt-2 border-t border-slate-800">
                <span>Remaining Balance Due:</span>
                <span>${activeInvoice.amountDue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Footer Signature */}
          <div className="flex justify-between items-end pt-6 border-t border-slate-800 text-xs text-slate-500">
            <div>
              <p>Thank you for partnering with Apex Events V3.</p>
              <p className="mt-1">Computer-generated official business tax invoice.</p>
            </div>
            <div className="text-right">
              <div className="italic text-amber-400/90 font-serif text-sm mb-1">Victoria Vance</div>
              <div className="border-t border-slate-700 pt-1 text-[10px] uppercase tracking-wider">Authorized Signatory</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
