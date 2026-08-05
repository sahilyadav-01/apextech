import React, { useState } from 'react';
import { Search, UserCheck } from 'lucide-react';
import { useV3Store } from '../../../store/v3Store';
import { GlassCard } from '../../../components/v3/ui/GlassCard';
import { Button } from '../../../components/v3/ui/Button';
import { WhatsAppActionBtn } from '../../../components/v3/ui/WhatsAppActionBtn';


export const BookingsManager: React.FC = () => {
  const { bookings, updateBookingStatus, setPaymentModalOpen, setInvoiceModalOpen, generateInvoiceForBooking } = useV3Store();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = filterStatus === 'all' || b.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || b.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) || b.venueName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in font-inter">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-slate-100">Enterprise Bookings &amp; Event Operations</h2>
          <p className="text-xs text-slate-400">Track event pipelines, advance payments, venue assignments &amp; staff dispatch.</p>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search booking code, customer, venue..."
            className="glass-input px-3 py-1.5 rounded-lg text-xs w-full sm:w-64"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {['all', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                filterStatus.toLowerCase() === st.toLowerCase()
                  ? 'bg-amber-500 text-slate-950 shadow-glow-gold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table View */}
      <div className="space-y-4">
        {filteredBookings.map((b) => (
          <GlassCard key={b.id} hoverEffect={true} className="p-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-amber-500/20 border border-amber-500/40 rounded text-xs font-mono font-bold text-amber-400">
                    {b.bookingCode}
                  </span>
                  <h3 className="text-base font-bold text-slate-100">{b.customerName}</h3>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    b.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : b.status === 'In Progress' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {b.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400">
                  <div>Event: <strong className="text-slate-200">{b.packageName || b.eventType}</strong></div>
                  <div>Venue: <strong className="text-slate-200">{b.venueName}</strong></div>
                  <div>Date: <strong className="text-amber-400">{b.eventDate}</strong></div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <UserCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span>Assigned Staff: <strong className="text-purple-300">{b.assignedEmployees.join(', ')}</strong></span>
                </div>
              </div>

              {/* Amount & Quick Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0 border-t lg:border-t-0 border-slate-800 pt-3 lg:pt-0">
                <div className="text-right text-xs">
                  <div className="text-slate-400">Total: <span className="text-slate-100 font-bold">${b.totalAmount.toLocaleString()}</span></div>
                  <div className="text-emerald-400">Advance: <strong>${b.advancePaid.toLocaleString()}</strong></div>
                  <div className="text-amber-400 font-semibold">Due: ${b.remainingAmount.toLocaleString()}</div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={b.status}
                    onChange={(e: any) => updateBookingStatus(b.id, e.target.value)}
                    className="glass-input px-2.5 py-1.5 rounded text-xs bg-slate-900"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  <Button variant="outline" size="sm" onClick={() => setPaymentModalOpen(true, b)}>
                    Pay / Collect
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      const inv = generateInvoiceForBooking(b.id);
                      setInvoiceModalOpen(true, inv);
                    }}
                  >
                    Invoice PDF
                  </Button>

                  <WhatsAppActionBtn phone={b.customerPhone} customerName={b.customerName} bookingCode={b.bookingCode} type="reminder" />
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
