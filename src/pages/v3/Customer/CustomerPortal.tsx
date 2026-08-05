import React, { useState } from 'react';
import { Printer, Sparkles } from 'lucide-react';
import { useV3Store } from '../../../store/v3Store';
import { GlassCard } from '../../../components/v3/ui/GlassCard';
import { Button } from '../../../components/v3/ui/Button';
import { WhatsAppActionBtn } from '../../../components/v3/ui/WhatsAppActionBtn';
import { DmxConsole } from '../Admin/DmxConsole';

export const CustomerPortal: React.FC = () => {
  const { bookings, invoices, setPaymentModalOpen, setInvoiceModalOpen } = useV3Store();
  const [dmxPreviewOpen, setDmxPreviewOpen] = useState(false);
  const customerBooking = bookings[0]; // Active customer demo booking

  return (
    <div className="space-y-8 pb-16 font-poppins max-w-6xl mx-auto px-4 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="text-xs uppercase text-amber-400 font-semibold tracking-wider mb-1">Customer Portal</div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-100">Welcome, {customerBooking.customerName}</h1>
          <p className="text-xs text-slate-400">Track your event setup timeline, advance payments, and download official PDF tax invoices.</p>
        </div>
        <WhatsAppActionBtn phone={customerBooking.customerPhone} customerName={customerBooking.customerName} bookingCode={customerBooking.bookingCode} type="chat" size="md" />
      </div>

      {/* Active Event Card */}
      <GlassCard goldBorder hoverEffect={false} className="space-y-6 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded text-xs font-mono font-bold uppercase">
              {customerBooking.bookingCode}
            </span>
            <h2 className="text-2xl font-heading font-bold text-slate-100 mt-2">{customerBooking.packageName || customerBooking.eventType}</h2>
            <p className="text-xs text-slate-400">{customerBooking.venueName} • Event Date: <strong className="text-amber-400">{customerBooking.eventDate}</strong></p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Total Staging Package</span>
            <span className="text-2xl font-heading font-bold text-amber-400">${customerBooking.totalAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* Live Status Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-200">Event Progress Timeline</span>
            <span className="text-emerald-400 font-bold">Status: {customerBooking.status}</span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
            <div className="p-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded font-bold">1. Booking Confirmed</div>
            <div className="p-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded font-bold">2. Design &amp; Floral Lock</div>
            <div className="p-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded font-bold animate-pulse">3. Stage &amp; Truss Setup</div>
            <div className="p-2 bg-slate-950 text-slate-500 rounded border border-slate-800">4. Final Showcase</div>
          </div>
        </div>

        {/* Financial Summary & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs">
          <div>
            <span className="text-slate-400">Advance Paid: <strong className="text-emerald-400">${customerBooking.advancePaid.toLocaleString()}</strong></span>
            <span className="text-slate-400 ml-4">Remaining Balance Due: <strong className="text-amber-400">${customerBooking.remainingAmount.toLocaleString()}</strong></span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {customerBooking.remainingAmount > 0 && (
              <Button variant="primary" size="sm" onClick={() => setPaymentModalOpen(true, customerBooking)}>
                Pay Remaining Balance
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDmxPreviewOpen(true)}
              icon={<Sparkles className="w-4 h-4 text-amber-400" />}
            >
              Preview Stage Lightshow
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const inv = invoices[0];
                if (inv) setInvoiceModalOpen(true, inv);
              }}
              icon={<Printer className="w-4 h-4" />}
            >
              Download PDF Invoice
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Stage Lightshow Preview Modal */}
      {dmxPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setDmxPreviewOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 text-xs font-semibold border border-slate-800 bg-slate-950/90 py-1.5 px-3 rounded-lg hover:border-slate-700 transition-all cursor-pointer z-10"
            >
              ✕ Close Live Preview
            </button>
            <div className="pt-6">
              <DmxConsole />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
